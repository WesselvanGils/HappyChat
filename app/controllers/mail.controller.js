const { config } = require("dotenv")
const nodemailer = require("nodemailer")
const database = require("../connections/strato.connection.js")
const configo = require("../../data/config.json")
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
    sendMail: (dates, participants, dateID, res) =>
    {
        database.getDates(dateID, (error, result) =>
        {
            if (error) res.status(500).json({ error: error.toString() })

            let incrementer = 0
            let schedule = []

            participants.forEach(participant =>
            {
                let text = "Bij deze het schema van je aankomende speeddate sessie op " + result[ 0 ].DateOfDate + "\n"

                dates.forEach(date =>
                {
                    let otherPerson = ''

                    if (participant.username == date.person1) otherPerson = date.person2
                    if (participant.username == date.person2) otherPerson = date.person1

                    schedule.push(`\n ${participant.username} je date met ${otherPerson} is ingepland op ${date.TimeOfDate}! \n Doe mee via deze link: ${date.link} \n`)
                })

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

                // transporter.sendMail(mailOptions, function (erry, info)
                // {
                // if (erry) { console.log(erry.response) }
                // if (info) { console.log('Email sent: ' + info.response) }

                incrementer++

                if (incrementer == participants.length)
                {
                    res.status(200).json({ schedule })
                }
                // })
            })
        })
    }
}