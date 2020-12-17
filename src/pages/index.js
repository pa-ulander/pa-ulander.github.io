import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogPostList from '../components/BlogPostList'
import SEO from '../components/Seo'

const Home = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout>
      <SEO title={siteTitle} description={siteDescription} />
      <BlogPostList data={data.allMdx.nodes} />
    </Layout>
  )
}

export default Home

export const HomeQuery = graphql`
  query getPostsAndMetadata {
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      nodes {
        excerpt
        slug
        frontmatter {
          date(formatString: "Do MMMM YYYY")
          title
          slug
          path
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }          
        }
      }
    }
  }
`
