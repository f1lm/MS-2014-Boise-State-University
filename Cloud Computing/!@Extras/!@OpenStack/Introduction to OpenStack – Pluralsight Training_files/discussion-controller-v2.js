"use strict";

pluralsightModule
    .controller("DiscussionController", [
        '$scope', 'CourseRepository', '$routeParams', '$sce', function($scope, courseRepository, $routeParams, $sce) {
            $scope.clearTabs();
            $scope.tabClasses.discussion = "active";
            courseRepository.getLivefyreScript($routeParams.courseName)
                .then(function(html) {
                    $scope.livefyreScript = $sce.trustAsHtml(html);
                });
        }
    ]);
