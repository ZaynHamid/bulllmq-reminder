const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER ,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async ({to, subject, text, html}) => {
    return await transporter.sendMail({
        from: process.env.SMTP_FROM, 
        to,
        subject,
        text,
        html
    });
}

module.exports = { sendEmail };