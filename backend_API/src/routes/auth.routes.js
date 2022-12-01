const express = require('express')
const { basicAuth } = require('../middlewares/auth')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotpassword', authController.forgetPassword)
router.patch('/resetpassword/', authController.resetPassword)
router.post('/googlesignin', authController.googleSignin)
router.get('/verifyemail/:token', authController.verifyEmail)
router.get('/user', authController.getLoggedInUser)

module.exports = router
