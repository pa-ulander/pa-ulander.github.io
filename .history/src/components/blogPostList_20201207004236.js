import React from 'react'
import { Link } from 'gatsby'

const BlogPostList = ({ data }) => {
  const posts = data
  return (
    <>
      <h1>Blog Posts</h1>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <Link className="card-link" to={post.slug} key={post.slug}>
            <div className="card" key={post.slug}>
              <h1 className="card-title" key={post.slug}>
                {title}
              </h1>
              <p className="card-date" key={post.slug}>
                {post.frontmatter.date}
              </p>
              <p className="card-description" key={post.slug}>
                {post.frontmatter.description}
              </p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default BlogPostList
