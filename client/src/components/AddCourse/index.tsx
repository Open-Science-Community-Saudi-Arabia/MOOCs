import { t } from "@lingui/macro";
import "./style.scss";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import NestedArray from "./NestedArray";
import Modal from "../Modal";
import { useState } from "react";
import Question from "./Question";
import EditQuestion from "./EditQuestion";
import { createCourse } from "../../utils/api/courses";

type Inputs = {
  title: string;
  description: string;
  author: string;
  coursesection: {
    title: string;
    description: string;
    video: { title: ""; description: ""; link: [] }[];
  }[];
};
const defaultValues: Inputs = {
  title: "",
  description: "",
  author: "",

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
  const [selectedImage, setSelectedImage] = useState<any>();
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
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    data.coursesection.map((ele: any, index: any) => ({
      ...ele,
      ...exerciseQuestion[index],
    }));
    const formData = new FormData();
    formData.append("file", selectedImage[0]);
    formData.append("body", JSON.stringify(data));
    try {
      const res = await createCourse(formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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


  return (
    <div className="add-new-course w-full">
      <h1 className="text-xl font-semibold py-8 text-primary">New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between">
          <div className="w-8/12">
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
            <div className="mb-8 w-full">
              <label className="" htmlFor="cover-photo">
                Author
              </label>
              <input
                type="text"
                placeholder={t`Author`}
                {...register("author", { required: true })}
              />
            </div>
          </div>
          <div className="relative">
            <label>Cover photo</label>
            <label>
              {selectedImage ? (
                <div className="relative w-48 h-48 rounded-md overflow-hidden border-[1px] border-solid border-gray/20 flex items-center justify-center flex-col">
                  <img
                    className=" w-48 h-48"
                    src={URL.createObjectURL(selectedImage[0])}
                  />
                </div>
              ) : (
                <div className="w-48 cursor-pointer h-48 top-0 bg-gray z-20 rounded-md flex flex-col items-center justify-center font-medium text-xs p-5 text-center">
                  Click to upload image
                </div>
              )}

              <input
                type="file"
                size={100000}
                id="cover-photo"
                className="absolute top-20 text-sm invisible w-10"
                accept=".jpg, .jpeg, .png"
                placeholder={t`cover`}
                onChange={(e) => setSelectedImage(e.target.files)}
              />
            </label>
          </div>
        </div>

        <div className="w-5/6">
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
              <div className="flex items-center justify-between">
                <label className="font-bold !text-base">
                  Course section {index + 1}
                </label>
                <button
                  type="button"
                  className="italic text-xs text-red underline"
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
                          type="button"
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
