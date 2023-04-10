const ejs = require('ejs');
const fs = require('fs');

module.exports = {
    email_verification_template: (name, verification_link) => ejs.render(fs.readFileSync(__dirname + '/email_verification_template.ejs', 'utf8'), { name, verification_link }),
    email_verification_template_ar: (name, verification_link) => ejs.render(fs.readFileSync(__dirname + '/email_verification_template_ar.ejs', 'utf8'), { name, verification_link }),
    password_reset_template: (name, reset_code) => ejs.render(fs.readFileSync(__dirname + '/password_reset_template.ejs', 'utf8'), { name, reset_code })
}