import React from 'react'
import "./spinner.scss"
interface ISpinnerProps {
  loadingBoard?:boolean
}
function Spinner({ loadingBoard }:ISpinnerProps) {
  return (
    <div className='loader-container'>
      <div className="loader" />
      {loadingBoard && <p className='loading-content'> loading dashboard</p>}
    </div>)

}

export default Spinner;