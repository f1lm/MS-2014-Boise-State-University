var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var aa=encodeURIComponent,k=window,ba=Object,q=document,ca=Array,da=parseInt,r=String,ea=decodeURIComponent;function fa(a,b){return a.type=b}
var ga="appendChild",ha="shift",ia="exec",ja="width",t="replace",ka="concat",la="charAt",ma="match",u="createElement",w="setAttribute",na="bind",oa="getTime",pa="getElementsByTagName",y="substr",z="toString",A="split",B="location",qa="style",ra="protocol",C="href",sa="action",E="apply",ta="attributes",ua="height",F="push",G="test",va="getElementById",wa="JSON",H="indexOf",xa="nodeName",ya="type",I="length",J="prototype",za="removeChild",L="call",Aa="getAttribute",Ba="charCodeAt",Ca="substring",Da=
"documentMode",M="parentNode",Ea="update",N="join",Fa="toLowerCase",Ga=function(a,b,c){return a[L][E](a[na],arguments)},Ha=function(a,b,c){if(!a)throw Error();if(2<arguments[I]){var d=ca[J].slice[L](arguments,2);return function(){var c=ca[J].slice[L](arguments);ca[J].unshift[E](c,d);return a[E](b,c)}}return function(){return a[E](b,arguments)}},Ia=function(a,b,c){Ia=Function[J][na]&&-1!=Function[J][na][z]()[H]("native code")?Ga:Ha;return Ia[E](null,arguments)};
Function[J].bind=Function[J][na]||function(a,b){if(1<arguments[I]){var c=ca[J].slice[L](arguments,1);c.unshift(this,a);return Ia[E](null,c)}return Ia(this,a)};var O=k,P=q,Ja=O[B],Ka=function(){},La=/\[native code\]/,Q=function(a,b,c){return a[b]=a[b]||c},Ma=function(a){for(var b=0;b<this[I];b++)if(this[b]===a)return b;return-1},Na=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a[I];d++){var e=a[d];e!=c&&b[F](e);c=e}return b},Oa=/&/g,Pa=/</g,Qa=/>/g,Ra=/"/g,Sa=/'/g,Ta=function(a){return r(a)[t](Oa,"&amp;")[t](Pa,"&lt;")[t](Qa,"&gt;")[t](Ra,"&quot;")[t](Sa,"&#39;")},R=function(){var a;if((a=ba.create)&&La[G](a))a=a(null);else{a={};for(var b in a)a[b]=
void 0}return a},S=function(a,b){return ba[J].hasOwnProperty[L](a,b)},Ua=function(a){if(La[G](ba.keys))return ba.keys(a);var b=[],c;for(c in a)S(a,c)&&b[F](c);return b},T=function(a,b){a=a||{};for(var c in a)S(a,c)&&(b[c]=a[c])},Va=function(a){return function(){O.setTimeout(a,0)}},Wa=function(a,b){if(!a)throw Error(b||"");},U=Q(O,"gapi",{});var V=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d[ia](a)||b[ia](a)))try{c=ea(a[2])}catch(e){}return c},Xa=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Ya=function(a){a=a[ma](Xa);var b=R();b.J=a[1];b.j=a[3]?[a[3]]:[];b.o=a[5]?[a[5]]:[];return b},Za=function(a){return a.J+(0<a.j[I]?"?"+a.j[N]("&"):"")+(0<a.o[I]?"#"+a.o[N]("&"):"")},$a=function(a,b){var c=[];if(a)for(var d in a)if(S(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];c[F](aa(d)+
"="+aa(e))}return c},ab=function(a,b,c,d){a=Ya(a);a.j[F][E](a.j,$a(b,d));a.o[F][E](a.o,$a(c,d));return Za(a)},bb=function(a,b){var c="";2E3<b[I]&&(c=b[Ca](2E3),b=b[Ca](0,2E3));var d=a[u]("div"),e=a[u]("a");e.href=b;d[ga](e);d.innerHTML=d.innerHTML;b=r(d.firstChild[C]);d[M]&&d[M][za](d);return b+c},cb=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var db=function(a,b,c,d){if(O[c+"EventListener"])O[c+"EventListener"](a,b,!1);else if(O[d+"tachEvent"])O[d+"tachEvent"]("on"+a,b)},eb=function(){var a=P.readyState;return"complete"===a||"interactive"===a&&-1==navigator.userAgent[H]("MSIE")},hb=function(a){var b=fb;if(!eb())try{b()}catch(c){}gb(a)},gb=function(a){if(eb())a();else{var b=!1,c=function(){if(!b)return b=!0,a[E](this,arguments)};O.addEventListener?(O.addEventListener("load",c,!1),O.addEventListener("DOMContentLoaded",c,!1)):O.attachEvent&&
(O.attachEvent("onreadystatechange",function(){eb()&&c[E](this,arguments)}),O.attachEvent("onload",c))}},ib=function(a){for(;a.firstChild;)a[za](a.firstChild)},jb={button:!0,div:!0,span:!0};var W;W=Q(O,"___jsl",R());Q(W,"I",0);Q(W,"hel",10);var kb=function(a){return W.dpo?W.h:V(a,"jsh",W.h)},lb=function(a){var b=Q(W,"sws",[]);b[F][E](b,a)},mb=function(a){return Q(W,"watt",R())[a]},ob=function(a){var b=Q(W,"PQ",[]);W.PQ=[];var c=b[I];if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},pb=function(a){return Q(Q(W,"H",R()),a,R())};var qb=Q(W,"perf",R()),rb=Q(qb,"g",R()),sb=Q(qb,"i",R());Q(qb,"r",[]);R();R();var tb=function(a,b,c){var d=qb.r;"function"===typeof d?d(a,b,c):d[F]([a,b,c])},ub=function(a,b,c){rb[a]=!b&&rb[a]||c||(new Date)[oa]();tb(a)},wb=function(a,b,c){b&&0<b[I]&&(b=vb(b),c&&0<c[I]&&(b+="___"+vb(c)),28<b[I]&&(b=b[y](0,28)+(b[I]-28)),c=b,b=Q(sb,"_p",R()),Q(b,c,R())[a]=(new Date)[oa](),tb(a,"_p",c))},vb=function(a){return a[N]("__")[t](/\./g,"_")[t](/\-/g,"_")[t](/\,/g,"_")};var xb=R(),yb=[],X=function(a){throw Error("Bad hint"+(a?": "+a:""));};yb[F](["jsl",function(a){for(var b in a)if(S(a,b)){var c=a[b];"object"==typeof c?W[b]=Q(W,b,[])[ka](c):Q(W,b,c)}if(b=a.u)a=Q(W,"us",[]),a[F](b),(b=/^https:(.*)$/[ia](b))&&a[F]("http:"+b[1])}]);var zb=/^(\/[a-zA-Z0-9_\-]+)+$/,Ab=/^[a-zA-Z0-9\-_\.,!]+$/,Bb=/^gapi\.loaded_[0-9]+$/,Cb=/^[a-zA-Z0-9,._-]+$/,Gb=function(a,b,c,d){var e=a[A](";"),f=e[ha](),g=xb[f],h=null;g?h=g(e,b,c,d):X("no hint processor for: "+f);h||X("failed to generate load url");b=h;c=b[ma](Db);(d=b[ma](Eb))&&1===d[I]&&Fb[G](b)&&c&&1===c[I]||X("failed sanity: "+a);return h},Jb=function(a,b,c,d){a=Hb(a);Bb[G](c)||X("invalid_callback");b=Ib(b);d=d&&d[I]?Ib(d):null;var e=function(a){return aa(a)[t](/%2C/g,",")};return[aa(a.V)[t](/%2C/g,
",")[t](/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.K?"/am="+e(a.K):"",a.L?"/rs="+e(a.L):"",a.M?"/t="+e(a.M):"","/cb=",e(c)][N]("")},Hb=function(a){"/"!==a[la](0)&&X("relative path");for(var b=a[Ca](1)[A]("/"),c=[];b[I];){a=b[ha]();if(!a[I]||0==a[H]("."))X("empty/relative directory");else if(0<a[H]("=")){b.unshift(a);break}c[F](a)}a={};for(var d=0,e=b[I];d<e;++d){var f=b[d][A]("="),g=ea(f[0]),h=ea(f[1]);2==f[I]&&g&&h&&(a[g]=a[g]||h)}b="/"+c[N]("/");zb[G](b)||
X("invalid_prefix");c=Kb(a,"k",!0);d=Kb(a,"am");e=Kb(a,"rs");a=Kb(a,"t");return{V:b,version:c,K:d,L:e,M:a}},Ib=function(a){for(var b=[],c=0,d=a[I];c<d;++c){var e=a[c][t](/\./g,"_")[t](/-/g,"_");Cb[G](e)&&b[F](e)}return b[N](",")},Kb=function(a,b,c){a=a[b];!a&&c&&X("missing: "+b);if(a){if(Ab[G](a))return a;X("invalid: "+b)}return null},Fb=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Eb=/\/cb=/g,Db=/\/\//g,Lb=function(){var a=kb(Ja[C]);if(!a)throw Error("Bad hint");return a};
xb.m=function(a,b,c,d){(a=a[0])||X("missing_hint");return"https://apis.google.com"+Jb(a,b,c,d)};var Mb=decodeURI("%73cript"),Nb=function(a,b){for(var c=[],d=0;d<a[I];++d){var e=a[d];e&&0>Ma[L](b,e)&&c[F](e)}return c},Pb=function(a){"loading"!=P.readyState?Ob(a):P.write("<"+Mb+' src="'+encodeURI(a)+'"></'+Mb+">")},Ob=function(a){var b=P[u](Mb);b[w]("src",a);b.async="true";(a=P[pa](Mb)[0])?a[M].insertBefore(b,a):(P.head||P.body||P.documentElement)[ga](b)},Qb=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<yb[I];d++){var e=yb[d][0],f=yb[d][1];f&&S(c,e)&&f(c[e],a,b)}},Sb=function(a,b){Rb(function(){var c;
c=b===kb(Ja[C])?Q(U,"_",R()):R();c=Q(pb(b),"_",c);a(c)})},Ub=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Qb(a,c);var d=a?a[A](":"):[],e=c.h||Lb(),f=Q(W,"ah",R());if(f["::"]&&d[I]){for(var g=[],h=null;h=d[ha]();){var l=h[A]("."),l=f[h]||f[l[1]&&"ns:"+l[0]||""]||e,m=g[I]&&g[g[I]-1]||null,n=m;m&&m.hint==l||(n={hint:l,O:[]},g[F](n));n.O[F](h)}var p=g[I];if(1<p){var x=c.callback;x&&(c.callback=function(){0==--p&&x()})}for(;d=g[ha]();)Tb(d.O,c,d.hint)}else Tb(d||[],c,e)},Tb=function(a,
b,c){a=Na(a)||[];var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=null,l=!1;if(f&&!g||!f&&g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var m=Q(pb(c),"r",[]).sort(),n=Q(pb(c),"L",[]).sort(),p=[][ka](m),x=function(a,b){if(l)return 0;O.clearTimeout(h);n[F][E](n,D);var d=((U||{}).config||{})[Ea];d?d(e):e&&Q(W,"cu",[])[F](e);if(b){wb("me0",a,p);try{Sb(b,c)}finally{wb("me1",a,p)}}return 1};0<f&&(h=O.setTimeout(function(){l=!0;g()},f));var D=Nb(a,n);if(D[I]){var D=
Nb(a,m),v=Q(W,"CP",[]),K=v[I];v[K]=function(a){if(!a)return 0;wb("ml1",D,p);var b=function(b){v[K]=null;x(D,a)&&ob(function(){d&&d();b()})},c=function(){var a=v[K+1];a&&a()};0<K&&v[K-1]?v[K]=function(){b(c)}:b(c)};if(D[I]){var nb="loaded_"+W.I++;U[nb]=function(a){v[K](a);U[nb]=null};a=Gb(c,D,"gapi."+nb,m);m[F][E](m,D);wb("ml0",D,p);b.sync||O.___gapisync?Pb(a):Ob(a)}else v[K](Ka)}else x(D)&&d&&d()};var Rb=function(a){if(W.hee&&0<W.hel)try{return a()}catch(b){W.hel--,Ub("debug_error",function(){try{k.___jsl.hefn(b)}catch(a){throw b;}})}else return a()};U.load=function(a,b){return Rb(function(){return Ub(a,b)})};var Vb=function(a){var b=k.___jsl=k.___jsl||{};b[a]=b[a]||[];return b[a]},Wb=function(a){var b=k.___jsl=k.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},Xb=function(a){return"object"===typeof a&&/\[native code\]/[G](a[F])},Yb=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Xb(a[c])&&!Xb(b[c])?Yb(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Xb(b[c])?[]:{},Yb(a[c],b[c])):a[c]=b[c])},Zb=function(a){if(a&&!/^\s+$/[G](a)){for(;0==a[Ba](a[I]-
1);)a=a[Ca](0,a[I]-1);var b;try{b=k[wa].parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(d){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(e){}return"object"===typeof b?b:{}}},$b=function(a){Wb(!0);var b=k.___gcfg,c=Vb("cu");if(b&&b!==k.___gu){var d={};Yb(d,b);c[F](d);k.___gu=b}var b=Vb("cu"),e=q.scripts||q[pa]("script")||[],d=[],f=[];f[F][E](f,Vb("us"));for(var g=0;g<e[I];++g)for(var h=e[g],l=0;l<f[I];++l)h.src&&
0==h.src[H](f[l])&&d[F](h);0==d[I]&&0<e[I]&&e[e[I]-1].src&&d[F](e[e[I]-1]);for(e=0;e<d[I];++e)d[e][Aa]("gapi_processed")||(d[e][w]("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=Zb(f))&&b[F](f));a&&(d={},Yb(d,a),c[F](d));d=Vb("cd");a=0;for(b=d[I];a<b;++a)Yb(Wb(),d[a]);d=Vb("ci");a=0;for(b=d[I];a<b;++a)Yb(Wb(),d[a]);a=0;for(b=c[I];a<b;++a)Yb(Wb(),c[a])},Y=function(a){if(!a)return Wb();a=a[A]("/");for(var b=Wb(),c=0,d=a[I];b&&
"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a[I]&&void 0!==b?b:void 0},ac=function(a,b){var c=a;if("string"===typeof a){for(var d=c={},e=a[A]("/"),f=0,g=e[I];f<g-1;++f)var h={},d=d[e[f]]=h;d[e[f]]=b}$b(c)};var bc=function(){var a=k.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),Q(W,"ci",[])[F](a),k.__GOOGLEAPIS=void 0)};var cc={apppackagename:1,callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},dc=!1,ec=R(),fc=function(){if(!dc){for(var a=q[pa]("meta"),b=0;b<a[I];++b){var c=a[b].name[Fa]();if(0==c.lastIndexOf("google-signin-",0)){var c=c[Ca](14),d=a[b].content;cc[c]&&d&&(ec[c]=d)}}if(k.self!==k.top){var a=q[B][z](),e;for(e in cc)0<cc[e]&&(b=V(a,e,""))&&(ec[e]=b)}dc=!0}e=R();T(ec,e);return e},gc=function(a){return!!(a.clientid&&a.scope&&a.callback)};var hc=k.console,ic=function(a){hc&&hc.log&&hc.log(a)};var jc=function(){return!!W.oa},kc=function(){};var Z=Q(W,"rw",R()),lc=function(a){for(var b in Z)a(Z[b])},mc=function(a,b){var c=Z[a];c&&c.state<b&&(c.state=b)};var nc;var oc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,pc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,qc=function(a){var b=Y("googleapis.config/sessionIndex");null==b&&(b=k.__X_GOOG_AUTHUSER);if(null==b){var c=k.google;c&&(b=c.authuser)}null==b&&(a=a||k[B][C],b=V(a,"authuser")||null,null==b&&(b=(b=a[ma](oc))?b[1]:null));return null==b?null:r(b)},rc=function(a){var b=Y("googleapis.config/sessionDelegate");null==b&&(b=(a=(a||k[B][C])[ma](pc))?
a[1]:null);return null==b?null:r(b)};var sc=function(){this.c=-1};var tc=function(){this.c=-1;this.c=64;this.b=[];this.p=[];this.P=[];this.n=[];this.n[0]=128;for(var a=1;a<this.c;++a)this.n[a]=0;this.l=this.g=0;this.reset()};(function(){function a(){}a.prototype=sc[J];tc.ba=sc[J];tc.prototype=new a;tc.J=function(a,c,d){for(var e=ca(arguments[I]-2),f=2;f<arguments[I];f++)e[f-2]=arguments[f];return sc[J][c][E](a,e)}})();tc[J].reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.l=this.g=0};
var uc=function(a,b,c){c||(c=0);var d=a.P;if("string"==typeof b)for(var e=0;16>e;e++)d[e]=b[Ba](c)<<24|b[Ba](c+1)<<16|b[Ba](c+2)<<8|b[Ba](c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];for(var g=a.b[2],h=a.b[3],l=a.b[4],m,e=0;80>e;e++)40>e?20>e?(f=h^c&(g^h),m=1518500249):(f=c^g^h,m=1859775393):60>e?(f=c&g|h&(c|g),m=2400959708):(f=c^g^h,m=3395469782),f=(b<<5|b>>>27)+
f+l+m+d[e]&4294967295,l=h,h=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+l&4294967295};
tc[J].update=function(a,b){if(null!=a){void 0===b&&(b=a[I]);for(var c=b-this.c,d=0,e=this.p,f=this.g;d<b;){if(0==f)for(;d<=c;)uc(this,a,d),d+=this.c;if("string"==typeof a)for(;d<b;){if(e[f]=a[Ba](d),++f,++d,f==this.c){uc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.c){uc(this,e);f=0;break}}this.g=f;this.l+=b}};var vc=function(){this.q=new tc};vc[J].reset=function(){this.q.reset()};var wc=O.crypto,xc=!1,yc=0,zc=0,Ac=1,Bc=0,Cc="",Dc=function(a){a=a||O.event;var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date)[oa]()%1E6*b;Ac=Ac*b%Bc;0<yc&&++zc==yc&&db("mousemove",Dc,"remove","de")},Ec=function(a){var b=new vc;a=unescape(aa(a));for(var c=[],d=0,e=a[I];d<e;++d)c[F](a[Ba](d));b.q[Ea](c);a=b.q;b=[];d=8*a.l;56>a.g?a[Ea](a.n,56-a.g):a[Ea](a.n,a.c-(a.g-56));for(c=a.c-1;56<=c;c--)a.p[c]=d&255,d/=256;uc(a,a.p);for(c=d=0;5>c;c++)for(e=24;0<=e;e-=8)b[d]=a.b[c]>>e&255,++d;
a="";for(c=0;c<b[I];c++)a+="0123456789ABCDEF"[la](Math.floor(b[c]/16))+"0123456789ABCDEF"[la](b[c]%16);return a},xc=!!wc&&"function"==typeof wc.getRandomValues;xc||(Bc=1E6*(screen[ja]*screen[ja]+screen[ua]),Cc=Ec(P.cookie+"|"+P[B]+"|"+(new Date)[oa]()+"|"+Math.random()),yc=Y("random/maxObserveMousemove")||0,0!=yc&&db("mousemove",Dc,"add","at"));
var Fc=function(){var a=Ac,a=a+da(Cc[y](0,20),16);Cc=Ec(Cc);return a/(Bc+Math.pow(16,20))},Gc=function(){var a=new O.Uint32Array(1);wc.getRandomValues(a);return Number("0."+a[0])};var Hc=function(){var a=W.onl;if(!a){a=R();W.onl=a;var b=R();a.e=function(a){var d=b[a];d&&(delete b[a],d())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},Ic=function(a,b){var c=b.onload;return"function"===typeof c?(Hc().a(a,c),c):null},Jc=function(a){Wa(/^\w+$/[G](a),"Unsupported id - "+a);Hc();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},Kc=function(a){Hc().r(a)};var Lc={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},Mc={allowtransparency:!0,onload:!0},Nc=0,Oc=function(a){Wa(!a||cb[G](a),"Illegal url for new iframe - "+a)},Pc=function(a,b,c,d,e){Oc(c.src);var f,g=Ic(d,c),h=g?Jc(d):"";try{f=a[u]('<iframe frameborder="'+Ta(r(c.frameborder))+'" scrolling="'+Ta(r(c.scrolling))+'" '+h+' name="'+Ta(r(c.name))+'"/>')}catch(l){f=a[u]("iframe"),g&&(f.onload=function(){f.onload=
null;g[L](this)},Kc(d))}for(var m in c)a=c[m],"style"===m&&"object"===typeof a?T(a,f[qa]):Mc[m]||f[w](m,r(a));(m=e&&e.beforeNode||null)||e&&e.dontclear||ib(b);b.insertBefore(f,m);f=m?m.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var Qc=/^:[\w]+$/,Rc=/:([a-zA-Z_]+):/g,Sc=function(){var a=qc()||"0",b=rc(),c;c=qc(void 0)||a;var d=rc(void 0),e="";c&&(e+="u/"+c+"/");d&&(e+="b/"+d+"/");c=e||null;(e=(d=!1===Y("isLoggedIn"))?"_/im/":"")&&(c="");var f=Y("iframes/:socialhost:"),g=Y("iframes/:im_socialhost:");return nc={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}},Tc=function(a,b){return Sc()[b]||""},Uc=function(a){return function(b,c){return a?Sc()[c]||a[c]||"":Sc()[c]||""}};var Vc={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Wc=function(a){var b,c,d;b=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return b[G](a)?'"'+a[t](b,function(a){var b=Vc[a];if(b)return b;b=a[Ba]();return"\\u00"+Math.floor(b/16)[z](16)+(b%16)[z](16)})+'"':'"'+a+'"';case "number":return isFinite(a)?r(a):"null";case "boolean":case "null":return r(a);case "object":if(!a)return"null";b=[];if("number"===typeof a[I]&&!a.propertyIsEnumerable("length")){d=
a[I];for(c=0;c<d;c+=1)b[F](Wc(a[c])||"null");return"["+b[N](",")+"]"}for(c in a)!/___$/[G](c)&&S(a,c)&&"string"===typeof c&&(d=Wc(a[c]))&&b[F](Wc(c)+":"+d);return"{"+b[N](",")+"}"}return""}},Xc=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/[G](a[t](/\\["\\\/b-u]/g,"@")[t](/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")[t](/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}return!1},Yc=!1;try{Yc=!!k[wa]&&'["a"]'===k[wa].stringify(["a"])&&"a"===k[wa].parse('["a"]')[0]}catch(Zc){}
var $c=function(a){try{return k[wa].parse(a)}catch(b){return!1}},ad=Yc?k[wa].stringify:Wc,bd=Yc?$c:Xc;var cd=function(a){var b;a[ma](/^https?%3A/i)&&(b=ea(a));return bb(q,b?b:a)},dd=function(a){a=a||"canonical";for(var b=q[pa]("link"),c=0,d=b[I];c<d;c++){var e=b[c],f=e[Aa]("rel");if(f&&f[Fa]()==a&&(e=e[Aa]("href"))&&(e=cd(e))&&null!=e[ma](/^https?:\/\/[\w\-\_\.]+/i))return e}return k[B][C]};var ed={se:"0"},fd={post:!0},gd={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},hd="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),id=Q(W,"WI",R()),jd=function(a,b,c){var d,e;d={};var f=e=a;"plus"==a&&b[sa]&&(e=a+"_"+b[sa],f=a+"/"+b[sa]);(e=Y("iframes/"+e+"/url"))||(e=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");for(var g in ed)d[g]=g+"/"+(b[g]||ed[g])+"/";d=bb(P,e[t](Rc,Uc(d)));g="iframes/"+
a+"/params/";f={};T(b,f);(e=Y("lang")||Y("gwidget/lang"))&&(f.hl=e);fd[a]||(f.origin=k[B].origin||k[B][ra]+"//"+k[B].host);f.exp=Y(g+"exp");if(g=Y(g+"location"))for(e=0;e<g[I];e++){var h=g[e];f[h]=O[B][h]}switch(a){case "plus":case "follow":g=f[C];e=b[sa]?void 0:"publisher";g=(g="string"==typeof g?g:void 0)?cd(g):dd(e);f.url=g;delete f[C];break;case "plusone":g=(g=b[C])?cd(g):dd();f.url=g;g=b.db;e=Y();null==g&&e&&(g=e.db,null==g&&(g=e.gwidget&&e.gwidget.db));f.db=g||void 0;g=b.ecp;e=Y();null==g&&
e&&(g=e.ecp,null==g&&(g=e.gwidget&&e.gwidget.ecp));f.ecp=g||void 0;delete f[C];break;case "signin":f.url=dd()}W.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;for(var l in ed)f[l]&&delete f[l];f.gsrc=Y("iframes/:source:");l=Y("inline/css");"undefined"!==typeof l&&0<c&&l>=c&&(f.ic="1");l=/^#|^fr-/;c={};for(var m in f)S(f,m)&&l[G](m)&&(c[m[t](l,"")]=f[m],delete f[m]);m="q"==Y("iframes/"+a+"/params/si")?f:c;l=fc();for(var n in l)!S(l,n)||S(f,n)||S(c,n)||(m[n]=l[n]);n=[][ka](hd);(m=Y("iframes/"+
a+"/methods"))&&"object"===typeof m&&La[G](m[F])&&(n=n[ka](m));for(var p in b)S(b,p)&&/^on/[G](p)&&("plus"!=a||"onconnect"!=p)&&(n[F](p),delete f[p]);delete f.callback;c._methods=n[N](",");return ab(d,f,c)},kd=["style","data-gapiscan"],md=function(a){for(var b=R(),c=0!=a[xa][Fa]()[H]("g:"),d=0,e=a[ta][I];d<e;d++){var f=a[ta][d],g=f.name,h=f.value;0<=Ma[L](kd,g)||c&&0!=g[H]("data-")||"null"===h||"specified"in f&&!f.specified||(c&&(g=g[y](5)),b[g[Fa]()]=h)}a=a[qa];(c=ld(a&&a[ua]))&&(b.height=r(c));
(a=ld(a&&a[ja]))&&(b.width=r(a));return b},ld=function(a){var b=void 0;"number"===typeof a?b=a:"string"===typeof a&&(b=da(a,10));return b},od=function(){var a=W.drw;lc(function(b){if(a!==b.id&&4!=b.state&&"share"!=b[ya]){var c=b.id,d=b[ya],e=b.url;b=b.userParams;var f=P[va](c);if(f){var g=jd(d,b,0);g?(f=f[M],e[t](/\#.*/,"")[t](/(\?|&)ic=1/,"")!==g[t](/\#.*/,"")[t](/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,fa(b,d),nd(f,b),(d=Z[f.lastChild.id])&&(d.oid=c),mc(c,4))):delete Z[c]}else delete Z[c]}})};var pd,qd,rd,sd,td,ud=/(?:^|\s)g-((\S)*)(?:$|\s)/,vd={plusone:!0,autocomplete:!0,profile:!0,signin:!0};pd=Q(W,"SW",R());qd=Q(W,"SA",R());rd=Q(W,"SM",R());sd=Q(W,"FW",[]);td=null;
var xd=function(a,b){wd(void 0,!1,a,b)},wd=function(a,b,c,d){ub("ps0",!0);c=("string"===typeof c?q[va](c):c)||P;var e;e=P[Da];if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:Ua(pd)[ka](Ua(qd))[ka](Ua(rd));for(var f=[],g=0;g<e[I];g++){var h=e[g];f[F](".g-"+h,"g\\:"+h)}e=c.querySelectorAll(f[N](","))}else e=c[pa]("*");c=R();for(f=0;f<e[I];f++){g=e[f];var l=g,h=d,m=l[xa][Fa](),n=void 0;l[Aa]("data-gapiscan")?h=null:(0==m[H]("g:")?n=m[y](2):(l=(l=r(l.className||l[Aa]("class")))&&ud[ia](l))&&(n=l[1]),h=!n||
!(pd[n]||qd[n]||rd[n])||h&&n!==h?null:n);h&&(vd[h]||0==g[xa][Fa]()[H]("g:")||0!=Ua(md(g))[I])&&(g[w]("data-gapiscan",!0),Q(c,h,[])[F](g))}if(b)for(var p in c)for(b=c[p],d=0;d<b[I];d++)b[d][w]("data-onload",!0);for(var x in c)sd[F](x);ub("ps1",!0);if((p=sd[N](":"))||a)try{U.load(p,a)}catch(D){ic(D);return}if(yd(td||{}))for(var v in c){a=c[v];x=0;for(b=a[I];x<b;x++)a[x].removeAttribute("data-gapiscan");zd(v)}else{d=[];for(v in c)for(a=c[v],x=0,b=a[I];x<b;x++)e=a[x],Ad(v,e,md(e),d,b);Bd(p,d)}},Cd=function(a){var b=
Q(U,a,{});b.go||(b.go=function(b){return xd(b,a)},b.render=function(b,d){var e=d||{};fa(e,a);return nd(b,e)})},Dd=function(a){pd[a]=!0},Ed=function(a){qd[a]=!0},Fd=function(a){rd[a]=!0};var zd=function(a,b){var c=mb(a);b&&c?(c(b),(c=b.iframeNode)&&c[w]("data-gapiattached",!0)):U.load(a,function(){var c=mb(a),e=b&&b.iframeNode;e&&c?(c(b),e[w]("data-gapiattached",!0)):(0,U[a].go)(e&&e[M])})},yd=function(){return!1},Bd=function(){},Ad=function(a,b,c,d,e,f){switch(Gd(b,a,f)){case 0:a=rd[a]?a+"_annotation":a;d={};d.iframeNode=b;d.userParams=c;zd(a,d);break;case 1:var g;if(b[M]){for(var h in c){if(f=S(c,h))f=c[h],f=!!f&&"object"===typeof f&&(!f[z]||f[z]===ba[J][z]||f[z]===ca[J][z]);if(f)try{c[h]=
ad(c[h])}catch(l){delete c[h]}}var m=!0;c.dontclear&&(m=!1);delete c.dontclear;kc();f=jd(a,c,e);h={allowPost:1,attributes:gd};h.dontclear=!m;e={};e.userParams=c;e.url=f;fa(e,a);var n;c.rd?n=b:(n=q[u]("div"),b[w]("data-gapistub",!0),n[qa].cssText="position:absolute;width:450px;left:-10000px;",b[M].insertBefore(n,b));e.siteElement=n;n.id||(b=n,Q(id,a,0),m="___"+a+"_"+id[a]++,b.id=m);b=R();b[">type"]=a;T(c,b);m=f;c=n;f=h||{};b=f[ta]||{};Wa(!f.allowPost||!b.onload,"onload is not supported by post iframe");
h=b=m;Qc[G](b)&&(h=Y("iframes/"+h[Ca](1)+"/url"),Wa(!!h,"Unknown iframe url config for - "+b));m=bb(P,h[t](Rc,Tc));b=c.ownerDocument||P;n=0;do h=f.id||["I",Nc++,"_",(new Date)[oa]()][N]("");while(b[va](h)&&5>++n);Wa(5>n,"Error creating iframe id");n={};var p={};b[Da]&&9>b[Da]&&(n.hostiemode=b[Da]);T(f.queryParams||{},n);T(f.fragmentParams||{},p);var x=f.connectWithQueryParams?n:p,D=f.pfname,v=R();v.id=h;v.parent=b[B][ra]+"//"+b[B].host;var K=V(b[B][C],"parent"),D=D||"";!D&&K&&(K=V(b[B][C],"id",""),
D=V(b[B][C],"pfname",""),D=K?D+"/"+K:"");v.pfname=D;T(v,x);(v=V(m,"rpctoken")||n.rpctoken||p.rpctoken)||(v=x.rpctoken=f.rpctoken||r(Math.round(1E8*(xc?Gc():Fc()))));f.rpctoken=v;v=b[B][C];x=R();(K=V(v,"_bsh",W.bsh))&&(x._bsh=K);(v=kb(v))&&(x.jsh=v);f.hintInFragment?T(x,p):T(x,n);n=ab(m,n,p,f.paramsSerializer);p=R();T(Lc,p);T(f[ta],p);p.name=p.id=h;p.src=n;f.eurl=n;if((f||{}).allowPost&&2E3<n[I]){m=Ya(n);p.src="";p["data-postorigin"]=n;n=Pc(b,c,p,h);-1!=navigator.userAgent[H]("WebKit")&&(g=n.contentWindow.document,
g.open(),p=g[u]("div"),x={},v=h+"_inner",x.name=v,x.src="",x.style="display:none",Pc(b,p,x,v,f));p=(f=m.j[0])?f[A]("&"):[];f=[];for(x=0;x<p[I];x++)v=p[x][A]("=",2),f[F]([ea(v[0]),ea(v[1])]);m.j=[];p=b[u]("form");p.action=Za(m);p.method="POST";p.target=h;p[qa].display="none";for(h=0;h<f[I];h++)m=b[u]("input"),fa(m,"hidden"),m.name=f[h][0],m.value=f[h][1],p[ga](m);c[ga](p);p.submit();p[M][za](p);g&&g.close();g=n}else g=Pc(b,c,p,h,f);e.iframeNode=g;e.id=g[Aa]("id");g=e.id;c=R();c.id=g;c.userParams=e.userParams;
c.url=e.url;fa(c,e[ya]);c.state=1;Z[g]=c;g=e}else g=null;g&&((e=g.id)&&d[F](e),zd(a,g))}},Gd=function(a,b,c){if(a&&1===a.nodeType&&b){if(c)return 1;if(rd[b]){if(jb[a[xa][Fa]()])return(a=a.innerHTML)&&a[t](/^[\s\xa0]+|[\s\xa0]+$/g,"")?0:1}else{if(qd[b])return 0;if(pd[b])return 1}}return null},nd=function(a,b){var c=b[ya];delete b[ya];var d=("string"===typeof a?q[va](a):a)||void 0;if(d){var e={},f;for(f in b)S(b,f)&&(e[f[Fa]()]=b[f]);e.rd=1;(f=!!e.ri)&&delete e.ri;var g=[];Ad(c,d,e,g,0,f);Bd(c,g)}else ic("string"===
"gapi."+c+".render: missing element "+typeof a?a:"")};Q(U,"platform",{}).go=xd;var yd=function(a){for(var b=["_c","jsl","h"],c=0;c<b[I]&&a;c++)a=a[b[c]];b=kb(Ja[C]);return!a||0!=a[H]("n;")&&0!=b[H]("n;")&&a!==b},Bd=function(a,b){Hd(a,b)},fb=function(a){wd(a,!0)},Id=function(a,b){for(var c=b||[],d=0;d<c[I];++d)a(c[d]);for(d=0;d<c[I];d++)Cd(c[d])};
yb[F](["platform",function(a,b,c){td=c;b&&sd[F](b);Id(Dd,a);Id(Ed,c._c.annotation);Id(Fd,c._c.bimodal);bc();$b();if("explicit"!=Y("parsetags")){lb(a);gc(fc())&&!Y("disableRealtimeCallback")&&kc();var d;c&&(a=c.callback)&&(d=Va(a),delete c.callback);hb(function(){fb(d)})}}]);U._pl=!0;var Jd=function(a){a=(a=Z[a])?a.oid:void 0;if(a){var b=P[va](a);b&&b[M][za](b);delete Z[a];Jd(a)}};var Kd=/^\{h\:'/,Ld=/^!_/,Md="",Hd=function(a,b){function c(){db("message",d,"remove","de")}function d(d){var g=d.data,h=d.origin;if(Nd(g,b)){var l=e;e=!1;l&&ub("rqe");Od(a,function(){l&&ub("rqd");c();for(var a=Q(W,"RPMQ",[]),b=0;b<a[I];b++)a[b]({data:g,origin:h})})}}if(0!==b[I]){Md=V(Ja[C],"pfname","");var e=!0;db("message",d,"add","at");Ub(a,c)}},Nd=function(a,b){a=r(a);if(Kd[G](a))return!0;var c=!1;Ld[G](a)&&(c=!0,a=a[y](2));if(!/^\{/[G](a))return!1;var d=bd(a);if(!d)return!1;var e=d.f;if(d.s&&
e&&-1!=Ma[L](b,e)){if("_renderstart"===d.s||d.s===Md+"/"+e+"::_renderstart"){var f=d.a&&d.a[c?0:1],c=P[va](e);mc(e,2);if(f&&c&&f[ja]&&f[ua]){n:{d=c[M];e=f||{};if(jc()){var g=c.id;if(g){f=(f=Z[g])?f.state:void 0;if(1===f||4===f)break n;Jd(g)}}(f=d.nextSibling)&&f[Aa]&&f[Aa]("data-gapistub")&&(d[M][za](f),d[qa].cssText="");var f=e[ja],h=e[ua],l=d[qa];l.textIndent="0";l.margin="0";l.padding="0";l.background="transparent";l.borderStyle="none";l.cssFloat="none";l.styleFloat="none";l.lineHeight="normal";
l.fontSize="1px";l.verticalAlign="baseline";d=d[qa];d.display="inline-block";l=c[qa];l.position="static";l.left=0;l.top=0;l.visibility="visible";f&&(d.width=l.width=f+"px");h&&(d.height=l.height=h+"px");e.verticalAlign&&(d.verticalAlign=e.verticalAlign);g&&mc(g,3)}c["data-csi-wdt"]=(new Date)[oa]()}}return!0}return!1},Od=function(a,b){Ub(a,b)};var Pd=function(a,b){this.C=a;var c=b||{};this.T=c.Y;this.B=c.domain;this.D=c.path;this.U=c.Z},Qd=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,Rd=/^[A-Z_][A-Z0-9_]{0,63}$/;
Pd[J].write=function(a,b){if(!Rd[G](this.C))throw"Invalid cookie name";if(!Qd[G](a))throw"Invalid cookie value";var c=this.C+"="+a;this.B&&(c+=";domain="+this.B);this.D&&(c+=";path="+this.D);var d="number"===typeof b?b:this.T;if(0<=d){var e=new Date;e.setSeconds(e.getSeconds()+d);c+=";expires="+e.toUTCString()}this.U&&(c+=";secure");q.cookie=c;return!0};Pd.iterate=function(a){for(var b=q.cookie[A](/;\s*/),c=0;c<b[I];++c){var d=b[c][A]("="),e=d[ha]();a(e,d[N]("="))}};var Sd=function(a){this.W=a},Td={};Sd[J].write=function(a){Td[this.W]=a;return!0};Sd.iterate=function(a){for(var b in Td)Td.hasOwnProperty(b)&&a(b,Td[b])};var Ud="https:"===k[B][ra],Vd=Ud||"http:"===k[B][ra]?Pd:Sd,Wd=function(a){var b=a[y](1),c="",d=k[B].hostname;if(""!==b){c=da(b,10);if(isNaN(c))return null;b=d[A](".");if(b[I]<c-1)return null;b[I]==c-1&&(d="."+d)}else d="";return{d:"S"==a[la](0),domain:d,i:c}},Xd=function(){var a,b=null;Vd.iterate(function(c,d){if(0===c[H]("G_AUTHUSER_")){var e=Wd(c[Ca](11));if(!a||e.d&&!a.d||e.d==a.d&&e.i>a.i)a=e,b=d}});return{R:a,t:b}};var Yd=function(a){if(0!==a[H]("GCSC"))return null;var b={A:!1};a=a[y](4);if(!a)return b;var c=a[la](0);a=a[y](1);var d=a.lastIndexOf("_");if(-1==d)return b;var e=Wd(a[y](d+1));if(null==e)return b;a=a[Ca](0,d);if("_"!==a[la](0))return b;d="E"===c&&e.d;return!d&&("U"!==c||e.d)||d&&!Ud?b:{A:!0,d:d,X:a[y](1),domain:e.domain,i:e.i}},Zd=function(a){if(!a)return[];a=a[A]("=");return a[1]?a[1][A]("|"):[]},$d=function(a){a=a[A](":");return{v:a[0][A]("=")[1],Q:Zd(a[1]),aa:Zd(a[2]),$:Zd(a[3])}},ae=function(){var a=
Xd(),b=a.R,a=a.t;if(null!==a){var c;Vd.iterate(function(a,d){var e=Yd(a);e&&e.A&&e.d==b.d&&e.i==b.i&&(c=d)});if(c){var d=$d(c),e=d&&d.Q[Number(a)],d=d&&d.v;if(e)return{t:a,S:e,v:d}}}return null};var be=function(a){this.H=a};be[J].k=0;be[J].G=2;be[J].H=null;be[J].w=!1;be[J].N=function(){this.w||(this.k=0,this.w=!0,this.F())};be[J].F=function(){this.w&&(this.H()?this.k=this.G:this.k=Math.min(2*(this.k||this.G),120),k.setTimeout(Ia(this.F,this),1E3*this.k))};for(var ce=0;64>ce;++ce);var de=null,jc=function(){return W.oa=!0},kc=function(){W.oa=!0;var a=ae();(a=a&&a.t)&&ac("googleapis.config/sessionIndex",a);de||(de=Q(W,"ss",new be(ee)));a=de;a.N&&a.N()},ee=function(){var a=ae(),b=a&&a.S||null,c=a&&a.v;Ub("auth",{callback:function(){var a=O.gapi.auth,e={client_id:c,session_state:b};a.checkSessionState(e,function(b){var c=e.session_state,h=Y("isLoggedIn");b=Y("debug/forceIm")?!1:c&&b||!c&&!b;if(h=h!=b)ac("isLoggedIn",b),kc(),od(),b||((b=a.signOut)?b():(b=a.setToken)&&b(null));b=
fc();var l=Y("savedUserState"),c=a._guss(b.cookiepolicy),l=l!=c&&"undefined"!=typeof l;ac("savedUserState",c);(h||l)&&gc(b)&&!Y("disableRealtimeCallback")&&a._pimf(b,!0)})}});return!0};ub("bs0",!0,k.gapi._bs);ub("bs1",!0);delete k.gapi._bs;})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"llang":"en","client":{"headers":{"response":["Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","Vary","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid"],"request":["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-role","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"]},"rms":"migrated","cors":false},"plus_layer":{"isEnabled":false},"enableMultilogin":true,"disableRealtimeCallback":false,"isLoggedIn":true,"iframes":{"additnow":{"methods":["launchurl"],"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"photocomments":{"url":":socialhost:/:session_prefix:_/widget/render/photocomments?usegapi\u003d1"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"playreview":{"url":"https://play.google.com/store/ereview?usegapi\u003d1"},"signin":{"methods":["onauth"],"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"youtube":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"reportabuse":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"shortlists":{"url":""},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},":socialhost:":"https://apis.google.com","post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p","blogger":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"udc_webconsentflow":{"params":{"url":""},"url":"https://www.google.com/settings/webconsent?usegapi\u003d1"},"savetodrive":{"methods":["save"],"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com","ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},":signuphost:":"https://plus.google.com","plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1"},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"}},"isPlusUser":true,"debug":{"host":"https://apis.google.com","forceIm":false,"reportExceptionRate":0.05,"rethrowException":false},"enableContextualSignin":false,"enableSigninTooltip":false,"deviceType":"desktop","inline":{"css":1},"lexps":[99,97,79,109,45,17,117,115,81,127,123,122,61,30],"include_granted_scopes":true,"oauth-flow":{"usegapi":false,"disableOpt":true,"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe"},"report":{"apiRate":{"gapi\\.signin\\..*":0.05},"host":"https://apis.google.com","rate":0.001,"apis":["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.auth\\..*","gapi\\.client\\..*"]},"csi":{"rate":0.01},"googleapis.config":{"auth":{"useFirstPartyAuthV2":true}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.7lLmsdjHxT8.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/t\u003dzcms/rs\u003dAGLTcCNwPa9vfI_3EbTJlk6vG9SghMqJ3w","u":"https://apis.google.com/js/plusone.js","hee":true,"fp":"3cbef534eee58005dbbfec063b141ada75dd8081","dpo":false},"platform":["additnow","blogger","comments","commentcount","community","follow","page","person","playreview","plus","plusone","post","reportabuse","savetodrive","savetowallet","shortlists","visibility","youtube","ytsubscribe","zoomableimage","photocomments","hangout","udc_webconsentflow"],"fp":"3cbef534eee58005dbbfec063b141ada75dd8081","annotation":["interactivepost","recobar","autocomplete","profile"],"bimodal":["signin","share"]}});