import { t } from "@lingui/macro";
import { useFieldArray } from "react-hook-form";
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

  return (
    <div>
      <div className="flex items-center gap-x-3 absolute top-0 left-36">
        <button
          type="button"
          onClick={() => {
            append({
              link: "",
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
            <label className="w-16">Video</label>
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
                {...register(`coursesection.${nestIndex}.video.${k}.description`)}
              />

              <input
                type="url"
                className="!w-[60%]"
                placeholder={t`url`}
                {...register(`coursesection.${nestIndex}.video.${k}.link`)}
              />
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
