const sqlDatabase = require("../data/database.connection.js")
const database = require("../data/participants.json")
const links = require("../data/rooms.json")
const mailer = require("./mail.js")
const config = require("../data/config.json")

const participants = database.participants
const females = participants.filter(participant => participant.gender == "female")
const males = participants.filter(participant => participant.gender == "male")

let timeOfDate = config.startingTime
let incrementer = 0

let matches = []
let index

males.forEach(maleParticipant => 
{

    females.forEach(femaleParticipant =>
    {
        matches.push({ male: maleParticipant.email, female: femaleParticipant.email, time: timeOfDate, link: links.links[ incrementer ] })
        addTime(timeOfDate, config.dateLenght, undefined, (error, result) =>
        {
            timeOfDate = result
        })
        incrementer++

        if (incrementer > links.links.length) { incrementer = 0 }
    })

    females.push(females.shift())

    index++

    if (males.length != females.length)
    {
        let difference = males.length - females.length
        if (difference < 0) { difference *= -1 }

        if (index == difference) 
        {
            addTime(timeOfDate, config.dateLenght, difference, (error, result) =>
            {
                timeOfDate = result
            })

            if (difference % 2 == 0)
            {
                addTime(timeOfDate, config.dateLenght, undefined, (error, result) =>
                {
                    timeOfDate = result
                })
            }
        } else
        {
            setMinutes(timeOfDate, 0, (error, result) => timeOfDate = result)
        }
    } else
    {
        setMinutes(timeOfDate, 0, (error, result) => timeOfDate = result)
    }

    if (incrementer + 1 >= participants.length)
    {
        addToDatabase(matches, (isDone) =>
        {
            if (isDone) notifyParticipants(participants)
        })
    }
})

function addToDatabase(dates, callback)
{
    sqlDatabase.clearDates((err, results, isDone) =>
    {
        if (err) console.log(err)
        // if (results) console.log(results)

        if (isDone)
        {
            let increaser
            dates.forEach(match =>
            {
                sqlDatabase.addMatch(match, (error, result) =>
                {
                    if (error) { console.log(error.sqlMessage) }

                    if (result) { console.log(result.affectedRows) }

                    increaser++
                })

                if (incrementer >= matches.length)
                {
                    callback(true)
                }
            })
        }
    })
}

function notifyParticipants(daters)
{
    mailer.sendMail(daters)
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