const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "moppenverteller@gmail.com",
        pass: "grappiger"
    }
})

const mailOptions = {
    from: "moppenverteller@gmail.com",
    to: "borispouw@hotmail.com",
    subject: 'The biggest pp in all the lands',
    text: 'You have big PP! Keep it up!'
}

transporter.sendMail(mailOptions, function (error, info)
{
    if (error) { console.log(error) }
    if (info) { console.log('Email sent: ' + info.response) }
})