"use strict";

pluralsightModule
    .service("TranslationRepository", ['$resource', 'baseUrls', function ($resource, baseUrls) {
        return {
            getTranslationLanguages: function() {
                return $resource(baseUrls.dataUrl + "/translation/languages").query();
            }
        };
    }]);
