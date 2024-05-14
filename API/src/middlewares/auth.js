/**
 * @fileoverview Basic authentication middleware.
 *
 * @category API
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

const { UnauthenticatedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { BlacklistedToken } = require("../models/token.models");
const { getAuthTokens, getRequiredConfigVars } = require("../utils/token");

const config = require("../utils/config");

/**
 * Middleware to check if the request has a valid authorization header
 * and if the token is valid.
 *
 * @description This middleware checks if the incoming request
 * has a valid authorization header with a JWT token,
 * and verifies the token to ensure that it's valid.
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (token_type == "optional") return next();
      return next(new UnauthenticatedError("Invalid authorization header"));
    }

    token_type = token_type == "optional" ? null : token_type;

    token_type = !token_type ? "access" : token_type;

    let { secret } = getRequiredConfigVars(token_type);

    const jwtToken = authHeader.split(" ")[1];
    const payload = jwt.verify(jwtToken, secret);
    req.user = payload;
    req.token = jwtToken;

    const blacklisted = await BlacklistedToken.findOne({ token: jwtToken });
    if (blacklisted) {
      return next(new UnauthenticatedError("JWT token expired"));
    }

    if (req.method == "GET" && req.path == "/authtoken") {
      const new_access_token = (await getAuthTokens(payload.id)).access_token;

      return res
        .status(200)
        .send({ message: "success", access_token: new_access_token });
    }

    if (!req.user.status.isActive && !token_type) {
      return next(
        new UnauthenticatedError(
          "Unauthorized access, users account is not active"
        )
      );
    }

    next();
  };
};

module.exports = {
  basicAuth,
};
