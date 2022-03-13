import React, { useState, useEffect } from 'react'
import style from './MediaQueryUtil.module.scss'

/**
 * Utility helpful when dealing with media queries.
 * Displays info about width height breakpoint etc.
 *
 * @return  {string}  html
 */
const MediaQueryUtil = () => {
  // prevent error from node when building
  if (typeof window !== 'undefined') {
    const css = {
      padding: '.5rem',
      backgroundColor: 'darkRed',
      fontSize: '14px',
      fontWeight: 'bold',
      position: 'absolute',
      top: '0',
      left: '0',
    }

    /**
     * Match module specific mediaqueries
     *
     * @param   {[type]}  cssText     [cssText description]
     * @param   {[type]}  moduleName  [moduleName description]
     *
     * @return  {[type]}              [return description]
     */
    const matchModule = (cssText, moduleName) =>
      cssText.match(`/${moduleName}/gms`)

    /**
     * Match any|all mediaqueries
     *
     * @param   {[type]}  cssText  [cssText description]
     *
     * @return  {[type]}           [return description]
     */
    const matchQueries = (cssText) =>
      cssText.match(
        /@\s*?media\s*?\(\s*?(min|max)-(width|height)\s*?:\s*?(\d+)/gms
      )

    /**
     * Get breakPoints
     *
     * @param   {string}  moduleName
     *
     * @return  {array}              array with breakpoints
     **/
    const getAllBreakPoints = (moduleName = null) => {
      const allBreakPoints = [0]
      for (let i = 0; i < document.styleSheets.length; i++) {
        let styleSheet = document.styleSheets[i]
        for (let ix = 0; ix < styleSheet.cssRules.length; ix++) {
          let ruleText = ''
          let cssText = styleSheet.cssRules[ix].cssText
          if ((ruleText = matchQueries(cssText))) {
            let breakPoint = ruleText[0].match(/\d/g).join('')
            allBreakPoints.push(Number(breakPoint))
          }
        }
      }
      return [
        ...new Set(
          allBreakPoints.sort((a, b) => {
            return a - b
          })
        ),
      ]
    }

    console.log('getAllBreakPoints ', getAllBreakPoints())
    console.log('document.styleSheets ', document.styleSheets)

    const getBreakpoint = () =>
      getAllBreakPoints().reduce((prev, curr) => {
        return window.innerWidth >= curr ? curr : prev
      })

    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
      breakPoints: getAllBreakPoints() || [],
      current: getBreakpoint(),
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        breakPoints: getAllBreakPoints() || [],
        current: getBreakpoint(),
      })
    }

    useEffect(() => window.addEventListener('resize', handleResize, false), [])

    return (
      <div style={css}>
        <div className={style.active_breakpoint}></div>
        <div>bp: {dimensions.current}</div>
        <div>Width: {dimensions.width}px</div>
        <div>Height: {dimensions.height}px</div>
      </div>
    )
  } else {
    return ''
  }
}

export default MediaQueryUtil
