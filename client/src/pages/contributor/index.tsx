import { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { getContributorCourses } from "../../utils/api/courses";
import Spinner from "../../components/Spinner";
import { getUserId } from "../../utils";
import CourseCard from "../../components/Course/CourseCard";
import Modal from "../../components/Modal";
import AddCourse from "../../components/Course/AddCourse";
import { toast } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Courses } from "../../types";
import { Trans } from "@lingui/macro";

/**
 * @category Client
 * @subcategory Pages
 * @module Contributor Board
 * @description The dashboard for contributor to create, edit and view courses.
 * @component
 * @example
 *  <Route path="/contributor/dashboard" element={<ContributorBoard />} />
 */

export default function index() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Courses | any>({});
  const [isLoading, setLoading] = useState(false);
  const locale = localStorage.getItem("language") || "en";

  const getAvailableCourses = async () => {
    setLoading(true);
    const userId: any = getUserId();
    try {
      const response = await getContributorCourses(userId);
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

  useEffect(() => {
    getAvailableCourses();
  }, []);

  const handleSelectedCourse = (selectedCourse: any) => {
    setSelectedCourse(selectedCourse);
  };

  const deleteCoursesHandler = (course: Courses) => {
    setCourses(courses.filter((obj) => obj._id !== course._id));
    handleSelectedCourse!("");
  };

  return (
    <section className="contributor-dashboard h-screen overflow-auto">
      <p className="text-center font-medium text-xl">
        <Trans>Contributor's Board</Trans>{" "}
      </p>
      {selectedCourse?.title ? (
        <Modal
          show={selectedCourse?.title}
          handleClose={() => setSelectedCourse("")}
        >
          <AddCourse
            locale={locale}
            deleteCoursesHandler={deleteCoursesHandler}
            handleSelectedCourse={handleSelectedCourse}
            selectedCourse={selectedCourse}
          />
        </Modal>
      ) : isLoading ? (
        <div className="h-screen flex items-center flex-col justify-center">
          <Spinner width="100px" height="100px" color="#009985" />
        </div>
      ) : courses?.length > 0 ? (
        <div className="md:mx-6">
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-xl font-medium">
              <Trans>Your Courses</Trans>
            </h1>
            <Link
              to="/course/add-course"
              className="bg-primary hover:bg-primary-hover text-sm text-white rounded-md px-3 py-3 font-semibold"
            >
              {" "}
              <span className="flex items-center justify-center gap-x-1">
                {" "}
                <IoMdAddCircleOutline size={18} /> <Trans>Add New Course</Trans>
              </span>
            </Link>
          </div>
          <div className="flex items-center flex-wrap gap-6 justify-start mt-8">
            {courses.map((ele: any) => {
              return (
                <CourseCard
                  key={ele._id}
                  course={ele}
                  locale={locale}
                  handleSelectedCourse={handleSelectedCourse}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col h-[30rem] justify-center">
          <p className="py-3 text-gray-dark/50 mb-4">
            {" "}
            <Trans> No Course Added Yet!</Trans>
          </p>
          <Link
            to="/course/add-course"
            className="px-4 py-3 bg-primary hover:bg-primary/80 text-white rounded-md w-64 text-center"
          >
            {" "}
            <Trans>Add Course</Trans>
          </Link>
        </div>
      )}
    </section>
  );
}
