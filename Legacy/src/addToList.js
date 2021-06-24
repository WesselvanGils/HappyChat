const button = document.querySelector("#submit-button")
let ul = document.getElementById("people-to-mail")

let name = document.forms.personForm.fname
let email = document.forms.personForm.femail
let gender = document.getElementsByName("gender")

button.addEventListener("click", function(e)
{
    e.preventDefault()

    let li = document.createElement("li")
    li.textContent = `naam: ${name.value} email: ${email.value} ` + displayRadioValue()
    ul.appendChild(li)
})

function displayRadioValue()
{
    for (let i = 0; i < gender.length; i++)
    {
        if (gender[i].checked)
        {
            return "gender: " + gender[ i ].value
        }
    }
}