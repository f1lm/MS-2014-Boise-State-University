var DW={doXpath:!!document.evaluate,internalSiteRe:/(^|\.)(3qit\.com|atlarge\.com|bnet\.com|builderau\.com\.au|businessmobile\.fr|buying\.com|chow\.com|chowhound\.com|cnetasia\.com|cnet\.com|cnet\.com\.au|cnet\.co\.uk|cnet\.de|cnetdirect\.com|cnetfrance\.fr|cnetnetworks\.com|cnetnews\.com\.cn|cnettv\.com|cnettv\.co\.uk|cnettv\.fr|com\.com|cweek\.com\.cn|download\.com|dw\.com|ea3w\.com|fengniao\.com|filmspot\.com|findarticles\.com|gamecenter\.com|gamefaqs\.com|gamekult\.com|gamerankings\.com|gamespot\.be|gamespot\.co\.kr|gamespot\.com|gamespot\.com\.au|gamespot\.com\.cn|gamespot\.co\.uk|gamespot\.nl|goosto\.fr|help\.com|iphoneatlas\.com|macfixit\.com|macfixitforums\.com|mp3\.com|mysimon\.com|news\.com|news\.fr|notebookshopper\.com|notebookshopper\.dw\.com|onlylady\.com\.cn|pchome\.net|search\.com|silicon\.com|silicon\.de|smartplanet\.com|smartshop\.com|spn\.com\.cn|sportsgamer\.com|techrepublic\.com|techtracker\.com|tv\.com|upload\.com|urbanbaby\.com|versiontracker\.com|webware\.com|xcar\.com\.cn|xiyuit\.com|zdnetasia\.com|zdnet\.be|zdnet\.co\.kr|zdnet\.com|zdnet\.com\.au|zdnet\.com\.cn|zdnet\.com\.tw|zdnet\.co\.uk|zdnet\.de|zdnet\.fr|zdnetindia\.com|zdnet\.nl|zol\.com\.cn|audioscrobbler\.net|cbsaudiencenetwork\.com|cbs\.com|cbsdigitalmedia\.com|cbseyemobile\.com|cbsgames\.com|cbsiphone\.qwapi\.com|cbsmobile\.com|cbsnews\.com|cbsrecords\.com|cbssports\.com|cbssportsstore\.com|cbsstore\.com|cwtv\.com|etonline\.com|kewlopolis\.com|last\.fm|lastfm\.com\.br|lastfm\.com\.tr|lastfm\.de|lastfm\.es|lastfm\.fr|lastfm\.it|lastfm\.jp|lastfm\.pl|lastfm\.ru|lastfm\.se|lastfm\.spiegel\.de|maxpreps\.com|moblogic\.tv|ncaa\.com|ncaasports\.com|ourchart\.com|radio\.aol\.co\.uk|radio\.aol\.de|radio\.aol\.fr|sho\.com|sportsline\.com|startrek\.com|theinsider\.com|theshowbuzz\.com|uwire\.com|wallstrip\.com|cbsinteractive\.com|clicker\.com)$/,
hrefHasHostname:/^([a-z][a-z0-9+.-]*:)?\/\/[^/]/i,tagDelim:";",tagLevels:2,defaultTag:"untagged",tag:"",longNvpNames:{xref:1,xreq:1,srcurl:1,title:1,targeturl:1},clearCalled:0,trackClicksCalled:0,tagComscore:1,tagNielsen:1,tagYahoo:1,detectYahoo:1,ldc_name:"LDCLGFbrowser",ldc_expires:3650,ldc_path:"/",ldc_domain:"",ldc_secure:"",anonc_svcpath:"/anonc.js",anonc_name:"XCLGFbrowser",anonc_expires:3650,anonc_path:"/",anonc_domain:"",anonc_global_domain:".com.com",anonc_secure:"",clear:function(a){a=this.mergeParams(this.pageParams,
a);a.ts=(new Date).getTime();a.sid||(a.sid=a.siteid,delete a.siteid);window.location.host&&(a.ld||(a.ld=window.location.host),a.clgf||(a.clgf=this.getCookie("XCLGFbrowser")),a.globid||(a.globid=this.getCookie("globid")),a.ldc||(a.ldc=this.getLocalDomainCookie()));if(!a.xref&&document.referrer){var c=this.parseReferrerUrl(document.referrer),b;for(b in c)a[b]||(a[b]=c[b])}if(this.regSilo&&(c=this.getCookie("purs_"+this.regSilo)))for(b in c=this.parseUrsCookie(c),c)a[b]||(a[b]=c[b]);a.oid=this.buildOid(a);
a.brflv=this.getFlashVer();a.brwinsz=this.getWindowSize();a.brscrsz=this.getScreenSize();a.brlang=this.getSystemLang();a.srcurl||(a.srcurl=document.location);!a.title&&document.title&&(a.title=document.title);this.tcset||(a.tcset="utf8");0!=DW.hasTagParam(document.location)||a.tag||(a.tag=DW.getCookie("dw-tag"),this.tag=a.tag);a.im="dwjs";b=new Image(1,1);b.onload=function(){DW.dwVoid()};b.src=this.buildUrl(this.clearPath,this.toQueryString(a));this.tagComscore&&this.comScore.beacon(this.comScore.params);
this.tagNielsen&&this.nielsen.beacon();this.detectYahoo&&DW.detectYahooModules();this.tagYahoo&&this.yahoo.beacon(this.yahoo.params);DW.setCookie("dw-tag","",-1,"/",this.ldc_domain,0);DW.setCookie("dw-tag","",-1,"/","",0);this.clearCalled=1},beacon:function(a,c){var b="",b=c?c:this.clearPath,d=new Image(1,1);d.onload=function(){DW.dwVoid()};d.src=this.buildUrl(b,this.toQueryString(a))},redir:function(a){a=this.mergeParams(this.pageParams,a);a.ts=(new Date).getTime();a.desturl="http://cn.cbsimg.net/cnwk.1d/b.gif";
a.srcurl||(a.srcurl=document.location);!a.title&&document.title&&(a.title=document.title);this.tcset||(a.tcset="utf8");a.im="dwjs";(new Image(1,1)).src=this.buildUrl(this.redirPath,this.toQueryString(a))},levt:function(a,c,b){b=this.mergeParams(this.pageParams,b);b.ts=(new Date).getTime();b.srcurl||(b.srcurl=document.location);!b.title&&document.title&&(b.title=document.title);this.tcset||(b.tcset="utf8");b.viewguid&&(b.v16=b.viewguid);b.topicguid&&(b.v17=b.topicguid);b.topicbrcrm&&(b.v18=b.topicbrcrm);
b.pagetype&&(b.v19=b.pagetype);b.assetguid&&(b.v20=b.assetguid);b.omnicookie&&(b.v21=b.omnicookie);b.rsid&&(b.v23=b.rsid);b.ednm&&(b.v24=b.ednm);b.im="dwjs";this.levtCatPath="/levt/"+a+"/e.gif";b.event=c;(new Image(1,1)).src=this.buildUrl(this.levtCatPath,this.toQueryString(b))},beacon:function(a,c){var b="",b=c?c:this.clearPath,d=new Image(1,1);d.onload=function(){DW.dwVoid()};d.src=this.buildUrl(b,this.toQueryString(a))},levtCS:function(a,c,b){b=this.mergeParams(this.pageParams,b);b.ts=(new Date).getTime();
b.srcurl||(b.srcurl=document.location);!b.title&&document.title&&(b.title=document.title);this.tcset||(b.tcset="utf8");b.viewguid&&(b.v16=b.viewguid);b.topicguid&&(b.v17=b.topicguid);b.topicbrcrm&&(b.v18=b.topicbrcrm);b.pagetype&&(b.v19=b.pagetype);b.assetguid&&(b.v20=b.assetguid);b.omnicookie&&(b.v21=b.omnicookie);b.rsid&&(b.v23=b.rsid);b.ednm&&(b.v24=b.ednm);b.im="dsjs";this.levtCatPath="/levt/"+a+"/e.gif";b.event=c;b.clgf?this.beacon(b,this.levtCatPath):(b.clgf=this.getCookie(this.anonc_name),
b.clgf?this.beacon(b,this.levtCatPath):this.callAnonCookieServiceAsync(b,this.levtCatPath))},callAnonCookieServiceAsync:function(a,c){var b=document.getElementsByTagName("head")[0],d=document.createElement("script");d.type="text/javascript";d.src=this.protocol+"//"+this.host+this.anonc_svcpath;d.onload=function(){window.DW.data=dw_anonc();window.DW.data&&window.DW.setCookie(window.DW.anonc_name,window.DW.data.id,window.DW.anonc_expires,window.DW.anonc_path,window.DW.anoc_domain,!1);a.clgf=window.DW.getCookie(window.DW.anonc_name);
window.DW.beacon(a,c)};b.appendChild(d)},mergeParams:function(){for(var a={},c=0;c<arguments.length;c++){var b=arguments[c],d;for(d in b)b.hasOwnProperty&&b.hasOwnProperty(d)&&(a[d.toLowerCase()]=b[d])}return a},toQueryString:function(a){var c=[],b=[],d=null,e;for(e in a)(d=a[e])&&(e.toLowerCase()in this.longNvpNames?b.push(e+"="+encodeURIComponent(d)):c.push(e+"="+encodeURIComponent(d)));return c.concat(b).join("&")},buildUrl:function(a,c){return this.protocol+"//"+this.host+a+"?"+c},buildOid:function(a){if(!a.oid&&
a.ptid&&a.onid&&(a.sid||a.siteid)){var c=a.ptid+"-"+a.onid+"_"+(a.sid||a.siteid)+"-"+(a.asid||a.contid||a.pid||"0");a.pgnbr&&(c+="-"+a.pgnbr);return c}if(a.oid)return a.oid},parseReferrerUrl:function(a){var c=a.indexOf("?"),b={};-1!=c?(b.xref=a.substring(0,c),b.xrq=a.substring(c+1)):b.xref=a;return b},getCookie:function(a){var c=document.cookie.indexOf(a+"="),b=c+a.length+1;if(!c&&a!=document.cookie.substring(0,a.length)||-1==c)return null;a=document.cookie.indexOf(";",b);-1==a&&(a=document.cookie.length);
return unescape(document.cookie.substring(b,a))},setCookie:function(a,c,b,d,e,f){var g=new Date;g.setTime(g.getTime());b&&(b*=864E5);g=new Date(g.getTime()+b);document.cookie=a+"="+escape(c)+(b?";expires="+g.toGMTString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")},getLocalDomainCookie:function(){var a=this.getCookie(this.ldc_name);a||(this.setCookie(this.ldc_name,this.generateLDUUID(),this.ldc_expires,this.ldc_path,this.ldc_domain,this.ldc_secure),a=this.getCookie(this.ldc_name));
return a?a:""},generateLDUUID:function(){return this.UUID.generate()},parseUrsCookie:function(a){var c=a.split("!",4);a={};c[0]&&(a.ursuid=c[0].substring(40));c[1]&&(c=parseInt(c[1],16),isNaN(c)||0==(c&512)||(a.ursclc=1));return a},trackClicks:function(a){this.addEvent(document.body,"click",function(c){DW.click(c,a||DW.defaultClickHandler)},!1);this.trackClicksCalled=1},defaultClickHandler:function(a){var c=DW.getEventTarget(a),b=DW.getLinkObject(c);if(!(null==b||DW.ignoreClick(b)||DW.isInternalLink(b)&&
DW.hasTagParam(b))){var d=DW.buildTag(c);DW.isInternalLink(b)?DW.addTag(b,d):DW.trackClickInBackground(b,d,c.nodeName,a.type)}},altClickHandler:function(a){var c=DW.getEventTarget(a),b=DW.getLinkObject(c);if(null!=b&&!DW.ignoreClick(b)){var d=DW.getTag(b)||DW.buildTag(c);DW.trackClickInBackground(b,d,c.nodeName,a.type)}},noTagClickHandler:function(a){var c=DW.getEventTarget(a),b=DW.getLinkObject(c);if(!(null==b||DW.ignoreClick(b)||DW.isInternalLink(b)&&DW.hasTagParam(b))){var d=DW.buildTag(c);DW.setCookie("dw-tag",
d,"","/",DW.ldc_domain,0);DW.isInternalLink(b)||DW.trackClickInBackground(b,d,c.nodeName,a.type)}},addEvent:function(a,c,b,d){if(a.addEventListener)return a.addEventListener(c,b,d),!0;if(a.attachEvent)return a.attachEvent("on"+c,b);a["on"+c]=b},click:function(a,c){a||(a=window.event);c(a)},getEventTarget:function(a){return a.target||a.srcElement},getLinkObject:function(a){if(this.doXpath){if(a=document.evaluate("(ancestor-or-self::*[@href])[last()]",a,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),
0<a.snapshotLength&&a.snapshotItem(a.snapshotLength-1))return a.snapshotItem(a.snapshotLength-1)}else for(var c=0;5>c&&a&&"body"!=a.nodeName.toLowerCase();c++,a=a.parentNode)if(a.getAttribute("href",2))return a;return null},getTag:function(a){return(a=a.search.match(/(\?|&)tag=([^&]+)/))?a[2]:null},getOptions:function(a){if(a=a.getAttribute("dw"))try{return this.parseJson(a)||{}}catch(c){}return{}},buildTag:function(a){return this.doXpath?this.buildTagXpath(a):this.buildTagCrawl(a)},buildTagXpath:function(a){if(this.doXpath){for(var c=
[],b=document.evaluate("(ancestor-or-self::*[@section])[position() > last() - "+this.tagLevels+"]",a,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<b.snapshotLength&&d<this.tagLevels;d++)c.push(b.snapshotItem(d).getAttribute("section"));if(0<c.length)return c.join(this.tagDelim);b=document.evaluate('(ancestor-or-self::*[contains(@class,"section") and @id])[position() > last() - '+this.tagLevels+"]",a,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(d=0;d<b.snapshotLength&&d<this.tagLevels;d++)c.push(b.snapshotItem(d).id);
if(0<c.length)return c.join(this.tagDelim);b=document.evaluate("(ancestor-or-self::*[@id])[position() > last() - "+this.tagLevels+"]",a,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(d=0;d<b.snapshotLength&&d<this.tagLevels;d++)c.push(b.snapshotItem(d).id);if(0<c.length)return c.join(this.tagDelim)}return this.defaultTag},buildTagCrawl:function(a){for(var c=[],b=[],d=[],e=0;500>e&&a&&"BODY"!=a.nodeName.toUpperCase();e++,a=a.parentNode){a.getAttribute("section")&&c.length<this.tagLevels&&c.push(a.getAttribute("section"));
if(c.length==this.tagLevels)return c.reverse().join(this.tagDelim);this.hasClass(a,"section")&&a.id&&b.length<this.tagLevels&&b.push(a.id);a.id&&d.length<this.tagLevels&&d.push(a.id)}return 0<c.length?c.reverse().join(this.tagDelim):0<b.length?b.reverse().join(this.tagDelim):0<d.length?d.reverse().join(this.tagDelim):this.defaultTag},addTag:function(a,c){if(!this.hasTagParam(a)&&null!=a&&null!=c){var b=a.getAttribute("href",2).split("#");0>b[0].indexOf("?")&&(b[0]+="?");b[0]+=(/[?&]$/.test(b[0])?
"":"&")+"tag="+c;a.href=b.join("#")}},trackClickInBackground:function(a,c,b,d){var e=this.getOptions(a);e.targetUrl=a.href;e.ctype="evnt;elem;dest";e.cval=(d||"")+";"+b+";"+a.href;e.tag=c;this.redir(e)},hasClass:function(a,c){for(var b=a.className.split(/\s+/),d=0;d<b.length;d++)if(b[d]==c)return!0;return!1},hasTagParam:function(a){return null!=this.getTag(a)},ignoreClick:function(a){if(a){a=a.getAttribute("href",2);if("#"==a.charAt(0)||a.match(/^javascript/)||a.match(/^mailto/))return!0;if(this.ignoreDomains)for(var c=
0;c<this.ignoreDomains.length;c++)if(a.match(this.ignoreDomains[c]))return!0;return!1}return!0},isInternalLink:function(a){var c=a.host.split(":")[0];return!this.hrefHasHostname.test(a.getAttribute("href",2))||this.internalSiteRe.test(c)},parseJson:function(a){if(/^[\],:{}\s\w]*$/.test(a.replace(/\\./g,"@").replace(/['"][^'"\\\n\r]*['"]|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return eval("("+a+")")},dwVoid:function(){},ocp:{paramNames:{epartner:1,
cpnmodule:1,refdomain:1},paramValues:{},trackImp:function(a){this.trackEvent(DW.mergeParams({event:"load"},a))},trackEvent:function(a){a=DW.mergeParams(this.parseParams(window.location.href),a);var c=[],b=[];if(!a.ctype&&(a.cpn||a.cpnmodule)&&a.event){c.push("cpn");b.push(a.cpn||a.cpnmodule);a.cpn&&delete a.cpn;c.push("evt");b.push(a.event);delete a.event;if(a.source||a.target)c.push("src"),b.push(a.source||""),a.source&&delete a.source;a.target&&(c.push("id"),b.push(a.target),delete a.target);a.ctype=
c.join(";");a.cval=b.join(";")}DW.redir(a)},trackClicks:function(a){DW.trackClicks(a||DW.ocp.clickHandler)},parseParams:function(a){if(this.paramValues.cpnmodule&&this.paramValues.epartner&&this.paramValues.refdomain)return this.paramValues;var c={};if(-1!=a.indexOf("?")){a=a.split("?")[1].split("&");for(var b=0;b<a.length;b++){var d=a[b].split("=");d[0]in this.paramNames&&null!=d[1]&&""!=d[1]&&(c[d[0]]=d[1])}}c.cpnmodule&&c.epartner&&c.refdomain&&(this.paramValues=c);return c},clickHandler:function(a){var c=
DW.getEventTarget(a),b=DW.getLinkObject(c);if(null!=b&&!DW.ignoreClick(b)){var d=DW.getTag(b)||DW.buildTag(c);DW.ocp.trackEvent({event:a.type||"click",source:c.nodeName,target:b.href,tag:d,targetUrl:b.href})}}},getFlashVer:function(){var a="",c=-1!=navigator.appVersion.indexOf("MSIE")?!0:!1,b=-1!=navigator.appVersion.toLowerCase().indexOf("win")?!0:!1,d=-1!=navigator.userAgent.indexOf("Opera")?!0:!1;if(null!=navigator.plugins&&0<navigator.plugins.length){if(navigator.plugins["Shockwave Flash 2.0"]||
navigator.plugins["Shockwave Flash"])a=navigator.plugins["Shockwave Flash"+(navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"")].description.split(" "),b=a[2].split("."),c=b[0],b=b[1],d=a[3],""==d&&(d=a[4]),"d"==d[0]?d=d.substring(1):"r"==d[0]&&(d=d.substring(1),0<d.indexOf("d")&&(d=d.substring(0,d.indexOf("d")))),a=c+"."+b+"."+d}else if(-1!=navigator.userAgent.toLowerCase().indexOf("webtv/2.6"))a=4;else if(-1!=navigator.userAgent.toLowerCase().indexOf("webtv/2.5"))a=3;else if(-1!=navigator.userAgent.toLowerCase().indexOf("webtv"))a=
2;else if(c&&b&&!d){var e,f;try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),e=f.GetVariable("$version")}catch(g){}if(!e)try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),e="WIN 6,0,21,0",f.AllowScriptAccess="always",e=f.GetVariable("$version")}catch(l){}if(!e)try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),e=f.GetVariable("$version")}catch(h){}if(!e)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),e="WIN 3,0,18,0"}catch(k){}if(!e)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
e="WIN 2,0,0,11"}catch(m){e=-1}-1!=e?(e=e.split(" ")[1].split(","),e=e[0]+"."+e[1]+"."+e[2]):e="";a=e}return a},getWindowSize:function(){var a=-1,c=-1;"number"==typeof window.innerWidth?(a=window.innerWidth,c=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(a=document.documentElement.clientWidth,c=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(a=document.body.clientWidth,
c=document.body.clientHeight);return a+"x"+c},getScreenSize:function(){return screen?screen.width+"x"+screen.height:""},getSystemLang:function(){return navigator.userLanguage?navigator.userLanguage:navigator.language?navigator.language:navigator.browserLanguage?navigator.browserLanguage:""},protocol:"http:"};"https:"==window.location.protocol&&(DW.protocol="https:");DW.UUID=function(){};
DW.UUID.generate=function(){var a=DW.UUID._getRandomInt,c=DW.UUID._hexAligner;return c(a(32),8)+"-"+c(a(16),4)+"-"+c(16384|a(12),4)+"-"+c(32768|a(14),4)+"-"+c(a(48),12)};DW.UUID._getRandomInt=function(a){return 0>a?NaN:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):NaN};DW.UUID._getIntAligner=function(a){return function(c,b){for(var d=c.toString(a),e=b-d.length,f="0";0<e;e>>>=1,f+=f)e&1&&(d=f+d);return d}};DW.UUID._hexAligner=DW.UUID._getIntAligner(16);
DW.comScore={params:{c1:2,c2:3000023,c3:"",c4:"",c5:"",c6:"",c15:""},beacon:function(a){if(a){var c=document,b=c.location,d=function(a){return null==a?"":(encodeURIComponent||escape)(a)};a=["https:"==b.protocol?"https://sb":"http://b",".scorecardresearch.com/b?c1=",d(a.c1),"&c2=",d(a.c2),"&rn=",Math.random(),"&c7=",d(b.href),"&c3=",d(a.c3),"&c4=",d(a.c4),"&c5=",d(a.c5),"&c6=",d(a.c6),"&c15=",d(a.c15),"&c16=",d(a.c16),"&c8=",d(c.title),"&c9=",d(c.referrer),"&cv=1.6"].join("");a=1500<a.length?a.substr(0,
1495)+"&ct=1":a;c=new Image;c.onload=function(){};return c.src=a}}};DW.nielsen={beacon:function(){var a=new Image(1,1);a.onerror=a.onload=function(){a.onerror=a.onload=null};a.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-304254h&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=compact&rnd=",(new Date).getTime()].join("")}};
DW.yahoo={params:{yadid:"567b43b9-9702-3255-a87e-c0178e2e467f",insertdiv:1,insertjs:1,"class":"YAD-INSTR",style:"display:none !important"},beacon:function(a){if(a){if(a.insertdiv&&!document.querySelector("."+a["class"])){var c=document.createElement("div");c.className=a["class"];c.setAttribute("style",a.style);document.body.appendChild(c)}"function"!=typeof window.yad&&1==a.insertjs&&function(a,c,e,f,g,l){a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push([arguments,+new Date])});g=c.createElement(e);
l=c.getElementsByTagName(e)[0];g.src="https://s.yimg.com/uq/syndication/yad.js";g.async=!0;l.parentNode.insertBefore(g,l)}(window,document,"script","yad");yad(a.yadid,{element:document.querySelector("."+a["class"])})}}};
DW.detectYahooReccomends=function(){for(var a=document.getElementsByTagName("div"),c=/(YAD)/i,b=/YAD-INSTR/,d,e,f=[],g=0,l=a.length;g<l;g+=1)d=a[g],(e=c.exec(d.className))&&0<e.length&&(b.test(d.className)||f.push(d));0<f.length&&DW.levt("ria","log",{mapp:"yahoo_module",comptyp:"recommend",comp:f[0]&&f[0].className,riaevent:"pageview",objtyp:"",objnm:"",s6:document.location,s7:f[0]&&f[0].className,s8:f[1]&&f[1].className,s9:f[2]&&f[2].className,i1:f.length});return f};
DW.detectYahooSearch=function(){if("undefined"!=typeof window.YHS){var a=YHS.debug&&YHS.debug.params;DW.levt("ria","log",{mapp:"yahoo_module",comptyp:"search",comp:a&&a.dom_id,riaevent:"view",objtyp:"",objnm:"",s6:document.location,s7:a&&a.hsimp,s8:a&&a.hspart,s9:a&&a.market})}};
DW.detectYahooD2S=function(){var a="",c="",b="",d="",e="",f="",g="",l=0,h=[];if("undefined"!=typeof window.netseer_tag_id&&null!=window.netseer_tag_id)a=window.netseer_tag_id,c=window.netseer_task,b=window.netseer_imp_type,d=window.netseer_imp_src,e=window.netseer_segment,f=window.netseer_ad_width,g=window.netseer_ad_height;else{var l=1,k=document.getElementsByName("netseer_ads_frame");if(0<k.length)for(i in kvp=(k[0]&&k[0].src).split("?")[1].split("&"),kvp)k=kvp[i].split("="),h[k[0]]=k[1];"undefined"!=
h.tagid&&(a=h.tagid,c="ad",b=h.impt,d=h.imps,e=h.params,f=h.adw,g=h.adh)}h=document.getElementsByTagName("script");k=!1;for(x in h)if("http://ps.ns-cdn.com/dsatserving2/scripts/netseerads.js"==h[x].src){k=!0;break}(a||k)&&DW.levt("ria","log",{mapp:"yahoo_module",comptyp:"d2s",comp:a,riaevent:"view",objtyp:"",objnm:"",s6:document.location,s7:a,s8:c,s9:b,s10:d,s11:e,s12:f,s13:g,i2:l})};
DW.detectYahooPartnerAds=function(){is_ypa_obj_avail=0;"undefined"!=typeof window.ypaAds&&(is_ypa_obj_avail=1);for(var a=document.getElementsByTagName("div"),c=/(ypaAdWrapper)/,b,d,e=[],f=0,g=a.length;f<g;f+=1)b=a[f],(d=c.exec(b.id))&&0<d.length&&e.push(b);(0<e.length||is_ypa_obj_avail)&&DW.levt("ria","log",{mapp:"yahoo_module",comptyp:"ypa",comp:e[0]&&e[0].id,riaevent:"view",objtyp:"",objnm:"",s6:document.location,s7:e[0]&&e[0].id,s8:e[1]&&e[1].id,s9:e[2]&&e[2].id,i1:e.length,i2:is_ypa_obj_avail})};
DW.detectYahooModules=function(){DW.detectYahooReccomends();DW.detectYahooSearch();DW.detectYahooD2S();DW.detectYahooPartnerAds()};
DW.rg={fbAppId:"",fbAppIds:{cnet_com:"16995676698",com_com:"199064663455765",tunes_com:"186566374731164"},regEvent:{eventcat:"reg",login_success:"LOGIN_SUCCESS",login_failure:"LOGIN_FAILURE",persistlogin_success:"PERSISTLOGIN_SUCCESS",persistlogin_failure:"PERSISTLOGIN_FAILURE",registered:"REGISTERED",registered_clc:"REGISTERED_CLC",logout:"LOGOUT",link:"LINK"},regSource:{urs:"urs",ureg:"ureg",facebook:"fb",twitter:"tw",gigya:"gig"},getFbAppId:function(){var a=window.location.hostname;if(void 0!=
a){if(-1!=a.indexOf(".cnet.com"))return this.fbAppIds.cnet_com;if(-1!=a.indexOf(".com.com"))return this.fbAppIds.com_com;if(-1!=a.indexOf(".tunes.com"))return this.fbAppIds.tunes_com}},logDwEvent:function(a,c,b){var d={mapp:"reg",comptyp:"main",comp:"app"};d.riaevent=a;d.objtyp=c;d.objnm="";d.s6=b.status;b.session?(d.s7=b.session.uid,d.s8=b.session.access_token):b.authResponse&&(d.s7=b.authResponse.userID,d.s8=b.authResponse.access_token);d.s9=DW.rg.fbAppId;DW.levt("ria","log",d)},stl:function(a){a||
(a=DW.rg.getFbAppId());if(void 0!=a){DW.rg.fbAppId=a;window.fbAsyncInit=function(){FB.init({appId:a,status:!0,cookie:!0,xfbml:!1});FB.getLoginStatus(function(a){"unknown"!=a.status&&DW.rg.logDwEvent(DW.rg.regEvent.persistlogin_success,DW.rg.regSource.facebook,a)})};var c=document.createElement("div");c.id="fb-root";document.body.appendChild(c);c=document.createElement("script");c.async=!0;c.src=document.location.protocol+"//connect.facebook.net/en_US/all.js";document.getElementById("fb-root").appendChild(c)}}};
DW.ignoreDomains=[/adlog\.cbsi\.com/,/dw\.cbsi\.com/,/chkpt\.zdnet\.com/];DW.host="dw.cbsi.com";DW.clearPath="/clear/c.gif";DW.redirPath="/redir";
