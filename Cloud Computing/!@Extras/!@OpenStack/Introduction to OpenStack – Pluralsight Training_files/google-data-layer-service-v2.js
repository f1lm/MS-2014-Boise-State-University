"use strict";

pluralsightModule
    .factory("GoogleDataLayerService", function () {
        function pushInternal(attributes) {
            window.dataLayer = window.dataLayer || [];

            window.dataLayer.push(attributes);
        }

        return {
            pushVpv: function (attributes, isEvent) {
                var attributesAndEvent = { vpvAttributes: attributes };

                if (isEvent) {
                    attributesAndEvent.event = 'vpvEvent';
                }

                pushInternal(attributesAndEvent);
            },
            push: function(attributes) {
                pushInternal(attributes);
            }
        };
    });