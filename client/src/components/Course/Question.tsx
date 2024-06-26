import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { Options } from "./Options";
import { v4 as uuidv4 } from "uuid";
import { Trans } from "@lingui/macro";

export default function Question({
  subNestIndex,
  nestIndex,
  control,
  register,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});

  const { remove, fields, append } = useFieldArray({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });

  const quizArr = useWatch({
    control,
    name: `coursesection.${nestIndex}.resources.${subNestIndex}.quiz`,
  });

  return (
    <div className="flex items-center gap-x-3 h-auto flex-wrap">
      {quizArr?.length > 0 &&
        quizArr?.map((ele: any, j: number) => {
          return (
            <button
              type="button"
              key={j}
              className="underline text-xs text-gray-dark"
              onClick={() => {
                setSelectedQuestion({ ...ele, index: j });
              }}
            >
              <Trans> Question </Trans>
              {j + 1}
            </button>
          );
        })}

      <button
        className="py-2 px-3 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 font-medium"
        type="button"
        onClick={() => {
          setOpen(true),
            append({
              _id: uuidv4(),
              options: [{ name: "" }],
              question: "",
              correctanswer: "",
            });
        }}
      >
        <Trans> Add Question</Trans>
      </button>
      {selectedQuestion?.question && (
        <Modal
          show={selectedQuestion.question}
          handleClose={() => {
            setSelectedQuestion("");
          }}
        >
          <h2 className="font-semibold">
            {" "}
            <Trans> Question</Trans> {selectedQuestion.index + 1}{" "}
          </h2>
          <div className="my-5">
            <label className="text-xs text-gray-dark">
              <Trans>Question</Trans>
            </label>
            <input
              type="text"
              className="!w-full"
              defaultValue={selectedQuestion.question}
            />
          </div>
          <label className="text-xs text-gray-dark">
            <Trans>Options (max 4)</Trans>
          </label>
          {selectedQuestion.options.map((ele: { name: string }, i: number) => (
            <input
              key={i}
              type="text"
              className="!w-full"
              defaultValue={ele.name}
            />
          ))}

          <div className="my-5">
            <label className="text-xs text-gray-dark">
              <Trans>Correct options</Trans>
            </label>
            <input
              className="!w-full"
              type="text"
              defaultValue={selectedQuestion.correctanswer}
            />
          </div>

          <button
            className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
            type="button"
            onClick={() => {
              remove(selectedQuestion.index);
              setSelectedQuestion("");
            }}
          >
            <Trans> Delete</Trans>
          </button>
        </Modal>
      )}

      {fields.map((field, k) => {
        return (
          quizArr?.length - 1 === k && (
            <Modal
              key={field.id}
              show={open}
              handleClose={() => {
                remove(k), setOpen(false);
              }}
            >
              <h2 className="font-semibold">
                <Trans> New Question</Trans>
              </h2>
              <div className="my-5">
                <label className="text-xs text-gray-dark">
                  <Trans>Question</Trans>
                </label>
                <input
                  type="text"
                  className="!w-full"
                  autoComplete="false"
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.question`,
                    { required: true }
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
                <label className="text-xs text-gray-dark">
                  <Trans> Correct options</Trans>
                </label>
                <input
                  className="!w-full"
                  type="text"
                  autoComplete="false"
                  {...register(
                    `coursesection.${nestIndex}.resources.${subNestIndex}.quiz.${k}.correctanswer`,
                    { required: true }
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
                    quizArr[k].options.find(
                      (ele: { name: string }) => ele.name === ""
                    )
                  ) {
                    toast.error("Incomplete field", {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 5000,
                      theme: "colored",
                    });
                  } else {
                    setOpen(false);
                  }
                }}
              >
              <Trans> Add</Trans>
              </button>
            </Modal>
          )
        );
      })}
    </div>
  );
}
