const express = require('express')
const router = express.Router()

const {
    verifyCertificate, getCertificateForCourse, getAllUsersCertificates
} = require('../controllers/certificate.controllers')

const { basicAuth } = require('../middlewares/auth')
const permit = require('../middlewares/permission_handler')

router.use(basicAuth(), permit('Admin SuperAdmin EndUser'))

router
    .post('/verify/:id', verifyCertificate)
    .get('/course/:id', getCertificateForCourse)
    .get('/', getAllUsersCertificates)

module.exports = router