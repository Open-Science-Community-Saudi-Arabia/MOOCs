const express = require('express')
const { basicAuth } = require('../middlewares/auth')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc').Strategy
const config = require('../utils/config')
const User = require('../models/user.models')
const UUID = require('uuid').v4

passport.use(
    new GoogleStrategy(
      {
        clientID: config.OAUTH_CLIENT_ID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
      },
      async function (issuer, profile, cb) {

        // console.log('inside the google strategy')
        // console.log(issuer)
        console.log(profile)
        const password = UUID()
        let user;
        await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            role: 'EndUser',
            password: password,
            passwordConfirm: password
        }).then((data) => {
            user = data
        }).catch((err) => {
            user = err
        })

        console.log(user)
        if (user instanceof Error) {
            console.log(user)
            return cb(user, false, { message: user.message })
        }

        return cb(null, user)
    }

    )
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({googleId: id}, function(err, user) {
      done(err, user);
    });
  });
  
router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotpassword', authController.forgetPassword)
router.patch('/resetpassword/', authController.resetPassword)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureMessage: true}), function (req, res) {

    console.log('inside the callback')
    // console.log(res, req)
    console.log(req.body, req.user)
    res.redirect('http://localhost:5000')
})
router.post('/googlesignin', authController.googleSignin)
router.get('/verifyemail/:token', authController.verifyEmail)
router.get('/user', authController.getLoggedInUser)

module.exports = router
