const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    video: {
        type: String, /*video url*/
        required: false,
    },
    username: {      /*admin username*/
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
