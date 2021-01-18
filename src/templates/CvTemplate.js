import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout/'
import SEO from '../components/Seo'

const CvTemplate = ({ data, pageContext }) => {
  // console.log('data.mdx', data.mdx)
  // console.log('pageContext', pageContext)
  const { frontmatter, body } = data.mdx
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <MDXRenderer cvHeaderData={data.cvImage}>{body}</MDXRenderer>
    </Layout>
  )
}

export default CvTemplate

export const query = graphql`
  query cvQuery {
    mdx(frontmatter: { templateKey: { eq: "cv-page" } }) {
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
    cvImage: file(relativePath: { eq: "img.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
