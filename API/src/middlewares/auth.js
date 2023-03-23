/**
 * @fileoverview Basic authentication middleware.
 * 
 * @category Backend API
 * @subcategory Middlewares
 * 
 * @module Basic Authentication
 * 
 * @description This module contains the basic authentication middleware.
 * 
 * @requires ../utils/errors
 * @requires jsonwebtoken
 * @requires ../models/token.models
 * @requires ../utils/token
 * @requires ../utils/config
 */


const { UnauthenticatedError } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models/token.models');
const { getAuthTokens, getRequiredConfigVars } = require('../utils/token');

const config = require('../utils/config');

/**
 * Basic authentication middleware.
 * 
 * @description This middleware checks if the incoming 
 * request has a valid authorization header with a
 * bearer token and verifies the token to authenticate the user.
 * If the token is valid, it adds the user payload to the
 * `req.user` object and the token to the `req.token` object, 
 * allowing subsequent middleware or handlers to access this information.
 *
 *
 * @param {String|null} [token_type] - If provided, checks if the token is of the specified type.
 * the allowed values are `access`, `refresh`, `password_reset`, 
 * `verification`, `su_activation`, `su_deactivation`.
 * 
 * @returns {function} - Express middleware function that takes in the `req`, `res`, and `next` objects.
 * @throws {BadRequestError} if the request does not have a valid authorization header.
 * @throws {UnauthenticatedError} if the token is invalid or has been blacklisted.
 * @throws {UnauthenticatedError} if the user's account is not active.
 * @throws {Error} if `token_type` is specified but the corresponding secret is not found.
 *
 * @example
 * // Use basicAuth middleware to authenticate incoming requests
 * app.get('/api/protected', basicAuth(), (req, res) => {
 *   // do something with req.user and req.token
 *   res.send('Hello World');
 * });
 *
 * @example
 * // Use basicAuth middleware to authenticate incoming requests for a specific token type
 * app.get('/api/protected', basicAuth('verifycation'), (req, res) => {
 *   // here the token type is specified as verification
 *   // do something with req.user and req.token
 *   res.send('Hello World');
 * });
 */
const basicAuth = function (token_type = null) {
    return async (req, res, next) => {
        // Check if the request has a valid authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new UnauthenticatedError('Invalid authorization header'));
        }

        let secret = config.JWT_ACCESS_SECRET;

        // If token type is specified, check if the token is of the specified type
        if (token_type) {
            secret = getRequiredConfigVars(token_type).secret;
        }

        // Verify the token
        const jwtToken = authHeader.split(' ')[1]; //console.log(jwtToken)
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
