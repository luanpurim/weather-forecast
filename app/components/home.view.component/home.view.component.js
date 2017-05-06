(function() {
'use strict';

    angular
        .module('app')
        .component('homeView', {
            templateUrl: '/components/home.view.component/home.view.component.html',
            controller: homeViewController,
            bindings: {
            },
        });

    homeViewController.inject = ['forecastFactory', '$filter'];
    function homeViewController(forecastFactory, $filter) {
        var vm = this;
        vm.findCity = findCity;
        vm.getWeatherInformation = getWeatherInformation;
        vm.getStates = getStates;
        vm.loadData = loadData;
        vm.loadStatesAndCities = loadStatesAndCities;

        function findCity(cityName) {
            return vm.cities.filter(function(city){
                return (city.toLowerCase().indexOf(cityName.toLowerCase()) != -1);
            })
        }
        
        function getWeatherInformation(city) {
            vm.showProgress = true;
            forecastFactory.getWeatherInformation(city)
                .then(function successCallback(response) {
                    vm.data = response.data;
                    vm.loadData(vm.data);
                    vm.showProgress = false;
                }, function errorCallback(response){
                    //error
                });;
        }

        function getStates(){
            forecastFactory.getStates()
                .then(function successCallback(response) {
                    vm.states = response.data.estados;
                    vm.loadStatesAndCities();
                }, function errorCallback(response){
                    //error
                });;
        }

        function loadStatesAndCities(state) {
            vm.state = state || vm.states[23];
            vm.cities = vm.state.cidades;
        }

        function loadData(data) {
            var maxTemps = [];
            var minTemps = [];
            var dates = [];
            vm.maxWeek = {temp: 0};
            vm.minWeek = {temp: 0};
            vm.cityName = data.city.name;

            vm.initialDate = $filter('date')(new Date(data.list[0].dt * 1000), 'dd/MMMM/yyyy');
            vm.finalDate = $filter('date')(new Date(data.list[6].dt * 1000), 'dd/MMMM/yyyy');

            data.list.forEach(function(e) {
                if(e.temp.max > vm.maxWeek.temp) {
                     vm.maxWeek = {temp: e.temp.max, date: new Date(e.dt * 1000)};
                }
                if(e.temp.min < vm.minWeek.temp || vm.minWeek.temp == 0) {
                    vm.minWeek = {temp: e.temp.min, date: new Date(e.dt * 1000)};
                }

                maxTemps.push(e.temp.max);
                minTemps.push(e.temp.min);
                dates.push($filter('date')(new Date(e.dt * 1000), "EEEE"));
            });

            var chart = document.getElementById("chart");
            var forecastChart = new Chart(chart, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets:[
                    {
                        label: 'Min',
                        data: minTemps,
                        backgroundColor: "rgba(63, 81, 181,0.7)",
                        borderColor: "rgba(63, 81, 2301,1)"
                    },
                    {
                        label: 'Máxima',
                        data: maxTemps,
                        backgroundColor: "rgba(255, 110, 64, 0.6)",
                        borderColor: "rgba(255, 70, 64,1)"
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Temperatura na Semana'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: 40,
                                min: 0
                            }
                        }]
                    }
                }
            })
        }

        vm.$onInit = function(){
            vm.getStates()
            vm.getWeatherInformation();
        }
    }
})();