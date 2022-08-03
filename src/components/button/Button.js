import React from 'react'

import './button.css'

export const Button = ({title, handleClick}) => {

  return (
    <div className="button" onClick={handleClick}>
      <p className="button__title">{title}</p>
    </div >
  )
}
