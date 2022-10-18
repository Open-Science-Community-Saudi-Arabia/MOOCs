const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  //1. Create the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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
