var Map = {

    init_map: function () {
        $(document).on("location_changed", function() {
            // list map... location on list.html and map.html (mobile and desktop)
            if( $("#list_map").length > 0 ) {
                Map.initializeListMap();
            }
            //detail page map
            if($("#detail_map").length > 0) {
                Map.initializeDetailMap();
            }
        });

        // handle map stuff for window resize
        $(window).resize(function() {
            // list map
            if($("#list_map").length > 0) {
                Map.initializeListMap();
            }
            // detail page map
            if($("#detail_map").length > 0) {
                Map.initializeDetailMap();
            }
        });

    },

    init_map_page: function () {
        //Geolocation.init_location_toggles();
    },

    initializeListMap: function () {

        var mapExists = document.getElementById("list_map");
        var pos = Geolocation.get_client_latlng();
        var pageURL = $(location).attr("href");

        if(mapExists) {

            L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhcmxvbnBhbGFjYXkiLCJhIjoiY2lpMHYwZ3I2MDUzbHQzbTFnaWRmZnV1NCJ9.WkswXwuPmbIDcYFdV096Aw';

            var map = L.mapbox.map('list_map', 'mapbox.streets')
            .setView([47.653811, -122.307815], 17);

            // multiple pins on a single map
            var locations = window.spot_locations;

            $.each(locations, function (key, value){

                var data = value;

                L.mapbox.featureLayer({
                    // this feature is in the GeoJSON format: see geojson.org
                    // for the full specification
                    'type': 'Feature',
                    geometry: {
                        'type': 'Point',
                        // coordinates here are in longitude, latitude order because
                        // x, y is the standard for GeoJSON and many formats
                        'coordinates': [data.lng,data.lat]
                    },
                    properties: {
                        'title': data.spot_name,
                        'description': data.building + '<br><a href="'+ pageURL + data.id +'">View details</a>',
                        // one can customize markers by adding simplestyle properties
                        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                        'marker-size': 'small',
                        'marker-color': '#6462a5',
                        'marker-symbol': 'circle-stroked', // https://www.mapbox.com/maki/

                    }
                }).addTo(map);

            });

        }
    },

    initializeDetailMap: function() {

        var mapExists = document.getElementById("detail_map");
        var isMobile = $("body").data("mobile");
        var myLatlng, mapOptions;

        if (mapExists) {

            // get spot location from data attributes
            var spot_lat = $(".scout-card").data("latitude");
            var spot_lng = $(".scout-card").data("longitude");
            var spot_name = $(".scout-card").data("spotname");
            var spot_building = $(".scout-card").data("building");

            L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhcmxvbnBhbGFjYXkiLCJhIjoiY2lpMHYwZ3I2MDUzbHQzbTFnaWRmZnV1NCJ9.WkswXwuPmbIDcYFdV096Aw';

            var map = L.mapbox.map('detail_map', 'mapbox.streets')
            .setView([spot_lat, spot_lng], 21);

            L.mapbox.featureLayer({
                // this feature is in the GeoJSON format: see geojson.org
                // for the full specification
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    // coordinates here are in longitude, latitude order because
                    // x, y is the standard for GeoJSON and many formats
                    'coordinates': [spot_lng,spot_lat]
                },
                properties: {
                    'title': spot_name,
                    'description': spot_building + '<br/><a href="https://maps.google.com/maps?q=' + spot_lat + ',' + spot_lng + '" target="_blank">Get directions</a>',

                    // one can customize markers by adding simplestyle properties
                    // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                    'marker-size': 'medium',
                    'marker-color': '#6462a5',
                    'marker-symbol': 'circle-stroked', // https://www.mapbox.com/maki/
                }
            }).addTo(map);

        }

    }
};
