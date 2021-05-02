module.exports = {
  pathPrefix: '',
  siteMetadata: {
    title: 'Yet another developers personal website',
    author: {
      name: 'pa@kabelkultur.se',
      summary: 'A very nice fellow that created this blog',
    },
    description: 'Learning Gatsby and other things',
    siteUrl: 'https://localhost:8000',
    social: {
      email: 'mailto:pa@kabelkultur.se',
      linkedin: 'https://linkedin.com/in/paulander',
      twitter: 'https://twitter.com/pa_ulander',
      github: 'https://github.com/pa-ulander',
    },
    actions: {
      download: '/downloads/download-test.txt',
      print: '#',
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/markdown/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/markdown/cv`,
        name: 'cv',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/markdown/home`,
        name: 'home',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
              backgroundColor: 'none',
              disableBgImage: true,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
              backgroundColor: 'none',
              disableBgImage: true,
              linkImagesToOriginal: false,
            },
          },
        ],
        remarkPlugins: [require('remark-grid-tables')],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
}
