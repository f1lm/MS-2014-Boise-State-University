'use strict';

pluralsightModule.directive('validation', function ($compile) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (!element[0].form)
                return;

            var formName = element[0].form.name;

            if (attrs.required) {
                var requiredMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error.required && ' + formName + '[\'' + attrs.name + '\'].$dirty">' + attrs.validation + ' is required</small>');
                element.after($compile(requiredMessage)(scope));
            }
            if (attrs.ngPattern) {
                var message = attrs.patternMessage ? attrs.patternMessage : 'Invalid ' + attrs.validation;
                var patternMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error.pattern && ' + formName + '[\'' + attrs.name + '\'].$dirty">' + message + '</small>');
                element.after($compile(patternMessage)(scope));
            }
            if (attrs.ngMinlength) {
                var minLengthMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error.minlength">' + attrs.validation + ' must be at least ' + attrs.ngMinLength + ' characters</small>');
                element.after($compile(minLengthMessage)(scope));
            }
            if (attrs.ngMaxlength) {
                var maxLengthMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error.maxlength">' + attrs.validation + ' must be no more than ' + attrs.ngMaxlength + ' characters</small>');
                element.after($compile(maxLengthMessage)(scope));
            }
            if (attrs.passwordMatches) {
                var passwordMatchMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error[\'password-matches\'] && ' + formName + '[\'' + attrs.name + '\'].$dirty ">Passwords must match</small>');
                element.after($compile(passwordMatchMessage)(scope));
            }
        }
    };
});
