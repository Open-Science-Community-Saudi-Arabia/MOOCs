import React from 'react'
import './button.css'

const Button = ({ variant, children }) => {
	return <Button className={`button ${variant}`}>{children}</Button>
}

export default Button
