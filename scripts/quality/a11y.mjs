// Accessibility gate: axe-core (WCAG 2.0/2.1/2.2 A and AA rules) on every built page, in headless Chromium, at
// desktop (1280px) and phone (375px) width. Also checks for horizontal scroll at 375px (CLAUDE.md rule).
// Fails on serious/critical violations and on horizontal scroll; lists moderate/minor ones without failing.
//
//   npm run quality:a11y              all pages
//   npm run quality:a11y -- /faq /    only these paths
// Needs `npm run build` first. In CI, install the browser with `npx playwright install --with-deps chromium`.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { listPages, startServer } from './lib.mjs';

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const BLOCKING = new Set(['serious', 'critical']);

const only = process.argv.slice(2).filter((a) => a.startsWith('/'));
const pages = (await listPages()).filter((p) => !only.length || only.includes(p.path));
const server = await startServer();
const browser = await chromium.launch();
const blocking = [];
const advisory = new Map(); // rule id -> { impact, help, pages:Set }
const overflow = [];

try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    for (const { path } of pages) {
      await page.goto(server.url + path, { waitUntil: 'load' });
      // Reveal-on-scroll content: scroll through the page so everything is in its final state.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 20));
        }
        window.scrollTo(0, 0);
      });
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of violations) {
        if (BLOCKING.has(v.impact)) {
          blocking.push({
            vp: vp.name,
            path,
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.map((n) => n.target.join(' ')),
          });
        } else {
          const a = advisory.get(v.id) || { impact: v.impact, help: v.help, pages: new Set() };
          a.pages.add(`${path} (${vp.name})`);
          advisory.set(v.id, a);
        }
      }
      if (vp.width === 375) {
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        if (sw > vp.width) overflow.push(`${path}: page is ${sw}px wide at 375px`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  await server.close();
}

console.log(`axe-core: ${pages.length} pages x ${VIEWPORTS.length} viewports (${TAGS.join(', ')})`);
if (advisory.size) {
  console.log('\nModerate/minor (not blocking):');
  for (const [id, a] of advisory)
    console.log(
      `  - ${id} [${a.impact}] ${a.help}: ${[...a.pages].slice(0, 5).join(', ')}${a.pages.size > 5 ? ` +${a.pages.size - 5} more` : ''}`,
    );
}
if (blocking.length) {
  console.log('\nSerious/critical (blocking):');
  for (const b of blocking)
    console.log(
      `  x ${b.path} (${b.vp}) ${b.id} [${b.impact}] ${b.help}\n      ${b.nodes.slice(0, 5).join('\n      ')}`,
    );
}
if (overflow.length) console.log('\nHorizontal scroll at 375px (blocking):\n  x ' + overflow.join('\n  x '));
if (blocking.length || overflow.length) {
  console.error(
    `\nFAIL: ${blocking.length} serious/critical violation(s), ${overflow.length} page(s) with horizontal scroll.`,
  );
  process.exit(1);
}
console.log('\nOK: no serious/critical accessibility violations, no horizontal scroll at 375px.');
