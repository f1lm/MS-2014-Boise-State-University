/**
 IMPORTANT :

 variables "platformEnvironment, s_account, server, secureServer, internalFilters, httpStatus" declared in omnitureInfo.jsp file

 **/
/*global CN */
/**
 * @namespace Omnitures 's' object
 */
var s;

/**
 * @namespace CN object
 * @description Conde Nast Digital namespace.
 * @function
 */
if (typeof CN === 'undefined' || !CN) {
    var CN = {};
}

/**
 * @namespace CN.stats object
 * @description stats namespace
 * @function
 */
CN.stats = CN.stats || {};

/**
 * @namespace CN.stats.omniture object
 * @description Omniture tracking singleton. Sets props, evars, and events.
 * @requires cn.js, s_code.js
 * @globals s_code,s
 * @function
 * History: 1.0.0 04.12.2010 Added version number.
 1.0.1 05.11.2010 Returned this to allow chaining.
 1.0.2 05.25.2010 Added ability scrub urls.
 1.0.3 06.08.2010 Added setSearchFacets to set sprop15.
 1.0.4 06.20.2010 Updated scrub function so it also modifies hier and page section vars.
 1.0.5 03.18.2011 Updated doPlugins to only call setDirectories once, otherwise on 3rd parties, we keep
 appending the subdomain shifting.
 */

CN.stats.omniture = (function() {
    /**
     * Current path array.
     * @memberOf CN.stats.omniture
     * @private
     * @type    array
     */
    var directories = CN.url.path();

    /**
     * URL scrub rules.
     * @memberOf CN.stats.omniture
     * @private
     * @type array
     */
    var scrubRules = [];


    /**
     * Additional properties to register with custom link tracking. Added to Omniture's s.linkTrackVars.
     * @memberOf CN.stats.omniture
     * @private
     * @type array
     */
    var savedLinkTrackVars = ['events'];
    var _platformEnvironment = platformEnvironment;

    var _temp_domain_var = document.location.hostname.replace('origin.', '').replace('stag.', '').split('.');
    var _ranOnce = false; // track if this has run once.

    /**
     * If the current location is a subdomain that is not men or www then prepend that subdomain value to the directories variable
     * Used for 3rd party subdomains, ecom and forums tracking mostly
     * Sets the directories var.
     * @memberOf    CN.stats.omniture
     * @params dirs array array of directories
     * @private
     */
    function setDirectories(dirs) {
        directories = dirs;
        if ((_platformEnvironment !== 'development' || document.location.hostname.match('stag-|stag.') !== null) && _temp_domain_var.length !== 2 && _temp_domain_var[0].match(/^men$|^www$|^magazine$|^stag$|^stag-|^secure/) === null) {
            directories = new Array('sd_' + _temp_domain_var[0]).concat(dirs);
            if (directories[directories.length - 1] === '') {
                directories.pop();
            }
        }
    }

    function GoogleSSCounter() {
        /*Google Secure Search Counter*/
        var kr = document.referrer, kk = s.getQueryParam("q", "", kr), ks = s.getQueryParam("esrc", "", kr);
        if (kr.indexOf("www.google.com") && !kk && ks == "s") {
            var ksr = kr.split("q="), kq = "q=Google%20Secure%20Search";
            s.referrer = ksr[0] + kq + ksr[1]
        }
        ;
    }

    var s_account = CN.omniture.conf.s_account || '', server = CN.omniture.conf.server || '', secureServer = CN.omniture.conf.secureServer || '', internalFilters = CN.omniture.conf.internalFilters || '', httpStatus = 200;

    if (s_account !== "") {
        s = window['s']; //removed for Audience Manager code s_gi(s_account);
        s.un = s_account;  // reset the account
    }


    /**
     * Sets pageName property.
     * 2 scenarios:
     * 1- Set in js file which will capture the URL up to any parameters.
     * 2- Set explicitly where we want to force the pagename, ex: ""scrubbed"" URLs."
     * @memberOf    CN.stats.omniture
     * @private
     */
    function setPageName() {
        var tempPageName = location.href;

        // Applies site-specific scrubbing rules.
        tempPageName = applyScrubRules(tempPageName);

        if (directories[0] === "") {
            tempPageName = "homepage";
        } else if (directories[0].indexOf("search") === 0) {
            // Matches search results url and sets the page name as /search/query
            tempPageName = location.href.split('search')[0].replace(/#.*$/g, '').replace(/\/$/, '/search/query');
        } else {
            // Removes query string, trailing slash, and trailing hash mark.
            tempPageName = tempPageName.split('?')[0].replace(/#.*$/g, '').replace(/\/$/, '');
        }

        // If error page, include error code.
        if (httpStatus !== 200) {
            tempPageName = "error:" + httpStatus + ":" + tempPageName;
        }

        s.pageName = tempPageName;

    }


    /**
     * Applies site-specific URL scrubbing logic.
     * Requires that the public method CN.stats.omniture.addScrubRule() to populate
     * the scrubRules var.
     * @memberOf    CN.stats.omniture
     * @param pageName string starting pageName. Will be returned if none of the scrub rules are applied.
     * @private
     */
    function applyScrubRules(pageName) {
        var i, dirs;

        for (i = 0; i < scrubRules.length; i++) {
            if (scrubRules[i].condition) {
                pageName = scrubRules[i].rule;
                dirs = pageName.replace(/http:\/\/.*?\//, '/').match(/([^\/]+)/g) || [''];
                setDirectories(dirs);
                CN.debug.info("SCRUBBING " + pageName);
            }
        }
        return pageName;
    }

    /**
     * Sets the pageType property if the page is an error page.
     * @memberOf    CN.stats.omniture
     * @private
     */
    function setPageType() {
        if (httpStatus == 404 || httpStatus == 500) {
            s.pageType = "errorPage";
            CN.stats.omniture.setEvent("error");
        }

    }

    /**
     * Sets the s.campaign property if query string contains specific values.
     * @memberOf    CN.stats.omniture
     * @private
     */
    function setCampaign() {
        s.campaign = "";
        /* External Campaign Tracking */
        if (!s.campaign) {
            s.campaign = s.getQueryParam('mbid,nav,fb_ref', ':');
            s.campaign = s.getValOnce(s.campaign, 's_campaign', 0);
        }

    }

    /*
     * Site hierarchy. Comma separated path. Exceptions: / will be set as "homepage".
     * Any error page is set to "error".
     * @memberOf    CN.stats.omniture
     * @private
     */
    function setHierarchy() {
        if (httpStatus == 404 || httpStatus == 500) {
            s.hier1 = "error";
        } else if (directories[0] === "") {
            s.hier1 = "homepage";
        } else {
            s.hier1 = directories.join(',');
        }
    }


    /**
     * An object to define valid events.
     */
    var sEvents = {
        internalSearch : "event1",
        pageView : "event2",
        siteRegistration : "event3",
        subsConversions : "event4",
        ccUpsellImpressions : "event5",
        paidCreditCard : "event6",
        error : "event9",
        loginOverlayShown : "event10",
        newsletterSignup : "event11",
        newsletterSignup2 : "event12",
        newsletterSignup3 : "event13",
        emailAFriend : "event19",
        forumPost : "event20",
        login : "event21",
        comment : "event22",
        rating : "event23",
        review : "event24",
        photo : "event25",
        commentFocus : "event29",
        commentLayer : "event30",
        lightRegistration : "event31",
        lightLogin : "event32",
        socialShare : "event34",
        socialFollow : "event35",
        sweepsSubsConfirm : "event36",
        purchasable : "event37",
        nonpurchasable : "event38",
        slideShowLength : "event40",
        shoppingCartBox : "event47",
        prodView : "prodView",
        contentUpload : "event49"
    }

    /**
     * An object to store functions to set evars. Most evars map to props, but there are
     * a handful that have their own custom logic.
     */
    var eVars = {
        /*
         * eVar2: pageName
         * where: Always set eVar2 to page name when pageName is set
         * what: s.pageName
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar2 : function () {
            return s.pageName || '';
        },

        /*
         * eVar10: Internal Campaign ID
         * where: all pages
         * what:    internal campaign ids
         * @memberOf    CN.stats.omniture
         * @private
         * TODO: this one breaks the pattern of returning a value. Instead it is setting the evar directly.
         */
        eVar10 : function () {
            if (!s.eVar10) {
                s.eVar10 = s.getQueryParam('intcid');
                s.eVar10 = s.getValOnce(s.eVar10, 's_eVar10', 0);
                return s.eVar10;
            }
        },

        /*
         * eVar15: tracking codes
         * where: all pages.
         * what: copies s.campaign into evar.
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar15 : function () {
            return s.campaign || '';
        },

        /*
         * eVar20: tracking codes  (Never Expire -original value)
         * where: all pages.
         * what: copies s.campaign into evar.
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar20 : function () {
            return s.campaign || '';
        },

        /*
         * eVar21: Promo
         * where: Set on page where a promo is first shown (e.g., ccUpsell layer).
         * what: Name of the promo.
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar21 : function () {
            return this.eVar21.data || '';
        },

        /*
         * eVar33: Marketing campaign.
         * where: Set on pages where s.campaign is set.
         * what: sets evar33 to "Marketing".
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar33 : function () {
            if (s.campaign) {
                return "Marketing";
            }
            return '';
        },

        /*
         * eVar34: Video title
         * where: Set on page where channel player is embedded
         * what: Name of the video title.
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar34 : function () {
            return this.eVar34.data || '';
        },

        /*
         * eVar37: Social Share
         * where: When a user clicks on a social sharing button fire event34
         * what: Store the name of the social networking site in eVar37
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar37 : function () {
            return this.eVar37.data || '';
        },

        /*
         * eVar43: Purchasable/Not Purchasable products
         * where: Product Description Page
         * what: Determines purchasable / not purchasable products
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar43 : function () {
            return this.eVar43.data || '';
        },

        eVar50 : function () {
            return this.eVar50.data || '';
        },

        eVar53 : function () {
            return this.eVar53.data || '';
        },

        eVar54 : function () {
            return this.eVar54.data || '';
        },

        /*
         * eVar55: AuthorName
         * where: Set on Blog and Article pages
         * what: Name of the Author.
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar55 : function () {
            return this.eVar55.data || '';
        },

        /*
         * eVar60: Slideshow Length
         * where: Set on Slideshow pages
         * what: Slideshow length
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar60 : function () {
            return this.eVar60.data || '';
        },

        eVar68 : function () {
            return this.eVar68.data || '';
        },

        /*
         * eVar74: ContentType
         * where:  Set on Blog and Article pages
         * what:  Capture a second layer of granularity beyond prop5/eVar5
         * @memberOf    CN.stats.omniture
         * @private
         */
        eVar74 : function () {
            return this.eVar74.data || '';
        }

    }

    /**
     * An object to store functions to set each prop.
     *
     */
    var sProps = {
        /*
         * prop1: Internal Search Terms
         * where: Free text result page 1.
         * what: search terms
         * Sets eVar1 and event1.
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop1 : function () {
            if (this.prop1.data === undefined) {
                return "";
            }
            var t_search;
            this.prop1.data = CN.utils.transliterate(this.prop1.data);

            s.eVar1 = this.prop1.data.toLowerCase();
            t_search = s.getValOnce(s.eVar1, 'ev1', 0);
            if (t_search) {
                CN.stats.omniture.setEvent("internalSearch");
            }
            return this.prop1.data.toLowerCase();
        },

        /*
         * prop2: # Search Results
         * where: Free text result page
         * what: Number of results returned.
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop2 : function () {
            if (this.prop2.data === 0) {
                this.prop2.data = "zero";
            }
            return this.prop2.data || '';
        },

        /*
         * prop3: Content Title
         * where: All applicable pages.
         * what: Set to title of page except on send to friend. Set to url of page sent.
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop3 : function () {
            return CN.utils.transliterate(this.prop3.data) || CN.utils.transliterate(document.title);

        },

        /*
         * prop4: Content ID
         * where: All applicable pages.
         * what: Set to content id of the page.
         * @memberOf CN.stats.omniture
         * @private
         */
        prop4: function () {
            return this.prop4.data || '';
        },

        /*
         * prop5: Content Type
         * where: All pages.
         * what: Set to content type of the page.
         * @memberOf CN.stats.omniture
         * @private
         */
        prop5: function () {
            return this.prop5.data || '';
        },

        /*
         * prop6: Site Section
         * where: All pages
         * what: First directory after /.
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop6 : function () {
            var tempSection = directories[0];

            if (directories[0] === "") {
                tempSection = "homepage";
            }

            if (httpStatus == 404 || httpStatus == 500) {
                tempSection = "error";
            }
            return tempSection;
        },

        /*
         * prop7: Site Sub-section
         * where: All applicable pages.
         * what: 2nd directory after /
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop7 : function () {
            if (directories.length >= 2 && httpStatus == 200) {
                return  directories[0] + '/' + directories[1];
            }
            return "";
        },

        /*
         * prop8: Site Sub-section 2
         * where: All applicable pages.
         * what: 3rd directory after /
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop8 : function () {
            if (directories.length >= 3 && httpStatus == 200) {
                return directories[0] + '/' + directories[1] + '/' + directories[2];
            }
            return "";
        },

        /*
         * prop9: Site Sub-section 3
         * where: All applicable pages.
         * what: 4th directory after /
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop9 : function () {
            if (directories.length >= 4 && httpStatus == 200) {
                return directories[0] + '/' + directories[1] + '/' + directories[2] + '/' + directories[3];
            }
            return "";
        },

        /*
         * prop10
         * where Search pages
         * what search terms split
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop10 : function () {
            if (s.prop1) {
                return s.prop1.replace(/ /g, ',');
            }
            return "";
        },

        /*
         * prop11:
         * where All pages.
         * what hour
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop11 : function () {
            return s.prop11 = s.TimeParting('h', '-5'); // Set hour
        },

        /*
         * prop12:
         * where All pages.
         * what day
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop12 : function () {
            return s.prop12 = s.TimeParting('d', '-5'); // Set day
        },

        /*
         * prop13:
         * where All pages.
         * what weekend/weekday
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop13 : function () {
            return s.prop13 = s.TimeParting('w', '-5'); // Set weekday v.Weekend
        },

        /*
         * prop14:
         * where All pages
         * what JSESSION cookie
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop14 : function () {
            return CN.cookie.get('JSESSIONID') || '';
        },

        /*
         * prop15: Search facets
         * where: Search pages that use facets.
         * what: colon-separated list of facets.
         * @memberOf CN.stats.omniture
         * @private
         */
        prop15: function () {
            return this.prop15.data || '';
        },

        /*
         * prop16:
         * where: All pages.
         * what: logged in status similar to prop19
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop16 : function () {
            if (CN.utils.parseStr(CN.cookie.get('amg_user_record'), 'usercookie').uid) {
                return 'Logged in';
            } else {
                return 'Not Logged in';
            }
        },

        /*
         * prop17:
         * where: All pages
         * what: monthly repeat visitors
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop17 : function () {
            return s.getVisitNumCustom('m');
        },

        /*
         * sprop18:
         * where: Pages with "threadID" in the query string.
         * what: threadID
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop18 : function () {
            return this.prop18.data || CN.url.params('threadID');
        },

        /*
         * prop19:
         * where: All pages.
         * what: logged in user ID from cookie when available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop19 : function () {
            return CN.utils.parseStr(CN.cookie.get('amg_user_record'), 'usercookie').uid || '';
        },
        /*
         * prop23
         * where: All pages.
         * what: new vs. repeat visitors
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop23 : function () {
            return s.getNewRepeat();
        },
        /*
         * prop25:
         * where: eCommerce Activity.
         * what: eCommerce opp id when available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop25 : function () {
            return this.prop25.data || '';
        },

        /*
         * prop26:
         * where: eCommerce Activity.
         * what: eCommerce Targeter Name where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop26 : function () {
            return this.prop26.data || '';
        },

        /*
         * prop27:
         * where: eCommerce Activity.
         * what: eCommerce Placement Id where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop27 : function () {
            return this.prop27.data || '';
        },

        /*
         * prop28:
         * where: All pages.
         * what: logged in user name from cookie when available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop28 : function () {
            return CN.utils.parseStr(CN.cookie.get('amg_user_record'), 'usercookie').username || '';
        },

        /* prop32:
         * where: All pages.
         * what: slide/pagenumber
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop32 : function () {
            var params = CN.url.params();
            return this.prop32.data || params.pageNum || params.slide || params.currentPage || params.page || '';
        },

        /* prop43:
         * where: Product Description Page.
         * what: Purchasable/Not Purchasable
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop43 : function () {
            var pstatus = eVars.eVar43.data;
            if (typeof pstatus != "undefined") {
                var productcategory = '';
                var productname = '';
                if (directories.length >= 2 && httpStatus == 200)
                    productcategory = directories[1];
                if (directories.length >= 4 && httpStatus == 200)
                    productname = directories[3];
                CN.stats.omniture.setEvent("prodView");
                s.products = productcategory + ";" + productname;
                if (pstatus == "Purchasable") {
                    s.prop43 = "Purchasable";
                    CN.stats.omniture.setEvent("purchasable");
                }
                if (pstatus == "Not Purchasable") {
                    s.prop43 = "Not Purchasable";
                    CN.stats.omniture.setEvent("nonpurchasable");
                }
            }
            return pstatus;
        },

        /*
         * prop45:
         * where: eCommerce Activity.
         * what: Transaction Id where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop45 : function () {
            return this.prop45.data || '';
        },

        /*
         * prop46:
         * where: eCommerce Activity.
         * what: campaignID where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop46 : function () {
            return this.prop46.data || '';
        },

        /*
         * prop47:
         * where: eCommerce Activity.
         * what: Keycode where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop47 : function () {
            return this.prop47.data || '';
        },

        /*
         * prop48:
         * where: eCommerce Activity.
         * what: campaign Name where available
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop48 : function () {
            return this.prop48.data || '';
        },

        /*
         * prop49:
         * where: Content Upload.
         * what: When user clicks submit to upload content
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop49 : function () {
            return this.prop49.data || '';
        },

        /*
         * prop50:
         * where: Set on all pages.
         * what: keywords
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop50 : function () {
            return eVars.eVar50.data || '';
        },

         /*
         * prop51:
         * where: responsive design mobile page views.
         * what: string 'mobile'
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop51 : function () {
            return this.prop51.data || '';
        },

        prop53 : function () {
            var pstatus = eVars.eVar53.data;
             s.prop53 = pstatus;
             return pstatus;
        },

        prop54 : function () {
            var pstatus = eVars.eVar54.data;
             s.prop54 = pstatus;
             return pstatus;
        },

        /*
         * prop55:
         * where: Set on Blog and Article pages.
         * what: Name of the Author
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop55 : function () {
            return eVars.eVar55.data || '';
        },

        /*
         * prop60:
         * where: Set SlideShow pages.
         * what: Slideshow length
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop60 : function () {
            return eVars.eVar60.data || '';
        },

        /*
         * prop68:
         * where: Set on all pages.
         * what: referring URL
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop68 : function () {
            return eVars.eVar68.data || '';
        },

        /*
         * prop74:
         * where: Set on Blog and Article pages.
         * what: Capture a second layer of granularity beyond prop5/eVar5
         * @memberOf    CN.stats.omniture
         * @private
         */
        prop74 : function () {
            return eVars.eVar74.data || '';
        }

    };

    function initPlugins() {
        /************************** PLUGINS SECTION *************************/
        /* You may insert any plugins you wish to use here.                 */
        /*
         * Plugin: getAndPersistValue 0.3 - get a value on every page
         */
        s.getAndPersistValue = function (v, c, e) {
            var s = this, a = new Date;
            e = e ? e : 0;
            a.setTime(a.getTime() + (e * 1000 * 60));
            if (!v && s.c_r(c) != '') {
                v = s.c_r(c);
            }
            if (v)
                s.c_w(c, v, e ? a : 0);
            return s.c_r(c);
        }


        /*
         * Plugin Utility: apl v1.1
         */
        s.apl = new Function("L", "v", "d", "u", "" + "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
            + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
            + "e()));}}if(!m)L=L?L+d+v:v;return L");

        /*
         * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
         */
        s.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

        /*
         * Plugin: getValOnce 0.2 - Modified to expire after 30 minutes since last call (Updated provided by Omniture)
         */
        s.getValOnce = new Function("v", "c", ""
            + "var s=this,k=s.c_r(c),a=new Date;a.setTime(a.getTime()+1800000);if("
            + "v){s.c_w(c,v,a);}else{s.c_w(c,k,a);}return v==k?'':v");

            /*
		/* Engaged Users Plugin - High Value Audience
		 * Added 3/22/2013 as a result of an audit and per discussions with Dan Stubbs and Don Taylor
		 */
		s.getTimeSpent = function(e1){
		    var s = this;

		    if( (typeof s.linkType === undefined || s.linkType != '') || (s.linkType == '' && s.eo == '') ){

		        s.linkTrackVars = s.apl(s.linkTrackVars, 'events', ',', 2);
		        s.linkTrackEvents = s.apl(s.linkTrackEvents, e1, ',', 2);

		        previousTime = s.c_r('timeSpent');
		        currentTime = (new Date()).getTime();

		        if(s.events && s.events.indexOf(e1 + "=") > -1){
		            var list = s.split(s.events,",");
		            if(list.length > 0){
		                s.events = "";
		                for(var i=0; i<list.length; i++){
		                    if(list[i].indexOf(e1 + "=") == -1)
		                        s.events = s.events + list[i] + ",";
		                }
		                s.events = s.events.substring(0,s.events.length-1);
		            }
		        }

		       if(previousTime == ''){
		            s.c_w('timeSpent', currentTime);
		            return e1 + '=0';
		        }else{
		            var timeDiff = Math.round((currentTime - previousTime)/1000)
		            if(timeDiff > 1800 || timeDiff < 0){
		                s.c_w('timeSpent', currentTime)
		                return e1 + '=0';
		            }else{
		                s.c_w('timeSpent', currentTime);
		                return e1 + '=' + timeDiff;
		            }
		        }
		    }
		}

        /*
         * Plugin: getQueryParam 2.3
         */
        s.getQueryParam = new Function("p", "d", "u", ""
            + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
            + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
            + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
            + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
            + "=p.length?i:i+1)}return v");
        s.p_gpv = new Function("k", "u", ""
            + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
            + "=s.pt(q,'&','p_gvf',k)}return v");
        s.p_gvf = new Function("t", "k", ""
            + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
            + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
            + "epa(v)}return ''");

        /*
         * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
         */
        s.getNewRepeat = new Function(""
            + "var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
            + "(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
            + "'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
            + ".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
            + "al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
            + "n 'Repeat';");

        /* Plugin: TimeParting 3.0 - Set timeparting values based on time zone - valid through 2014
         * Customized to report in full hours only
         */

        s.TimeParting = new Function("t", "z", ""
            + "var s=this,d,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;d=new Date();A"
            + "=d.getFullYear();if(A=='2009'){B='08';C='01'}if(A=='2010'){B='14';C"
            + "='07'}if(A=='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A="
            + "='2013'){B='10';C='03'}if(A=='2014'){B='09';C='02'}if(!B||!C){B='08"
            + "';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000');if("
            + "D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=p"
            + "arseFloat(z);E=new Date(B);F=new Date(C);G=F;H=new Date();if(H>E&&H"
            + "<G){z=z+1}else{z=z};I=H.getTime()+(H.getTimezoneOffset()*60000);J=n"
            + "ew Date(I+(3600000*z));K=['Sunday','Monday','Tuesday','Wednesday','"
            + "Thursday','Friday','Saturday'];L=J.getHours();M=J.getMinutes();N=J."
            + "getDay();O=K[N];P='AM';Q='Weekday';R='00';if(L>=12){P='PM';L=L-12};"
            + "if(L==0){L=12};if(N==6||N==0){Q='Weekend'}T=L+':'+R+P;if(t=='h'){re"
            + "turn T}if(t=='d'){return O}if(t=='w'){return Q}}");


        /* DynamicObjectIDs config */
        function s_getObjectID(o) {
            var ID = o.href;
            return ID;
        }

        s.getObjectID = s_getObjectID

        /*
         *  * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
         *   */
        s.setupDynamicObjectIDs = new Function(""
            + "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
            + ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
            + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
            + "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
            + "re=1}");
        s.setOIDs = new Function("e", ""
            + "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
            + ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
            + "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
            + "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
            + "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
            + "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
            + "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
            + ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
            + "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
            + "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

        /*
         * Plugin Utility: Replace v1.0
         */
        s.repl = new Function("x", "o", "n", ""
            + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
            + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

        /*
         * Monthly Visit Number
         */
        s.dimo = new Function("m", "y", "var d=new Date(y,m+1,0); return d.getDate();");
        s.endof = new Function("x", "var t = new Date(); t.setHours(0); t.setMinutes(0);"
            + "t.setSeconds(0); if(x=='m') d=s.dimo(t.getMonth(),t.getFullYear()) - t.getDate() + 1;"
            + "else if(x=='w') d=7-t.getDay(); else d=1; t.setDate(t.getDate()+d); return t;");
        s.getVisitNumCustom = new Function("tp", ""
            + "var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum_'+tp,c2='sinvisit_'+tp,eo=s.endof(tp),"
            + "y=eo.getTime();e.setTime(y);cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}"
            + "cvisit=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}"
            + "else return 'unknown visit number';}"
            + "else{if(str){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}"
            + "else{s.c_w(c,y+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return 1;}}"
        );

        /*
         * Plugin: Visit Depth
         */
        s.getActionDepth = new Function("c", ""
            + "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
            + "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
            + "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

        /*
         * Plugin: downloadLinkHandler 0.5 - identify and report download links
         */
        s.downloadLinkHandler = new Function("p", ""
            + "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
            + "ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
            + "if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

        /*
         * Plugin: linkHandler 0.5 - identify and report custom links
         */
        s.linkHandler = new Function("p", "t", ""
            + "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
            + "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
            + "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
            + "e=l=='[['?'':l;s.linkType=t;return h;}return '';");
        s.p_gn = new Function("t", "h", ""
            + "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
            + "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
            + "return 0;");

        /*
         * Utility Function: p_gh
         */
        s.p_gh = new Function(""
            + "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
            + "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
            + "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
            + "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

        /*
         * Function - read combined cookies v 0.3
         */
        if (!s.__ccucr) {
            s.c_rr = s.c_r;
            s.__ccucr = true;
            s.c_r = new Function("k", ""
                + "var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
                + "urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
                + "c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
                + ",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
                + "m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
                + "Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
                + "urn v;");
        }
        /*
         * Function - write combined cookies v 0.3
         */
        if (!s.__ccucw) {
            s.c_wr = s.c_w;
            s.__ccucw = true;
            s.c_w = new Function("k", "v", "e", ""
                + "this.new2 = true;"
                + "var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
                + "c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
                + ".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
                + "ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
                + ".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
                + "ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
                + "{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
                + "='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
                + ".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
                + "ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
                + "Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");
        }

        /*
         *  * Plugin: exitLinkHandler 0.5 - identify and report exit links
         *   */
        s.exitLinkHandler = new Function("p", ""
            + "var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
            + "e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
            + "s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
            + "nkType='e';else h='';s[n]=t;return h;");

        /*
         *  * Plugin: getPreviousValue_v1.0 - return previous value of designated
         *   *   variable (requires split utility)
         *    */
        s.getPreviousValue = new Function("v", "c", "el", ""
            + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
            + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
            + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
            + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
            + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

        /* dedupe referrers */
        s.dedupeReferrers = new Function("c", "b", ""
            + "var s=this,a,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.refer"
            + "rer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):g.le"
            + "ngth;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.s"
            + "plit(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:'';i"
            + "f(n)o=n}if(!o){c=c?c:'_dr';b=b?b-1:'1';a=g;a=s.getValOnce(a,c,0);if"
            + "(a){return a}else{return k[b]}}}");

        /*
         *    Search Center Plug-in: manageQueryParam v1.2 - Manages query string parameters
         *    by either encoding, swapping, or both encoding and swapping a value.
         */

        s.manageQueryParam = new Function("p", "w", "e", "u", ""
            + "var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
            + "cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
            + "?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
            + "'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
            + "(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
            + "ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
            + ",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
            + "bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
            + "{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
            + ";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
            + ";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
            + "p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
            + "f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
            + "?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
            + "(qp)qs='?'+qp;return u+qs;");

        /*
         * Search Center Plugin: clickThruQuality v1.0 - [one line description of plugin]
         */
        s.clickThruQuality = new Function("scp", "tcth_ev", "cp_ev", "cff_ev", "cf_th", ""
            + "var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
            + "ts+',':'';if(s.getQueryParam&&s.getQueryParam(scp)){s.events=ev+tct"
            + "h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
            + ",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
            + "_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
            + "+cp_ev;}}}");
        s.p_fo = new Function("n", ""
            + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
            + "new Object;return 1;}else {return 0;}");

        /* Configure Modules and Plugins */
        s.loadModule("Media");
        s.Media.autoTrack = false;
        s.Media.trackVars = "None";
        s.Media.trackEvents = "None";


        /****************************** MODULES *****************************/
        /* Module: Media */
        s.m_Media_c = "='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"
            + "Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"
            + "Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"
            + "{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"
            + "i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"
            + "=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"
            + "stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"
            + "+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"
            + "p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"
            + "i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v=\"`z_c_il[\"+m._in+\"],o=`i['\"+i+\"']\"`3p^G^HWindows `P `R"
            + "o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"
            + "('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"
            + "?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"
            + "^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"
            + "4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"
            + "^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";
        s.m_i("Media");

    }

    /**
     * Loops through the sProps object and sets properties on the
     * global s object.
     * @function
     * @private
     */
    function setProperties() {
        var i;
        for (i in sProps) {
            if (sProps.hasOwnProperty(i)) {
                s[i] = sProps[i]();
            }
        }
    }

    /**
     * Loops through the eVars object and sets evars on the global s object.
     * @function
     * @private
     */
    function setEVars() {
        var i;

        for (i in eVars) {
            if (eVars.hasOwnProperty(i)) {
                s[i] = eVars[i]();
            }
        }
    }

    /*
     * Links evars to props.
     * @function
     * @param (string) evar name of the evar to set.
     * @param (string) sprop    name of the prop to set.
     * @private
     */
    function linkProps(evar, prop) {
        if (s[prop]) {
            s[evar] = s[prop];
        }
    }

    /*
     * Sets events based on information in the url or dom. Don't need to call a setter.
     * @function
     * @private
     */
    function setAutoEvents() {
        // Set newsletter event if we are on thank you page.
        if (location.href.indexOf("/services/newsletters/demographics") != -1) {
            CN.stats.omniture.setEvent("newsletterSignup");
        }
    }

    return {
        /**
         * @name CN.stats.omniture#setEvent
         * @function
         * @description  Sets an event. Need to pass it a valid event name.
         * @param {string} name Name of the event to set.
         */
        setEvent : function(name) {
            if (sEvents.hasOwnProperty(name)) {
                s.events = s.apl(s.events, sEvents[name], ",", 2);
            }
            return this;
        },

        /**
         * @name CN.stats.omniture#setEvents
         * @function
         * @description  Sets events.
         * @param {Map} events Name:Value of the event to set.
         */
        setEvents : function(events) {
            var name;
            for (name in events) {
                if (sEvents.hasOwnProperty(name)) {
                    s.events = s.apl(s.events, sEvents[name] + ':' + events[name], ",", 2);
                }
            }
            return this;

        },

        /**
         * @name CN.stats.omniture#setPageName
         * @function
         * @description  overrides pageName.
         * @param {String} pageName page name to set
         */
        setPageName : function(pageName) {
            if (pageName) {
                s.pageName = pageName;
            }
            return this;

        },


        /**
         * @name CN.stats.omniture#setSaccount
         * @function
         * @description Sets the omniture account and also initializes the global s object.
         * @param {string} sAccount Omniture sAccount value
         */
        setSaccount: function(sAccount) {
            s_account = sAccount;
            s = s_gi(s_account);
            return this;
        },

        /**
         * @name CN.stats.omniture#setStatus
         * @function
         * @description Sets the http status. Used for error pages.
         * @param   {integer}    status    http status code
         */
        setStatus: function(status) {
            httpStatus = status;
            return this;
        },

        /**
         * @name CN.stats.omniture#setSearchProps
         * @function
         * @description Sets search props "prop1" and "prop2"
         * @param   {string}    term    Search term entered by user.
         * @param   {integer}    resultCount     Number of search results returned.
         */
        setSearchProps: function(term, resultCount) {
            sProps.prop1.data = CN.utils.transliterate(term);
            sProps.prop2.data = resultCount;
            return this;
        },

        /**
         * @name CN.stats.omniture#setContentTitle
         * @function
         * @description Sets the title prop (prop3). By default prop3 is document.title.
         * @param {string} title firendly page title
         */
        setContentTitle: function(title) {
            sProps.prop3.data = title;
            return this;
        },

        /**
         * @name CN.stats.omniture#setContentId
         * @function
         * @description Sets the page content id Default: '' (prop4)
         * @param {string} id the content id
         */
        setContentId: function(id) {
            sProps.prop4.data = id;
            return this;
        },

        /**
         * @name CN.stats.omniture#setContentType
         * @function
         * @description Sets the page content type Default: '' (prop5)
         * @param {string} id the content type
         */
        setContentType: function(type) {
            sProps.prop5.data = type;
            return this;
        },

        /**
         * @name CN.stats.omniture#setContentType
         * @function
         * @description Sets the page content type Default: '' (prop74)
         * @param {string} id the content type
         */
        setContentType2: function(type) {
            sProps.prop74.data = type;
            return this;
        },

        /**
         * @name CN.stats.omniture#setInternalFilters
         * @function
         * @description Sets the internal url filter list type Default: ''
         * @param {string} filters comma separated list of urls to filter
         */
        setInternalFilters: function(filters) {
            internalFilters = filters;
            return this;
        },

        /**
         * @name CN.stats.omniture#setTrackingServers
         * @function
         * @description Set tracking servers Default: ''
         * @param {string} s  Non-secure omniture server
         * @param {string}  ss  Secure omniture server
         */
        setTrackingServers: function(s, ss) {
            server = s;
            secureServer = ss;
            return this;
        },

        /**
         * @name CN.stats.omniture#setSearchFacets
         * @function
         * @description sets search facets
         * @param {string}  value colon-separated list of facets
         */
        setSearchFacets : function(value) {
            sProps.prop15.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setThreadId
         * @function
         * @description Set forums thread Id Default: '' (prop18)
         * @param {string}  value  Forum thread id value
         */
        setThreadId : function(value) {
            sProps.prop18.data = value;
            return this;
        },


        /**
         * @name CN.stats.omniture#setDesignerName
         * @function
         * @description Brides friendly designer name found on gallery pages.  (prop21)
         * @param {string}  value Designer name
         */
        setDesignerName : function(value) {
            s.prop21 = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setEcommOppId
         * @function
         * @description eCommerce Opp ID Default: '' (prop25)
         * @param {string}  value  eComm Opp ID value
         */
        setEcommOppId : function(value) {
            sProps.prop25.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setEcommTargeterName
         * @function
         * @description Set eCommerce TargeterName Default: '' (prop26)
         * @param {string}  value  eComm Targeter value
         */
        setEcommTargeterName : function(value) {
            sProps.prop26.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setEcommPlacementId
         * @function
         * @description Set eCommerce Placement ID Default: '' (prop27)
         * @param {string}  value  eComm Placement ID
         */
        setEcommPlacementId : function (value) {
            sProps.prop27.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setMagazineOrWebExclusive
         * @function
         * @description Set content type "Magazine" or "Web Exclusive" Default: '' (prop31)
         * @param {string}  value  content type: "Magazine" or "Web Exclusive"
         */
        setMagazineOrWebExclusive : function(value) {
            sProps.prop31.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setPaginationValue
         * @function
         * @description Override Pagination Page or Slide Number (prop32)
         * @param {string}  value  page or slide number Default: '' unless param exists ?pageNum=, ?slide=, ?currentPage=, ?page=
         */
        setPaginationValue : function (value) {
            sProps.prop32.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setCommerceProps
         * @function
         * @description
         * @param {Map}
            */
        setCommerceProps : function (value) {
            if (value) {
                if (value.transid) {
                    sProps.prop45.data = value.transid;
                }
                if (value.campaignId) {
                    sProps.prop46.data = value.campaignId;
                }
                if (value.keycode) {
                    sProps.prop47.data = value.keycode;
                }
                if (value.campaignName) {
                    sProps.prop48.data = value.campaignName;
                }
            }
            return this;
        },

        /**
         * @name CN.stats.omniture#setMobileView
         * @function
         * @description Set mobile page view (51)
         * @param {string}  value passed in value or 'mobile'
         */
        setMobileView : function (value) {
            var v = value || 'mobile';
            sProps.prop51.data = v;
            return this;
        },

        /**
         * @name CN.stats.omniture#setResortName
         * @function
         * @description Set resort name from the Sandals widget on brides.com
         * @param {string}  value resort name. (prop35)
         */
        setResortName : function(value) {
            s.prop35 = value;
            savedLinkTrackVars.push('prop35');
            return this;
        },

        /**
         * @name CN.stats.omniture#setPromoConversion
         * @function
         * @description Set promo conversion variable. (evar21)
         * @param {string}  value  promo conversion variable
         */
        setPromoConversion : function (value) {
            eVars.eVar21.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#setProductStatus
         * @function
         * @description Determines if the product is purchasable or not for allure.
         * @param {string} productstatus (purchasable / not purchasable)
         */
        setProductStatus: function(productstatus) {
            if (productstatus == "Purchasable")
                eVars.eVar43.data = "Purchasable";

            else
                eVars.eVar43.data = "Not Purchasable";
            return eVars.eVar43.data;
        },

        setProductName : function(productName) {
                eVars.eVar53.data = productName;
            return eVars.eVar53.data;
        },

        setProductAvailabilityStatus : function(productStatus) {
            eVars.eVar54.data = productStatus;
            return eVars.eVar54.data;
        },

        /**
         * @name CN.stats.omniture#setVideoTitle
         * @function
         * @description Set video title variable. (evar34)
         * @param {string}  value  video title variable
         */
        setVideoTitle : function (value) {
            CN.stats.omniture.setEvent("videoPlay");
            eVars.eVar34.data = value;
            return this;
        },

        /**
         * @name CN.stats.omniture#addScrubRule
         * @function
         * @description Adds a custom
         * @param {string}  condition Conditions to match before applying url scrub.
         * @param {string}  rule    Regex to scrub the url.
         */
        addScrubRule : function (condition, rule) {
            scrubRules.push({
                condition : condition,
                rule : rule
            });
        },

         /**
         * @name CN.stats.omniture#setAuthorName
         * @function
         * @description Set author name variable. (evar55)
         * @param {string}  value authorName for Blog, contributor name for Article.
         */
        setAuthorName : function (mtAuthorName) {
            eVars.eVar55.data = mtAuthorName;
            return this;
        },

        /**
         * @name CN.stats.omniture#setKeywords
         * @function
         * @description Set keywords variable. (evar50)
         * @param {string}  Keywords
         */
        setKeywords : function (mtKeywords) {
            eVars.eVar50.data = mtKeywords;
            return this;
        },


        /**
         * @name CN.stats.omniture#setReferrer
         * @function
         * @description Set referrer URL variable. (evar68)
         * @param {string}  Referring URL
         */
        setReferrer : function (mtReferrer) {
            eVars.eVar68.data = mtReferrer;
            return this;
        },

        /**
         * @name CN.stats.omniture#trackAction
         * @function
         * @description Sets an Omniture event on a user action (onclick).
         * @param (string) eventName    Name of the event. Needs to be a valid event name defined in events object.
         * @param (object)  evtSrc  Source of the event. Is a dom node.
         * @param (object) args config object with optional params.
         */
        trackAction : function(eventName, evtSrc, args) {
            args = args || {};
            args.linkTracking = args.linkTracking || false;
            if (args.props) {
                CN.stats.omniture.setCommerceProps(args.props);
            }
            if (args.events) {
                CN.stats.omniture.setEvents(args.events);
            }
            s = s_gi(s_account);
            if (!args.linkTracking) {
                CN.stats.omniture.setEvent(eventName);
                s.linkTrackEvents = sEvents[eventName];
            }
            s.linkTrackVars = savedLinkTrackVars.join(',');
            s.tl(evtSrc, 'o', eventName);
            savedLinkTrackVars.splice(1, savedLinkTrackVars.length);
            return this;
        },

        /**
         * @name CN.stats.omniture#trackActionEvar
         * @function
         * @description Sets an Omniture event and an evar onn a user action (onclick).
         * @param (string) eventName    Name of the event. Needs to be a valid event name defined in events object.
         * @param (object)  evtSrc  Source of the event. Is a dom node.
         * @param (string) evarName Name of the evar. Needs to be a valid evar name defined in evar object.
         * @param (string) evarVal Value of the evar.
         */
        trackActionEvar : function(eventName, evtSrc, evarName, evarVal) {
            CN.stats.omniture.setEvent(eventName);
            s = s_gi(s_account);
            s.linkTrackVars = evarName + ',events';
            s.linkTrackEvents = sEvents[eventName];
            s[evarName] = evarVal;
            s.tl(evtSrc, 'o', eventName);
            return this;
        },

        /**
         * @name CN.stats.omniture#setThirdParty
         * @function
         * @description Allows third party sites without a magazine subdomain to be tracked via omniture 3rd party cookie
         */
        setThirdParty : function () {
            var _temp_thirdparty_var = document.location.hostname.replace('www.', '').split('.');
            directories = new Array(_temp_thirdparty_var[0]).concat(directories);
            if (directories[directories.length - 1] === '') {
                directories.pop();
            }
            return this;
        },

        /**
         * @name CN.stats.omniture#trackAjaxPage
         * @function
         * @description Fires an Omniture page view event for AJAX apps.
         * @param (object) args Arg obj. Not currently used.
         */
        trackAjaxPage : function (args) {
            if (s.pdvalue == 1) s.events = s.apl(s.events, 'event28', ',', 2);
            s.events = "";

            for (var i = 0; i < arguments.length; i++) {
                CN.stats.omniture.setEvent(arguments[i]);
            }

            s.pdvalue = "";
            void(s.t());
            return this;
        },

        /**
         * @name CN.stats.omniture#doPlugins
         * @function
         * @description This function sets all of the Omniture properties. Needs to be public because omniture calls this directly.
         * @params {object} s omniture global s object
         */
        doPlugins: function(s) {
        	// Engaged Visitors
		    var timeTemp =s.getTimeSpent("event82");

		    if(timeTemp){
		        s.events = s.apl(s.events,timeTemp,",",2);
		    }

            /* Add calls to plugins here */
            if (!_ranOnce) {
                setDirectories(directories);
                _ranOnce = true;
            }
            setCampaign();
            GoogleSSCounter();
            setPageName();
            setPageType();
            setHierarchy();
            setProperties();
            setEVars();
            setAutoEvents();

            /* To setup Dynamic Object IDs */
            s.setupDynamicObjectIDs();

            /* Set Page View Event */
            CN.stats.omniture.setEvent("pageView");


            linkProps("eVar3", "prop3");
            linkProps("eVar4", "prop4");
            linkProps("eVar5", "prop5");
            linkProps("eVar6", "prop6");
            linkProps("eVar7", "prop7");
            linkProps("eVar8", "prop8");
            linkProps("eVar9", "prop9");
            linkProps("eVar11", "prop11");
            linkProps("eVar12", "prop12");
            linkProps("eVar13", "prop13");
            linkProps("eVar14", "prop14");
            linkProps("eVar16", "prop16");
            linkProps("eVar17", "prop17");
            linkProps("eVar18", "prop18");
            linkProps("eVar19", "prop19");
            linkProps("eVar23", "prop23");
            linkProps("eVar24", "prop24");
            linkProps("eVar25", "prop25");
            linkProps("eVar26", "prop26");
            linkProps("eVar27", "prop27");
            linkProps("eVar28", "prop28");
            linkProps("eVar31", "prop31");
            linkProps("eVar32", "prop32");
            linkProps("eVar45", "prop45");
            linkProps("eVar46", "prop46");
            linkProps("eVar47", "prop47");
            linkProps("eVar48", "prop48");
            linkProps("eVar49", "prop49");
            linkProps("eVar50", "prop50");
            linkProps("eVar53","prop53");
            linkProps("eVar60","prop60");
            linkProps("eVar68","prop68");
            linkProps("eVar74","prop74");

            /* Visit Depth of 5  and New Visit Begun*/
            if (s.ActionDepthTest) {
                s.pdvalue = s.getActionDepth("s_depth");
                if (s.pdvalue == 5) s.events = s.apl(s.events, 'event26', ',', 2);
                if (s.pdvalue == 1) s.events = s.apl(s.events, 'event28', ',', 2);
                s.ActionDepthTest = false;
            }

            /* Download Event */
            s.d_url = s.downloadLinkHandler(s.linkDownloadFileTypes);
            if (s.d_url) {
                s.events = s.apl(s.events, 'event18', ',', 2);
                s.linkTrackVars = "events";
                s.linkTrackEvents = "event18,";
            }

            /* dedupe the traffic sources reports */
            s.referrer = s.dedupeReferrers();

            /*Detects if referrer is external*/
            s.isReferrer = s.referrer ? s.referrer : document.referrer;
            if (s.isReferrer) {
                s.noQReferrer = s.isReferrer.indexOf('?') > -1 ? s.isReferrer.substring(0, s.isReferrer.indexOf('?')) : s.isReferrer;//removes query params
                s.lnkIntFltArray = s.split(s.linkInternalFilters, ',');
                s.lnkIntFltArrLen = s.lnkIntFltArray.length - 1;
                for (s.qI = 0; s.qI <= s.lnkIntFltArrLen; s.qI++) {
                    if (s.lnkIntFltArray[s.qI]) {
                        s.inFilts = s.noQReferrer.indexOf(s.lnkIntFltArray[s.qI]) == -1 ? false : true; //does referrer contain int. filter?  if so, set true, else set false
                        if (s.inFilts)
                            break;
                    }
                }


                /* If referrer is external, removes 'www' if present, extracts subdomain and populates eVar30 Defaults s.eVar33 with 'Other' if not set by campaign*/
                if (!s.inFilts) {
                    s.refArr = s.split(s.noQReferrer, "/");
                    s.refSub = s.refArr[2].toLowerCase();
                    s.eVar30 = (s.refSub.substring(0, 4) == "www.") ? s.refSub.substring(4) : s.refSub;
                    if (!s.eVar33) {
                        s.eVar33 = "Other";
                    }


                    /* Checks for the actual domain
                     * If it is a google domain, grab the full value
                     */
                    var periodNum = s.eVar30.split('.').length - 1; //Find the number of periods in the string
                    if ((periodNum == 1) || (document.referrer.match('google'))) {
                        s.prop39 = s.eVar30; //if only one, leave it as it is
                    } else {
                        // Only grab 2 levels of domain.
                        var d = s.eVar30.split('.'), dl = d.length;
                        s.prop39 = d.slice(dl - 2, dl).join('.');
                    }
                }

                /* Detects if referrer is a recognized search engine */
                if (s.refSub) {
                    s.SEString = '.google.|q>.yahoo.|p>.bing.|q>.ask.|q>.aol.|query>.myway.|searchfor>.netscape.|query>.altavista.|q>.lycos.|query>.msn.|q>.live.|q';
                    s.SEArray = s.split(s.SEString, ">");
                    for (s.qI2 = 0; s.qI2 < s.SEArray.length; s.qI2++) {
                        s.ArrSEV = s.split(s.SEArray[s.qI2], '|');
                        if (s.refSub.indexOf(s.ArrSEV[0]) > -1) {
                            s.kwdP = s.getQueryParam(s.ArrSEV[1], '', s.isReferrer);
                            s.kwdP = s.kwdP.toLowerCase();
                            break;
                        }
                    }
                }

                /* Modified 8/17/11 to fix bug where mbids were ignored if s.campaign was already set. Bug caused evar33 to populate 'other' even when mbid was present */
                if (s.getQueryParam('mbid') || s.getQueryParam('nav') || s.getQueryParam('fb_ref')) {
                    s.eVar33 = "Marketing";
                } else if (s.kwdP) {
                    s.eVar33 = "Natural Search";
                }

                /* Prepends 'organic' or 'paid' depending on presence of search queries */
                s.orgString = "organic: ";
                s.paidString = "paid: "
                if (s.kwdP) {
                    s.kwdP = (s.eVar33 == "Natural Search") ? s.orgString.concat(s.kwdP) : s.paidString.concat(s.kwdP);
                    if (!s.eVar22 && s.kwdP) s.eVar22 = s.kwdP;
                }

                 /* Detects if referrer is a recognized social network  //new addition - Aug 2011 & Sept 2012*/
                var ref =s.isReferrer;
                if (ref.indexOf('facebook.com')!=-1||ref.indexOf('myspace.com')!=-1||ref.indexOf('reddit.com')!=-1||ref.indexOf('digg.com')!=-1||ref.indexOf('stumbleupon.com')!=-1||ref.indexOf('twitter.com')!=-1||ref.indexOf('friendster.com')!=-1||ref.indexOf('plus.google.com')!=-1||ref.indexOf('t.co')!=-1||ref.indexOf('pinterest.com')!=-1||ref.indexOf('tumblr.com')!=-1){
                    s.eVar33 = "Social Media";
                }else {
                    s.eVar33 = s.eVar33;
                }
            }

            if (!s.isReferrer && !s.campaign && s.pdvalue === 1) {
                s.eVar33 = ('Typed/Bookmarked');
            }

            if( s.campaign === "" ? s.campaign = s.getQueryParam('mbid') : s.campaign ) {
                s.isSynd = s.campaign.toLowerCase();
                if (s.isSynd.indexOf('synd') != -1) {
                    s.eVar33 = "Syndicated";
                } else if (s.isSynd.indexOf('social_') == 0) {
                    s.eVar33 = "Social Media"
                } else if (s.isSynd.indexOf('cm_') == 0) {
                    s.eVar33 = "Consumer Marketing"
                } else if (s.isSynd.indexOf('nl_') == 0) {
                    s.eVar33 = "Newsletters" //new addition - July 2011
                }
            }

            if (s.eVar22 && !s.prop33) s.prop33 = s.eVar22;
            if (s.eVar30 && !s.prop30) s.prop30 = s.eVar30;

            s.prop33 = s.getAndPersistValue(s.prop33, 's_c33_persist', 30);//customized to expire after 30 minutes from last call
            s.prop30 = s.getAndPersistValue(s.prop30, 's_c30_persist', 30);//customized to expire after 30 minutes from last call
            s.prop39 = s.getAndPersistValue(s.prop39, 's_c39_persist', 30);//persist referring subdomains

            /*uberEvent setting, the report suite needs to be configured to only record this event once per visit*/
            s.uberArrString = 'event3,event4,event11,event12,event19,event20,event21,event22,event23,event24,event26,event18,purchase';
            s.uberArr = s.uberArrString.split(',');
            s.eventsArr = s.events.split(',');
            for (var i = 0, il = s.eventsArr.length; i < il; i++) {
                for (var f = 0, fl = s.uberArr.length; f < fl; f++) {
                    if (s.eventsArr[i] == s.uberArr[f]) {
                        s.uberCheck = true;
                        break;
                    }
                }
                if (s.uberCheck) {
                    s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event27', ',', 2);
                    s.events = s.apl(s.events, 'event27', ',', 2)
                    break
                }

            }

            /*Exit Link Previous Value*/
            s.e_url = s.exitLinkHandler();
            s.prevCont = s.getPreviousValue(s.prop5, 'gpv_p5', '');
            if (s.e_url) {
                s.prop34 = s.prevCont;
            }

            /*SearchCenter*/
            s.clickThruQuality('s_kwcid', 'event45', 'event46');
            if (s.getQueryParam('s_kwcid'))
                s.pageURL = s.manageQueryParam('s_kwcid', 1, 1);

            return this;
        },

        /**
         * @name CN.stats.omniture#init
         * @function
         * @description Does init
         */
        init: function() {

            initPlugins();
            s.trackingServer = server;
            s.trackingServerSecure = secureServer;
            s.linkInternalFilters = internalFilters;
            s.server = "";
            s.channel = "";
            s.pageType = "";
            s.currencyCode = "USD";
            s.ActionDepthTest = true

            /* WARNING: Changing any of the below variables will cause drastic
             changes to how your visitor data is collected.  Changes should only be
             made when instructed to do so by your account manager.*/
            s.visitorNamespace = "condenast";
            s.dc = 112;

            /* Link Tracking Config */
            s.trackDownloadLinks = true;
            s.trackExternalLinks = true;
            s.trackInlineStats = true;
            s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
            s.linkLeaveQueryString = false;
            s.linkTrackVars = "evar21,evar39,evar40,prop34,events";
            s.linkTrackEvents = "event3,event4,event10,event11,event12,event13,event20,event21,event22,event23,event24,event25,event29,event30,event31,event32,event37,event38,event39,event47";

            /* Plugin Config */
            s.usePlugins = true;
            s.doPlugins = CN.stats.omniture.doPlugins;

            return this;
        },

        /**
         * @name CN.stats.omniture#doPageTracking
         * @function
         * @description This function puts the omniture tracking code on the page.
         */
        doPageTracking: function () {
            if (typeof allure_product_tracking != "undefined" && allure_product_tracking && ! productlist_loaded) return false;
            //this.init();

            var s_code = s.t();
            if (s_code)document.write(s_code);
            return this;
        },

        setCustomProp: function(prop, val) {
            if (prop) {
                sProps['prop' + prop] = new function(val) {
                    return function() {
                        return val || '';
                    }
                }(val || '');
            }

            return this;
        }
    }

})()
