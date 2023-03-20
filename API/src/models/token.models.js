/**
 * @category Backend API
 * @subcategory Models
 * 
 * @module Authentication Models
 * 
 * @requires mongoose
 */


const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { JWT_REFRESH_EXP } = require("../utils/config");

/**
 * @typedef {MongooseDocument} BlacklistedToken
 * @property {string} token - The token to be blacklisted
 * @property {Date} createdAt - The date the token was blacklisted
 * @property {Date} expires - The date the token will be deleted
 * @property {Date} updatedAt - The date the token was last updated
 */
const blacklistedTokenSchema = new schema(
    {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true, expires: JWT_REFRESH_EXP }
);


/**
 * @typedef {MongooseDocument} AuthCode
 * @property {string} user - The user the code is for
 * @property {string} verification_code - The verification code
 * @property {string} password_reset_code - The password reset code
 * @property {string} activation_code - The activation code
 * @property {string} deactivation_code - The deactivation code
 * @property {Date} createdAt - The date the code was created
 * @property {Date} updatedAt - The date the code was last updated
 * @property {Date} expires - The date the code will be deleted
 * 
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

/*
* @typedef {MongooseDocument} TestAuthToken
* @property {string} user - The user the code is for
* @property {string} access_token - The access token
* @property {Date} createdAt - The date the code was created
* @property {Date} updatedAt - The date the code was last updated
* @property {Date} expires - The date the code will be deleted
*
* */ 
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
