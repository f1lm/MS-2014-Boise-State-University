
//-------------------------------------
// Get Login Status For Omniture
//-------------------------------------

function getLoginStatusForOmniture() {
	var s = "login:";
	if (!Logon.isValid) {
		s += "not logged in";
	} else {
		var provider = Cooker.readCookie("socialProvider");
		s += (provider != "")?provider:"internal";
	}
	return s; 
}

function getQsVal (name) {
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
}


/**
 * given a token value, looks for tokens in the url in one of the following forms
 * 	in the query string: ?tokenName=tokenValue (also accommodates &)
 * 	in the hash: #tokenName.tokenValue
 */
function getTrackingToken(tokenName) {
	var tokenVal = "";
	if (null != tokenName && tokenName.length > 0) {
		if (null != window.location.hash && window.location.hash.indexOf("#"+tokenName+".") > -1) {
			var len = tokenName.length+2;
			tokenVal = window.location.hash.substr(len);
		} else if (null != window.location.search) {
			//for backwards-compatibility
			tokenVal = getQsVal(tokenName);
		}
	}
	if (tokenVal.length > 0) {
		return tokenVal;
	} else {
		return null;
	}
}

/**
 * Trigger Omniture and Google Analytics tracking code
 * loc - Home, Footer, Header, Article
 * network - Facebook, Twitter, LinkedIn, Googleplus 
 * socialAction - Like, Unlike, Share, Follow, Tweet, Retweet, Favorite, Click
 */
function socialTrack(loc,network,socialAction) {
	//Google
	_gaq.push(['_trackSocial', network, loc + ":" + socialAction]);
	
	//Omniture
	var trackString = network + ":" + loc + ":" + socialAction;
	s.prop48 = trackString;
	s.eVar27 = "D=c48";
	s.event36 = trackString;
	
	//alert(trackString);
}
//LinkedIn Track
function linkedInTrack() {
	socialTrack("Article","LinkedIn","Share");
};