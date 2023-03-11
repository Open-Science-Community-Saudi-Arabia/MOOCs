const express = require('express')
const router = express.Router()

const {
    createCourseSection, getCourseSectionData, updateCourseSection, deleteCourseSection, addVideoToCourseSection, addExerciseToCourseSection,
} = require('../controllers/coursesection.controllers')

const { basicAuth } = require('../middlewares/auth')
const permit = require('../middlewares/permission_handler')

router.use(basicAuth(), permit('Admin SuperAdmin EndUser'))

router
    .post('/new', createCourseSection)
    .get('/:id', getCourseSectionData)
    .patch('/update/:id', updateCourseSection)
    .delete('/delete/:id', deleteCourseSection)
    .post('/video/link', addVideoToCourseSection)
    .post('/exercise/link', addExerciseToCourseSection)

module.exports = router