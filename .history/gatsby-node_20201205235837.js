const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.createPages = ({ action, graphql }) => {
  const createPage = actions
  const blogPostTemplate = path.resolve('./scr/templates/blogPosts.js')
}
