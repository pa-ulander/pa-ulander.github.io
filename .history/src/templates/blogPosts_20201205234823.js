import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Container from '../components/container'

const blogPosts = ({ data, pageContext }) => {
  const { frontmatter, body } = data.mdx
  const { previous, next } = pageContext

  return (
    <Container>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <article>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      {previous == false ? null : (
          <>
          {previous && (
              <Link to={previous.fields.slug}
          )}
      )}
    </Container>
  )
}

export default blogPosts

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`