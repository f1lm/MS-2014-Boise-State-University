"use strict";

pluralsightModule
    .service("SocialRepository", ['$resource', 'baseUrls', function ($resource, baseUrls) {
        return {
            getSocialCounts: function () {
                var resource = $resource(baseUrls.dataUrl + "/social").get();
                return resource;
            }
        };
    }]);
