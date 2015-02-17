/*!CK:2133449294!*//*1423528592,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Zfubf"]); }

__d("PerfXClientMetricsConfig",[],function(a,b,c,d,e,f){e.exports={LOGGER_CONFIG:"PerfXClientMetricsLoggerConfig"};},null);
__d("BanzaiLogger",["Banzai"],function(a,b,c,d,e,f,g){var h='logger';function i(k){return {log:function(l,m){g.post(h+':'+l,m,k);}};}var j=i();j.create=i;e.exports=j;},null);
__d("FbtLoggerImpl",["BanzaiLogger"],function(a,b,c,d,e,f,g){var h={logImpression:function(i){g.log('FbtImpressionsLoggerConfig',{hash:i,sample_rate:100});}};e.exports=h;},null);
__d("sourceMetaToString",[],function(a,b,c,d,e,f){function g(h,i){var j;if(h.name){j=h.name;if(h.module)j=h.module+'.'+j;if(i&&h.line){j+=':'+h.line;if(h.column)j+=':'+h.column;}}return j;}e.exports=g;},null);
__d("getContextualParent",["ge"],function(a,b,c,d,e,f,g){function h(i,j){var k,l=false;do{if(i.getAttribute&&(k=i.getAttribute('data-ownerid'))){i=g(k);l=true;}else i=i.parentNode;}while(j&&i&&!l);return i;}e.exports=h;},null);
__d("collectDataAttributes",["getContextualParent"],function(a,b,c,d,e,f,g){function h(i,j){var k={},l={},m=j.length,n;for(n=0;n<m;++n){k[j[n]]={};l[j[n]]='data-'+j[n];}var o={tn:'',"tn-debug":','};while(i){if(i.getAttribute)for(n=0;n<m;++n){var p=i.getAttribute(l[j[n]]);if(p){var q=JSON.parse(p);for(var r in q)if(o[r]!==(void 0)){if(k[j[n]][r]===(void 0))k[j[n]][r]=[];k[j[n]][r].push(q[r]);}else if(k[j[n]][r]===(void 0))k[j[n]][r]=q[r];}}i=g(i);}for(var s in k)for(var t in o)if(k[s][t]!==(void 0))k[s][t]=k[s][t].join(o[t]);return k;}e.exports=h;},null);
__d("legacy:onload-action",["OnloadHooks"],function(a,b,c,d,e,f,g){a._onloadHook=g._onloadHook;a._onafterloadHook=g._onafterloadHook;a.runHook=g.runHook;a.runHooks=g.runHooks;a.keep_window_set_as_loaded=g.keepWindowSetAsLoaded;},3);
__d("ClickRefUtils",[],function(a,b,c,d,e,f){var g={get_intern_ref:function(h){if(!!h){var i={profile_minifeed:1,gb_content_and_toolbar:1,gb_muffin_area:1,ego:1,bookmarks_menu:1,jewelBoxNotif:1,jewelNotif:1,BeeperBox:1,searchBarClickRef:1};for(var j=h;j&&j!=document.body;j=j.parentNode){if(!j.id||typeof j.id!=='string')continue;if(j.id.substr(0,8)=='pagelet_')return j.id.substr(8);if(j.id.substr(0,8)=='box_app_')return j.id;if(i[j.id])return j.id;}}return '-';},get_href:function(h){var i=(h.getAttribute&&(h.getAttribute('ajaxify')||h.getAttribute('data-endpoint'))||h.action||h.href||h.name);return typeof i==='string'?i:null;},should_report:function(h,i){if(i=='FORCE')return true;if(i=='INDIRECT')return false;return h&&(g.get_href(h)||(h.getAttribute&&h.getAttribute('data-ft')));}};e.exports=g;},null);
__d("setUECookie",["Env"],function(a,b,c,d,e,f,g){function h(i){if(!g.no_cookies)document.cookie="act="+encodeURIComponent(i)+"; path=/; domain="+window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}e.exports=h;},null);
__d("ClickRefLogger",["Arbiter","Banzai","ClickRefUtils","EagleEye","Env","ScriptPath","Vector","$","collectDataAttributes","copyProperties","ge","pageID","setUECookie"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t={delay:0,retry:true};function u(y){if(!q('content'))return [0,0,0,0];var z=n('content'),aa=m.getEventPosition(y);return [aa.x,aa.y,z.offsetLeft,z.clientWidth];}function v(y,z,event,aa){var ba='r',ca=[0,0,0,0],da,ea;if(!!event){da=event.type;if(da=='click'&&q('content'))ca=u(event);var fa=0;event.ctrlKey&&(fa+=1);event.shiftKey&&(fa+=2);event.altKey&&(fa+=4);event.metaKey&&(fa+=8);if(fa)da+=fa;}if(!!z)ea=i.get_href(z);var ga=o(!!event?(event.target||event.srcElement):z,['ft','gt']);p(ga.ft,aa.ft||{});p(ga.gt,aa.gt||{});if(typeof(ga.ft.ei)==='string')delete ga.ft.ei;var ha=[y._ue_ts,y._ue_count,ea||'-',y._context,da||'-',i.get_intern_ref(z),ba,a.URI?a.URI.getRequestURI(true,true).getUnqualifiedURI().toString():location.pathname+location.search+location.hash,ga].concat(ca).concat(r).concat(l.getScriptPath());return ha;}g.subscribe("ClickRefAction/new",function(y,z){if(i.should_report(z.node,z.mode)){var aa=v(z.cfa,z.node,z.event,z.extra_data);s(z.cfa.ue);if(h.isEnabled('click_ref_logger')){var ba=[j.getSessionID(),Date.now(),'act'];h.post('click_ref_logger',Array.prototype.concat(ba,aa),t);}else j.log('act',aa);}});function w(y){function z(ha){var ia='';for(var ja=0;ja<ha.length;ja++)ia+=String.fromCharCode(1^ha.charCodeAt(ja));return ia;}function aa(ha,ia,ja,ka){var la=ia[ja];if(la&&ha&&la in ha)if(ja+1<ia.length){aa(ha[la],ia,ja+1,ka);}else{var ma=ha[la],na=function(){setTimeout(ka.bind(null,arguments));return ma.apply(this,arguments);};na.toString=ma.toString.bind(ma);Object.defineProperty(ha,la,{configurable:false,writable:true,value:na});}}var ba={},ca={},da=false;function ea(ha,ia){if(ca[ha])return;ca[ha]=ba[ha]=1;}var fa=y[z('jiri')];if(fa){var ga=[];z(fa).split(',').map(function(ha,ia){var ja=ha.substring(1).split(':'),ka;switch(ha.charAt(0)){case '1':ka=new RegExp('\\b('+ja[0]+')\\b','i');ga.push(function(la){var ma=ka.exec(Object.keys(window));if(ma)ea(ia,''+ma);});break;case '2':ka=new RegExp(ja[0]);aa(window,ja,2,function(la){var ma=la[ja[1]];if(typeof ma==='string'&&ka.test(ma))ea(ia,ha);});break;case '3':aa(window,ja,0,function(){for(var la=ga.length;la--;)ga[la]();var ma=Object.keys(ba);if(ma.length){ba={};setTimeout(h[z('qnru')].bind(h,z('islg'),{m:''+ma}),5000);}});break;case '4':da=true;break;}});}}try{w(k);}catch(x){}},null);
__d("PostLoadJS",["Bootloader","Run","emptyFunction"],function(a,b,c,d,e,f,g,h,i){function j(l,m){h.onAfterLoad(function(){g.loadModules.call(g,[l],m);});}var k={loadAndRequire:function(l){j(l,i);},loadAndCall:function(l,m,n){j(l,function(o){o[m].apply(o,n);});}};e.exports=k;},null);
__d("ScriptPathState",["Arbiter"],function(a,b,c,d,e,f,g){var h,i,j,k,l=100,m={setIsUIPageletRequest:function(n){j=n;},setUserURISampleRate:function(n){k=n;},reset:function(){h=null;i=false;j=false;},_shouldUpdateScriptPath:function(){return (i&&!j);},_shouldSendURI:function(){return (Math.random()<k);},getParams:function(){var n={};if(m._shouldUpdateScriptPath()){if(m._shouldSendURI()&&h!==null)n.user_uri=h.substring(0,l);}else n.no_script_path=1;return n;}};g.subscribe("pre_page_transition",function(n,o){i=true;h=o.to.getUnqualifiedURI().toString();});e.exports=a.ScriptPathState=m;},null);
__d("UserActionHistory",["Arbiter","ClickRefUtils","ScriptPath","throttle","WebStorage"],function(a,b,c,d,e,f,g,h,i,j,k){var l={click:1,submit:1},m=false,n={log:[],len:0},o=j.acrossTransitions(function(){try{m._ua_log=JSON.stringify(n);}catch(r){m=false;}},1000);function p(){var r=k.getSessionStorage();if(r){m=r;m._ua_log&&(n=JSON.parse(m._ua_log));}else m=false;n.log[n.len%10]={ts:Date.now(),path:'-',index:n.len,type:'init',iref:'-'};n.len++;g.subscribe("UserAction/new",function(s,t){var u=t.ua,v=t.node,event=t.event;if(!event||!(event.type in l))return;var w={path:i.getScriptPath(),type:event.type,ts:u._ue_ts,iref:h.get_intern_ref(v)||'-',index:n.len};n.log[n.len++%10]=w;m&&o();});}function q(){return n.log.sort(function(r,s){return (s.ts!=r.ts)?(s.ts-r.ts):(s.index-r.index);});}p();e.exports={getHistory:q};},null);
__d("PerfXLogger",["Arbiter","BanzaiLogger","PerfXClientMetricsConfig","Run","performance"],function(a,b,c,d,e,f,g,h,i,j,k){var l={},m='BigPipe/init',n='tti_bigpipe',o='pagelet_event',p='ajaxpipe/onload_callback',q=i.LOGGER_CONFIG,r={},s={listenersSetUp:false,setupListeners:function(){if(this.listenersSetUp)return;g.subscribe(m,function(event,t){var u=t.arbiter;this.subscribeToTTI(u);this.subscribeToPageletEvents(u);this.subscribeToAjaxPipeOnload(u);}.bind(this));this.listenersSetUp=true;},init:function(t,u,v){l[t]={perfx_page:u,perfx_page_type:v};this.setupListeners();},initForPageLoad:function(t,u,v){this.init(t,u,v);j.onAfterLoad(this.finishPageload.bind(this,t));},initForQuickling:function(t,u,v,w){this.init(t,u,v);r[t]=w;},subscribeToTTI:function(t){t.subscribe(n,function(event,u){var v=u.lid;if(!(v in l))return;l[v].tti=u.ts;});},subscribeToPageletEvents:function(t){t.subscribe(o,function(event,u){var v=u.lid;if(!(v in l))return;var w=l[v].e2e;if(!w||w<u.ts)l[v].e2e=u.ts;});},subscribeToAjaxPipeOnload:function(t){t.subscribe(p,function(event,u){this.finishQuickling(u.lid);}.bind(this));},generatePayload:function(t,u){var v=l[t],w=Object.assign({},v);if(!this.adjustAndValidateValues(w,u))return;return w;},getPageloadPayload:function(t){if(!(t in l))return;if(!k.timing){delete l[t];return;}var u=k.timing.navigationStart;return this.generatePayload(t,u);},getQuicklingPayload:function(t){if(!(t in r)||!(t in l))return;if(!k.timing||!k.getEntriesByName){delete r[t];delete l[t];return;}var u=r[t],v=k.getEntriesByName(u);if(v.length===0)return;var w=v[0],x=k.timing.navigationStart+w.startTime;return this.generatePayload(t,x);},finishPageload:function(t){var u=this.getPageloadPayload(t);if(u){this.log(t,u);delete l[t];}},finishQuickling:function(t){var u=this.getQuicklingPayload(t);if(u){this.log(t,u);delete l[t];}},log:function(t,u){u.lid=t;h.log(q,u);},adjustAndValidateValues:function(t,u){var v=['e2e','tti'],w=true;for(var x=0;x<v.length;x++){var y=v[x],z=t[y];if(!z){w=false;break;}t[y]=z-u;}return w;},getPayload:function(t){if(!(t in l))return;var u=l[t].perfx_page_type;if(u==="normal"){return this.getPageloadPayload(t);}else if(u==="quickling")return this.getQuicklingPayload(t);}};e.exports=s;},null);
__d("KappaWrapper",["AsyncSignal","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f,g,h){var i=false;e.exports={forceStart:function(j,k,l){var m=0,n=function(){new g('/si/kappa/',{Ko:"a"}).send();if(++m<j)h(n,(k*1000));};h(n,((k+l)*1000));},start:function(j,k,l){if(!i){i=true;this.forceStart(j,k,l);}}};},null);
__d("Chromedome",["fbt"],function(a,b,c,d,e,f,g){f.start=function(h){if(h.off||top!==window||!/(^|\.)facebook\.com$/.test(document.domain))return;var i=h.stop||"Stop!",j=h.text||"This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or \"hack\" someone's account, it is a scam and will give them access to your Facebook account.",k=h.more||g._("For more information, see {url}.",[g.param("url",'https://www.facebook.com/selfxss')]);if((window.chrome||window.safari)&&!h.textonly){var l='font-family:helvetica; font-size:20px; ';[[i,h.c1||l+'font-size:50px; font-weight:bold; '+'color:red; -webkit-text-stroke:1px black;'],[j,h.c2||l],[k,h.c3||l],['','']].map(function(r){setTimeout(console.log.bind(console,'\n%c'+r[0],r[1]));});}else{var m=['',' .d8888b.  888                       888','d88P  Y88b 888                       888','Y88b.      888                       888',' "Y888b.   888888  .d88b.  88888b.   888','    "Y88b. 888    d88""88b 888 "88b  888','      "888 888    888  888 888  888  Y8P','Y88b  d88P Y88b.  Y88..88P 888 d88P',' "Y8888P"   "Y888  "Y88P"  88888P"   888','                           888','                           888','                           888'],n=(''+j).match(/.{35}.+?\s+|.+$/g),o=Math.floor(Math.max(0,(m.length-n.length)/2));for(var p=0;p<m.length||p<n.length;p++){var q=m[p];m[p]=q+new Array(45-q.length).join(' ')+(n[p-o]||'');}console.log('\n\n\n'+m.join('\n')+'\n\n'+k+'\n');return;}};},null);