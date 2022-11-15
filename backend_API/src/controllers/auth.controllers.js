const UUID = require('uuid').v4
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const config = require('../utils/config')
const asyncWrapper = require('./../utils/async_wrapper')
const sendEmail = require('./../utils/email')
const { CustomAPIError } = require('./../utils/custom_errors')

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.GOOGLE_SIGNIN_CLIENT_ID);

const User = require('../models/user.models')
const TestToken = require('../models/test_token.models')

//Function to sign token
const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

//Create token and send to client
const createToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.role)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)

    // Remove sensitive data from user object
    user.password = undefined
    user.passwordConfirm = undefined
    user.emailVerificationToken = undefined
    user.passwordResetToken = undefined
    user.isVerified = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
}

exports.signup = asyncWrapper(async (req, res, next) => {
    //1. Grab Values from req.body & Store Values in database
    const currentUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    //2. Create email verification Token
    const ver_token = currentUser.createHashedToken('email_verification')
    currentUser.save({ validateBeforeSave: false })

    //3. Save to test token collection -- aids in running unit tests
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        await TestToken.create({
            user: currentUser._id,
            email_verification: ver_token
        })
    }

    //4. Send email to user
    const url = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/verifyemail/${ver_token}`

    const message = `Please click on the link below to verify your email address: ${url}`
    await sendEmail({
        email: currentUser.email,
        subject: 'Your email verification token link',
        message
    })

    createToken(currentUser, 200, res)

})

exports.login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body

    //Check if fields are provided
    if (!email || !password) {
        return next(new CustomAPIError('Please Provide Email and Password', 400))
    }
    //check if email exists
    const currentUser = await User.findOne({ email }).select('+password')
    //Check if email and password matches
    if (
        !currentUser ||
        !(await currentUser.comparePassword(password, currentUser.password))
    ) {
        return next(new CustomAPIError('Incorrect Email or Password', 400))
    }
    //Send token to client
    createToken(currentUser, 200, res)
})

exports.verifyEmail = asyncWrapper(async (req, res, next) => {
    //1. Get email verification token from query params
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')


    //2. If token is invalid or token has expired
    const user = await User.findOne({ emailVerificationToken: hashedToken }).select('+emailVerificationToken')
    if (!user) {
        return next(
            new CustomAPIError(
                'Token Invalid or Token Expired, Request for a new reset token',
                404,
            ),
        )
    }

    user.isVerified = true
    user.emailVerificationToken = undefined
    await user.save({ validateBeforeSave: false })

    return res.status(201).send({ status: 'success' })
})

exports.forgetPassword = asyncWrapper(async (req, res, next) => {
    //1. Get User By The Email Posted
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new CustomAPIError('No User Found With That Email', 404))
    }
    //2. Generate Reset Token
    const resetToken = user.createHashedToken('password_reset')
    const curr = await user.save({ validateBeforeSave: false })
    // console.log(curr)

    //3. Send Token To Client
    const tokenUrl = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/resetpassword/${resetToken}`

    // Save to test token collection -- aids in running unit tests
    try {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            await TestToken.findOneAndUpdate({ user: user._id }, { password_reset: resetToken },
                { upsert: true })
        }

        const message = `Forgot your password? Click on the link below and reset your password with your new password: ${tokenUrl}.\nIf you didn't reset your password, ignore this email!`
        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset Link(Valid for 10mins)',
            message,
        })
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email',
        })
    } catch (err) {
        //error from sending mail
        user.passwordResetToken = undefined
        user.passwordResetTokenExpires = undefined
        console.log(err)
        return next(
            new CustomAPIError('Error Sending Mail, Please Try Again Later', 500),
        )
    }
})

exports.resetPassword = asyncWrapper(async (req, res, next) => {
    //1. Get User from token from query params
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() },
    })

    //2. If token is invalid or token has expired
    if (!user) {
        return next(
            new CustomAPIError(
                'Token Invalid or Token Expired, Request for a new reset token',
                404,
            ),
        )
    }

    await user.changePassword(req.body.password)

    //3. Log in the user and send JWT Token
    createToken(user, 200, res)
})

exports.googleSignin = asyncWrapper(async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    // Verify id token
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_SIGNIN_CLIENT_ID,
    }),
        payload = ticket.getPayload(),
        existing_user = await User.findOne({ email: payload.email });

    // Create new user in db
    const random_str = UUID(); // Random unique str as password, won't be needed for authentication
    if (!existing_user) {
        const user_data = {
            firstname: payload.given_name,
            lastname: payload.family_name,
            email: payload.email,
            role: 'EndUser',
            password: random_str,
            passwordConfirm: random_str
        };

        const new_user = await User.create(user_data);
        createToken(new_user, 200, res)
    }

    createToken(existing_user, 200, res)
});

