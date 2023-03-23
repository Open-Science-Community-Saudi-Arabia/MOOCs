import Header from "./header";
import "./style.scss";
import { useCourses } from "../../../utils/api/courses";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import AvailableCourses from "./availablecourses";

const Board = () => {
  const { data: courses, isLoading, isError, refetch } = useCourses();

  return (
    <section className="dashboard">
      <Header />

      {isLoading ? (
        <div className="dashboard__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : isError ? (
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
