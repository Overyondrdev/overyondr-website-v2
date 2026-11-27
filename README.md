# overyondr.com — V2

The redesigned Yondr marketing site, built from the V3 prototype (Figma) and modernised:
a static [Astro](https://astro.build) site served by a small Cloudflare Worker (`worker/index.js`) with static assets.

V2 will become the public overyondr.com. V1
([overyondr-website-v1](https://github.com/Overyondrdev/overyondr-website-v1)) is the faithful Squarespace replica,
and also holds the dev portal, the Yondr sign-in and the platform docs. V2 is the new design and information
architecture; legacy Squarespace URLs 301 to their V2 equivalents via `public/_redirects`.

## Run locally

```sh
nvm use          # Node 22
npm ci
npm run dev      # http://localhost:4321
npm run build    # type check + build + Squarespace-CDN check
npm run check:links
npm run preview  # after a build: the real Worker (sign-in, redirects, widget) via wrangler dev
npm run screenshots  # full-page desktop + mobile screenshots and a scroll-through video into walkthrough/
```

## Pages

| URL                                                                                | Source                                                              | Notes                                                                            |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `/`                                                                                | `src/pages/index.astro`                                             | Hero, stats, spaces carousel, press bento, testimonial, blog teaser              |
| `/how-it-works`                                                                    | `src/pages/how-it-works.astro`                                      | Program overview, animated pouch steps                                           |
| `/find-your-space`                                                                 | `src/pages/find-your-space.astro`                                   | Expanding space panels                                                           |
| `/spaces/education`, `/spaces/live-events`, `/spaces/commercial`                   | `src/pages/spaces/[space].astro` + `src/data/spaces.ts`             | One template, content in data                                                    |
| `/blog`, `/blog/<slug>`                                                            | `src/pages/blog/` + `src/content/blog/*.md`                         | Topic filter, reading progress, table of contents                                |
| `/press`                                                                           | `src/pages/press.astro` + `src/data/press.ts`                       | Full press archive with year filter and pagination                               |
| `/get-started`                                                                     | `src/pages/get-started.astro`                                       | Contact form (see "Forms" below)                                                 |
| `/about`, `/timeline`                                                              | `src/pages/`                                                        | Dotted world map, pinned horizontal timeline                                     |
| `/faq`                                                                             | `src/pages/faq.astro` + `src/data/faq.ts`                           | Search, scroll-spy, FAQPage schema                                               |
| `/school-phone-bans`, `/school-phone-bans/<state>`                                 | `src/pages/school-phone-bans/` + `src/content/states/*.md`          | US tile map, one Markdown file per state                                         |
| `/privacy`, `/terms`                                                               | `src/content/legal/*.md`                                            |                                                                                  |
| `/spaces/<space>/<use-case>`                                                       | `src/pages/spaces/[space]/[usecase].astro` + `src/data/useCases.ts` | Use cases (music, comedy, courts, universities, ...) migrated from the live site |
| `/products`                                                                        | `src/pages/products.astro` + `src/data/products.ts`                 | Catalog with category filter; old product URLs redirect to `/products#<slug>`    |
| `/home-tray`, `/international`, `/funding`, `/uk-schools`, `/roi`, `/patents`, ... | `src/pages/[...page].astro` + `src/content/pages/*.md`              | Generic content page template; URL overrides in `src/data/pageRoutes.ts`         |

## Design system

- **Tokens and global styles:** `src/styles/global.css` (colour, type scale, spacing, buttons, cards, motion).
- **Type:** Fraunces (soft axis) for display, Instrument Sans for text, self-hosted via Fontsource.
- **Colour:** lime `#dcff6b`, forest `#1c2b0e`, cream `#f3f7d6`, charcoal `#1d1f1b`. Sections opt into a theme with
  `.surface-cream | .surface-forest | .surface-charcoal | .surface-lime`.
- **Components:** `src/components/` (PageHero, StatsBar, PressSection, ProcessSteps, BenefitTabs, Stories, ...).
- **Images:** put originals in `src/assets/images` and use `<Img src="name.jpg" alt="..." />`. Astro outputs
  responsive WebP at build time.
- **Motion:** scroll reveals (`data-reveal`), masked headline reveals (`data-split`), count-up stats (`data-count`),
  carousels (`data-carousel`), tabs (`data-tabs`), all in `src/scripts/ui.ts`. Everything is static and readable
  without JavaScript, and animation is turned off for `prefers-reduced-motion`.

## Content sources

Copy and layouts follow the V3 prototype. Real content was migrated from the live overyondr.com:
press archive (`src/data/press.ts`), FAQ answers, privacy and terms, the full blog, state legislation guides, use-case pages, products and company pages.
Photography was taken from the prototype file.

### Before launch: content to confirm or replace

- **School phone ban figures** on `/school-phone-bans` (35 / 26 / 5 / 1 states) come from the prototype. The migrated
  hub post says "20 states as of May 2025". Confirm the current numbers.
- **Space-page stats** for Live Events and Commercial reuse figures that appear elsewhere in the prototype
  (20M+ show attendees, 1M court visitors, 80+ jurisdictions, 55 countries, 40 arenas).
- **Testimonials:** the prototype's testimonial cards used placeholder text, so they were replaced with real, attributed
  press quotes. The video testimonials (James Ketley, Amy Richards) need video links before they can be added back.
- **Products:** the live product pages have photos and names only. Add descriptions/specs to `src/data/products.ts`.
- **FAQ:** questions marked "Additional questions from the V3 prototype" in `src/data/faq.ts` have new answers to review.
- **Process steps / benefit captions** where the prototype had lorem ipsum (in `src/data/spaces.ts`) are new copy.

## Forms

`/get-started` posts JSON to `PUBLIC_FORM_ENDPOINT` (set it in Cloudflare build variables, e.g. a HubSpot, Formspree
or Worker URL). Without it, the form validates and shows the confirmation state but sends nothing. The footer
newsletter form shows a confirmation only, until a provider is connected.

## Sign-in and the Worker

Every `*.overyondrdev.com` site requires the Yondr Google sign-in (`@overyondr.com` Google Workspace accounts); see
[docs/PLATFORM.md](https://github.com/Overyondrdev/overyondr-website-v1/blob/main/docs/PLATFORM.md) in the V1 repo.
Cloudflare Access is set to Bypass for these hosts, so `worker/index.js` checks the `yondr_session` cookie on every
request, static files included (`run_worker_first`), and sends signed-out visitors to
`auth.overyondrdev.com/login`. `worker/yondr-session.js` is an unchanged copy of V1's `auth/src/session.js`; CI fails
if it drifts.

The Worker also applies `public/_redirects` and `public/_headers` (Cloudflare doesn't apply them to Worker
responses), and on the dev domain adds `X-Robots-Tag: noindex` and the team feedback widget
(`https://feedback.overyondrdev.com/widget.js`, `data-project="v2"`).

To try it locally: put `DEV_EMAIL="someone@overyondr.com"` in `.dev.vars` (git-ignored; honoured on localhost only),
then `npm run build && npm run preview`. Without `.dev.vars` you get the redirect to the sign-in page.

## Launch quality

`npm run quality` (after `npm run build`) runs the checks V2 must pass before it becomes overyondr.com. They serve
`dist/` with a small static server (`scripts/quality/lib.mjs`), not the Worker, so there is no sign-in and no dev-domain
`X-Robots-Tag: noindex`: results reflect production. Each check also runs on its own:

| Script               | Checks                                                                                                                                                                                                                                                                              | Fails on                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `quality:seo`        | Every page: unique `<title>` and meta description, exactly one `<h1>`, canonical `https://www.overyondr.com<path>`, no `noindex`; the sitemap lists exactly the built pages; `robots.txt` allows crawling and names the sitemap; the Worker still sends `noindex` on the dev domain | any problem (description length is only a note)                                                             |
| `quality:redirects`  | Every `public/_redirects` rule ends (within 5 hops) on a page in `dist/`; every old overyondr.com URL in `scripts/quality/legacy-urls.txt` that hits a rule lands on a page                                                                                                         | a broken redirect. Old URLs with no page and no redirect are listed, not failed: decide each before cutover |
| `quality:a11y`       | axe-core (WCAG 2.0/2.1/2.2 A and AA) on every page in headless Chromium at 1280px and 375px; horizontal scroll at 375px                                                                                                                                                             | serious or critical violations, horizontal scroll. Moderate/minor are listed                                |
| `quality:lighthouse` | Lighthouse CI (desktop, median of 3) on `/`, `/how-it-works`, `/find-your-space`, `/spaces/education`, `/blog`, `/get-started`, `/faq` (`lighthouserc.cjs`)                                                                                                                         | performance < 0.9, accessibility < 0.95, SEO < 0.95 (best practices < 0.9 warns)                            |

Lighthouse reports are written to `.lighthouseci/` (git-ignored) and kept as the `lighthouse-reports` artifact of the
CI job; they are never uploaded to a public server. Locally the checks use the preinstalled Chromium/Chrome; in CI the
`quality` job installs Chromium with `npx playwright install --with-deps chromium`. The `quality` job is non-blocking
(`continue-on-error: true`) for now; make it blocking before launch. Dev dependencies: `playwright`,
`@axe-core/playwright`, `@lhci/cli`. `legacy-urls.txt` is a snapshot of the old site's URLs (from V1's
`src/v1/pages`); refresh it if the live site gains pages before cutover.

## Deploys

Worker `overyondr-website-v2` (`wrangler.jsonc`). Once Cloudflare Workers Builds is connected to this repo, merges to
`main` build with `npm run build` and deploy with `npx wrangler deploy`. `v2.overyondrdev.com` is attached to this
Worker at the switch-over (until then the V1 Worker still serves it); the route is commented out in `wrangler.jsonc`.
`workers_dev` and `preview_urls` stay `false`. overyondr.com still points to Squarespace; production domains are added
only at cutover, after sign-off.
