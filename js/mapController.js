import { mapService } from "./services/placeService.js"

window.onInit = onInit
window.onRemovePlace = onRemovePlace
window.onAddPlace = onAddPlace
window.onPanToPlace = onPanToPlace

var gMap
var gMarkers = []

function onInit() {
    mapService.initMap(gMap)
        .then((res) => {
            console.log('Map is ready')
            gMap = res
            gMap.addListener( 'click', onAddPlace)
        })
        .catch(() => console.log('Error: cannot init map'))
        
    renderPlaces()
    renderMarkers()
}

async function renderPlaces() {
    const places = await mapService.getPlaces()
    let strHtmls = []
    if(places && places.length === 0) {
        strHtmls = [`<li>No locations yet</li>`]
    }
    else {
        strHtmls = places.map(place => `
            <li class="place">
                <button title="Delete place" class="btn-remove" onclick="onRemovePlace('${place.id}')">X</button>
                <button class="btn-remove" onclick="onPanToPlace('${place.id}')">Go</button>
                <span>${place.name}</span>
            </li> 
            `
        )
    }
    document.querySelector('.places-list').innerHTML = strHtmls.join('')
}

async function onRemovePlace(placeId) {
    try {
        await mapService.removePlace(placeId)
        renderPlaces()
        renderMarkers()
    } catch (err) {
        console.log('Had issues with', err)
    }
}

async function onAddPlace(event) {
    try {
        const placeName = prompt("Name of the place")
        if(placeName) {
            await mapService.addPlace(event, placeName)
            renderPlaces()
            renderMarkers()
        }
    }
    catch(err) {
        console.log(err)
    }
}

async function onPanToPlace(placeId) {
    const place = await mapService.getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng})
    gMap.setZoom(place.zoom)
}

async function renderMarkers() {
    const places = await mapService.getPlaces()
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null))
    // every place is creating a marker
    gMarkers = places.map(place => {
        return new google.maps.Marker({
            position: place,
            map: gMap,
            title: place.name
        })
    })
}

// function onPointClick() {
//     // mapService.addLocation()
// }
