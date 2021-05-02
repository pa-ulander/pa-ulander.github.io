import React from 'react'
import { CgPrinter } from 'react-icons/cg'
import styles from './PrintIcon.module.scss'

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
    onClick={window.print}
  />
)

PrintIcon.defaultProps = {
  className: styles.printicon,
  style: {},
  title: 'Skriv ut',
}

export default PrintIcon
