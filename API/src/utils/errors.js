
class CustomAPIError extends Error {
    constructor(message, statusCode = 500){
        super(message)
        this.statusCode = statusCode
    }
}

class BadRequestError extends CustomAPIError {
    constructor (message){
        super(message)
        this.statusCode = 400
    }
}

class UnauthorizedError extends CustomAPIError {
    constructor (message) {
        super(message) 
        this.statusCode = 401
    }
}

class ForbiddenError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 403
    }
}

class NotFoundError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 404
    }
}

class ConflictError extends CustomAPIError {
    constructor (message) {
        super(message)
        this.statusCode = 409
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
    ConflictError
}