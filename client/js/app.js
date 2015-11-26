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
                url: '/',
                templateUrl: 'partials/female_display.html',
                controller: 'FemaleDisplayController as display'
            })
            .state('female_detail', {
                url: '/:female',
                templateUrl: 'partials/female_detail.html',
                controller: 'FemaleDetailController as detail'
            })
            .state('female_list', {
                url: '/list',
                templateUrl: 'partials/female_list.html',
                controller: 'FemaleListController as list'
            })
            .state('female_create', {
                url: '/create',
                templateUrl: 'partials/female_create.html',
                controller: 'FemaleCreateController as create'
            })
            .state('female_edit', {
                url: '/edit/:female',
                templateUrl: 'partials/female_edit.html',
                controller: 'FemaleEditController as edit'
            });

        $urlRouterProvider.otherwise('/');

    });

})();
