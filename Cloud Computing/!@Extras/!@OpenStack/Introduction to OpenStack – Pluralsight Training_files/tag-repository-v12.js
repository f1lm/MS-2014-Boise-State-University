"use strict";

pluralsightModule
    .service("TagRepository", ['$resource', '$q', 'tagUrlFilter', 'baseUrls', function ($resource, $q, tagUrlFilter, baseUrls) {
        return {
            getPopularTags: function () {
                var deferred = $q.defer();
                $resource(baseUrls.dataUrl + "/tags/popular").get(function (data) { data.loaded = true; deferred.resolve(data); });
                return deferred.promise;
            },
            getTopTags: function () {
                return $resource(baseUrls.dataUrl + "/tags/top").query();
            },
            searchAllTags: function (searchTerm, pageNumber, pageSize, sortOrder) {
                var deferred = $q.defer();
                $resource(baseUrls.dataUrl + "/tags/search/" + tagUrlFilter(searchTerm) + "/" + pageNumber + "?pageSize=" + pageSize + "&sortOrder=" + sortOrder).get(function (data) { data.loaded = true; deferred.resolve(data); });
                return deferred.promise;
            },
            get: function (tagUrl) {
                return $resource(baseUrls.dataUrl + "/tag/" + tagUrlFilter(tagUrl)).get();
            },
            getRelatedTags: function (tagNames, level) {
                return $resource(baseUrls.dataUrl + "/tags/related/" + tagUrlFilter(tagNames.join(',')) + "?level=" + level).query();
            },
            getTagNames: function (tagNames) {
                return $resource(baseUrls.dataUrl + "/tags/tagnames/" + tagUrlFilter(tagNames)).get();
            }
        };
    }]);
