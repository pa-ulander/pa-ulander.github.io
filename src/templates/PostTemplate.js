import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

const PostTemplate = ({ data, pageContext, children }) => {
  console.log('blogpost data', data)
  console.log('pageContext', pageContext)
  const { frontmatter } = data.mdx
  const { previous, next } = pageContext
  return (
    <Layout>
      <h1 className='post-heading'>{frontmatter.title}</h1>
      <p className='post-date'>{frontmatter.date}</p>
      <article className='post-body'>{children}</article>
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
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        description
        templateKey
        featuredText
      }
    }
  }
`
