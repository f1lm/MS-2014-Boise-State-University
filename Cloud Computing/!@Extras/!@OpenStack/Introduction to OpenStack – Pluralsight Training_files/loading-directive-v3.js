'use strict';

pluralsightModule.directive('loading', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            show: '='
        },
        template: '<div class="panel"><h4 class="title">Loading...</h4></div>',
        link: function(scope, element, attr) {
            scope.$watch('show', function(val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    };
})