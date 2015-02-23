$(document).ready(function() {
	$("#newsletter_signInButton").bind('click', doNLSubmit);
	$("ul#topnav li:first").css({ 'background' : 'url(/img/selectedtab_bg.gif) repeat-x'}).find("span").show();
	$("ul#topnav li:first").css({ 'margin-top' : '5px'});
	$('ul#topnav li[id!="searchbar"]').hover(function() { //Hover over event on list item
		$("ul#topnav li:first").css({ 'background' : 'none'}).find("span").hide();
		$(this).css({ 'background' : 'url(/img/selectedtab_bg.gif) repeat-x'}); //Add background color + image on hovered list item
		$(this).css({ 'margin-top' : '5px'});
		$(this).find("span").show(); //Show the subnav
} , function() { //on hover out...
		$(this).css({ 'background' : 'none'}); //Ditch the background
		$(this).find("span").hide(); //Hide the subnav
		$("ul#topnav li:first").css({ 'background' : 'url(/img/selectedtab_bg.gif) repeat-x'}).find("span").show();
});

});

function doNLSubmit() {
	$("#IDnewsletterbox_error").hide();
	var email = $("#newsletteremailID").val();
	var NewsletterKey = $("#navNewsletterSignup").val();
	var businessUnit = $("#businessUnit").val();    
	var NewsletterSignup = $("#NewsletterSignup").val(); 
	var RegistrationWebsite = $("#RegistrationWebsite").val(); 

	
	
	if (validate(email)) {
        $("#IDnewsletterbox_error").text('* Invalid Email Address');
		$("#IDnewsletterbox_error").show();
	} else {
		$.ajax({
	                type:"POST",
	                url:"/newsletterReg",
	                data:{email: email,NewsletterKey:NewsletterKey,RegistrationWebsite:RegistrationWebsite,businessUnit:businessUnit,NewsletterSignup:NewsletterSignup},
	                dataType:"json",
	                async: false,
	                success:function(data)
                    {
				        if (data.result == "success")
                        {
					        $("#newemailbox_content").hide();
                            $("#nlsuccessid").text('You\'ve successfully signed up to receive the Networking Daily Newsletter.');
					        $("#newslettermailboxsuccessID").show();
				        }
                        else
                        {
                            $("#IDnewsletterbox_error").text('Fail');
                            $("#IDnewsletterbox_error").show();
                        }
			        },
                    error:function()
                    {
                        $("#IDnewsletterbox_error").text('Error registering for newsletter.');
                        $("#IDnewsletterbox_error").show();
                    }
	    });
	}
    return false;
}
function validate(email) {
	var reg = /^([A-Za-z0-9_\-\.]{2,})+\@([A-Za-z0-9_\-\.]{2,})+\.([A-Za-z]{2,4})$/;
	if(reg.test(email) == false) return true; else return false;
}




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

function now() {
	return +new Date;
}

var Animation = function(duration,step,complete,cancel) {
	var startTime = now();
	var dur = duration;
	var self=this;

	var timerId = window.setInterval(function() {
		var n  = now() - startTime;
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


function readCookie( name) 
{
    
var nameEQ = name + "=";
        var ca = document.cookie.split( ';');
        for( var i=0;i < ca.length;i++) 
        {
                var c = ca[i];
                while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
                if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
        }
        return null;
}

function welcomeUser(){
		var firstName = readCookie('fn');
		var lastName = readCookie('ln');
	
		if(firstName!=null && lastName!=null){
			firstName = decodeURIComponent(firstName);
			lastName =  decodeURIComponent(lastName);
			firstName = firstName.replace("+"," ");
			lastName = lastName.replace("+"," ");
			
			var div = document.getElementById("pageLogin");
			div.parentNode.removeChild(div);
			var sp1 =document.createElement("div");
			sp1.setAttribute("class", "right");
			sp1.setAttribute('style', 'color: #797979; font-family: Arial, sans-serif; font-size: 13px;');sp1.innerHTML = "<a style = 'color: #0F2593;display: block;float: left;font-size: 14px;font-weight: bold;height: 16px;margin: 0; padding-right: 8px;text-align: center;text-decoration: none;' href='/accountManagement?formType=userProfile' alt='User Profle' title='User Profile'>"+firstName+" "+lastName+"</a>&nbsp;&nbsp <a style = 'color: #0F2593;display: inline;font-size: 14px;font-weight: bold;height: 16px;margin: 0; padding-right: 20px;text-align: center;text-decoration: none;' href='/accountManagement?logout=true&formType=logoutForm' alt='Logout' title='Logout'>Logout</a>";
			document.getElementById("tagBar").appendChild(sp1);
		}		
}


var userId = '';
if(readCookie('USERID_COOKIE')!=null){
				userId =  decodeURIComponent(readCookie('USERID_COOKIE'));
}
else if(readCookie('STAGE_USERID_COOKIE')!=null && userId==''){
				userId =  decodeURIComponent(readCookie('STAGE_USERID_COOKIE'));                  
}
else if(readCookie('TEST_USERID_COOKIE')!=null && userId==''){
				userId =  decodeURIComponent(readCookie('TEST_USERID_COOKIE'));                      
}
else if(readCookie('DEV_USERID_COOKIE')!=null && userId==''){
				userId =  decodeURIComponent(readCookie('DEV_USERID_COOKIE'));                       
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

$(function() {
    $("#footerlinks a:last").after(' | <a href="/sitemap.html">Sitemap</a>');
});