(function() {
'use strict';

    angular
        .module('app')
        .factory('forecastFactory', forecastFactory);

    forecastFactory.inject = ['weatherApi', '$http'];
    function forecastFactory(weatherApi, $http) {
        var DEFAULT_CITY = "blumenau";
        var service = {
            getWeatherInformation: getWeatherInformation,
            getStates: getStates
        };
         
        function getWeatherInformation(cityName) {
            var data = {
                q: (cityName || DEFAULT_CITY) +',br',
                appid: weatherApi.apiKey,
                units: 'metric',
                mode: 'json',
                cnt: 7,
                lang: 'pt'
            }

            return $http({
                method: 'get',
                url: weatherApi.baseUrl,
                params: data
            })
        }

        function getStates() {
            return $http({
                method: 'get',
                url: '/config/states-list.json'
            }); 
        }

        return service;  
    }
})();