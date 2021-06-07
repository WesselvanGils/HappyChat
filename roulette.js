const database = require("./data/participants.json")
const links = require("./data/rooms.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []

let timeOfDate = 0
let incrementer = 0 

males.forEach(function callback(maleParticipant, index) 
{
    console.log(index)
    const dateLength = 15

    females.forEach(femaleParticipant =>
    {
        matches.push({ male: maleParticipant.email, female: femaleParticipant.email, time: timeOfDate, link: links.links[incrementer]})
        timeOfDate += dateLength
        incrementer += 1

        if (incrementer > links.links.length) {incrementer = 0}
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