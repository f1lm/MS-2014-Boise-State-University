if (!window.__csErr) {
    __csErr=window.onerror || 1;
    window.onerror=function(message,fileURL,lineNumber){
        if ($cs && $cs.exm) {$cs.log(message + ': ' + fileURL + ': ' + lineNumber + "||" + $cs.exm); $cs.exm = null; return true; }
        if (__csErr && __csErr != 1) { return __csErr(message, fileURL, lineNumber); }
        return false;
    };
}
try {
if(!window.CrowdScience)window.CrowdScience={V:"2.1.2",U:"undefined"};
(function(a){if(!a.$cs){a.$cs=CrowdScience;var b=a.$cs,c=function(){for(var a=window,c="",o=null;;){var j;j="";try{j=a.location;var p=j.pathname;typeof p===b.U&&(j="");p=j.href;typeof p===b.U&&(j="")}catch(e){j=""}j&&(c=j,o=a);if(a==window.top)break;else a=a.parent}return[c,o,o!=window.top]}();b.locn=c[0];b.topw=c[1];b.ifrm=c[2];b.href=b.locn.href;b.host=b.locn.host;b.d=a.document||null;b.w=window||null;b.n=b.w?b.w.navigator:null;b.u=b.n.userAgent.toLowerCase();b.isIE=-1!=b.n.appVersion.indexOf("MSIE")?
!0:!1;b.cln=[];b.mode=0;b.safe=function(a){return function(){try{a()}catch(c){throw b.ex(c),c;}}};b.ex=function(a){var c=[a.toString(),b.n.appName,b.n.appVersion];a.description&&(c.push(a.description),c.push(a.number));a.fileName&&(c.push(a.fileName),c.push(a.LineNumber));b.state&&c.push("+s+",b.state);b.d.referrer&&c.push("+r+",b.d.referrer);b.st&&(d=function(a){var b="",c;for(c in a)b+=(b?" ":"")+c+":"+a[c];return b},c.push("+a+",d(b.st.acc)),c.push("+ss+",d(b.st.sel_start)));b.exm=c};b.hasOP=Object.prototype.hasOwnProperty?
function(a,b){return a&&a.hasOwnProperty(b)}:function(a,c){return a&&typeof a.prop!=b.U&&a.constructor.prototype[c]!==a[c]};b.cleanup=function(a){for(i=0;i<b.cln.length;i++)b.cln[i].call(a)};b.init=function(a){options={dmn:"crowdscience.com",prot:"http:",ac:null};if(a)for(var c in a)b.hasOP(a,c)&&(options[c]=a[c]);a=options.dmn;c=b.locn.protocol||options.prot;options.pfx="//";options.ac&&(options.pfx+=options.ac.toLowerCase()+".");b.c_srv=c+options.pfx+"static."+a;b.p_srv=c+"//ping."+a;b.o=options;
b.m=/ip(hone|od)|android|webos|blackberry|iemobile/.test(b.u);b.psf="ps.js"};b.init();b.fromURL=function(){return 1==b.mode&&b.ifrm?b.topw.document.referrer:b.href}}})(window);(function(){var a;$cs.log=function(b){a||(a=new Image);a.src=$cs.p_srv+"/log?e="+escape(b)+"&t="+(new Date).getTime()+"&v="+$cs.V}})();
(function(){var a=$cs,b=a.w,c=a.d;if(!a.ck)a.ck=function(b,g,e){if(1==arguments.length){var f=c.cookie.match(RegExp("(?:^|; )"+b.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g)+"=([^;]*)"));return f?a.ut.decode(f[1]):void 0}e=e||{};if(!e.path)e.path="/";var l=e.expires;if("number"==typeof l){var m=new Date;m.setTime(m.getTime()+864E5*l);l=e.expires=m}if(l&&l.toUTCString)e.expires=l.toUTCString();g=a.ut.encode(g);l=b+"="+g;for(f in e)l+="; "+f,m=e[f],!0!==m&&(l+="="+m);c.cookie=l};if(!a.dom)a.dom={pgW:function(){var a=
c.documentElement;return"number"==typeof b.innerWidth?b.innerWidth:a&&(a.clientWidth||a.clientHeight)?a.clientWidth:c.body&&(c.body.clientWidth||c.body.clientHeight)?c.body.clientWidth:0},pgH:function(){var a=c.documentElement;return"number"==typeof b.innerWidth?b.innerHeight:a&&(a.clientWidth||a.clientHeight)?a.clientHeight:c.body&&(c.body.clientWidth||c.body.clientHeight)?c.body.clientHeight:0}};if(!a.dr)a.dr={ready:function(a,b){var e=!1,f=!0,l=c.documentElement,m=c.addEventListener?"addEventListener":
"attachEvent",h=c.addEventListener?"removeEventListener":"detachEvent",j=c.addEventListener?"":"on",q=function(f){if(!("readystatechange"==f.type&&"complete"!=c.readyState)&&(("load"==f.type?a:c)[h](j+f.type,q,!1),!e&&(e=!0)))b.call(a,f.type||f)},n=function(){try{l.doScroll("left")}catch(a){r(n,50);return}q("poll")};if("complete"==c.readyState)b.call(a,"lazy");else{if(c.createEventObject&&l.doScroll){try{f=!a.frameElement}catch(o){}f&&n()}c[m](j+"DOMContentLoaded",q,!1);c[m](j+"readystatechange",
q,!1);a[m](j+"load",q,!1)}}};if(!a.ut)a.ut={encode:function(a){return encodeURIComponent?encodeURIComponent(a):escape(a).replace(/\+/g,"%2B")},decode:function(a){return decodeURIComponent?decodeURIComponent(a):unescape(a.replace(/\%2B/g,"+"))},load:function(a){var b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src=a;(a=c.getElementsByTagName("script")[0])?a.parentNode.insertBefore(b,a):c.head.appendChild(b);return b}};if(!a.st){var r=b.setTimeout,t=b.clearTimeout,o=a.dom,j=a.ck,
p=a.ut,e={starts:[],acc:{},sel_start:null,ff:1,st_tmr:null,pre_bld:[],post_bld:[],post_st:[]};e.delay=function(){t(e.st_tmr);e.st_tmr=r(a.safe(e.start),530)};cb_init=function(){c.body?e.st_tmr?e.delay():e.st_tmr=r(a.safe(e.start),2==a.st_mode?5050:typeof CrowdScienceAdCamp==a.U?3030:770):r(a.safe(cb_init),100)};e.reg=function(b,g){g=g||{std:0};if(!g.cb&&!a.st_mode)g.cb=cb_init;if(!g.re)g.re=!g.std&&(a.o.ac||b)?"start-\\w+.js":a.o.dmn+"/start\\.js";for(var k=null,f=RegExp(g.re),l=c.getElementsByTagName("script"),
m=l.length-1;0<=m;m--){var h=l[m];if(h&&h.src&&f.test(h.src)&&"number"!=typeof h._cs_reg){h._cs_reg=1;if(!b){var j=h.src.match("id=([^&]*)");j&&j[1]&&(b=j[1])}if(b&&!(b in a.st.acc)){a.st.acc[b]=1;e.starts.push({c:b,s:h});k=h;break}}}k&&g.cb&&g.cb()};e.isLive=function(){return-1==(a.fromURL()||"").indexOf("__cs_test=")};e.ok=function(){var c=!1;if(!e.run){if(1!=a.mode&&b!=top&&(300>o.pgH()||360>o.pgW()))return c;var g=navigator,k="netscape";g&&g.appName&&(k=navigator.appName.toLowerCase());g=parseInt(a.n.appVersion,
10);"netscape"==k&&4<g&&(c=!0);"opera"==k&&(c=!0);"microsoft internet explorer"==k&&3<g&&-1==a.u.indexOf("msie 5.0")&&(c=!0);if(e.isLive()&&0!==(new Date).getTime()%e.ff||!e.starts.length)c=!1}return c};e.tag=function(){return e.sel_start.s};e.bldparms=function(){var b=Math;e.sel_start=e.starts[1<e.starts.length?b.floor(b.random()*e.starts.length):0];var b=e.sel_start.c,g=j("__cst"),k=j("__csv"),f=k?k.split("|"):[null],l=f[0],k=null;1<f.length&&(k=f[1]);for(var m=-1!=c.cookie.indexOf("__csh=1"),f=
0;f<e.pre_bld.length;f++)eval(e.pre_bld[f]);var h={};h.url=a.fromURL();h.id=b;h.u=a.u;h.x=(new Date).getTime();h.c=m?1:0;h.t=g?g:0;h.v=l?l:0;h.m=a.m?1:0;h.vn=a.V;codes="";for(f=0;f<e.starts.length;f++)g=e.starts[f],g.c!=b&&(codes=codes?codes+"."+g.c:g.c);if(codes)h.cd=codes;for(f=0;f<e.post_bld.length;f++)e.post_bld[f].call(e,h,k,e.sel_start);return h};e.start=function(){j("__csref")||j("__csref",c.referrer);if(e.st_tmr)t(e.st_tmr),e.st_tmr=null;if(e.ok()){e.run=1;var b=a.p_srv+"/ping.js",g=e.bldparms(),
k=0,f;for(f in g)a.hasOP(g,f)&&(b+=(k?"&":"?")+f+"="+p.encode(g[f]),k++);p.load(b);for(k=0;k<e.post_st.length;k++)e.post_st[k].call(e,g)}};(!a.st_mode||2==a.st_mode)&&a.dr.ready(b,cb_init);a.st=e}if(!a.st.max||!a.st.max.traits){var s={get:function(a,b,c){traits="";var e=99;try{e={1024768:1,1280800:2,12801024:3,1440900:4,800600:5,16801050:6,1152864:7,14001050:8,19201200:9,16001200:10}[a.width+""+a.height]||98}catch(j){}traits+="51="+e+";";a=98;try{for(var e=[["Win",1],["Mac",2],["X11",3],["Linux",
3]],m=0;m<e.length;m++){var h=e[m];if(-1!=b.indexOf(h[0])){a=h[1];break}}}catch(o){}traits+="50="+a+";";try{var q=[7,1,2,3,4,5,6][c.getDay()];traits+="53="+q+";";var n=c.getHours();traits+="55="+(n+1)+";";b=5;6>n||22<=n||(11>n?b=1:13>n?b=2:17>n?b=3:22>n&&(b=4));traits+="54="+b}catch(p){}return traits},add_traits:function(c,e){if("1"==e){var k=s.get(b.screen,a.n.appVersion,new Date);if(k)c.r=1,c.pt=k}}};if(typeof a.st.max==a.U)a.st.max={};a.st.max.traits=s;a.st.post_bld.push(s.add_traits)}if(!$cs.st.cst_prms)$cs.st.cst_prms=
{add:function(a,b,c){for(var b=/(?:\?|&(?:amp;)?)(cp[0-9])=?([^&]*)?/g,e;e=b.exec(c.s.src);)a[e[1]]=e[2]}},$cs.st.post_bld.push($cs.st.cst_prms.add)})();$cs.load=$cs.ut.load;$cs.doc=$cs.d;$cs.isLive=$cs.st.isLive;$cs.encode=$cs.ut.encode;$cs.getCk=$cs.ck;$cs._getPageHeight=$cs.dom.pgH;$cs._getPageWidth=$cs.dom.pgW;
 $cs.st.reg("c2e7cdddce");
}catch(e){if($cs) $cs.ex(e); throw(e);}
// 120627 1551 8962 custom.params.start
