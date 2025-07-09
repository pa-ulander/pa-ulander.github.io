// Content utilities for articles
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return readingTime === 1 ? '1 min read' : `${readingTime} min read`
}

export const extractHeadings = (mdxContent) => {
  // Extract headings for table of contents
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')

    headings.push({
      level,
      text,
      id,
    })
  }

  return headings
}

export const getArticleMetadata = (frontmatter, body) => {
  const readingTime = calculateReadingTime(body)
  const headings = extractHeadings(body)
  const wordCount = body.trim().split(/\s+/).length

  return {
    readingTime,
    headings,
    wordCount,
    publishDate: frontmatter.date,
    lastModified: frontmatter.lastModified || frontmatter.date,
    tags: frontmatter.tags || [],
    description: frontmatter.description,
  }
}

// Component for article metadata display
import React from 'react'

export const ArticleMetadata = ({ metadata }) => (
  <div className='article-meta'>
    <div className='meta-item'>
      <span className='icon'>📅</span>
      <span>{metadata.publishDate}</span>
    </div>
    <div className='meta-item'>
      <span className='icon'>📖</span>
      <span>{metadata.readingTime}</span>
    </div>
    <div className='meta-item'>
      <span className='icon'>📝</span>
      <span>{metadata.wordCount} words</span>
    </div>
    {metadata.tags.length > 0 && (
      <div className='meta-item'>
        <span className='icon'>🏷️</span>
        <span>{metadata.tags.slice(0, 2).join(', ')}</span>
      </div>
    )}
  </div>
)

// Table of contents component
export const TableOfContents = ({ headings }) => {
  if (!headings || headings.length === 0) return null

  return (
    <div className='article-toc'>
      <h3>Table of Contents</h3>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
