import React from 'react'
import Header from './Header'

const Container = ({ children }) => {
  return (
    <div>
      <div className="container">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Container
