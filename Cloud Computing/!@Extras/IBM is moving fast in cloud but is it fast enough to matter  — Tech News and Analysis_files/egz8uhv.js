/*
 * For font license information, see the CSS file loaded by this JavaScript.
 */
if(!window.Typekit)window.Typekit={};window.Typekit.config={"c":[".tk-proxima-nova","\"proxima-nova\",sans-serif"],"f":"//use.typekit.net/c/42a4ac/1w;proxima-nova,2,b61:R:i7,b5t:R:n3/{format}{/extras*}?3bb2a6e53c9684ffdc9a9bf1195b2a62fdf9449cb1c3f2f840a87bcb36fd1b6214d73203a7b4047dd607cec838996a18935e597b46318ad249f5aefc001fd3d0e381784f04b3eb7a35cc947ea5191ca15d2815149596ecac704939db8d216c93f3762f80cdd1564c87bd4481d82af9723424ee3753803950101c7ed27f07c3e2c0cf516522d1828ed9abcf33c886632d224c9abc856590a88af3b43464e05400ae24b9f3efd73115f5251ea147","fn":["proxima-nova",["i7","n3"]],"k":"//use.typekit.net/{id}.js","p":"//p.typekit.net/p.gif?s=1&k=egz8uhv&ht=tk&h={host}&f=140.5474&a=16821&_={_}","w":"egz8uhv"};
/*{"k":"1.10.1","created":"2014-11-18 10:28:49 UTC"}*/
;(function(window,document,undefined){
var j=!0,k=null,l=!1;function m(a){return function(){return this[a]}}var aa=this;function ba(a,b){var c=a.split("."),d=aa;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&void 0!==b?d[e]=b:d=d[e]?d[e]:d[e]={}}function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function n(a,b,c){n=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return n.apply(k,arguments)}var ea=Date.now||function(){return+new Date};
function fa(a,b){this.ca=a;this.V=b||a;this.J=this.V.document}fa.prototype.createElement=function(a,b,c){a=this.J.createElement(a);if(b)for(var d in b)b.hasOwnProperty(d)&&("style"==d?a.style.cssText=b[d]:a.setAttribute(d,b[d]));c&&a.appendChild(this.J.createTextNode(c));return a};function ga(a,b,c){a=a.J.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}function ha(a,b){function c(){a.J.body?b():setTimeout(c,0)}c()}
function q(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=l,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=j;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=l;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=j;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ia(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return j;return l}
function ja(a){var b=a.V.location.protocol;"about:"==b&&(b=a.ca.location.protocol);return"https:"===("https:"==b?"https:":"http:")}
function ka(a,b,c){var d=a.J.getElementsByTagName("head")[0];if(d){var e=a.createElement("script",{src:b}),f=l;e.onload=e.onreadystatechange=function(){if(!f&&(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState))f=j,c&&c(k),e.onload=e.onreadystatechange=k,"HEAD"==e.parentNode.tagName&&d.removeChild(e)};d.appendChild(e);window.setTimeout(function(){f||(f=j,c&&c(Error("Script load timeout")))},5E3)}}function r(a,b,c){this.Ua=a;this.fa=b;this.Ta=c}
ba("internalWebfont.BrowserInfo",r);r.prototype.Ia=m("Ua");r.prototype.hasWebFontSupport=r.prototype.Ia;r.prototype.Ja=m("fa");r.prototype.hasWebKitFallbackBug=r.prototype.Ja;r.prototype.Ka=m("Ta");r.prototype.hasWebKitMetricsBug=r.prototype.Ka;function s(a,b,c,d){this.g=a!=k?a:k;this.o=b!=k?b:k;this.H=c!=k?c:k;this.m=d!=k?d:k}var la=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
function t(a,b){return a.g>b.g||a.g===b.g&&a.o>b.o||a.g===b.g&&a.o===b.o&&a.H>b.H?1:a.g<b.g||a.g===b.g&&a.o<b.o||a.g===b.g&&a.o===b.o&&a.H<b.H?-1:0}function u(a,b){return 0===t(a,b)||1===t(a,b)}s.prototype.toString=function(){return[this.g,this.o||"",this.H||"",this.m||""].join("")};
function v(a){a=la.exec(a);var b=k,c=k,d=k,e=k;a&&(a[1]!==k&&a[1]&&(b=parseInt(a[1],10)),a[2]!==k&&a[2]&&(c=parseInt(a[2],10)),a[3]!==k&&a[3]&&(d=parseInt(a[3],10)),a[4]!==k&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new s(b,c,d,e)}function w(a,b,c,d,e,f,g,h,p,K,L){this.W=a;this.z=b;this.Sa=c;this.D=d;this.S=e;this.ya=f;this.n=g;this.l=h;this.Oa=p;this.R=K;this.B=L}ba("internalWebfont.UserAgent",w);w.prototype.getName=m("W");w.prototype.getName=w.prototype.getName;
w.prototype.Ha=m("Sa");w.prototype.getVersion=w.prototype.Ha;w.prototype.Da=m("D");w.prototype.getEngine=w.prototype.Da;w.prototype.Ea=m("ya");w.prototype.getEngineVersion=w.prototype.Ea;w.prototype.Fa=m("n");w.prototype.getPlatform=w.prototype.Fa;w.prototype.Ga=m("Oa");w.prototype.getPlatformVersion=w.prototype.Ga;w.prototype.Ca=m("R");w.prototype.getDocumentMode=w.prototype.Ca;w.prototype.Ba=m("B");w.prototype.getBrowserInfo=w.prototype.Ba;function ma(a,b){this.e=a;this.Q=b}
var na=new w("Unknown",new s,"Unknown","Unknown",new s,"Unknown","Unknown",new s,"Unknown",void 0,new r(l,l,l));
ma.prototype.parse=function(){var a;if(-1!=this.e.indexOf("MSIE")||-1!=this.e.indexOf("Trident/")){a=x(this);var b=y(this),c=v(b),d=k,e=k,f=k,g=k,h=B(this.e,/Trident\/([\d\w\.]+)/,1),p=C(this.Q),d=-1!=this.e.indexOf("MSIE")?B(this.e,/MSIE ([\d\w\.]+)/,1):B(this.e,/rv:([\d\w\.]+)/,1),e=v(d);""!=h?(f="Trident",g=v(h)):(f="Unknown",g=new s,h="Unknown");a=new w("MSIE",e,d,f,g,h,a,c,b,p,new r("Windows"==a&&6<=e.g||"Windows Phone"==a&&8<=c.g,l,l))}else if(-1!=this.e.indexOf("Opera"))a:if(a="Unknown",b=
B(this.e,/Presto\/([\d\w\.]+)/,1),c=v(b),d=y(this),e=v(d),f=C(this.Q),c.g!==k?a="Presto":(-1!=this.e.indexOf("Gecko")&&(a="Gecko"),b=B(this.e,/rv:([^\)]+)/,1),c=v(b)),-1!=this.e.indexOf("Opera Mini/"))g=B(this.e,/Opera Mini\/([\d\.]+)/,1),h=v(g),a=new w("OperaMini",h,g,a,c,b,x(this),e,d,f,new r(l,l,l));else{if(-1!=this.e.indexOf("Version/")&&(g=B(this.e,/Version\/([\d\.]+)/,1),h=v(g),h.g!==k)){a=new w("Opera",h,g,a,c,b,x(this),e,d,f,new r(10<=h.g,l,l));break a}g=B(this.e,/Opera[\/ ]([\d\.]+)/,1);
h=v(g);a=h.g!==k?new w("Opera",h,g,a,c,b,x(this),e,d,f,new r(10<=h.g,l,l)):new w("Opera",new s,"Unknown",a,c,b,x(this),e,d,f,new r(l,l,l))}else/OPR\/[\d.]+/.test(this.e)?a=qa(this):/AppleWeb(K|k)it/.test(this.e)?a=qa(this):-1!=this.e.indexOf("Gecko")?(a="Unknown",b=new s,c="Unknown",d=y(this),e=v(d),f=l,-1!=this.e.indexOf("Firefox")?(a="Firefox",c=B(this.e,/Firefox\/([\d\w\.]+)/,1),b=v(c),f=3<=b.g&&5<=b.o):-1!=this.e.indexOf("Mozilla")&&(a="Mozilla"),g=B(this.e,/rv:([^\)]+)/,1),h=v(g),f||(f=1<h.g||
1==h.g&&9<h.o||1==h.g&&9==h.o&&2<=h.H||g.match(/1\.9\.1b[123]/)!=k||g.match(/1\.9\.1\.[\d\.]+/)!=k),a=new w(a,b,c,"Gecko",h,g,x(this),e,d,C(this.Q),new r(f,l,l))):a=na;return a};function x(a){var b=B(a.e,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=B(a.e,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/,1);return""!=a?("Mac_PowerPC"==a?a="Macintosh":"PlayStation"==a&&(a="Linux"),a):"Unknown"}
function y(a){var b=B(a.e,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=B(a.e,/Windows Phone( OS)? ([^;)]+)/,2))||(b=B(a.e,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=B(a.e,/(?:Linux|CrOS|CrKey) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=B(a.e,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}
function qa(a){var b=x(a),c=y(a),d=v(c),e=B(a.e,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1),f=v(e),g="Unknown",h=new s,p="Unknown",K=l;/OPR\/[\d.]+/.test(a.e)?g="Opera":-1!=a.e.indexOf("Chrome")||-1!=a.e.indexOf("CrMo")||-1!=a.e.indexOf("CriOS")?g="Chrome":/Silk\/\d/.test(a.e)?g="Silk":"BlackBerry"==b||"Android"==b?g="BuiltinBrowser":-1!=a.e.indexOf("PhantomJS")?g="PhantomJS":-1!=a.e.indexOf("Safari")?g="Safari":-1!=a.e.indexOf("AdobeAIR")?g="AdobeAIR":-1!=a.e.indexOf("PlayStation")&&(g="BuiltinBrowser");
"BuiltinBrowser"==g?p="Unknown":"Silk"==g?p=B(a.e,/Silk\/([\d\._]+)/,1):"Chrome"==g?p=B(a.e,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=a.e.indexOf("Version/")?p=B(a.e,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==g?p=B(a.e,/AdobeAIR\/([\d\.]+)/,1):"Opera"==g?p=B(a.e,/OPR\/([\d.]+)/,1):"PhantomJS"==g&&(p=B(a.e,/PhantomJS\/([\d.]+)/,1));h=v(p);K="AdobeAIR"==g?2<h.g||2==h.g&&5<=h.o:"BlackBerry"==b?10<=d.g:"Android"==b?2<d.g||2==d.g&&1<d.o:526<=f.g||525<=f.g&&13<=f.o;return new w(g,h,p,"AppleWebKit",f,e,b,d,c,C(a.Q),
new r(K,536>f.g||536==f.g&&11>f.o,"iPhone"==b||"iPad"==b||"iPod"==b||"Macintosh"==b))}function B(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""}function C(a){if(a.documentMode)return a.documentMode}function ra(a){this.Ma=a||"-"}ra.prototype.m=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.Ma)};function sa(a,b,c){this.h=a;this.v=b;this.$=c;this.r="wf";this.q=new ra("-")}
function ta(a){var b=ia(a.v,a.q.m(a.r,"active")),c=[],d=[a.q.m(a.r,"loading")];b||c.push(a.q.m(a.r,"inactive"));q(a.v,c,d);D(a,"inactive")}function D(a,b,c){if(a.$[b])if(c)a.$[b](c.getName(),E(c));else a.$[b]()}function F(a,b){this.W=a;this.ga=4;this.X="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.X=c[1],this.ga=parseInt(c[2],10))}F.prototype.getName=m("W");function E(a){return a.X+a.ga}function G(a,b){this.h=a;this.N=b;this.A=this.h.createElement("span",{"aria-hidden":"true"},this.N)}
function ua(a){ga(a.h,"body",a.A)}
function va(a){for(var b=[],c=a.W.split(/,\s*/),d=0;d<c.length;d++){var e=c[d].replace(/['"]/g,"");-1==e.indexOf(" ")?b.push(e):b.push("'"+e+"'")}b="display:block;position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+b.join(",")+";";c="normal";d=a.ga+"00";"o"===a.X?c="oblique":"i"===a.X&&(c="italic");return b+("font-style:"+c+";font-weight:"+d+";")}
G.prototype.remove=function(){var a=this.A;a.parentNode&&a.parentNode.removeChild(a)};function wa(a,b,c,d,e,f,g,h){this.ha=a;this.La=b;this.h=c;this.C=d;this.N=h||"BESbswy";this.B=e;this.O={};this.da=f||5E3;this.ra=g||k;this.M=this.L=k;a=new G(this.h,this.N);ua(a);for(var p in I)I.hasOwnProperty(p)&&(b=new F(I[p],E(this.C)),b=va(b),a.A.style.cssText=b,this.O[I[p]]=a.A.offsetWidth);a.remove()}var I={bb:"serif",ab:"sans-serif",Xa:"monospace"};
wa.prototype.start=function(){this.L=new G(this.h,this.N);ua(this.L);this.M=new G(this.h,this.N);ua(this.M);this.Qa=ea();var a=new F(this.C.getName()+",serif",E(this.C)),a=va(a);this.L.A.style.cssText=a;a=new F(this.C.getName()+",sans-serif",E(this.C));a=va(a);this.M.A.style.cssText=a;xa(this)};function ya(a,b,c){for(var d in I)if(I.hasOwnProperty(d)&&b===a.O[I[d]]&&c===a.O[I[d]])return j;return l}
function xa(a){var b=a.L.A.offsetWidth,c=a.M.A.offsetWidth;b===a.O.serif&&c===a.O["sans-serif"]||a.B.fa&&ya(a,b,c)?ea()-a.Qa>=a.da?a.B.fa&&ya(a,b,c)&&(a.ra===k||a.ra.hasOwnProperty(a.C.getName()))?za(a,a.ha):za(a,a.La):setTimeout(n(function(){xa(this)},a),25):za(a,a.ha)}function za(a,b){a.L.remove();a.M.remove();b(a.C)}function J(a,b,c,d){this.h=b;this.F=c;this.ba=0;this.va=this.qa=l;this.da=d;this.B=a.B}
J.prototype.ea=function(a,b,c,d){if(0===a.length&&d)ta(this.F);else{this.ba+=a.length;d&&(this.qa=d);for(d=0;d<a.length;d++){var e=a[d],f=b[e.getName()],g=this.F,h=e;q(g.v,[g.q.m(g.r,h.getName(),E(h).toString(),"loading")]);D(g,"fontloading",h);(new wa(n(this.za,this),n(this.Aa,this),this.h,e,this.B,this.da,c,f)).start()}}};
J.prototype.za=function(a){var b=this.F;q(b.v,[b.q.m(b.r,a.getName(),E(a).toString(),"active")],[b.q.m(b.r,a.getName(),E(a).toString(),"loading"),b.q.m(b.r,a.getName(),E(a).toString(),"inactive")]);D(b,"fontactive",a);this.va=j;Aa(this)};J.prototype.Aa=function(a){var b=this.F,c=ia(b.v,b.q.m(b.r,a.getName(),E(a).toString(),"active")),d=[],e=[b.q.m(b.r,a.getName(),E(a).toString(),"loading")];c||d.push(b.q.m(b.r,a.getName(),E(a).toString(),"inactive"));q(b.v,d,e);D(b,"fontinactive",a);Aa(this)};
function Aa(a){0==--a.ba&&a.qa&&(a.va?(a=a.F,q(a.v,[a.q.m(a.r,"active")],[a.q.m(a.r,"loading"),a.q.m(a.r,"inactive")]),D(a,"active")):ta(a.F))}function Ba(){var a=[{name:"font-family",value:M.c[i+1]}];this.Pa=[M.c[i]];this.ka=a}function Ca(a){for(var b=a.Pa.join(","),c=[],d=0;d<a.ka.length;d++){var e=a.ka[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"}function Da(a){this.h=a}Da.prototype.toString=function(){return encodeURIComponent(this.h.V.location.hostname||this.h.ca.location.hostname)};
function Ea(a,b){this.s=a;this.u=b}Ea.prototype.toString=function(){for(var a=[],b=0;b<this.u.length;b++)for(var c=this.u[b],d=c.G(),c=c.G(this.s),e=0;e<d.length;e++){var f;a:{for(f=0;f<c.length;f++)if(d[e]===c[f]){f=j;break a}f=l}a.push(f?1:0)}a=a.join("");a=a.replace(/^0+/,"");b=[];for(d=a.length;0<d;d-=4)c=a.slice(0>d-4?0:d-4,d),b.unshift(parseInt(c,2).toString(16));return b.join("")};function N(a){this.Ra=a}
N.prototype.m=function(a,b){var c=b||{},d=this.Ra.replace(/\{\/?([^*}]*)(\*?)\}/g,function(a,b,d){return d&&c[b]?"/"+c[b].join("/"):c[b]||""});d.match(/^\/\//)&&(d=(a?"https:":"http:")+d);return d.replace(/\/*\?*($|\?)/,"$1")};function Fa(a,b,c,d,e){this.K=a;this.T=b;this.eb=c;this.gb=d;this.fb=e;this.ma={};this.la={}}Fa.prototype.G=function(a){return a?(this.ma[a]||this.T).slice(0):this.T.slice(0)};Fa.prototype.ea=function(a,b,c){var d=[],e={};Ga(this,b,d,e);a(d,e,c)};
function Ga(a,b,c,d){c.push(a.K);d[a.K]=a.G(b);a=a.la[b]||[];for(b=0;b<a.length;b++){for(var e=a[b],f=e.K,g=l,h=0;h<c.length;h++)c[h]==f&&(g=j);g||(c.push(f),d[f]=e.G())}}function Ha(a,b){this.K=a;this.T=b}Ha.prototype.G=m("T");function Ia(){this.ia=this.xa=this.I=this.U=this.oa=j}function O(a){return"Windows"===a.n}function P(a){return O(a)&&0===t(a.l,new s(5,1))||O(a)&&0===t(a.l,new s(5,2))||O(a)&&0===t(a.l,new s(6,0))||O(a)&&u(a.l,new s(6,1))}
function Q(a){return"Macintosh"===a.n&&(u(a.l,new s(10,4))||a.l.g===k)}function Ja(a,b){return b.oa&&("iPhone"===a.n||"iPod"===a.n)}function Ka(a,b){return Ja(a,b)&&u(a.l,new s(4,2))&&-1===t(a.l,new s(5))}function La(a,b){return b.U&&"iPad"===a.n&&u(a.l,new s(4,2))&&-1===t(a.l,new s(5))}function R(a,b){return b.I&&"Android"===a.n}function Ma(a,b){return R(a,b)&&u(a.l,new s(2,2))&&-1===t(a.l,new s(3,1))}function Na(a,b){return R(a,b)&&u(a.l,new s(3,1))&&-1===t(a.l,new s(4,1))}
function T(a){return"Linux"===a.n||"Ubuntu"===a.n}function Oa(a){return"Safari"===a.getName()&&"AppleWebKit"===a.D||"Unknown"===a.getName()&&"AppleWebKit"===a.D&&("iPhone"===a.n||"iPad"===a.n||"iPod"===a.n)}function Pa(a){return"Safari"===a.getName()&&"AppleWebKit"===a.D&&u(a.S,new s(525,13))&&-1===t(a.S,new s(534,50))}function Qa(a){return"BuiltinBrowser"===a.getName()}function Ra(a){this.ua=a}function Sa(a,b){return b}
var U={Ya:"a",$a:"b",cb:"d",Wa:"i",Za:"j",Va:"k",NONE:"x"},V={a:function(a,b){return Pa(a)&&P(a)||Qa(a)&&(Ma(a,b)||R(a,b)&&u(a.l,new s(4,1)))||b.I&&"Silk"===a.getName()&&-1===t(a.z,new s(2))&&(Ma(a,b)||Q)||b.I&&"Silk"===a.getName()&&u(a.z,new s(2))&&R(a,b)&&u(a.l,new s(4,1))||Oa(a)&&(La(a,b)||Ka(a,b))||"Chrome"===a.getName()&&u(a.z,new s(6))&&(La(a,b)||Ka(a,b))||"AdobeAIR"===a.getName()&&u(a.z,new s(2,5))&&(O(a)&&a.l.g===k||T(a))},b:function(a){return Pa(a)&&Q(a)||"AdobeAIR"===a.getName()&&u(a.z,
new s(2,5))&&Q(a)},d:function(a,b){return"Chrome"===a.getName()&&u(a.z,new s(6))&&(P(a)||T(a)||Q(a)||R(a,b)||"CrOS"===a.n||"CrKey"===a.n||b.U&&"iPad"===a.n&&u(a.l,new s(5))||Ja(a,b)&&u(a.l,new s(5)))||"Gecko"===a.D&&1===t(a.S,new s(1,9,1))&&(P(a)||T(a)||Q(a)||R(a,b))||"Safari"===a.getName()&&("AppleWebKit"===a.D&&u(a.S,new s(534,50)))&&(P(a)||Q(a))||Oa(a)&&(b.U&&"iPad"===a.n&&u(a.l,new s(5))||Ja(a,b)&&u(a.l,new s(5)))||"Opera"===a.getName()&&u(a.z,new s(11,10))&&(P(a)||T(a)||Q(a)||R(a,b))||"MSIE"===
a.getName()&&9<=a.R&&(O(a)&&u(a.l,new s(6,1))||O(a)&&0===t(a.l,new s(6,0)))||"MSIE"===a.getName()&&b.xa&&"Windows Phone"===a.n&&u(a.l,new s(8))||Qa(a)&&(b.ia&&"BlackBerry"===a.n&&u(a.l,new s(10))||T(a))},j:function(a,b){return Qa(a)&&Na(a,b)||b.I&&"Silk"===a.getName()&&u(a.z,new s(2))&&(Na(a,b)||T(a))},i:function(a){return"MSIE"===a.getName()&&(u(a.z,new s(6,0))&&(void 0===a.R||9>a.R))&&P(a)},x:function(){return l}};
function Ta(a,b){var c=new Ia,d=b||c,e;for(e in U){var f=U[e];if(V[f]&&V[f](a,d))return f}for(e in U)if(f=U[e],V[f]&&V[f](a,c))return"x";return"k"}var Ua={};
Ua.i=new Ra(function(a,b,c){for(var d=0;d<b.length;d+=1){var e=b[d],f=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+e;c.push(new Ha(f,[e]))}a={};for(e=0;e<b.length;e++)c=b[e],d=c.charAt(1),(a[d]||(a[d]=[])).push(c);c=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];d=[];for(e=0;e<c.length;e++)for(var f=c[e],g=0;g<f.length;g++){var h=f[g];if(a[h]){d=d.concat(a[h]);break}}c=d;d={};a=[];for(e=0;e<c.length;e++)f=c[e],d[f]||(d[f]=j,a.push(f));c=[];for(d=0;d<b.length;d++){e=b[d];for(f=0;f<a.length;f++)g=a[f],g==e&&
c.push(g)}return c});var W={};W.a=W.j=W.b=W.d=W.j=function(){return[]};W.i=function(a,b,c){return[new Da(a),new Ea(b,c)]};W.k=function(a){return[new Da(a)]};function X(a){this.h=a;this.s="x";this.Z=this.e=k;this.u=[];this.P=[];this.wa=this.aa=k}X.prototype.supportsConfiguredBrowser=function(){return"x"!==this.s};
X.prototype.init=function(){if(0<this.P.length){for(var a=[],b=0;b<this.P.length;b++)a.push(Ca(this.P[b]));var b=this.h,a=a.join(""),c=this.h.createElement("style");c.setAttribute("type","text/css");c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));ga(b,"head",c)}};
X.prototype.load=function(a,b,c){if(this.s){for(var d=Ua[this.s]||new Ra(Sa),e=0;e<this.u.length;e++){var f=this.u[e],g=this.s,h=d,p=[],K=f.K.split(",")[0].replace(/"|'/g,""),L,A=f.G();L=p;for(var z=void 0,S=[],H={},oa=0;oa<A.length;oa++)z=A[oa],0<z.length&&!H[z]&&(H[z]=j,S.push(z));A=S;L=h.ua?h.ua(K,A,L):A;f.ma[g]=L;f.la[g]=p}if(this.aa){d=W[this.s](this.h,this.s,this.u);e=this.s;f=[];for(g=0;g<d.length;g++)f.push(d[g].toString());d={format:e,extras:f};c&&(d.contextPath=c);d=this.aa.m(ja(this.h),
d);c=this.h;var d=c.createElement("link",{rel:"stylesheet",href:d}),$=l;d.onload=function(){$||($=j)};d.onerror=function(){$||($=j)};ga(c,"head",d)}if(a){var pa=this,fb=this.s;ha(this.h,function(){for(var c=0;c<pa.u.length;c++)pa.u[c].ea(a,fb,b&&c==pa.u.length-1)})}}};X.prototype.collectFontFamilies=function(a,b){if(this.s)for(var c=0;c<this.u.length;c++)Ga(this.u[c],this.s,a,b)};
X.prototype.performOptionalActions=function(){if(this.pa){var a=this,b=this.h;ha(this.h,function(){var c=a.pa;if(c.ta){var d=window.__adobewebfontsappname__,d=d?d.toString().substr(0,20):"",c=c.ta.m(ja(b),{host:encodeURIComponent(b.V.location.hostname||b.ca.location.hostname),app:encodeURIComponent(d),_:(+new Date).toString()}),e=new Image(1,1);e.src=c;e.onload=function(){e.onload=k}}})}};function Va(a,b,c,d){this.Na=a;this.ja=k;this.h=b;this.e=c;this.v=d;this.t=[]}Va.prototype.Y=function(a){this.t.push(a)};
Va.prototype.load=function(a,b){var c=a,d=b||{};if("string"==typeof c)c=[c];else if(!c||!c.length)d=c||{},c=[];if(c.length)for(var e=this,f=c.length,g=0;g<c.length;g++){var h=this.Na.m(ja(this.h),{id:encodeURIComponent(c[g])});ka(this.h,h,function(){0==--f&&Wa(e,d)})}else Wa(this,d)};
function Wa(a,b){if(0!=a.t.length){a.ja=b.contextPath||".";for(var c=new sa(a.h,a.v,b),d=l,e=0;e<a.t.length;e++)a.t[e].init(),d=d||a.t[e].supportsConfiguredBrowser();if(d){q(c.v,[c.q.m(c.r,"loading")]);D(c,"loading");for(var f=new J(a.e,a.h,c,b.timeout),c=function(a,b,c){for(var d=[],e={},A=0;A<a.length;A+=1){var z=a[A];e[z]="BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006";if(b[z])for(var S=b[z],H=0;H<S.length;H+=1)d.push(new F(z,S[H]));else d.push(new F(z))}f.ea(d,e,k,c)},d=0;d<a.t.length;d++)e=
a.t[d],e.supportsConfiguredBrowser()&&(e.load(c,d==a.t.length-1,a.ja),e.performOptionalActions(window))}else ta(c);a.t=[]}}function Xa(a){this.na=a;this.t=[]}Xa.prototype.Y=function(a){this.t.push(a)};
Xa.prototype.load=function(){var a=this.na.__webfonttypekitmodule__;if(a)for(var b=0;b<this.t.length;b++){var c=this.t[b],d=a[c.wa];d&&d(function(a,b,d){a=[];b={};var h=(new ma(navigator.userAgent,document)).parse(),p=c;p.e=h;p.s=Ta(p.e,p.Z);c.supportsConfiguredBrowser()&&(c.init(),c.load(k),c.collectFontFamilies(a,b),c.performOptionalActions(window));d(c.supportsConfiguredBrowser(),a,b)})}};var Ya=(new ma(navigator.userAgent,document)).parse();window.Typekit||(window.Typekit={});
if(!window.Typekit.load){var Za=window.Typekit.config||{},$a=k;Za.k&&($a=new N(Za.k));var ab=new Va($a,new fa(window),Ya,document.documentElement),bb=new Xa(window);window.Typekit.load=function(){ab.load.apply(ab,arguments)};window.Typekit.addKit=function(){ab.Y.apply(ab,arguments)}}var cb,db=k,Y,Z,M=window.Typekit.config||{};M.p&&(db=new N(M.p));Z=new X(new fa(window));Z.pa=new function(){this.ta=db};Y=new Ia;Y.oa=!M.si;Y.U=!M.st;Y.I=!M.sa;Y.xa=!M.sw;Y.ia=!M.sb;Z.Z=Y;M.w&&(Z.wa=M.w);
M.f&&(cb=new N(M.f),Z.aa=cb);var i;if(M.fn)for(i=0;i<M.fn.length;i+=2)Z.u.push(new Fa(M.fn[i],M.fn[i+1]));if(M.c)for(i=0;i<M.c.length;i+=2)Z.P.push(new Ba);var eb;if(eb=bb)eb=!!bb.na.__webfonttypekitmodule__;eb?(bb.Y(Z),bb.load()):(Z.e=Ya,Z.s=Ta(Z.e,Z.Z),window.Typekit.addKit(Z));
})(this,document);
