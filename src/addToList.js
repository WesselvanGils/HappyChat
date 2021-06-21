const button = document.querySelector("#submit-button")
let ul = document.getElementById("people-to-mail")

let name = document.forms.personForm.fname
let email = document.forms.personForm.femail
let gender = document.forms.personForm.fgender

button.addEventListener("click", function(e)
{
    e.preventDefault()

    let li = document.createElement("li")
    li.textContent = `naam: ${name.value} email: ${email.value} gender: `
    ul.appendChild(li)
})