const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./custom_errors')
const config = require('./config')

const decodeJWT = (jwtToken) => {
    try {
        let access;
        try {
            access = jwt.verify(jwtToken, config.JWT_ACCESS_SECRET);
            return access
        } catch (error) {
            // If the error is due to invalid signature, then the token is a refresh token
            if (error.message == 'invalid signature') {
                return jwt.verify(jwtToken, config.JWT_REFRESH_SECRET);
            }
            throw error
        }
    } catch (error) {
        // console.log(error);
        throw new UnauthorizedError('JWT Token expired')
    }
};

module.exports = {
    decodeJWT
};
