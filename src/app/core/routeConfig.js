function routeConfig($routeProvider) {
    'ngInject';
    $routeProvider
        .when('/dashboard', {
            template: '<dashboard />'
        })
        .otherwise({
            redirectTo: '/dashboard'
        })
}

export default routeConfig;
