(function() {
    'use strict';

    angular.module('countingDays')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('startup', {
                    url: '/startup',
                    templateUrl: 'app/startup/startup.html',
                    controller: 'StartupController',
                    params: {                       
                        googleData: {
                            pageName: 'Home'
                        }
                    }
                })
                .state('addevent', {
                    cache: false,
                    url: '/addevent',
                    templateUrl: 'app/events/addEvent/addEvent.html',
                    controller: 'addEventController',
                    params: {                       
                        googleData: {
                            pageName: 'AddEvent'
                        }
                    }
                })               
                .state('events', {
                    cache: false,
                    url: '/events',
                    templateUrl: 'app/events/events.html',
                    controller: 'eventsController',
                    params: {                       
                        googleData: {
                            pageName: 'Events'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/startup');
        });
}());