(function() {
'use strict';

    angular
        .module('app')
        .component('weatherCard', {
            templateUrl: '/components/weather-card.component/weather-card.component.html',
            controller: weatherCardCtrl,
            bindings: {
                forecast: '<'
            },
        });

    weatherCardCtrl.inject = [''];
    function weatherCardCtrl() {
        var vm = this;
        vm.getDate = getDate;
        vm.getIcon = getIcon;

        function getDate(day){
            return new Date(day*1000);
        }       

        function getIcon(icon){
            return "http://openweathermap.org/img/w/"+icon+".png"; 
        }
    }
})();