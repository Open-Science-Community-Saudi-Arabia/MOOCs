const mongoose = require('mongoose')
const Schema = mongoose.Schema

const options = { toObject: { virtuals: true } }

const user_schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, enum: ['enduser', 'admin'] }
}, options, { timestamp: true })

const User = mongoose.model('User', user_schema)

module.exports = User