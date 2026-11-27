// SEO hygiene on the built site (dist/), as it will be on overyondr.com:
//   - every page: a <title> and a meta description, both unique across the site; exactly one <h1>;
//     a canonical URL equal to https://www.overyondr.com<path>; no <meta name="robots" content="noindex">
//   - sitemap-index.xml exists and the sitemap lists exactly the built pages (404 excluded)
//   - robots.txt allows crawling and points to the sitemap (production must be indexable)
//   - the Worker still sends X-Robots-Tag: noindex on the dev domain (that, not robots.txt, keeps
//     *.overyondrdev.com out of search results)
// Needs `npm run build` first.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DIST, ROOT, SITE, listPages } from './lib.mjs';

const problems = [];
const warn = (m) => problems.push(m);
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[1] ?? m[2] ?? m[3]) : null;
};

const pages = await listPages();
const titles = new Map();
const descriptions = new Map();
const add = (map, key, path) => map.set(key, [...(map.get(key) || []), path]);

for (const { path, file } of pages) {
  const html = await readFile(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>') + 1 || undefined);
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title || !decode(title[1])) warn(`${path}: missing <title>`);
  else add(titles, decode(title[1]), path);

  const metas = head.match(/<meta\b[^>]*>/gi) || [];
  const desc = metas.find((m) => attr(m, 'name')?.toLowerCase() === 'description');
  const descText = desc && attr(desc, 'content');
  if (!descText) warn(`${path}: missing meta description`);
  else {
    add(descriptions, descText, path);
    if (descText.length < 50 || descText.length > 170)
      console.log(`  note ${path}: meta description is ${descText.length} characters (aim for 50-160)`);
  }
  const robots = metas.find((m) => attr(m, 'name')?.toLowerCase() === 'robots');
  if (robots && /noindex/i.test(attr(robots, 'content') || '')) warn(`${path}: <meta name="robots" noindex>`);

  const canon = (head.match(/<link\b[^>]*>/gi) || []).find(
    (l) => attr(l, 'rel')?.toLowerCase() === 'canonical',
  );
  const expected = SITE + (path === '/' ? '/' : path);
  if (!canon) warn(`${path}: missing canonical link`);
  else if (attr(canon, 'href') !== expected)
    warn(`${path}: canonical is ${attr(canon, 'href')}, expected ${expected}`);

  const h1s = (html.match(/<h1\b/gi) || []).length;
  if (h1s !== 1) warn(`${path}: ${h1s} <h1> elements (expected exactly 1)`);
}
for (const [t, ps] of titles) if (ps.length > 1) warn(`duplicate title "${t}": ${ps.join(', ')}`);
for (const [d, ps] of descriptions)
  if (ps.length > 1) warn(`duplicate meta description "${d.slice(0, 60)}…": ${ps.join(', ')}`);

// Sitemap: sitemap-index.xml -> sitemap-N.xml files -> <loc> URLs.
const read = (f) => readFile(join(DIST, f), 'utf8').catch(() => null);
const index = await read('sitemap-index.xml');
const listed = new Set();
if (!index) warn('dist/sitemap-index.xml is missing');
else {
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = await read(new URL(loc).pathname.slice(1));
    if (!xml) warn(`sitemap index lists ${loc}, which is not in dist/`);
    else for (const [, u] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) listed.add(u);
  }
  const expected = new Set(pages.map((p) => SITE + (p.path === '/' ? '/' : p.path)));
  for (const u of expected) if (!listed.has(u)) warn(`sitemap is missing ${u}`);
  for (const u of listed) if (!expected.has(u)) warn(`sitemap lists ${u}, which is not a built page`);
}

const robots = await read('robots.txt');
if (!robots) warn('dist/robots.txt is missing');
else {
  if (/^\s*Disallow:\s*\/\s*$/im.test(robots))
    warn('robots.txt disallows the whole site (production must allow)');
  if (!new RegExp(`^Sitemap:\\s*${SITE.replace(/\./g, '\\.')}/sitemap-index\\.xml\\s*$`, 'im').test(robots))
    warn(`robots.txt has no "Sitemap: ${SITE}/sitemap-index.xml" line`);
}

const worker = await readFile(join(ROOT, 'worker/index.js'), 'utf8');
if (!/x-robots-tag/i.test(worker) || !/noindex/.test(worker) || !/overyondrdev/.test(worker))
  warn('worker/index.js no longer sends X-Robots-Tag: noindex on the dev domain');

console.log(`SEO hygiene: ${pages.length} pages, ${listed.size} sitemap URLs`);
if (problems.length) {
  console.error(problems.map((p) => '  x ' + p).join('\n'));
  console.error(`\nFAIL: ${problems.length} problem(s).`);
  process.exit(1);
}
console.log('OK: unique titles and descriptions, one h1, canonical, sitemap and robots.txt.');
