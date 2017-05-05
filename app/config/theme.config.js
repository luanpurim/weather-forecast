(function() {
'use strict';

    angular
        .module('app')
        .config(themeConfig);

    function themeConfig($mdThemingProvider) {
        $mdThemingProvider 
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('deep-orange')
            .warnPalette('amber')
            .backgroundPalette('blue-grey');
        $mdThemingProvider.theme('default-dark')
            .primaryPalette('teal')
            .accentPalette('deep-orange')
            .warnPalette('amber')
            .backgroundPalette('blue-grey').dark();
        $mdThemingProvider.alwaysWatchTheme(true);
    }
})();