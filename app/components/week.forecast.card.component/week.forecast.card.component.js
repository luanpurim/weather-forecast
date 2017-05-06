(function() {
'use strict';
    angular
        .module('app')
        .component('weekForecastCard', {
            templateUrl: '/components/week.forecast.card.component/week.forecast.card.component.html',
            controller: weekForecastCardController,
            bindings: {
                min: '<',
                max: '<'
            },
        });

    weekForecastCardController.inject = [''];
    function weekForecastCardController() {
        var vm = this;
    }
})();