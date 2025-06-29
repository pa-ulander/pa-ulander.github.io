import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import BlogPostList from '../components/BlogPostList'
import SEO from '../components/Seo'

const HomeTemplate = () => {
  const data = useStaticQuery(graphql`
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
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout>
      <SEO title={siteTitle} description={siteDescription} />
      <h1>Home Template</h1>
      <BlogPostList data={data.allMdx?.nodes || []} />
    </Layout>
  )
}

export default HomeTemplate
