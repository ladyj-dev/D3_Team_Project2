// Map
var worldMap = L.map("map", {
    center: [37.5452, -77.5407],
    zoom: 1
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}/?access_token=pk.eyJ1IjoibGl2aWxsYXJhbmRhIiwiYSI6ImNraTZtNHprdjB4ZXMycG53cGFoc3E4aHYifQ.AGwN1CpsOusH0sKpUHKOjg", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "streets-v11"
}).addTo(worldMap);

// Link to JSON in Github
var url = "https://raw.githubusercontent.com/ladyj-dev/D3_Team_Project2/main/Resources/geomaps.geojson";

// Dataset Push
d3.json(url).then(function (response) {
    console.log(response);

    // Number of Records
    for (var i = 0; i < response["features"].length; i++) {
        
        // Variable to Hold Response
        var winery = response["features"][i]

        // Add Each Location
        if (winery) {
            L.marker([winery.geometry.coordinates[1], winery.geometry.coordinates[0]])
                // Add Markers to Map
                .addTo(worldMap);
        }
    };
    console.log("BOOM");
});

// // object: baseMaps
// var baseMaps = {
//     "Light Map": lightmap
// };

// // object: overlayMaps
// var overlayMaps = {
//     "Winery Locations": wineryLocations
// };

// // layer controls
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(map)

// // // POP UP FOR MAP
// Bind Winery Name in Popup
// .bindPopup("<h3>" + winery.properties.winery + "<h3><h3>Location: " + winery.geometry.coordinates[1] + "," + winery.geometry.coordinates[0] + "</h3>")                