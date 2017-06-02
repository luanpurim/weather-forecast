import { module } from 'angular';

export default module('app.core.constant', [])
    .constant('weatherApi', {
        baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily',
        apiKey: 'e34f728af8dd3955f78471a8955072eb'
    })
    .name