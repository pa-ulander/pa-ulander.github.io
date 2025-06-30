import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import CvHeader from '../CvHeader'
import Tags from '../Tags'
import { roleData } from '../../../data'
import styles from './CvRoles.module.scss'

const {
  page,
  rolecontainer,
  roletext,
  workedfor,
  period,
  summary,
  heading,
  experinceheading,
  additionalheading,
  additional,
  rolesfooter,
} = styles

const CvRoles = ({ cvHeaderData }) => {
  // Fallback to useStaticQuery if cvHeaderData is not provided
  const fallbackData = useStaticQuery(graphql`
    query CvImageQuery {
      cvImage: file(name: { eq: "img" }, sourceInstanceName: { eq: "cv" }) {
        childImageSharp {
          gatsbyImageData(width: 600, layout: CONSTRAINED)
        }
      }
    }
  `)

  const headerData = cvHeaderData || fallbackData.cvImage

  const {
    current_role,
    last_employment,
    roles_2007_2014,
    roles_2000_2007,
    additional_clients,
  } = roleData

  const toolsHeader = `#### Verktyg / Teknologier`

  const renderRole = (role, sum) => (
    <div className={rolecontainer} key={`role-${role.role}`}>
      <div className={roletext}>{role.role}</div>
      <div className={workedfor}>{role.workedfor}</div>
      <div className={period}>{role.period}</div>
      <div className={summary}>
        <Markdown rehypePlugins={[rehypeRaw]}>{sum}</Markdown>
      </div>
      <div>
        <Markdown>{toolsHeader}</Markdown>
        <Tags tagdata={role.tooltags} />
      </div>
    </div>
  )

  const renderRoles = (role, idx, header) => (
    <div key={`rf-${idx}`}>
      {idx === 0 && header}
      <div className={rolecontainer}>
        <div className={roletext}>{role.role}</div>
        <div className={workedfor}>{role.workedfor}</div>
        <div className={period}>{role.period}</div>
        <div className={summary}>
          <Markdown rehypePlugins={[rehypeRaw]}>{role.summary}</Markdown>
        </div>
        <div className='tools'>
          <Markdown rehypePlugins={[rehypeRaw]}>{role.tools}</Markdown>
          <Tags tagdata={role.tooltags} />
        </div>
      </div>
      <hr />
    </div>
  )

  return (
    <div>
      {/* First Page */}
      <div className={page}>
        <CvHeader data={headerData} />
        <h2 className={experinceheading}>Erfarenheter</h2>
        {current_role &&
          renderRole(
            current_role,
            `<h4 class='subheading'>Nuvarande projekt</h4>${current_role.summary}`
          )}
        <hr />
        {last_employment &&
          renderRole(last_employment, last_employment.summary)}
      </div>

      {/* Roles 2007-2014 */}
      {roles_2007_2014 && roles_2007_2014.length > 0 && (
        <div className={page}>
          <h2 className={heading}>Uppdragsgivare 2007-2014</h2>
          {roles_2007_2014.map((role, idx) => renderRoles(role, idx, null))}
        </div>
      )}

      {/* Roles 2000-2007 */}
      {roles_2000_2007 && roles_2000_2007.length > 0 && (
        <div className={page}>
          <h2 className={heading}>
            Uppdragsgivare/genomförda projekt 2000-2007, ett urval
          </h2>
          {roles_2000_2007.map((role, idx) => renderRoles(role, idx, null))}

          {/* Additional clients */}
          {additional_clients && additional_clients.length > 0 && (
            <div>
              <h2 className={additionalheading}>
                Ytterligare uppdragsgivare 2000-2007
              </h2>
              <div className={additional}>
                {additional_clients.map((project, idx) => (
                  <span key={`p-${idx}`}>{project}</span>
                ))}
              </div>
              <div className={rolesfooter}>
                Fler uppdragsreferenser samt rekommendationer finns på min{' '}
                <a href='https://linkedin.com/in/paulander'>LinkedIn-profil</a>.
                <br />
                Önskas fler uppdragsreferenser och rekommendationer kan det
                lämnas på begäran.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CvRoles
