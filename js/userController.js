import { userService } from './services/userService.js'

export const userController = {
    applyUserPrefs,
}

window.onInit = onInit
window.onAgeChange = onAgeChange
window.onFormSubmit = onFormSubmit

function onInit() {
    setForm()
    applyUserPrefs()
}

function onAgeChange() {
    updateAge()
}

function onFormSubmit(e) {
    // e.preventDefault()
    const userData = { email: e.target[0].value, age: e.target[1].value, bgColor: e.target[2].value, txtColor: e.target[3].value,
    birthDate: e.target[4].value, birthTime: e.target[5].value}
    userService.setUserPrefs(userData)
}

function applyUserPrefs() {
    const prefs = userService.getUserPrefs()
    const body = document.body
    body.style.backgroundColor = prefs.bgColor
    body.style.color = prefs.txtColor
    document.querySelector("#email-input").value = prefs.email
    document.querySelector("#age-input").value = prefs.age
    document.querySelector(".age-span").textContent = prefs.age
    document.querySelector("#bg-color-input").value = prefs.bgColor
    document.querySelector("#color-input").value = prefs.txtColor
    document.querySelector("#date-input").value = prefs.birthDate
    document.querySelector("#time-input").value = prefs.birthTime
}

function updateAge() {
    const age = document.querySelector(".age-span")
    const ageInput = document.querySelector("#age-input")
    age.textContent = ageInput.value
}


function setForm() {
    const form = document.querySelector('form')
    form.addEventListener('submit', onFormSubmit)
}