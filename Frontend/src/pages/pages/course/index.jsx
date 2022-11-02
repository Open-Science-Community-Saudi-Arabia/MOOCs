import React from "react";
import { Tabs, Tab } from "../../../components/Tabs";
import AllCourses from "../../../components/Course/AllCourse";
import Wishlist from "../../../components/Course/Wishlist";
import Archived from "../../../components/Course/Archived";
import Learning from "../../../components/Course/Learning";
import styles from './course.module.css';

function Course() {
  return (
    <main>
        <div className={styles.course}>
        <h2 className={styles.course__header}>My Learning</h2>
        <Tabs>
          <Tab label="all courses" tabName="All Courses">
            <AllCourses />
          </Tab>
          <Tab label="wishlist" tabName="Wishlist">
            <Wishlist />
          </Tab>
          <Tab label="archived" tabName="Archived">
            <Archived />
          </Tab>
          <Tab label="learning tools" tabName="Learning Tools">
            <Learning />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}

export default Course;
