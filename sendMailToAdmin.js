var nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = function sendMail(data) {
  var htmlTemplate = require("./emailHtmlTemplate");

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  // var adminEmail = '13ramanpreet@gmail.com';
  var adminEmail = 'bhagwant.singh@innovantage.in';

  const mailOptions = {
    from: 'Team Innovantage <' + process.env.EMAIL + '>', // sender address
    to: adminEmail, // list of receivers
    subject: 'Received Form Submission on innovantage.in ✉️', // Subject line
    html: htmlTemplate(data) // html
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}