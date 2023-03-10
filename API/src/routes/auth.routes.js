const express = require('express');
const { basicAuth } = require('../middlewares/auth');
const rbac = require('../middlewares/permission_handler');
const authController = require('../controllers/auth.controllers');
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
    .get('/googlesignin', authController.googleSignin)
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
    .get('/user', basicAuth(), authController.getLoggedInUser)

module.exports = router;
