const mongoose = require("mongoose")
const Schema = mongoose.Schema

const options = { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }

const certificateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    certificate_url: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    certificate_id: {
        type: String, required: true, default: Date.now(),
    },
}, options)

const Certificate = mongoose.model("Certificate", certificateSchema)

module.exports = { Certificate }