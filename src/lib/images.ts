import type { ImageMetadata } from 'astro';

// All images live in src/assets/images and are referenced by file name, e.g. img('hero-home.jpg').
// Astro optimises them at build time (AVIF/WebP, responsive srcset).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export type ImageName = string;

export function img(name: ImageName): ImageMetadata {
  const mod = files[`../assets/images/${name}`];
  if (!mod) throw new Error(`Image not found: src/assets/images/${name}`);
  return mod.default;
}
