import { useEffect, useState } from "react";
import "./style.scss";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import AvailableCourses from "./availablecourses";
import {  getUserCourses } from "../../../utils/api/courses";
import { t } from "@lingui/macro";

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


  useEffect(() => {
    setLoading(true);
     getAvailableCourses()
  }, []);

  return (
    <section className="dashboard">
      {isLoading ? (
        <div className="dashboard__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : error ? (
        <div className="dashboard__error">
          <ErrorFallBack
            message={t`Something went wrong!`}
            description={t `We encountered an error while fetching course(s).`}
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

