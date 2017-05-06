(function() {
    'use strict';

    angular
        .module('app')
        .constant('weatherApi', {
                                    baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                                    apiKey: 'e34f728af8dd3955f78471a8955072eb'
                                });
})();