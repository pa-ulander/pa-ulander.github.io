import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'

const PostTemplate = ({ data, pageContext }) => {
  console.log('data', data)
  console.log('pageContext', pageContext)
  const { frontmatter, body } = data.mdx
  const { previous, next } = pageContext
  return (
    <Layout>
      <h1 className="post-heading">{frontmatter.title}</h1>
      <p className="post-date">{frontmatter.date}</p>
      <article className="post-body">
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      {previous === false ? null : (
        <>
          {previous && (
            <Link to={`${previous.frontmatter.path}`}>
              <button className="previous-next-button">
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
              <button className="previous-next-button">
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
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`
