/**
 * Custom Error Classes
 * 
 * @category Backend API
 * 
 * @module Custom Error Classes
 * 
 * @description This module contains custom error classes
 * 
 * @requires Error
 */


/**
 * Custom Error Class
 * 
 * @class CustomAPIError
 * @extends Error
 * 
 * @description This class is the base class for all custom error classes
 * 
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class CustomAPIError extends Error {
    constructor(message, statusCode = 500){
        super(message)
        this.statusCode = statusCode
    }
}

/**
 * @class BadRequestError
 */
class BadRequestError extends CustomAPIError {
    constructor (message){
        super(message)
        this.statusCode = 400
    }
}

/**
 * @class UnauthorizedError
 */
class UnauthorizedError extends CustomAPIError {
    constructor (message) {
        super(message) 
        this.statusCode = 401
    }
}

/**
 * @class ForbiddenError
 */
class ForbiddenError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 403
    }
}

/**
 * @class NotFoundError
 */
class NotFoundError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 404
    }
}

/**
 * @class ConflictError
 */
class ConflictError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 409
    }
}

/**
 * @class InternalServerError
 */
class InternalServerError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 500
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
    InternalServerError
}