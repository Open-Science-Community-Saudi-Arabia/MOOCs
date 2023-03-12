const { Certificate } = require("../models/certificate.models")
const { CourseReport } = require("../models/course.models")

const fs = require("fs")
const { createCanvas, loadImage } = require("canvas")
const { uploadToCloudinary } = require("../utils/cloudinary")

exports.verifyCertificate = async (req, res, next) => {
}

exports.getCertificateForCourse = async (req, res, next) => {
}

exports.getAllUsersCertificates = async (req, res, next) => {
}

async function createCertificate (student_course_report) {
    const certificate = new Certificate({
        user: student_course_report.user,
        course: student_course_report.course,
        course_report: student_course_report._id,
    });

    const sample_certificate_path = "src/assets/sample_certificate.png"
    const image = await loadImage(sample_certificate_path)

    const canvas = createCanvas(image.width, image.height)
    const context = canvas.getContext("2d")

    context.drawImage(image, 0, 0, image.width, image.height)

    context.font = "bold 30px Arial"
    context.fillStyle = "black"
    context.textAlign = "center"
    const users_fullmame = `${student_course_report.user.firstname} ${student_course_report.user.lastname}`
    context.fillText(users_fullmame, 500, 300)

    const course_title = student_course_report.course.title
    context.fillText(course_title, 500, 350)

    const modified_image = canvas.toBuffer("image/png")
    fs.writeFileSync("src/assets/certificate.png", modified_image)

    return certificate
}

exports.issueCertificate = async (report_id) => {
    const student_course_report = await CourseReport.findById( report_id ).populate({
        path: "course",
        select: "title description _id",
        populate: {
            path: "author",
            select: "name email _id",
        },
    }).populate('user');

    // Check if course report exists
    if (!student_course_report) {
        throw new Error("Course report not found");
    }

    // Check if student completed course
    if (!student_course_report.isCompleted) {
        throw new Error("Course report not completed");
    }

    let certificate = await createCertificate(student_course_report)

    // Upload file to cloudinary
    const file_url = await uploadToCloudinary({
        path: "src/assets/certificate.png",
        file_name: `certificate_${certificate._id}`,
        destination_path: `course_${certificate.course._id}/user_${certificate.user._id}`,
    });

    // Save file url to database
    certificate = await certificate.updateOne({ file_url });

    return certificate
}

