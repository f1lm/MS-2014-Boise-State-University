"use strict";

pluralsightModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    var tableOfContentsRoute = { templateUrl: '/templates/course/table-of-contents.html', controller: 'TableOfContentsController', caseInsensitiveMatch: true };
    var descriptionRoute = { templateUrl: '/templates/course/description.html', controller: 'DescriptionController', caseInsensitiveMatch: true };
    var transcriptRoute = { templateUrl: '/templates/course/transcript.html', controller: 'TranscriptController', caseInsensitiveMatch: true };
    var exerciseFilesRoute = { templateUrl: '/templates/course/exercise-files.html', controller: 'ExerciseFilesController', caseInsensitiveMatch: true };
    var assessmentRoute = { templateUrl: '/templates/course/assessment.html', controller: 'AssessmentController', caseInsensitiveMatch: true };
    var assessmentPlayerRoute = { templateUrl: '/templates/course/assessment-player.html', controller: 'AssessmentPlayerController', caseInsensitiveMatch: true };
    var discussionRoute = { templateUrl: '/templates/course/discussion.html', controller: 'DiscussionController', caseInsensitiveMatch: true };

    $routeProvider.
        when('/table-of-contents/:courseName', tableOfContentsRoute).
        when('/description/:courseName', descriptionRoute).
        when('/transcript/:courseName', transcriptRoute).
        when('/exercise-files/:courseName', exerciseFilesRoute).
        when('/assessment-player/:courseName', assessmentPlayerRoute).
        when('/assessment/:courseName', assessmentRoute).
        when('/discussion/:courseName', discussionRoute).
        when('/:courseName', tableOfContentsRoute).
        otherwise(tableOfContentsRoute);

    $locationProvider.html5Mode(true);
}]);