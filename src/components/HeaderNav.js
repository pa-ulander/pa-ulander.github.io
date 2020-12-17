import React from 'react'
// import { Link } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import ToggleDarkMode from './ToggleDarkMode'

const HeaderNav = () => {
  const darkMode = useDarkMode(true)

  return (
    <div className="sticky-nav">
      <a href="/" className="sticky-nav-button">
        Home
      </a>
      <div className="sticky-nav-stack">
        <a href="/blog" className="sticky-nav-button">
          Blog
        </a>
        <a href="/cv" className="sticky-nav-button">
          CV
        </a>
      </div>
      <ToggleDarkMode checked={darkMode.value} onChange={darkMode.toggle} />
    </div>
  )
}

export default HeaderNav
