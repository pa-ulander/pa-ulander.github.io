import React from 'react'
import styles from './Tags.module.scss'

type Props = {
  tagdata: string[]
}

const Tags: React.FC<Props> = ({ tagdata }) => {
  if (typeof tagdata === 'object') {
    return (
      <>
        {tagdata.map((tag, idx) => (
          <span className={styles.tag} key={`${tag}${idx}`}>
            {tag}
          </span>
        ))}
      </>
    )
  }
  return <>{tagdata}</>
}

export default Tags
