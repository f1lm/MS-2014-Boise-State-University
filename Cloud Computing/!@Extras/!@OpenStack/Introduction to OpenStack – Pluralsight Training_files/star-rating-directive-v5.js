"use strict";

pluralsightModule.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<span ng-class="{\'star-rating-small\': !canRateCourse}"></span>',
        replace: true,
        scope: {
            rate: '&',
            score: '=',
            userRated: '=',
            canRateCourse: '='
        },
        link: function (scope, element, attrs) {
            var redStarImage = '//s.pluralsight.com/mn/img/sh/star-red-v2.png';
            var yellowStarImage = '//s.pluralsight.com/mn/img/sh/star-yellow-v1.png';
            var greyStarImage = '//s.pluralsight.com/mn/img/sh/star-grey-v1.png';
            var halfStarImage = '//s.pluralsight.com/mn/img/sh/star-half-yellow-v2.png';

            function rate(rating) {
                scope.rate({ newRating: rating });
            }

            scope.$watch('score', function () {
                var starOnImage = scope.userRated ? redStarImage : yellowStarImage;
                element.raty({
                    path: '',
                    starOn: starOnImage,
                    starOff: greyStarImage,
                    starHalf: halfStarImage,
                    score: scope.score,
                    readOnly: !scope.canRateCourse,
                    hints: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
                    noRatedMsg: 'Not enough viewers have rated this course',
                    mouseover: function () {
                        if ($("#courseRating").data().settings.starOn.indexOf('-yellow-') != -1) {
                            $("#courseRating").raty('set', { starOn: redStarImage });
                        }
                    },
                    click: function(score) {
                        $("#courseRating").parent().unbind('mouseleave');
                        rate(score);
                    }
                });

                element.parent().bind('mouseleave', function() {
                    if (!scope.userRated) {
                        $("#courseRating").raty('set', { starOn: yellowStarImage, score: $("#courseRating").raty('getScore') });
                    }
                });
            });
        }
    };
});