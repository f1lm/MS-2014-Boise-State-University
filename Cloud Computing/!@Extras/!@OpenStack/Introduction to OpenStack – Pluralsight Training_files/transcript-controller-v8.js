"use strict";

pluralsightModule
    .controller("TranscriptController", ['$scope', 'CourseRepository', '$routeParams', 'TranslationRepository', 'UserRepository', 'baseUrls', function ($scope, courseRepository, $routeParams, translationRepository, userRepository, baseUrls) {
        $scope.clearTabs();
        $scope.tabClasses.transcript = "active";

        translationRepository.getTranslationLanguages().$promise.then(function(translationLanguages) {
            $scope.translationLanguages = translationLanguages;
            $scope.selectedLanguage = $scope.getPreferredLanguage();
        });

        userRepository.getPreferredLanguage().$promise.then(function (language) {
            $scope.preferredLanguageCode = language.code;
            $scope.selectedLanguage = $scope.getPreferredLanguage();
            $scope.transcripts = courseRepository.getCourseTranscript($routeParams.courseName, language.code);
        });
        
        $scope.getPlayerUrl = function (playerParameters, displayTime) {
            if (displayTime) {
                return baseUrls.mainWebUrl + "/player?" + playerParameters + "&start=" + displayTime;
            }
            return baseUrls.mainWebUrl + "/player?" + playerParameters;
        };

        $scope.getPreferredLanguage = function () {
            if (!$scope.translationLanguages || $scope.translationLanguages.length == 0 || !$scope.preferredLanguageCode) return '';
            return _.findWhere($scope.translationLanguages, { code: $scope.preferredLanguageCode });
        };

        $scope.showLanguageOptions = function () {
            return $scope.isAuthenticated() && $scope.preferredLanguageCode && $scope.translationLanguages && $scope.translationLanguages.length > 0;
        };

        $scope.retrieveTranscripts = function (languageCode) {
            $scope.preferredLanguageCode = languageCode;
            $scope.transcripts = courseRepository.getCourseTranscript($routeParams.courseName, languageCode);
            userRepository.setPreferredLanguage(languageCode);
        };
    }]);