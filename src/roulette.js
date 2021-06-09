const sqlDatabase = require("../data/database.connection.js")
const database = require("../data/participants.json")
const links = require("../data/rooms.json")
const mailer = require("./mail.js")
const config = require("../data/config.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let timeOfDate = config.startingTime

let matches = []
let timeSlots = []
let index = 0

let outer
let inner

for (let i = 0; i < females.length * males.length / 2; i++)
{
    timeSlots.push(timeOfDate)
    addTime(timeOfDate, config.dateLenght, undefined, (error, result) =>
    {
        timeOfDate = result
    })
}

if (males <= females)
{
    outer = males
    inner = females
} else
{
    outer = females
    inner = males
}

outer.forEach(outerParticipant => 
{
    let incrementer = 0

    inner.forEach(innerParticipant =>
    {
        matches.push({ person1: outerParticipant.email, person2: innerParticipant.email, time: timeSlots[incrementer], link: links.links[ incrementer ] })
        incrementer++
    })

    //inner.push(inner.shift())
    timeSlots.push(timeSlots.shift())

    if (index == outer.length - 1)
    {
        console.log(matches)
        addToDatabase(matches, (isDone) =>
        {
            if (isDone)
            {
                mailer.sendMail(participants)
            }
        })
    }

    index++
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

function addTime(timeOfDateString, increment, difference, callback)
{
    let time = timeOfDateString.split(":")
    time[ 0 ] = parseInt(time[ 0 ], 10)
    time[ 1 ] = parseInt(time[ 1 ], 10)
    increment = parseInt(increment, 10)

    if (!difference) time[ 1 ] += increment

    if (difference) 
    {
        let offSet = difference * increment
        time[ 1 ] = offSet
    }

    if (time[ 1 ] >= 60) 
    {
        time[ 0 ] += 1
        time[ 1 ] -= 60
    }

    callback(undefined, `${time[ 0 ]}:${time[ 1 ]}`)
}

function setMinutes(timeOfDateString, setter, callback)
{
    let time = timeOfDateString.split(":")

    time[ 1 ] = parseInt(time[ 1 ], 10)
    time[ 1 ] = setter

    callback(undefined, `${time[ 0 ]}:${time[ 1 ]}`)
}