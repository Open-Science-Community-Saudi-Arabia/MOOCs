import React from 'react'
import './Testimonial.scss'

function Testimonial({img, name, desc}) {
  return (
    <div className='testimonial'>
        <img src={img} alt=""  className='img'/>
            <div className='desc--container' >
                <p>{desc}</p>
                <h3>{name}</h3>
            </div>
    </div>
  )
}

export default Testimonial