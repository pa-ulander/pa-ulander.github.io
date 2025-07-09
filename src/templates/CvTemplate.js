import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import CvRoles from '../components/CvRoles'

const CvTemplate = ({ data }) => {
  console.log('CvTemplate data:', data)

  if (!data || !data.mdx) {
    return (
      <Layout>
        <SEO title='CV' />
        <div>Loading CV content...</div>
      </Layout>
    )
  }

  const { frontmatter } = data.mdx

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div className='cv-content'>
        <CvRoles cvHeaderData={data.cvImage} />
      </div>
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
    cvImage: file(relativePath: { eq: "cv/img.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, layout: CONSTRAINED)
      }
    }
  }
`
