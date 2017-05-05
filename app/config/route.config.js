(function() {
'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<home-view />'
            })
            .otherwise('/', {
                template: '<home-view />'
            })
    }
})();