import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import BlogPostList from '../components/BlogPostList'

const BlogTemplate = ({ data, children }) => {
  console.log('BlogTemplate data:', data)
  console.log('BlogTemplate children:', children)

  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const blogPageData = data.mdx // The blog page itself
  const blogPosts = data.allMdx.nodes // All blog posts

  return (
    <Layout>
      <SEO
        title={blogPageData.frontmatter.title}
        description={blogPageData.frontmatter.description}
      />

      {/* Render the blog page content */}
      <div className='blog-page-content'>
        <h1>{blogPageData.frontmatter.title}</h1>
        {children}
      </div>

      {/* Render the list of blog posts */}
      <BlogPostList data={blogPosts} />
    </Layout>
  )
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogPageQuery($slug: String!) {
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
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date(formatString: "Do MMMM YYYY")
        featuredText
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
      }
    }
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      nodes {
        slug
        excerpt(pruneLength: 160)
        frontmatter {
          date(formatString: "Do MMMM YYYY")
          title
          description
          templateKey
          featuredText
          path
          tags
          featuredImage {
            id
            childImageSharp {
              gatsbyImageData(width: 800, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
