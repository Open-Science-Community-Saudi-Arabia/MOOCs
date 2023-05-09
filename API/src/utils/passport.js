/**
 * @fileoverview Passport utils
 * 
 * @category Backend API
 * @subcategory Utilities
 * 
 * @module Passport Utilities
 * 
 * @description This module contains functions for authenticating users using passport
 * 
 * @requires ../models/user.models
 * @requires ../utils/config
 * @requires passport-google-oidc
 * @requires passport-github
 * @requires uuid
 */

const GoogleStrategy = require('passport-google-oidc').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const config = require('./config');
const User = require('../models/user.models');
const UUID = require('uuid').v4;


/**
 * Create User
 * 
 * @param {Object} data 
 * @param {string} data.firstname
 * @param {string} data.lastname
 * @param {string} data.email
 * @param {string} data.googleId
 * @param {string} data.role
 * @param {string} data.password
 * @param {string} data.passwordConfirm
 * @param {boolean} data.isVerified
 *  
 * @description This function creates a new user if the user does not exist
 * 
 * @returns {Object} User object 
 */
const createUser = async (data) => {
    try {
        let existing_user = await User.findOne({ email: data.email });
        if (existing_user) return existing_user;

        let user;
        await User.create(data)
            .then((data) => {
                user = data;
            })
            .catch((err) => {
                throw err;
            });

        if (user instanceof Error) throw user;

        return user;
    } catch (error) {
        return error;
    }
};

/**
 * Google Auth Strategy
 * 
 * @description This function creates a new user if the user does not exist
 * 
 * @returns {Object} User object
 * 
 */
const googleStrategy = new GoogleStrategy(
    {
        clientID: config.OAUTH_CLIENT_ID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
        callbackURL: `${config.SERVER_URL}/api/v1/auth/google/callback`,
    },
    async function (issuer, profile, cb) {
        const password = UUID(),
            user_data = {
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                googleId: profile.id,
                role: 'EndUser',
                password: password,
                passwordConfirm: password,
                isVerified: true,
            };

        const result = await createUser(user_data);

        if (result instanceof Error) {
            return cb(result, false, { message: result.message });
        }

        return cb(null, result);
    }
);

/**
 * Github Auth Strategy
 * 
 * @description This function creates a new user if the user does not exist
 * 
 * @returns {Object} User object
 */
const githubStrategy = new GitHubStrategy(
    {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: `${config.SERVER_URL}/api/v1/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
        const password = UUID(),
            user_data = {
                firstname: profile._json.name,
                lastname: profile._json.name,
                email: profile._json.email
                    ? profile._json.email
                    : profile._json.login + '@github.com',
                githubId: profile.id,
                role: 'EndUser',
                password: password,
                passwordConfirm: password,
                isVerified: true,
            };

        const result = await createUser(user_data);

        if (result instanceof Error) {
            return cb(result, false, { message: result.message });
        }

        return cb(null, result);
    }
);

module.exports = { googleStrategy, githubStrategy };
