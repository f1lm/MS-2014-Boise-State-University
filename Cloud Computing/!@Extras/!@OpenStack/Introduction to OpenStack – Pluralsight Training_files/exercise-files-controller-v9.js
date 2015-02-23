"use strict";

pluralsightModule
    .controller("ExerciseFilesController", ['$scope', 'CourseRepository', '$routeParams', '$window', 'baseUrls', function ($scope, courseRepository, $routeParams, $window, baseUrls) {
        $scope.exerciseFilesInfo = courseRepository.getExerciseFilesInfo($routeParams.courseName);
        $scope.clearTabs();
        $scope.tabClasses.exerciseFiles = "active";

        $scope.upgradeUrl = function () {
            return baseUrls.mainWebUrl + "/Account/ChangeSubscription?userHandle=" + $scope.exerciseFilesInfo.userHandle;
        };

        $scope.subscribeUrl = function () {
            return "/signup";
        };

        $scope.downloadExerciseFiles = function () {
            courseRepository.getExerciseFileUrl($routeParams.courseName)
                .$promise.then(function(url) {
                    if (!!url) {    
                        $window.location = url.value;
                    }
                });
        };
    }]);
