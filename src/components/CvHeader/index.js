import React from 'react'
import SocialIcons from '../SocialIcons'
import Image from '../Image'
import styles from './CvHeader.module.scss'

const CvHeader = ({ data }) => {
  console.log('CvHeader data:', data)

  // Add safety check for data
  if (!data || !data.childImageSharp || !data.childImageSharp.gatsbyImageData) {
    return (
      <header className={styles.cv_header}>
        <div className={styles.row}>
          <div className={styles.cv_header_column1}>
            <div>Image data not available</div>
          </div>
          <div className={styles.cv_header_column2}>
            <h1 className={styles.cv_header_heading}>PA Ulander</h1>
            <h2 className={styles.cv_header_subheading}>
              Systemutvecklare & Webbutvecklare
            </h2>
            <p className={styles.cv_header_summary}>
              System och webbutvecklare med drygt 20-års kommersiell erfarenhet
              från utveckling av webb och företagslösningar. Specialiserad på
              välkända opensource teknologier som Linux, Apache/Nginx, PHP,
              MySQL, Javascript, HTML och CSS.
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

  return (
    <header className={styles.cv_header}>
      <div className={styles.row}>
        <div className={styles.cv_header_column1}>
          <Image
            aspectRatio={data.childImageSharp.gatsbyImageData.aspectRatio}
            alt='PA Ulander - Systemutvecklare & Webbutvecklare'
            fluid={data.childImageSharp.gatsbyImageData}
            style={{ borderRadius: '5px' }}
            className='shadow-lined'
          />
        </div>
        <div className={styles.cv_header_column2}>
          <h1 className={styles.cv_header_heading}>PA Ulander</h1>
          <h2 className={styles.cv_header_subheading}>
            Systemutvecklare & Webbutvecklare
          </h2>
          <p className={styles.cv_header_summary}>
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
