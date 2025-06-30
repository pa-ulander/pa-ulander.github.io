import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import CvRoles from '../components/CvRoles'

const CvPage = ({ data }) => {
  console.log('CvPage data:', data)

  return (
    <Layout>
      <SEO
        title='PA Ulander Resumé'
        description='Resumé of Web and System Developer PA Ulander'
      />
      <div className='cv-content'>
        <CvRoles cvHeaderData={data.cvImage} />
      </div>
    </Layout>
  )
}

export default CvPage

export const query = graphql`
  query {
    cvImage: file(relativePath: { eq: "cv/img.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, layout: CONSTRAINED)
      }
    }
  }
`
