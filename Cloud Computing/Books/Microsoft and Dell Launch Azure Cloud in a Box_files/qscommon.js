var getBrowser = function() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (/webkit/.test( userAgent )) {
		return "safari";
	}
	if (/opera/.test( userAgent )) {
		return "opera";
	}
	if (/msie/.test( userAgent ) && !/opera/.test( userAgent )) {
		return "msie";
	}
	if (/mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )) {
		return "mozilla";
	}
};

var getBrowserVersion = function() {
	var userAgent = navigator.userAgent.toLowerCase();
	return (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1];
};

var hasClass = function(element, className) {
	var array = (element.className || element).toString().split(/\s+/);
	
	var j=-1;
	for (var i=0;i<array.length;i++) {
		if (array[i] === className) {
			j=i;
		}
	}
	return (j > -1);
}

var removeClass = function(element, className) {
	var arr = (element.className || element).toString().split(/\s+/);
	
	var newArr = new Array();
	var j = 0;
	for (var i=0;i<arr.length;i++) {
		if (arr[i] != className) {
			newArr[j] = arr[i];
			j++;
		}
	}
	element.className = newArr.join(" ");
}

var addClass = function(element, className) {
	if (!hasClass(element,className)) {
		element.className += (element.className ? " " : "") + className;
	}
}

var searchChilds = function(element, childClassName, level, maxLevel) {
	maxLevel = maxLevel || 0;
	level = level || 0;
	
	var childs = new Array();
	for(var i=0;i<element.childNodes.length;i++) {
		if (hasClass(element.childNodes[i],childClassName)) {
			childs.push(element.childNodes[i]);
		}
		if (element.childNodes[i].childNodes.length > 0 && (maxLevel == 0 || level < maxLevel)) {
			childs = childs.concat(searchChilds(element.childNodes[i],childClassName,level+1,maxLevel));
		}
	}
	return childs;
}

var searchChildsByTagName = function(element, childTagName, level, maxLevel) {
	maxLevel = maxLevel || 0;
	level = level || 0;
	
	var childs = new Array();
	for(var i=0;i<element.childNodes.length;i++) {
		if (element.childNodes[i].tagName == childTagName) {
			childs.push(element.childNodes[i]);
		}
		if (element.childNodes[i].childNodes.length > 0 && (maxLevel == 0 || level < maxLevel)) {
			childs = childs.concat(searchChildsByTagName(element.childNodes[i],childTagName,level+1,maxLevel));
		}
	}
	return childs;
}

function getStyleValue(elem, prop) {
	var ret, style = elem.style;
	
	if (prop == "opacity" && getBrowser() == "msie") {
		return style.filter && style.filter.indexOf("opacity=") >= 0 ?
			(parseFloat( style.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
			"";
	} else {
		return parseInt(style[prop],10) || 0;
	}
}

function setStyleValue(elem, prop, value) {	
	if (prop == "opacity" && getBrowser() == "msie") {
		elem.style.zoom=1;
		elem.style.filter = (elem.style.filter || "").replace( /alpha\([^)]*\)/, "" ) +
			(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
		
	} else {
		elem.style[prop]=value;
	}
}

function getWidth(elem, p, b, m) {
	w = elem.offsetWidth;
	
	p = p || true;
	b = b || true;
	m = m || false;
	
	padding = 0;
	border = 0;
	margin = 0;
	
	if (p)
		padding = getStyleValue(elem, "paddingLeft") + getStyleValue(elem, "paddingRight");
		
	if (b)
		border = getStyleValue(elem, "borderLeftWidth") + getStyleValue(elem, "borderRightWidth");
		
	if (m) 
		margin = getStyleValue(elem, "marginLeft") + getStyleValue(elem, "marginRight");
		
	return w + padding + border + margin;
}

function noww() {
	return +new Date;
}

var Animation = function(duration,step,complete,cancel) {
	var startTime = noww();
	var dur = duration;
	var self=this;
	
	var timerId = window.setInterval(function() {
		var n  = noww() - startTime;
		var state = n / dur;
		if (state > 1) {
			state = 1;
		}
		if (step != undefined && typeof(step) == "function") {
			
			var r = step.call(self,state,n,dur) || true;
			if (!r || state >= 1) {
				window.clearInterval(timerId);
				if (!r && cancel != undefined && typeof(cancel) == "function") {
					cancel.call(state);
				}
				if (r && complete != undefined && typeof(complete) == "function") {
					complete.call(state);
				}
			}
		}
	},13);
	
}

function quadinit()
{
	var querystring = window.location.search;

	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{ 

		var quadresponse = xmlhttp.responseText;
		var responsearray = quadresponse.split("#####");	
		demandBaseResponse = responsearray[1]; 
		demandBaseResponse = eval("(" + demandBaseResponse + ")");
		demandbaseQual = responsearray[2]; 
		criteria = responsearray[3];
	
		}
	}
	
	var randomnumber=Math.floor(Math.random()*9876543210);
	if (querystring.indexOf("ip")>=0){
		querystring = querystring+'&randN='+randomnumber;
	}
	else
		querystring = '?randN='+randomnumber;

	xmlhttp.open("GET",'/front_page/quadinit'+querystring, false);
	xmlhttp.send();
}

/*!
	* jQuery Cookie Plugin
	*/
	(function($) {
		$.cookie = function(key, value, options) {

			// key and at least value given, set cookie...
			if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
				options = $.extend({}, options);

				if (value === null || value === undefined) {
					options.expires = -1;
				}

				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}

				value = String(value);

				return (document.cookie = [
					encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path ? '; path=' + options.path : '',
					options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : ''
				].join(''));
			}

			// key and possibly options given, get cookie...
			options = value || {};
			var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

			var pairs = document.cookie.split('; ');
			for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
				if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
			}
			return null;
		};
	})(jQuery);

function welcomeUser(){
	
		if($.cookie('fn')!=null && $.cookie('ln')!=null){
			var firstName = decodeURIComponent($.cookie('fn'));
			var lastName =  decodeURIComponent($.cookie('ln'));
			firstName = firstName.replace("+"," ");
			lastName = lastName.replace("+"," ");
			
			 $("#login_module_header").html("Account Settings");

			if ($('#itbe-login-register').css('display') == "block"){
				$('#itbe-logout').show();
				$('#itbe-login-register').hide();
				
				if(window.location.pathname.indexOf("ibmguardium")!=-1){
				   color = "white";
				   path = "/ibmguardium";
				   style='style="padding-right:5px;margin-right:5px;border-right:solid 1px white;color:' + color + ';"';
				}else if(window.location.pathname.indexOf("absolute")!=-1){
				   color = "#797979";
				   path = "/absolute";
				   style='style="color:' + color + ';"';
				}else if(window.location.pathname.indexOf("efficientpowerbyapc")!=-1){
				   color = "#797979";
				   path = "/efficientpowerbyapc";
				   style='style="color:' + color + ';"';
				}else{
				   color = "#797979";
				   path = "";
				   style='style="color:' + color + ';"';
				}
				
				$("<span class='greeting' style='color: " + color + "; font-family: Arial, sans-serif; font-size: 13px;'>Hi, <a href='" + path + "/accountManagement?formType=userProfile' alt='User Profle' title='User Profile' " + style + ">"+firstName+' '+lastName+"</a></span>").insertBefore("#itbe-logout .logout-link");
				
			}
		}
		else{
				$('#itbe-logout').hide();
				$('#itbe-login-register').show();
		}
}

	var userId = '';
	if($.cookie('USERID_COOKIE')!=null){
		userId =  decodeURIComponent($.cookie('USERID_COOKIE'));
	}
	else if($.cookie('STAGE_USERID_COOKIE')!=null && userId==''){
		userId =  decodeURIComponent($.cookie('STAGE_USERID_COOKIE'));		
	}
	else if($.cookie('TEST_USERID_COOKIE')!=null && userId==''){
		userId =  decodeURIComponent($.cookie('TEST_USERID_COOKIE'));		
	}
	else if($.cookie('DEV_USERID_COOKIE')!=null && userId==''){
		userId =  decodeURIComponent($.cookie('DEV_USERID_COOKIE'));		
	}
	else
		userId = 'undefined';
	
	if(userId!='undefined'){
		var meta = document.createElement('meta');
		meta.name = 'DCS.dcsaut';		
		meta.content = userId;
		document.getElementsByTagName('head')[0].appendChild(meta);	
	}

	function updateIFrame( leadformData) { //only used for ACL screens not for lead forms pages
		//console.log('leadformData height'+leadformData['height']);
		var iframe = document.getElementById( 'myframe' );   
		var containerDiv = document.getElementById('ACL_Form_Container');
		if(typeof( leadformData['height'] )!=undefined && leadformData['height'] !=0)			 
			iframe.setAttribute( 'height', leadformData['height']);
		
		welcomeUser();						 
	}	
