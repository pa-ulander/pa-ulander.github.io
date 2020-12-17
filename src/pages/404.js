import { Link } from 'gatsby'
import React from 'react'
import SEO from '../components/Seo'
const NotFoundPage = () => {
  const wrapper = {
    width: `100vw`,
    height: `100vh`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    background: `url('/images/404.jpg') no-repeat scroll center center / cover`,
  }
  const container = { padding: `2rem` }
  const h1404 = { color: `#fff`, fontWeight: `bolder`, fontSize: `5rem` }
  const head = { color: `#fff`, fontWeight: `bolder`, fontSize: `1.05rem` }
  const text = { color: `#fff`, fontWeight: `bolder` }

  return (
    <>
      <SEO title="404: Not found" />
      <div style={wrapper}>
        <div style={container}>
          <h1 style={h1404}>404</h1>
          <h1 style={head}>PAGE NOT FOUND</h1>
          <h1 style={head}>
            {`GO BACK`}{' '}
            <Link to="/" style={text}>
              HOME
            </Link>
          </h1>
        </div>
      </div>
    </>
  )
}
export default NotFoundPage
