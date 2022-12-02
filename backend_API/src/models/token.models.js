const { config } = require('dotenv')
const mongoose = require('mongoose')
const { Schema } = mongoose

const test_token_schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    password_reset: {
        type: String,
        required: false
    },
    email_verification: {
        type: String,
        required: false
    },
    verification: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

const blacklisted_token_schema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, { timestamps: true, expires: config.JWT_REFRESH_TOKEN_EXPIRES_IN })


const TestToken = mongoose.model('TestToken', test_token_schema)
const BlacklistedToken = mongoose.model('BlacklistedToken', blacklisted_token_schema)

module.exports = { TestToken, BlacklistedToken }
