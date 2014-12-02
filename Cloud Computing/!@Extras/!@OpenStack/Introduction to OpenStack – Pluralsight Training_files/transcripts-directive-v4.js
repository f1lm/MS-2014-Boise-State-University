"use strict";

function openPlayerFromTranscript(playerParameters, displayTime, mainWebUrl) {
    var playerWindowOptions = "width=1354,height=836,status=0,titlebar=0,scrollbars=0,menubar=0,toolbar=0,location=0,resizable=1";
    window.open(getPlayerUrlForTranscript(playerParameters, displayTime, mainWebUrl), "psplayer", playerWindowOptions);
};

function getPlayerUrlForTranscript(playerParameters, displayTime, mainWebUrl) {
    if (displayTime) {
        return mainWebUrl + "/player?" + playerParameters + "&start=" + displayTime;
    }
    return mainWebUrl + "/player?" + playerParameters;

}

pluralsightModule.directive('transcripts', ['baseUrls', function (baseUrls) {
    return {
        restrict: 'A',
        scope: {
            clip: '='
        },
        compile: function() {
            return function (scope, element) {
                for (var i = 0; i < scope.clip.transcripts.length; i++) {
                    var link = '<a class="clipTranscript" href="javascript:openPlayerFromTranscript(\'' + scope.clip.playerParameters + '\', ' + scope.clip.transcripts[i].displayTime + ',\'' + baseUrls.mainWebUrl + '\')">' + scope.clip.transcripts[i].text + ' </a>';

                    element.append(link);
                }
            };
        }
    };

}]);