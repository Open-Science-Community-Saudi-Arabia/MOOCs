const express = require('express');
const { basicAuth } = require('../middlewares/auth');
const rbac = require('../middlewares/permission_handler');
const authController = require('../controllers/auth.controllers');
const router = express.Router();


router
    .post('/signup', authController.signup)
    // SuperAdmin Account Activation/Deactivation
    .post('/login-admin', authController.loginSuperAdmin)
    .get('/superadmin/reqactivation/:email', authController.requestSuperAdminAccountActivation)
    .post('/superadmin/activate', basicAuth('su_activation'), authController.activateSuperAdminAccount)
    .get('/superadmin/reqdeactivation/:email', authController.requestSuperAdminAccountDeactivation)
    .post('/superadmin/deactivate', basicAuth('su_deactivation'), authController.deactivateSuperAdminAccount)

    // User Account Activation/Deactivation
    .post('/user/activate/:email', basicAuth(), rbac('SuperAdmin'), authController.activateUserAccount)
    .post('/user/deactivate/:email', basicAuth(), rbac('SuperAdmin'), authController.deactivateUserAccount)

    .post('/login', authController.login)
    .post('/forgotpassword', authController.forgetPassword)
    .patch('/resetpassword/', basicAuth('password_reset'), authController.resetPassword)
    .post('/googlesignin', authController.googleSignin)
    .post('/google/callback', authController.googleSignin)
    .get('/verifyemail/:token', authController.verifyEmail)
    .get('/user', basicAuth(), authController.getLoggedInUser)

module.exports = router;
