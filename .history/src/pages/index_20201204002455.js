import React from 'react'
import { graphql } from 'gatsby'

const Home = () => {
  return <h1>Hello world</h1>
}

export default Home


export const pageQuery = graphql`{
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
}`