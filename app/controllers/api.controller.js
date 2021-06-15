const databse = require("../connections/strato.connection.js")
const mailer = require("./mail.controller.js")
const matchMaker = require("./match.controller.js")

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

                matchMaker.getMatches(males, females, (dates) =>
                {
                    res.status(200).json(result)
                    //mailer.sendMail(dates, result, req.params.dateID, res)
                })
            }
        })
    }
}