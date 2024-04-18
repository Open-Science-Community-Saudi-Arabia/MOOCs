import { useEffect } from "react";
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
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
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
      <h2 className="font-semibold"> Edit Question</h2>
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
          {...register("correctanswer", { required: true })}
        />
      </div>

      <button
        className="w-64 block mx-auto text-white bg-primary py-3 rounded-lg mt-1 hover:bg-primary/90 font-medium"
        type="submit"
      >
        Edit
      </button>
    </form>
  );
}




// const reqBody = Object.assign({}, req.body);
//   const parseReqBody = JSON.parse(reqBody.body);
//   console.log(parseReqBody);
//   const preview_image = req.file;
//   if (!preview_image) {
//     return next(new BadRequestError("Missing preview image"));
//   }

//   const newCourse = await Course.create(parseReqBody);
//   // await newCourse.save();
//   console.log(newCourse );
//   // // Upload preview image to cloudinary
//   const file_url = await uploadToCloudinary({
//     path: preview_image.path,
//     file_name: `course_preview_${newCourse._id}`,
//     destination_path: "courses/preview_images",
//   });

//   // const courseTemp = await CourseReport.findOne({
//   //   _id: newCourse.id,
//   // });

//   // // Save file url to database
//   // newCourse.preview_image = file_url;
//   // const savedCourse = await newCourse.save();

//   // parseReqBody.coursesection.map(async (ele) => {
//   //   const test = await CourseSection.create({
//   //     title: ele.title,
//   //     course: course_id,
//   //   });
//   //   console.log(test);
//   //   // ele.video.map(async (videoEle) => {
//   //   //   await Video.create({
//   //   //     title: videoEle.title,
//   //   //     video_url: videoEle.url,
//   //   //     description: videoEle.description,
//   //   //     course: course_id,
//   //   //     course_section: course_section._id,
//   //   //   });
//   //   // });
//   // });