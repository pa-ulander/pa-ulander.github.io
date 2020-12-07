const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.createPages = ({ action, graphql }) => {
  const createPage = actions
  const blogPostTemplate = path.resolve('./scr/templates/blogPosts.js')

  return grapql`
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
  }
  `
}
