/**
 * @description Error Handler Middleware
 * 
 * @category Backend API
 * @subcategory Middlewares
 * 
 * @module Error Handler
 * 
 * @description This module contains the error handler middleware.
 */

const { CustomAPIError } = require('../utils/errors')

const handleDuplicateKey = (err) => {
    const errKeyValue = err.keyValue.email
    const message = `${errKeyValue} already exists please user another email`
    return new CustomAPIError(message, 400)
}

/**
 * @description Handles Validation Errors, these errors are thrown by
 *  mongoose when a model validation fails
 * 
 * @param {Error} err 
 * @returns  {CustomAPIError}
 */
const handleValidationErr = (err) => {
    const errPath = Object.values(err.errors).map((el) => el.message)
    const message = `${errPath}, Try again`
    return new CustomAPIError(message, 400)
}

/**
 * Error handler 
 * 
 * @description Error Handler Middleware <br>
 * 
 * This middleware handles all errors thrown by the application 
 * and sends a response to the client. 
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 * 
 */
const errorHandler = (err, req, res, next) => {
    // console.log(err)
    if (process.env.NODE_ENV != 'test') {
        console.log(err)
    }
    //Send Operational Errors We Trust To Client
    let error = { ...err }
    if (error.code == 11000) error = handleDuplicateKey(error)
    if (error._message == 'User validation failed')
        error = handleValidationErr(error)

    if (error.name == 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token Expired' })
    }

    if (error.name = 'JsonWebTokenError' && error.message == 'jwt malformed') {
        return res.status(401).send({ message: 'Invalid authentication token'})
    }

    if (error instanceof CustomAPIError || err instanceof CustomAPIError) {
        return res
            .status(error.statusCode || err.statusCode)
            .send({ message: error.message || err.message })
    } else {
        return res.status(500).send({ message: 'An error occurred' })
    }
}

module.exports = errorHandler
