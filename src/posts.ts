import { getCollection } from 'astro:content'

// Newest first; posts without a date go last.
export const getPosts = async () =>
  (await getCollection('pages', ({ data }) => data.published && data.templateKey === 'blog-post')).sort(
    (left, right) => (right.data.date?.getTime() ?? 0) - (left.data.date?.getTime() ?? 0),
  )
