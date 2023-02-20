const asyncWrapper = require('../utils/async_wrapper');
const {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
} = require('../utils/errors');
const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models/token.models');
const { getAuthTokens, getRequiredConfigVars } = require('../utils/token');

const config = require('../utils/config');

/**
 * Middleware to check if the request has a valid authorization header
 * and if the token is valid
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * @throws {BadRequestError} if the request has an invalid authorization header
 * @throws {UnauthenticatedError} if the token is invalid
 * @throws {UnauthenticatedError} if the token has been blacklisted
 * @throws {UnauthenticatedError} if the user's account is not active
 */
const basicAuth = function (token_type = null) {
    return async (req, res, next) => {
        // Check if the request has a valid authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new BadRequestError('Invalid authorization header'));
        }

        let secret = config.JWT_ACCESS_SECRET;

        // If token type is specified, check if the token is of the specified type
        if (token_type) {
            secret = getRequiredConfigVars(token_type).secret;
        }

        // Verify the token
        const jwtToken = authHeader.split(' ')[1]; console.log(jwtToken)
        const payload = jwt.verify(jwtToken, secret);
        req.user = payload;
        req.token = jwtToken;

        // Check if access token has been blacklisted
        const blacklisted = await BlacklistedToken.findOne({ token: jwtToken });
        if (blacklisted) {
            return next(new UnauthenticatedError('JWT token expired'));
        }

        // To get new access token
        if (req.method == 'GET' && req.path == '/authtoken') {
            const new_access_token = (await getAuthTokens(payload.id))
                .access_token;

            return res
                .status(200)
                .send({ message: 'success', access_token: new_access_token });
        }

        if (!req.user.status.isActive && !token_type) {
            return next(
                new UnauthenticatedError(
                    'Unauthorized access, users account is not active'
                )
            );
        }

        // If all is well, proceed to the next middleware
        next();
    };
};

module.exports = {
    basicAuth,
};
