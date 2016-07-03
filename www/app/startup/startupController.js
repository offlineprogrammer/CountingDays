(function() {
    'use strict';

    angular
        .module('countingDays')
        .controller('StartupController', StartupController);

    function StartupController($ionicHistory, $scope, $state, $timeout) {
        function init() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });










        }

        $timeout(function() {
            init();

            $scope.$on('$ionicView.beforeEnter', function() {
                init();
            });
        }, 2000);
    }
} ());