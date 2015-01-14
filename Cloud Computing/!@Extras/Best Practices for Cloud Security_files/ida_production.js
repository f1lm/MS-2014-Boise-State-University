/*Wiki page link for tracking versions -
 * https://w3-connections.ibm.com/wikis/home?lang=en#!/wiki/We47dc116426d_4c14_bbb4_f8a324d0b5dc/page/IDA%20script%20version%20updates
 */
var v16elu = {

    // default sets
    CID : '50200000',

    cmSetClientID: {
        id : null,
        managedFirstParty : true,
        dataCollectionDomain : 'data.coremetrics.com',
        cookieDomain : document.domain.split('.').splice(-2, 2).join('.')
        //cookieDomain : (document.domain.indexOf('ibm.com') !== -1) ? 'ibm.com' : document.domain
    },

    NTPT_DOWNLOADTYPES : "bqy,doc,dot,exe,flv,jpg,png,mov,mp3,pdf,pps,ppt,rss,sh,swf,tar,txt,wmv,xls,xml,zip,avi,eps,gif,lwp,mas,mp4,pot,prz,rtf,wav,wma,123,odt,ott,sxw,stw,docx,odp,otp,sxi,sti,pptx,ods,ots,sxc,stc,xlsx",
    NTPT_DOMAINLIST : ".ibm.co,.ibm.com,.lotuslive.com,.cognos.com,.webdialogs.com,.servicemanagementcenter.com,.xtify.com,.ibmcloud.com,.ibmdw.net,.bluemix.net,.smartercitiescloud.com",
    evhndlr : true,

    //function to bind any event
    bind_event : function (event, func) {
        if ((typeof (func) == "function") && document.body) {
            if (document.body.addEventListener) {
                document.body.addEventListener(event, func, true);
            } else if (document.body.attachEvent) {
                document.body.attachEvent("on" + event, func);
            }
        }
    },

    //function to track any event		
    event_tracking : function () {
        var e = "click";
        this.bind_event(e, this.download_offsite_tracking);

        e = "mouseup";
        this.bind_event(e, this.middle_click_tracking);

        e = (navigator.appVersion.indexOf("Chrome") || navigator.appVersion.indexOf("MSIE") != -1) ? "contextmenu" : "mousedown";
        this.bind_event(e, this.right_click_tracking);
    },

    //function to create query string
    Querystring : function (qs) {
        this.params = {};
		if (qs == null)
			qs = location.search.substring(1, location.search.length);
		if (qs.length == 0)
			return;
        qs = qs.replace(/\+/g, ' ');
        var args = qs.split('&'), // parse out name/value pairs separated via &
            pair = "",
            name = "",
            value = "";
        for (var i = 0; i < args.length; i++) {
            pair = args[i].split('=');
            name = decodeURIComponent(pair[0]);
            value = (pair.length == 2) ? decodeURIComponent(pair[1]) : name;
            this.params[name] = value;
        }
    },

    //function to match the tags
    evt_element : function (evt, tag) {
        var e = evt.target || evt.srcElement;
        while (e.tagName && (e.tagName.toLowerCase() != tag.toLowerCase())) {
            var temp = e.parentElement || e.parentNode;
            if (!temp) {
                return e;
            }
            e = temp;
        }
        return e;
    },

    //function to track left click
    download_offsite_tracking : function (evt) {
        evt = evt || (window.event || "");
        if (evt && ((typeof (evt.which) != "number") || (evt.which == 1))) {
        	var e = evt.target || evt.srcElement,
        		statsEvent = (e.getAttribute("onclick") !== null) ? (e.getAttribute("onclick").indexOf("ibmStats.event")) : -1;
			if(statsEvent === -1){
            	v16elu.tracking_events(evt);
        	}
        }
    },

    //function to track right click
    right_click_tracking : function (evt) {
        evt = evt || (window.event || "");
        if (evt) {
            //evt.preventDefault();written for disabling right click
            var btn = evt.which || evt.button;
            if ((btn != 1) || (navigator.userAgent.indexOf("Safari") != -1)) {
                v16elu.tracking_events(evt);
            }
        }
    },

    //function to track middle click
    middle_click_tracking : function (evt) {
        evt = evt || (window.event || "");
        if (evt && ((typeof (evt.which) !== 'undefined' && evt.which == 2) || (typeof (evt.button) !== 'undefined' && evt.button == 4))) {
            v16elu.tracking_events(evt);
        }
    },

    //function to track events on click
    tracking_events : function (evt) {
        var pageid = "";
		var cloudExchangeElements = "";
        if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined") {
        	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
        		pageid = window.digitalData.page.pageInfo.pageID;
        	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
        		pageid = window.digitalData.page.pageID;
        	}
			//element tags for Cloud Exchange page
			if(typeof(v16elu.siteID) !== "undefined" && v16elu.siteID.substring(0, 13).toLowerCase() == "cloudexchange" && typeof (window.digitalData.page.attributes) != "undefined"){
				cloudExchangeElements = v16elu.addCloudExchangeElements(cloudExchangeElements);
				if(cloudExchangeElements !== "") pageid = pageid + cloudExchangeElements;
			}
        }
        var e = v16elu.evt_element(evt, "A");
        if ((typeof e.tagName !== 'undefined' && e.tagName.toLowerCase() == 'a') && !!e.href) {
            var hn = e.hostname ? (e.hostname.split(":")[0]) : "",
                pr = e.protocol || "",
                fullurl = escape(e.href),
                qry = e.search ? e.search.substring(e.search.indexOf("?") + 1, e.search.length) : "",
                evAction = (e.protocol == "ftp:") ? fullurl.substr(8) : ((e.protocol == "https:") ? fullurl.substr(10) : fullurl.substr(9)),
                evid = (e.protocol == "ftp:") ? e.href.substr(6) : ((e.protocol == "https:") ? e.href.substr(8) : e.href.substr(7)),
                qs1 = new v16elu.Querystring(qry),
                v1 = qs1.get("attachment"),
                v2 = qs1.get("FILE"),
                v3 = qs1.get("attachmentName");
                
            //replace -_- from URL if exists due to cmCreateElementTag function
            if(evAction.indexOf('-_-') != -1){
            	evAction = evAction.replace(/-_-/g,"---");;
            }

            var vparam = "none";
            if (v1 != null) {
 				 vparam = v1;
 			}
 			else if (v2 != null) {
 				 vparam = v2;
 			}
 			else if (v3 != null) {
 				 vparam = v3;
 			}
            var download_param = vparam.toLowerCase(),
                download_uri = e.pathname.toLowerCase();
			if (evid.length > 50)
				evid = evid.substring(0, 22) + "..." + evid.substring(evid.length - 25, evid.length);
            if (v16elu.domtest(hn)) {
                if (v16elu.match(download_uri, v16elu.NTPT_DOWNLOADTYPES) || v16elu.match(download_param, v16elu.NTPT_DOWNLOADTYPES)) {
                    //function for download tracking
                    var pth = e.pathname ? ((e.pathname.indexOf("/") != 0) ? "/" + e.pathname : e.pathname) : "/",
                        ttl = "",
                        text = document.all ? e.innerText : e.text,
                        img = v16elu.evt_element(evt, "IMG");
                    if (img.alt) {
                        ttl = img.alt;
                    } else if (text) {
                        ttl = text;
                    } else if (e.innerHTML) {
                        ttl = e.innerHTML;
                    }
                    if (v16elu.evhndlr != false) {
                        if (vparam == "none") {
                            //coremetricsParam = 'download' + '-_-' + evAction.toLowerCase() + '-_--_--_--_--_--_--_-';
                            coremetricsParam = evAction.toLowerCase() + '-_--_--_--_--_--_--_--_--_--_--_--_--_-' + pageid;
                            if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'download', 'download' + '-_-' + coremetricsParam);
                            //v16elu.pause(500);
                        } else {
                            //coremetricsParam = 'download' + '-_-' + download_param + '-_--_--_--_--_--_--_-';
                            coremetricsParam = download_param + '-_--_--_--_--_--_--_--_--_--_--_--_--_-' + pageid;
                            if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(download_param, 'download', 'download' + '-_-' + coremetricsParam);
                            //v16elu.pause(500);
                        }
                    }

                } else {
                    //function for normal page tracking
                	if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'page click', 'page click' + '-_-' + evAction + '-_--_--_--_--_--_--_--_--_--_--_--_--_-' + pageid);
                    //v16elu.pause(500);
                }
            } else {
                //function for offsite tracking
                if ((hn.length > 0) && (pr.indexOf("http") == 0 || pr.indexOf("mailto") == 0) && (!v16elu.domtest(hn))) {
                    if (v16elu.evhndlr != false) {
                    	if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'external link', 'external link' + '-_-' + evAction + '-_--_--_--_--_--_--_--_--_--_--_--_--_-' + pageid);
                        //v16elu.pause(500);
                    }
                }
            }
        }
    },

    //function to check the domains from NTPT_DOMAINLIST
    domtest : function (host) {
    	var bool = false;
        if (host.length > 0) {
            host = host.toLowerCase();
            if (host == window.location.hostname.toLowerCase()) {
                bool = true;
            } else {
                var doms = this.varlist(v16elu.NTPT_DOMAINLIST);
                var len = doms.length;
                for (var i = 0; i < len; i++) {
                    if (host == doms[i] || host.search(doms[i]) != -1) {
                        bool = true;
                    }
                }
            }
        }
        return bool;
    },

    //function to check variable list
    varlist : function (list) {
        var items = list.toLowerCase().split(","),
            len = items.length;
        for (var i = 0; i < len; i++) {
            items[i] = items[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }
        return items;
    },

    //function to match the download types from NTPT_DOWNLOADTYPES
    match : function (pth, typelist) {
        var type = pth.substring(pth.lastIndexOf(".") + 1, pth.length),
            types = this.varlist(typelist),
            tlen = types.length;
        for (var i = 0; i < tlen; i++) {
            if (type == types[i]) {
                return true;
            }
        }
        return false;
    },

    //function to create pause
    pause : function (ms) {
        var date = new Date();
        var curDate = null;
        do {
            curDate = new Date();
		} while (curDate - date < ms);
    },

    //function to fetch the content of the meta tag
    get_meta_tag : function (name) {
        var metatags = document.getElementsByTagName('meta'),
        	metaValue = null;
        for (var i = 0; i < metatags.length; i++) {
            if (metatags[i].getAttribute("name") == name) {
                metaValue = metatags[i].getAttribute("content");
            }
        }
        if (metaValue == null) {
            metaValue = v16elu.checkJSON(name);
        }
        return metaValue;
    },

    //set siteID from digitalData siteID or categoryID from old DDO
    checkJSON : function (name) {
        name = name.toLowerCase().replace('.', '_');
        if (digitalData.page) {
            for (var len in digitalData.page.attributes) {
                if (digitalData.page.attributes.hasOwnProperty(len) && len.toLowerCase() == name) {
                    return digitalData.page.attributes[len];
                }
            }
        }
        return null;
    },

    //function to create QueryString variable
    create_QueryString : function () {
        window.QueryString = {}
        var query = window.location.search.substring(1),
            vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof QueryString[pair[0]] === "undefined") {
                QueryString[pair[0]] = pair[1];
            } else if (typeof QueryString[pair[0]] === "string") {
                var arr = [QueryString[pair[0]], pair[1]];
                QueryString[pair[0]] = arr;
            } else {
                QueryString[pair[0]].push(pair[1]);
            }
        }

    },
	
	//function to add element attributes for Cloud Exchange
	addCloudExchangeElements : function(ce){
		ce += (window.digitalData.page.attributes.cspClient) ? ("-_-" + window.digitalData.page.attributes.cspClient) : '';
		ce += (window.digitalData.page.attributes.cspOffering) ? ("-_-" + window.digitalData.page.attributes.cspOffering) : '';
		ce += (window.digitalData.page.attributes.cspSAPSiteId) ? ("-_-" + window.digitalData.page.attributes.cspSAPSiteId) :'';
		ce += (window.digitalData.page.attributes.cspCustHubId) ? ("-_-" + window.digitalData.page.attributes.cspCustHubId) : '';
		ce += (window.digitalData.page.attributes.cspICN) ? ("-_-" + window.digitalData.page.attributes.cspICN) : '';
		ce += (window.digitalData.page.attributes.cspCMClientId) ? ("-_-" + window.digitalData.page.attributes.cspCMClientId) : '';
		return ce;
	},

    init : function () {
        var _this = this;
        if (typeof (window.ibmweb) != 'undefined' && typeof (window.ibmweb.config) != 'undefined' && typeof (window.ibmweb.config.eluminate) != 'undefined') {
            window.ibmweb.config.eluminate.enabled = true;
        }
        this.create_QueryString();
        //set WebAnalitics
		if (typeof(window.WebAnalytics) == 'undefined')
			window.WebAnalytics = {
            Page: {
                PageIdentifier : window.location.href
            }
        };
        //set digitalData
		if (typeof(window.digitalData) == 'undefined')
			window.digitalData = {};
        //set siteID from meta IBM.WTMSite
		if (typeof v16elu.siteID === "undefined") {
            v16elu.siteID = String(v16elu.get_meta_tag("IBM.WTMSite"));
        }
        //set siteID from meta WTMSite
        if (v16elu.siteID == "null") {
            v16elu.siteID = String(v16elu.get_meta_tag("WTMSite"));
        }
        //set siteID from meta IBM.WTMCategory
        if (v16elu.siteID == "null"){
        	var v16eluSiteID = String(v16elu.get_meta_tag("IBM.WTMCategory"));
        	if (v16eluSiteID != null && v16eluSiteID.substring(0, 5) == "SOFDC") {
        		v16elu.siteID = "DEVWRKS";
        	}else{
        		v16elu.siteID = v16eluSiteID;
        	}
        }
        //set siteID from digitalData siteID or categoryID from new DDO
        if (v16elu.siteID == "null" && typeof digitalData.page !== "undefined") {
        	//for old DDO structure Site id
        	if (typeof digitalData.page.site !== "undefined" && typeof digitalData.page.site.siteID !== "undefined") {
                v16elu.siteID = digitalData.page.site.siteID;
            }
        	 //for new DDO structure Site id
        	if (v16elu.siteID == "null" && digitalData.page.pageInfo !== "undefined" && typeof digitalData.page.pageInfo.ibm !== "undefined" && typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") {
                v16elu.siteID = digitalData.page.pageInfo.ibm.siteID;
            }
        	 //for old DDO structure Category id
            if (v16elu.siteID == "null" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.categoryID !== "undefined") {
                if (digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
                	v16elu.siteID = "DEVWRKS";
            	}else{
            		v16elu.siteID = digitalData.page.category.categoryID;
            	}
            }
            //for new DDO structure Category id
        	if (v16elu.siteID == "null" && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.primaryCategory !== "undefined") {
                if (digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
                	v16elu.siteID = "DEVWRKS";
            	}else{
            		v16elu.siteID = digitalData.page.category.primaryCategory;
            	}
            }
        }
        //set siteID on default value
        if (v16elu.siteID == "null") {
            v16elu.siteID = "IBMTESTWWW";
        }
        v16elu.cmSetClientID.id = v16elu.CID + "|" + v16elu.siteID;
        //set cmTagQueue
		if (typeof(window.cmTagQueue) == 'undefined')
			window.cmTagQueue = [];
		
		if(v16elu.siteID == "ECOM"){
			window.cmTagQueue.push(['cmSetupNormalization', 'krypto-_-krypto']);	
		}
		
		//if the site id starts or ends with "test" set the client as 802
		if(v16elu.siteID.substring(0, 4).toLowerCase() == "test" || v16elu.siteID.substring(v16elu.siteID.length-4, v16elu.siteID.length).toLowerCase() == "test"){
			window.cmTagQueue.push(['cmSetClientID', '80200000|'+v16elu.siteID, false, 'testdata.coremetrics.com', v16elu.cmSetClientID.cookieDomain]);
		}else{
			window.cmTagQueue.push(['cmSetClientID', v16elu.cmSetClientID.id, v16elu.cmSetClientID.managedFirstParty, v16elu.cmSetClientID.dataCollectionDomain, v16elu.cmSetClientID.cookieDomain]);
		}
		//cookie migration code for all non IBM pages
		if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
			window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie" : true}]);
			window.cmTagQueue.push(['cmSetupCookieMigration', true, true, this.NTPT_DOMAINLIST]);
		}
        
        //loading eluminate
        (function () {
        	//var ramQ = new Date().getTime();
            if ((v16elu.siteID !== "undefined") && (v16elu.siteID.toLowerCase() == "bluemix" || v16elu.siteID.toLowerCase() == "bluemixtest")) {
            	var s = document.createElement('script');
                s.setAttribute('type', 'text/javascript');
                s.setAttribute('src', '//libs.coremetrics.com/eluminate.js?__t=' +ramQ);
                document.getElementsByTagName("head")[0].appendChild(s);
            }else{
            	document.write("<script type=text/javascript src='//libs.coremetrics.com/eluminate.js'></script>");
            	//eval("document.write(\"<script type=text/javascript src=//libs.coremetrics.com/eluminate.js?__t=" + ramQ + "></script>\");");
            }
        })();
        window.onload = function () {
        	if(v16elu.siteID != "DWNEXT"){//to block event tracking for site id "DWNEXT"
            	v16elu.event_tracking();
            }
    	}
        //getting the value of IBMer for non ibm.com
        if(typeof (document.domain) !== 'undefined' && document.domain.indexOf('ibm.com') == -1){
    		requestServerCall = function (url) {
	    		var s = document.createElement('script');
	            	s.type = 'text/javascript';
	            	s.src = url;
	            document.getElementsByTagName("head")[0].appendChild(s);
	    	 },
	    	 IBMISE_BOOTSTRAP = function (data) {
	    	    	NTPT_IBMer = data.IBMer;
	    	 }
	    	 requestServerCall("//www.ibm.com/gateway/gp/getProfile/?cb=260:IBMISE_BOOTSTRAP&cc=us&lc=en");   
    	}
    }
};

v16elu.Querystring.prototype.get = function (key, default_) {
    var value = this.params[key];
    return (value != null) ? value : default_;
}

v16elu.Querystring.prototype.contains = function (key) {
    var value = this.params[key];
    return (value != null);
}

cmSetClientID = function () {};
v16elu.init();