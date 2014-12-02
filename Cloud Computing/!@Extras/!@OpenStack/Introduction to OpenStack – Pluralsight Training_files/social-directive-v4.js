"use strict";
pluralsightModule
    .directive('social', function ($http, $templateCache, $compile) {
        return {
            restrict: 'A',
            scope: {
                socialData: '=',
                showFacebook: '=',
                showTwitter: '=?',
                showGooglePlus: '=?',
                showLinkedIn: '=?',
            },
            link: function (scope, element, attrs) {
                if (!attrs.showFacebook) scope.showFacebook = true;
                if (!attrs.showTwitter) scope.showTwitter = true;
                if (!attrs.showGooglePlus) scope.showGooglePlus = true;
                if (!attrs.showLinkedIn) scope.showLinkedIn = true;

                scope.$watch(function () { return hasSocialDataBeenLoaded(scope); },
                    function (newValue, oldValue) {
                        if (oldValue != newValue && scope.socialData.loaded) {
                            loadScriptFor('facebook', scope, element);
                            loadScriptFor('twitter', scope, element);
                            loadScriptFor('google-plus', scope, element);
                            loadScriptFor('linked-in', scope, element);
                        }
                    }
                );
            }
        };
        function hasSocialDataBeenLoaded(scope) {
            if (!scope.socialData) return false;
            return scope.socialData.loaded;
        }
        function loadScriptFor(socialNetwork, scope, element) {
            $http.get('/templates/course/_' + socialNetwork + '-script.html').success(function (facebookScript) {
                element.after($compile(facebookScript)(scope));
            });

        }
    });
