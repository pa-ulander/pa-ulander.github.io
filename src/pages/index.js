import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/Container'
import BlogPostList from '../components/BlogPostList'
import SEO from '../components/Seo'

const Home = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Container>
      <SEO title={siteTitle} description={siteDescription} />
      <BlogPostList data={data.allMdx.nodes} />
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        slug
        frontmatter {
          date(formatString: "Do MMMM YYYY")
          title
          description
        }
      }
    }
  }
`
