// tt_video.js copied from /jsvideo

var res_id;
var tid;

function bizcardAPI(title_id)
{
	var apiURL = 'http://' + SITE_bitpipeHost + '/data/bizcardAPI.do?vtid=' + title_id; 
	var obj=new JSONscriptRequest(apiURL); 
	obj.buildScriptTag(); // Build the script tag      
	obj.addScriptTag(); // Execute (add) the script tag
}

function openBizcard()
{
	if(getCookieValue("crs") != '') emailstring = '&ttemail=' + $.parseJSON(unescape(getCookieValue('crs'))).email;
	else emailstring = '';
	ttPauseVideo();
	var domain = location.hostname;
	var bizcardURL = 'http://' + SITE_bitpipeHost + '/data/document.do?videoReturn=' + domain + '&sid=' + SITE_v5sid + '&fwd=overlay&res_id=' + res_id + emailstring;
	tbr_show(null,bizcardURL + '&KeepThis=true&TB_iframe=true&height=500&width=600&modal=true',false);		
}

/*
 * These functions are declared in tt_scripts.js
 * We do not want to re-declare them, and risk changes in these overriding those
 * 
function setSessionCookie (name, value) {
	document.cookie = name + "=" + value + ";path=/" + ";domain=" + SITE_domain;
}

function getCookieValue(name) {
	var cookie = document.cookie;
	var pos = cookie.indexOf(name + "=");
	if (pos != -1) {
		var start = pos + name.length + 1;
		var end = cookie.indexOf(";",start);
		if (end == -1) end = cookie.length;
		var value = cookie.substring(start, end);
		return value;
	} else {
		return "";
	}
}
*/

function getCurrentTitle_Result(titleDTO)
{
	tid = titleDTO.id;
	if(getCookieValue("v" + titleDTO.id) != "false") bizcardAPI(titleDTO.id);
}

function onMediaStart(pEvent)
{
	callFlash("getCurrentTitle");
}

function ttStopVideo() 
{
	callFlash("stopVideo");
}

function ttStartVideo() 
{
	callFlash("startVideo");
}

function ttPauseVideo() 
{
	callFlash("pauseVideo","true");
}

function ttUnPauseVideo() 
{
	callFlash("pauseVideo");
}

function onTemplateLoaded(message) {
	if (typeof message == "undefined") {
 		// template loaded without error
 		callFlash("addEventListener", "mediaStart", "onMediaStart");
	}
}
 
function setValues(data)
{
    var doBC = data.bizcardAPI.doBC;
	if(doBC == true) res_id = data.bizcardAPI.res_id;
	else
	{
		res_id = '';
		setSessionCookie('v' + tid,'false');
	}
	if(doBC == true) openBizcard();
}

// JSONscriptRequest -- a simple class for accessing Yahoo! Web Services
// using dynamically generated script tags and JSON

// Constructor -- pass a REST request URL to the constructor
//
function JSONscriptRequest(fullUrl) {
    // REST request path
    this.fullUrl = fullUrl; 
    // Keep IE from caching requests
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    // Get the DOM location to put the script tag
    this.headLoc = document.getElementsByTagName("head").item(0);
    // Generate a unique script tag id
    this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
}

// Static script ID counter
JSONscriptRequest.scriptCounter = 1;

// buildScriptTag method
//
JSONscriptRequest.prototype.buildScriptTag = function () {

    // Create the script tag
    this.scriptObj = document.createElement("script");
    
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
}
 
// removeScriptTag method
// 
JSONscriptRequest.prototype.removeScriptTag = function () {
    // Destroy the script tag
    this.headLoc.removeChild(this.scriptObj);  
}

// addScriptTag method
//
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
}


/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
		  
var tbr_pathToImage = "http://cdn.ttgtmedia.com/rms/ux/images/global/spacer.gif";

/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

//on page load call tbr_init
$(document).ready(function(){   
	tbr_init('a.thickboxReg, area.thickboxReg, input.thickboxReg');//pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tbr_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickboxReg
function tbr_init(domChunk){
	$(domChunk).click(function(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tbr_show(t,a,g);
	this.blur();
	return false;
	});
}

function tbr_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

	try {
		
	 	var lang = $('html').attr('lang') || 'en';	 	
	 	var closeText = getString('closeText');
	 	var closeWindowText = getString('closeWindowText');
		
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TBR_HideSelect") === null) {//iframe to hide select elements in ie6
				$("body").append("<iframe id='TBR_HideSelect'></iframe><div id='TBR_overlay'></div><div id='TBR_window'></div>");
				$("#TBR_overlay").click(tbr_remove);
			}
		}else{//all others
			if(document.getElementById("TBR_overlay") === null){
				$("body").append("<div id='TBR_overlay'></div><div id='TBR_window'></div>");
				$("#TBR_overlay").click(tbr_remove);
			}
		}
		
		if(tbr_detectMacXFF()){
			$("#TBR_overlay").addClass("TBR_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			$("#TBR_overlay").addClass("TBR_overlayBG");//use background and opacity
		}
		
		if(caption===null){caption="";}
		$("body").append("<div id='TBR_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		$('#TBR_load').show();//show loader
		
		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{ 
	   		baseURL = url;
	   }
	   
	   var urlString = /.jpg$|.jpeg$|.png$|.gif$|.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
				
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $("a[@rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {						
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TBR_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);											
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){		
			imgPreloader.onload = null;
				
			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tbr_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			$("#TBR_window").append("<a href='' id='TBR_ImageOff' title='"+closeText+"'><img id='TBR_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TBR_caption'>"+caption+"<div id='TBR_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TBR_closeWindow'>"+closeWindowText+"</div>");
			
			$("#TBR_closeWindowButton").click(tbr_remove);
			
			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
					$("#TBR_window").remove();
					$("body").append("<div id='TBR_window'></div>");
					tbr_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;	
				}
				$("#TBR_prev").click(goPrev);
			}
			
			if (!(TB_NextHTML === "")) {		
				function goNext(){
					$("#TBR_window").remove();
					$("body").append("<div id='TBR_window'></div>");
					tbr_show(TB_NextCaption, TB_NextURL, imageGroup);				
					return false;	
				}
				$("#TB_next").click(goNext);
				
			}

			document.onkeydown = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tbr_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}	
			};
			
			tbr_position();
			$("#TBR_load").remove();
			$("#TBR_ImageOff").click(tbr_remove);
			$("#TBR_window").css({display:"block"}); //for safari using css instead of show
			};
			
			imgPreloader.src = url;
		}else{//code to show html
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tbr_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;
			
			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
					urlNoQuery = url.split('TB_');
					$("#TBR_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						$("#TBR_window").append("<div id='TBR_title'><div id='TBR_ajaxWindowTitle'>"+caption+"</div><div id='TBR_closeAjaxWindow'>"+closeWindowText+"</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TBR_iframeContent' name='TBR_iframeContent"+Math.round(Math.random()*1000)+"' onload='tbr_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}else{//iframe modal
					$("#TBR_overlay").unbind();
						$("#TBR_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TBR_iframeContent' name='TBR_iframeContent"+Math.round(Math.random()*1000)+"' onload='tbr_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
					}
			}else{// not an iframe, ajax
					if($("#TBR_window").css("display") != "block"){
						if(params['modal'] != "true"){//ajax no modal
						$("#TBR_window").append("<div id='TBR_title'><div id='TBR_ajaxWindowTitle'>"+caption+"</div><div id='TBR_closeAjaxWindow'>"+closeWindowText+"</div></div><div id='TBR_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						$("#TBR_overlay").unbind();
						$("#TBR_window").append("<div id='TBR_ajaxContent' class='TBR_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						$("#TBR_ajaxContent")[0].style.width = ajaxContentW +"px";
						$("#TBR_ajaxContent")[0].style.height = ajaxContentH +"px";
						$("#TBR_ajaxContent")[0].scrollTop = 0;
						$("#TBR_ajaxWindowTitle").html(caption);
					}
			}
					
			$("#TBR_closeWindowButton").click(tbr_remove);
			
				if(url.indexOf('TB_inline') != -1){	
					$("#TBR_ajaxContent").append($('#' + params['inlineId']).children());
					$("#TBR_window").unload(function () {
						$('#' + params['inlineId']).append( $("#TBR_ajaxContent").children() ); // move elements back when you're finished
					});
					tbr_position();
					$("#TBR_load").remove();
					$("#TBR_window").css({display:"block"}); 
				}else if(url.indexOf('TB_iframe') != -1){
					tbr_position();
					if($.browser.safari){//safari needs help because it will not fire iframe onload
						$("#TBR_load").remove();
						$("#TBR_window").css({display:"block"});
					}
				}else{
					$("#TBR_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tbr_position();
						$("#TBR_load").remove();
						tbr_init("#TBR_ajaxContent a.thickboxReg");
						$("#TBR_window").css({display:"block"});
					});
				}
			
		}

		if(!params['modal']){
			document.onkeyup = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tbr_remove();
				}	
			};
		}
		
	} catch(e) {
		//nothing here
	}
}

//helper functions below
function tbr_showIframe(){
	$("#TBR_load").remove();
	$("#TBR_window").css({display:"block"});
}

function tbr_remove() {
 	$("#TB_imageOff").unbind("click");
	$("#TBR_closeWindowButton").unbind("click");
	$("#TBR_window").fadeOut("fast",function(){$('#TBR_window,#TBR_overlay,#TBR_HideSelect').trigger("unload").unbind().remove();});
	$("#TBR_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	document.onkeydown = "";
	document.onkeyup = "";
	return false;
}

function tbr_position() {
$("#TBR_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
		$("#TBR_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tbr_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tbr_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tbr_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}

function getString(stringName) {
	
	
	var closeText;
 	var closeWindowText;
	

	var localizedString = {
			// english
		'en': {
			closeText: 'Close',
			closeWindowText: '<a href=\'#\' id=\'TBR_closeWindowButton\' title=\'Close\'>close</a> or Esc Key'
		},
			// spanish
		'es': {
			closeText: 'Cerrar',
			closeWindowText: '<a href=\'#\' id=\'TBR_closeWindowButton\' title=\'Cerrar\'>cerrar</a> o tecla Esc'
			},
		
		// german
		'de': {
			closeText: 'Schlie\u00DFen',
			closeWindowText: '<a href=\'#\' id=\'TBR_closeWindowButton\' title=\'Schlie\u00DFen\'>Schlie\u00DFen</a> oder Esc Key'
			}
		};
	
		return localizedString[mo.language][stringName];
}