import { graphql } from 'gatsby'
import React from 'react'

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
