const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('./src/templates/blogPost.js')

  return graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.nodes

    posts.forEach((post, idx) => {
      const previous = idx === posts.length - 1 ? null : posts[idx + 1]
      const next = idx === 0 ? null : posts[idx - 1]
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.fields.slug,
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
