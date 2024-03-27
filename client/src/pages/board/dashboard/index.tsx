import { useEffect, useRef, useState } from "react";
import Header from "../../../components/DashboardHeader";
import "./style.scss";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import AvailableCourses from "./availablecourses";
import { getCourses } from "../../../utils/api/courses";

/**
 * @category Client App
 * @subcategory Pages
 * @module Dashboard
 * @description To view all available course content.
 * @component
 * @example
  <Route path="dashboard" element={<Board />} />
 */
const Board = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isMounted = useRef(false);
  useEffect(() => {
    setLoading(true);
    isMounted.current = true;
    getCourses()
      .then((response) => {
        if (isMounted) {
          setLoading(false);
          setAvailableCourses(response.data.courses);
        }
      })
      .catch((error) => {
        setError(error);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getAvailableCourses = async () => {
    try {
      const response = await getCourses();
      if (response.success) {
        setLoading(false);
        setAvailableCourses(response.data.courses);
      }
    } catch (error) {
      setError(true);
    } finally {
      setError(false);
    }
  };

  return (
    <section className="dashboard">
      <Header />
      {isLoading ? (
        <div className="dashboard__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : error ? (
        <div className="dashboard__error">
          <ErrorFallBack
            message="Something went wrong!"
            description="We encountered an error while fetching courses"
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

