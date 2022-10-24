import React from 'react';
import PropTypes from 'prop-types';
import styles from './course.module.css';

function CourseCard({course}) {
  return (
    <div className={styles.course__wrapper} key={course.id}>
       <img src={course.imageUrl} alt=''/> 
       <p className={styles.course__name}>{course.name}</p>
       <p>{course.tutor}</p>
       <div className={styles.course__line}/>
    </div>
  )
}

export default CourseCard;

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    tutor: PropTypes.string
  }).isRequired,
}