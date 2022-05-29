const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = ({ emailTo, subject, text, html }) => ({
  to: emailTo, // Change to your recipient
  from: process.env.EMAIL_FROM, // Change to your verified sender
  subject,
  text,
  html,
});

module.exports = function sendEmail({ emailTo, subject, text, html }) {
  sgMail
    .send(msg({ emailTo, subject, text, html }))
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};
