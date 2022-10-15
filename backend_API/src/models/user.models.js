const mongoose = require('mongoose')
const Password = require('./password.models')
const Schema = mongoose.Schema

const options = { toObject: { virtuals: true } }

const user_schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, enum: ['EndUser', 'Admin'] },
    password: { type: String }
}, options, { timestamp: true })

// Virtualproperty to get user password from Password collection
user_schema.virtual('password', {
    ref: "Password",
    localField: "_id",
    foreignField: "user_id",
    justOne: true
})

user_schema.pre('save', () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Save password reference for user in Password collection
            await Password.create({
                user_id: this._id,
                password: this.password,
                role: this.role
            })
    
            // Set password field in User collection to null
            this.password = null
    
            resolve(this)
        } catch (error) {
            reject(error)
        }
    })
})

const User = mongoose.model('User', user_schema)

module.exports = User