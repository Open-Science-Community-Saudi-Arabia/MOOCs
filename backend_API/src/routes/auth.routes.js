const express = require('express')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgetpassword', authController.forgetPassword)
router.patch('/resetpassword/:token', authController.resetPassword)
router.post('/googlesignin', authController.googleSignin)
// router.post('/verifyemail', signupController)

module.exports = router
