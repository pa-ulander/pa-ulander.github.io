import React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/Layout'

const Post = ({ data, pageContext }) => {
  console.log('data', data)
  console.log('pageContext', pageContext)
  const { frontmatter, body } = data.mdx
  const { previous, next } = pageContext
  return (
    <Layout>
      templates/blog-post-page.js
      <h1 className="post-heading">{frontmatter.title}</h1>
      <p className="post-date">{frontmatter.date}</p>
      <article className="post-body">
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      {previous === false ? null : (
        <>
          {previous && (
            <Link to={`${previous.fields.slug}`}>
              <button className="previous-next-button">{previous.frontmatter.title}</button>
            </Link>
          )}
        </>
      )}
      {next === false ? null : (
        <>
          {next && (
            <Link to={`${next.fields.slug}`}>
              <button className="previous-next-button">{next.frontmatter.title}</button>
            </Link>
          )}
        </>
      )}
    </Layout>
  )
}

export default Post

// export const query = graphql`
//   query getPost($slug: String!) {
//     mdx(fields: {slug: {eq: $slug}}) {
//       body
//       frontmatter {
//         title
//         date(formatString: "Do MMMM YYYY")
//       }
//     }
//   }
// `
