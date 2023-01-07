const express = require('express')
const { basicAuth } = require('../middlewares/auth')
const authController = require('./../controllers/auth.controllers')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
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
      async function (accessToken, refreshToken, profile, cb, req, res) {
    //     try {
            
    //         // console.log(profile)
    //         // User is authenticated, return user object
    
    //         const password = UUID()
    //         const user_data = {
    //             firstname: profile.name.givenName,
    //             lastname: profile.name.familyName,
    //             email: profile.emails[0].value,
    //             googleId: profile.id,
    //             avatar: profile.photos[0].value,
    //             role: 'EndUser',
    //             isVerified: true,
    //             password,
    //             passwordConfirm: password,
    //         }
    
    //         const user = await User.create(user_data)
    //         console.log(user);
    
    //         return cb(null, user);
    //     } catch (error) {
    //         return cb(error, null, )
    //     }
    // return cb(null, profile)
    console.log(req)
      }
    )
  );
  
router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgotpassword', authController.forgetPassword)
router.patch('/resetpassword/', authController.resetPassword)
router.get('/google', function(req, res, next) {
    conosle.log(rea)
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)  
} )
router.get('/google/callback', passport.authenticate('google', function (req, res) {
    // if (err) {
    //     console.log(err)
    // }
    // if (!user) {
    //     return res.redirect('/login')
    // }
    console.log(res, req)
}))
router.post('/googlesignin', authController.googleSignin)
router.get('/verifyemail/:token', authController.verifyEmail)
router.get('/user', authController.getLoggedInUser)

module.exports = router
