"use strict";

pluralsightModule
    .factory("BookmarkService", ['BookmarkRepository', '$q', function(bookmarkRepository, $q) {
        return {
            toggleBookmark: function (course, module, clip) {
                var objectToBookmark = getObjectToBookmark(course, module, clip);
                
                var moduleInfo = getModuleInfo(module);
                
                objectToBookmark.isBookmarked = !objectToBookmark.isBookmarked;

                var deferred = $q.defer();
                var bookmarkToToggle = { courseName: course.name, moduleName: moduleInfo.name, moduleAuthor: moduleInfo.author, clipName: clip ? clip.name : "", displayName: objectToBookmark.title };
                bookmarkRepository.toggle(bookmarkToToggle).$promise.then(function () { }, function (response) { objectToBookmark.isBookmarked = !objectToBookmark.isBookmarked; deferred.reject(response.data); });
                return deferred.promise;
            }
        };
        
        function getObjectToBookmark(course, module, clip) {
            if (clip)
                return clip;
            if (module)
                return module;
            return course;
        }

        function getModuleInfo(module) {
            if (!module) {
                return {
                    author: "",
                    name: ""
                };
            }
                
            var pieces = module.moduleRef.split('/');

            return {
                author: pieces[0],
                name: pieces[1]
            };  
        }
    }]);