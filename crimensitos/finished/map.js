mapboxgl.accessToken = 'pk.eyJ1IjoidHVycjBuIiwiYSI6ImNqc25odnVsODBiNXUzeW80c2psNmt3aHQifQ.rKRx2pGsA_GCWRtACVURnQ';
const info = document.querySelector("#text");
const address = document.querySelector("#address");

var offenses;

// Loading the offense description from a file
async function loadOffenses(){

    offenses = await fetch("/data/offenses.json").then(res => res.json());

}

loadOffenses();

// Initialize map
const map = new mapboxgl.Map({
    center: [-104.9, 39.742043],
    zoom: 11,
    container: "mapContainer",
    style: "mapbox://styles/turr0n/cjupdhdd34sqq1ft4cnqhkbic",
});

// Helper function to resize the map to fit all the stations if the window size changes
function fit() {
    map.fitBounds(
        [
            [-105.0912449, 39.618335],
            [-104.6736805, 39.8628768]
        ], 
        { 
            duration: 0
        }
    );

    map.setZoom(map.getZoom() - 0.1) // Zoom out a little bit
}

fit();  // fit the map to the defined bounds
map.on("resize", fit); // Listen to the resize event and call <fit>



function stationsInteraction(e) {
    const properties = e.features[0].properties;
    const cases = e.features[0];
    
    const capitalizedHood = properties.hood.charAt(0).toUpperCase() + properties.hood.substring(1);

    info.innerHTML = "Case nº " + cases.id;
    address.innerHTML = "Neighborhood: " + capitalizedHood.replace("-", " ").replace("-", " ") + 
    "<br> Reported date: " + properties.date + "<br> Description: " + offenses[properties.offense_id]
    // updatePie([properties.entrantes, properties.salientes]) // Update the pie chart with station data
    // updateLine();
}



function firstClick(e) {
    initCharts(); // Initialize both charts

    map.off("click", "stations", firstClick); // Stop this event handler
    map.on("click", "stations", stationsInteraction); // Setup the new one

    stationsInteraction(e); // Update the charts
}

let stations;
map.on("load", async () => { // Once the map is loaded
    stations = await fetch("/data/resultTruncatedNumbers.geojson").then(res => res.json());

    var cosa = turf.bbox(stations);
    console.log(cosa);

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