"use strict";

pluralsightModule
    .controller("TableOfContentsController", ['$scope', 'CourseRepository', '$routeParams', '$window', 'BookmarkService', function ($scope, courseRepository, $routeParams, $window, bookmarkService) {
        $scope.courseModules = courseRepository.getCourseContent($routeParams.courseName);
        $scope.clearTabs();
        $scope.tabClasses.tableOfContents = "active";



        $scope.getEnabledClassIfAuthorized = function(isAuthorizedForModule) {
            return isAuthorizedForModule ? "" : "disabled";
        };

        $scope.getBookmarkClass = function(item) {
            return item.isBookmarked ? 'on' : '';
		};

        $scope.toggleModuleClipsVisibility = function (module) {
            module.visible = !module.visible;
        };

        $scope.expandAllModules = function() {
            _.each($scope.courseModules, function (module) { module.visible= true; });
        };

        $scope.collapseAllModules = function() {
            _.each($scope.courseModules, function (module) { module.visible = false; });
        };

        $scope.allModulesExpanded = function() {
            return _.every($scope.courseModules, function(module) { return module.visible; });
        };

        $scope.toggleModuleBookmark = function(course, module) {
            toggleBookmark(course, module);
        };

        $scope.toggleClipBookmark = function (course, module, clip) {
            toggleBookmark(course, module, clip);
        };

        function toggleBookmark(course, module, clip) {
            $scope.bookmarkResult.errorMessage = '';
            $scope.bookmarkResult.failed = false;

            bookmarkService.toggleBookmark(course, module,clip)
                .then(
                    null,
                    function(message) {
                        $scope.bookmarkResult.errorMessage = message;
                        $scope.bookmarkResult.failed = true;
                    }
                );
        }
    }]);
