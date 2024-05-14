/**
 * @category API
 * @subcategory Model
 *
 * @module Course
 */

/**
 * @typedef {Object} courseSchema
 *
 * @description This schema stores course.
 *
 * @property {String} author - The course author
 * @property {String} title - The course title
 * @property {String} description - Description of the course
 * @property {Array} course_section - The course section
 * @property {ObjectId} createdBy - The user who created the course
 * @property {Array} enrolled_users - List of enrolled user to the course
 * @property {string} preview_image - The course image
 * @property {string} status - The course status
 * @property {boolean} isAvailable - The course availability status
 * @property {boolean} enableEditing - Editing course status
/**
 * @type {courseSchema}
 */
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
        resources: [
          new Schema({
            type: String,
            title: String,
            title_tr: String,
            description: {
              type: String,
              required: true,
            },
            description_tr: {
              type: String,
            },
            file: {
              type: String,
              required: function () {
                return this.type === "pdf";
              },
            },
            link: {
              type: String,
              required: function () {
                return this.type === "video";
              },
            },
            quiz: {
              type: Array,
              required: function () {
                return this.type === "quiz";
              },
              default: undefined,
            },
          }),
        ],
      }),
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    enrolled_users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    preview_image: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Draft", "Archived", "Rejected"],
      default: "Pending",
    },
    isAvailable: { type: Boolean, default: true },
    enableEditing: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = {
  Course,
};
