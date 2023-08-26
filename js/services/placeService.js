// manages the place entity CRUDL
import { utilsService } from "./utilsService.js"

export const mapService = {
    initMap,
    addLocation,
}


var gMap
let gMapClickListener
const STORAGE_KEY = "FavoritePlaces"

async function initMap(lat = 32.0749831, lng = 34.9120554) {
    await _connectGoogleApi()
    gMap = new google.maps.Map(
        document.querySelector('#map'), {
        center: { lat, lng },
        zoom: 15
    })
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

function addLocation() {
    gMapClickListener = gMap.addListener( 'click', onMapClick)
}

async function onMapClick(event) {
    const placeName = prompt("Name of the place")
    // Add marker on added location
    const newPlace = {id: utilsService.createId(), lat: event.latLng.lat(), lng: event.latLng.lng(), name: placeName}
    console.log(newPlace)
    gMapClickListener.remove()
}