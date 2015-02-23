/**
 * @file
 * Documentation missing.
 */

(function ($) {
  Drupal.behaviors.puppet_admin_tools = {
    attach: function (context, settings) {
      var val;
      $('div.text-format-wrapper', context).once('puppet-admin-tools-text', function() {
        val = $(this).find('div.format-toggle select').val()
        $(this).find('div.form-type-textarea textarea').addClass(val)
      })

      $('div.text-format-wrapper div.format-toggle select', context).on('focus', function () {
        val = this.value;

      }).change(function() {
        var textarea = $('div.text-format-wrapper div.form-type-textarea textarea')
        textarea.removeClass(val)
        val = this.value
        textarea.addClass(val)
      });
    }
  }
}(jQuery))
;/**/
/* Modernizr 2.8.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_calc-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("csscalc",function(){var a="width:",b="calc(10px);",c=document.createElement("div");return c.style.cssText=a+Modernizr._prefixes.join(b+a),!!c.style.length});
;/**/
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(d){d.timeago=function(h){if(h instanceof Date){return a(h)}else{if(typeof h==="string"){return a(d.timeago.parse(h))}else{if(typeof h==="number"){return a(new Date(h))}else{return a(d.timeago.datetime(h))}}}};var g=d.timeago;d.extend(d.timeago,{settings:{refreshMillis:60000,allowFuture:false,localeTitle:false,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(n){var o=this.settings.strings;var k=o.prefixAgo;var s=o.suffixAgo;if(this.settings.allowFuture){if(n<0){k=o.prefixFromNow;s=o.suffixFromNow}}var q=Math.abs(n)/1000;var h=q/60;var p=h/60;var r=p/24;var l=r/365;function j(t,v){var u=d.isFunction(t)?t(v,n):t;var w=(o.numbers&&o.numbers[v])||v;return u.replace(/%d/i,w)}var m=q<45&&j(o.seconds,Math.round(q))||q<90&&j(o.minute,1)||h<45&&j(o.minutes,Math.round(h))||h<90&&j(o.hour,1)||p<24&&j(o.hours,Math.round(p))||p<42&&j(o.day,1)||r<30&&j(o.days,Math.round(r))||r<45&&j(o.month,1)||r<365&&j(o.months,Math.round(r/30))||l<1.5&&j(o.year,1)||j(o.years,Math.round(l));var i=o.wordSeparator||"";if(o.wordSeparator===undefined){i=" "}return d.trim([k,m,s].join(i))},parse:function(i){var h=d.trim(i);h=h.replace(/\.\d+/,"");h=h.replace(/-/,"/").replace(/-/,"/");h=h.replace(/T/," ").replace(/Z/," UTC");h=h.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");return new Date(h)},datetime:function(i){var h=g.isTime(i)?d(i).attr("datetime"):d(i).attr("title");return g.parse(h)},isTime:function(h){return d(h).get(0).tagName.toLowerCase()==="time"}});var e={init:function(){var i=d.proxy(c,this);i();var h=g.settings;if(h.refreshMillis>0){setInterval(i,h.refreshMillis)}},update:function(h){d(this).data("timeago",{datetime:g.parse(h)});c.apply(this)},updateFromDOM:function(){d(this).data("timeago",{datetime:g.parse(g.isTime(this)?d(this).attr("datetime"):d(this).attr("title"))});c.apply(this)}};d.fn.timeago=function(j,h){var i=j?e[j]:e.init;if(!i){throw new Error("Unknown function name '"+j+"' for timeago")}this.each(function(){i.call(this,h)});return this};function c(){var i=b(this);var h=g.settings;if(!isNaN(i.datetime)){if(h.cutoff==0||f(i.datetime)<h.cutoff){d(this).text(a(i.datetime))}}return this}function b(h){h=d(h);if(!h.data("timeago")){h.data("timeago",{datetime:g.datetime(h)});var i=d.trim(h.text());if(g.settings.localeTitle){h.attr("title",h.data("timeago").datetime.toLocaleString())}else{if(i.length>0&&!(g.isTime(h)&&h.attr("title"))){h.attr("title",i)}}}return h.data("timeago")}function a(h){return g.inWords(f(h))}function f(h){return(new Date().getTime()-h.getTime())}document.createElement("abbr");document.createElement("time")}));;/**/
/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;(function(d){d.flexslider=function(g,l){var a=d(g);a.vars=d.extend({},d.flexslider.defaults,l);var e=a.vars.namespace,v=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,t=("ontouchstart"in window||v||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,m="",u,p="vertical"===a.vars.direction,n=a.vars.reverse,h=0<a.vars.itemWidth,r="fade"===a.vars.animation,q=""!==a.vars.asNavFor,c={};d.data(g,"flexslider",a);c={init:function(){a.animating=!1;a.currentSlide=parseInt(a.vars.startAt?
a.vars.startAt:0,10);isNaN(a.currentSlide)&&(a.currentSlide=0);a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" "));a.slides=d(a.vars.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(a.vars.sync).length;"slide"===a.vars.animation&&(a.vars.animation="swing");a.prop=p?"top":"marginLeft";a.args={};a.manualPause=!1;a.stopped=!1;a.started=!1;a.startTimeout=null;
a.transitions=!a.vars.video&&!r&&a.vars.useCSS&&function(){var b=document.createElement("div"),f=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],k;for(k in f)if(void 0!==b.style[f[k]])return a.pfx=f[k].replace("Perspective","").toLowerCase(),a.prop="-"+a.pfx+"-transform",!0;return!1}();""!==a.vars.controlsContainer&&(a.controlsContainer=0<d(a.vars.controlsContainer).length&&d(a.vars.controlsContainer));""!==a.vars.manualControls&&(a.manualControls=0<d(a.vars.manualControls).length&&
d(a.vars.manualControls));a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();a.setup("init");a.vars.controlNav&&c.controlNav.setup();a.vars.directionNav&&c.directionNav.setup();a.vars.keyboard&&(1===d(a.containerSelector).length||a.vars.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;a.animating||39!==b&&37!==b||(b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,a.vars.pauseOnAction))});
a.vars.mousewheel&&a.bind("mousewheel",function(b,f,k,d){b.preventDefault();b=0>f?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,a.vars.pauseOnAction)});a.vars.pausePlay&&c.pausePlay.setup();a.vars.slideshow&&a.vars.pauseInvisible&&c.pauseInvisible.init();a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){a.manualPlay||a.manualPause||a.pause()},function(){a.manualPause||a.manualPlay||a.stopped||a.play()}),a.vars.pauseInvisible&&c.pauseInvisible.isHidden()||(0<a.vars.initDelay?a.startTimeout=
setTimeout(a.play,a.vars.initDelay):a.play()));q&&c.asNav.setup();t&&a.vars.touch&&c.touch();(!r||r&&a.vars.smoothHeight)&&d(window).bind("resize orientationchange focus",c.resize);a.find("img").attr("draggable","false");setTimeout(function(){a.vars.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");if(v)g._slider=a,a.slides.each(function(){this._gesture=
new MSGesture;this._gesture.target=this;this.addEventListener("MSPointerDown",function(a){a.preventDefault();a.currentTarget._gesture&&a.currentTarget._gesture.addPointer(a.pointerId)},!1);this.addEventListener("MSGestureTap",function(b){b.preventDefault();b=d(this);var f=b.index();d(a.vars.asNavFor).data("flexslider").animating||b.hasClass("active")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})});else a.slides.on("click touchend MSPointerUp",function(b){b.preventDefault();
b=d(this);var f=b.index();0>=b.offset().left-d(a).scrollLeft()&&b.hasClass(e+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):d(a.vars.asNavFor).data("flexslider").animating||b.hasClass(e+"active-slide")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?c.controlNav.setupManual():c.controlNav.setupPaging()},setupPaging:function(){var b=1,f,k;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===
a.vars.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var g=0;g<a.pagingCount;g++)k=a.slides.eq(g),f="thumbnails"===a.vars.controlNav?'<img src="'+k.attr("data-thumb")+'"/>':"<a>"+b+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions&&(k=k.attr("data-thumbcaption"),""!=k&&void 0!=k&&(f+='<span class="'+e+'caption">'+k+"</span>")),a.controlNavScaffold.append("<li>"+f+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):
a.append(a.controlNavScaffold);c.controlNav.set();c.controlNav.active();a.controlNavScaffold.delegate("a, img","click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(a.direction=k>a.currentSlide?"next":"prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},setupManual:function(){a.controlNav=a.manualControls;c.controlNav.active();a.controlNav.bind("click touchend MSPointerUp",
function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(k>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===a.vars.controlNav?"img":"a"),a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,
f){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(f).closest("li").remove();c.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(f,b):c.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+e+'direction-nav"><li><a class="'+e+'prev" href="#">'+a.vars.prevText+'</a></li><li><a class="'+e+'next" href="#">'+a.vars.nextText+"</a></li></ul>");
a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));c.directionNav.update();a.directionNav.bind("click touchend MSPointerUp",function(b){b.preventDefault();var k;if(""===m||m===b.type)k=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev"),a.flexAnimate(k,a.vars.pauseOnAction);""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(){var b=e+"disabled";
1===a.pagingCount?a.directionNav.addClass(b).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(b).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b).attr("tabindex","-1"):a.directionNav.removeClass(b).removeAttr("tabindex")}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
(a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));c.pausePlay.update(a.vars.slideshow?e+"pause":e+"play");a.pausePlay.bind("click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type)d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play());""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
"pause").addClass(e+"play").html(a.vars.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").html(a.vars.pauseText)}},touch:function(){var b,f,k,d,c,e,m=!1,l=0,q=0,s=0;if(v){g.style.msTouchAction="none";g._gesture=new MSGesture;g._gesture.target=g;g.addEventListener("MSPointerDown",t,!1);g._slider=a;g.addEventListener("MSGestureChange",u,!1);g.addEventListener("MSGestureEnd",y,!1);var t=function(b){b.stopPropagation();a.animating?b.preventDefault():(a.pause(),g._gesture.addPointer(b.pointerId),
s=0,d=p?a.h:a.w,e=Number(new Date),k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*d:(a.currentSlide+a.cloneOffset)*d)},u=function(a){a.stopPropagation();var b=a.target._slider;if(b){var f=-a.translationX,h=-a.translationY;c=s+=p?h:f;m=p?Math.abs(s)<Math.abs(-f):Math.abs(s)<Math.abs(-h);if(a.detail===a.MSGESTURE_FLAG_INERTIA)setImmediate(function(){g._gesture.stop()});
else if(!m||500<Number(new Date)-e)a.preventDefault(),!r&&b.transitions&&(b.vars.animationLoop||(c=s/(0===b.currentSlide&&0>s||b.currentSlide===b.last&&0<s?Math.abs(s)/d+2:1)),b.setProps(k+c,"setTouch"))}},y=function(a){a.stopPropagation();if(a=a.target._slider){if(a.animatingTo===a.currentSlide&&!m&&null!==c){var g=n?-c:c,h=0<g?a.getTarget("next"):a.getTarget("prev");a.canAdvance(h)&&(550>Number(new Date)-e&&50<Math.abs(g)||Math.abs(g)>d/2)?a.flexAnimate(h,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,
a.vars.pauseOnAction,!0)}k=c=f=b=null;s=0}}}else{g.addEventListener("touchstart",z,!1);var z=function(c){if(a.animating)c.preventDefault();else if(window.navigator.msPointerEnabled||1===c.touches.length)a.pause(),d=p?a.h:a.w,e=Number(new Date),l=c.touches[0].pageX,q=c.touches[0].pageY,k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*
d:(a.currentSlide+a.cloneOffset)*d,b=p?q:l,f=p?l:q,g.addEventListener("touchmove",w,!1),g.addEventListener("touchend",x,!1)},w=function(g){l=g.touches[0].pageX;q=g.touches[0].pageY;c=p?b-q:b-l;m=p?Math.abs(c)<Math.abs(l-f):Math.abs(c)<Math.abs(q-f);if(!m||500<Number(new Date)-e)g.preventDefault(),!r&&a.transitions&&(a.vars.animationLoop||(c/=0===a.currentSlide&&0>c||a.currentSlide===a.last&&0<c?Math.abs(c)/d+2:1),a.setProps(k+c,"setTouch"))},x=function(h){g.removeEventListener("touchmove",w,!1);if(a.animatingTo===
a.currentSlide&&!m&&null!==c){h=n?-c:c;var l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-e&&50<Math.abs(h)||Math.abs(h)>d/2)?a.flexAnimate(l,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)}g.removeEventListener("touchend",x,!1);k=c=f=b=null}}},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?c.smoothHeight():h?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):p?(a.viewport.height(a.h),a.setProps(a.h,
"setTotal")):(a.vars.smoothHeight&&c.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!p||r){var f=r?a:a.viewport;b?f.animate({height:a.slides.eq(a.animatingTo).height()},b):f.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var f=d(a.vars.sync).data("flexslider"),c=a.animatingTo;switch(b){case "animate":f.flexAnimate(c,a.vars.pauseOnAction,!1,!0);break;case "play":f.playing||f.asNav||f.play();break;case "pause":f.pause()}},
uniqueID:function(a){a.find("[id]").each(function(){var a=d(this);a.attr("id",a.attr("id")+"_clone")});return a},pauseInvisible:{visProp:null,init:function(){var b=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var f=0;f<b.length;f++)b[f]+"Hidden"in document&&(c.pauseInvisible.visProp=b[f]+"Hidden");c.pauseInvisible.visProp&&(b=c.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange",document.addEventListener(b,function(){c.pauseInvisible.isHidden()?a.startTimeout?
clearTimeout(a.startTimeout):a.pause():a.started?a.play():0<a.vars.initDelay?setTimeout(a.play,a.vars.initDelay):a.play()}))},isHidden:function(){return document[c.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(u);u=setTimeout(function(){m=""},3E3)}};a.flexAnimate=function(b,f,k,g,m){a.vars.animationLoop||b===a.currentSlide||(a.direction=b>a.currentSlide?"next":"prev");q&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,
m)||k)&&a.is(":visible")){if(q&&g)if(k=d(a.vars.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,k.flexAnimate(b,!0,!1,!0,m),a.direction=a.currentItem<b?"next":"prev",k.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;
f&&a.pause();a.vars.before(a);a.syncExists&&!m&&c.sync("animate");a.vars.controlNav&&c.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;a.vars.directionNav&&c.directionNav.update();b===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause());if(r)t?(a.slides.eq(a.currentSlide).css({opacity:0,zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.wrapup(l)):(a.slides.eq(a.currentSlide).css({zIndex:1}).animate({opacity:0},a.vars.animationSpeed,
a.vars.easing),a.slides.eq(b).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing,a.wrapup));else{var l=p?a.slides.filter(":first").height():a.computedW;h?(b=a.vars.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?n?(a.count+a.cloneOffset)*l:0:a.currentSlide===a.last&&0===b&&a.vars.animationLoop&&"prev"!==a.direction?n?0:(a.count+1)*l:n?(a.count-1-b+a.cloneOffset)*
l:(b+a.cloneOffset)*l;a.setProps(b,"",a.vars.animationSpeed);a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),a.container.unbind("webkitTransitionEnd transitionend"),a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(l)})):a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){a.wrapup(l)})}a.vars.smoothHeight&&c.smoothHeight(a.vars.animationSpeed)}};a.wrapup=function(b){r||h||(0===a.currentSlide&&a.animatingTo===
a.last&&a.vars.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;a.vars.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.animatedSlides=null;a.playing=!1;a.vars.pausePlay&&c.pausePlay.update("play");a.syncExists&&c.sync("pause")};a.play=function(){a.playing&&clearInterval(a.animatedSlides);
a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed);a.started=a.playing=!0;a.vars.pausePlay&&c.pausePlay.update("pause");a.syncExists&&c.sync("play")};a.stop=function(){a.pause();a.stopped=!0};a.canAdvance=function(b,f){var c=q?a.pagingCount-1:a.last;return f?!0:q&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:q&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b!==a.currentSlide||q?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===
c&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===c&&0===b&&"next"===a.direction?!1:!0:!1};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,f,c){var d=function(){var c=b?b:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo;return-1*function(){if(h)return"setTouch"===f?b:n&&a.animatingTo===a.last?0:n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:
c;switch(f){case "setTotal":return n?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return n?b:a.count*b;case "jumpStart":return n?a.count*b:b;default:return b}}()+"px"}();a.transitions&&(d=p?"translate3d(0,"+d+",0)":"translate3d("+d+",0,0)",c=void 0!==c?c/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",c),a.container.css("transition-duration",c));a.args[a.prop]=d;(a.transitions||void 0===c)&&a.container.css(a.args);
a.container.css("transform",d)};a.setup=function(b){if(r)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(t?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+a.vars.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing)),a.vars.smoothHeight&&c.smoothHeight();else{var f,
g;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,n&&(g=d.makeArray(a.slides).reverse(),a.slides=d(g),a.container.empty().append(a.slides)));a.vars.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),c.uniqueID(a.slides.first().clone().addClass("clone").attr("aria-hidden","true")).appendTo(a.container),c.uniqueID(a.slides.last().clone().addClass("clone").attr("aria-hidden",
"true")).prependTo(a.container));a.newSlides=d(a.vars.selector,a);f=n?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;p&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(f*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(f*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,
"float":"left",display:"block"});a.vars.smoothHeight&&c.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide");a.vars.init(a)};a.doMath=function(){var b=a.slides.first(),c=a.vars.itemMargin,d=a.vars.minItems,e=a.vars.maxItems;a.w=void 0===a.viewport?a.width():a.viewport.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=a.vars.itemWidth+c,a.minW=d?d*a.itemT:a.w,a.maxW=e?e*a.itemT-c:a.w,a.itemW=a.minW>a.w?(a.w-
c*(d-1))/d:a.maxW<a.w?(a.w-c*(e-1))/e:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=0<a.vars.move&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+c*(a.count-1):(a.itemW+c)*a.count-a.w-c):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?
a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(a.vars.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)c.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),c.controlNav.update("remove",a.last);a.vars.directionNav&&c.directionNav.update()};a.addSlide=function(b,c){var e=d(b);a.count+=1;a.last=a.count-1;p&&n?void 0!==c?a.slides.eq(a.count-
c).after(e):a.container.prepend(e):void 0!==c?a.slides.eq(c).before(e):a.container.append(e);a.update(c,"add");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.added(a)};a.removeSlide=function(b){var c=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():p&&n?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(c,"remove");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.removed(a)};c.init()};d(window).blur(function(d){focused=
!1}).focus(function(d){focused=!0});d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,
pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};d.fn.flexslider=function(g){void 0===g&&(g={});if("object"===typeof g)return this.each(function(){var a=d(this),e=a.find(g.selector?g.selector:".slides > li");1===e.length&&!0===g.allowOneSlide||0===e.length?
(e.fadeIn(400),g.start&&g.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,g)});var l=d(this).data("flexslider");switch(g){case "play":l.play();break;case "pause":l.pause();break;case "stop":l.stop();break;case "next":l.flexAnimate(l.getTarget("next"),!0);break;case "prev":case "previous":l.flexAnimate(l.getTarget("prev"),!0);break;default:"number"===typeof g&&l.flexAnimate(g,!0)}}})(jQuery);;/**/
/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (exception) {}
	}

}(this, document, jQuery));;/**/
// jQuery is namespaced inside this function
(function($) {

  Drupal.puppetlabs = Drupal.puppetlabs || {};

  /**
   * Drupal.behaviors is a replacement for jQuery.ready which fires on page
   * ready and then again whenever new DOM elements are inserted into the page.
   * http://stackoverflow.com/questions/3941426/drupal-behaviors
   * http://drupal.org/node/756722
   */
  Drupal.behaviors.puppetlabs = {
    attach: function (context) {

      /**
       * Misc badly written and poorly maintained JavaScript.
       * @TODO - Refactor nearly ALL JavaScript
       */

      // Placeholders on inputs
      $('.blog-search-block .form-text').attr('placeholder','Search the blog');
      $('.pane-lms-search .form-text').attr('placeholder','Search Course Library');
      $('.blog-search-block .form-submit, .pane-lms-search .form-submit').val('');
      $('.newsletter-block #mktFrmSubmit, .newsletter-block-full #mktFrmSubmit').val('');
//      $('#search-block-form .form-submit').val('');
      $('#search-form .form-submit').val('');
      $('.pane-menu-menu-social-rss .icon-rss-feed a, .pane-menu-social-rss .icon-rss-feed a').html("\uf09e");
      $('.menu-name-menu-social .rss a, .menu-name-menu-social .blog a').html("\uf09e");
      $('.menu-name-menu-social .facebook a').html("\uf082");
      $('.menu-name-menu-social .linkedin a').html("\uf08c");
      $('.menu-name-menu-social .google- a').html("\uf0d4");
      $('.menu-name-menu-social .twitter a').html("\uf099");
      $('.menu-name-menu-social .youtube a').html("\uf144");
//      $('input, textarea').placeholder(); // ie9 shim

      // Blog Post social sharing icons ShareThis custom modifications
      $('.custom-share-this .st_googleplus_custom')
        .before("<span class='share-label'>Share</span>")
        .before("<span class='rss-feed'><a href=\"http://feeds.feedburner.com/PuppetLabs\"></a></span>");
      $('.custom-share-this .rss-feed a').html("\uf09e");
      $('.custom-share-this .st_googleplus_custom').html("\uf0d4");
      $('.custom-share-this .st_twitter_custom').html("\uf099");
      $('.custom-share-this .st_facebook_custom').html("\uf082");
      $('.custom-share-this .st_reddit_custom').html("&#xf1a2;");

      // show and hide mobile menu
      $('.p-mobile-trigger').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('fa-bars').toggleClass("fa-times").toggleClass("mobile-on");
        $('#site-header .region-navbar').toggleClass('mobile-show');
      });

      // convert comment dates to relative format
      $("time.timeago").timeago();

      // apply accordions
      $(".accordion").accordion({
        active: false,
        collapsible: true,
        autoHeight: false
      });

      /**
       * Define stuff to happen on individual pages
       * scoped to within an if statement for that page
       */
      var $body = $("body");

      if( $body.hasClass("page-camps") ) {
        // trigger tab click
        $(".promo-previous-camps a").click(function(e) {
          $("#tabs-panels-footer").tabs("select", 1);
        });
      }

      if( $body.hasClass("page-download-pe") ) {
        $('body').once('download-page-drupal-loaded', function() {
          $("#btn-download-pe-new").click(function(e) {
            
            e.preventDefault();
            var $winLoc = "pe-form-instructions"; //test
            $(".sauble.panel-display .row6").slideDown( 400, function() {
              window.location.hash=$winLoc;

              var position = $('#'+ $winLoc).offset().top;
              if ($('html').hasClass('no-touch')){
                position = position - $('html.no-touch .header-wrapper').height();
              }
              $(document).scrollTop(position);
            });
          });
        });
      }

      /**
       * Fluid Width Video
       * see: http://css-tricks.com/NetMag/FluidWidthVideo/demo.php
       * and: https://github.com/davatron5000/FitVids.js
       * and: http://jsfiddle.net/4WmNx/
       */
      // select all the videos
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='slideshare.net']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "iframe[src*='maps.google.com']",
        "iframe[src*='surveygizmo.com']",
        "iframe[src*='wistia.net']",
        "object",
        "embed"
      ]
      , $allVideos = $(document).find(selectors.join(','))
      , clock
      , count = 0
      , handleResize = function() {
        if(count > 100){
          calculateSizes()
          count = 0;
        }
        else{
          clearTimeout(clock);
          clock = setTimeout(calculateSizes,200);
          count += 1;
        }
      }
      , calculateSizes = function() {
        $allVideos.each(function() {
          var $el = $(this);
          var $fluidEl = $el.parent();
          // if this is en embed in an object, use the object's parent
          if ( $el.is("embed") && $el.parent('object').length ) {
            $fluidEl = $el.parent().parent();
          }
          var newWidth = $fluidEl.width();
          $el
              .width(newWidth)
              .height(newWidth * $el.attr('data-aspectRatio'));
        });
        count = 0;
      }

      // prepare the videos by removing width and height
      // and adding aspect ratio in a data attribute
      $allVideos.each(function() {
        $(this)
          // jQuery .data does not work on object/embed elements
          .attr('data-aspectRatio', this.height / this.width)
          .removeAttr('height')
          .removeAttr('width');
      });

      // resize videos when the window size changes
      $(window).resize(handleResize).resize();

      // modal pop-up
      $('.popup-modal').click(function(e) {
        e.preventDefault();
        var content = $(this).html();
        if($(this).hasClass('image'))
        {
          content = '<img src="'+ $(this).attr('data-src') +'" />"';
        }
        modal.open({'content': content });
      });

    }
  } // end drupal.behaviors


  /**
   * Wrapper function for Google Analytics events
   */
  Drupal.puppetlabs.ga_event = function(params) {
    params.splice(0, 0, "_trackEvent");
    if (typeof _gaq === "object") {
      _gaq.push(params);
    }
  }

  /**
   * Collapsing Tables
   * This is pre-existing JS code from the old wordpress site that was brought
   * in unchanged. It is used directly on several pages, including on
   * http://puppetlabs.com/puppet/enterprise-vs-open-source/
   */
  function initDropDownTable() {
    var table = $(".pane-content table:first");
    var contents = table.find("tr.ddContent");
    var headers = contents.prev("tr");

    // init header clicks
    headers.addClass("ddHeader ddHeaderClosed").click( function(e) {
      if ( $(this).hasClass("ddHeaderClosed") ) {
        table.find(".ddHeaderOpen").trigger("click");
        $(this).next("tr.ddContent").removeClass("ddContentClosed").addClass("ddContentOpen").show().find("div:first").slideDown();
        $(this).removeClass("ddHeaderClosed").addClass("ddHeaderOpen");
      } else {
        $(this).next("tr.ddContent").find("div:first").slideUp( 500, function() {
          $(this).parents(".ddContent").removeClass("ddContentOpen").addClass("ddContentClosed").hide().prev("ddHeader").removeClass("ddHeaderOpen").addClass("ddHEaderClosed");
        });
        $(this).removeClass("ddHeaderOpen").addClass("ddHeaderClosed");
      }
      e.preventDefault();
      $(this).blur();
    });

    // hide dropdown content
    contents.addClass("ddContentClosed").hide().find("div:first").hide();

    // make sure row widths stay the same (tends to shift around otherwise)
    table.find("th").each( function() {
      $(this).css( "width" , $(this).width() + "px" );
    });

    // add in first-child class for <IE9
    table.find("tr td:first").addClass("first-child");

    // reshow table once all of this has run
    table.css({
      "visibility": "visible"
    }).hide().fadeIn();
  }

  /**
  * Modal Popup
  */
  var modal = (function(){
    var 
    method = {},
    $overlay,
    $modal,
    $content,
    $close;

    // Center the modal in the viewport
    method.center = function () {
      var top, left;

      top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
      left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

      $modal.css({
        top:top + $(window).scrollTop(), 
        left:left + $(window).scrollLeft()
      });
    };

    // Open the modal
    method.open = function (settings) {
      $content.empty().append(settings.content);

      $modal.css({
        width: settings.width || 'auto', 
        height: settings.height || 'auto'
      });

      method.center();
      $(window).bind('resize.modal', method.center);
      $modal.show();
      $overlay.show();

      window.setTimeout(method.center, 100);
    };

    // Close the modal
    method.close = function () {
      $modal.hide();
      $overlay.hide();
      $content.empty();
      $(window).unbind('resize.modal');
      clearTimeout(window);
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="popup-overlay"></div>');
    $modal = $('<div id="popup-modal"></div>');
    $content = $('<div id="popup-modal-content"></div>');
    $close = $('<a id="popup-close" href="#">close</a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function(){
      $('body').append($overlay, $modal);           
    });

    $close.click(function(e){
      e.preventDefault();
      method.close();
    });

    $overlay.click(function(e){
      method.close();
    });

    return method;
  }());

  // add class to body to reference admin navbar
  $(document).on('drupalViewportOffsetChange', function (event, offsets) {
    if ($('#navbar-administration').hasClass('drupal-navbar')) {
      $('body').addClass('admin-navbar');
    }
  });

  // header menus
  $(document).ready(function() {


    // Handle internal clicks on page anchor href hash links
    // -- Distinguish between "internal" links with puppetlabs.com OR nothing in the URI before the hash
    // -- vs. external links (any other link with a hash in it).
    $('body').on('click', 'a[href*=#]', function(e) {
        e.preventDefault();
        var domains = ['puppetlabs.com', 'localhost'],
            uri = $(this).attr('href'),
            match = uri.match(/.*#/g),
            proceed = false;

        // Does the clicked link contain an allowed domain
        $.each(domains, function(index, domain) {
           var uri_regex = new RegExp(domain);
           var matches = uri.match(uri_regex);
           if (matches) proceed = true;
        });

        // Proceed with overriden position behavior
        if (proceed || match[0].match(/^#/)) {
            var hash = uri.match(/#.*/g)[0];

            // When the URI exists as an element ID
            if ($(hash).length) {
                var position = $(hash).offset().top;
                window.location.hash = hash;
                if ($('html').hasClass('no-touch')) {
                    position = position - $('html.no-touch .header-wrapper').height();
                }

                // Jump to in page position
                $(document).scrollTop(position);

            // When no element exists to be targeted resume default click behavior to in page links
            } else {
                window.location.href = uri;
            }

        // When URI is NOT an internal link
        } else {
          window.location.href = uri;
        }
    });


    // On /email-preferences page handle the "Unsubscribe" checkbox
    $(document).delegate(".page-form-email-preferences #Unsubscribed", 'click', function() {
        var elm = $(this),
            checked = elm.is(":checked");
            if (checked) {
                $("#newsletteroptin, #productnewsoptinv1, #onlinelearningoptinv1, #eventsoptinv1").prop('checked', false);
            }
    });


    // Set class when site is drupal-dev or staging or localhost and perform a check to see if the environment indicator
    // bar exists. If it does, a style offset will take place that makes the Environment Indicator visible in combination
    // with the rest of the site when an admin user is logged in. This will only be visible on drupal-dev and staging.
    var host = window.location.host;
    if (host.match(/^localhost|^drupal-dev|^staging/g) && $('#environment-indicator').css('display') == 'block') {
        $('body').addClass('not-prod');
    }

  });


  /**
   * Enforces equal heights amongst columns.
   * @param selector
   * @param off
   */
  function equalizeHeights( selector, off ) {
    var heights = new Array();

    // Loop to get all element heights
    $(selector).each(function() {

      // Need to let sizes be whatever they want so no overflow on resize
      $(this).css('min-height', '0');
      $(this).css('max-height', 'none');
      $(this).css('height', 'auto');

      // Then add size (no units) to array
      heights.push($(this).height());
    });

    // Find max height of all elements
    var max = Math.max.apply( Math, heights );

    // Turn off equal heights when off flag is passed
    if (off) {
      $(selector).each(function() {
        $(this).css('height', 'auto');
      });
    }

    // Set all heights to max height
    else {
      $(selector).each(function() {
        $(this).css('height', max + 'px');
      });
    }
  }

  $(document).ready(function() {

    /**
     * Video play list handling on /changeagent.
     */
    if ($('div.change-agent-column-content-row5').length) {

      // Load the YouTube iframe API
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Make sure iframes in "playlist" have proper attributes
      var video_group_id = 0;
      $('.video-link iframe', '.video-group').each(function(index, elm) {
        var iframe = $(elm);

        // Give each video group a unique identifier
        var video_group = iframe.closest('.video-group');
        if (!video_group.attr('data-video-group-id')) {
          video_group.attr('data-video-group-id', video_group_id);
          video_group_id += 1;
        }

        // Proceed on video elements that are dummy placeholders
        if (!iframe.hasClass('dummy')) {
          var src = iframe.attr('src');
          var video_id = src.match(/embed\/(.*)/)[1].split('?')[0];

          // Give iframe video-id attribute if it doesn't already have one
          if (!iframe.attr('data-videoid')) {
            iframe.attr('data-videoid', video_id);
          }

          // Make sure YouTube API is enabled for each iframe
          if (!src.match(/enablejsapi/)) {
            iframe.attr('src', src + '&enablejsapi=1');
          }

          // Make sure each iframe has a unique ID
          if (!iframe.attr('id')) {
            iframe.attr('id', 'player-' + (index + 1));
          }
        }
      });

      // Attach event listeners to iframe embeded youtube videos
      var registerYouTubeVideoPlayer = function( iframe ) {
        var this_iframe = iframe;

        // What's the current video player id
        var player_video_id = iframe.attr('data-videoid');

        // Construct new YouTube player
        var player = new YT.Player(iframe.attr('id'), {
          videoId: iframe.attr('data-videoid'),
          height: iframe.attr('height'),
          width: iframe.attr('width'),
          events: {
            'onReady': function onPlayerReady(e) {
            },
            'onStateChange': function onPlayerStateChange(e) {
              var state = e.data;

              // Video has been watched
              if (state === 0) {

                // Determine which videos we need to queue in the playlist
                var playlist = [];
                var next_video = '';
                $('.video-link iframe', '.video-group').each(function(index, elm) {
                  var iframe = $(elm);
                  if (!iframe.hasClass('dummy')) {
                    var src = iframe.attr('src');
                    var video_id = src.match(/embed\/(.*)/)[1].split('?')[0];

                    // Build playlist array
                    //if (player_video_id != video_id) {
                      playlist.push(video_id);
                    //}
                  }
                });

                // Find next video to play
                var index_of_curr = playlist.indexOf(player_video_id);
                var index_of_next = (index_of_curr + 1 >= playlist.length) ? 0 : index_of_curr + 1;
                var next_video_to_click = $('[data-videoid="' + playlist[index_of_next] + '"]').closest('.video-image-container').find('a');
                var curr_video_group = $('[data-videoid="' + playlist[index_of_curr] + '"]').closest('.video-group');
                var next_video_group = next_video_to_click.closest('.video-group');

                // Trigger load of next video
                next_video_to_click.trigger('click');

                // Determine which way to click the more bar arrows to show the active playing video in the video group
                var curr_video_group_id = parseInt(curr_video_group.attr('data-video-group-id'));
                var next_video_group_id = parseInt(next_video_group.attr('data-video-group-id'));
                var acti_video_group_id = parseInt($('.video-group.active').attr('data-video-group-id'));
                var times_to_click = Math.abs(acti_video_group_id - next_video_group_id);

                // Click more bar right
                if (acti_video_group_id < next_video_group_id) {
                  var i = 0;
                  var rightClickInterval = setInterval(function() {
                    if (i < times_to_click) {
                      i += 1;
                      $('.more-bar.more-bar-right').trigger('click');
                    } else {
                      clearInterval(rightClickInterval);
                    }
                  }, 400);
                }

                // Click more bar left
                else if (acti_video_group_id > next_video_group_id) {
                  var i = 0;
                  var leftClickInterval = setInterval(function() {
                    if (i < times_to_click) {
                      i += 1;
                      $('.more-bar.more-bar-left').trigger('click');
                    } else {
                      clearInterval(leftClickInterval);
                    }
                  }, 400);
                }
              }
            }
          }
        });
      }

      // Make sure the YouTube API is available in global scope
      window.onYouTubeIframeAPIReady = function() {
        var default_player = $('.video-link iframe', '.main-video-container');

        // Give default player its element ID
        default_player.attr('id', 'player-1');

        // Give default players its data-videoid attribute
        var src = default_player.attr('src');
        var video_id = src.match(/embed\/(.*)/)[1].split('?')[0];
        default_player.attr('data-videoid', video_id);

        // Enable js api attribute on default video player
        default_player.attr('src', src + '&enablejsapi=1');

        // Register the video player with YouTube API
        registerYouTubeVideoPlayer(default_player);
      }

      // Handle scrolling through video groups in "playlist carousel"
      $('.more-bar').on('click', function(e) {
        var bar = $(this);
        var direction = bar.hasClass('more-bar-right') ? 'right' : 'left';

        // Requesting group to right
        if (direction == 'right') {
          var this_group = $('.video-group.active');
          var next_group = this_group.next('.video-group');

          // Animate out the current group and in the next if the next exists
          if (next_group.length) {
            $('.more-bar').removeClass('no-more');
            this_group.css({opacity: 1}).animate({opacity: 0}, {
              duration: 200,
              complete: function() {
                this_group.removeClass('active');
                next_group.css({opacity: 0}).addClass('active').animate({opacity: 1}, {
                  duration: 200,
                  complete: function() {

                    // Check if there are any further bars to the left
                    if (!next_group.next('.video-group').length) {
                      bar.addClass('no-more');
                    }
                  }
                })
              }
            });
          } else {
            bar.addClass('no-more');
          }
        }

        // Requesting group to left
        else {
          var this_group = $('.video-group.active');
          var prev_group = this_group.prev('.video-group');

          // Animate out the current group and in the next if the next exists
          if (prev_group.length) {
            $('.more-bar').removeClass('no-more');
            this_group.css({opacity: 1}).animate({opacity: 0}, {
              duration: 200,
              complete: function() {
                this_group.removeClass('active');
                prev_group.css({opacity: 0}).addClass('active').animate({opacity: 1}, {
                  duration: 200,
                  complete: function() {

                    // Check if there are any further bars to the left
                    if (!prev_group.prev('.video-group').length) {
                      bar.addClass('no-more');
                    }
                  }

                })
              }
            });
          } else {
            bar.addClass('no-more');
          }
        }
      });

      // Handle click on video playlist thumbnails
      var happen_once = 0;
      $('.video-image-container a').on('click', function(e) {
        e.preventDefault();
        var playlist_item = $(this).closest('.video-link');
        var playlist_item_parent = playlist_item.parent();
        var playlist_target = $('.video-link.selected');
        var play_items = $(playlist_item).add(playlist_target);

        // Reference the video id of the player in the main "play" area
        var target_video_id = playlist_target.attr('data-video-id');

        // Reference the thumbnail video id of the clicked thumbnail
        var thumb_video_id = playlist_item.attr('data-video-id');

        // Continue only if we're not reselecting the same video
        if (target_video_id != thumb_video_id) {

          // Animate out the selected and the target item
          play_items.css({opacity: 1}).animate({opacity: 0}, {
            duration: 200,
            complete: function() {

              if (!happen_once) {
                happen_once = 1;

                // Clone the thumbnail
                var playlist_item_clone = playlist_item.clone(true);
                playlist_item_clone.attr('data-video-id', thumb_video_id);

                // Reference the target video thumbnail
                var target_video_thumb = $('[data-video-id="'+ target_video_id +'"]', '.video-playlist');

                // Unselect main playlist video
                playlist_target.removeClass('selected');
                playlist_item.addClass('selected');

                // Make sure the description text is overflowing correctly
                $('.video-description, .video-title', playlist_item).addClass('full');
                $('.video-description, .video-title', playlist_target).removeClass('full');

                // Re-load the target video and attempt to play it
                var video_iframe = playlist_item.find('iframe');
                var video_src = video_iframe.attr('src').replace('autoplay=0', 'autoplay=1');
                video_iframe.attr('src', video_src);

                // Place the video item into the target "play" area
                $('.main-video-container').append(playlist_item);

                // Place clone of video item into thumbnail viewing area
                playlist_item_parent.append(playlist_item_clone);

                // Replace cloned iframe with "original" iframe
                var original_iframe = $('iframe', playlist_target)[0];
                target_video_thumb.find('iframe').replaceWith(original_iframe);

                // Update SRC so video doesn't keep on playing
                var thumbnail_src = $(original_iframe).attr('src').replace('autoplay=1', 'autoplay=0');
                $(original_iframe).attr('src', thumbnail_src);

                // Remove the previously clicked video from the target "play" area
                playlist_target.remove();

                // Resize window to trigger resize of iframe
                $(window).trigger('resize');

                // Animate the targets back in
                play_items.animate({opacity: 1}, {
                  duration: 400,
                  complete: function () {
                    happen_once = 0;
                    playlist_item_clone.css({opacity: 1});

                    // Add selected class to video-link thumbnail
                    $('.video-anchor').removeClass('active');
                    playlist_item_clone.find('.video-anchor').addClass('active');

                    // Register clicked video player as next video player
                    registerYouTubeVideoPlayer(video_iframe);
                  }
                });
              }
            }
          });
        }
      });
    }

    /**
     * Apply "FitText" responsive text changes.
     */
    /*global jQuery */
    /*!
     * FitText.js 1.2
     *
     * Copyright 2011, Dave Rupert http://daverupert.com
     * Released under the WTFPL license
     * http://sam.zoy.org/wtfpl/
     *
     * Date: Thu May 05 14:23:00 2011 -0600
     */
    (function( $ ){
      $.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
          settings = $.extend({
            'minFontSize' : Number.NEGATIVE_INFINITY,
            'maxFontSize' : Number.POSITIVE_INFINITY
          }, options);

        return this.each(function(){

          // Store the object
          var $this = $(this);

          // Resizer() resizes items based on the object width divided by the compressor * 10
          var resizer = function () {
            $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
          };

          // Call once to set.
          resizer();

          // Call on resize. Opera debounces their resize by default.
          $(window).on('resize.fittext orientationchange.fittext', resizer);

        });
      };
    })( jQuery );

    // Apply "FitText" headlines
    jQuery('#ca-headline').fitText(0.75);

    /**
     * Modify polls markup on the change agents page.
     */
    if ($('div[class="change-agents-reusable-marketo-form"]').length) {

      /**
       * Marketo form handling on the change agents page.
       */
      MktoForms2.loadForm("//app-sjh.marketo.com", "307-QLA-991", 1458, function (form) {

        // Global flag, which subscribe form?
        var scroll_top = 0;

        // Store the thank you and error messages
        var thank_you_msg = '';
        var error_msg = '';

        // Remove all inline styles from dynamically loaded marketo elements
        $('#mktoForm_1458, #mktoForm_1458 *').removeAttr('style');

        // Handle successful form submission
        form.onSuccess(function (values, followUpURL) {
          $('.ca-form-wrapper, .change-agent-poll-email-form .email-signup').hide();
          $('.mkto-message').html(thank_you_msg).show(200);
          return false;
        });

        // Handle error filled submissions
        form.onValidate(function (values, followUpURL) {

          // Hide the marketo error message
          var errorInterval = setInterval(function () {
            var errorElm = $('.mktoError');
            if (errorElm.length) {
              clearInterval(errorInterval);

              // Make sure form doesn't jump to marketo error message
              $(window).scrollTop(scroll_top);

              $('.mktoError').hide();
              $('.ca-form-wrapper, .email-signup').hide();
              var error_message_markup
                = '<span class="reloading-message">'
                + error_msg
                + '</span>';

              // Display error message
              var reloading = function( start_opac ) {
                if (start_opac) {
                  $('.mkto-message').html(error_message_markup).show(10);
                }
                $('.reloading-message')
                  .css('opacity', start_opac ? 0 : 1)
                  .animate({opacity: start_opac ? 1 : 0}, {
                    duration: 2800,
                    complete: function() {
                      if (start_opac)  {
                        $('.mkto-message').hide();
                        $('.ca-form-wrapper, .email-signup')
                          .css({
                            opacity: 0,
                            display: 'block'
                          })
                          .animate({opacity: 1}, {
                          duration: 500
                        });
                      }
                    }
                  });
              };

              // Run reloading message
              reloading(1);
            }
          }, 10);
          return false;
        });

        // Attach marketo form submission handlers to cloned submit buttons
        $(document).on('click', '.submit-button-clone', function () {
          thank_you_msg = $(this).attr('data-thankyou');
          error_msg = $(this).attr('data-error');

          // Set the position to move to after form submit
          scroll_top = $(document).scrollTop();

          // Get the value to submit from the clone form
          var value = '';
          $('input.marketo-clone').each(function(index, elm) {
            value = $(elm).val();
            if (value) return false;
          });

          // Set the marketo form's input with its value
          $('.hidden-marketo-form input#Email').val(value);

          // Submit the marketo form
          form.submit();
          return false;
        });
      });
    }

  });
})(jQuery);

;/**/
/**
 * Header Navbar and Menu support
 */
(function( $, Drupal ) {
  $(document).ready(function() {

    // Define some "globals" for the drop down menus
    var

    // Define drop down menu overall animation speed
      dd_transition_speed = 300,

    // A flag indicating if a mobile dd menu is open
      dd_mobile_menu_open = false,

    // A flag indicating the last mobile dd menu that was open
      dd_mobile_last_menu = 5,

    // A flag indicating if an animation is currently active
      animation_active = false,

    // A flag indicating what breakpoint state we're in
      is_mobile = false,

    // A flag indicating we JUST changed states (helps firing code in resize event once)
      state_change_mobile = false,

    // A flag indicating we JUST changed states (helps firing code in resize event once)
      state_change_nomobile = false,

    // Holds the differences between the window height and the viewport height on mobile devices
      viewport_height_diff = 0,

    // Holds the value of the last scroll position (recorded by the scroll event)
      last_scroll_pos = 0,

    /*
     * Function is the animation function used to animate "carousel menus" while the menu is mobile.
     */
      animateMenuCarousel = function (animation_props) {
        if (!animation_active) {
          var animation_iter = animation_props.length;

          // Set animation status as active
          animation_active = true;

          // Animate the mobile menus
          $.each(animation_props, function (idx, val) {
            animation_iter++;

            // Indicate that the mobile menu is open
            dd_mobile_menu_open = true;

            // Make element visible offscreen so it can be resized to fit viewport vertically
            val.menu.stop().css({opacity: 1, display: 'block', left: val.start});

            // Make sure our menu fits window vertically
            $(window).trigger('resize');

            // Animate the menu in after it has been resized
            val.menu
              .animate({left: val.end}, {
                duration: dd_transition_speed,
                complete: function () {

                  // Make sure our menu fits window vertically
                  $(window).trigger('resize');

                  // Run on the final animation
                  if (animation_iter >= idx) {

                    // Reset the animation flag at the end of the animations
                    animation_active = false;

                    // Indicate which mobile menu was open last
                    dd_mobile_last_menu = val.id;

                    // Hide all menus that are out of the viewport
                    if (val.hide) {
                      val.menu.hide();
                    }

                    // Make main page scrollable once again
                    if (val.id == 5) {
                      $('html').removeClass('mobile-menu-open');
                      $(window).scrollTop(last_scroll_pos);
                    }

                    // Set main page as static to scroll within menu context
                    else {
                      $('html').addClass('mobile-menu-open');
                    }
                  }
                }
              });
          });
        }
      },

    /*
     * Function is used to determine which breakpoint is next. Works in congress with the #breakpoint-grid located in
     * page.tpl.php to determine which column's breakpoint is next. This method of determining which breakpoint location
     * is far more efficient and cross-compatible than using attaching a resize event handler.
     */
      nextBreakpoint = function () {
        var ret = 0;
        $('#breakpoint-grid .point').each(function (index, elm) {
          if ($(elm).css('display') == 'block') {
            ret = $(elm).attr('data-point-id');
            return false;
          }
        });
        return !ret ? 12 : ret - 1;
      },

    /*
     * Function is used with the window resize event listener to handle various issues related to menu size.
     */
      resizeMenus = function () {
        var
          window_height = $(window).outerHeight(),
          header_height = $('#site-header').outerHeight(),
          dropdown_menus = $('.dd-menu-content-container');

        // MOBILE
        if (nextBreakpoint() < 9) {

          // Did we just change state? If so, do stuff that need happen only once upon changing state.
          if (!state_change_mobile) {

            // Set change state happen once flags
            state_change_mobile = true;
            state_change_nomobile = false;

            // Indicate we're mobile
            is_mobile = true;

            // Indicate site is mobile
            $('html').addClass('is-mobile');

            // Move search form html to its mobile container
            var search_form = $('#search-block-form');
            $('#mobile-search').append(search_form);

            // Reference elements that need to have inline styles removed
            var elms_to_remove_styles_from = [
              $('.mm-sub-body'),
              $('.mm-container'),
              $('[data-nms-id="1"]', '#navbar-mobile-selected-gradient'),
              $('[data-nms-id="2"]', '#navbar-mobile-selected-gradient'),
              $('.navbar, #navbar-mobile-selected-gradient')
            ];

            // Remove inline styles from elements
            $.each(elms_to_remove_styles_from, function (idx, elm) {
              elm.removeAttr('style');
            });

            // Make sure no sub menu of mega menu is selected
            $('.mm-sub-body').removeClass('selected');
          }

          // Resize mobile menu heights to fill vertical screen space
          dropdown_menus.each(function (idx, menu) {
            var
              menu_footer_height = $(menu).find('.mm-footer').last().outerHeight(true),
              scrollable_area = $(menu).find('.mm-body');

            // Proceed when we're acting on an element with a "scrollable" area
            if (scrollable_area.length) {
              var
                scrollable_area_height = scrollable_area.outerHeight(true),
                scrollable_area_top_pad = parseInt(scrollable_area.css('padding-top').replace('px', '')),
                scrollable_area_bot_pad = parseInt(scrollable_area.css('padding-bottom').replace('px', '')),
                scrollable_area_tot_pad = scrollable_area_top_pad + scrollable_area_bot_pad,
                offset_height = (header_height + menu_footer_height + scrollable_area_tot_pad),
                arbitrary_offset = scrollable_area_tot_pad ? 60 : 0,
                viewport_diff = viewport_height_diff,
                drupal_admin_bar_1 = $('#navbar-bar').outerHeight(),
                drupal_admin_bar_2 = $('body.navbar-horizontal').length ? $('#navbar-tray--3').outerHeight() : 0,
                environment_bar = $('.environment-indicator-name').parent().outerHeight(),
                logged_in_height = drupal_admin_bar_1 + drupal_admin_bar_2 + environment_bar,
                height = window_height - offset_height + arbitrary_offset + viewport_diff - logged_in_height;

              // Set menu's scrollable area to calculated height
              scrollable_area.css('height', (height) + 'px');
            }
          });

          // Deal with touch device specific adjustments
          if ($('html.is-mobile.touch').length) {
            var
              main = $('#main'),
              header_height = $('#site-header').outerHeight();

            // While navbar is statically positioned, make sure main content is positioned below navbar
            main.css({'padding-top': header_height + 'px'});

            // Keep static elements set to a fixed width to keep swipe scrolls from expanding
            $('.navbar, #navbar-mobile-selected-gradient').width($(window).width());
          }
        }

        // NON-MOBILE
        else {

          // Did we just change state? If so, do stuff that need happen only once upon changing state.
          if (!state_change_nomobile) {

            // Set change state happen once flags
            state_change_nomobile = true;
            state_change_mobile = false;

            // Indicate we're not mobile
            is_mobile = false;

            // Indicate site is no longer mobile
            $('html').removeClass('is-mobile');

            // Move search form html back to its non-mobile container
            var search_form = $('#search-block-form');
            $('#search').find('.not-mobile').append(search_form);

            // Reference elements that need to have inline styles removed
            var elms_to_remove_styles_from = [
              $('#main'),
              $('#site-footer'),
              dropdown_menus,
              $('.mm-sub-body-group'),
              $('.mm-body'),
              $('.scrollable-menu-area')
            ];

            // Remove inline styles from elements
            $.each(elms_to_remove_styles_from, function (idx, elm) {
              elm.removeAttr('style');
            });

            // Reselect puppet labs section
            $('.nms').removeClass('selected');
            $('.nms[data-nms-id="' + 5 + '"]').addClass('selected');

            // Make sure first sub menu of mega menu is selected
            $('.mm-sub-body').removeClass('selected').first().addClass('selected');
            $('.mm-submenu-header').removeClass('selected shadows left-right-top').first().addClass('selected shadows left-right-top');

            // Make sure navbar sections are unselected
            $('[data-dd-menu-id]').removeClass('selected');

            // Indicate we're no longer using global menus
            dd_mobile_menu_open = false;

            // Indicate which mobile menu we should be on next time we go mobile
            dd_mobile_last_menu = 5;
          }

          // Calculate/resize navbar section dimensions for #search and #login
          var
            logo_left_width = $('#logo-left').outerWidth(),
            dd_menu_1 = ($('#dd-menu-1').css('display') == 'block') ? $('#dd-menu-1').outerWidth(true) : 0,
            dd_menu_2 = $('#dd-menu-2').outerWidth(true),
            tot_cols_width = (logo_left_width + dd_menu_1 + dd_menu_2),
            width_remaining = $(window).width() - tot_cols_width,
            offset = 7,
            search_width = 0,
            login_width = 0;

          // Accommodate for Internet Explorer (as usual)
          if ($('html').hasClass('ie9')) {
            search_width = Math.floor(0.30 * width_remaining) - offset;
            login_width = Math.floor(0.30 * width_remaining) - offset;
          } else {
            search_width = Math.floor(0.6 * width_remaining) - offset,
              login_width = Math.floor(0.38 * width_remaining) - offset;
          }

          // Set the resized navbar sections
          $('#search.navbar-section').css({'min-width': search_width + 'px'});
          $('#login.navbar-section').css({width: login_width + 'px'});
        }
      },

    /*
     * Toggles the styles of the selected/active navbar section.
     */
      setSelectedNavbarSection = function (target_id) {
        $('.nms').removeClass('selected');
        $('.nms[data-nms-id="' + target_id + '"]', '#navbar-mobile-selected-gradient').addClass('selected');
        if (target_id != 5) {
          $('.nms[data-nms-id="' + target_id + '"]', '#navbar-mobile-drop-shadow').addClass('selected');
        }
      },

    /*
     * Replacement for elm.getBoundingClientRect() which doesn't work on some platforms
     */
      getBoundingBox = function (elm) {
        var
          e = $(elm),
          offset = e.offset(),
          width = e.outerWidth(),
          height = e.outerHeight();
        return {
          x: offset.left,
          y: offset.top,
          width: width,
          height: height,
          top: offset.top,
          right: offset.left + width,
          bottom: offset.top + height,
          left: offset.left
        };
      },

    /*
     * Determines if an event should proceed dependent on whether or not the event was fired within the bounding box of
     * the target element. Assumes event is such that produces coordinates such as touchstart, click, mouseenter, etc.
     */
      proceedWithEvent = function (e, target) {
        var
          touch_device = $('html.touch').length,
          bounding_box = getBoundingBox(target),
          proceed_with_event = false,
          oe = e.originalEvent,
          synthetic = !oe ? true : false,
          pre_x_pos = 0,
          pre_y_pos = 0,
          x_pos = 0,
          y_pos = 0;

        // Populate accurate coordinates for synthetically triggered events
        if (synthetic) {
          pre_x_pos = bounding_box.left + (bounding_box.width / 2);
          pre_y_pos = bounding_box.top + (bounding_box.height / 2);
        }

        // Record event per normal for human triggered events
        else {
          pre_x_pos = touch_device ? oe.touches[0].pageX : e.pageX,
            pre_y_pos = touch_device ? oe.touches[0].pageY : e.pageY;
        }

        // Set coords with event location info
        x_pos = pre_x_pos;
        y_pos = pre_y_pos;

        // Determine if our event was fired within the confines of its bounding box
        if (
          (x_pos >= bounding_box.left && x_pos <= bounding_box.right) &&
          (y_pos >= bounding_box.top && y_pos <= bounding_box.bottom)
        ) {
          proceed_with_event = true;
        }

        return proceed_with_event;
      };

    /**
     * HANDLE: Resizing of mobile menu and other resize/breakpoint transition issues.
     */
    $(window).on('resize', resizeMenus);

    // Call on page load to initialize menu sizing
    resizeMenus();

    // Replace site logo with PNG if SVG is not supported
    if (!Modernizr.svg) {
      $(".puppet-logo img").attr("src", "/sites/all/themes/puppetlabs/images/logo.png");
    }

    /**
     * WATCH: Resize mobile menus when our viewport changes in height
     */
    if ($('html.touch')) {
      $('#mobile-ghost').eye({
        'height()': function (old_height, viewport_height) {

          // Only proceed on touch devices
          var
            window_height = $(window).height(),
            viewport_diff = Math.abs(window_height - viewport_height);

          // Update the global viewport height diff
          viewport_height_diff = viewport_diff;

          // Trigger the resize event to adjust menus to viewport
          $(window).trigger('resize');
        }
      }, 100);
    }

    /**
     * HANDLE: Redirect FontAwesome icon clicks to the links they represent.
     */
    $('#site-header .fa-icon a, #site-header .mm-footer-tag a').on('click', function (e) {
      e.stopPropagation();
    });
    $('#site-header .fa-icon, #site-header .mm-footer-tag').on('click', function (e) {
      $(this).find('a')[0].click();
    });

    /**
     * Convert specified svg IMGs inline SVG.
     */
    $('img.inline-svg').each(function () {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function (data) {

        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }

        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        if ($('html').hasClass('ie9')) {
          // @TODO - This throws a DOM Exception in IE9. Won't Fix.
          //$img.after($svg[0]);
          //$img.remove();
        } else {
          $img.replaceWith($svg);
        }
      }, 'xml');
    });

    /**
     * Modify search box markup.
     */
    var search_box_label = $('#search-block-form label');
    $('#search-block-form label').html('');
    var search_input = $('#edit-search-block-form--2');
    search_input.attr('placeholder', $('#search').attr('data-placeholder-text'));

    /**
     * HANDLE: Search form submission (NON-MOBILE)
     */
    search_box_label.on($('html').hasClass('touch') ? 'touchstart' : 'click', function () {
      $('.navbar-section.search #edit-submit').trigger('click');
    });

    /**
     * HANDLE: Login form submission (MOBILE)
     */
    $('#mobile-user-login').on('submit', function (e) {
      var form = $(this);

      // Prevent human click on form
      if (e.originalEvent) {
        e.preventDefault();

        // Reference username, password, and current location
        var
          name_input = $('#mobile-username input'),
          name = name_input.val(),
          pass_input = $('#mobile-password input'),
          pass = pass_input.val(),
          loca = window.location.href,
          dest = window.location.pathname,
          data = 'name=' + name + '&pass=' + pass +
            '&form_id=user_login' +
            '&dest=' + dest;

        // Attempt login
        $.ajax({
          type: "POST",
          url: '/ajax/user/login',
          data: data,
          success: function (data) {
            var data_obj = JSON.parse(data);

            // Clear any previous error messages
            $('#error-messages ul li').remove();

            // Handle validation
            if (data_obj.success) {
              window.location.href = data_obj.dest;
            } else {
              $.each(data_obj.errors, function (idx, value) {
                if (idx == 'name') name_input.addClass('error');
                if (idx == 'pass') pass_input.addClass('error');

                // Show error messages
                $('#error-messages ul').append('<li>' + value + '</li>');
              });

              // Animate in error messages
              $('#error-messages').css({display: 'block', opacity: 0}).animate({opacity: 1}, {
                duration: dd_transition_speed
              });
            }
          }
        });
        return false;
      }
    });

    /**
     * HANDLE: Showing of Drop Down menus (Mobile/Non-Mobile)
     */
    $('.dd-menu-container, #logo-right').on($('html').hasClass('touch') ? 'touchstart' : 'mouseenter click', function (e) {
      var
        target = $(this),
        target_id = $(this).attr('id'),
        target_selected_id = $(this).attr('data-selected-id'),
        menu_container = $(this).find('.dd-menu-content-container'),
        last_menu_id = $(this).attr('data-dd-menu-id'),
        menu_distance = 0,

      // The width of the window (and thus the multiple distance a menu should travel)
        dis_x = $(window).width();

      // MOBILE
      if (nextBreakpoint() < 9 && proceedWithEvent(e, target)) {
        var
          animation_props = [],
          next_menu = $('.dd-menu-content-container', '[data-dd-menu-id="' + dd_mobile_last_menu + '"]');

        // Remove navbar background from selected
        $('[data-dd-menu-id]').removeClass('selected');

        // Set main page as static to scroll within menu context
        if (last_menu_id != 5) {
          $('html').addClass('mobile-menu-open');
          target.addClass('selected');
        }

        // Toggle the mobile selected navbar indicator
        setSelectedNavbarSection(target_selected_id);

        // Animate w/ carousel when a previous menu has been opened
        menu_distance = Math.abs(last_menu_id - dd_mobile_last_menu);

        // Toggle open class on selected menu. Used to determine if we're opening or shutting the menu on a subsequent
        // touch. This gives users a way to open/close the menu system (without swiping).
        if (target_selected_id == dd_mobile_last_menu) {
          target.toggleClass('open');
        }

        // CLOSE the menu the same way we opened it
        if (target.hasClass('open') && (target_selected_id == dd_mobile_last_menu)) {

          // Indicate menu is no longer open
          target.removeClass('open');

          // Go to homepage when menu is closed
          if ((target_selected_id == 5 && e.type == 'touchstart') || (target_selected_id == 5 && e.type == 'click')) {
            window.location.href = window.location.origin;
          }

          // Close the menu, loading back the main page
          else {
            $('[data-dd-menu-id="5"]').trigger('touchstart');
          }
        }

        // RIGHT to LEFT animate
        else if (last_menu_id > dd_mobile_last_menu) {

          // Add initial animation props of current menu
          animation_props.push({
            id: parseInt(dd_mobile_last_menu),
            start: 0,
            end: -((menu_distance) * dis_x),
            menu: dd_mobile_last_menu == 5 ? $('#main').add('#site-footer') : next_menu,
            hide: true
          });

          // Build animation properties
          for (var i = 1; i <= menu_distance; i++) {
            var
              next_menu_id = (dd_mobile_last_menu++) + 1,
              next_menu = $('.dd-menu-content-container', '[data-dd-menu-id="' + next_menu_id + '"]'),
              start_pos = i * dis_x;

            // Build start and end locations for subsequent menus to animate
            animation_props.push({
              id: next_menu_id,
              start: start_pos,
              end: -(dis_x * Math.abs(i - menu_distance)),
              menu: next_menu_id == 5 ? $('#main').add('#site-footer') : next_menu,
              hide: next_menu_id != last_menu_id ? true : false
            });
          }

          // Animate menus
          animateMenuCarousel(animation_props);
        }

        // LEFT to RIGHT animate
        else if (last_menu_id < dd_mobile_last_menu) {

          // Add initial animation props of current menu
          animation_props.push({
            id: parseInt(dd_mobile_last_menu),
            start: 0,
            end: ((menu_distance) * dis_x),
            menu: dd_mobile_last_menu == 5 ? $('#main').add('#site-footer') : next_menu,
            hide: true
          });

          // Build animation properties
          for (var i = 1; i <= menu_distance; i++) {
            var
              next_menu_id = (dd_mobile_last_menu--) - 1,
              next_menu = $('.dd-menu-content-container', '[data-dd-menu-id="' + next_menu_id + '"]'),
              start_pos = i * dis_x;

            // Build start and end locations for subsequent menus to animate
            animation_props.push({
              id: next_menu_id,
              start: -start_pos,
              end: (dis_x * Math.abs(i - menu_distance)),
              menu: next_menu_id == 5 ? $('#main').add('#site-footer') : next_menu,
              hide: next_menu_id != last_menu_id ? true : false
            });
          }

          // Animate menus
          animateMenuCarousel(animation_props);
        }
      }

      // NOT MOBILE
      else if (proceedWithEvent(e, target)) {

        // Indicate that a mobile menu is NOT open
        dd_mobile_menu_open = false;

        // Only animate non-mobile drop downs
        if (target_id == 'dd-menu-1' || target_id == 'dd-menu-2') {
          var
            overlay_1 = $('[data-nms-id="1"]', '#navbar-mobile-selected-gradient'),
            overlay_2 = $('[data-nms-id="2"]', '#navbar-mobile-selected-gradient'),
            width = target.outerWidth(),
            position = target.offset().left,
            real_target = target_id == 'dd-menu-1' ? overlay_1 : overlay_2;

          // Add gradient class to nav bar sections
          $('.navbar-section').removeClass('selected');
          target.addClass('selected');

          // Highlight navbar section
          real_target.show().css({
            width: width + 'px',
            left: position + 'px'
          });
          var target_id = target_id == 'dd-menu-1' ? 1 : 2;
          setSelectedNavbarSection(target_id);

          // Animate
          menu_container.stop().css({opacity: 0, display: 'block'}).animate({opacity: 1}, {
            duration: dd_transition_speed
          });
        }
      }
    });

    /**
     * HANDLE: Hiding of Drop Down menus (Not-Mobile)
     */
    $('.dd-menu-container, #page').on('mouseleave', function (e) {

      // NOT MOBILE
      if (!(nextBreakpoint() < 9)) {
        var
          target = $(this),
          target_id = $(this).attr('id'),
          menu_container = $(this).find('.dd-menu-content-container');

        // Indicate mobile menu is NOT open
        $('html').removeClass('mobile-menu-open');

        // Remove gradient class fromn bar sections
        target.removeClass('selected');

        // Hide transient gradient from navbar section
        setSelectedNavbarSection(0);

        // Only animate non-mobile drop downs
        if (target_id == 'dd-menu-1' || target_id == 'dd-menu-2') {
          menu_container.stop().css({opacity: 1}).animate({opacity: 0}, {
            duration: dd_transition_speed,
            complete: function () {
              menu_container.css({display: 'none'});
            }
          });
        }
      }
    });

    /**
     * HANDLE: Mobile Drop Down Menu (sub-menu) accordion states
     */
    $('.mm-submenu-mobile-header').swipe({
      tap: function () {
        var
          target = $(this),
          parent = target.parent(),
          target_toggle_area = parent.find('.mm-sub-body-group');

        // Save original height in element before animating to 0 height
        if (!target_toggle_area.attr('data-toggle-height')) {
          target_toggle_area.attr('data-toggle-height', target_toggle_area.outerHeight());
        }

        // Close the targeted accordion area
        if (target_toggle_area.css('display') == 'block') {
          target_toggle_area.animate({height: 0}, {
            duration: dd_transition_speed,
            complete: function () {

              // Make sure 'block' display is removed from accordion area
              target_toggle_area.css({display: 'none'});

              // Remove selected class
              parent.removeClass('selected');
            }
          });
        }

        // Open the target accordion area
        else {
          target_toggle_area.css({
            display: 'block',
            height: 0
          }).animate({height: target_toggle_area.attr('data-toggle-height')}, {
            duration: dd_transition_speed,
            complete: function () {

              // Add selected class
              parent.addClass('selected');
            }
          });
        }
      }
    });

    /**
     * HANDLE: Drop Down Menu (sub-menu) tab states
     */
    $('.mm-submenu-header').on($('html').hasClass('touch') ? 'touchstart' : 'mouseenter', function () {
      var
        header = $(this),
        header_id = header.attr('data-mm-id'),
        headers = $('.mm-submenu-header'),
        prev_tab_area = $('.mm-sub-body.selected'),
        next_tab_area = $('.mm-sub-body[data-mm-id="' + header_id + '"]'),
        prev_tab_id = prev_tab_area.attr('data-mm-id'),
        next_tab_id = next_tab_area.attr('data-mm-id');

      // Toggle the header tab as selected
      headers.removeClass('selected shadows left-right-top');
      header.addClass('selected shadows left-right-top');

      // Proceed if the next tab is a different tab
      if (prev_tab_id != next_tab_id) {

        // Animate the tab areas out then in
        prev_tab_area.css({opacity: 1}).stop().animate({opacity: 0}, {
          duration: dd_transition_speed, complete: function () {
            prev_tab_area.removeClass('selected');
            next_tab_area.css({opacity: 0}).addClass('selected');
            next_tab_area.animate({opacity: 1}, {
              duration: dd_transition_speed, complete: function () {
              }
            });
          }
        });
      }
    });

    /**
     * HANDLE: Touch swipe events (for transitioning between mobile carousel menus)
     */
    if ($('html.touch').length) {
      $(".dd-menu-container, #main, #site-footer").swipe({
        threshold: 90,
        maxTimeThreshold: 2500,
        fingers: 'all',
        allowPageScroll: "vertical",
        swipeStatus: function (e, phase, direction, distance, duration, fingerCount) {

          // Simply prevent the event when scrolling up or down
          if (direction == 'up' || direction == 'down') {

            // Record last known scroll position
            last_scroll_pos = $(window).scrollTop();
            return false;
          }

          // Handle left and right swipes only
          else {
            var
              target = $(this),
              target_id = target.attr('data-selected-id'),
              this_menu = target.find('.dd-menu-content-container'),
              next_target = null,
              next_target_id = 0,
              next_target_menu = null,
              move_distance = 0,
              viewport_width = $(window).width(),
              next_menu_distance = 0,
              override_carousel = false;

            // Determine the next target ID
            if (direction == 'right') {
              next_target_id = (parseInt(target_id) - 1);
              move_distance = distance;
              next_menu_distance = (distance - viewport_width);
            } else if (direction == 'left') {
              next_target_id = (parseInt(target_id) + 1);
              move_distance = -distance;
              next_menu_distance = (viewport_width - distance);
            }

            // Get the next target
            next_target = $('[data-dd-menu-id="' + next_target_id + '"]');
            next_target_menu = next_target.find('.dd-menu-content-container');

            // Slide puppet #main in from left
            if (direction == 'left' && next_target_id == 5) {
              override_carousel = true;
              next_target_menu = $('#main').add('#site-footer');
            }

            // Menu is closed, slide #main out to the left
            else if (direction == 'right' && (target.attr('id') == 'main' || target.attr('id') == 'site-footer')) {
              override_carousel = true;
              this_menu = $('#main').add('#site-footer');
              next_target_id = 4;
              next_target = $('[data-dd-menu-id="' + next_target_id + '"]');
              next_target_menu = next_target.find('.dd-menu-content-container');
            }

            // Proceed when there is a next menu to be had
            if (next_target.length || override_carousel) {

              // Trigger resize event to adjust vertical height of menus
              $(window).trigger('resize');

              // Slide the menus in the appropriate direction
              this_menu.css({left: move_distance + 'px', display: 'block'});
              next_target_menu.css({left: next_menu_distance + 'px', display: 'block'});

              // Select/toggle the nav bar section
              target.removeClass('selected');
              next_target.addClass('selected');
              setSelectedNavbarSection(next_target_id);

              // On "CANCEL" phase move menus back to their starting points
              if (phase == 'cancel') {

                // Get rid of failed swipes next target selection
                target.addClass('selected');
                next_target.removeClass('selected');
                setSelectedNavbarSection(target_id);
                if (!target_id) setSelectedNavbarSection(5);


                // Move the current menu back to its starting position
                var this_menu_back_to_distance = parseInt($(this_menu).css('left').replace('px', '')) - move_distance;
                this_menu.animate({left: this_menu_back_to_distance}, {
                  duration: dd_transition_speed
                });

                // Move the next menu back to its starting position
                if (next_target_id <= 5) {
                  var next_menu_back_to_distance = parseInt($(next_target_menu).css('left').replace('px', '')) - move_distance;
                  next_target_menu.animate({left: next_menu_back_to_distance}, {
                    duration: dd_transition_speed
                  });
                }
              }

              // On "END" (animate the next menu into view)
              else if (phase == 'end') {
                var this_menu_back_to_distance = (direction == 'left') ? -viewport_width : viewport_width;
                var next_menu_back_to_distance = 0;

                // To prevent re-animation, set the last menu id
                dd_mobile_last_menu = next_target_id;

                // If we swiped out of the menu context then toggle the appropriate navbar indicator
                setSelectedNavbarSection(next_target_id);

                // Move the current menu off the screen
                this_menu.animate({left: this_menu_back_to_distance}, {
                  duration: dd_transition_speed
                });

                // Move the next menu back to its on screen position
                next_target_menu.animate({left: next_menu_back_to_distance}, {
                  duration: dd_transition_speed,
                  complete: function () {

                    // Hide the last menu
                    this_menu.hide();

                    // Indicate that the mobile menu is no longer open
                    if (next_target_id == 5) {
                      dd_mobile_menu_open = false;

                      // Make sure puppet site is scrollable
                      $('html').removeClass('mobile-menu-open');

                      // Get rid of last swipes last target selection
                      next_target.removeClass('selected').addClass('lesser-selected');
                    } else {
                      dd_mobile_menu_open = true;
                    }
                  }
                });
              }
            }

            // Indicate there are no further menus to swipe in
            else {
              var
                glow_box_left = $('.glow-box-left'),
                glow_box_right = $('.glow-box-right');

              // Animate glow box in on the right
              if (direction == 'left') {
                glow_box_right.css({display: 'block', opacity: 1});
                var right_offset = parseInt(glow_box_right.css('right').replace('px'));

                // "Animate" the glow boxes in based on distance swiped
                if (right_offset <= -401) {
                  glow_box_right.css({right: (right_offset + 1) + 'px'});
                } else {
                  if (distance < 50) {
                    glow_box_right.css({'box-shadow': '0 0 ' + distance + 'px #0095dd'});
                  } else {
                    glow_box_right.css({'box-shadow': '0 0 50px #0095dd'});
                  }
                }

              }

              // Animate glow box in on the left
              else if (direction == 'right') {
                glow_box_left.css({display: 'block', opacity: 1});
                var left_offset = parseInt(glow_box_left.css('left').replace('px'));

                // "Animate" the glow boxes in based on distance swiped
                if (left_offset <= -401) {
                  glow_box_left.css({left: (left_offset + 1) + 'px'});
                } else {
                  if (distance < 50) {
                    glow_box_left.css({'box-shadow': '0 0 ' + distance + 'px #0095dd'});
                  } else {
                    glow_box_left.css({'box-shadow': '0 0 50px #0095dd'});
                  }
                }
              }

              // Animate the glow boxes back out
              if (phase == 'end' || phase == 'cancel') {
                glow_box_left.stop().animate({left: -405 + 'px', opacity: 0}, {
                  duration: dd_transition_speed,
                  complete: function () {
                    glow_box_left.removeAttr('style');
                  }
                });
                glow_box_right.stop().animate({right: -405 + 'px', opacity: 0}, {
                  duration: dd_transition_speed,
                  complete: function () {
                    glow_box_right.removeAttr('style');
                  }
                });
              }
            }
          }
        }
      });
  }

  });
})( jQuery, Drupal );
;/**/
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/**
 * jQuery TouchSwipe
 * @URI: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 */
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var p="left",o="right",e="up",x="down",c="in",z="out",m="none",s="auto",l="swipe",t="pinch",A="tap",j="doubletap",b="longtap",y="hold",D="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,B="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};f.fn.swipe=function(G){var F=f(this),E=F.data(B);if(E&&typeof G==="string"){if(E[G]){return E[G].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+G+" does not exist on jQuery.swipe")}}else{if(!E&&(typeof G==="object"||!G)){return w.apply(this,arguments)}}return F};f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:z};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:D,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(E){if(E&&(E.allowPageScroll===undefined&&(E.swipe!==undefined||E.swipeStatus!==undefined))){E.allowPageScroll=m}if(E.click!==undefined&&E.tap===undefined){E.tap=E.click}if(!E){E={}}E=f.extend({},f.fn.swipe.defaults,E);return this.each(function(){var G=f(this);var F=G.data(B);if(!F){F=new C(this,E);G.data(B,F)}})}function C(a4,av){var az=(a||d||!av.fallbackToMouseEvents),J=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ay=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",U=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",S=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ab=0,a1=0,aZ=0,G=1,aq=0,aJ=0,M=null;var aR=f(a4);var Z="start";var W=0;var aQ=null;var T=0,a2=0,a5=0,ad=0,N=0;var aW=null,af=null;try{aR.bind(J,aN);aR.bind(aD,a9)}catch(ak){f.error("events not supported "+J+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(J,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(B,null);return aR};this.option=function(bc,bb){if(av[bc]!==undefined){if(bb===undefined){return av[bc]}else{av[bc]=bb}}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(av.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bb=a?be.touches[0]:be;Z=g;if(a){W=be.touches.length}else{bd.preventDefault()}ag=0;aP=null;aJ=null;ab=0;a1=0;aZ=0;G=1;aq=0;aQ=aj();M=aa();R();if(!a||(W===av.fingers||av.fingers===i)||aX()){ai(0,bb);T=at();if(W==2){ai(1,be.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}if(av.swipeStatus||av.pinchStatus){bc=O(be,Z)}}else{bc=false}if(bc===false){Z=q;O(be,Z);return bc}else{if(av.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(av.hold){bc=av.hold.call(aR,be,be.target)}},this),av.longTapThreshold)}ao(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(Z===h||Z===q||am()){return}var bd,bc=a?bh.touches[0]:bh;var bf=aH(bc);a2=at();if(a){W=bh.touches.length}if(av.hold){clearTimeout(af)}Z=k;if(W==2){if(a1==0){ai(1,bh.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}else{aH(bh.touches[1]);aZ=au(aQ[0].end,aQ[1].end);aJ=ar(aQ[0].end,aQ[1].end)}G=a7(a1,aZ);aq=Math.abs(a1-aZ)}if((W===av.fingers||av.fingers===i)||!a||aX()){aP=aL(bf.start,bf.end);al(be,aP);ag=aS(bf.start,bf.end);ab=aM();aI(aP,ag);if(av.swipeStatus||av.pinchStatus){bd=O(bh,Z)}if(!av.triggerOnTouchEnd||av.triggerOnTouchLeave){var bb=true;if(av.triggerOnTouchLeave){var bg=aY(this);bb=E(bf.end,bg)}if(!av.triggerOnTouchEnd&&bb){Z=aC(k)}else{if(av.triggerOnTouchLeave&&!bb){Z=aC(h)}}if(Z==q||Z==h){O(bh,Z)}}}else{Z=q;O(bh,Z)}if(bd===false){Z=q;O(bh,Z)}}function L(bb){var bc=bb.originalEvent;if(a){if(bc.touches.length>0){F();return true}}if(am()){W=ad}a2=at();ab=aM();if(ba()||!an()){Z=q;O(bc,Z)}else{if(av.triggerOnTouchEnd||(av.triggerOnTouchEnd==false&&Z===k)){bb.preventDefault();Z=h;O(bc,Z)}else{if(!av.triggerOnTouchEnd&&a6()){Z=h;aF(bc,Z,A)}else{if(Z===k){Z=q;O(bc,Z)}}}}ao(false);return null}function a9(){W=0;a2=0;T=0;a1=0;aZ=0;G=1;R();ao(false)}function K(bb){var bc=bb.originalEvent;if(av.triggerOnTouchLeave){Z=aC(h);O(bc,Z)}}function aK(){aR.unbind(J,aN);aR.unbind(aD,a9);aR.unbind(ay,a3);aR.unbind(U,L);if(S){aR.unbind(S,K)}ao(false)}function aC(bf){var be=bf;var bd=aA();var bc=an();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!av.triggerOnTouchEnd||av.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&av.triggerOnTouchLeave){be=q}}}return be}function O(bd,bb){var bc=undefined;if(I()||V()){bc=aF(bd,bb,l)}else{if((P()||aX())&&bc!==false){bc=aF(bd,bb,t)}}if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ap()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,A)}}}if(bb===q){a9(bd)}if(bb===h){if(a){if(bd.touches.length==0){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc=undefined;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ab||0,W,aQ]);if(av.swipeStatus){bc=av.swipeStatus.call(aR,be,bb,aP||null,ag||0,ab||0,W,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ab,W,aQ]);if(av.swipe){bc=av.swipe.call(aR,be,aP,ag,ab,W,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ab,W,aQ]);if(av.swipeLeft){bc=av.swipeLeft.call(aR,be,aP,ag,ab,W,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ab,W,aQ]);if(av.swipeRight){bc=av.swipeRight.call(aR,be,aP,ag,ab,W,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ab,W,aQ]);if(av.swipeUp){bc=av.swipeUp.call(aR,be,aP,ag,ab,W,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ab,W,aQ]);if(av.swipeDown){bc=av.swipeDown.call(aR,be,aP,ag,ab,W,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchStatus){bc=av.pinchStatus.call(aR,be,bb,aJ||null,aq||0,ab||0,W,G,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchIn){bc=av.pinchIn.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break;case z:aR.trigger("pinchOut",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchOut){bc=av.pinchOut.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break}}}if(bd==A){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Y()&&!H()){N=at();aW=setTimeout(f.proxy(function(){N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}},this),av.doubleTapThreshold)}else{N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("doubletap",[be.target]);if(av.doubleTap){bc=av.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("longtap",[be.target]);if(av.longTap){bc=av.longTap.call(aR,be,be.target)}}}}}return bc}function an(){var bb=true;if(av.threshold!==null){bb=ag>=av.threshold}return bb}function ba(){var bb=false;if(av.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=av.cancelThreshold}return bb}function ae(){if(av.pinchThreshold!==null){return aq>=av.pinchThreshold}return true}function aA(){var bb;if(av.maxTimeThreshold){if(ab>=av.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function al(bb,bc){if(av.allowPageScroll===m||aX()){bb.preventDefault()}else{var bd=av.allowPageScroll===s;switch(bc){case p:if((av.swipeLeft&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case o:if((av.swipeRight&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case e:if((av.swipeUp&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((av.swipeDown&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=X();var bd=ae();return bc&&bb&&bd}function aX(){return !!(av.pinchStatus||av.pinchIn||av.pinchOut)}function P(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=an();var bd=aO();var bb=X();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function V(){return !!(av.swipe||av.swipeStatus||av.swipeLeft||av.swipeRight||av.swipeUp||av.swipeDown)}function I(){return !!(aV()&&V())}function aO(){return((W===av.fingers||av.fingers===i)||!a)}function X(){return aQ[0].end.x!==0}function a6(){return !!(av.tap)}function Y(){return !!(av.doubleTap)}function aU(){return !!(av.longTap)}function Q(){if(N==null){return false}var bb=at();return(Y()&&((bb-N)<=av.doubleTapThreshold))}function H(){return Q()}function ax(){return((W===1||!a)&&(isNaN(ag)||ag<av.threshold))}function a0(){return((ab>av.longTapThreshold)&&(ag<r))}function ah(){return !!(ax()&&a6())}function aG(){return !!(Q()&&Y())}function ap(){return !!(a0()&&aU())}function F(){a5=at();ad=event.touches.length+1}function R(){a5=0;ad=0}function am(){var bb=false;if(a5){var bc=at()-a5;if(bc<=av.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(B+"_intouch")===true)}function ao(bb){if(bb===true){aR.bind(ay,a3);aR.bind(U,L);if(S){aR.bind(S,K)}}else{aR.unbind(ay,a3,false);aR.unbind(U,L,false);if(S){aR.unbind(S,K,false)}}aR.data(B+"_intouch",bb===true)}function ai(bc,bb){var bd=bb.identifier!==undefined?bb.identifier:0;aQ[bc].identifier=bd;aQ[bc].start.x=aQ[bc].end.x=bb.pageX||bb.clientX;aQ[bc].start.y=aQ[bc].end.y=bb.pageY||bb.clientY;return aQ[bc]}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ac(bd);bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ac(bc){for(var bb=0;bb<aQ.length;bb++){if(aQ[bb].identifier==bc){return aQ[bb]}}}function aj(){var bb=[];for(var bc=0;bc<=5;bc++){bb.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bb}function aI(bb,bc){bc=Math.max(bc,aT(bb));M[bb].distance=bc}function aT(bb){if(M[bb]){return M[bb].distance}return undefined}function aa(){var bb={};bb[p]=aw(p);bb[o]=aw(o);bb[e]=aw(e);bb[x]=aw(x);return bb}function aw(bb){return{direction:bb,distance:0}}function aM(){return a2-T}function au(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function ar(){if(G<1){return z}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function at(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function E(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));

/**
 * jQuery.eye()
 *
 * (a) Wil Neeley, Trestle Media, LLC.
 * Code may be freely distributed under the MIT license.
 */
(function(d,f,h,b){var i="eye",g=null,c={speed:100,load:false},e={registry:{},guid:0};function j(l,k,m){this.element=l;this.options=d.extend({},c,k);this._defaults=c;this._name=i;this._speed=m;this._load=this.options.load;this.init()}j.prototype.init=function(){var n=this;var k={_interval:null,_interval_func:null,_element:n.element,_speed:n._speed||n.options.speed,_load:n.options.load,_status:"active"};d.each(n.options,function(p,r){if(p!="speed"&&p!="load"){var q={orig_object:r,orig_value:"",elm_ref:n.element};if(p.match(/\)/g)){var t=p.replace(/\(\)/g,"");if(d.isPlainObject(r)&&"args" in r){if(t in d){r.args.unshift(n.element);q.orig_value=d[t].apply(t,r.args)}else{q.orig_value=d.fn[t].apply(d(n.element),r.args)}}else{if(t in d){q.orig_value=d(n.element)[t]()}else{q.orig_value=d.fn[t].apply(d(n.element))}}}else{if(p in n.element){q.orig_value=n.element[p]}else{var s=p;p=p.replace(/-[a-zA-Z0-9]{1}/g,function(u){return u.charAt(1).toUpperCase()});if(p in n.element.style){q.orig_value=n.element.style[p]}else{console.log("Invalid Element Property: '"+s+"' does not exist.")}}}k[p]=q}});var o=function(){d.each(k,function(p,r){if(p!="_interval"&&p!="_interval_func"&&p!="_element"&&p!="_speed"&&p!="_status"&&p!="_load"){var q=r.orig_value;if(p.match(/\)/g)){var s=p.replace(/\(\)/g,"");if(d.isPlainObject(r)&&"args" in r.orig_object){if(s in d){q=d[s].apply(s,r.orig_object.args)}else{q=d.fn[s].apply(d(n.element),r.orig_object.args)}}else{if(s in d){q=d(n.element)[s]()}else{q=d.fn[s].apply(d(n.element))}}}else{if(p in n.element){q=n.element[p]}else{q=n.element.style[p]}}}if(d.isPlainObject(r.orig_object)){if("onInterval" in r.orig_object){r.orig_object.onInterval(r.orig_value,r.elm_ref)}}if(q!=r.orig_value||n._load){if(d.isFunction(r.orig_object)){n._load=false;r.orig_object(r.orig_value,q,r.elm_ref)}else{if(d.isPlainObject(r.orig_object)){n._load=false;r.orig_object.onChange(r.orig_value,q,r.elm_ref,"args" in r.orig_object?r.orig_object.args:[])}}r.orig_value=q}})};k._interval=setInterval(o,k._speed);k._interval_func=o;var l=e.guid;if(!d.data(n.element,"uids")){d.data(n.element,"uids",[l])}else{var m=d.data(n.element,"uids");m.push(l);d.data(n.element,"uids",m)}e.guid++;e.registry[l]=k};var a={status:function(m){var l=m.data("uids");if(l){var k="";d.each(l,function(n,p){var o=e.registry[p];k=o._status;return false});return k}else{return"none"}},pause:function(l){var k=l.data("uids");if(k){d.each(k,function(m,o){var n=e.registry[o];n._status="paused";clearInterval(n._interval)})}return g},start:function(l){var k=l.data("uids");if(k){d.each(k,function(m,o){var n=e.registry[o];if(n._status=="paused"){n._interval=setInterval(n._interval_func,n._speed)}n._status="active"})}return g},unwatch:function(m,l){l=l.replace(/-[a-zA-Z0-9]{1}/g,function(n){return n.charAt(1).toUpperCase()});var k=m.data("uids");if(k){d.each(k,function(n,p){var o=e.registry[p];delete o[l]})}return g}};d.fn[i]=function(l,n){g=this;if(typeof l=="string"){var m=l;var k=d(arguments).toArray();k.shift();k.unshift(this);return a[m].apply(this,k)}else{return this.each(function(){d.data(this,"plugin_"+i,new j(this,l,n))})}}})(jQuery,window,document);

// place any jQuery/helper plugins in here, instead of separate, slower script files.
/**
 * jQuery Mobile Select
 * @Author: Jochen Vandendriessche <jochen@builtbyrobot.com>
 * @Author URI: http://builtbyrobot.com
 *
**/
(function(b){var c={init:function(a){a=b.extend({autoHide:!0,defaultOption:"Go to...",deviceWidth:480,appendTo:"",className:"mobileselect",useWindowWidth:!1},a);if((a.useWindowWidth===!0?b(window).width():screen.width)<a.deviceWidth){var d=b(this),c=a.appendTo.length?b(a.appendTo):d.parent(),e=b('<select class="'+a.className+'" />');e.appendTo(c);b("<option />",{selected:!b(".current",d).length?"selected":!1,value:"",text:a.defaultOption}).appendTo(e);b("a",d).each(function(){var a=b(this),c=a.parent("li").hasClass("current")||a.hasClass("current")?"selected":!1;b("<option />",{selected:c,value:a.attr("href"),text:a.text()}).appendTo(e)});a.autoHide&&b(d).hide();e.change(function(){window.location=b(this).find("option:selected").val()})}}};b.fn.mobileSelect=function(a){if(c[a])return c[a].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof a==="object"||!a)return c.init.apply(this,arguments);else b.error("Method "+a+" does not exist on jQuery.mobileselect")}})(this.jQuery);
;/**/
/*global jQuery */
/*!	
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
	
  $.fn.fitText = function( kompressor, options ) {
	   
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);
	
    return this.each(function(){

      // Store the object
      var $this = $(this); 
        
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();
				
      // Call on resize. Opera debounces their resize by default. 
      $(window).on('resize', resizer);
      	
    });

  };

})( jQuery );;/**/
/* Copyright (c) 2006-2007 Mathias Bank (http://www.mathias-bank.de)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 2.1
 * 
 * Thanks to 
 * Hinnerk Ruemenapf - http://hinnerk.ruemenapf.de/ for bug reporting and fixing.
 * Tom Leonard for some improvements
 * 
 */
jQuery.fn.extend({
/**
* Returns get parameters.
*
* If the desired param does not exist, null will be returned
*
* To get the document params:
* @example value = jQuery(document).getUrlParam("paramName");
* 
* To get the params of a html-attribut (uses src attribute)
* @example value = jQuery('#imgLink').getUrlParam("paramName");
*/ 
 getUrlParam: function(strParamName){
	  strParamName = escape(unescape(strParamName));
	  
	  var returnVal = new Array();
	  var qString = null;
	  
	  if (jQuery(this).attr("nodeName")=="#document") {
	  	//document-handler
		
		if (window.location.search.search(strParamName) > -1 ){
			
			qString = window.location.search.substr(1,window.location.search.length).split("&");
		}
			
	  } else if (jQuery(this).attr("src")!="undefined") {
	  	
	  	var strHref = jQuery(this).attr("src")
	  	if ( strHref.indexOf("?") > -1 ){
	    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
	  		qString = strQueryString.split("&");
	  	}
	  } else if (jQuery(this).attr("href")!="undefined") {
	  	
	  	var strHref = jQuery(this).attr("href")
	  	if ( strHref.indexOf("?") > -1 ){
	    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
	  		qString = strQueryString.split("&");
	  	}
	  } else {
	  	return null;
	  }
	  	
	  
	  if (qString==null) return null;
	  
	  
	  for (var i=0;i<qString.length; i++){
			if (escape(unescape(qString[i].split("=")[0])) == strParamName){
				returnVal.push(qString[i].split("=")[1]);
			}
			
	  }
	  
	  
	  if (returnVal.length==0) return null;
	  else if (returnVal.length==1) return returnVal[0];
	  else return returnVal;
	}
});;/**/
/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
/**
* Create a cookie with the given name and value and other optional parameters.
*
* @example jQuery.cookie('the_cookie', 'the_value');
* @desc Set the value of a cookie.
* @example jQuery.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
* @desc Create a cookie with all available options.
* @example jQuery.cookie('the_cookie', 'the_value');
* @desc Create a session cookie.
* @example jQuery.cookie('the_cookie', null);
* @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
* used when the cookie was set.
*
* @param String name The name of the cookie.
* @param String value The value of the cookie.
* @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
* @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
* If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
* If set to null or omitted, the cookie will be a session cookie and will not be retained
* when the the browser exits.
* @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
* @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
* @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
* require a secure protocol (like HTTPS).
* @type undefined
*
* @name jQuery.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
/**
* Get the value of a cookie with the given name.
*
* @example jQuery.cookie('the_cookie');
* @desc Get the value of a cookie.
*
* @param String name The name of the cookie.
* @return The value of the cookie.
* @type String
*
* @name jQuery.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
jQuery.cookie = function(name, value, options) {
if (typeof value != 'undefined') { // name and value given, set cookie
options = options || {};
if (value === null) {
value = '';
options.expires = -1;
}
var expires = '';
if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
var date;
if (typeof options.expires == 'number') {
date = new Date();
date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
} else {
date = options.expires;
}
expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
}
// CAUTION: Needed to parenthesize options.path and options.domain
// in the following expressions, otherwise they evaluate to undefined
// in the packed version for some reason...
var path = options.path ? '; path=' + (options.path) : '';
var domain = options.domain ? '; domain=' + (options.domain) : '';
var secure = options.secure ? '; secure' : '';
document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
} else { // only name given, get cookie
var cookieValue = null;
if (document.cookie && document.cookie != '') {
var cookies = document.cookie.split(';');
for (var i = 0; i < cookies.length; i++) {
var cookie = jQuery.trim(cookies[i]);
// Does this cookie string begin with the name we want?
if (cookie.substring(0, name.length + 1) == (name + '=')) {
cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
break;
}
}
}
return cookieValue;
}
};;/**/
