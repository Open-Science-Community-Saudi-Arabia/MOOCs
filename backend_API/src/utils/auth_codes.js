const User = require('../models/user.models');
const TestToken = require('../models/test_token.models');
const AuthCode = require('../models/authcode.models');
const { sendEmail } = require('../utils/email');

const { CustomAPIError, BadRequestError } = require('../utils/custom_errors');

const getAuthCodes = async (user_id, code_type = 'password_reset') => {

    // 1. Check if user exists
    const user = await User.findById(user_id);

    if (!user) { throw new NotFoundError('User not found'); }

    // 2. Generate random code
    const code = Math.floor(100000 + Math.random() * 900000).toString;

    // 3. Check if code exists
    const auth_code = await AuthCode.findOneAndUpdate({ user: user_id }, { [code_type]: code }, { new: true, upsert: true });

    const authCodes = await AuthCode.findOne({ user: user._id });
    if (!authCodes) {
        throw new CustomAPIError('No auth codes found', 404);
    }
    return authCodes;
};

module.exports = {
    getAuthCodes,
}