import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts (Markdown). File name = URL slug: src/content/blog/foo.md -> /blog/foo
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(['Schools', 'Live Events', 'Work', 'Research', 'News']),
      image: image(),
      imageAlt: z.string(),
      featured: z.boolean().default(false),
    }),
});

// School phone-ban legislation, one file per state or city: -> /school-phone-bans/<slug>
const states = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/states' }),
  schema: z.object({
    name: z.string(),
    abbr: z.string(),
    policy: z.string(),
    law: z.string().optional(),
    effective: z.string().optional(),
    summary: z.string(),
    category: z.enum(['bell-to-bell', 'instructional', 'restrictions', 'other']),
    sourceUpdated: z.string().optional(),
  }),
});

// Legal pages (privacy, terms).
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updated: z.string().optional(),
  }),
});

// Standalone content pages migrated from the live site (Home Tray, International, Funding, ...).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string().optional(),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    cta: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});

export const collections = { blog, states, legal, pages };
