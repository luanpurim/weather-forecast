export default class dashboardController {

    constructor(dashboardService, $filter, $localStorage, $mdToast) {
        "ngInject";
        this.dashboardService = dashboardService;
        this.$filter = $filter;
        this.localStorage = $localStorage;
        this.$mdToast = $mdToast;
        this.chart = {};
        this.city = {};
        this.favorite = {};
        this.states = [];
        this.cities = [];
        this.showProgress = false;
    }

    $onInit() {
        this.loadStates();
        this.getFavorite();
        this.loadCity(this.city);
    }

    setFavorite(favorite) {
        this.localStorage.favorite = favorite;
    }

    getFavorite() {
        this.favorite = this.localStorage.favorite;
    }

    onSelectState({ state, cities }) {
        this.city.state = state;
        this.cities = cities;
    }

    findCity(cityName) {
        return this.cities.filter(city => city.toLowerCase().includes(cityName.toLowerCase()));
    }

    isFavoriteCity() {
        if (localStorage.favorite) {
            return Object.is(localStorage.favorite.city.name, city.name) && Object.is(localStorage.favorite.city.state, city.state);
        }
    }

    loadStates() {
        this.states = this.dashboardService.loadStates();
    }

    loadCity(city) {
        this.showProgress = true;
        this.dashboardService.loadCity(city.name)
            .then(({ data }) => this.bindData(data))
            .then(() => this.showProgress = false);
    }

    buildChart({ minimunTemp = 0, maximusTemp = 0, dates = {} }) {

        this.chart.Data = [minimunTemp, maximusTemp]
        this.chart.Labels = dates;
        this.chart.Series = ['Min', 'Max'];
        this.chart.Colors = ['#45b7cd', '#ff6384', '#ff8e72']
        this.chart.Options = {
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
    }

    bindData({ list, city, weather }) {
        this.city.name = city.name;

        let chartData = {
            minimunTemp: [],
            maximusTemp: [],
            dates: []
        }

        let temperatures = {
            min: {
                temp: 0               
            },
            max: {
                temp: 0              
            }
        };

        let weekend = {
            saturday: {},
            sunday: {},
        };

        this.initialDate = new Date(list[0].dt * 1000);
        this.finalDate = new Date(list[6].dt * 1000);

        list.forEach(({ dt, temp }) => {
            let date = new Date(dt * 1000);

            if (temp.max > temperatures.max.temp) temperatures.max = { temp: temp.max.toFixed(2), date: date };
            
            if (temp.min < temperatures.max.temp || temperatures.min.temp == 0)  temperatures.min = { temp: temp.min.toFixed(2), date: date };
            
            if (date.getDay() == 0) weekend.saturday = {weather, temp};
            if (date.getDay() == 6) weekend.sunday = {weather, temp};

            chartData.maximusTemp.push(temp.max.toFixed(2));
            chartData.minimunTemp.push(temp.min.toFixed(2));
            chartData.dates.push(date);
        });
        this.sugestion = this.getWeekendInfo(weekend);
    };

    getWeekendInfo({saturday, sunday}, temperature) {
        let msg = '';
        let saturdayWeather = saturday.weather;
        let sundayWeather = sunday.weather;
        let mediaTemperature = ((saturday.temp.max + saturday.temp.min + sunday.temp.max + sunday.temp.min) / 4).toFixed(2)

        if (saturdayWeather == sundayWeather) {
            msg = 'O clima predominante no fim de semana será ' + this.getWeather(sundayWeather).info + '.';
            msg += ' A temperatura média será de ' + mediaTemperature + '°C. Recomendamos que você vá ' + this.getWeather(sundayWeather).sugestion + '.';
        } else {
            msg = 'No sábado o clima será ' + this.getWeather(saturdayWeather).info + ' e recomendamos que você vá ' + this.getWeather(saturdayWeather).sugestion;
            msg += ' No domingo o clima será ' + this.getWeather(sundayWeather).info + ' e recomendamos que você vá ' + this.getWeather(sundayWeather).sugestion;
            msg += ' A temperatura média será de ' + mediaTemperature + '°C.';
        }
        return msg;
    }

    getWeather(wheather) {
        switch (wheather) {
            case 'Rain':
                return {
                    info: 'chuvoso',
                    sugestion: 'ao cinema'
                }
            case 'Clear':
                return {
                    info: 'ensolarado',
                    sugestion: 'à praia'
                }
            case 'Clouds':
                return {
                    info: 'nublado',
                    sugestion: 'praticar esportes'
                }
            default:
                return {
                    info: 'indefinido',
                    sugestion: 'ao cinema'
                }
        }
    }
}