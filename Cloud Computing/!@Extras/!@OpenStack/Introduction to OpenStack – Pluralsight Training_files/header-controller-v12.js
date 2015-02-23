pluralsightModule.controller('HeaderController', ['$scope', 'UserRepository', 'CourseRepository', 'TagRepository', 'PlayerService', 'ipCookie', '$window', function ($scope, userRepository, courseRepository, tagRepository, playerService, ipCookie, $window) {

    $scope.popularCourses = courseRepository.getPopular();
    $scope.newReleaseCourses = courseRepository.getNewReleases();
    $scope.topTags = tagRepository.getTopTags();
    $scope.courseHistory = userRepository.getCourseHistory();

    $scope.viewCourse = function(playerUrl) {
        playerService.openPlayerUrl(playerUrl);
    };
}]);
