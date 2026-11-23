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

| URL                                                              | Source                                                     | Notes                                                               |
| ---------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `/`                                                              | `src/pages/index.astro`                                    | Hero, stats, spaces carousel, press bento, testimonial, blog teaser |
| `/how-it-works`                                                  | `src/pages/how-it-works.astro`                             | Program overview, animated pouch steps                              |
| `/find-your-space`                                               | `src/pages/find-your-space.astro`                          | Expanding space panels                                              |
| `/spaces/education`, `/spaces/live-events`, `/spaces/commercial` | `src/pages/spaces/[space].astro` + `src/data/spaces.ts`    | One template, content in data                                       |
| `/blog`, `/blog/<slug>`                                          | `src/pages/blog/` + `src/content/blog/*.md`                | Topic filter, reading progress, table of contents                   |
| `/press`                                                         | `src/pages/press.astro` + `src/data/press.ts`              | Full press archive with year filter and pagination                  |
| `/get-started`                                                   | `src/pages/get-started.astro`                              | Contact form (see "Forms" below)                                    |
| `/about`, `/timeline`                                            | `src/pages/`                                               | Dotted world map, pinned horizontal timeline                        |
| `/faq`                                                           | `src/pages/faq.astro` + `src/data/faq.ts`                  | Search, scroll-spy, FAQPage schema                                  |
| `/school-phone-bans`, `/school-phone-bans/<state>`               | `src/pages/school-phone-bans/` + `src/content/states/*.md` | US tile map, one Markdown file per state                            |
| `/privacy`, `/terms`                                             | `src/content/legal/*.md`                                   |                                                                     |

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
press archive (`src/data/press.ts`), FAQ answers, privacy and terms, 9 blog posts and 11 state legislation guides.
Photography was taken from the prototype file.

### Before launch: content to confirm or replace

- **Logo:** `src/components/Logo.astro` is a close typographic match to the prototype wordmark. Swap in the official SVG.
- **School phone ban figures** on `/school-phone-bans` (35 / 26 / 5 / 1 states) come from the prototype. The migrated
  hub post says "20 states as of May 2025". Confirm the current numbers.
- **Space-page stats** for Live Events and Commercial reuse figures that appear elsewhere in the prototype
  (20M+ show attendees, 1M court visitors, 80+ jurisdictions, 55 countries, 40 arenas).
- **Testimonials:** the prototype's testimonial cards used placeholder text, so they were replaced with real, attributed
  press quotes. The video testimonials (James Ketley, Amy Richards) need video links before they can be added back.
- **FAQ:** questions marked "Additional questions from the V3 prototype" in `src/data/faq.ts` have new answers to review.
- **Process steps / benefit captions** where the prototype had lorem ipsum (in `src/data/spaces.ts`) are new copy.

## Forms

`/get-started` posts JSON to `PUBLIC_FORM_ENDPOINT` (set it in Cloudflare build variables, e.g. a HubSpot, Formspree
or Worker URL). Without it, the form validates and shows the confirmation state but sends nothing. The footer
newsletter form shows a confirmation only, until a provider is connected.

## Deploys

Connect this repo to Cloudflare Workers Builds (Git integration) like V1: every PR gets a preview URL and `main`
deploys automatically. No domain is attached yet (`wrangler.jsonc`). Preview URLs are `noindex` via `public/_headers`.
