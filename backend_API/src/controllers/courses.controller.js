const Video = require("../models/course.models")
const {v2} = require("cloudinary")
const asyncWrapper = require("../utils/async_wrapper")


exports.createCourses = asyncWrapper(
    async (req, res, next) => {
	 const newCourse = new Video(req.body);
       try{
            const savedCourse = await newCourse.save();
            res.status(200).json(savedCourse);
       }catch(err){
            res.status(500).json(err);
       }

    }
)

exports.getCourses = asyncWrapper(
    async (req, res, next) => {

        const courses = await Video.find().sort({_id: -1})
        return res.status(200).send({ courses: courses })

    }
)

exports.deleteCourse = asyncWrapper(
    async (req, res, next) => {

        const courseId = req.params.courseId
        const course = await Video.findByIdAndDelete(courseId)

        res.status(200).send({ message: "course has been deleted successfully" }) 
    }
)
