"use strict";

pluralsightModule
    .service("BookmarkRepository", ['$resource', 'baseUrls', function ($resource, baseUrls) {
        return {
            get: function() {
                return $resource(baseUrls.dataUrl + "/bookmarks", {}, { getArray: { method: 'GET', withCredentials: true, isArray: true } }).getArray({}, function (data) { data.loaded = true; });
            },          
		    toggle: function (bookmarkToToggle) {
                return $resource(baseUrls.dataUrl + "/bookmarks/toggle", {}, { 'save': { method: 'POST', withCredentials: true } }).save(bookmarkToToggle);
		    },
		    'delete': function (bookmarkId) {
		        return $resource(baseUrls.dataUrl + "/bookmarks/delete/" + bookmarkId, {}, { 'delete': { method: 'DELETE', withCredentials: true } })['delete']();
            }
        };
    }]);
