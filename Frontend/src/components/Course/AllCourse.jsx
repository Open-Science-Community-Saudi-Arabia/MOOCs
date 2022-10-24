import React from "react";
import courses  from "./data";
import CourseCard from "./CourseCard";
import styles from './course.module.css';

function AllCourse() {
  return (
    <div className={styles.course__row}>
      {courses.map(course => (
        <CourseCard course={course}  key={course.id}/>
      ))}
    </div>
  );
}

export default AllCourse;
