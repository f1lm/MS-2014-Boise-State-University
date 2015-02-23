"use strict";
pluralsightModule.controller("FooterController", ['$scope', 'SocialRepository', 'GoogleDataLayerService', function ($scope, $socialRepository, googleDataLayerService) {
    $scope.social = $socialRepository.getSocialCounts();

    $scope.newsletterEmailFocus = function() {
        googleDataLayerService.pushVpv({ substep: 'form_start' }, true);
    };
}]);