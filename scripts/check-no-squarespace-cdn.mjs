// Fails the build if any built file still loads assets from Squarespace,
// which would break once the Squarespace subscription ends.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PATTERN = /(images|static1)\.squarespace(-cdn)?\.com/;
const offenders = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(html|css|js|xml|json)$/.test(e.name) && PATTERN.test(await readFile(p, 'utf8')))
      offenders.push(p);
  }
}
await walk('dist');
if (offenders.length) {
  console.error('Squarespace CDN references found:\n' + offenders.join('\n'));
  process.exit(1);
}
console.log('OK: no Squarespace CDN references in dist/');
