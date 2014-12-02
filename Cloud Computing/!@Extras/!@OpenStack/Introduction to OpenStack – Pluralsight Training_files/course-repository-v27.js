"use strict";

pluralsightModule
    .service("CourseRepository", ['$resource', '$http', '$q', 'tagUrlFilter', 'baseUrls', function ($resource, $http, $q, tagUrlFilter, baseUrls) {
        return {
            getPopular: function() {
                return $resource(baseUrls.dataUrl + "/courses/popularmin", {}, { getArray: { method: 'GET', isArray: true } }).getArray();
            },
            getAllPopularCourses: function() {
                return $resource(baseUrls.dataUrl + "/courses/popular", {}, { getArray: { method: 'GET', isArray: true, withCredentials: true } }).getArray();
            },
            getNewReleases: function() {
                return $resource(baseUrls.dataUrl + "/courses/newmin", {}, { getArray: { method: 'GET', isArray: true } }).getArray();
            },
            getAllNewReleases: function() {
                return $resource(baseUrls.dataUrl + "/courses/new", {}, { getArray: { method: 'GET', isArray: true, withCredentials: true } }).getArray();
            },
            get: function(courseName) {
                return $resource(baseUrls.dataUrl + "/course/" + courseName, {}, { get: { method: 'GET', withCredentials: true } }).get({}, function (data) { data.loaded = true; });
            },
            getCourseContent: function(courseName) {
                return $resource(baseUrls.dataUrl + "/course/content/" + courseName, {}, { getArray: { method: 'GET', isArray: true, withCredentials: true } }).getArray();
            },
            getCourseAuthors: function(courseName) {
                return $resource(baseUrls.dataUrl + "/course/authors/" + courseName, {}, { getArray: { method: 'GET', isArray: true } }).getArray();
            },
            getCourseRelationships: function (courseName) {
                return $resource(baseUrls.dataUrl + "/course/relationships/" + courseName, {}, { getArray: { method: 'GET', isArray: true } }).get();
            },
            rateCourse: function (courseName, rating) {
                return $resource(baseUrls.dataUrl + "/course/ratecourse/" + courseName + "/" + rating, {}, { 'save': { method: 'POST', withCredentials: true} }).save();
            },
            getCourseTranscript: function(courseName, languageCode) {
                return $resource(baseUrls.dataUrl + "/course/transcript/" + courseName + "/" + languageCode, {}, { get: { method: 'GET', withCredentials: true } }).get({}, function (data) { data.loaded = true; });
            },
            getExerciseFilesInfo: function (courseName) {
                return $resource(baseUrls.dataUrl + "/course/exercisefiles/" + courseName, {}, { get: { method: 'GET', withCredentials: true } }).get({}, function (data) { data.loaded = true; });
            },
            getAssessmentInfo: function (courseName) {
                return $resource(baseUrls.dataUrl + "/course/assessment/" + courseName, {}, { get: { method: 'GET', withCredentials: true } }).get({}, function (data) { data.loaded = true; });
            },                   
            getCoursesByTags: function(tags, pageNumber, pageSize, sort, level) {
                return $resource(baseUrls.dataUrl + "/courses/tags?id=" + tagUrlFilter(tags.join(',')) + "&page=" + pageNumber +  "&pageSize=" + pageSize + "&sort=" + sort + "&level=" + level, {}, { get: { method: 'GET', withCredentials: true } }).get();
            },
            getExerciseFileUrl: function (courseName) {
                return $resource(baseUrls.dataUrl + "/course/exercisefileredirector/" + courseName, {}, { get: { method: 'GET', withCredentials: true } }).get();
	        },
            getSocialData: function (courseName) {
                var resource = $resource(baseUrls.dataUrl + "/course/social/" + courseName).get({}, function (data) { data.loaded = true; });
                return resource;
            },
            getLivefyreScript: function(courseName) {
                var deferred = $q.defer();
                $http.get(baseUrls.dataUrl + "/course/livefyre/" + courseName, { withCredentials: true }).success(function (data) { deferred.resolve(data); });
                return deferred.promise;
            }
        };
    }]);
