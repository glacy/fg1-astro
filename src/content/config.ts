import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const linkItemSchema = z.object({
  text: z.string(),
  url: z.string(),
  icon: z.string(),
});

const weeksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.number(),
    title: z.string(),
    image: z.string(),
    objetivos: z.array(z.string()),
    contenidos: z.array(z.string()),
    consignas: z.array(linkItemSchema),
    evaluaciones: z.array(linkItemSchema),
    recursos: z.array(linkItemSchema).optional(),
  }),
});

const docsMetadata = z.object({
  week: z.number().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  readingTime: z.number().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']).optional(),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema({ extend: docsMetadata }) }),
  weeks: weeksCollection,
};
