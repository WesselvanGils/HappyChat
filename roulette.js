const database = require("./participants.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []

males.forEach(maleParticipant =>
{
    let timeOfDate = 0

    females.forEach(femaleParticipant =>
    {
        matches.push({ match: [ maleParticipant.email, femaleParticipant.email ], time: timeOfDate, link:"" })
        timeOfDate += 15
    })

    females.push(females.shift())
})

matches.forEach(match =>
{
    console.log(match)
});