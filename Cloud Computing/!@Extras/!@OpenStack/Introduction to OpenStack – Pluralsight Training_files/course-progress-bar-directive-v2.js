'use strict';

pluralsightModule.directive('courseProgressBar', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/course/course-progress-bar.html',
        controller: 'CourseProgressBarController',
        controllerAs: 'courseProgressBarController',
        replace:true,
        scope: {
            courseModules: '='
        },
    };
})
    .controller("CourseProgressBarController", [
        '$scope', 'clipDurationInSecondsFilter', 'numberFilter', function ($scope, clipDurationInSecondsFilter, numberFilter) {

            var controller = this;
            updateViewedPercent();

            $scope.$watchCollection("courseModules", updateViewedPercent);

            function updateViewedPercent() {
                var allClips = _.flatten(_.map($scope.courseModules, function (module) {
                    return module.clips;
                }));

                var viewedLengthInSeconds = 0;
                var courseLengthInSeconds = 0;

                angular.forEach(allClips, function (clip) {
                    viewedLengthInSeconds += clip.hasBeenViewed ? clipDurationInSecondsFilter(clip.duration) : 0;
                    courseLengthInSeconds += clipDurationInSecondsFilter(clip.duration);
                });

                controller.viewedPercent = numberFilter((viewedLengthInSeconds / courseLengthInSeconds * 100), 0) + '%';
                controller.unviewedPercent = numberFilter(100-(viewedLengthInSeconds / courseLengthInSeconds * 100), 0) + '%';
            };

        }
    ]);


