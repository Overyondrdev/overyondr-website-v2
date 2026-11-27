// Lighthouse CI (npm run quality:lighthouse). Serves dist/ with scripts/quality/lib.mjs (no Worker, so no sign-in
// and no dev-domain X-Robots-Tag: noindex: scores reflect production overyondr.com). Desktop preset, median of 3 runs.
// Reports stay on disk (.lighthouseci/, uploaded as a CI artifact). Never upload: the repository is public and
// temporary-public-storage would publish the reports.
const PAGES = [
  '/',
  '/how-it-works',
  '/find-your-space',
  '/spaces/education',
  '/blog',
  '/get-started',
  '/faq',
];
const PORT = 4321;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node scripts/quality/lib.mjs ${PORT}`,
      startServerReadyPattern: 'Serving dist',
      url: PAGES.map((p) => `http://127.0.0.1:${PORT}${p}`),
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:seo': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:best-practices': ['warn', { minScore: 0.9, aggregationMethod: 'median-run' }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
