# Security policy

## Reporting a vulnerability

Please report security problems **privately**, never in a public issue, pull request or discussion (this repository
is public).

1. Open the repository's **Security** tab on GitHub.
2. Choose **Report a vulnerability** (GitHub private vulnerability reporting).
3. Describe the problem, how to reproduce it and what it could expose.

Only the repository owners see the report. We aim to acknowledge it within 3 working days and will keep you updated
in the advisory until it is fixed. Please give us a reasonable time to fix it before disclosing anything, and don't
access, change or keep data that isn't yours while testing.

## Scope

In scope:

- This repository's site: `v2.overyondrdev.com` (and, after the switch-over, the redesigned overyondr.com).

Every `*.overyondrdev.com` host is private behind the Yondr Google sign-in (`auth.overyondrdev.com`); a way to reach
a page, file or API without a valid sign-in is always in scope. Also in scope: cross-site request forgery, injection
or cross-site scripting, exposure of secrets, and anything in this repository's code or workflows that could be
abused.

Out of scope: the public overyondr.com site while it is still served by Squarespace, third-party services
(Google, Cloudflare, GitHub, HubSpot and others; report to them directly), denial of service, and social engineering.

## Secrets

Secrets live in Cloudflare Worker secrets or local `.dev.vars` files, never in this repository. CI fails if a tracked
file looks like it holds an API key, token or private key (`scripts/secret-scan.mjs`). If you find one, report it as
above; it will be rotated.
