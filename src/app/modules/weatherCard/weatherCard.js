import angular from 'angular';
import template from './weatherCard.html';
import controller from './weatherCard.controller'

function weatherCard (){
    return {
        template,
        controller,
        bindings:{
            forecast: '<'
        }
    }
}

export default angular
    .module('app.weatherCard',[])
    .component('weatherCard', weatherCard)
    .name;
 
