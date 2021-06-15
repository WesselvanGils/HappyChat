const databse = require("../connections/strato.connection.js")
const mailer = require("./mail.controller.js")
const matchMaker = require("./match.controller.js")

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
    start: (req, res) => 
    {
        databse.getParticipants(req.params.dateID, (error, result) =>
        {
            if (error) res.status(500).json({ error: error.toString() })
            if (result.length == 0)
            {
                res.status(404).json({ error: "We couldn't find that one :(" })
            }
            else if (result)
            {
                const females = result.filter(participant => participant.gender == "female")
                const males = result.filter(participant => participant.gender == "male")

                console.log("You are about to make some matches!")
                matchMaker.getMatches(males, females, (dates) =>
                {
                    res.status(200).json(dates)
                })
            }
        })
    }
}