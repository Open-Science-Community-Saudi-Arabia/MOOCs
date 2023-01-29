const UUID = require('uuid').v4;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../utils/config');
const sendEmail = require('./../utils/email');
const {
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
} = require('../utils/errors');
const { getAuthCodes, getAuthTokens, decodeJWT, getRequiredConfigVars } = require('../utils/token.js');

const { OAuth2Client } = require('google-auth-library');

const { User, Status } = require('../models/user.models');
const { BlacklistedToken, AuthCode } = require('../models/token.models');
const e = require('express');
const Password = require('../models/password.models');

/**
 * Sign a token with the given payload and secret
 * 
 * @param {string} id 
 * @param {string} role 
 * @param {string} jwtSecret 
 * @param {string} expiry 
 * 
 * @returns {string} token
 * 
 * @throws {Error} if jwtSecret is not provided 
 */
const signToken = (id, role, jwtSecret = null, expiry = null) => {
    const expiryDate = expiry ? expiry : process.env.JWT_EXPIRES_IN;
    if (!jwtSecret) {
        jwtSecret = config.JWT_ACCESS_SECRET;
    }
    return jwt.sign({ id, role }, jwtSecret, {
        expiresIn: expiryDate,
    });
};

/**
 * Create a token and send it to the client
 * 
 * @param {MongooseDocument} user 
 * @param {number} statusCode 
 * @param {ExpressResponseObject} res 
 * 
 * @returns {void}
 */
const createToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.role, config.JWT_ACCESS_SECRET, config.JWT_EXPIRES_IN)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    // Remove sensitive data from user object
    user.password = undefined;
    user.passwordConfirm = undefined;
    user.emailVerificationToken = undefined;
    user.passwordResetToken = undefined;
    user.isVerified = undefined;
    user.auth_code = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

/**
 * Handle existing unverified user.
 * 
 * It sends new verification email to user
 * @param {MongooseObject} user - Mongoose user object
 * @returns {string} access_token, refresh_token - JWT tokens
 */
const handleUnverifiedUser = function (user) {
    return async function (req) {
        // Generate email verification link 
        const { access_token } = await getAuthTokens(user, 'verification');

        const verification_url = `${req.protocol}://${req.get(
            'host')}/api/v1/auth/verifyemail/${access_token}`;

        // Send verification email
        sendEmail({
            email: user.email,
            subject: 'Verify your email address',
            message: `Please click on the following link to verify your email address: ${verification_url}`,
        });
    }
};

/**
 * Handle existing user
 *
 * @param {MongooseObject} user - Mongoose user object
 * @returns {function} - Express middleware function
 * @throws {BadRequestError} - If user is already verified
 * */
const handleExistingUser = function (user) {
    return async function (req, res, next) {
        const existing_user = user.toJSON({ virtuals: true });

        console.log(existing_user);
        // If user is not verified - send verification email
        if (!existing_user.status.isVerified) {
            await handleUnverifiedUser(existing_user)(req);

            // Return access token
            res.status(200).json({
                success: true, data: {
                    user: {
                        _id: existing_user._id,
                        firstname: existing_user.firstname,
                        lastname: existing_user.lastname,
                        email: existing_user.email,
                    }
                }
            });
        } else {
            next(new BadRequestError('User already exists'));
        }
    };
};

exports.passportOauthCallback = function (req, res) {
    createToken(req.user, 200, res);
};

/**
 * Signup a new user
 * 
 * @param {string} role
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 * @param {string} firstname
 * @param {string} lastname
 * 
 * @returns {object} user
 * @returns {string} token
 * @returns {string} status
 * 
 * // TODO: Add super admin signup
 */
exports.signup = async (req, res, next) => {
    const { firstname, lastname, email, role, password, passwordConfirm } = req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !role || !password || !passwordConfirm) {
        return next(new BadRequestError('Please provide all required fields'));
    }

    if (!role) role = 'EndUser';

    // Check if superAdmin tries to create another superadmin from - addAdmin route
    if (role === 'SuperAdmin' && req.user.role == 'SuperAdmin') return next(new BadRequestError('You cannot create a superadmin account'));

    // Check if user already exists
    const existing_user = await User.findOne({ email }).populate('status')
    if (existing_user) return handleExistingUser(existing_user)(req, res, next);

    // Create new user
    const new_user = await User.create({
        firstname, lastname, email, role, password,
    })

    // Create users password 
    await Password.create({ user: new_user._id, password });

    // Check if request was made by a superadmin
    if (req.user.role = 'SuperAdmin' && role != 'SuperAdmin') {
        // Activate and verify user
        await Status.create({ user: new_user._id, isActive: true, isVerified: true });

        return res.status(200).json({ success: true, data: { user: new_user } });
    }

    // Create users account status
    await Status.create({ user: new_user._id });

    // Handle user verification
    await handleUnverifiedUser(new_user)(req);

    // Return access token
    return res.status(200).json({ success: true, data: { user: new_user } });
}

/**
 * Create new admin account
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 * @param {string} firstname
 * @param {string} lastname
 *  
 * @returns {object} user
 * @returns {string} token
 * @returns {string} status
 * 
 * @throws {BadRequestError} if email or password is not provided
 * @throws {BadRequestError} if email or password is incorrect
 * @throws {BadRequestError} if email is not verified
 * @throws {Error} if error occurs
 */
exports.addAdmin = async (req, res, next) => {
    req.body.role = 'Admin';
    this.signup(req, res, next);
}

// Login a user
/**
 * Login a user
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {object} user
 * @returns {string} token
 * @returns {string} status
 * 
 * @throws {CustomAPIError} if email or password is not provided
 * @throws {CustomAPIError} if email or password is incorrect
 * @throws {CustomAPIError} if email is not verified
 * @throws {Error} if error occurs
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //Check if fields are provided
    if (!email || !password) {
        return next(
            new CustomAPIError('Please Provide Email and Password', 400)
        );
    }
    //check if email exists
    const currentUser = await User.findOne({ email }).select('+password');
    console.log(currentUser);
    //Check if email and password matches
    if (
        !currentUser ||
        !(await currentUser.comparePassword(password, currentUser.password))
    ) {
        return next(new CustomAPIError('Incorrect Email or Password', 400));
    }
    //Send token to client
    createToken(currentUser, 200, res)
}

// Email Verification for new users
/**
 * Verify a user's email
 * 
 * @param {string} token
 * 
 * @returns {string} status
 * 
 * @throws {CustomAPIError} if token is invalid or token has expired
 * @throws {Error} if error occurs
 */
exports.verifyEmail = async (req, res, next) => {
    //  Get token from url
    const { token } = req.params;

    //  Verify token
    const payload = jwt.verify(token, config.JWT_EMAILVERIFICATION_SECRET);

    //  Check if token is blacklisted
    const blacklisted_token = await BlacklistedToken.findOne({ token });
    if (blacklisted_token) return next(new BadRequestError('Token Invalid or Token Expired, Request for a new verification token'))

    //  Get user from token
    const user = await User.findById(payload.id).populate('status');

    if (!user) {
        return next(new BadRequestError('Token Invalid or Token Expired, Request for a new verification token'))
    }

    user.status.isVerified = true;
    await user.status.save();

    await BlacklistedToken.create({ token });

    return res.status(201).send({ success: true, data: { status: 'Email Verified' } })
}

/**
 * Request for super admin account activation
 * 
 * Sends an email to the super admin with one of the activation codes
 * Sends an email to the project hosts with the other activation codes
 * 
 * @param {string} email
 * 
 * @returns {string} status
 * 
 * @throws {CustomAPIError} if super admin account does not exist
 * @throws {CustomAPIError} if super admin account is already active
 * @throws {Error} if error occurs
 */
exports.requestSuperAdminAccountActivation = async (req, res, next) => {
    const email = req.params.email

    // Check if a super admin account exists, and it's not active
    const super_admin = await User.findOne({ email, role: 'superadmin' })
    if (!super_admin) return next(new BadRequestError('Superadmin account does not exist'))

    // Check if account is active 
    if (super_admin.status.isActive) return next(new BadRequestError('Account is already active'))

    // Generate activation codes
    const { activation_code1, activation_code2, activation_code3 } = await getAuthCodes(super_admin._id, 'su_activation')

    // Send activation codes to HOSTs
    sendEmail({
        email: config.HOST_ADMIN_EMAIL1,
        subject: `New super admin activation request for ${super_admin.email}`,
        message: `This is your part of the required activation code ${activation_code1}`
    })
    sendEmail({
        email: config.HOST_ADMIN_EMAIL2,
        subject: `New super admin activation request for ${super_admin.email}`,
        message: `This is your part of the required activation code ${activation_code2}`
    })

    // Send activation code to user
    sendEmail({
        email: super_admin.email,
        subject: `New super admin activation request for ${super_admin.email}`,
        message: `This is your part of the required activation code ${activation_code3}`
    })

    // Get activation access token
    const { access_token } = await getAuthTokens(super_admin._id, 'su_activation')

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                access_token,
                message: "Activation codes sent to users email"
            }
        })
}

/**
 * Activate super admin account
 * 
 * @param {string} activation_code1
 * @param {string} activation_code2
 * @param {string} activation_code3
 * 
 * @returns {string} status
 * 
 * @throws {BadRequestError} if activation codes are not provided
 * @throws {BadRequestError} if token is invalid or token has expired
 * @throws {BadRequestError} if token is blacklisted
 * @throws {Error} if error occurs
 */
exports.activateSuperAdminAccount = async (req, res, next) => {
    const { activation_code1, activation_code2, activation_code3 } = req.body

    // Check if all activation codes are provided
    if (!activation_code1 || !activation_code2 || !activation_code3) {
        return next(new BadRequestError('Missing required parameter in request body'));
    }

    // Get bearer token
    const token = req.headers.authorization.split(' ')[1],
        secret = getRequiredConfigVars('su_activation').secret;

    // Check if token is Blacklisted
    const blacklisted_token = await BlacklistedToken.findOne({ token })
    if (blacklisted_token) {
        throw new BadRequestError('Token Invalid or Token Expired, Request for a new activation token');
    }

    // Verify token and get user from payload
    const decoded = jwt.verify(token, secret)
    const admin = await User.findOne({ _id: decoded.id, role: 'SuperAdmin' }).populate('status')

    // Check if user exists
    if (!admin) {
        throw new BadRequestError('Token Invalid or Token Expired, Request for a new activation token');
    }

    // Find activation code document
    const activation_code = `${activation_code1}-${activation_code2}-${activation_code3}`
    const auth_code = await AuthCode.findOne({ user: admin._id, activation_code })

    // Check if activation code exists
    if (!auth_code) { throw new BadRequestError('Invalid activation code') }

    // Check if activation code has expired
    if (auth_code.expiresIn < Date.now()) {
        throw new BadRequestError('Activation code has expired, request for a new activation code')
    }

    // Activate user
    admin.status.isActive = true;
    await admin.status.save();

    // Blacklist token
    await BlacklistedToken.create({ token })

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                message: "Super admin account activated"
            }
        })
}

/**
 * Request for super admin account deactivation
 * 
 * Sends an email to the super admin with one of the deactivation codes
 * Sends an email to the project hosts with the other deactivation codes
 * 
 * @param {string} email
 * 
 * @returns {string} status
 * 
 * @throws {CustomAPIError} if super admin account does not exist
 * @throws {CustomAPIError} if super admin account is already active
 * @throws {Error} if error occurs
 */
exports.requestSuperAdminAccountDeactivation = async (req, res, next) => {
    const email = req.params.email

    // Check if a super admin account exists, and it's not active
    const super_admin = await User.findOne({ email, role: 'superadmin' })
    if (!super_admin) return next(new BadRequestError('Superadmin account does not exist'))

    // Check if account is active 
    if (!super_admin.status.isActive) return next(new BadRequestError('Account is already inactive'))

    // Generate activation codes
    const { activation_code1, activation_code2, activation_code3 } = await getAuthCodes(super_admin._id, 'su_activation')

    // Send activation codes to HOSTs
    sendEmail({
        email: config.HOST_ADMIN_EMAIL1,
        subject: `New super admin deactivation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation activation code ${activation_code1}`
    })
    sendEmail({
        email: config.HOST_ADMIN_EMAIL2,
        subject: `New super admin activation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation code ${activation_code2}`
    })

    // Send activation code to user
    sendEmail({
        email: super_admin.email,
        subject: `New super admin deactivation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation code ${activation_code3}`
    })

    // Get activation access token
    const { access_token } = await getAuthTokens(super_admin._id, 'su_activation')

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                access_token,
                message: "Deactivation codes sent to users email"
            }
        })
}

/**
 * Deactivate super admin account
 * 
 * @param {string} activation_code1
 * @param {string} activation_code2
 * @param {string} activation_code3
 * 
 * @returns {string} status
 * 
 * @throws {BadRequestError} if activation codes are not provided
 * @throws {BadRequestError} if token is invalid or token has expired
 * @throws {BadRequestError} if token is blacklisted
 * @throws {Error} if error occurs
 */
exports.deactivateSuperAdminAccount = async (req, res, next) => {
    const { deactivation_code1, deactivation_code2, deactivation_code3 } = req.body

    // Check if all activation codes are provided
    if (!deactivation_code1 || !deactivation_code2 || !deactivation_code3) {
        return next(new BadRequestError('Missing required parameter in request body'));
    }

    // Get bearer token
    const token = req.headers.authorization.split(' ')[1],
        secret = getRequiredConfigVars('su_activation').secret;

    // Check if token is deBlacklisted
    const blacklisted_token = await BlacklistedToken.findOne({ token })
    if (blacklisted_token) {
        throw new BadRequestError('Token Invalid or Token Expired, Request for a new activation token');
    }

    // Verify token and get user from payload
    const decoded = jwt.verify(token, secret)
    const admin = await User.findOne({ _id: decoded.id, role: 'SuperAdmin' }).populate('status')

    // Check if user exists
    if (!admin) {
        throw new BadRequestError('Token Invalid or Token Expired, Request for a new activation token');
    }

    // Find activation code document
    const deactivation_code = `${deactivation_code1}-${deactivation_code2}-${deactivation_code3}`
    const auth_code = await AuthCode.findOne({ user: admin._id, activation_code: deactivation_code })

    // Check if activation code exists
    if (!auth_code) { throw new BadRequestError('Invalid activation code') }

    // Check if activation code has expired
    if (auth_code.expiresIn < Date.now()) {
        throw new BadRequestError('Activation code has expired, request for a new activation code')
    }

    // Activate user
    admin.status.isActive = false;
    await admin.status.save();

    // Blacklist token
    await BlacklistedToken.create({ token })

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                message: "Super admin account activated"
            }
        })
}

/**
 * Activate user account
 * 
 * @param {string} email
 * 
 * @returns {string} status
 * 
 * @throws {BadRequestError} if user account does not exist
 * @throws {BadRequestError} if user account is already active
 * @throws {Error} if error occurs
 */
exports.activateUserAccount = async (req, res, next) => {
    const email = req.params.email

    // Check if a user account exists, and it's not active
    const user = await User.findOne({ email }).populate('status')
    if (!user) return next(new BadRequestError('User account does not exist'))

    // Check if account is active
    if (user.status.isActive) return next(new BadRequestError('Account is already active'))

    // Check if user is a super admin
    if (user.role === 'superadmin') return next(new ForbiddenError('You cannot activate a super admin account'))

    // Activate user
    user.status.isActive = true;
    await user.status.save();

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                message: "User account activated"
            }
        })
}

// TODO: Add deactivate super admin account
/**
 * Deactivate user account
 * 
 * @param {string} email
 * 
 * @returns {string} status
 * 
 * @throws {BadRequestError} if user account does not exist
 * */
exports.deactivateUserAccount = async (req, res, next) => {
    const email = req.params.email

    // Check if a user account exists, and it's not active
    const user = await User.findOne({ email }).populate('status')

    // Check if user exists
    if (!user) return next(new BadRequestError('User account does not exist'))

    // Check if users role is SuperAdmin
    if (user.role === 'SuperAdmin') return next(new ForbiddenError('You cannot deactivate a SuperAdmin account'))

    // Check if account is active
    if (!user.status.isActive) return next(new BadRequestError('Account is already deactivated'))

    // Deactivate user
    user.status.isActive = false;
    await user.status.save();

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                message: "User account deactivated"
            }
        })
}

/**
* Send a password reset code to a user's email
* 
* @param {string} email
* 
* @returns {string} message
* @returns {string} access_token
* 
* @throws {BadRequestError} If missing required parameter in request body
* @throws {BadRequestError} If User does not exist
*/
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body

    //  Check for missing required field in request body
    if (!email) return next(new BadRequestError('Missing required parameter in request body'));

    const current_user = await User.findOne({ email })
    console.log(current_user);

    //  Check if user exists
    if (!current_user) return next(new BadRequestError('User does not exist'));

    //  Get password reset code
    const { password_reset_code } = await getAuthCodes('password_reset')

    //  Send password reset code to user
    sendEmail({
        email: current_user.email,
        subject: 'Password reset for User',
        message: `Password reset code is ${password_reset_code}`
    })

    //  Get access token
    const { access_token } = getAuthTokens(current_user._id, 'password_reset')

    return res.status(200).send({
        message: "Successful, Password reset code sent to users email",
        access_token
    })
}

// Reset Password
/**
 * Reset a user's password
 * 
 * @param {string} new_password
 * @param {string} password_reset_code
 * 
 * @returns {string} status
 * 
 * @throws {Error} if error occurs
 * @throws {BadRequestError} if user does not exist
 * @throws {BadRequestError} if Missing required parameter in request body
 * @throws {UnauthorizedError} if Authentication invalid
 * @throws {BadRequestError} if Password reset code is incorrect
 * @throws {BadRequestError} if Password reset code has expired
 * @throws {UnauthorizedError} if Access token expired
 */
exports.resetPassword = async (req, res, next) => {
    const { new_password, password_reset_code } = req.body

    // Check if new password and password reset code are provided
    if (!new_password || !password_reset_code)
        return next(new BadRequestError('Missing required parameter in request body'));

    // Check if user exists
    const current_user = await (
        await User.findOne({ _id: payload.id })
    ).populate('auth_codes');
    console.log(current_user);
    if (!current_user) {
        throw new BadRequestError('User does not exist');
    }

    // Check if password reset code is valid
    if (password_reset_code !== authCode.password_reset) {
        throw new BadRequestError('Invalid password reset code');
    }

    // Change password
    await current_user.changePassword(new_password, current_user.password);

    // Delete auth code, blacklist jwt token
    BlacklistedToken.create({ token: jwtToken });
    // BlacklistToken.create({ token: jwtToken })

    return res.status(200).send({
        message: "Successfully reset password",
    })
}

// Google Signin
/**
 * Signin a user with google
 * 
 * @param {string} token
 * 
 * @returns {string} status
 * @returns {string} access_token
 * @returns {string} refresh_token
 * 
 * @throws {Error} if error occurs
 * @throws {BadRequestError} if Missing required parameter in request body
 * @throws {BadRequestError} if User does not exist
 * @throws {BadRequestError} if User is not verified
 */
exports.googleSignin = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];

    const client = new OAuth2Client(config.OAUTH_CLIENT_ID);

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
            passwordConfirm: random_str,
            googleId: payload.sub,
        };

        const new_user = await User.create(user_data);
        createToken(new_user, 200, res);
    }

    createToken(existing_user, 200, res)
};

// Get details of logged in user
/**
 * Get data for logged in user
 * 
 * @param {string} token
 * 
 * @returns {string} success
 * @returns {object} user
 * 
 * @throws {error} if error occured 
 */
exports.getLoggedInUser = async (req, res, next) => {
    // Check for valid authorization header
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];

    // Check if token is valid
    const payload = jwt.verify(token, config.JWT_ACCESS_SECRET);
    const user = await User.findById(payload.id);

    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
}


