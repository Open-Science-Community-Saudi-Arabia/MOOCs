/**
 * @category Backend API
 * @subcategory Models
 * 
 * @module Authentication Models
 * 
 * @requires mongoose
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

passwordSchema.methods.updatePassword = async function (newPassword) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(newPassword, salt);

    await this.save();
}

passwordSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}


const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
