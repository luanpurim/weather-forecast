(function() {
'use strict';

    angular
        .module('app')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.inject = ['weatherApi', '$http'];
    function weatherFactory(weatherApi, $http) {
        var DEFAULT_CITY = "blumenau";
        var service = {
            getWeatherInformation: getWeatherInformation
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

        return service;  
    }
})();