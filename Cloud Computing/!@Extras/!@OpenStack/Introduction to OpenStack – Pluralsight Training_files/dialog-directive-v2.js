pluralsightModule
    .directive('dialog', function () {
        return {
            restrict: 'A',
            template: '<div ng-transclude class="reveal-modal tiny"></div>',
            replace: true,
            transclude:true,
            scope: {
                show: '='
            },
            link: function (scope, element) {
                var initialized = false;
                scope.$watch('show', function (newValue, oldValue) {
                    if (oldValue != newValue) {
                        if (newValue) {
                            $(element).foundation('reveal', 'open');
                            initialized = true;
                        } else {
                            if (initialized) {
                                $(element).foundation('reveal', 'close');
                            }
                        }
                    }
                });
            }
        };
    });
