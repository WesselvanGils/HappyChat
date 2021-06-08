const sqlDatabase = require("../data/database.connection.js")
const database = require("../data/participants.json")
const links = require("../data/rooms.json")
const mailer = require("./mail.js")
const config = require("../data/config.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let matches = []

let timeOfDate = config.startingTime
let incrementer = 0

males.forEach(function callback(maleParticipant, index) 
{
    females.forEach(femaleParticipant =>
    {
        matches.push({ male: maleParticipant.email, female: femaleParticipant.email, time: timeOfDate, link: links.links[ incrementer ] })
        timeOfDate = addTime(timeOfDate, config.dateLenght)
        incrementer += 1

        if (incrementer > links.links.length) { incrementer = 0 }
    })

    females.push(females.shift())

    if (males.length != females.length)
    {
        let difference = males.length - females.length
        if (difference < 0) { difference *= -1 }

        if (index == difference) 
        {
            timeOfDate = addTime(timeOfDate, config.dateLenght, difference)
            if (difference % 2 != 0) { timeOfDate = addTime(timeOfDate, config.dateLenght) }
        } else
        {
            timeOfDate = setMinutes(timeOfDate, 0)
        }
    }
})

matches.forEach(match =>
{
    sqlDatabase.addMatch(match, (error, result) =>
    {
        if (error) { console.log(error.sqlMessage) }

        if (result) { console.log(result.affectedRows) }
    })
});

setTimeout(() =>
{
    mailer.sendMail(participants)
}, 3000)

function addTime(timeOfDateString, increment, differnce)
{
    let time = timeOfDateString.split(":")
    time[ 0 ] = parseInt(time[ 0 ], 10)
    time[ 1 ] = parseInt(time[ 1 ], 10)
    increment = parseInt(increment, 10)

    if (!differnce) time[ 1 ] += increment

    if (differnce) 
    {
        let offSet = diffence * increment
        time[ 1 ] = offSet
    }

    if (time[ 1 ] >= 60) 
    {
        time[ 0 ] += 1
        time[ 1 ] -= 60
    }

    console.log(`${time[ 0 ]}:${time[ 1 ]}`)
    return `${time[ 0 ]}:${time[ 1 ]}`
}

function setMinutes(timeOfDateString, setter)
{
    let time = timeOfDateString.split(":")

    time[ 1 ] = parseInt(time[ 1 ], 10)
    time[ 1 ] = setter

    console.log(`${time[ 0 ]}:${time[ 1 ]}`)
    return `${time[ 0 ]}:${time[ 1 ]}`
}