// Shared helpers for the launch-quality checks (npm run quality). No dependencies beyond Node.
//
// startServer() serves dist/ the way production does for URLs: /about -> about/index.html, no trailing slash
// (/about/ -> 308 /about), 404.html for anything else. It does NOT run the Worker, so there is no sign-in and no
// dev-host X-Robots-Tag: noindex. That is deliberate: the checks measure the site as it will be on overyondr.com.
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const DIST = join(ROOT, 'dist');
export const SITE = 'https://www.overyondr.com';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

/** Every built page as { path: '/about', file: '/abs/dist/about/index.html' }, 404 excluded. */
export async function listPages() {
  const files = (await walk(DIST)).filter((f) => f.endsWith('.html'));
  return files
    .map((file) => {
      let rel = relative(DIST, file).split(sep).join('/');
      if (rel === '404.html') return null;
      rel = rel.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
      return { path: '/' + rel.replace(/\/$/, ''), file };
    })
    .filter(Boolean)
    .sort((a, b) => a.path.localeCompare(b.path));
}

/** The file dist/ would serve for a URL path, or null. */
export async function resolvePath(pathname) {
  const clean = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  if (clean.split('/').includes('..')) return null;
  const candidates =
    clean === '/'
      ? ['index.html']
      : [clean.slice(1), clean.slice(1) + '/index.html', clean.slice(1) + '.html'];
  for (const c of candidates) {
    const f = join(DIST, c);
    try {
      if ((await stat(f)).isFile()) return f;
    } catch {}
  }
  return null;
}

export function startServer(port = 0) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      res.writeHead(308, { location: url.pathname.replace(/\/+$/, '') + url.search });
      return res.end();
    }
    const file = await resolvePath(url.pathname);
    const status = file ? 200 : 404;
    const path = file || join(DIST, '404.html');
    const headers = { 'content-type': TYPES[extname(path)] || 'application/octet-stream' };
    if (path.includes(`${sep}_astro${sep}`)) headers['cache-control'] = 'public, max-age=31536000, immutable';
    res.writeHead(status, headers);
    res.end(req.method === 'HEAD' ? undefined : await readFile(path));
  });
  return new Promise((resolve) =>
    server.listen(port, '127.0.0.1', () => {
      const { port: p } = server.address();
      resolve({ url: `http://127.0.0.1:${p}`, close: () => new Promise((r) => server.close(r)) });
    }),
  );
}

// `node scripts/quality/lib.mjs [port]` serves dist/ (used by Lighthouse CI, see lighthouserc.cjs).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { url } = await startServer(Number(process.argv[2]) || 4321);
  console.log(`Serving dist/ at ${url}`);
}
