import { module } from 'angular';
import constants from './constants'
import config from './routeConfig'
import ngRoute from 'angular-route';
import angularMaterial from 'angular-material';
import 'ngstorage';

export default module('app.core.module', [
        constants,
        ngRoute,
        angularMaterial,
        'ngStorage'
    ])
    .config(config)
    .name;