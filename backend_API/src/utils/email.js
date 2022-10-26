const nodemailer = require('nodemailer')
const config = require('./config')

const sendEmail = async (options) => {
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
    from: 'Kelechi Okoronkwo <hello@blakcoder.tech>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  // actually send message
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
