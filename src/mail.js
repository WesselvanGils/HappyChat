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
    sendMail: (participants) =>
    {
        participants.forEach(participant =>
        {
            sqlDatabase.getUser(participant.email, (error, result) =>
            {
                if (error) { console.log(error) }

                if (result.length > 0)
                {
                    result = result[ 0 ]

                    let schedule = []
                    let text = "Bij deze het schema van je aankomende speeddate sessie. \n "
                    sqlDatabase.getDates(result.Email, (err, dates) =>
                    {
                        if (participant.gender == "male")
                        {
                            dates.forEach(date =>
                            {
                                schedule.push(`${date.Male} je date met ${date.Female} is ingepland op ${date.TimeOfDate}! Hier is de link \n ${date.Link} \n`)
                            })
                        }

                        if (participant.gender == "female")
                        {
                            dates.forEach(date =>
                            {
                                schedule.push(`${date.Female} je date met ${date.Male} is ingepland op ${date.TimeOfDate}! Hier is de link \n ${date.Link} \n`)
                            })
                        }

                        schedule.forEach(string => 
                        {
                            text = text + string + "\n"
                        })

                        let mailOptions = {
                            from: process.env.USER,
                            to: result.Email,
                            subject: 'Jouw speeddate schema!',
                            text: text
                        }

                        console.log(schedule)

                        transporter.sendMail(mailOptions, function (erry, info)
                        {
                            if (erry) { console.log(erry) }
                            if (info) { console.log('Email sent: ' + info.response) }
                        })
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