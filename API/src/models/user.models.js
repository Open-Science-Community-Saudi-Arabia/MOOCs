/**
 * @fileoverview User Model
 * 
 * @category Backend API
 * @subcategory Models
 * 
 * @module User Model
 * 
 * @requires mongoose
 * @requires ../utils/errors
 * @requires validator
 * @requires ./token.models
 */

const mongoose = require('mongoose')
const { BadRequestError } = require('../utils/errors')
const validator = require('validator')
const Schema = mongoose.Schema

const options = { toObject: { virtuals: true } }

/**
 * @description User account status, every user has a status object,
 * which contains information about the user's account status,
 * such as whether the account is active or not, and whether the account is verified or not.
 * 
 * @property {ObjectId} user - The user to whom the status belongs
 * @property {Boolean} isActive - Whether the account is active or not
 * @property {Boolean} isVerified - Whether the account is verified or not
 */
const status = new Schema({
    user: { type: String, required: true, ref: 'User' },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
})

/**
 * @description This schema is used to store user information
 * 
 * @property {String} firstname - The user's first name
 * @property {String} lastname - The user's last name
 * @property {String} email - The user's email
 * @property {String} role - The user's role (EndUser, Admin, SuperAdmin)
 * @property {String} googleId - The user's google id
 * @property {String} githubId - The user's github id
 * @property {Date} createdAt - The date the user was created
 * @property {Date} updatedAt - The date the user was last updated
 */
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
    },
    options,
    { timestamp: true, toObject: { virtuals: true } },
)

// Get users password from Password collection
/**
 * @description This virtual property is used to get the 
 * user's password from the Password collection
 * 
 * @property {ObjectId} ref - The Password collection
 * @property {ObjectId} localField - The user's id
 * @property {ObjectId} foreignField - The user's id
 * @property {Boolean} justOne - Whether to return one or many
 */
user_schema.virtual('password', {
    ref: "Password",
    localField: "_id",
    foreignField: "user",
    justOne: true
})

// Get authentication codes from AuthCode collection
/**
 * @description This virtual property is used to get the 
 * user's authentication codes from the AuthCode collection
 * 
 * @property {ObjectId} ref - The AuthCode collection
 * @property {ObjectId} localField - The user's id
 * @property {ObjectId} foreignField - The user's id
 * @property {Boolean} justOne - Whether to return one or many
 */
user_schema.virtual('auth_codes', {
    ref: "AuthCode",
    localField: "_id",
    foreignField: "user",
    justOne: true
})

// Get user users account status from Status collection
/**
 * @description This virtual property is used to get the
 * user's account status from the Status collection
 * 
 * @property {ObjectId} ref - The Status collection
 * @property {ObjectId} localField - The user's id
 * @property {ObjectId} foreignField - The user's id
 * @property {Boolean} justOne - Whether to return one or many
 * */
user_schema.virtual('status', {
    ref: "Status",
    localField: "_id",
    foreignField: "user",
    justOne: true
})

/**
 * @description This virtual property is used to get the
 * user's courses from the Course collection
 * 
 * @property {ObjectId} ref - The Course collection
 * @property {ObjectId} localField - The user's id
 * @property {ObjectId} foreignField - The user's id
 * @property {Boolean} justOne - Whether to return one or many
 */
user_schema.virtual('enrolled_courses', {
    localField: '_id',
    foreignField: 'enrolled_users',
    ref: 'Course'
})

user_schema.pre('save', async function (next, { skipValidation }) {
    if (skipValidation) return next();

    // Check if user already exists - Incase index is not created
    const email_exists = await User.findOne({ email: this.email })
    if (email_exists) {
        throw new BadRequestError('Email already exists please user another email')
    }

})


// user_schema.post('save', async function (doc, next) {
//     // Check if session is active
//     //console.log('post save')
//     //console.log(this)
//     let session;
//     //console.log(session)
//     if (this.session) { session = this.sesssion }

//     next()
// });

/**
 * @description This function is used to activate a user's account only if the user is an enduser
 * @this {User}
 * @param {Function} next - The next function to be called
 * @returns {void}
 * @throws {Error} - Throws an error if the user is not an enduser
 */
status.pre('save', async function (next) {
    // Check if it is a new document
    if (this.isNew) {
        //console.log('Not modified')
        await this.populate('user')
        // Check if user is an enduser
        if (this.user.role == 'EndUser') this.isActive = true;
        else this.isActive = false;
    }

    next()
})

const Status = mongoose.model('Status', status)
const User = mongoose.model('User', user_schema)

module.exports = { User, Status }
