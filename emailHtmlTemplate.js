var htmlBody = require("./emailBodyContent");

function content(user) {
    var type = user._id.charAt(0);

    if(type === "F") {
        return htmlBody.freightContent(user);
    }
    else if(type === "C") {
        return htmlBody.customContent(user);
    }
    else if(type === "T") {
        return htmlBody.transportContent(user);
    }
    else if(type === "W") {
        return htmlBody.warehouseContent(user);
    }
    else if(type === "V") {
        return htmlBody.valueAddedContent(user);
    }
}

module.exports = function htmlTemplate(user) {
    var header = `
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
        <link href="https://fonts.googleapis.com/css2?family=Antic+Didone&family=Montserrat&display=swap&family=Open+Sans&display=swap" rel="stylesheet">
    
        <style>
            * {
                font-family: "Open Sans", sans-serif !important;
                overflow-x: hidden;
            }
    
            body {
                padding: 1rem;
            }
    
            h3 {
                font-family: "Montserrat", Roboto, sans-serif !important;
                font-size: 18px;
            }

            p {
                font-size: 16px;
            }
    
            .outer-div {
                margin: 0.5rem auto;
                padding: 0.5rem 1rem;
            }
    
            .outer-div h3 {
                color: #008cff;
                margin-bottom: 0.8rem;
            }
    
            .inner-div {
                margin: auto 2rem;
            }
    
            .outer-div .form-group label {
                margin-right: 1.5rem;
            }
    
            .outer-div .form-group select {
                padding: 0.1rem 0.3rem;
            }
    
            .outer-div .form-group input {
                padding: 0.2rem 0.4rem;
            }
    
            .outer-div .long input {
                width: 60%;
            }
    
            .footer {
                text-align: center;
                font-size: 16px;
            }
    
            .footer .logo {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
    
            .footer .logo img {
                margin-right: 0.5rem;
            }
    
            .footer .logo p {
                margin-top: 0.35rem;
            }
        </style>
    </head>
    
    <body>
        <div class="header">
            <p>Dear Sir,</p>
            <p>We just got a form submission for Qoutation request at <a href="https://www.innovantage.in">www.innovantage.in</a> . Here is the data we have received.
            </p>
        </div>
    
        <div class="main">
            <div class="outer-div">
                <h3>Order Details</h3>
    
                <div class="inner-div">
                    <p>
                        <b>Order Id:</b> ${user._id}
                    </p>
                    <p>
                        <b>Requested Service:</b> ${user.service}
                    </p>
                    <p>
                        <b>Status:</b>
                        <span>
                            ${user.status}
                        </span>
                    </p>
                </div>
            </div>
    
            <div class="outer-div">
                <h3>Customer Details</h3>
    
                <div class="inner-div">
                    <p>
                        <b>Customer's Name:</b> ${user.user_name}
                    </p>
                    <p>
                        <b>Customer's Address:</b> ${user.user_address}
                    </p>
                    <p>
                        <b>Customer's Phone Number:</b> (+
                        ${user.user_country_code})
                        ${user.user_phone_number}
                    </p>
                    <p>
                        <b>Customer's Email Address:</b>
                        ${user.user_email_address}
                    </p>
                </div>
            </div>
        `;

    var body = content(user);

    const {utcToZonedTime, format } = require('date-fns-tz');

    var date = new Date();
    const zonedDate = utcToZonedTime(date, 'Asia/Kolkata');
    const currentTime = format(zonedDate, 'eee MMM dd yyyy HH:mm:ss OOOO (zzzz)', { timeZone: 'Asia/Kolkata' });

    var footer = `
                <div class="footer">
                    <hr>
                    <p>Submission received at ${currentTime}. 🚀</p>

                    <div class="logo">
                        <img src="https://drive.google.com/uc?export=view&id=12fB-VMV1WCb_cw9ZlHenwIGYwlY7hJzR" alt="Innovantage logo" height="40px">
                        <p>Innovantage Solutions Private Limited.</p>
                    </div>
                </div>
            </body>

        </html>`;

    var html = header + body + footer;

    return html;
}
