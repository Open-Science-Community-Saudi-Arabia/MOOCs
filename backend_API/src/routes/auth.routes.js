const express = require('express')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotpassword', authController.forgetPassword)
router.patch('/resetpassword/:token', authController.resetPassword)
router.post('/googlesignin', authController.googleSignin)
router.get('/verifyemail/:token', authController.verifyEmail)

module.exports = router
