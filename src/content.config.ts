import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

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

export const collections = {
    docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
    i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
    weeks: weeksCollection,
};