(function() {
    'use strict';

    angular
        .module('countingDays')
        .factory('eventsService', EventsService);

    function EventsService($ionicHistory, $rootScope, CacheFactory) {
        var CACHE_NAME = 'countingDaysCache';
       var CACHE_KEY = 'Events';
        var events;


        var cache;
        var cachedmenue;


        init();

        var service = {};

        
       service.get = function () {
            var jsonObject = angular.fromJson(cache.get(CACHE_KEY)) || [];
            _.each(jsonObject, function (cdEvent) {
                 var a = moment(moment(cdEvent.date).format('YYYY-MM-DD '));
             var b = moment(moment(new Date(Date.now())).format('YYYY-MM-DD '));
             var datedifference = a.diff(b, 'days');
                cdEvent.datedifference = datedifference;
            });
            return _.compact(angular.copy(jsonObject));
        };

        service.addEvent = function (eventItem) {
           
            events.push(eventItem);
            service.updateCache();
        };


        service.updateCache = function () {
            if (events.length === 0) {
                cache.remove(CACHE_KEY);
            } else {
                cache.put(CACHE_KEY, angular.toJson(events));
            }

            


        };
        
        service.remove = function (eventItem) {
            var index = service.indexOf(eventItem);

            if (index === -1) {

            } else {

                events.splice(index, 1);
                service.updateCache();

            }



            return;

        };

        service.indexOf = function (eventItem) {
            var index = -1;

            _.find(events, function (neventItem, neventItemIndex) {
                if (neventItem.id === eventItem.id) {
                    index = neventItemIndex;
                    return true;
                }

            });
            return index;
        };

        return service;

        function init() {

            cache = new CacheFactory(CACHE_NAME, {
                storageMode: 'localStorage'
            });

            getCachedEvents();



        }

        function getCachedEvents() {
            events = angular.fromJson(cache.get(CACHE_KEY)) || [];

        }


    }
}());