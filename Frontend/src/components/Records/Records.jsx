import React from 'react'
import './RecordStyle.css'

const Records = ({icon:Icon, value, desc}) => {
  return (
    <div className='record-wrapper'>
            <Icon/>
            <p className='record'>{value}</p>
            <p className='desc'>{desc}</p>
    </div>
  )
}
export default Records