const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const authcode_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    password_reset_code: {
        type: String,
    },
    verification_code: {
        type: String,
    },
    expires: {
        type: Date,
        required: true,
        default: Date.now() + 10 * 60 * 1000,
    },
});

const AuthCode = mongoose.model('AuthCode', authcode_schema);

module.exports = AuthCode;




