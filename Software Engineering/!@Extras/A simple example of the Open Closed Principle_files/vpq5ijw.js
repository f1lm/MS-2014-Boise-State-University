/*
 * For font license information, see the CSS file loaded by this JavaScript.
 */
if(!window.Typekit)window.Typekit={};window.Typekit.config={"c":[".container h1,.container h2,.container h3,.container h4,.contentMainWrapper h1,.contentMainWrapper h2,.contentMainWrapper h3,.contentMainWrapper h4,.tk-adelle,h4","\"adelle\",serif",".tagLine,.tk-dejarip,li,p","\"dejarip\",sans-serif",".tk-source-code-pro","\"source-code-pro\",sans-serif"],"f":"//use.typekit.net/c/d3ae45/1w;adelle,2,XKF:H:n7;dejarip,2,Pyq:H:i4,Pyp:H:n4,Pyr:H:n5,Pyt:H:n7;source-code-pro,2,Y1J:H:n5,Y1P:H:n7/{format}{/extras*}?3bb2a6e53c9684ffdc9a9bf11c5b2a6202505ab33c793956d75c5a56e4b253d2407f09c2ed1d7f2da7c4b52c24e54b2cf00420d3d769afbdb9b9401dfd72a2f45fc4c8e26cc3d6e1a664dea2729e9d792c5b469194be8d41c357f3dbd4fc286b0c1537cc2642711f1a8b0ef10c5c7b4f06b3b0ce75f7bc5b9134c3970e0a067ec070d8365eda44a2b1bac4b89b2632f5c7d76d61e2932f884345f06dd5cd396c03fe40f0a0f4c1ca79e44c9b47788824","fn":["adelle",["n7"],"dejarip",["i4","n4","n5","n7"],"source-code-pro",["n5","n7"]],"k":"//use.typekit.net/{id}.js","p":"//p.typekit.net/p.gif?s=1&k=vpq5ijw&ht=tk&h={host}&f=2001.7309.7307.7308.7311.17451.18468&a=622086&_={_}","w":"vpq5ijw"};
/*{"k":"1.5.1","created":"2013-04-08T12:47:37Z"}*/
;(function(window,document,undefined){
var g=void 0,k=!0,l=null,m=!1;function p(a){return function(){return this[a]}}var q;this.Va=k;function aa(a,c,b){return a.call.apply(a.bind,arguments)}function ba(a,c,b){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,e);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}}
function r(a,c,b){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return r.apply(l,arguments)}var ca=Date.now||function(){return+new Date};function s(a,c){this.Na=a;this.ua=c||a;this.j=this.ua.document;this.A=g}s.prototype.createElement=function(a,c,b){a=this.j.createElement(a);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?this.fa(a,c[e]):a.setAttribute(e,c[e]));b&&a.appendChild(this.j.createTextNode(b));return a};
function t(a,c,b){a=a.j.getElementsByTagName(c)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(b,a.lastChild)}function fa(a){function c(){document.body?a():setTimeout(c,0)}c()}function u(a,c){for(var b=a.className.split(/\s+/),e=0,d=b.length;e<d;e++)if(b[e]==c)return;b.push(c);a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}
function v(a,c){for(var b=a.className.split(/\s+/),e=[],d=0,f=b.length;d<f;d++)b[d]!=c&&e.push(b[d]);a.className=e.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ga(a,c){for(var b=a.className.split(/\s+/),e=0,d=b.length;e<d;e++)if(b[e]==c)return k;return m}s.prototype.fa=function(a,c){this.da()?a.setAttribute("style",c):a.style.cssText=c};s.prototype.da=function(){if(this.A===g){var a=this.j.createElement("p");a.innerHTML='<a style="top:1px;">w</a>';this.A=/top/.test(a.getElementsByTagName("a")[0].getAttribute("style"))}return this.A};
function w(a,c,b){this.ab=a;this.za=c;this.$a=b}function x(a,c,b,e,d,f,h,j){this.H=a;this.Ua=c;this.Ea=b;this.Da=e;this.Qa=d;this.Pa=f;this.Ca=h;this.B=j}q=x.prototype;q.getName=p("H");q.getVersion=p("Ua");q.getEngine=p("Ea");q.getEngineVersion=p("Da");q.getPlatform=p("Qa");q.getPlatformVersion=p("Pa");q.getDocumentMode=p("Ca");function ha(a,c){this.e=a;this.u=c}var ia=new x("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",g,new w(m,m,m));
ha.prototype.parse=function(){var a;if(-1!=this.e.indexOf("MSIE")){a=y(this);var c=z(this),b=A(this.e,/(MSIE [\d\w\.]+)/,1);if(""!=b){var e=b.split(" "),b=e[0],e=e[1],d=B(e),f=B(c);a=new x(b,e,b,e,a,c,D(this.u),new w("Windows"==a&&6<=d.l||"Windows Phone"==a&&8<=f.l,m,m))}else a=new x("MSIE","Unknown","MSIE","Unknown",a,c,D(this.u),new w(m,m,m))}else if(-1!=this.e.indexOf("Opera"))a=ja(this);else if(/AppleWeb(K|k)it/.test(this.e)){a=y(this);var c=z(this),b=A(this.e,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,
1),h=m;""==b&&(b="Unknown");e=B(b);h=B(c);d="Unknown";-1!=this.e.indexOf("Chrome")||-1!=this.e.indexOf("CrMo")||-1!=this.e.indexOf("CriOS")?d="Chrome":/Silk\/\d/.test(this.e)?d="Silk":"BlackBerry"==a||"Android"==a?d="BuiltinBrowser":-1!=this.e.indexOf("Safari")?d="Safari":-1!=this.e.indexOf("AdobeAIR")&&(d="AdobeAIR");f="Unknown";"BuiltinBrowser"==d?f="Unknown":/Silk\/\d/.test(this.e)?f=A(this.e,/Silk\/([\d\._]+)/,1):-1!=this.e.indexOf("Version/")?f=A(this.e,/Version\/([\d\.\w]+)/,1):"Chrome"==d?
f=A(this.e,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):"AdobeAIR"==d&&(f=A(this.e,/AdobeAIR\/([\d\.]+)/,1));"AdobeAIR"==d?(h=B(f),h=2<h.l||2==h.l&&5<=h.z):h="BlackBerry"==a?10<=h.l:"Android"==a?2<h.l||2==h.l&&1<h.z:526<=e.l||525<=e.l&&13<=e.z;a=new x(d,f,"AppleWebKit",b,a,c,D(this.u),new w(h,536>e.l||536==e.l&&11>e.z,"iPhone"==a||"iPad"==a||"iPod"==a||"Macintosh"==a))}else-1!=this.e.indexOf("Gecko")?(c=a="Unknown",b=m,-1!=this.e.indexOf("Firefox")?(a="Firefox",e=A(this.e,/Firefox\/([\d\w\.]+)/,1),""!=e&&
(b=B(e),c=e,b=3<=b.l&&5<=b.z)):-1!=this.e.indexOf("Mozilla")&&(a="Mozilla"),e=A(this.e,/rv:([^\)]+)/,1),""==e?e="Unknown":b||(b=B(e),b=1<b.l||1==b.l&&9<b.z||1==b.l&&9==b.z&&2<=b.Oa||e.match(/1\.9\.1b[123]/)!=l||e.match(/1\.9\.1\.[\d\.]+/)!=l),a=new x(a,c,"Gecko",e,y(this),z(this),D(this.u),new w(b,m,m))):a=ia;return a};
function y(a){var c=A(a.e,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=c)return/BB\d{2}/.test(c)&&(c="BlackBerry"),c;a=A(a.e,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/,1);return""!=a?("Mac_PowerPC"==a&&(a="Macintosh"),a):"Unknown"}
function z(a){var c=A(a.e,/(OS X|Windows NT|Android|CrOS) ([^;)]+)/,2);return c||(c=A(a.e,/Windows Phone( OS)? ([^;)]+)/,2))||(c=A(a.e,/(iPhone )?OS ([\d_]+)/,2))||(c=A(a.e,/Linux ([i\d]+)/,1))?c:(a=A(a.e,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}
function ja(a){var c="Unknown",b="Unknown",e=A(a.e,/(Presto\/[\d\w\.]+)/,1);""!=e?(b=e.split("/"),c=b[0],b=b[1]):(-1!=a.e.indexOf("Gecko")&&(c="Gecko"),e=A(a.e,/rv:([^\)]+)/,1),""!=e&&(b=e));if(-1!=a.e.indexOf("Opera Mini/"))return e=A(a.e,/Opera Mini\/([\d\.]+)/,1),""==e&&(e="Unknown"),new x("OperaMini",e,c,b,y(a),z(a),D(a.u),new w(m,m,m));if(-1!=a.e.indexOf("Version/")){var d=A(a.e,/Version\/([\d\.]+)/,1);if(""!=d)return e=B(d),new x("Opera",d,c,b,y(a),z(a),D(a.u),new w(10<=e.l,m,m))}d=A(a.e,/Opera[\/ ]([\d\.]+)/,
1);return""!=d?(e=B(d),new x("Opera",d,c,b,y(a),z(a),D(a.u),new w(10<=e.l,m,m))):new x("Opera","Unknown",c,b,y(a),z(a),D(a.u),new w(m,m,m))}function B(a){a=/([0-9]+)(?:\.([0-9]+)(?:\.([0-9]+)?)?)?/.exec(a);var c={};a&&(c.l=parseInt(a[1]||-1,10),c.z=parseInt(a[2]||-1,10),c.Oa=parseInt(a[3]||-1,10));return c}function A(a,c,b){return(a=a.match(c))&&a[b]?a[b]:""}function D(a){if(a.documentMode)return a.documentMode}function ka(a){this.La=a||"-"}
ka.prototype.h=function(a){for(var c=[],b=0;b<arguments.length;b++)c.push(arguments[b].replace(/[\W_]+/g,"").toLowerCase());return c.join(this.La)};function la(a,c,b){this.g=a;this.m=c;this.Y=b;this.q="wf";this.n=new ka("-")}function E(a){v(a.m,a.n.h(a.q,"loading"));ga(a.m,a.n.h(a.q,"active"))||u(a.m,a.n.h(a.q,"inactive"));G(a,"inactive")}function G(a,c,b){if(a.Y[c])if(b)a.Y[c](b.getName(),H(b));else a.Y[c]()}
function I(a,c){this.H=a;this.ha=4;this.T="n";var b=(c||"n4").match(/^([nio])([1-9])$/i);b&&(this.T=b[1],this.ha=parseInt(b[2],10))}I.prototype.getName=p("H");function ma(a){var c=[];a=a.H.split(/,\s*/);for(var b=0;b<a.length;b++){var e=a[b].replace(/['"]/g,"");-1==e.indexOf(" ")?c.push(e):c.push("'"+e+"'")}return c.join(",")}function H(a){return a.T+a.ha}function na(a){var c="normal",b=a.ha+"00";"o"===a.T?c="oblique":"i"===a.T&&(c="italic");return"font-style:"+c+";font-weight:"+b+";"}
function J(a,c){this.g=a;this.N=c;this.C=this.g.createElement("span",{},this.N)}function K(a,c){a.g.fa(a.C,"position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+ma(c)+";"+na(c))}function oa(a){t(a.g,"body",a.C)}J.prototype.remove=function(){var a=this.C;a.parentNode&&a.parentNode.removeChild(a)};
function pa(a,c,b,e,d,f,h,j){this.ia=a;this.Ka=c;this.g=b;this.v=e;this.N=j||"BESbswy";this.B=d;this.Q={};this.ga=f||5E3;this.va=h||l;this.M=this.L=l;a=new J(this.g,this.N);oa(a);for(var n in L)L.hasOwnProperty(n)&&(K(a,new I(L[n],H(this.v))),this.Q[L[n]]=a.C.offsetWidth);a.remove()}var L={Ya:"serif",Xa:"sans-serif",Wa:"monospace"};
pa.prototype.start=function(){this.L=new J(this.g,this.N);oa(this.L);this.M=new J(this.g,this.N);oa(this.M);this.Sa=ca();K(this.L,new I(this.v.getName()+",serif",H(this.v)));K(this.M,new I(this.v.getName()+",sans-serif",H(this.v)));qa(this)};function ra(a,c,b){for(var e in L)if(L.hasOwnProperty(e)&&c===a.Q[L[e]]&&b===a.Q[L[e]])return k;return m}
function qa(a){var c=a.L.C.offsetWidth,b=a.M.C.offsetWidth;c===a.Q.serif&&b===a.Q["sans-serif"]||a.B.za&&ra(a,c,b)?ca()-a.Sa>=a.ga?a.B.za&&ra(a,c,b)&&(a.va===l||a.va.hasOwnProperty(a.v.getName()))?sa(a,a.ia):sa(a,a.Ka):setTimeout(r(function(){qa(this)},a),25):sa(a,a.ia)}function sa(a,c){a.L.remove();a.M.remove();c(a.v)}function M(a,c,b,e){this.g=c;this.D=b;this.aa=0;this.ya=this.ra=m;this.ga=e;this.B=a.B}
M.prototype.watch=function(a,c,b,e){var d=a.length;if(0===d&&e)E(this.D);else{this.aa+=d;e&&(this.ra=e);for(e=0;e<d;e++){var f=a[e],h=c[f.getName()],j=this.D,n=f;u(j.m,j.n.h(j.q,n.getName(),H(n).toString(),"loading"));G(j,"fontloading",n);j=r(this.Fa,this);n=r(this.Ga,this);(new b(j,n,this.g,f,this.B,this.ga,l,h)).start()}}};
M.prototype.Fa=function(a){var c=this.D;v(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"loading"));v(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"inactive"));u(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"active"));G(c,"fontactive",a);this.ya=k;ta(this)};M.prototype.Ga=function(a){var c=this.D;v(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"loading"));ga(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"active"))||u(c.m,c.n.h(c.q,a.getName(),H(a).toString(),"inactive"));G(c,"fontinactive",a);ta(this)};
function ta(a){0==--a.aa&&a.ra&&(a.ya?(a=a.D,v(a.m,a.n.h(a.q,"loading")),v(a.m,a.n.h(a.q,"inactive")),u(a.m,a.n.h(a.q,"active")),G(a,"active")):E(a.D))}function O(a,c){this.Na=a;this.ua=c||a;this.j=document;this.A=g}O.prototype=s.prototype;function P(a){return"https:"==a.j.location.protocol}O.prototype.Ha=function(){return this.j.location.hostname};
function ua(a,c,b){var e=a.j.getElementsByTagName("head")[0];if(e){var d=a.j.createElement("script");d.src=c;var f=m;d.onload=d.onreadystatechange=function(){if(!f&&(!this.readyState||"loaded"==this.readyState||"complete"==this.readyState))f=k,b&&b(),d.onload=d.onreadystatechange=l,"HEAD"==d.parentNode.tagName&&e.removeChild(d)};e.appendChild(d)}}O.prototype.fa=function(a,c){this.da()?a.setAttribute("style",c):a.style.cssText=c};
O.prototype.da=function(){if(this.A===g){var a=this.j.createElement("p");a.innerHTML='<a style="top:1px;">w</a>';this.A=/top/.test(a.getElementsByTagName("a")[0].getAttribute("style"))}return this.A};function va(){var a=[{name:"font-family",value:R.c[i+1]}];this.Ra=[R.c[i]];this.na=a}function wa(a){for(var c=a.Ra.join(","),b=[],e=0;e<a.na.length;e++){var d=a.na[e];b.push(d.name+":"+d.value+";")}return c+"{"+b.join("")+"}"}
function xa(a,c,b,e){this.K=a;this.S=c;this.Ia=b;this.Za=e;this.pa={};this.oa={}}xa.prototype.F=function(a){return a?(this.pa[a.U]||this.S).slice(0):this.S.slice(0)};xa.prototype.watch=function(a,c,b){var e=[],d={};ya(this,c,e,d);a(e,d,b)};function ya(a,c,b,e){b.push(a.K);e[a.K]=a.F(c);a=a.oa[c.U]||[];for(c=0;c<a.length;c++){for(var d=a[c],f=d.K,h=m,j=0;j<b.length;j++)b[j]==f&&(h=k);h||(b.push(f),e[f]=d.F())}}function za(a,c){this.K=a;this.S=c}za.prototype.F=p("S");
function S(a,c,b){this.Ia=a;this.U=c;this.qa=b}function Ba(){this.la=this.Ba=this.r=this.O=this.P=k}function T(a){Ca.X.push(a)}function Da(a){this.g=a;this.ma=this.t=this.e=this.W=l;this.o=[];this.R=[];this.Aa=this.ba=this.Z=this.$=l}
function Ea(a,c){a.e=c;if(a.W){var b;a:{b=a.W;for(var e=a.e,d=a.ma,f=0;f<b.X.length;f++){var h=b.X[f],j=e,n=d;n||(n=new Ba);if(h.qa&&h.qa(j.getName(),j.getVersion(),j.getEngine(),j.getEngineVersion(),j.getPlatform(),j.getPlatformVersion(),j.getDocumentMode(),n)){b=h;break a}}b=l}a.t=b}}q=Da.prototype;q.supportsConfiguredBrowser=function(){return!!this.t};
q.init=function(){if(0<this.R.length){for(var a=[],c=0;c<this.R.length;c++)a.push(wa(this.R[c]));var c=this.g,a=a.join(""),b=this.g.j.createElement("style");b.setAttribute("type","text/css");b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a));t(c,"head",b)}};
q.load=function(a,c){var b=this.t.U;if(this.ba){var e;e=this.ba;var d=e.I[b];e=d?Fa(e,d):l;for(d=0;d<this.o.length;d++){for(var f=this.o[d],h=this.t,j=e,n=[],ab=f.K.split(",")[0].replace(/"|'/g,""),Q=f.F(),N=n,C=g,F=[],Aa={},da=0;da<Q.length;da++)C=Q[da],0<C.length&&!Aa[C]&&(Aa[C]=k,F.push(C));Q=F;j=j.xa?j.xa(ab,Q,N):Q;h=h.U;f.pa[h]=j;f.oa[h]=n}}if(this.$){e=[];if(this.Z){e=new Ga(this.g,this.t,this.o);d=[];f=this.Z.J[b]||[];for(n=0;n<f.length;n++){a:switch(f[n]){case "observeddomain":h=new Ha(e.g);
break a;case "fontmask":h=new Ia(e.t,e.o);break a;default:h=l}h&&d.push(h)}e=d}d=[];for(f=0;f<e.length;f++)d.push(e[f].toString());b=this.$.h(P(this.g),{format:b,extras:d});t(this.g,"head",this.g.createElement("link",{rel:"stylesheet",href:b}))}if(a){var ea=this,cb=this.t;fa(function(){for(var b=0;b<ea.o.length;b++)ea.o[b].watch(a,cb,c&&b==ea.o.length-1)})}};q.collectFontFamilies=function(a,c){for(var b=0;b<this.o.length;b++)ya(this.o[b],this.t,a,c)};
q.performOptionalActions=function(){if(this.ea){var a=this,c=this.e,b=this.g;fa(function(){var e=a.ea;if(e.wa){var d=window.__adobewebfontsappname__,d=d?d.toString().substr(0,20):"",e=e.wa.h(P(b),{host:encodeURIComponent(b.j.location.hostname),app:encodeURIComponent(d),_:(+new Date).toString()}),f=new Image(1,1);f.src=e;f.onload=function(){f.onload=l}}e=a.ea;e.ka&&(e=e.ka.h(c,b),t(b,"body",e))})}};function Ja(a,c,b,e,d){this.Ma=a;this.g=c;this.e=b;this.m=e;this.ja=d;this.s=[]}Ja.prototype.V=function(a){this.s.push(a)};
Ja.prototype.load=function(a,c){var b=a,e=c||{};if("string"==typeof b)b=[b];else if(!b||!b.length)e=b||{},b=[];if(b.length)for(var d=this,f=b.length,h=0;h<b.length;h++){var j=this.Ma.h(P(this.g),{id:encodeURIComponent(b[h])});ua(this.g,j,function(){0==--f&&Ka(d,e)})}else Ka(this,e)};
function Ka(a,c){if(0!=a.s.length){for(var b=new la(a.g,a.m,c),e=m,d=0;d<a.s.length;d++)a.s[d].init(),e=e||a.s[d].supportsConfiguredBrowser();if(e){u(b.m,b.n.h(b.q,"loading"));G(b,"loading");for(var f=new M(a.e,a.g,b),b=function(a,b,c){for(var d=[],e=0;e<a.length;e+=1){var N=a[e];if(b[N])for(var C=b[N],F=0;F<C.length;F+=1)d.push(new I(N,C[F]));else d.push(new I(N))}f.watch(d,{},pa,c)},e=0;e<a.s.length;e++)d=a.s[e],d.supportsConfiguredBrowser()&&(d.load(b,e==a.s.length-1),d.performOptionalActions(window))}else E(b);
a.s=[]}}function La(a,c){this.G=a;this.ja=c;this.s=[]}La.prototype.V=function(a){this.s.push(a)};La.prototype.load=function(){var a=this.G.__webfonttypekitmodule__;if(a)for(var c=0;c<this.s.length;c++){var b=this.s[c],e=a[b.Aa];if(e){var d=this.ja;e(function(a,c,e){c=[];var n={};Ea(b,a);b.supportsConfiguredBrowser()&&(b.init(),b.load(l,d),b.collectFontFamilies(c,n),b.performOptionalActions(window));e(b.supportsConfiguredBrowser(),c,n)})}}};function Ma(a,c){this.H=a;this.xa=c}
Ma.prototype.getName=p("H");function Na(a){var c=U;Fa(c,a.getName())||c.ca.push(a)}function Fa(a,c){for(var b=0;b<a.ca.length;b++){var e=a.ca[b];if(c===e.getName())return e}return l}function Ga(a,c,b){this.g=a;this.t=c;this.o=b}function Ha(a){this.g=a}Ha.prototype.toString=function(){return encodeURIComponent(this.g.Ha?this.g.j.location.hostname:document.location.hostname)};function Ia(a,c){this.t=a;this.o=c}
Ia.prototype.toString=function(){for(var a=[],c=0;c<this.o.length;c++)for(var b=this.o[c],e=b.F(),b=b.F(this.t),d=0;d<e.length;d++){var f;a:{for(f=0;f<b.length;f++)if(e[d]===b[f]){f=k;break a}f=m}a.push(f?1:0)}a=a.join("");a=a.replace(/^0+/,"");c=[];for(e=a.length;0<e;e-=4)b=a.slice(0>e-4?0:e-4,e),c.unshift(parseInt(b,2).toString(16));return c.join("")};function V(a){this.Ta=a}
V.prototype.h=function(a,c){var b=c||{},e=this.Ta.replace(/\{\/?([^*}]*)(\*?)\}/g,function(a,c,e){return e&&b[c]?"/"+b[c].join("/"):b[c]||""});e.match(/^\/\//)&&(e=(a?"https:":"http:")+e);return e.replace(/\/*\?*($|\?)/,"$1")};function Oa(a,c,b,e){this.G=a;this.j=c;this.Ja=b;this.ta=e}
Oa.prototype.h=function(a,c){var b=this.j.createElement("img");b.setAttribute("width",62);b.setAttribute("height",25);b.setAttribute("src",this.Ja.h(P(c)));b.setAttribute("class","typekit-badge");b.setAttribute("alt","Fonts by Typekit");b.setAttribute("title","Information about the fonts used on this site");b.style.position="fixed";b.style.zIndex=2E9;b.style.right=0;b.style.bottom=0;b.style.cursor="pointer";b.style.border=0;"Opera"!=a.getName()&&(b.style.content="none");b.style.display="inline";b.style["float"]=
"none";b.style.height="25px";b.style.left="auto";b.style.margin=0;b.style.maxHeight="25px";b.style.maxWidth="62px";b.style.minHeight="25px";b.style.minWidth="62px";b.style.orphans=2;b.style.outline="none";b.style.overflow="visible";b.style.padding=0;b.style.pageBreakAfter="auto";b.style.pageBreakBefore="auto";b.style.pageBreakInside="auto";b.style.tableLayout="auto";b.style.textIndent=0;b.style.top="auto";b.style.unicodeBidi="normal";b.style.verticalAlign="baseline";b.style.visibility="visible";b.style.widows=
2;b.style.width="65px";if(this.ta){var e=this.j,d=this.ta;Pa(this,b,"click",function(){e.location.href=d})}var f=a.getPlatform();if("MSIE"==a.getName()&&"Windows Phone"!=f){b.style.position="absolute";var h=this,j=function(){var a=Qa(h,"scrollLeft","scrollTop"),c=Qa(h,"clientWidth","clientHeight");b.style.bottom="auto";b.style.right="auto";b.style.top=a[1]+c[1]-25+"px";b.style.left=a[0]+c[0]-3-62+"px"};Pa(this,this.G,"scroll",j);Pa(this,this.G,"resize",j)}if("iPhone"==f||"iPod"==f||"iPad"==f||"Android"==
f||"Windows Phone"==f||"BlackBerry"==f)b.style.display="none";return b};function Qa(a,c,b){var e=0,d=0;a=a.j;if(a.documentElement&&(a.documentElement[c]||a.documentElement[b]))e=a.documentElement[c],d=a.documentElement[b];else if(a.body&&(a.body[c]||a.body[b]))e=a.body[c],d=a.body[b];return[e,d]}function Pa(a,c,b,e){if(c.attachEvent){var d=a.G;c["e"+b+e]=e;c[b+e]=function(){c["e"+b+e](d.event)};c.attachEvent("on"+b,c[b+e])}else c.addEventListener(b,e,m)}var Ca=new function(){this.X=[]};
T(new S("air-linux-win","a",function(a,c,b,e,d,f){if(b=m||("Windows"==d&&"Unknown"==f?k:m)||("Ubuntu"==d||"Linux"==d?k:m))a:{if("AdobeAIR"==a&&(a=/([0-9]+.[0-9]+)/.exec(c))){a=2.5<=parseFloat(a[1]);break a}a=m}else a=m;return a}));
T(new S("air-osx","b",function(a,c,b,e,d,f){if(!(b=m))b=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&b?(d=parseInt(b[1],10),f=parseInt(b[3],10),b=10<d||10==d&&4<=f):b="Macintosh"==d&&"Unknown"==f?k:m;if(b)a:{if("AdobeAIR"==a&&(a=/([0-9]+.[0-9]+)/.exec(c))){a=2.5<=parseFloat(a[1]);break a}a=m}else a=m;return a}));
T(new S("builtin-android2to3-android4plus","a",function(a,c,b,e,d,f,h,j){if(!(c=m))b=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&b?(c=parseInt(b[1],10),b=parseInt(b[2],10),c=2==c&&2<=b||3==c&&1>b):c=m;c||(f=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&f?(d=parseInt(f[1],10),j=parseInt(f[2],10),c=4==d&&1<=j||4<d):c=m);return!c?m:"BuiltinBrowser"==a}));
T(new S("builtin-android3to4","f",function(a,c,b,e,d,f,h,j){if(!(c=m))f=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&f?(d=parseInt(f[1],10),j=parseInt(f[2],10),c=3==d&&1<=j||4==d&&1>j):c=m;return!c?m:"BuiltinBrowser"==a}));T(new S("builtin-bb10plus","d",function(a,c,b,e,d,f,h,j){c=m||j.la&&10<=parseInt(f,10);return!c?m:"BuiltinBrowser"==a}));
T(new S("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,d,f){b=(b=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);b||(e=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&e?(b=parseInt(e[1],10),e=parseInt(e[2],10),b=6<b||6==b&&1<=e):b=m);b||(b=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&b?(f=parseInt(b[1],10),b=parseInt(b[3],10),b=10<f||10==f&&4<=b):b="Macintosh"==d&&"Unknown"==f?k:m);if(b=b||("Ubuntu"==d||"Linux"==d?k:m))a:{if("Chrome"==
a&&(d=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(c)))if(a=parseFloat(d[1]),c=parseInt(d[2],10),d=parseInt(d[3],10),!(6<=a)&&(4<a||4==a&&249<c||4==a&&249==c&&4<=d)){a=k;break a}a=m}else a=m;return a}));
T(new S("chrome6plus-androidany-chromeos-ipad5plus-iphone5plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,d,f,h,j){b=(b=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);b||(e=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&e?(b=parseInt(e[1],10),e=parseInt(e[2],10),b=6<b||6==b&&1<=e):b=m);b||(e=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&e?(b=parseInt(e[1],10),e=parseInt(e[3],10),b=10<b||10==b&&4<=e):b="Macintosh"==d&&"Unknown"==f?k:
m);b=(b=(b=b||("Ubuntu"==d||"Linux"==d?k:m))||j.r&&"Android"==d)||"CrOS"==d;b||(b=j.O&&"iPad"==d?(b=/^([0-9]+)_([0-9]+)/.exec(f))?5<=parseInt(b[1],10):m:m);b||(b=j.P&&("iPhone"==d||"iPod"==d)?(d=/^([0-9]+)_([0-9]+)/.exec(f))?5<=parseInt(d[1],10):m:m);if(b)a:{if("Chrome"==a&&(a=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(c))&&6<=parseFloat(a[1])){a=k;break a}a=g}else a=m;return a}));
T(new S("chrome6plus-ipad4-iphone4","a",function(a,c,b,e,d,f,h,j){if(!(b=m))a:{if(j.O&&"iPad"==d&&(b=/^([0-9]+)_([0-9]+)/.exec(f))){e=parseInt(b[2],10);b=4==parseInt(b[1],10)&&2<=e;break a}b=m}if(!b)a:{if(j.P&&("iPhone"==d||"iPod"==d))if(d=/^([0-9]+)_([0-9]+)/.exec(f)){f=parseInt(d[2],10);b=4==parseInt(d[1],10)&&2<=f;break a}b=m}if(b)a:{if("Chrome"==a&&(a=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(c))&&6<=parseFloat(a[1])){a=k;break a}a=g}else a=m;return a}));
T(new S("ff35-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,d,f){a=(a=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);a||(a=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&a?(f=parseInt(a[1],10),a=parseInt(a[2],10),a=6<f||6==f&&1<=a):a=m);(a=a||("Ubuntu"==d||"Linux"==d?k:m))?"Gecko"==b?(b=/1.9.1b[1-3]{1}/,e=/1.9.1/.test(e)&&!b.test(e)):e=m:e=m;return e}));
T(new S("ff35-osx","b",function(a,c,b,e,d,f){if(!(a=m))a=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&a?(d=parseInt(a[1],10),f=parseInt(a[3],10),a=10<d||10==d&&4<=f):a="Macintosh"==d&&"Unknown"==f?k:m;a?"Gecko"==b?(b=/1.9.1b[1-3]{1}/,e=/1.9.1/.test(e)&&!b.test(e)):e=m:e=m;return e}));
T(new S("ff36plus-androidany-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,d,f,h,j){a=(a=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);a||(c=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&c?(a=parseInt(c[1],10),c=parseInt(c[2],10),a=6<a||6==a&&1<=c):a=m);a||(a=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&a?(f=parseInt(a[1],10),a=parseInt(a[3],10),a=10<f||10==f&&4<=a):a="Macintosh"==d&&"Unknown"==f?k:m);if(a=(a=a||("Ubuntu"==d||"Linux"==
d?k:m))||j.r&&"Android"==d)a:{if("Gecko"==b&&(e=/([0-9]+.[0-9]+)(.([0-9]+)|)/.exec(e))){b=parseFloat(e[1]);e=parseInt(e[3],10);b=1.9<b||1.9<=b&&1<e;break a}b=m}else b=m;return b}));
T(new S("ie6to8-win2003-win7plus-winvista-winxp","i",function(a,c,b,e,d,f,h){b=(b=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);b||(f=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&f?(d=parseInt(f[1],10),f=parseInt(f[2],10),b=6<d||6==d&&1<=f):b=m);h=b?"MSIE"==a?(a=/([0-9]+.[0-9]+)/.exec(c))?6<=parseFloat(a[1])&&(h===g||9>h):m:g:m;return h}));
T(new S("ie9plus-win7plus-winvista","d",function(a,c,b,e,d,f,h){if(!(c=m))b=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&b?(c=parseInt(b[1],10),b=parseInt(b[2],10),c=6<c||6==c&&1<=b):c=m;a=(d=c||("Windows"==d&&"6.0"==f?k:m))?"MSIE"==a?9<=h:g:m;return a}));T(new S("ieany-winphone8plus","d",function(a,c,b,e,d,f,h,j){if(!(c=m))f=/^([0-9]+)/.exec(f),c=j.Ba&&"Windows Phone"==d&&f?8<=parseInt(f[1],10):m;return!c?m:"MSIE"==a}));
T(new S("opera10-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,d,f){b=(b=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);b||(b=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&b?(f=parseInt(b[1],10),b=parseInt(b[2],10),b=6<f||6==f&&1<=b):b=m);(b=b||("Ubuntu"==d||"Linux"==d?k:m))?"Opera"==a?(a=parseFloat(c),a=10.54<=a&&11.1>a):a=m:a=m;return a}));
T(new S("opera10-osx","b",function(a,c,b,e,d,f){if(!(b=m))b=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&b?(d=parseInt(b[1],10),f=parseInt(b[3],10),b=10<d||10==d&&4<=f):b="Macintosh"==d&&"Unknown"==f?k:m;b?"Opera"==a?(a=parseFloat(c),a=10.54<=a&&11.1>a):a=m:a=m;return a}));
T(new S("opera11plus-androidany-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,d,f,h,j){b=(b=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);b||(e=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&e?(b=parseInt(e[1],10),e=parseInt(e[2],10),b=6<b||6==b&&1<=e):b=m);b||(b=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&b?(f=parseInt(b[1],10),b=parseInt(b[3],10),b=10<f||10==f&&4<=b):b="Macintosh"==d&&"Unknown"==f?k:m);b=(b=b||("Ubuntu"==d||"Linux"==
d?k:m))||j.r&&"Android"==d;return!b?m:"Opera"==a?11.1<=parseFloat(c):m}));T(new S("safari3to5-osx","b",function(a,c,b,e,d,f){if(!(c=m))c=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&c?(d=parseInt(c[1],10),f=parseInt(c[3],10),c=10<d||10==d&&4<=f):c="Macintosh"==d&&"Unknown"==f?k:m;if(c)a:{if("Safari"==a&&"AppleWebKit"==b&&(a=/([0-9]+.[0-9]+)/.exec(e))){a=parseFloat(a[1]);a=525.13<=a&&534.5>a;break a}a=m}else a=m;return a}));
T(new S("safari3to5-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,d,f){c=(c=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);c||(f=/^([0-9]+).([0-9]+)/.exec(f),"Windows"==d&&f?(d=parseInt(f[1],10),f=parseInt(f[2],10),c=6<d||6==d&&1<=f):c=m);if(c)a:{if("Safari"==a&&"AppleWebKit"==b&&(a=/([0-9]+.[0-9]+)/.exec(e))){a=parseFloat(a[1]);a=525.13<=a&&534.5>a;break a}a=m}else a=m;return a}));
T(new S("safari5plus-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,d,f){c=(c=m||("Windows"==d&&"5.1"==f?k:m)||("Windows"==d&&"5.2"==f?k:m))||("Windows"==d&&"6.0"==f?k:m);if(!c){var h=/^([0-9]+).([0-9]+)/.exec(f);"Windows"==d&&h?(c=parseInt(h[1],10),h=parseInt(h[2],10),c=6<c||6==c&&1<=h):c=m}c||(c=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&c?(d=parseInt(c[1],10),f=parseInt(c[3],10),c=10<d||10==d&&4<=f):c="Macintosh"==d&&"Unknown"==f?k:m);if(c)a:{if("Safari"==a&&"AppleWebKit"==b&&
(a=/([0-9]+.[0-9]+)/.exec(e))){a=534.5<=parseFloat(a[1]);break a}a=m}else a=m;return a}));
T(new S("safariany-ipad4-iphone4","a",function(a,c,b,e,d,f,h,j){if(!(c=m))a:{if(j.O&&"iPad"==d&&(c=/^([0-9]+)_([0-9]+)/.exec(f))){e=parseInt(c[2],10);c=4==parseInt(c[1],10)&&2<=e;break a}c=m}if(!c)a:{if(j.P&&("iPhone"==d||"iPod"==d))if(f=/^([0-9]+)_([0-9]+)/.exec(f)){j=parseInt(f[2],10);c=4==parseInt(f[1],10)&&2<=j;break a}c=m}return!c?m:"Safari"==a&&"AppleWebKit"==b||"Unknown"==a&&"AppleWebKit"==b&&("iPhone"==d||"iPad"==d)?k:m}));
T(new S("safariany-ipad5plus-iphone5plus","d",function(a,c,b,e,d,f,h,j){if(!(c=m))c=j.O&&"iPad"==d?(c=/^([0-9]+)_([0-9]+)/.exec(f))?5<=parseInt(c[1],10):m:m;c||(c=j.P&&("iPhone"==d||"iPod"==d)?(f=/^([0-9]+)_([0-9]+)/.exec(f))?5<=parseInt(f[1],10):m:m);return!c?m:"Safari"==a&&"AppleWebKit"==b||"Unknown"==a&&"AppleWebKit"==b&&("iPhone"==d||"iPad"==d)?k:m}));
T(new S("silk1to2-android2to3-osx","a",function(a,c,b,e,d,f,h,j){if(!(b=m))e=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&e?(b=parseInt(e[1],10),e=parseInt(e[2],10),b=2==b&&2<=e||3==b&&1>e):b=m;b||(b=/^([0-9]+)(_|.)([0-9]+)/.exec(f),"Macintosh"==d&&b?(d=parseInt(b[1],10),f=parseInt(b[3],10),b=10<d||10==d&&4<=f):b="Macintosh"==d&&"Unknown"==f?k:m);return!b?m:j.r&&"Silk"==a?2>parseInt(c,10):m}));
T(new S("silk2plus-android3to4-linux","f",function(a,c,b,e,d,f,h,j){if(!(b=m))b=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&b?(f=parseInt(b[1],10),b=parseInt(b[2],10),b=3==f&&1<=b||4==f&&1>b):b=m;d=b||("Ubuntu"==d||"Linux"==d?k:m);return!d?m:j.r&&"Silk"==a?2<=parseInt(c,10):m}));
T(new S("silk2plus-android4plus","a",function(a,c,b,e,d,f,h,j){if(!(b=m))f=/([0-9]+).([0-9]+)/.exec(f),j.r&&"Android"==d&&f?(d=parseInt(f[1],10),f=parseInt(f[2],10),b=4==d&&1<=f||4<d):b=m;return!b?m:j.r&&"Silk"==a?2<=parseInt(c,10):m}));var U=new function(){this.ca=[];this.I={}};Na(new Ma("AllFonts",function(a,c){return c}));
Na(new Ma("DefaultFourFontsWithSingleFvdFamilies",function(a,c,b){for(var e=0;e<c.length;e++){var d=c[e],f=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+d;b.push(new za(f,[d]))}a={};for(d=0;d<c.length;d++)b=c[d],e=b.charAt(1),(a[e]||(a[e]=[])).push(b);b=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];e=[];for(d=0;d<b.length;d++)for(var f=b[d],h=0;h<f.length;h++){var j=f[h];if(a[j]){e=e.concat(a[j]);break}}b=e;e={};a=[];for(d=0;d<b.length;d++)f=b[d],e[f]||(e[f]=k,a.push(f));b=[];for(e=0;e<c.length;e++){d=c[e];
for(f=0;f<a.length;f++)h=a[f],h==d&&b.push(h)}return b}));U.I.a="AllFonts";U.I.b="AllFonts";U.I.d="AllFonts";U.I.f="AllFonts";U.I.i="DefaultFourFontsWithSingleFvdFamilies";var W=new function(){this.J={}};W.J.a=[];W.J.b=[];W.J.d=[];W.J.f=["observeddomain"];W.J.i=["observeddomain","fontmask"];var Ra=(new ha(navigator.userAgent,document)).parse();window.Typekit||(window.Typekit={});
if(!window.Typekit.load){var Sa=window.Typekit.config||{},Ta=l;Sa.k&&(Ta=new V(Sa.k));var Ua=function(a,c){setTimeout(a,c)},X=new Ja(Ta,new O(window),Ra,document.documentElement,Ua),Y=new La(window,Ua);window.Typekit.load=function(){X.load.apply(X,arguments)};window.Typekit.addKit=function(){X.V.apply(X,arguments)}}var Wa,Xa=l,Ya=l,Za=l,$a,Z,$,R=window.Typekit.config||{};R.b&&(Xa=new V(R.b),Ya=new Oa(window,document,Xa,R.bu));R.p&&(Za=new V(R.p));$a=new function(){var a=Za;this.ka=Ya;this.wa=a};
$=new Da(new O(window));$.ea=$a;Z=new Ba;Z.P=!R.si;Z.O=!R.st;Z.r=!R.sa;Z.Ba=!R.sw;Z.la=!R.sb;$.ma=Z;R.w&&($.Aa=R.w);R.f&&(Wa=new V(R.f),$.$=Wa);var i;if(R.fn)for(i=0;i<R.fn.length;i+=2)$.o.push(new xa(R.fn[i],R.fn[i+1]));if(R.c)for(i=0;i<R.c.length;i+=2)$.R.push(new va);$.Z=W;$.W=Ca;$.ba=U;var bb;if(bb=Y)bb=!!Y.G.__webfonttypekitmodule__;bb?(Y.V($),Y.load()):(Ea($,Ra),window.Typekit.addKit($));
})(this,document);
