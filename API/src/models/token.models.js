/**
 * @category Backend API
 * @subcategory Models
 * 
 * @module AuthModel
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
 * so that they can be checked against when a user tries to access a protected route
 * 
 * <br>
 * 
 * <b>NOTE:</b> The token expiry is set to the same as the refresh token expiry.
 * because the no valid JWT will last longer than the refresh token.
 * This value can be modified in the config file.
 * 
 * @property {String} token - The blacklisted token
 * @property {Date} createdAt - The date the token was blacklisted
 * @property {Date} expiresAt - The date the token will expire, 
 * 
 * 
*/

/**
 * @typedef {Object} authCodeSchema
 * 
 * @description This schema is used to store verification codes for user authentication,
 * such as the verification code for email verification, the password reset code.
 * 
 * <br>
 * 
 * <b>NOTE:</b> The activation and deactivation codes are only used for 
 * superadmin account activation and deactivation.
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
 * @see {@link module:UsersModel~userSchema userSchema}
 * */ 


/**
 * @type {blacklistedTokenSchema}
 * */
const blacklistedTokenSchema = new schema(
    {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true, expires: JWT_REFRESH_EXP }
);

/**
 * @type {authCodeSchema}
 * */
const authCodeSchema = new schema(
    {
        user: { type: schema.Types.ObjectId, ref: "User", required: true },
        verification_code: { type: String },
        password_reset_code: { type: String },
        activation_code: { type: String },
        deactivation_code: { type: String },
        createdAt: { type: Date, default: Date.now },
        // expiresIn: { type: Date, default: Date.now + JWT_REFRESH_EXP },
    },
    { timestamps: true }
);

const testAuthToken = new schema({
    user: { type: schema.Types.ObjectId, ref: "User", required: true },
    access_token: { type: schema.Types.String }
});

const AuthCode = mongoose.model("AuthCode", authCodeSchema);

const BlacklistedToken = mongoose.model(
    "BlacklistedToken", 
    blacklistedTokenSchema
);
const TestAuthToken = mongoose.model('TestAuthToken', testAuthToken)

testAuthToken.pre('save', async function () {
    if (process.env.NODE_ENV != 'test') {
        throw "TestAuthToken collection is only meant for `test` environment"
    }
})

module.exports = { BlacklistedToken, AuthCode, TestAuthToken };
