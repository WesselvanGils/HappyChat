const { config } = require("dotenv")
const nodemailer = require("nodemailer")
const sqlDatabase = require("../data/database.connection.js.js")
const configo = require("../data/config.json")
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
        let incrementer = 0

        participants.forEach(participant =>
        {
            sqlDatabase.getUser(participant.email, (error, result) =>
            {
                if (error) { console.log(error) }

                if (result.length > 0)
                {
                    result = result[ 0 ]

                    let schedule = []
                    let text = "Bij deze het schema van je aankomende speeddate sessie op " + configo.day + "/" + configo.month + "/" + configo.year + "\n"
                    sqlDatabase.getDates(result.Email, (err, dates) =>
                    {
                        if (participant.gender == "male")
                        {
                            dates.forEach(date =>
                            {
                                schedule.push(`\n ${date.person1} je date met ${date.person2} is ingepland op ${date.TimeOfDate}! \n Doe mee via deze link: ${date.Link} \n`)
                            })
                        }

                        if (participant.gender == "female")
                        {
                            dates.forEach(date =>
                            {
                                schedule.push(`\n ${date.person1} je date met ${date.person2} is ingepland op ${date.TimeOfDate}!\n Doe mee via deze link: ${date.Link} \n`)
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
                            if (erry) { console.log(erry.response) }
                            if (info) { console.log('Email sent: ' + info.response) }

                            incrementer++

                            if (incrementer + 1 >= participants.length)
                            {
                                process.exit()
                            }
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