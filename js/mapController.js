import { mapService } from "./services/placeService.js"

window.onInit = onInit
window.onPointClick = onPointClick


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

function onPointClick() {
    mapService.addLocation()
}
