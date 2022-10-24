import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './course.module.css';

function CourseCard({course}) {
  return (
    <Link to={`/course/${course.id}`}>
    <div className={styles.course__wrapper} key={course.id}>
       <img src={course.imageUrl} alt=''/> 
       <p className={styles.course__name}>{course.name}</p>
       <p>{course.tutor}</p>
    </div>
    </Link>
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