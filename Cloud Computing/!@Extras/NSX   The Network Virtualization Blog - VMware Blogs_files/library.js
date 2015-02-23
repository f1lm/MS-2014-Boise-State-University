/*********************************************************************************************************/
// Menu Dropdowns

initNav = function() {
		var navRoot = document.getElementById("primary-navigation");
		if (navRoot)
		{
		var lis = navRoot.getElementsByTagName("li");
		for (var i=0; i<lis.length; i++)
		{
			var drops = lis[i].getElementsByTagName("ul");
			if (drops.length)
			{
				lis[i].onmouseover = function()
				{
					this.className += " hover";
				}
				lis[i].onmouseout = function()
				{
					this.className = this.className.replace("hover", "");
				}
			}
		}
		}
		var navRoot = document.getElementById("language");
		if (navRoot != null)  /*for vmworld pages*/
		{
		var lis = navRoot.getElementsByTagName("li");
		for (var i=0; i<lis.length; i++)
		{
			var drops = lis[i].getElementsByTagName("ul");
			if (drops.length)
			{
				lis[i].onmouseover = function()
				{
					this.className += " hover";
				}
				lis[i].onmouseout = function()
				{
					this.className = this.className.replace("hover", "");
				}
			}
		}
		}
}

if (window.addEventListener){
	window.addEventListener("load", initNav, false);
}
else if (window.attachEvent){
	window.attachEvent("onload", initNav);
}

/*********************************************************************************************************/

function searchfield_clear() {
	if (document.f.q.value != "")
		document.f.q.value = "";
}

function searchfield_blur() {
	if (document.f.q.value == "")
		document.f.q.value = (document.gs.q.value.length) ? document.gs.q.value : "";
}

function searchglobal_clear() {            
	if (document.frmSearchGLOBAL.q.value != "")
		document.frmSearchGLOBAL.q.value = "";
}

/*********************************************************************************************************/

// Anti-spam email links by deanq.com
function vmemail(who,subject,domain,body) {
  if (!domain) var domain = "vmware.com";
  if (!subject) var subject = " ";
  if (!body) var body = " ";
  eval("location.href='mailto:" + who + "@" + domain + "?subject=" + subject + "&body=" + body + "'");
}

// General popup window function
function popup(URL,name,w,h,scroll, resize, status, buttons) {
  var featureStr = "";
  if (scroll) { scroll = 'yes'; } else { scroll = 'no'; }
  if (resize) { resize = 'yes'; } else { resize = 'no'; }
  if (status) { status = 'yes'; } else { status = 'no'; }
  if (!buttons) { buttons = 'no'; } else { buttons = 'yes'; } // This includes location bar, menubar and toolbar
  featureStr = "width=" + w + ",height=" + h + ",directories=no,location=" + buttons + ",menubar=" + buttons + ",resizable=" + resize + ",scrollbars=" + scroll + ",status=" + status + ",toolbar=" + buttons
  var newWin = window.open(URL,name,featureStr);
  newWin.focus(); // Bring window to focus (in case of updating an existing window)
}

/////////////////////////////////////////////
// Dynamic Tabs controller used in VI3 pages
//

function showLayer(lyr) {
//   makeHistory(lyr);
   document.getElementById(currentLayer).className = 'hide';
   document.getElementById(lyr).className = 'show';
   currentLayer = lyr;
//   showTab(lyr.replace("tab","t_"));
}

function showTab(lyr) {
   document.getElementById(currentTab).className = 'taboff';
   document.getElementById(lyr).className = 'tabon';
   currentTab = lyr;
}

/*****************************************************
 * Preload Dropdown Images - 08/12/07
 *****************************************************/
/* removed for redesign 11/05/09
var image_arr = Array(
	'/files/images/tpl/arrow-dropdown-white.gif',
	'/files/images/tpl/d-link-main-left.gif',
	'/files/images/tpl/d-link-main-right.gif',
	'/files/images/tpl/d-dropdown-top.gif',
	'/files/images/tpl/d-dropdown-bottom.gif',
	'/files/images/tpl/d-gradient.gif',
	'/files/images/tpl/link-main-left.gif',
	'/files/images/tpl/link-main-right.gif',
	'/files/images/tpl/dropdown-top.gif',
	'/files/images/tpl/dropdown-bottom.gif',
	'/files/images/tpl/gradient.gif',
	'/files/images/tpl/gradient.gif',
	'/files/images/tpl/link-main-right-act.gif',
	'/files/images/tpl/link-main-active.gif',
	'/files/images/tpl/link-main-right-act.gif'
);

var j = 0;
var p = image_arr.length;
var preBuffer = new Array();

for (i = 0; i < p; i++){
   preBuffer[i] = new Image();
   preBuffer[i].src = image_arr[i];
}
*/
/*****************************************************/

function getParameter(name) {

    var url = window.location.href;

    var paramsStart = url.indexOf("?");

    if(paramsStart != -1){

       var paramString = url.substr(paramsStart + 1);

       var tokenStart = paramString.indexOf(name);

       if(tokenStart != -1){

          paramToEnd = paramString.substr(tokenStart + name.length + 1);

          var delimiterPos = paramToEnd.indexOf("&");

          if(delimiterPos == -1){

             return paramToEnd;

          }

          else {

             return paramToEnd.substr(0, delimiterPos);

          }
       }
    }
 }
 
//Handle Duplicate Form Submissions
	function handleSubmit(frmObj){
	   	var inputElements = frmObj.getElementsByTagName('input');
	   	for (i=0; i<inputElements.length; i++) {
	       		if(inputElements[i].type.toLowerCase() == 'submit'){
	       		   inputElements[i].disabled=true;
	       		}
	     	}
	}
    
/* OnlineOpinion (S3tS v3.1) */

/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0, _poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};function O_LC(){_w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};function _fPe(){if(Math.random()>=1.0-_poE){O_LC();_poX=0.0}};function _fPx(){if(Math.random()>=1.0-_poX)O_LC()};window.onunload=_fPx;function O_GoT(_p){_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');_fPe()}

/*redesign new added from hover.js */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 u=k(){9 g=/^([^#.>`]*)(#|\\.|\\>|\\`)(.+)$/;k u(a,b){9 c=a.J(/\\s*\\,\\s*/);9 d=[];n(9 i=0;i<c.l;i++){d=d.v(o(c[i],b))};6 d};k o(a,b,c){a=a.z(" ","`");9 d=a.r(g);9 e,5,m,7,i,h;9 f=[];4(d==8){d=[a,a]};4(d[1]==""){d[1]="*"};4(c==8){c="`"};4(b==8){b=E};K(d[2]){w"#":7=d[3].r(g);4(7==8){7=[8,d[3]]};e=E.L(7[1]);4(e==8||(d[1]!="*"&&!x(e,d[1]))){6 f};4(7.l==2){f.A(e);6 f};6 o(7[3],e,7[2]);w".":4(c!=">"){5=p(b,d[1])}y{5=b.B};n(i=0,h=5.l;i<h;i++){e=5[i];4(e.C!=1){q};7=d[3].r(g);4(7!=8){4(e.j==8||e.j.r("(\\\\s|^)"+7[1]+"(\\\\s|$)")==8){q};m=o(7[3],e,7[2]);f=f.v(m)}y 4(e.j!=8&&e.j.r("(\\\\s|^)"+d[3]+"(\\\\s|$)")!=8){f.A(e)}};6 f;w">":4(c!=">"){5=p(b,d[1])}y{5=b.B};n(i=0,h=5.l;i<h;i++){e=5[i];4(e.C!=1){q};4(!x(e,d[1])){q};m=o(d[3],e,">");f=f.v(m)};6 f;w"`":5=p(b,d[1]);n(i=0,h=5.l;i<h;i++){e=5[i];m=o(d[3],e,"`");f=f.v(m)};6 f;M:4(c!=">"){5=p(b,d[1])}y{5=b.B};n(i=0,h=5.l;i<h;i++){e=5[i];4(e.C!=1){q};4(!x(e,d[1])){q};f.A(e)};6 f}};k p(a,b){4(b=="*"&&a.F!=8){6 a.F};6 a.p(b)};k x(a,b){4(b=="*"){6 N};6 a.O.G().z("P:","")==b.G()};6 u}();k Q(a,b){9 c=u(a);n(9 i=0;i<c.l;i++){c[i].R=k(){4(t.j.H(b)==-1){t.j+=" "+b}};c[i].S=k(){4(t.j.H(b)!=-1){t.j=t.j.z(b,"")}}}}4(D.I&&!D.T){D.I("U",V)}',58,58,'||||if|listNodes|return|subselector|null|var||||||||limit||className|function|length|listSubNodes|for|doParse|getElementsByTagName|continue|match||this|parseSelector|concat|case|matchNodeNames|else|replace|push|childNodes|nodeType|window|document|all|toLowerCase|indexOf|attachEvent|split|switch|getElementById|default|true|nodeName|html|hoverForIE6|onmouseover|onmouseout|opera|onload|ieHover'.split('|'),0,{}))
/*parametrs [selector, hover_class]*/
function ieHover() {
	hoverForIE6(".nav li", "hover");
	hoverForIE6(".nav li.first", "first-hover");
	hoverForIE6(".nav li.last", "last-hover");
}

// TW: Added IE6 PNG support (utilize Unit PNG Fix http://labs.unitinteractive.com/unitpngfix.php)
var _isIE6 = (typeof window.XMLHttpRequest == "undefined");
if(_isIE6){
    var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
    DD_belatedPNG.fix('.nav ul, .drop .c, .drop .t, .drop .b, .category-nav li, .btn-learn-more, .overlay-nav .holder,.nav li.active .a-first, a');
}

// TW: Global Accout Login validation function
window.acctUtil = {};
acctUtil.validateLogin = function(username, password, errorMsgDiv){
    
    // default error div ID is "loginError"
    errorMsgDiv = errorMsgDiv || "loginError";
    var errDiv = document.getElementById(errorMsgDiv);
    
    // private function for showing error
    var showError = function(txt){
        errDiv.innerHTML = txt;
    }

	//var isNumber  = /(^-?\+?\d\d*$)/;
	var isNumber= /(^-*\d+$)|(^-*\d+\.\d+$)/;
	//var isValidEmail = /^[\a-zA-Z]([\w-]|\.(?!\.+?))*[\w]@[\w]([\w-]|\.(?!\.+?))*[\w]\.(?!\.+?)[a-zA-Z]([\w-]|\.(?!\.+?))*[a-zA-Z]$/;
	var isValidEmail = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9.]+$/i;  //BUG-00039103 fix

	if(username.length==0 && password.length==0){
		//new error message as part of auto-entitlement project
		//new error message : E-Mail address or CN is required. 
		//old error message : Email address left blank.\nPassword left blank.
		showError('Please enter your Email Address or Customer Number.\nPassword left blank.');
		return false;
	}

	if(username.length==0){
		//new error message as part of auto-entitlement project
		//new error message E-Mail address or CN is required.
		//old error message : Email address left blank. 
		showError('Please enter your Email Address or Customer Number.');
		return false;
	}

	if(password.length==0){
		showError('Password left blank.');
		return false;
	}

	if(username.length != 0){
		if(isNumber.test(username)){
			var isValidNumber  = /(^\d{10}$)/;
			if(!isValidNumber.test(username)){
 				showError('Customer Number is invalid.');
				return false;	
			}
		}else{
			//do email validation
			if(!isValidEmail.test(username)){
				showError('Email Address can only include alphanumeric characters.');
				return false;
			}
		}
	}

	return true;
};

//TW: For introducing a one-second deplay to the menu
(function(){
    var addEvent = function(object, evt, func, capture)
    {
        if(!object)
            return false;
        if(typeof func != 'function')
            return false;
        if(object.addEventListener){
            object.addEventListener(evt, func, capture);
            return true;
        }
        else if(object.attachEvent){
            object.attachEvent('on' + evt, func);
            return true;
        }
        return false;
    };
    addEvent(window, "load", function(){
        var gsite = document.getElementById("global-sites") || document.getElementById("iglobal-sites");
        if(null == gsite || undefined == gsite){//primary navigation not available
        	return;
        }

        //var items = gsite.getElementsByTagName("div")[2].getElementsByTagName("ul")[0].childNodes;
		var items = jQuery('div.nav ul:eq(0)')[0].childNodes;
        var ldiv = null;
        var tid = -1;
        var mouseoutHandler = function(){  
            window.clearTimeout(tid);
        };
        var hideDiv = function(){
            if(ldiv)
                ldiv.style.display = "none";
        }
        for(var i=0; i<items.length; i++){
            addEvent(items[i], "mouseover", function(idx){
                return function(){
                    var div = items[idx].getElementsByTagName("div")[0];
                    tid = window.setTimeout(function(){
                        if(ldiv)
                            ldiv.style.display = "none";
                        ldiv = div;
                        div.style.display = "block";
                    }, 300);
                };
            }(i));
            addEvent(items[i], "mouseout", mouseoutHandler);
        }
        addEvent(document.getElementById("content-container"), "mouseover", hideDiv); 
    });
})();

if (typeof(vmf) == "undefined") window.vmf=function(){
    var _3=function(_4){document.write("<script src=\"",_4,"\" type=\"text/javascript\"></script>");};
    var _5=[];
    return {loadJs:function(_6,_7,_8){
                  if((jQuery.inArray(_6,_5)<0)){
                     (_7)?jQuery.getScript(_6,_8):_3(_6);
                  }              
            }
,cookie:function(){
return {read:function(_1c){
var _1d=_1c+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_1d)==0){
return c.substring(_1d.length,c.length);
}
}
return null;
},write:function(_21,_22,_23){
var _24="";
if(_23){
var _25=new Date();
_25.setTime(_25.getTime()+(_23*24*60*60*1000));
_24="; expires="+_25.toGMTString();
}else{
_24="";
}}
}}()
}
}();