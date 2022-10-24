const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { BadRequestError } = require('../utils/custom_errors')
const Schema = mongoose.Schema

const options = { toObject: { virtuals: true } }

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
            enum: ['EndUser', 'Admin'],
            default: 'EndUser',
        },
        password: {
            type: String,
            required: [true, 'Please provide your password'],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (el) {
                    return el === this.password
                },
                message: 'Password do not match',
            },
            select: false,
        },
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
    },
    options,
    { timestamp: true },
)

// Virtual Property to get user password from Password collection
// user_schema.virtual('password', {
//     ref: "Password",
//     localField: "_id",
//     foreignField: "user_id",
//     justOne: true
// })


user_schema.pre('save', function (next) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!this.isModified('password')) return next()
            this.password = await bcrypt.hash(this.password, 12)
            this.passwordConfirm = undefined

            // Extra check incase mongodb index for email is not created
            const email_exists = await User.findOne({ email: this.email })
            if (email_exists) {
                return reject(new BadRequestError('Email already exists please user another email'))
            }

            resolve(this)
        } catch (error) {
            reject(error)
        }
    })
})

user_schema.methods.comparePassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

user_schema.methods.changePassword = async function (newPassword) {
    return new Promise(async (resolve, reject) => {
        try {
            const new_hash =  await bcrypt.hash(newPassword, 12)

            await this.updateOne({
                password: new_hash,
                passwordConfirm: new_hash,
                passwordResetToken: undefined,
                passwordResetTokenExpires: undefined
            })

            resolve(this)
        } catch (error) {
            reject(error)
        }
    })
}

user_schema.methods.createHashedToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.passwordResetTokenExpires = Date.now() + 1 * 60 * 1000
    return resetToken
}

const User = mongoose.model('User', user_schema)

module.exports = User
