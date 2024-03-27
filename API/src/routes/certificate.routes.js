// const express = require('express')
// const router = express.Router()

// const {
//     verifyCertificate, getCertificateForCourse,
//     getAllUsersCertificates, getCertificateData
// } = require('../controllers/certificate.controllers')

// const { basicAuth } = require('../middlewares/auth')
// const permit = require('../middlewares/permission_handler') 

// router.use(basicAuth(), permit('Admin SuperAdmin EndUser'))

// router
//     .post('/verify/:sn', verifyCertificate)
//     .get('/course/:id', getCertificateForCourse)
//     .get('/:id', getCertificateData)
//     .get('/', getAllUsersCertificates)

// module.exports = router