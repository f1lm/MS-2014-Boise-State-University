(function(){var g=void 0,h=true,i=null,j=false,k,o=this;function aa(){for(var a="",b=0;b<16;b++)a+=Math.random();return a}function ba(a,b){var c="",d=ca(encodeURIComponent(a));d.splice(b||5,d.length);p(d,function(a){if(a==0)a="A";else{a>>>=0;for(var b="",d;a>0;)d=a%64,b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".charAt(d)+b,a>>>=6;a=b}c+=a});return c}
function ca(a){a+=String.fromCharCode(128);for(var b=[1518500249,1859775393,2400959708,3395469782],c=1732584193,d=4023233417,e=2562383102,f=271733878,l=3285377520,m=[],n,w,B,H,u,E=Math.ceil((a.length/4+2)/16),L=[E],y=0,s;y<E;y++){L[y]=[];for(n=0;n<16;n++)L[y][n]=a.charCodeAt(y*64+n*4)<<24|a.charCodeAt(y*64+n*4+1)<<16|a.charCodeAt(y*64+n*4+2)<<8|a.charCodeAt(y*64+n*4+3)}y=(a.length-1)*8;a=E-1;L[a][14]=Math.floor(y/Math.pow(2,32));L[a][15]=y&4294967295;for(y=0;y<E;y++){for(s=0;s<16;s++)m[s]=L[y][s];
for(s=16;s<80;s++)m[s]=(m[s-3]^m[s-8]^m[s-14]^m[s-16])<<1|(m[s-3]^m[s-8]^m[s-14]^m[s-16])>>>31;a=c;n=d;w=e;B=f;H=l;for(s=0;s<80;s++)u=Math.floor(s/20),u=(a<<5|a>>>27)+(u==0?n&w^~n&B:u==1?n^w^B:u==2?n&w^n&B^w&B:n^w^B)+H+b[u]+m[s]&4294967295,H=B,B=w,w=n<<30|n>>>2,n=a,a=u;c=c+a&4294967295;d=d+n&4294967295;e=e+w&4294967295;f=f+B&4294967295;l=l+H&4294967295}return[c,d,e,f,l]}function q(a,b){return function(){a.apply(b,arguments)}}
function r(a,b,c){a.addEventListener?a.addEventListener(b,c,j):a.attachEvent&&a.attachEvent("on"+b,c)}function t(a){return typeof a==="number"}function v(a){return typeof a==="string"}function x(a){a=new Date(+a);return Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())}function z(){return(new Date).getTime()}function p(a,b){if((!!a&&a.constructor===Object)===h)for(var c in a){if(a.hasOwnProperty(c)&&b(a[c],c)===j)break}else{c=0;for(var d=a.length;c<d;c++)if(b(a[c],c)===j)break}}
function da(a,b){if(a===b)return 0;if(a.length===0)return b.length;if(b.length===0)return a.length;for(var c=[],d=0,e=b.length;d<=e;d++)c[d]=[d];for(var f=0,l=a.length;f<=l;f++)c[0][f]=f;for(var m,n,w,d=1;d<=e;d++)for(f=1;f<=l;f++)m=d-1,n=f-1,w=c[m][n],b.charAt(m)==a.charAt(n)?c[d][f]=w:(n=c[d][n]+1,m=c[m][f]+1,w+=2,c[d][f]=Math.min(n,m,w));return c[b.length][a.length]};function ea(a){var b={};a&&(a.charAt(0)=="?"&&(a=a.substring(1)),a=a.replace("+"," "),p(a.split(/[&;]/g),function(a){a=a.split("=");b[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}));return b}function fa(a,b,c){var d="",e=o.location.href.split("?");e.length&&(e=ea(e[1]),b=c||b,e[b]&&(d="&"+a+"="+e[b]));return d}function ga(a,b){return!b?h:a==="http:"&&b==="80"||a==="https:"&&b==="443"}
function A(a){var b={hostname:"",pathname:"",search:"",protocol:"",port:"",hash:""};if(!a)return b;var c=document.createElement("a"),d=o.location;if(!/^https?:/.test(a)&&a.indexOf("javascript:")!==0)if(a.indexOf("//")===0)a=d.protocol+a;else if(a.indexOf("/")===0)var e=ga(d.protocol,d.port)?"":d.port,a=d.protocol+"//"+d.hostname+(e?":"+e:"")+a;else{var e=document.baseURI||d.href,f=e.indexOf("?");f===-1&&(f=e.indexOf("#"));if(f===-1)f=e.length;f=e.lastIndexOf("/",f);a=f===-1?"/"+a:e.substr(0,f)+"/"+
a}c.href=a;b.hostname=c.hostname;b.pathname=c.pathname;b.search=c.search;b.protocol=c.protocol;b.port=c.port;b.hash=c.hash;if(b.pathname.charAt(0)!=="/")b.pathname="/"+b.pathname;if(b.hostname==="")b.hostname=d.hostname;if(b.protocol==="")b.protocol=d.protocol;if(b.protocol==="javascript:")b.pathname="",b.hostname="",b.port="",b.hash="";if(ga(b.protocol,b.port))b.port="";return b}
function C(a){var b=a.protocol;a.hostname&&(b+="//"+a.hostname,a.port&&(b+=":"+a.port));return b+a.pathname+a.search+a.hash};function ha(a){p(document.getElementsByTagName("script"),function(b){if(b.src.match(/chartbeat.js/))return b=ea(b.src.split("?")[1]),a.uid=a.uid||b.uid,a.domain=a.domain||b.domain,j})}function D(a,b,c){return a[c]?"&g"+b+"="+encodeURIComponent(a[c]):""}function ia(a){var b=[];p(a,function(a,d){d.charAt(0)=="_"&&b.push(d+"="+a)});return b.length?"&"+b.join("&"):""};var F={};F.c=function(a){var b=o._sf_async_config;if(!a&&b&&b.noCookies)return i;if(F.c.w!==g)return F.c.w;var a=z()+"",c,d;try{if((d=o.localStorage).setItem(a,a),c=d.getItem(a)===a,d.removeItem(a),c)return F.c.w=d}catch(e){}return F.c.w=i};F.b=function(a){var b=F.c();if(!b)return"";var c=b.getItem(a+"_expires");return c&&(c=+c,!isNaN(c)&&z()>c)?(F.remove(a),""):b.getItem(a)||""};
F.create=function(a,b,c){var d=F.c();if(d){var e=new Date;e.setTime(z()+c*1E3);try{d.setItem(a,b),d.setItem(a+"_expires",e.getTime())}catch(f){}}};F.remove=function(a){var b=F.c();b&&(b.removeItem(a),b.removeItem(a+"_expires"))};function ja(){var a=document.createElement("script");a.async=h;a.src=(o.location.protocol||"http:")+"//static.chartbeat.com/js/inpage.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}function ka(a){if(/[\/|\.]chartbeat\.com$/.test(a.origin)){var b=F.c(h),c=String(a.data);b&&c.indexOf("_cb_ip")==0&&(b.setItem("_cb_ip","1"),a.source.postMessage(1,a.origin),ja())}};var G={},I=1;function J(a,b,c){I++;G[a]=G[a]||{};G[a][I]=[b,c];return I}function la(a){if(v(a))G[a]=g,delete G[a];else if(t(a)){var b=h;p(G,function(c){p(c,function(d,e){if(parseInt(e,10)===a)return c[e]=g,delete c[e],b=j});return b})}}function K(a,b){if(G[a]){var c=arguments.length>1?Array.prototype.slice.call(arguments,1):[];p(G[a],function(a){var b;a&&a.length===2&&(b=a[0],a=a[1],b.apply(a,c))})}};var M={};
M.d=function(){M.n?M.r("pageload"):(M.fa=[{target:o,event:"scroll"},{target:document.body,event:"keydown"},{target:document.body,event:"mousemove"},{target:o,event:"resize"},{target:document.body,event:"mousedown"}],M.t=i,M.J=j,M.m=i,M.U={},p(M.fa,function(a){var b=a.event;r(a.target,b,function(a){M.r.call(M,b,a)})}),J("focus",function(){M.r("focus")}),M.r("pageload"),r(document.body,"click",function(a){a:if(a=a||window.event){if(a=a.target||a.srcElement,a.tagName!=="A")if(a.parentNode)if(a.parentNode.tagName==="A")a=
a.parentNode;else if(a.parentNode.parentNode&&a.parentNode.parentNode.tagName==="A")a=a.parentNode.parentNode;else{a=g;break a}else{a=g;break a}}else a=g;a&&K("anchor",a)}),M.n=h)};M.ka=function(){var a,b=M.U.keydown;if(b===g)return j;b=z()-b;return b<=(a||15E3)&&b>=0};M.O=100;M.r=function(a,b){if(!b)b=window.event;if(b&&a==="keydown"){var c=b.keyCode?b.keyCode:b.which;if(c===32||c>36&&c<41)a="scroll"}M.Ia(a);M.t===i?M.da():M.J=h};M.Ia=function(a){M.U[a]=z()};
M.da=function(){M.t=o.setTimeout(M.ma,M.O);K("activity");M.m!==i&&o.clearTimeout(M.m);M.m=o.setTimeout(function(){K("inactive");o.clearTimeout(M.m);M.m=i},5E3+M.O)};M.ma=function(){o.clearTimeout(M.t);M.t=i;if(M.J)M.J=j,M.da()};var N={};N.la=function(){try{N.create("_cb_test","1",1);var a=N.b("_cb_test");N.remove("_cb_test");return a==="1"}catch(b){return j}};N.b=function(a){a+="=";var b="";p(document.cookie.split(";"),function(c){for(;c.charAt(0)===" ";)c=c.substring(1,c.length);if(c.indexOf(a)===0)return b=c.substring(a.length,c.length),j});return b};N.create=function(a,b,c){var d=o._sf_async_config;if(!d||!d.noCookies)d=new Date,d.setTime(z()+c*1E3),document.cookie=a+"="+b+("; expires="+d.toGMTString())+"; path=/"};
N.remove=function(a){N.b(a)&&N.create(a,"",-86400)};function ma(a){this.s=a||"";this.na=F.c()!==i||N.la();this.I=j;na(this)}k=ma.prototype;k.isSupported=function(){return this.na};
function na(a){if(!N.b("_cb_ls")){var b=F.c()!==i,c=N.b("_SUPERFLY_nosample");c&&p(["","_v_","_p_"],function(b){a.create(b+"_SUPERFLY_nosample",c,600,h)});var d=N.b("_chartbeat3");d&&(a.create("_v__chartbeat3",d,2592E3,h),N.remove("_chartbeat3"));b&&((b=N.b("_chartbeat2"))&&a.create("_chartbeat2",b,94608E3,h),(b=N.b("_chartbeat_uuniq"))&&a.create("_chartbeat_uuniq",b,94608E3,h),(b=N.b("_chartbeat5"))&&a.create("_chartbeat5",b,60,h));N.create("_cb_ls","1",2592E3)}}
k.create=function(a,b,c,d){a=d?a:this.s+a;(F.c()?F:N).create(a,b,c);F.c()&&N.create(a,b,c)};k.update=function(a,b,c,d,e,f){a=d?a:this.s+a;e=v(e)?e:"::";d=(d=this.b(a,h))?d.split(e):[];t(f)&&d.length>=f&&d.splice(0,d.length-f+1);d.push(b);this.create(a,d.join(e),c,h)};
k.b=function(a,b){var a=b?a:this.s+a,c=(F.c()?F:N).b(a);if(!c&&F.c()&&(c=N.b(a))&&N.b("_cb_ls")){this.I=h;var d;switch(a){case "_SUPERFLY_nosample":d=600;break;case "_chartbeat4":d=3600;break;case "_cb_cp":d=3600;break;case "_chartbeat3":d=2592E3;break;default:d=94608E3}F.create(a,c,d)}return c};k.remove=function(a,b){a=b?a:this.s+a;(F.c()?F:N).remove(a);F.c()&&N.remove(a)};function oa(a){var b,c;b="pageYOffset";c="scrollTop";if(a){var d,e;d=d||"*";e=e||document;if("querySelectorAll"in e)a=e.querySelectorAll(d+"[data-cb-scroll-element]");else{a=[];d=e.getElementsByTagName(d);for(e=d.length;e--;)d[e].getAttribute("data-cb-scroll-element")&&a.push(d[e])}if(a&&a.length)return a[0][c]}if(t(o[b]))return o[b];else if(document.body&&document.body[c])return document.body[c];else if(document.documentElement[c])return document.documentElement[c];return 0}
function pa(){var a=document,a=a[a.compatMode==="CSS1Compat"?"documentElement":"body"].clientHeight||0;window.innerHeight&&(a=Math.min(window.innerHeight,a));return a}function O(a){a="scroll"+a;return Math.max(document.body[a],document.documentElement[a])||0};var P=function(){var a,b;p(["","moz","o","ms","webkit"],function(c){a=(c+"Hidden").charAt(0).toLowerCase()+(c+"Hidden").slice(1);if(typeof document[a]==="boolean")return b=c,j});var c={};if(b!==g)c.T=a,c.N=(b+"VisibilityState").charAt(0).toLowerCase()+(b+"VisibilityState").slice(1),c.u=b+"visibilitychange";return c}();P.d=function(){if(!P.n)P.q=P.aa(),P.u&&document.addEventListener&&document.addEventListener(P.u,P.Da,j),P.P("focus","onfocusin",P.B),P.P("blur","onfocusout",P.Y),P.q&&P.B(),P.n=h};
P.La=function(){return P.q};P.B=function(){P.q=h;K("focus")};P.Y=function(){P.q=j;K("blur")};P.P=function(a,b,c){o.addEventListener?o.addEventListener(a,c,j):document.attachEvent&&document.attachEvent(b,c)};P.aa=function(){var a=h;document.hasFocus&&(a=document.hasFocus());var b=j;P.T&&(b=document[P.T]);return a&&!b};P.Da=function(){P.aa()?P.B():P.Y()};function qa(){var a=i;p(document.getElementsByTagName("link"),function(b){if(b.rel=="canonical")return b=A(b.href),a=Q(b.pathname)+b.search+b.hash,j});return a}for(var ra={},R=0;R<81;R++)ra["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@[]".charCodeAt(R)]=h;function sa(a,b){if(a==="%")return"%25";var c=parseInt(b,16);return ra[c]?String.fromCharCode(c):"%"+b.toUpperCase()}
function Q(a){if(!v(a))return a;a=a.replace(/%([0-9A-Fa-f]{2})?/g,sa);return a=a.replace(/[^0-9A-Za-z\-._~!$&'()*+,;=:@\/\[\]?#%]+/g,encodeURIComponent)};var S={ha:{IDLE:0,Ka:1,Ja:2,ga:3},f:0};S.d=function(){if(!S.n)J("activity",S.qa,S),J("inactive",S.ta,S),J("focus",S.sa,S),J("blur",S.ra,S),S.n=h};S.pa=function(){return S.f};S.qa=function(){S.f===1?S.g(3):S.f===0&&S.g(2)};S.ta=function(){S.f===3?S.g(1):S.f===2&&S.g(0)};S.sa=function(){(S.f===0||S.f===2)&&S.g(3)};S.ra=function(){S.f===3?S.g(2):S.f===1&&S.g(0)};S.g=function(a){S.f=a;K("state",a)};function ta(a,b){this.R=a||g;this.Z=b||g;this.i=this.K=0}k=ta.prototype;k.d=function(){this.i=this.K=0;this.p=i;this.Fa=J("state",this.S,this);this.S(S.pa())};k.total=function(){this.K+=this.i;this.i=0;return this.K};k.S=function(a){o.clearInterval(this.p);this.p=i;if(a===S.ha.ga)this.p=o.setInterval(q(this.va,this),1E3)};k.va=function(){if(this.R===g||this.R())this.i++,this.Z&&this.Z()};k.terminate=function(){o.clearInterval(this.p);this.p=i;la(this.Fa)};function T(){this.a=o._sf_async_config||{};this.oa=q(this.Ba,this);this.l=[];this.e=new ma(this.Ga);this.k=j;this.h=new ta;this.Ca=q(this.D,this);r(o,"unload",this.Ca);ua(this)||this.d()}function ua(a){if(P.N&&document[P.N]==="prerender"){a.k=h;var b=q(function(){if(this.k&&document[P.N]!=="prerender")this.k=j,this.d(),U(this),window.setTimeout(function(){document.removeEventListener(P.u,b,j)},100)},a);document.addEventListener(P.u,b,j);return h}return j}k=T.prototype;
k.d=function(){this.A=this.j=0;this.H=z();this.ca=ba(va(this));this.F=h;this.V=72E5;var a=+this.a.sessionLength;if(!isNaN(a)&&this.Ga!=="_p_")this.V=a*6E4;this.h.d();S.d();M.d();P.d();this.o=0;this.ja=J("activity",this.za,this)};function U(a){if(!a.e.b("_SUPERFLY_nosample")&&!a.k)a.xa?a.G():(a.xa=h,!o._sf_async_config&&!o._cbq?(a.C=q(a.G,a),r(o,"load",a.C)):a.G())}k.G=function(){var a=o._sf_startpt,b=o._sf_endpt;if(t(a))this.$=t(b)?b-a:z()-a;M.d();this.wa=setInterval(q(this.W,this),15E3);this.W()};
k.W=function(){var a=this.h.i,a=this.a.reading&&+this.a.reading||a>0;if(this.A<this.j&&!a)this.A++;else if(a?this.j=0:wa(this),this.A=0,this.l.push(0),this.l.length>18&&this.l.shift(),z()-this.H>=this.V)this.terminate();else{var a=this.a,b=V(this);this.o=Math.max(this.o,b);var c=Math.round((z()-this.H)/600)/100,d=0,e=0,f=0,l=this.h.i;M.ka()?e=1:this.a.reading&&+this.a.reading||l>0||c<0.09?d=1:f=1;var m="",n="",w="",B="",H="",u=xa(this);if(this.F){this.F=j;var m=(u?"&v=":"&r=")+W(this),n="&i="+ya(this),
E=this.a.hudTrackable;E!==g&&(w="&L="+(E?"1":"0"));if(u&&(u=za(this)))m="&v="+encodeURIComponent(u.path),B="&K="+u.left+"::"+u.top,u.X>1&&(B+="&l1="+u.X);a.alias&&(H="&PA="+encodeURIComponent(a.alias));this.M&&(m+="&vp=1")}u=this.$?"&b="+this.$:"";E=this.v?"&A="+this.v:"";b=(o.location.protocol||"http:")+"//"+a.pingServer+"/ping?h="+encodeURIComponent(a.domain)+"&p="+encodeURIComponent(a.path)+"&u="+this.L+"&d="+encodeURIComponent(this.z)+"&g="+a.uid+D(a,0,"sections")+D(a,1,"authors")+D(a,3,"sponsorName")+
D(a,4,"type")+(!a.noCookies&&this.e.isSupported()?"&n="+this.ya:"&nc=1")+(this.Q?"&f="+this.Q:"")+"&c="+c+"&x="+b+"&m="+this.o+"&y="+O("Height")+"&o="+O("Width")+"&w="+pa()+"&j="+Math.round((this.j+2)*15E3/1E3)+"&R="+d+"&W="+e+"&I="+f+"&E="+this.h.total()+"&e="+l+m+B+H+u+E+fa("C","utm_campaign",a.campaignTag)+fa("M","utm_medium",a.mediumTag)+"&t="+this.ca+"&V=37"+Aa(this)+n+w+"&tz="+(new Date).getTimezoneOffset();c=this.e;d=c.I;c.I=j;a=b+(d?"&l=1":"")+ia(a)+"&_";if(!this.k)b=new Image(1,1),b.onerror=
this.oa,b.src=a}};k.Ba=function(){this.l.push(1);var a=0;p(this.l,function(b){a+=b});a<3?(this.F=h,wa(this)):(this.terminate(),this.e.create("_SUPERFLY_nosample","1",600))};k.D=function(){};k.za=function(){var a=V(this);this.o=Math.max(this.o,a)};function V(a){return oa(!!a.a.scrollElement)}function wa(a){var b=a.j,b=b?Math.min(b*2,16):1;a.j=b}
k.ea=function(a,b){if(!this.k)this.D(),this.terminate(),this.M=o.location.protocol+"//"+this.a.domain+this.a.path,this.a.path=Q(a),b&&(this.a.title=b),this.d(),U(this)};function xa(a){if(a.M)return h;a=(document.referrer||"").indexOf("://"+o.location.host+"/");return a!=-1&&a<9}function W(a){a=a.M;if(!a&&(a=document.referrer||"")){var b=A(a);if(b.protocol==="http:"||b.protocol==="https:")b.pathname=Q(b.pathname),a=C(b)}return encodeURIComponent(a)}
function ya(a){a=a.a.title.slice(0,100);return encodeURIComponent(a)}function va(a){var b=o.navigator,c=o.window.screen,d=[b.userAgent,b.platform,(new Date).getTimezoneOffset(),c.width+c.height+c.colorDepth];p(b.plugins,function(a){d.push(a.name+a.description+a.filename+a[0].type)});b=o.performance;d=d.concat([b&&b.now?b.now():"",W(a),document.title,o.location.href,z(),O("Width"),O("Height"),aa()]);return d.join()}
function Aa(a){var b="",c=a.e.b("_chartbeat4");c&&(p(c.split("::"),function(a){b+="&z="+encodeURIComponent(a)}),a.e.remove("_chartbeat4"));return b}k.terminate=function(){this.h.terminate();la(this.ja);if(this.C!==g){var a=this.C,b=o;b.removeEventListener?b.removeEventListener("load",a,j):b.detachEvent&&b.detachEvent("onload",a)}clearInterval(this.wa)};function X(){T.call(this);for(var a=q(this.ba,this),b=o._cbq||[];b.length;)a(b.shift());o._cbq={push:a};J("anchor",this.Aa,this);"postMessage"in window&&r(o,"message",q(this.ua,this))}(function(){var a=T;function b(){}b.prototype=a.prototype;X.Ha=a.prototype;X.prototype=new b;X.prototype.constructor=X})();k=X.prototype;
k.d=function(){X.Ha.d.call(this);this.v=i;ha(this.a);var a=o.location,b=this.a;b.pingServer=b.pingServer||"ping.chartbeat.net";b=this.a;b.title=b.title||document.title;b=this.a;b.domain=b.domain||a.host;var b=this.a,c;if(this.a.path)c=Q(this.a.path);else a:{c=i;if(this.a.useCanonical&&(c=qa()))break a;var d=o.location;c=Q(d.pathname);var e=d.search||"",e=e.replace(/PHPSESSID=[^&]+/,""),f=/&utm_[^=]+=[^&]+/ig;(d=f.exec(d.search))&&(e=e.replace(f,""));f=/\?utm_[^=]+=[^&]+(.*)/i;(d=f.exec(e))&&(e=e.replace(f,
d[1]!=""?"?"+d[1]:""));c+=e}b.path=c;this.z=a.host.replace(/^www\./,"");this.a.domain=this.a.domain.replace(/^www\./,"");a=(this.e.b("_chartbeat2",h)||"").split(".");a.length>4&&(a=[]);b=z();e="1";f=a&&+a[2];c=a&&a[3];if(a&&f&&c)if(e=Math.abs((x(b)-x(f))/864E5)){e=Math.min(e,16)-1;for(f="";e--;)f+=0;e=(c+f+"1").slice(-16)}else e=c;c=e;e=(this.e.b("_chartbeat2",h)||"").split(".");d=z();f=d-+(e[1]||0);d-=+(e[2]||0);this.ya=e[0]&&f>18E5&&d<2592E6?0:1;a[0]||(a[0]=this.a.utoken||ba(va(this),3),a[1]=b);
a[2]=b;a[3]=c;this.L=a[0];this.Ea=a.join(".");this.e.create("_chartbeat2",this.Ea,94608E3,h);this.a.utoken=this.L;var l;b=+a[1];c=+a[2];if((a=a[3])&&b&&c)l=(Math.min((Math.abs((x(c)-x(b))/864E5)||0)+1,16,a.length)-1).toString(16),l+=("0000"+parseInt(a,2).toString(16)).slice(-4);this.Q=l};k.ia=function(a){this.v=a};k.D=function(){this.e.update("_chartbeat4",["t="+this.ca,"E="+this.h.total(),"x="+V(this),"c="+Math.round((z()-this.H)/600)/100,"y="+O("Height"),"w="+pa()].join("&"),3600)};
k.ua=function(a){var b=this.a;if(a.origin==="http://"+(b.playerdomain||this.z)){var c=a.data;v(c)&&c.indexOf("cbqpush::")===0?(a=c.split("::"),a.length==3&&(a=a.slice(1),a[0].indexOf("_")===0&&this.ba(a))):c=="cbdata?"&&(b="domain="+encodeURIComponent(b.domain)+"&path="+encodeURIComponent(b.path)+"&title="+ya(this)+"&referrer="+W(this)+"&internal="+(xa(this)?"1":"0")+"&subdomain="+encodeURIComponent(this.z)+"&utoken="+this.L,a.source.postMessage(b,"*"))}};
k.ba=function(a){this.a[a[0]]=a[1];this.j=0};function Ba(a){a=a.replace(/-{2,}/g,"-");a=A(a);a.pathname=Q(a.pathname);return a}
k.Aa=function(a){var b,c=a.href||"",c=Ba(c);if(!(c.hostname!==o.location.hostname||c.protocol.indexOf("http")!==0)){c=C(c);b=a;for(var d=b.offsetLeft,a=b.offsetTop,e=j,f=b.offsetParent;b&&b!==g&&b!==document.body;){if(b===f)d+=b.offsetLeft,a+=b.offsetTop,f=b.offsetParent;var l=b,m=g;m=o.getComputedStyle?(l=o.getComputedStyle(l,i))&&(l.position||l.getPropertyValue("position")):l.currentStyle?l.currentStyle.position:l.style&&l.style.position;if((m||"")==="fixed"){e=h;break}b=b.parentElement}e&&(d+=
0,a+=0);b=d;this.e.update("_chartbeat5",[b,a,encodeURIComponent(this.a.path),encodeURIComponent(c)].join(","),60,j,g,5)}};
function za(a){var b=a.e.b("_chartbeat5");if(!b)return i;var b=b.split("::"),c=b.length,d,e;if(c===1)d=b[0].split(","),e=0;else{var f,l=Ba(o.location.href),m=C(l);p(b,function(a,b){var c=a.split(","),l=da(m,decodeURIComponent(c[3]));if(l===0)return d=c,e=b,j;if(f===g||l<f)f=l,d=c,e=b})}b.splice(e,1);a.e.create("_chartbeat5",b.join("::"),60);return{left:d[0],top:d[1],path:decodeURIComponent(d[2]),X:c}};if(!o.pSUPERFLY){var Y=new X;o.pSUPERFLY=Y;X.prototype.virtualPage=X.prototype.ea;X.prototype.activity=X.prototype.ia;var Z=o.pSUPERFLY_pub;Z&&Z.virtualPage&&(X.prototype.virtualPage=function(){var a=arguments.length?Array.prototype.slice.call(arguments,0):[];Z.virtualPage();X.prototype.ea.apply(Y,a);Z.d();U(Z)});Z&&Z.addEngagedAdFilter&&(X.prototype.addEngagedAdFilter=q(Z.addEngagedAdFilter,Z));Z&&Z.refreshAd&&(X.prototype.refreshAd=q(Z.refreshAd,Z));U(Y);var Ca=F.c(h);if(Ca){r(o,"message",ka);var $;
if($=Ca.getItem("_cb_ip")){var Da=o.location;$=!(!/^([^.]+[.])?chartbeat\.com$/.test(Da.hostname)?0:/^\/publishing\/(overlay|hud|mab)\//.test(Da.pathname))}$&&ja()}};})();
