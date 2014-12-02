"use strict";

pluralsightModule
    .controller("CourseController", [
        '$scope', 'CourseRepository', '$route', '$sce', '$location', 'AuthorLinksService', 'BookmarkService', 'PlayerService', '$window', 'baseUrls',
        function ($scope, courseRepository, $route, $sce, $location, authorLinksService, bookmarkService, playerService, $window, baseUrls) {

            $scope.bookmarkResult = { errorMessage: "", failed: false };

            $scope.pageToNavigateTo = "table-of-contents";

            $scope.tabClasses = {
                tableOfContents: "active",
                exerciseFiles: "",
                description: "",
                transcript: "",
                assessment: "",
                discussion: ""
            };

            $scope.clearTabs = function() {
                $scope.tabClasses.tableOfContents = "";
                $scope.tabClasses.exerciseFiles = "";
                $scope.tabClasses.description = "";
                $scope.tabClasses.transcript = "";
                $scope.tabClasses.assessment = "";
                $scope.tabClasses.discussion = "";
            };

            $scope.$on('$routeChangeSuccess', function() {
                if (!$scope.course || $scope.course.name != $route.current.params.courseName) {
                    courseRepository.get($route.current.params.courseName)
                        .$promise.then(function(course) {
                            if (course.isValid) {
                                $scope.course = course;
                                $scope.courseRelationships = courseRepository.getCourseRelationships(course.name);
                                $scope.authorLinks = authorLinksService.getAuthorLinks(course.authors, course.name);
                                courseRepository.getSocialData(course.name).$promise.then(function (social) {
                                    $scope.social = social;
                                    $scope.social.fullFacebookUrl = $sce.trustAsResourceUrl('//www.facebook.com/plugins/like.php?href='
                                        + encodeURIComponent($scope.social.friendlyRedirectingUrl) + '&layout=button_count&action=like&show_faces=true&send=true&height=21');
                                });
                                
                                document.title = course.title + ' – Pluralsight Training';
                            } else {
                                $window.location.replace("/tags");
                            }
                        });
                }
            });

            $scope.showTranscriptTab = function () {
                return $scope.course && $scope.course.hasTranscript && $scope.course.isUserAuthorizedForTranscript;
            };

            $scope.getAuthorNames = function(authors) {
                var authorNames = [];
                angular.forEach(authors, function(author) { this.push(author.text); }, authorNames);
                return authorNames.join(', ');
            };

            $scope.getLongBio = function(author) {
                return $sce.trustAsHtml(author.longBio);
            };

            $scope.rateCourse = function(rating) {
                courseRepository.rateCourse($scope.course.name, rating);
            };

            $scope.toggleCourseBookmark = function(course) {
                $scope.bookmarkResult.failed = false;
                $scope.bookmarkResult.errorMessage = "";
                bookmarkService.toggleBookmark(course)
                    .then(
                        null,
                        function(message) {
                            $scope.bookmarkResult.failed = true;
                            $scope.bookmarkResult.errorMessage = message;
                        }
                    );
            };

            $scope.navigateTo = function (page) {
                $location.search('id', null);
                $location.path(page + '/' + $scope.course.name);

            };

            $scope.openPlayer = function (playerParams, isAuthorizedForModule) {
                if (isAuthorizedForModule) {
                    var playerUrl = baseUrls.mainWebUrl + "/player?" + playerParams;
                    playerService.openPlayerUrl(playerUrl);
                }
            };
        }
    ]);
