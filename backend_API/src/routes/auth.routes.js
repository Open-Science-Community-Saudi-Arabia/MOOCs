const express = require('express');
const { basicAuth } = require('../middlewares/auth');
const rbac = require('../middlewares/permission_handler');
const authController = require('./../controllers/auth.controllers');
const router = express.Router();
const passport = require('passport');
const { githubStrategy } = require('../utils/passport');

/**
 * @todo - Improve modularity for passport
 */
passport.use(githubStrategy);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findOne({ googleId: id }, function (err, user) {
        done(err, user);
    });
});

router
    .post('/signup', authController.signup)
    .post('/addadmin', rbac('SuperAdmin'), authController.addAdmin)

    // SuperAdmin Account Activation/Deactivation
    .get('/superadmin/reqactivate', authController.requestSuperAdminAccountActivation)
    .post('/superadmin/activate', authController.activateSuperAdminAccount)
    .get('/superadmin/reqdeactivate', authController.requestSuperAdminAccountDeactivation)
    .post('/superadmin/deactivate', authController.deactivateSuperAdminAccount)

    // User Account Activation/Deactivation
    .get('/user/activate', rbac('SuperAdmin'), authController.activateUserAccount)
    .get('/user/deactivate', rbac('SuperAdmin'), authController.deactivateUserAccount)

    .post('/login', authController.login)
    .post('/forgotpassword', authController.forgetPassword)
    .patch('/resetpassword/', basicAuth('password_reset'), authController.resetPassword)
    .get('/google', authController.googleSignin)
    .get(
        '/github',
        passport.authenticate('github', { scope: ['user:email'] })
    )
    .get(
        '/github/callback',
        passport.authenticate('github'),
        authController.passportOauthCallback
    )
    .post('/google/callback', authController.googleSignin)
    .get('/verifyemail/:token', authController.verifyEmail)
    .get('/user', authController.getLoggedInUser)

module.exports = router;
