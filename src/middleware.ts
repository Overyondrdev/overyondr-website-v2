import { defineMiddleware } from 'astro:middleware';

// Headings never break at a hyphen: "Phone-Free" stays on one line instead of leaving "Phone-" at the end of
// a line. Hyphenated words in h1–h3 text are wrapped in <span class="nobr"> (white-space: nowrap in
// global.css), which keeps the font's own hyphen glyph (a non-breaking hyphen, U+2011, falls back to another
// font). Runs once per page at build time; tags and attributes are left untouched.
const heading = /<(h[1-3])\b([^>]*)>([\s\S]*?)<\/\1>/g;
const hyphenated = /[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+/gu;

const keepHyphenatedWords = (html: string) =>
  html.replace(heading, (_match, tag: string, attrs: string, inner: string) => {
    const text = inner
      .split(/(<[^>]*>)/)
      .map((part) => (part.startsWith('<') ? part : part.replace(hyphenated, '<span class="nobr">$&</span>')))
      .join('');
    return `<${tag}${attrs}>${text}</${tag}>`;
  });

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(keepHyphenatedWords(html), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
