import Header from "./header";
import "./style.scss";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import AvailableCourses from "./availablecourses";
import { useQuery } from "react-query";
import { getCourses } from "../../../utils/api/courses";

/**
 * @category Frontend
 * @subcategory Pages
 * @module Dashboard
 * @description To view all available course content.
 * @component
 * @example
  <Route path="dashboard" element={<Board />} />
 */
const Board = () => {
  const queryKey = "getCourses";
  const {
    data: courses,
    isFetching,
    error,
    refetch,
  }: any = useQuery(queryKey, getCourses, {
    // refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 0,
  });
  return (
    <section className="dashboard">
      <Header />
      {isFetching ? (
        <div className="dashboard__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : error ? (
        <div className="dashboard__error">
          <ErrorFallBack
            message="Something went wrong!"
            description="We encountered an error while fetching courses"
            reset={refetch}
          />
        </div>
      ) : (
        <AvailableCourses courses={courses} />
      )}
    </section>
  );
};

export default Board;

// Add a join button,
// you should be able to tell  if you are enrolled or not
