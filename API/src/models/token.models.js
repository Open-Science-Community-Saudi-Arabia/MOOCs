const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { JWT_REFRESH_EXP } = require("../utils/config");

const blacklistedTokenSchema = new schema(
    {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true, expires: JWT_REFRESH_EXP }
);

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
