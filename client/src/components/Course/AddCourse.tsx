import { t } from "@lingui/macro";
import "./style.scss";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import NestedArray from "./NestedArray";
import { useState } from "react";
import {
  archiveACourse,
  createCourse,
  updateACourse,
} from "../../utils/api/courses";
import { parsedData } from "../../utils";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete, MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);
dayjs().format();

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

interface Props {
  getAvailableCourses?: () => void;
  selectedCourse?: any;
  handleSelectedCourse?: (selectedCourse: any) => void;
  role?: string;
}

let renderCount = 0;

/**
 * @category Client
 * @subcategory Pages
 * @module Add Course
 * @description Contributors and super-admin can add courses.
 *
 */
export default function index({
  getAvailableCourses,
  selectedCourse,
  handleSelectedCourse,
  role,
}: Props) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [status, setStatus] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const archiveCourse = async () => {
    setStatus("Archived");
    try {
      let res = await archiveACourse(selectedCourse._id);
      setStatus("");
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } catch (err) {
      setStatus("");
      toast.error("Request failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      getAvailableCourses!();
    }
  };

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

  if (Object.keys(errors).length) {
    toast.error(" Missing incomplete fields", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      theme: "colored",
    });
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    if (selectedImage === undefined && !selectedCourse) {
      toast.error("Add course preview image", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    const newData = await parsedData(data);

    if (selectedCourse?.title) {
      const tempData = { ...newData, status: selectedCourse?.status };

      const formData = new FormData();
      selectedImage ? formData.append("file", selectedImage[0]) : null;
      formData.append("body", JSON.stringify(tempData));

      try {
        const res = await updateACourse(selectedCourse._id, formData);
        setLoading(false);
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      } catch (err) {
        toast.error("Request Failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      }
    } else {
      const tempData = status.length ? { newData, status } : newData;

      const formData = new FormData();
      formData.append("file", selectedImage[0]);
      formData.append("body", JSON.stringify(tempData));
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
    if (selectedCourse) {
      getAvailableCourses!();
      handleSelectedCourse!("");
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
        selectedCourse ? "h-[90vh] overflow-auto pl-4 pr-6 md:pr-10" : "h-full"
      } add-new-course w-full`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
        <h1 className="text-xl font-semibold text-primary gap-x-2 flex items-center">
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

        {selectedCourse?.updatedAt && (
          <div className="md:flex items-center gap-x-2  md:mr-36">
            <p className="text-gray-dark/70 text-xs">
              {" "}
              Created on{" "}
              {dayjs(selectedCourse?.createdAt).format("MMMM Do, YYYY")};
            </p>
            <p className="text-gray-dark/70 text-xs">
              {" "}
              Last updated{" "}
              {dayjs(selectedCourse?.updatedAt).format("MMMM Do, YYYY")}
            </p>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-dark/50 pt-3">
        Ensure correct punctuation for all fields.
      </p>
      <form className="pt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:flex-row flex-col items-start justify-between">
          <div className="w-full md:w-8/12">
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
                <div className="relative w-28 h-28 md:w-48 md:h-48 rounded-md overflow-hidden border-[1px] border-solid border-gray/50 flex items-center justify-center flex-col">
                  <img
                    className="w-full h-full"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage[0])
                        : selectedCourse.preview_image
                    }
                  />
                </div>
              ) : (
                <div className="cursor-pointer w-28 h-28 md:w-48 md:h-48 top-0 bg-gray z-20 rounded-md flex flex-col items-center justify-center font-medium text-xs p-5 text-center">
                  Click to upload image (PNG,JPEG,JPG)
                  <span className="block">* Max Size: 100KB </span>
                </div>
              )}

              <input
                type="file"
                size={100000}
                id="cover-photo"
                className="absolute top-20 text-sm invisible w-10"
                accept=".jpg, .jpeg, .png"
                placeholder={t`cover`}
                onChange={(e) => {
                  if (e.target.files) {
                    if (e.target.files[0].size > 100000) {
                      toast.error("file size too large", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                        theme: "colored",
                      });
                    } else {
                      setSelectedImage(e.target.files);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 md:mt-0 w-full md:w-5/6">
          <label className="" htmlFor="description">
            Description
          </label>
          <textarea
            className="h-36"
            placeholder={t`Description`}
            {...register("description", { required: true })}
          />
        </div>

        <div className="flex items-center gap-x-6 mt-20 md:mt-28 mb-4">
          <button
            className="course-section-btn"
            type="button"
            onClick={() =>
              append({ title: "", description: "", resources: [] })
            }
          >
            <span className="flex items-center justify-center gap-x-1">
              {" "}
              <IoMdAddCircleOutline size={18} />
              Add Section
            </span>
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
                  className="italic text-xs text-error"
                  onClick={() => remove(index)}
                >
                  <MdDelete size={18} />
                </button>
              </div>
              <div className="my-3 flex items-center gap-x-4 md:gap-x-8">
                <div className="!w-4/6">
                  <label className="" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="!w-full"
                    maxLength={30}
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
              selectedCourse={selectedCourse}
              nestIndex={index}
              {...{ control, register }}
            />
          </div>
        ))}

        <div className="text-center mt-28 md:mt-48 mb-8 relative">
          {selectedCourse?.title ? (
            role === "SuperAdmin" ||
            (selectedCourse.enableEditing && (
              <button
                type="submit"
                className="w-56 text-white bg-primary py-4 h-14 rounded-lg mt-1 hover:bg-primary-hover font-medium"
              >
                {" "}
                {isLoading && status !== "Draft" ? (
                  <Spinner width="30px" height="30px" color="#fff" />
                ) : (
                  "Edit Course"
                )}
              </button>
            ))
          ) : (
            <button
              type="submit"
              className="w-56 text-white bg-primary py-4 h-14 rounded-lg mt-1 hover:bg-primary-hover font-medium"
            >
              {isLoading && status !== "Draft" ? (
                <Spinner width="30px" height="30px" color="#fff" />
              ) : (
                "Add Course"
              )}
            </button>
          )}
          {selectedCourse?.title ? (
            <button
              type="button"
              onClick={() => archiveCourse()}
              className="w-56 md:w-40 md:absolute right-0 top-2 text-white hover:bg-[#dc2626] h-12 text-sm bg-error rounded-lg mt-1 font-medium"
            >
              {" "}
              {status === "Archived" ? (
                <Spinner width="30px" height="30px" color="#fff" />
              ) : (
                <span className="flex items-center justify-center gap-x-2">
                  <MdOutlineDeleteOutline size={20} /> Delete Course
                </span>
              )}
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => setStatus("Draft")}
              className="w-56 md:w-40 md:absolute right-0 text-black top-2 hover:bg-[#b7c1cd] h-12 text-sm rounded-lg mt-1 bg-[#cbd5e1] font-medium"
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
