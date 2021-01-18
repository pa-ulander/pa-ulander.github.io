import React from 'react'
import Markdown from 'react-markdown'
import Tags from '../Tags'
import { dateDiff } from '../../utils/date'
import { roleData } from '../../../data'
import style from './CvRoles.module.scss'

const CvRoles = () => {
  const {
    current_role,
    last_employment,
    roles_2007_2014,
    roles_2000_2007,
    additional_clients,
  } = roleData

  const toolsHeader = `Verktyg/Teknologier`

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

  const renderRoles = (role, idx) => (
    <React.Fragment key={`rf-${idx}`}>
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

  const renderCurrentRole = () => {
    const summary = `<h3>Nuvarande projekt</h3>${current_role.summary}`
    return (
      <React.Fragment key={`cr`}>
        {renderRole(current_role, summary)}
        <hr />
      </React.Fragment>
    )
  }

  const renderLastEmployment = () => {
    const header = `## Senaste anställning`
    return (
      <React.Fragment key={`le`}>
        <Markdown escapeHtml={false} source={header} />
        {renderRole(last_employment, last_employment.summary)}
        <hr />
      </React.Fragment>
    )
  }

  const renderRoles_2007_2014 = () => {
    const header = (
      <Markdown
        escapeHtml={false}
        source={`## Uppdragsgivare 2007-2014`}
        key={`upg`}
        className={style.headerMargin}
      />
    )
    const roles = roles_2007_2014.map((role, idx) => renderRoles(role, idx))

    return [header, roles]
  }

  const renderRoles_2000_2007 = () => {
    const header = (
      <Markdown
        escapeHtml={true}
        source={`## Uppdragsgivare/genomförda projekt 2000-2007, ett urval`}
        key={`upg2`}
      />
    )
    const roles = roles_2000_2007.map((role, idx) => renderRoles(role, idx))

    return [header, roles]
  }

  const renderAdditional = () => {
    const header = (
      <Markdown
        escapeHtml={true}
        source={`# Ytterligare uppdragsgivare 2000-2007`}
        key={`pr`}
      />
    )
    const projects = additional_clients.map((project, idx) => {
      return (
        <React.Fragment key={`pr-${idx}`}>
          <Markdown
            escapeHtml={false}
            source={project}
            key={`project--${idx}`}
          />
        </React.Fragment>
      )
    })
    return [header, projects]
  }

  return (
    <main className={style.roles}>
      <Markdown escapeHtml={false} source={`## Erfarenheter`} key={`erf`} />
      {[
        renderCurrentRole(),
        renderLastEmployment(),
        renderRoles_2007_2014(),
        renderRoles_2000_2007(),
        renderAdditional(),
      ]}
      <br />
      Ytterligare uppdragsreferenser och referenspersoner lämnas på begäran.
    </main>
  )
}

export default CvRoles
