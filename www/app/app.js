(function () {
    'use strict';

    angular.module('countingDays', [
        'ionic',
        'ngCordova',
        'angular-cache',
        'angularMoment',
        'ionic-color-picker'        
        
    ])
        .run(function ($window,googleAnalyticsService) {
            ionic.Platform.ready(function () {
                if ($window.StatusBar) {
                    $window.StatusBar.styleDefault();
                }

                 if ($window.cordova) {
                        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                        // for form inputs)
                        if ($window.cordova.plugins.Keyboard) {
                            $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        }

                        if ($window.cordova.logger) {
                            $window.cordova.logger.__onDeviceReady();
                        }

                         googleAnalyticsService.initialise();

                        
                    }
            });
        })
        .run(function ($rootScope, googleAnalyticsService) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
               
                if (toParams.googleData) {
                    googleAnalyticsService.trackView(toParams.googleData.pageName);
                }

               
            });
        })
        .run(function ($http, CacheFactory) {
            $http.defaults.cache = new CacheFactory('httpGetOnlyCache', {
                storageMode: 'localStorage',
                maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day.
                deleteOnExpire: 'aggressive'
            });
        })
        .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
});
}());