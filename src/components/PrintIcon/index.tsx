import React from 'react'
import { CgPrinter } from 'react-icons/cg'
import { printicon } from './PrintIcon.module.scss'

export interface IconProps {
  className: string
  style: React.CSSProperties
  title: string
}

const PrintIcon: React.FC<IconProps> = ({ className, style, title }) => (
  <CgPrinter
    className={className}
    style={style}
    title={title}
    onClick={
      typeof window !== 'undefined'
        ? window.print
        : () => {
            return null
          } // overcome window not defined build error
    }
  />
)

PrintIcon.defaultProps = {
  className: printicon,
  style: {},
  title: 'Skriv ut',
}

export default PrintIcon
