import React from 'react'
import { Link } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import ToggleDarkMode from '../ToggleDarkMode'
import PrintIcon from '../PrintIcon'
// import MediaQueryUtil from '../devutils/MediaQueryUtil'
import style from './HeaderNav.module.scss'

const HeaderNav = ({ data }) => {
  const links = [
    { url: `/`, name: `HOME` },
    { url: `/blog`, name: `BLOG` },
    { url: `/cv`, name: `CV` },
  ]

  const setActive = (url) =>
    url === location.pathname ? style.navButton__active : null

  const darkMode = useDarkMode(true)

  return (
    <div className={style.nav}>
      <ul>
        <li>{/* <MediaQueryUtil /> */}</li>
        {links.map((link, i) => (
          <li key={`li-${i}`}>
            <Link
              key={link.name}
              to={link.url}
              className={`${style.navButton} ${setActive(link.url)}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li className={style.toggler}>
          <ToggleDarkMode checked={darkMode.value} onChange={darkMode.toggle} />
        </li>
        <li className={style.toggler}></li>
      </ul>
      <PrintIcon className={style.navprinticon} title='Skriv ut' />
    </div>
  )
}

HeaderNav.displayName = 'HeaderNav'

export default HeaderNav
