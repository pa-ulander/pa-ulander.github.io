import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const BlogPostList = ({ data }) => {
  const posts = data

  return (
    <div className="cards">
      {posts.map((post, idx) => {
        const title = post.frontmatter.title || post.fields.slug
        let featuredImgFluid =
          post.frontmatter.featuredImage.childImageSharp.fluid
        // console.log('post', post.frontmatter.featuredImage)
        return (
          <Link
            className="card-link"
            to={post.frontmatter.path}
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

export default BlogPostList
