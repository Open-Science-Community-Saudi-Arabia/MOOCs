import { t } from "@lingui/macro";
import "./style.scss";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import NestedArray from "./NestedArray";
import { useState } from "react";
import { createCourse, updateACourse } from "../../utils/api/courses";
import { generateCloudinaryURL } from "../../utils";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

type Inputs = {
  title: string;
  description: string;
  author: string;
  coursesection: {
    title: string;
    description: string;
    resources: { title: ""; description: "" }[];
  }[];
};
type Props = {
  selectedCourse?: any;
  handleSelectedCourse?: (selectedCourse: any) => void;
};

let renderCount = 0;
export default function index({ selectedCourse, handleSelectedCourse }: Props) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [status, setStatus] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const defaultValues: Inputs = {
    title: selectedCourse ? selectedCourse?.title : "",
    description: selectedCourse ? selectedCourse?.description : "",
    author: selectedCourse ? selectedCourse?.author : "",
    coursesection: selectedCourse
      ? selectedCourse?.course_section
      : [
          {
            title: "",
            description: "",
            resources: [],
          },
        ],
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    setLoading(true);

    if (selectedCourse?.title) {
      const formData = new FormData();
      selectedImage ? formData.append("file", selectedImage[0]) : null;
      formData.append("body", JSON.stringify(data));

      try {
        const res = await updateACourse(selectedCourse._id, formData);
        setLoading(false);
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
        handleSelectedCourse!("");
      } catch (err) {

        toast.error("Request Failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      }
    } else {
      let coursesection = await Promise.all(
        data.coursesection.map(async (item: any, i: number) => {
          let resources = await Promise.all(
            item.resources.map(async (ele: any) => {
              if (ele.type === "video") {
                return (ele = {
                  type: ele.type,
                  title: ele.title,
                  description: ele.description,
                  link: ele.link,
                });
              }
              if (ele.type === "pdf") {
                return (ele = {
                  type: ele.type,
                  title: ele.title,
                  description: ele.description,
                  file: await generateCloudinaryURL(ele.file[0], data.title),
                });
              }
              if (ele.type === "quiz") {
                return (ele = {
                  type: ele.type,
                  title: ele.title,
                  description: ele.description,
                  quiz: ele.quiz,
                });
              }
              return ele;
            })
          );

          return { ...item, resources };
        })
      );

      const parseData = status.length
        ? { ...data, coursesection, status }
        : { ...data, coursesection };

      const formData = new FormData();
      formData.append("file", selectedImage[0]);
      formData.append("body", JSON.stringify(parseData));
      try {
        const res = await createCourse(formData);
        setLoading(false);
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
        navigate(-1);
      } catch (err) {

        toast.error("Request Failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      }
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "coursesection",
  });

  renderCount++;

  return (
    <div
      className={`${
        selectedCourse ? "h-[90vh] overflow-auto pr-8" : "h-full"
      } add-new-course w-full`}
    >
      <h1 className="text-xl font-semibold pb-8 text-primary gap-x-2 flex items-center">
        <button
          onClick={() =>
            selectedCourse?.title ? handleSelectedCourse!("") : navigate(-1)
          }
          className="text-primary"
        >
          <IoIosArrowBack />
        </button>
        {selectedCourse?.title ? "Edit Course" : "New Course"}
      </h1>
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
            <label>Course photo</label>
            <label>
              {selectedImage || selectedCourse?.title ? (
                <div className="relative w-48 h-48 rounded-md overflow-hidden border-[1px] border-solid border-gray/20 flex items-center justify-center flex-col">
                  <img
                    className=" w-48 h-48"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage[0])
                        : selectedCourse.preview_image
                    }
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
            onClick={() =>
              append({ title: "", description: "", resources: [] })
            }
          >
            Add course section
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="my-16 relative">
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
                  Delete
                </button>
              </div>
              <div className="my-3 flex items-center gap-x-8">
                <div className="!w-4/6">
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

            <NestedArray nestIndex={index} {...{ control, register }} />
          </div>
        ))}

        <div className="text-center mt-48 relative">
          <button
            type="submit"
            className="w-96 text-white bg-primary py-4 rounded-lg mt-1 hover:bg-primary/80 font-medium"
          >
            {" "}
            {isLoading && status !== "Draft" ? (
              <Spinner width="30px" height="30px" color="#fff" />
            ) : selectedCourse?.title ? (
              "Edit Course"
            ) : (
              "Add Course"
            )}
          </button>

          {!selectedCourse?.title && (
            <button
              type="submit"
              onClick={() => setStatus("Draft")}
              className="w-40 absolute right-0 text-black hover:bg-black/40 py-4 rounded-lg mt-1 bg-[#cbd5e1] font-medium"
            >
              {" "}
              {isLoading && status === "Draft" ? (
                <Spinner width="30px" height="30px" color="#fff" />
              ) : (
                "Save as Draft"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
