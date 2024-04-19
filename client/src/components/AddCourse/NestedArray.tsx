import { t } from "@lingui/macro";
import { useFieldArray, useWatch } from "react-hook-form";
import { IoIosLink } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { Tooltip } from "react-tooltip";
export default ({
  nestIndex,
  control,
  register,
  addExercise,
  currentQuestionHandler,
}: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.video`,
  });
  const selectType = useWatch({
    control,
    name: `coursesection.${nestIndex}.video`,
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
          data-tooltip-content="PDF, video or slides"
          className="py-2 px-3 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 font-medium"
        >
          Add video
          <Tooltip id="my-tooltip" place="top" />
        </button>

        <button
          type="button"
          onClick={() => {
            addExercise(), currentQuestionHandler();
          }}
          className="py-2 px-3 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 font-medium"
        >
          Add Exercise
        </button>
      </div>

      {fields.map((item, k) => {
        return (
          <div className="flex items-center gap-x-2 my-4" key={item.id}>
            <select
              className="p-2 border rounded-md text-sm text-gray-dark border-gray"
              {...register(`coursesection.${nestIndex}.video.${k}.type`)}
            >
              <option value="">Select type</option>
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>

            <div className="flex items-center gap-x-4 w-4/5">
              <input
                type="text"
                className="!w-[60%]"
                placeholder={t`title`}
                {...register(`coursesection.${nestIndex}.video.${k}.title`)}
              />

              <input
                type="text"
                className="!w-[60%]"
                placeholder={t`description`}
                {...register(
                  `coursesection.${nestIndex}.video.${k}.description`
                )}
              />

              {selectType[k]?.type == "video" ? (
                <input
                  type="url"
                  className="!w-[60%]"
                  placeholder={t`url`}
                  {...register(`coursesection.${nestIndex}.video.${k}.link`)}
                />
              ) : selectType[k]?.type == "pdf" ? (
                <input
                  type="file"
                  className="!w-[60%]"
                  {...register(`coursesection.${nestIndex}.video.${k}.file`)}
                />
              ) : null}
            </div>

            <button type="button" onClick={() => remove(k)}>
              <MdClose size={20} color="red" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
