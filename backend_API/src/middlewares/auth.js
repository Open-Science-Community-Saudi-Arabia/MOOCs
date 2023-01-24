const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models/token.models');
const User = require('../models/user.models');

const asyncWrapper = require('../utils/async_wrapper')

const config = require('../utils/config');
const { CustomAPIError, UnauthorizedError, UnauthenticatedError } = require('../utils/errors');
const { getRequiredConfigVars } = require('../utils/token');

const issueVerificationToken = async (user) => {
    const token = user.createHashedToken('email_verification');
    await user.save({ validateBeforeSave: false });

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        await TestToken.create({
            user: currentUser._id,
            email_verification: ver_token
        })
    }

    return token;
}

const basicAuth = function (token_type) {
    return async (req, res, next) => {

        const token = req.cookies.token;
        if (!token) {
            return next(new CustomAPIError('Unauthenticated, Please Login', 403))
        }

        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) {
            throw new UnauthenticatedError('Access Denied, Please Login');
        }

        let secret = token_type ? getRequiredConfigVars(token_type).secret : config.JWT_ACCESS_SECRET;
        const data = jwt.verify(token, secret);
        req.user = { id: data.id, role: data.role }

        const curr_user = await User.findById(req.user.id);
        if (!curr_user.isVerified) {
            const ver_token = await issueVerificationToken(curr_user);
            const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${ver_token}`;
            await sendEmail({
                email: curr_user.email,
                subject: 'Email Verification',
                message: `Please click on the link below to verify your email address: ${verificationURL}`
            })

            return next(new CustomAPIError('Please verify your email', 403))
        }

        next();
    }
}

module.exports = {
    basicAuth
};
