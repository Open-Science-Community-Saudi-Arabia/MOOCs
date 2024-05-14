import { useEffect, useRef, useState } from "react";

import "./style.scss";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import AvailableCourses from "./availablecourses";
import {  getUserCourses } from "../../../utils/api/courses";

/**
 * @category Client
 * @subcategory Pages
 * @module User Dashboard
 * @description User can view all available courses.
 * @component
 * @example
  <Route path="dashboard" element={<Board />} />
 */
const Board = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAvailableCourses = async () => {
    try {
      const response = await getUserCourses();
      if (response.success) {
        setLoading(false);
        setAvailableCourses(response.data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setError(false);
    }
  };

  // const isMounted = useRef(false);
  useEffect(() => {
    setLoading(true);

     getAvailableCourses()
  }, []);

// console.log(availableCourses)


  return (
    <section className="dashboard">
      {isLoading ? (
        <div className="dashboard__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : error ? (
        <div className="dashboard__error">
          <ErrorFallBack
            message="Something went wrong!"
            description="We encountered an error while fetching course(s)."
            reset={getAvailableCourses}
          />
        </div>
      ) : (
        <AvailableCourses courses={availableCourses} />
      )}
    </section>
  );
};

export default Board;

