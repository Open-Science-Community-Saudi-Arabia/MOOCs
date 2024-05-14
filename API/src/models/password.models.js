/**
 * @category API
 * @subcategory Model
 * 
 * @module Authentication
 * 
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


/**
 * @typedef {Object} passwordSchema
 * 
 * @description This schema stores user hashed passwords.
 * 
 * @property {String} password - The user password
 * @property {ObjectId} user - The user to whom the password belongs
 * 
 * @see {@link module:UserModel~userSchema userSchema}
 */

/**
 * @type {passwordSchema}
 */
const passwordSchema = new schema({
    password: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        ref: 'User',
    }
});

passwordSchema.pre('save', async function (next) {
    if (this.isNew) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
})

/**
 * @description This method is used to update the user password.
 * The new password is hashed and saved to the database.
 * 
 * @method updatePassword
 * @param {string} newPassword 
 */
passwordSchema.methods.updatePassword = async function (newPassword) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(newPassword, salt);
    await this.save();
}

/**
 * @description This method is used to compare the user password with the password.
 * 
 * @method comparePassword
 * @param {string} password
 * 
 * @returns {boolean}
 * 
 * @see {@link https://www.npmjs.com/package/bcryptjs bcryptjs}
 * */
passwordSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}


const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
