'use strict';

pluralsightModule.directive('gravatar', ['gravatarUrlBuilder', function (gravatarUrlBuilder) {
    return {
        restrict: 'A',
        template: '<img />',
        replace: true,
        link: function (scope, element, attrs, controller) {
            element.addClass('rounded-corners');

            attrs.$observe('email', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    attrs.$set('src', gravatarUrlBuilder.buildGravatarUrl(newValue, attrs.size));
                }
            });

            attrs.$observe('size', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    element.attr('width', attrs.size);
                    element.attr('height', attrs.size);
                }
            });
        }
    }
}]);
