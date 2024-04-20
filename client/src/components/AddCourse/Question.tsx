import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import Modal from "../Modal";
import { toast } from "react-toastify";
import { Options } from "./Options";

export default function Question({
  subNestIndex,
  nestIndex,
  control,
  register,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>();
  // const [selectedQuestion, setSelectedQuestion] = useState<any>();

  const { remove, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });
  const quizArr = useWatch({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });
  console.log(selectedQuestion);
  const k = quizArr?.length - 1;
  return (
    <div className="flex items-center gap-x-3 h-auto flex-wrap">
      {quizArr?.map((ele: any, j: number) => {
        return (
          <button
            type="button"
            key={j}
            className="underline text-xs text-gray-dark"
            onClick={() => {
              setSelectedQuestion(ele);
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
              options: [{ name: "" }],
              question: "",
              correctanswer: "",
            });
        }}
      >
        Add Question
      </button>
      {selectedQuestion.length && (
        <Modal
          show={selectedQuestion.length}
          handleClose={() => {
            setOpen(false)
          }}
        >
          <h2 className="font-semibold"> Question </h2>
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

          {quizArr?.length > 0 && (
            <Options
             
              subNestIndex={subNestIndex}
              nestIndex={nestIndex}
              quizIndex={k}
              {...{ control, register }}
            />
          )}

          <div className="my-5">
            <label className="text-xs text-gray-dark">Correct options</label>
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
                setOpen(false);
              }
            }}
          >
            Add
          </button>
        </Modal>
      )}
      <Modal
        show={open}
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

        {quizArr?.length > 0 && (
          <Options
            quizArr={quizArr}
            subNestIndex={subNestIndex}
            nestIndex={nestIndex}
            quizIndex={k}
            {...{ control, register }}
          />
        )}

        <div className="my-5">
          <label className="text-xs text-gray-dark">Correct options</label>
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
              setOpen(false);
            }
          }}
        >
          Add
        </button>
      </Modal>
    </div>
  );
}
