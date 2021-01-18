import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
  FaRegEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaDownload,
  FaPrint,
} from 'react-icons/fa'
import './socialicons.scss'

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
    <div className='social-icons'>
      <ul>
        <li>
          <a
            href={siteMetadata.social.email}
            target='_blank'
            title='Email me'
            rel='noopener noreferrer'
          >
            <FaRegEnvelope className='email' />
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
          </a>
        </li>
        <li>
          <a
            href={siteMetadata.actions.print}
            title={siteMetadata.actions.print}
            rel='noopener noreferrer'
          >
            <FaPrint className='print' />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialIcons
