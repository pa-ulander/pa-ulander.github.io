import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Container from '../components/container'

const blogPosts = () => {}

export default blogPosts

export const query = graphql`
  query POstBySlug($slug: String!) {
    mdx(fileds: { slug: { eq: $slug } }){
        body
        frontmatter
        date(formatString: "Do MMMM YYYY")
    }
  }
`
