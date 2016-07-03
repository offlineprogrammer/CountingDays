(function() {
    'use strict';

    angular
        .module('countingDays')
        .factory('googleAnalyticsService', googleAnalyticsService);

    function googleAnalyticsService($window) {
        var plugin;
        var service = {};

        service.initialise = function() {
            try {
                plugin = $window.analytics;

                if (plugin) {
                    plugin.startTrackerWithId('UA-70035565-3');

                    plugin.enableUncaughtExceptionReporting(true,
                        function() {
                            console.log('Successfully enabled uncaught exception reporting');
                        },
                        function() {
                            console.log('Failed to enable uncaught exception reporting');
                        });
                }
            } catch (error) {
                console.log(error);
            }
        };

  

        service.trackView = function(pageName) {
            try {
                if (plugin) {
                    plugin.trackView(pageName);
                }
            } catch (error) {
                console.log(error);
            }
        };



        return service;

        function loadPlugin() {
            if (!plugin && $window.analytics) {
                plugin = $window.analytics;
            }
        }

       

       
    }
}());
