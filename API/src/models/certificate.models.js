const mongoose = require("mongoose")
const Schema = mongoose.Schema

const options = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }

const certificateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    course_report: { type: Schema.Types.ObjectId, ref: "CourseReport", required: true },
    certificate_url: { type: String, required: true },
    serial_number: {
        type: Number, required: true, default: Date.now(),
    },
}, options)

const Certificate = mongoose.model("Certificate", certificateSchema)

module.exports = { Certificate }