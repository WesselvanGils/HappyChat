require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport(
{
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth:
    {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
})

module.exports = {
    sendMails: participants =>
    {
        let incrementer = 0

        participants.forEach(participant =>
        {
            if (error)
            {
                console.log(error)
            }

            let schedule = []
            let text =
                "Bij deze het schema van je aankomende speeddate sessie op " +
                configo.day +
                "/" +
                configo.month +
                "/" +
                configo.year +
                "\n"

            if (participant.gender == "male")
            {
                dates.forEach(date =>
                {
                    schedule.push(
                        `\n ${date.person1} je date met ${date.person2} is ingepland op ${date.TimeOfDate}! \n Doe mee via deze link: ${date.Link} \n`
                    )
                })
            }

            if (participant.gender == "female")
            {
                dates.forEach(date =>
                {
                    schedule.push(
                        `\n ${date.person1} je date met ${date.person2} is ingepland op ${date.TimeOfDate}!\n Doe mee via deze link: ${date.Link} \n`
                    )
                })
            }

            schedule.forEach(string =>
            {
                text = text + string + "\n"
            })

            let mailOptions = {
                from: process.env.USER,
                to: result.Email,
                subject: "Jouw speeddate schema!",
                text: text
            }

            console.log(schedule)

            // transporter.sendMail(mailOptions, function(erry, info)
            // {
            //     if (erry)
            //     {
            //         console.log(erry.response)
            //     }
            //     if (info)
            //     {
            //         console.log("Email sent: " + info.response)
            //     }

                incrementer++

                if (incrementer + 1 >= participants.length)
                {
                    process.exit()
                }
            // })
        })
    }
}