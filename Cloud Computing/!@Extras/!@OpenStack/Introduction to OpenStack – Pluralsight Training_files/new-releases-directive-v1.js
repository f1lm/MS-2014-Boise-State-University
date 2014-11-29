'use strict';

pluralsightModule.directive('newReleases', function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/course/new-releases.html',
            controller: 'NewReleasesElementController',
            controllerAs: 'newReleasesController',
            replace: true,
            scope: {

            },
        };
    })
    .controller("NewReleasesElementController", [
        '$scope', 'CourseRepository', 'baseUrls', function($scope, courseRepository, baseUrls) {
            this.newReleaseCourses = courseRepository.getNewReleases();
            this.staticUrl = baseUrls.staticUrl;
        }
    ]);

