import React from 'react'
import { Link } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import ToggleDarkMode from '../ToggleDarkMode'
import style from './HeaderNav.module.scss'

const HeaderNav = ({ data }) => {
  const links = [
    { url: `/`, name: `HOME` },
    { url: `/blog`, name: `BLOG` },
    { url: `/cv`, name: `CV` },
  ]

  const darkMode = useDarkMode(true)
  return (
    <div className={style.nav}>
      <ul>
        {links.map((link, i) => (
          <li key={`li-${i}`}>
            <Link key={link.name} to={link.url} className={style.navButton}>
              {link.name}
            </Link>
          </li>
        ))}
        <li className={style.toggler}>
          <ToggleDarkMode checked={darkMode.value} onChange={darkMode.toggle} />
        </li>
      </ul>
    </div>
  )
}

HeaderNav.displayName = 'HeaderNav'

export default HeaderNav
