#!/usr/bin/env node
// Secret scan (run in CI): fails if a tracked file looks like it contains a credential — an API key, token,
// webhook URL or private key. This repository is public; secrets belong in Worker secrets or `.dev.vars`.
// A line that must keep a look-alike (e.g. a documented fake) can end with the comment `secret-scan: allow`.
// Usage: node scripts/secret-scan.mjs [dir]   (defaults to the repository root)
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const RULES = [
  ['Anthropic API key', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
  ['OpenAI-style API key', /\bsk-(?:proj-)?[A-Za-z0-9]{32,}/],
  [
    'Resend API key',
    /\bre_[A-Za-z0-9]{6,}_[A-Za-z0-9]{16,}|\bre_(?=[A-Za-z0-9]*\d)(?=[A-Za-z0-9]*[A-Z])[A-Za-z0-9]{20,}/,
  ],
  ['GitHub token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}|\bgithub_pat_[A-Za-z0-9_]{40,}/],
  ['Private key', /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/],
  ['Private JWK ("d" member)', /"d"\s*:\s*"[A-Za-z0-9_-]{40,}"/],
  ['Slack webhook URL', /hooks\.slack\.com\/services\/T[A-Z0-9]+\/[A-Z0-9]+\/[A-Za-z0-9]+/],
  ['Slack token', /\bxox[abprs]-[A-Za-z0-9-]{20,}/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  // Cloudflare API tokens are 40 characters of [A-Za-z0-9_-]. Only flagged next to a token/key/secret word and when
  // the value mixes upper case, lower case and digits, so git SHAs and hashes (lowercase hex) don't match.
  [
    'Cloudflare-style API token',
    /(?:token|api[_-]?key|secret|bearer)[A-Za-z_-]*["']?\s*[:=]?\s*["']?(?:Bearer\s+)?([A-Za-z0-9_-]{40})(?![A-Za-z0-9_-])/gi,
    (v) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v),
  ],
];

const ALLOW = /secret-scan:\s*allow/;
const SELF = 'scripts/secret-scan.mjs';

/** Problems found in one file's text: [{ line, rule }]. */
export function scanText(text) {
  const found = [];
  text.split('\n').forEach((line, i) => {
    if (ALLOW.test(line)) return;
    for (const [rule, re, check] of RULES) {
      const hit = check ? [...line.matchAll(re)].some((m) => check(m[1])) : re.test(line);
      if (hit) found.push({ line: i + 1, rule });
    }
  });
  return found;
}

function trackedFiles(root) {
  return execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    .split('\0')
    .filter(Boolean);
}

export function scanRepo(root) {
  const problems = [];
  let scanned = 0;
  for (const f of trackedFiles(root)) {
    if (f === SELF) continue;
    const p = join(root, f);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue; // deleted in the working tree
    }
    if (!st.isFile() || st.size > 5 * 1024 * 1024) continue;
    const buf = readFileSync(p);
    if (buf.includes(0)) continue; // binary
    scanned++;
    for (const { line, rule } of scanText(buf.toString('utf8')))
      problems.push(`${f}:${line}: looks like a secret (${rule})`);
  }
  return { problems, scanned };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = process.argv[2] || fileURLToPath(new URL('..', import.meta.url));
  const { problems, scanned } = scanRepo(root);
  if (problems.length) {
    console.error(problems.map((p) => '✗ ' + p).join('\n'));
    console.error(
      'Move secrets to Worker secrets / .dev.vars and rotate them. A documented fake can end with `secret-scan: allow`.',
    );
    process.exit(1);
  }
  console.log(`secret-scan: ${scanned} tracked files OK`);
}
