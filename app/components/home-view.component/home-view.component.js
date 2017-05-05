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

    homeViewController.inject = ['weatherFactory', 'citiesList', '$filter'];
    function homeViewController(weatherFactory, citiesList, $filter) {
        var vm = this;
        vm.findCity = findCity;
        vm.getWeatherInformation = getWeatherInformation;
        vm.loadData = loadData;

        function findCity(cityName) {
            return vm.cities.filter(function(city){
                return (city.toLowerCase().indexOf(cityName.toLowerCase()) != -1);
            })
        }
        
        function getWeatherInformation(city) {
            vm.showProgress = true;
            weatherFactory.getWeatherInformation(city)
                .then(function successCallback(response) {
                    vm.data = response.data;
                    vm.loadData(vm.data);
                    vm.showProgress = false;
                }, function errorCallback(response){
                    //error
                });;
        }

        vm.$onInit = function(){
            vm.cities = citiesList.cities;
            getWeatherInformation();
        }

        function loadData(data) {
            vm.maxWeekTemp = 0;
            vm.minWeekTemp = 0;
            vm.cityName = data.city.name;
            vm.initialDate = $filter('date')(new Date(data.list[0].dt * 1000), 'dd/MMMM/yyyy');
            vm.finalDate = $filter('date')(new Date(data.list[6].dt * 1000), 'dd/MMMM/yyyy');
            data.list.forEach(function(e) {
                vm.maxWeekTemp = e.temp.max > vm.maxWeekTemp ? e.temp.max : vm.maxWeekTemp;
                vm.minWeekTemp = (e.temp.min < vm.minWeekTemp || vm.minWeekTemp == 0) ? e.temp.max : vm.minWeekTemp;
            });

        }
    }
})();