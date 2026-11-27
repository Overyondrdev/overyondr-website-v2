// Redirect check for public/_redirects (applied by worker/index.js with the same rules: exact paths, trailing
// `*` -> `:splat`, first match wins, query string kept).
//   Blocking: every rule's target (and every legacy URL that hits a rule) ends, within 5 hops, on a page that exists
//             in dist/. Fragments (#lockbox) are not checked.
//   Report:   old overyondr.com (Squarespace) URLs from legacy-urls.txt that have neither a V2 page nor a redirect,
//             so they would 404 after cutover. Decide per URL before launch (redirect, or let it 404).
// Needs `npm run build` first.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, resolvePath } from './lib.mjs';

const text = await readFile(join(ROOT, 'public/_redirects'), 'utf8');
const rules = text
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, status] = l.split(/\s+/);
    return { from, to, status: Number(status) || 301 };
  });

function hop(pathname) {
  for (const r of rules) {
    if (r.from.endsWith('*')) {
      const base = r.from.slice(0, -1);
      if (pathname.startsWith(base)) return r.to.replace(':splat', pathname.slice(base.length));
    } else if (r.from === pathname) return r.to;
  }
  return null;
}

/** Follow redirects from a path; returns { final, chain, ok }. */
async function follow(start) {
  const chain = [start];
  let path = start;
  for (let i = 0; i < 6; i++) {
    const exists = await resolvePath(path);
    if (exists) return { final: path, chain, ok: true };
    const next = hop(path);
    if (!next) return { final: path, chain, ok: false };
    if (/^https?:/.test(next)) return { final: next, chain: [...chain, next], ok: true, external: true };
    path = new URL(next, 'https://x').pathname;
    chain.push(next);
  }
  return { final: path, chain, ok: false, loop: true };
}

const problems = [];
for (const r of rules) {
  if (r.from.split('/').some((s) => s.includes('*') && s !== '*'))
    problems.push(`${r.from}: only a trailing * is supported`);
  if (![301, 302, 307, 308].includes(r.status))
    problems.push(`${r.from}: status ${r.status} is not a redirect`);
  if (/^https?:/.test(r.to)) continue;
  if (await resolvePath(r.from))
    problems.push(`${r.from}: a page exists at this path; the redirect hides it`);
  if (r.from.endsWith('*')) continue; // checked below with real legacy URLs
  const target = new URL(r.to, 'https://x').pathname;
  const res = await follow(target);
  if (!res.ok)
    problems.push(`${r.from} -> ${res.chain.join(' -> ')}: no page${res.loop ? ' (redirect loop)' : ''}`);
}

const legacy = (await readFile(new URL('./legacy-urls.txt', import.meta.url), 'utf8'))
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));
const unmapped = [];
let viaRedirect = 0;
let samePath = 0;
for (const url of legacy) {
  const res = await follow(url);
  if (res.ok && res.chain.length === 1) samePath++;
  else if (res.ok) viaRedirect++;
  else if (res.chain.length > 1)
    problems.push(`legacy ${url} -> ${res.chain.slice(1).join(' -> ')}: no page`);
  else unmapped.push(url);
}

console.log(
  `_redirects: ${rules.length} rules. Legacy URLs: ${legacy.length} (${samePath} same path, ${viaRedirect} redirected, ${unmapped.length} unmapped).`,
);
if (unmapped.length) {
  console.log(
    `\nOld overyondr.com URLs with no V2 page and no redirect (not blocking; decide before cutover):`,
  );
  console.log('  ' + unmapped.join('\n  '));
}
if (problems.length) {
  console.error('\n' + problems.map((p) => '  x ' + p).join('\n'));
  console.error(`\nFAIL: ${problems.length} broken redirect(s).`);
  process.exit(1);
}
console.log('\nOK: every redirect ends on an existing V2 page.');
