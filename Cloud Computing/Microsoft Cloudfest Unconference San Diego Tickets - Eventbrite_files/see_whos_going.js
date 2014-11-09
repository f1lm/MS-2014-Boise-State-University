/*
 * See Who's Going Module
 * requires EB.Facebook
 */

(function(EB, $){

    var

    ACCESS_TOKEN,
    FB_STATUS_CONNECTED = 'connected',

    TIMEOUT,
    TIMEOUT_DURATION = 5000,
    SETTINGS,
    SPLASH_HTML,
    SWG_URLS = {
        'default': '/ajax/social/see_whos_going',
        'small': '/ajax/social/see_whos_going_small'
    },
    SWG_ELEM = $('#see_whos_going'),
    VISIBILITY = $('.swg_visibility').val(),


    shareEvent = function(){
        if (EB.orderConf && EB.orderConf.event && EB.orderConf.event.href) {
            EB.Facebook.streamPublish({
                event: EB.orderConf.event
            });
        } else {
            var obj = {
                method: 'feed',
                display: 'popup',
                link: SETTINGS.shareUrl || window.location.href
            };

            if (typeof SETTINGS.description !== 'undefined') {
                // Description is capped at 10,000 characters.
                if (SETTINGS.description.length >= 10000) {
                    obj.description = SETTINGS.description.substring(0, 9996);
                    obj.description += "...";
                } else {
                    obj.description = SETTINGS.description;
                }
            }
            FB.ui(obj);
        }
    },

    loadHtml = function(){
        var params = {
                eid: SETTINGS.eventId,
                language: SETTINGS.language,
                has_perms: ACCESS_TOKEN ? 1 : 0,
                is_shareable: SETTINGS.isShareable
            },
            size = SETTINGS.size || 'default';

        if (SETTINGS.affiliate) { params.affiliate = SETTINGS.affiliate; }
        if (SETTINGS.internalReferrer) { params.iref = SETTINGS.internalReferrer; }

        if (SETTINGS.isSwgPreview && SETTINGS.eventId == null) {
            clearTimeout(TIMEOUT);
            SWG_ELEM.find('.panel_body').removeClass('splash');
            SWG_ELEM.find('.panel_body').html($('#swg_preview'));
            $('#see_whos_going .panel_head2 h3').append(' (' + gettext('Example') + ')');
            $('#swg_preview').removeClass('hidden');
        } else {
            $.post(SWG_URLS[size], params, function(html){
                clearTimeout(TIMEOUT);
                TIMEOUT = null;
                SWG_ELEM.html(html);
            });
        }
    },

    loadError = function(){
        var message = gettext('Oops! We\'re having trouble connecting to Facebook.');
        message += ' ' + gettext('Please <a class="swg_retry" href="javascript:void(0)">try again</a>.');
        SWG_ELEM.find('.panel_body').addClass('splash').html(message);
    },

    load = function(){
        EB.Facebook.getLoginStatus(function(response){
            if (response && (response.status === FB_STATUS_CONNECTED)) {
                ACCESS_TOKEN = response.authResponse.accessToken;
                loadHtml();
            } else {
                loadHtml();
            }
        });
    },

    init = function(){
        SWG_ELEM.delegate('.swg_connect', 'click', function(e){
            EB.Analytics.analyticsAction(
                'SWGClickAction',
                {public_event_id: SETTINGS.eventId,
                 internal_referrer: SETTINGS.internalReferrer
                }, {}
            );

            EB.Facebook.login(

                function(response) {

                    if (response.status === FB_STATUS_CONNECTED) {
                        EB.Analytics.analyticsAction(
                            'SWGConnectedAction',
                            {public_event_id: SETTINGS.eventId,
                             internal_referrer: SETTINGS.internalReferrer
                            }, {}
                        );
                    }

                }
            );
        });
        SWG_ELEM.delegate('.swg_disconnect', 'click', function(e){
            EB.Facebook.logout();
        });
        SWG_ELEM.delegate('.person.friend', 'click', function(e){
            window.open('http://www.facebook.com/profile.php?id=' + $(this).attr('data-id'));
        });
        SWG_ELEM.delegate('.facebook_button', 'click', shareEvent);
        SWG_ELEM.delegate('.more a', 'click', function(e){
            SWG_ELEM.find('.people').css('max-height', 'none');
            $(this).parent().remove();
        });
        EB.SocialSettings.change(load);
        FB.Event.subscribe('auth.authResponseChange', function(response) {
            if (!TIMEOUT) {
                load();
            }
        });
        load();
    };

    EB.Swg = {
        init: function(settings){
            SETTINGS = settings;
            SPLASH_HTML = SWG_ELEM.html();
            TIMEOUT = setTimeout(loadError, TIMEOUT_DURATION);
            SWG_ELEM.delegate('.swg_retry', 'click', function(e){
                SWG_ELEM.html(SPLASH_HTML);
                TIMEOUT = setTimeout(loadError, TIMEOUT_DURATION);
                EB.Swg.init(SETTINGS);
            });
            EB.Facebook.ready(function(){
                init();
            });
        }
    };


})((window.EB = window.EB || {}), window.jQuery);
