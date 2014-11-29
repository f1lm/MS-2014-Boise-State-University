var pluralsightModule = angular.module("pluralsightModule", ["ngResource", "ngRoute", "ipCookie", "duScroll"])
    .value('duScrollDuration', 300)     //default of 300 milliseconds for animated scrolling
    .run(function($location, $rootElement) {
        $rootElement.off('click');
    })
    .config(function($provide) {
        $provide.decorator('$exceptionHandler', function($delegate, $injector) {
            return function(exception) {
                var $rootScope = $injector.get('$rootScope');
                switch ($rootScope.exceptionMode) {
                    case '0':
                        throw exception;
                    case '1':
                    default:
                        setTimeout(function() {
                            throw exception;
                        }, 0);
                }
                return $delegate.apply(this, arguments);
            };
        });
    });