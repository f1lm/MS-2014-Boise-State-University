// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 17
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){
var n=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a,b){var d=Array.prototype.slice.call(arguments,1);return function(){var b=d.slice();b.push.apply(b,arguments);return a.apply(this,b)}},da=null;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var ea=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,fa=function(a){if(null==a)return String(a);var b=ea.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},ga=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ha=function(a){if(!a||"object"!=fa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!ga(a,"constructor")&&!ga(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}for(var d in a);return void 0===
d||ga(a,d)},ia=function(a,b){var d=b||("array"==fa(a)?[]:{}),c;for(c in a)if(ga(a,c)){var e=a[c];"array"==fa(e)?("array"!=fa(d[c])&&(d[c]=[]),d[c]=ia(e,d[c])):ha(e)?(ha(d[c])||(d[c]={}),d[c]=ia(e,d[c])):d[c]=e}return d};var ja=function(){},y=function(a){return"function"==typeof a},B=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},la=function(a){return"number"==fa(a)&&!isNaN(a)},ma=function(a,b){if(Array.prototype.indexOf){var d=a.indexOf(b);return"number"==typeof d?d:-1}for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},na=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},C=function(a){return Math.round(Number(a))||0},oa=function(a){var b=[];if(B(a))for(var d=0;d<a.length;d++)b.push(String(a[d]));
return b},G=function(){return new Date},pa=function(a,b){if(!la(a)||!la(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},qa=function(){this.prefix="gtm.";this.ha={}};qa.prototype.set=function(a,b){this.ha[this.prefix+a]=b};qa.prototype.get=function(a){return this.ha[this.prefix+a]};qa.prototype.contains=function(a){return void 0!==this.get(a)};
var ra=function(a,b,d){try{return a["21"](a,b||ja,d||ja)}catch(c){}return!1},sa=function(a,b){function d(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var c=na(b).split("&"),e=0;e<c.length;e++)if(c[e]){var f=c[e].indexOf("=");0>f?d(c[e],"1"):d(c[e].substring(0,f),c[e].substring(f+1))}},va=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},wa=function(a){for(var b=0;b<a.length;b++)a[b]()},xa=G().getTime(),ya=function(a,b,d){return a&&a.hasOwnProperty(b)?a[b]:d},za=function(a,
b,d){a.prototype["gtm_proxy_"+b]=a.prototype[b];a.prototype[b]=d};var Ba=new qa,Ca={},Ea={set:function(a,b){ia(Da(a,b),Ca)},get:function(a){return H(a,2)}},H=function(a,b){if(2==b){for(var d=Ca,c=a.split("."),e=0;e<c.length;e++){if(void 0===d[c[e]])return;d=d[c[e]]}return d}return Ba.get(a)},Da=function(a,b){for(var d={},c=d,e=a.split("."),f=0;f<e.length-1;f++)c=c[e[f]]={};c[e[e.length-1]]=b;return d};var Fa={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Ga={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],
nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Ha=function(a,b){for(var d=[],c=0;c<a.length;c++)d.push(a[c]),d.push.apply(d,b[a[c]]||[]);return d},Ia=function(){var a=H("gtm.whitelist"),b=a&&Ha(oa(a),Fa),d=H("gtm.blacklist")||H("tagTypeBlacklist"),c=d&&Ha(oa(d),Ga),e={};return function(f){var g=f&&f["21"];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)e:{if(0>ma(b,g.a))if(g.b&&0<g.b.length)for(var m=0;m<g.b.length;m++){if(0>
ma(b,g.b[m])){h=!1;break e}}else{h=!1;break e}h=!0}var p=!1;if(d){var k;if(!(k=0<=ma(c,g.a)))e:{for(var q=g.b||[],r=new qa,s=0;s<c.length;s++)r.set(c[s],!0);for(s=0;s<q.length;s++)if(r.get(q[s])){k=!0;break e}k=!1}p=k}return e[g.a]=!h||p}};var I=window,L=document,Ja=navigator,M=function(a,b,d){var c=I[a],e="var "+a+";";if(n.execScript)n.execScript(e,"JavaScript");else if(n.eval)if(null==da&&(n.eval("var _et_ = 1;"),"undefined"!=typeof n._et_?(delete n._et_,da=!0):da=!1),da)n.eval(e);else{var f=n.document,g=f.createElement("script");g.type="text/javascript";g.defer=!1;g.appendChild(f.createTextNode(e));f.body.appendChild(g);f.body.removeChild(g)}else throw Error("goog.globalEval not available");I[a]=void 0===c||d?b:c;return I[a]},N=
function(a,b,d,c){return(c||"http:"!=I.location.protocol?a:b)+d},Ka=function(a){var b=L.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)},La=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},O=function(a,b,d){var c=L.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;La(c,b);d&&(c.onerror=d);Ka(c)},Ma=function(a,b){var d=L.createElement("iframe");d.height="0";d.width=
"0";d.style.display="none";d.style.visibility="hidden";Ka(d);La(d,b);void 0!==a&&(d.src=a);return d},l=function(a,b,d){var c=new Image(1,1);c.onload=function(){c.onload=null;b&&b()};c.onerror=function(){c.onerror=null;d&&d()};c.src=a},P=function(a,b,d,c){a.addEventListener?a.addEventListener(b,d,!!c):a.attachEvent&&a.attachEvent("on"+b,d)},R=function(a){I.setTimeout(a,0)},Qa=!1,Ra=[],Sa=function(a){if(!Qa){var b=L.createEventObject,d="complete"==L.readyState,c="interactive"==L.readyState;if(!a||"readystatechange"!=
a.type||d||!b&&c){Qa=!0;for(var e=0;e<Ra.length;e++)Ra[e]()}}},Ta=0,Ua=function(){if(!Qa&&140>Ta){Ta++;try{L.documentElement.doScroll("left"),Sa()}catch(a){I.setTimeout(Ua,50)}}},Wa=function(a){var b=L.getElementById(a);if(b&&Va(b,"id")!=a)for(var d=1;d<document.all[a].length;d++)if(Va(document.all[a][d],"id")==a)return document.all[a][d];return b},Va=function(a,b){return a&&b&&a.attributes[b]?a.attributes[b].value:null},Xa=function(a){return a.target||a.srcElement||{}},Ya=function(a){var b=L.createElement("div");
b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,d=[];b.firstChild;)d.push(b.removeChild(b.firstChild));return d},Za=function(a,b){for(var d={},c=0;c<b.length;c++)d[b[c]]=!0;for(var e=a,c=0;e&&!d[String(e.tagName).toLowerCase()]&&100>c;c++)e=e.parentElement;e&&!d[String(e.tagName).toLowerCase()]&&(e=null);return e},$a=!1,ab=[],bb=function(){if(!$a){$a=!0;for(var a=0;a<ab.length;a++)ab[a]()}},cb=function(a){a=a||I;var b=a.location.href,d=b.indexOf("#");return 0>d?"":b.substring(d+1)};var db;e:{var eb=/MSIE +([\d\.]+)/.exec(Ja.userAgent);if(eb&&eb[1]){var fb=L.documentMode;fb||(fb="CSS1Compat"==L.compatMode?parseInt(eb[1],10):5);if(!fb||8>=fb){db=!1;break e}}db=!!L.querySelectorAll}var gb=db;var _et=function(a){var b=H("gtm.element"),d;if(b){var c=b.innerText||b.textContent||"";c&&" "!=c&&(c=c.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));c&&(c=c.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));d=c}else d="";var e=d;return e?e:a["14"]};_et.a="et";_et.b=["google"];var ib=function(a,b,d,c,e){var f=hb(a),g=(a.protocol.replace(":","")||I.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||I.location.hostname).split(":")[0].toLowerCase();if(d){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:I.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":var f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname,m=f.split("/");0<=ma(c||
[],m[m.length-1])&&(m[m.length-1]="");f=m.join("/");break;case "query":f=a.search.replace("?","");if(e)e:{for(var p=f.split("&"),k=0;k<p.length;k++){var q=p[k].split("=");if(decodeURIComponent(q[0]).replace("+"," ")==e){f=decodeURIComponent(q.slice(1).join("=")).replace("+"," ");break e}}f=void 0}break;case "fragment":f=a.hash.replace("#","")}return f},hb=function(a){var b=a||I.location;return b.hash?b.href.replace(b.hash,""):b.href},kb=function(a){var b=L.createElement("a");b.href=a;return b};var _eu=function(a){var b=String(H("gtm.elementUrl")||a["14"]||""),d=kb(b);return b};_eu.a="eu";_eu.b=["google"];var lb=null,mb=null;var _e=function(){return mb};_e.a="e";_e.b=["google"];var _v=function(a){var b=H(a["27"].replace(/\\\./g,"."),a["12"]);return void 0!==b?b:a["14"]};_v.a="v";_v.b=["google"];var _r=function(a){return pa(a[""],a[""])};_r.a="r";_r.b=["google"];var _f=function(a){var b=String(H("gtm.referrer")||L.referrer),d=kb(b);return b};_f.a="f";_f.b=["google"];var nb=function(a){var b=I.location,d=b.hash?b.href.replace(b.hash,""):b.href,c;if(c=a[""]?a[""]:H("gtm.url"))d=String(c),b=kb(d);var e,f,g;
a["8"]&&(d=ib(b,a["8"],e,f,g));return d},_u=nb;_u.a="u";_u.b=["google"];var _cn=function(a){return 0<=String(a["1"]).indexOf(String(a["2"]))};_cn.a="cn";_cn.b=["google"];var _eq=function(a){return String(a["1"])==String(a["2"])};_eq.a="eq";_eq.b=["google"];
var _asp=function(a,b,d){I.adroll_adv_id=a["11"];I.adroll_pix_id=a["28"];I.adroll_custom_data=a["10"];I.__adroll_loaded=!0;O(N("https://s","http://a",".adroll.com/j/roundtrip.js"),b,d)};_asp.a="asp";_asp.b=["nonGoogleScripts"];var _awct=function(a,b,d){O("//www.googleadservices.com/pagead/conversion_async.js",function(){var c=I.google_trackConversion,e={google_conversion_id:a["23"],google_conversion_label:a["25"],google_conversion_value:a["34"]||0,google_remarketing_only:!1,onload_callback:b};a[""]&&(e.google_conversion_currency=a[""]);y(c)?c(e)||d():d()},d)};_awct.a="awct";_awct.b=["google"];var vb=ja,wb=[],xb=!1,S=function(a){return I["dataLayer"].push(a)},yb=function(a){var b=!1;return function(){!b&&y(a)&&R(a);b=!0}},Eb=function(){for(var a=!1;!xb&&0<wb.length;){xb=!0;var b=wb.shift();if(y(b))try{b.call(Ea)}catch(d){}else if(B(b))e:{var c=b;if("string"==fa(c[0])){for(var e=c[0].split("."),f=e.pop(),g=c.slice(1),h=Ca,m=0;m<e.length;m++){if(void 0===h[e[m]])break e;h=h[e[m]]}try{h[f].apply(h,g)}catch(p){}}}else{var k=b,q=void 0;for(q in k)if(k.hasOwnProperty(q)){var r=q,s=k[q];Ba.set(r,
s);ia(Da(r,s),Ca)}var u=!1,D=k.event;if(D){mb=D;var x=yb(k.eventCallback),Q=k.eventTimeout;Q&&I.setTimeout(x,Number(Q));u=vb(D,x,k.eventReporter)}if(!lb&&(lb=k["gtm.start"])){}mb=null;a=u||a}var K=b,W=Ca;Db();xb=!1}return!a};var Fb,Gb=/(Firefox\D28\D)/g.test(Ja.userAgent),Hb={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Ib={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Ob=function(a,b,d,c){return function(e){e=e||I.event;var f=Xa(e),g=!1;if(3!==e.which||"CLICK"!=a&&"LINK_CLICK"!=a)if(2!==e.which&&(null!=e.which||4!=e.button)||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(f=Za(f,["a","area"]),g=!f||!f.href||Jb(f.href)||e.ctrlKey||e.shiftKey||e.altKey||!0===e.metaKey);var h="FORM_SUBMIT"==a?Ib:Hb;if(e.defaultPrevented||!1===e.returnValue||
e.U&&e.U()){if(f){var m={simulateDefault:!1};if("LINK_CLICK"==a||"FORM_SUBMIT"==a){var p=Kb(h);p&&Lb(a,f,m,h.wt,p)}else d||Lb(a,f,m,c)}}else{if(f){var m={},k=!0;"LINK_CLICK"==a||"FORM_SUBMIT"==a?(k=Lb(a,f,m,h.wt,""))||(Mb(m.eventReport,h)?b=!0:g=!0):k=Lb(a,f,m,c);g=g||k||"LINK_CLICK"==a&&Gb;m.simulateDefault=!k&&b&&!g;m.simulateDefault&&(g=Nb(f,m)||g,!g&&e.preventDefault&&e.preventDefault());e.returnValue=k||!b||g;return e.returnValue}return!0}}}},Lb=function(a,b,d,c,e){var f=c||2E3,g={"gtm.element":b,
"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||Va(b,"id")||"","gtm.elementTarget":b.formTarget||b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=e||"";g.event="gtm.linkClick";g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=Pb(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=Qb(b);g.eventTimeout=f;g.eventCallback=Rb(b,d);g.eventReporter=function(a){d.eventReport=a};break;
case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=b.formAction||b.action||b.href||b.src||b.code||b.codebase||"";break;default:return!0}return S(g)},Qb=function(a){var b=a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},Sb=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},Nb=function(a,b){var d=!1,c=/(iPad|iPhone|iPod)/g.test(Ja.userAgent),e=Sb(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;
f=(e||"_self").substring(1);b.targetWindow=I.frames&&I.frames[f]||I[f];break;case "_blank":c?(b.simulateDefault=!1,d=!0):(b.targetWindowName="gtm_autoEvent_"+G().getTime(),b.targetWindow=I.open("",b.targetWindowName));break;default:c&&!I.frames[e]?(b.simulateDefault=!1,d=!0):(I.frames[e]||(b.targetWindowName=e),b.targetWindow=I.frames[e]||I.open("",e))}return d},Pb=function(a,b,d){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(d=d||G().getTime(),500>G().getTime()-
d&&I.setTimeout(Pb(a,b,d),25)))}},Rb=function(a,b,d){return function(){if(b.simulateDefault)if(b.targetWindow){var c;b.targetWindowName&&(c=a.target,a.target=b.targetWindowName);L.gtmSubmitFormNow=!0;Vb(a).call(a);b.targetWindowName&&(a.target=c)}else d=d||G().getTime(),500>G().getTime()-d&&I.setTimeout(Rb(a,b,d),25)}},Kb=function(a){for(var b=["wnc","nwnc"],d=[],c=0;c<b.length;c++){var e=a[b[c]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&d.push(f)}return d.join(",")},Wb=function(a,b,d,c,e){var f=e;
if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>c)&&(a.wt=c);a[b?d?"wc":"wnc":d?"nwc":"nwnc"][f]=!0},Mb=function(a,b){if(b.wnc["0"]||b.wc["0"])return!0;for(var d=0;d<V.length;d++)if(a.passingRules[d]){var c=V[d],e=Xb[d],f=e&&e[0]&&e[0][0]||e[1]&&e[1][0];if(f&&"0"!=f&&(b.wc[f]||b.wnc[f]))for(var g=c[1],h=0;h<g.length;h++)if(a.resolvedTags[g[h]])return!0}return!1},Yb=function(a,b,d,c,e){var f,g;switch(a){case "CLICK":if(L.gtmHasClickListenerTag)return;L.gtmHasClickListenerTag=!0;f="click";
g=function(a){var b=Xa(a);b&&Lb("CLICK",b,{},c);return!0};break;case "LINK_CLICK":b&&!Fb&&(Fb=hb());Wb(Hb,b||!1,d||!1,c,e);if(L.gtmHasLinkClickListenerTag)return;L.gtmHasLinkClickListenerTag=!0;f="click";g=Ob(a,b||!1,d||!1,c);break;case "FORM_SUBMIT":Wb(Ib,b||!1,d||!1,c,e);if(L.gtmHasFormSubmitListenerTag)return;L.gtmHasFormSubmitListenerTag=!0;f="submit";g=Ob(a,b||!1,d||!1,c);break;default:return}P(L,f,g,!1)},Jb=function(a){if(!Fb)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var d=
kb(a);return Fb==hb(d)},Vb=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;L.gtmFormElementSubmitter||(L.gtmFormElementSubmitter=L.createElement("form"));return L.gtmFormElementSubmitter.submit.call?L.gtmFormElementSubmitter.submit:a.submit};var gc=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},hc=function(a,b){return a<b?-1:a>b?1:0};var ic;e:{var jc=n.navigator;if(jc){var kc=jc.userAgent;if(kc){ic=kc;break e}}ic=""}var lc=function(a){return-1!=ic.indexOf(a)};var mc=lc("Opera")||lc("OPR"),X=lc("Trident")||lc("MSIE"),nc=lc("Gecko")&&-1==ic.toLowerCase().indexOf("webkit")&&!(lc("Trident")||lc("MSIE")),oc=-1!=ic.toLowerCase().indexOf("webkit"),pc=function(){var a=n.document;return a?a.documentMode:void 0},qc=function(){var a="",b;if(mc&&n.opera){var d=n.opera.version;return"function"==aa(d)?d():d}nc?b=/rv\:([^\);]+)(\)|;)/:X?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:oc&&(b=/WebKit\/(\S+)/);if(b)var c=b.exec(ic),a=c?c[1]:"";if(X){var e=pc();if(e>parseFloat(a))return String(e)}return a}(),
rc={},sc=function(a){var b;if(!(b=rc[a])){for(var d=0,c=gc(String(qc)).split("."),e=gc(String(a)).split("."),f=Math.max(c.length,e.length),g=0;0==d&&g<f;g++){var h=c[g]||"",m=e[g]||"",p=RegExp("(\\d*)(\\D*)","g"),k=RegExp("(\\d*)(\\D*)","g");do{var q=p.exec(h)||["","",""],r=k.exec(m)||["","",""];if(0==q[0].length&&0==r[0].length)break;d=hc(0==q[1].length?0:parseInt(q[1],10),0==r[1].length?0:parseInt(r[1],10))||hc(0==q[2].length,0==r[2].length)||hc(q[2],r[2])}while(0==d)}b=rc[a]=0<=d}return b},tc=
n.document,uc=tc&&X?pc()||("CSS1Compat"==tc.compatMode?parseInt(qc,10):5):void 0;var vc;if(!(vc=!nc&&!X)){var wc;if(wc=X)wc=X&&9<=uc;vc=wc}vc||nc&&sc("1.9.1");X&&sc("9");var xc=function(a){xc[" "](a);return a};xc[" "]=function(){};var Cc=function(a,b){var d="";X&&!yc(a)&&(d='<script>document.domain="'+document.domain+'";\x3c/script>'+d);var c="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+d+"</head><body>"+b+"</body></html>";if(zc)a.srcdoc=c;else if(Ac){var e=a.contentWindow.document;e.open("text/html","replace");e.write(c);e.close()}else Bc(a,c)},zc=oc&&"srcdoc"in document.createElement("iframe"),Ac=nc||oc||X&&sc(11),Bc=function(a,b){X&&sc(7)&&!sc(10)&&6>Dc()&&Ec(b)&&(b=Fc(b));var d=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};X&&!yc(a)?Gc(a,d):d()},Dc=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},yc=function(a){try{var b;var d=a.contentWindow;try{var c;if(c=!!d&&null!=d.location.href)t:{try{xc(d.foo);c=!0;break t}catch(e){}c=!1}b=c}catch(f){b=!1}return b}catch(g){return!1}},Hc=0,Gc=function(a,b){var d="goog_rendering_callback"+Hc++;window[d]=b;X&&sc(6)&&!sc(7)?a.src="javascript:'<script>window.onload = function() { document.write(\\'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation()})()<\\\\/script>\\');document.close();};\x3c/script>'":a.src="javascript:'<script>(function() {document.domain = \""+document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation();})()\x3c/script>'"},Ec=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Fc=function(a){for(var b=unescape(encodeURIComponent(a)),d=Math.floor(b.length/2),
c=[],e=0;e<d;++e)c[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(c[d]=b.charAt(b.length-1));return c.join("")};/*
 Copyright (c) 2013 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Kc=function(a,b,d,c){return function(){try{if(0<b.length){var e=b.shift(),f=Kc(a,b,d,c);if("SCRIPT"==e.nodeName&&"text/gtmscript"==e.type){var g=L.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,La(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var m=[];e.firstChild;)m.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Kc(e,m,f,c)()}else a.insertBefore(e,null),f()}else d()}catch(p){R(c)}}};var Mc=function(a,b,d){if(L.body){if(a[""])try{Cc(Ma(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+a["22"]),R(b)}catch(c){R(d)}else a[""]?Lc(a,b,d):Kc(L.body,Ya(a["22"]),b,d)()}else I.setTimeout(function(){Mc(a,b,d)},200)},_html=Mc;_html.a="html";_html.b=["customScripts"];
var _img=function(a,b,d){var c=Ya('<a href="'+a["33"]+'"></a>')[0].href,e=a["3"];if(e)var f=c.charAt(c.length-1),c=c+((0<=c.indexOf("?")?"?"==f||"&"==f?"":"&":"?")+e+"="+a["4"]);l(c,b,d)};_img.a="img";_img.b=["customPixels"];
var Pc,Qc;
var $c=function(a){return function(){}},ad=function(a){return function(){}};
var fd=function(a,b){return function(){ed(a);if(Lb("FORM_SUBMIT",a,b,Ib.wt,"")||!Mb(b.eventReport,Ib))b.simulateDefault=!1,L.gtmSubmitFormNow=!0,Vb(a).call(a),L.gtmSubmitFormNow=!1;else{b.simulateDefault=!0;var d=Sb(a).toLowerCase();switch(d){case "_blank":b.targetWindowName="gtm_autoEvent_"+G().getTime(),b.targetWindow=I.open("",b.targetWindowName);case "":b.targetWindow=I.frames.self;break;case "_parent":case "_self":case "_top":b.targetWindow=I.frames[d.substring(1)];break;default:I.frames[d]||
(b.targetWindowName=d),b.targetWindow=I.frames[d]||I.open("",d)}}}},gd=function(a){return a.action&&a.action.tagName?a.attributes.action.value:a.action},ld=function(a,b){a.action&&a.action.tagName?a.attributes.action.value=b:a.action=b},md=function(a){var b=function(b){b=b||I.event;if(a){var c=a(b);!1===c&&(b.returnValue=!1);return c}return!0};b.gtmOnsubmitWrapper=!0;return b},nd=function(a){(L.gtmForceFormWrappers||Gb)&&a&&a.onsubmit&&!a.onsubmit.gtmOnsubmitWrapper&&(a.onsubmit=md(a.onsubmit))},
od=function(){return function(){var a="undefined"==typeof HTMLFormElement;if(L.gtmSubmitFormNow){L.gtmSubmitFormNow=!1;var b=this.gtmCachedSubmitElement;if(b)try{for(var d=b.id,c=b.name,e=0;e<this.elements.length;e++)"submit"==this.elements[e].type&&(this.elements[e].id||this.elements[e].name)&&(d&&d==this.elements[e].id&&(this.elements[e].gtmOldId=this.elements[e].id,this.elements[e].id="gtm_sub_"+this.elements[e].id),c&&c==this.elements[e].name&&(this.elements[e].gtmOldName=this.elements[e].name,
this.elements[e].name="gtm_sub_"+this.elements[e].name));var f=L.createElement("input");f.type="hidden";f.value=Va(b,"value");d&&(f.id=d);c&&(f.name=c);this.gtmTempHiddenSubmit=f;this.appendChild(f)}catch(g){}a?this.gtmOldFormSubmit.call?this.gtmOldFormSubmit.call(this):this.gtmOldFormSubmit():HTMLFormElement.prototype.gtmOldFormSubmit.call(this);if(this.gtmCachedSubmitElement){try{this.gtmTempHiddenSubmit&&(this.removeChild(this.gtmTempHiddenSubmit),this.gtmTempHiddenSubmit=void 0);for(var h=0;h<
this.elements.length;h++)this.elements[h].gtmOldId&&(this.elements[h].id=this.elements[h].gtmOldId,this.elements[h].gtmOldId=void 0),this.elements[h].gtmOldName&&(this.elements[h].name=this.elements[h].gtmOldName,this.elements[h].gtmOldName=void 0)}catch(m){}this.gtmCachedSubmitElement=void 0}}else{ed(this);this.gtmCachedSubmitElement=void 0;var p={},k=Lb("FORM_SUBMIT",this,p,Ib.wt,"")||!Mb(p.eventReport,Ib)?!0:Nb(this,p);p.simulateDefault=!k;k&&(L.gtmSubmitFormNow=!1,a?this.gtmOldFormSubmit.call?
this.gtmOldFormSubmit.call(this):this.gtmOldFormSubmit():HTMLFormElement.prototype.gtmOldFormSubmit.call(this))}}},pd=function(){L.gtmHasSubmitInputListener||(L.gtmHasSubmitInputListener=!0,P(L,"click",function(a){var b=null,d=Xa(a);if((d=Za(d,["button","input"])||d)&&("submit"==d.type||"image"==d.type)){var c=d.name&&Va(d,"value");if(b=Za(d,["form"]))c&&(b.gtmCachedSubmitElement=d),nd(b);else if(d.form)if(d.form.tagName&&"form"==String(d.form.tagName).toLowerCase())c&&(d.form.gtmCachedSubmitElement=
d),nd(d.form);else for(var e=B(d.form)?d.form:[d.form],f=0;f<e.length;f++)if(b=Wa(e[f]))c&&(b.gtmCachedSubmitElement=d),nd(b)}return!0},!1))},ed=function(a){var b=a||L.gtmFormActionSwapped;if(b){L.gtmFormActionSwapped=void 0;if(b.gtmJSFormActionSet){var d="",c=gd(b);c&&0==c.indexOf("javascript:document.gtmFormActionFunction();//")&&(d=c.substring(46));ld(b,d||b.gtmOldAction);b.gtmJSFormActionSet=void 0}b.gtmOldTarget&&(b.target=b.gtmOldTarget);b.gtmOldAction=void 0;b.gtmOldTarget=void 0}},_fsl=function(a,
b){var d=a["35"],c=a["6"],e=C(a["36"]);0>=e&&(e=2E3);var f=ya(a,"32",""),g=od(),h="undefined"==typeof HTMLFormElement;h||HTMLFormElement.prototype.gtmOldFormSubmit||(HTMLFormElement.prototype.gtmOldFormSubmit=HTMLFormElement.prototype.submit,HTMLFormElement.prototype.submit=g);!d&&L.addEventListener||pd();L.addEventListener||(L.gtmHasFormSubmitListenerTag=!0);Yb("FORM_SUBMIT",d,c,e,String(f));if(!L.addEventListener){if(!L.gtmActionTargetCleanup){L.gtmActionTargetCleanup=
!0;var m=function(){ed()};P(L,"click",m,!1);P(L,"keydown",m,!1)}var p=function(a){a=a||window.event;var b=Xa(a),c={};if(a.defaultPrevented||!1===a.returnValue||a.U&&a.U()){var d=Kb(Ib);d&&(c.simulateDefault=!1,Lb("FORM_SUBMIT",b,c,Ib.wt,d))}else b!==L.gtmFormActionSwapped&&(L.gtmFormActionSwapped=b,L.gtmFormActionFunction=fd(b,c),b.gtmOldAction=gd(b),b.gtmOldTarget=b.target,ld(b,"javascript:document.gtmFormActionFunction();//"+b.gtmOldAction),b.target="",b.gtmJSFormActionSet=!0)};L.gtmForceFormWrappers=
!0;for(var k=L.getElementsByTagName("form"),q=0;q<k.length;q++)if(!k[q].gtmFormSubmitListenerAttached&&(k[q].gtmFormSubmitListenerAttached=!0,P(k[q],"submit",p,!1),h&&!k[q].gtmOldFormSubmit)){k[q].gtmOldFormSubmit=Vb(k[q]);try{k[q].submit=g}catch(r){}k[q].gtmReplacedFormSubmit=g}}R(b)};_fsl.a="fsl";_fsl.b=[];
var qd=!1,rd=!1,_ga=function(a,b,d){function c(a){var b=[].slice.call(arguments,0);b[0]=u+b[0];r.push(b)}function e(b,d){void 0!==a[d]&&c(b,a[d])}function f(b,d){void 0!==a[d]&&c(b,Number(a[d]))}function g(a,b){if(b)for(var d=0;d<b.length;d++){var e=[a];B(b[d])?e.push.apply(e,b[d]):e.push(b[d]);"_setCustomVar"==e[0]&&void 0===e[3]||c.apply(this,e)}}function h(b,d){void 0!==a[d]&&c("_set",b,a[d])}function m(a,b){return void 0===b?b:a(b)}function p(b,c){void 0!==a[c]&&(D+="&"+b+"="+a[c])}function k(a,
b){D+="&"+a+"="+b}function q(a,b){return a.charAt(0)==b?a.substring(1):a}var r=M("_gaq",[],!1),s=!1,u="";void 0==a[""]?u="gtm"+xa++ +".":""!==a[""]&&(u=a[""]+".");e("_setAccount","0");c("_set","gtmid","GTM-KHWBBT");
var D="";
if(""!==D){var x=new qa,Q=q(I.location.search,"?"),w=q(I.location.hash,"#");Q&&sa(x,Q);w&&a[""]&&sa(x,w);x.contains("gclid")&&k("gclid",va(x.get("gclid")));x.contains("gclsrc")&&k("gclsrc",va(x.get("gclsrc")));x.contains("dclid")&&k("dclid",va(x.get("dclid")));c("_set","campaignParams",D)}
a["26"]&&c("_require","inpage_linkid","//www.google-analytics.com/plugins/ga/inpage_linkid.js");g("_setPageGroup",a["9"]);
e("_setCampaignTrack","5");e("_setClientInfo","7");e("_setDetectFlash","15");e("_setDetectTitle",
"16");void 0!==a["20"]&&a["20"]&&(r.push(["_gat._forceSSL"]),s=!!a["20"]);
c("_set","hitCallback",function(){if(y(a[""]))a[""]();b()});if(a["31"]){c("_trackEvent",String(a["18"]),String(a["17"]),m(String,a["19"]),m(C,a[""]),
Boolean(a[""]));}else if(a[""]){}else if(a[""]){}else if(a[""]){}else if(a[""]){}else if(a[""]){}else if(a[""]){}else if(a[""]){}else c("_trackPageview");var ba=function(){I._gat||d()};if(a[""])rd||(rd=!0,O(N("https","http","://stats.g.doubleclick.net/dc.js",s),ba,d));else if(!qd){var ua=a["13"]?".google-analytics.com/u/ga_debug.js":".google-analytics.com/ga.js";
qd=!0;O(N("https://ssl","http://www",ua,s),ba,d)}};_ga.a="ga";_ga.b=["google"];var wd=function(a){var b=I||n,d=b.onerror,c=!1;oc&&!sc("535.3")&&(c=!c);b.onerror=function(b,f,g,h,m){d&&d(b,f,g,h,m);a({message:b,fileName:f,Ca:g,Sa:h,error:m});return c}};var _sp=function(a,b,d){O("//www.googleadservices.com/pagead/conversion_async.js",function(){var c=I.google_trackConversion;y(c)?c({google_conversion_id:a["23"],google_conversion_label:a["25"],google_custom_params:a["10"]||{},google_remarketing_only:!0,onload_callback:b})||d():d()},d)};_sp.a="sp";_sp.b=["google"];var Bd,Cd;
var Z=[],Ld={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Md=function(a){return Ld[a]},Nd=/[\x00\x22\x26\x27\x3c\x3e]/g;var Rd=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,Sd={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b","\f":"\\f",
"\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},Td=function(a){return Sd[a]};
Z[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(Rd,Td)+"'"}};
var ae=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,be={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10","\u0011":"%11","\u0012":"%12","\u0013":"%13",
"\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89",
"\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},ce=function(a){return be[a]};Z[16]=function(a){return a};var ee=function(){this.f=[]};ee.prototype.set=function(a,b){this.f.push([a,b]);return this};ee.prototype.resolve=function(a,b){for(var d={},c=0;c<this.f.length;c++){var e=fe(this.f[c][0],a,b),f=fe(this.f[c][1],a,b);d[e]=f}return d};var ge=function(a){this.index=a};ge.prototype.resolve=function(a,b){var d=zb[this.index];if(d&&!b(d)){var c=d["24"];if(a){if(a.get(c))return;a.set(c,!0)}d=fe(d,a,b);a&&a.set(c,!1);return ra(d)}};
for(var _M=function(a){return new ge(a)},ie=function(a){this.resolve=function(b,d){for(var c=[],e=0;e<a.length;e++)c.push(fe(he[a[e]],b,d));return c.join("")}},_T=function(a){return new ie(arguments)},ke=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=function(d,c){var e=fe(a[0],d,c);if(a[0]instanceof ge&&b(8)&&b(16)){var f="gtm"+xa++;je.set(f,e);return'google_tag_manager["GTM-KHWBBT"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Z[a[g]](e);return e}},_E=function(a,b){return new ke(arguments)},Cb=function(a,b){return fe(a,new qa,b)},fe=function(a,b,d){var c=a;if(a instanceof ge||a instanceof
ee||a instanceof ie||a instanceof ke)return a.resolve(b,d);if(B(a))for(var c=[],e=0;e<a.length;e++)c[e]=fe(a[e],b,d);else if(a&&"object"==typeof a){var c={},f;for(f in a)a.hasOwnProperty(f)&&(c[f]=fe(a[f],b,d))}return c},le=function(a,b){var d=b[a],c=d;if(d instanceof ge||d instanceof ke||d instanceof ie)c=d;else if(B(d))for(var c=[],e=0;e<d.length;e++)c[e]=le(d[e],b);else if("object"==typeof d){var c=new ee,f;for(f in d)d.hasOwnProperty(f)&&c.set(b[f],le(d[f],b))}return c},$=function(a,b){for(var d=
b?b.split(","):[],c=0;c<d.length;c++){var e=d[c]=d[c].split(":");0==a&&(e[1]=he[e[1]]);if(1==a)for(var f=me(e[0]),e=d[c]={},g=0;g<f.length;g++){var h=ne[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=me(e[g]);3==a&&(d[c]=he[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var m=0;m<e[g].length;m++)e[g][m]=he[e[g][m]]}else e[g]=[];5==a&&(d[c]=e[0])}return d},me=function(a){var b=[];if(!a)return b;for(var d=0,c=0;c<a.length&&d<oe;d+=6,c++){var e=a&&a.charCodeAt(c)||65;if(65!=e){var f=
0,f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+52:62;1&f&&b.push(d);2&f&&b.push(d+1);4&f&&b.push(d+2);8&f&&b.push(d+3);16&f&&b.push(d+4);32&f&&b.push(d+5)}}return b},oe=142,pe=[_cn,_e,'event',_M(0),'gtm.load','',_ga,'Google Analytics','UA-26573244-1',false,[],true,1,_v,'element id','gtm.elementId',_M(1),'twitter-referral-share',_eq,'gtm.linkClick','Google Analytics Referral Share Twitter Clicked','Twitter Share','Referrals',7,'pay-pal-conversion','credit-card-conversion','Google Analytics Activation Event','data layer conversion type','conversionType',2,_M(2),'Conversion','data layer conversion environment','conversionEnvironment','production',_M(3),8,'hide-referral-notification','Google Analytics Referral link hidden','Hide referral notification',5,'open-referral-settings','Google Analytics Referral link clicked internal','Click referral notification',6,_u,'url path','path',_M(4),'registrations/new','_event',_M(5),'gtm.js','Google Analytics Registration Event','Registration','Signup',3,'pageType',_M(6),'registration',_fsl,'Form Submit Tag','0','2000',4,_img,'Twitter - Activated User','//','analytics.twitter.com/i/adsct?txn_id\x3dl47ka\x26p_id\x3dTwitter',_T(67,68),'gtmcb',_r,'_random',_M(7),16,_awct,'AdWords Activation Event','1010666955','m4TPCP2NtQIQy5v24QM','1',18,'Twitter - Any Webpage Hit','analytics.twitter.com/i/adsct?txn_id\x3dl4etp\x26p_id\x3dTwitter',_T(67,82),17,_asp,'AdRoll Smart Pixel','S4BPDI4QWNB57PEKEZSLIP','4IDGVTPEAFC4TM2QKYNQ53',{},20,_html,'AdRoll Custom Global Tag','\x3cscript type\x3d\x22text/gtmscript\x22\x3eadroll_custom_data\x3d{user_id:','user_id',_E(_M(8),8,16),',article_tag:','article_tag','article_tags',_E(_M(9),8,16),',tutorial_difficulty:','tutorial_difficulty','difficulty',_E(_M(10),8,16),',content_type:','content_type',_E(_M(11),8,16),',author:','author',_E(_M(12),8,16),',is_community_page:','is_community_page',_E(_M(13),8,16),'};\x3c/script\x3e',_T(93,95,96,99,100,103,104,106,107,109,110,112,113),19,_sp,'AdWords Remarketing Global',_M(8),_M(10),_M(12),_M(9),_M(11),_M(13),{94:118,101:119,108:120,97:121,105:122,111:123},21,'url','url hostname','host','element target','gtm.elementTarget',_et,'element text','element classes','gtm.elementClasses','element','gtm.element',_f,'referrer','history change source','gtm.historyChangeSource','history old state','gtm.oldHistoryState','history new url fragment','gtm.newUrlFragment','element url','gtm.elementUrl','history new state','gtm.newHistoryState','history old url fragment','gtm.oldUrlFragment'],qe=[],re=0;re<pe.length;re++)qe[re]=le(re,pe);var he=qe,ne=$(0,"21:0,21:1,24:2,1:3,2:4,21:6,24:7,0:8,26:9,9:10,5:11,7:11,15:11,16:11,29:11,13:9,20:9,30:12,21:13,24:14,27:15,1:16,2:17,21:18,2:19,24:20,31:11,17:21,18:22,30:23,2:24,2:25,24:26,24:27,27:28,12:29,17:30,18:31,24:32,27:33,14:34,19:35,30:36,2:37,24:38,17:39,30:40,2:41,24:42,17:43,30:44,21:45,24:46,8:47,1:48,2:49,24:50,1:51,2:52,24:53,17:54,18:55,30:56,24:57,27:57,1:58,2:59,21:60,24:61,35:11,6:11,32:62,36:63,30:64,21:65,24:66,33:69,3:70,21:71,24:72,4:73,30:74,21:75,24:76,23:77,25:78,34:79,30:80,24:81,33:83,30:84,21:85,24:86,11:87,28:88,10:89,30:90,21:91,24:92,24:94,27:94,24:97,27:98,24:101,27:102,24:105,27:105,24:108,27:108,24:111,27:111,22:114,30:115,21:116,24:117,10:124,30:125,24:126,24:127,8:128,24:129,27:130,21:131,24:132,24:133,27:134,24:135,27:136,21:137,24:138,24:139,27:140,24:141,27:142,24:143,27:144,24:145,27:146,24:147,27:148,24:149,27:150"),zb=$(1,"G,AAAH,AAABA4,AAABAgc,AAAAAAAA4,CAAAAAAAAE,AAABAgAAAAY,AAAAAAAAAAAAAD,AAABAgAAAAAAAAAAY,AAABAgAAAAAAAAAAgB,AAABAgAAAAAAAAAAAG,AAABAgAAAAAAAAAAAY,AAABAgAAAAAAAAAAAgB,AAABAgAAAAAAAAAAAAG,AAAAAAAAIAAAAAAAAAAI,AAAAAAAAIAAAAAAAAAAw,AAABAAAAAAAAAAAAAAAAD,AAAAAAAAAAAAAAAAAAAAM,AAABAAAAAAAAAAAAAAAAw,AAABAAAAAAAAAAAAAAAAAD,AAAAAAAAAAAAAAAAAAAAAM,AAABAAAAAAAAAAAAAAAAAw,AAABAAAAAAAAAAAAAAAAAAD,AAABAAAAAAAAAAAAAAAAAAM,AAABAAAAAAAAAAAAAAAAAAw,AAABAAAAAAAAAAAAAAAAAAAD,AAABAAAAAAAAAAAAAAAAAAAM"),je=new qa,se=$(1,"Z,BAAY,IAAgB,IAAgAB,IAAgAC,AAAoAAAC,AAAoAAAg,BAAAAAAAAD,AAAgAAAAAY,BAAAAAAAAAgB"),Y=$(1,"g__,g-fA-,g-fAEEjB,g-fAUAAc,g-fAUAAAH,g-fAEAAAAgH,AAAAAAAAAAA-D,AAAAAAAAAAAA8M,AAAAAAAAAAAAAwP,AAAAAAAAAAAAkEwB,AAAAAAAAAAAAAAA-B,AAAAAAAAAAAAAAAAGAY,AAAAAAAAAAAAAABAAAgH"),V=$(2,"B:B4B::,G:C::,I:EG::,Q:EG::,k:I::,EB:Q::,AG:g::,AM:AB::"),Xb=$(4,"5.5.5.5.5:,5:,5.5.5:,5.5.5:,5:,5:,5:,5:");var Db=function(){};var De=function(){var a=this;this.v=!1;this.B=[];this.O=[];this.F=function(){a.v||wa(a.B);a.v=!0};this.G=function(){a.v||wa(a.O);a.v=!0};this.j=ja},Ee=function(){this.k=[];this.Z={};this.P=[];this.p=0};Ee.prototype.addListener=function(a){this.P.push(a)};var Fe=function(a,b,d,c){if(!d.v){a.k[b]=d;void 0!==c&&(a.Z[b]=c);a.p++;var e=function(){0<a.p&&a.p--;0<a.p||wa(a.P)};d.B.push(e);d.O.push(e)}};var Ge=function(){var a=[];return function(b,d){if(void 0===a[b]){var c=se[b]&&Cb(se[b],d);a[b]=[c&&ra(c),c]}return a[b]}},He=function(a,b){for(var d=b[0],c=0;c<d.length;c++)if(!a.d(d[c],a.c)[0])return!1;for(var e=b[2],c=0;c<e.length;c++)if(a.d(e[c],a.c)[0])return!1;return!0},Ie=function(a,b){return function(){a["37"]=b.F;a["38"]=b.G;ra(a,b.F,b.G)}},vb=function(a,b,d){H("tagTypeBlacklist");for(var c={name:a,C:b||ja,r:me(),s:me(),d:Ge(),c:Ia()},e=[],f=0;f<V.length;f++)if(He(c,
V[f])){e[f]=!0;for(var g=c,h=V[f],m=h[1],p=0;p<m.length;p++)g.r[m[p]]=!0;for(var k=h[3],p=0;p<k.length;p++)g.s[k[p]]=!0}else e[f]=!1;var q=[];for(var r=0;r<oe;r++)if(c.r[r]&&!c.s[r])if(c.c(Y[r])){}else{q[r]=Cb(Y[r],c.c);}c.t=
q;for(var s=new Ee,u=0;u<oe;u++)if(c.r[u]&&!c.s[u]&&!c.c(Y[u])){var D=c.t[u],x=new De;x.B.push($c(D));x.O.push(ad(D));x.j=Ie(D,x);Fe(s,u,x,D[""])}s.addListener(c.C);for(var Q=[],w=0;w<s.k.length;w++){var J=s.k[w];if(J){var E=s.Z[w];void 0!==E?E!=w&&s.k[E]&&s.k[E].B.push(J.j):Q.push(w)}}for(w=0;w<Q.length;w++)s.k[Q[w]].j();0<s.p||wa(s.P);d&&y(d)&&d({passingRules:e,resolvedTags:c.t});return 0<c.t.length};var Je={macro:function(a){if(je.contains(a))return je.get(a)}};Je.dataLayer=Ea;Je.Ea=function(){var a=I.google_tag_manager;a||(a=I.google_tag_manager={});a["GTM-KHWBBT"]||(a["GTM-KHWBBT"]=Je)};Je.Ea();
(function(){var a=M("dataLayer",[],!1),b=M("google_tag_manager",{},!1),b=b["dataLayer"]=b["dataLayer"]||{};Ra.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});ab.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var d=a.push;a.push=function(){var b=[].slice.call(arguments,0);d.apply(a,b);for(wb.push.apply(wb,b);300<this.length;)this.shift();return Eb()};wb.push.apply(wb,a.slice(0));R(Eb)})();
if("interactive"==L.readyState&&!L.createEventObject||"complete"==L.readyState)Sa();else{P(L,"DOMContentLoaded",Sa);P(L,"readystatechange",Sa);if(L.createEventObject&&L.documentElement.doScroll){var Ke=!0;try{Ke=!I.frameElement}catch(Me){}Ke&&Ua()}P(I,"load",Sa)}"complete"===L.readyState?bb():P(I,"load",bb);
(function(a){})("async");var _vs="res_ts:1413582070483000,srv_cl:78416915,ds:live,cv:17";
})()
