import React from 'react'
import "./spinner.scss"

function Spinner({ loadingBoard }) {
  return (
    <div className='loader-container'>
      <div className="loader" />
      {loadingBoard && <p className='loading-content'> loading dashboard</p>}
    </div>)

}

export default Spinner;