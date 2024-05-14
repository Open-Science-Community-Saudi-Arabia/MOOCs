/**
 * @fileoverview Custom Error Classes.
 *
 * @category API
 * @subcategory Utilities
 *
 * @module Custom Error
 *
 * @description This file contains custom error classes
 *
 */


/**
 * @name CustomAPIError
 * @description Base class for all custom error classes
 * @extends Error
 *
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class CustomAPIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * @name BadRequestError
 * @description Error from a bad request
 * @extends Error
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

/**
 * @name UnauthorizedError
* @extends CustomAPIError
 * @description UnauthorizedError handles error for unauthenticated and unathorized requests
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

/**
 * @name ForbiddenError
 * @extends CustomAPIError
 * @description ForbiddenError handles error for request not allowed
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

/**
 * @name NotFoundError
 * @extends CustomAPIError
 * @description NotFoundError handles error with not existing routes.
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 *
 */
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

/**
 * @name ConflictError
 * @extends CustomAPIError
 * @description ConflictError handles conflict error.
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

/**
 * @name InternalServerError
 * @extends CustomAPIError
 * @description InternalServerError handles error from server.
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class InternalServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const UnauthenticatedError = UnauthorizedError;

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
