(function(){

    var app = angular.module('femaleApp', [
        'ui.router',
        'ngResource',
        'femaleApp.services',
        'femaleApp.controllers'
    ])

    .config(function($httpProvider, $resourceProvider, $stateProvider, $locationProvider, $urlRouterProvider){

        // CSRF support
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        // Routing
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('female_display', {
                templateUrl: 'partials/female_display.html',
                controller: 'FemaleDisplayController'
            })
            .state('female_create', {
                templateUrl: 'partials/female_create.html',
                controller: 'FemaleCreateController'
            })
            .state('female_edit', {
                templateUrl: 'partials/female_edit.html',
                controller: 'FemaleEditController'
            });

        $urlRouterProvider.otherwise('/');

    });

})();
