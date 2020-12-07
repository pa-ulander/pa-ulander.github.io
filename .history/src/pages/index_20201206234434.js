import React from 'react'
import { Link, graphql } from 'gatsby'
import Container from '../components/container'
import BlogPostList from '../components/blogPostList'
import SEO from '../components/seo'

const Home = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMdx.nodes

  return (
    <Container>
      <SEO title={siteTitle} description={siteDescription} />
      <h1>Blog Posts</h1>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <Link className="card-link" to={post.slug}>
            <div className="card" key={post.slug}>
              <h1 className="card-title">{title}</h1>
              <p className="card-date">{post.frontmatter.date}</p>
              <p className="card-description">{post.frontmatter.description}</p>
            </div>
          </Link>
        )
      })}
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
