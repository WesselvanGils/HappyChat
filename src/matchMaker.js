const config = require("../data/config.json")
const links = require("../data/rooms.json")

let timeSlots = []
let index = 0

let outerLoop
let innerLoop

module.exports =
{
    getMatches(males, females, callback)
    {
        if (males.length == females.length)
        {
            makeEvenMatches(males, females, (dates) =>
            {
                callback(dates)
            })
        }else
        {
            if (males.length < females.length)
            {
                outerLoop = males
                innerLoop = females
            } else
            {
                outerLoop = females
                innerLoop = males
            }
        }
    }
}

let matches = []
let timeOfDate = config.startingTime

function makeEvenMatches(inner, outer, callback)
{
    for (let i = 0; i < inner.length * 2; i++)
    {
        timeSlots.push(timeOfDate)
        addTime(timeOfDate, config.dateLenght, undefined, (error, result) =>
        {
            timeOfDate = result
        })
    }
    outer.forEach(outerParticipant => 
    {
        let incrementer = 0

        inner.forEach(innerParticipant =>
        {
            matches.push({ person1: outerParticipant.email, person2: innerParticipant.email, time: timeSlots[ incrementer ], link: links.links[ incrementer ] })
            incrementer++
        })

        timeSlots.push(timeSlots.shift())

        if (index == outer.length - 1)
        {
            callback(matches)
        }

        index++
    })
}

function makeOddMatches(inner, outer, callback)
{
    
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