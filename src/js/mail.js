const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport(
{
    host: "smtp.strato.com",
    port: 465,
    secure: true,
    auth:
    {
        user: "happychat@happy-singles.nl",
        pass: "!cL~6xSkfaasdnAs"
    }
})

module.exports = {
    sendMails: (participants, dates, startDate) =>
    {
        let incrementer = 0

        gatherInfo(participants, dates, (error, results) =>
        {
            if (results)
            {
                results.forEach(result =>
                {
                    let schedule = []
                    let text =
                        `Bij deze het schema van je aankomende speeddate sessie op ${startDate.value}` +
                        "\n"

                    result.matches.forEach(match =>
                    {
                        schedule.push(
                            `\n ${result.recipient.username} je date met ${match.otherPerson} is ingepland op ${match.timeOfDate}! \n Doe mee via deze link: ${match.link} \n`
                        )
                    })

                    schedule.forEach(string =>
                    {
                        text = text + string + "\n"
                    })

                    let mailOptions = {
                        from: "happychat@happy-singles.nl",
                        to: result.recipient.email,
                        subject: "Jouw speeddate schema!",
                        text: text
                    }

                    transporter.sendMail(mailOptions, function(erry, info)
                    {
                        if (erry)
                        {
                            console.log(erry)
                        }
                        if (info)
                        {
                            console.log("Email sent: " + info.response)
                        }

                        incrementer++
                        console.log(schedule)

                        if (incrementer + 1 >= participants.length)
                        {
                            console.log("all done")
                        }
                    })
                })
            }
        })
    }
}

function gatherInfo(participants, dates, callback)
{
    let relevantDates = []

    participants.forEach(participant =>
    {
        let peopleToDate = []

        dates.forEach(date =>
        {
            if (participant.email == date.email1)
            {
                peopleToDate.push(
                {
                    otherPerson: date.person2,
                    timeOfDate: date.timeOfdate,
                    link: date.link
                })
            }
            else if (participant.email == date.email2)
            {
                peopleToDate.push(
                {
                    otherPerson: date.person1,
                    timeOfDate: date.timeOfdate,
                    link: date.link
                })
            }
        })

        relevantDates.push(
        {
            recipient: participant,
            matches: peopleToDate
        })
    })

    console.log(relevantDates)
    callback(undefined, relevantDates)
}