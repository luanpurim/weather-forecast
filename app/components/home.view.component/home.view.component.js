(function() {
'use strict';

    angular
        .module('app')
        .component('homeView', {
            templateUrl: '/components/home.view.component/home.view.component.html',
            controller: homeViewController
        });

    homeViewController.inject = ['forecastFactory', '$filter', '$localStorage', '$mdToast'];
    function homeViewController(forecastFactory, $filter, $localStorage, $mdToast) {
        var vm = this;
        vm.findCity = findCity;
        vm.getWeatherInformation = getWeatherInformation;
        vm.getStates = getStates;
        vm.loadData = loadData;
        vm.loadStatesAndCities = loadStatesAndCities;
        vm.getWeekendInfo = getWeekendInfo;
        vm.saveFav = saveFav;
        vm.verifyCity = verifyCity;

        function findCity(cityName) {
            return vm.cities.filter(function(city){
                return (city.toLowerCase().indexOf(cityName.toLowerCase()) != -1);
            })
        }

        function verifyCity(city) {
            if($localStorage.entity){
                vm.aplyFav = (city == $localStorage.entity.city && state == $localStorage.entity.state) ? true : false;
            }
        }

        function saveFav(city) {
            $localStorage.entity = !vm.aplyFav ? {city: city, state: state} : undefined; 
            vm.aplyFav = !vm.aplyFav;
        }
        
        function getWeatherInformation(city) {
            vm.showProgress = true;
            forecastFactory.getWeatherInformation(city)
                .then(function successCallback(response) {
                    vm.showProgress = false;
                    vm.loadData(response.data);
                }, function errorCallback(response){
                    $mdToast.show($mdToast.simple()
                        .position ('top right')
                        .textContent('Erro ao consultar a previsão do tempo!')
                    );
                });;
        }

        function getStates(){
            forecastFactory.getStates()
                .then(function successCallback(response) {
                    vm.states = response.data.estados;
                    vm.loadStatesAndCities();
                }, function errorCallback(response){
                    $mdToast.show($mdToast.simple()
                        .position ('top right')
                        .textContent('Erro ao carregar a lista de cidades e estados!')
                    );
                });;
        }

        function loadStatesAndCities(state) {
            vm.state = state || vm.states[23] || '';
            vm.cities = vm.state.cidades || '';
        }

        function loadData(data) {
            if(((vm.city.length != 0)  && (vm.city != data.city.name))){
                $mdToast.show($mdToast.simple()
                    .position ('top right')
                    .textContent('A Cidade pesquisada não foi encontrada!')
                );
                return;
            }
            vm.data = data;
            vm.cityName = data.city.name;
            vm.city = data.city.name;
            
            var maxTemps = [];
            var minTemps = [];
            var dates = [];
            var saturday;
            var sunday;

            vm.maxWeek = {temp: 0};
            vm.minWeek = {temp: 0};


            vm.initialDate = $filter('date')(new Date(data.list[0].dt * 1000), 'dd/MMMM/yyyy');
            vm.finalDate = $filter('date')(new Date(data.list[6].dt * 1000), 'dd/MMMM/yyyy');

            vm.data.list.forEach(function(e) {
                var date = new Date(e.dt * 1000);
                if(e.temp.max > vm.maxWeek.temp) {
                     vm.maxWeek = {temp: e.temp.max.toFixed(2), date: date};
                }
                if(e.temp.min < vm.minWeek.temp || vm.minWeek.temp == 0) {
                    vm.minWeek = {temp: e.temp.min.toFixed(2), date: date};
                }

                if(date.getDay() == 0 || date.getDay() == 6) {
                    if(date.getDay() == 0){sunday = e}
                    else {saturday = e};
                }

                maxTemps.push(e.temp.max.toFixed(2));
                minTemps.push(e.temp.min.toFixed(2));
                dates.push($filter('date')(date, "EEEE"));
            });

            vm.sugestion = vm.getWeekendInfo(saturday, sunday);

            vm.chartData = [minTemps,maxTemps]
                                 

            vm.chartLabels = dates;
            vm.chartSeries = ['Min', 'Max']; 
             vm.chartOptions = {
                                    title: {
                                        display: true,
                                        text: 'Temperaturas na Semana'
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                max: 40,
                                                min: 0
                                            },
                                            id: 'y-axis-1',
                                            type: 'linear',
                                            display: true,
                                            position: 'left'
                                        }]
                                    }
                                };

            // var chart = document.getElementById("chart");
            // var forecastChart = new Chart(chart, {
            //     type: 'line',
            //     data: {
            //         labels: dates,
            //         datasets:[
            //         {
            //             label: 'Min',
            //             data: minTemps,
            //             backgroundColor: "rgba(63, 81, 181,0.7)",
            //             borderColor: "rgba(63, 81, 2301,1)"
            //         },
            //         {
            //             label: 'Máxima',
            //             data: maxTemps,
            //             backgroundColor: "rgba(255, 110, 64, 0.6)",
            //             borderColor: "rgba(255, 70, 64,1)"
            //         }]
            //     },
            //     options: {
            //         title: {
            //             display: true,
            //             text: 'Temperaturas na Semana'
            //         },
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     max: 40,
            //                     min: 0
            //                 }
            //             }]
            //         }
            //     }
            // })
        };

        function getWeekendInfo(saturday, sunday) {
            var msg = '';
            var saturdayWeather = saturday.weather[0].main;
            var sundayWeather =sunday.weather[0].main;
            var weekendMediaTemp = ((saturday.temp.max +saturday.temp.min + sunday.temp.max + sunday.temp.min)/4).toFixed(2) 

            if(saturdayWeather == sundayWeather) {
                msg = 'O clima predominante no fim de semana será ' + getWeather(sundayWeather).info + '.';
                msg += ' A temperatura média será de ' + weekendMediaTemp + '°C. Recomendamos que você vá ' +getWeather(sundayWeather).sugestion + '.';
            } else {
                msg ='No sábado o clima será ' + getWeather(saturdayWeather).info + ' e recomendamos que você vá '+getWeather(saturdayWeather).sugestion;
                msg +=' No domingo o clima será ' + getWeather(sundayWeather).info + ' e recomendamos que você vá '+getWeather(sundayWeather).sugestion;
                msg += ' A temperatura média será de ' + weekendMediaTemp + '°C.';
            }
            return msg;            
        }

        function getWeather(wheather) {
            switch (wheather) {
                case 'Rain':
                    return {info: 'chuvoso',
                            sugestion: 'ao cinema'}
                case 'Clear':
                    return {info: 'ensolarado',
                            sugestion: 'à praia'}
                case 'Clouds':
                    return {info: 'nublado',
                            sugestion: 'praticar esportes'}
                default:
                    return {info: 'indefinido',
                            sugestion: 'ao cinema'}
            }
        }

        vm.$onInit = function(){
            if($localStorage.entity) {
                vm.aplyFav = true;
                vm.city = $localStorage.entity.city;
                vm.state = $localStorage.entity.state;
            }
            vm.getStates()
            vm.getWeatherInformation(vm.city);
        };
    }
})();