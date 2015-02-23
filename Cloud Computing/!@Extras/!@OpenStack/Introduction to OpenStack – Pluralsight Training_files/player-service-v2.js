"use strict";

pluralsightModule
    .factory("PlayerService", ['$window', 'baseUrls', function ($window, baseUrls) {
        var playerWindowOptions = "width=1354,height=836,status=0,titlebar=0,scrollbars=0,menubar=0,toolbar=0,location=0,resizable=1";

        return {
            openPlayerUrl: function(playerUrl) {
                $window.open(playerUrl, "psplayer", playerWindowOptions);
            },
            openPlayer: function (author, module, clipIndex, course) {
                var playerUrl = buildUrl(author, module, clipIndex, course);
                $window.open(playerUrl, "psplayer", playerWindowOptions);
            }
        };

        function buildUrl(author, module, clipIndex, course) {
            return baseUrls.mainWebUrl + '/player?' + 'author=' + author + '&name=' + module + '&clip=' + clipIndex + '&course=' + course;
        }
    }]);