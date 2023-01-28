const mongoose = require('mongoose')
const { BadRequestError } = require('../utils/errors')
const validator = require('validator')
const Schema = mongoose.Schema

const options = { toObject: { virtuals: true } }

const status = new Schema({
    user: { type: String, required: true, ref: 'User' },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
})

const user_schema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Please Provide a valid Email'],
        },
        role: {
            type: String,
            required: true,
            enum: ['EndUser', 'Admin', 'SuperAdmin'],
            default: 'EndUser',
        },
        googleId: { type: String, select: false },
        githubId: { type: String, select: false },
        enrolled_courses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                status: {
                    type: String,
                    enum: ['Enrolled', 'Completed'],
                    default: 'Enrolled',
                }
            }]

    },
    options,
    { timestamp: true },
)

// Get users password from Password collection
user_schema.virtual('password', {
    ref: "Password",
    localField: "_id",
    foreignField: "user_id",
    justOne: true
})

// Get authentication codes from AuthCode collection
user_schema.virtual('auth_codes', {
    ref: "AuthCode",
    localField: "_id",
    foreignField: "user",
    justOne: true
})

// Get user users account status from Status collection
user_schema.virtual('status', {
    ref: "Status",
    localField: "_id",
    foreignField: "user",
    justOne: true
})


user_schema.pre('save', async function (next, { skipValidation }) {
    if (skipValidation) return next();

    // Check if user already exists - Incase index is not created
    const email_exists = await User.findOne({ email: this.email })
    if (email_exists) {
        throw new BadRequestError('Email already exists please user another email')
    }

})

user_schema.post('save', async function (doc, next) {
    if (!this.status) {
        const status = new Status({ user: this._id })
        await status.save()
    }
    next()
})

status.pre('save', async function (next) {
    const user = await User.findById(this.user)
    if (user.role == 'enduser') this.isActive = true;

    next()
})

const User = mongoose.model('User', user_schema)
const Status = mongoose.model('Status', status)

module.exports = { User, Status }
