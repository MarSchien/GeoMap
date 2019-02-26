var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 3
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);


function chooseColor(mag) {
  switch (true) {
  case mag < 1:
    return "yellow";
  case mag < 2:
    return "blue";
  case mag < 3:
    return "green";
  case mag < 4:
    return "purple";
  case mag < 5:
    return "red";
  case mag < 6:
    return "pink";
  case mag < 7:
    return "black";
  case mag < 8:
    return "white";
  case mag < 9:
    return "gray";
  }
}


d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(data=> {

  
  var earthquakes = L.geoJSON(data, {
    pointToLayer: (feature, latlng) =>{
      return L.circleMarker(latlng);
  
    },
    onEachFeature: (feature, layer) =>{
      layer.bindPopup('Magnitude: '+ feature.properties.mag);

    },

    style: function(feature){
      return {
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 0.5,
        weight: 1.5,
        radius: 5 * feature.properties.mag
      };
    
    }



  });
  earthquakes.addTo(myMap);


  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0,1,2,3,4,5,6,7,8,9],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + chooseColor(grades[i]) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

});
