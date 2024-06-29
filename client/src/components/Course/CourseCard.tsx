import { Trans, t } from "@lingui/macro";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { Courses } from "../../types";
dayjs.extend(advancedFormat);
dayjs().format();

interface Props {
  course: Courses;
  locale: string;
  handleSelectedCourse: (course: Courses) => void;
}
/**
 * @category Client
 * @subcategory Pages
 * @module Course Card
 * @description The course card for contributors.
 * @component
 * @example
 *  <CourseCard course handleSelectedCourse />
 */
export default function CourseCard({
  course,
  locale,
  handleSelectedCourse,
}: Props) {
  return (
    <div
      onClick={() => handleSelectedCourse(course)}
      className="cursor-pointer hover:shadow-xl hover:bg-primary/5 flex flex-col justify-between rounded-md text-left w-96 py-5 px-4 border-gray border bg-white"
    >
      <p
        className={`${
          course.status === t`Pending`
            ? "bg-error"
            : course.status === t`Draft`
            ? "bg-gray-dark"
            : "bg-success"
        } font-semibold rounded-full px-2 py-1.5 text-white text-right text-[10px] ${
          locale ==="en" ? "ml-auto" : "mr-auto"
        }`}
      >
        {locale === "en" ? course.status : course.status_tr}
      </p>
      <div className="w-full relative">
        <div className="w-full">
          <div className="flex md:gap-x-5 items-center relative">
            {" "}
            <img
              className="rounded-full w-14 h-14"
              src={course.preview_image}
              alt="preview image"
            />
            <div>
              <h3 className="text-[19px] text-left line-clamp-1 font-semibold">
                {locale === "en" ? course.title : course.title_tr}
              </h3>
            </div>
          </div>

          <div className="py-6">
            <p
              className={`line-clamp-3 text-sm text-gray-dark leading-relaxed`}
            >
              {locale === "en" ? course.description : course.description_tr}
            </p>
            <span className="text-xs text-gray-dark/70">
              {" "}
              <Trans> Created on </Trans>{" "}
              {dayjs(course.createdAt).format("MMMM Do, YYYY")}
            </span>
          </div>

          <button
            className="rounded-[5px] p-2.5 text-xs bg-primary/80 text-white"
            onClick={() => handleSelectedCourse(course)}
          >
            <Trans> View details</Trans>
          </button>
        </div>
      </div>
    </div>
  );
}
