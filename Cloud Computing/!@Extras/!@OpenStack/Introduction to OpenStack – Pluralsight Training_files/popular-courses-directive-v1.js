'use strict';

pluralsightModule.directive('popularCourses', function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/course/popular-courses.html',
            controller: 'PopularCoursesElementController',
            controllerAs: 'popularCoursesController',
            replace: true,
            scope: {

            },
        };
    })
    .controller("PopularCoursesElementController", [
        '$scope', 'CourseRepository', 'baseUrls', function($scope, courseRepository, baseUrls) {
            this.popularCourses = courseRepository.getPopular();
            this.staticUrl = baseUrls.staticUrl;
        }
    ]);

