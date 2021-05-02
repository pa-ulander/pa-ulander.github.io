import React from 'react'
import SocialIcons from '../SocialIcons'
import Image from '../Image'
import style from './CvHeader.module.scss'

const CvHeader = ({ data }) => {
  return (
    <header className={style.cv_header}>
      <div className={style.row}>
        <div className={style.cv__header__column1}>
          <Image
            aspectRatio={data.childImageSharp.fluid.aspectRatio}
            alt='PA Ulander - Systemutvecklare & Webbutvecklare'
            fluid={data.childImageSharp.fluid}
            style={{ borderRadius: '5px' }}
            className='shadow-lined'
          />
        </div>
        <div className={style.cv__header__column2}>
          <h1 className={style.cv__header__heading}>PA Ulander</h1>
          <h2 className={style.cv__header__subheading}>
            Systemutvecklare & Webbutvecklare
          </h2>
          <p className={style.cv__header__summary}>
            System och webbutvecklare med drygt 20-års kommersiell erfarenhet
            från utveckling av webb och företagslösningar. Specialiserad på
            välkända opensource teknologier som Linux, Apache/Nginx, PHP, MySQL,
            Javascript, HTML och CSS.
          </p>
          <SocialIcons />
          <div className='print-only'>
            <b>Linkedin:</b> linkedin.com/in/paulander <br />
            <b>Github:</b> github.com/pa-ulander <br />
            <b>E-post:</b> per.arne.ulander@gmail.com <br />
          </div>
        </div>
      </div>
    </header>
  )
}

CvHeader.propTypes = {}

export default CvHeader
