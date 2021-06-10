const sqlDatabase = require("./data/database.connection.js")
const database = require("./data/participants.json")
const mailer = require("./src/mail.js")
const matchMaker = require("./src/matchMaker")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

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