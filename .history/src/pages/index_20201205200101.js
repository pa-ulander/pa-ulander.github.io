import React from 'react'
import { graphql } from 'gatsby'

const Home = ({ data }) => {
  console.log(data)
  const siteTitle = data.site.siteMetatdata.title
  const siteDescription = data.site.siteMetatdata
  const post = data.mdx.nodes

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default Home

export const pageQuery = graphql`
  {
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        slug
        frontmatter {
          date(formatString: "Do MMMM YYYY")
          title
          description
        }
      }
    }
  }
`
