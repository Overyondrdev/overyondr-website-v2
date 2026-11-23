# overyondr.com — V2

The redesigned Yondr marketing site, built from the V3 prototype (Figma) and modernised:
a static [Astro](https://astro.build) site served by Cloudflare Workers (static assets only).

V1 (`overyondr-website-v1`) is the faithful Squarespace replica. V2 is the new design and
information architecture; legacy Squarespace URLs 301 to their V2 equivalents via `public/_redirects`.

## Run locally

```sh
nvm use          # Node 22
npm ci
npm run dev      # http://localhost:4321
npm run build    # type check + build + Squarespace-CDN check
npm run check:links
npm run preview  # build, then serve with Cloudflare's runtime (wrangler)
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

## Deploys

Cloudflare Workers Builds (Git integration) builds and deploys this repo, as with V1:

| Branch | Goes to                                                                                     |
| ------ | ------------------------------------------------------------------------------------------- |
| `main` | **https://v2.overyondrdev.com** (Worker `overyondr-website-v2`), about a minute after merge |

- overyondrdev.com is behind Cloudflare Access (one-time code to `@overyondr.com` addresses). The portal at
  overyondrdev.com and V1 at v1.overyondrdev.com are served by the V1 repo's Worker; its portal links here.
- `workers_dev` and `preview_urls` are `false` in `wrangler.jsonc` so nothing bypasses Access. Review PRs locally
  (`npm run preview`) or on v2.overyondrdev.com after merge.
- overyondr.com still points to Squarespace. Production domains are added to `wrangler.jsonc` only at cutover.
- Cloudflare build settings: build command `npm run build`, deploy command `npx wrangler deploy`, production branch `main`.
