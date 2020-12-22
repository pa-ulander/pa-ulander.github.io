import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'

const CvTemplate = ({ data, pageContext }) => {
  console.log('data', data)
  console.log('pageContext', pageContext)
  const { frontmatter, body } = data.mdx
  return (
    <Layout>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

export default CvTemplate

export const query = graphql`
query cvQuery {
    mdx(frontmatter: {templateKey: {eq: "cv-page"}}) {
      body
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        description
        published
        templateKey
        title
        tags
        slug
        path
        pageType
        featuredText
      }
    }
  }
  
`
