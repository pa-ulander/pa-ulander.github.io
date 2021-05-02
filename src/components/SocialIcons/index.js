import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import {
  FaRegEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaDownload,
} from 'react-icons/fa'
import PrintIcon from '../PrintIcon'
import style from './SocialIcons.module.scss'

const SocialIcons = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          siteUrl
          social {
            twitter
            linkedin
            github
            email
          }
          actions {
            download
            print
          }
          title
          author {
            summary
            name
          }
        }
      }
    }
  `)

  const { siteMetadata } = data.site
  return (
    <div className={style.socialicons}>
      <ul>
        <li>
          <a
            href={siteMetadata.social.email}
            target='_blank'
            title='Email me'
            rel='noopener noreferrer'
          >
            <FaRegEnvelope className='email' />
            <span>Mejla</span>
          </a>
        </li>
        <li>
          <a
            href={siteMetadata.social.linkedin}
            title={siteMetadata.social.linkedin}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedinIn className='linkedin' />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href={siteMetadata.social.github}
            title={siteMetadata.social.github}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub className='github' />
            <span>Github</span>
          </a>
        </li>
        <li>
          <a
            href={siteMetadata.actions.download}
            title={siteMetadata.actions.download}
            download
            rel='noopener noreferrer'
          >
            <FaDownload className='download' />
            <span>Hämta CV</span>
          </a>
        </li>
        <li className={style.headerprinticon}>
          <a href='#' title='Skriv ut'>
            <PrintIcon
              style={{ height: '2rem', width: '2rem', marginBottom: '-2px' }}
            />
            <span>Skriv ut</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialIcons
