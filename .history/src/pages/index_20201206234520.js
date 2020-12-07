import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import BlogPostList from '../components/blogPostList'
import SEO from '../components/seo'

const Home = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Container>
      <SEO title={siteTitle} description={siteDescription} />
      <BlogPostList />
    </Container>
  )
}

export default Home

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        social {
          twitter
        }
        siteUrl
        description
        author {
          name
          summary
        }
      }
    }
  }
`