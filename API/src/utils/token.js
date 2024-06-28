/**
 * @fileoverview Manage user token and authentication.
 *
 * @category API
 * @subcategory Utilities
 *
 * @module Token
 *
 * @description  This module contains functions for generating and verifying JWT tokens.
 *
 * @requires ../models/user.models
 * @requires ../models/token.models
 * @requires ../utils/errors
 * @requires jsonwebtoken
 * @requires ../utils/config
 * @requires uuid
 *
 */

const { User } = require("../models/user.models");
const { AuthCode } = require("../models/token.models");
const { NotFoundError } = require("./errors");
const jwt = require("jsonwebtoken");
const config = require("./config");
const { v4: UUID } = require("uuid");

/**
 * Gets the secret and expiry for the specified token type
 *
 * @description This function returns the secret and expiry for the specified token type. <br>
 * The token type can be one of the following: <br>
 * `access` - Access token <br>
 * `refresh` - Refresh token <br>
 * `password_reset` - Password reset token <br>
 *
 * @param {string} type - Type of token to generate
 * @returns {object}  - Secret and expiry date for the specified token type
 */

const getRequiredConfigVars = (type) => {
  switch (type) {
    case "access":
      return {
        secret: config.JWT_ACCESS_SECRET,
        expiry: config.JWT_ACCESS_EXP,
      };

    case "refresh":
      return {
        secret: config.JWT_REFRESH_SECRET,
        expiry: config.JWT_REFRESH_EXP,
      };

    case "password_reset":
      return {
        secret: config.JWT_PASSWORDRESET_SECRET,
        expiry: config.JWT_PASSWORDRESET_EXP,
      };

    case "verification":
      return {
        secret: config.JWT_EMAILVERIFICATION_SECRET,
        expiry: config.JWT_EMAILVERIFICATION_EXP,
      };
  }
};

/**
 * Generates a JWT token
 *
 * @description This function generates a JWT token for the specified user. <br>
 *
 * @param {ObjectId} user_id - Generate token for user with the ID
 * @param {string} token_type - Type of token to generate
 * @returns {object} - Access and refresh token
 *
 * @throws {NotFoundError} - If user does not exist
 * @throws {Error} - If any other error occurs
 *  */

const getAuthTokens = async (user_id, token_type = null) => {
  try {
    const current_user = await User.findById(user_id).populate("status");
    if (!current_user) {
      throw new NotFoundError("User does not exist");
    }

    const data = {
      id: current_user.id,
      email: current_user.email,
      role: current_user.role,
      status: current_user.status,
    };
    if (!token_type) token_type = "access";
    let { secret, expiry } = getRequiredConfigVars(token_type);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "dev") {
      expiry = "6h";
    }
    const access_token = jwt.sign(data, secret, { expiresIn: expiry });
    const refresh_token = jwt.sign(data, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXP,
    });

    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

/**
 * Generates Auth Codes
 *
 * @description Generate authentication codes,
 * verification code, password reset code, activation code, deactivation code for user , depends on code type.
 *
 * @param {ObjectId} user_id - Generate token for user with the ID
 * @param {string} code_type - Type of token to generate
 *
 * @returns {object} verification_code, password_reset_code, activation_code1, activation_code2, activation_code3
 */
const getAuthCodes = async (user_id, code_type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let random_code = `${Math.floor(100000 + Math.random() * 900000)}`;
      let verification_code, password_reset_code;

      if (code_type == "verification") {
        verification_code = random_code;
        await AuthCode.findOneAndUpdate(
          { user: user_id },
          { verification_code },
          { new: true, upsert: true }
        );
      }

      if (code_type == "password_reset") {
        password_reset_code = random_code;
        const autho = await AuthCode.findOneAndUpdate(
          { user: user_id },
          { password_reset_code },
          { new: true, upsert: true }
        );
      }

      resolve({
        verification_code,
        password_reset_code,
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Decode JWT
 *
 * @description Decode a JWT token
 *
 * @param {string} token
 * @returns {Object} - Decoded token
 */
const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAuthTokens,
  getAuthCodes,
  decodeJWT,
  getRequiredConfigVars,
};
