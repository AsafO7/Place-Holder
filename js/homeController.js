import { userService } from "./services/userService.js"

window.onInit = onInit

function onInit() {
    const prefs = userService.getUserPrefs()
    const body = document.body
    body.style.backgroundColor = prefs.bgColor
    body.style.color = prefs.txtColor
    document.querySelector(".h3-birthdate-span").textContent = `User's birthdate: ${prefs.birthDate}`
    document.querySelector(".h3-birthtime-span").textContent = `User's birthtime: ${prefs.birthTime}`
}