import { useFieldArray } from "react-hook-form";
import { MdClose } from "react-icons/md";

export function Options({
  subNestIndex,
  nestIndex,
  quizIndex,
  control,
  register,
}: any) {
  const { remove, fields, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${quizIndex}.options`,
  });

  return (
    <div className="h-auto max-h-64 overflow-auto">
      <label className="text-xs text-gray-dark">Options (max 4)</label>
      {fields.map((field: any, index: number) => {
        return (
          <div key={field.id} className="mb-2 gap-x-4 flex items-center">
            <input
              {...register(
                `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${quizIndex}.options.${index}.name`
              )}
              autoComplete="false"
              className="!w-full"
              type="text"
              required
            />

            <button type="button" onClick={() => remove(index)}>
              <MdClose size={16} color={"red"} />
            </button>
          </div>
        );
      })}
      <button
        className="text-xs rounded-md bg-gray/70 hover:bg-gray font-medium p-2"
        type="button"
        onClick={() => append({ name: "" })}
      >
        + Add
      </button>
    </div>
  );
}
