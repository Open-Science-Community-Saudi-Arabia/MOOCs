const express = require('express');
const { basicAuth } = require('../middlewares/auth');
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

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgetPassword);
router.patch('/resetpassword/', authController.resetPassword);
router.get('/google', authController.googleSignin);
router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] })
);
router.get(
    '/github/callback',
    passport.authenticate('github'),
    authController.passportOauthCallback
);
router.post('/google/callback', authController.googleSignin);
router.get('/verifyemail/:token', authController.verifyEmail);
router.get('/user', authController.getLoggedInUser);

module.exports = router;
