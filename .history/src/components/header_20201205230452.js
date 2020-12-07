import React from 'react'

const Header = () => {
  return (
    <div className="stick-nav">
      <a href="/" className="sticky-nav-button">
        Home
      </a>
      <div>
        <a href="/" className="sticky-nav-button">
          Blog
        </a>
        <a href="/" className="sticky-nav-button">
          Contact
        </a>
        <a href="/" className="sticky-nav-button">
          About Us
        </a>
      </div>
    </div>
  )
}

export default Header
