const asyncWrapper = require('../utils/async_wrapper')
const { UnauthorizedError } = require('../utils/custom_errors')
const config = require('../utils/config')

// USAGE
/*
    const permit = require('./permissions')

    // pass a string of allowed roles to the permission hanlder, 
    // each role should be seperated with a space

    // Express route
    router
        .post('/your/route/path/', permit('allowed_role1 allowed_role2'), (req, res, next) => {})
*/
module.exports = function (roles) {
    return asyncWrapper(async (req, res, next) => {
        const allowed_roles = roles.split(' ')

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedError('Authentication required');
        }

        const jwtToken = authHeader.split(' ')[1],
            payload = jwt.verify(jwtToken, config.JWT_SECRET);

        if (!allowed_roles.includes(payload.role)) {
            throw new UnauthorizedError('Unauthorized access');
        }

        next();
    });
};
