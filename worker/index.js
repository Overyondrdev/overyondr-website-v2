// The V2 Worker: every request runs through here first (wrangler.jsonc: assets.run_worker_first = true), then the
// built Astro site in dist/ is served through the ASSETS binding.
//
//   1. Sign-in: every request, static files included, needs a Yondr Google sign-in (the shared `yondr_session`
//      cookie, checked with ./yondr-session.js). Cloudflare Access is set to Bypass for overyondrdev.com, so this
//      check is the only thing keeping the site private. See docs/PLATFORM.md in overyondr-website-v1.
//   2. Redirects and headers from public/_redirects and public/_headers. Cloudflare does not apply those files to
//      responses that a Worker returns, so they are applied here (same rules, same file format).
//   3. On the dev domain only: the feedback widget script and an X-Robots-Tag: noindex header.
import { yondrUser, loginUrl } from './yondr-session.js';
import redirectsText from '../public/_redirects';
import headersText from '../public/_headers';

// Hosts that are public (no sign-in). Empty until the overyondr.com cutover, after sign-off. Everything else,
// including any host added by mistake, needs a Yondr sign-in.
const PUBLIC_HOSTS = new Set([]);

// The dev domain (and local `wrangler dev`): noindex, plus the feedback widget.
const DEV_HOST = /(^|\.)overyondrdev\.com$|^(localhost|127\.0\.0\.1)$/;
const LOCAL_HOST = /^(localhost|127\.0\.0\.1)$/;
const WIDGET = '<script src="https://feedback.overyondrdev.com/widget.js" data-project="v2" data-toolbar="website" defer></script>';

// ---------------------------------------------------------------- _redirects / _headers
// _redirects: "<from> <to> [status]" per line; a trailing * in <from> becomes :splat in <to>. Lines starting with #
// are comments; a # inside a line is part of the URL (e.g. /products#lockbox).
const REDIRECTS = redirectsText
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, status] = l.split(/\s+/);
    return { from, to, status: Number(status) || 301 };
  });

// _headers: a URL pattern line, then indented "Name: value" lines.
const HEADER_RULES = [];
for (const line of headersText.split('\n')) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  if (/^\s/.test(line)) {
    const i = line.indexOf(':');
    const rule = HEADER_RULES[HEADER_RULES.length - 1];
    if (rule && i > 0) rule.set.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
  } else {
    const pattern = line.trim();
    HEADER_RULES.push({ pattern, isUrl: /^https?:/.test(pattern), regex: patternToRegex(pattern), set: [] });
  }
}

function patternToRegex(p) {
  const esc = p
    .replace(/^http:/, 'https:')
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '(.*)')
    .replace(/:[A-Za-z]\w*/g, '[^/.]+');
  return new RegExp('^' + esc + '$');
}

function findRedirect(url) {
  for (const r of REDIRECTS) {
    if (r.from.endsWith('*')) {
      const base = r.from.slice(0, -1);
      if (url.pathname.startsWith(base))
        return { to: r.to.replace(':splat', url.pathname.slice(base.length)), status: r.status };
    } else if (r.from === url.pathname) return r;
  }
  return null;
}

function redirectTo(hop, url) {
  const target = new URL(hop.to, url);
  // Keep the visitor's query string unless the rule sets its own.
  if (!target.search && url.search) target.search = url.search;
  return new Response(null, { status: hop.status, headers: { location: target.href } });
}

function applyHeaders(res, url) {
  for (const rule of HEADER_RULES) {
    const subject = rule.isUrl ? 'https://' + url.hostname + url.pathname : url.pathname;
    if (rule.regex.test(subject)) for (const [k, v] of rule.set) res.headers.set(k, v);
  }
}

// ---------------------------------------------------------------- sign-in
async function currentUser(request, env, url) {
  // DEV_EMAIL is set only in a local .dev.vars file and only honoured on localhost, never on a deployed host.
  if (env.DEV_EMAIL && LOCAL_HOST.test(url.hostname)) return { email: String(env.DEV_EMAIL).toLowerCase() };
  return yondrUser(request, env).catch(() => null);
}

function signInRequired(request) {
  if (request.method === 'GET' || request.method === 'HEAD')
    return new Response(null, {
      status: 302,
      headers: { location: loginUrl(request), 'cache-control': 'no-store' },
    });
  return new Response(JSON.stringify({ error: 'Please sign in with your Yondr Google account.' }), {
    status: 401,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// ---------------------------------------------------------------- Worker
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const dev = DEV_HOST.test(url.hostname);

    if (!PUBLIC_HOSTS.has(url.hostname) && !(await currentUser(request, env, url)))
      return signInRequired(request);

    const hop = findRedirect(url);
    let res = hop ? redirectTo(hop, url) : await env.ASSETS.fetch(request);
    // html_handling (trailing slashes) and not_found_handling (404 page) are applied by the ASSETS binding.
    res = new Response(res.body, res);
    applyHeaders(res, url);
    if (!dev) return res;

    res.headers.set('X-Robots-Tag', 'noindex');
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;
    return new HTMLRewriter()
      .on('body', {
        element(el) {
          el.append(WIDGET, { html: true });
        },
      })
      .transform(res);
  },
};
