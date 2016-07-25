(function() {
    'use strict';

    angular
        .module('countingDays')
        .controller('addEventController', AddEventController);

    function AddEventController($scope, $state, eventsService, $stateParams, $ionicPopup, $ionicHistory, $cordovaCamera, $cordovaFile, googleAnalyticsService) {
        function init() {

            $scope.event.date = new Date(Date.now());

        };

        $scope.eventColors = {
            first: null
           
        }

        $scope.customColors = {
            "School": "#5198E1",
            "Life": "#C292F1",
            "Anniversary": "#E898A2",
            "Holiday": "#F08A3C",
            "Others": "#F07B6B"
           

        }

        $scope.goBack = function() {
            $state.go('events');
        };

        $scope.event = {};

        $scope.getPhoto = function() {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1024,
                targetHeight: 768,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            uploadPicture(options);

        }

        $scope.takePhoto = function() {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 1024,
                targetHeight: 768,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            uploadPicture(options);

        }


        function uploadPicture(options) {
            $cordovaCamera.getPicture(options).then(function(sourcePath) {
                var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
                var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
                sourceFileName = sourceFileName.split('?')[0];
                $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(function(success) {
                    $scope.event.image = cordova.file.dataDirectory + sourceFileName;
                }, function(error) {
                    console.log(error);
                });

            }, function(err) {
                console.log(err);
            });
        };




        $scope.addEvent = function() {
            var nEventItem = {
                id: new Date(Date.now()).toISOString(),
                name: $scope.event.name,
                date: $scope.event.date.toISOString(),
                comment: $scope.event.comment,
                image: $scope.event.image,
                category: $scope.eventColors.ccm
            };


            eventsService.addEvent(nEventItem);
            googleAnalyticsService.trackEvent('Events', 'addEvent', nEventItem.name);
            $state.go('events');
        };

        init();
    }
}());