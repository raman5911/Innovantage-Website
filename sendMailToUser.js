var nodemailer = require('nodemailer');
require('dotenv').config();

function htmlTemplate(data) {
    var fullName = data.user_name.split(" ");

    console.log(fullName);

    var firstName = fullName[0];

    if(fullName[0] === "Mr" || fullName[0] === "Mr." || fullName[0] === "Ms" || fullName[0] === "Ms." || fullName[0] === "Mrs" || fullName[0] === "Mrs." || fullName[0] === "") {
        firstName = fullName[1];
    }

    else if (firstName.includes(".")) {
        firstName = firstName.substring(firstName.indexOf('.') + 1);
    }

    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <!-- Google Fonts CDN -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Antic+Didone&family=Montserrat&display=swap&family=Open+Sans&display=swap"
            rel="stylesheet">

        <style>
            * {
                font-family: "Open Sans", sans-serif !important;
                overflow-x: hidden;
                font-size: 17px;
            }

            body {
                padding: 1rem;
            }

            p {
                margin: 1rem;
            }

            .box p {
                margin: 0.2rem 1rem;
            }

            .footer .small {
              text-align: center;
              margin: 0.2rem auto;
            }

            .footer .small p {
              font-size: 16px;
            }

            .footer .logo-container {
                text-align: center;
            }

            .footer .logo {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }

            .footer .logo img {
                margin-right: 0.2rem;
            }

            .footer .logo p {
                margin-top: 0.3rem;
                font-size: 18px;
            }
        </style>
    </head>

    <body>
        <div class="main">
            <p>Dear ${firstName},</p>
            <div class="box">
                <p>Thanks for submitting the Qoutation form at <a href="https://www.innovantage.in">www.innovantage.in</a> .
                    Your data has been received and we will reach out to you within 2-3 business days.
                </p>
                <p>
                    Here is the Order Id for your requested service.
                </p>
            </div>
            <p>
                <b>Order Id : </b> ${data._id}
            </p>
            <p>
                We would suggest you to keep this order id with you as it would be useful for tracking your requested
                service in future.
            </p>

            <div class="box">
                <p>Regards,</p>
                <p>Team Innovantage</p>
            </div>
        </div>

        <div class="footer">
            <hr>
            <div class="small">
              <p>
                  <b>PS :</b> This email is auto generated by our system. Please do not reply to this email. If you think you have not submitted any kind of data on our website then write us at <a href="mailto:contact@innovantage.in">contact@innovantage.in</a> mentioning the order id and we will deactivate the request and delete the data related to this order from our servers.
              </p>
            </div>

            <div class="logo-container">
              <div class="logo">
                  <img src="https://drive.google.com/uc?export=view&id=12fB-VMV1WCb_cw9ZlHenwIGYwlY7hJzR"
                    alt="Innovantage logo" height="40px">
                  <p>Innovantage Solutions Private Limited.</p>
              </div>
            </div>
        </div>
    </body>

    </html>`;
}

module.exports = function sendMail(data) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: 'Team Innovantage <' + process.env.EMAIL + '>', // sender address
    to: `${data.user_email_address}`, // list of receivers
    subject: 'Thanks for the submission, here is your order id 😀', // Subject line
    html: htmlTemplate(data)// html
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}