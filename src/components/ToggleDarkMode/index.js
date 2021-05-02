import React from 'react'

const ToggleDarkMode = ({ checked, onChange }) => {
  return (
    <div className='dark-button'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        id='toggle'
      />
      <label htmlFor='toggle' />
    </div>
  )
}

export default ToggleDarkMode
