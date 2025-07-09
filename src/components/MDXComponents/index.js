import React from 'react'
import { Link } from 'gatsby'

// Custom heading component with anchor links
const Heading = ({ level, children, ...props }) => {
  const Tag = `h${level}`
  const id = children?.toString().toLowerCase().replace(/\s+/g, '-')

  return (
    <Tag id={id} {...props}>
      {children}
      <a
        href={`#${id}`}
        className='anchor-link'
        aria-label='Link to this section'
      >
        #
      </a>
    </Tag>
  )
}

// Custom blockquote with enhanced styling
const Blockquote = ({ children, ...props }) => (
  <blockquote className='enhanced-blockquote' {...props}>
    <div className='quote-icon'>💬</div>
    {children}
  </blockquote>
)

// Custom link component that handles internal vs external links
const CustomLink = ({ href, children, ...props }) => {
  const isInternal = href && href.startsWith('/')
  const isAnchor = href && href.startsWith('#')

  if (isInternal || isAnchor) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='external-link'
      {...props}
    >
      {children}
      <span className='external-icon'>↗</span>
    </a>
  )
}

// Custom code block with syntax highlighting support
const CodeBlock = ({ children, className, ...props }) => {
  const language = className?.replace('language-', '')

  return (
    <div className='code-block-wrapper'>
      {language && <div className='code-language'>{language}</div>}
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

// Custom list item with enhanced styling
const ListItem = ({ children, ...props }) => (
  <li className='enhanced-list-item' {...props}>
    <span className='list-bullet'>•</span>
    <span className='list-content'>{children}</span>
  </li>
)

// Export all components
export const MDXComponents = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  blockquote: Blockquote,
  a: CustomLink,
  pre: CodeBlock,
  li: ListItem,
  // Add more custom components as needed
}
