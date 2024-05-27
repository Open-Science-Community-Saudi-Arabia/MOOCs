import { Trans, t } from "@lingui/macro";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

type Inputs = {
  title: string;
  option: { name: string }[];
  correctanswer: string;
};
type Props = {
  editQuestionHandler: (values: any) => void;
  currentQuestion: {
    title: string;
    option: { name: string }[];
    correctanswer: string;
  };
};

export default function Question({
  editQuestionHandler,
  currentQuestion,
}: Props) {
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      title: currentQuestion.title,
      option: currentQuestion.option,
      correctanswer: currentQuestion.title,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    editQuestionHandler(values);
  };

  const { fields, remove, append } = useFieldArray({
    control,
    name: "option",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-semibold">
        {" "}
        <Trans>Edit Question</Trans>
      </h2>
      <div className="my-5">
        <label className="text-xs text-gray-dark">
          <Trans>Question</Trans>
        </label>
        <input
          type="text"
          className="!w-full"
          {...register("title", { required: true })}
        />
      </div>
      <div className="h-auto max-h-64 overflow-auto">
        <label className="text-xs text-gray-dark">
          <Trans>Options (max 4)</Trans>
        </label>
        {fields.map((item, index) => (
          <div key={index} className="mb-2 gap-x-4 flex items-center">
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
        <Trans> + Add</Trans>
      </button>
      <div className="my-5">
        <label className="text-xs text-gray-dark">
          <Trans>Correct options</Trans>
        </label>
        <input
          className="!w-full"
          type="text"
          {...register("correctanswer", { required: true })}
        />
      </div>
      <button
        className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
        type="submit"
      >
        <Trans> Edit</Trans>
      </button>
    </form>
  );
}
