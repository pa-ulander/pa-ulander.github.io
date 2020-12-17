const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.createPages = ({ actions, graphql, reporting}) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('./src/templates/BlogTemplate.js')
  const postTemplate = path.resolve('./src/templates/PostTemplate.js')
  const cvTemplate = path.resolve('./src/templates/CvTemplate.js')

  return graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        nodes {
          frontmatter {
            date(formatString: "Do MMMM YYYY")
            title
            description
            templateKey
            featuredText
            path
            slug
            featuredImage {
              id
              childImageSharp {
                fluid(maxWidth: 800) {
                  src
                }
              }
            }
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
