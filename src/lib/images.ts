import type { ImageMetadata } from 'astro';

// All images live in src/assets/images (subfolders allowed) and are referenced by path relative to it,
// e.g. img('hero-home.jpg') or img('products/student-pouch.png'). Astro optimises them at build time.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export type ImageName = string;

export function img(name: ImageName): ImageMetadata {
  const mod = files[`../assets/images/${name}`];
  if (!mod) throw new Error(`Image not found: src/assets/images/${name}`);
  return mod.default;
}

export const hasImage = (name: string) => `../assets/images/${name}` in files;
