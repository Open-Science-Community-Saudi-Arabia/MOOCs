const User = require('./../models/user.models')
const asyncWrapper = require('./../utils/async_wrapper')
const jwt = require('jsonwebtoken')
const { CustomAPIError } = require('./../utils/custom_errors')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')

//Function to sign token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

//Create token and send to client
const createToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  user.password = undefined
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
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  createToken(user, 200, res)
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

exports.forgetPassword = asyncWrapper(async (req, res, next) => {
  //1. Get User By The Email Posted
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new CustomAPIError('No User Found With That Email', 404))
  }
  //2. Generate Reset Token
  const resetToken = user.createHashedToken()
  await user.save({ validateBeforeSave: false })

  //3. Send Token To Client
  const tokenUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/auth/resetpassword/${resetToken}`

  const message = `Forgot your password? Click on the link below and reset your password with your new password: ${tokenUrl}.\nIf you didn't reset your password, ignore this email!`

  try {
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
  //3. If token is valid and not expired
  user.password = req.body.password
  user.passwordConfirm = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined
  await user.save({})

  //4. Log in the user and send JWT Token

  createToken(user, 200, res)
})
