var l=this,m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},n=function(a){return"string"==typeof a},aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,g);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},p=function(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
aa:ba;return p.apply(null,arguments)},t=function(a,b){var c=a.split("."),g=l;c[0]in g||!g.execScript||g.execScript("var "+c[0]);for(var d;c.length&&(d=c.shift());)c.length||void 0===b?g=g[d]?g[d]:g[d]={}:g[d]=b},u=function(a,b){function c(){}c.prototype=b.prototype;a.v=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.A=function(a,c,f){for(var e=Array(arguments.length-2),h=2;h<arguments.length;h++)e[h-2]=arguments[h];return b.prototype[c].apply(a,e)}};
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return p.apply(null,c)}return p(this,a)};var ca=function(){this.c=-1};var w=function(){this.c=-1;this.c=64;this.a=Array(4);this.s=Array(this.c);this.h=this.e=0;this.reset()};u(w,ca);w.prototype.reset=function(){this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.h=this.e=0};
var x=function(a,b,c){c||(c=0);var g=Array(16);if(n(b))for(var d=0;16>d;++d)g[d]=b.charCodeAt(c++)|b.charCodeAt(c++)<<8|b.charCodeAt(c++)<<16|b.charCodeAt(c++)<<24;else for(d=0;16>d;++d)g[d]=b[c++]|b[c++]<<8|b[c++]<<16|b[c++]<<24;b=a.a[0];c=a.a[1];var d=a.a[2],f=a.a[3],e=0,e=b+(f^c&(d^f))+g[0]+3614090360&4294967295;b=c+(e<<7&4294967295|e>>>25);e=f+(d^b&(c^d))+g[1]+3905402710&4294967295;f=b+(e<<12&4294967295|e>>>20);e=d+(c^f&(b^c))+g[2]+606105819&4294967295;d=f+(e<<17&4294967295|e>>>15);e=c+(b^d&(f^
b))+g[3]+3250441966&4294967295;c=d+(e<<22&4294967295|e>>>10);e=b+(f^c&(d^f))+g[4]+4118548399&4294967295;b=c+(e<<7&4294967295|e>>>25);e=f+(d^b&(c^d))+g[5]+1200080426&4294967295;f=b+(e<<12&4294967295|e>>>20);e=d+(c^f&(b^c))+g[6]+2821735955&4294967295;d=f+(e<<17&4294967295|e>>>15);e=c+(b^d&(f^b))+g[7]+4249261313&4294967295;c=d+(e<<22&4294967295|e>>>10);e=b+(f^c&(d^f))+g[8]+1770035416&4294967295;b=c+(e<<7&4294967295|e>>>25);e=f+(d^b&(c^d))+g[9]+2336552879&4294967295;f=b+(e<<12&4294967295|e>>>20);e=d+
(c^f&(b^c))+g[10]+4294925233&4294967295;d=f+(e<<17&4294967295|e>>>15);e=c+(b^d&(f^b))+g[11]+2304563134&4294967295;c=d+(e<<22&4294967295|e>>>10);e=b+(f^c&(d^f))+g[12]+1804603682&4294967295;b=c+(e<<7&4294967295|e>>>25);e=f+(d^b&(c^d))+g[13]+4254626195&4294967295;f=b+(e<<12&4294967295|e>>>20);e=d+(c^f&(b^c))+g[14]+2792965006&4294967295;d=f+(e<<17&4294967295|e>>>15);e=c+(b^d&(f^b))+g[15]+1236535329&4294967295;c=d+(e<<22&4294967295|e>>>10);e=b+(d^f&(c^d))+g[1]+4129170786&4294967295;b=c+(e<<5&4294967295|
e>>>27);e=f+(c^d&(b^c))+g[6]+3225465664&4294967295;f=b+(e<<9&4294967295|e>>>23);e=d+(b^c&(f^b))+g[11]+643717713&4294967295;d=f+(e<<14&4294967295|e>>>18);e=c+(f^b&(d^f))+g[0]+3921069994&4294967295;c=d+(e<<20&4294967295|e>>>12);e=b+(d^f&(c^d))+g[5]+3593408605&4294967295;b=c+(e<<5&4294967295|e>>>27);e=f+(c^d&(b^c))+g[10]+38016083&4294967295;f=b+(e<<9&4294967295|e>>>23);e=d+(b^c&(f^b))+g[15]+3634488961&4294967295;d=f+(e<<14&4294967295|e>>>18);e=c+(f^b&(d^f))+g[4]+3889429448&4294967295;c=d+(e<<20&4294967295|
e>>>12);e=b+(d^f&(c^d))+g[9]+568446438&4294967295;b=c+(e<<5&4294967295|e>>>27);e=f+(c^d&(b^c))+g[14]+3275163606&4294967295;f=b+(e<<9&4294967295|e>>>23);e=d+(b^c&(f^b))+g[3]+4107603335&4294967295;d=f+(e<<14&4294967295|e>>>18);e=c+(f^b&(d^f))+g[8]+1163531501&4294967295;c=d+(e<<20&4294967295|e>>>12);e=b+(d^f&(c^d))+g[13]+2850285829&4294967295;b=c+(e<<5&4294967295|e>>>27);e=f+(c^d&(b^c))+g[2]+4243563512&4294967295;f=b+(e<<9&4294967295|e>>>23);e=d+(b^c&(f^b))+g[7]+1735328473&4294967295;d=f+(e<<14&4294967295|
e>>>18);e=c+(f^b&(d^f))+g[12]+2368359562&4294967295;c=d+(e<<20&4294967295|e>>>12);e=b+(c^d^f)+g[5]+4294588738&4294967295;b=c+(e<<4&4294967295|e>>>28);e=f+(b^c^d)+g[8]+2272392833&4294967295;f=b+(e<<11&4294967295|e>>>21);e=d+(f^b^c)+g[11]+1839030562&4294967295;d=f+(e<<16&4294967295|e>>>16);e=c+(d^f^b)+g[14]+4259657740&4294967295;c=d+(e<<23&4294967295|e>>>9);e=b+(c^d^f)+g[1]+2763975236&4294967295;b=c+(e<<4&4294967295|e>>>28);e=f+(b^c^d)+g[4]+1272893353&4294967295;f=b+(e<<11&4294967295|e>>>21);e=d+(f^
b^c)+g[7]+4139469664&4294967295;d=f+(e<<16&4294967295|e>>>16);e=c+(d^f^b)+g[10]+3200236656&4294967295;c=d+(e<<23&4294967295|e>>>9);e=b+(c^d^f)+g[13]+681279174&4294967295;b=c+(e<<4&4294967295|e>>>28);e=f+(b^c^d)+g[0]+3936430074&4294967295;f=b+(e<<11&4294967295|e>>>21);e=d+(f^b^c)+g[3]+3572445317&4294967295;d=f+(e<<16&4294967295|e>>>16);e=c+(d^f^b)+g[6]+76029189&4294967295;c=d+(e<<23&4294967295|e>>>9);e=b+(c^d^f)+g[9]+3654602809&4294967295;b=c+(e<<4&4294967295|e>>>28);e=f+(b^c^d)+g[12]+3873151461&4294967295;
f=b+(e<<11&4294967295|e>>>21);e=d+(f^b^c)+g[15]+530742520&4294967295;d=f+(e<<16&4294967295|e>>>16);e=c+(d^f^b)+g[2]+3299628645&4294967295;c=d+(e<<23&4294967295|e>>>9);e=b+(d^(c|~f))+g[0]+4096336452&4294967295;b=c+(e<<6&4294967295|e>>>26);e=f+(c^(b|~d))+g[7]+1126891415&4294967295;f=b+(e<<10&4294967295|e>>>22);e=d+(b^(f|~c))+g[14]+2878612391&4294967295;d=f+(e<<15&4294967295|e>>>17);e=c+(f^(d|~b))+g[5]+4237533241&4294967295;c=d+(e<<21&4294967295|e>>>11);e=b+(d^(c|~f))+g[12]+1700485571&4294967295;b=c+
(e<<6&4294967295|e>>>26);e=f+(c^(b|~d))+g[3]+2399980690&4294967295;f=b+(e<<10&4294967295|e>>>22);e=d+(b^(f|~c))+g[10]+4293915773&4294967295;d=f+(e<<15&4294967295|e>>>17);e=c+(f^(d|~b))+g[1]+2240044497&4294967295;c=d+(e<<21&4294967295|e>>>11);e=b+(d^(c|~f))+g[8]+1873313359&4294967295;b=c+(e<<6&4294967295|e>>>26);e=f+(c^(b|~d))+g[15]+4264355552&4294967295;f=b+(e<<10&4294967295|e>>>22);e=d+(b^(f|~c))+g[6]+2734768916&4294967295;d=f+(e<<15&4294967295|e>>>17);e=c+(f^(d|~b))+g[13]+1309151649&4294967295;
c=d+(e<<21&4294967295|e>>>11);e=b+(d^(c|~f))+g[4]+4149444226&4294967295;b=c+(e<<6&4294967295|e>>>26);e=f+(c^(b|~d))+g[11]+3174756917&4294967295;f=b+(e<<10&4294967295|e>>>22);e=d+(b^(f|~c))+g[2]+718787259&4294967295;d=f+(e<<15&4294967295|e>>>17);e=c+(f^(d|~b))+g[9]+3951481745&4294967295;a.a[0]=a.a[0]+b&4294967295;a.a[1]=a.a[1]+(d+(e<<21&4294967295|e>>>11))&4294967295;a.a[2]=a.a[2]+d&4294967295;a.a[3]=a.a[3]+f&4294967295};
w.prototype.update=function(a,b){void 0===b&&(b=a.length);for(var c=b-this.c,g=this.s,d=this.e,f=0;f<b;){if(0==d)for(;f<=c;)x(this,a,f),f+=this.c;if(n(a))for(;f<b;){if(g[d++]=a.charCodeAt(f++),d==this.c){x(this,g);d=0;break}}else for(;f<b;)if(g[d++]=a[f++],d==this.c){x(this,g);d=0;break}}this.e=d;this.h+=b};var da={};t("devsite.permissions.init",function(a){da=a});t("devsite.permissions.hasPermission",function(a){var b=da,c=new w;c.update(a);var g=Array((56>c.e?c.c:2*c.c)-c.e);g[0]=128;for(a=1;a<g.length-8;++a)g[a]=0;var d=8*c.h;for(a=g.length-8;a<g.length;++a)g[a]=d&255,d/=256;c.update(g);g=Array(16);for(a=d=0;4>a;++a)for(var f=0;32>f;f+=8)g[d++]=c.a[a]>>>f&255;c=[];for(a=0;a<g.length;a++)c[a]=g[a].toString(16),2>c[a].length&&(c[a]="0"+c[a]);return!!b[c.join("")]});var y=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,y);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};u(y,Error);var ea;var fa=function(a,b){for(var c=a.split("%s"),g="",d=Array.prototype.slice.call(arguments,1);d.length&&1<c.length;)g+=c.shift()+d.shift();return g+c.join("%s")},ha=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},z=function(a){if(!ia.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ja,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ka,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(la,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(ma,"&quot;"));-1!=a.indexOf("'")&&
(a=a.replace(na,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(oa,"&#0;"));return a},ja=/&/g,ka=/</g,la=/>/g,ma=/"/g,na=/'/g,oa=/\x00/g,ia=/[\x00&<>"']/,A=function(a,b){return a<b?-1:a>b?1:0};var B=function(a,b){b.unshift(a);y.call(this,fa.apply(null,b));b.shift()};u(B,y);
var C=function(a,b,c,g){var d="Assertion failed";if(c)var d=d+(": "+c),f=g;else a&&(d+=": "+a,f=b);throw new B(""+d,f||[]);},D=function(a,b,c){a||C("",null,b,Array.prototype.slice.call(arguments,2))},pa=function(a,b){throw new B("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},qa=function(a,b,c){n(a)||C("Expected string but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2));return a},ra=function(a,b,c){"array"==m(a)||C("Expected array but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,
2));return a};var E=Array.prototype,sa=E.indexOf?function(a,b,c){D(null!=a.length);return E.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ta=E.filter?function(a,b,c){D(null!=a.length);return E.filter.call(a,b,c)}:function(a,b,c){for(var g=a.length,d=[],f=0,e=n(a)?a.split(""):a,h=0;h<g;h++)if(h in e){var k=e[h];b.call(c,k,h,a)&&(d[f++]=k)}return d};var F=function(){this.p="";this.r=ua;this.t=null};F.prototype.toString=function(){return"SafeHtml{"+this.p+"}"};var ua={};var G;t:{var va=l.navigator;if(va){var wa=va.userAgent;if(wa){G=wa;break t}}G=""};var H=function(){return-1!=G.indexOf("Edge")};var xa=-1!=G.indexOf("Opera")||-1!=G.indexOf("OPR"),I=-1!=G.indexOf("Edge")||-1!=G.indexOf("Trident")||-1!=G.indexOf("MSIE"),J=-1!=G.indexOf("Gecko")&&!(-1!=G.toLowerCase().indexOf("webkit")&&!H())&&!(-1!=G.indexOf("Trident")||-1!=G.indexOf("MSIE"))&&!H(),K=-1!=G.toLowerCase().indexOf("webkit")&&!H(),ya=function(){var a=G;if(J)return/rv\:([^\);]+)(\)|;)/.exec(a);if(I&&H())return/Edge\/([\d\.]+)/.exec(a);if(I)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(K)return/WebKit\/(\S+)/.exec(a)},za=function(){var a=
l.document;return a?a.documentMode:void 0},Aa=function(){if(xa&&l.opera){var a=l.opera.version;return"function"==m(a)?a():a}var a="",b=ya();b&&(a=b?b[1]:"");return I&&!H()&&(b=za(),b>parseFloat(a))?String(b):a}(),Ba={},L=function(a){var b;if(!(b=Ba[a])){b=0;for(var c=ha(String(Aa)).split("."),g=ha(String(a)).split("."),d=Math.max(c.length,g.length),f=0;0==b&&f<d;f++){var e=c[f]||"",h=g[f]||"",k=RegExp("(\\d*)(\\D*)","g"),q=RegExp("(\\d*)(\\D*)","g");do{var v=k.exec(e)||["","",""],r=q.exec(h)||["",
"",""];if(0==v[0].length&&0==r[0].length)break;b=A(0==v[1].length?0:parseInt(v[1],10),0==r[1].length?0:parseInt(r[1],10))||A(0==v[2].length,0==r[2].length)||A(v[2],r[2])}while(0==b)}b=Ba[a]=0<=b}return b},Ca=l.document,Da=za(),Ea=!Ca||!I||!Da&&H()?void 0:Da||("CSS1Compat"==Ca.compatMode?parseInt(Aa,10):5);!J&&!I||I&&I&&(H()||9<=Ea)||J&&L("1.9.1");I&&L("9");var M=function(a){this.u=a||l.document||document};M.prototype.createElement=function(a){return this.u.createElement(a)};M.prototype.appendChild=function(a,b){a.appendChild(b)};M.prototype.contains=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};var N={C:!0},Fa={D:!0},O=function(){throw Error("Do not instantiate directly");};O.prototype.l=null;O.prototype.toString=function(){return this.content};var Ka=function(a){var b=Ga;D(b,"Soy template may not be null.");var c=(ea||(ea=new M)).createElement("DIV");a=Ha(b(a||Ia,void 0,void 0));b=a.match(Ja);D(!b,"This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s",b&&b[0],a);c.innerHTML=a;return 1==c.childNodes.length&&(a=c.firstChild,1==a.nodeType)?a:c},Ha=function(a){var b=typeof a;if(("object"!=b||null==a)&&"function"!=b)return String(a);
if(a instanceof O){if(a.g===N)return qa(a.content);if(a.g===Fa)return z(a.content)}pa("Soy template output is unsafe for use as HTML: "+a);return"zSoyz"},Ja=/^<(body|caption|col|colgroup|head|html|tr|td|tbody|thead|tfoot)>/i,Ia={};I&&L(8);var La=function(a){if(null!=a)switch(a.l){case 1:return 1;case -1:return-1;case 0:return 0}return null},P=function(){O.call(this)};u(P,O);P.prototype.g=N;
var Ma=function(a){if(null!=a&&a.g===N)return D(a.constructor===P),a;if(a instanceof F){var b=Q,c;a instanceof F&&a.constructor===F&&a.r===ua?c=a.p:(pa("expected object of type SafeHtml, got '"+a+"'"),c="type_error:SafeHtml");a=b(c,a.t)}else a=Q(z(String(String(a))),La(a));return a},Q=function(a){function b(a){this.content=a}b.prototype=a.prototype;return function(a,g){var d=new b(String(a));void 0!==g&&(d.l=g);return d}}(P);
(function(a){function b(a){this.content=a}b.prototype=a.prototype;return function(a,g){var d=String(a);if(!d)return"";d=new b(d);void 0!==g&&(d.l=g);return d}})(P);
var Ra=function(a){return null!=a&&a.g===N?(D(a.constructor===P),a=String(a.content).replace(Na,"").replace(Oa,"&lt;"),String(a).replace(Pa,Qa)):z(String(a))},Sa={"\x00":"&#0;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;",'"':"&quot;","&":"&amp;","'":"&#39;","-":"&#45;","/":"&#47;","<":"&lt;","=":"&#61;",">":"&gt;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Qa=function(a){return Sa[a]},Pa=/[\x00\x22\x27\x3c\x3e]/g,Na=/<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
Oa=/</g;var Ga=function(a){var b='<ul><li class="devsite-page-nav-item devsite-nav-item devsite-nav-first-item"><a href="#top_of_page"><div class="devsite-nav-label devsite-nav-header devsite-nav-first-item">Contents</div></a></li>';a=ra(a.w,"expected parameter 'tableItems' of type list<[children: unknown, id: string, text: string]>.");for(var c=a.length,g=0;g<c;g++){var d=a[g],b=b+('<li class="devsite-page-nav-item devsite-nav-item"><a href="#'+Ra(d.id)+'"><div class="devsite-nav-label">'+Ma(d.text)+"</div></a>");
if(d.children){for(var b=b+"<ul>",d=d.children,f=d.length,e=0;e<f;e++)var h=d[e],b=b+('<li class="devsite-page-nav-item devsite-nav-item"><a href="#'+Ra(h.id)+'"><div class="devsite-nav-label">'+Ma(h.text)+"</div></a></li>");b+="</ul>"}b+="</li>"}return Q(b+"</ul>")};Ga.F="devsite.tableOfContentsHtmlGen.getTableOfContentsHtml";var Ta=1;
t("devsite.tableOfContents.renderTableOfContents",function(a,b){for(var c={},g=[],d=!1,f=b.querySelectorAll("h2:not(.hide-from-toc), *:not(.ds-selector-tabs):not(.ds-selector-dropdown) > * > h3:not(.hide-from-toc)"),e=0;e<f.length;e++){var h=f[e];if(!h.id){for(var k=h.textContent.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")||"header",q=h,v=c,r=k;v[r];)r=k+"_"+Ta++;v[r]=!0;q.id=r}q={id:h.id,text:h.textContent,children:[]};"H2"==h.tagName?(g.push(q),d=!0):d?g[g.length-1].children.push(q):g.push(q)}a.appendChild(Ka({w:g}))});var Ua=function(a){if(a.classList)return a.classList;a=a.className;return n(a)&&a.match(/\S+/g)||[]},R=function(a,b){var c;a.classList?c=a.classList.contains(b):(c=Ua(a),c=0<=sa(c,b));return c},Va=function(a,b){a.classList?a.classList.remove(b):R(a,b)&&(a.className=ta(Ua(a),function(a){return a!=b}).join(" "))},S=function(a,b,c){R(a,b)&&(Va(a,b),a.classList?a.classList.add(c):R(a,c)||(a.className+=0<a.className.length?" "+c:c))};var T=function(a){T[" "](a);return a};T[" "]=function(){};var Wa=!I||I&&(H()||9<=Ea),Xa=I&&!L("9");!K||L("528");J&&L("1.9b")||I&&L("8")||xa&&L("9.5")||K&&L("528");J&&!L("8")||I&&L("9");var U=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.q=!1};U.prototype.preventDefault=function(){this.defaultPrevented=!0};var V=function(a,b){U.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.n=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var g=a.relatedTarget;if(g){if(J){var d;t:{try{T(g.nodeName);d=!0;break t}catch(f){}d=!1}d||(g=null)}}else"mouseover"==
c?g=a.fromElement:"mouseout"==c&&(g=a.toElement);this.relatedTarget=g;this.offsetX=K||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=K||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.n=a;a.defaultPrevented&&this.preventDefault()}};u(V,U);V.prototype.preventDefault=function(){V.v.preventDefault.call(this);var a=this.n;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Xa)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var Ya="closure_listenable_"+(1E6*Math.random()|0),Za=0;var $a=function(a,b,c,g,d){this.d=a;this.proxy=null;this.src=b;this.type=c;this.k=!!g;this.m=d;this.key=++Za;this.f=this.j=!1},W=function(a){a.f=!0;a.d=null;a.proxy=null;a.src=null;a.m=null};var X=function(a){this.src=a;this.b={};this.i=0};X.prototype.add=function(a,b,c,g,d){var f=a.toString();a=this.b[f];a||(a=this.b[f]=[],this.i++);var e=ab(a,b,g,d);-1<e?(b=a[e],c||(b.j=!1)):(b=new $a(b,this.src,f,!!g,d),b.j=c,a.push(b));return b};X.prototype.remove=function(a,b,c,g){a=a.toString();if(!(a in this.b))return!1;var d=this.b[a];b=ab(d,b,c,g);return-1<b?(W(d[b]),D(null!=d.length),E.splice.call(d,b,1),0==d.length&&(delete this.b[a],this.i--),!0):!1};
var ab=function(a,b,c,g){for(var d=0;d<a.length;++d){var f=a[d];if(!f.f&&f.d==b&&f.k==!!c&&f.m==g)return d}return-1};var Y="closure_lm_"+(1E6*Math.random()|0),Z={},bb=0,cb=function(a,b,c,g,d){if("array"==m(b))for(var f=0;f<b.length;f++)cb(a,b[f],c,g,d);else if(c=db(c),a&&a[Ya])a.B(b,c,g,d);else{if(!b)throw Error("Invalid event type");var f=!!g,e=eb(a);e||(a[Y]=e=new X(a));c=e.add(b,c,!1,g,d);c.proxy||(g=fb(),c.proxy=g,g.src=a,g.d=c,a.addEventListener?a.addEventListener(b.toString(),g,f):a.attachEvent(gb(b.toString()),g),bb++)}},fb=function(){var a=hb,b=Wa?function(c){return a.call(b.src,b.d,c)}:function(c){c=a.call(b.src,
b.d,c);if(!c)return c};return b},gb=function(a){return a in Z?Z[a]:Z[a]="on"+a},jb=function(a,b,c,g){var d=!0;if(a=eb(a))if(b=a.b[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.k==c&&!f.f&&(f=ib(f,g),d=d&&!1!==f)}return d},ib=function(a,b){var c=a.d,g=a.m||a.src;if(a.j&&"number"!=typeof a&&a&&!a.f){var d=a.src;if(d&&d[Ya])d.G(a);else{var f=a.type,e=a.proxy;d.removeEventListener?d.removeEventListener(f,e,a.k):d.detachEvent&&d.detachEvent(gb(f),e);bb--;if(f=eb(d)){var e=a.type,h;
if(h=e in f.b){h=f.b[e];var k=sa(h,a),q;if(q=0<=k)D(null!=h.length),E.splice.call(h,k,1);h=q}h&&(W(a),0==f.b[e].length&&(delete f.b[e],f.i--));0==f.i&&(f.src=null,d[Y]=null)}else W(a)}}return c.call(g,b)},hb=function(a,b){if(a.f)return!0;if(!Wa){var c;if(!(c=b))t:{c=["window","event"];for(var g=l,d;d=c.shift();)if(null!=g[d])g=g[d];else{c=null;break t}c=g}d=c;c=new V(d,this);g=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){t:{var f=!1;if(0==d.keyCode)try{d.keyCode=-1;break t}catch(e){f=!0}if(f||void 0==
d.returnValue)d.returnValue=!0}d=[];for(f=c.currentTarget;f;f=f.parentNode)d.push(f);for(var f=a.type,h=d.length-1;!c.q&&0<=h;h--){c.currentTarget=d[h];var k=jb(d[h],f,!0,c),g=g&&k}for(h=0;!c.q&&h<d.length;h++)c.currentTarget=d[h],k=jb(d[h],f,!1,c),g=g&&k}return g}return ib(a,new V(b,this))},eb=function(a){a=a[Y];return a instanceof X?a:null},kb="__closure_events_fn_"+(1E9*Math.random()>>>0),db=function(a){D(a,"Listener can not be null.");if("function"==m(a))return a;D(a.handleEvent,"An object listener must have handleEvent method.");
a[kb]||(a[kb]=function(b){return a.handleEvent(b)});return a[kb]};var lb=function(a){a=a.querySelectorAll(".devsite-navigation-item-expandable");for(var b=0;b<a.length;b++){var c=a[b].querySelector(".devsite-navigation-toggle"),g=a[b].querySelector(".devsite-navigation-title"),d=a[b].querySelector("ul");cb(c,"click",p(this.o,this,c,d));g.hasAttribute("href")||cb(g,"click",p(this.o,this,c,d))}};t("devsite.Treelist.create",function(a){return new lb(a)});
lb.prototype.o=function(a,b){if(R(a,"expanded")){S(a,"expanded","collapsed");a.innerHTML="&#9656;";var c=b.scrollHeight;mb(b,c,0,function(){S(b,"expanded","collapsed")})}else S(a,"collapsed","expanded"),a.innerHTML="&#9662;",c=b.scrollHeight,mb(b,0,c,function(){b.style.height="auto";S(b,"collapsed","expanded")})};
var mb=function(a,b,c,g){if(window.requestAnimationFrame){var d=(c-b)/6;a.style.height=b+"px";var f=function(){b+=d;0<d&&b>c||0>d&&b<c?(a.style.height=c,g&&g()):(a.style.height=b+"px",window.requestAnimationFrame(f))};window.requestAnimationFrame(f)}else a.style.height=c+"px",g&&g()};
