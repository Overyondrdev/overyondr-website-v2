// Captures full-page desktop and mobile screenshots of every page, plus a scroll-through video.
// Usage: npm run build && npx astro preview --port 4321 &  then  npm run screenshots
// Requires Playwright with Chromium (`npx playwright install chromium`); it is intentionally not a project dependency.
import playwright from 'playwright';
import { mkdir } from 'node:fs/promises';

const { chromium } = playwright;
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = 'walkthrough';
export const pages = [
  ['home', '/'],
  ['how-it-works', '/how-it-works'],
  ['find-your-space', '/find-your-space'],
  ['space-education', '/spaces/education'],
  ['space-live-events', '/spaces/live-events'],
  ['space-commercial', '/spaces/commercial'],
  ['blog', '/blog'],
  ['blog-article', '/blog/nber-research-yondr-phone-free-schools-outcomes'],
  ['press', '/press'],
  ['get-started', '/get-started'],
  ['timeline', '/timeline'],
  ['about', '/about'],
  ['faq', '/faq'],
  ['privacy', '/privacy'],
  ['terms', '/terms'],
  ['school-phone-bans', '/school-phone-bans'],
  ['state-texas', '/school-phone-bans/texas'],
];

const settle = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.addStyleTag({
    content:
      '[data-reveal],[data-split] .line>span{opacity:1!important;transform:none!important}.site-header{transform:none!important}',
  });
  await page.waitForTimeout(600);
};

await mkdir(`${OUT}/desktop`, { recursive: true });
await mkdir(`${OUT}/mobile`, { recursive: true });
const browser = await chromium.launch();

for (const [vw, dir, scale] of [
  [1440, 'desktop', 1],
  [390, 'mobile', 2],
]) {
  const page = await browser.newPage({ viewport: { width: vw, height: 900 }, deviceScaleFactor: scale });
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await settle(page);
    await page.screenshot({ path: `${OUT}/${dir}/${name}.png`, fullPage: true });
    console.log(`${dir}/${name}.png`);
  }
  await page.close();
}

// Scroll-through video of the main journey.
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: `${OUT}/video`, size: { width: 1440, height: 900 } },
});
const page = await ctx.newPage();
const journey = process.env.VIDEO_PAGES ? process.env.VIDEO_PAGES.split(',') : pages.map((p) => p[1]);
for (const path of journey) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h - 900; y += 14) {
    await page.mouse.wheel(0, 14);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(700);
}
await ctx.close();
await browser.close();
console.log('video saved in walkthrough/video');
