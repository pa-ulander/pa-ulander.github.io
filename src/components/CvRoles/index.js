import React from 'react'
import Markdown from 'react-markdown'
import CvHeader from '../CvHeader'
import Tags from '../Tags'
import { roleData } from '../../../data'
import style from './CvRoles.module.scss'

const CvRoles = ({ cvHeaderData }) => {
  const {
    current_role,
    last_employment,
    roles_2007_2014,
    roles_2000_2007,
    additional_clients,
  } = roleData

  const groupData = (data, groupLength = 3) =>
    data
      .reduce(
        (groups, curr) => {
          let arr = groups[groups.length - 1]
          arr.push(curr)
          if (arr.length === groupLength) groups.push([])
          return groups
        },
        [[]]
      )
      .filter((chunk) => chunk.length)

  const toolsHeader = `#### Verktyg / Teknologier`

  const renderRole = (role, summary) => (
    <div className={style.rolecontainer}>
      <div className={style.role}>{role.role}</div>
      <div className={style.workedfor}>{role.workedfor}</div>
      <div className={style.period}>{role.period}</div>

      <div className={style.summary}>
        <Markdown escapeHtml={false} source={summary} />
      </div>

      <div className={style.tools}>
        <Markdown escapeHtml={false} source={toolsHeader} />
        <Tags tagdata={role.tooltags} />
      </div>
    </div>
  )

  const renderRoles = (role, idx, header) => (
    <React.Fragment key={`rf-${idx}`}>
      {idx === 0 && header}
      <div className={style.rolecontainer} key={`role-${idx}`}>
        <div className={style.role}>{role.role}</div>
        <div className={style.workedfor} key={`header-${idx}`}>
          {role.workedfor}
        </div>
        <div className={style.period} key={`period-${idx}`}>
          {role.period}
        </div>

        <div
          className={`${style.summary} ${style.clear}`}
          key={`summary-${idx}`}
        >
          <Markdown
            escapeHtml={false}
            source={role.summary}
            key={`msummary-${idx}`}
          />
        </div>

        <div className='tools' key={`tools-${idx}`}>
          <Markdown
            escapeHtml={false}
            source={role.tools}
            key={`mtools-${idx}`}
          />
          <Tags tagdata={role.tooltags} />
        </div>
      </div>
      <hr key={`mhr-${idx}`} />
    </React.Fragment>
  )

  const renderFirstPage = () => {
    const summary = `<h4 class='subheading'>Nuvarande projekt</h4>${current_role.summary}`
    return (
      <div className={style.page} key={`page`}>
        <CvHeader data={cvHeaderData} />
        <h2 className={style.experinceheading}>Erfarenheter</h2>
        {renderRole(current_role, summary)}
        <hr />
        {renderRole(last_employment, last_employment.summary)}
      </div>
    )
  }

  const renderRoles_2007_2014 = () => {
    const header = <h2 className={style.heading}>Uppdragsgivare 2007-2014</h2>
    const groups = groupData(roles_2007_2014)
    const roles = groups.map((group, idx) => (
      <div className={style.page} key={`page-${idx}`}>
        {group.map((role, idxx) => renderRoles(role, idx + idxx, header))}
      </div>
    ))

    return roles
  }

  const renderRoles_2000_2007 = () => {
    const header = (
      <h2 className={style.heading}>
        Uppdragsgivare/genomförda projekt 2000-2007, ett urval
      </h2>
    )
    let rolecount = 0
    const groups = groupData(roles_2000_2007)
    const roles = groups.map((group, idx) => (
      <div className={style.page} key={`page-${idx}`}>
        {group.map((role, idxx) => {
          rolecount++
          return [
            renderRoles(role, idx + idxx, header),
            rolecount === 7 ? renderAdditional() : null,
          ]
        })}
      </div>
    ))

    return [roles]
  }

  const renderAdditional = () => {
    const header = (
      <h2 key={`h`} className={style.additionalheading}>
        Ytterligare uppdragsgivare 2000-2007
      </h2>
    )
    const projects = additional_clients.map((project, idx) => (
      <span key={`p-${idx}`}>{project}</span>
    ))
    return (
      <React.Fragment key={`rf`}>
        {header}
        <div key={`p`} className={style.additional}>
          {projects}
        </div>

        <div className={style.rolesfooter}>
          Fler uppdragsreferenser samt rekommendationer finns på min{' '}
          <a href='https://linkedin.com/in/paulander'>LinkedIn-profil</a>.
          <br />
          Önskas fler uppdragsreferenser och rekommendationer kan det lämnas på
          begäran.
        </div>
      </React.Fragment>
    )
  }

  return [renderFirstPage(), renderRoles_2007_2014(), renderRoles_2000_2007()]
}

export default CvRoles
