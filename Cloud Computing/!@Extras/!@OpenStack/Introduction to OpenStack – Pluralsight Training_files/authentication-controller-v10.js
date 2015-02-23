"use strict";

pluralsightModule.controller("AuthenticationController", ["$scope", "UserRepository", "$window", "baseUrls", function ($scope, userRepository, $window, baseUrls) {

    $scope.userLoadedSuccessfully = function (data) {
        if (data.backgroundAuthenticationRequired) {
            var backgroundLoginUrl = baseUrls.mvcUrl + '/signin/stagebackgroundsignin?returnUrl=' + $window.location.href;
            $window.location.replace(backgroundLoginUrl);
        }
    };

    $scope.loadUserInfo = function () {
        $scope.user = userRepository.getBasicInfo($scope.userLoadedSuccessfully);
    };

    $scope.loadUserInfo();
    
    $scope.isAuthenticated = function() {
        return $scope.user.loaded && $scope.user.authenticated;
    };

    $scope.isUnAuthenticated = function() {
        return $scope.user.loaded && !$scope.user.authenticated;
    };

    $scope.signOut = function () {
        userRepository.signOut(stripHash($window.location.href)).$promise.then(function (data) {
            $window.location.href = data.redirectUrl;
        });
    };

    $scope.signIn = function() {
        $window.location.href = baseUrls.mvcUrl + "/signin?ReturnUrl=" + stripHash($window.location.href);
    };
    
    function stripHash(url) {
        return url.replace('#\/', '');
    }
}]);