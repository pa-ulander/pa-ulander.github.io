import React from 'react'
// import { graphql } from 'gatsby'
import Layout from './Layout'
import BlogPostList from './BlogPostList'
import SEO from '../components/Seo'

const HomeTemplate = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout>
      <SEO title={siteTitle} description={siteDescription} />
      haome template
      <BlogPostList data={data.allMdx.nodes} />
    </Layout>
  )
}

export default HomeTemplate

// export const pageQuery = graphql`
//   query getHomePageData {
//     site {
//       siteMetadata {
//         title
//         social {
//           twitter
//         }
//         siteUrl
//         description
//         author {
//           name
//           summary
//         }
//       }
//     }
//     allMdx(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { pageType: { nin: "cv" } } }
//     ) {
//       nodes {
//         excerpt
//         slug
//         frontmatter {
//           date(formatString: "Do MMMM YYYY")
//           title
//           description
//           featuredImage {
//             childImageSharp {
//               fluid(maxWidth: 800) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }          
//         }
//       }
//     }
//   }
// `
