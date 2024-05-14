// /**
//  * @category Backend API
//  * @subcategory Controllers
//  * @module Certificate Controller
//  * 
//  * @description This module contains the controller methods for the certificate routes.
//  * 
//  * @requires module:CertificateModel~certificateSchema
//  * @requires module:CourseReportModel~courseReportSchema
//  * @requires module:canvas
//  * 
//  * The following routes are handled by this module: <br>
//  * 
//  * </br>
//  * 
//  * <b>GET</b> /api/certificate/verify/:sn <br>
//  * <b>GET</b> /api/certificate/course/:id <br>
//  * <b>GET</b> /api/certificate/:id <br>
//  * <b>GET</b> /api/certificate/ <br>
//  * 
//  */

// const { Certificate } = require("../models/certificate.models")
// const { CourseReport } = require("../models/course.models")

// const fs = require("fs")
// const { createCanvas, loadImage } = require("canvas")
// const { uploadToCloudinary } = require("../utils/cloudinary")
// const { NotFoundError, BadRequestError, ForbiddenError } = require("../utils/errors")

// /**
//  * Verify Certificate
//  * 
//  * @description Verify certificate by serial number
//  * 
//  * @param {string} serial_number - Serial number of certificate to verify
//  * 
//  * @throws {BadRequestError} if missing param in request body
//  * @throws {NotFoundError} if certificate not found
//  * 
//  * @returns {Object} certificate
//  */
// exports.verifyCertificate = async (req, res, next) => {
//     const serial_number = req.params.sn

//     // Check if missing params
//     if (!serial_number || serial_number === ":sn") {
//         return next(new BadRequestError("Missing required param in request body"))
//     }

//     console.log(serial_number)

//     // Check if certificate exists
//     const certificate = await Certificate.findOne({ serial_number: Number(serial_number) }).populate({
//         path: "user course",
//         select: "title description _id firstname lastname email",
//     })
//     if (!certificate) {
//         return next(new NotFoundError("Certificate not found"))
//     }

//     return res.status(200).json({
//         success: true,
//         data: {
//             message: "Certificate found",
//             certificate,
//         }
//     })
// }

// /**
//  * Get certificate for course
//  * 
//  * @description Get certificate for course if it exists, else create it
//  * 
//  * @param {string} course_id - Id of course to get certificate for
//  * 
//  * @throws {BadRequestError} if missing param in request body
//  * @throws {NotFoundError} if course report not found
//  * @throws {ForbiddenError} if course not completed
//  * 
//  * @returns {Object} certificate
//  */
// exports.getCertificateForCourse = async (req, res, next) => {
//     const course_id = req.params.id

//     // Check if missing params
//     if (!course_id || course_id === ":id") {
//         return next(new BadRequestError("Missing required param in request body"))
//     }

//     // Check if course exists
//     const student_course_report = await CourseReport.findOne({ course: course_id, user: req.user.id })
//     if (!student_course_report) {
//         return next(new NotFoundError("User has not enrolled for course"))
//     }

//     // Check if user has completed course
//     if (!student_course_report.isCompleted) {
//         // return next(new ForbiddenError("Course not completed"))
//     }

//     // Check if certificate exists
//     const populate_conf = {
//         path: "user course",
//         select: "title description _id firstname lastname email",
//     }
//     if (student_course_report.certificate) {
//         return res.status(200).json({
//             success: true,
//             message: "Certificate found",
//             certificate: await student_course_report.certificate.populate(populate_conf),
//         })
//     }

//     // Create certificate   
//     const certificate = await this.issueCertificate(student_course_report)

//     return res.status(200).json({
//         success: true,
//         data: {
//             message: "Certificate issued",
//             certificate: await certificate.populate(populate_conf),
//         }
//     })
// }

// /**
//  * Get all certificates for user
//  * 
//  * @description Get all users certificates 
//  * 
//  * @returns {Object} certificates
//  * 
//  */
// exports.getAllUsersCertificates = async (req, res, next) => {
//     const populate_conf = {
//         path: "user course",
//         select: "title description _id firstname lastname email",
//     }
//     const certificates = await Certificate.find({ user: req.user.id }).populate(populate_conf)

//     return res.status(200).json({
//         success: true,
//         data: {
//             certificates,
//         }
//     })
// }

// /**
//  * Create certificate for student
//  * 
//  * @description Create certificate for student after completing a course
//  * 
//  * @param {string} student_course_report_id - Id of student course report
//  * 
//  * @param {MongooseDocument} student_course_report 
//  * @returns {MongooseDocument} certificate
//  */
// async function createCertificate(student_course_report) {
//     const certificate = new Certificate({
//         user: student_course_report.user,
//         course: student_course_report.course,
//         course_report: student_course_report._id,
//         serial_number: Date.now(),
//     });

//     // Create certificate image
//     const sample_certificate_path = "src/assets/sample_certificate.png"
//     const image = await loadImage(sample_certificate_path)

//     // Create canvas
//     const canvas = createCanvas(image.width, image.height)
//     const context = canvas.getContext("2d")

//     // Draw image on canvas
//     context.drawImage(image, 0, 0, image.width, image.height)

//     // Draw text on canvas
//     context.font = "italic 80px Arial"
//     context.fillStyle = "black"
//     context.textAlign = "center"

//     // Add user's fullname
//     let users_firstname = student_course_report.user.firstname,
//         users_lastname = student_course_report.user.lastname

//     // Capitalize first letter of firstname and lastname
//     users_firstname = users_firstname.charAt(0).toUpperCase() + users_firstname.slice(1)
//     users_lastname = users_lastname.charAt(0).toUpperCase() + users_lastname.slice(1)

//     const users_fullmame = `${users_firstname} ${users_lastname}`
//     context.fillText(users_fullmame, 1000, 900)

//     // Add course title
//     const course_title = student_course_report.course.title
//     context.fillText(course_title, 1000, 100)

//     // Add certificate id
//     const certificate_id = certificate.serial_number.toString()
//     context.font = "italic 30px Arial"
//     context.fillText(certificate_id, 1000, image.height - 60)

//     // Save image to file
//     const modified_image = canvas.toBuffer("image/png")
//     const image_path = "src/assets/certificate" + `_${certificate.serial_number.toString()}.png`
//     fs.writeFileSync(image_path, modified_image)

//     return certificate
// }

// /**
//  * Issue certificate to student
//  * 
//  * @param {ObjectId} report_id 
//  * @returns certificate 
//  * 
//  * @throws {Error} if missing Course report not found
//  * @throws {Error} if student has not completed course
//  */
// exports.issueCertificate = async (report_id) => {
//     const student_course_report = await CourseReport.findById(report_id).populate({
//         path: "course",
//         select: "title description _id",
//         populate: {
//             path: "author",
//             select: "name email _id",
//         },
//     }).populate('user certificate');

//     // Check if course report exists
//     if (!student_course_report) {
//         throw new BadRequestError("User has not enrolled for course");
//     }

//     // Check if student has already been issued a certificate
//     if (student_course_report.certificate) {
//         return student_course_report.certificate
//     }

//     // Check if student completed course
//     if (!student_course_report.isCompleted) {
//         throw new BadRequestError("Course not completed");
//     }

//     let certificate = await createCertificate(student_course_report)

//     // Upload file to cloudinary
//     const file_url = await uploadToCloudinary({
//         path: "src/assets/certificate" + `_${certificate.serial_number.toString()}.png`,
//         file_name: `certificate_${certificate._id}`,
//         destination_path: `course_${certificate.course._id}/user_${certificate.user._id}`,
//     });

//     // Delete file from local storage
//     fs.unlinkSync("src/assets/certificate" + `_${certificate.serial_number.toString()}.png`)
    
//     // Save file url to database
//     certificate.certificate_url = file_url
//     certificate = await certificate.save()

//     return certificate
// }

// /**
//  * Get certificate data
//  * 
//  * @description Get certificate data
//  * 
//  * @param {string} certificate_id - Id of certificate
//  * 
//  * @returns {Object} certificate
//  * 
//  * @throws {BadRequestError} if missing certificate_id
//  * @throws {NotfoundError} if certificate not found
//  */
// exports.getCertificateData = async (req, res, next) => {
//     const certificate_id = req.params.id

//     // Check if missing params
//     if (!certificate_id || certificate_id === ":id") {
//         return next(new BadRequestError("Missing required param in request body"))
//     }

//     // Check if certificate exists
//     const certificate = await Certificate.findById(certificate_id).populate({
//         path: "course",
//         select: "title description _id",
//     }).populate('user');

//     if (!certificate) {
//         return next(new NotFoundError('Certificate not found'))
//     }

//     return res.status(200).json({
//         success: true,
//         data: {
//             certificate,
//         }
//     })
// }