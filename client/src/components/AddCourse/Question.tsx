import { useEffect, useState } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { MdClose } from "react-icons/md";
import Modal from "../Modal";
import { toast } from "react-toastify";

export default function Question({
  subNestIndex,
  nestIndex,
  control,
  register,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });
  const quizArr = useWatch({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });

  return (
    <div className="flex items-center gap-x-3 h-auto flex-wrap">
      {quizArr?.map((ele: any, j: number) => {
        return (
          <button
            type="button"
            key={j}
            className="underline text-xs text-gray-dark"
            onClick={() => {
              setSelectedQuestion(j), setOpen(true);
            }}
          >
            Question {j + 1}
          </button>
        );
      })}

      <button
        className="py-2 px-3 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 font-medium"
        type="button"
        onClick={() => {
          setOpen(true),
            append({
              question: "",
              correctanswer: "",
              options: [],
            });
        }}
      >
        Add Question
      </button>
      {fields.map((item, k) => {
        return (
          <div key={item.id}>
            {/* <div className={`${selectedQuestion === k ? "block" : "hidden"}`}>
              <Modal
                show={open}
                handleClose={() => {
                  setOpen(false);
                }}
              >
                <h2 className="font-semibold"> New Question</h2>
                <div className="my-5">
                  <label className="text-xs text-gray-dark">Question</label>
                  <input
                    type="text"
                    className="!w-full"
                    {...register(
                      `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.question`
                    )}
                  />
                </div>
                <Options
                  subNestIndex={k}
                  nestIndex={nestIndex}
                  quizIndex={k}
                  {...{ control, register }}
                />

                <div className="my-5">
                  <label className="text-xs text-gray-dark">
                    Correct options
                  </label>
                  <input
                    className="!w-full"
                    type="text"
                    {...register(
                      `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.correctanswer`
                    )}
                  />
                </div>

                <button
                  className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
                  type="button"
                  onClick={() => {
                    if (
                      quizArr[k].question === "" ||
                      quizArr[k].correctanswer === "" ||
                      quizArr[k].options.length < 0
                    ) {
                      toast.error("incomplete field", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                        theme: "colored",
                      });
                    } else {
                      setOpen(false), setSelectedQuestion(-1);
                    }
                  }}
                >
                  Edit
                </button>
              </Modal>
            </div> */}
            <Modal
              show={open }
              handleClose={() => {
                setOpen(false), remove(k);
              }}
            >
              <h2 className="font-semibold"> New Question</h2>
              <div className="my-5">
                <label className="text-xs text-gray-dark">Question</label>
                <input
                  type="text"
                  className="!w-full"
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.question`
                  )}
                />
              </div>
              <Options
                subNestIndex={k}
                nestIndex={nestIndex}
                quizIndex={k}
                {...{ control, register }}
              />

              <div className="my-5">
                <label className="text-xs text-gray-dark">
                  Correct options
                </label>
                <input
                  className="!w-full"
                  type="text"
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.correctanswer`
                  )}
                />
              </div>

              <button
                className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
                type="button"
                onClick={() => {
                  if (
                    quizArr[k].question === "" ||
                    quizArr[k].correctanswer === "" ||
                    quizArr[k].options.length < 0
                  ) {
                    toast.error("incomplete field", {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 5000,
                      theme: "colored",
                    });
                  } else {
                    setOpen(false), setSelectedQuestion(-1);
                  }
                }}
              >
                Add
              </button>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}

export function Options({
  subNestIndex,
  nestIndex,
  quizIndex,
  control,
  register,
}: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${quizIndex}.options`,
  });
  return (
    <div className="h-auto max-h-64 overflow-auto">
      <label className="text-xs text-gray-dark">Options (max 4)</label>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="mb-2 gap-x-4 flex items-center">
            <input
              {...register(
                `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${quizIndex}.options.${index}.name`
              )}
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
