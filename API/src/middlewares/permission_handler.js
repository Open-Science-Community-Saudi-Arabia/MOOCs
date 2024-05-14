/**
 * @description Role based permission handler
 *
 * @category API
 * @subcategory Middlewares
 *
 * @module RBAC Permission Handler
 *
 * @description This module contains a middleware
 * that handles role based access control.
 */

const asyncWrapper = require("../utils/async_wrapper");
const { ForbiddenError } = require("../utils/errors");

/**
 * @description Role based permission handler.
 *
 * @param {String} roles
 * @returns {function} - HTTP next()
 */

module.exports = function (roles) {
  return asyncWrapper(async (req, res, next) => {
    const allowed_roles = roles.split(" ");
    if (!allowed_roles.includes(req.user.role)) {
      throw new ForbiddenError("Unauthorized access");
    }
    next();
  });
};
