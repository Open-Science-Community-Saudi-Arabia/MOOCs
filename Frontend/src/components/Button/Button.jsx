import React from 'react'
import './Button.css'
const Button = ({title , outlined}) => {
  return (
    <div className={`button ${outlined ? 'outline':'button--bg'}`}>{title}</div>
  )
}

export default Button