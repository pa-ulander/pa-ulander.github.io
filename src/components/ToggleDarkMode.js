import React from 'react'

const ToggleDarkMode = ({ checked, onChange }) => {

  return (
    <div className="dark-button">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="toggle"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="toggle" />
    </div>
  )
}

export default ToggleDarkMode
