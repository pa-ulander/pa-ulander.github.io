import React from 'react'
import { Link } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import ToggleDarkMode from './ToggleDarkMode'

const HeaderNav = () => {
  const darkMode = useDarkMode(true)

  return (
    <div className="sticky-nav">
      <Link to={`/`} className="sticky-nav-button">
        Home
      </Link>
      <div className="sticky-nav-stack">
        <Link to={`/blog`} className="sticky-nav-button">
          Blog
        </Link>
        <Link to={`/cv`} className="sticky-nav-button">
          Cv
        </Link>
      </div>
      <ToggleDarkMode checked={darkMode.value} onChange={darkMode.toggle} />
    </div>
  )
}

export default HeaderNav
