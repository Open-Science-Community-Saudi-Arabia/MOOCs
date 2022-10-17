const User = require('./../models/user.models')
const asyncWrapper = require('./../utils/async_wrapper')
const jwt = require('jsonwebtoken')
const { CustomAPIError } = require('./../utils/custom_errors')

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
