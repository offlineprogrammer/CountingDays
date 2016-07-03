(function () {
    window.ionic.Platform.ready(function () {
        angular.bootstrap(document, ['countingDays'], {
            strictDi: false
        });
    });
}());
