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

const TestToken = mongoose.model('TestToken', test_token_schema)

module.exports = TestToken
