import React from 'react'
import './LearningWidget.css'

const LearningWidget = ({title, desc, icon:Icon}) => {
  return (
    <div className='learningwidget'>
       <div className='icon--container'>
       <div className='Icon--wrapper'>
        <Icon/>
       </div>
       </div>
        <div className='details'>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    </div>
  )
}

export default LearningWidget