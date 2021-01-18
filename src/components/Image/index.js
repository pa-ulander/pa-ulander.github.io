import React from 'react'
import Img from 'gatsby-image'

const Image = ({ aspectRatio, ...props }) => {
  let orientation
  if (aspectRatio >= 1.2) orientation = 'landscape'
  if (aspectRatio <= 0.8) orientation = 'portrait'
  if (aspectRatio > 0.8 && aspectRatio < 1.2) orientation = 'square'

  return <Img className={`${orientation}`} {...props} />
}

export default Image
