// manages the place entity CRUDL
import { utilsService } from "./utilsService.js"
import { storageService } from './storageService.js'

export const mapService = {
    initMap,
    getPlaces,
    removePlace,
    addPlace,
    getPlaceById,
}


const STORAGE_KEY = "FavoritePlaces"

async function initMap(lat = 29.557630268094844, lng = 34.95188087021005, gMap) {
    await _connectGoogleApi()
    gMap = new google.maps.Map(
        document.querySelector('#map'), {
        center: { lat, lng },
        zoom: 15
    })
    
    return gMap
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'YOUR API KEY'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=Function.prototype`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

async function addPlace(event, placeName) {
    const newPlace = _createPlace(placeName, event.latLng.lat(), event.latLng.lng(), 15)
    const addedPlace = await storageService.post(STORAGE_KEY, newPlace)
    return addedPlace
}

async function removePlace(placeId) {
    return await storageService.remove(STORAGE_KEY, placeId)
}

async function getPlaces() {
    let places = await storageService.query(STORAGE_KEY)
    return places
}

async function getPlaceById(placeId) {
    const place = await storageService.get(STORAGE_KEY, placeId)
    return place
}

function _createPlace(name, lat, lng, zoom) {
    const place = {id: utilsService.createId(), lat, lng, name, zoom}
    return place
}