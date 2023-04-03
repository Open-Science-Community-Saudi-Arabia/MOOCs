/**
 * module: Controller
 */


/**
 * @category Backend API
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
 * <b>GET</b> /auth/superadmin/reqactivation/:email </br>
 * <b>POST</b> /auth/superadmin/activate  </br>
 * <b>GET</b> /auth/superadmin/reqdeactivation/:email  </br>
 * <b>POST</b> /auth/superadmin/deactivate </br>
 * <b>POST</b> /auth/user/activate/:email </br>
 * <b>POST</b> /auth/user/deactivate/:email l </br>
 * <b>POST</b> /auth/forgotpassword </br>
 * <b>POST</b> /auth/resetpassword </br>
 * <b>POST</b> /auth/googlesignin </br>
 * <b>GET</b> /auth/github </br>
 * <b>GET</b> /auth/github/callback </br>
 * <b>POST</b> /auth/google/callback </br>
 * <b>GET</b> /auth/verifyemail/:token </br>
 *  
 */


const UUID = require('uuid').v4;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../utils/config');
const { sendEmail, EmailMessage } = require('../utils/email/email');
const {
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
} = require('../utils/errors');
const { getAuthCodes, getAuthTokens } = require('../utils/token.js');

const { OAuth2Client } = require('google-auth-library');
const { User, Status } = require('../models/user.models');
const { BlacklistedToken, AuthCode, TestAuthToken } = require('../models/token.models');
const Password = require('../models/password.models');
const { default: mongoose } = require('mongoose');

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
 * @returns {void}
 * 
 * @throws {Error} If error occurs
 */
const returnAuthTokens = async (user, statusCode, res) => {
    console.log(user)
    if (!user.status) user = await User.findById(user._id).populate('status');
    const { access_token, refresh_token } = await getAuthTokens(user.toObject());

    // Remove sensitive data from user object
    user.password = undefined;
    user.passwordConfirm = undefined;
    user.emailVerificationToken = undefined;
    user.passwordResetToken = undefined;
    user.isVerified = undefined;
    user.auth_code = undefined;

    console.log(access_token)

    res.status(statusCode).json({
        success: true,
        data: {
            user,
            access_token,
            refresh_token
        },
    });
};

/**
 * Handle existing unverified user.
 * 
 * @description Ssends new verification email to user if the existing user is unverified</br>
 * 
 * Inside the email, there is a link that the user can click to verify their email address,
 * this link contains a JWT token that is used to verify the user's email address, the token has an expiry date of 1 hour </br>
 * 
 * The token is generated using the getAuthTokens function
 * 
 * @param {MongooseObject} user - Mongoose user object
 * @returns {string} access_token, refresh_token - JWT tokens
 */
const handleUnverifiedUser = function (user) {
    return async function (req) {
        // Generate email verification link 
        const { access_token } = await getAuthTokens(user, 'verification');

        const verification_url = `${config.CLIENT_APP_URL}/api/v1/auth/verifyemail/${access_token}`;

        if (process.env.NODE_ENV == 'test') {
            await TestAuthToken.findOneAndUpdate(
                { user: user._id },
                { access_token },
                { upsert: true }
            )
        }

        //console.log(verification_url)

        // Send verification email
        const message = new EmailMessage()
        await sendEmail({
            email: user.email,
            subject: 'Verify your email address',
            html: message.emailVerification(verification_url, user.firstname)
        });
    }
};

/**
 * Handle existing user
 * 
 * @description It sends new verification email to user if the existing user is unverified
 * 
 * @param {MongooseObject} user - Mongoose user object
 * @returns {function} - Express middleware function
 * @throws {BadRequestError} - If user is already verified
 *
 */
const handleExistingUser = function (user) {
    return async function (req, res, next) {
        const existing_user = user.toObject();

        // If user is not verified - send verification email
        if (!existing_user.status.isVerified) {
            await handleUnverifiedUser(existing_user)(req);

            // Return access token
            res.status(400).json({
                success: true,
                message: 'User account exists already, verification mail sent to user',
                data: {
                    user: {
                        _id: existing_user._id,
                        firstname: existing_user.firstname,
                        lastname: existing_user.lastname,
                        email: existing_user.email,
                    }
                }
            });
        } else {
            return next(new BadRequestError('User already exists'));
        }
    };
};

exports.passportOauthCallback = function (req, res) {
    returnAuthTokens(req.user, 200, res);
};

/**
 * Signup a new user
 * 
 * @description This function creates a new user and sends a verification email to the user.
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
 * @returns {object} Object containing the new user object, JWT token, and the status of the request
 * 
 * 
 * // TODO: Add super admin signup
 * 
 * @throws {BadRequestError} if passwordConfirm is not provided
 * @throws {Error} if an error occurs
 */
exports.signup = async (req, res, next) => {
    let { firstname, lastname, email, role, password, passwordConfirm, preferred_language } = req.body;

    // NOTE: Will be handled by mongoose schema validation
    // Check if all required fields are provided
    // if (!firstname || !lastname || !email || !role || !password || !passwordConfirm) {
    //     return next(new BadRequestError('Please provide all required fields'));
    // }

    if (!passwordConfirm) { return next(new BadRequestError('Path `passwordConfirm` is required., Try again')) }
    if (!role) role = 'EndUser';

    // Check if superAdmin tries to create another superadmin from - addAdmin route
    if (role === 'SuperAdmin' && req.user?.role == 'SuperAdmin')
        return next(new BadRequestError('You cannot create a superadmin account'));

    // Check if user already exists
    const existing_user = await User.findOne({ email }).populate('status')
    if (existing_user) return handleExistingUser(existing_user)(req, res, next);

    let new_user;
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        await User.create([{ firstname, lastname, email, role, preferred_language }], { session, context: 'query' }).then((user) => { new_user = user[0] });
        await Password.create([{ user: new_user._id, password }], { session, context: 'query' });
        await Status.create([{ user: new_user._id }], { session, context: 'query' })
        await AuthCode.create([{ user: new_user._id }], { session, context: 'query' })

        await session.commitTransaction()
        session.endSession()
    })

    // Check if request was made by a superadmin
    if (req.user?.role == 'SuperAdmin' && role != 'SuperAdmin') {
        // Activate and verify user
        new_user.status.isActive = true;
        new_user.status.isVerified = true;
        await new_user.status.save();

        return res.status(200).json({ success: true, data: { user: new_user } });
    }

    // Handle user verification
    await handleUnverifiedUser(new_user)(req);

    // Return access token
    return res.status(200).json({ success: true, data: { user: new_user } });
}

/**
 * Create a new admin account and send a verification email to the user.
 *
 * This function is only accessible to the superadmin to create a new admin account.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user details
 * @param {string} req.body.email - User email
 * @param {string} req.body.password - User password
 * @param {string} req.body.passwordConfirm - User password confirmation
 * @param {string} req.body.firstname - User firstname
 * @param {string} req.body.lastname - User lastname
 *
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 *
 * @returns {Promise<Object>} - Returns a promise that resolves to an object with the following properties:
 * - user: Mongoose user object
 * - token: JWT token
 * - status: Status of the request
 *
 * @throws {BadRequestError} If email or password is not provided or incorrect.
 * @throws {Error} If an error occurs while creating the user or sending the verification email.
 */
exports.addAdmin = async (req, res, next) => {
    req.body.role = 'Admin';
    this.signup(req, res, next);
}

// Login a user
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
 * @returns {object} - The HTTP response object containing a success flag, the user object,
 *                     an access token, and a refresh token.
 * @throws {CustomAPIError} - If the email or password is missing or incorrect, or if the
 *                            email is not verified or the account is not activated.
 * @throws {Error} - If an error occurs.
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //Check if fields are provided
    if (!email || !password) {
        return next(new BadRequestError('Please provide email and password'))
    }
    //check if email exists
    const currentUser = await User.findOne({ email }).populate('password status')
    //console.log(currentUser);

    //Check if email and password matches
    if (
        !currentUser ||
        !(await currentUser.password.comparePassword(password, currentUser.password))
    ) {
        return next(new BadRequestError('Incorrect email or password'));
    }

    // Check if user is verified
    if (!currentUser.status.isVerified) {
        return next(new BadRequestError('Please verify your email'));
    }

    // Check if user account in acivted
    if (!currentUser.status.isActive) {
        return next(new BadRequestError('Please activate your account'));
    }

    // Get access and refresh token
    const { access_token, refresh_token } = await getAuthTokens(currentUser, 'access');

    currentUser.enrolled_courses = undefined

    // Return access token
    return res.status(200).json({
        success: true,
        data: {
            user: currentUser,
            access_token,
            refresh_token
        }
    });
}

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
 * @returns {object} - The HTTP response object containing a success flag and a message.
 * @throws {CustomAPIError} - If the token is invalid or expired.
 * @throws {Error} - If an error occurs.
 */
exports.verifyEmail = async (req, res, next) => {
    //  Get token from url
    const { token } = req.params;

    if (!token) {
        return next(BadRequestError('No authentication token provided'))
    }

    //  Verify token
    const payload = jwt.verify(token, config.JWT_EMAILVERIFICATION_SECRET);

    //  Check if token is blacklisted
    const blacklisted_token = await BlacklistedToken.findOne({ token });
    if (blacklisted_token) return next(new UnauthorizedError('Token Invalid or Token Expired, Request for a new verification token'))

    //  Get user from token
    const user = await User.findById(payload.id).populate('status');

    if (!user) {
        return next(new BadRequestError('Token Invalid or Token Expired, Request for a new verification token'))
    }

    user.status.isVerified = true;
    await user.status.save();

    await BlacklistedToken.create({ token });

    return res.status(200).send({ success: true, message: 'Email verified' })
}

/**
 * Request activation for the super admin account.
 *
 * @description This function allows the super admin to request for account activation.
 *
 * The super admin account is not activated by default for security reasons.
 * This function generates two activation codes - one for the super admin and one for the project hosts.
 * The new super admin uses the first activation code to activate the account, 
 * and the project hosts use the second activation code to activate the account.
 * </br>
 * 
 * Once the activation codes are generated, they are sent to the super admin and the project hosts via email.
 * The activation codes will be required to complete the account activation process.
 *
 * @param {string} email - Super admin email.
 *
 * @returns {Object} The status of the request and access token if successful.
 *
 * @throws {CustomAPIError} If the super admin account does not exist.
 * @throws {CustomAPIError} If the super admin account is already active.
 * @throws {Error} If an error occurs during the request.
 */
exports.requestSuperAdminAccountActivation = async (req, res, next) => {
    const email = req.params.email

    // Check if a super admin account exists, and it's not active
    const super_admin = await User.findOne({ email, role: 'SuperAdmin' }).populate('status')
    if (!super_admin) return next(new BadRequestError('Superadmin account does not exist'))
    //console.log(super_admin)

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
 * Activates a super admin account.
 *
 * This function activates a super admin account on the MOOCs platform. 
 * The function requires three activation codes to complete the account activation process. 
 * These activation codes are generated when the super admin requests for account activation. 
 * This function is used by the super admin to activate the account.
 *
 * @see {@link module:controllers/auth~requestSuperAdminAccountActivation} for generating the activation codes.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @param {string} req.body.activation_code1 - The first activation code sent to the new super admin.
 * @param {string} req.body.activation_code2 - The second activation code sent to the project hosts.
 * @param {string} req.body.activation_code3 - The third activation code sent to the project hosts.
 *
 * @returns {Object} The response object containing a `status` field and a success message.
 * @returns {boolean} response.success - The status of the request, which is always `true`.
 * @returns {Object} response.data - The data returned by the function.
 * @returns {string} response.data.message - The success message, which is "Super admin account activated".
 *
 * @throws {BadRequestError} If any of the activation codes are missing.
 * @throws {BadRequestError} If the user making the request is not a super admin.
 * @throws {BadRequestError} If the activation code is invalid.
 * @throws {BadRequestError} If the activation code has expired.
 * @throws {Error} If any other error occurs.
 */
exports.activateSuperAdminAccount = async (req, res, next) => {
    const { activation_code1, activation_code2, activation_code3 } = req.body

    // Check if all activation codes are provided
    if (!activation_code1 || !activation_code2 || !activation_code3) {
        return next(new BadRequestError('Missing required parameter in request body'));
    }

    const admin = await User.findOne({ _id: req.user.id, role: 'SuperAdmin' }).populate('status')
    //console.log(admin)

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
    await admin.status.save()

    // Blacklist token
    // await BlacklistedToken.create({ token: req.token })

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
 * @description If a super admin account is deactivated, all project hosts will be notified. 
 * This function generates three deactivation codes and sends them to the super admin and two project hosts via email. 
 *
 * @see {@link module:controllers/auth~deactivateSuperAdminAccount} for deactivating the super admin account. 
 * @param {string} email   - Super admin email
 * 
 * @returns {string} status - Status of the request
 * 
 * @throws {CustomAPIError} if super admin account does not exist
 * @throws {CustomAPIError} if super admin account is already active
 * @throws {Error} if error occurs
 */
exports.requestSuperAdminAccountDeactivation = async (req, res, next) => {
    const email = req.params.email

    // Check if a super admin account exists, and it's not active
    const super_admin = await User.findOne({ email, role: 'SuperAdmin' }).populate('status')
    if (!super_admin) return next(new BadRequestError('Superadmin account does not exist'))

    //console.log(super_admin)
    // Check if account is active 
    if (!super_admin.status.isActive) return next(new BadRequestError('Account is already inactive'))

    // Generate activation codes
    const { deactivation_code1, deactivation_code2, deactivation_code3 } = await getAuthCodes(super_admin._id, 'su_deactivation')

    // Send activation codes to HOSTs
    sendEmail({
        email: config.HOST_ADMIN_EMAIL1,
        subject: `New super admin deactivation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation activation code ${deactivation_code1}`
    })
    sendEmail({
        email: config.HOST_ADMIN_EMAIL2,
        subject: `New super admin activation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation code ${deactivation_code2}`
    })

    // Send activation code to user
    sendEmail({
        email: super_admin.email,
        subject: `New super admin deactivation request for ${super_admin.email}`,
        message: `This is your part of the required deactivation code ${deactivation_code3}`
    })

    // Get activation access token
    const { access_token } = await getAuthTokens(super_admin._id, 'su_deactivation')

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
 * @description Deactivates super admin account if all activation codes are correct <br>
 * 
 * @param {string} deactivation_code1 - deactivation code 1 sent to new super admin
 * @param {string} deactivation_code2 - deactivation code 2 sent to project hosts
 * @param {string} deactivation_code3 - deactivation code 3 sent to project hosts
 * 
 * @returns {string} status - Status of the request
 * 
 * @throws {BadRequestError} if activation codes are not provided
 * @throws {BadRequestError} if token is invalid or token has expired
 * @throws {BadRequestError} if token is blacklisted
 * @throws {Error} if error occurs

 * Note: To obtain the deactivation code,
 * a request must first be made to the `requestSuperAdminAccountDeactivation()` route. 
 * This route sends an email with the codes to the new 
 * super admin and two other emails with parts of the code to the project hosts.
 * 
 * @see {@link module:controllers/auth~requestSuperAdminAccountDeactivation} for requesting for a deactivation code.
 */
exports.deactivateSuperAdminAccount = async (req, res, next) => {
    const { deactivation_code1, deactivation_code2, deactivation_code3 } = req.body

    // Check if all activation codes are provided
    if (!deactivation_code1 || !deactivation_code2 || !deactivation_code3) {
        return next(new BadRequestError('Missing required parameter in request body'));
    }

    const admin = await User.findOne({ _id: req.user.id, role: 'SuperAdmin' }).populate('status')

    // Check if user exists
    if (!admin) {
        throw new BadRequestError('Token Invalid or Token Expired, Request for a new deactivation token');
    }

    // Find activation code document
    const deactivation_code = `${deactivation_code1}-${deactivation_code2}-${deactivation_code3}`
    const auth_code = await AuthCode.findOne({ user: admin._id, deactivation_code: deactivation_code })

    // Check if activation code exists
    if (!auth_code) { throw new BadRequestError('Invalid deactivation code') }

    // Check if activation code has expired
    if (auth_code.expiresIn < Date.now()) {
        throw new BadRequestError('Deactivation code has expired, request for a new deactivation code')
    }

    // Activate user
    admin.status.isActive = false;
    await admin.status.save();

    // Blacklist token
    await BlacklistedToken.create({ token: req.token })

    // Send response to client
    return res.status(200)
        .send({
            success: true,
            data: {
                message: "Super admin account Deactivated"
            }
        })
}

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
 * Sends a password reset code to a user's email.
 *
 * @param {string} email - User's email address.
 *
 * @returns {Object} An object containing a success message and an access token.
 *
 * @throws {BadRequestError} If the required parameter is missing in the request body.
 * @throws {BadRequestError} If the user does not exist.
 */
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body

    //  Check for missing required field in request body
    if (!email) return next(new BadRequestError('Missing required parameter in request body'));

    const current_user = await User.findOne({ email })
    //console.log(current_user);

    //  Check if user exists
    if (!current_user) return next(new BadRequestError('User does not exist'));

    //  Get password reset code
    const { password_reset_code } = await getAuthCodes(current_user.id, 'password_reset')

    //  Send password reset code to user
    const message = new EmailMessage()
    sendEmail({
        email: current_user.email,
        subject: 'Password reset for user',
        html: message.passwordReset(password_reset_code, current_user.firstname)
    })

    //  Get access token
    const { access_token } = await getAuthTokens(current_user._id, 'password_reset')

    return res.status(200).send({
        success: true,
        data: {
            message: "Successful, Password reset code sent to users email",
            access_token
        }
    })
}

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
    const { new_password, password_reset_code } = req.body

    // Check if new password and password reset code are provided
    if (!new_password || !password_reset_code)
        return next(new BadRequestError('Missing required parameter in request body'));

    // Check if user exists
    const current_user = await (
        await User.findOne({ _id: req.user.id })
    ).populate('auth_codes password');

    if (!current_user) {
        throw new BadRequestError('User does not exist');
    }

    // Check if password reset code is valid
    if (password_reset_code !== current_user.auth_codes.password_reset_code) {
        throw new BadRequestError('Invalid password reset code');
    }

    // Change password
    await current_user.password.updatePassword(new_password, current_user.password);

    // Delete auth code, blacklist jwt token
    BlacklistedToken.create({ token: req.token });
    // BlacklistToken.create({ token: jwtToken })

    return res.status(200).send({
        success: true,
        data: {
            message: "Successfully reset password",
        }
    })
}

// Google Signin
/**
 * Sign in a user using their Google account.
 *
 * @param {Object} req - The request object.
 * @param {string} req.headers.authorization - The authorization header containing the Google auth code.
 *
 * @returns {Object} An object containing the status of the request, the access token, and the refresh token.
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
    const code = authorization.split(' ')[1];

    if (!code) {
        return next(new BadRequestError('Missing required params in request body'))
    }

    const client = new OAuth2Client(config.OAUTH_CLIENT_ID, config.OAUTH_CLIENT_SECRET, 'postmessage');

    // Exchange code for tokens
    const { tokens } = await client.getToken(code)

    // Verify id token
    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: config.OAUTH_CLIENT_ID,
    }),
        payload = ticket.getPayload(),
        existing_user = await User.findOne({ email: payload.email }).populate('status')

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

        const session = await mongoose.startSession();
        let new_user;
        await session.withTransaction(async () => {
            await User.create(
                [{ ...user_data }], { session, context: 'query' }
            ).then((user) => { new_user = user[0] });

            await Password.create([{ user: new_user._id, password: user_data.password }], { session, context: 'query' });
            await Status.create([{ user: new_user._id }], { session, context: 'query' })
            await AuthCode.create([{ user: new_user._id }], { session, context: 'query' })

            await session.commitTransaction()
            session.endSession()
        })

        await returnAuthTokens(new_user, 200, res);
        return
    }

    console.log(existing_user.toObject())

    await returnAuthTokens(existing_user, 200, res)
};

// Get details of logged in user
/**
 * Get data for the currently logged in user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object set by the `authenticateToken` middleware.
 * @param {string} req.user.id - The ID of the currently logged in user.
 * @param {Object} res - The response object.
 * 
 * @returns {Object} - The response object containing the user data.
 * @returns {string} .status - The status of the response, either "success" or "error".
 * @returns {Object} .data - The data returned by the response.
 * @returns {Object} .data.user - The user object containing the data for the currently logged in user.
 * 
 * @throws {Error} if an error occurs while fetching the user data.
 */
exports.getLoggedInUser = async (req, res, next) => {
    // Check for valid authorization header
    const user = await User.findById(req.user.id);

    return res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
}


