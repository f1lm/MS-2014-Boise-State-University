var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
  var useSSL = 'https:' == document.location.protocol;
  var src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
})();
 
var IDG = IDG || {};
// Sites may define their own slots or override the sizes of the standard slots
IDG.local_slots = {
  // Overridden top leaderboard size. 
  topleaderboard: [[728,90],[950,98],[900,100]]
}

// Sites may define their own targets or override the standard targeting
IDG.local_targets = {
  "target1": "thispage"
}

IDG.ads = {
  networkID: "",
  slots: {
    topleaderboard: [[728,90],[950,98]],
    bottomleaderboard: [[728,90],[950,98]],
    topimu: [[336,280],[300,250],[336,600],[300,600],[300,1050],[300,250]],
    bottomimu: [[336,280],[300,250],[336,600],[300,600],[300,1050],[300,250]],
    overlayimu: [[336,280],[300,250],[300,1050],[300,600]],
    dogear: [1,1],
    ticker: [[950,66],[950,55],[800,64],[800,30],[965,48],[970,66],[965,100],[970,30],[970,55],[972,100],[951,41],[950,250]],
    featuredsponsors: [336,280],
    ciu: [[950,335],[943,335],[947,335],[919,345],[970,335],[934,335],[922,395]],
    hoverad: [336,90],
    leadgenpromo: [334,126],
    newsletter_intercept: [770,1],
    linkedIn_toolbadge: [128,45],
    slideshowpromo: [340,70],
    sidekick: [60,968],
    articlepromoright: [[336,250],[336,125]],
    sidecar: [[60,55],[130,55]],
    intercept: [420,30],
    catfish: [970,50]
  },
  folds: {
    topleaderboard: "topleaderboard",
    bottomleaderboard: "bottomleaderboard",
    topimu: "topimu",
    bottomimu: "bottomimu"
  },
  targets: {
    site: null,
    zone: null,
    kw: null,
    articleId: null,
    author: null,
    indust: null,
    empcnt: null,
    compnm: null,
    compsz: null,
    type: null,
    page_type: null,
    referrer: null,
    insiderauth: null,
    device: null,
    blog_name: null,
    browser: null,
    squery: null,
    nlsource: null,
    env: null,
    categoriyIds: null,
    tagNames: null
  },
  // For an object (ie. slots), merge in the values from IDG.local_{name}. local_{name} adds to and/or overrides {name}
  mergeLocalProperties: function(name) {
    if (typeof IDG.ads[name] != "undefined") {
      var local_obj = "local_" + name;
      if (typeof IDG[local_obj] != "undefined") {
        for (a in IDG[local_obj])
            IDG.ads[name][a] = IDG[local_obj][a];
      }
      return IDG.ads[name];
    } else {
      //console.log("object not found: " + name)
    }
  },
  setSlot: function(pos, sizes) {
    googletag.cmd.push(function() {
      //console.log(pos + ": " + sizes);
      if (typeof IDG.ads.folds[pos] != "undefined") {
        pos = IDG.ads.folds[pos];
      }
      googletag.defineSlot(IDG.ads.networkID, sizes, pos).addService(googletag.pubads()).setTargeting("pos", pos);
    });
  },
  defineAllSlots: function() {
    var allSlots = IDG.ads.mergeLocalProperties("slots");
    googletag.cmd.push(function() {
      for (var key in allSlots) {
        googletag.defineSlot(IDG.ads.networkID, IDG.ads.slots[key], key).addService(googletag.pubads()).setTargeting("pos", key);
      }
    });
  },
  enable: function() {
    googletag.cmd.push(function() {
      googletag.pubads().enableSingleRequest();
      googletag.pubads().enableSyncRendering();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  },
  getQueryValue: function(source, name) {
    if (name != "") {
      var rPieces = source.split("?");
      if (typeof(rPieces[1]) == "undefined") return "";
      var qVars = rPieces[1].split("&");
      for (var i=0; i<qVars.length; i++) {
        var pair = qVars[i].split("=");
        if (pair[0] == name) return pair[1];
      }
    }
    return "";
  },
  setAllTargetings: function() {
    googletag.cmd.push(function() {
      for (var targetName in IDG.ads.targets) {
        if (IDG.ads.targets[targetName] != null && IDG.ads.targets[targetName] != "") {
          googletag.pubads().setTargeting(targetName, IDG.ads.targets[targetName]);
        }
      }
    });
  },
  setAdTargetValue: function (targetName, targetValue) {
    IDG.ads.targets[targetName] = targetValue;
  },
  articleDetail: false,
  extraTargetsAdded: false,
  sKeysAdded: false,
  contenttypeprop: {"www.itworld.com" : "prop4","www.csoonline.com" : "prop5","blogs.csoonline.com" : "prop5","www.cio.com" : "prop5","blogs.cio.com" : "prop5","www.infoworld.com" : "prop2","www.networkworld.com" : "prop2", "www.computerworld.com" : "prop5", "vox.nww.com" : "prop2", "teamsite.computerworld.com" : "prop5", "blogs.computerworld.com" : "prop5"},
  referingDomain: "",
  userAgentValue: function() {
    var browser = "";
    if (/(iPad|iPhone)/.test(navigator.userAgent)) {
      browser = RegExp.$1;
    }
    return browser;
  },
  referrerValue: function() {
    var domain = "";
    var referrer = document.referrer;

    if (referrer == "") return "";
    if (referrer.indexOf("http://www.google.com/cse") > -1) return "";

    rPieces = referrer.split("/");
    dPieces = rPieces[2].split(".");

    if (dPieces.length >= 2) {
      domain = dPieces[dPieces.length-2];
      return domain;
    }
    return "";
  },
  searchTerms: function() {
    var domain = "";
    var referrer = document.referrer;
    var searchEngines = {"google" : "q", "yahoo" : "p", "bing" : "q", "nww" : "hpg1"};
	
    if (referrer == "") return "";
    if (IDG.ads.referingDomain == "")
      IDG.ads.referingDomain = IDG.ads.referrerValue();
    if (IDG.ads.referingDomain == "") return "";

    return IDG.ads.getQueryValue(referrer,searchEngines[IDG.ads.referingDomain])
  },
  addExtraTargets: function() {
    try {
      if (IDG.ads.extraTargetsAdded == true)
        return;

      IDG.ads.extraTargetsAdded = true;

      // add type
      if (IDG.ads.sKeysAdded == false) {
        if (typeof(dogfish_type) != "undefined" && dogfish_type != "(none)") {
          IDG.ads.setAdTargetValue("type", dogfish_type);
          IDG.ads.sKeysAdded = true;
        }
        else if(typeof(s) != "undefined") {
          IDG.ads.setAdTargetValue("type", s[IDG.ads.contenttypeprop[document.location.host]]);
          IDG.ads.sKeysAdded = true;
        }
      }
      // browser_value
      var browser_value = IDG.ads.userAgentValue();
      if (browser_value != "")
        IDG.ads.setAdTargetValue("browser", browser_value);
      // add referrer
      IDG.ads.referingDomain = IDG.ads.referrerValue();
      IDG.ads.setAdTargetValue("referrer", IDG.ads.referingDomain);
      // add search terms
      var squery = IDG.ads.searchTerms();
      if (squery != "")
        IDG.ads.setAdTargetValue("squery", squery);
      // add source
      var nls = IDG.ads.getQueryValue(window.location.href, "source");
      if (nls != "")
        IDG.ads.setAdTargetValue("nlsource", nls);
      // add nsdr
      if (document.cookie.indexOf("nsdr") > -1)
        IDG.ads.setAdTargetValue("insiderauth", "yes");
      else
        IDG.ads.setAdTargetValue("insiderauth", "no");
      // If env=test or other in query string, add env targeting criteria
      var env = IDG.ads.getQueryValue(window.location.href, "env");
      if (env != "")
        IDG.ads.setAdTargetValue("env", env);
      // mobile
      var localIsMoble = false;
      if (typeof(isMobile) != "undefined")
        localIsMoble = isMobile;
      if (localIsMoble) {
        IDG.ads.setAdTargetValue("mobile", "true");
        IDG.ads.slots["catfish"] = [320,50];
        IDG.ads.slots["dogear"] = [1,1];
        IDG.ads.slots["gpt-leaderboard"] = [300,50];
        IDG.ads.slots["topleaderboard"] = [300,50];
        IDG.ads.slots["bottomleaderboard"] = [300,50];
		IDG.ads.slots["catfish"] = [320,50]; 
		IDG.ads.slots["dogear"] = [1,1]; 
      }
    } catch(e) {
      //console.log(e);
    }
  }
};

IDG.ads.addExtraTargets();

var ord = "";
