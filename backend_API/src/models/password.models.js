const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const password = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "EndUser"]
    },
    password: { type: String, required: true }
}, { timestamp: true })

password.pre("save", async function (next) {
    // Hash users password before saving
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})
const Password = mongoose.model("Password", password)


module.exports = Password