const nodemailer = require('nodemailer')
const config = require('../config')
const {
    password_reset_template,
    password_reset_template_ar,
    email_verification_template,
    email_verification_template_ar } = require('./templates')

// 3. Send email to user
const sendEmail = async (options) => {
    try {
        //1. Create the transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                type: "OAuth2",
                user: config.EMAIL_HOST_ADDRESS,
                clientId: config.OAUTH_CLIENT_ID,
                clientSecret: config.OAUTH_CLIENT_SECRET,
                refreshToken: config.OAUTH_REFRESH_TOKEN,
                accessToken: config.OAUTH_ACCESS_TOKEN
            }
        })

        //2. Define Email Options
        const mailOptions = {
            from: 'MOOCs platform',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        }
        // actually send message
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log(error)
        return error
    }
}

class EmailMessage {
    constructor(lang = 'en') {
        this.lang = lang
    }

    passwordReset(name, reset_code, lang = this.lang) {
        return lang != 'en'
            ? password_reset_template_ar(name, reset_code)
            : password_reset_template(name, reset_code)
    }

    emailVerification(name, verification_link, lang = this.lang) {
        return lang != 'en'
            ? email_verification_template_ar(name, verification_link)
            : email_verification_template(name, verification_link)
    }
}

module.exports = { sendEmail, EmailMessage }
