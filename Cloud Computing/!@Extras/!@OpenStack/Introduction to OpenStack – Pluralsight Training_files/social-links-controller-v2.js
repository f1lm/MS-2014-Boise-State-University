"use strict";

pluralsightModule
    .controller("SocialLinksController", ['$scope', function($scope) {
        $scope.toggleFacebook = function () {
            var currentlyShown = $scope.showFacebook;
            hideAllSocialMediaLinks();
            $scope.showFacebook = !currentlyShown;
        };

        $scope.toggleTwitter = function() {
            var currentlyShown = $scope.showTwitter;
            hideAllSocialMediaLinks();
            $scope.showTwitter = !currentlyShown;
        };

        $scope.toggleGooglePlus = function() {
            var currentlyShown = $scope.showGooglePlus;
            hideAllSocialMediaLinks();
            $scope.showGooglePlus = !currentlyShown;
        };

        $scope.toggleLinkedIn = function() {
            var currentlyShown = $scope.showLinkedIn;
            hideAllSocialMediaLinks();
            $scope.showLinkedIn = !currentlyShown;
        };

        function hideAllSocialMediaLinks() {
            $scope.showFacebook = false;
            $scope.showTwitter = false;
            $scope.showGooglePlus = false;
            $scope.showLinkedIn = false;
        }
    }]);
