const database = require("./participants.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []

males.forEach(maleParticipant =>
{
    females.forEach(femaleParticipant =>
    {
        matches.push({ match: [ maleParticipant, femaleParticipant] })
        console.log(`${maleParticipant.firstName} matched with ${femaleParticipant.firstName}`)
    });
});