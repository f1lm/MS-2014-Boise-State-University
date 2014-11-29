"use strict";

pluralsightModule
    .controller("AssessmentController", [
        '$scope', 'CourseRepository', 'AssessmentRepository', '$routeParams', '$http', 'baseUrls', '$location', function ($scope, courseRepository, assessmentRepository, $routeParams, $http, baseUrls, $location) {
            $scope.clearTabs();
            $scope.tabClasses.assessment = "active";
            courseRepository.getAssessmentInfo($routeParams.courseName).$promise.then(function (assessmentInfo) {
                $scope.assessmentInfo = assessmentInfo.info;
                $scope.assessmentInfo.loaded = assessmentInfo.loaded;
                $scope.assessmentInfo.useBetaAssessments = assessmentInfo.useBetaAssessments;
                $scope.assessmentInfo.timeRemainingForCurrentAssessment = new Date('1/1/2000 ' + assessmentInfo.timeRemainingForCurrentAssessment);
            });
            
            $scope.showPartial = function (name) {
                return $scope.assessmentInfo && name == $scope.assessmentInfo.partialViewName;
            };

            $scope.showTrialMessage = function () {
                return !!$scope.assessmentInfo && !!$scope.assessmentInfo.trialLimit;
            };
            $scope.preAssessment = function (courseName) {
                return baseUrls.mainWebUrl + "/assessments/live/prepare?courseName=" + courseName;
            };
            $scope.postAssessment = function (courseName) {
                return baseUrls.mainWebUrl + "/assessments/live/prepare?courseName=" + courseName;
            };
            $scope.assessmentIsForCurrentCourse = function (assessmentCourseName) {
                return assessmentCourseName == "sample-course" || $routeParams.courseName == assessmentCourseName;
            };
            $scope.resumeClassicAssessment = function (assessmentId) {
                return baseUrls.mainWebUrl + "/assessments/resume?assessmentId=" + assessmentId;
            };
            $scope.resumeAssessment = function (courseName) {
                if ($scope.assessmentIsForCurrentCourse(courseName)) {
                    navigateToPlayer($scope.assessmentInfo.inProgressAssessmentId);
                } else {
                    $location.path('assessment/' + courseName);
                }
            };
            $scope.subscribeUrl = function () {
                return baseUrls.mvcUrl + "/subscribe/step1";
            };
            $scope.upgradeUrl = function () {
                if (!!$scope.assessmentInfo) {
                    return baseUrls.mainWebUrl + "/account/changesubscription?userhandle=" + $scope.assessmentInfo.handle;
                }
                return '';
            };
            $scope.sampleAssessment = function () {
                return baseUrls.mainWebUrl + "/assessments/createandstartsample";
            };
            $scope.startSampleAssessment = function () {
                $scope.startAssessmentFailed = false;
                assessmentRepository.startSampleAssessment().$promise.then(function (response) {
                    navigateToPlayer(response.id);
                }, function() {
                    $scope.startAssessmentFailed = true;
                });
            };
            $scope.startAssessment = function () {
                $scope.startAssessmentFailed = false;
                assessmentRepository.startAssessment($routeParams.courseName).$promise.then(function (response) {
                    navigateToPlayer(response.id);
                }, function () {
                    $scope.startAssessmentFailed = true;
                });
            };

            function navigateToPlayer(id) {
                $location.path('assessment-player/' + $routeParams.courseName).search('id', id);
            }
        }
    ]);
