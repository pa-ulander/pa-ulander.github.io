module.exports = {
  pathPrefix: '',
  siteMetadata: {
    title: 'Yet another freelance developers blog',
    author: {
      name: 'pa@kabelkultur.se',
      summary: 'A very nice fellow that created this blog',
    },
    description: 'Learning Gatsby and other things',
    siteUrl: 'https://localhost:8000',
    social: {
      twitter: 'pa_ulander',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-remark-images',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ],
}
