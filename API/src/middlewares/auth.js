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
 * Middleware to check if the request has a valid authorization header
 * and if the token is valid.
*
 * @description This middleware checks if the incoming request 
 * has a valid authorization header with a JWT token,
 * and verifies the token to ensure that it's valid. 
 * It also checks if the token has been blacklisted or revoked,
 * and ensures that the user's account is active before allowing 
 * the request to proceed to the next middleware.The middleware 
 * function returns a Promise that resolves if the 
 * authorization header and token are valid and the user's account 
 * is active, or rejects with an UnauthenticatedError if 
 * any of these conditions are not met.
 * 
 * <br>
 * <br>
 *
 * If a `token_type` parameter is specified, the middleware 
 * function will use the JWT secret for the specified token
 * type to verify the token. 
 * If the `token_type` parameter is not specified, the function 
 * will use the default access token secret defined in the configuration file.
 *
 * <br>
 * <br>
 * 
 * If the incoming request is a GET request to the `/authtoken` endpoint, 
 * the middleware will return a new access token for the user, 
 * without performing any authorization checks.
 * 
 * @param {string} token_type (optional) - specifies the type of token to be used
 * @returns {Function} Express middleware function
 *
 * @throws {UnauthenticatedError} If the request does not have a valid authorization header.
 * @throws {UnauthenticatedError} If the token is invalid.
 * @throws {UnauthenticatedError} If the token has been blacklisted.
 * @throws {UnauthenticatedError} If the user's account is not active.
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
            if (token_type == 'optional') return next();
            return next(new UnauthenticatedError('Invalid authorization header'));
        }

        token_type = token_type == 'optional' ? 'access' : token_type
        let secret = getRequiredConfigVars(token_type).secret

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
