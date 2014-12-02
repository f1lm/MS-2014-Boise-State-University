"use strict";

pluralsightModule.controller("ValidationController", ['$scope', 'validationService', function ($scope, validationService) {
    $scope.labelClass = function (formName, fieldName) {
        return $scope[formName][fieldName].$invalid && $scope[formName][fieldName].$dirty ? 'error' : '';
    };

    $scope.emailAddressPattern = validationService.emailAddressPattern;
}]);
