const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require('../utils/config')

const blacklisted_tokens = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        tokens: [{ type: String }],
    },
    {
        createdAt: {
            type: Date,
            expires: config.JWT_REFRESH_EXP || "5d",
            default: Date.now,
        },
    }
);
const BlacklistedToken = mongoose.model(
    "BlacklistedTokens",
    blacklisted_tokens
);

module.exports = {
    BlacklistedToken
};
