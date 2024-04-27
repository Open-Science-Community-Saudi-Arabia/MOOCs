import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);
dayjs().format();

interface IProps {
  course: any;
  role?: string;
  handleSelectedCourse: (course: any) => void;
}
export default function CourseCard({
  course,
  role,
  handleSelectedCourse,
}: IProps) {
  return (
    <div className="hover:shadow-xl hover:bg-primary/5 flex flex-col justify-between rounded-md text-left w-96 py-5 px-4 border-gray border bg-white">
      <div className="flex items-start justify-center gap-x-5 w-full">
        <img
          className="rounded-full w-10 h-10"
          src={course.preview_image}
          alt="preview image"
        />
        <div className="w-full">
          <div className="relative ">
            <h3 className="text-[17px] text-left line-clamp-1 font-semibold">
              {course.title}
            </h3>
            <span className="text-xs text-gray-dark/50 absolute -bottom-[16px]">
              {" "}
              Created on {dayjs(course.createdAt).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div className="py-6">
            <p
              className={`line-clamp-2 text-xs text-gray-dark leading-relaxed`}
            >
             {course.description}
            </p>
          </div>

          {role === "Admin" && (
            <p className="text-xs text-gray-dark">By {course.author}</p>
          )}
          <div className="flex items-center juatify-between">
            <button
              className="rounded-[5px] py-2 px-2 text-xs bg-primary/80 text-white"
              onClick={() => handleSelectedCourse(course)}
            >
              View course
            </button>
            <p
              className={`${
                course.status === "Pending"
                  ? "text-error"
                  : course.status === "Draft"
                  ? "text-gray-dark"
                  : "text-success"
              } font-semibold text-right text-xs ml-auto`}
            >
              {course.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
