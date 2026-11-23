// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// V2 is the redesigned site: static output, served by Cloudflare Workers static assets.
export default defineConfig({
  site: 'https://www.overyondr.com',
  output: 'static',
  trailingSlash: 'never',
  // /about -> about/index.html. Cloudflare's html_handling "drop-trailing-slash" serves it at /about.
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
