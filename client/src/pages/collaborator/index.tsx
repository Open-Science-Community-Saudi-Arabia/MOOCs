import { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export default function index() {
  const [courses, SetCourses] = useState([]);
  return (
    <section className="collaborator-dashboard">
      {courses.length > 0 ? (
        <div>
          <Link to="/collaborator/add-course" className="add-btn">
            {" "}
            Add Course
          </Link>
        </div>
      ) : (
        <div className="flex items-center flex-col h-96 justify-center">
          <div className="py-3"> No Course Added</div>
          <Link to="/collaborator/add-course" className="add-btn">
            {" "}
            Add Course
          </Link>
        </div>
      )}
    </section>
  );
}
