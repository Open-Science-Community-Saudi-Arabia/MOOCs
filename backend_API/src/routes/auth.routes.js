const express = require('express');
const { basicAuth } = require('../middlewares/auth');
const authController = require('./../controllers/auth.controllers');
const router = express.Router();
const passport = require('passport');
const googleStrategy = require('../utils/passportStrategy').googleStrategy;

passport.use(googleStrategy);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findOne({ googleId: id }, function (err, user) {
        done(err, user);
    });
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgetPassword);
router.patch('/resetpassword/', authController.resetPassword);
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        failureMessage: true,
    }),
    authController.googleCallback
);
router.post('/googlesignin', authController.googleSignin);
router.get('/verifyemail/:token', authController.verifyEmail);
router.get('/user', authController.getLoggedInUser);

module.exports = router;
