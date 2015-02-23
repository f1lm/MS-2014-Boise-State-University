(function( screen, window, debug ) {

	var $thm = {
		_$thm:  window.$thm,
		_debug: debug,
		_body: document.getElementsByTagName('body')[0],
		adRenderQueue:{},
		deviceBreakpoints:{
			'smallmobile':320,
			'mobile':568,
			'tablet':768,
			'tabletLandscape':769,
			'desktop':768,
			'wide':970,
			'superwide':1460	
		},
		localIsMoble: false,
		deviceClass:'unknown',
		deviceClassAdSizes:undefined,
		deviceWidth:function() {return window.innerWidth > 0 ? window.innerWidth : document.documentElement.clientWidth;},
		deviceHeight:function() {return window.innerHeight > 0 ? window.innerHeight : document.documentElement.clientHeight;},
		deviceOrientation: function() {return this.deviceWidth > this.deviceHeight ? 'landscape' : 'portrait';},
		devicePixelRatio: function() {return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;},
		deviceWidthAtLeast:function(w) {
			if (window.matchMedia != undefined) {
				return window.matchMedia("(min-width: " + w + "px)").matches;
			}
			else {
				return this.deviceWidth() >= w;
			}
		},
		isZoomedOut:function() {return this.devicePixelRatio() < 1;},
		isZoomedIn:function() {return this.devicePixelRatio() > 1;},
		compareCartId: 0,	
		premiumAdOptStatus: undefined,
		debug: function(msg,force) {
			var doDebug = force || this._debug;
			if (doDebug && window.console) {
				typeof msg === 'object' ? window.console.dir(msg) : window.console.log(msg);
			};
		},
		isMSIE: /*@cc_on!@*/false,
		MSIEVersion: function() {
			if (isMSIE) {
				var appVersion = navigator.appVersion.split("MSIE");
				return appVersion.length >1 ? appVersion[1] : undefined;
			}
			return undefined;
		},
		noConflict: function() {
			// jquery style noConflict calls to free namespace/
			if ( window.$thm === this ) {
				//replace global $thm with old value
				window.$thm = _$thm;
				return this;
			};
		},
		setDeviceClass:function(width) {
			if (width > this.deviceBreakpoints.superwide) {
				return "superwide desktop";
			}
			else if (width >this.deviceBreakpoints.desktop) {
				//also tablet landscape
				return "desktop";
			}
			else if (width >this.deviceBreakpoints.mobile) {
				return "tablet";
			}
			else {
				return "mobile";
			}
		},
		adSlots:"",
		setDeviceClassAdSizes:function(width) {
			if (this._debug) {
				this.debug("adUnitId:"+IDG.GPT.unitName);
			}

			IDG.GPT.addSlot("dogear", [1,1]);
			IDG.GPT.addSlot("onebyone", [1,1]);
			if (width >= this.deviceBreakpoints.wide) {
				IDG.GPT.addSlot("topleaderboard", [[950,98],[728,90]]);
				IDG.GPT.addSlot("ticker", [[972,100],[970,100],[970,90],[970,66],[970,55],[970,30],[970,250],[965,48],[950,66],[950,55],[800,64],[800,30]]);
				IDG.GPT.addSlot("catfish", [970,50]);
				IDG.GPT.addSlot("ciu", [970,335]);
				IDG.GPT.addSlot("topimu", [[300,1050],[300,600],[300,250]]);
				IDG.GPT.addSlot("sponsored-pst", [200,126]);
				IDG.GPT.addSlot("cram_session", [200,80]);
				IDG.GPT.addOtherAd("overlayimu", [[640,480],[300,250]]);
			}
			else if (width >= this.deviceBreakpoints.tablet) {
				IDG.GPT.addSlot("topleaderboard", [728,90]);
				IDG.GPT.addSlot("topimu", [[300,1050],[300,600],[300,250]]);
				IDG.GPT.addSlot("sponsored-pst", [200,126]);
				IDG.GPT.addSlot("cram_session", [200,80]);
				IDG.GPT.addOtherAd("overlayimu", [[640,480],[300,250]]);
			}
			else if (width > this.deviceBreakpoints.mobile) {
				IDG.GPT.addSlot("topleaderboard", [300,50]);
				IDG.GPT.addSlot("topimu", [300,250]);
				IDG.GPT.addSlot("sponsored-pst", [200,126]);
				IDG.GPT.addSlot("cram_session", [200,80]);
				IDG.GPT.addSlot("mobilewelcomead", [1,1]);
				IDG.GPT.addOtherAd("overlayimu", [300,250]);
			}
			else {
				//SMALL MOBILE
				IDG.GPT.addSlot("topleaderboard", [300,50]);
				IDG.GPT.addSlot("topimu", [300,250]);
				IDG.GPT.addSlot("sponsored-pst", [200,126]);
				IDG.GPT.addSlot("mobilewelcomead", [1,1]);
				IDG.GPT.addSlot("cram_session", [200,80]);
				IDG.GPT.addOtherAd("overlayimu", [300,250]);
			}
		},
		ord: null,
		getOrd: function() {
			return this.ord;
		},
		fpvKey: null,
		getFpvKey: function() {
			return this.fpvKey;
		},
		setFpvKey:function() {
			var c = this.readCookie('aiia');
			if (c == undefined || c == "") {
				this.fpvKey = ";c=AIIA";
				var expires = new Date (new Date().getTime()+86400000);//1day
				this.writeCookie('aiia', 'true', expires, this.cookieDomain);
			} else {
				this.fpvKey = "";
			}
		},
		isMobile:function() {
			return this.deviceClass =='mobile';
		},
		readRawCookie: function(name) {
			var cookies = document.cookies;
			if (navigator.cookieEnabled&&cookies!='') {
				var strAll = document.cookie;
				var i1 = strAll.indexOf(name);
				if (i1!=-1) {
					// skip name and '='
					i1 = i1+name.length+1;
					i2 = strAll.indexOf(';', i1);
					if (i2==-1) i2 = strAll.length;
					return strAll.substring(i1, i2);
				}
			}
			return "";
		},
		readCookie:function(name) {
			return unescape(this.readRawCookie(name));
		},
		deleteCookie: function(name) {
			if(navigator.cookieEnabled){
				var d = new Date();
				d.setDate(d.getDate()-30);
				document.cookie=name+"=;expires="+d.toGMTString()+";domain="+domain+";path=/";
			}
		},
		writeRawCookie: function(name, value, expires, domain) { 
			if (navigator.cookieEnabled) {
				var exp = (expires instanceof Date) ?expires.toGMTString():expires;
				document.cookie = name+"="+value+";expires="+exp+";domain="+domain+";path=/";
			}
		},
		writeCookie: function(name, value, expires, domain) {
			this.writeRawCookie(name, value, expires, domain);
		},
		setDomain:function() {
			this.cookieDomain = window.location.hostname.match(/\.[a-zA-Z]+\.com/);
		},
		writeLastVisit:function() {
			var midnight = new Date();
			midnight.setHours(0);
			midnight.setMinutes(0);
			midnight.setSeconds(0);
			var now = new Date();
			var minutes = (parseInt(now.getMinutes()/15) * 15) % 60;
			now.setSeconds(0);
			now.setMinutes(minutes);
			var time = now.getTime()-midnight.getTime();
			var expires = new Date ( now.getTime()+ 86400000);//1 Day
			this.writeCookie('lv', time, expires, this.cookieDomain);
		},
		setPremiumAdOptStatus:function() {
			var c = this.readCookie('nsdr');
			if (c != undefined && c != "" && typeof c == "string"){
				c = c.replace(/\"/g,"");
				return (c.charAt(c.length - 1) != '1');
			}
			
			return false;
		},
		qsToObject: function(qs) {
			// http://techtaunt.wordpress.com/2011/07/02/querystring-to-json/ 
	        var o = {};
	        qs.replace(
	            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
	            function($0, $1, $2, $3) { o[$1] = $3; }
	            );
	        return o;
	    },
		setIDGTargetings: function() {
			try {
				// set targeting to c, referrer, browser, squery, nlsource, insiderauth, device, env and mobile
				if (this.getFpvKey() != "") {
					IDG.GPT.addTarget("c", "AIIA");
				}

				IDG.GPT.addTarget("device", this.deviceClass);

			} catch(e) {
				//console.log(e);
			}
		},
	    logPlEvent: function(data) {
	        if (data.hasOwnProperty("b") && data.hasOwnProperty("t") && data.hasOwnProperty("id") && data.hasOwnProperty("e")) {
	        	var qs = [];
	    		for (var key in data) {
	    			qs.push(key+"="+data[key]);
	    		}
	        	var pl = new Image(1, 1);
	            pl.onerror = pl.onload = function () {
	              pl.onerror = pl.onload = null;
	            };
	            pl.src = ["//pixel.staticworld.net/pixel.gif?"+qs.join("&")+"&ts=", (new Date()).getTime()].join('');
	        }
	    },
		init: function() {
			this.adUnitId = IDG.GPT.unitName;
			this.deviceClass=this.setDeviceClass(this.deviceWidth());
			this.setIDGTargetings();
			// define slots
			this.setDeviceClassAdSizes(this.deviceWidth());
			//this doesn't clean up prior settings, so it proliferates body tags onresize. must be fixed before used
			//this._body.className = this._body.className +' '+this.deviceClass+' '+this.deviceOrientation();
			this.setDomain();
			this.setFpvKey();
			this.ord = ( new Date() ).getTime(); 
			var compareCookie = this.readCookie('compareCart');
			this.compareCartId = compareCookie!=undefined && compareCookie.length>0 ? compareCookie:0;
			if (this._debug) {
				this.debug("deviceWidth:"+this.deviceWidth());
				this.debug("deviceHeight:"+this.deviceHeight());
				this.debug("deviceClass:"+this.deviceClass);
				this.debug("devicePixelRatio:"+this.devicePixelRatio());
				this.debug("deviceOrientation:"+this.deviceOrientation());
				this.debug("productCompareCartId:"+this.compareCartId);
			}
		}
	};

	window.$thm =$thm;
	return $thm;
})(screen, window, false).init();

/* Logon namespace */
var Logon = new Object();
Logon.forumUser = $thm.readCookie('forumUser');
Logon.uname = $thm.readCookie('uname');
Logon.isValid = (Logon.forumUser && Logon.uname) ? true:false;

