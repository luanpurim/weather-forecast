import angular from 'angular';
import weatherCard from './weatherCard/weatherCard';
import dashboard from './dashboard/dashboard'

export default angular
    .module('app.modules.module',[
        weatherCard,
        dashboard
    ])
    .name;
