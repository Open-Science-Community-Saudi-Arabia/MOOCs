const GoogleStrategy = require('passport-google-oidc').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const config = require('./config');
const User = require('../models/user.models');
const UUID = require('uuid').v4;
const fs = require('fs')

console.log(__dirname)
// console.log(config)
var buffer = new Buffer(fs.readFileSync(__dirname + '/../env.test','utf8'));
console.log(buffer.toString())

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
