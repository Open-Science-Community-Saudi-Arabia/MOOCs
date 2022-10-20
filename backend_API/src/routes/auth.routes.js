const express = require('express')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
// router.post('/verifyemail', signupController)
// router.post('/password reset', signupController)

module.exports = router
