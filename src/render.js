const matchMaker = require("./js/matchMaker")
const mailer = require("./js/mail.js")

const addUserBtn = document.getElementById("addUserBtn")
const sendMailsBtn = document.getElementById("sendMailsBtn")

const internalParticipants = []

addUserBtn.onclick = addUser
sendMailsBtn.onclick = makeMatches

function addUser()
{
    const participants = document.getElementById("participants")
    const userName = document.getElementById("textUserName").value
    const email = document.getElementById("textEmail").value
    const gender = checkButton().value

    internalParticipants.push(
    {
        username: `${userName}`,
        email: `${email}`,
        gender: `${gender}`
    })

    let li = document.createElement("li")
    li.textContent = `Username: ${userName} Email: ${email} Gender: ${gender}`
    participants.appendChild(li)
}

function checkButton()
{
    const getSelectedValue = document.querySelector(
        'input[name="gender"]:checked'
    )

    if (getSelectedValue) return getSelectedValue
}

function makeMatches()
{
    const females = internalParticipants.filter(participant => participant.gender == "Female")
    const males = internalParticipants.filter(participant => participant.gender == "Male")

    const dateLenght = document.getElementById("dateLength")
    const startDate = document.getElementById("startDate")
    const startTime = document.getElementById("startTime")

    matchMaker.getMatches(males, females, startTime.value, dateLenght.value, (error, result) =>
    {
        mailer.sendMails(internalParticipants, result, startDate)
    })
}