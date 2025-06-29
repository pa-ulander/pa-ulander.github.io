import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/'
import SEO from '../components/Seo'

const CvTemplate = ({ data, children }) => {
  // console.log('data.mdx', data.mdx)
  // console.log('pageContext', pageContext)
  const { frontmatter } = data.mdx
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      {children}
    </Layout>
  )
}

export default CvTemplate

export const query = graphql`
  query cvQuery {
    mdx(frontmatter: { templateKey: { eq: "cv-page" } }) {
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
        gatsbyImageData(width: 600, layout: CONSTRAINED)
      }
    }
  }
`
