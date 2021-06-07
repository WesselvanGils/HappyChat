const database = require("./participants.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []
let timeOfDate = 0

males.forEach(maleParticipant =>
{
    timeOfDate = 0

    females.forEach(femaleParticipant =>
    {
        matches.push({ match: [ maleParticipant, femaleParticipant ], time: timeOfDate, link:"" })
        timeOfDate += 15
    })

    females.push(females.shift())
})

matches.forEach(match =>
{
    console.log(match)
});