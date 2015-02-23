pluralsightModule.filter('tagUrl', function() {
        return function(urlToEncode) {
            return encodeURIComponent(urlToEncode).replace(/\./g, '%2E');
        };
    }
);