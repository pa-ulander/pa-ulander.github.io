import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Container from '../components/container'

const blogPosts = () => {}

export default blogPosts

export const query = graphql`
  query POstBySlug($slug: String!) {
    mdax(fileds: { slug: { eq: $slug } })
  }
`
