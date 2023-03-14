const express = require('express')
const router = express.Router()

const {
    createCourseSection, getCourseSectionData, updateCourseSection, deleteCourseSection
} = require('../controllers/coursesection.controllers')

const { basicAuth } = require('../middlewares/auth')
const permit = require('../middlewares/permission_handler')

router.use(basicAuth(), permit('Admin SuperAdmin EndUser'))

router
    .post('/new', createCourseSection)
    .get('/:id', getCourseSectionData)
    .patch('/update/:id', updateCourseSection)
    .delete('/delete/:id', deleteCourseSection)

module.exports = router