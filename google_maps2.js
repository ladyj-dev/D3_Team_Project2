// Map
var worldMap = window.L.map("myDiv", {
    center: [0.0, 0.0],
    zoom: 10
});

// API Key
var accessToken = mapbox_key

// tileLayer : lightmap
var lightmap = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "light-v10",
}).addTo(worldMap);

// object: baseMaps
var baseMaps = {
    "Light Map": lightmap
};


// Link to JSON in Github
var data = "https://raw.githubusercontent.com/ladyj-dev/D3_Team_Project2/main/Resources/final_cleaned_wine.json";

// API Call for Winery Locations
d3.json(data, function (response) {

    console.log(response);

    // Get "Winery" Name
    var wineries = response.data.wineryLocations;

    // Array to hold winery markers
    var wineryMarkers = [];

    // Loop through the winery array
    for (var i = 0; i < wineries.length; i++) {
        var winery = wineries[i];

        if (winery) {

            // Add Coordinates to Map
            wineryMarkers.push([winery.lat, winery.lng]);

            // Add Markers 
            L.marker([winery.lat, winery.lng])
                // Bind Winery Name in Popup
                .bindPopup("<h3>" + winery.winery + "<h3><h3>Location: " + winery.lat + "," + winery.lng + "</h3>")
                // Add to Map
                .addTo(worldMap);
        };
    }

    // object: overlayMaps
    var overlayMaps = {
        "Winery Locations": wineryLocations
    };

    // layer controls
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map)
});