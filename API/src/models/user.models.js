/**
 * @category API
 * @subcategory Model
 *
 * @module User
 * @description This module contains the user model and its submodels,
 * users are the main entities in the system, they are the ones who can access the API,
 * each user has a role, which determines the level of access they have to the API. </br>
 *
 * </br>
 * User roles: </br>
 * - EndUser - A regular user, who can access the API and use it to perform CRUD operations on the database. </br>
 * </br>
 * - Contributor -  A user who can access the API and use it to perform CRUD operations on the database,
 * but they can only access the data that they have created. </br>
 * </br>
 * - SuperAdmin - A user who can access the API and use it to perform CRUD operations on the database,
 * but they can only access the data that they have created, they can also create, update and delete users.
 *
 * @requires mongoose
 * @requires ../utils/errors
 * @requires validator
 * @requires ./token.models
 */

const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/errors");
const validator = require("validator");
const Schema = mongoose.Schema;
const options = { toObject: { virtuals: true } };

/**
 * @typedef {Object} statusSchema
 *
 * @description User account status, every user has a status object,
 * which contains information about the user's account status,
 * such as whether the account is active or not, and whether the account is verified or not.
 *
 * @property {ObjectId} user - The user to whom the status belongs
 * @property {Boolean} isActive - Whether the account is active or not
 * @property {Boolean} isVerified - Whether the account is verified or not
 *
 * @see {@link module:UserModel~userSchema userSchema}
 */

/**
 * @type {statusSchema}
 */
const statusSchema = new Schema({
  user: { type: String, required: true, ref: "User" },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
});


/**
 * @typedef {Object} userSchema
 * @description This schema is used to store user information
 *
 * @property {String} firstname - The user's first name
 * @property {String} lastname - The user's last name
 * @property {String} email - The user's email
 * @property {String} role - The user's role (EndUser, Contributor, SuperAdmin)
 * @property {String} [googleId] - The user's google id
 * @property {String} [githubId] - The user's github id
 * @property {MongooseVirtualType} password - The user's password object
 * @property {MongooseVirtualType} status - The user's status object
 * @property {MongooseVirtualType} auth_codes - The user's auth codes
 * @property {MongooseVirtualType} enrolled_courses - The courses the user is enrolled in
 * @property {Date} createdAt - The date the user was created
 * @property {Date} updatedAt - The date the user was last updated
 *
 * @see {@link https://mongoosejs.com/docs/guide.html#virtuals Mongoose Virtuals}
 * @see {@link module:UserModel~statusSchema statusSchema}
 * @see {@link module:AuthModel~authCodeSchema authCodeSchema}
 * @see {@link module:CourseModel~courseSchema courseSchema}
 * @see {@link module:AuthModel~passwordSchema passwordSchema}
 */

/**
 * @type {userSchema}
 */
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Provide a valid Email"],
    },
    role: {
      type: String,
      required: true,
      enum: ["EndUser", "Contributor", "SuperAdmin"],
      default: "EndUser",
    },
    quizScore: [],
    preferred_language: { type: String, enum: ["en", "ar"], default: "en" },
    googleId: { type: String, select: false },
    githubId: { type: String, select: false },
  },
  options,
  { timestamp: true, toObject: { virtuals: true } }
);



/**
 * @description This virtual property is used to get the
 * user's password from the Password collection
 *
 * @property {ObjectId} ref - The Password collection
 * @property {ObjectId} localField - The user's id
 * @property {ObjectId} foreignField - The user's id
 * @property {Boolean} justOne - Whether to return one or many
 */
userSchema.virtual("password", {
  ref: "Password",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

userSchema.virtual("auth_codes", {
  ref: "AuthCode",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

userSchema.virtual("status", {
  ref: "Status",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

userSchema.virtual("enrolled_courses", {
  localField: "_id",
  foreignField: "enrolled_users",
  ref: "Course",
});


// statusSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     await this.populate("user");
//     if (this.user.role == "EndUser") this.isActive = true;
//     else this.isActive = false;
//   }
//   next();
// });

const Status = mongoose.model("Status", statusSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Status };
