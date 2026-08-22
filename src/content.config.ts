import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learning = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    topic: z.enum(['linux', 'network', 'automation', 'containerization']),
    date: z.coerce.date(),
    status: z.enum(['done', 'ongoing']),
    tags: z.array(z.string()).default([]),
    description: z.string(),
  }),
});

export const collections = { learning };
