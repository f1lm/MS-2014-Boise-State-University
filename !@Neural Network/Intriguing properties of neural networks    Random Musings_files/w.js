function st_go(a){var i,u=document.location.protocol+'//pixel.wp.com/g.gif?host='+escape(document.location.host)+'&rand='+Math.random();for(i in a){u=u+'&'+i+'='+escape(a[i]);}u=u+'&ref='+escape(document.referrer);document.open();document.write("<img id=\"wpstats\" src=\""+u+"\" alt=\"\" />");document.close();}
function ex_go(a){var i,u=document.location.protocol+'//pixel.wp.com/g.gif?v=wpcom-no-pv&rand='+Math.random();for(i in a){u=u+'&'+i+'='+escape(a[i]);}document.open();document.write("<img id=\"wpstats2\" src=\""+u+"\" alt=\"\" style=\"display:none\" />");document.close();}
function re_go(a){var i,u=document.location.protocol+'//pixel.wp.com/g.gif?rand='+Math.random();for(i in a){u=u+'&'+i+'='+escape(a[i]);}document.open();document.write("<img id=\"wpstats\" src=\""+u+"\" alt=\"\" style=\"display:none\" />");document.close();}
function clicktrack(e){var t;if(e){t=e.target;}else{t=window.event.srcElement;}linktrack(t,500);}
function contexttrack(e){var t;if(e){t=e.target;}else{t=window.event.srcElement;}linktrack(t,0);}
function linktracker_init(b,p){_blog=b;_post=p;_host=document.location.host?document.location.host:document.location.toString().replace(/^[^\/]*\/+([^\/]*)(\/.*)?/,'$1');if(document.body){document.body.onclick=clicktrack;document.body.oncontextmenu=contexttrack;}else if(document){document.onclick=clicktrack;document.oncontextmenu=contexttrack;}else{}}
function linktrack(a,d){try{if(!a||a==null)return;while(a.nodeName!="A"){if(typeof a.parentNode=='undefined')return;a=a.parentNode;if(!a)return;}
b=a;while(b.nodeName!="BODY"){if(typeof a.parentNode=='undefined')return;b=b.parentNode;if(b.id=='wpcombar')return;if(b.id=='wpadminbar')return;if(b.className=='wpadvert')return;if(b.className.indexOf('wpcom-masterbar')>-1)return;}
if(a.href.match(eval('/^(http(s)?:\\/\\/)?'+_host+'/')))return;if(a.href.match(eval('/^javascript/')))return;var bh=a.href;var pr=document.location.protocol||'http:';var r=(typeof a.rel!='undefined')?escape(a.rel):'0';var b=(typeof _blog!='undefined')?_blog:'0';var p=(typeof _post!='undefined')?_post:'0';var src=pr+'//pixel.wp.com/c.gif?b='+b+'&p='+p+'&r='+r+'&u='+escape(bh)+"&rand="+Math.random();if(a.className.match('flaptor')){var fx=function(c){return c.replace(/flaptor\s*/,'')};var f='b'+_blog+'p'+_post+' '+fx(a.className);var links=document.getElementsByTagName('A');for(i=0;i<links.length;i++){if(links[i].className.match('flaptor'))
f=f+' '+fx(links[i].className);}
src=src+'&f='+f;}
var x=new Image(1,1);x.src=src;if(d){var now=new Date();var end=now.getTime()+d;while(true){now=new Date();if(now.getTime()>end){break}}}}catch(e){}}
window._kmq=window._kmq||[];window.wpcom=window.wpcom||{};window._tkq=window._tkq||[];window.wpcom.tracks=(function(){var userId,userIdType,userLogin,localCache={},context={},pixel='//pixel.wp.com/t.gif',cookieDomain=null,cookiePrefix='tk_',testCookie='tc',userNameCookie='ni',userAnonCookie='ai',queriesCookie='qs',queriesTTL=1800;var TKQ=function(q){this.a=1;if(q&&q.length)
for(var i=0;i<q.length;i++)
this.push(q[i])};TKQ.prototype.push=function(args){if(args){if("object"==typeof args&&args.length){var cmd=args.splice(0,1);if(API[cmd])
API[cmd].apply(null,args)}else if("function"==typeof args){args();}}};var initQueue=function(){if(!window._tkq.a){retryQueries();window._tkq=new TKQ(window._tkq);}};var clone=function(obj,target){if(obj==null||'object'!==typeof obj)
return obj;if(target==null||'object'!==typeof target)
target=obj.constructor();for(var key in obj){if(obj.hasOwnProperty(key)){target[key]=clone(obj[key]);}}
return target;};var bot=function(){return!!navigator.userAgent.match(/bingbot|bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\-webcrawler|converacrawler|dataparksearch|findlinks|crawler|Netvibes|Sogou Pic Spider|ICC\-Crawler|Innovazion Crawler|Daumoa|EtaoSpider|A6\-Indexer|YisouSpider|Riddler|DBot|wsr\-agent|Xenu|SeznamBot|PaperLiBot|SputnikBot|CCBot|ProoXiBot|Scrapy|Genieo|Screaming Frog|YahooCacheSystem|CiBra|Nutch/);};var serialize=function(obj){var str=[];for(var p in obj){if(obj.hasOwnProperty(p)){str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));}}
return str.join("&");};var send=function(query){loadIdentity();retryQueries();query._ui=userId;query._ut=userIdType;if(userLogin){query._ul=userLogin;}
var date=new Date();query._ts=date.getTime();query._tz=date.getTimezoneOffset()/60;var nav=window.navigator;var screen=window.screen;query._lg=nav.language;query._pf=nav.platform;query._ht=screen.height;query._wd=screen.width;query._sx=window.scrollX;query._sy=window.scrollY;clone(context,query);getPixel(serialize(query));};var getPixel=function(query){if(!bot()){var img=new Image();saveQuery(query);img.query=query;img.onload=function(){if(img){removeQuery(img.query);}};img.src=pixel+'?'+query+'&_=_';}};var saveQuery=function(query){removeQuery(query);var queries=getQueries();queries.push(query);saveQueries(queries);};var saveQueries=function(queries){while(queries.join(" ").length>2048){queries=queries.slice(1);}
set(queriesCookie,queries.join(" "),queriesTTL);};var removeQuery=function(query){var i,toSave=[],queries=getQueries();for(i=0;i<queries.length;++i){if(query!=queries[i]){toSave.push(queries[i]);}}
saveQueries(toSave);};var getQueries=function(){var queries=get(queriesCookie);return queries?queries.split(' '):[];};var retryQueries=function(){getQueries().forEach(getPixel);};var newAnonId=function(){var randomBytesLength=18,randomBytes=[];if(window.crypto&&window.crypto.getRandomValues){randomBytes=new Uint8Array(randomBytesLength);window.crypto.getRandomValues(randomBytes);}else{for(var i=0;i<randomBytesLength;++i){randomBytes[i]=Math.floor(Math.random()*256);}}
return btoa(String.fromCharCode.apply(String,randomBytes));}
var get=function(key){return getCookie(key)||localCache[key];};var set=function(key,value,ttl){localCache[key]=value;setCookie(key,value,ttl);};var getCookie=function(key){var name=cookiePrefix+encodeURIComponent(key).replace(/[\-\.\+\*]/g,"\\$&"),pattern=new RegExp("(?:(?:^|.*;)\\s*"+name+"\\s*\\=\\s*([^;]*).*$)|^.*$");return decodeURIComponent(document.cookie.replace(pattern,"$1"))||null;};var checkCookieDomain=function(domain){var time=(new Date).getTime();document.cookie=cookiePrefix+testCookie+"="+time+"; domain="+domain+"; path=/;";return getCookie(testCookie)==time;};var getCookieDomain=function(){if(cookieDomain==null){cookieDomain='';var host=document.location.host.toLowerCase().split(':')[0],tokens=host.split('.'),tryDomain;for(var i=1;i<=tokens.length;++i){tryDomain='.'+tokens.slice(-i).join('.');if(checkCookieDomain(tryDomain)){cookieDomain="; domain="+tryDomain;break;}}}
return cookieDomain;};var setCookie=function(key,value,seconds){var name=cookiePrefix+encodeURIComponent(key),date=new Date();if('undefined'===typeof seconds){seconds=15768E4;}
date.setTime(date.getTime()+seconds*1E3);document.cookie=name+"="+encodeURIComponent(value)+
getCookieDomain()+"; path=/; expires="+date.toUTCString();};var recordEvent=function(eventName,eventProps){_kmq.push(['record',eventName,clone(eventProps)]);eventProps._en=eventName;send(eventProps);};var identifyUser=function(newUserId,newUserLogin){if(newUserLogin){_kmq.push(['identify',newUserLogin]);userLogin=newUserLogin;}
userId=newUserId;userIdType='wpcom:user_id';set(userNameCookie,userId);var anonId=get(userAnonCookie);if(anonId){send({_en:'_aliasUser',anonId:anonId});}
set(userAnonCookie,"",-1);};var clearIdentity=function(){_kmq.push(['clearIdentity']);userId=null;userLogin=null;set(userNameCookie,'',-1);set(userAnonCookie,'',-1);loadIdentity();};var setProperties=function(properties){_kmq.push(['set',clone(properties)])
properties._en='_setProperties';send(properties);};var loadIdentity=function(){if(userId){return;}
userId=get(userNameCookie);if(userId){userIdType='wpcom:user_id';}else{userIdType='anon';userId=get(userAnonCookie);if(!userId){userId=newAnonId();set(userAnonCookie,userId);}}};var storeContext=function(c){if('object'!==typeof c){return;}
context=c;};var API={storeContext:storeContext,identifyUser:identifyUser,recordEvent:recordEvent,setProperties:setProperties,clearIdentity:clearIdentity};initQueue();return API;})();