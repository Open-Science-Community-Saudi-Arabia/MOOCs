
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

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthorizedError,
}