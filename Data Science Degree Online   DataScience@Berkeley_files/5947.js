if(typeof CE2=="undefined"){CE2={}}CE2.ignoredElements=[];CE2.clickCaptors=[];CE2.d=document;CE2.w=window;CE2.n=navigator;CE2.p={};(function(){var b=CE2.n.userAgent;if(/\bMSIE\b/.test(b)){CE2.ie=1;CE2.ieVersion=parseInt(/MSIE (\d+)\.\d+/.exec(b)[1],10);CE2.ieQuirksMode=(CE2.d.compatMode=="BackCompat")}})();CE2.ignore=function(b){if(!b){return}CE2.ignoredElements.push(b);if(CE2.tracker){CE2.tracker.ignoredElements.push(b)}};CE2.capture=function(b){CE2.clickCaptors.push(b);if(CE2.tracker){CE2.tracker.clickCaptors.push(b)}};CE2.findMatchingSnapshot=function(j,l,m){var n,k,h,i;for(k=0;h=j[k++];){n=Math.floor(new Date().getTime()/1000);if(h.e&&h.e<=n){continue}if(m&&!/n/.test(h.o||"")){continue}if(CE2.matchURL(h.u,m||l,h.o,h.d,CE2.n.userAgent)){if(h.s&&h.s>n){CE2.p[h.id]=h}else{if(!i){i=h}}}}return i};CE2.startTracking=function(d){if(!CE2.sampleVisit(d)){return}CE2.testID=d.id;CE2.testVersion=d.v||1;var e=CE2.d.createElement("script");var f=CE2.w.location.protocol=="https:"?CE2.TRACKING_SCRIPT_SECURE:CE2.TRACKING_SCRIPT;if(CE2.ie){f=f.replace(/t(\.prerelease)?\.js/,"tu$1.js")}e.src=f+"?s="+d.id+"&t="+(new Date().getTime());e.type="text/javascript";e.async=true;CE2.d.body.appendChild(e)};CE2.unescape=function(d){try{return decodeURIComponent(d)}catch(c){return unescape(d)}};CE2.qs2obj=function(h){if(h==null||/^\s*$/.test(h)){return null}var i={},k=null,j=h.replace(/\+/g," ").split("&");for(var l=0,g=j.length;l<g;l++){k=j[l].split("=");if(!k[0]){continue}i[CE2.unescape(k[0])]=k[1]==null?null:CE2.unescape(k[1])}return i};CE2.each=function(j,l,h){if(!j){return}var k;if(typeof j.length=="number"&&typeof j.concat=="function"){for(var m=0,i=j.length;m<i;m++){k=j[m];if(l.call(h,k,m)===false){break}}}else{var n;for(n in j){k=j[n];if(k!==Object.prototype[n]){if(l.call(h,k,n)===false){break}}}}};CE2.indexOf=function(g,h,j){var i,f;for(i=j||0,f=g.length;i<f;i++){if(g[i]===h){return i}}return -1};CE2.listen=CE2.addListener=function(f,e,d){if(f.addEventListener){f.addEventListener(e,d,true)}else{f.attachEvent("on"+e,d)}};CE2.removeListener=function(f,e,d){if(f.removeEventListener){f.removeEventListener(e,d,true)}else{f.detachEvent("on"+e,d)}};CE2.userData={};CE2.set=function(d,c){d=parseInt(d,10);if(1<=d&&d<=5){CE2.userData[d]=String(c)}};CE2.click=function(){if(CE2.tracker){return CE2.tracker.click.apply(CE2.tracker,arguments)}};CE2.getBox=function(){};CE2.sampleVisit=function(b){if(b.r==null){return true}if(b.r===false||b.r===true){return b.r}if(Math.random()>=1/b.r){b.r=false;return false}else{b.r=true;return true}};if(typeof CE2=="undefined"){CE2={}}CE2.READY_STATE_PATTERN=CE2.ie?/complete/:/complete|interactive/;CE2.autoStart=(typeof CE_MANUAL_START=="undefined"||!CE_MANUAL_START);CE2.domReady=(document.readyState&&CE2.READY_STATE_PATTERN.test(document.readyState));CE2.domReadyListeners=[];CE2.onDOMReady=function(b){if(CE2.domReady){return setTimeout(b,1)}CE2.domReadyListeners.push(b)};CE2.domReadySetup=function(){var c=function(g){var b,h;var a=CE2.domReadyListeners;while(a.length>0){a.pop().call()}CE2.domReady=true};if(CE2.domReady){c()}CE2.listen(window,"load",c);if(document.addEventListener){CE2.listen(document,"DOMContentLoaded",c)}if(document.readyState){var d=CE2.READY_STATE_PATTERN;(function(){if(d.test(document.readyState)){c()}else{setTimeout(arguments.callee,10)}})()}};if(CE2.autoStart){CE2.domReadySetup()}if(typeof CE2=="undefined"){CE2={}}CE2.matchURL=function(O,E,N,K,l){var L=/(default|index)($|\..*)/i,M=false,U,I,J,G,i,P,T,S,B,R,Q,V,H,e,D,F;if(!(O&&E)){return false}if(K&&CE2.indexOf(K,CE2.deviceType(l))<0){return false}N=N||"";if(/n/.test(N)){return O===E}if(/[re]/.test(N)){try{return new RegExp(O,"i").test(E)}catch(C){return false}}U=new CE2.URI(E.toLowerCase());if(/h/.test(N)&&((O.protocol)!=U.protocol)){return false}J=U.host;I=J.replace(/^www\./,"");S=O.host;B=O.ihost;if(/w/.test(N)&&(J!=S&&J!=B)){return false}if(I!=S.replace(/^www\./,"")&&I!=(B&&B.replace(/^www\./,""))){return false}if(!O.path){R="/"}else{R=O.path}G=U.path;if(R!=G){if(/\//.test(N)){return false}Q=R.split("/");i=G.split("/");for(D=0,F=Math.max(Q.length,i.length);D<F;D++){if(!Q[D]){Q[D]=""}if(!i[D]){i[D]=""}if(D==F-1){Q[D]=Q[D].replace(L,"");i[D]=i[D].replace(L,"")}if(Q[D]!=i[D]){return false}}}P=U.qs;e=/\?/.test(N);V=O.qs||"";if((e&&P&&!V)||(!P&&V)){return false}CE2.each(V,function(a,b){if(P[b]!==a){M=true;return false}});if(M){return false}if(e){CE2.each(P,function(a,b){if(a!=V[b]){return(M=true)}});if(M){return false}}H=O.hash||"";T=U.hash||"";e=/#/.test(N);if((e||H)&&H!=T){return false}return true};if(typeof CE2=="undefined"){CE2={}}if(typeof(CE2.URI)=="undefined"){CE2.URI=function(c){this.src=c;this.protocol=this.host=this.port=this.path=this.qs=this.hash=this.query=null;if(c){var d=typeof(c);if(d=="string"){this.initWithString(c)}else{if(d=="object"){this.initWithURI(c)}}}};CE2.URI.pattern=/^\s*([\S]+?:\/\/)?([^\s\/]+?@)?([^:\/\?\#]+)?(\:\d+)?(\/?[^#\?\s]*)?([\?][^#\s]*)?([#]\S+)?/i;CE2.URI.prototype={initWithString:function(k){var l,i,m,j,n,o;var p=CE2.URI.pattern.exec(k);if(!p[1]&&k.charAt(0)!="/"){this.path=CE2.unescape((p[3]||"")+(p[5]||""))}else{if(l=p[1]){this.protocol=l.substr(0,l.indexOf(":"))}this.host=p[3]||null;if(i=p[4]){this.port=Number(i.substr(1))}if(m=p[5]){this.path=CE2.unescape(m)}else{if(this.host){this.path="/"}}}this.query=p[6]&&(p[6]+"").replace("?","");if(j=p[6]){this.qs=CE2.qs2obj(j.substr(1))}if(n=p[7]){this.hash=CE2.unescape(n.substr(1))}},initWithURI:function(b){CE2.each(b,function(d,a){this[a]=d},this)},isAbsolute:function(){return this.isURL()||(this.path&&this.path.charAt(0)=="/")},isURL:function(){return this.protocol&&this.host}}}CE2.TRACKING_SCRIPT="http://trk.cetrk.com/t.js";CE2.TRACKING_SCRIPT_SECURE="https://s3.amazonaws.com/trk.cetrk.com/t.js";CE2.TRACKING_DEST="http://trk.cetrk.com/";CE2.TRACKING_DEST_SECURE="https://s3.amazonaws.com/trk.cetrk.com/";CE2.uid=115947;CE2.snapshots="%8&4!}%|%]!}$<$2$2$4$;$;$5$7$,!}&&!}$<!}&%!}$,!}&-!}$<!}%+&(&,%|&$%|&3%^&!&2!{%)$_$^!{%0$|%,!{$_&-&,&,&&&%!{%1%^&+&,$<!{%3%?&*%|%?&,%|&&&%!{!~$3!}$,!}&.!}$<$5$,!}%^!}$<$2$5$3$9$;$6$3$2$2$6&6$,&4!}%|%]!}$<$;$6$2$4$4$8$,!}&&!}$<!}&%!}$,!}&-!}$<!}%+&(&,%|&$%|&3%^&!&2!{%.&&&+&+%|%^&*!{$0!{&(%?&*&,&%%^&*&+!{%(%,$<!{%+&*%|%`%|&%%?&!!}$,!}&.!}$<$5$,!}%^!}$<$2$5$2$8$2$1$1$6$1$4&6$,&4!}%|%]!}$<$;$6$2$4$3$9$,!}&&!}$<!}&%!}$,!}&-!}$<!}%+&(&,%|&$%|&3%^&!&2!{%.&&&+&+%|%^&*!{%+&%&!%|&%%^!{%[&&&*&(&&&*%?&,%^$.%!%1%)%($<!{%+&*%|%`%|&%%?&!!}$,!}&.!}$<$5$,!}%^!}$<$2$5$2$8$2$1$1$4$8$5&6$,&4!}%|%]!}$<$2$2$5$3$3$8$2$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0%_%?&$%|&!&2$-&%&-&*&+%^$-&(&*%?%[&,%|&,%|&&&%%^&*$-%_&%&($0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^$.&%&-&*&+%|&%%`$.%`%^&&&*%`%^&,&&&0&%$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$5$6$6$5$8$7$1$1&6$,&4!}%|%]!}$<$2$2$7$9$9$2$9$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0&$%?&+&,%^&*$-&&%_$-%?&*&,&+$-%|&%$-&,%^%?%[%{%|&%%`$-&(&*&&%`&*%?&$$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$;$1$;$3$1$1&6$,&4!}%|%]!}$<$2$2$7$9$9$3$1$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0&$%?&+&,%^&*$-&&%_$-%?&*&,&+$-%|&%$-&,%^%?%[%{%|&%%`$-&(&*&&%`&*%?&$$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$;$1$;$3$1$1&6$,&4!}%|%]!}$<$2$2$8$1$;$2$2$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0$8$-&+&,%^&(&+$-&,&&$-%@%^%[&&&$%^$-%?$-&,%^%?%[%{%^&*$-%|&%$-%[%?&!%|%_&&&*&%%|%?$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$2$1$1$3$9$1$1&6$,&4!}%|%]!}$<$2$2$7$9$9$3$3$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0&$%?&+&,%^&*&+$-&&%_$-%^%]&-%[%?&,%|&&&%$-&(&*&&%`&*%?&$$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$;$1$;$3$1$1&6$,&4!}%|%]!}$<$2$1$8$1$;$3$1$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0&$%~&,%`$-&$%?%|&%$0&+%^&($0%|&%%]%^&1$.%{&,&$&!!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}%^&1&(%^&*%|%^&%%[%^$.&&&%&!%|&%%^&$%@%?$.&-&%%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$5$1$7$;$9$5$1$1&6$,&4!}%|%]!}$<$2$2$6$;$6$;$8$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0&,%^%?%[%{$2$1$1$-&$%^&%&,&&&*$0%?%]&.%|%[%^$-%_&&&*$-&%%^&0$-&,%^%?%[%{%^&*&+!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&,%^%?%[%{$.%[&&&$!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$4$2$9$9$1$1&6$,&4!}%|%]!}$<$2$2$5$3$3$8$7$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0&$&+&%$0&&&.%^&*&.%|%^&0$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^&%&-&*&+%|&%%`$.&+%|&$&$&&&%&+$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$2$;$2$;$;$3$1$1&6$,&4!}%|%]!}$<$2$2$7$9$9$3$2$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0&,%^&+&&&!$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$;$1$;$3$1$1&6$,&4!}%|%]!}$<$2$2$7$9$9$3$6$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%?%]%^&$%|%[&+$0%^%]%]$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$;$1$;$3$1$1&6$,&4!}%|%]!}$<$2$2$3$5$8$6$4$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0%?%[%[&&&-&%&,%|&%%`$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^%@&-&+%|&%%^&+&+$.&+&2&*$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$4$1$9$5$5$1$1&6$,&4!}%|%]!}$<$2$2$5$2$;$2$7$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^$.&%&-&*&+%|&%%`$.%`%^&&&*%`%^&,&&&0&%$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$1$5$3$1$5$1$1&6$,&4!}%|%]!}$<$2$2$3$4$5$9$6$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}%[&&&-&%&+%^&!%|&%%`$.&%&&&*&,%{&0%^&+&,%^&*&%$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$5$2$1$5$8$7$1$1&6$,&4!}%|%]!}$<$2$2$9$4$;$7$6$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0&$%@%?$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^%@&-&+%|&%%^&+&+$.&+&2&*$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$9$4$8$3$9$1$1&6$,&4!}%|%]!}$<$2$2$3$5$8$5$9$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0&$%@%?$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^%@&-&+%|&%%^&+&+$.&+&2&*$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$4$1$9$5$5$1$1&6$,&4!}%|%]!}$<$2$2$5$3$3$7$9$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&(&-%@&!%|%[%{%^%?&!&,%{&&&%&!%|&%%^$.%`&0&-$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$4$2$1$7$1$1$1&6$,&4!}%|%]!}$<$2$2$5$3$3$8$5$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^&%&-&*&+%|&%%`$.&+%|&$&$&&&%&+$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$5$4$7$5$7$9$1$1&6$,&4!}%|%]!}$<$2$2$4$3$4$2$8$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}%]%?&,%?&+%[%|%^&%%[%^$.%@%^&*%~%^&!%^&2$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$2$9$6$9$1$1$1$1&6$,&4!}%|%]!}$<$9$;$2$2$2$9$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&+&&%[%|%?&!&0&&&*%~$.&+%|&$&$&&&%&+$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$4$3$8$2$7$1$1&6$,&4!}%|%]!}$<$2$2$9$6$8$7$1$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&*&&&+&+%|%^&*&&&%&!%|&%%^$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$3$1$3$9$9$1$1&6$,&4!}%|%]!}$<$2$2$3$7$7$2$8$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^&!%?&0$.&0&-&+&,&!$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$2$9$2$5$9$1$1$1&6$,&4!}%|%]!}$<$2$2$9$6$8$6$9$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}%]%?&,%?&+%[%|%^&%%[%^$.&+&$&-$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$3$1$3$9$9$1$1&6$,&4!}%|%]!}$<$9$6$2$;$6$3$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(&+!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^&$&(%?$.&-&%%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$3$1$9$2$;$3$1$1&6$,&4!}%|%]!}$<$2$2$3$9$4$2$7$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&&&%&!%|&%%^&$%@%?$.&-&%%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$4$3$3$;$;$7$1$1&6$,&4!}%|%]!}$<$;$5$9$2$1$1$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&$&+&0$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$2$8$4$7$7$9$1$1&6$,&4!}%|%]!}$<$2$2$3$5$8$4$1$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&$&+&0$.&-&+%[$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$2$9$1$6$5$5$1$1&6$,&4!}%|%]!}$<$2$2$5$3$3$8$;$,!}&-!}$<&4!}&(%?&,%{!}$<!}$0!}$,!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&$%{%?$.%`&0&-$.%^%]&-!}&6$,!}&.!}$<$5$,!}%^!}$<$2$5$5$4$7$5$7$9$1$1&6%;";CE2.dontTrack=function(){if(CE2.ie&&typeof CE2.w.external!="undefined"){try{if(CE2.w.external.InPrivateFilteringEnabled()==true){return true}}catch(c){}}var d=CE2.d.doNotTrack||CE2.n.doNotTrack||CE2.n.msDoNotTrack;return(d=="1"||d=="yes")};CE2.userMain=function(){var snapshots=CE2.snapshots;if(CE2.dontTrack()){return}CE2.testID=CE2.testVersion=null;var unstr=(function(){var digits="!$%&()*+,-.0123456789;<=>?@[]^_`{|}~",tr={},i;for(i=0;i<digits.length;i++){tr[digits.charAt(i)]=i.toString(36)}return tr})();var unsi=function(string){return parseInt(string.replace(/./g,function(m){return unstr[m]}),36)};var unss=function(string){var chars=[],re=/(![^:\/a-z])|([^:\/a-z]{2})|(:[^:\/a-z]{3})|(\/[^:\/a-z]{4})/ig,match;while((match=re.exec(string))!=null){if(match[1]||match[2]){chars.push(unsi(match[0]))}else{if(match[3]){chars.push(unsi(match[3].substr(1)))}else{if(match[4]){chars.push(unsi(match[4].substr(1)))}}}}return String.fromCharCode.apply(null,chars)};if(typeof snapshots=="string"&&typeof unss=="function"){snapshots=eval("("+unss(snapshots)+")")}var monitor=function(){try{var snapshot=CE2.findMatchingSnapshot(snapshots,CE2.w.location.href,typeof CE_SNAPSHOT_NAME=="string"&&CE_SNAPSHOT_NAME);if(snapshot){if(snapshot.id!=CE2.testID){CE2.startTracking(snapshot);if(typeof CE2.badge!="undefined"){CE2.badge()}}}else{CE2.testID=CE2.testVersion=null;if(CE2.tracker){CE2.tracker.cleanup();CE2.tracker=null}}}catch(e){}};monitor();if(CE2.autoStart){CE2.monitorInterval=setInterval(monitor,1000)}};if(CE2.autoStart){CE2.onDOMReady(CE2.userMain)}if(typeof CE_READY=="function"){CE2.onDOMReady(CE_READY)}else{if(typeof CE_READY=="object"){CE2.onDOMReady(function(){CE2.each(CE_READY,function(b){if(typeof b=="function"){b()}})})}};