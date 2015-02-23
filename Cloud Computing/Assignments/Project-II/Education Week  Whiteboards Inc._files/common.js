
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/

var __MTTBLINK__;
var __MTTBID__;
function obfuscator(coded, key, mode, path, hidden) {
	shift = coded.length;
	link = "";
	
	for(i=0;i<coded.length;i++) {
		if (key.indexOf(coded.charAt(i))==-1) {
			ltr = coded.charAt(i);link+=(ltr);
		} else {
			ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
			link += (key.charAt(ltr));
		}
	}
	if(mode == 'hidden_input') {
		document.write('<input type="hidden" name="CCode" value="' + link + '" />');
	} else if(mode == '__MTTBLINK__') {
		__MTTBLINK__ = path + link;
		if(hidden) return;
		document.write(link);
	} else if(mode == '__MTTBID__') {
		__MTTBID__ = link;
		if(hidden) return;
		document.write(link);
	}
}

/* http://www.kryogenix.org/code/browser/searchhi/ */
function highlightWord(node,word) {
	// Iterate into this nodes childNodes
	if (node && node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word);
		}
	}
	
	// And do this node itself
	if (node && node.nodeType == 3) { // text node
			
		tempNodeVal = node.nodeValue.toLowerCase();
		tempWordVal = word.toLowerCase();
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			if (pn.className != "searchword") {
				// word has not already been highlighted!
				nv = node.nodeValue;
				ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				before = document.createTextNode(nv.substr(0,ni));
				docWordVal = nv.substr(ni,word.length);
				after = document.createTextNode(nv.substr(ni+word.length));
				hiwordtext = document.createTextNode(docWordVal);
				hiword = document.createElement("span");
				hiword.className = "searchword";
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}
}

function b2SearchHighlight() {

	if (!document.createElement) return;
	if (document.getElementById('center-well'))
	{
			node = document.getElementById('center-well');
	}
	else if (document.getElementById('container')) // blog		
			node = document.getElementById('alpha-inner');
	else		
			node = document.getElementById('col1');

	ref = window.location.href;
	if (ref.indexOf('?') == -1) return;
	qs = ref.substr(ref.indexOf('?')+1);
	qsa = qs.split('&');
	for (i=0;i<qsa.length;i++) 
	{
		qsip = qsa[i].split('=');
    if (qsip.length == 1) continue;
  	if (qsip[0] == 'qs') 
  	{
			words = unescape(qsip[1].replace(/\+/g,' ')).split(/\s+/);
	    for (w=0;w<words.length;w++) 
	    {
	    	
	    	if (words[w].length > 1)
	    	{
	    		words[w] = words[w].replace(/_/g, ' ');
					highlightWord(node,words[w]);
				}
	  	}
    }
	}
}

function popUp( url, options ) {
	var winName = '';
	if( arguments && arguments[2] ) {
		winName = arguments[2];
	}	else {
		winName = "edweekPopup";
	}
	window.open( url, winName, options );
}

function testCookies() 
{ 
	 var exp = new Date(); 
	 exp.setTime(exp.getTime() + 1800000); 
	 // first write a test cookie 
	 setCookie("cookies", "cookies", exp, false, false, false); 
	 if (document.cookie.indexOf('cookies') != -1) { 
	   alert("Got Cookies!"); 
	 } 
	 else { 
		alert("No Cookies!"); 
	 } 
	 // now delete the test cookie 
	  exp = new Date(); 
	  exp.setTime(exp.getTime() - 1800000); 
	  setCookie("cookies", "cookies", exp, false, false, false); 
}
	
function setCookie(name, value, expires, path, domain, secure) 
{ 
 var curCookie = name + "=" + escape(value) + 
	((expires) ? "; expires=" + expires.toGMTString() : "") + 
	((path) ? "; path=" + path : "") + 
	((domain) ? "; domain=" + domain : "") + 
	((secure) ? "; secure" : ""); 
 document.cookie = curCookie; 
}

function getURL()
{
    // IE6 bug fix;
    var url = location.protocol + "//" + location.host + "/" + location.pathname;
    return url;
}
// preload rollover images

function addLoadEvent(functionToAdd)
{
      if ( typeof window.onload != 'function' )
      {
            window.onload = functionToAdd;
      }
      else
      {
            var oldWindowOnLoad = window.onload;

            window.onload = function()
            {
                  oldWindowOnLoad();
                  functionToAdd();
            }
      }
}

function PopupViewWindow(url, name, width, height) {
        popupWin = window.open(url, name, 
        	'width=' + width + ', height=' + height + ', scrollbars=yes');
        popupWin.focus();
}

function getCleanURI(uri, f)
{
	var tokens = uri.split('?');
	
	if (tokens.length == 1 || uri.match(/[\w:\/]*(lnk.)(.*)/) != null) 
	{
		return (f?encodeURIComponent(uri):uri);
	}
	else 
	{
		return (f?encodeURIComponent(tokens[0]):tokens[0]);
	}
}

var image1 = new Image();
image1.src = "http://www.edweek.org/images/tab-ew-yes.jpg";
var image2 = new Image();
image2.src = "http://www.edweek.org/images/tab-tm-yes.jpg";
var image3 = new Image();
image3.src = "http://www.edweek.org/images/tab-rc-yes.jpg";
var image4 = new Image();
image4.src = "http://www.edweek.org/images/tab-ak-yes.jpg";
var image5 = new Image();
image5.src = "http://www.edweek.org/images/tab-dd-yes.jpg";


/* - DISABLE SEARCH HIGHLIGHT */
addLoadEvent(function() {timeID = setTimeout('b2SearchHighlight()',500)});
/* - DISABLE SEARCH HIGHLIGHT */


var BCReadAPIToken="3GgFcZSUrH0gILLyRVVCvatFHMlCz2mcV131t2QyHHRkSnq1e8l0CA..";var isUDS=true;var pagePlacementInfo=new Object();function runMobileCompatibilityScript(bcExperienceID,videoTagID){var thisIsSmartPhone=DetectSmartphone();if(!thisIsSmartPhone){return}makeMobileCompatible(bcExperienceID,videoTagID)}function makeMobileCompatible(strObjID,videoTagID){var vidObj=document.getElementById(strObjID);var vidPlayerID=getParamValueForVidObject(vidObj,'playerID');var programmedVideo=getParamValueForVidObject(vidObj,'@videoPlayer');if(vidPlayerID==null||typeof vidPlayerID=='undefined'){vidPlayerID=BCVidObjects[strObjID]}var parentObj=vidObj.parentNode;var nextAdjacentNode=vidObj.nextSibling;if(nextAdjacentNode==null){pagePlacementInfo[""+strObjID]=null}else{pagePlacementInfo[""+strObjID]=nextAdjacentNode}parentObj.removeChild(vidObj);initiateMobileVideoRetrieval(vidPlayerID,programmedVideo,BCReadAPIToken,videoTagID,strObjID)}function getParamValueForVidObject(vidObj,paramName){var childrenNodes=vidObj.childNodes;var tagName;for(var i=0;i<childrenNodes.length;i++){if(childrenNodes[i].nodeType!=1){continue}tagName=childrenNodes[i].tagName.toLowerCase();if(tagName=="param"){if(childrenNodes[i].getAttribute("name")==paramName){return childrenNodes[i].getAttribute("value")}}}return null}function parseParamFromString(str,paramName){var params=str.split("&");for(var i=0;i<params.length;i++){if(params[i].indexOf(paramName)!=-1){return params[i].substr(params[i].indexOf("=")+1)}}return null}function initiateMobileVideoRetrieval(playerID,programmedVideoID,readAPIToken,videoTagID,strObjID){var APICall;var scriptNode;var scriptText;var callbackMethodName;if(programmedVideoID){if(programmedVideoID.indexOf('ref:')!=-1){APICall="http://api.brightcove.com/services/library?command=find_video_by_reference_id&reference_id="+programmedVideoID.substring(4)+"&token="+readAPIToken}else{APICall="http://api.brightcove.com/services/library?command=find_video_by_id&video_id="+programmedVideoID+"&token="+readAPIToken}callbackMethodName="handleJSONResponseForID"+new Date().getTime();scriptNode=document.createElement("script");scriptNode.setAttribute("language","javascript");scriptText="function "+callbackMethodName+"(JSONResponse){\n"+"\thandleVideoResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+"}\n"}else{APICall="http://api.brightcove.com/services/library?command=find_playlists_for_player_id&player_id="+playerID+"&token="+readAPIToken;callbackMethodName="handleJSONResponseForID"+new Date().getTime();scriptNode=document.createElement("script");scriptNode.setAttribute("language","javascript");scriptText="function "+callbackMethodName+"(JSONResponse){\n"+"\thandlePlaylistResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+"}\n"}if(isUDS){APICall+="&media_delivery=http"}var scriptTextNode=document.createTextNode(scriptText);scriptNode.appendChild(scriptTextNode);document.body.appendChild(scriptNode);addScriptTag("getMobileRendition",APICall,callbackMethodName)}function addScriptTag(id,url,callback){var scriptTag=document.createElement("script");var noCacheIE='&noCacheIE='+(new Date()).getTime();scriptTag.setAttribute("type","text/javascript");scriptTag.setAttribute("charset","utf-8");scriptTag.setAttribute("src",url+"&callback="+callback+noCacheIE);scriptTag.setAttribute("id",id);var head=document.getElementsByTagName("head").item(0);head.appendChild(scriptTag)}function handlePlaylistResponse(JSONResponse,playerID,videoTagID,strObjID){var firstPlaylist=JSONResponse.items[0];var firstVideo=firstPlaylist.videos[0];embedHTML5PlayerForVideo(firstVideo,playerID,videoTagID,strObjID)}function handleVideoResponse(JSONResponse,playerID,videoTagID,strObjID){embedHTML5PlayerForVideo(JSONResponse,playerID,videoTagID,strObjID)}function embedHTML5PlayerForVideo(video,playerID,videoTagID,strObjID){var renditions=video.renditions;var bestRenditionIndex=-1;var bestEncodingRateSoFar=-1;for(var i=0;i<renditions.length;i=i+1){if(renditions[i].videoCodec!="H264"){continue}if(bestRenditionIndex==-1){bestRenditionIndex=i;bestEncodingRateSoFar=renditions[i].encodingRate}else if(betterEncodingForMobile(renditions[i].encodingRate,bestEncodingRateSoFar)==renditions[i].encodingRate){bestRenditionIndex=i;bestEncodingRateSoFar=renditions[i].encodingRate}}if(bestRenditionIndex==-1){bestRendition=video.videoFullLength}else{bestRendition=renditions[bestRenditionIndex]}var bestRenditionURL=bestRendition.url;var vidName=video.name;var vidHeight=bestRendition.frameHeight;var vidWidth=bestRendition.frameWidth;var vidStillURL=video.videoStillURL;var videoScriptTag=formVideoTagFromInfo(videoTagID,vidName,bestRenditionURL,vidWidth,vidHeight,vidStillURL);var nextSiblingOfVideo=pagePlacementInfo[strObjID];var videoTagParent=nextSiblingOfVideo.parentNode;if(nextSiblingOfVideo==null){videoTagParent.appendChild(videoScriptTag)}else{videoTagParent.insertBefore(videoScriptTag,nextSiblingOfVideo)}}function betterEncodingForMobile(encoding1,encoding2){IDEAL_ENCODING_RATE=256000;diff1=Math.abs(encoding1-IDEAL_ENCODING_RATE);diff2=Math.abs(encoding2-IDEAL_ENCODING_RATE);return((diff1<=diff2)?encoding1:encoding2)}function formVideoTagFromInfo(videoTagID,videoID,videoURL,vidWidth,vidHeight,vidImageURL){var videoTag=document.createElement("video");if(videoTagID){videoTag.setAttribute("id",videoTagID)}else{videoTag.setAttribute("id",videoID)}videoTag.setAttribute("poster",vidImageURL);videoTag.setAttribute("width",""+vidWidth);videoTag.setAttribute("height",""+vidHeight);videoTag.setAttribute("controls","true");videoTag.setAttribute("src",videoURL);var isAndroidPhone=DetectAndroid();if(isAndroidPhone){addClickHandlerToVid(videoTag)}return videoTag}function addClickHandlerToVid(obj){obj.addEventListener('click',function(videoNode){return function(){videoNode.play()}}(obj))}var deviceIphone="iphone";var deviceIPad="ipad";var deviceIpod="ipod";var devicePlaystation="playstation";var deviceWap="wap";var deviceWinMob="windows ce";var enginePie="wm5 pie";var deviceIeMob="iemobile";var deviceS60="series60";var deviceSymbian="symbian";var deviceS60="series60";var deviceS70="series70";var deviceS80="series80";var deviceS90="series90";var deviceBB="blackberry";var deviceAndroid="android";var motorollaDroid=" droid ";var deviceMidp="midp";var deviceWml="wml";var deviceBrew="brew";var devicePalm="palm";var engineXiino="xiino";var engineBlazer="blazer";var devicePda="pda";var deviceNintendoDs="nitro";var engineWebKit="webkit";var engineNetfront="netfront";var manuSonyEricsson="sonyericsson";var manuericsson="ericsson";var manuSamsung1="sec-sgh";var svcDocomo="docomo";var svcKddi="kddi";var svcVodafone="vodafone";var s60GetsMobile=true;var iphoneIpodGetsMobile=true;var uagent=navigator.userAgent.toLowerCase();function DetectIphone(){if(uagent.search(deviceIphone)>-1){if(uagent.search(deviceIpod)>-1)return false;else return true}else return false}function DetectIPad(){if(uagent.search(deviceIPad)>-1){return true}else{return false}}function DetectIpod(){if(uagent.search(deviceIpod)>-1)return true;else return false}function DetectIphoneOrIpodOrIPad(){if(uagent.search(deviceIphone)>-1||uagent.search(deviceIpod)>-1||uagent.search(deviceIPad)>-1)return true;else return false}function DetectAndroid(){if(uagent.search(deviceAndroid)>-1)return true;else return false}function DetectMotorollaDroid(){if(uagent.search(motorollaDroid)>-1)return true;else return false}function DetectAndroidWebKit(){if(DetectAndroid()){if(DetectWebkit())return true;else return false}else return false}function DetectWebkit(){if(uagent.search(engineWebKit)>-1)return true;else return false}function DetectS60OssBrowser(){if(DetectWebkit()){if((uagent.search(deviceS60)>-1||uagent.search(deviceSymbian)>-1))return true;else return false}else return false}function DetectSymbianOS(){if(uagent.search(deviceSymbian)>-1||uagent.search(deviceS60)>-1||uagent.search(deviceS70)>-1||uagent.search(deviceS80)>-1||uagent.search(deviceS90)>-1)return true;else return false}function DetectBlackBerry(){if(uagent.search(deviceBB)>-1)return true;else return false}function DetectWindowsMobile(){if(uagent.search(deviceWinMob)>-1||uagent.search(deviceIeMob)>-1||uagent.search(enginePie)>-1)return true;else return false}function DetectPalmOS(){if(uagent.search(devicePalm)>-1||uagent.search(engineBlazer)>-1||uagent.search(engineXiino)>-1)return true;else return false}function SetS60GetsMobile(setMobile){s60GetsMobile=setMobile};function SetS60GetsMobile(setMobile){iphoneIpodGetsMobile=setMobile};function DetectSmartphone(){if(DetectIphoneOrIpodOrIPad())return true;if(DetectAndroid())return true;if(DetectS60OssBrowser())return true;if(DetectSymbianOS())return true;if(DetectWindowsMobile())return true;if(DetectBlackBerry())return true;if(DetectPalmOS())return true;return false};function DetectMobileQuick(){if(uagent.search(deviceWap)>-1||uagent.search(deviceMidp)>-1||uagent.search(deviceWml)>-1||uagent.search(deviceBrew)>-1){return true}if(DetectSmartphone())return true;if(uagent.search(engineNetfront)>-1)return true;if(uagent.search(devicePlaystation)>-1)return true;if(uagent.search(devicePda)>-1)return true;return false};function DetectMobileLonger(){if(DetectMobileQuick())return true;if(uagent.search(svcDocomo)>-1)return true;if(uagent.search(svcKddi)>-1)return true;if(uagent.search(deviceNintendoDs)>-1)return true;if(uagent.search(svcVodafone)>-1)return true;if(uagent.search(manuSamsung1)>-1||uagent.search(manuSonyEricsson)>-1||uagent.search(manuericsson)>-1){return true}return false};

function playTitle(vid, plist, pid) {
	var u = "/dd/collections/videos/index.html?bclid=" + plist + "&bcpid=" + pid + "&bctid=" + vid;
	window.open(u); 
}
