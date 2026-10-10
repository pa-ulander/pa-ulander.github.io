import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const pages = defineCollection({
  loader: glob({ base: './markdown', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date().nullable(),
      featuredImage: image().optional(),
      featuredText: z.string().optional(),
      pageType: z.string(),
      templateKey: z.enum(['home-page', 'blog-home', 'blog-post', 'cv-page']),
      published: z.boolean(),
      slug: z.string(),
      path: z.string(),
      tags: z.array(z.string()).default([]),
    }),
})

export const collections = { pages }