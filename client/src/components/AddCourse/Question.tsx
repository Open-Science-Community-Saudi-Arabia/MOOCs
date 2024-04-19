import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

type Inputs = {
  title: string;
  option: { name: string }[];
  correctanswer: string;
};
type Props = {
  addQuestionHandler: (values: any) => void;
  
};
const defaultValues: Inputs = {
  title: "",
  option: [{ name: "" }],
  correctanswer: "",
};

export default function Question({ addQuestionHandler }: Props) {
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues,
  });
  useEffect(() => {
    reset({
      title: "",
      option: [{ name: "" }],
      correctanswer: "",
    });
  }, [addQuestionHandler]);

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    addQuestionHandler(values);
  };
  const { fields, remove, append } = useFieldArray({
    control,
    name: "option",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-semibold"> New Question</h2>
      <div className="my-5">
        <label className="text-xs text-gray-dark">Question</label>
        <input
          type="text"
          className="!w-full"
          {...register("title", { required: true })}
        />
      </div>
      <div className="h-auto max-h-64 overflow-auto">
        <label className="text-xs text-gray-dark">Options (max 4)</label>
        {fields.map((item, index) => (
          <div key={index} className="mb-2 gap-x-4 flex items-center ">
            <input
              {...register(`option.${index}.name`)}
              className="!w-full"
              type="text"
              required
            />

            <button type="button" onClick={() => remove(index)}>
              <MdClose size={16} color={"red"} />
            </button>
          </div>
        ))}
      </div>
      <button
        className="text-xs rounded-md bg-gray/70 hover:bg-gray font-medium p-2"
        type="button"
        onClick={() => append({ name: "" })}
      >
        + Add
      </button>
      <div className="my-5">
        <label className="text-xs text-gray-dark">Correct options</label>
        <input
          className="!w-full"
          type="text"
          {...register("correctanswer")}
        />
      </div>

      <button
        className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
