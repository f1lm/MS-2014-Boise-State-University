'use strict';

pluralsightModule.directive('passwordMatches', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            otherPasswordFieldValue: '=passwordMatches'
        },
        link: function (scope, elem, attrs, ngModelController) {
            function validate(value) {
                return value === scope.otherPasswordFieldValue;
            }
            function setValidity(value) {
                var valid = validate(value);
                ngModelController.$setValidity('password-matches', valid);
                return valid ? value : undefined;
            }

            //For DOM -> model validation
            ngModelController.$parsers.unshift(function (value) {
                setValidity(value);
            });

            //For model -> DOM validation
            ngModelController.$formatters.unshift(function (value) {
                setValidity(value);
            });
            
            scope.$watch(function() { return scope.otherPasswordFieldValue; }, function () {
                var valid = validate(ngModelController.$viewValue);
                ngModelController.$setValidity('password-matches', valid);
            });
        }
    };
});
