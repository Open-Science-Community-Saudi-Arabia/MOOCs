/**
 * @description Role based permission handler
 * 
 * @category Backend API
 * @subcategory Middlewares
 * 
 * @module RBAC Permission Handler
 * 
 * @description This module contains a middleware
 * that handles role based access control.
 */

const asyncWrapper = require("../utils/async_wrapper");
const {  ForbiddenError } = require("../utils/errors");

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
    /**
     * @description Role based permission handler
     * 
     * @param {String} roles 
     */
    return asyncWrapper(async (req, res, next) => {
        const allowed_roles = roles.split(" ");

        if (!allowed_roles.includes(req.user.role)) {
            throw new ForbiddenError("Unauthorized access");
        }

        next();
    });
};
