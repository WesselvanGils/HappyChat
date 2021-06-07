const database = require("./participants.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []

let timeOfDate = 0

males.forEach(function callback(maleParticipant, index) 
{
    console.log(index)
    const dateLength = 15

    females.forEach(femaleParticipant =>
    {
        matches.push({ match: [ maleParticipant.email, femaleParticipant.email ], time: timeOfDate, link: "" })
        timeOfDate += dateLength
    })

    females.push(females.shift())

    if (males.length != females.length)
    {
        let difference = males.length - females.length
        if (difference < 0) { difference *= -1}

        if (index == difference) 
        {
            timeOfDate = difference * dateLength * 2
        }else
        {
            timeOfDate = 0
        }
    }
})

matches.forEach(match =>
{
    console.log(match)
});