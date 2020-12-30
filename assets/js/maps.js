function initMap() {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: {
                    lat: 46.619261,
                    lng: -33.134766
                }
            });
            // Each Letter is going to appear on the Markers 
            var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            var locations = [
                // Will contain objects of the lat/long of the places visited 
                {
                    lat: 40.785091, 
                    lng: -73.968285 
                },
                {
                    lat: 41.084045,
                    lng: -73.874256
                },
                {
                    lat: 40.754932,
                    lng: -73.984016
                }
            ];
            // Iterate through this array and create a marker with the label from the alphabet string
            // map method is a built in JavaScript method 
            // The map() method here has nothing to do with the Google Maps API.

            // we want to get one of the labels out of our string 

            /* The reason for using the % operator is so that if we have more than 26 locations (26 letters), 
            then it will loop around to the start of our string again and go from Z back to A, instead of throwing an error
            */
            var markers = locations.map(function(location, i){
                return new google.maps.Marker ({
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            // Add a marker clusterer to manage the markers.
            new MarkerClusterer(map, markers, {
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            });
        }