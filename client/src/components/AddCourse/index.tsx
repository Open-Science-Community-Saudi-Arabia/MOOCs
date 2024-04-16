import { t } from "@lingui/macro";
import "./style.scss";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import NestedArray from "./NestedArray";
import Modal from "../Modal";
import { useState } from "react";
import Question from "./Question";
import EditQuestion from "./EditQuestion";

type Inputs = {
  title: string;
  description: string;
  coursesection: {
    title: string;
    description: string;
    video: { link: [] }[];
  }[];
};
const defaultValues: Inputs = {
  title: "",
  description: "",
  coursesection: [
    {
      title: "",
      description: "",
      video: [],
    },
  ],
};

let renderCount = 0;
export default function index() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<{
    title: string;
    option: { name: string }[];
    correctanswer: string;
  }>();
  const [exerciseQuestion, setExerciseQuestion] = useState<
    {
      coursesection: number;
      question: { title: string; options: []; correctanswer: string }[];
    }[]
  >([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    let see = data.coursesection.map((ele, index) => ({
      ...ele,
      ...exerciseQuestion[index],
    }));
    console.log(see);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "coursesection",
  });

  renderCount++;

  const editQuestionHandler = (values: any) => {
    console.log(values);
  };
  const addQuestionHandler = (values: any) => {
    const currentQuestion = {
      coursesection: currentSection,
      question: [values],
    };
    if (exerciseQuestion.length > currentSection) {
      const newExerciseQuestion = exerciseQuestion.map((exercise) => {
        if (exercise.coursesection === currentSection) {
          return {
            ...exercise,
            question: exercise.question.concat(currentQuestion.question),
          };
        }
        return exercise;
      });
      setExerciseQuestion(newExerciseQuestion);
    } else {
      setExerciseQuestion((current) => [...current, currentQuestion]);
    }

    setOpen(false);
  };

  // console.log(exerciseQuestion);
  return (
    <div className="add-new-course w-full">
      <h1 className="text-xl font-semibold py-8 text-primary">New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 w-full">
          <label className="" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            placeholder={t`Title`}
            {...register("title", { required: true })}
          />
        </div>
        <div className="w-full">
          <label className="" htmlFor="description">
            Description
          </label>
          <textarea
            className="h-36"
            placeholder={t`Description`}
            {...register("description", { required: true })}
          />
        </div>

        <div className="flex items-center gap-x-6 mt-28 mb-4">
          <button
            className="course-section-btn"
            type="button"
            onClick={() => append({ title: "", description: "", video: [] })}
          >
            Add course section
          </button>
        </div>

        {fields.map((item, index) => (
          <div key={index} className="my-16 relative">
            <div>
              <div>
                <label className="font-bold !text-base">
                  Course section {index + 1}
                </label>
                <button
                  type="button"
                  className="italic text-xs text-red underline ml-64"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
              <div className="my-3 flex items-center gap-x-8">
                <div className="w-full">
                  <label className="" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="!w-full"
                    type="text"
                    placeholder={t`course title`}
                    {...register(`coursesection.${index}.title`, {
                      required: true,
                    })}
                  />
                </div>
                <div className="w-full">
                  <label className="" htmlFor="title">
                    Description
                  </label>

                  <input
                    className="!w-full"
                    type="text"
                    placeholder={t`course description`}
                    {...register(`coursesection.${index}.description`, {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>

            <NestedArray
              currentQuestionHandler={() => {
                setCurrentQuestion(undefined);
              }}
              addExercise={() => {
                setCurrentSection(index), setOpen(true);
              }}
              nestIndex={index}
              {...{ control, register }}
            />
            {exerciseQuestion[index] && (
              <div className="flex items-center gap-x-3">
                <label>Exercises</label>
                <div className="border-gray/50 mt-2 gap-x-3 border w-96 rounded-lg p-3 w-max-content flex items-center">
                  {exerciseQuestion[index]?.question.map(
                    (ele: any, j: number) => {
                      return (
                        <button
                          key={j}
                          className="underline text-sm text-gray-dark"
                          onClick={() => {
                            setCurrentQuestion(ele), setOpen(true);
                          }}
                        >
                          Question{j + 1}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-48">
          <button
            type="submit"
            className="w-96 text-white bg-primary py-4 rounded-lg mt-1 hover:bg-primary/80 font-medium"
          >
            {" "}
            Add Course{" "}
          </button>
        </div>
      </form>
      <Modal show={open} handleClose={() => setOpen(false)}>
        {currentQuestion ? (
          <EditQuestion
            currentQuestion={currentQuestion}
            editQuestionHandler={editQuestionHandler}
          />
        ) : (
          <Question addQuestionHandler={addQuestionHandler} />
        )}
      </Modal>
    </div>
  );
}
