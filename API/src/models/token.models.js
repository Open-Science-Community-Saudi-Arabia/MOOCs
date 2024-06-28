/**
 * @category API
 * @subcategory Model
 *
 * @module Token
 *
 * @description This module contains the models for authentication,
 * such as the blacklisted token model and the auth code model.
 *
 * @requires mongoose
 * @requires ../utils/config
 */

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { JWT_REFRESH_EXP } = require("../utils/config");

/**
 * @typedef {Object} blacklistedTokenSchema
 *
 * @description This schema is used to store blacklisted JWT tokens,
 * so that they can be checked against when a user tries to access a protected route.
 * @property {String} token - The blacklisted token
 * @property {Date} createdAt - The date the token was blacklisted
 * @property {Date} expiresAt - The date the token will expire,
 *
 *
 */
const blacklistedTokenSchema = new schema(
  {
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, expires: JWT_REFRESH_EXP }
);

/**
 * @typedef {Object} authCodeSchema
 *
 * @description This schema is used to store verification codes for user authentication,
 * such as the verification code for email verification, the password reset code.
 *
 * @property {ObjectId} user - The user to whom the code belongs
 * @property {String} verification_code - The verification code
 * @property {String} password_reset_code - The password reset code
 * @property {String} [activation_code] - The account activation code, for superadmin
 * account activation
 * @property {String} [deactivation_code] - The account deactivation code, for superadmin
 * account deactivation
 * @property {Date} createdAt - The date the code was created
 *
 * @see {@link module:UserModel~userSchema userSchema}
 * */
const authCodeSchema = new schema(
  {
    user: { type: schema.Types.ObjectId, ref: "User", required: true },
    verification_code: { type: String },
    password_reset_code: { type: String },
    activation_code: { type: String },
    deactivation_code: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const testAuthToken = new schema({
  user: { type: schema.Types.ObjectId, ref: "User", required: true },
  access_token: { type: schema.Types.String },
});

const TestAuthToken = mongoose.model("TestAuthToken", testAuthToken);
testAuthToken.pre("save", async function () {
  if (process.env.NODE_ENV != "test") {
    throw "TestAuthToken collection is only meant for `test` environment";
  }
});

const AuthCode = mongoose.model("AuthCode", authCodeSchema);
const BlacklistedToken = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);
module.exports = { BlacklistedToken, AuthCode, TestAuthToken };
