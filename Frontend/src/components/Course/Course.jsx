import React from 'react'
import PlayIcon from '../vectors/Play'
import RatingsIcon from '../vectors/Ratings'
import './CourseStyle.scss'

function Course({img, title, desc, lessons, ratings}) {
  return (
    <div className='course'>
        <div className='imgwrapper'>
        <img src={img} alt="" />
         <p className='creative'>Creative</p>
        </div>
        <div className='course--content'>
            <h1 className='title'>{title}</h1>
            <p className='desc'>{desc}</p>
            <div className='rating--wrapper'>
             <div className='play'>
                <PlayIcon/>
                <p className='lessons'>{lessons}</p>
             </div>
             <div className='rating'>
                <p>{ratings}</p>
                <RatingsIcon/>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Course