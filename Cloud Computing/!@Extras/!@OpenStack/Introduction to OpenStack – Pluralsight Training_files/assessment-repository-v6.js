"use strict";

pluralsightModule
    .service("AssessmentRepository", ['$resource', 'baseUrls', function ($resource, baseUrls) {
        return {
            getAssessmentById: function(assessmentId) {
                return $resource(baseUrls.dataUrl + "/assessmentplayer/assessment/" + assessmentId, {}, { get: { method: 'GET', withCredentials: true } })
                    .get({});
			},
            submitFeedbackAndAdvance: function(assessmentId, vote, comment) {
                return $resource(baseUrls.dataUrl + "/assessmentplayer/question/" + assessmentId, {}, { save: { method: 'POST', withCredentials: true } })
                    .save({ 'assessmentId': assessmentId, 'vote': vote, 'comment': comment }, function (data) { data.loaded = true; });
            },
            submitAnswer: function(assessmentId, selectedAnswer) {
                return $resource(baseUrls.dataUrl + "/assessmentplayer/answer/", {}, { save: { method: 'POST', withCredentials: true } })
                    .save({ 'assessmentId': assessmentId, 'selectedAnswer': selectedAnswer });
            },
            startSampleAssessment: function () {
                return $resource(baseUrls.dataUrl + "/assessment/sample", {}, { save: { method: 'PUT', withCredentials: true } })
                    .save({}, function (data) { data.loaded = true; });
            },
            startAssessment: function (courseName) {
                return $resource(baseUrls.dataUrl + "/assessment/" + courseName, {}, { save: { method: 'PUT', withCredentials: true } })
                    .save({}, function (data) { data.loaded = true; });
            },
            submitAssessmentFeedback: function(assessmentId, comment) {
                return $resource(baseUrls.dataUrl + "/assessmentplayer/feedback/", {}, { save: { method: 'POST', withCredentials: true } })
                    .save({ 'assessmentId': assessmentId, 'comment': comment });
            }
        };
    }]);
