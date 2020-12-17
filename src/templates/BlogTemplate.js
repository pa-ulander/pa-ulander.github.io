import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const BlogTemplate = ({ data }) => {
  const posts = data

  return (
    <div className="cards">
      templates/blog-home-page.js
      {posts.map((post, idx) => {
        const title = post.frontmatter.title || post.fields.slug
        let featuredImgFluid =
          post.frontmatter.featuredImage.childImageSharp.fluid
        // console.log('post', post.frontmatter.featuredImage)
        return (
          <Link
            className="card-link"
            to={post.fields.slug}
            key={`card-link-${idx}`}>
            <div className="card" key={`card-${idx}`}>
              <div className="card-image-wrap">
                <Img fluid={featuredImgFluid} className="card-image" />
              </div>
              <h1 className="card-title" key={`card-title-${idx}`}>
                {title}
              </h1>
              <p className="card-description" key={`card-description-${idx}`}>
                {post.frontmatter.description}
              </p>
              <p className="card-date" key={`card-date-${idx}`}>
                {post.frontmatter.date}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default BlogTemplate

// export const query = graphql`
//   {
//     allMdx(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: {
//         frontmatter: {
//           published: { eq: true }
//           templateKey: { eq: "blog-post" }
//         }
//       }
//     ) {
//       nodes {
//         frontmatter {
//           title
//           templateKey
//           slug
//           path
//           featuredText
//           featuredImage {
//             childImageSharp {
//               fluid(maxWidth: 500, quality: 50) {
//                 src
//               }
//             }
//           }
//           tags
//         }
//         fields {
//           slug
//         }
//       }
//     }
//   }
// `
