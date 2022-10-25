const jwt = require('jsonwebtoken');

const asyncWrapper = require('../utils/async_wrapper')

const config = require('../utils/config');
const { CustomAPIError } = require('../utils/custom_errors');

const basicAuth = asyncWrapper((req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new CustomAPIError('Unauthenticated, Please Login', 403))
    }
    try {
        const data = jwt.verify(token, config.JWT_SECRET);
        req.user = { id: data.id, role: data.role }

        return next();
    } catch {
        return next(new CustomAPIError('Unauthenticated, Please Login', 403))
    }
});

module.exports = {
    basicAuth
};
