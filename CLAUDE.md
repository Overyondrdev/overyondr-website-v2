# overyondr.com V2 — instructions for Claude

This repository is the home of **V2**, the redesigned Yondr marketing site (the Loba redesign, built from the V3
prototype). V2 will become the public overyondr.com, so it lives here on its own, separate from V1. V1 (the faithful
Squarespace replica, the portal, the feedback tool and the sign-in) lives in
[Overyondrdev/overyondr-website-v1](https://github.com/Overyondrdev/overyondr-website-v1). Don't copy V1 code here
(V1's old `v2/` folder was removed in November 2026).

A static Astro site (`src/`, built into `dist/`) served by one small Cloudflare Worker (`worker/index.js`,
`wrangler.jsonc`). See README.md for the page map, design system and pre-launch content list.

**Read [docs/PLATFORM.md](https://github.com/Overyondrdev/overyondr-website-v1/blob/main/docs/PLATFORM.md) before
changing sign-in, deploys, DNS or Cloudflare settings**, and
[docs/OPERATIONS.md](https://github.com/Overyondrdev/overyondr-website-v1/blob/main/docs/OPERATIONS.md) for how
sessions work (both in the V1 repository).

## Where things deploy

- Worker **`overyondr-website-v2`**. Cloudflare Workers Builds is connected to this repository: every merge to
  `main` is built (`npm run build`) and deployed (`npx wrangler deploy`) automatically, live about a minute later.
- Host: **https://v2.overyondrdev.com**, a `custom_domain` route in `wrangler.jsonc` (moved here from the V1 Worker in
  November 2026).
- Do NOT add overyondr.com routes; that happens only at cutover, after sign-off.
- Keep `workers_dev` and `preview_urls` `false` in `wrangler.jsonc`.

## Sign-in (every request)

All of overyondrdev.com requires the **Yondr Google sign-in** (verified `@overyondr.com` Google Workspace accounts,
run by the `yondr-auth` Worker at `auth.overyondrdev.com`). Cloudflare Access is set to **Bypass** for these hosts,
so the Worker here is the only thing keeping V2 private:

- `assets.run_worker_first: true`: every request, static files included, goes through `worker/index.js` first.
- It checks the shared `yondr_session` cookie with `worker/yondr-session.js`, an **unchanged copy** of
  `auth/src/session.js` in the V1 repository (CI fails if they differ; don't edit or reformat it here). The public key
  is `YONDR_AUTH_PUBLIC_JWK` in `wrangler.jsonc`, the same value as every other site.
- Signed out: `GET`/`HEAD` → 302 to `https://auth.overyondrdev.com/login?return=<url>`; anything else → 401 JSON.
- Every host is private except those in `PUBLIC_HOSTS` (empty until the overyondr.com cutover).
- Local dev: `DEV_EMAIL="someone@overyondr.com"` in `.dev.vars` (git-ignored) signs you in, on localhost only.
  Never set it on a deployed Worker.

## What the Worker does

1. Sign-in (above).
2. `public/_redirects` and `public/_headers`: Cloudflare doesn't apply these files to responses a Worker returns, so
   the Worker imports them as text and applies them itself (exact paths and trailing `*`/`:splat` for redirects;
   `*` and `:placeholder` patterns for headers; no `!` detach). Trailing slashes (`/about/` → `/about`) and the 404
   page come from the ASSETS binding (`html_handling`, `not_found_handling`).
3. On `*.overyondrdev.com` (and localhost): `X-Robots-Tag: noindex` on every response, and the feedback widget
   `<script src="https://feedback.overyondrdev.com/widget.js" data-project="v2" data-toolbar="website" defer></script>` before `</body>` on
   HTML pages. Never on overyondr.com.

## How to ship a change

1. Branch from `main` (`design/<short-name>`, `content/<page>` or `fix/<thing>`).
2. Make the change, then run `npm ci` (first time), `npm run build` and `npm run check:links`. Both must pass.
   To see it as deployed (sign-in, redirects, widget): `npm run build`, then `npm run preview` (`wrangler dev`).
3. Run `npm run format` before committing (CI runs `prettier --check`).
4. Push the branch and open a PR into `main` using `.github/pull_request_template.md`. Wait for the **build** check.
5. **When the PR is ready, merge it yourself (squash)** — don't wait for the owner (owner's standing instruction,
   see OPERATIONS.md §2), unless the owner said otherwise for that piece of work. "Ready" means: checks green, branch
   up to date with `main`, docs updated, no open review questions. Then check the change live and say what you
   checked. Still ask first for: the overyondr.com cutover, attaching or moving domains, DNS changes, and anything
   the owner asked to approve.

Never force-push `main`. Never commit `dist/`, `node_modules/`, `.dev.vars`, `.env*`, `walkthrough/`, secrets or
personal email addresses (this repository is public).

## Auto-fix

`.github/workflows/autofix.yml`, `autofix-guard.yml` and `autofix-report.yml` let Yondr Ops fix objective bugs from
the feedback tool automatically (rules: V1's docs/OPERATIONS.md §6.3; flow, setup and security:
`Overyondrdev/yondr-ops` README "Auto-fix"). Only issues labelled `autofix` by the ops account (variable
`AUTOFIX_ACTORS`) start them; `worker/`, config, CI and dependencies are off limits to a fix. Keep `FORBIDDEN`
identical in `autofix.yml` and `autofix-guard.yml`.

## Rules

- Every page uses `Base.astro` with a `title` and `description`. Every image has `alt` text (`alt=""` if decorative).
- Use the tokens and surfaces in `src/styles/global.css`; don't hard-code new colours or font sizes.
- Images go in `src/assets/images` and are rendered with `<Img>`. Never load from `images.squarespace-cdn.com`
  or `static1.squarespace.com` (the build fails).
- Scoped component styles don't reach child components; use `:global()` for markup rendered by `<Img>` etc.
- Keep it accessible: semantic headings, visible focus, keyboard-operable menus/tabs/carousels,
  `prefers-reduced-motion` respected, works at 375px with no horizontal scroll.
- Never invent quotes, statistics or legal facts. Attribute quotes to a real source.
- No URL changes without a 301 in `public/_redirects`. URLs have no trailing slash.
- Plain Astro + CSS + small vanilla TS (plain JS in `worker/`). Ask before adding a dependency or a UI framework.
- Analytics tags are not on the dev site; they are added at cutover.
