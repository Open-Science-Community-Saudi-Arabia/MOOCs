import { t } from "@lingui/macro";
import { useFieldArray, useWatch } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Question from "./Question";
import { IoMdAddCircleOutline } from "react-icons/io";

export default ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources`,
  });
  const selectType = useWatch({
    control,
    name: `coursesection.${nestIndex}.resources`,
  });

  return (
    <div>
      <div className="flex items-center gap-x-3 absolute top-0 left-36">
        <button
          type="button"
          onClick={() => {
            append({
              title: "",
              description: "",
            });
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="PDF, video or quizzes"
          className="p-2 text-xs text-white bg-primary rounded-md hover:bg-primary-hover font-medium"
        >
          <span className="flex items-center justify-center gap-x-1">
            {" "}
            <IoMdAddCircleOutline size={18} />
            Add Materials
          </span>
          <Tooltip id="my-tooltip" place="top" />
        </button>
      </div>

      {fields.map((field, subNestIndex) => {
        return (
          <div className="flex items-center gap-x-2 my-4" key={field.id}>
            <select
              className="p-2 border rounded-md w-20 text-sm text-gray-dark border-gray"
              {...register(
                `coursesection.${nestIndex}.resources.${subNestIndex}.type`
              )}
            >
              <option disabled value="">
                Select type
              </option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
              <option value="quiz">Quiz</option>
            </select>

            <div className="flex items-center gap-x-4 w-full">
              <input
                type="text"
                className="!w-[30%]"
                placeholder={t`title`}
                autoComplete="false"
                {...register(
                  `coursesection.${nestIndex}.resources.${subNestIndex}.title`
                )}
              />

              <input
                type="text"
                className="!w-[30%]"
                placeholder={t`description`}
                autoComplete="false"
                {...register(
                  `coursesection.${nestIndex}.resources.${subNestIndex}.description`
                )}
              />

              {selectType[subNestIndex]?.type == "video" ? (
                <input
                  type="url"
                  className="!w-[60%]"
                  autoComplete="false"
                  placeholder={t`url`}
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.link`
                  )}
                />
              ) : selectType[subNestIndex]?.type == "pdf" ? (
                <input
                  type="file"
                  accept=".pdf"
                  className="!w-[60%]"
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.file`
                  )}
                />
              ) : selectType[subNestIndex]?.type == "quiz" ? (
                <div className="border-gray/50 !w-[60%] mt-2 gap-x-3 border w-96 rounded-lg p-3 w-max-content flex items-center">
                  <Question
                    subNestIndex={subNestIndex}
                    nestIndex={nestIndex}
                    {...{ control, register }}
                  />
                </div>
              ) : null}
            </div>

            <button type="button" onClick={() => remove(subNestIndex)}>
              <MdClose size={20} color="red" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
