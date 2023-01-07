const GoogleStrategy = require('passport-google-oidc').Strategy;

const config = require('./config');
const User = require('../models/user.models');
const UUID = require('uuid').v4;

const createUser = async (data) => {
    try {
        let existing_user = await User.findOne({ email: data.email })
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
        callbackURL: 'http://localhost:5000/api/v1/auth/google/callback',
    },
    async function (issuer, profile, cb) {
        const password = UUID();

        let user_data = {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 'EndUser',
            password: password,
            passwordConfirm: password,
        };

        const result = await createUser(user_data);

        if (result instanceof Error){
            return cb(result, false, { message: result.message });
        }

        return cb(null, result);
    }
);

module.exports = { googleStrategy}
