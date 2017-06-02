import { module } from 'angular';
import statesList from './states.list.json';

class dashboardService {
    constructor(weatherApi, $http) {
        'ngInject';
        this.$http = $http;
        this.weatherApi = weatherApi;
        this.DEFAULT_CITY = "Blumenau";
    }

    loadCity(city) {
        return this.$http({
            method: 'get',
            params: {
                q: (city || this.DEFAULT_CITY) + ',br',
                appid: this.weatherApi.apiKey,
                units: 'metric',
                mode: 'json',
                cnt: 7,
                lang: 'pt'
            },
            url: this.weatherApi.baseUrl
        });
    }

    loadStates() {
        return statesList;
    }
}

export default module('service.dashboardService', [])
    .service('dashboardService', dashboardService)
    .name;