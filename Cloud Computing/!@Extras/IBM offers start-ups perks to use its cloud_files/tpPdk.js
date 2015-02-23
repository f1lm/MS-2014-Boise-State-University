window.__tp_pdk_set_versions = function() {
	$pdk.expectedVersions = {};
	$pdk.version = new $pdk.PdkVersion("5", "5", "6", "362723", "2014-09-19 2:25 PM");
$pdk.expectedVersions.bootloaderVersion = new $pdk.PdkVersion("5", "5", "6", "362723", "2014-09-19 2:08 PM");
$pdk.expectedVersions.gwtVersion = new $pdk.PdkVersion("5", "5", "6", "362723", "2014-09-19 2:08 PM");

$pdk.expectedVersions.flexVersion = new $pdk.PdkVersion("5", "5", "6", "362723", "2014-09-19 1:11 PM");
};
(function(){var I='',T='.',M='/',U='Object',P='[object Array]',R='boolean',N='function',V='js.com.theplatform.pdk',O='js/app',Q='number',K='object',J='script',L='string',S='undefined';var j=navigator.userAgent.toLowerCase(),k=function(a){return a.test(j)},l=true,m=k(/opera/),n=!m&&(k(/msie/)||k(/trident/)),o=n&&k(/msie 6/),p=n&&k(/msie 7/),q=n&&k(/msie 8/),r=n&&k(/trident\/5.0/),s=k(/firefox [0-9][0-9]/),t=k(/webkit/),u=k(/chrome/),v=!u&&k(/safari/),w=k(/bb10/),A=k(/iphone/)||k(/ipad/),B=k(/android/),C=k(/windows|win32/),D=k(/macintosh/),F,G=I;try{F=document.getElementsByTagName(J);if(typeof window.$pdk===K&&typeof window.$pdk.scriptRoot===L){G=$pdk.scriptRoot}else{for(var H=0;H<F.length;H++){if(F[H].src.match(/tpPdk\.js/)){G=F[H].src.substr(0,F[H].src.lastIndexOf(M));break}}if(!G){G=F[F.length-1].src.substr(0,F[F.length-1].src.lastIndexOf(M))}}}catch(a){G=I}if(window.$pdk===null||typeof window.$pdk!==K&&typeof window.$pdk!==N){window.$pdk={bootloader_version:1}}if(typeof $pdk.apply!==N){$pdk.apply=function(a,b,c){if(c){$pdk.apply(a,c)}if(a&&(b&&typeof b==K)){for(var d in b){a[d]=b[d]}}return a}}$pdk.apply($pdk,{isAny:l,isOpera:m,isIE:n,isIE6:o,isIE7:p,isIE8:q,isIE9:r,isWebKit:t,isChrome:u,isSafari:v,isFirefox:s,isMac:D,isBB10:w,isAndroid:B,isIOS:A,isWindows:C,scriptRoot:G,startTime:(new Date).getTime(),defaultAppJsRoot:O,isArray:function(a){return Object.prototype.toString.apply(a)===P},isEmpty:function(a,b){return a===null||(a===undefined||($pdk.isArray(a)&&!a.length||(!b?a===I:false)))},isPrimitive:function(a){var b=typeof a;return b==L||(b==Q||b==R)},isObject:function(a){return a&&typeof a==K},tupleComp:function(a,b,c){var d=-1,e,f=a.length;for(e=0;e<f;e++){d=c(a[e],b[e]);if(d!==0){break}}return d},each:function(a,b,c){if($pdk.isEmpty(a,true)){return}if(typeof a.length==S||$pdk.isPrimitive(a)){a=[a]}for(var d=0,e=a.length;d<e;d++){if(b.call(c||a[d],a[d],d,a)===false){return d}}},ns:function(){var c,d,e=window;try{e=$wnd!==null&&typeof $wnd===K?$wnd:window}catch(a){e=window}$pdk.each(arguments,function(b){d=b.split(T);c=e[d[0]]=e[d[0]]||{};$pdk.each(d.slice(1),function(a){c=c[a]=c[a]||{}})});return c},override:function(a,b){if(b){var c=a.prototype;$pdk.apply(c,b);if($pdk.isIE&&b.toString!=a.toString){c.toString=b.toString}}},extend:function(){var h=function(a){for(var b in a){this[b]=a[b]}};var i=Object.prototype.constructor;return function(b,c,d){if($pdk.isObject(c)){d=c;c=b;b=d.constructor!=i&&(!d.constructor.name||d.constructor.name!=U)?d.constructor:function(){c.apply(this,arguments)}}var e=function(){},f,g=c.prototype;e.prototype=g;f=b.prototype=new e;f.constructor=b;b.superclass=g;if(g.constructor==i){g.constructor=c}b.override=function(a){$pdk.override(b,a)};f.superclass=f.supr=function(){return g};f.override=h;$pdk.override(b,d);b.extend=function(a){$pdk.extend(b,a)};return b}}(),isDomReady:function(){if($pdk.isEmpty(document.readyState)){return !$pdk.isEmpty(document.body)}return /loaded|complete/.test(document.readyState)}});$pdk.ns(V);js.com.theplatform.pdk=$pdk}());function PDK(){var fb='',ee='\n-',Cb='" for "gwt:onLoadErrorFn"',Ab='" for "gwt:onPropertyErrorFn"',Td='"<script src=\\"',nb='"><\/script>',db='#',de=');',Xd='-\n',fe='-><\/scr',ke='.cache.js',Ud='.cache.js\\"><\/scr" + "ipt>"',U='/',qb='//',sc='02DCFA8443FA74E74C689D9BD7CCD1B1',uc='04739FFF456E6A41B09E4D923938FE7C',vc='07B42B9CC1B5A71161F3ACA1E2CE3EC4',wc='080402C9AA54A5B45C7C8336BF19F2C0',xc='0AB14846CC6763667BBB1811B0683C2B',yc='0B45BB5E9B6912A6083875BB63060E22',zc='12534E07E890150C75BCF106E7F59B3D',Ac='1391B5DEC688353577AD7A79D23E675B',Bc='17AB2C5782CFD6D6E05EDB8929A9F053',Cc='185D6CD6D2A5BE788425B86AD43284F8',Dc='18CE5B826D9A071A4AA92978235182EB',Ec='1F72284BA0A02B6C09ECFC2FC8EAA3AF',Fc='20E58D01B100A2E8CEF0D45D4D14B472',Gc='225481533441E9A297EF9D8BBEE741E2',Hc='23F73D7C82EC3F9ACD76F5E22F887610',Ic='247750A185E0405CB53ADEB23D983768',Jc='24E1C253ED0B36E468C1A0C2A7D9D0F0',Kc='262B7EE82F707E5C2BACA824B864664C',Lc='26E0184FD84C32403532ED5D989A9ECC',Mc='2B6666BBE24549BCB2E9655ED51002A5',Nc='2FBF3E4212A4E2A8F2099FDC250F1BEA',Oc='308529AA2395D366153D5D353A663CD3',Pc='32B0404591BA6220C98A603A46FE7E8E',Qc='34EF731EAD4115B95076F1EA51B2CF4A',Rc='39628884A34330ED2896DCFC848C4743',Sc='3C8A075AE0674A369463A8CA815BD43F',Tc='42FB3971DBD68451A693BC6450932A6D',Uc='4331FCEFE12DACFD53DEF665ED175E1D',Vc='4B026ACB2FC1C943AF2C69CC685E4810',Wc='4B1D255FF5DAFFBF58303D1E13A1DBB3',Xc='4C21667E44BEC2C0282E7C5719F326C1',Yc='4CDCD918CF1E282BFE46B08A15BAA103',Zc='4D456F1E404C5FA24CAE369A54BA718F',$c='5481D0BE5C8CFEB8A2BBF0067BE35E44',_c='5A525A5B88CF28C3DFFE03118C45A269',ad='5AA37DE8FB190B6DF0BD106A763C3704',bd='5BC9C0749B83DB0A7832B64077E67DB1',cd='5C1C369DCE4B54B2794797FAEE1421C6',dd='5D533D770886B8F173A15ADDCE066311',ed='6235BFCCF65E5C5EFB496E25EE63E807',fd='62B63D04C0E20C76165465569309AF25',gd='65E2968B92DCE9E22423ED04BE78941B',hd='6A4D1F4113CD1EB26954D817A94AC944',jd='6D179240D200A6CAE889A3F0768DD262',kd='70E20C1BA6C5D9B7CA31B0746721EB73',ld='716287FD9ACF92B6FF2EA399425250CB',md='7B52A3733B640FBEA62FAD6BD183C115',nd='7F6847D1DD1163B2611F6F58F85A4FAB',od='843A81D1E49FE0A4E6D3099D722828AE',pd='85658F33CFBB1FA3B1E06758E994C7AB',qd='868C6DF856D32DDD34428890E0E4A7AA',rd='87C0BF1DF6D061BABD82CA24C974E9E8',sd='920AEF7E8305ADA19A2ADCD7B62F5011',td='92E92018CA9426E0C408D861C686B79E',Qd=':',tc=':1',ub='::',Vd='<scr',mb='<script id="',xb='=',eb='?',ud='A4F4D99026E6DEA154CB7C0DBE30705A',vd='A73345A953E6A7CB30D09772D84A97A5',wd='ACD5DE864A5ECF6480332167AB822A52',xd='B35702130A64A6814ED8C7BEFA23F377',yd='B671F0AEB1A02A2FABC368EF61044FF3',zd='B98522FE44DAA1427A45A8FC755FD9DC',Ad='BA27E88E829003C745C7F6CB3F0EECBA',Bd='BE15E33CB629F48454E51BFC70A7C860',zb='Bad handler "',Cd='C5B44D7A6A295F8B60623544FD18811A',Dd='C99BED63B3803A2839FC66ABB6377E8D',Ed='CEF018A0108813545D7616C31C8D858F',Fd='CF9A16C46095B13074BD8BA9B826F9FD',pc='Cross-site hosted mode not yet implemented. See issue ',Gd='D203EE7CB8A00EF93212DBFE4609B475',Hd='D51860CC1F73749164DA389B9B701E92',Id='D5B340679F188D82418BC7A317805940',Jd='DCED7CE61303EB33A5E31BAEAE766CEB',Kd='DEC08A5C1FA2C99A3ABD94A34F86F7E1',Ld='DFFA4E8F162D46CDE53C2719F8CCF79D',Rd='DOMContentLoaded',Md='E7241FF1002C4E763A795FD7A9E2C274',Nd='F5A5BBC74D7A180A66B2DE05230B1E2D',Od='FAC0AB3E91D901B32599CF0E7392A45E',Pd='FB0DBA5760C51CAEC310206E73737742',V='PDK',kb='PDK.nocache.js',tb='PDK::',ob='SCRIPT',lb='__gwt_marker_PDK',Lb='android',Pb='android 2',Qb='android 3.0',pb='base',ib='baseUrl',Y='begin',X='bootstrap',Mb='chrome',Ob='chrome_android',cc='chrome_mac',dc='chrome_windows',hb='clear.cache.gif',wb='content',ce='document.write(',cb='end',$d='evtGroup: "loadExternalRefs", millis:(new Date()).getTime(),',ae='evtGroup: "moduleStartup", millis:(new Date()).getTime(),',Jb='false',lc='gecko',oc='gecko1_8',nc='gecko1_8_mac',mc='gecko1_8_windows',$='gwt.codesvr=',_='gwt.hosted=',ab='gwt.hybrid',Bb='gwt:onLoadErrorFn',yb='gwt:onPropertyErrorFn',vb='gwt:property',Db='hasFlash',Eb='hasJquery',ie='head',Hb='html5',qc='http://code.google.com/p/google-web-toolkit/issues/detail?id=2079',hc='ie10',gc='ie10_app',kc='ie6',jc='ie8',ic='ie9',gb='img',Ub='ipad',Wb='iphone',ge='ipt>',Wd='ipt><!-',bc='linux',Sd='loadExternalRefs',Yb='macintosh',rb='meta',Zd='moduleName:"PDK", sessionId:window.__gwtStatsSessionId, subSystem:"startup",',je='moduleRequested',bb='moduleStartup',fc='msapphost',ec='msie',sb='name',Tb='opera',Gb='preferredruntimes',Fb='requiresPhase1',Zb='safari',Sb='safari_android',Rb='safari_android_legacy',Vb='safari_ipad',Xb='safari_iphone',$b='safari_mac',ac='safari_windows',jb='script',rc='selectingPermutation',Nb='silk',W='startup',he='text/javascript',Ib='true',_d='type: "end"});',be='type: "moduleRequested"});',Z='undefined',Kb='user.agent',Yd='window.__gwtStatsEvent && window.__gwtStatsEvent({',_b='windows';var m=window,n=document,o=m.__gwtStatsEvent?function(a){return m.__gwtStatsEvent(a)}:null,p=m.__gwtStatsSessionId?m.__gwtStatsSessionId:null,q,r,s=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U,t={},u=[],v=[],w=[],A=0,B,C;o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:Y});if(!m.__gwt_stylesLoaded){m.__gwt_stylesLoaded={}}if(!m.__gwt_scriptsLoaded){m.__gwt_scriptsLoaded={}}function D(){if(typeof n.readyState==Z){return typeof n.body!=Z&&n.body!=null}return /loaded|complete/.test(n.readyState)}
function F(){var b=false;try{var c=m.location.search;return (c.indexOf($)!=-1||(c.indexOf(_)!=-1||m.external&&m.external.gwtOnLoad))&&c.indexOf(ab)==-1}catch(a){}F=function(){return b};return b}
function G(){if(q&&r){var a=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U;q(B,V,a,A);o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:bb,millis:(new Date).getTime(),type:cb})}}
function H(){function e(a){var b=a.lastIndexOf(db);if(b==-1){b=a.length}var c=a.indexOf(eb);if(c==-1){c=a.length}var d=a.lastIndexOf(U,Math.min(c,b));return d>=0?a.substring(0,d+1):fb}
function f(a){if(a.match(/^\w+:\/\//)){}else{var b=n.createElement(gb);b.src=a+hb;a=e(b.src)}return a}
function g(){var a=J(ib);if(a!=null){return a}return fb}
function h(){var a=n.getElementsByTagName(jb);for(var b=0;b<a.length;++b){if(a[b].src.indexOf(kb)!=-1){return e(a[b].src)}}return fb}
function i(){var a;if(typeof D==Z||!D()){var b=lb;var c;n.write(mb+b+nb);c=n.getElementById(b);a=c&&c.previousSibling;while(a&&a.tagName!=ob){a=a.previousSibling}if(c){c.parentNode.removeChild(c)}if(a&&a.src){return e(a.src)}}return fb}
function j(){var a=n.getElementsByTagName(pb);if(a.length>0){return a[a.length-1].href}return fb}
function k(){var a=n.location;return a.href==a.protocol+qb+a.host+a.pathname+a.search+a.hash}
var l=g();if(l==fb){l=h()}if(l==fb){l=i()}if(l==fb){l=j()}if(l==fb&&k()){l=e(n.location.href)}l=f(l);s=l;return l}
function I(){var b=document.getElementsByTagName(rb);for(var c=0,d=b.length;c<d;++c){var e=b[c],f=e.getAttribute(sb),g;if(f){f=f.replace(tb,fb);if(f.indexOf(ub)>=0){continue}if(f==vb){g=e.getAttribute(wb);if(g){var h,i=g.indexOf(xb);if(i>=0){f=g.substring(0,i);h=g.substring(i+1)}else{f=g;h=fb}t[f]=h}}else if(f==yb){g=e.getAttribute(wb);if(g){try{C=eval(g)}catch(a){alert(zb+g+Ab)}}}else if(f==Bb){g=e.getAttribute(wb);if(g){try{B=eval(g)}catch(a){alert(zb+g+Cb)}}}}}}
function J(a){var b=t[a];return b==null?null:b}
function K(a,b){var c=w;for(var d=0,e=a.length-1;d<e;++d){c=c[a[d]]||(c[a[d]]=[])}c[a[e]]=b}
function L(a){var b=v[a](),c=u[a];if(b in c){return b}var d=[];for(var e in c){d[c[e]]=e}if(C){C(a,d,b)}throw null}
v[Db]=function(){return String($pdk.env.Detect.getInstance().hasFlash())};u[Db]={'false':0,'true':1};v[Eb]=function(){return String($pdk.env.Detect.getInstance().hasJquery())};u[Eb]={'false':0,'true':1};v[Fb]=function(){var a=$pdk.env.Detect.getInstance().getConfigSet(Gb);return a&&a.contains(Hb)?Ib:Jb};u[Fb]={'false':0,'true':1};v[Kb]=function(){var b=navigator.userAgent.toLowerCase();var c=function(a){return parseInt(a[1])*1000+parseInt(a[2])};if(function(){return b.indexOf(Lb)!=-1&&b.indexOf(Mb)!=-1||b.indexOf(Nb)!=-1}()){{m.$pdk.userAgentAxis=Ob;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Pb)!=-1||b.indexOf(Qb)!=-1}()){{m.$pdk.userAgentAxis=Rb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Lb)!=-1&&(b.indexOf(Pb)==-1&&(b.indexOf(Qb)==-1&&b.indexOf(Nb)==-1))}()){{m.$pdk.userAgentAxis=Sb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Tb)!=-1}()){{m.$pdk.userAgentAxis=Tb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Ub)!=-1}()){{m.$pdk.userAgentAxis=Vb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Wb)!=-1}()){{m.$pdk.userAgentAxis=Xb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Mb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(Yb)!=-1&&b.indexOf(Zb)!=-1)))}()){{m.$pdk.userAgentAxis=$b;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Mb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(_b)!=-1&&b.indexOf(Zb)!=-1))}()){{m.$pdk.userAgentAxis=ac;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Nb)==-1&&(b.indexOf(Lb)==-1&&((b.indexOf(Yb)!=-1||b.indexOf(bc)!=-1)&&b.indexOf(Mb)!=-1))}()){{m.$pdk.userAgentAxis=cc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Nb)==-1&&(b.indexOf(_b)!=-1&&b.indexOf(Mb)!=-1)}()){{m.$pdk.userAgentAxis=dc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&(b.indexOf(fc)!=-1&&n.documentMode>=10)}()){{m.$pdk.userAgentAxis=gc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=10}()){{m.$pdk.userAgentAxis=hc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=9}()){{m.$pdk.userAgentAxis=ic;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=8}()){{m.$pdk.userAgentAxis=jc;return m.$pdk.userAgentAxis}}if(function(){var a=/msie ([0-9]+)\.([0-9]+)/.exec(b);if(a&&a.length==3)return c(a)>=6000}()){{m.$pdk.userAgentAxis=kc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1&&b.indexOf(_b)!=-1}()){{m.$pdk.userAgentAxis=mc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1&&(b.indexOf(Yb)!=-1||b.indexOf(bc)!=-1)}()){{m.$pdk.userAgentAxis=nc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1}()){{m.$pdk.userAgentAxis=oc;return m.$pdk.userAgentAxis}}m.$pdk.userAgentAxis=cc;return cc};u[Kb]={chrome_android:0,chrome_mac:1,chrome_windows:2,gecko1_8:3,gecko1_8_mac:4,gecko1_8_windows:5,ie10:6,ie10_app:7,ie6:8,ie8:9,ie9:10,opera:11,safari:12,safari_android:13,safari_android_legacy:14,safari_ipad:15,safari_iphone:16,safari_mac:17,safari_windows:18};PDK.onScriptLoad=function(a){PDK.onScriptLoad=null;q=a;G()};if(F()){alert(pc+qc);return}I();H();o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:rc});var M;try{K([Jb,Ib,Jb,Tb],sc);K([Jb,Ib,Ib,Tb],sc);K([Jb,Ib,Jb,Tb],sc+tc);K([Jb,Ib,Ib,Tb],sc+tc);K([Ib,Ib,Jb,Xb],uc);K([Ib,Ib,Ib,Xb],uc);K([Ib,Ib,Jb,Xb],uc+tc);K([Ib,Ib,Ib,Xb],uc+tc);K([Jb,Ib,Jb,Zb],vc);K([Jb,Ib,Ib,Zb],vc);K([Jb,Ib,Jb,Zb],vc+tc);K([Jb,Ib,Ib,Zb],vc+tc);K([Ib,Jb,Jb,nc],wc);K([Ib,Jb,Ib,nc],wc);K([Ib,Jb,Jb,nc],wc+tc);K([Ib,Jb,Ib,nc],wc+tc);K([Ib,Ib,Jb,oc],xc);K([Ib,Ib,Ib,oc],xc);K([Ib,Ib,Jb,oc],xc+tc);K([Ib,Ib,Ib,oc],xc+tc);K([Ib,Ib,Jb,Sb],yc);K([Ib,Ib,Ib,Sb],yc);K([Ib,Ib,Jb,Sb],yc+tc);K([Ib,Ib,Ib,Sb],yc+tc);K([Jb,Jb,Jb,Ob],zc);K([Jb,Jb,Ib,Ob],zc);K([Jb,Jb,Jb,Ob],zc+tc);K([Jb,Jb,Ib,Ob],zc+tc);K([Jb,Ib,Jb,ac],Ac);K([Jb,Ib,Ib,ac],Ac);K([Jb,Ib,Jb,ac],Ac+tc);K([Jb,Ib,Ib,ac],Ac+tc);K([Ib,Jb,Jb,gc],Bc);K([Ib,Jb,Ib,gc],Bc);K([Ib,Jb,Jb,gc],Bc+tc);K([Ib,Jb,Ib,gc],Bc+tc);K([Jb,Jb,Jb,Xb],Cc);K([Jb,Jb,Ib,Xb],Cc);K([Jb,Jb,Jb,Xb],Cc+tc);K([Jb,Jb,Ib,Xb],Cc+tc);K([Jb,Ib,Jb,Ob],Dc);K([Jb,Ib,Ib,Ob],Dc);K([Jb,Ib,Jb,Ob],Dc+tc);K([Jb,Ib,Ib,Ob],Dc+tc);K([Jb,Ib,Jb,nc],Ec);K([Jb,Ib,Ib,nc],Ec);K([Jb,Ib,Jb,nc],Ec+tc);K([Jb,Ib,Ib,nc],Ec+tc);K([Ib,Ib,Jb,gc],Fc);K([Ib,Ib,Ib,gc],Fc);K([Ib,Ib,Jb,gc],Fc+tc);K([Ib,Ib,Ib,gc],Fc+tc);K([Ib,Jb,Jb,Ob],Gc);K([Ib,Jb,Ib,Ob],Gc);K([Ib,Jb,Jb,Ob],Gc+tc);K([Ib,Jb,Ib,Ob],Gc+tc);K([Ib,Ib,Jb,ac],Hc);K([Ib,Ib,Ib,ac],Hc);K([Ib,Ib,Jb,ac],Hc+tc);K([Ib,Ib,Ib,ac],Hc+tc);K([Ib,Ib,Jb,Vb],Ic);K([Ib,Ib,Ib,Vb],Ic);K([Ib,Ib,Jb,Vb],Ic+tc);K([Ib,Ib,Ib,Vb],Ic+tc);K([Ib,Ib,Jb,Rb],Jc);K([Ib,Ib,Ib,Rb],Jc);K([Ib,Ib,Jb,Rb],Jc+tc);K([Ib,Ib,Ib,Rb],Jc+tc);K([Ib,Jb,Jb,Xb],Kc);K([Ib,Jb,Ib,Xb],Kc);K([Ib,Jb,Jb,Xb],Kc+tc);K([Ib,Jb,Ib,Xb],Kc+tc);K([Jb,Ib,Jb,gc],Lc);K([Jb,Ib,Ib,gc],Lc);K([Jb,Ib,Jb,gc],Lc+tc);K([Jb,Ib,Ib,gc],Lc+tc);K([Ib,Ib,Jb,Tb],Mc);K([Ib,Ib,Ib,Tb],Mc);K([Ib,Ib,Jb,Tb],Mc+tc);K([Ib,Ib,Ib,Tb],Mc+tc);K([Ib,Jb,Jb,$b],Nc);K([Ib,Jb,Ib,$b],Nc);K([Ib,Jb,Jb,$b],Nc+tc);K([Ib,Jb,Ib,$b],Nc+tc);K([Jb,Ib,Jb,Sb],Oc);K([Jb,Ib,Ib,Sb],Oc);K([Jb,Ib,Jb,Sb],Oc+tc);K([Jb,Ib,Ib,Sb],Oc+tc);K([Ib,Ib,Jb,hc],Pc);K([Ib,Ib,Ib,hc],Pc);K([Ib,Ib,Jb,hc],Pc+tc);K([Ib,Ib,Ib,hc],Pc+tc);K([Jb,Jb,Jb,Zb],Qc);K([Jb,Jb,Ib,Zb],Qc);K([Jb,Jb,Jb,Zb],Qc+tc);K([Jb,Jb,Ib,Zb],Qc+tc);K([Ib,Jb,Jb,Zb],Rc);K([Ib,Jb,Ib,Zb],Rc);K([Ib,Jb,Jb,Zb],Rc+tc);K([Ib,Jb,Ib,Zb],Rc+tc);K([Ib,Ib,Jb,mc],Sc);K([Ib,Ib,Ib,mc],Sc);K([Ib,Ib,Jb,mc],Sc+tc);K([Ib,Ib,Ib,mc],Sc+tc);K([Jb,Ib,Jb,kc],Tc);K([Jb,Ib,Ib,kc],Tc);K([Jb,Ib,Jb,kc],Tc+tc);K([Jb,Ib,Ib,kc],Tc+tc);K([Jb,Jb,Jb,dc],Uc);K([Jb,Jb,Ib,dc],Uc);K([Jb,Jb,Jb,dc],Uc+tc);K([Jb,Jb,Ib,dc],Uc+tc);K([Ib,Ib,Jb,kc],Vc);K([Ib,Ib,Ib,kc],Vc);K([Ib,Ib,Jb,kc],Vc+tc);K([Ib,Ib,Ib,kc],Vc+tc);K([Jb,Jb,Jb,Rb],Wc);K([Jb,Jb,Ib,Rb],Wc);K([Jb,Jb,Jb,Rb],Wc+tc);K([Jb,Jb,Ib,Rb],Wc+tc);K([Jb,Ib,Jb,hc],Xc);K([Jb,Ib,Ib,hc],Xc);K([Jb,Ib,Jb,hc],Xc+tc);K([Jb,Ib,Ib,hc],Xc+tc);K([Ib,Jb,Jb,oc],Yc);K([Ib,Jb,Ib,oc],Yc);K([Ib,Jb,Jb,oc],Yc+tc);K([Ib,Jb,Ib,oc],Yc+tc);K([Jb,Jb,Jb,gc],Zc);K([Jb,Jb,Ib,gc],Zc);K([Jb,Jb,Jb,gc],Zc+tc);K([Jb,Jb,Ib,gc],Zc+tc);K([Jb,Ib,Jb,jc],$c);K([Jb,Ib,Ib,jc],$c);K([Jb,Ib,Jb,jc],$c+tc);K([Jb,Ib,Ib,jc],$c+tc);K([Jb,Ib,Jb,oc],_c);K([Jb,Ib,Ib,oc],_c);K([Jb,Ib,Jb,oc],_c+tc);K([Jb,Ib,Ib,oc],_c+tc);K([Jb,Ib,Jb,Rb],ad);K([Jb,Ib,Ib,Rb],ad);K([Jb,Ib,Jb,Rb],ad+tc);K([Jb,Ib,Ib,Rb],ad+tc);K([Jb,Jb,Jb,$b],bd);K([Jb,Jb,Ib,$b],bd);K([Jb,Jb,Jb,$b],bd+tc);K([Jb,Jb,Ib,$b],bd+tc);K([Ib,Jb,Jb,ac],cd);K([Ib,Jb,Ib,ac],cd);K([Ib,Jb,Jb,ac],cd+tc);K([Ib,Jb,Ib,ac],cd+tc);K([Ib,Jb,Jb,Sb],dd);K([Ib,Jb,Ib,Sb],dd);K([Ib,Jb,Jb,Sb],dd+tc);K([Ib,Jb,Ib,Sb],dd+tc);K([Jb,Jb,Jb,cc],ed);K([Jb,Jb,Ib,cc],ed);K([Jb,Jb,Jb,cc],ed+tc);K([Jb,Jb,Ib,cc],ed+tc);K([Ib,Jb,Jb,Vb],fd);K([Ib,Jb,Ib,Vb],fd);K([Ib,Jb,Jb,Vb],fd+tc);K([Ib,Jb,Ib,Vb],fd+tc);K([Jb,Jb,Jb,Sb],gd);K([Jb,Jb,Ib,Sb],gd);K([Jb,Jb,Jb,Sb],gd+tc);K([Jb,Jb,Ib,Sb],gd+tc);K([Ib,Jb,Jb,Rb],hd);K([Ib,Jb,Ib,Rb],hd);K([Ib,Jb,Jb,Rb],hd+tc);K([Ib,Jb,Ib,Rb],hd+tc);K([Jb,Ib,Jb,Vb],jd);K([Jb,Ib,Ib,Vb],jd);K([Jb,Ib,Jb,Vb],jd+tc);K([Jb,Ib,Ib,Vb],jd+tc);K([Jb,Ib,Jb,mc],kd);K([Jb,Ib,Ib,mc],kd);K([Jb,Ib,Jb,mc],kd+tc);K([Jb,Ib,Ib,mc],kd+tc);K([Ib,Ib,Jb,Zb],ld);K([Ib,Ib,Ib,Zb],ld);K([Ib,Ib,Jb,Zb],ld+tc);K([Ib,Ib,Ib,Zb],ld+tc);K([Jb,Jb,Jb,oc],md);K([Jb,Jb,Ib,oc],md);K([Jb,Jb,Jb,oc],md+tc);K([Jb,Jb,Ib,oc],md+tc);K([Jb,Jb,Jb,kc],nd);K([Jb,Jb,Ib,kc],nd);K([Jb,Jb,Jb,kc],nd+tc);K([Jb,Jb,Ib,kc],nd+tc);K([Jb,Jb,Jb,nc],od);K([Jb,Jb,Ib,nc],od);K([Jb,Jb,Jb,nc],od+tc);K([Jb,Jb,Ib,nc],od+tc);K([Jb,Jb,Jb,ac],pd);K([Jb,Jb,Ib,ac],pd);K([Jb,Jb,Jb,ac],pd+tc);K([Jb,Jb,Ib,ac],pd+tc);K([Jb,Jb,Jb,jc],qd);K([Jb,Jb,Ib,jc],qd);K([Jb,Jb,Jb,jc],qd+tc);K([Jb,Jb,Ib,jc],qd+tc);K([Jb,Ib,Jb,cc],rd);K([Jb,Ib,Ib,cc],rd);K([Jb,Ib,Jb,cc],rd+tc);K([Jb,Ib,Ib,cc],rd+tc);K([Jb,Ib,Jb,dc],sd);K([Jb,Ib,Ib,dc],sd);K([Jb,Ib,Jb,dc],sd+tc);K([Jb,Ib,Ib,dc],sd+tc);K([Ib,Jb,Jb,hc],td);K([Ib,Jb,Ib,hc],td);K([Ib,Jb,Jb,hc],td+tc);K([Ib,Jb,Ib,hc],td+tc);K([Jb,Ib,Jb,ic],ud);K([Jb,Ib,Ib,ic],ud);K([Jb,Ib,Jb,ic],ud+tc);K([Jb,Ib,Ib,ic],ud+tc);K([Ib,Jb,Jb,Tb],vd);K([Ib,Jb,Ib,Tb],vd);K([Ib,Jb,Jb,Tb],vd+tc);K([Ib,Jb,Ib,Tb],vd+tc);K([Jb,Jb,Jb,hc],wd);K([Jb,Jb,Ib,hc],wd);K([Jb,Jb,Jb,hc],wd+tc);K([Jb,Jb,Ib,hc],wd+tc);K([Ib,Ib,Jb,$b],xd);K([Ib,Ib,Ib,$b],xd);K([Ib,Ib,Jb,$b],xd+tc);K([Ib,Ib,Ib,$b],xd+tc);K([Ib,Jb,Jb,mc],yd);K([Ib,Jb,Ib,mc],yd);K([Ib,Jb,Jb,mc],yd+tc);K([Ib,Jb,Ib,mc],yd+tc);K([Jb,Ib,Jb,$b],zd);K([Jb,Ib,Ib,$b],zd);K([Jb,Ib,Jb,$b],zd+tc);K([Jb,Ib,Ib,$b],zd+tc);K([Ib,Ib,Jb,nc],Ad);K([Ib,Ib,Ib,nc],Ad);K([Ib,Ib,Jb,nc],Ad+tc);K([Ib,Ib,Ib,nc],Ad+tc);K([Jb,Jb,Jb,Vb],Bd);K([Jb,Jb,Ib,Vb],Bd);K([Jb,Jb,Jb,Vb],Bd+tc);K([Jb,Jb,Ib,Vb],Bd+tc);K([Ib,Ib,Jb,ic],Cd);K([Ib,Ib,Ib,ic],Cd);K([Ib,Ib,Jb,ic],Cd+tc);K([Ib,Ib,Ib,ic],Cd+tc);K([Ib,Ib,Jb,dc],Dd);K([Ib,Ib,Ib,dc],Dd);K([Ib,Ib,Jb,dc],Dd+tc);K([Ib,Ib,Ib,dc],Dd+tc);K([Jb,Jb,Jb,mc],Ed);K([Jb,Jb,Ib,mc],Ed);K([Jb,Jb,Jb,mc],Ed+tc);K([Jb,Jb,Ib,mc],Ed+tc);K([Ib,Jb,Jb,jc],Fd);K([Ib,Jb,Ib,jc],Fd);K([Ib,Jb,Jb,jc],Fd+tc);K([Ib,Jb,Ib,jc],Fd+tc);K([Ib,Jb,Jb,kc],Gd);K([Ib,Jb,Ib,kc],Gd);K([Ib,Jb,Jb,kc],Gd+tc);K([Ib,Jb,Ib,kc],Gd+tc);K([Ib,Jb,Jb,ic],Hd);K([Ib,Jb,Ib,ic],Hd);K([Ib,Jb,Jb,ic],Hd+tc);K([Ib,Jb,Ib,ic],Hd+tc);K([Ib,Jb,Jb,cc],Id);K([Ib,Jb,Ib,cc],Id);K([Ib,Jb,Jb,cc],Id+tc);K([Ib,Jb,Ib,cc],Id+tc);K([Ib,Jb,Jb,dc],Jd);K([Ib,Jb,Ib,dc],Jd);K([Ib,Jb,Jb,dc],Jd+tc);K([Ib,Jb,Ib,dc],Jd+tc);K([Ib,Ib,Jb,Ob],Kd);K([Ib,Ib,Ib,Ob],Kd);K([Ib,Ib,Jb,Ob],Kd+tc);K([Ib,Ib,Ib,Ob],Kd+tc);K([Jb,Jb,Jb,Tb],Ld);K([Jb,Jb,Ib,Tb],Ld);K([Jb,Jb,Jb,Tb],Ld+tc);K([Jb,Jb,Ib,Tb],Ld+tc);K([Jb,Jb,Jb,ic],Md);K([Jb,Jb,Ib,ic],Md);K([Jb,Jb,Jb,ic],Md+tc);K([Jb,Jb,Ib,ic],Md+tc);K([Jb,Ib,Jb,Xb],Nd);K([Jb,Ib,Ib,Xb],Nd);K([Jb,Ib,Jb,Xb],Nd+tc);K([Jb,Ib,Ib,Xb],Nd+tc);K([Ib,Ib,Jb,cc],Od);K([Ib,Ib,Ib,cc],Od);K([Ib,Ib,Jb,cc],Od+tc);K([Ib,Ib,Ib,cc],Od+tc);K([Ib,Ib,Jb,jc],Pd);K([Ib,Ib,Ib,jc],Pd);K([Ib,Ib,Jb,jc],Pd+tc);K([Ib,Ib,Ib,jc],Pd+tc);M=w[L(Db)][L(Eb)][L(Fb)][L(Kb)];var N=M.indexOf(Qd);if(N!=-1){A=Number(M.substring(N+1));M=M.substring(0,N)}}catch(a){return}var O;function P(){if(!r){r=true;G();if(n.removeEventListener){n.removeEventListener(Rd,P,false)}if(O){clearInterval(O)}}}
if(n.addEventListener){n.addEventListener(Rd,function(){P()},false)}var O=setInterval(function(){if(/loaded|complete/.test(n.readyState)){P()}},50);o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:cb});o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:Sd,millis:(new Date).getTime(),type:Y});var Q=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U;if(/loaded|complete|interactive/.test(document.readyState)===false){var R=Td+Q+M+Ud;n.write(Vd+Wd+Xd+Yd+Zd+$d+_d+Yd+Zd+ae+be+ce+R+de+ee+fe+ge)}else{var S=document.createElement(jb);S.type=he;var T=document.getElementsByTagName(ie)[0];if(!T)T=document.body;window.__gwtStatsEvent&&window.__gwtStatsEvent({moduleName:V,sessionId:window.__gwtStatsSessionId,subSystem:W,evtGroup:Sd,millis:(new Date).getTime(),type:cb});window.__gwtStatsEvent&&window.__gwtStatsEvent({moduleName:V,sessionId:window.__gwtStatsSessionId,subSystem:W,evtGroup:bb,millis:(new Date).getTime(),type:je});S.src=Q+M+ke;T.appendChild(S)}}
$pdk.gwtBootloader=function(a){PDK()};$pdk.ns("$pdk.entrypoint");
$pdk.entrypoint.Entrypoint=$pdk.extend(function(){},{constructor:function(){this._complete=false;
this._registry=null;
this._env=null;
this._callBacks=[];
this._postOnLoad=function(){}
},configure:function(a,b){this._registry=a;
this._env=b
},_loaded:false,addCallback:function(a){this._callBacks.push(a);
if(this._loaded){a.apply()
}},initialize:function(){},onLoad:function(){var c=0,a=this._callBacks.length,d=this;
this._loaded=true;
for(;
c<a;
c++){this._callBacks[c].apply()
}var b=typeof(window._PDK_SUPRESS_INITIALIZE)==="boolean"?window._PDK_SUPRESS_INITIALIZE:false;
if((this._env===null||this._env.getAutoInitialize())&&!b){this.initialize()
}this._postOnLoad()
}});
$pdk.ns("$pdk.env.Detect");
$pdk.env.Detect._class=$pdk.extend(function(){},{constructor:function(){$pdk.env.Detect._class.superclass.constructor.call(this);
this._config_sets={};
this._has_jquery=window.jQuery!==null&&typeof(window.jQuery)==="function";
this._flash_version=null;
this._model_urls=this._parseRSS();
this._nonie_flash_test_str=null;
this._nonie_silverlight_test_str=null;
this._has_video=this._detectVideo();
this._has_silverlight=null;
this._default_runtimes=["flash","html5"];
this._preferred_formats=null;
this._default_formats=["mpeg4","f4m","m3u","webm","ogg","flv","mp3"];
this._media_factory=null;
this._playback_format=null;
this._component_runtime=null;
this._playback_formats=null;
this._supported_runtimes=null;
this._preferred_formats_unfiltered=null;
this._preload_stylesheets={};
this._cookies=this._parseCookies(document.cookie)
},getCookies:function(){return this._cookies
},removePreloadStylesheet:function(a){var b=document.getElementById(a+"Loading");
if(!$pdk.isEmpty(b)&&!$pdk.isEmpty(b.parentNode)){b.parentNode.removeChild(b)
}},config:function(b,a){this._nonie_flash_test_str=b;
this._nonie_silverlight_test_str=a
},getPlaybackFormat:function(){return this._playback_format
},setPlaybackFormat:function(a){this._playback_format=a
},getComponentRuntime:function(){return this._component_runtime
},setComponentRuntime:function(a){this._component_runtime=a
},getPlaybackRuntime:function(d){var a=this.getPlayerFormats(d);
var e=this.getSupportedRuntimes();
var b="flash";
if(a&&a.length&&e&&e.length){for(var c=0;
c<e.length;
c++){if(e[c].indexOf(":"+a[0])>=0){b=e[c].split(":")[0];
break
}}}if(b==="universal"){b="flash"
}return b
},_parseCookies:function(f){var e={},d,b=f.split(";"),c=b.length,a;
for(d=0;
d<c;
d++){a=b[d].split("=");
e[a[0].replace(/\s/g,"")]=a[1]
}return e
},_detectFlash:function(){var a=[],d=null,b=[0,0,0],f=null;
if($pdk.isBB10){return b
}try{d=this._nonie_flash_test_str===null?navigator.plugins["Shockwave Flash"].description:this._nonie_flash_test_str
}catch(j){d=null
}if(typeof(d)==="string"&&d.length>0){try{f=navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
}catch(h){f=null
}if(f!==null){d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
b[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);
b[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);
b[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
d=c.GetVariable("$version")
}catch(g){a=null
}if(typeof(d)==="string"){a=d.split(" ")[1].split(",");
b=[parseInt(a[0],10),parseInt(a[1],10),parseInt(a[2],10)]
}}return b
},_detectVideo:function(){var c='video/mp4; codecs="avc1.42E01E',d=document.createElement("video"),g=false,b={hasVideo:false,codecs:{ogg:false,h264:false,webm:false,m3u:false,mp3:false,aac:false}},a={ogg:['video/ogg; codecs="theora"'],h264:[c+'"',c+', mp4a.40.2"'],webm:['video/webm; codecs="vp8, vorbis"','video/x-webm; codecs="vp8, vorbis"'],m3u:["application/vnd.apple.mpegurl",'audio/x-mpegurl; codecs="mp4a.40.2"','vnd.apple.mpegURL; codecs="mp4a.40.2"','application/x-mpegURL; codecs="mp4a.40.2"'],mp3:["audio/mpeg;"],aac:['audio/mp4; codecs="mp4a.40.5"'],mpegdash:["application/dash+xml","video/vnd.mpeg.dash.mpd"]};
try{g=typeof(d.canPlayType)==="function";
if(g){b.hasVideo=true;
b.codecs={ogg:this._detectVidFormat(d,a.ogg),h264:this._detectVidFormat(d,a.h264),webm:this._detectVidFormat(d,a.webm),m3u:this._detectVidFormat(d,a.m3u),mp3:this._detectVidFormat(d,a.mp3),aac:this._detectVidFormat(d,a.aac),mpegdash:typeof(window.MediaSource)==="function"||typeof(window.WebKitMediaSource)==="function"||this._detectVidFormat(d,a.mpegdash)}
}}catch(f){b.hasVideo=false
}return b
},_detectVidFormat:function(d,a){var e=a.length,c=false;
for(var b=0;
b<e;
b++){c=!($pdk.isEmpty(d.canPlayType(a[b]))||d.canPlayType(a[b]).toLowerCase()==="no")||(a[b]=='vnd.apple.mpegURL; codecs="mp4a.40.2"'&&$pdk.isChrome&&$pdk.isAndroid);
if(c){break
}}return c
},_detectSilverlight:function(){var j=null,d,a,f,l=false,c,b,k=[4,0,0,0];
if(typeof(window.ActiveXObject)==="function"){try{j=new ActiveXObject("AgControl.AgControl");
l=j.IsVersionSupported(k.join("."))
}catch(g){l=false
}}else{try{f=navigator.plugins["Silverlight Plug-In"];
c=this._nonie_silverlight_test_str!==null?this._nonie_silverlight_test_str:String(f.description);
c=c==="1.0.30226.2"?"2.0.30226.2":c;
b=c.split(".");
for(d=0;
d<4;
d++){a=b[d];
a=typeof(a)==="string"?parseInt(a,10):0;
b[d]=a
}l=$pdk.tupleComp(k,b,function(m,e){var n=e>m?1:0;
return e<m?-1:n
})>=0
}catch(h){l=false
}}return l
},_parseRSS:function(){var h=this;
var m=document.getElementsByTagName("link"),k=m.length,g=false,c=false,a,b,l={releaseurl:null,releasemodel:null,categorymodel:null,rssurl:null},f;
for(f=0;
f<k;
f++){if(!g&&m[f].type=="application/rss+xml"&&m[f].rel=="alternate"&&m[f].href.length>0){a=m[f].href;
l.rssurl=a;
try{b=a.split("?")
}catch(j){b=[]
}if(b.length>0){l.releasemodelbase=b[0];
l.releasemodel=b[0];
var d=h._createCategoryModelUrl(a);
l.categorymodelbase=d;
l.categorymodel=d+"?form=json&fields=fullTitle,id,label,order,title";
g=true
}}else{if(!c&&(m[f].type=="application/smil+xml"||m[f].type=="application/smil"||m[f].className==="tpRelease")){a=m[f].href;
if(typeof(a)==="string"&&a.length>0&&a!==document.URL){l.releaseurl=a;
c=true
}}}}return l
},_createCategoryModelUrl:function(a){var f=this;
var d=a;
try{url_parts=a.split("?")
}catch(g){url_parts=[]
}if(url_parts.length>0){if(f._isLegacyCategoryUrl(a)){var h;
try{h=url_parts[0].split("/")
}catch(b){mainUrlparts=[]
}if(h.length>0){for(i=0;
i<h.length;
++i){if(h[i]===""){h.splice(i,1);
i--
}}var k=h[0];
var c=h[1];
h=h.slice(2);
if(h.length>0){if(h[0]=="f"){if(h.length>3){h.splice(3,0,"categories")
}else{h.push("categories")
}}else{h.push("categories")
}}var j=h.join("/");
d=[k,c].join("//")+"/"+j
}}else{d=url_parts[0]
}}return d
},_isLegacyCategoryUrl:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getCategoryList/)!==null&&a.match(/[?&]PID\=/)!==null
},_indexOf:function(a,c){if(typeof a.indexOf==="function"){return a.indexOf(c)
}for(var b=0;
b<a.length;
b++){if(a[b]===c){return b
}}return -1
},_filterSupportedMedia:function(g){var f,j=[],h,c=g.length,k=this._indexOf(g,"flash"),d=this._indexOf(g,"html5"),b=this._indexOf(g,"universal"),e,a=false;
if(k==-1){g.push("flash");
c++
}if(d==-1){g.push("html5");
c++
}if(b>=0){if((d>=0)&&(b>d)){g[b]="html5";
g[d]="universal"
}}for(h=0;
h<c;
h++){f=g[h].toLowerCase();
switch(f){case"flash":if(this.hasFlash()){j.push("flash:3gpp");
j.push("flash:3gpp2");
j.push("flash:aac");
j.push("flash:actionscript");
j.push("flash:f4m");
j.push("flash:flv");
j.push("flash:mp3");
j.push("flash:mpeg");
j.push("flash:mpeg4");
j.push("flash:qt")
}break;
case"universal":this.addHtml5Media(j);
if(this.hasFlash(true)&&this.hasCanvas()){j.push("universal:m3u");
j.push("universal:3gpp");
j.push("universal:3gpp2");
j.push("universal:f4m");
j.push("universal:flv");
j.push("universal:mpeg");
j.push("universal:qt");
j.push("universal:mpeg4");
j.push("universal:mp3");
j.push("universal:aac")
}break;
case"html5":this.addHtml5Media(j);
break;
case"silverlight":if(this.hasFlash()){j.push("silverlight:asx");
j.push("silverlight:ism");
j.push("silverlight:mpeg4");
j.push("silverlight:wm")
}break;
case"windowsmedia":break;
case"move":break;
default:break
}}return j
},addHtml5Media:function(b){var c=this.hasVideo();
var a;
if(c.hasVideo){codecs=c.codecs
}else{codecs={}
}if(codecs.m3u){b.push("html5:m3u")
}if(codecs.ogg){b.push("html5:ogg")
}if(codecs.h264){b.push("html5:mpeg4")
}if(codecs.webm){b.push("html5:webm")
}if(codecs.mp3){b.push("html5:mp3")
}if(codecs.aac){b.push("html5:aac")
}if(codecs.mpegdash){b.push("html5:mpeg-dash")
}b.push("html5:javascript")
},canPlayTypeAugmentation:function(){var a=0,c=$pdk.canPlayTypeAugmentation,b=this.getConfigSet("canplaytypeaugmentation");
c=typeof(c)==="boolean"?c:true;
if(c&&!$pdk.isEmpty(b)){b=b.toArray();
for(;
a<b.length;
a++){if(b[a].toLowerCase()==="false"){c=false;
break
}}}return c
},sortM3uArray:function(b){var a=[];
for(i=b.length-1;
i>=0;
i--){if(b[i]==="m3u"){a.push(b[i])
}else{a.unshift(b[i])
}}return a
},getPreferredFormats:function(){if(this._preferred_formats===null){try{this._preferred_formats=this._filterPreferredFormats(this.getConfigSet("preferredformats").toArray())
}catch(a){this._preferred_formats=[]
}if(this._preferred_formats.length<1){this._preferred_formats=this._filterPreferredFormats(this._default_formats)
}if($pdk.isAndroid&&this.canPlayTypeAugmentation()){tpDebug("resorting preferred formats for Android","bootloader","$pdk.env.Detect",tpConsts.DEBUG);
this._preferred_formats=this.sortM3uArray(this._preferred_formats)
}}return this._preferred_formats
},getPreferredFormatsUnfiltered:function(){if(this._preferred_formats_unfiltered===null){try{this._preferred_formats_unfiltered=this.getConfigSet("preferredformats").toArray()
}catch(a){this._preferred_formats_unfiltered=[]
}if(this._preferred_formats_unfiltered.length<1){this._preferred_formats_unfiltered=this._default_formats
}if($pdk.isAndroid&&this.canPlayTypeAugmentation()){this._preferred_formats_unfiltered=this.sortM3uArray(this._preferred_formats_unfiltered)
}}return this._preferred_formats_unfiltered
},_filterPreferredFormats:function(d){var e=d.length,f,a=[],h,b,g=false,c;
h=this.hasVideo();
b=h.codecs;
for(c=0;
c<e;
c++){f=d[c].toLowerCase();
g=false;
switch(f){case"mpeg":case"mpeg4":if(b.h264||this.hasFlash()){g=true
}break;
case"mp3":if(b.mp3||this.hasFlash()){g=true
}break;
case"mpeg-dash":if(b.mpegdash){g=true
}break;
case"m3u":if(b.m3u||this.hasFlash()){g=true
}break;
case"ogg":if(b.ogg){g=true
}break;
case"webm":if(b.webm){g=true
}break;
case"ism":case"asx":case"aac":case"wm":case"move":case"flv":case"f4m":if(this.hasFlash()){g=true
}break;
default:break
}if(g){a.push(d[c])
}}return a
},getPlayerFormats:function(a){if(this._playback_formats===null){this._playback_formats=[];
if(this.getComponentRuntime()!==null){this._playback_formats=this._filterPlayerFormats(this.getComponentRuntime())
}if(this._playback_formats.length<1){if(a===undefined){a="flash"
}this._playback_formats=this._filterPlayerFormats(a)
}}return this._playback_formats
},_filterPlayerFormats:function(g){var e=this.getPreferredFormats(),d=e.length,a=[],f,h,b,c;
h=this.hasVideo();
b=h.codecs;
g=g.toLowerCase();
for(c=0;
c<d;
c++){f=e[c].toLowerCase();
switch(f){case"mpeg":case"mpeg4":if(((g==="html5"||g==="universal")&&b.h264)||((g==="universal"||g==="flash"||g==="silverlight")&&this.hasFlash())){a.push(e[c])
}break;
case"mp3":if(b.mp3||this.hasFlash()){a.push(e[c])
}break;
case"mpeg-dash":if((g==="html5"||g==="universal")&&b.mpegdash){a.push(e[c])
}break;
case"m3u":if(((g==="html5"||g==="universal")&&b.m3u)||((g==="universal"&&this.hasFlash()))){a.push(e[c])
}break;
case"ogg":if((g==="html5"||g==="universal")&&b.ogg){a.push(e[c])
}break;
case"webm":if((g==="html5"||g==="universal")&&b.webm){a.push(e[c])
}break;
case"ism":if((g==="flash"||g==="silverlight")&&this.hasFlash()){a.push(e[c])
}break;
case"asx":case"wm":if((g==="flash"||g==="silverlight"||g==="windowsmedia")&&this.hasFlash()){a.push(e[c])
}break;
case"3gpp":case"3gpp3":case"aac":case"flv":case"f4m":if((g==="flash"||g==="universal")&&this.hasFlash()){a.push(e[c])
}break;
case"move":if((g==="flash"||g==="move")&&this.hasFlash()){a.push(e[c])
}break;
default:break
}}return a
},getModelUrls:function(){return this._model_urls
},getFlashVersion:function(){if(this._flash_version===null){this._flash_version=this._detectFlash()
}return this._flash_version
},hasVideo:function(){return this._has_video
},hasCanvas:function(){var a=document.createElement("canvas");
return !!(a.getContext&&a.getContext("2d"))
},hasFlash:function(e){if(e===undefined){e=this.getIsUniversal()
}var f=this.getFlashBlacklist();
var a=false;
if(e&&f&&f.length){var c=f.split(",");
for(var b=0;
b<c.length;
b++){var d=c[b].split("|");
if(d&&d.length==2){d[0]=d[0].substr(0,1).toUpperCase()+d[0].substr(1);
d[1]=d[1].substr(0,1).toUpperCase()+d[1].substr(1);
if(typeof $pdk["is"+d[0]]==="boolean"&&typeof $pdk["is"+d[1]]==="boolean"){a=$pdk["is"+d[0]]&&$pdk["is"+d[1]];
if(a){break
}}}}}return !a&&$pdk.tupleComp([9,0,115],this.getFlashVersion(),function(h,g){var j=g>h?1:0;
return g<h?-1:j
})>=0
},hasSilverlight:function(){if(this._has_silverlight===null){this._has_silverlight=this._detectSilverlight()
}return this._has_silverlight
},hasJquery:function(){return this._has_jquery
},getAutoInitialize:function(){var a=true;
try{a=this.getConfigSet("initialize").toArray()[0].toLowerCase()!=="false"
}catch(b){a=true
}return a
},getIsUniversal:function(){var a=true;
try{a=this.getConfigSet("preferredruntimes").toArray().indexOf("universal")!==-1
}catch(b){a=false
}return a
},getFlashBlacklist:function(){var a=true;
try{a=this.getConfigSet("flashblacklist").toArray()[0]
}catch(b){a="Mac|Safari"
}return a
},GWTReady:function(){return this._gwt_ready
},setGWTReady:function(a){this._gwt_ready=a
},addToConfigSet:function(a,b){var c=this._config_sets[a];
if($pdk.isEmpty(c)){c=new $pdk.util.ArraySet();
this._config_sets[a]=c
}c.add(b)
},getConfigSet:function(a){return this._config_sets[a]
},baseDir:function(){var a=$pdk.scriptRoot;
try{a=this.getConfigSet("baseurl").toArray()[0]
}catch(b){a=$pdk.scriptRoot
}return a
},cachePath:function(){return this.baseDir()+"/js"
},getMediaFactory:function(){if(this._media_factory===null){this._media_factory=new $pdk.env.media.Factory(this.getSupportedRuntimes(),this._filterSupportedMedia(["flash","html5","silverlight","windowsmedia","move"]),new $pdk.env.media.FactoryLoggerTpTraceMainImpl())
}return this._media_factory
},getSupportedRuntimes:function(){if(this._supported_runtimes===null){try{this._supported_runtimes=this._filterSupportedMedia(this.getConfigSet("preferredruntimes").toArray())
}catch(a){this._supported_runtimes=[]
}if(this._supported_runtimes.length<1){this._supported_runtimes=this._filterSupportedMedia(this._default_runtimes)
}}return this._supported_runtimes
},_detectPhase1:function(){var f=false;
var e=false;
var b=document.getElementsByTagName("script");
var d;
var a=b.length;
for(d=0;
d<a;
d++){var c=b[d].innerHTML;
if(!f&&(c.indexOf("tpRegisterID(")>=0)){f=true
}if(!e&&(c.indexOf("Player(")>=0||c.indexOf("ReleaseList(")>=0||c.indexOf("ReleaseModel(")>=0)){e=true
}if(f&&e){return true
}}return false
},isPhase1:function(){if(this._is_phase1===undefined){this._is_phase1=this._detectPhase1()
}return this._is_phase1
}});
$pdk.env.Detect._singleton=null;
$pdk.env.Detect.getInstance=function(){if($pdk.env.Detect._singleton===null){$pdk.env.Detect._singleton=new $pdk.env.Detect._class()
}return $pdk.env.Detect._singleton
};
$pdk.ns("$pdk.env.HttpHead");
$pdk.env.HttpHead.Processor=$pdk.extend(function(){},{constructor:function(a){this._env=a
},process:function(f){var e,a,b,g=this._collectTpMetaTags(f),d=g.length,c;
for(c=0;
c<d;
c++){e=g[c];
if(!$pdk.isEmpty(e.value)){a=e.value.replace(/\s/g,"").toLowerCase().split(",");
b=e.name.replace(/^tp:/,"").toLowerCase();
while(a.length>0){this._env.addToConfigSet(b,a.shift())
}}}},_collectTpMetaTags:function(g){var f,a=[],b,e,h=g.getElementsByTagName("meta"),d=h.length,c;
for(c=0;
c<d;
c++){f=h[c];
b=f.getAttribute("name");
if(typeof(b)==="string"&&b.match(/^tp:/)){e=f.getAttribute("content");
a.push({name:b,value:e})
}}return a
}});
$pdk.ns("$pdk.env.media");
$pdk.env.media.MediaBase=$pdk.extend(function(){},{_eligibleRuntimes:[],constructor:function(){this._satisfiedRuntimes={}
},satisfyRuntime:function(a){this._satisfiedRuntimes[a]=true
},isSatisfied:function(){var b,a=this._eligibleRuntimes.length,c=false;
for(b=0;
b<a&&!c;
b++){c=this._satisfiedRuntimes[this._eligibleRuntimes[b]];
c=typeof(c)==="boolean"?c:false
}return c
},getRuntimes:function(){var b=[],c,a=this._eligibleRuntimes.length;
for(c=0;
c<a;
c++){name=this._eligibleRuntimes[c];
found=this._satisfiedRuntimes[name];
if(typeof(found)==="boolean"?found:false){b.push(name)
}}return b
},getName:function(){return this._name
}});
$pdk.env.media.AacMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"aac",_eligibleRuntimes:["flash:aac","universal:aac","html5:aac"],constructor:function(){$pdk.env.media.AacMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.ActionScriptMedia=$pdk.extend($pdk.env.media.MediaBase,{_eligibleRuntimes:["flash:actionscript"],_name:"actionscript",constructor:function(){$pdk.env.media.ActionScriptMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.AsxMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"asx",_eligibleRuntimes:["silverlight:asx"],constructor:function(){$pdk.env.media.AsxMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.AviMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"avi",_eligibleRuntimes:["flash:avi","universal:avi"],constructor:function(){$pdk.env.media.AviMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.F4mMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"f4m",_eligibleRuntimes:["flash:f4m","universal:f4m"],constructor:function(){$pdk.env.media.F4mMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.Factory=$pdk.extend(function(){},{constructor:function(b,a,c){this._runtimes=b;
this._runtimes_any_supported=a;
this._logger=c
},getBestRuntime:function(a,c,d,f){var b=new $pdk.env.media.strategy.Context(d,this._logger,this,c,this._runtimes,this._runtimes_any_supported),e;
if(a==="Player"){e=new $pdk.env.media.strategy.CodecComponentStrategy()
}else{e=new $pdk.env.media.strategy.GeneralComponentStrategy()
}return e.getBestRuntime(b)
},createMedia:function(d,c){c=typeof(c)==="boolean"?c:false;
var e,b=c?this._runtimes_any_supported:this._runtimes,a=b.length,f=null;
switch(d){case"actionscript":f=new $pdk.env.media.ActionScriptMedia();
break;
case"flv":f=new $pdk.env.media.FlvMedia();
break;
case"javascript":f=new $pdk.env.media.JavaScriptMedia();
break;
case"mpeg4":f=new $pdk.env.media.Mpeg4Media();
break;
case"mpeg-dash":f=new $pdk.env.media.MpegDashMedia();
break;
case"mpeg":f=new $pdk.env.media.MpegMedia();
break;
case"ogg":f=new $pdk.env.media.OggMedia();
break;
case"webm":f=new $pdk.env.media.WebMMedia();
break;
case"m3u":f=new $pdk.env.media.M3uMedia();
break;
case"3gpp":f=new $pdk.env.media.ThreeGppMedia();
break;
case"3gpp2":f=new $pdk.env.media.ThreeGpp2Media();
break;
case"aac":f=new $pdk.env.media.AacMedia();
break;
case"asx":f=new $pdk.env.media.AsxMedia();
break;
case"avi":f=new $pdk.env.media.AviMedia();
break;
case"f4m":f=new $pdk.env.media.F4mMedia();
break;
case"m3u":f=new $pdk.env.media.M3uMedia();
break;
case"move":f=new $pdk.env.media.MoveMedia();
break;
case"mp3":f=new $pdk.env.media.Mp3Media();
break;
case"qt":f=new $pdk.env.media.QtMedia();
break;
case"ism":f=new $pdk.env.media.IsmMedia();
break;
case"wm":f=new $pdk.env.media.WmMedia();
break;
default:f=new $pdk.env.media.NoOpMedia();
break
}for(e=0;
e<a;
e++){f.satisfyRuntime(b[e])
}return f
}});
$pdk.env.media.FactoryLoggerConsoleImpl=$pdk.extend(function(){},{constructor:function(){},log:function(a,b){console.log(a)
}});
$pdk.env.media.FactoryLoggerTpTraceMainImpl=$pdk.extend(function(){},{constructor:function(){},log:function(a,b){tpDebug(a,"bootloader","$pdk.env.media.Factory",b)
}});
$pdk.env.media.FlvMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"flv",_eligibleRuntimes:["flash:flv","universal:flv"],constructor:function(){$pdk.env.media.FlvMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.IsmMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"ism",_eligibleRuntimes:["silverlight:ism"],constructor:function(){$pdk.env.media.IsmMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.JavaScriptMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"javascript",_eligibleRuntimes:["html5:javascript"],constructor:function(){$pdk.env.media.JavaScriptMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.M3uMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"m3u",_eligibleRuntimes:["universal:m3u","html5:m3u"],constructor:function(){$pdk.env.media.M3uMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.MoveMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"move",_eligibleRuntimes:["flash:move"],constructor:function(){$pdk.env.media.MoveMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.Mp3Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"mp3",_eligibleRuntimes:["flash:mp3","universal:mp3","html5:mp3"],constructor:function(){$pdk.env.media.Mp3Media.superclass.constructor.apply(this)
}});
$pdk.env.media.Mpeg4Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg4",_eligibleRuntimes:["flash:mpeg4","universal:mpeg4","html5:mpeg4","silverlight:mpeg4"],constructor:function(){$pdk.env.media.Mpeg4Media.superclass.constructor.apply(this)
}});
$pdk.env.media.MpegDashMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg-dash",_eligibleRuntimes:["html5:mpeg-dash"],constructor:function(){$pdk.env.media.MpegDashMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.MpegMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg",_eligibleRuntimes:["flash:mpeg","universal:mpeg"],constructor:function(){$pdk.env.media.Mpeg4Media.superclass.constructor.apply(this)
}});
$pdk.env.media.NoOpMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"noop"});
$pdk.env.media.OggMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"ogg",_eligibleRuntimes:["html5:ogg"],constructor:function(){$pdk.env.media.OggMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.QtMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"qt",_eligibleRuntimes:["flash:qt","universal:qt"],constructor:function(){$pdk.env.media.QtMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.ThreeGpp2Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"3gpp2",_eligibleRuntimes:["flash:3gpp2","universal:3gpp2"],constructor:function(){$pdk.env.media.ThreeGpp2Media.superclass.constructor.apply(this)
}});
$pdk.env.media.ThreeGppMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"3gpp",_eligibleRuntimes:["flash:3gpp","universal:3gpp"],constructor:function(){$pdk.env.media.ThreeGppMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.WebMMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"webm",_eligibleRuntimes:["html5:webm"],constructor:function(){$pdk.env.media.WebMMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.WmMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"wm",_eligibleRuntimes:["silverlight:wm"],constructor:function(){$pdk.env.media.WmMedia.superclass.constructor.apply(this)
}});
$pdk.ns("$pdk.env.media.strategy");
$pdk.env.media.strategy.AbstractStrategy=$pdk.extend(function(){},{_getPossibleFormats:function(f,e){var d,k=f.length,g,c,b=[],j,a=e.length,h;
for(g=0;
g<a;
g++){j=e[g].toLowerCase();
for(c=0;
c<k;
c++){d=f[c].toLowerCase();
if(j===d){b.push(d)
}}}return b
},_searchByFormatThenRuntime:function(o,p,k,a){var r=false,g,b,d,l,q=k.length,f,c=p.length,e,j,m,h;
for(g=0;
g<q&&!r;
g++){l=k[g];
b=o.createMedia(l,a);
j=b.getRuntimes();
m=j.length;
for(h=0;
h<c&&!r;
h++){f=p[h];
for(d=0;
d<m&&!r;
d++){e=j[d];
r=e===f
}}}return{runtime:r?f.replace(/(.*):.*/,"$1"):"none",medium:r?b.getName():"none"}
},_searchByRuntimeThenFormat:function(o,p,k,a){var r=false,g,b,d,l,q=k.length,f,c=p.length,e,j,m,h;
for(h=0;
h<c&&!r;
h++){f=p[h];
for(g=0;
g<q&&!r;
g++){l=k[g];
b=o.createMedia(l,a);
j=b.getRuntimes();
m=j.length;
for(d=0;
d<m&&!r;
d++){e=j[d];
r=e===f
}}}return{runtime:r?f.replace(/(.*):.*/,"$1"):"none",medium:r?b.getName():"none"}
}});
$pdk.env.media.strategy.CodecComponentStrategy=$pdk.extend($pdk.env.media.strategy.AbstractStrategy,{getBestRuntime:function(c){var f,g=c.getComponentSupportedFormats(),n=c.getLogger(),l=c.getMediaFactory(),d=[],h,e=c.getPreferredFormats(),k=c.getRuntimes();
runtimes_any_supported=c.getRuntimesAnySupported();
var a=[];
var j=$pdk.env.Detect.getInstance().getConfigSet("preferredruntimes");
var m=j?j.toArray()[0]:"flash";
if(m=="flash"&&!$pdk.env.Detect.getInstance().hasFlash()){m="html5"
}var b={medium:e[0],runtime:m};
n.log("searching for best runtime for preferred formats ("+e.join(", ")+") from list of supported formats ("+g.join(", ")+")",tpConsts.INFO);
d=this._getPossibleFormats(g,e);
h=d.length;
n.log("possible formats narrowed to: "+(h>0?d.join(", "):"[none]"),tpConsts.INFO);
f=this._searchByFormatThenRuntime(l,k,d,false);
if(f.medium==="none"){n.log("falling back to any supported runtime",tpConsts.INFO);
f=this._searchByFormatThenRuntime(l,runtimes_any_supported,d,true)
}if(f.runtime==="none"){n.log("no viable runtime found, falling back to HTML",tpConsts.INFO);
f=b
}else{n.log("picked best format/runtime : "+f.medium+"/"+f.runtime,tpConsts.INFO)
}return f
}});
$pdk.env.media.strategy.Context=$pdk.extend(function(){},{constructor:function(f,c,d,e,b,a){this._component_supported_formats=f;
this._logger=c;
this._media_factory=d;
this._preferred_formats=e;
this._runtimes=b;
this._runtimes_any_supported=a
},getComponentSupportedFormats:function(){return this._component_supported_formats
},getLogger:function(){return this._logger
},getMediaFactory:function(){return this._media_factory
},getPreferredFormats:function(){return this._preferred_formats
},getRuntimes:function(){return this._runtimes
},getRuntimesAnySupported:function(){return this._runtimes_any_supported
}});
$pdk.env.media.strategy.GeneralComponentStrategy=$pdk.extend($pdk.env.media.strategy.AbstractStrategy,{getBestRuntime:function(a){var d,e=a.getComponentSupportedFormats(),j=a.getLogger(),h=a.getMediaFactory(),b=[],f,c=a.getPreferredFormats(),g=a.getRuntimes();
runtimes_any_supported=a.getRuntimesAnySupported();
b=this._getPossibleFormats(e,c);
f=b.length;
d=this._searchByFormatThenRuntime(h,g,b,false);
if(d.medium==="none"){d=this._searchByRuntimeThenFormat(h,g,e,false)
}if(d.medium==="none"){d=this._searchByFormatThenRuntime(h,runtimes_any_supported,b,true)
}if(d.medium==="none"){d=this._searchByFormatThenRuntime(h,runtimes_any_supported,e,true)
}if(d.runtime==="none"){j.log("no viable runtime found",tpConsts.INFO)
}else{j.log("picked best format/runtime : "+d.medium+"/"+d.runtime,tpConsts.INFO)
}if(d.runtime=="universal"){d.runtime="html5"
}return d
}});
$pdk.ns("$pdk.util");
$pdk.util.ArraySet=$pdk.extend(function(){},{constructor:function(){this._members=[]
},add:function(a){var b=!this.contains(a);
if(b){this._members.push(a)
}return b
},remove:function(b){var c=this._find(b),a=false;
if(c>-1){a=delete this._members[c]
}return a
},contains:function(a){return this._find(a)>-1
},toArray:function(){return this._members
},_find:function(c){var b=0,a=this._members.length,d=-1;
for(;
b<a&&d<0;
b++){d=c===this._members[b]?b:-1
}return d
}});
$pdk.util.Strings=$pdk.apply(function(){},{encodeXmlAttribute:function(a){return typeof(a)!=="string"?null:a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos").replace(/"/g,"&quot;")
}});
$pdk.Entrypoint=$pdk.apply({},{_class:$pdk.extend($pdk.entrypoint.Entrypoint,{constructor:function(){$pdk.Entrypoint._class.superclass.constructor.call(this);
this._loadingStyleInjected=false
},configure:function(a,b){$pdk.Entrypoint._class.superclass.configure.call(this,a,b);
this._insertDefaultStylesheet()
},_insertDefaultStylesheet:function(){var a=document.createElement("link");
a.type="text/css";
a.rel="stylesheet";
a.href=this._env.baseDir()+"/style/default.css";
a.media="screen";
document.getElementsByTagName("head")[0].insertBefore(a,document.getElementsByTagName("head")[0].firstChild)
},injectLoadingStyle:function(c){var b,a;
if(!this._loadingStyleInjected){for(class_name in $pdk.shell.Factory.CLASS_TABLE){b=[".",class_name,class_name==="tpPlayer"?" ":" > * ","{ display: none !important; }"].join("");
if(c){a=document.createElement("style");
a.setAttribute("type","text/css");
a.setAttribute("id",class_name+"Loading");
if(a.styleSheet){a.styleSheet.cssText=b
}else{a.innerHTML=b
}document.getElementsByTagName("head")[0].appendChild(a)
}else{document.write(['<style id="',class_name,'Loading" ',">",b,"</style>"].join(""))
}}this._loadingStyleInjected=true
}},_injectPhase1JS:function(){var e=this;
if(this._loaded){var c=this._env.baseDir();
var b=document.getElementsByTagName("head")[0];
if(typeof(window.tpPhase1Debug)!=="string"){com.theplatform.pdk.ExternalScriptLoader.loadScript("tpPDK.js",function(){})
}else{var d=document.createElement("script");
d.type="text/javascript";
d.src=tpPhase1Debug.indexOf("http://")===0?tpPhase1Debug:this._env.baseDir()+tpPhase1Debug;
b.appendChild(d)
}}else{var a=this._postOnLoad;
this._postOnLoad=function(){a();
e._injectPhase1JS()
}
}},_connectShellsToGwt:function(b){var d=this;
if(this._loaded){this._registry.satisfyShellDeps();
this._registry.connectShellsToGwt();
this._env.setGWTReady(true);
this._complete=true;
tpDoInitGwtCommManager();
var e=this._registry.getShells().toArray();
for(i=0;
i<e.length;
i++){if(e[i].getRuntime()==="flash"){tpRegisterID(e[i].getSwfObjectId())
}}var c=tpGetRegisteredIDs();
tpController.callFunction("htmlPageLoaded",c?[c]:[])
}else{var a=this._postOnLoad;
this._postOnLoad=function(){a();
d._connectShellsToGwt(b)
}
}},initialize:function(){this.injectLoadingStyle(true);
$pdk.Entrypoint._class.superclass.initialize.call(this);
var c=this;
$pdk.shell.Factory.generate($pdk.shell.Factory.getNamesFromDomElements($pdk.dom.Helper.findByClass(/^tp/)),this._registry,this._env);
var a=$pdk.env.Detect.getInstance().getConfigSet("preferredruntimes");
var b=(!$pdk.env.Detect.getInstance().hasFlash()||a&&a.contains("html5"))?true:false;
if(!b){var d=c._registry.getShells().toArray();
for(i=0;
i<d.length;
i++){if(d[i].getRuntime()==="html5"||d[i].getRuntime()==="HTML5"){b=true;
break
}}}if(b){window.tpPhase1PDKLoaded=function(){c._connectShellsToGwt(b)
};
this._injectPhase1JS()
}else{this._connectShellsToGwt(b)
}}}),_singleton:null,getInstance:function(){if($pdk.Entrypoint._singleton===null){$pdk.Entrypoint._singleton=new $pdk.Entrypoint._class()
}return $pdk.Entrypoint._singleton
},onLoad:function(){$pdk.Entrypoint.getInstance().onLoad()
}});
$pdk.PdkVersion=$pdk.extend(function(){},{constructor:function(a,d,c,e,b){this.major=a;
this.minor=d;
this.revision=c;
this.build=e;
this.date=b
},toString:function(){return this.major+"."+this.minor+"."+this.revision+"."+this.build+" ("+this.date+")"
},equals:function(a){return this.major===a.major&&this.minor===a.minor&&this.revision===a.revision&&this.build===a.build
}});
$pdk.ns("$pdk.dom");
$pdk.dom.Helper=$pdk.apply({},{findByClass:function(f,e){var d,c,h,a,g=[],b;
if($pdk.isEmpty(f)){f=null
}if($pdk.isEmpty(e)){e=document
}h=e.getElementsByTagName("*");
a=h.length;
for(d=0;
d<a;
d++){c=h[d];
if(c.nodeType===1){if(f===null){g.push(c)
}else{b=c.className;
if(typeof(b)==="string"&&b.match(f)!==null){g.push(c)
}}}}return g
}});
$pdk.ns("$pdk.queue");
$pdk.ns("$pdk.queue");
$pdk.queue.Controller=$pdk.extend(function(){},{constructor:function(a){var b=this;
this._env=a;
this._events={};
this._functions={};
this._objects={};
this._isLoading=true;
this._canMessage=false;
this._messageQueue=[];
this._priorityQueue=[];
this._sendQueue=[];
this._isSending=false;
this._isShutDown=false;
this._runtimes=null;
this._blankString="__blank_string__";
this._defaultScope={globalDataType:this._getDataTypeName("ScopeInfo"),controlId:"javascript",isGlobal:true,isAny:false,isEmpty:false,scopeIds:["javascript","default"]}
},ready:function(){this.isHTML5Loading=false;
this._checkMessageQueue();
this._checkPriorityQueue()
},sendMessage:function(a,d,b){if(d.name==="controllerComplete"){this.onControllerComplete()
}if(d&&d.payload&&d.payload.name==="addPlayerCard"&&typeof(a)==="string"&&a.toLowerCase().match("swf")!==null){tpDebug("------filtering addPlayerCard from category list","javascript","Controller",tpConsts.DEBUG);
return
}var c={message:d,destination:a};
if(this._isLoading&&!b){this._messageQueue.push(c)
}else{if(!this._canMessage){this._priorityQueue.push(c)
}else{this._doSendMessage(c)
}}},_isSafariWin:(navigator.userAgent.indexOf("Windows")>-1&&navigator.userAgent.indexOf("AppleWebKit")>-1),onControllerComplete:function(){},_doSendMessage:function(a){var b=tpThisMovie(a.destination);
if(a.message.name==="callFunction"&&a.message.payload.name==="showFullScreen"&&a.message.payload.args[0]===true&&b.tagName&&(b.tagName.toLowerCase()==="object"||b.tagName.toLowerCase()==="embed")){tpDebug("Switching to full screen from Javascript is not supported by the Flash run-time. Flash only allows you to go to full screen mode via a click in the player itself.","tpController","Controller","error");
return
}if(this._isShutDown){return
}if($pdk.isWebKit&&$pdk.isWindows){setTimeout(function(){b.executeMessage(a.message)
},1)
}else{b.executeMessage(a.message)
}},_checkMessageQueue:function(){var a=this._messageQueue.length;
while(this._messageQueue.length>0){this._doSendMessage(this._messageQueue.shift())
}},_checkPriorityQueue:function(){var a;
while(this._priorityQueue.length>0){a=this._priorityQueue.shift();
if(a.destination==="unknown"){a.destination=tpBridgeID
}this._doSendMessage(a)
}},_wrapMessage:function(a,d){var b={globalDataType:this._getDataTypeName("CommInfo"),id:"javascript"},c={globalDataType:this._getDataTypeName("MessageInfo"),name:a,payload:d,comm:b};
return c
},_getDataTypeName:function(a){var b=null;
switch(a){case"AdPattern":b="com.theplatform.pdk.data::AdPattern";
break;
case"Banner":b="com.theplatform.pdk.data::Banner";
break;
case"BaseClip":b="com.theplatform.pdk.data::BaseClip";
break;
case"CallInfo":b="com.theplatform.pdk.communication::CallInfo";
break;
case"CategoryInfo":b="com.theplatform.pdk.data::CategoryInfo";
break;
case"Clip":b="com.theplatform.pdk.data::Clip";
break;
case"CommInfo":b="com.theplatform.pdk.communication::CommInfo";
break;
case"CustomData":b="com.theplatform.pdk.data::CustomData";
break;
case"CustomValue":b="com.theplatform.pdk.data::CustomValue";
break;
case"DispatchInfo":b="com.theplatform.pdk.communication::DispatchInfo";
break;
case"FunctionInfo":b="com.theplatform.pdk.communication::FunctionInfo";
break;
case"HandlerInfo":b="com.theplatform.pdk.communication::HandlerInfo";
break;
case"HyperLink":b="com.theplatform.pdk.data::HyperLink";
break;
case"MediaClick":b="com.theplatform.pdk.data::MediaClick";
break;
case"MediaFile":b="com.theplatform.pdk.data::MediaFile";
break;
case"MessageInfo":b="com.theplatform.pdk.communication::MessageInfo";
break;
case"MetricInfo":b="com.theplatform.pdk.data::MetricInfo";
break;
case"Overlay":b="com.theplatform.pdk.data::Overlay";
break;
case"PdkEvent":b="com.theplatform.pdk.events::PdkEvent";
break;
case"ProviderInfo":b="com.theplatform.pdk.data::ProviderInfo";
break;
case"Range":b="com.theplatform.pdk.data::Range";
break;
case"Rating":b="com.theplatform.pdk.data::Rating";
break;
case"Release":b="com.theplatform.pdk.data::Release";
break;
case"ReleaseInfo":b="com.theplatform.pdk.data::ReleaseInfo";
break;
case"ScopeInfo":b="com.theplatform.pdk.communication::ScopeInfo";
break;
case"Sort":b="com.theplatform.pdk.data::Sort";
break;
case"Subtitles":b="com.theplatform.pdk.data::Subtitles";
break;
case"TrackingUrl":b="com.theplatform.pdk.data::TrackingUrl";
break;
case"BandwidthPreferences":b="com.theplatform.pdk.data::BandwidthPreferences";
break;
case"Annotation":b="com.theplatform.pdk.data::Annotation";
break;
default:b=null;
break
}return b
},_createScope:function(a){if(a&&a.globalDataType){return a
}var b=this._defaultScope;
if(!$pdk.isEmpty(a)){if(a.length===0){a.push("javascript")
}b={globalDataType:this._getDataTypeName("ScopeInfo"),controlId:"javascript",isGlobal:true,isAny:false,isEmpty:false,scopeIds:a}
}return b
},_checkForExternalPlayers:function(){var f=tpGetPlayerFormats(),e,d,a,c,b;
if(f){f=f.split("|");
e=f.length;
a=this._isWMLoaded();
for(b=0;
b<e;
b++){d=f[b].toLowerCase();
switch(d){case"mpeg":case"mpeg4":if(!a&&this._checkRuntimePreferred(["silverlight","flash"])=="silverlight"){tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}break;
case"ism":if(!a){tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}break;
case"asx":case"wm":if(!a){c=this._checkRuntimePreferred(["silverlight","windowsmedia"]);
if(c==="windowsmedia"){tpLoadScript(this._env.baseDir()+"/js/tpExternal_WMP.js");
a=true
}else{tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}}break;
case"move":break;
default:break
}}}},_isWMLoaded:function(){var b,a;
if(typeof(tpExternalJS)!=="undefined"){for(b=0;
b<tpExternalJS.length;
b++){a=tpExternalJS[b];
if(a.indexOf("/tpExternal_SMF.js")>=0||a.indexOf("/tpExternal_WMP.js")){return true
}}}return false
},_checkRuntimePreferred:function(d){if(this._runtimes===null){this._runtimes=this._env.getSupportedRuntimes()
}var a=d.length,c=this._runtimes.length,f,g,e,b;
for(e=0;
e<c;
e++){f=this._runtimes[e];
for(b=0;
b<a;
b++){g=d[b];
if(f.indexOf(g)===0){return g
}}}return null
},getProperty:function(a){return this.component[a.toLowerCase()]
},registerFunction:function(g,h,j,c){var d=this._createScope(j);
var b=c===undefined?false:c;
var e,l,a,k,f=false;
if($pdk.isEmpty(this._functions[g])){this._functions[g]={};
b=true
}for(e=0;
e<d.scopeIds.length&&!f;
e++){l=d.scopeIds[e];
if(l==="*"){f=true
}else{this._functions[g][l]=h;
b=true
}}if(!f&&b){a={globalDataType:this._getDataTypeName("FunctionInfo"),name:g,scope:d};
k=this._wrapMessage("registerFunction",a);
this.sendMessage(tpBridgeID,k,true)
}},unregisterFunction:function(g,h){var c=this._createScope(scopes),d,k,f,b,a,e=false,j;
if(!$pdk.isEmpty(this._functions[g])){a=this._functions[g];
for(d=0;
d<c.scopeIds.length;
d++){k=c.scopeIds[d];
if(k=="*"){delete this._functions[g];
break
}if(!$pdk.isEmpty(a[k])){delete a[k]
}}e=false;
if(!$pdk.isEmpty(a)){for(f in a){e=true;
break
}if(!e){delete this._functions[g]
}}}if(!$pdk.isEmpty(e)){b={globalDataType:this._getDataTypeName("FunctionInfo"),name:g,scope:c};
j=this._wrapMessage("unregisterFunction",b);
this.sendMessage(tpBridgeID,j,true)
}},addEventListener:function(e,f,g){var d=this._createScope(g),h={globalDataType:this._getDataTypeName("HandlerInfo"),name:e,handler:f,scope:d},b=false,j,a,c,k;
if($pdk.isEmpty(this._events[e])){this._events[e]=[];
b=true
}j=this._events[e];
a=false;
for(c=0;
c<j.length;
c++){if(j[c].handler==f){j[c]=h;
a=true;
break
}}if(!a){j.push(h)
}if(b){k=this._wrapMessage("addEventListener",h);
this.sendMessage(tpBridgeID,k,true)
}},removeEventListener:function(e,f,g){if($pdk.isEmpty(this._events[e])){return
}var b=this._createScope(g),j={globalDataType:this._getDataTypeName("HandlerInfo"),name:e,handler:f,scope:b},a=this._events[e],c,d,k;
for(c=0;
c<a.length;
c++){d=a[c];
if(d.handler==j.handler){a=a.splice(c,1);
break
}}if(a.length===0){delete this._events[e];
k=this._wrapMessage("removeEventListener",j);
this.sendMessage(tpBridgeID,k,true)
}},dispatchEvent:function(b,h,e,g){var d=this._createScope(e),a={globalDataType:this._getDataTypeName("PdkEvent"),type:b,data:h,originator:{controlId:g,isAny:false,isGlobal:true,isEmpty:false,globalDataType:"com.theplatform.pdk.communication::ScopeInfo",scopeIds:[]}},c={globalDataType:this._getDataTypeName("DispatchInfo"),evt:a,scope:d};
this._doDispatchEvent(c);
var f=this._wrapMessage("dispatchEvent",c);
this.sendMessage(tpBridgeID,f,true)
},callFunction:function(g,b,e){var d=this._createScope(e),c={globalDataType:this._getDataTypeName("CallInfo"),name:g,args:b,scope:d},f;
var a=this._doCallFunction(c);
f=this._wrapMessage("callFunction",c);
this.sendMessage(tpBridgeID,f,true);
return a
},_doDispatchEvent:function(dispatch){if($pdk.isEmpty(this._events[dispatch.evt.type])){return
}var handlers=this._events[dispatch.evt.type].slice(0),i,j,s,k,fired,handler;
if(dispatch.evt&&dispatch.evt.data){this._parseCustomData(dispatch.evt.data)
}for(i=0;
i<handlers.length;
i++){handler=handlers[i];
if(dispatch.scope.isAny){if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}continue
}for(j=0;
j<handler.scope.scopeIds.length;
j++){s=handler.scope.scopeIds[j];
fired=false;
if(s=="*"){if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}break
}for(k=0;
k<dispatch.scope.scopeIds.length;
k++){if(s==dispatch.scope.scopeIds[k]){fired=true;
if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}break
}}if(fired){break
}}}},_parseCustomData:function(a){for(var e in a){var c=a[e];
if(c&&(c.globalDataType||$pdk.isArray(c))){if(c.globalDataType=="com.theplatform.pdk.data::CustomData"){for(var d in c){var b=d;
if(!b){continue
}if(b.indexOf("__PERIOD__")!=-1){b=b.replace("__PERIOD__",".")
}if(b.indexOf("__DASH__")!=-1){b=b.replace("__DASH__","-")
}if(b.indexOf("__COLON__")!=-1){b=b.replace("__COLON__",":")
}if(b.indexOf("__SPACE__")!=-1){b=b.replace("__SPACE__"," ")
}if(b.indexOf("__LEFT_BRACKET__")!=-1){b=b.replace("__LEFT_BRACKET__","[")
}if(b.indexOf("__RIGHT_BRACKET__")!=-1){b=b.replace("__RIGHT_BRACKET__","]")
}if(b!=d){c[b]=c[d];
delete c[d]
}}}else{this._parseCustomData(c)
}}}},_doCallFunction:function(k){if($pdk.isEmpty(this._functions[k.name])){return
}var a={},c,l,d;
var e;
for(c=0;
c<k.scope.scopeIds.length;
c++){if(k.scope.scopeIds[c]==="*"){if(this._functions[k.name]){for(var h in this._functions[k.name]){if(this._functions[k.name].hasOwnProperty(h)&&!$pdk.isEmpty(this._functions[k.name][h])){a[h]=this._functions[k.name][h]
}}}}else{l=k.scope.scopeIds[c];
if(!$pdk.isEmpty(this._functions[k.name][l])){a[l]=this._functions[k.name][l]
}}}var g=[];
for(d in a){var b=a[d];
var j=true;
for(c=0;
c<g.length;
c++){if(g[c]===b){j=false
}}if(j){g.push(b);
e=b.apply(this._objects[k.name],k.args)
}}return e
},receiveMessage:function(a,b){if(a=="javascript"){switch(b.name){case"commReady":tpBridgeID=tpCommID;
this._canMessage=true;
this._checkPriorityQueue();
break;
case"bridgeReady":tpBridgeID=b.comm.id;
this._canMessage=true;
this._checkPriorityQueue();
break;
case"dispatchEvent":this.receiveEvent(b.payload);
break;
case"callFunction":this._doCallFunction(b.payload);
break;
default:break
}}else{this.sendMessage(a,b,true)
}},receiveEvent:function(a){if(a.evt.type=="OnPlayerLoaded"){this._isLoading=false;
this._checkMessageQueue();
this._checkForExternalPlayers()
}this._doDispatchEvent(a)
},modRelease:function(a){var b;
if(!$pdk.isEmpty(a)){a.globalDataType=this._getDataTypeName("Release");
if(a.categories){a.categories=this.modCategories(a.categories)
}if(a.thumbnails){for(b=0;
b<a.thumbnails.length;
b++){a.thumbnails[b].globalDataType=this._getDataTypeName("MediaFile");
if(a.thumbnails[b].customValues){a.thumbnails[b].customValues=this.modCustomValues(a.thumbnails[b].customValues)
}}}if(a.customValues){a.customValues=this.modCustomValues(a.customValues)
}if(a.metrics){for(b=0;
b<a.metrics.length;
b++){a.metrics[b].globalDataType=this._getDataTypeName("MetricInfo")
}}if(a.provider){a.provider.globalDataType=this._getDataTypeName("ProviderInfo");
if(a.provider.customValues){a.provider.customValues=this.modCustomValues(a.provider.customValues)
}}if(a.ratings){for(b=0;
b<a.ratings.length;
b++){a.ratings[b].globalDataType=this._getDataTypeName("Rating")
}}if(a.URL){a.url=a.URL
}a.mediaPID=a.mediaPid?a.mediaPid:"";
delete a.mediaPid
}return a
},modCustomValues:function(a){var b;
for(b=0;
b<a.length;
b++){a[b].globalDataType=this._getDataTypeName("CustomValue")
}return a
},modCategories:function(a){var b;
for(b=0;
b<a.length;
b++){a[b].globalDataType=this._getDataTypeName("CategoryInfo")
}return a
},modClip:function(a){var b;
if(!$pdk.isEmpty(a)){a.globalDataType=this._getDataTypeName("Clip");
b=a.baseClip;
if($pdk.isEmpty(b)){b={}
}if(!$pdk.isEmpty(a.banners)){b.banners=a.banners
}if(!$pdk.isEmpty(a.overlays)){b.overlays=a.overlays
}a.baseClip=this.modBaseClip(b);
if(!$pdk.isEmpty(a.chapter)){a.chapter.globalDataType=this._getDataTypeName("Chapter")
}}return a
},modBaseClip:function(b){var a;
if($pdk.isEmpty(b)){b={}
}b.globalDataType=this._getDataTypeName("BaseClip");
if(!$pdk.isEmpty(b.moreInfo)){b.moreInfo.globalDataType=this._getDataTypeName("HyperLink");
if(!$pdk.isEmpty(b.moreInfo.clickTrackingUrls)){b.moreInfo.clickTrackingUrls=this.modTracking(b.moreInfo.clickTrackingUrls)
}}if(!$pdk.isEmpty(b.banners)){for(a=0;
a<b.banners.length;
a++){b.banners[a].globalDataType=this._getDataTypeName("Banner");
if(!$pdk.isEmpty(b.banners[a].clickTrackingUrls)){b.banners[a].clickTrackingUrls=this.modTracking(b.banners[a].clickTrackingUrls)
}}}if(!$pdk.isEmpty(b.overlays)){for(a=0;
a<b.overlays.length;
a++){b.overlays[a].globalDataType=this._getDataTypeName("Overlay");
if(!$pdk.isEmpty(b.overlays[a].clickTrackingUrls)){b.overlays[a].clickTrackingUrls=this.modTracking(b.overlays[a].clickTrackingUrls)
}}}if(!$pdk.isEmpty(b.availableSubtitles)){for(a=0;
a<b.availableSubtitles;
a++){b.availableSubtitles[a].globalDataType=this._getDataTypeName("Subtitles")
}}if(!$pdk.isEmpty(b.categories)){b.categories=this.modCategories(b.categories)
}if(!$pdk.isEmpty(b.adPattern)){b.adPattern.globalDataType=this._getDataTypeName("AdPattern")
}if(!$pdk.isEmpty(b.trackingURLs)){b.trackingURLs=this.modTracking(b.trackingURLs)
}if(!$pdk.isEmpty(b.contentCustomData)){b.contentCustomData.globalDataType=this._getDataTypeName("CustomData")
}if(!$pdk.isEmpty(b.ownerCustomData)){b.ownerCustomData.globalDataType=this._getDataTypeName("CustomData")
}if(!$pdk.isEmpty(b.outletCustomData)){b.outletCustomData.globalDataType=this._getDataTypeName("CustomData")
}return b
},modTracking:function(a){var b;
for(b=0;
b<a.length;
b++){a.globalDataType=this._getDataTypeName("TrackingUrl")
}return a
},shutDown:function(){this.callFunction("shutDown",[],["*"]);
this._isShutDown=true
},_regFunc:function(a,e,g,d){var b,h,f=$pdk.isEmpty(e)?0:e.length,c;
for(b=0;
b<f;
b++){h=e[b];
c=g[b];
if(!$pdk.isEmpty(g[b])){switch(h){case"com.theplatform.pdk.data.Release":c=tpController.modRelease(c);
break;
case"com.theplatform.pdk.data.Clip":c=tpController.modClip(c);
break;
case"com.theplatform.pdk.data.Range":c.globalDataType=this._getDataTypeName("Range");
break;
case"com.theplatform.pdk.data.Sort":c.globalDataType=this._getDataTypeName("Sort");
break;
case"com.theplatform.pdk.data.Annotation":c.globalDataType=this._getDataTypeName("Annotation");
break;
case"com.theplatform.pdk.data.BandwidthPreferences":c.globalDataType=this._getDataTypeName("BandwidthPreferences");
break;
default:break
}}}this.callFunction(a,g,d)
}});
$pdk.ns("$pdk.queue");
$pdk.queue.IFrameListener=$pdk.extend(function(){},{constructor:function(){var d=this,a=window.location.hash.substring(1).split("&"),e;
this._callbacks={};
this._origin=null;
this._iframeMessageHandler=function(f){d._acceptIFrameMessage(f)
};
for(var b=0;
b<a.length;
b++){e=a[b].split("=");
if(e[0].toLowerCase()=="playerurl"&&e.length==2){$pdk.parentUrl=unescape(e[1])
}}if(window.addEventListener){addEventListener("message",this._iframeMessageHandler,false)
}else{attachEvent("onmessage",this._iframeMessageHandler)
}var c=this;
$pdk.controller.addEventListener("OnPlayerLoaded",function(f){c._queuedPlayerLoaded=f
})
},_acceptIFrameMessage:function(c){var b=this,d,e;
if(this._origin&&(c.origin!==this._origin)){return
}try{d=JSON.parse(c.data)
}catch(a){d=null
}if(d!==null&&typeof(d)==="object"){switch(d.type){case"initialization":if(this._origin===null){this._origin=c.origin
}else{break
}if(d.name.toLowerCase()==="playerurl"){$pdk.parentUrl=d.parameters[0]
}break;
case"method":if(this._origin){$pdk.controller[d.name].apply($pdk.controller,d.parameters)
}break;
case"addEventListener":if(this._origin&&d.parameters&&d.parameters.length==2){e=function(f){b._dispatchEventToParentIFrame(f,d.parameters[1])
};
this._callbacks[d.parameters[1]]=e;
if(d.name==="OnPlayerLoaded"&&this._queuedPlayerLoaded){e(this._queuedPlayerLoaded)
}$pdk.controller.addEventListener(d.name,e,d.parameters[0])
}break;
case"removeEventListener":if(this._origin&&d.parameters&&d.parameters.length==2){e=this._callbacks[d.parameters[1]];
if(typeof(e)==="function"){$pdk.controller.removeEventListener(d.name,e,d.parameters[0])
}}break;
default:break
}}},_dispatchEventToParentIFrame:function(a,c){var b=JSON.stringify({type:"event",name:a.type,parameters:[a,c]});
window.parent.postMessage(b,this._origin)
},destroy:function(){this._callbacks=[];
if(window.removeEventListener){removeEventListener("message",this._iframeMessageHandler,false)
}else{detachEvent("onmessage",this._iframeMessageHandler)
}}});
$pdk.ns("$pdk.queue.deferred");
$pdk.queue.deferred.DeferredController=$pdk.extend(function(){},{constructor:function(){this.functions={};
this.objects={}
},buildListenerChain:function(){if(!this.listenerChain){this.listenerChain={}
}},addEventListener:function(a,b){if(!b instanceof Function){throw {message:"Listener isn't a function"}
}this.buildListenerChain();
if(!this.listenerChain[a]){this.listenerChain[a]=[b]
}else{this.listenerChain[a].push(b)
}},hasEventListener:function(a){if(this.listenerChain){return(typeof this.listenerChain[a]!="undefined")
}else{return false
}},removeEventListener:function(b,c){if(!this.hasEventListener(b)){return false
}for(var a=0;
a<this.listenerChain[b].length;
a++){if(this.listenerChain[b][a]==c){this.listenerChain[b].splice(a,1)
}}},dispatchEvent:function(c,a){this.buildListenerChain();
if(!this.hasEventListener(c)){return false
}for(var b=0;
b<this.listenerChain[c].length;
b++){var d=this.listenerChain[c][b];
if(d.call){d.call(this,{type:c,data:a})
}}},callFunction:function(b,e,c,d){var a=this.functions[b];
if(a){return this.functions[b].apply(this.objects[b],e)
}else{return null
}},registerFunction:function(b,a,c){this.functions[b]=c;
this.objects[b]=a
}});
$pdk.queue.deferred.DeferredShell=$pdk.extend(function(){},{_STATE:{STARTING:"STARTING",LOADING:"LOADING",RESTING:"RESTING"},_INPUT:{FUNCTION:"FUNCTION",EVENT:"EVENT",EMPTY:"EMPTY",LOADED:"LOADED",LOAD_CANCELED:"LOAD_CANCELED"},constructor:function(a,b){this._queue=[];
this._listeners={};
this._functions={};
this._currentState=this._STATE.STARTING;
this._controller=a;
this._controllerDeferred=$pdk.isEmpty(b)?new $pdk.queue.deferred.DeferredController():b
},getRegisteredFunctions:function(){return this._functions
},addFunction:function(a){var b=this;
this._functions[a]=function(){b._queueFunction(a,Array.prototype.slice.call(arguments,0))
};
this._controller.registerFunction(a,{},this._functions[a])
},addListener:function(a,b){var c=this;
this._listeners[a]=function(d){c._queueEvent(a,d.data,b)
};
this._controller.addEventListener(a,this._listeners[a])
},_queueFunction:function(a,b){this._stateInput(this._INPUT.FUNCTION,{type:"function",name:a,parameters:b,triggerLoad:true})
},_queueEvent:function(a,c,b){this._stateInput(this._INPUT.EVENT,{type:"event",name:a,data:c,triggerLoad:b})
},_stateInput:function(a,b){switch(this._currentState){case this._STATE.STARTING:switch(a){case this._INPUT.FUNCTION:case this._INPUT.EVENT:this._queue.push(b);
break;
default:break
}if(b.triggerLoad){this._changeState(this._STATE.LOADING,b)
}break;
case this._STATE.LOADING:switch(a){case this._INPUT.FUNCTION:case this._INPUT.EVENT:this._queue.push(b);
break;
case this._INPUT.LOADED:this._changeState(this._STATE.RESTING,b);
break;
case this._INPUT.LOAD_CANCELED:this._changeState(this._STATE.STARTING,b);
break;
default:break
}break;
case this._STATE.RESTING:switch(a){case this._INPUT.FUNCTION:this._controller.callFunction(b.name,b.parameters);
break;
case this._INPUT.EVENT:this._controller.dispatchEvent(b.name,b.data);
break;
default:break
}break;
default:break
}},_changeState:function(e,d){var c;
var b=this;
switch(e){case this._STATE.STARTING:this._currentState=this._STATE.STARTING;
break;
case this._STATE.LOADING:this._currentState=this._STATE.LOADING;
this._load(d);
break;
case this._STATE.RESTING:for(var a in this._listeners){this._controller.removeEventListener(a,this._listeners[a])
}while(this._queue.length>0){c=this._queue.shift();
switch(c.type){case"function":this._controller.callFunction(c.name,c.parameters,[]);
break;
case"event":this._controllerDeferred.dispatchEvent(c.name,c.data);
break;
default:break
}}this._currentState=this._STATE.RESTING;
break;
default:break
}},_load:function(a){}});
$pdk.queue.deferred.GlobalController=$pdk.extend(function(){},{constructor:function(a,c,b){this._controller=a;
this._defaultScopes=[c].concat(b?b:["default"])
},addEventListener:function(a,c,b){this._controller.addEventListener(a,c,(b?b:this._defaultScopes))
},removeEventListener:function(a,c,b){this._controller.removeEventListener(a,c,(b?b:this._defaultScopes))
},dispatchEvent:function(b,a,c){this._controller.dispatchEvent(b,a,(c?c:this._defaultScopes))
},callFunction:function(a,d,b,c){this._controller.callFunction(a,d,(b?b:this._defaultScopes))
},registerFunction:function(b,a,d,c){this._controller.registerFunction(b,d,(c?c:this._defaultScopes))
}});
$pdk.ns("$pdk.queue.deferred.ShellController.flash");
$pdk.apply($pdk.queue.deferred.ShellController.flash,{_currentContextId:0,_contexts:{},create:function(){var a=new $pdk.queue.deferred.DeferredController();
$pdk.queue.deferred.ShellController.flash._contexts[++$pdk.queue.deferred.ShellController.flash._currentContextId]=a;
return $pdk.queue.deferred.ShellController.flash._currentContextId
},getContext:function(a){return $pdk.queue.deferred.ShellController.flash._contexts[a]
},applyContextFunction:function(a,b,d){var c=$pdk.queue.deferred.ShellController.flash._contexts[a];
if(c!==null&&typeof(c)==="object"){var e=c.getRegisteredFunctions();
if(e!==null&&typeof(e[b])==="function"){e[b].apply(c,d)
}}},addEventListener:function(b,d,a,f){var e=$pdk.queue.deferred.ShellController.flash._contexts[b],c=$pdk.shell.Registry.getInstance().getShells().get(d),g=null;
if(e!==null&&typeof(e)==="object"&&c!==null&&typeof(c)==="object"){g=document.getElementById(c.getSwfObjectId());
if(g!==null&&(typeof(g)==="object"||typeof(g)=="function")&&typeof(g[f])==="function"){e.addEventListener(a,function(h){g[f].call(g,h)
})
}}}});
$pdk.ns("$pdk.queue.deferred.loader");
$pdk.queue.deferred.loader.CardsLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(b,a,c){this._cardsLoader=b;
$pdk.queue.deferred.loader.CardsLoader.superclass.constructor.call(this,a,c);
this.addFunction("addPlayerCard");
this.addFunction("showPlayerCard");
this.addFunction("hidePlayerCard");
this.addListener("OnMediaAreaChanged",false);
this.addListener("OnOverlayAreaChanged",false);
this.addListener("OnMediaAreaChangedFlash",false);
this.addListener("OnOverlayAreaChangedFlash",false);
this.addListener("OnMediaStart",false);
this.addListener("OnReleaseStart",false);
this.addListener("OnLoadRelease",false);
this.addListener("OnLoadReleaseUrl",false);
this.addListener("OnSetRelease",false);
this.addListener("OnPlayerComponentAreaChanged",false)
},_load:function(){var a=this;
a._cardsLoader({onSuccess:function(){tpDebug("success loading cards");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(b){tpDebug("failed to load cards: "+b)
}})
}});
$pdk.queue.deferred.loader.ControlsLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b,d,c){$pdk.queue.deferred.loader.ControlsLoader.superclass.constructor.call(this,a);
this._playerId=b;
this._onSuccess=d;
this._onFailure=c;
this.addListener("OnMediaPlaying",true);
this.addListener("OnPlayerLoaded",true);
this.addListener("OnGetSubtitleLanguage",false);
this.addListener("OnHideCard",false);
this.addListener("OnLoadRelease",false);
this.addListener("OnLoadReleaseUrl",false);
this.addListener("OnMediaEnd",false);
this.addListener("OnMediaLoadStart",false);
this.addListener("OnMediaLoading",false);
this.addListener("OnMediaPause",false);
this.addListener("OnMediaSeek",false);
this.addListener("OnMediaStart",false);
this.addListener("OnMediaUnpause",false);
this.addListener("OnMute",false);
this.addListener("OnReleaseEnd",false);
this.addListener("OnReleaseStart",false);
this.addListener("OnResize",false);
this.addListener("OnSetReleaseUrl",false);
this.addListener("OnShowCard",false);
this.addListener("OnShowFullScreen",false);
this.addListener("OnShowPlayOverlay",false);
this.addListener("OnVolumeChange",false)
},_load:function(c){var a=this;
var b=new com.theplatform.pdk.controls.loader.ControlsLoaderExported();
b.load(a._controller,a._controllerDeferred,a._playerId,c.name,a._onSuccess,a._onFailure,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.controls.loader.ControlsLoaderExported","Controls");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(d){tpDebug("could not load com.theplatform.pdk.controls.loader.ControlsLoaderExported: "+d,"Controls");
a._stateInput(a._INPUT.LOAD_CANCELED,{})
}})
}});
$pdk.queue.deferred.loader.ReleaseListLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b){$pdk.queue.deferred.loader.ReleaseListLoader.superclass.constructor.call(this,a,b);
this.addListener("OnRefreshReleaseModel",false);
this.addListener("OnRefreshReleaseModelStarted",false)
},load:function(){var a=this;
a._stateInput(a._INPUT.EMPTY,{triggerLoad:true})
},_load:function(){var a=this;
a._stateInput(a._INPUT.LOADED,{})
}});
$pdk.queue.deferred.loader.Subtitles=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(g,e,h,a,f,j,d,c,b){$pdk.queue.deferred.loader.Subtitles.superclass.constructor.call(this,g);
this._initOverlayArea=e;
this._viewElement=h;
this._subtitleSettingsCookieName=a;
this._defaultFontSizePixel=f;
this._defaultStyle=j;
this._defaultMissingRegionStyle=d;
this._showSubtitles=c;
this._enableDynamicSubtitleFonts=b;
this.addFunction("setShowSubtitles");
this.addListener("OnGetSubtitleLanguage",true);
this.addListener("OnOverlayAreaChanged",false);
this.addListener("OnSubtitleCuePoint",true);
this.addListener("OnMediaStart",true)
},_load:function(){var a=this;
$pdk.Entrypoint.getInstance().addCallback(function(){var b=new com.theplatform.pdk.subtitles.loader.SubtitlesLoaderExported();
b.load(a._viewElement,a._defaultFontSizePixel,a._defaultStyle,a._defaultMissingRegionStyle,a._subtitleSettingsCookieName,a._enableDynamicSubtitleFonts,a._showSubtitles,a._controller,a._controllerDeferred,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.subtitles.webapp.SubtitlesExported","Subtitles");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(c){tpDebug("could not load com.theplatform.pdk.subtitles.webapp.SubtitlesExported: "+c,"Subtitles",tpConsts.ERROR)
}})
})
}});
$pdk.queue.deferred.loader.SubtitlesSettingsManager=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b){$pdk.queue.deferred.loader.SubtitlesSettingsManager.superclass.constructor.call(this,a);
this._subtitleSettingsCookieName=b;
this.addFunction("getSubtitleLanguage");
this.addFunction("getSubtitleStyle");
this.addFunction("setSubtitleLanguage");
this.addFunction("setSubtitleStyle")
},_load:function(){var a=this;
$pdk.Entrypoint.getInstance().addCallback(function(){var b=new com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported();
b.load(a._subtitleSettingsCookieName,a._controller,a._controllerDeferred,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported","SubtitlesSettingsManagerLoader");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(c){tpDebug("could not load com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported: "+c,"SubtitlesSettingsManagerLoader",tpConsts.ERROR)
}})
})
}});
$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash={_currentContextId:0,_contexts:{},create:function(c,d){var a=$pdk.queue.deferred.ShellController.flash.getContext(c),b=new $pdk.queue.deferred.loader.SubtitlesSettingsManager(a,d);
$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._contexts[++$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._currentContextId]=b;
return $pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._currentContextId
},applyContextFunction:function(a,b,d){var c=$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._contexts[a];
if(c!==null&&typeof(c)==="object"){var e=c.getRegisteredFunctions();
if(e!==null&&typeof(e[b])==="function"){e[b].apply(c,d)
}}}};
$pdk.ns("$pdk.shell");
$pdk.shell.DefaultsAbstractImpl=$pdk.extend(function(){},{decorate:function(b,c,a){b.fp.allowscriptaccess="always";
b.fp.allowfullscreeninteractive="false";
b.fp.menu=true;
b.fp.salign="tl";
b.fp.scale="noscale";
b.fp.wmode="transparent";
b.fa.wmode="transparent"
},configureRuntime:function(c,d){var b=c.supportedMedia.split(",");
tpDebug("configuring shell "+c.getName(),"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.INFO);
if($pdk.isAndroid&&d.canPlayTypeAugmentation()){b=d.sortM3uArray(b)
}var a=d.getMediaFactory().getBestRuntime(c.getName(),d.getPreferredFormatsUnfiltered(),b);
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){c.setRuntime("flash");
tpDebug("Legacy IE, using runtime: flash","bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG)
}else{tpDebug("best_runtime.runtime: "+a.runtime,"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG);
c.setRuntime(a.runtime)
}tpDebug("best_runtime.medium: "+a.medium,"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG);
c.setMedium(a.medium);
this._is_phase1=$pdk.env.Detect.getInstance().isPhase1()
},isPhase1:function(){return this._is_phase1
}});
$pdk.shell.Base=$pdk.extend(function(){},{constructor:function(e,c,b,d){var a;
$pdk.shell.Base.superclass.constructor.call(this);
this.fp={};
this.fa={};
this.useBootloader="true";
this._markupId=typeof(e)==="string"?e:String(Math.round(Math.random()*100000000000000));
this._width=typeof(c)==="string"||typeof(c)==="number"?String(c):null;
this._height=typeof(b)==="string"||typeof(b)==="number"?String(b):null;
this._write_was_called=false;
this._attach_was_called=false;
this._gwt_component=null;
this._registry.add(this);
this._runtime=null;
this._medium=null;
this._configureProcessor=function(){};
if($pdk.isObject(d)){$pdk.apply(this,d)
}this._config_decorator.decorate(this,this._env,this._registry)
},getWidth:function(){return this._width!==null?String(this._width):null
},getHeight:function(){return this._height!==null?String(this._height):null
},setWidth:function(a){this._width=a
},setHeight:function(a){this._height=a
},getId:function(){return this._markupId
},getSwfObjectId:function(){return this._markupId===null?null:["_",this._markupId,"PdkSwfObject"].join("")
},getName:function(){return this._name
},getMarkupClass:function(){return this._markupClass
},getRuntime:function(){if(typeof(this.runtime)==="string"){this._runtime=this.runtime;
delete this.runtime
}return this._runtime
},setRuntime:function(a){this._runtime=a
},getMedium:function(){return this._medium
},setMedium:function(a){this._medium=a
},asSwf:function(){return this._asSwf
},jsViewImpl:function(){return this._jsViewImpl
},jsViewCallBackName:function(){return this._jsViewCallBackName
},getPriority:function(){return this._priority
},write:function(){this._write_was_called=true;
var a=document.getElementsByTagName("script");
var b=a[a.length-1];
var c=b.parentNode;
this._registry.remove(this);
this._markupId=c.id;
this._registry.add(this);
this.bind()
},attach:function(){this.bind()
},bind:function(){this._attach_was_called=true;
if(this._env.GWTReady()){this._attachToGWT()
}},resyncAttach:function(){if(this._attach_was_called){this._attachToGWT()
}},_attachToGWT:function(){var a;
if(this._gwt_component===null){tpSetCssClass(this._markupId,this._markupClass);
a=new com.theplatform.pdk.ComponentFactory(this.getName(),this.getConfig());
this._gwt_component=a.create();
this._gwt_component.bind()
}},getConfig:function(){this._prepareConfigure();
var c={id:this._markupId,skinurl:this._env.baseDir()+"/skins/glass/glass.json"},b;
c=this._normalizeNVP(this,c);
if(this.getName()==="Player"&&c.releaseurl===undefined){c.releaseurl=this._env.getModelUrls().releaseurl
}delete this.fa.height;
delete this.fa.width;
delete this.fp.height;
delete this.fp.width;
delete c.height;
delete c.width;
delete c.engine;
var a=this.jsViewImpl();
if(a&&a!==""&&a.indexOf("@Bundle:")===-1){a=this._env.baseDir()+"/js/"+this.jsViewImpl()
}else{if(a.indexOf("@Bundle:")!==-1){a=a.replace("@Bundle:","")
}}return{as_swf:this._env.baseDir()+"/swf/"+this.asSwf(),js_view_impl:a,markup_class:this.getMarkupClass(),engine:this.getRuntime(),medium:this.getMedium(),markup_id:this.getId(),pdk_swf_object_id:this.getSwfObjectId(),variables:c,width:this.getWidth(),height:this.getHeight(),flash_attributes:this._normalizeNVP(this.fa,{}),flash_parameters:this._normalizeNVP(this.fp,{})}
},setConfigureProcessor:function(a){this._configureProcessor=a
},_prepareConfigure:function(){this._configureProcessor(this,{variables:this._normalizeNVP(this,{}),flash_attributes:this._normalizeNVP(this.fa,{}),flash_parameters:this._normalizeNVP(this.fp,{})})
},_normalizeNVP:function(d,c){var b,a,e;
for(e in d){if(!e.match(/^_/)){b=d[e];
a=typeof(b);
if(a==="number"||a==="boolean"){b=String(b);
a="string"
}if(a==="string"){c[e.toLowerCase()]=b
}}}return c
}});
$pdk.shell.Collection=$pdk.extend(function(){},{constructor:function(){$pdk.shell.Collection.superclass.constructor.call(this);
this._shells={}
},put:function(b,a){this._shells[b]=a
},remove:function(a){delete this._shells[a]
},get:function(a){return this._shells[a]
},keys:function(){var b,a=[];
for(b in this._shells){if(this._shells[b]!==Object.prototype[b]){a.push(b)
}}return a
},toArray:function(){var d=[],c=this.keys(),a=c.length,b;
for(b=0;
b<a;
b++){d.push(this.get(c[b]))
}return d
}});
$pdk.shell.DefaultsCategoryListImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsCategoryListImpl.superclass.decorate.apply(this,arguments);
b.divId=b.getId();
b.supportedMedia="actionscript,javascript";
if(typeof(b.expandedcssclass)!=="string"||b.expandedcssclass.length>0){b.expandedcssclass=b.getMarkupClass()+"Expanded"
}this.configureRuntime(b,c);
b.setConfigureProcessor(function(d,e){if(!(typeof(e.variables.enablemenus)==="string"&&e.variables.enablemenus==="false")&&$pdk.env.Detect.getInstance().hasFlash()){tpDebug("forcing flash runtime for category list",tpConsts.INFO);
d.setRuntime("flash");
d.setMedium("javascript")
}});
b._deferredController=new $pdk.queue.deferred.DeferredController();
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.allchoiceindex=1;
a.allchoicelabel="All Videos";
a.backgroundcolor="0x383838";
a.expandedheight=198;
a.expandedwidth=795;
a.expandercolor="0xBEBEBE";
a.expanderhovercolor="0xBEBEBE";
a.expanderselectedcolor="0x00CCFF";
a.framecolor="0x545759";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0x131313";
a.itemshineselectedcolor="0x00CCFF";
a.mostpopularchoiceindex=2;
a.mostpopularchoicelabel="Most Popular";
a.textcolor="0xBEBEBE";
a.textframecolor="0x242424";
a.textframehovercolor="0xBEBEBE";
a.textframeselectedcolor="0x00CCFF";
a.texthovercolor="0xBEBEBE";
a.textselectedcolor="0x00CCFF"
}});
$pdk.shell.DefaultsCategoryModelImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){var d=this;
$pdk.shell.DefaultsCategoryModelImpl.superclass.decorate.apply(this,arguments);
b.setWidth(1);
b.setHeight(1);
b.supportedMedia="actionscript";
b.categoryModelRssUrl=c.getModelUrls().rssurl;
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){b.setRuntime("flash");
b.setMedium("actionscript")
}else{b.setRuntime("html5");
b.setMedium("javascript")
}b.setConfigureProcessor(function(e,f){if((typeof(f.variables.feedpid)==="string"&&f.variables.feedpid.length>0)||d._isLegacyCategoryURL(f.variables.feedsserviceurl)||d._isLegacyCategoryURL(e.categoryModelRssUrl)){tpDebug("forcing flash runtime for category model",tpConsts.INFO);
e.setRuntime("flash");
e.setMedium("javascript")
}})
},_isLegacyCategoryURL:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getCategoryList/)!==null&&a.match(/[?&]PID\=/)!==null
}});
$pdk.shell.DefaultsClipInfoImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(c,e,b){var a=c.getWidth(),d=c.getHeight();
if(typeof(a)!=="string"||a.length<1){c.setWidth("100%")
}if(typeof(d)!=="string"||d.length<1){c.setHeight("100%")
}$pdk.shell.DefaultsClipInfoImpl.superclass.decorate.apply(this,arguments);
c.supportedMedia="actionscript,javascript";
this.configureRuntime(c,e);
if(this.isPhase1()){this.setPhase1Defaults(c)
}},setPhase1Defaults:function(a){a.backgroundcolor="0xFFFFFF";
a.banneralignment="top";
a.bannerregions="";
a.descriptioncolor="0xF2F2F2";
a.framecolor="0xFFFFFF";
a.titlecolor="0xF2F2F2"
}});
$pdk.shell.DefaultsHeaderImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsHeaderImpl.superclass.decorate.apply(this,arguments);
b.backgroundcolor="0x383838";
b.framecolor="0x545759";
b.supportedMedia="actionscript";
this.configureRuntime(b,c)
}});
$pdk.shell.DefaultsNavigationImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsNavigationImpl.superclass.decorate.apply(this,arguments);
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c);
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.backgroundcolor="0x131313";
a.framecolor="0x000000";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0xFF0000";
a.itemshineselectedcolor="0xFF0000";
a.textbackgroundcolor="0x383838";
a.textcolor="0xDFDFDF";
a.textframecolor="0x383838";
a.texthighlighthovercolor="0x00CCFF";
a.texthighlightselectedcolor="0xFFFFFF";
a.texthovercolor="0xDFDFDF";
a.textselectedcolor="0xDFDFDF";
a.thumbnailbackgroundcolor="0x242424";
a.thumbnailframecolor="0x383838";
a.thumbnailhighlighthovercolor="0x00CCFF";
a.thumbnailhighlightselectedcolor="0xFFFFFF";
a.controlbackgroundcolor="0xFF0000";
a.controlcolor="0xF2F2F2";
a.controlframecolor="0xFF0000";
a.controlframehovercolor="0xFF0000";
a.controlframeselectedcolor="0xFF0000";
a.controlhovercolor="0xFFFFFF";
a.controlselectedcolor="0x00CCFF";
a.infocolor="0x1D1D1D";
a.itemsperpage=4;
a.fa.wmode="transparent";
a.fp.wmode="transparent"
}});
$pdk.shell.DefaultsNoOpImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){}});
$pdk.shell.DefaultsPlayerImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(k,j,b){$pdk.shell.DefaultsPlayerImpl.superclass.decorate.apply(this,arguments);
var c=document.getElementById(k.getId()),a,m=k.getWidth(),f=k.getHeight(),g=j.getConfigSet("usedefaultcards");
if(typeof(m)!=="string"||m.length<1){k.setWidth("100%")
}if(typeof(f)!=="string"||f.length<1){k.setHeight("100%")
}if(c===null){var e=document.getElementsByTagName("script");
var n=e[e.length-1];
var d=n.parentNode;
this._markupId=d.id;
c=d
}if(c.nodeName.toLowerCase()=="video"){a=c.getElementsByTagName("source");
if(a&&a.length&&a[0].src){k.releaseurl=a[0].src.split("?")[0]
}else{if(c.src){k.releaseurl=c.src.split("?")[0]
}}if(c.poster){k.previewimageurl=c.poster
}if(c.autoplay){k.autoplay=c.autoplay
}}if(!j.rssurl&&j.getModelUrls().rssurl){k.rssurl=j.getModelUrls().rssurl
}if(!this.isPhase1()){k.backgroundcolor="0x131313";
k.controlbackgroundcolor="0x131313";
k.controlcolor="0xF2F2F2";
k.controlframecolor="0xE0E0E0";
k.controlhovercolor="0xFFFFFF";
k.controlselectedcolor="0x00CCFF";
k.framecolor="0xE0E0E0";
k.loadprogresscolor="0x7C7C7C";
k.pagebackgroundcolor="0x131313";
k.playprogresscolor="0xE0E0E0";
k.scrubtrackcolor="0x131313";
k.scrubbercolor="0xF2F2F2";
k.scrubberframecolor="0xF2F2F2";
k.textbackgroundcolor="0x383838";
k.textcolor="0xF2F2F2"
}k.allowfullscreen=true;
k.fa.allowfullscreen="true";
k.fp.allowfullscreen="true";
k.wmode=k.fa.wmode=k.fp.wmode="opaque";
k.supportedMedia="mpeg4,f4m,flv,m3u,ogg,webm,mpeg,qt,3gpp,ism,wm,3gpp2,aac,asx,avi,move,mp3,mpeg-dash";
k.releaseUrlFormatResolution=false;
this.configureRuntime(k,j);
j.setPlaybackFormat(k.getMedium());
j.setComponentRuntime(k.getRuntime());
if(k.getRuntime()=="universal"){k.setRuntime("html5")
}var l=this;
k.setConfigureProcessor(function(u,v){var p=l._getVideoLayer(u,v);
if(p){var o=false;
var h=j.getSupportedRuntimes();
var t=0;
for(;
t<h.length;
t++){if(h[t].indexOf(p.runtime+":")===0){if(p.runtime==="html"||p.runtime==="html5"||(p.runtime==="flash"&&$pdk.env.Detect.getInstance().hasFlash())){o=true
}break
}}if(o){u.videoengineruntime=p.runtime
}u.videolayer=p.layer;
u.videolayerconfig=p.config;
u.formats=p.formats?p.formats.concat(u.formats):u.formats;
var q=p.formats?p.formats.split(","):[];
var s=0;
var r=q.length;
for(;
s<r;
s++){if(typeof($pdk.overrideFormats)==="undefined"){$pdk.overrideFormats={}
}$pdk.overrideFormats[q[s].toLowerCase()]=true
}u.formats=l._createFormats(j,u);
if(u.getRuntime()=="html5"&&!u.videoEngineRuntime){u.videoengineruntime=j.getPlaybackRuntime(u.getRuntime())
}}if(!u.videoEngineRuntime){u.videoengineruntime=j.getPlaybackRuntime(u.getRuntime())
}if(!u.formats){u.formats=l._createFormats(j,u)
}});
k.useDefaultCards=k.getRuntime()==="html5";
if(!$pdk.isEmpty(g)){k.useDefaultCards=g.toArray()[0].toLowerCase()!=="false"
}},_getVideoLayer:function(e){var a={runtime:null,layer:null,formats:null,config:null};
var b=[];
for(prop in e){if(typeof e[prop]==="string"&&prop.toLowerCase().indexOf("plugin")===0&&e[prop].toLowerCase().indexOf("videolayer")>=0){b.push(e[prop].split("|"))
}}if(b.length>0){for(var d=0;
d<b.length;
d++){for(var c=0;
c<b[d].length;
c++){if(b[d][c].toLowerCase().indexOf("videolayer=")===0){a.layer=b[d][c].toLowerCase().split("=")[1]
}else{if(b[d][c].toLowerCase().indexOf("formats=")===0){a.formats=b[d][c].toLowerCase().split("=")[1]
}else{if(b[d][c].toLowerCase().indexOf("runtime=")===0){a.runtime=b[d][c].toLowerCase().split("=")[1]
}}}}if(a.layer){a.config=b[d].join("|");
return a
}}}},_createFormats:function(c,a){var b=c.getPlayerFormats(a.getRuntime());
var d;
if(b.length>0){d=b.join(",");
tpDebug("using player formats: "+d,"bootloader","$pdk.shell.DefaultsPlayerImpl",tpConsts.INFO)
}else{tpDebug("Could not find a preferred format for this browser. Player will not add formats to selector calls","bootloader","$pdk.shell.DefaultsPlayerImpl",tpConsts.WARN)
}return d
}});
$pdk.shell.DefaultsReleaseListImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsReleaseListImpl.superclass.decorate.apply(this,arguments);
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c);
b._deferredController=new $pdk.queue.deferred.DeferredController();
b._loader=new $pdk.queue.deferred.loader.ReleaseListLoader(new $pdk.queue.deferred.GlobalController($pdk.controller),b._deferredController);
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.allowscrolling="false";
a.animation="slideHorizontal";
a.backgroundcolor="0x131313";
a.columns=2;
a.framecolor="0x383838";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0x383838";
a.itemshineselectedcolor="0x383838";
a.itemsperpage=4;
a.textbackgroundcolor="0x383838";
a.textcolor="0xDFDFDF";
a.textframecolor="0x383838";
a.texthighlighthovercolor="0x00CCFF";
a.texthighlightselectedcolor="0xFFFFFF";
a.texthovercolor="0xDFDFDF";
a.textselectedcolor="0xDFDFDF";
a.thumbnailbackgroundcolor="0x242424";
a.thumbnailframecolor="0x383838";
a.thumbnailheight=75;
a.thumbnailhighlighthovercolor="0x00CCFF";
a.thumbnailhighlightselectedcolor="0xFFFFFF";
a.thumbnailwidth=100;
a.showairdate=false;
a.showauthor=false;
a.showbitrate=false;
a.showdescription=true;
a.showformat=false;
a.showlength=true;
a.showthumbnail=true;
a.showtitle=true
}});
$pdk.shell.DefaultsReleaseModelImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){var e=this;
$pdk.shell.DefaultsReleaseModelImpl.superclass.decorate.apply(e,arguments);
b.setWidth(1);
b.setHeight(1);
b.supportedMedia="actionscript,javascript";
b._paramsOriginal=b.params;
b.releaseModelRssUrl=c.getModelUrls().rssurl;
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){b.setRuntime("flash");
b.setMedium("actionscript")
}else{b.setRuntime("html5");
b.setMedium("javascript")
}var d=this;
b.setConfigureProcessor(function(f,g){f._paramsOriginal=f.params;
f.params=d._createParams(c,f);
if((typeof(g.variables.feedpid)==="string"&&g.variables.feedpid.length>0)||e._isLegacyReleaseURL(g.variables.feedsserviceurl)||e._isLegacyReleaseURL(f.releaseModelRssUrl)){tpDebug("forcing flash runtime for release model",tpConsts.INFO);
f.setRuntime("flash");
f.setMedium("javascript")
}})
},_isLegacyReleaseURL:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getReleaseList/)!==null&&a.match(/[?&]PID\=/)!==null
},_createParams:function(f,d){tpDebug("looking up best format for player","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
var h=[],b=[],a=null,c=f.getMediaFactory().getBestRuntime("Player",f.getPreferredFormatsUnfiltered(),["mpeg4","f4m","flv","m3u","ogg","webm","mpeg","qt","3gpp","ism","wm","3gpp2","aac","asx","avi","move","mp3","mpeg-dash"]),e=f.getPlayerFormats(c.runtime);
if(e.length>0){tpDebug("using player formats: "+e.join(", "),"bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
a=e.join("|")
}else{e=f.getPreferredFormatsUnfiltered();
if(e.length>0){tpDebug("Release model could not find viable format for player. Choosing first preferred format from ("+e.join(", ")+")","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
a=e[0]
}else{tpDebug("Could not find a preferred format. Release model will fetch all formats.","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.WARN)
}}var g=false;
if(d._paramsOriginal&&d._paramsOriginal.indexOf("byContent")!==-1){g=true
}if(!g&&a!==null){h.push("byContent=byFormat%3D"+a)
}if(!$pdk.isEmpty(d.thumbnailwidth)){b.push("byWidth%3D"+d.thumbnailwidth)
}if(!$pdk.isEmpty(d.thumbnailheight)){b.push("byHeight%3D"+d.thumbnailheight)
}if(b.length>0){h.push("thumbnailFilter="+b.join("%26"))
}return h.join("&")+(h&&h.length>0?"&":"")+(d._paramsOriginal?d._paramsOriginal:"")
}});
$pdk.shell.DefaultsSearchImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsSearchImpl.superclass.decorate.apply(this,arguments);
b.backgroundcolor="0x131313";
b.controlbackgroundcolor="0x242424";
b.controlcolor="0xBEBEBE";
b.controlframecolor="0x545759";
b.controlframehovercolor="0xBEBEBE";
b.controlframeselectedcolor="0x00CCFF";
b.controlhovercolor="0xBEBEBE";
b.controlselectedcolor="0x00CCFF";
b.editbackgroundcolor="0x131313";
b.editcolor="0xBEBEBE";
b.framecolor="0x545759";
b.labelcolor="0xBEBEBE";
b.searchhint="Search...";
b.searchlabel="Search";
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c)
}});
$pdk.shell.Factory=$pdk.apply({},{generate:function(j,a,f){var e,d,k=j.length,g,h,c,b;
for(e=0;
e<k;
e++){d=j[e];
h=$pdk.shell.Factory.CLASS_TABLE[d.markupClass];
if(d.markupClass=="tpPlayer"){if($pdk.isEmpty(d.tpVars.releaseurl)){c=f.getModelUrls().releaseurl;
if(typeof(c)==="string"&&c.length>0){d.tpVars.releaseurl=c
}}if(d.tpVars.loglevel&&(!window.tpLogLevel||window.tpLogLevel==="warn")){window.tpLogLevel=d.tpVars.loglevel
}if($pdk.isEmpty(d.tpVars.releaseurl)||$pdk.isAndroid||$pdk.isIOS){d.tpVars.autoplay="false"
}else{if($pdk.isEmpty(d.tpVars.autoplay)&&!$pdk.isEmpty(d.tpVars.releaseurl)){d.tpVars.autoplay="true"
}}}if(typeof(h)==="function"){g=a.getShells().get(d.markupId);
g=g===null||typeof(g)!=="object"?new h(d.markupId):g;
$pdk.apply(g,d.tpVars);
$pdk.apply(g.fp,d.tpFp);
$pdk.apply(g.fa,d.tpFa);
g.attach()
}}$pdk.shell.Factory._generateMissingModels(a,f)
},_generateMissingModels:function(a,h){var j=a.getShells().toArray(),b=[],f=[],d=[],k=0,n=0,e,c=j.length,g,m;
for(e=0;
e<c;
e++){g=j[e];
switch(g.getName()){case"ReleaseList":b={};
n++;
d.push(b);
b.startindex=1;
b.endindex=parseInt(g.itemsperpage,10);
b.thumbnailwidth=g.thumbnailwidth;
b.thumbnailheight=g.thumbnailheight;
break;
case"ReleaseModel":n--;
d.pop();
break;
case"CategoryList":k++;
f.push({});
break;
case"CategoryModel":k--;
f.pop();
break;
default:break
}}for(e=0;
e<n;
e++){g=$pdk.shell.Factory._buildModelShell(h,"releasemodel"+String(e),"tpReleaseModel",$pdk.shell.Factory.CLASS_TABLE.tpReleaseModel,[h.getModelUrls().releasemodel,h.getModelUrls().releasemodelbase],d[e])
}for(e=0;
e<k;
e++){g=$pdk.shell.Factory._buildModelShell(h,"categorymodel"+String(e),"tpCategoryModel",$pdk.shell.Factory.CLASS_TABLE.tpCategoryModel,[h.getModelUrls().categorymodel,h.getModelUrls().categorymodelbase],f[e])
}},_buildModelShell:function(f,c,e,h,j,d){var b=document.createElement("div"),g=new h(c,1,1,d),a;
b.id=c;
b.className=e;
b.setAttribute("style","position:absolute; top:0px; left:0px; width:1px; height:1px;");
document.body.insertBefore(b,document.body.childNodes[0]);
if($pdk.isArray(j)&&j.length>0){a=j[0];
if(typeof(a)==="string"&&a.length>0){g.feedsServiceUrl=a
}a=j[1];
if(typeof(a)==="string"&&a.length>0){g.feedsServiceUrlBase=a
}}g.attach();
return g
},getNamesFromDomElements:function(h){var q,r,v,k,c,u=h.length,t,p,w,g,x,d,e,l,o,j=[],f={},s={},m={},y,b;
for(t=0;
t<u;
t++){f={};
s={};
m={};
c=h[t];
e=c.attributes;
attributes_l=e.length;
for(w=0;
w<attributes_l;
w++){g=e[w];
d=g.nodeValue;
switch(g.name){case"class":q=d;
break;
case"id":o=d;
break;
default:if(g.name.match(/^tp:/)){x=g.name.replace(/^tp:/,"").toLowerCase();
b=x.match(/^fa\./)!==null?"fa":"var";
b=x.match(/^fp\./)!==null?"fp":b;
switch(b){case"fa":s[x.replace(/^fa\./,"")]=d;
break;
case"fp":m[x.replace(/^fp\./,"")]=d;
break;
case"var":f[x]=d;
break;
default:break
}}break
}}v=typeof(q)==="string"?q.split(" "):[];
k=v.length;
for(p=0;
p<k;
p++){r=v[p];
if(r.match(/^tp/)){j.push({markupClass:r,markupId:o,tpVars:$pdk.apply({},f),tpFp:$pdk.apply({},m),tpFa:$pdk.apply({},s)})
}}}return j
},CLASS_TABLE:{}});
$pdk.ns("$pdk.shell.Registry");
$pdk.shell.Registry._class=$pdk.extend(function(){},{constructor:function(){$pdk.shell.Registry._class.superclass.constructor.call(this);
this._collection=new $pdk.shell.Collection();
this._swfloader=null
},getShells:function(){return this._collection
},bind:function(a){this._swfloader=a
},add:function(a){this._collection.put(a.getId(),a)
},remove:function(a){this._collection.remove(a.getId())
},hasPlayer:function(){var a=this._collection.toArray();
var b=0;
len=a.length;
for(;
b<len;
b++){if(a[b].getName()==="Player"){return true
}}return false
},connectShellsToGwt:function(){var c,b,e=this._collection.toArray().sort(function(g,f){return g.getPriority()>f.getPriority()
}),d=e.length,a;
for(c=0;
c<d;
c++){b=e[c];
if(b.getRuntime()==="flash"){this._swfloader.add(b)
}else{b.resyncAttach()
}}this._swfloader.initializeShells()
},satisfyShellDeps:function(){var w,j,u,m=null,s,E,b,c,d,q,r,f,t,h,a,B,A=false,v,l=this._collection.toArray(),D={},C=l.length,o,k;
for(u=0;
u<C;
u++){v=l[u];
E=v.getName();
if($pdk.isEmpty(D[E])){D[E]=[]
}D[E].push(v)
}try{j=D.ReleaseModel.length;
if(j>0){w=D.Player.length;
for(u=0;
u<w;
u++){D.Player[u].releaseUrlFormatResolution=true
}}var p=D.ReleaseModel;
for(u=0;
u<p.length;
u++){if(p[u].params&&p[u]._paramsOriginal.indexOf("byContent")>=0&&p[u].params.indexOf("byContent")==-1){p[u].params+="&"+p[u]._paramsOriginal
}}}catch(g){}try{B=D.ReleaseList.length;
r=D.Navigation.length;
for(u=0;
u<r;
u++){b=D.Navigation[u];
m=b.itemsPerPage;
m=$pdk.isEmpty(m)?null:m;
m=m===null?b.itemsperpage:m;
m=$pdk.isEmpty(m)?null:m;
if(m===null){delete b.itemsPerPage;
d=typeof(b.scopes)==="string"?b.scopes.split(","):[];
q=d.length;
for(s=0;
s<B&&m===null;
s++){f=D.ReleaseList[s];
h=typeof(f.scopes)==="string"?f.scopes.split(","):[];
a=h.length;
if(q<1&&a<1){A=true
}else{A=false;
for(k=0;
k<q&&A===false;
k++){c=d[k];
for(o=0;
o<a&&A===false;
o++){t=h[o];
A=c===t
}}}if(A){m=f.itemsPerPage;
m=$pdk.isEmpty(m)?null:m;
m=m===null?f.itemsperpage:m;
m=$pdk.isEmpty(m)?null:m
}}if(m!==null){b.itemsperpage=m
}}}}catch(y){}}});
$pdk.shell.Registry._singleton=null;
$pdk.shell.Registry.getInstance=function(){if($pdk.shell.Registry._singleton===null){$pdk.shell.Registry._singleton=new $pdk.shell.Registry._class()
}return $pdk.shell.Registry._singleton
};
$pdk.shell.SwfSerializedLoader=$pdk.extend(function(){},{constructor:function(){this._shells_unattached=[];
this._shells_unattached_batched={};
this._batch_index=[];
this._expected_responses=0;
this._timeouts=[]
},add:function(a){if(!$pdk.isEmpty(a)&&a.getRuntime()==="flash"){this._shells_unattached.push(a)
}},initializeShells:function(){while(this._shells_unattached.length>0){this._batch(this._shells_unattached.shift())
}this._processNextBatch()
},onSwfReady:function(){this._expected_responses--;
if(this._expected_responses<1){this._processNextBatch()
}},_processNextBatch:function(){var d=this._batch_index.shift(),c=this._shells_unattached_batched[d],a=0,b=this;
while(this._timeouts.length){window.clearTimeout(this._timeouts.shift())
}if(!$pdk.isEmpty(c)){while(c.length){shell=c.shift();
shell.resyncAttach();
a++
}}this._expected_responses=a;
if(this._expected_responses>0){this._timeouts.push(window.setTimeout(function(){b._onTimeout(d)
},5000))
}},_onTimeout:function(a){this._expected_responses=0;
this._processNextBatch()
},_batch:function(a){var b=String(Math.floor(a.getPriority()));
if($pdk.isEmpty(this._shells_unattached_batched[b])){this._shells_unattached_batched[b]=[];
this._batch_index.push(b)
}this._shells_unattached_batched[b].push(a)
}});
$pdk.bootloaderVersion=new $pdk.PdkVersion("5","5","6","362723","2014-09-19 2:08 PM");
function tpExternalControllerClass(){this.playerTypes=new Object();
this.extPlayers=new Object();
this.registerExternalPlayer=function(type,playerClass){this.playerTypes[type]=playerClass
};
this.routeMessage=function(swfId,controllerId,streamType,funcName,args){var curController=this.extPlayers[controllerId];
if(!curController){curController=this.extPlayers[controllerId]={}
}var curPlayer=curController[streamType];
if(!curPlayer){var playerClass=this.playerTypes[streamType];
if(!playerClass){return
}curPlayer=eval("new "+playerClass+"('"+swfId+"', '"+controllerId+"');");
if(!curPlayer){return
}curController[streamType]=curPlayer
}curPlayer[funcName](args)
};
this.returnMessage=function(swfId,controllerId,funcName,args){var obj=tpThisMovie(swfId);
obj.receiveJSMessage(controllerId,funcName,args)
};
this.cleanup=function(){for(var controllerId in this.extPlayers){var players=this.extPlayers[controllerId];
for(var player in players){players[player].cleanup();
delete players[player]
}delete this.extPlayers[controllerId]
}}
}function tpExternalMessage(b,d,c,e,a){window.tpExternalController.routeMessage(b,d,c,e,a)
}window.tpExternalController=new tpExternalControllerClass();
function tpShowAlert(a){switch(a){case"FULLSCREEN_DISABLED":alert("Full screen is only available with Flash 9 or later");
break
}}tpScriptLoader=new ScriptLoader();
function tpLoadJScript(a,d,c,b){tpScriptLoader.addScript(a,d,c,b)
}function callbackDispatcher(a){tpScriptLoader.callbackDispatcher(a)
}function invokeCallbacks(a){tpScriptLoader.invokeCallbacks()
}function LoadObj(a,d,c,b){this.script=a;
this.callback=d;
this.id=c;
this.atts=b
}function ScriptLoader(){this.scriptQueue=new Array();
this.callbackQueue=new Array()
}ScriptLoader.prototype.addScript=function(a,e,d,c){var b=new LoadObj(a,e,d,c);
this.scriptQueue.push(b);
if(this.scriptQueue.length==1){this.checkScriptQueue()
}};
ScriptLoader.prototype.checkScriptQueue=function(){if(this.scriptQueue.length){var a=this.scriptQueue.shift();
this.loadScript(a)
}else{interval_id=setInterval("invokeCallbacks()",100)
}};
ScriptLoader.prototype.callbackDispatcher=function(b){for(var a in this.callbackQueue){if(this.callbackQueue[a]==b){this.checkScriptQueue();
return
}}this.callbackQueue.push(b);
this.checkScriptQueue()
};
ScriptLoader.prototype.invokeCallbacks=function(){clearInterval(interval_id);
while(this.callbackQueue.length){var loadObj=this.callbackQueue.shift();
eval(loadObj.callback)(loadObj.script)
}};
ScriptLoader.prototype.loadScript=function(h){var e=h.script;
var b=h.callback;
var g=h.id;
var f=h.atts;
var d=window.document.createElement("script");
d.charset="utf-8";
if(g){d.id=g
}d.type="text/javascript";
if(f){for(var c=0;
c<f.length;
c++){d.setAttribute(f[c].att,f[c].value)
}}d.src=e;
if(b){var a=function(k,j){j(k);
this.onreadystatechange=null;
this.onload=null;
this.onerror=null
};
d.onreadystatechange=function(){a(h,callbackDispatcher)
};
d.onload=function(){a(h,callbackDispatcher)
};
d.onerror=function(){a(h,callbackDispatcher)
}
}window.document.getElementsByTagName("head")[0].appendChild(d)
};
function tpLoadScript(f,c,h,g){var e=window.document.createElement("script");
e.charset="utf-8";
if(h){e.id=h
}e.type="text/javascript";
if(g){for(var d=0;
d<g.length;
d++){e.setAttribute(g[d].att,g[d].value)
}}e.src=f;
var b=false;
if(c){var a=function(j,k){j(k);
this.onreadystatechange=null;
this.onload=null;
this.onerror=null
};
e.onreadystatechange=function(){if((this.readyState==="loaded"||this.readyState==="complete"||this.readyState===4)&&!b){a(c,f);
b=true
}};
e.onload=function(){if(!b){b=true;
a(c,f)
}};
e.onerror=function(){if(!b){a(c,f)
}}
}window.document.getElementsByTagName("head")[0].appendChild(e)
}function tpGetScriptPath(){return $pdk.env.Detect.getInstance().baseDir()
}function tpSetCssClass(a,b){try{var f=document.getElementById(a),c=f.className;
c=typeof(c)==="string"?c:"";
if(c.match(new RegExp(b))===null){f.className=b+(c.length?" "+c:"")
}}catch(d){}}function tpUnsetCssClass(a,c){try{var g=document.getElementById(a),d=g.className,b=new RegExp(c+" ");
d=typeof(d)==="string"?d:"";
g.className=d.replace(b,"","g")
}catch(f){}}function tpResize(b,a,c){}function tpGetTop(a){result=0;
while(a){result+=a.offsetTop;
a=a.offsetParent
}return result
}function tpGetLeft(a){result=0;
while(a){result+=a.offsetLeft;
a=a.offsetParent
}return result
}tpThisJsObject=function(a){return window[a]
};
var tpRegisteredGWTWidgets={};
tpThisMovie=function(b){if(b=="communicationwidget"||window.tpRegisteredGWTWidgets&&tpRegisteredGWTWidgets[b]!=undefined){var c=tpThisJsObject("tpGwtCommManager");
if(c){return c
}}var a;
if(window.frame&&(window.frame.hasOwnProperty("contentWindow")||window.frame.hasOwnProperty("contentDocument"))){a=frame.contentWindow.document||frame.contentDocument.document
}else{a=document
}return a.getElementById(b)
};
function tpDebug(c,b,a,d){if(!b){b="javascript"
}if(!a){a="utils"
}if(!d){d=tpConsts.INFO
}else{if(typeof d=="string"){d=tpGetLevelNumber(d)
}}if(d<tpGetLevelNumber(tpGetLogLevel())){return
}if(tpController!==undefined){tpController.dispatchEvent("OnPdkTrace",{message:c,timestamp:(new Date().valueOf()),controllerId:b,className:a,level:d})
}else{tpTrace(c,(new Date()).valueOf(),b,a,d)
}}function tpOpenNewWindow(d,b,a){var c=window.open(d,b,a)
}var tpTrackingImage=new Image();
function tpCallTrackingUrl(a){a=unescape(a);
tpTrackingImage.src=a;
for(i=0;
((!tpTrackingImage.complete)&&(i<100000));
i++){}}var tpConsts={};
tpConsts.NONE=2000;
tpConsts.FATAL=1000;
tpConsts.ERROR=8;
tpConsts.WARN=6;
tpConsts.INFO=4;
tpConsts.DEBUG=2;
tpConsts.TEST=1;
function tpGetLevel(a){switch(a){case tpConsts.DEBUG:return"DEBUG";
case tpConsts.INFO:return"INFO";
case tpConsts.WARN:return"WARN";
case tpConsts.ERROR:return"ERROR";
case tpConsts.FATAL:return"FATAL";
case tpConsts.TEST:return"TEST";
case tpConsts.NONE:return"NONE"
}return"UNKNOWN"
}function tpGetLevelNumber(a){switch(a.toUpperCase()){case"DEBUG":return tpConsts.DEBUG;
case"INFO":return tpConsts.INFO;
case"WARN":return tpConsts.WARN;
case"ERROR":return tpConsts.ERROR;
case"FATAL":return tpConsts.FATAL;
case"TEST":return tpConsts.TEST;
case"NONE":return tpConsts.NONE
}return 4
}function tpTrace(d,f,e,j,a){if(typeof(window.console)!=="object"){return
}var g=new Date(Number(f));
var b=g.getMilliseconds();
if(b.toString().length==2){b="0"+b
}else{if(b.toString().length==1){b="00"+b
}}var l=g.getHours();
var c=g.getMinutes();
var h=g.getSeconds();
var k=(l>=10?l:"0"+l)+":"+(c>=10?c:"0"+c)+":"+(h>=10?h:"0"+h)+"."+b;
var m=k+" \t"+tpGetLevel(Number(a))+" \t"+e+" \t";
if(j&&j.length){m+=j+" :: "
}m+=d;
switch(Number(a)){case tpConsts.DEBUG:console.log(m);
break;
case tpConsts.INFO:console.info(m);
break;
case tpConsts.WARN:console.warn(m);
break;
case tpConsts.ERROR:case tpConsts.FATAL:console.error(m);
break
}}function tpGetUseJS(){return"true"
}function tpGetCommManagerID(){return tpCommID
}if(!self.tpLogLevel){tpLogLevel="warn"
}function tpSetLogLevel(a){tpLogLevel=a
}function tpGetLogLevel(){return tpLogLevel
}function tpGetProperties(){var a=new Object();
a.commManagerId=tpGetCommManagerID();
a.useJS=tpGetUseJS();
a.registeredComponents=tpGetRegisteredIDs();
a.logLevel=tpGetLogLevel();
return a
}var tpRegisteredIDArr;
function tpRegisterID(b){if(!tpRegisteredIDArr){tpRegisteredIDArr=[]
}for(var a=0;
a<tpRegisteredIDArr.length;
a++){if(tpRegisteredIDArr[a]==b){return
}}tpRegisteredIDArr.push(b)
}function tpGetRegisteredIDs(){return tpRegisteredIDArr
}var tpController;
var tpCommID;
var tpBridgeID;
var tpExternalController;
var tpGwtCommManager;
var useWorkerIfPossible=false;
var gwtWorker;
function tpDoInitGwtCommManager(){try{if(tpCommID=="communicationwidget"&&window.tpGwtCommManager===undefined){tpGwtCommManager=new com.theplatform.pdk.CommManager()
}else{if((window.tryWorker===undefined||!tryWorker)&&window.tpGwtCommManager===undefined){tpGwtCommManager=new com.theplatform.pdk.CommManager(tpCommID)
}}}catch(a){if(window.console!=undefined){console.error("GwtCommManager module failed to load 1!")
}else{}}}function tpInitGwtCommManager(b,a){try{if(useWorkerIfPossible&&Worker!=undefined){gwtWorker=new Worker("js/commManagerWorker.js");
tpGwtCommManager=new Object();
tpGwtCommManager.executeMessage=function(d){gwtWorker.postMessage(d)
};
gwtWorker.onmessage=function(d){console.log(d.data);
if(d.data.destination){tpReceiveMessage(d.data.destination,d.data.message)
}};
gwtWorker.onerror=function(d){if(self.console){console.error(d.message)
}}
}else{tpGwtCommManager=new com.theplatform.pdk.CommManager(tpCommID)
}}catch(c){if(a==true){if(console!=undefined){console.error("GwtCommManager module failed to load! 2")
}else{}}}}function tpSetCommManagerID(c,e,d,a,b){if(b){useWorkerIfPossible=true
}if(c&&e){tpInitGwtCommManager(c)
}tpCommID=c;
tpBridgeID=c?c:"unknown";
if(window.tpTraceListener===undefined){window.tpTraceListener=function(g){var f=g.data;
if(f){tpTrace(f.message,f.timestamp,f.controllerId,f.className,f.level)
}};
tpController.addEventListener("OnPdkTrace",window.tpTraceListener)
}}function tpReceiveMessage(a,b){tpController.receiveMessage(a,b)
}function tpGetPreferredFormats(){if($pdk!==undefined){return $pdk.env.Detect.getInstance().getPreferredFormats()
}else{return[]
}}function tpGetPlayerFormats(){if($pdk!==undefined){var a=$pdk.env.Detect.getInstance().getPlayerFormats(),b="";
if($pdk.isArray(a)){b=a.join("|")
}return b
}else{return[]
}}var tpHolderName="pdkHolder";
var tpExternalJS;
function tpSetPlayerIDForExternal(a){}function tpSetHolderIDForExternal(a){tpHolderName=a
}function tpSetPdkBaseDirectory(a){}function tpLoadExternalMediaJS(){tpExternalJS=tpLoadExternalMediaJS.arguments;
for(var a=0;
a<tpExternalJS.length;
a++){tpLoadScript(tpExternalJS[a])
}}function tpCleanupExternal(){if(tpExternalJS){var a=window.document.getElementsByTagName("head")[0].getElementsByTagName("script");
for(var c=0;
c<a.length;
c++){for(var b=0;
b<tpExternalJS.length;
b++){if(a[c].src==tpExternalJS[b]){window.document.getElementsByTagName("head")[0].removeChild(a[c]);
break
}}}tpExternalJS.length=0
}if(tpExternalController){tpExternalController.cleanup()
}}$pdk.ns("$pdk.interfaces");
$pdk.interfaces.expose=function(b,a){b.Navigation=$pdk.extend($pdk.shell.Base,{_name:"Navigation",_markupClass:"tpNavigation",_runtime:"default",_jsViewImpl:"@Bundle:tpNavigationView.js",_markupClass:"tpNavigation",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsNavigationImpl(),_asSwf:"nav.swf"});
b.Search=$pdk.extend($pdk.shell.Base,{_name:"Search",_markupClass:"tpSearch",_runtime:"default",_jsViewImpl:"@Bundle:tpSearchView.js",_markupClass:"tpSearch",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsSearchImpl(),_asSwf:"search.swf"});
b.ClipInfo=$pdk.extend($pdk.shell.Base,{_name:"ClipInfo",_markupClass:"tpClipInfo",_runtime:"default",_jsViewImpl:"@Bundle:tpClipInfoView.js",_markupClass:"tpClipInfo",_priority:40,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsClipInfoImpl(),_asSwf:"info.swf"});
b.Header=$pdk.extend($pdk.shell.Base,{_name:"Header",_markupClass:"tpHeader",_runtime:"default",_jsViewImpl:"",_markupClass:"tpHeader",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsHeaderImpl(),_asSwf:"header.swf"});
b.ReleaseModel=$pdk.extend($pdk.shell.Base,{_name:"ReleaseModel",_markupClass:"tpReleaseModel",_runtime:"default",_jsViewImpl:"@Bundle:tpReleaseModel.js",_markupClass:"tpReleaseModel",_priority:10,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsReleaseModelImpl(),_asSwf:"releaseModel.swf"});
b.CategoryModel=$pdk.extend($pdk.shell.Base,{_name:"CategoryModel",_markupClass:"tpCategoryModel",_runtime:"default",_jsViewImpl:"",_markupClass:"tpCategoryModel",_priority:50.2,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsCategoryModelImpl(),_asSwf:"categoryModel.swf"});
b.Player=$pdk.extend($pdk.shell.Base,{_name:"Player",_markupClass:"tpPlayer",_runtime:"default",_jsViewImpl:"@Bundle:tpPlayerView.js",_markupClass:"tpPlayer",_priority:5,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsPlayerImpl(),_asSwf:"flvPlayer.swf"});
b.ReleaseList=$pdk.extend($pdk.shell.Base,{_name:"ReleaseList",_markupClass:"tpReleaseList",_runtime:"default",_jsViewImpl:"@Bundle:tpReleaseListView.js",_markupClass:"tpReleaseList",_priority:30,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsReleaseListImpl(),_asSwf:"releaseList.swf"});
b.CategoryList=$pdk.extend($pdk.shell.Base,{_name:"CategoryList",_markupClass:"tpCategoryList",_runtime:"default",_jsViewImpl:"@Bundle:tpCategoryListView.js",_markupClass:"tpCategoryList",_priority:30,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsCategoryListImpl(),_asSwf:"categoryList.swf"});
$pdk.shell.Factory.CLASS_TABLE={tpNavigation:b.Navigation,tpSearch:b.Search,tpClipInfo:b.ClipInfo,tpHeader:b.Header,tpReleaseModel:b.ReleaseModel,tpCategoryModel:b.CategoryModel,tpPlayer:b.Player,tpReleaseList:b.ReleaseList,tpCategoryList:b.CategoryList};
a.search=function(d,c){d=typeof(d)==="undefined"?"":d;
this._regFunc("search",["java.lang.String"],[d],c)
};
a.setClipInfo=function(d,e,c){this._regFunc("setClipInfo",["com.theplatform.pdk.smil.api.shared.data.Clip","boolean"],[d,e],c)
};
a.getDefaultBanners=function(c){this._regFunc("getDefaultBanners",[],[],c)
};
a.getValidRegions=function(c){this._regFunc("getValidRegions",[],[],c)
};
a.showPlayerCard=function(d,g,f,c,e){this._regFunc("showPlayerCard",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[d,g,f,c],e)
};
a.hidePlayerCard=function(c,e,d){this._regFunc("hidePlayerCard",["java.lang.String","java.lang.String"],[c,e],d)
};
a.addPlayerCard=function(g,k,d,j,e,c,f,h){this._regFunc("addPlayerCard",["java.lang.String","java.lang.String","java.lang.String","java.lang.String","java.lang.String","java.lang.String","int"],[g,k,d,j,e,c,f],h)
};
a.showLinkForm=function(d,c){this._regFunc("showLinkForm",["java.lang.Boolean"],[d],c)
};
a.getNextRelease=function(e,c,d){this._regFunc("getNextRelease",["java.lang.Boolean","java.lang.Boolean"],[e,c],d)
};
a.clearCategorySelection=function(c){this._regFunc("clearCategorySelection",[],[],c)
};
a.setBandwidthPreferences=function(d,c){this._regFunc("setBandwidthPreferences",["com.theplatform.pdk.smil.api.shared.data.BandwidthPreferences"],[d],c)
};
a.setSubtitleStyle=function(d,c){this._regFunc("setSubtitleStyle",["com.theplatform.pdk.data.SubtitleStyle"],[d],c)
};
a.setProperty=function(f,d,g,c,e){this._regFunc("setProperty",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[f,d,g,c],e)
};
a.setToken=function(c,e,d){this._regFunc("setToken",["java.lang.String","java.lang.String"],[c,e],d)
};
a.setVariable=function(f,d,g,c,e){this._regFunc("setVariable",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[f,d,g,c],e)
};
a.getAnnotations=function(c){this._regFunc("getAnnotations",[],[],c)
};
a.playNext=function(e,c,d){this._regFunc("playNext",["java.lang.Boolean","java.lang.Boolean"],[e,c],d)
};
a.useDefaultLinkForm=function(c,d){this._regFunc("useDefaultLinkForm",["java.lang.Boolean"],[c],d)
};
a.disablePlayerControls=function(c,d,e){this._regFunc("disablePlayerControls",["java.lang.Boolean","java.lang.String[]"],[c,d],e)
};
a.getCurrentRange=function(c){this._regFunc("getCurrentRange",[],[],c)
};
a.getNextClip=function(c){this._regFunc("getNextClip",[],[],c)
};
a.cancelMedia=function(c,d){this._regFunc("cancelMedia",["java.lang.Object"],[c],d)
};
a.getBandwidthPreferences=function(c){this._regFunc("getBandwidthPreferences",[],[],c)
};
a.clearCurrentRelease=function(c){this._regFunc("clearCurrentRelease",[],[],c)
};
a.mute=function(d,c){this._regFunc("mute",["java.lang.Boolean"],[d],c)
};
a.pause=function(c,d,e){this._regFunc("pause",["java.lang.Boolean","java.lang.Boolean"],[c,e],d)
};
a.removeAnnotation=function(c,d){this._regFunc("removeAnnotation",["com.theplatform.pdk.data.Annotation"],[c],d)
};
a.setCurrentReleaseList=function(d,c){this._regFunc("setCurrentReleaseList",["java.lang.String"],[d],c)
};
a.setVideoScalingMethod=function(d,c){this._regFunc("setVideoScalingMethod",["java.lang.String"],[d],c)
};
a.suspendPlayAll=function(d,c){this._regFunc("suspendPlayAll",["java.lang.Boolean"],[d],c)
};
a.previousClip=function(c){this._regFunc("previousClip",[],[],c)
};
a.setVolume=function(d,c){this._regFunc("setVolume",["java.lang.Number"],[d],c)
};
a.previewRefreshReleaseModel=function(c,l,e,f,d,j,k,g,h){this._regFunc("previewRefreshReleaseModel",["java.lang.String","java.lang.String","com.theplatform.pdk.data.Sort","com.theplatform.pdk.data.Range","java.lang.String[]","java.lang.String[]","java.lang.String[]","java.lang.String"],[c,l,e,f,d,j,g,h],k)
};
a.seekToPercentage=function(d,c){this._regFunc("seekToPercentage",["java.lang.Number"],[d],c)
};
a.hidePlayerRegions=function(d,c,e){this._regFunc("hidePlayerRegions",["java.lang.Boolean","java.lang.String[]"],[d,c],e)
};
a.setSmil=function(c,d){this._regFunc("setSmil",["java.lang.String"],[c],d)
};
a.nextClip=function(c){this._regFunc("nextClip",[],[],c)
};
a.loadSmil=function(d,c,e){this._regFunc("loadSmil",["java.lang.String","java.lang.Boolean"],[d,c],e)
};
a.setPlayerMessage=function(e,c,d){this._regFunc("setPlayerMessage",["java.lang.String","java.lang.Number"],[e,c],d)
};
a.setShowSubtitles=function(c,d){this._regFunc("setShowSubtitles",["java.lang.Boolean"],[c],d)
};
a.resetPlayer=function(c){this._regFunc("resetPlayer",[],[],c)
};
a.getSubtitleStyle=function(c){this._regFunc("getSubtitleStyle",[],[],c)
};
a.endCurrentRelease=function(c){this._regFunc("endCurrentRelease",[],[],c)
};
a.clearAnnotations=function(c){this._regFunc("clearAnnotations",[],[],c)
};
a.seekToPosition=function(c,d){this._regFunc("seekToPosition",["java.lang.Number"],[c],d)
};
a.clickPlayButton=function(c){this._regFunc("clickPlayButton",[],[],c)
};
a.setClipInfo=function(d,e,c){this._regFunc("setClipInfo",["com.theplatform.pdk.smil.api.shared.data.Clip","java.lang.Boolean"],[d,e],c)
};
a.previewNextRefreshReleaseModel=function(c){this._regFunc("previewNextRefreshReleaseModel",[],[],c)
};
a.setExpandVideo=function(d,c){this._regFunc("setExpandVideo",["java.lang.String"],[d],c)
};
a.getUseDefaultPlayOverlay=function(c){this._regFunc("getUseDefaultPlayOverlay",[],[],c)
};
a.refreshReleaseModel=function(c,l,e,f,d,j,k,g,h){this._regFunc("refreshReleaseModel",["java.lang.String","java.lang.String","com.theplatform.pdk.data.Sort","com.theplatform.pdk.data.Range","java.lang.String[]","java.lang.String[]","java.lang.String[]","java.lang.String"],[c,l,e,f,d,j,g,h],k)
};
a.loadRelease=function(c,d,e){this._regFunc("loadRelease",["com.theplatform.pdk.data.Release","java.lang.Boolean"],[c,d],e)
};
a.addAnnotation=function(c,d){this._regFunc("addAnnotation",["com.theplatform.pdk.data.Annotation"],[c],d)
};
a.playPrevious=function(d,c){this._regFunc("playPrevious",["java.lang.Boolean"],[d],c)
};
a.clearPlayerMessage=function(c){this._regFunc("clearPlayerMessage",[],[],c)
};
a.setReleaseURL=function(d,c,e){this._regFunc("setReleaseURL",["java.lang.String","java.lang.Boolean"],[d,c],e)
};
a.trace=function(e,d,f,c){this._regFunc("trace",["java.lang.String","java.lang.String","java.lang.Number"],[e,d,f],c)
};
a.clearAdCookie=function(c){this._regFunc("clearAdCookie",[],[],c)
};
a.useDefaultEmailForm=function(c,d){this._regFunc("useDefaultEmailForm",["java.lang.Boolean"],[c],d)
};
a.getSubtitleLanguage=function(c,d){this._regFunc("getSubtitleLanguage",["java.lang.String"],[c],d)
};
a.setSubtitleLanguage=function(d,c){this._regFunc("setSubtitleLanguage",["java.lang.String"],[d],c)
};
a.showEmailForm=function(d,c){this._regFunc("showEmailForm",["java.lang.Boolean"],[d],c)
};
a.showFullScreen=function(c,d){this._regFunc("showFullScreen",["java.lang.Boolean"],[c],d)
};
a.useDefaultPlayOverlay=function(c,d){this._regFunc("useDefaultPlayOverlay",["java.lang.Boolean"],[c],d)
};
a.refreshCategoryModel=function(d,c,e){this._regFunc("refreshCategoryModel",["java.lang.String","java.lang.String"],[d,e],c)
};
a.getPlayerVariables=function(d,c){this._regFunc("getPlayerVariables",["java.lang.String[]"],[d],c)
};
a.loadReleaseURL=function(c,d,e){this._regFunc("loadReleaseURL",["java.lang.String","java.lang.Boolean"],[c,d],e)
};
a.setRelease=function(c,d,e){this._regFunc("setRelease",["com.theplatform.pdk.data.Release","java.lang.Boolean"],[c,d],e)
};
a.setPreviewImageUrl=function(c,d){this._regFunc("setPreviewImageUrl",["java.lang.String"],[c],d)
};
a.nextRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("nextRange",["boolean"],[d],c)
};
a.firstRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("firstRange",["boolean"],[d],c)
};
a.previousRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("previousRange",["boolean"],[d],c)
};
a.getCurrentRange=function(c){this._regFunc("getCurrentRange",[],[],c)
}
};
(function(h,e){var d,c,b,g,j,a,f,k;
if(typeof(window.__tp_pdk_set_versions)==="function"){window.__tp_pdk_set_versions();
if(typeof(window.console)==="object"){console.log("thePlatform PDK");
console.log($pdk.version.toString())
}}e=typeof(e)==="boolean"?e:false;
if(!e){g=$pdk.env.Detect.getInstance();
j=new $pdk.env.HttpHead.Processor(g);
j.process(document);
if(typeof(g.baseDir())!=="string"||g.baseDir().length<1){if(typeof(window.console)==="object"&&console.error){console.error("No PDK base URL could be detected. Asynchronous load of PDK requies a tp:baseUrl meta tag.")
}}if($pdk.isIE){document.createElement("video")
}c=g.getConfigSet("enableexternalcontroller");
c=$pdk.isEmpty(c)?[]:c.toArray();
c=c.length<1?"false":c[0];
c=c.toLowerCase()==="true";
window.tpCommID="communicationwidget";
window.tpBridgeID=typeof(window.tpCommID)==="string"?window.tpCommID:"unknown";
b=$pdk.Entrypoint.getInstance();
a=$pdk.shell.Registry.getInstance();
f=new $pdk.shell.SwfSerializedLoader();
a.bind(f);
h.tpController=new $pdk.queue.Controller(g);
$pdk.interfaces.expose(h,h.tpController);
if(g.getAutoInitialize()){b.injectLoadingStyle($pdk.isDomReady())
}if(window.tpTraceListener===undefined){window.tpTraceListener=function(m){var l=m.data;
if(l){tpTrace(l.message,l.timestamp,l.controllerId,l.className,l.level)
}};
tpController.addEventListener("OnPdkTrace",window.tpTraceListener)
}h.tpController.onControllerComplete=function(){f.onSwfReady()
};
b.configure(a,g);
$pdk.controller=h.tpController;
$pdk.initialize=function(){b.initialize()
};
$pdk.getConfiguration=function(l){return a.getShells().get(l)
};
$pdk.gwtBootloader(g);
if(c){new $pdk.queue.IFrameListener()
}}}(window,window._PDK_SUPRESS_AUTOINIT));