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
          <Link className="card-link" to={post.slug} key={`link-${post.slug}`}>
            <div className="card" key={post.slug}>
              <h1 className="card-title">{title}</h1>
              <p className="card-date">{post.frontmatter.date}</p>
              <p className="card-description">{post.frontmatter.description}</p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default BlogPostList
