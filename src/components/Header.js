import React from 'react'

const Header = () => {
  return (
    <div className="sticky-nav">
      <a href="/" className="sticky-nav-button">
        Home
      </a>
      <div className="sticky-nav-stack">
        <a href="/" className="sticky-nav-button">
          Blog
        </a>
        <a href="/" className="sticky-nav-button">
          CV
        </a>
      </div>
    </div>
  )
}

export default Header
