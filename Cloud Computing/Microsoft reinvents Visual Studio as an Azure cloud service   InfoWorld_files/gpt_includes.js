var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

// This runs client-side so have to keep hard-coded for now
var adUnitIdsMap = {
    'cfo': '/8456/IDG.Javaworld_Enterprise',
    'pcw': '/8456/IDG.PCWorld_CSMB',
    'cio': '/8456/IDG.CIO_Enterprise',
    'cit': '/8456/IDG.Citeworld_Enterprise',
    'cso': '/8456/IDG.CSO_Enterprise', 
    'ctw': '/8456/IDG.Computerworld_Enterprise', 
    'grb': '/8456/IDG.Greenbot_CSMB', 
    'ifw': '/8456/IDG.Infoworld_Enterprise', 
    'itn': '/8456/IDG.Javaworld_Enterprise', 
    'itw': '/8456/IDG.ITworld_Enterprise', 
    'jvw': '/8456/IDG.Javaworld_Enterprise', 
    'mw' : '/8456/IDG.Macworld_CSMB',
    'nww': '/8456/IDG.NetworkWorld_Enterprise',
    'th' : '/8456/IDG.TechHive_CSMB',
    'ans': '/8456/IDG.E_Answers',
    'itn': '/8456/IDG.ITNews_Enterprise',
    'cfo': '/8456/IDG.CFO_Enterprise',
    'ifw': '/8456/IDG.Infoworld_Enterprise',
    'itw': '/8456/IDG.ITworld_Enterprise',
    'ctw': '/8456/IDG.Computerworld_Enterprise'
};

//IDGAnswers.com needs this to overwrite the ad unit id
function getSrcCookie() {
    var nameEQ = "src=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

(function() {
	var gads = document.createElement("script");
	gads.async = true;
	gads.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
	var node =document.getElementsByTagName("script")[0];
	node.parentNode.insertBefore(gads, node);
})();

var IDG = IDG || {};
IDG.GPT = {
	unitName: "",
	localIsMoble: false,
	otherAds:{},
	addOtherAd: function(key, value) {
		IDG.GPT.otherAds[key] = value;
	},
	getOtherAds: function(delimiter) {
		return IDG.GPT.getDelimiterData(IDG.GPT.otherAds, delimiter);
	},
	extIMUCounter: 1,
	addExtIMU: function() {
		IDG.GPT.extIMUCounter = IDG.GPT.extIMUCounter + 1;
		IDG.GPT.addOtherAd('imu' + IDG.GPT.extIMUCounter, true);
	},
	trackOmniture: function() {
		if (typeof(s) != 'undefined') {
			if (typeof(s.prop41) != 'undefined') {
				var currentSlotSet = IDG.GPT.getDisplayedAds(',') + ',' + IDG.GPT.getOtherAds(',');
				if (s.prop41 != currentSlotSet) {
					s.linkTrackEvents = s.events = "event38";
					s.linkTrackVars = "prop41,events";
					s.prop41 = currentSlotSet;
					s.event38 = currentSlotSet;
					s.tl(true, 'o', 'Article DRR IMUs:' + IDG.GPT.getOtherAds(','));
				}
			}
		}
	},
	IMUCounter: 1,
	getIMUSlotName: function() {
		return "imu" + IDG.GPT.IMUCounter;
	},
	getDelimiterData: function(dataSet, delimiter) {
		var delimiterData = "";
		for (var data in dataSet) {
			delimiterData += data + delimiter;
		}
		return delimiterData.slice(0, delimiterData.lastIndexOf(delimiter));
	},
	modules:{},
	addModule: function(key, value) {
		IDG.GPT.modules[key] = value;
	},
	getModules: function(delimiter) {
		return IDG.GPT.getDelimiterData(IDG.GPT.modules, delimiter);
	},
	displayedads:{},
	addDisplayedAd: function(key, value) {
		IDG.GPT.displayedads[key] = value;
	},
	getDisplayedAds: function(delimiter) {
		return IDG.GPT.getDelimiterData(IDG.GPT.displayedads, delimiter);
	},
	lazyloadedads:{},
	addLazyloadedAd: function(key, value) {
		IDG.GPT.lazyloadedads[key] = value;
	},
	getLazyloadedAds: function(delimiter) {
		return IDG.GPT.getDelimiterData(IDG.GPT.lazyloadedads, delimiter);
	},
	slots: {},
	refreshSlots: {},
	refreshAd: function(slotName) {
		if(typeof(slotName) == "undefined") {
			googletag.pubads().refresh();
		}
		else {
			googletag.pubads().refresh([IDG.GPT.refreshSlots[slotName]]);
		}
	},
	addSlot: function(key, value) {
		IDG.GPT.slots[key] = value;
	},
	targets: {},
	addTarget: function(key, value) {
		IDG.GPT.targets[key] = value;
	},
	defineDisplayDynamicGoogleTagSlot: function(slotName, slotAdSize) {
		if (IDG.GPT.unitName != null && IDG.GPT.unitName != "" && slotName != "") {
		IDG.GPT.addDisplayedAd(slotName, "true");
		googletag.cmd.push(function() {
			IDG.GPT.refreshSlots[slotName] = googletag.pubads().display(IDG.GPT.unitName, slotAdSize, slotName).setTargeting("pos", slotName);
		});
		}
	},
	defineGoogleTagSlot: function(slotName, slotAdSize) {
		if (IDG.GPT.unitName != null && IDG.GPT.unitName != "" && slotName != "") {
		IDG.GPT.addDisplayedAd(slotName, "true");
		googletag.cmd.push(function() {
			IDG.GPT.refreshSlots[slotName] = googletag.defineSlot(IDG.GPT.unitName, slotAdSize, slotName).addService(googletag.pubads()).setTargeting("pos", slotName);
		});
		}
	},
	displayGoogleTagSlot: function(slotName) {
		if (IDG.GPT.unitName != null && IDG.GPT.unitName != "" && slotName != "") {
		googletag.cmd.push(function() {
			googletag.display(slotName);
		});
		}
	},
	defineAllGoogleTagSlots: function() {
		if (IDG.GPT.unitName != null && IDG.GPT.unitName != "") {
		googletag.cmd.push(function() {
			for (var slotName in IDG.GPT.slots) {
				if (IDG.GPT.slots[slotName] != null && IDG.GPT.slots[slotName] != "") {
					if (slotName == "dogear" || slotName == "gpt-skin")
						IDG.GPT.refreshSlots[slotName] = googletag.defineOutOfPageSlot(IDG.GPT.unitName, slotName).addService(googletag.pubads()).setTargeting("pos", slotName);
					else
						IDG.GPT.refreshSlots[slotName] = googletag.defineSlot(IDG.GPT.unitName, IDG.GPT.slots[slotName], slotName).addService(googletag.pubads()).setTargeting("pos", slotName);
				}
			}
		});
		}
	},
	setAllGoogleTagTargetings: function() {
		googletag.cmd.push(function() {
			for (var targetName in IDG.GPT.targets) {
				if (IDG.GPT.targets[targetName] != null && IDG.GPT.targets[targetName] != "") {
					googletag.pubads().setTargeting(targetName, IDG.GPT.targets[targetName]);
				}
			}
		});
	},
	initGoogleTagService: function() {
		googletag.cmd.push(function() {
			//googletag.pubads().enableSingleRequest(); csmb had this ON
			googletag.pubads().enableAsyncRendering();
			googletag.pubads().collapseEmptyDivs(); // csmb did not have this
			//googletag.pubads().disableInitialLoad(); csmb had this ON //defer loading of the ads until after page load
			googletag.enableServices();
		});
	},
	getParameterValue: function(paramString, paramName) {
		var paramValue = "";
		if (paramString && paramString != 'undefined') {
			var searchChars = "[\\?&]"+paramName+"=([^&#]*)";
			var regularExp = new RegExp(searchChars);
			var searchResults = regularExp.exec(paramString);
			if (searchResults != null && searchResults.length >= 1) 
				paramValue = searchResults[1];
		}
		return paramValue;
	},
	getReferrerDomain: function() {
		var referrerDomain = "";
		if (document.referrer && document.referrer != 'undefined') {
			var referrerString = document.referrer;
			referrerDomain = referrerString.match(/^http[s]?:\/\/[a-zA-Z0-9-_\.]+[\:]?[0-9]*?\//);
		}
		return String(referrerDomain);
	},
	getSearchEngineQuery: function() {
		var sQuery = "";
		var referrerDomain = IDG.GPT.getReferrerDomain();
		if (referrerDomain != "") {
			var documentReferrer = document.referrer;
			if (referrerDomain.indexOf("google.com") != -1) {
				documentReferrer = documentReferrer.replace("#q=", "?q=");
				sQuery = IDG.GPT.getParameterValue(documentReferrer, "q");
			}
			else if (referrerDomain.indexOf("bing.com") != -1)
				sQuery = IDG.GPT.getParameterValue(documentReferrer, "q");
			else if (referrerDomain.indexOf("yahoo.com") != -1)
				sQuery = IDG.GPT.getParameterValue(documentReferrer, "p");
			else if (referrerDomain.indexOf("nww.com") != -1) {
				sQuery = IDG.GPT.getParameterValue(documentReferrer, "hpg1");
			}
		}
		sQuery = sQuery.replace("+", " ");
		return sQuery;
	},
	userAgentValue: function() {
		var browser = "";
		if (/(iPad|iPhone)/.test(navigator.userAgent)) {
			browser = RegExp.$1;
		}
		return browser;
	},
	setIDGExtraTargetings: function() {
		try {
			IDG.GPT.addTarget("referrer", IDG.GPT.getReferrerDomain());
			IDG.GPT.addTarget("browser", navigator.userAgent);
			IDG.GPT.addTarget("squery", IDG.GPT.getSearchEngineQuery());
			IDG.GPT.addTarget("nlsource", IDG.GPT.getParameterValue(window.location.href, "source"));

			if (document.cookie.indexOf("nsdr") > -1)
				IDG.GPT.addTarget("insiderauth", "yes");
			else
				IDG.GPT.addTarget("insiderauth", "no");

			IDG.GPT.addTarget("env", IDG.GPT.getParameterValue(window.location.href, "env"));

			if (typeof(isMobile) != "undefined")
				IDG.GPT.localIsMoble = isMobile;
			if (IDG.GPT.localIsMoble) {
				IDG.GPT.addTarget("mobile", "true");
			}

			if (typeof(dogfish_type) != "undefined" && dogfish_type != "(none)") {
				IDG.GPT.addTarget("type", dogfish_type);
			}
		} catch(e) {
			//console.log(e);
		}
	},
	getQsVal: function(name) {
    	if (window.location.search != "") {
    		var qs = window.location.search.substring(1);
    		var pairs = qs.split("&");
    		for (var i=0;i<pairs.length;i++) {
    			var pair = pairs[i].split("=");
    			if (pair[0] == name) {
    				return pair[1];
    				break;
    			}
    		}
    	}
    	return "";
    },
	getAdUnitIdBySrc: function(src) {
		var rtnValue = adUnitIdsMap["ans"];
		if (src) {
			var adUnitIdBySrc = adUnitIdsMap[src];
			if (adUnitIdBySrc) rtnValue = adUnitIdBySrc;	
		}
		return rtnValue;
	},
	isValidSource: function(src) {
		var rtnValue = false;
		if (src) {
			if (adUnitIdsMap[src]) rtnValue = true;	
		}
		return rtnValue;
	}

};