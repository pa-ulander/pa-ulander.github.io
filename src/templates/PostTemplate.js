import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const PostTemplate = ({ data, children }) => {
  const post = data.mdx
  const { previous, next } = data

  console.log('PostTemplate data:', data)
  console.log('PostTemplate children:', children)

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />

      <article className='blog-post'>
        {/* Featured Image */}
        {post.frontmatter.featuredImage && (
          <div className='featured-image'>
            <GatsbyImage
              image={
                post.frontmatter.featuredImage.childImageSharp.gatsbyImageData
              }
              alt={post.frontmatter.title}
              className='featured-image-gatsby'
            />
          </div>
        )}

        {/* Post Header */}
        <header className='post-header'>
          <h1 className='post-title'>{post.frontmatter.title}</h1>
          <p className='post-date'>{post.frontmatter.date}</p>
          {post.frontmatter.featuredText && (
            <p className='post-featured-text'>
              {post.frontmatter.featuredText}
            </p>
          )}
        </header>

        {/* Post Content - MDX Body */}
        <div className='post-content'>
          <MDXProvider>{children}</MDXProvider>
        </div>

        {/* Post Footer with Tags */}
        {post.frontmatter.tags && (
          <footer className='post-footer'>
            <div className='post-tags'>
              {post.frontmatter.tags.map((tag, index) => (
                <span key={index} className='tag'>
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      {/* Navigation to Previous/Next Posts */}
      <nav className='post-navigation'>
        <ul>
          <li>
            {previous && (
              <Link to={previous.frontmatter.path} rel='prev'>
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.path} rel='next'>
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($pathSlug: String!, $previous: String, $next: String) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        description
        featuredText
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              height: 630
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    }
    previous: mdx(frontmatter: { path: { eq: $previous } }) {
      frontmatter {
        title
        path
      }
    }
    next: mdx(frontmatter: { path: { eq: $next } }) {
      frontmatter {
        title
        path
      }
    }
  }
`
