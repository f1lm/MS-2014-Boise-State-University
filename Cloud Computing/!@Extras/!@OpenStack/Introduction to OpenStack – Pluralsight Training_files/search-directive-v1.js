'use strict';

pluralsightModule
    .directive('search', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/search/search.html',
            controller: 'SearchElementController',
            controllerAs: 'searchController',
            scope: {
                placeholder: '@?'
            },
        };
    }).controller("SearchElementController", [
        '$scope', '$window', 'baseUrls', function ($scope, $window, baseUrls) {
            this.placeholderText = $scope.placeholder ? $scope.placeholder : 'Search our library...';
            this.search = function (searchTerm) {
                var encodedTerm = searchTerm
                    ? encodeURIComponent(searchTerm)
                    : '';
                $window.location.href = baseUrls.staticUrl + "/search/?searchTerm=" + encodedTerm;
            };
        }
    ]);


