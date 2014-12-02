"use strict";

pluralsightModule
    .controller("DescriptionController", ['$scope', 'CourseRepository', '$routeParams', function ($scope, courseRepository, $routeParams) {
        $scope.courseAuthors = courseRepository.getCourseAuthors($routeParams.courseName);
        $scope.clearTabs();
        $scope.tabClasses.description = "active";

        $scope.authorDetailsLink = function(author) {
            return '/author/' + author.authorHandle;
        };
    }]);
