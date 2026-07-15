import { z, defineCollection } from 'astro:content';

const readingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    week: z.number().optional(),
  }),
});

export const collections = {
  readings: readingsCollection,
};
