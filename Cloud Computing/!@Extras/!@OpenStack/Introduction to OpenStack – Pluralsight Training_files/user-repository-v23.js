"use strict";

pluralsightModule
    .service("UserRepository", ['$resource', 'baseUrls', function ($resource, baseUrls) {
        return {
            getBasicInfo: function (success) {
                var resource = $resource(baseUrls.dataUrl + "/user/basicinfo", {}, { 'get': { method: 'GET', withCredentials: true } }).get(function (data) {
                    data.loaded = true;
                    success(data);
                });
                return resource;
            },
            getCourseHistory: function (count) {
                var relativeUrl = "/user/history";
                if (count) {
                    relativeUrl = relativeUrl + "/" + count;
                }
                var resource = $resource(baseUrls.dataUrl + relativeUrl, {}, { getArray: { method: 'GET', withCredentials: true, isArray: true } }).getArray({}, function (data) { data.loaded = true; });
                return resource;
            },
            signOut: function (returnUrl) {
                return $resource(baseUrls.dataUrl + "/user/signout", { returnUrl: returnUrl }, { 'save': { method: 'POST', withCredentials: true } }).save();
            },
            getPreferredLanguage: function () {
                return $resource(baseUrls.dataUrl + "/user/preferredlanguage", {}, { get: { method: 'GET', withCredentials: true } }).get();
            },
            setPreferredLanguage: function (language) {
                $resource(baseUrls.dataUrl + "/user/preferredlanguage/" + language, {}, { save: { method: 'POST', withCredentials: true } }).save();
            },
            getAccountInfo: function() {
                return $resource(baseUrls.dataUrl + "/user/account", {}, { get: { method: 'GET', withCredentials: true } }).get({}, function (data) { data.loaded = true; });
            },
            getChangeSubscriptionInfo: function() {
                return $resource(baseUrls.dataUrl + "/user/changesubscription", {}, { get: { method: 'GET', withCredentials: true } }).get();
            },
            getConfirmSubscriptionChangeInfo: function(sku) {
                return $resource(baseUrls.dataUrl + "/user/confirmsubscriptionchange/" + sku, {}, { get: { method: 'GET', withCredentials: true } }).get();
            },
            confirmChangeSubscription: function(sku) {
                return $resource(baseUrls.dataUrl + "/user/confirmsubscriptionchange", {}, { save: { method: 'POST', withCredentials: true } }).save({ sku: sku });
            },
            toggleAutoRenew: function () {
                return $resource(baseUrls.dataUrl + "/user/toggleautorenew", {}, { toggle: { method: 'POST', withCredentials: true } }).toggle();
            },
            updatePassword: function (oldPassword, newPassword) {
                return $resource(baseUrls.dataUrl + "/user/updatepassword", {}, { 'save': { method: 'PUT', withCredentials: true, responseType: 'json' } }).save({ 'old': oldPassword, 'new': newPassword });
            }
        };
    }]);
