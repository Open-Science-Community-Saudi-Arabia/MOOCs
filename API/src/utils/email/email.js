/**
 * @fileoverview Email utilities.
 *
 * @category Backend API
 * @subcategory Utilities
 *
 * @module Email Utilities
 *
 * @description This module contains functions for sending emails.
 *
 * @requires nodemailer
 */

const nodemailer = require("nodemailer");
const config = require("../config");
const {
  password_reset_template,
  password_reset_template_ar,
  email_verification_template,
  email_verification_template_ar,
} = require("./templates");

// 3. Send email to user

/**
 * Send Email
 *
 * @description This function sends an email to the specified email address.
 *
 * @param {string} options.email - Email address to send email to
 * @param {string} options.subject - Subject of the email
 * @param {string} options.message - Message to send in the email
 * @param {string} options.html - HTML to send in the email
 * @returns {Promise} Promise object represents the result of sending the email
 * @throws {Error} Throws an error if the email could not be sent
 * @async
 * @function
 * @memberof module:Email Utilities
 * @name sendEmail
 */

const sendEmail = async (options) => {
  try {
    //1. Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL_HOST_ADDRESS,
        pass: config.EMAIL_PASS,
      },
    });

    //2. Define Email Options
    const mailOptions = {
      from: "MOOCs platform",
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };
    // actually send message
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    return error;
  }
};

class EmailMessage {
  constructor(lang = "en") {
    this.lang = lang;
  }

  passwordReset(name, reset_code, lang = this.lang) {
    return lang != "en"
      ? password_reset_template_ar(name, reset_code)
      : password_reset_template(name, reset_code);
  }

  emailVerification(name, verification_link, lang = this.lang) {
    return lang != "en"
      ? email_verification_template_ar(name, verification_link)
      : email_verification_template(name, verification_link);
  }
}

module.exports = { sendEmail, EmailMessage };
