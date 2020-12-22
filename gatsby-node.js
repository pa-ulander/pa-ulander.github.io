const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/BlogTemplate.js')
  const postTemplate = path.resolve('./src/templates/PostTemplate.js')
  const cvTemplate = path.resolve('./src/templates/CvTemplate.js')
  const homeTemplate = path.resolve('./src/templates/HomeTemplate.js')

  return graphql(`
    {
      blog: allMdx(
        filter: { frontmatter: { templateKey: { eq: "blog-home" } } }
      ) {
        nodes {
          frontmatter {
            path
            slug
          }
        }
      }
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        nodes {
          frontmatter {
            date(formatString: "Do MMMM YYYY")
            title
            description
            templateKey
            path
            slug
          }
        }
      }
      cv: allMdx(filter: { frontmatter: { templateKey: { eq: "cv-page" } } }) {
        nodes {
          frontmatter {
            path
            slug
          }
        }
      }
      home: allMdx(
        filter: { frontmatter: { templateKey: { eq: "home-page" } } }
      ) {
        nodes {
          frontmatter {
            path
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const home = result.data.home.nodes[0]
    const blog = result.data.blog.nodes[0]
    const posts = result.data.posts.nodes
    const cv = result.data.cv.nodes[0]

    createPage({
      path: home.frontmatter.path,
      component: homeTemplate,
      context: {
        slug: home.frontmatter.slug,
      },
    })

    createPage({
      path: blog.frontmatter.path,
      component: blogTemplate,
      context: {
        slug: blog.frontmatter.slug,
      },
    })

    createPage({
      path: cv.frontmatter.path,
      component: cvTemplate,
      context: {
        slug: cv.frontmatter.slug,
      },
    })

    posts.forEach((post, idx) => {
      const previous = idx === posts.length - 1 ? null : posts[idx + 1]
      const next = idx === 0 ? null : posts[idx - 1]
      createPage({
        path: post.frontmatter.path,
        component: postTemplate,
        context: {
          slug: post.frontmatter.path,
          pathSlug: post.frontmatter.path,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
