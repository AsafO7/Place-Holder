// manages saving and reading the user’s preferences

import { utilsService } from './utilsService.js'

export const userService = {
    setUserPrefs,
    getUserPrefs,
}

const STORAGE_KEY = "userData"

function getUserPrefs() {
    return utilsService.loadFromStorage(STORAGE_KEY)
}

function setUserPrefs(userData) {
    utilsService.saveToStorage(STORAGE_KEY, userData)
}