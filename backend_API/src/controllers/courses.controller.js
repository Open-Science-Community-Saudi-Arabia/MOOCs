const Video = require("../models/course.models")
const {v2} = require("cloudinary")
const asyncWrapper = require("../utils/async_wrapper")

exports.getCourses = asyncWrapper(
    async (req, res, next) => {

        return await Video.find().sort({_id: -1})

    }
)

exports.deleteCourse = asyncWrapper(
    async (req, res, next) => {

        const courseId = req.params.courseId
        const course = await Video.findByIdAndDelete(courseId)

        return "course has been deleted successfully"
    }
)