import React from 'react'
import HeaderNav from '../HeaderNav'

const Layout = ({ children }) => {
  return (
    <>
      <HeaderNav />
      <div className='container'>{children}</div>
    </>
  )
}

export default Layout
