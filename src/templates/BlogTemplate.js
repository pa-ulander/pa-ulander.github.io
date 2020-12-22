import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import BlogPostList from '../components/BlogPostList'

const Blog = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout>
      <SEO title={siteTitle} description={siteDescription} />
      <BlogPostList data={data.allMdx.nodes} />
    </Layout>
  )
}

export default Blog

export const PageQuery = graphql`
query getPosts {
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
  allMdx(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
    nodes {
      slug
      frontmatter {
        date(formatString: "Do MMMM YYYY")
        title
        description
        templateKey
        featuredText
        path
        featuredImage {
          id
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