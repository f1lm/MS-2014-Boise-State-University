"use strict";

pluralsightModule.directive('stopPropagation', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});