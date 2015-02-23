var h;var l=this,aa=function(){},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},n=function(a,b,c){n=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
ba:ca;return n.apply(null,arguments)},p=function(a,b){function c(){}c.prototype=b.prototype;a.o=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.K=function(a,c,f){for(var k=Array(arguments.length-2),g=2;g<arguments.length;g++)k[g-2]=arguments[g];return b.prototype[c].apply(a,k)}};Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return n.apply(null,c)}return n(this,a)};var q=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,q);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};p(q,Error);q.prototype.name="CustomError";var da=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},r=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},t=function(a,b){return a<b?-1:a>b?1:0};var u=function(a,b){b.unshift(a);q.call(this,da.apply(null,b));b.shift()};p(u,q);u.prototype.name="AssertionError";var ea=function(a){throw a;},fa=ea,v=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);d=new u(""+d,e||[]);fa(d)}return a};var w=Array.prototype,ga=w.indexOf?function(a,b,c){v(null!=a.length);return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if("string"==typeof a)return"string"==typeof b&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},x=function(a,b){v(null!=a.length);return 1==w.splice.call(a,b,1).length};var B=function(){this.r=""};B.prototype.toString=function(){return"SafeStyle{"+this.r+"}"};var ha=new B;ha.r="";var C=function(){this.q=""};C.prototype.toString=function(){return"SafeStyleSheet{"+this.q+"}"};var ia=new C;ia.q="";var D=function(){this.p="";this.H=null};D.prototype.toString=function(){return"SafeHtml{"+this.p+"}"};var ja=new D;ja.p="";ja.H=0;var E;t:{var ka=l.navigator;if(ka){var la=ka.userAgent;if(la){E=la;break t}}E=""}var F=function(a){var b=E;return-1!=b.indexOf(a)},ma=function(a){var b=E;return-1!=b.toLowerCase().indexOf(a.toLowerCase())};var na=function(){return F("Opera")||F("OPR")},oa=function(){return F("Trident")||F("MSIE")},pa=na,qa=oa;var ra=pa(),G=qa(),H=F("Gecko")&&!ma("WebKit")&&!(F("Trident")||F("MSIE")),I=ma("WebKit"),ta=function(){var a="",b;if(ra&&l.opera)return a=l.opera.version,"function"==m(a)?a():a;H?b=/rv\:([^\);]+)(\)|;)/:G?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:I&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(E))?a[1]:"");return G&&(b=sa(),b>parseFloat(a))?String(b):a},sa=function(){var a=l.document;return a?a.documentMode:void 0},ua=ta(),va={},J=function(a){var b;if(!(b=va[a])){var c=a,d=0;b=r(String(ua)).split(".");for(var c=
r(String(c)).split("."),e=Math.max(b.length,c.length),f=0;0==d&&f<e;f++){var k=b[f]||"",g=c[f]||"",y=RegExp("(\\d*)(\\D*)","g"),Ja=RegExp("(\\d*)(\\D*)","g");do{var z=y.exec(k)||["","",""],A=Ja.exec(g)||["","",""];if(0==z[0].length&&0==A[0].length)break;var d=0==z[1].length?0:parseInt(z[1],10),Ka=0==A[1].length?0:parseInt(A[1],10),d=t(d,Ka)||t(0==z[2].length,0==A[2].length)||t(z[2],A[2])}while(0==d)}b=d;b=va[a]=0<=b}return b},K;var wa=l.document;
if(wa&&G){var xa=sa();K=xa||("CSS1Compat"==wa.compatMode?parseInt(ua,10):5)}else K=void 0;var ya=K;!H&&!G||G&&G&&9<=ya||H&&J("1.9.1");G&&J("9");var L=[],za=!1;var M=function(a){M[" "](a);return a};M[" "]=aa;var Aa=!G||G&&9<=ya,Ba=G&&!J("9");!I||J("528");H&&J("1.9b")||G&&J("8")||ra&&J("9.5")||I&&J("528");H&&!J("8")||G&&J("9");var Ca=function(a){this.id=a};Ca.prototype.toString=function(){return this.id};var N=function(a,b){this.type=a instanceof Ca?String(a):a;this.currentTarget=this.target=b;this.defaultPrevented=this.k=!1};N.prototype.stopPropagation=function(){this.k=!0};N.prototype.preventDefault=function(){this.defaultPrevented=!0};var O=function(a,b){N.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.b=this.state=null;a&&this.G(a,b)};p(O,N);h=O.prototype;
h.G=function(a,b){this.b=a;var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(H){var e;t:{try{M(d.nodeName);e=!0;break t}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;Object.defineProperties?Object.defineProperties(this,{offsetX:{configurable:!0,enumerable:!0,get:this.l,set:this.u},offsetY:{configurable:!0,enumerable:!0,get:this.m,set:this.v}}):(this.offsetX=this.l(),this.offsetY=
this.m());this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;a.defaultPrevented&&this.preventDefault()};
h.stopPropagation=function(){O.o.stopPropagation.call(this);this.b.stopPropagation?this.b.stopPropagation():this.b.cancelBubble=!0};h.preventDefault=function(){O.o.preventDefault.call(this);var a=this.b;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ba)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};h.l=function(){return I||void 0!==this.b.offsetX?this.b.offsetX:this.b.layerX};
h.u=function(a){Object.defineProperties(this,{offsetX:{writable:!0,enumerable:!0,configurable:!0,value:a}})};h.m=function(){return I||void 0!==this.b.offsetY?this.b.offsetY:this.b.layerY};h.v=function(a){Object.defineProperties(this,{offsetY:{writable:!0,enumerable:!0,configurable:!0,value:a}})};var Da="closure_listenable_"+(1E6*Math.random()|0),Ea=0;var Fa=function(a,b,c,d,e,f){this.c=a;this.g=b;this.src=c;this.type=d;this.h=!!e;this.j=f;this.key=++Ea;this.d=this.i=!1};Fa.prototype.f=function(){this.d=!0;this.j=this.src=this.g=this.c=null};var P=function(a){this.src=a;this.a={};this.e=0};h=P.prototype;h.s=function(){return this.e};h.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.e++);var k=Ga(a,b,d,e);-1<k?(b=a[k],c||(b.i=!1)):(b=new Fa(b,null,this.src,f,!!d,e),b.i=c,a.push(b));return b};h.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=Ga(e,b,c,d);return-1<b?(c=e[b],c.f(),x(e,b),0==e.length&&(delete this.a[a],this.e--),!0):!1};
h.t=function(a){var b=a.type;if(!(b in this.a))return!1;var c;c=this.a[b];var d=ga(c,a),e;(e=0<=d)&&x(c,d);if(c=e)a.f(),0==this.a[b].length&&(delete this.a[b],this.e--);return c};h.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.a)if(!a||c==a){for(var d=this.a[c],e=0;e<d.length;e++)++b,d[e].f();delete this.a[c];this.e--}return b};var Ga=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.d&&f.c==b&&f.h==!!c&&f.j==d)return e}return-1};var Q="closure_lm_"+(1E6*Math.random()|0),R={},Ha=0,Ia=function(a,b,c,d,e){if("array"==m(b)){for(var f=0;f<b.length;f++)Ia(a,b[f],c,d,e);return null}c=La(c);if(a&&a[Da])a=a.J(b,c,d,e);else{f=e;if(!b)throw Error("Invalid event type");e=!!d;var k=S(a);k||(a[Q]=k=new P(a));d=k.add(b,c,!1,d,f);d.g||(c=Ma(),d.g=c,c.src=a,c.c=d,a.addEventListener?a.addEventListener(b.toString(),c,e):a.attachEvent(Na(b.toString()),c),Ha++);a=d}return a},Ma=function(){var a=T,b=Aa?function(c){return a.call(b.src,b.c,c)}:
function(c){c=a.call(b.src,b.c,c);if(!c)return c};return b},Oa=function(a){if("number"==typeof a||!a||a.d)return!1;var b=a.src;if(b&&b[Da])return b.I(a);var c=a.type,d=a.g;b.removeEventListener?b.removeEventListener(c,d,a.h):b.detachEvent&&b.detachEvent(Na(c),d);Ha--;(c=S(b))?(c.t(a),0==c.s()&&(c.src=null,b[Q]=null)):a.f();return!0},Na=function(a){return a in R?R[a]:R[a]="on"+a},Qa=function(a,b,c,d){var e=!0;if(a=S(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.h==
c&&!f.d&&(f=Pa(f,d),e=e&&!1!==f)}return e},Pa=function(a,b){var c=a.c,d=a.j||a.src;a.i&&Oa(a);return c.call(d,b)},T=function(a,b){if(a.d)return!0;if(!Aa){var c;if(!(c=b))t:{c=["window","event"];for(var d=l,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break t}c=d}e=c;c=new O(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){t:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break t}catch(k){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=
a.type,g=e.length-1;!c.k&&0<=g;g--){c.currentTarget=e[g];var y=Qa(e[g],f,!0,c),d=d&&y}for(g=0;!c.k&&g<e.length;g++)c.currentTarget=e[g],y=Qa(e[g],f,!1,c),d=d&&y}return d}return Pa(a,new O(b,this))},S=function(a){a=a[Q];return a instanceof P?a:null},U="__closure_events_fn_"+(1E9*Math.random()>>>0),La=function(a){v(a,"Listener can not be null.");if("function"==m(a))return a;v(a.handleEvent,"An object listener must have handleEvent method.");a[U]||(a[U]=function(b){return a.handleEvent(b)});return a[U]};
if(za)for(var V=0;V<L.length;V++)var Ra=n(L[V].L,L[V]),T=Ra(T);var W=function(a,b,c,d,e,f){this.w=a;this.A=b;this.B=c;this.C=d;this.D="string"==typeof e?document.getElementById(e):e;this.n=f||new google.visualization.GeoChart(this.D);null==f&&google.visualization.events.addListener(this.n,"regionClick",n(this.F,this));Ia(window,"resize",n(this.draw,this))},Sa=W,X=["trends","GeoMap"],Y=l;X[0]in Y||!Y.execScript||Y.execScript("var "+X[0]);for(var Z;X.length&&(Z=X.shift());)X.length||void 0===Sa?Y=Y[Z]?Y[Z]:Y[Z]={}:Y[Z]=Sa;
W.prototype.draw=function(){this.n.draw(google.visualization.arrayToDataTable(this.w),this.A)};W.prototype.draw=W.prototype.draw;W.prototype.F=function(a){a.region&&(a=a.region,"dma"==this.C&&(a=a.replace(/^[A-Z]{2}-/,"")),l.geoMapCodeOverrides&&l.geoMapCodeOverrides[a]&&(a=l.geoMapCodeOverrides[a]),window.location.href=this.B.replace(/%25s/g,a))};
