const button = document.querySelector("#submit-button")
let ul = document.getElementById("people-to-mail")

let name = document.forms.personForm.fname
let email = document.forms.personForm.femail
let gender = document.forms.personForm.fgender

button.addEventListener("click", function(e)
{
    e.preventDefault()

    //TODO Make gender be correctly put into the list

    let li = document.createElement("li")
    li.textContent = `naam: ${name.value} email: ${email.value}` + displayRadioValue()
    ul.appendChild(li)
})

function displayRadioValue()
{
    let ele = gender

    for (let i = 0; i < ele.length; i++)
    {
        if (ele[ i ].checked)
        {
            return "gender: " + ele[i].value
        }
    }
}