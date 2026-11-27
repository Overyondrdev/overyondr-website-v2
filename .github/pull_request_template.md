## What changed

## Pages / URLs affected

## Screenshots

<!-- Desktop and 375px mobile, before/after if it's a visual change. -->

## Checks

- [ ] `npm run build` passes locally (type check + build + CDN check)
- [ ] Checked locally (`npm run dev`, or `npm run build && npm run preview`) on desktop and at 375px with no horizontal scroll
- [ ] Keyboard-only pass: visible focus, menus and carousels operable
- [ ] Respects reduced motion (animations off with `prefers-reduced-motion`)
- [ ] New URLs have a title and meta description; changed URLs have a 301 in `public/_redirects`
- [ ] Every new image has meaningful `alt` text (or `alt=""` if decorative)
- [ ] Worker or `wrangler.jsonc` changed: signed-out visits still redirect to `auth.overyondrdev.com/login` (`npx wrangler dev` without `.dev.vars`)
