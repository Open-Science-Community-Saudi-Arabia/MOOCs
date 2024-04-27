import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getAllCourses } from "../../utils/api/courses";
import Table from "../../components/Course/Table";
import { Courses } from "../../types";
import Modal from "../../components/Modal";
import AddCourse from "../../components/Course/AddCourse";
import { toast } from "react-toastify";

export default function index() {
  const [selectedCourse, setSelectedCourse] = useState<any>({});
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAvailableCourses = async () => {
      try {
        const response = await getAllCourses();
        if (response.success) {
          setLoading(false);

          setCourses(response.data);
        }
      } catch (error) {
        toast.error("Fetching data failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      }
    };
    getAvailableCourses();
  }, [selectedCourse]);

  const handleSelectedCourse = (selectedCourse: any) => {
    setSelectedCourse(selectedCourse);
  };

  return (
    <section className="h-screen admin-dashboard">
      <h1 className="text-center text-2xl">Admin Board</h1>

      {selectedCourse?.title ? (
        <Modal
          show={selectedCourse?.title}
          handleClose={() => setSelectedCourse("")}
        >
          <AddCourse
            handleSelectedCourse={handleSelectedCourse}
            selectedCourse={selectedCourse}
          />
        </Modal>
      ) : isLoading ? (
        <div className="h-screen flex items-center flex-col justify-center">
          <Spinner width="100px" height="100px" color="#009985" />
        </div>
      ) : courses?.length > 0 ? (
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl ">All courses</h2>
            <Link
              to={`/course/add-course`}
              className="bg-primary text-sm text-white rounded-md px-3 py-2"
            >
              {" "}
              Add Course
            </Link>
          </div>

          <Table
            courses={courses}
            handleSelectedCourse={handleSelectedCourse}
          />
        </div>
      ) : (
        <div className="flex items-center flex-col h-96 justify-center">
          <p className="py-3 text-gray-dark/50"> No Course Added</p>
        </div>
      )}
    </section>
  );
}
