/*!
* @file magnet.ecom.js
* @author Paul Bronshteyn
* @comment Built by a geek loaded on caffeine ...
* @copyright (c) Conde Nast Digital
*/

if (typeof window.CN === 'undefined') {
    window.CN = {};
}

/**
* @class CN ECommerce Interface
* @description Collection of ecommerce helper function
* @public
* @author Paul Bronshteyn
*/
CN.ecom = CN.ecom || {};

/**
* @class CN Rollover ecommerce placement.
* @description Helper functions to control rollover ecommerce placements.
* @public
* @author Paul Bronshteyn
*
* @example
    <!-- Rollover Ad Decorator Code -->
    <jsp:include page="/WEB-INF/pages/magnet-presentation/ecom/rolloverAd.jsp">
        <jsp:param name="targeter" value="header" />
    </jsp:include>

    <!-- Rollover Ad Template-->
    <div id="rolloverAd">
        <div id="rolloverAd_header">
            <a href="#">Close</a>
        </div>
        <div id="rolloverAd_content">
            <jsp:include page="/WEB-INF/pages/clearcase/xmlcontent/includes/ecomPlacement.jsp">
                <jsp:param name="name" value="${param.targeter}" />
                <jsp:param name="callback" value="func: CN.ecom.rolloverAd.init" />
            </jsp:include>
        </div>
        <div id="rolloverAd_footer"></div>
    </div>

    <!-- Rollover Ad CSS -->
    #rolloverAd {
        position: absolute;
        width: 308px;
        z-index: 9999;
        display: none;
    }

    #rolloverAd_header {
        height: 20px;
        background: #E85F1B;
        text-align: right;
    }

    #rolloverAd_header a {
        line-height: 20px;
        margin-right: 5px;
        font-size: 0.8em;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;

        <!-- Close button image if needed -->
        background: url('/images/nocount/close.gif') center right no-repeat;
        padding-right: 15px;
    }

    #rolloverAd_header a:hover {
        text-decoration: underline;
    }

    #rolloverAd_content {
        background: #fff;
        border: 1px solid #680020;
        overflow: hidden;
    }

    #rolloverAd_footer {
        height: 20px;
        background: #E85F1B;
    }

    <!-- Rollover Ad ATG Request -->
    <!-- This should be the result code for the placement on the page -->
    <script type="text/javascript">
        CN.ecom.request({ pid: 'rolloverAd_content', tgt: 'targeter_passed_by_jsp', params: {} });
    </script>
*/
CN.ecom.rolloverAd = (function($) {
    var
        /**
        * Rollover enabled flag
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type boolean
        */
        enabled = true,

        /**
        * Default id rollover ad container element
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type object
        */
        defaultId = 'rolloverAd',

        /**
        * Rollover ad container element
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type object
        */
        container = {},

        /**
        * Rollover ad trigger element
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type object
        */
        trigger = {},

        /**
        * Auto close timeout in seconds
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type integer
        * @default 10
        */
        timeout = 10,

        /**
        * Timer
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type timer
        */
        timer,

        /**
        * Showing flag
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type boolean
        * @default false
        */
        showing = { 'rolloverAd': false },

        /**
        * Container top offset
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type integer
        * @default 0
        */
        offsetTop = 0,

        /**
        * Container left offset
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @type integer
        * @default 0
        */
        offsetLeft = 0,

        /**
        * Show rollover ad and set the timer
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        showAd = function(e, id) {
            if (showing[id]) {
                return;
            }

            showing[id] = true;

            trigger[id] = $(e.target);
            var o = trigger[id].offset();

            container[id].css({ top: (o.top + trigger[id].height() + offsetTop), left: (o.left + offsetLeft) }).show();

            timer = setTimeout(function() {
                closeAd(e, id);
            }, timeout * 1000);

            $(window).bind('resize', { id: id }, onResize);
        },

        /**
        * On window resize
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        onResize = function(e) {
            var o = trigger[e.data.id].offset();
            container[e.data.id].css({ top: (o.top + trigger[e.data.id].height() + offsetTop), left: (o.left + offsetLeft) });
        },

       /**
        * Close rollover ad and clear the timer
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        closeAd = function(e, id) {
            var
                ad;
            if (!id && !e) {
                for (ad in container) {
                    container[ad].hide();
                    showing[ad] = false;
                }
            }
            else {
                id = id || e.data.id;
                container[id].hide();
                showing[id] = false;
            }

            onClearTimeout();
        },

        /**
        * Close event triggered by inner content click or close button click.
          Stops all other events from fireing and closes the ad.
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        closeEvent = function(e) {
            closeAd(e);
            if (!e.target.href || e.target.href.indexOf('#') > -1) {
                e.stopImmediatePropagation();
                return false;
            }
        },

        /**
        * On Clear Timeout event
        * @memberOf CN.ecom.rolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        onClearTimeout = function(e) {
            clearTimeout(timer);
        }

    /**
    * @scope CN.ecom.rolloverAd
    */
    return {
        /**
        * Initiate rollover placement
        * @return {object} CN.ecom.rolloverAd
        *
        * @example
            Initiate floating ad.
            CN.ecom.rolloverAd.init();
        */
        init: function(id) {

            id = id || defaultId;

            if (enabled) {
                $('#' + id + '_show,#logo-link-a,.showForm,#global_navBar a,#header-subscribe a').live('mouseover', function(e) {
                    showAd(e, id);
                });

                container[id] = $('#' + id);
                showing[id] = false;

                var frm = container[id].bind('click mousedown keypress', onClearTimeout).find('form');

                container[id].find('#' + id + '_header,#' + id + '_footer').bind('mousedown', onClearTimeout)
                    .find('a')
                    .bind('click', { id: id }, closeEvent);

                if (frm.length) {
                    frm.bind('reset', { id: id }, closeAd);
                } else {
                    container[id].find('#' + id + '_content a').bind('click', { id: id }, closeAd);
                }
            }

            return this;
        },

        /**
        * Enable/Disable rollover ad
        * @param {boolean} setting Rollover ad enable setting
        * @return {object} CN.ecom.rolloverAd
        */
        setRollover: function(setting) {
            enabled = setting === true;
            return this;
        },

        /** Making closeAd public **/
        closeAd : closeAd,

        /**
        * Set layer offset from the element triggering the show
        * @param {integer} top Number of pixels to offset top of the element
        * @param {integer} left Number of pixels to offset left of the element
        * @return {object} CN.ecom.rolloverAd
        * @uses CN.utils.intval
        *
        * @example
            Set arrival and exiting cookie life
            CN.ecom.rolloverAd.setOffset(0, -29); <-- Glamour
            CN.ecom.rolloverAd.setOffset(0, -306); <-- New Yorker
        */
        setOffset: function(top, left) {
            offsetTop = CN.utils.intval(top);
            offsetLeft = CN.utils.intval(left);
            return this;
        },

        /**
        * Set auto close timeout in seconds
        * @param {integer} seconds Timeout
        * @return {object} CN.ecom.rolloverAd
        * @uses CN.utils.intval
        *
        * @example
            Set arrival and exiting cookie life
            CN.ecom.rolloverAd.timeout(15);
        */
        timeout: function(seconds) {
            timeout = CN.utils.intval(seconds) || timeout;
            return this;
        }
    }
})(jQuery);

/** Video Layer Form **/

CN.ecom.videoRolloverAd = (function($M) {
    var
        /**
        * Rollover enabled flag
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type boolean
        */
        enabled = true,

        /**
        * Rollover ad container element
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type object
        */
        container,

        /**
        * Rollover ad trigger element
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type object
        */
        trigger,

        /**
        * Auto close timeout in seconds
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type integer
        * @default 10
        */
        timeout = 10,

        /**
        * Timer
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type timer
        */
        timer,

        /**
        * Showing flag
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type boolean
        * @default false
        */
        showing = false,

        /**
        * Container top offset
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type integer
        * @default 0
        */
        offsetTop = 0,

        /**
        * Container left offset
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @type integer
        * @default 0
        */
        offsetLeft = 0,

        /**
        * Show rollover ad and set the timer
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @event
        */
        showAd = function() {
            if (showing) {
              return;
            }
            showing = !showing;
            trigger = jQuery(this);
            var o = trigger.offset();
            container.show('slow');
            timer = setTimeout(closeAd, timeout * 1000);
        },

        /**
        * Close rollover ad and clear the timer
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        */
        closeAd = function() {
            container.hide('slow');
            clearTimeout(timer);
            showing = !showing;
        },

        /**
        * Close event triggered by inner content click or close button click.
          Stops all other events from fireing and closes the ad.
        * @memberOf CN.ecom.videoRolloverAd
        * @private
        * @event
        * @param {object} e Window event
        */
        closeEvent = function(e) {
            closeAd();
            if (!this.href || this.href.indexOf('#') > -1) {
                e.stopImmediatePropagation();
                return false;
            }
        }

    /**
    * @scope CN.ecom.videoRolloverAd
    */
    return {
        /**
        * Initiate rollover placement
        * @return {object} CN.ecom.videoRolloverAd
        *
        * @example
            Initiate floating ad.
            CN.ecom.videoRolloverAd.init();
        */
        init: function() {
            if (enabled) {
                jQuery('#video_utilities').live('mouseover', showAd);
                container = jQuery('#videoRolloverAd');

                var frm = container.bind('click mousedown keypress', function() {
                    clearTimeout(timer);
                }).find('form');

                jQuery('#videoRolloverAd_header,#videoRolloverAd_footer', container).bind('mousedown', function() {
                    clearTimeout(timer);
                }).find('a').bind('click', closeEvent);

                if (frm.length) {
                    frm.bind('reset', closeAd);
                } else {
                    jQuery('#videoRolloverAd_content a', container).bind('click', closeEvent);
                }
            }

            return this;
        },

        /**
        * Enable/Disable rollover ad
        * @param {boolean} setting Rollover ad enable setting
        * @return {object} CN.ecom.videoRolloverAd
        */
        setRollover: function(setting) {
            enabled = setting;
            return this;
        },

        /**
        * Set layer offset from the element triggering the show
        * @param {integer} top Number of pixels to offset top of the element
        * @param {integer} left Number of pixels to offset left of the element
        * @return {object} CN.ecom.videoRolloverAd
        * @uses CN.utils.intval
        *
        * @example
            Set arrival and exiting cookie life
            CN.ecom.videoRolloverAd.setOffset(0, -29); <-- Glamour
            CN.ecom.videoRolloverAd.setOffset(0, -306); <-- New Yorker
        */
        setOffset: function(top, left) {
            offsetTop = $M.utils.intval(top);
            offsetLeft = $M.utils.intval(left);
            return this;
        },

        /**
        * Set auto close timeout in seconds
        * @param {integer} seconds Timeout
        * @return {object} CN.ecom.videoRolloverAd
        * @uses CN.utils.intval
        *
        * @example
            Set arrival and exiting cookie life
            CN.ecom.videoRolloverAd.timeout(15);
        */
        timeout: function(seconds) {
            timeout = $M.utils.intval(seconds) || timeout;
            return this;
        }
    }
})(CN);

/**
* @class Floating ecommerce placement.
* @description Helper functions to control floating ecommerce placements
* @public
* @author Paul Bronshteyn
*
* @example
    <!-- Floating Ad Decorator Code -->
    <jsp:include page="/WEB-INF/pages/magnet-presentation/ecom/floatingAd.jsp" />

    <!-- Floating Ad Template -->
    <div id="floatingAd">
        <div id="floatingAd_header">
            <a href="#">Close</a>
        </div>
        <div id="floatingAd_content">
            <jsp:include page="/WEB-INF/pages/clearcase/xmlcontent/includes/ecomPlacement.jsp">
                <jsp:param name="name" value="popUp_floatingAd" />
            </jsp:include>
        </div>
    </div>

    <!-- Floating Ad CSS -->
    #floatingAd {
        position: absolute;
        width: 308px;
        z-index: 9999;
        display: none;
        left: 50%;
        top: 95px;
        margin-left: -158px;
    }

    #floatingAd_header {
        height: 20px;
        background: #E85F1B;
        text-align: right;
    }

    #floatingAd_header a {
        line-height: 20px;
        margin-right: 5px;
        font-size: 0.8em;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;

        <!-- Close button image if needed -->
        background: url('/images/nocount/close.gif') center right no-repeat;
        padding-right: 15px;
    }

    #floatingAd_header a:hover {
        text-decoration: underline;
    }

    #floatingAd_content {
        background: #fff;
        border: 1px solid #680020;
        overflow: hidden;
    }

    <!-- Floating Ad ATG Request -->
    <!-- This should be the result code for the placement on the page -->
    <script type="text/javascript">
        CN.ecom.request({ pid: 'floatingAd_content', tgt: 'GLM_popUp_floatingAd', params: {} });
    </script>
*/
CN.ecom.floatingAd = (function($M) {
    var
        /**
        * Floating ad container
        * @memberOf CN.ecom.floatingAd
        * @private
        * @type object
        */
        container,

        /**
        * Auto close timeout in seconds
        * @memberOf CN.ecom.floatingAd
        * @private
        * @type integer
        * @default 15
        */
        timeout = 15,

        /**
        * Timer
        * @memberOf CN.ecom.floatingAd
        * @private
        * @type timer
        */
        timer,

        /**
        * Show floating ad and set the timer
        * @memberOf CN.ecom.floatingAd
        * @private
        */
        showAd = function() {
            container.show();
            timer = setTimeout(closeAd, timeout * 1000);
        },

        /**
        * Close floating ad and clear the timer
        * @memberOf CN.ecom.floatingAd
        * @private
        * @event
        */
        closeAd = function() {
            container.hide();
            clearTimeout(timer);
        },

        /**
        * Close event triggered by inner content click or close button click.
          Stops all other events from fireing and closes the ad.
        * @memberOf CN.ecom.floatingAd
        * @private
        * @event
        * @param {object} e Window event
        */
        closeEvent = function(e) {
            closeAd();
            if (!this.href || this.href.indexOf('#') > -1) {
                e.stopImmediatePropagation();
                return false;
            }
        }

    /**
    * @scope CN.ecom.floatingAd
    */
    return {
        /**
        * Initiate CN Floating Ad
        * @return {object} CN.ecom.floatingAd
        *
        * @example
            Initiate floating ad.
            CN.ecom.floatingAd.init();
        */
        init: function() {
            jQuery(function() {
                container = jQuery('#floatingAd');

                if (!container.length) {
                    return this;
                }

                var frm = container.bind('click mousedown keypress', function() {
                    clearTimeout(timer);
                }).find('form');

                jQuery('#floatingAd_header', container).bind('mousedown', function() {
                    clearTimeout(timer);
                }).find('a').bind('click', closeEvent);

                if (frm.length) {
                    frm.bind('reset', closeAd);
                } else {
                    jQuery('#floatingAd_content a', container).bind('click', function(e) {
                        e.stopImmediatePropagation();
                        closeAd();
                    });
                }

                showAd();
            });

            return this;
        },

        /**
        * Set auto close timeout in seconds
        * @param {integer} seconds Timeout
        * @return {object} CN.ecom.floatingAd
        * @uses CN.utils.intval
        *
        * @example
            Set arrival and exiting cookie life
            CN.ecom.floatingAd.timeout(15);
        */
        timeout: function(seconds) {
            timeout = $M.utils.intval(seconds) || timeout;
            return this;
        }
    }
})(CN);


/* START: InterstitialAd */
CN.ecom.interstitialAd = (function($M) {
    var
        /**
        * Interstitial ad container
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type object
        */
        container,

        /**
        * Interstitial ad container background
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type object
        */
        containerBg,

        /**
        * Auto close timeout in seconds
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type integer
        */
        timeout = 10,

        /**
        * Timer
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type timer
        */
        timer,

        /**
        * Get Current Domain
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type currentDomain
        */
        currentDomain = CN.site.domain,

        /**
        * Get interstitial ad Cookie
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @type interstitialAdCookie
        */
        interstitialAdCookie,

        /**
        * Show Interstitial ad and set the timer
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @event
        */
        showAd = function() {
            jQuery("#interstitialAd,#interstitialAdBg").appendTo('body');
            container.centerAd();
            container.show();
            containerBg.show();
            timer = setTimeout(closeAd, timeout * 1000);
        },

        /**
        * Close Interstitial ad and clear the timer
        * @memberOf CN.ecom.interstitialAd
        * @private
        * @event
        */
        closeAd = function() {
            container.hide();
            containerBg.hide();
            clearTimeout(timer);
        }

    /**
    * @scope CN.ecom.interstitialAd
    */
    return {
        /**
        * Initiate CN Interstitial Ad
        * @return {object} CN.ecom.interstitialAd
        *
        * @example
            Initiate interstitial ad.
            CN.ecom.interstitialAd.init();
        */
        init: function() {
            jQuery(function() {
                jQuery('#interstitialAd').click(function() {
                    clearTimeout(timer);
                });

                jQuery('#interstitialAdBg,#interstitialAd #decline,#interstitialAd .int-ad-skip a').click(function() {
                    closeAd();
                    return false;
                });
                jQuery('#interstitialAd :submit, #interstitialAd .submit, #interstitialAd #submit').click(function() {
                    if(jQuery('#int_email_newslettersignup').hasClass("valid-email") == 'true'){
                        CN.cookie.set('interstitialAdSignup', 'true', { expires: signupCookieExpiry*24, path: '/', domain: currentDomain });
                        closeAd();
                    }
                });
            });

            return this;
        },

        setAdParameters: function(globalPage,homePage,otherPage,cookieAge,signupCookieAge) {
            cookieExpiry = cookieAge;
            if(cookieAge != '' || cookieAge != undefined || cookieAge != NULL){
                cookieExpiry = parseInt(cookieAge);
            }else{
                cookieExpiry = 7; // 7 days
            }

            signupCookieExpiry = signupCookieAge;
            if(signupCookieAge != '' || signupCookieAge != undefined || signupCookieAge != NULL){
                signupCookieExpiry = parseInt(signupCookieAge);
            }else{
                signupCookieExpiry = 7; // 7 days
            }

            CN.ecom.interstitialAd.init();
            container = jQuery('#interstitialAd');
            containerBg = jQuery('#interstitialAdBg');

            interstitialAdCookie = CN.cookie.get("interstitialAd");
            interstitialAdSignupCookie = CN.cookie.get("interstitialAdSignup");
            if ((globalPage == 'true') || (jQuery('body').hasClass('home') && homePage == 'true') || (!jQuery('body').hasClass('home') && otherPage == 'true') ) {
                if ( interstitialAdSignupCookie != 'true'){
                    if ( interstitialAdCookie != 'true'){
                        jQuery('#interstitialAdDefault').val("true");
                        CN.cookie.set('interstitialAd', 'true', { expires: cookieExpiry*24, path: '/', domain: currentDomain });
                        showAd();
                    }
                }
                return this;
            }else {
                return 0;
            }
        }
    }
})(CN);

        jQuery.fn.centerAd = function() {
                this.css({
                    'position': 'fixed',
                    'left': '50%',
                    'top': '50%',
                    'margin-left': -this.width() / 2 + 'px',
                    'margin-top': -this.height() / 2 + 'px'
            });
                return this;
       }


/* END: interstitialAd */