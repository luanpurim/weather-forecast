(function() {
'use strict';

    angular
        .module('app')
        .component('homeView', {
            templateUrl: '/components/home-view.component/home-view.component.html',
            controller: homeViewController,
            bindings: {
            },
        });

    homeViewController.inject = ['weatherFactory', 'citiesList'];
    function homeViewController(weatherFactory, citiesList) {
        var vm = this;
        vm.findCity = findCity;
        vm.getWeatherInformation = getWeatherInformation;

        function findCity(cityName) {
            return vm.cities.filter(function(city){
                return (city.toLowerCase().indexOf(cityName.toLowerCase()) != -1);
            })
        }
        
        function getWeatherInformation() {
            weatherFactory.getWeatherInformation(vm.city)
                .then(function successCallback(response) {
                    vm.data = response.data;
                }, function errorCallback(response){
                    //error
                });;
        }

        vm.$onInit = function(){
            vm.cities = citiesList.cities;
            weatherFactory.getWeatherInformation()
                .then(function successCallback(response) {
                    vm.data = response.data;
                }, function errorCallback(response){
                    //error
                });
            
        }
    }
})();