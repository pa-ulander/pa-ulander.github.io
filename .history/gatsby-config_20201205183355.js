module.exports = {
  siteMetadata: {
    title: 'A Freelance developers blog',
    author: {
      name: 'PA',
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
  ],
}