(function(){var g=void 0,h=true,i=null,k=false,l,m=this;function aa(a){var b=n;function c(){}c.prototype=b.prototype;a.V=b.prototype;a.prototype=new c;a.prototype.constructor=a};function ba(){for(var a="",b=0;b<16;b++)a+=Math.random();return a}function ca(a,b){var c="",d=da(encodeURIComponent(a));d.splice(b||5,d.length);p(d,function(a){if(a==0)a="A";else{a>>>=0;for(var b="",d;a>0;)d=a%64,b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-".charAt(d)+b,a>>>=6;a=b}c+=a});return c}
function da(a){a+=String.fromCharCode(128);for(var b=[1518500249,1859775393,2400959708,3395469782],c=1732584193,d=4023233417,e=2562383102,f=271733878,j=3285377520,q=[],o,x,A,I,w,G=Math.ceil((a.length/4+2)/16),O=[G],z=0,v;z<G;z++){O[z]=[];for(o=0;o<16;o++)O[z][o]=a.charCodeAt(z*64+o*4)<<24|a.charCodeAt(z*64+o*4+1)<<16|a.charCodeAt(z*64+o*4+2)<<8|a.charCodeAt(z*64+o*4+3)}z=(a.length-1)*8;a=G-1;O[a][14]=Math.floor(z/Math.pow(2,32));O[a][15]=z&4294967295;for(z=0;z<G;z++){for(v=0;v<16;v++)q[v]=O[z][v];
for(v=16;v<80;v++)q[v]=(q[v-3]^q[v-8]^q[v-14]^q[v-16])<<1|(q[v-3]^q[v-8]^q[v-14]^q[v-16])>>>31;a=c;o=d;x=e;A=f;I=j;for(v=0;v<80;v++)w=Math.floor(v/20),w=(a<<5|a>>>27)+(w==0?o&x^~o&A:w==1?o^x^A:w==2?o&x^o&A^x&A:o^x^A)+I+b[w]+q[v]&4294967295,I=A,A=x,x=o<<30|o>>>2,o=a,a=w;c=c+a&4294967295;d=d+o&4294967295;e=e+x&4294967295;f=f+A&4294967295;j=j+I&4294967295}return[c,d,e,f,j]}function r(a,b){return function(){a.apply(b,arguments)}}function ea(a){return a.replace(/^www\./,"")}
function s(a,b,c){a.addEventListener?a.addEventListener(b,c,k):a.attachEvent&&a.attachEvent("on"+b,c)}function fa(a,b){var c=m;c.removeEventListener?c.removeEventListener(a,b,k):c.detachEvent&&c.detachEvent("on"+a,b)}function t(a){return typeof a==="number"}function u(a){return typeof a==="string"}function ga(a){a=new Date(+a);return Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())}function y(){return(new Date).getTime()}function ha(a){return encodeURIComponent(a)}
function ia(a,b){if(!(a&&a.constructor===Object)||!(b&&b.constructor===Object))return a===b;var c=0,d=h;p(a,function(a,e){c++;return d=a===b[e]});if(!d)return k;var e=0;p(b,function(){e++});return c===e}function p(a,b){if((!!a&&a.constructor===Object)===h)for(var c in a){if(a.hasOwnProperty(c)&&b(a[c],c)===k)break}else{c=0;for(var d=a.length;c<d;c++)if(b(a[c],c)===k)break}}function ja(a,b){var c=[];p(a,function(a){b(a)&&c.push(a)});return c}
function ka(a){(!!a&&a.constructor===Object)===h&&(a="");var b={};p(a.split("&"),function(a){a=a.split("::");a.length===2&&(b[decodeURIComponent(a[0])]=decodeURIComponent(a[1]))});return b}
function la(a,b){if(a===b)return 0;if(a.length===0)return b.length;if(b.length===0)return a.length;for(var c=[],d=0,e=b.length;d<=e;d++)c[d]=[d];for(var f=0,j=a.length;f<=j;f++)c[0][f]=f;for(var q,o,x,d=1;d<=e;d++)for(f=1;f<=j;f++)q=d-1,o=f-1,x=c[q][o],b.charAt(q)==a.charAt(o)?c[d][f]=x:(o=c[d][o]+1,q=c[q][f]+1,x+=2,c[d][f]=Math.min(o,q,x));return c[b.length][a.length]};var B={},ma=1;function C(a,b,c){ma++;B[a]=B[a]||{};B[a][ma]=[b,c];return ma}function D(a){if(u(a))B[a]=g,delete B[a];else if(t(a)){var b=h;p(B,function(c){p(c,function(d,e){if(parseInt(e,10)===a)return c[e]=g,delete c[e],b=k});return b})}}function E(a,b){if(B[a]){var c=arguments.length>1?Array.prototype.slice.call(arguments,1):[];p(B[a],function(a){var b;a&&a.length===2&&(b=a[0],a=a[1],b.apply(a,c))})}};var F={};
F.d=function(){F.D?F.Q("pageload"):(F.Na=[{target:m,event:"scroll"},{target:document.body,event:"keydown"},{target:document.body,event:"mousemove"},{target:m,event:"resize"},{target:document.body,event:"mousedown"}],F.W=i,F.ma=k,F.C=i,F.Da={},p(F.Na,function(a){var b=a.event;s(a.target,b,function(a){F.Q.call(F,b,a)})}),C("focus",function(){F.Q("focus")}),F.Q("pageload"),s(document.body,"click",function(a){a:if(a=a||window.event){if(a=a.target||a.srcElement,a.tagName!=="A")if(a.parentNode)if(a.parentNode.tagName==="A")a=
a.parentNode;else if(a.parentNode.parentNode&&a.parentNode.parentNode.tagName==="A")a=a.parentNode.parentNode;else{a=g;break a}else{a=g;break a}}else a=g;a&&E("anchor",a)}),F.D=h)};F.Qa=function(){var a,b=F.Da.keydown;if(b===g)return k;b=y()-b;return b<=(a||15E3)&&b>=0};F.ra=100;F.Q=function(a,b){if(!b)b=window.event;if(b&&a==="keydown"){var c=b.keyCode?b.keyCode:b.which;if(c===32||c>36&&c<41)a="scroll"}F.ob(a);F.W===i?F.Ka():F.ma=h};F.ob=function(a){F.Da[a]=y()};
F.Ka=function(){F.W=m.setTimeout(F.Sa,F.ra);E("activity");F.C!==i&&m.clearTimeout(F.C);F.C=m.setTimeout(function(){E("inactive");m.clearTimeout(F.C);F.C=i},5E3+F.ra)};F.Sa=function(){m.clearTimeout(F.W);F.W=i;if(F.ma)F.ma=k,F.Ka()};var na=/[?&]__cb_debug=/i;function oa(a,b,c){b=b||"*";c=c||document;if("querySelectorAll"in c)return c.querySelectorAll(b+"["+a+"]");for(var d=[],b=c.getElementsByTagName(b),c=b.length;c--;)b[c].getAttribute(a)&&d.push(b[c]);return d}function H(a,b){var c=i;b&&(c=b.getAttribute(a));if(c===i){var d=oa(a,"*",b);d.length!==0&&(c=d[0].getAttribute(a))}return c}function pa(a,b,c){return a===g?k:c===g&&a.getAttribute(b)||a.getAttribute(b)===c?a:a===document.body?k:pa(a.parentNode,b,c)}
function J(a,b,c){a="page"+a+"Offset";b="scroll"+b;if(c&&(c=oa("data-cb-scroll-element"))&&c.length)return c[0][b];if(t(m[a]))return m[a];else if(document.body&&document.body[b])return document.body[b];else if(document.documentElement[b])return document.documentElement[b];return 0}function qa(a){var b=document,b=b[b.compatMode==="CSS1Compat"?"documentElement":"body"]["client"+a]||0;window["inner"+a]&&(b=Math.min(window["inner"+a],b));return b}function K(){return qa("Height")}
function ra(a){a="scroll"+a;return Math.max(document.body[a],document.documentElement[a])||0}function L(){return ra("Height")};function M(a){var b=a.offsetHeight,c=a.offsetWidth;(b<=1||c<=1)&&p(a.getElementsByTagName("iframe"),function(a){var e=a.offsetHeight,a=a.offsetWidth;if(e>1&&a>1)return b=e,c=a,k});return{height:b,width:c}}
function sa(a){if(!ta(a))return k;if(N(a,"visibility")==="hidden")return k;if(N(a,"overflow")==="hidden"&&(a.offsetHeight===0||a.offsetWidth===0))return k;for(var b=h,c=a.parentElement;c&&b;){var d;var e=c;if(e.scrollHeight===e.clientHeight&&e.scrollWidth===e.clientWidth)d=k;else{d=N(e,"overflow");var f=N(e,"overflow-x"),e=N(e,"overflow-y");d=d==="auto"||d==="scroll"||f==="auto"||f==="scroll"||e==="auto"||e==="scroll"}d&&(b=ua(a,c));c=c.parentElement}return b&&ua(a,i)}
function ua(a,b){var c,d;if(b){var e=M(b);c=e.width;d=e.height}else c=qa("Width"),d=K();var f=M(a),e=f.height,f=f.width,j=va(a,b),q=j.y,j=j.x;c=Math.min(j+f,f,c,c-j);d=Math.min(q+e,e,d,d-q);if(c<0||d<0)return k;e*=f;return c*d>=(e>=242500?0.3:0.5)*e}
function va(a,b,c){for(var d=a.offsetLeft,e=a.offsetTop,f=k,j=c?0:J("X","Left",g),q=c?0:J("Y","Top",g),o=a.offsetParent;a&&a!==b&&a!==document.body;){if(a===o)d+=a.offsetLeft,e+=a.offsetTop,o=a.offsetParent;c||(d-=a.scrollLeft,e-=a.scrollTop);if(N(a,"position")==="fixed"){f=h;break}a=a.parentElement}c||(d-=b?b.scrollLeft:j,e-=b?b.scrollTop:q);f&&(d+=j,e+=q);return{x:d,y:e}}
function N(a,b){var c;c=m.getComputedStyle?(c=m.getComputedStyle(a,i))&&(c[b]||c.getPropertyValue(b)):a.currentStyle?a.currentStyle[b]:a.style&&a.style[b];return c||""}function ta(a){if("contains"in document.documentElement&&!document.documentElement.contains(a))return k;a=M(a);return a.height>1&&a.width>1};var P={ta:{IDLE:0,sb:1,rb:2,sa:3},j:0};P.d=function(){if(!P.D)C("activity",P.Za,P),C("inactive",P.bb,P),C("focus",P.ab,P),C("blur",P.$a,P),P.D=h};P.ya=function(){return P.j};P.Za=function(){P.j===1?P.n(3):P.j===0&&P.n(2)};P.bb=function(){P.j===3?P.n(1):P.j===2&&P.n(0)};P.ab=function(){(P.j===0||P.j===2)&&P.n(3)};P.$a=function(){P.j===3?P.n(2):P.j===1&&P.n(0)};P.n=function(a){P.j=a;E("state",a)};function wa(a,b){this.ca=a||g;this.F=b||g;this.t=this.na=0}l=wa.prototype;l.d=function(){this.t=this.na=0;this.J=i;this.nb=C("state",this.B,this);this.B(P.ya())};l.total=function(){this.na+=this.t;this.t=0;return this.na};l.B=function(a){m.clearInterval(this.J);this.J=i;if(a===P.ta.sa)this.J=m.setInterval(r(this.fb,this),1E3)};l.fb=function(){if(this.ca===g||this.ca())this.t++,this.F&&this.F()};l.terminate=function(){m.clearInterval(this.J);this.J=i;D(this.nb)};
l.p=function(){this.terminate();this.F=this.ca=g};function xa(a,b){this.g=a;this.O=b;this.A=a.getAttribute("data-cb-ad-id")||a.id||"";this.o=i;this.ua=0;this.z=new wa(function(){return sa(a)},r(this.F,this));ya(this);if(this.O)this.Ua=C("activity",this.oa,this)}function ya(a){a.ua++;a.b={};a.b.campaignId="";a.b.creativeId="";a.b.placementId="";a.b.siteId="";a.b.server_height="";a.b.server_width="";a.ba=k;a.Aa=k;a.z.d();a.Ma=k;a.K=0;a.w=i;a.qb=C("state",a.B,a);a.B(P.ya())}l=xa.prototype;
l.B=function(a){if(this.w!==i)clearInterval(this.w),this.w=i;this.K=0;if(a===P.ta.sa)this.w=m.setInterval(r(this.pb,this),100);this.O&&this.oa()};l.pb=function(){if(sa(this.g)){if(this.K++,this.K>=10)this.Ma=h,za(this),E("forcePing")}else this.K=0};function za(a){D(a.qb);m.clearInterval(a.w);a.w=i}l.F=function(){E("adEngaged",this.s(h),this.g);this.O&&this.oa()};function Aa(a,b,c){a.b=b;a.Aa=!!c;E("forcePing")}
l.s=function(a){var b={id:this.A,engagedSeconds:this.z.total()};b.campaignId=this.b?this.b.campaignId:"";b.creativeId=this.b?this.b.creativeId:"";if(a)return b;var a=M(this.g),c=va(this.g,g,h);b.positionLeft=c.x;b.positionTop=c.y;b.width=a.width;b.height=a.height;b.viewable=this.Ma;b.order=this.ua;b.placementId=this.b?this.b.placementId:"";b.siteId=this.b?this.b.siteId:"";b.server_height=this.b?this.b.server_height:"";b.server_width=this.b?this.b.server_width:"";b.lineId=this.b?this.b.lineId:"";b.exclude=
this.ba;return b};l.X=function(){if(!this.Aa){var a=this.g,b={};b.campaignId=H("data-cb-campaign-id",a)||"";b.creativeId=H("data-cb-creative-id",a)||"";b.placementId=H("data-cb-placement-id",a)||"";b.siteId=H("data-cb-site-id",a)||"";b.server_height=H("data-cb-creative-height",a)||"";b.server_width=H("data-cb-creative-width",a)||"";b.lineId=H("data-cb-line-id",a)||"";if(H("data-cb-exclude",a))this.ba=h;ia(b,this.b)||Aa(this,b)}};
l.oa=function(){function a(a,b,c){var d=document.createElement("div"),e=document.createElement("span");e.setAttribute("style","font-weight: bold;");e.textContent=a;d.textContent=b;d.insertBefore(e,d.firstChild);c.appendChild(d)}var b=this.g;if(b){var c;if(this.o)c=document.getElementById(this.o);else{this.o="engagementLog-"+this.A+"-"+ba();c=document.createElement("div");c.setAttribute("id",this.o);document.body.appendChild(c);var d=b.getAttribute("style")||"",e=N(b,"position"),e=e==="fixed"||e===
"absolute"||e==="relative"?"":"position: relative;";d+="box-shadow: 0px 0px 0px 3px #49A2DC; z-index: 2000;"+e;b.setAttribute("style",d);var f="box-shadow: 0px 0px 0px 3px #5BC3BD, 10px 5px 5px #C8DAE8; z-index: 2000;"+e;c.onmouseover=function(){b.setAttribute("style",f)};c.onmouseout=function(){d?b.setAttribute("style",d):b.removeAttribute("style")}}c.innerHTML="";var j=va(b),e=j.y,j=j.x;e+=J("Y","Top",g);j+=J("X","Left",g);c.setAttribute("style","background-color: #F1F7FB; z-index: 9000000; position: absolute; padding: 10px; border-radius: 5px; font-size: 12px; color: #658BA1; border: 1px solid #C8DAE8; margin: 3px; font-family: 'Proxima-Nova','Helvetica Neue',Helvetica,Arial,sans-serif; top: "+
e+"px; left: "+j+"px;");e=this.s();a("Ad Name: ",e.id+" ["+e.width+"x"+e.height+"]",c);(j=e.campaignId)&&a("Campaign: ",j,c);(j=e.creativeId)&&a("Creative: ",j,c);a("Viewable: ",e.viewable+"",c);c.appendChild(document.createElement("br"));j=sa(this.g);a((j?"In ":"Out Of ")+" View","",c);j&&a("in view intervals: ",this.K+"",c);a("Engaged Time: ",e.engagedSeconds+" seconds",c)}};l.reset=function(){za(this);this.z.terminate();ya(this)};
l.p=function(){za(this);this.z.p();this.b=this.g=this.z=i;if(this.o){var a=document.getElementById(this.o);(a.parentElement?a.parentElement:a.parentNode).removeChild(a)}this.O&&D(this.Ua)};function Ba(a){var b={};a&&(a.charAt(0)=="?"&&(a=a.substring(1)),a=a.replace("+"," "),p(a.split(/[&;]/g),function(a){a=a.split("=");b[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}));return b}function Ca(a,b,c){var d="",e=m.location.href.split("?");e.length&&(e=Ba(e[1]),b=c||b,e[b]&&(d="&"+a+"="+e[b]));return d}function Da(a,b){return!b?h:a==="http:"&&b==="80"||a==="https:"&&b==="443"}
function Ea(a){var b={hostname:"",pathname:"",search:"",protocol:"",port:"",hash:""};if(!a)return b;var c=document.createElement("a"),d=m.location;if(!/^https?:/.test(a)&&a.indexOf("javascript:")!==0)if(a.indexOf("//")===0)a=d.protocol+a;else if(a.indexOf("/")===0)var e=Da(d.protocol,d.port)?"":d.port,a=d.protocol+"//"+d.hostname+(e?":"+e:"")+a;else{var e=document.baseURI||d.href,f=e.indexOf("?");f===-1&&(f=e.indexOf("#"));if(f===-1)f=e.length;f=e.lastIndexOf("/",f);a=f===-1?"/"+a:e.substr(0,f)+"/"+
a}c.href=a;b.hostname=c.hostname;b.pathname=c.pathname;b.search=c.search;b.protocol=c.protocol;b.port=c.port;b.hash=c.hash;if(b.pathname.charAt(0)!=="/")b.pathname="/"+b.pathname;if(b.hostname==="")b.hostname=d.hostname;if(b.protocol==="")b.protocol=d.protocol;if(b.protocol==="javascript:")b.pathname="",b.hostname="",b.port="",b.hash="";if(Da(b.protocol,b.port))b.port="";return b}
function Fa(a){var b=a.protocol;a.hostname&&(b+="//"+a.hostname,a.port&&(b+=":"+a.port));return b+a.pathname+a.search+a.hash};function Q(a,b,c){a[b]=a[b]||c}function Ga(a){p(document.getElementsByTagName("script"),function(b){if(b.src.match(/chartbeat.js/))return b=Ba(b.src.split("?")[1]),Q(a,"uid",b.uid),Q(a,"domain",b.domain),k})}function R(a,b,c){return a[c]?"&g"+b+"="+encodeURIComponent(a[c]):""}function Ha(a){var b=[];p(a,function(a,d){d.charAt(0)=="_"&&b.push(d+"="+a)});return b.length?"&"+b.join("&"):""};var S={};S.Ra=function(){try{S.create("_cb_test","1",1);var a=S.c("_cb_test");S.remove("_cb_test");return a==="1"}catch(b){return k}};S.c=function(a){a+="=";var b="";p(document.cookie.split(";"),function(c){for(;c.charAt(0)===" ";)c=c.substring(1,c.length);if(c.indexOf(a)===0)return b=c.substring(a.length,c.length),k});return b};S.create=function(a,b,c){var d=m._sf_async_config;if(!d||!d.noCookies)d=new Date,d.setTime(y()+c*1E3),document.cookie=a+"="+b+("; expires="+d.toGMTString())+"; path=/"};
S.remove=function(a){S.c(a)&&S.create(a,"",-86400)};var T={};T.f=function(a){var b=m._sf_async_config;if(!a&&b&&b.noCookies)return i;if(T.f.aa!==g)return T.f.aa;var a=y()+"",c,d;try{if((d=m.localStorage).setItem(a,a),c=d.getItem(a)===a,d.removeItem(a),c)return T.f.aa=d}catch(e){}return T.f.aa=i};T.c=function(a){var b=T.f();if(!b)return"";var c=b.getItem(a+"_expires");return c&&(c=+c,!isNaN(c)&&y()>c)?(T.remove(a),""):b.getItem(a)||""};
T.create=function(a,b,c){var d=T.f();if(d){var e=new Date;e.setTime(y()+c*1E3);try{d.setItem(a,b),d.setItem(a+"_expires",e.getTime())}catch(f){}}};T.remove=function(a){var b=T.f();b&&(b.removeItem(a),b.removeItem(a+"_expires"))};function Ia(a){this.T=a||"";this.Ta=T.f()!==i||S.Ra();this.la=k;Ja(this)}l=Ia.prototype;l.isSupported=function(){return this.Ta};
function Ja(a){if(!S.c("_cb_ls")){var b=T.f()!==i,c=S.c("_SUPERFLY_nosample");c&&p(["","_v_","_p_"],function(b){a.create(b+"_SUPERFLY_nosample",c,600,h)});var d=S.c("_chartbeat3");d&&(a.create("_v__chartbeat3",d,2592E3,h),S.remove("_chartbeat3"));b&&((b=S.c("_chartbeat2"))&&a.create("_chartbeat2",b,94608E3,h),(b=S.c("_chartbeat_uuniq"))&&a.create("_chartbeat_uuniq",b,94608E3,h),(b=S.c("_chartbeat5"))&&a.create("_chartbeat5",b,60,h));S.create("_cb_ls","1",2592E3)}}
function Ka(a){var b=a.la;a.la=k;return b}l.create=function(a,b,c,d){a=d?a:this.T+a;(T.f()?T:S).create(a,b,c);T.f()&&S.create(a,b,c)};l.update=function(a,b,c,d,e,f){a=d?a:this.T+a;e=u(e)?e:"::";d=(d=this.c(a,h))?d.split(e):[];t(f)&&d.length>=f&&d.splice(0,d.length-f+1);d.push(b);this.create(a,d.join(e),c,h)};
l.c=function(a,b){var a=b?a:this.T+a,c=(T.f()?T:S).c(a);if(!c&&T.f()&&(c=S.c(a))&&S.c("_cb_ls")){this.la=h;var d;switch(a){case "_SUPERFLY_nosample":d=600;break;case "_chartbeat4":d=3600;break;case "_cb_cp":d=3600;break;case "_chartbeat3":d=2592E3;break;default:d=94608E3}T.create(a,c,d)}return c};l.remove=function(a,b){a=b?a:this.T+a;(T.f()?T:S).remove(a);T.f()&&S.remove(a)};var U=function(){var a,b;p(["","moz","o","ms","webkit"],function(c){a=(c+"Hidden").charAt(0).toLowerCase()+(c+"Hidden").slice(1);if(typeof document[a]==="boolean")return b=c,k});var c={};if(b!==g)c.za=a,c.qa=(b+"VisibilityState").charAt(0).toLowerCase()+(b+"VisibilityState").slice(1),c.Z=b+"visibilitychange";return c}();
U.d=function(){if(!U.D)U.P=U.Ia(),U.Z&&document.addEventListener&&document.addEventListener(U.Z,U.lb,k),U.wa("focus","onfocusin",U.ha),U.wa("blur","onfocusout",U.Ha),U.P&&U.ha(),U.D=h};U.tb=function(){return U.P};U.ha=function(){U.P=h;E("focus")};U.Ha=function(){U.P=k;E("blur")};U.wa=function(a,b,c){m.addEventListener?m.addEventListener(a,c,k):document.attachEvent&&document.attachEvent(b,c)};
U.Ia=function(){var a=h;document.hasFocus&&(a=document.hasFocus());var b=k;U.za&&(b=document[U.za]);return a&&!b};U.lb=function(){U.Ia()?U.ha():U.Ha()};function La(a){var b=i;if(a&&(b=Ma()))return b;var c=m.location,b=V(c.pathname),a=c.search||"",a=a.replace(/PHPSESSID=[^&]+/,""),d=/&utm_[^=]+=[^&]+/ig;(c=d.exec(c.search))&&(a=a.replace(d,""));d=/\?utm_[^=]+=[^&]+(.*)/i;(c=d.exec(a))&&(a=a.replace(d,c[1]!=""?"?"+c[1]:""));return b+a}function Ma(){var a=i;p(document.getElementsByTagName("link"),function(b){if(b.rel=="canonical")return b=Ea(b.href),a=V(b.pathname)+b.search+b.hash,k});return a}
for(var Na={},Oa=0;Oa<81;Oa++)Na["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@[]".charCodeAt(Oa)]=h;function Pa(a,b){if(a==="%")return"%25";var c=parseInt(b,16);return Na[c]?String.fromCharCode(c):"%"+b.toUpperCase()}function V(a){if(!u(a))return a;a=a.replace(/%([0-9A-Fa-f]{2})?/g,Pa);return a=a.replace(/[^0-9A-Za-z\-._~!$&'()*+,;=:@\/\[\]?#%]+/g,encodeURIComponent)};function n(){this.a=m._sf_async_config||{};this.va=r(this.kb,this);this.q=[];this.e=new Ia(this.La);this.u=k;this.h=new wa;this.ia=r(this.G,this);s(m,"unload",this.ia);Qa(this)||this.d()}function Qa(a){if(U.qa&&document[U.qa]==="prerender"){a.u=h;var b=r(function(){if(this.u&&document[U.qa]!=="prerender")this.u=k,this.d(),W(this),window.setTimeout(function(){document.removeEventListener(U.Z,b,k)},100)},a);document.addEventListener(U.Z,b,k);return h}return k}l=n.prototype;
l.d=function(){this.ea=this.m=0;this.I=y();this.U=ca(Ra(this));this.v=h;this.Ea=72E5;var a=+this.a.sessionLength;if(!isNaN(a)&&this.La!=="_p_")this.Ea=a*6E4;this.h.d();P.d();F.d();U.d();this.l=0;this.Pa=C("activity",this.ga,this)};function W(a){if(!a.e.c("_SUPERFLY_nosample")&&!a.u)a.hb?a.ka():(a.hb=h,!m._sf_async_config&&!m._cbq?(a.R=r(a.ka,a),s(m,"load",a.R)):a.ka())}l.ka=function(){var a=m._sf_startpt,b=m._sf_endpt;if(t(a))this.S=t(b)?b-a:y()-a;F.d();this.gb=setInterval(r(this.Fa,this),15E3);this.Fa()};
l.Fa=function(){var a=this.h.t,a=this.a.reading&&+this.a.reading||a>0;this.ea<this.m&&!a?this.ea++:(a?this.m=0:Sa(this),this.ea=0,this.q.push(0),this.q.length>18&&this.q.shift(),y()-this.I>=this.Ea?this.terminate():this.H())};function Ta(a,b){if(!a.u){var c;c=new Image(1,1);c.onerror=a.va;c.src=b}}l.kb=function(){this.q.push(1);var a=0;p(this.q,function(b){a+=b});a<3?(this.v=h,Sa(this)):(this.terminate(),this.e.create("_SUPERFLY_nosample","1",600))};l.G=function(){};
l.ga=function(){var a=X(this);this.l=Math.max(this.l,a)};function X(a){return J("Y","Top",!!a.a.scrollElement)}function Sa(a){var b=a.m,b=b?Math.min(b*2,16):1;a.m=b}l.Y=function(a,b){if(!this.u)this.G(),this.terminate(),this.L=m.location.protocol+"//"+this.a.domain+this.a.path,this.a.path=V(a),b&&(this.a.title=b),this.d(),W(this)};function Ua(a){if(a.L)return h;a=(document.referrer||"").indexOf("://"+m.location.host+"/");return a!=-1&&a<9}
function Va(a){a=a.L;if(!a&&(a=document.referrer||"")){var b=Ea(a);if(b.protocol==="http:"||b.protocol==="https:")b.pathname=V(b.pathname),a=Fa(b)}return encodeURIComponent(a)}function Wa(a){a=a.a.title.slice(0,100);return encodeURIComponent(a)}
function Ra(a){var b=m.navigator,c=m.window.screen,d=[b.userAgent,b.platform,(new Date).getTimezoneOffset(),c.width+c.height+c.colorDepth];p(b.plugins,function(a){d.push(a.name+a.description+a.filename+a[0].type)});b=m.performance;d=d.concat([b&&b.now?b.now():"",Va(a),document.title,m.location.href,y(),ra("Width"),L(),ba()]);return d.join()}function Xa(a){var b="",c=a.e.c("_chartbeat4");c&&(p(c.split("::"),function(a){b+="&z="+encodeURIComponent(a)}),a.e.remove("_chartbeat4"));return b}
function Ya(a){var a=(a.e.c("_chartbeat2",h)||"").split("."),b=y(),c=b-+(a[1]||0);b-=+(a[2]||0);return a[0]&&c>18E5&&b<2592E6?0:1}l.terminate=function(){this.h.terminate();D(this.Pa);this.R!==g&&fa("load",this.R);clearInterval(this.gb)};l.p=function(){this.terminate();fa("unload",this.ia);this.ia=this.R=this.e=this.q=this.va=this.a=i;this.h.p();this.h=i};function Y(){this.i=[];this.ja=[];"postMessage"in window&&s(window,"message",r(this.eb,this));this.La="_p_";this.ub=i;s(m,"beforeunload",r(this.jb,this));n.call(this)}aa(Y);var Za=0;l=Y.prototype;
l.d=function(){Y.V.d.call(this);var a=m.location;Q(this.a,"pingServer","ping.chartbeat.net");Q(this.a,"endServer","edge01.chartbeat.net");Q(this.a,"title",document.title);Q(this.a,"domain",a.host);Q(this.a,"path",La(!!this.a.useCanonical));Q(this.a,"engaged",k);a=m.location.search||"";if(a.match(na))a=Ba(a).__cb_debug,Za=parseInt(a,10);this.N=this.a.adIdentifier||"data-cb-ad-id";this.a.domain=ea(this.a.domain);this.fa=Ya(this);this.k=this.e.c("_chartbeat2",h);this.r=this.Ba=0;this.Ya=function(){var a=
y()-this.Ba;a<250?(this.r&&m.clearTimeout(this.r),this.r=m.setTimeout(r(this.H,this),a)):this.v||this.H()};this.Xa=C("forcePing",this.Ya,this);if(!this.k)this.a.utoken?this.k=this.a.utoken:(this.k=ca(Ra(this),3),this.a.utoken=this.k);this.k=this.k.split(".")[0];$a(this);ab(this);if((a=this.a.engagedAdFilters)&&a.length){this.a.engagedAdFilters=[];var b=this;p(a,function(a){b.M(a)})}this.Wa=C("adEngaged",this.Va,this);this.ja=[]};l.jb=function(){this.H(h)};
l.G=function(){this.e.update("_chartbeat4",["t="+this.U,"E="+this.h.total(),"ad="+ha(bb(this)),"x="+X(this),"c="+Math.round((y()-this.I)/600)/100,"y="+L(),"w="+K()].join("&"),3600)};
function bb(a){var b=[];p(a.i.concat(a.ja),function(a){var a=a.s?a.s():a,d=encodeURIComponent(a.id),e=a.engagedSeconds,f=a.positionLeft,j=a.positionTop,q=a.width,o=a.height,x=encodeURIComponent(a.creativeId||""),A=encodeURIComponent(a.campaignId||""),I=encodeURIComponent(a.placementId||""),w=encodeURIComponent(a.siteId||""),G=encodeURIComponent(a.server_height||""),O=encodeURIComponent(a.server_width||""),z=encodeURIComponent(a.lineId||""),v=a.order,jb=a.refreshed||"0",kb=a.viewable?"1":"0";a.exclude&&
(A="");b.push(d+"="+[e,f,j,q,o,A,x,v+"."+jb,kb,I,w,G,O,z].join("::"))});return b.join("&")}
l.H=function(a){this.Ba=y();var b=this.a,c=X(this);this.l=Math.max(this.l,c);this.r&&m.clearTimeout(this.r);var d="",e="";if(this.v)this.v=k,d=(Ua(this)?"&v=":"&r=")+Va(this),this.L&&(d+="&vp=1"),e="&i="+Wa(this);var f=this.S?"&b="+this.S:"";La(!!b.useCanonical);var j=!b.noCookies&&this.e.isSupported();Ta(this,"https://"+(a?b.endServer:b.pingServer)+"/ping/ad?h="+encodeURIComponent("ads."+b.domain)+"&p="+encodeURIComponent(b.path)+"&u="+this.k+"&d="+ha(ea(m.location.host))+"&g="+b.uid+R(b,0,"sections")+
R(b,1,"authors")+R(b,2,"zone")+R(b,3,"sponsorName")+R(b,4,"type")+(j?"&n="+this.fa:"&nc=1")+"&c="+Math.round((y()-this.I)/600)/100+"&x="+c+"&m="+this.l+"&y="+L()+"&o="+ra("Width")+"&w="+K()+"&j="+(a?0:Math.round((this.m+2)*15E3/1E3))+"&E="+this.h.total()+d+f+"&t="+this.U+"&V=37"+e+"&tz="+(new Date).getTimezoneOffset()+(Ka(this.e)?"&l=1":"")+Ha(b)+"&ad="+ha(bb(this))+(a?"":Xa(this))+(a?"&zz=1":"")+"&_")};function cb(a){a=oa(a.N,"div");return ja(a,function(a){a=M(a);return a.height>1&&a.width>1})}
function $a(a){var b=cb(a);p(b,function(b){if(!db(a,b)){var d=new xa(b,Za);a.i.push(d);d.X();if(b=H("data-cb-engaged-seconds",b))d=d.s(h),d.engagedSeconds=parseInt(b,10),a.M(d)}});eb(a)}function eb(a){var b=[];p(a.i,function(a){ta(a.g)?b.push(a):a.p()});a.i=b}function db(a,b){var c=k;p(a.i,function(a){if(a.g===b)return c=h,k});return c}l.X=function(){p(this.i,function(a){a.X()})};l.ga=function(){Y.V.ga.call(this);$a(this)};l.eb=function(a){this.Ca(ka(a.data),a.source)};
l.Ca=function(a,b){if(a.cbType!=="campaignMessage")return k;var c=b;if(c.parent!=window){for(var d=0;c.parent!=window&&d<10;)c=c.parent,d++;if(d>=10)return k}$a(this);var d=document.getElementsByTagName("iframe"),e=g;p(d,function(a){if(a.contentWindow===c)return e=a,k});if(!e)return k;var f=e.getAttribute(this.N);if(f===i){d=pa(e,this.N);if(d===k)return k;f=d.getAttribute(this.N)}var j=g;p(this.i,function(a){if(f===a.A)return j=a,k});if(j===g)return k;Aa(j,a,h);if(a.exclude)j.ba=h;if(a.engagedSeconds)d=
{id:j.A},d.campaignId=a.campaignId,d.creativeId=a.creativeId,d.engagedSeconds=parseInt(a.engagedSeconds,10),this.M(d);"postMessage"in b&&b.postMessage("cbdata::ack","*");return h};l.Y=function(){this.G();this.terminate();this.L=m.location.protocol+"//"+this.a.domain+this.a.path};
l.M=function(a){if(a&&t(a.engagedSeconds)&&!isNaN(a.engagedSeconds)){var b=this.a.engagedAdFilters;if(!b||b.length===g)this.a.engagedAdFilters=[],b=this.a.engagedAdFilters;var c={};c.engagedSeconds=a.engagedSeconds;p(["id","campaignId","creativeId"],function(b){u(a[b])&&(c[b]=a[b])});var d=k;p(b,function(a){d=ia(a,c);return!d});d||b.push(c)}};
l.Va=function(a,b){var c=this.a.engagedAdCallback;if(c){var d=this.a.engagedAdFilters;if(d&&d.length&&a){var e=a.engagedSeconds;p(d,function(d){if(d.engagedSeconds===e){var j=h;p(d,function(b,c){return j=b===a[c]});if(j)return a.element=b,c(a,e),k}})}}};l.mb=function(a){if(a){var b;p(this.i,function(c){if(c.A===a||c.g===a)return b=c,k});if(b){var c=b.s();c.refreshed="1";this.ja.push(c);b.reset()}}};
function ab(a){if(Za===1){var b=document.createElement("div");b.setAttribute("style","position:fixed; left:0; right:0 ;top:0 ;bottom:0; background-color: rgba(0, 0, 0, 0.3); z-index:1000;");document.body.appendChild(b);var c=document.createElement("div");document.body.appendChild(c);var d=a.a;p(["sections","zone","sponsorName","type"],function(a){if(d[a]!==g){var b=document.createElement("div");b.textContent=a+": "+d[a];c.appendChild(b)}});c.children.length&&(a="background-color: #F1F7FB; z-index: 9000000; position: fixed;padding: 10px; border-radius: 5px; font-size: 12px;color: #658BA1; border: 1px solid #C8DAE8;font-family: 'Proxima-Nova','Helvetica Neue',Helvetica,Arial,sans-serif;top: "+
Math.round(K()*0.9)+"px;left: "+Math.round(qa("Width")*0.45)+"px;",c.setAttribute("style",a))}}l.terminate=function(){D(this.Xa);D(this.Wa);p(this.i,function(a){a.p()});this.i=[];m.clearTimeout(this.r);Y.V.terminate.call(this)};if(!m.pSUPERFLY_pub){var fb=new Y;m.pSUPERFLY_pub=fb;Y.prototype.virtualPage=Y.prototype.Y;Y.prototype.addEngagedAdFilter=Y.prototype.M;Y.prototype.refreshAd=Y.prototype.mb;Y.prototype.updateCampaignData=Y.prototype.X;if("postMessage"in window!==h)Y.prototype.loadCampaign=Y.prototype.Ca;W(fb)};function gb(){var a=document.createElement("script");a.async=h;a.src=(m.location.protocol||"http:")+"//static.chartbeat.com/js/inpage.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}function hb(a){if(/[\/|\.]chartbeat\.com$/.test(a.origin)){var b=T.f(h),c=String(a.data);b&&c.indexOf("_cb_ip")==0&&(b.setItem("_cb_ip","1"),a.source.postMessage(1,a.origin),gb())}};function Z(){n.call(this);for(var a=r(this.Ja,this),b=m._cbq||[];b.length;)a(b.shift());m._cbq={push:a};C("anchor",this.ib,this);"postMessage"in window&&s(m,"message",r(this.cb,this))}aa(Z);l=Z.prototype;
l.d=function(){Z.V.d.call(this);this.$=i;Ga(this.a);var a=m.location;Q(this.a,"pingServer","ping.chartbeat.net");Q(this.a,"title",document.title);Q(this.a,"domain",a.host);this.a.path=this.a.path?V(this.a.path):La(!!this.a.useCanonical);this.da=ea(a.host);this.a.domain=ea(this.a.domain);a=(this.e.c("_chartbeat2",h)||"").split(".");a.length>4&&(a=[]);var b=y(),c,d="1",e=a&&+a[2];c=a&&a[3];if(a&&e&&c)if(d=Math.abs((ga(b)-ga(e))/864E5)){d=Math.min(d,16)-1;for(e="";d--;)e+=0;d=(c+e+"1").slice(-16)}else d=
c;c=d;this.fa=Ya(this);a[0]||(a[0]=this.a.utoken||ca(Ra(this),3),a[1]=b);a[2]=b;a[3]=c;this.pa=a[0];this.k=a.join(".");this.e.create("_chartbeat2",this.k,94608E3,h);this.a.utoken=this.pa;var f;b=+a[1];c=+a[2];if((a=a[3])&&b&&c)f=(Math.min((Math.abs((ga(c)-ga(b))/864E5)||0)+1,16,a.length)-1).toString(16),f+=("0000"+parseInt(a,2).toString(16)).slice(-4);this.xa=f};l.Oa=function(a){this.$=a};
l.G=function(){this.e.update("_chartbeat4",["t="+this.U,"E="+this.h.total(),"x="+X(this),"c="+Math.round((y()-this.I)/600)/100,"y="+L(),"w="+K()].join("&"),3600)};
l.H=function(){var a=this.a,b=X(this);this.l=Math.max(this.l,b);var c=Math.round((y()-this.I)/600)/100,d=0,e=0,f=0,j=this.h.t;F.Qa()?e=1:this.a.reading&&+this.a.reading||j>0||c<0.09?d=1:f=1;var q="",o="",x="",A="",I="",w=Ua(this);if(this.v){this.v=k;var q=(w?"&v=":"&r=")+Va(this),o="&i="+Wa(this),G=this.a.hudTrackable;G!==g&&(x="&L="+(G?"1":"0"));if(w&&(w=ib(this)))q="&v="+encodeURIComponent(w.path),A="&K="+w.left+"::"+w.top,w.Ga>1&&(A+="&l1="+w.Ga);a.alias&&(I="&PA="+encodeURIComponent(a.alias));
this.L&&(q+="&vp=1")}w=this.S?"&b="+this.S:"";G=this.$?"&A="+this.$:"";Ta(this,(m.location.protocol||"http:")+"//"+a.pingServer+"/ping?h="+encodeURIComponent(a.domain)+"&p="+encodeURIComponent(a.path)+"&u="+this.pa+"&d="+encodeURIComponent(this.da)+"&g="+a.uid+R(a,0,"sections")+R(a,1,"authors")+R(a,3,"sponsorName")+R(a,4,"type")+(!a.noCookies&&this.e.isSupported()?"&n="+this.fa:"&nc=1")+(this.xa?"&f="+this.xa:"")+"&c="+c+"&x="+b+"&m="+this.l+"&y="+L()+"&o="+ra("Width")+"&w="+K()+"&j="+Math.round((this.m+
2)*15E3/1E3)+"&R="+d+"&W="+e+"&I="+f+"&E="+this.h.total()+"&e="+j+q+A+I+w+G+Ca("C","utm_campaign",a.campaignTag)+Ca("M","utm_medium",a.mediumTag)+"&t="+this.U+"&V=37"+Xa(this)+o+x+"&tz="+(new Date).getTimezoneOffset()+(Ka(this.e)?"&l=1":"")+Ha(a)+"&_")};
l.cb=function(a){var b=this.a;if(a.origin==="http://"+(b.playerdomain||this.da)){var c=a.data;u(c)&&c.indexOf("cbqpush::")===0?(a=c.split("::"),a.length==3&&(a=a.slice(1),a[0].indexOf("_")===0&&this.Ja(a))):c=="cbdata?"&&(b="domain="+encodeURIComponent(b.domain)+"&path="+encodeURIComponent(b.path)+"&title="+Wa(this)+"&referrer="+Va(this)+"&internal="+(Ua(this)?"1":"0")+"&subdomain="+encodeURIComponent(this.da)+"&utoken="+this.pa,a.source.postMessage(b,"*"))}};
l.Ja=function(a){this.a[a[0]]=a[1];this.m=0};function lb(a){a=a.replace(/-{2,}/g,"-");a=Ea(a);a.pathname=V(a.pathname);return a}l.ib=function(a){var b=a.href||"",b=lb(b);b.hostname!==m.location.hostname||b.protocol.indexOf("http")!==0||(b=Fa(b),a=va(a,g,h),this.e.update("_chartbeat5",[a.x,a.y,encodeURIComponent(this.a.path),encodeURIComponent(b)].join(","),60,k,g,5))};
function ib(a){var b=a.e.c("_chartbeat5");if(!b)return i;var b=b.split("::"),c=b.length,d,e;if(c===1)d=b[0].split(","),e=0;else{var f,j=lb(m.location.href),q=Fa(j);p(b,function(a,b){var c=a.split(","),j=la(q,decodeURIComponent(c[3]));if(j===0)return d=c,e=b,k;if(f===g||j<f)f=j,d=c,e=b})}b.splice(e,1);a.e.create("_chartbeat5",b.join("::"),60);return{left:d[0],top:d[1],path:decodeURIComponent(d[2]),Ga:c}};if(!m.pSUPERFLY){var mb=new Z;m.pSUPERFLY=mb;Z.prototype.virtualPage=Z.prototype.Y;Z.prototype.activity=Z.prototype.Oa;var $=m.pSUPERFLY_pub;$&&$.virtualPage&&(Z.prototype.virtualPage=function(){var a=arguments.length?Array.prototype.slice.call(arguments,0):[];$.virtualPage();Z.prototype.Y.apply(mb,a);$.d();W($)});$&&$.addEngagedAdFilter&&(Z.prototype.addEngagedAdFilter=r($.addEngagedAdFilter,$));$&&$.refreshAd&&(Z.prototype.refreshAd=r($.refreshAd,$));W(mb);var nb=T.f(h);if(nb){s(m,"message",hb);
var ob;if(ob=nb.getItem("_cb_ip")){var pb=m.location;ob=!(!/^([^.]+[.])?chartbeat\.com$/.test(pb.hostname)?0:/^\/publishing\/(overlay|hud|mab)\//.test(pb.pathname))}ob&&gb()}};})();
