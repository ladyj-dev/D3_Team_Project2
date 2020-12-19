// Map Variables
var worldMap = L.map("map", {
    center: [14.9330, -23.5133],
    // center: [37.5452, -77.5407], // U of R
    // center: [0.0, 0.0],
    zoom: 2
});

// Pull Map
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoiZ2l0aHViIiwiYSI6ImNqaHcxdnVhZDE1Z20za2w2bXo2MGlpMjYifQ.440aOf-0gSggvf319ukLzA"
}).addTo(worldMap);

tileLayer.addTo(worldMap);

// Link to JSON in Github
var url = "https://raw.githubusercontent.com/ladyj-dev/D3_Team_Project2/main/Resources/geomaps.geojson";

// Dataset Push
d3.json(url).then(function (response) {
    console.log(response);

    // Number of Record
    for (var i = 0; i < response["features"].length; i++) {
        
        // Each Winery
        var winery = response["features"][i];

        // Add Each Location
        if (winery) {
            L.marker([winery.geometry.coordinates[1], winery.geometry.coordinates[0]])
                // Bind Winery Name in Popup
                // .bindPopup("<h3>" + winery.properties.winery + "</h3><hr><h3>Location: " + winery.geometry.coordinates[1] + "," + winery.geometry.coordinates[0] + "</h3>")
                // .bindPopup(winery.properties.winery)
                // Add Markers to Map
                .addTo(worldMap);
        };

        console.log("WHERE'S MY MAP!")
    }
});

// Marker with Winery and Location
// var wineryMarker = L.marker([winery.geometry.coordinates[1], winery.geometry.coordinates[0]])
// .bindPopup("<h3>" + winery.properties[3] + "</h3><hr><h2> Location: " + winery.geometry.coordinates + "</h2>");
