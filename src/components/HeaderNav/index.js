import React from 'react'
import { Link } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import ToggleDarkMode from '../ToggleDarkMode'
import PrintIcon from '../PrintIcon'
import MediaQueryUtil from '../devutils/MediaQueryUtil'
import './HeaderNav.scss'

const HeaderNav = () => {
  const links = [
    { url: `/`, name: `HOME` },
    { url: `/blog`, name: `BLOG` },
    { url: `/cv`, name: `CV` },
  ]

  const setActive = (url) => {
    // patch location.pathname not being available to node during build
    const curUrl = typeof window !== 'undefined' ? window.location.pathname : ''
    return url === curUrl ? 'navButton__active' : null
  }

  const darkMode = useDarkMode(true)

  return (
    <div className='nav'>
      <ul>
        <li>
          <MediaQueryUtil />
        </li>
        {links.map((link, i) => (
          <li key={`li-${i}`}>
            <Link
              key={link.name}
              to={link.url}
              className={`navButton ${setActive(link.url)}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li className='toggler'>
          <ToggleDarkMode checked={darkMode.value} onChange={darkMode.toggle} />
        </li>
        <li className='toggler'></li>
      </ul>
      <PrintIcon className='navprinticon' title='Skriv ut' />
    </div>
  )
}

HeaderNav.displayName = 'HeaderNav'

export default HeaderNav
