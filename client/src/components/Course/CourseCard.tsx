import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(advancedFormat);
dayjs().format();

export default function CourseCard({ course }: any) {
  console.log(course)
  return (
    <button
      className="hover:shadow-xl rounded-md text-left w-72 h-40 pt-3 pb-3 px-4 border-gray border bg-white"
    >
      <div className="flex items-center justify-center gap-x-6 mb-8">
        <img
          className="rounded-full w-10 h-10"
          src={course.preview_image}
          alt="preview image"
        />
        <h3 className="text-base w-64 text-left font-semibold">
          {course.title}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <p className={`text-gray-dark font-medium w-20 text-xs`}>
          Review{" "}
          <span
            className={`${course.status === "Pending"
              ? "text-error"
              : "text-success"
              }`}
          >
            {course.status}
          </span>
        </p>
        <p className="text-gray-dark/80 w-24 text-xs">
          created on
          <span>
            {" "}
            {dayjs(course.createdAt).format("MMMM Do, YYYY")}
          </span>
        </p>
      </div>
    </button>
  )
}
