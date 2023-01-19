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
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
