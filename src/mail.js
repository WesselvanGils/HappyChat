const nodemailer = require("nodemailer")
const sqlDatabase = require("../data/database.connection.js")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: "smtp.strato.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
})

module.exports =
{
    sendMail: (maleContents, femaleContents) =>
    {
        maleContents.forEach(recipient =>
        {
            sqlDatabase.getByMaleEmail(recipient.email, (error, result) =>
            {
                if (error) { console.log(error) }
                console.log(result)
                if (result.length > 0)
                {
                    result = result[0]
                    
                    let mailOptions = {
                        from: process.env.USER,
                        to: result.Male,
                        subject: 'Jouw speeddate schema!',
                        text: recipient.content
                    }

                    transporter.sendMail(mailOptions, function (err, info)
                    {
                        if (err) { console.log(error) }
                        if (info) { console.log('Email sent: ' + info.response) }
                    })
                }
                else
                {
                    console.log("The query returned empty")
                }
            })
        })

        femaleContents.forEach(recipient =>
        {
            sqlDatabase.getByFemaleEmail(recipient.email, (error, result) =>
            {
                if (error) { console.log(error) }
                if (result.length > 0)
                {
                    result = result[0]
                    
                    let mailOptions = {
                        from: process.env.USER,
                        to: result.Female,
                        subject: 'Jouw speeddate schema!',
                        text: recipient.content
                    }

                    transporter.sendMail(mailOptions, function (err, info)
                    {
                        if (err) { console.log(error) }
                        if (info) { console.log('Email sent: ' + info.response) }
                    })
                }
                else
                {
                    console.log("The query returned empty")
                }
            })
        })
    }
}