const databse = require("../connections/strato.connection.js")
const mailer = require("./mail.controller.js")
const matchMaker = require("./match.controller.js")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

function addToDatabase(dates, callback)
{
    sqlDatabase.clearDates((err, results, isDone) =>
    {
        if (err) console.log(err)
        // if (results) console.log(results)

        if (isDone)
        {
            let increaser = 0
            dates.forEach(date =>
            {
                sqlDatabase.addMatch(date, (error, result) =>
                {
                    if (error) { console.log(error.sqlMessage) }

                    //if (result) { console.log(result.affectedRows) }

                    increaser++
                    if (increaser == dates.length)
                    {
                        callback(true)
                    }
                })
            })
        }
    })
}

module.exports =
{
    start: () => 
    {
        matchMaker.getMatches(males, females, (result) =>
        {
            console.log(result)
            addToDatabase(result, (isDone) =>
            {
                if (isDone)
                {
                    mailer.sendMail(participants)
                }
            })
        })
    }
}