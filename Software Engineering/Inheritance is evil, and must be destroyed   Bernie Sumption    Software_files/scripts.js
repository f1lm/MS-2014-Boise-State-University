﻿// Combined, minified script file for berniesumption.com

// SWFObject v2.2 <http://code.google.com/p/swfobject/> 
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

// wp-includes/js/comment-reply.js?ver=20090102'
addComment={moveForm:function(d,f,i,c){var m=this,a,h=m.I(d),b=m.I(i),l=m.I("cancel-comment-reply-link"),j=m.I("comment_parent"),k=m.I("comment_post_ID");if(!h||!b||!l||!j){return}m.respondId=i;c=c||false;if(!m.I("wp-temp-form-div")){a=document.createElement("div");a.id="wp-temp-form-div";a.style.display="none";b.parentNode.insertBefore(a,b)}h.parentNode.insertBefore(b,h.nextSibling);if(k&&c){k.value=c}j.value=f;l.style.display="";l.onclick=function(){var n=addComment,e=n.I("wp-temp-form-div"),o=n.I(n.respondId);if(!e||!o){return}n.I("comment_parent").value="0";e.parentNode.insertBefore(o,e);e.parentNode.removeChild(e);this.style.display="none";this.onclick=null;return false};try{m.I("comment").focus()}catch(g){}return false},I:function(a){return document.getElementById(a)}};

// Animator.js 1.1.11
function Animator(a){this.setOptions(a);var b=this;this.timerDelegate=function(){b.onTimerEvent()};this.subjects=[];this.state=this.target=0;this.lastTime=null} Animator.prototype={setOptions:function(a){this.options=Animator.applyDefaults({interval:20,duration:400,onComplete:function(){},onStep:function(){},transition:Animator.tx.easeInOut},a)},seekTo:function(a){this.seekFromTo(this.state,a)},seekFromTo:function(a,b){this.target=Math.max(0,Math.min(1,b));this.state=Math.max(0,Math.min(1,a));this.lastTime=(new Date).getTime();if(!this.intervalId)this.intervalId=window.setInterval(this.timerDelegate,this.options.interval)},jumpTo:function(a){this.target= this.state=Math.max(0,Math.min(1,a));this.propagate()},toggle:function(){this.seekTo(1-this.target)},addSubject:function(a){this.subjects[this.subjects.length]=a;return this},clearSubjects:function(){this.subjects=[]},propagate:function(){for(var a=this.options.transition(this.state),b=0;b<this.subjects.length;b++)if(this.subjects[b].setState)this.subjects[b].setState(a);else this.subjects[b](a)},onTimerEvent:function(){var a=(new Date).getTime(),b=a-this.lastTime;this.lastTime=a;a=b/this.options.duration* (this.state<this.target?1:-1);Math.abs(a)>=Math.abs(this.state-this.target)?this.state=this.target:this.state+=a;try{this.propagate()}finally{this.options.onStep.call(this),this.target==this.state&&this.stop()}},stop:function(){if(this.intervalId)window.clearInterval(this.intervalId),this.intervalId=null,this.options.onComplete.call(this)},play:function(){this.seekFromTo(0,1)},reverse:function(){this.seekFromTo(1,0)},inspect:function(){for(var a="#<Animator:\n",b=0;b<this.subjects.length;b++)a+=this.subjects[b].inspect(); a+=">";return a}};Animator.applyDefaults=function(a,b){var b=b||{},c,d={};for(c in a)d[c]=b[c]!==void 0?b[c]:a[c];return d};Animator.makeArrayOfElements=function(a){if(a==null)return[];if("string"==typeof a)return[document.getElementById(a)];if(!a.length)return[a];for(var b=[],c=0;c<a.length;c++)b[c]="string"==typeof a[c]?document.getElementById(a[c]):a[c];return b}; Animator.camelize=function(a){var b=a.split("-");if(b.length==1)return b[0];for(var a=a.indexOf("-")==0?b[0].charAt(0).toUpperCase()+b[0].substring(1):b[0],c=1,d=b.length;c<d;c++){var e=b[c];a+=e.charAt(0).toUpperCase()+e.substring(1)}return a};Animator.apply=function(a,b,c){if(b instanceof Array)return(new Animator(c)).addSubject(new CSSStyleSubject(a,b[0],b[1]));return(new Animator(c)).addSubject(new CSSStyleSubject(a,b))};Animator.makeEaseIn=function(a){return function(b){return Math.pow(b,a*2)}}; Animator.makeEaseOut=function(a){return function(b){return 1-Math.pow(1-b,a*2)}};Animator.makeElastic=function(a){return function(b){b=Animator.tx.easeInOut(b);return(1-Math.cos(b*Math.PI*a))*(1-b)+b}};Animator.makeADSR=function(a,b,c,d){d==null&&(d=0.5);return function(e){if(e<a)return e/a;if(e<b)return 1-(e-a)/(b-a)*(1-d);if(e<c)return d;return d*(1-(e-c)/(1-c))}};Animator.makeBounce=function(a){var b=Animator.makeElastic(a);return function(a){a=b(a);return a<=1?a:2-a}}; Animator.tx={easeInOut:function(a){return-Math.cos(a*Math.PI)/2+0.5},linear:function(a){return a},easeIn:Animator.makeEaseIn(1.5),easeOut:Animator.makeEaseOut(1.5),strongEaseIn:Animator.makeEaseIn(2.5),strongEaseOut:Animator.makeEaseOut(2.5),elastic:Animator.makeElastic(1),veryElastic:Animator.makeElastic(3),bouncy:Animator.makeBounce(1),veryBouncy:Animator.makeBounce(3)}; function NumericalStyleSubject(a,b,c,d,e){this.els=Animator.makeArrayOfElements(a);this.property=b=="opacity"&&window.ActiveXObject?"filter":Animator.camelize(b);this.from=parseFloat(c);this.to=parseFloat(d);this.units=e!=null?e:"px"} NumericalStyleSubject.prototype={setState:function(a){for(var a=this.getStyle(a),b=0,c=0;c<this.els.length;c++){try{this.els[c].style[this.property]=a}catch(d){if(this.property!="fontWeight")throw d;}if(b++>20)break}},getStyle:function(a){a=this.from+(this.to-this.from)*a;if(this.property=="filter")return"alpha(opacity="+Math.round(a*100)+")";if(this.property=="opacity")return a;return Math.round(a)+this.units},inspect:function(){return"\t"+this.property+"("+this.from+this.units+" to "+this.to+this.units+ ")\n"}};function ColorStyleSubject(a,b,c,d){this.els=Animator.makeArrayOfElements(a);this.property=Animator.camelize(b);this.to=this.expandColor(d);this.from=this.expandColor(c);this.origFrom=c;this.origTo=d} ColorStyleSubject.prototype={expandColor:function(a){var b,c;if(b=ColorStyleSubject.parseColor(a))return a=parseInt(b.slice(1,3),16),c=parseInt(b.slice(3,5),16),b=parseInt(b.slice(5,7),16),[a,c,b];window.ANIMATOR_DEBUG&&alert("Invalid colour: '"+a+"'")},getValueForState:function(a,b){return Math.round(this.from[a]+(this.to[a]-this.from[a])*b)},setState:function(a){for(var a="#"+ColorStyleSubject.toColorPart(this.getValueForState(0,a))+ColorStyleSubject.toColorPart(this.getValueForState(1,a))+ColorStyleSubject.toColorPart(this.getValueForState(2, a)),b=0;b<this.els.length;b++)this.els[b].style[this.property]=a},inspect:function(){return"\t"+this.property+"("+this.origFrom+" to "+this.origTo+")\n"}}; ColorStyleSubject.parseColor=function(a){var b="#",c;if(c=ColorStyleSubject.parseColor.rgbRe.exec(a)){for(var d=1;d<=3;d++)a=Math.max(0,Math.min(255,parseInt(c[d]))),b+=ColorStyleSubject.toColorPart(a);return b}if(c=ColorStyleSubject.parseColor.hexRe.exec(a)){if(c[1].length==3){for(d=0;d<3;d++)b+=c[1].charAt(d)+c[1].charAt(d);return b}return"#"+c[1]}return!1};ColorStyleSubject.toColorPart=function(a){a>255&&(a=255);var b=a.toString(16);if(a<16)return"0"+b;return b}; ColorStyleSubject.parseColor.rgbRe=/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;ColorStyleSubject.parseColor.hexRe=/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function DiscreteStyleSubject(a,b,c,d,e){this.els=Animator.makeArrayOfElements(a);this.property=Animator.camelize(b);this.from=c;this.to=d;this.threshold=e||0.5} DiscreteStyleSubject.prototype={setState:function(a){for(var b=0;b<this.els.length;b++)this.els[b].style[this.property]=a<=this.threshold?this.from:this.to},inspect:function(){return"\t"+this.property+"("+this.from+" to "+this.to+" @ "+this.threshold+")\n"}}; function CSSStyleSubject(a,b,c){a=Animator.makeArrayOfElements(a);this.subjects=[];if(a.length!=0){var d;if(c)b=this.parseStyle(b,a[0]),c=this.parseStyle(c,a[0]);else for(d in c=this.parseStyle(b,a[0]),b={},c)b[d]=CSSStyleSubject.getStyle(a[0],d);for(d in b)b[d]==c[d]&&(delete b[d],delete c[d]);var e,f,h,j;for(d in b){var i=String(b[d]),g=String(c[d]);if(c[d]==null)window.ANIMATOR_DEBUG&&alert("No to style provided for '"+d+'"');else{if(h=ColorStyleSubject.parseColor(i))j=ColorStyleSubject.parseColor(g), f=ColorStyleSubject;else if(i.match(CSSStyleSubject.numericalRe)&&g.match(CSSStyleSubject.numericalRe))h=parseFloat(i),j=parseFloat(g),f=NumericalStyleSubject,e=CSSStyleSubject.numericalRe.exec(i),g=CSSStyleSubject.numericalRe.exec(g),e=e[1]!=null?e[1]:g[1]!=null?g[1]:g;else if(i.match(CSSStyleSubject.discreteRe)&&g.match(CSSStyleSubject.discreteRe))h=i,j=g,f=DiscreteStyleSubject,e=0;else{window.ANIMATOR_DEBUG&&alert("Unrecognised format for value of "+d+": '"+b[d]+"'");continue}this.subjects[this.subjects.length]= new f(a,d,h,j,e)}}}} CSSStyleSubject.prototype={parseStyle:function(a,b){var c={};if(a.indexOf(":")!=-1)for(var d=a.split(";"),e=0;e<d.length;e++){var f=CSSStyleSubject.ruleRe.exec(d[e]);f&&(c[f[1]]=f[2])}else{var h;h=b.className;b.className=a;for(e=0;e<CSSStyleSubject.cssProperties.length;e++)d=CSSStyleSubject.cssProperties[e],f=CSSStyleSubject.getStyle(b,d),f!=null&&(c[d]=f);b.className=h}return c},setState:function(a){for(var b=0;b<this.subjects.length;b++)this.subjects[b].setState(a)},inspect:function(){for(var a="", b=0;b<this.subjects.length;b++)a+=this.subjects[b].inspect();return a}};CSSStyleSubject.getStyle=function(a,b){var c;if(document.defaultView&&document.defaultView.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)))return c;b=Animator.camelize(b);a.currentStyle&&(c=a.currentStyle[b]);return c||a.style[b]};CSSStyleSubject.ruleRe=/^\s*([a-zA-Z\-]+)\s*:\s*(\S(.+\S)?)\s*$/;CSSStyleSubject.numericalRe=/^-?\d+(?:\.\d+)?(%|[a-zA-Z]{2})?$/;CSSStyleSubject.discreteRe=/^\w+$/; CSSStyleSubject.cssProperties=["azimuth","background","background-attachment","background-color","background-image","background-position","background-repeat","border-collapse","border-color","border-spacing","border-style","border-top","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","border-top-width","border-right-width","border-bottom-width","border-left-width","border-width","bottom", "clear","clip","color","content","cursor","direction","display","elevation","empty-cells","css-float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","height","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-top","margin-right","margin-bottom","margin-left","max-height","max-width","min-height","min-width","orphans","outline","outline-color","outline-style","outline-width", "overflow","padding","padding-top","padding-right","padding-bottom","padding-left","pause","position","right","size","table-layout","text-align","text-decoration","text-indent","text-shadow","text-transform","top","vertical-align","visibility","white-space","width","word-spacing","z-index","opacity","outline-offset","overflow-x","overflow-y"]; function AnimatorChain(a,b){this.animators=a;this.setOptions(b);for(var c=0;c<this.animators.length;c++)this.listenTo(this.animators[c]);this.forwards=!1;this.current=0} AnimatorChain.prototype={setOptions:function(a){this.options=Animator.applyDefaults({resetOnPlay:!0},a)},play:function(){this.forwards=!0;this.current=-1;if(this.options.resetOnPlay)for(var a=0;a<this.animators.length;a++)this.animators[a].jumpTo(0);this.advance()},reverse:function(){this.forwards=!1;this.current=this.animators.length;if(this.options.resetOnPlay)for(var a=0;a<this.animators.length;a++)this.animators[a].jumpTo(1);this.advance()},toggle:function(){this.forwards?this.seekTo(0):this.seekTo(1)}, listenTo:function(a){var b=a.options.onComplete,c=this;a.options.onComplete=function(){b&&b.call(a);c.advance()}},advance:function(){this.forwards?this.animators[this.current+1]!=null&&(this.current++,this.animators[this.current].play()):this.animators[this.current-1]!=null&&(this.current--,this.animators[this.current].reverse())},seekTo:function(a){a<=0?(this.forwards=!1,this.animators[this.current].seekTo(0)):(this.forwards=!0,this.animators[this.current].seekTo(1))}};