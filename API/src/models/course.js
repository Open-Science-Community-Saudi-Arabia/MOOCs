const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title_tr: {
      type: String,
    },
    description_tr: {
      type: String,
    },
    course_section: [
      new Schema({
        title: String,
        title_tr: String,
        description: {
          type: String,
          required: true,
        },
        description_tr: {
          type: String,
        },
        resources: [],
      }),
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    enrolled_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    preview_image: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    isAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = {
  Course,
};
