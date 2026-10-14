import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://pa-ulander.github.io',
  trailingSlash: 'ignore',
  publicDir: './static',
  integrations: [mdx()],
})
