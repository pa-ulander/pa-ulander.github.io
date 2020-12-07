import React from 'react'
import { Link } from 'gatsby'

const BlogPostList = ({ data }) => {
  const posts = data
  return (
    <>
      <h1>Blog Posts</h1>
      {posts.map((post, idx) => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <Link className="card-link" to={post.slug} key={`card-link-${idx}`}>
            <div className="card" key={`card-${idx}`}>
              <h1 className="card-title" key={`card-title-${idx}`}>{title}</h1>
              <p className="card-date"key={`card-date-${idx}`}>{post.frontmatter.date}</p>
              <p className="card-description" key={`card-description-${idx}`}>{post.frontmatter.description}</p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default BlogPostList
