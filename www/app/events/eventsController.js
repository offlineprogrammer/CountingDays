(function () {
    'use strict';

    angular
        .module('countingDays')
        .controller('eventsController', EventsController);

    function EventsController($scope, $state, eventsService, $stateParams, $ionicPopup, $ionicHistory, $ionicModal, googleAnalyticsService,$timeout) {
        $ionicModal.fromTemplateUrl('app/events/viewEvent.tpl.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.viewEventModal = modal;


        });

         var selectedIndex;
         $scope.today = new Date();

        function init() {
            $scope.items = eventsService.get();

        };

        $scope.addEvent = function () {
            $state.go('addevent');
        };

        $scope.showInfo = function () {
            googleAnalyticsService.trackView('showInfo');
            var prompt = $ionicPopup.show({
                title: 'CountingDays',
                cssClass: 'popup-autowidth',
                templateUrl: 'app/events/viewInfo.tpl.html',
                scope: $scope,
                buttons: [{
                    text: 'Close',
                    type: 'button-assertive'
                }]
            });

            prompt.then(function (result) {



            });

        };

        $scope.showEvent = function (eventItem) {
            googleAnalyticsService.trackView('showEvent');
            googleAnalyticsService.trackEvent('Events', 'showEvent', eventItem.name);
            $scope.viewEventModal.scope.data = {
                eventItem: eventItem

            };

            $scope.viewEventModal.show();
        };

        $scope.hideEvent = function () {
            var data = $scope.viewEventModal.scope.data;



            $scope.viewEventModal.hide();
            delete $scope.viewEventModal.scope.data;
        };

        $scope.deleteEvent = function (eventItem) {
            eventsService.remove(eventItem);
            googleAnalyticsService.trackEvent('Events', 'deleteEvent', eventItem.name);
            $scope.items = eventsService.get();

            $scope.viewEventModal.hide();
            delete $scope.viewEventModal.scope.data;
        };

        $scope.isSelected = function (index) {
            return index === selectedIndex;
        };

        function resetSelection() {
            $timeout(function () {
                selectedIndex = -1;
                
            });
        }


        $scope.select = function (index) {
            if ($scope.isSelected(index)) {
                resetSelection();
            } else {
                selectedIndex = index;
               // scrollIntoView(event.currentTarget);
            }
        };






        init();
    }
} ());
