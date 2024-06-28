/**
 * @category API
 * @subcategory Controllers
 * @module Auth Controller
 * @description This module contains the controllers for handling user authentication, including login, signup, password reset, super admin activation, and deactivation routes.
 *
 * The following routes are handled by this module and their corresponding functions: </br>
 *
 * </br>
 *
 * <b>POST</b> /auth/login </br>
 * <b>POST</b> /auth/signup </br>
 * <b>POST</b> /auth/addadmin  </br>
 * <b>POST</b> /auth/user/activate/:email </br>
 * <b>POST</b> /auth/user/deactivate/:email l </br>
 * <b>POST</b> /auth/forgotpassword </br>
 * <b>POST</b> /auth/resetpassword </br>
 * <b>POST</b> /auth/googlesignin </br>
 * <b>POST</b> /auth/google/callback </br>
 * <b>GET</b> /auth/verifyemail/:token </br>
 *
 */

const UUID = require("uuid").v4;
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { sendEmail, EmailMessage } = require("../utils/email/email");
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} = require("../utils/errors");
const { getAuthCodes, getAuthTokens } = require("../utils/token.js");
const { OAuth2Client } = require("google-auth-library");
const { User, Status } = require("../models/user.models");
const {
  BlacklistedToken,
  AuthCode,
} = require("../models/token.models");
const Password = require("../models/password.models");
const { default: mongoose } = require("mongoose");

/**
 * Create and send JWT tokens to the client.
 *
 * @description This function creates a JWT access token and a refresh token and sends them to the client.
 * The access token contains the user's data which will be required for the client to make authorized requests to the API.
 *
 * @param {MongooseDocument} user - The user object.
 * @param {number} statusCode - The HTTP response status code.
 * @param {ExpressResponseObject} res - The Express response object.
 * @memberof module:Controllers/AuthController
 * @returns {object} HTTP response object with user info, access token and refresh token
 *
 * @throws {Error} If error occurs
 */
const returnAuthTokens = async (user, statusCode, res) => {
  if (!user.status) user = await User.findById(user._id).populate("status");
  const { access_token, refresh_token } = await getAuthTokens(user.toObject());

  user.password = undefined;
  user.passwordConfirm = undefined;
  user.emailVerificationToken = undefined;
  user.passwordResetToken = undefined;
  user.isVerified = undefined;
  user.auth_code = undefined;

  res.status(statusCode).json({
    success: true,
    data: {
      user,
      access_token,
      refresh_token,
    },
  });
};

/**
 * Handle existing unverified user.
 *
 * @description Send a new verification email to user if the existing user is unverified.</br>
 * A token is generated and sent to the user for email verification.
 *
 * @param {MongooseObject} user - Mongoose user object
 * @returns {string} - access_token - JWT token
 */
const handleUnverifiedUser = function (user) {
  return async function (req) {
    const { access_token } = await getAuthTokens(user, "verification");
    const verification_url = `${config.CLIENT_APP_URL}/verifyemail/${access_token}`;
    const message = new EmailMessage(req.query.lang);
    await sendEmail({
      email: user.email,
      subject: "Verify your email address",
      html: message.emailVerification(user.firstname, verification_url),
    });
  };
};

/**
 * Handle existing user
 *
 * @description Send a new verification email to user if the existing user is unverified.
 *
 * @param {MongooseObject} user - Mongoose user object
 * @returns {object} - Success response object for verified user
 * @throws {BadRequestError} - If user is already verified
 *
 */
const handleExistingUser = function (user) {
  return async function (req, res, next) {
    const existing_user = user.toObject();

    if (!existing_user.status.isVerified) {
      await handleUnverifiedUser(existing_user)(req);

      res.status(400).json({
        success: true,
        message: "User account exists already, verification mail sent to user",
        data: {
          user: {
            _id: existing_user._id,
            firstname: existing_user.firstname,
            lastname: existing_user.lastname,
            email: existing_user.email,
          },
        },
      });
    } else {
      return next(new BadRequestError("User already exists"));
    }
  };
};

/**
 * Signup a new user
 *
 * @description Create a new user and sends a verification email to the user.
 *
 * The user is created using the User model, and the user's password is hashed using the bcrypt library.
 * The user is created with the status of unverified, which means that the user cannot login until their email address is verified.
 *
 * Each user account has a status document linked to it,
 * which holds two data fields: isVerified and isActive. By default, isVerified is set to false, which means that the user cannot login until their email address is verified.
 * isActive is set to true for EndUsers, which means that the user account is active.
 *
 * For Superadmin accounts, it has to be activated using the superadmin activation route.
 * @see {@link module:controllers/auth~activateSuperAdmin}
 *
 *
 * @param {string} role - User role (EndUser, Admin, SuperAdmin)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} passwordConfirm - User password confirmation
 * @param {string} firstname - User firstname
 * @param {string} lastname - User lastname
 *
 * @returns {object} HTTP response object with user object, JWT token, and the status of the request
 *
 * @throws {BadRequestError} if passwordConfirm is not provided
 * @throws {Error} if an error occurs
 */
exports.signup = async (req, res, next) => {
  let {
    firstname,
    lastname,
    email,
    role,
    password,
    passwordConfirm,
    preferred_language,
  } = req.body;

  if (!passwordConfirm) {
    return next(
      new BadRequestError("passwordConfirm is required., Try again")
    );
  }

  const existing_user = await User.findOne({ email }).populate("status");
  if (existing_user) return handleExistingUser(existing_user)(req, res, next);

  let new_user;

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    await User.create(
      [{ firstname, lastname, email, role, preferred_language }],
      { session, context: "query" }
    ).then((user) => {
      new_user = user[0];
    });
    await Password.create([{ user: new_user._id, password }], {
      session,
      context: "query",
    });
    await Status.create([{ user: new_user._id }], {
      session,
      context: "query",
    });
    await AuthCode.create([{ user: new_user._id }], {
      session,
      context: "query",
    });

    await session.commitTransaction();
    session.endSession();
  });
  await handleUnverifiedUser(new_user)(req);
  return res.status(200).json({ success: true, data: { user: new_user } });
};

/**
 * Login a user and return a JWT token.
 *
 * This function logs in a user with their email and password, and returns two JWT tokens:
 * an access token and a refresh token. The access token is used to authenticate the user
 * on subsequent requests, and expires after 15 minutes. The refresh token is used to
 * refresh the access token, and expires after 2 days.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @returns {object} - HTTP response object with user object,
 *                     an access token, and a refresh token.
 * @throws {CustomAPIError} - If the email or password is missing or incorrect, or if the
 *                            email is not verified or the account is not activated.
 * @throws {Error} - If an error occurs.
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Please provide email and password"));
  }
  const currentUser = await User.findOne({ email }).populate("password status");

  if (
    !currentUser ||
    !(await currentUser.password.comparePassword(
      password,
      currentUser.password
    ))
  ) {
    return next(new BadRequestError("Incorrect email or password"));
  }

  if (!currentUser.status.isVerified) {
    return next(new BadRequestError("Please verify your email"));
  }

  if (!currentUser.status.isActive) {
    return next(new BadRequestError("Please activate your account"));
  }

  const { access_token, refresh_token } = await getAuthTokens(
    currentUser,
    "access"
  );

  currentUser.enrolled_courses = undefined;
  return res.status(200).json({
    success: true,
    data: {
      user: currentUser,
      access_token,
      refresh_token,
    },
  });
};

/**
 * Verify a user's email.
 *
 * This function verifies a user's email using a JWT token. If the token is valid and
 * not blacklisted, the user's email is marked as verified in the database. Otherwise,
 * an error is returned.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @returns {object} - The HTTP response object containing a success value and a message.
 * @throws {CustomAPIError} - If the token is invalid or expired.
 * @throws {Error} - If an error occurs.
 */
exports.verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(BadRequestError("No authentication token provided"));
  }

  const payload = jwt.verify(token, config.JWT_EMAILVERIFICATION_SECRET);

  const blacklisted_token = await BlacklistedToken.findOne({ token });
  if (blacklisted_token)
    return next(
      new UnauthorizedError(
        "Token Invalid or Token Expired, Request for a new verification token"
      )
    );

  const user = await User.findById(payload.id).populate("status");

  if (!user) {
    return next(
      new BadRequestError(
        "Token Invalid or Token Expired, Request for a new verification token"
      )
    );
  }

  user.status.isVerified = true;
  user.status.isActive = true;
  await user.status.save();

  await BlacklistedToken.create({ token });
  return res.status(200).send({ success: true, message: "Email verified" });
};

/**
 *
 * The super admin logs in with designated email and password.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @returns {object} - Response object containing the user object,
 *                     an access token, and a refresh token.
 * @throws {CustomAPIError} - If the email or password is missing or incorrect, or if the
 *                            email is not verified or the account is not activated.
 * @throws {Error} - If an error occurs.
 */
exports.loginSuperAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new BadRequestError("Please provide email and password"));
    }

    const existing_user = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    }).populate("password status");
    if (
      existing_user &&
      (await existing_user.password.comparePassword(
        password,
        existing_user.password
      ))
    ) {
      const { access_token, refresh_token } = await getAuthTokens(
        existing_user,
        "access"
      );
      return res.status(200).json({
        success: true,
        data: {
          user: existing_user,
          access_token,
          refresh_token,
        },
      });
    } else if (
      !existing_user &&
      email === config.ADMIN_EMAIL &&
      password === config.ADMIN_PASSWORD
    ) {
      const user_data = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        firstname: "Admin-Mooc",
        lastname: "Admin",
        role: "SuperAdmin",
      };
      const user = await User.create(user_data);
      await Password.create({ user: user._id, password: user_data.password });
      await Status.create({ user: user._id, isVerified: true, isActive: true });
      const userStatus = await User.findById(user._id).populate("status");
      userStatus.status.isActive = true;
      await userStatus.status.save();
      console.log("Super Admin created");

      const { access_token, refresh_token } = await getAuthTokens(
        user,
        "access"
      );
      return res.status(200).json({
        success: true,
        data: {
          user,
          access_token,
          refresh_token,
        },
      });
    } else if (
      !existing_user ||
      !(await existing_user.password.comparePassword(
        password,
        existing_user.password
      ))
    ) {
      return next(new BadRequestError("Incorrect email or password"));
    } else {
      return next(new BadRequestError("Incorrect email or password"));
    }
  } catch (error) {
    console.log("Error admin login", error);
  }
};

/**
 * Activate user account
 *
 * @description Activates a user account if the account exists and it's not already active.
 *
 * @param {object} req - The HTTP request object
 * @param {object} req.params - The request parameters object
 * @param {string} req.params.email - The email address of the user to activate
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleware function
 *
 * @returns {object} - The HTTP response object
 * @returns {boolean} success - Indicates if the request was successful
 * @returns {object} data - An object containing the success message
 * @returns {string} data.message - A message indicating the user account was activated
 *
 * @throws {BadRequestError} - If the email parameter is missing or invalid
 * @throws {BadRequestError} - If the user account does not exist
 * @throws {BadRequestError} - If the user account is already active
 * @throws {ForbiddenError} - If the user is a super admin (super admin accounts cannot be activated)
 * @throws {Error} - If an unexpected error occurs
 */
exports.activateUserAccount = async (req, res, next) => {
  const email = req.params.email;

  const user = await User.findOne({ email }).populate("status");
  if (!user) return next(new BadRequestError("User account does not exist"));

  if (user.status.isActive)
    return next(new BadRequestError("Account is already active"));

  user.status.isActive = true;
  await user.status.save();

  return res.status(200).send({
    success: true,
    data: {
      message: "User account activated",
    },
  });
};

/**
 * Deactivate user account
 *
 * @description Deactivates user account if user account exists and it's active
 *
 * @param {string} email - User email
 *
 * @returns {Object} response - The HTTP response
 * @returns {boolean} response.success - Indicates if the request was successful
 * @returns {Object} response.data - The response data
 * @returns {string} response.data.message - A message indicating the status of the request
 *
 * @throws {BadRequestError} If user account does not exist or is already deactivated
 * @throws {ForbiddenError} If user is a SuperAdmin account
 * @throws {Error} If an unexpected error occurs
 */
exports.deactivateUserAccount = async (req, res, next) => {
  const email = req.params.email;

  const user = await User.findOne({ email }).populate("status");

  if (!user) return next(new BadRequestError("User account does not exist"));

  if (!user.status.isActive)
    return next(new BadRequestError("Account is already deactivated"));

  user.status.isActive = false;
  await user.status.save();

  return res.status(200).send({
    success: true,
    data: {
      message: "User account deactivated",
    },
  });
};

/**
 * Sends a password reset code to a user's email.
 *
 * @param {string} email - User's email address.
 *
 * @returns {Object} HTTP Response object with success value, message and an access token.
 *
 * @throws {BadRequestError} If the required parameter is missing in the request body.
 * @throws {BadRequestError} If the user does not exist.
 */
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new BadRequestError("Missing required parameter in request body")
    );

  const current_user = await User.findOne({ email });

  if (!current_user) return next(new BadRequestError("User does not exist"));

  const { password_reset_code } = await getAuthCodes(
    current_user.id,
    "password_reset"
  );

  const message = new EmailMessage(req.query.lang);
  sendEmail({
    email: current_user.email,
    subject: "Password reset for user",
    html: message.passwordReset(current_user.firstname, password_reset_code),
  });

  const { access_token } = await getAuthTokens(
    current_user._id,
    "password_reset"
  );

  return res.status(200).send({
    success: true,
    data: {
      message: "Successful, password reset code sent to your email",
      access_token,
    },
  });
};

// Reset Password
/**
 * Reset a user's password.
 *
 * @description Resets the password of the authenticated user if the provided password reset code is valid.<br>
 *
 * Note: A request has to be made to the {@link module:controllers/AuthController~forgetPassword forgetPassword}
 * endpoint to get a password reset code. Then the password reset code
 * is sent to the user's email address.
 * This endpoint is used to reset the password using the password reset code.
 *
 * @see {@link module:controllers/AuthController~forgetPassword forgetPassword} for more information on how to get a password reset code.
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.new_password - New password.
 * @param {string} req.body.password_reset_code - Password reset code.
 * @param {Object} req.user - Authenticated user object.
 * @param {string} req.user.id - User ID.
 *
 * @returns {Object} Response object.
 * @returns {boolean} Response.success - Indicates if the request was successful.
 * @returns {Object} Response.data - Response data.
 * @returns {string} Response.data.message - Success message.
 *
 * @throws {BadRequestError} If the required parameters are missing in the request body.
 * @throws {BadRequestError} If the user does not exist.
 * @throws {BadRequestError} If the password reset code is invalid.
 * @throws {BadRequestError} If the password reset code has expired.
 * @throws {UnauthorizedError} If the access token has expired or is invalid.
 * @throws {Error} If any other error occurs.
 */
exports.resetPassword = async (req, res, next) => {
  const { new_password, password_reset_code } = req.body;

  if (!new_password || !password_reset_code)
    return next(
      new BadRequestError("Missing required parameter in request body")
    );

  const current_user = await (
    await User.findOne({ _id: req.user.id })
  ).populate("auth_codes password");

  if (!current_user) {
    throw new BadRequestError("User does not exist");
  }

  if (password_reset_code !== current_user.auth_codes.password_reset_code) {
    throw new BadRequestError("Invalid password reset code");
  }

  await current_user.password.updatePassword(
    new_password,
    current_user.password
  );

  BlacklistedToken.create({ token: req.token });

  return res.status(200).send({
    success: true,
    data: {
      message: "Successfully reset password",
    },
  });
};

/**
 * Sign in a user using their Google account.
 *
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The authorization header containing the Google auth code.
 *
 * @returns {Object} HTTP response object with request status, the access token, and the refresh token.
 * @returns {string} status - The status of the request.
 * @returns {string} access_token - The access token.
 * @returns {string} refresh_token - The refresh token.
 *
 * @throws {Error} If an error occurs during the sign-in process.
 * @throws {BadRequestError} If the required parameter is missing from the request body.
 * @throws {BadRequestError} If the user does not exist.
 * @throws {BadRequestError} If the user is not verified.
 */
exports.googleSignin = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const code = authorization.split(" ")[1];

  if (!code) {
    return next(new BadRequestError("Missing required params in request body"));
  }

  const client = new OAuth2Client(
    config.OAUTH_CLIENT_ID,
    config.OAUTH_CLIENT_SECRET,
    "postmessage"
  );

  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.OAUTH_CLIENT_ID,
    }),
    payload = ticket.getPayload(),
    existing_user = await User.findOne({ email: payload.email }).populate(
      "status"
    );

  const random_str = UUID();
  if (!existing_user) {
    const user_data = {
      firstname: payload.given_name,
      lastname: payload.family_name,
      email: payload.email,
      role: req.body.role || "EndUser",
      password: random_str,
      passwordConfirm: random_str,
      googleId: payload.sub,
    };

    const session = await mongoose.startSession();
    let new_user;
    await session.withTransaction(async () => {
      await User.create([{ ...user_data }], { session, context: "query" }).then(
        (user) => {
          new_user = user[0];
        }
      );

      await Password.create(
        [{ user: new_user._id, password: user_data.password }],
        { session, context: "query" }
      );
      await Status.create([{ user: new_user._id }], {
        session,
        context: "query",
      });
      await AuthCode.create([{ user: new_user._id }], {
        session,
        context: "query",
      });

      await session.commitTransaction();
      session.endSession();
    });
    const user = await User.findById(new_user.id).populate("status");
    user.status.isVerified = true;
    user.status.isActive = true;
    await user.status.save();

    await returnAuthTokens(new_user, 200, res);
    return;
  }

  await returnAuthTokens(existing_user, 200, res);
};

/**
 * Get information on the currently logged in user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object set by the `authenticateToken` middleware.
 * @param {string} req.user.id - The ID of the currently logged in user.
 * @param {Object} res - The response object.
 *
 * @returns {Object} - The response object containing the current user data.
 * @returns {string} .status - The status of the response, either "success" or "error".
 * @returns {Object} .data - The data returned by the response.
 * @returns {Object} .data.user - The user object containing the data for the currently logged in user.
 *
 * @throws {Error} if an error occurs while fetching the user data.
 */
exports.getLoggedInUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
