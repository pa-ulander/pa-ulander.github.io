import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { GatsbyImage } from 'gatsby-plugin-image'

const PostTemplate = ({ data, pageContext, children }) => {
  const { frontmatter } = data.mdx
  const { previous, next } = pageContext
  return (
    <Layout>
      {/* Featured Image */}
      {frontmatter.featuredImage && (
        <div className='featured-image'>
          <GatsbyImage
            image={frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={frontmatter.title}
            className='featured-image-gatsby'
          />
        </div>
      )}

      <h1 className='post-heading'>{frontmatter.title}</h1>
      <p className='post-date'>{frontmatter.date}</p>
      <p className='post-date'>{frontmatter.featuredText}</p>
      <article className='post-body'>
        {children}
        {/* Post Footer with Tags */}
        {frontmatter.tags && (
          <footer className='post-footer'>
            <div className='post-tags'>
              {frontmatter.tags.map((tag, index) => (
                <span key={index} className='tag'>
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
      {previous === false ? null : (
        <>
          {previous && (
            <Link to={`${previous.frontmatter.path}`}>
              <button className='previous-next-button'>
                {previous.frontmatter.title}
              </button>
            </Link>
          )}
        </>
      )}
      {next === false ? null : (
        <>
          {next && (
            <Link to={`${next.frontmatter.path}`}>
              <button className='previous-next-button'>
                {next.frontmatter.title}
              </button>
            </Link>
          )}
        </>
      )}
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(frontmatter: { path: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        description
        templateKey
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
  }
`
