import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learning = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['linux', 'networking', 'docker', 'cloud']).default('linux'),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { learning };
