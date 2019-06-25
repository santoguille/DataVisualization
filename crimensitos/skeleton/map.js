mapboxgl.accessToken = 'pk.eyJ1IjoidHVycjBuIiwiYSI6ImNqc25odnVsODBiNXUzeW80c2psNmt3aHQifQ.rKRx2pGsA_GCWRtACVURnQ';

// Initialize map
const map = new mapboxgl.Map({
    center: [-104.9, 39.742043],
    zoom: 11,
    container: "mapContainer",
    style: "mapbox://styles/turr0n/cjupdhdd34sqq1ft4cnqhkbic",
});
// Helper function to resize the map to fit all the stations if the window size changes
function fit() {}

function fit2() {
    map.fitBounds(
        [
            [-0.426354265293528, 39.43979598762512],
            [-0.323491937905993, 39.50141318615774]
        ], 
        { 
            duration: 0
        }
    );

    map.setZoom(map.getZoom() - 0.1) // Zoom out a little bit
}

fit();  // fit the map to the defined bounds
map.on("resize", fit); // Listen to the resize event and call <fit>

let stations;
map.on("load", async () => { // Once the map is loaded
    stations = await fetch("/data/resultTruncated.geojson").then(res => res.json());

    map.addSource("stations", {type:"geojson", data:stations});
    map.addLayer({
        "id": "stations",
        "source": "stations",
        "type": "circle",
        "paint": {
            "circle-color": "red",
            "circle-radius": 3.5
        }
    });

    map.on("click", "stations", firstClick)

})