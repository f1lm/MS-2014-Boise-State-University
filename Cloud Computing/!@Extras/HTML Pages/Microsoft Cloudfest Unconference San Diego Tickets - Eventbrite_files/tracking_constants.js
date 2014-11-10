/*
    Dummy Omniture Object:

    Omniture's s object is defined in s_code_eventbrite.js. Our templates expect
    to be able to attach properties to an s object and call its tracking functions.

    s_code_eventbrite.js is not included on the page when the Omniture feature flag is off,
    we will define a dummy s here.
*/

window.OmnitureEventsMap = {
    'MY_TICKETS_AD_CLICK': 'event26',
    'CREATE_EVENT_HEADER_CLICK': 'event32',
    'LAND_ON_CREATE_FROM_HEADER': 'event33',
    'FIND_EVENTS_HEADER_CLICK': 'event34',
    'LAND_ON_REGISTER_FROM_HEADER': 'event35',
    'ORGANIZER_MODULE_PROFILE_CLICK': 'event36',
    'ORGANIZER_MODULE_PAST_EVENTS_CLICK': 'event37',
    'ORGANIZER_MODULE_UPCOMING_EVENTS_CLICK': 'event38',
    'NEW_CREATE_TOP_PREVIEW_CLICK': 'event39',
    'NEW_CREATE_BOTTOM_PREVIEW_CLICK': 'event40',
    'NEW_CREATE_EXPERT_TIPS_CLICK': 'event41',
    'NEW_CREATE_TICKET_TIPS_CLICK': 'event42',
    'NEW_CREATE_PROMOTE_TIPS_CLICK': 'event43',
    'NEW_CREATE_COLORS_AND_OPTIONS_CLICK': 'event44',
    'NEW_CREATE_TICKET_SETTINGS_CLICK': 'event45',
    'NEW_CREATE_EVENT_DESCRIPTION_ADD_FAQ_CLICK': 'event46',
    'NEW_CREATE_MANAGE_CLICK': 'event57',
    'NEW_CREATE_OPT_IN': 'event59',
    'PERSISTENT_NAV_MANAGE_EDIT_CLICK': 'event55',
    'PERSISTENT_NAV_MANAGE_DESIGN_CLICK': 'event56',
    'PERSISTENT_NAV_MAKE_EVENT_LIVE_MANAGE': 'event58',
    'MANAGE_SIDENAV_OPEN_INFO_DIALOG': 'event47',
    'MANAGE_SIDENAV_CLOSE_INFO_DIALOG': 'event48',
    'MANAGE_SIDENAV_CLICK_DISABLED_TAB': 'event49',
    'MANAGE_SIDENAV_MAKE_EVENT_LIVE': 'event50',
    'LAND_ON_REGISTER_FROM_LOCAL_PAGE': 'event51',
    'LAND_ON_REGISTER_FROM_A/B_TEST': 'event52',
    'FIND_EVENTS_FROM_EXPIRED_EVENT_CLICK': 'event53',
    'CREATE_FROM_EXPIRED_EVENT_CLICK': 'event54',
    'NEW_CREATE_BODY_MAKE_EVENT_LIVE_CLICK': 'event65',
    'MIGRATION_LIGHTBOX_NOT_IN_COUNTRY_CLICK': 'event66',
    'MIGRATION_LIGHTBOX_NO_THANKS_CLICK': 'event67',
    'MIGRATION_LIGHTBOX_GO_NOW_CLICK': 'event68',
    'MIGRATION_LIGHTBOX_OPEN': 'event69',
    'MYEVENTS_CROSS_SEARCH': 'event70'
};

window.s = {
    t: function() {
        return false;
    },
    tl: function() {
        return false;
    },
    getQueryParam: function(s) {
        return false;
    }
};

window.linkPrintTicket = function() {
    return false;
};

window.autoSearch = function() {
    return false;
};

window.linkCreateEvent = function() {
    return false;
};

window.linkEventStatus = function() {
    return false;
};

window.OmnitureHelper = {
    track: function(tracking_code) {
        window.s.events = tracking_code;
        window.s.tl();
    },
    isReferredByEventEditPage: function() {
        return typeof document.referrer === 'string' &&
                (document.referrer.search(/\/create/) !== -1 || // came from create
                document.referrer.search(/\/edit\?eid/) !== -1 || // or edit
                document.referrer.search(/\/try-eventbrite/) !== -1); // or try-eventbrite
    }
};
