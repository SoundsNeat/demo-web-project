var amISafeHere = angular.module('AmISafeHere', []);

amISafeHere.controller('CityCtrl', function ($scope, $http) {
    var googleMapsPrefix = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    var googleSensorTrue = "&sensor=true";
    var googleKey = "&key=AIzaSyD90S0xFhWOVrI1BsM72yAognJ7tQy-_xM";

    $scope.SearchCityWithCoordinates = function () {
            showPreLoad();
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var googleUrl = googleMapsPrefix + position.coords.latitude + "," + position.coords.longitude
                                + googleSensorTrue + googleKey;
                console.info(googleUrl);
                $http.post(googleUrl)
                .success(function(result){
                    $http.post("getCityStatistics" + "?location=" + reformatAddress(extractAddressFromGoogleAPI(result.results)))
                    .success(function(result){
                        console.info("auto");
                        console.info(result.city);
                        console.info(result.state);
                        $scope.result = result;
                        parseOutput(result);
                        loadModal();
                    })
                    .error(function(data){
                        console.error('Failed to connect to backend for auto-detect.');
                        parseServerConnectError();
                        loadModal();
                    });
                })
                .error(function(data){
                    console.error('Failed to get location from Google Maps.');
                    parseNoGpsError();
                    loadModal();
                });
            });
        } else {
            console.error("Unable to access your current location.\nPlease use the search box.");
            parseNoGpsError();
            loadModal();
        }
    }

    $scope.SearchCityWithAddress = function () {
        showPreLoad();
        $http.post("getCityStatistics" + "?location=" + reformatAddress($('#selectedCity').text()))
            .success(function(data){
                console.info("manual");
                console.info(data.city);
                console.info(data.state);
                $scope.result = data;
                parseOutput(data);
                loadModal();
            })
            .error(function(data){
                console.error('Failed to connect to backend for manual input.');
                parseServerConnectError();
                loadModal();
            });
    }
});