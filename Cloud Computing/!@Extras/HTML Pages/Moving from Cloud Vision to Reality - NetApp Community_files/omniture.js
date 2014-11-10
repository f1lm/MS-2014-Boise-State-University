var s_account = '';

var Omniture = {};

Omniture.PageLoad = {
    noPageView: false,
    isWrapperPage: false,
    detectWrapper: function() {
        if (window.wrapperTarget !== undefined) {
            Omniture.PageLoad.isWrapperPage = true;
        }
    },
    attachScriptTag: function(fname) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('src', '/includes/' + fname);
        document.body.appendChild(scriptTag);
    },
    customParams: {},
    setCustomParam: function(name, value) {
        this.customParams[name] = value;
    },
    setCustomParams: function(params) {
        this.customParams = params;
    },
    setPageVars: function(pageVars) {
        this.pageVars = pageVars;
    },
    getPageVars: function() {
        return this.pageVars;
    },
    getPageVar: function(key) {
        return this.pageVars[key];
    },
    normalizeGeo: function(geo) {
        //suppress bad geos
        if (this.GEOS[geo]) {
            return geo;
        } else {
            return 'us';
        }
    },
    mkPageLoadCall: function() {
        var newRepeat = Omniture.Util.getNewRepeat();
        var pageVars = this.pageVars; //pageVars should have been set in a preprocess block for this domain/section
        var visitNum = Omniture.Util.getVisitNum();
        if (!pageVars) return;
        var p = pageVars.pageName.split(':');
        if (p.length >= 3) {
            s.prop1 = pageVars.channel + ':' + p[2];
        }
        var geo = this.normalizeGeo(pageVars.geo);

        var _ip = '';
        if(typeof __ntap_dmdbase !== 'undefined') {
            _ip = __ntap_dmdbase.ip;
        }
        var _monster_cookie = '';
        if(!Omniture.Util.getCookie('__ntap_global_id')) {
            var _d = new Date();
            _monster_cookie = 'ntap' + _ip + '.' + _d.getTime(); // in millisec since epoch
            var _exp = new Date();
            var _time = _exp.getTime();
            _time += 3600 * 1000 * 24 * 365 * 100; // exp
            _exp.setTime(_time);
            var _a = window.location.hostname.split('.');
            var _dm = _a[_a.length-2] + '.' + _a[_a.length-1];
            Omniture.Util.setCookie('__ntap_global_id', _monster_cookie, _exp, _dm);
        } else {
            _monster_cookie = Omniture.Util.getCookie('__ntap_global_id');
        }
        s.events = pageVars.events;
        s.pageName = decodeURIComponent(pageVars.pageName);
        Omniture.Util.setCookie('_prevPage', s.pageName, null, 'netapp.com');
        s.channel = pageVars.channel;
        s.hier1 = pageVars.pageName;
        s.prop10 = newRepeat;
        s.prop34 = geo;
        s.eVar12 = geo;
        s.eVar28 = newRepeat;
        s.eVar30 = pageVars.pageName;
        s.prop30 = pageVars.pageName;
        var full_url = window.location.href.substring(0, window.location.href.indexOf("?")>=0 ?window.location.href.indexOf('?'):window.location.href.length); //full url excluding query string params.
        s.prop31 = full_url;
        s.eVar31 = full_url;
        s.eVar67 = _monster_cookie;
        s.prop35 = visitNum;
        s.eVar35 = visitNum;

        var campaign = s.getQueryParam('Media,cid,REF_SOURCE',':') || pageVars.campaign;
        if (campaign) {
            s.campaign = campaign;
            if(!Omniture.Util.getCookie('_cid')) {
                Omniture.Util.setCookie('_cid', campaign, null, 'netapp.com');
            }
            if (pageVars.campaign) delete pageVars.campaign;
        }
        s.prop27 = (campaign != undefined && campaign.length) ? campaign : pageVars.pageName;
        if (pageVars.referrer)
            s.referrer = decodeURIComponent(pageVars.referrer);
        var icid = Omniture.Util.getQueryParam('icid');
        if (icid) {
            s.eVar48 = icid;
        }
        for (var key in this.customParams) {
            s[key] = this.customParams[key];
        }
        var s_code = s.t();
        if (s_code) document.write(s_code);
    },




    parseTargetPath: function(path) {
        var targetPath = path.split('?')[0];
        var pathArray = targetPath.split('/');
        var out = pathArray.pop();
        return out;
    },
    mkWrapperCall: function() {
        var baseName = this.parseTargetPath(wrapperTarget);
        if (baseName == "r")
            baseName = this.parseTargetPath(wrapperTargetHTML);
        var params = {
            eVar6: baseName,
            events: 'event4'
        };
        Omniture.Call.customLink({href: '/' + baseName}, params, 'd');
    },
    callOmniture: function() {
        //called right after 'process' hooks
        if (this.isWrapperPage) {
            this.mkWrapperCall();
        } else {
            if(!this.noPageView) {
                this.mkPageLoadCall();
            }
        }
    }
};

(function() {
    var geos = [
        'us',
        'uk',
        'mx',
        'jp',
        'fr',
        'ch',
        'it',
        'il',
        'in',
        'au',
        'br',
        'pt',
        'cn',
        'de',
        'ru',
        'nl',
        'es',
        'kr',
        'as',
        'ca',
        'se'
    ];
    Omniture.PageLoad.GEOS = {};
    for (var i = 0; i < geos.length; i++) {
        Omniture.PageLoad.GEOS[geos[i]] = 1;
    }
})();

Omniture.Channels = {
    known: {
        'products': 1,
        'careers': 2,
        'communities': 3,
        'company': 5,
        'solutions': 6,
        'library': 7,
        'blogs': 8,
        'home': 9,
        'services': 10,
        'forms': 11,
        'seek': 12,
        'how-to-buy': 13,
        'contact-us': 14,
        'campaigns': 15,
        'investors': 16,
        'partners': 17,
        'technology': 18,
        'support': 19,
        'search': 20,
        'error': 21,
        'media': 22,
        'site': 23,
        'bizapps': 24,
        'communicate': 25,
        'sitemap': 26,
        'suppliers': 27,
        'on24': 28,
        'cisco-vmware': 29,
        'iva': 30,
        'storage-efficiency': 31,
        'nurture': 32,
        'midsize-storage-efficiency': 33
    },
    isKnown: function(channel) {
        return this.known[channel];
    }
};

Omniture.System = {
    findMatches: function(c, depth) {
        var out = [];
        if (depth === undefined) depth = 0;
        var currPathNode = this.pathArray[depth];
        var wildcardMatch = c['*'];
        var exactMatch = c[currPathNode];
        var matchList = [wildcardMatch, exactMatch];
        for (var i = 0; i < matchList.length; i++) {
            var match = matchList[i];
            if (!match) continue;
            out[out.length] = match;
            var matches = this.findMatches(match, depth+1);
            out = out.concat(matches);
        }
        return out;
    },
    getConfigNodes: function() {
        var domain = window.location.hostname;
        var path = window.location.pathname;
        var partialPathArray = path.split('/');
        var len = partialPathArray.length;
        if (partialPathArray[len-1] == '') {
            partialPathArray[len-1] = 'index.html';
        }
        len = partialPathArray.length;
        var compactArray = [];
        for (var i = 0; i < len; i++) {
            var cell = partialPathArray[i];
            if (cell != undefined && cell.length > 0)
                compactArray.push(cell);
        }
        this.pathArray = [domain].concat(compactArray);
        return this.findMatches(Omniture.Config);
    },
    callHooks: function(hookName) {
        for (var i = 0; i < this.matches.length; i++) {
            var match = this.matches[i];
            var fcn = match[hookName];
            if (fcn) fcn();
        }
    },
    preProcess: function() {
        this.matches = this.getConfigNodes();
        this.callHooks('_preprocess');
    },
    process: function() {
        this.callHooks('_process');
        Omniture.PageLoad.callOmniture();
    },
    postProcess: function() {

        this.callHooks('_postprocess');
    }
};

Omniture.Util = {
    isLive: function() {
        var domain = window.location.hostname;
        if (domain == "www.netapp.com") {
            return true;
        } else {
            return false;
        }
    },
    getGeo: function() {
        return window.location.pathname.substring(1, 3);
    },
    getPageName: function() {
        return window.location.pathname.substring(1).split('/').join(':');
    },
    getStrippedBasename: function() {
        return window.location.pathname.split('/').pop().split('.')[0];
    },
    getNormalizedPageName: function() {
        var path = window.location.pathname;
        var pathArray = path.split('/');
        var last = pathArray.pop();
        if (last == '') {
            pathArray.push('index');
        } else {
            var base = last.split('.')[0];
            pathArray.push(base);
        }
        var out = pathArray.join(':');
        return out.substring(1); //remove the leading :
    },
    getNewRepeat: function() {
        return s.getNewRepeat();
    },
    setCookie: function(key, value, exp, domain) {
        var cookieStr = escape(key) + "=" + escape(value) + (exp ? "; expires=" + exp.toUTCString() : "") + "; path=/";
        if (domain) {
            cookieStr += "; domain=" + escape(domain);
        }
        document.cookie = cookieStr;
    },
    deleteCookie: function(key, domain) {
        var exp = new Date(1970, 1, 1);
        this.setCookie(key, '', exp, domain);
    },
    getCookie: function(key) {
        if (document.cookie.length == 0) return;
        var start = document.cookie.indexOf(key + "=");
        if (start != -1) {
            var valStart = start + key.length + 1;
            var end = document.cookie.indexOf(";", valStart);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(valStart, end));
        }
    },
    setDebug: function(val) {
        this.debugOn = val;
    },
    isDebugOn: function() {
        return this.debugOn;
    },
    log: function(thing) {
        if (this.isDebugOn() && window.console) console.log(thing);
    },
    strip: function(s) {
        var out = s;
        if(out) {
            if (out.stripTags) { // sometimes Prototype isn't available
                out = out.replace(/</g, ' <');
                out = out.stripTags();
            }
            out = out.replace(/\s+/g, ' ');
            out = out.replace(/^\s+|\s+$/g, '');
        }
        return out;
    },
    getQueryParams: function(sep) {
        var qs = window.location.search.substring(1); //remove the leading '?'
        if (!sep) sep = '&';
        var pairs = qs.split(sep);
        var out = {};
        for (var i = 0; i < pairs.length; i++) {
            var nvArray = pairs[i].split('=');
            var name = nvArray[0];
            var value = nvArray[1];
            out[name] = value; //no need to handle multiple values for now
        }
        return out;
    },
    getQueryParam: function(name, sep) {
        if (!this.queryParams) {
            this.queryParams = this.getQueryParams(sep);
        }
        return this.queryParams[name];
    },
    getPrevPage: function() {
        return Omniture.Util.getCookie('_prevPage');
    },
    getVisitNum: function() {
        return s.getVisitNum();
    }

};

Omniture.Call = {
    customLink: function(element, params, type) {
        Omniture.Util.log(element);
        Omniture.Util.log(params);
        if (type === undefined) type = 'o';
        var keys = "";
        for (key in params) {
            if (keys.length > 0) keys += ',';
            keys += key;
            s[key] = Omniture.Util.strip(params[key]);
        }
        s.linkTrackVars = keys;
        s.linkTrackEvents = params.events;
        var linkName = undefined;
        if (params.linkName) {
            linkName = params.linkName;
            delete params.linkName;
        }

        s.tl(element, type, linkName);
    }
};

Omniture.SharedConfigs = {
    'WWW': {
        '_preprocess': function() {
            Omniture.SiteSections.WWW.preprocess();
        },
        '_postprocess': function() {
            Omniture.SiteSections.WWW.postprocess();
            //Omniture.Listeners.FeaturedContentModule.attachListeners();
        },
        '*': {
            'index.aspx': {
                '_postprocess': function() {
                    //Omniture.Listeners.attachHomePageListeners();
                    //move above to the PL due to index.aspx doesn't show on the url.
                }
            },
            'campaigns': {
                'clustered-ontap': {
                    '_postprocess': function() {
                        Omniture.Listeners.attachOntapLPListeners();
                    }
                }
            },
            'forms': {
                '_preprocess': function() {
                    Omniture.SiteSections.Forms.setupParameters();
                },
                'clustered-ontap.aspx': {
                    '_postprocess': function() {
                        Omniture.Listeners.attachOntapFormListeners();
                    }
                }
            },
            'company':{
                'events': {
                    'ms-cafe-briefings':{
                        '_preprocess': function() {
                            Omniture.SiteSections.Forms.setupParameters();
                        }
                    },
                    'cafe-briefings':{
                        '_preprocess': function() {
                            Omniture.SiteSections.Forms.setupParameters();
                        }
                    }
                }
            },
            'search': {
                '_preprocess': function() {
                    Omniture.SiteSections.Search.preprocess();
                },
                '_postprocess': function() {
                    Omniture.Listeners.attachSearchListeners();
                }
            },
            'library': {
                '_postprocess': function() {
                    Omniture.Listeners.attachLibrarySearchListener();
                }
            },
            'us': {
                'campaigns': {
                    'builton': {
                        '_preprocess': function() {
                            Omniture.SiteSections.EpicStory.preprocess();
                        }
                    }
                }
            },
            'error': {
                '_process': function() {
                    Omniture.SiteSections.WWWError.process();
                }
            }
        }
    },
    'TcoCalc': {
        '*':{
            '_preprocess': function() {
                Omniture.SiteSections.TcoCalc.preprocess();
            }
        }
    },
    'NDOCalc': {
        '*': {
            '_preprocess': function () {
                Omniture.SiteSections.NDOCalc.preprocess();
            }
        }
    },
    'Communities': {
        '_preprocess': function() {
            Omniture.SiteSections.Communities.preprocess();
        },
        '_postprocess': function() {
            Omniture.Listeners.attachCommunitiesListener();
        }
    },

    'Get': {
        '_preprocess': function() {
            Omniture.SiteSections.Get.preprocess();
        }
    },
    'Box': {
        '_preprocess': function() {
            Omniture.SiteSections.Box.preprocess();
        },
        '_postprocess': function() {
            Omniture.SiteSections.Box.postprocess();
        }
    }

};

Omniture.Config = {
    'www.netapp.com': Omniture.SharedConfigs.WWW,
    'localhost': Omniture.SharedConfigs.WWW,
    'webdev-rtp.hq.netapp.com': Omniture.SharedConfigs.WWW,
    'www-stg.netapp.com': Omniture.SharedConfigs.WWW,
    'www.ntapsmbtco.com': Omniture.SharedConfigs.TcoCalc,
    'ntapsmbtco.com': Omniture.SharedConfigs.TcoCalc,
    'private-communities.netapp.com': Omniture.SharedConfigs.Communities,
    'get.netapp.com': Omniture.SharedConfigs.Get,
    'box.netapp.com': Omniture.SharedConfigs.Box,
    'www.ndocalc.com': Omniture.SharedConfigs.NDOCalc,
    'ndocalc.com': Omniture.SharedConfigs.NDOCalc


};

Omniture.SiteSections = {
    WWW: {
        preprocess: function() {
            this.calculatePageVars();
        },
        postprocess: function() {
            Omniture.Listeners.attachChatContactSalesListeners();
            Omniture.Listeners.attachSocialListeners();
            Omniture.Listeners.attachSalesPromoListeners();
        },
        calculatePageVars: function() {
            var path = document.location.pathname;
            var pathArray = path.split('/');
            var len = pathArray.length;
            var baseName = pathArray[len-1];
            var geo = pathArray[1];
            var channel = pathArray.length > 3 ? pathArray[2] : 'home';
            var subSection = pathArray.length >= 5 ? pathArray[3] : '';
            var pageName = pathArray.slice(1, len-1).join(':') + ':';
            if (baseName && baseName.length > 0) {
                pageName += baseName.split('.')[0];
            } else {
                pageName += 'index';
            }
            var pageVars = {
                'baseName': baseName,
                'channel': channel,
                'pageName': pageName,
                'geo': geo,
                'events': 'event29'
            };
            var referrer = Omniture.Util.getQueryParam('referrer');
            if (referrer) {
                pageVars.referrer = referrer;
            }

            if(path.indexOf('system/pdf-reader') >= 0) {
                Omniture.PageLoad.noPageView = true;
            }

            Omniture.PageLoad.setPageVars(pageVars);
            if(typeof __ntap_broken_link !== 'undefined') {
                Omniture.PageLoad.customParams = {
                    pageType: 'errorPage',
                    pageName: '404:' + __ntap_broken_link,
                    prop16: __ntap_broken_link
                };
            }
            //report suite stuff
            //the current prototype /us/desktop messed up our site channels
            //so comment out the channels checking logic for now.
            //if (Omniture.Channels.isKnown(channel)) {
            var isLive = Omniture.Util.isLive();
            var suffix = isLive ? '' : '-dev';
            if(isLive) {
                s_account = 'networkapplnetappcom-' + geo + suffix + ',networkapplglobalexternal' + suffix;
            }
            else {
                s_account = 'networkapplnetappcom-' + geo + suffix + ',networkapplglobalexternal' + suffix;
            }
            //} else {
            //  s_account = 'networkapplnetappcom-spam';
            //}
        }
    },
    Search: {
        preprocess: function(){
            var searchTerm = Omniture.Util.getQueryParam("q");
            var page = Omniture.Util.getQueryParam("page");
            var refinement = Omniture.Util.getQueryParam("q1");
            if($('article.noResults').length > 0){
                searchTerm = "null:" + searchTerm;
            }
            var customParams = {};
            if(searchTerm && (!page && !refinement)){
                customParams = {
                    events: 'event8',
                    prop5: searchTerm,
                    eVar1: searchTerm,
                    prop6: Omniture.Util.getPrevPage()
                };
            }
            Omniture.PageLoad.setCustomParams(customParams);
        }
    },
    EpicStory: {
        preprocess: function() {
            if(window.location.href.indexOf('story3') > 0) {
                Omniture.PageLoad.setCustomParam('events', 'event29,event78');
                Omniture.PageLoad.setCustomParam('eVar47', 'epic story');
            }

            if(window.location.href.indexOf('story7') > 0) {
                Omniture.PageLoad.setCustomParam('events', 'event29,event79');
                Omniture.PageLoad.setCustomParam('eVar47', 'epic story');
            }
        }
    },
    Forms: {
        setupParameters: function() {
            var baseName = Omniture.System.pathArray[Omniture.System.pathArray.length-1];
            var formName = Omniture.Util.getStrippedBasename();
            var eventName = Omniture.System.pathArray[Omniture.System.pathArray.length-2];

            if (baseName.indexOf("sales-contact") >= 0) {
                formName = 'Sales Inquiry';
            }
            if(window.location.href.indexOf('events') > 0) {
                formName = eventName+":event"
            }
            if(baseName.indexOf("pcdownload") >= 0) {
                formName = "FCRegistration";
                var assetName = Omniture.Util.getQueryParam('pconid');
                Omniture.PageLoad.setCustomParam('eVar5', assetName);
            }
            // formname-ty or forname-ty-yy (yy is lang code)
            if((formName.indexOf("-ty") >= 0) && ((formName.lastIndexOf("-ty") == formName.length - 3) || (formName.lastIndexOf("-ty") == formName.length - 6) ) ) {
                formName = formName.replace("-ty", "");
            }

            if ((document.location.search.indexOf("s=y")>= 0) || (Omniture.Util.getStrippedBasename().indexOf("-ty") >= 0) )
                this.setThankYouParams(formName);
            else
                this.setFormParams(formName);

        },
        setFormParams: function(formName) {
            Omniture.PageLoad.setCustomParam('events', 'event29,event78');
            Omniture.PageLoad.setCustomParam('eVar47', formName);
        },
        setThankYouParams: function(formName) {
            var eventName = Omniture.System.pathArray[Omniture.System.pathArray.length-2];
            var events_str = 'event29';
            if(document.referrer.indexOf("now.eloqua.com") >= 0) {
                events_str += ',event79';
                if(formName == 'Sales Inquiry') {
                    events_str += ',event80';
                }
                if(window.location.href.indexOf('events') > 0) {
                    formName = eventName+":event";
                }
                Omniture.PageLoad.setCustomParam('eVar47', formName);
            }
            if(formName.indexOf('eit-msb-library') >= 0 || formName.indexOf('FCRegistration') >= 0) {
                events_str += ',event1';
            }
            Omniture.PageLoad.setCustomParam('events', events_str);
            var geo = Omniture.Util.getGeo();
            if(window.location.href.indexOf('events') > 0) {
                Omniture.PageLoad.setCustomParam('pageName', geo +':'+ eventName +':event:thankyou');
            }else{
                Omniture.PageLoad.setCustomParam('pageName', geo + ':forms:thankyou-' + Omniture.Util.getStrippedBasename());
            }

        }
    },
    WWWError: {
        process: function() {
            var errorURL = s.getQueryParam('errorURL');
            Omniture.PageLoad.customParams = {
                pageType: 'errorPage',
                pageName: '404:' + errorURL,
                prop16: errorURL
            };
        }
    },
    TcoCalc: {
        preprocess: function() {
            s_account = 'networkapplglobalexternal';
            var country = geo;
            var page = Omniture.Util.getNormalizedPageName();
            var path = document.location.pathname;
            var pathArray = path.split('/');
            var lastElm = pathArray.pop();
            if(lastElm.indexOf('.php') == -1 || lastElm.indexOf('index.php') != -1 ){
                var pageVars = {
                    pageName: country+':tcocalc:index',
                    channel: 'calculator',
                    geo: country,
                    events: 'event29,event78'
                };
                Omniture.PageLoad.setPageVars(pageVars);
                Omniture.PageLoad.setCustomParam('eVar47', 'tcocalc registration form');
            }else{
                var pageName = country +':tcocalc:'+ page;

                if (typeof error != 'undefined'){
                    pageName = country +':tcocalc:error';
                }
                var pageVars = {
                    pageName: pageName,
                    channel: 'calculator',
                    geo: country,
                    events: 'event29'
                };
                Omniture.PageLoad.setPageVars(pageVars);
                if (typeof error != 'undefined'){return;}
            }
        }
    },
    NDOCalc: {
        preprocess: function () {
            s_account = 'networkapplglobalexternal';
            var country = geo;
            var page = Omniture.Util.getNormalizedPageName();
            var path = document.location.pathname;
            var pathArray = path.split('/');
            var lastElm = pathArray.pop();

            if (lastElm.indexOf('Form.aspx') != -1) {

                var pageVars = {
                    pageName: country + ':ndocalc:form',
                    channel: 'calculator',
                    geo: country,
                    events: 'event29,event78'
                };
                Omniture.PageLoad.setPageVars(pageVars);
                Omniture.PageLoad.setCustomParam('eVar47', 'ndocalc registration form');

            } else {
                if (lastElm.indexOf('.aspx') == -1 || lastElm.indexOf('Default.aspx') != -1) {
                    var pageName = country + ':ndocalc:index';
                } else {
                    var pageName = country + ':ndocalc:' + page;
                }

                var pageVars = {
                    pageName: pageName,
                    channel: 'calculator',
                    geo: country,
                    events: 'event29'
                };
                Omniture.PageLoad.setPageVars(pageVars);

                //if (typeof error != 'undefined') { return; }
            }
        }
    },
    Communities: {
        preprocess: function() {
            s_account = 'networkapplextcomm';
            var pageName = 'us:communities:' + Omniture.Util.getNormalizedPageName();
            if (window.location.pathname.indexOf('dave') >=0) {
                s_account = 'networkappldavesblog';
                var pageVars = {
                    pageName: pageName,
                    channel: 'daves blog',
                    geo: 'us',
                    events: 'event29'
                };
            }
            else{
                var pageVars = {
                    pageName: pageName,
                    channel: 'communities',
                    geo: 'us',
                    events: 'event29'
                };
            }
            Omniture.PageLoad.setPageVars(pageVars);
        }
    },

    Get: {
        preprocess: function() {
            s_account = 'networkapplglobalexternal';
            var pageName = Omniture.Util.getNormalizedPageName();
            var pageVars = {
                'channel': 'get',
                'pageName': pageName,
                'events': 'event29'
            };
            Omniture.PageLoad.setPageVars(pageVars);
        }
    },
    Box: {
        preprocess: function() {
            s_account = 'networkapplglobalexternal';
            var pageName = Omniture.Util.getNormalizedPageName();
            var pageVars = {
                'channel': 'box',
                'pageName': pageName,
                'events': 'event29'
            };
            Omniture.PageLoad.setPageVars(pageVars);
        },
        postprocess: function() {
            Omniture.Listeners.attachSocialListeners();
        }
    }
};
Omniture.Listeners = {
    attachChatContactSalesListeners: function() {
        $('#main address a').click(function() {
            var params = {
                eVar44: $(this).attr('id'),
                events: 'event6'
            };
            Omniture.Call.customLink({ href: '/' }, params, 'o');
        });
    },
    makeWidgetCall: function(linkText) {
        var params = {
            prop43: linkText,
            eVar43: linkText,
            events: 'event5'
        };
        Omniture.Call.customLink({href:'/' + linkText}, params);
    },
    attachOntapLPListeners: function() {
        $('a[href*="on24.com"]').mousedown(function() {
            var params = {
                eVar45: 'CDOTEvent1WOD',
                events: 'event7'
            };
            Omniture.Call.customLink({ href: '/' }, params, 'o');
        });
    },

    attachOntapFormListeners: function() {
        $('#paidSearchForm a[class*="button"]').mousedown(function() {
            var txt = $(this).text();
            var params = {
                eVar43: 'Webcast Reg-' + txt,
                events: 'event5'
            };
            Omniture.Call.customLink({ href: '/' }, params, 'o');
        });

        $('#social-contact img').mousedown(function() {
            var txt = $(this).attr('title');
            var params = {
                eVar43: 'CDOT Webcast-' + txt,
                events: 'event5'
            };
            Omniture.Call.customLink({ href: '/' }, params, 'o');
        })
    },
    trackSocialWidgets: function(){
        if( $(this).parent().attr('class') != 'DownloadLink' ) {
            var $socialShareText = $(this).data("ntapSocial");
            Omniture.Listeners.makeWidgetCall($socialShareText);
        }
        else{
            var params = {
                eVar45: 'Download Now',
                events: 'event7'
            };
            Omniture.Call.customLink({href:'/'}, params);
        }
    },
    attachSocialListeners: function() {
        var $socialShareIcons = $('div.container1').find('ul.social li a');
        var $footerFollowIcons = $('footer#contentInfo').find('ul.social li a');
        var $attrSocialIcons = $('[data-ntap-social]'); // this one in theory include the above 2, but just in case
        var $pdfShareIcons = $('div#headerLinksMV').find('ul li a');
        var $allSocialIcons = $socialShareIcons.add($footerFollowIcons).add($attrSocialIcons).add($pdfShareIcons);

        $allSocialIcons.bind('click', Omniture.Listeners.trackSocialWidgets);
    },
    attachSalesPromoListeners: function() {
        $('#contactemail').click(function() {

            var params = {
                eVar44: "sales promo",
                events: 'event6'
            };
            Omniture.Call.customLink({ href: '/' }, params, 'o');
        });
    },


    attachLibrarySearchListener: function() {
        $('.search .searchBtn').click(function() {
            var keyword = 'library: ' + $('#libraryKeyword').val();
            var pathname = window.location.pathname;
            if(pathname.indexOf('video') >= 0) {
                keyword = 'video library: ' + $('#librarySearch').val();
            }
            var params = {
                prop42: keyword,
                eVar42: keyword,
                events: 'event8'
            };
            Omniture.Call.customLink({href:document.location.pathname}, params);
        });

    },
    attach3DDemoListeners: function() {
        //move the logic to test.js due to timing issue of lazyloading flexslider and due to the other function in test.js hide the button causing racing condition.
    },
    attachHomePageListeners: function() {
        $('.slides .button').mousedown(function() {
            var cta_button = $(this).attr('href');
            if(typeof cta_button == 'undefined') {
                cta_button = 'hp banner video'; //+ $(this).attr('data-ntap-video');
            }
            else {
                cta_button = 'hp banner ' + cta_button;
            }
            var params = {
                eVar45: cta_button,
                events: 'event7'
            };
            Omniture.Call.customLink({href: '/'}, params);
        });
        $('#main .container2 a').mousedown(function() {
            var params = {
                eVar45: 'hp ad ' + $(this).attr('href'),
                events: 'event7'
            };
            Omniture.Call.customLink({href: '/'}, params);
        });
        $('#main .container4 .text a').mousedown(function() {
            var params = {
                eVar45: 'hp button ' + $(this).attr('href'),
                events: 'event7'
            };
            Omniture.Call.customLink({href: '/'}, params);
        });
    },
    attachCommunitiesListener: function(){
        var makeLoginCall = function(linkText) {
            var params = {
                eVar13: linkText,
                events: 'event13'
            };
            Omniture.Call.customLink({href:'/' + linkText}, params);
        }
        var memberLogin = jQuery('#navLogin');
        if(memberLogin.length > 0){
            memberLogin.click(function() {
                makeLoginCall("Member Login");
            });
        }
        var register = jQuery('#jive-nav-link-reg');
        if(register.length > 0){
            register.click(function() {
                makeLoginCall("Register");
            });
        }
        var loginLink1 = jQuery('.j-guest-tip.jive-info-box.j-rc5 a:eq(0)');
        loginLink1.click(function() {
            makeLoginCall("Member Login");
        });
        var loginLink2 = jQuery('.j-guest-tip.jive-info-box.j-rc5 a:eq(1)');
        loginLink2.click(function() {
            makeLoginCall("Register");
        });
        var loginLink3 = jQuery('.j-intro-login a:eq(0)');
        loginLink3.click(function() {
            makeLoginCall("Member Login");
        });
        var loginLink4 = jQuery('.j-intro-login a:eq(1)');
        loginLink4.click(function() {
            makeLoginCall("Register");
        });
    },
    attachSearchListeners: function() {
        jQuery('#adBlock a.button').click(function() {
            var bannerName = jQuery('#adBlock h1').html();
            var params = {
                eVar48: 'bnr-oss '+ bannerName
            };
            Omniture.Call.customLink({href: '/'}, params);
        });

    }
};

Omniture.System.preProcess();
jQuery(window).load(function () {
    Omniture.System.postProcess();
});
