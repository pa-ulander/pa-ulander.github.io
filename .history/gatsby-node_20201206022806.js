const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.createPages = ({ action, graphql }) => {
  const createPage = actions
  const blogPostTemplate = path.resolve('./scr/templates/blogPosts.js')

  return grapql(`
  {
      allMdx(
          sort: {fields: [frontmatter__date], order: DESC}
          filter: {frontmatter: {published: {eq: true}}}
      ){
          nodes {
              fields {
                  slug
              }
              frontametter {
                  title
              }
          }
      }
  }`).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.AllMdx.nodes

    posts.forEach((post, idx) => {
        const previous = idx === post.length -1 ? null : post[idx +1]
        const next = idx === 0 ? null : post[idx -1]
        createPage({
            path: post.fields.slug,
            component: blogPostTemplate,
            context: {
                slug: post.fields.slug,
                previous,
                next,
            }
        })
    })

  })
}


exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions
    if (node.internal.type === 'Mdx') {
        const value = createFilePath({node, getNode})
    }
}

