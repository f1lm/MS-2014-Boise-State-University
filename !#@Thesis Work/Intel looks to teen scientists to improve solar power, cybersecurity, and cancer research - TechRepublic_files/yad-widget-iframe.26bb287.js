if(!Array.prototype.forEach){Array.prototype.forEach=function(g,b){var d,c;if(this==null){throw new TypeError(" this is null or not defined")}var f=Object(this);var a=f.length>>>0;if(typeof g!=="function"){throw new TypeError(g+" is not a function")}if(arguments.length>1){d=b}c=0;while(c<a){var e;if(c in f){e=f[c];g.call(d,e,c,f)}c++}}}if(typeof YAHOO==="undefined"||!YAHOO){YAHOO={}}YAHOO.i13n=YAHOO.i13n||{};YAHOO.i13n.EventTypes=(function(){var d="richview";var c="contentmodification";function b(g,e,f){this.yqlid=g;this.eventName=e;this.spaceidPrefix=f}b.prototype={getYQLID:function(){return this.yqlid},getEventName:function(){return this.eventName}};var a={pageview:new b("pv","pageview",""),simple:new b("lv","event","P"),linkview:new b("lv","linkview","P"),richview:new b(d,d,"R"),contentmodification:new b(d,c,"R"),dwell:new b("lv","dwell","D")};return{getEventByName:function(e){return a[e]}}})();YAHOO.i13n.Rapid=function(y){if(typeof console==="undefined"||typeof console.log==="undefined"){console={log:function(){}}}if(typeof console.error==="undefined"){console.error=console.log}if(typeof console.warn==="undefined"){console.warn=console.log}function e(){}e.prototype={ser:function(){return j.ser(this.map)},set:function(ab,U){var ac=(U?j.norm(U):U);if(ac===undefined||ac===null){ac=""}if(ac!==null&&j.isStr(ac)){ac=ac.replace(/\\/g,"\\\\")}if(ac.length>j.MAX_VALUE_LENGTH){ac=ac.substring(0,j.MAX_VALUE_LENGTH)}if(j.isValidPair(ab,ac)){this.map[j.norm(ab)]=ac;this.count++}},get:function(U){return this.map[U]},getAll:function(){return this.map},absorb:function(U){if(!U||!j.isObj(U)){return}for(var ab in U){if(j.hasOwn(U,ab)){this.set(ab,U[ab])}}},absorb_filter:function(U,ac){if(!U||!j.isObj(U)){return}for(var ab in U){if(ac&&!ac.call(null,ab)){continue}if(j.hasOwn(U,ab)){this.set(ab,U[ab])}}},getSize:function(){return this.count}};function M(U){this.map={};this.count=0;if(U){this.absorb(U)}}function h(){this.map={};this.count=0}M.prototype=new e();M.prototype.constructor=e;h.prototype=new e();h.prototype.constructor=e;M.makeFromPP=function(U){var ab=new M();if(U){ab.absorb(U.getAll())}return ab};var C=new M(),j=L(y),V=new E(),B={none:0,gzip:1,lzw:2,deflate:3};function r(U,ae){if(!U){return null}if(ae===null){ae=false}var ac=new h();var ah=j.getAttribute(U,j.data_action_outcome);if(ah){ac.set("outcm",ah)}var af=j.getAttribute(U,"data-ylk");if(af===null||af.length===0){return ac}var ag=af.split(j.ylk_pair_delim);for(var ai=0,aj=ag.length;ai<aj;ai++){var ad=ag[ai].split(j.ylk_kv_delim);if(ad.length!==2){continue}var ak=ad[0],ab=ad[1];if(ak===null||ak===""||ab===null){continue}if(ab.length>j.MAX_VALUE_LENGTH){ab=ab.substring(0,j.MAX_VALUE_LENGTH)}if(ak.length<=8&&ab.length<=j.MAX_VALUE_LENGTH){if(ak!=="_p"||ae){ac.set(ak,ab)}}}return ac}function F(ac,U,ab){if(ac<U){return U}if(ac>ab){return ab}return ac}function t(U){C.set("A_sid",YAHOO.i13n.A_SID||j.rand());C.set("_w",j.rmProto(window.location.href).substring(0,j.MAX_VALUE_LENGTH));if(U){C.absorb(U)}else{if(y.keys){C.absorb(y.keys)}}}function w(ah){var ac=YAHOO.i13n,ai=YAHOO.i13n.TEST_ID||ah.test_id,af=document.location+"";t(ah.keys);if(ai){ai=j.norm(""+ai)}var ae=300,ab=700,U=10000;var ad={version:"3.21",keys:C,referrer:ah.referrer,getReferrer:function(){return j.norm(j.clref((typeof this.referrer!=="undefined")?this.referrer:document.referrer))},spaceid:j.norm(YAHOO.i13n.SPACEID||ah.spaceid),yrid:j.norm(ah.yrid||""),oo:(ah.oo?"1":"0"),nol:(ah.nol?"1":"0"),yql_enabled:(ah.yql_enabled!==false),ywa:ah.ywa||null,ywa_dpid:null,ywa_cf_override:ac.YWA_CF_MAP||{},ywa_action_map:ac.YWA_ACTION_MAP||{},ywa_outcome_map:ac.YWA_OUTCOME_MAP||{},fing:ah.use_fing==1,USE_RAPID:(ah.use_rapid!==false),linktrack_attribut:ah.lt_attr||"text",tracked_mods:ah.tracked_mods||[],tracked_mods_viewability:ah.tracked_mods_viewability||[],viewability:ah.viewability||false,viewability_time:ah.viewability_time||300,viewability_px:ah.viewability_px||50,lt_attr:ah.lt_attr||"text",client_only:ah.client_only,text_link_len:ah.text_link_len||-1,test_id:ai,yql_host:ah.yql_host||"geo.query.yahoo.com",yql_path:ah.yql_path||"/v1/public/yql",click_timeout:ah.click_timeout||U,compr_timeout:ah.compr_timeout||ab,compr_on:(ah.compr_on!==false),compr_type:ah.compr_type||"deflate",webworker_file:YAHOO.i13n.WEBWORKER_FILE||ah.webworker_file||"rapidworker-1.1.js",nofollow_classname:ah.nofollow_class||"rapidnofollow",no_click_listen:ah.rapid_noclick_resp||"rapid-noclick-resp",nonanchor_track_class:ah.nonanchor_track_class||"rapid-nonanchor-lt",anc_pos_attr:"data-rapid_p",anc_v9y_attr:"data-v9y",deb:(ah.debug===true),ldbg:(af.indexOf("yhldebug=1")>0),addmod_timeout:ah.addmodules_timeout||300,ult_token_capture:(typeof ah.ult_token_capture==="boolean"?ah.ult_token_capture:false),track_type:ah.track_type||"data-tracktype",dwell_on:(ah.dwell_on!==false),async_all_clicks:(ah.async_all_clicks===true),click_postmsg:(ah.click_postmsg||{}),apv:(ah.apv!==false),apv_time:ah.apv_time||500,apv_px:ah.apv_px||500,apv_always_send:(ah.apv_always_send===true),ex:(ah.ex===true),persist_asid:(ah.persist_asid===true),track_right_click:(ah.track_right_click===true),gen_bcookie:(ah.gen_bcookie===true),skip_attr:ah.skip_attr||"data-rapid-skip",parse_dom:(ah.parse_dom===true),pageview_on_init:(ah.pageview_on_init!==false)};ad.ywa_action_map[YAHOO.i13n.EventTypes.getEventByName("richview").getEventName()]=100;if(ad.ywa&&(!ad.ywa.project_id||ad.ywa.project_id==0||!j.isNumeric(ad.ywa.project_id))){n("Invalid YWA project id: null or not numeric.");ad.ywa=null}var ag=ad.compr_timeout*1;if(!j.isNum(ag)){ad.compr_timeout=ab}else{ad.compr_timeout=F(ag,ae,ab)}if(ad.click_timeout!=U){Q("Click timeout set to "+ad.click_timeout+"ms (default 10000ms)")}if(ah.apv_callback&&typeof(ah.apv_callback)=="function"){ad.apv_callback=ah.apv_callback}else{ad.apv_callback=null}return ad}function X(){C.set("A_sid",j.rand())}function k(){return"Rapid-"+N.version+"("+(new Date().getTime())+"):"}function Q(U){console.warn("RAPID WARNING: "+U)}function n(U){console.error("RAPID ERROR: "+U)}function l(U){if(N.ldbg){console.log(k()+U)}}function I(){var ac=document.cookie;this.cookieMap={};if(/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(ac)){var ah=ac.split(/;\s/g),ag=null,af=null,ab=null;for(var ae=0,U=ah.length;ae<U;ae++){ab=ah[ae].match(/([^=]+)=/i);if(ab instanceof Array){try{ag=j.dec(ab[1]);af=j.dec(ah[ae].substring(ab[1].length+1))}catch(ad){n(ad)}}else{ag=j.dec(ah[ae]);af=ag}if(ag==="B"||ag==="BX"||ag==="TT"||(N.ywa&&(ag===("fpc"+N.ywa.project_id))||(ag==="fpc")||(ag==="ywandp")||(ag.indexOf("ywadp")===0))||ag==="D"){this.cookieMap[ag]=af}}}}I.prototype={getYWAFPC:function(){if(!N.ywa){return null}var ab=this.cookieMap["fpc"+N.ywa.project_id];var U=this.cookieMap.fpc;var ad=J(U);var ac=null;if(U){ac=ad[N.ywa.project_id]}if(ab){j.clearCookie("fpc"+N.ywa.project_id);if(!ac){ad[N.ywa.project_id]=ab;var ae=z(ad);Z("fpc",ae,315360000);ac=ab}}return(ac?ac:null)},getCookieByName:function(U){return this.cookieMap[U]},getYWADPID:function(){if(N.ywa){var ac="ywandp",ad="ywadp"+N.ywa.project_id,ab=J(this.cookieMap[ac]),U;var af=ab[N.ywa.project_id];if(af===undefined||af===null||af===""){U=this.cookieMap[ad];if(U){ab[N.ywa.project_id]=U}else{ab[N.ywa.project_id]=K()}af=ab[N.ywa.project_id];var ae=z(ab);Z(ac,ae,315360000);this.cookieMap[ac]=ae}N.ywa_dpid=af}}};function q(){if(!N.ult_token_capture||YAHOO.i13n.__handled_ult_tokens__===true){return}YAHOO.i13n.__handled_ult_tokens__=true;var ac=window.document.location+"";if(ac.match(/;_yl[a-z]{1}=/)){if(N.ldbg){l("Found ULT Token on URL.")}P.sendGeoT(ac)}else{var ab=new I(),U=ab.getCookieByName("D");if(U){j.clearCookie("D","/",".yahoo.com");P.sendGeoT(U)}}}var N=w(y),P=x(),m=null,f=null,A=null;function Y(){return Math.floor(new Date().valueOf()/1000)}function Z(U,af,ae){var ad=new Date(),ac="";ad.setTime(ad.getTime()+(ae*1000));ac="; expires="+ad.toGMTString();var ab=U+"="+af+ac+"; path=/";document.cookie=ab}function K(){return""+Math.floor(Math.random()*4294967295)}function z(ab){var U,ac=[];for(U in ab){if(U,ab[U]){ac.push(U+":"+ab[U])}}return encodeURIComponent(ac.join(";"))}function J(ae,U){ae=ae||"";var ac=decodeURIComponent(ae).split(";"),ad={};for(i=0,excl=ac.length;i<excl;i++){var ab=ac[i].split(":");ad[ab[0]]=ab[1]}if(U){return ad[U]}return ad}function x(){var ah=YAHOO.i13n.beacon_server||"geo.yahoo.com";function af(aI){var aH="cf";if(aI<10&&(""+aI).charAt(0)!=="0"){aH+="0"+aI}else{aH+=aI}return aH}function am(){if(typeof window.ITTs==="undefined"||!j.isArr(window.ITTs)||window.ITTs.length===0){window.ITTs=[{}]}if(window.ITTs[0].setFPCookies){return}window.ITTs[0].setFPCookies=function(){var aH="fpc",aK=new I();var aJ=J(aK.getCookieByName(aH));aJ[N.ywa.project_id]=window.ITTs[0].FPCV;Z(aH,z(aJ),31536000);var aI=aK.getCookieByName(aH+N.ywa.project_id);if(aI){j.clearCookie(aH+N.ywa.project_id)}}}function U(aH,aJ){if(N.ldbg){l(aH)}var aI=new Image(),aK=null;aI.onload=aI.onabort=aI.onerror=function(){if(aJ){clearTimeout(aK);aJ.call(null)}};aI.src=aH;if(aJ){aK=setTimeout(function(){aJ.call(null)},N.click_timeout)}setTimeout(function(){aI=null},10000000)}function aD(aK,aI){for(var aH in aK){if(!j.hasOwn(aK,aH)){continue}var aJ=N.ywa_cf_override[aH];if(aJ){aI[aJ]=aK[aH]}}}function aG(aM,aH,aL,aV,aP,a0,aQ){function aJ(a7,a6){var a5=(a6?"%3B":";");return a7+(aL?(a5+a7):"")}var aU=new I(),aR=aU.getYWAFPC();aU.getYWADPID();aV=aV||{};if(aM!=="c"){am()}var aS=[j.curProto(),(N.ywa.host||"a.analytics.yahoo.com"),"/fpc.pl?"],aO=N.ywa.project_id,a3=N.ywa.document_group,aI={};if(N.test_id){aI["14"]=N.test_id}var aW=["_cb="+j.rand(),".ys="+N.spaceid,"a="+aO,"b="+j.enc(N.ywa.document_name||document.title),"d="+j.enc(new Date()),"f="+j.enc(window.location.href),"j="+j.sr("x"),"k="+j.cold(),"t="+Y(),"l=true"];if(aQ){for(var a1 in aQ){if(j.hasOwn(aQ,a1)){aW.push(a1+"="+j.enc(aQ[a1]))}}}if(a3&&a3!==""){aW.push("c="+j.enc(a3))}if(N.ywa_dpid){aW.push("dpid="+N.ywa_dpid)}if(aM==="c"){aV.x=12;var a4="12";if(aL){a4=j.enc(a4+";"+aL)}aW.splice(0,0,"x="+a4)}else{if(aM==="e"){aW.push("x="+aH+(aL?";"+aL:""))}}if(aR){aW.push("fpc="+j.enc(aR))}var aK=N.ywa.member_id;if(aK){aW.push("m="+aK)}if(N.getReferrer()!==""){aW.push("e="+j.enc(N.getReferrer()))}var aY={};j.aug(aY,at().getAll());j.aug(aY,a0);aD(aY,aI);if(j.hasOwn(aY,"A_apv")){aI["15"]=aY.A_apv}if(aM==="e"&&aP){aD(aP,aI)}var aN=N.ywa.cf;j.aug(aI,aN,function(a5){return !j.isResCF(a5)});for(var aT in aI){if(j.hasOwn(aI,aT)){aW.push(af(aT)+"="+aJ(j.enc(aI[aT]),1))}}if(aM==="e"||aM==="c"){aW.push("ca=1")}if(aM!=="p"){aW.push("resp=img")}if(aM==="c"){for(var aZ in aV){if(!j.hasOwn(aV,aZ)){continue}if(aZ!=="x"){var aX=aV[aZ];if(aX&&aX.length>j.MAX_VALUE_LENGTH){aX=aX.substring(0,j.MAX_VALUE_LENGTH)}try{aX=j.enc(aJ(aX));aX=aX.replace(/'/g,"%27")}catch(a2){n(a2)}aW.push(af(aZ)+"="+aX)}}}return aS.join("")+aW.join("&")}function al(){return"rapid_if_"+j.rand()}function au(aI){var aH="display:none;";if(j.isIE&&(j.ieV===6||j.ieV===7||j.ieV===8)){aI.style.setAttribute("cssText",aH,0)}else{j.sa(aI,"style",aH)}}function aA(aH){var aJ=null;if(j.isIE&&j.ieV<=8){var aI="";if(j.isSecure()&&j.ieV==6){aI='src="https://geo.yahoo.com/b.html"'}aJ=document.createElement("<iframe "+aI+' name="'+aH+'"></iframe>')}else{aJ=document.createElement("iframe")}aJ.name=aH;return aJ}function ac(){setTimeout(function(){var aH=aA("");j.addEvent(aH,"load",function(){j.rmBodyEl(aH)});j.appBodyEl(aH)},1)}function av(aL,aQ){var aJ=null,aI=j.make("form"),aP=j.make("input"),aK=al(),aO=al(),aH="application/x-www-form-urlencoded;charset=UTF-8";aJ=aA(aK);au(aJ);au(aI);aI.id=aO;aI.method="POST";aI.action=ap(aQ);aI.target=aK;if(j.isIE&&j.ieV<=7){aI.setAttribute("enctype",aH)}else{aI.setAttribute("enctype",aH);aI.setAttribute("encoding",aH)}aP.name="q";aP.value=aL;if(j.isIE&&j.ieV>=10){aP.type="submit"}aI.appendChild(aP);var aN="load",aM=function(){var aR="";if(N.ldbg&&(!j.isIE||j.ieV>=9)){var aS=aJ.contentDocument||aJ.contentWindow.document;aR=aS.body.innerHTML}j.rmEvent(aJ,aN,aM);setTimeout(function(){j.rmBodyEl(aJ);j.rmBodyEl(aI)},0);if(N.ldbg){l("iframe resp: "+aR)}if(j.isIE&&j.ieV<=7){ac()}};j.addEvent(aJ,aN,aM);j.appBodyEl(aJ);j.appBodyEl(aI);aI.submit()}function ap(aJ){var aH=N.deb,aI=j.rand(),aK=[j.curProto(),N.yql_host,N.yql_path,"?yhlVer=2&yhlClient=rapid&yhlS=",N.spaceid,((aH===true)?"&yhlEnv=staging":""),((aH===true||N.ldbg)?"&debug=true&diagnostics=true":""),((j.isIE&&j.ieV)?"&yhlUA=ie"+j.ieV:""),((j.isIE&&j.ieV==8)?"&format=json":""),"&yhlCT=2","&yhlBTMS=",(new Date()).valueOf(),"&yhlClientVer=",N.version,"&yhlRnd=",aI,"&yhlCompressed=",aJ||0,(N.gen_bcookie)?"&yhlBcookie=1":""].join("");if(N.ldbg){l(aK)}return aK}function aE(aK,aI){var aJ=j.getXHR(),aH=ap(aI);aJ.open("POST",aH,true);aJ.withCredentials=true;aJ.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");if(N.ldbg){aJ.onreadystatechange=function(){if(aJ.readyState===4){l(aJ.status+":xhr response: "+aJ.responseText)}}}aJ.send(aK)}var aq=function(aI){var aJ={_pl:1,A_v:N.version};var aH=N.getReferrer();if(aH&&aI!==false){aJ._R=aH.substring(0,j.MAX_VALUE_LENGTH)}if(N.test_id){aJ.test=N.test_id}if(N.ex){aJ._ex=1}if(!aJ._bt){aJ._bt="rapid"}return aJ};function ad(aI,aJ,aH){var aK={};if(!j.isObj(aI)){return aK}j.aug(aK,aI,aH);return aK}function aC(aI,aN,aK){aK=aK||{};var aO={m:j.norm(aI.moduleName),l:[]};if(aI.moduleYLK){aO.ylk=aI.moduleYLK.getAll()}var aJ=aI.links;var aJ=aI.links,aM=function(aP){var aQ=(aP==="_p");if(aN&&aQ){return true}return aP!=="sec"&&!aQ};for(var aL=0,aH=aJ.length;aL<aH;aL++){if(N.viewability&&!aJ[aL].viewable){if(N.ldbg){l("Skipping not viewable link: "+aJ[aL].data.slk)}continue}aO.l.push(ad(aJ[aL].data,aN,aM))}return aO}function az(aJ,aK,aH){var aN=[],aI=null;for(var aL in aJ){if(!j.hasOwn(aJ,aL)){continue}aI=aJ[aL];if(!aI){continue}var aM=aC(aI,aK,aH);if(aM.l.length>0){aN.push(aM)}else{if(N.ldbg){l('Not capturing 0 links mod: "'+aI.moduleName+'"')}}}return aN}function ak(aI,aH){if(aI){return"pv"}if(aH&&aH.event){return aH.event.type.getYQLID()}return"lv"}function ax(aJ,aL,aK,aI,aH){return[{t:ak(aL,aH),s:N.spaceid,pp:at(aL,aI).getAll(),_ts:Y(),lv:az(aJ,aK,aH)}]}function at(aI,aH){var aJ=M.makeFromPP(N.keys);aJ.absorb(aH);if(aI){aJ.set("A_",1)}return aJ}function aF(aJ,aH,aI){var aK="select * from x where a = '"+aJ+"'";return(aH?"q=":"")+(aI?j.enc(aK):aK)}function an(aH){var aI={bp:aq(),r:aH.call(0),yrid:N.yrid,optout:N.oo,nol:N.nol};return j.toJSON(aI)}function ag(aK,aL,aI){var aH={};if(aI.event){j.aug(aH,aI.event.data)}if(aI.pp){j.aug(aH,aI.pp)}var aJ=an(function(){return ax([aK],aL,true,aH,aI)});ay(aJ,aL)}function aj(aK,aL,aJ,aH){var aI=an(function(){return ax(aK,aL,false,aJ,aH)});ay(aI)}function ar(aH){return aH.identifier}var ai=function(){var aK=null,aH=[],aJ=0,aI=N.addmod_timeout;return function(aP,aQ,aN,aM){clearTimeout(aK);var aL=+new Date()-aJ;aH=j.uniqConcat(aH,aP,ar);if(aL>aI){aJ=+new Date();aj(aH,aQ,aN,aM);aH=[]}else{var aO=aI-aL;aK=setTimeout(function(){if(N.ldbg){l("queueing send in addMods")}aj(aH,aQ,aN,aM);aH=[]},aO)}}}();function ay(aP){var aQ=N.ldbg;function aH(aS,aR){if(aR===0){aS=aS.replace(/'/g,"\\'")}if(aQ){l("body: "+aS)}if(j.hasCORS()){aK=aF(aS,true,true);aE(aK,aR)}else{aK=aF(aS,0,0);av(aK,aR)}}var aK="",aJ=B[N.compr_type];if(N.compr_on&&j.hasWorkers()&&aJ>1&&aP.length>(2*1024)){if(aQ){l("Looking for worker:"+N.webworker_file+", compr timeout:"+N.compr_timeout)}var aN=new Worker(N.webworker_file),aM=false,aI=null,aL=0;function aO(){if(!aM){aM=true;aH(aP,0);if(aQ){l("sent in failSend")}}}aN.onerror=function(aR){clearTimeout(aI);aO();Q(aR.message);aN.terminate()};aN.onmessage=function(aR){clearTimeout(aI);var aS=j.tms();if(!aM){aM=true;aH(aR.data,aJ)}if(aQ){l("Ratio ("+aR.data.length+"/"+aP.length+"): "+(aR.data.length*100/aP.length).toFixed(2)+"% -> C_T: "+(aS-aL)+" ms ("+aS+"-"+aL+")")}aN.terminate()};if(aQ){l("posting to worker: "+aP)}aL=j.tms();aN.postMessage({type:aJ,json:aP});aI=setTimeout(function(){aO();aN.terminate()},N.compr_timeout)}else{aH(aP,0)}}function aw(aI,aH,aJ){return j.curProto()+ah+"/"+aI+["?s="+(aJ?aJ:N.spaceid),"t="+j.rand()+","+Math.random(),"_I="+N.yrid,"_AO="+N.oo,"_NOL="+N.nol,"_R="+j.enc(N.getReferrer()),(aI==="c"?"_K=":"_P=")+ae(aH)].join("&")}function ae(aH){var aI=new M(aq(false));aI.absorb(N.keys.getAll());aI.set("_ts",Y());if(aH){if(!(aH instanceof M)){n("Internal error in buildGeoPP: not PP type")}else{aI.absorb(aH.getAll())}}return N.version+"%05"+aI.ser()}function ao(aI){var aH=[aw("c")+"&_C="+j.ser(aI.data)];return aH.join("&")}function ab(aJ,aI){var aH=aJ[aI];if(aH&&j.isNum(aH)&&aH>=0){return aH}return null}function aB(aJ){var aH=j.getAttribute(aJ,j.DATA_ACTION),aI=j.getAttribute(aJ,j.data_action_outcome);if(aH!==null){return ab(N.ywa_action_map,aH)}else{if(aI!==null){return ab(N.ywa_outcome_map,aI)}}return null}return{sendGeoT:function(aI){var aH=[j.curProto(),ah,"/t?",aI].join("");U(aH)},sendGeoPV:function(){U(aw("b"))},sendRapidNoDelay:function(aI,aM,aJ,aH,aL){if(!N.yql_enabled||aL){var aK=null;if(aJ){aK=new M(aJ)}U(aw(aM?"b":"p",aK))}else{aj(aI,aM,aJ,aH)}},sendRapid:function(aI,aK,aJ,aH){ai(aI,aK,aJ,aH)},sendRefreshedContent:ag,sendYWAEvent:function(aJ){var aH=null,aI=null,aK=aJ.name;if(N.ywa_action_map&&aK){aH=ab(N.ywa_action_map,aK)}if(aH===null){return}if(N.ywa_outcome_map&&aJ.outcome){aI=ab(N.ywa_outcome_map,aJ.outcome)}U(aG("e",aH,aI,null,aJ.data))},sendULTEvent:function(aJ,aK){var aI={};if(aJ&&aJ.data){aI=aJ.data}var aH=aw("p",new M(aI),aK||0);if(aJ.type){aH+="&_V="+aJ.type.spaceidPrefix}U(aH)},sendDwell:function(aH){this.sendULTEvent(aH,aH.data.s)},sendEvents:function(aH){if(N.USE_RAPID){this.sendULTEvent(aH)}if(N.ywa){this.sendYWAEvent(aH)}},sendClick:function(aU,aT){var aP=null,aM="",aR="",aN=null,aK=false,aJ=null;if(N.USE_RAPID){aM=ao(aU)}if(N.ywa){var aH=aU.data,aQ=aU.targetElement;var aS={18:aH.sec,19:aH.slk,20:aH._p};if("A_cl" in aH){aS["130"]=aH.A_cl}if("A_lv" in aH){aS["131"]=aH.A_lv}if(aQ){aN=aB(aQ)}else{aN=ab(N.ywa_outcome_map,aU.outcome)}if(N.ywa_cf_override){aD(aH,aS)}aR=aG("c",0,aN,aS)}if(N.async_all_clicks||!aU.synch){if(aM){U(aM,aT)}if(aR){if(!aM){U(aR,aT)}else{U(aR)}}return}j.prevDef(aU.event);aP=function(){if(aK){return}aK=true;if(aT){aT.call();return}var aV=aU.targetElement.href;if(N.click_postmsg.origin){var aW=N.click_postmsg.window||top;var aX=N.click_postmsg.payload||{};aX.href=aV;aW.postMessage(j.toJSON(aX),N.click_postmsg.origin)}else{if(aU.hasTargetTop){top.document.location=aV}else{document.location=aV}}};if(N.USE_RAPID){if(N.ywa){var aL=new Image(),aI=new Image(),aO=0;aL.onload=aL.onerror=aL.onabort=aI.onload=aI.onerror=aI.onabort=function(){if(++aO===2){clearTimeout(aJ);aP()}};aL.src=aM;aI.src=aR;aJ=setTimeout(aP,N.click_timeout);setTimeout(function(){aL=null;aI=null},10000000)}else{U(aM,aP)}}else{if(N.ywa){U(aR,aP)}}},sendYWAPV:function(aH){var aI=aG("p",0,0,0,0,aH),aJ=document.getElementsByTagName("head"),aK="true";if(aJ.length===0){return}var aM=j.make("script",{defer:aK,async:aK,type:"text/javascript",src:aI});function aL(){aJ[0].removeChild(aM)}if(j.isIE){aM.onreadystatechange=function(){var aN=this.readyState;if("loaded"===aN||"complete"===aN){aM.onload=aM.onreadystatechange=null;aL()}}}else{if(j.isWebkit){aM.addEventListener("load",aL)}else{aM.onload=aL}}aJ[0].appendChild(aM)},sendInternalSearch:function(aJ,aI){aJ=aJ||"";if(!j.isNum(aI)){aI=0}var aK={isk:aJ,isr:aI};var aH=aG("e","INTERNAL_SEARCH",null,null,null,null,aK);U(aH)},sendYWAECommerce:function(aL,aK){var aJ={},aM={PRODUCT_VIEW:1,ADD_TO_CART:1,CANCELLED_SALE:1,PENDING_SALE:1,SALE:1},aO={amount:"xa",orderId:"oc",tax:"xt",shipping:"xs",discount:"xd",sku:"p",units:"q",amounts:"r"};if(!(aL in aM)){n("invalid YWA ecommerce action: "+aL);return}for(var aI in aK){if(j.hasOwn(aK,aI)){if(aI in aO){var aN=aO[aI];aJ[aN]=aK[aI]}}}if(aL==="SALE"){aL=1}var aH=aG("e",aL,null,null,null,null,aJ);U(aH)}}}function aa(U){return U!=="sec"&&U!=="slk"&&U!=="_p"}function a(ad,aj,ag,ab,ak,ah,ae){var U="",ai=null;var af=ae?j.isAboveFold(ab):true;var ac={viewable:af,data:{sec:aj,_p:ag}};if(ae){j.aug(ac.data,{A_lv:1})}if(!ah){ab.setAttribute(N.anc_pos_attr,ag);if(ae){ab.setAttribute(N.anc_v9y_attr,af?"1":"0")}U=j.getLT(ab,ad);if(U&&U!==""){ai=r(ab)}else{U="_ELINK_"}ac.data.slk=U}else{ac.data.slk=ak||"section";ai=r(ab)}if(ai!==null){j.aug(ac.data,ai.getAll())}return ac}function E(){var U={};return{addModule:function(ab,ac){U[j.norm(ab)]=ac},addModules:function(ac,ah){var ag=j.isArr(ac),ae=[];if(!ag){if(j.isStr(ac)){ac=new Array(ac);ag=true}}for(var ad in ac){if(!j.hasOwn(ac,ad)){continue}var af=(ag?ac[ad]:ad),ai=j.trim(ac[ad]);if(!this.exists(af)){var ab=D(ai,af,ah);if(ab){this.addModule(af,ab);ae.push(ab)}}else{n('addModules() called with prev processed id:"'+af+'"')}}return ae},getModules:function(){return U},getModulesWithViewability:function(){var ad={};for(var ab in U){var ac=U[ab];if(ac.useViewability){ad[ab]=ac}}return ad},reevaluateModuleViewability:function(){var ab=this.getModulesWithViewability();for(var ad in ab){var ac=ab[ad];ac.reevaluateViewableLinks()}},refreshModule:function(af,ae,ad,ac){var ab=U[j.norm(af)];if(ab){ab.refreshModule(af,ae,ad,ac)}else{n("refreshModule called on unknown section: "+ab)}},removeModule:function(ac){var ab=U[j.norm(ac)];if(ab){ab.removeHandlers();delete U[ac]}},destroy:function(){for(var ab in U){if(j.hasOwn(U,ab)){this.removeModule(ab)}}U={}},exists:function(ab){return U[j.norm(ab)]}}}function O(U,ab){if(j.hasClass(U,"rapid_track_href")){return"href"}if(j.hasClass(U,"rapid_track_text")){return"text"}if(j.hasClass(U,"rapid_track_title")){return"title"}if(j.hasClass(U,"rapid_track_id")){return"id"}return ab}function o(U){return(U.nodeName.toLowerCase()==="input")&&(j.getAttribute(U,"type")==="submit")}function g(ac,ab){var U=v(ac,ab);A=U;if(U){P.sendClick(U)}}function d(ad,ac,U){var ab=j.getAttribute;return((ac.target&&ac.target.toLowerCase()==="_blank")||ad.which===2||ad.button===4||ad.altKey||ad.ctrlKey||ad.shiftKey||ad.metaKey||(ab(ac,"data-nofollow")==="on")||(ab(ac,"href")&&ab(ac,"href").substr(0,11).toLowerCase()==="javascript:")||(j.hasClass(ac,N.nofollow_classname))||(j.hasClass(U,N.nofollow_classname)))}function W(ab,U,ae,ad){ae=ae||{};var ac=null;if(ab){ac=YAHOO.i13n.EventTypes.getEventByName(ab);ae._E=ac.getEventName();U=ae._E}else{ae._E=U||"_"}if(ad){ae.outcm=ad}return{type:ac,name:U,data:ae,outcome:ad}}function v(ag,am){ag=ag||event;var ah=j.getTarget(ag),ac="button",af="input",ae="",U=false,ad=null;while(ah&&(ae=ah.nodeName.toLowerCase())&&(ae!=="a"&&ae!==ac&&!o(ah)&&!j.hasClass(ah,N.nonanchor_track_class))){ah=ah.parentNode}if(!ah||j.hasClass(ah,N.no_click_listen)){return 0}if(j.hasClass(ah,N.nonanchor_track_class)){ad={pos:0,sec:am.moduleName,slk:"_"};var aj=r(ah,1);if(aj){j.aug(ad,aj.getAll())}}else{var ai=j.getAttribute(ah,N.anc_pos_attr);ad=am.getLinkAtPos(ai);if(!ad){return 0}ad=ad.data;if(ae!==af&&ae!==ac&&!d(ag,ah,am.moduleElement)){U=true}}if(!ad.tar){var ab=j.getAttribute(ah,"href");if(ab){ad.tar=j.extDomain(ab)}if(!ab||!ad.tar){ad.tar=j.extDomain(window.document.location+"")}}if(!ad.tar_uri){if(ah.pathname){ad.tar_uri=ah.pathname.substring(0,j.MAX_VALUE_LENGTH)}else{ad.tar_uri=""}}var al=am.moduleYLK;if(al){var ak=al.getAll();j.aug(ad,ak,function(an){return !(an in ad)})}ad.A_xy=j.xy(ag);ad.A_sr=j.sr();if(ag.type=="contextmenu"){ad.A_cl=3;U=false}return{data:ad,event:ag,moduleElement:am.moduleElement,targetElement:ah,synch:U,hasTargetTop:(ah&&ah.target&&ah.target.toLowerCase()==="_top")}}function p(ab,U,af,ae,ac){var ad={};j.aug(ad,ae);ad.sec=ab;ad.slk=U;ad._p=af;return{data:ad,outcome:ac,event:null,moduleElement:null,targetElement:null,synch:false,hasTargetTop:false}}function T(af,ad,U){if(!ad){ad=document}var ah=af.split(","),ak=[];for(var ae=0,ab=ah.length;ae<ab;ae++){var al=ad.getElementsByTagName(ah[ae]);for(var ac=0,aj=al.length;ac<aj;ac++){var ai=al[ac];if(U&&!U.call(0,ai)){continue}ak.push(ai)}}var ag=ak[0];if(!ag){return[]}if(ag.sourceIndex){ak.sort(function(an,am){return an.sourceIndex-am.sourceIndex})}else{if(ag.compareDocumentPosition){ak.sort(function(an,am){return 3-(an.compareDocumentPosition(am)&6)})}}return ak}function u(af,ad,aj,U){if(!ad){ad=document}var ah=af.split(",");aj=aj||[];var ab=ad.childNodes;if(j.getAttribute(ad,N.skip_attr)!=="true"){for(var ae=0,ac=ab.length;ae<ac;ae++){var ai=ab[ae];if(j.isTagOfInterest(ai,ah)){if(!U||U.call(0,ai)){aj.push(ai)}}if(j.getAttribute(ai,N.skip_attr)!=="true"){u(af,ai,aj,U)}else{if(j.getAttribute(ai,N.skip_attr)==="true"){aj.push(ai)}}}}var ag=aj[0];if(!ag){return[]}if(ag.sourceIndex){aj.sort(function(al,ak){return al.sourceIndex-ak.sourceIndex})}else{if(ag.compareDocumentPosition){aj.sort(function(al,ak){return 3-(al.compareDocumentPosition(ak)&6)})}}return aj}function D(ab,ai,ad){var ao=document.getElementById(ai),ah="a,button,input";if(!ao){Q("Specified module not in DOM: "+ai);return null}var ap=r(ao),al=[],ag=N.parse_dom?u(ah,ao):T(ah,ao),ac=O(ao,N.lt_attr),an=ag.length,ae=j.getAttribute(ao,N.track_type);function aj(aq,ax){var at=[];ax=ax||1;for(var aw=0,az=aq.length;aw<az;aw++){if(aq[aw].tagName.toLowerCase()==="div"){var ay=aq[aw];var ar=r(ay);var av=a(ac,ab,1,ay,ar.map.slk||ap.map.slk,true,ad);al.push(av);at.push(av)}else{var au=aq[aw];var av=a(ac,ab,ax++,au,0,0,ad);al.push(av);at.push(av)}}if(j.getAttribute(ao,N.skip_attr)==="true"){var av=a(ac,ab,1,ay,ap.map.slk,true);al.push(av);at.push(av)}return at}function af(at){var ax=[];for(var au=0,av=at.length;au<av;au++){var ar=at[au];var aw=j.getAttribute(ar,N.anc_pos_attr);var aq=a(ac,ab,aw,ar,0,0,true);ax.push(aq)}return ax}function U(aq){return !j.getAttribute(aq,N.anc_pos_attr)}aj(ag);var am={useViewability:ad,moduleYLK:ap,links:al,moduleName:ab,trackType:ae,moduleElement:ao,refreshModule:function(ar,aq,az,aA){aA.isRefreshed=true;var av=N.parse_dom?u(ah,j.$(ar),null,U):T(ah,j.$(ar),U);if(aq===true||(av.length>0)){var at=aj(av,an+1);an+=av.length;var aw=av.length;if(ad){aw=0;for(var au=0,ax=at.length;au<ax;au++){if(at[au].viewable){aw++}}}if((aq===true||aw>0)&&(N.USE_RAPID||aA.event)){var ay={};j.aug(ay,this);ay.links=at;if(aq===true||az){P.sendRefreshedContent(ay,aq,aA)}}}else{if(j.ldbg){l("refreshModule("+ar+") - no new links.")}}if(aq===true){if(N.ywa){P.sendYWAPV(aA.pp)}if(N.apv&&m){m.reInit()}}},reevaluateViewableLinks:function(){var at=al.length;var au=T("a",this.moduleElement,(function(av){return function(ax){if(!j.getAttribute(ax,N.anc_pos_attr)){ax.setAttribute(N.anc_pos_attr,++av);var aw=a(ac,ab,av,ax,0,0,false);al.push(aw)}var ay=j.getAttribute(ax,N.anc_v9y_attr);if(ay!=="1"&&j.isAboveFold(ax)){ax.setAttribute(N.anc_v9y_attr,"1");return true}return false}})(at+1));if(au.length===0){return}if(N.USE_RAPID){var ar=af(au);var aq={};j.aug(aq,this);aq.links=ar;P.sendRefreshedContent(aq,false,{})}},removeHandlers:function(){j.rmEvent(ao,"click",ak);if(N.track_right_click){j.rmEvent(ao,"contextmenu",ak)}},getLinkAtPos:function(aq){if(aq>al.length){return null}return al[aq-1]},identifier:ai};var ak=function(aq){g(aq,am)};j.addEvent(ao,"click",ak);if(N.track_right_click){j.addEvent(ao,"contextmenu",ak)}return am}function S(U,ad,ac){if(N.ldbg){l("beaconPageview called, pp="+j.fData(U))}if(ad&&!N.persist_asid){X()}if(N.USE_RAPID||(N.apv_always_send&&j.hasOwn(U,"A_apv"))){P.sendRapidNoDelay([],true,U,null,ac)}if(N.ywa){var ab=M.makeFromPP(N.keys);ab.absorb(U);P.sendYWAPV(ab.getAll())}if(N.apv&&m!=null){m.reInit()}}var H=(function(){var U={};return{subscribe:function(ac,ab){var ad=U[ac];if(!ad){ad=[];U[ac]=ad}ad.push(ab)},unsubscribe:function(ad,ac){var ae=U[ad];if(!ae){return}for(var ab=0;ab<ae.length;ab++){if(ae[ab]===ac){ae.splice(ab,1);return}}},fire:function(ad){var ae=U[ad];if(!ae){return}for(var ac=0,ab=ae.length;ac<ab;ac++){ae[ac].call(null)}}}})();var c={FOCUS:"focus",BLUR:"blur",BEFOREUNLOAD:"beforeunload",PAGEHIDE:"pagehide",HISTORYSTATECHANGED:"historystatechanged",NAVIGATE:"navigate"};function s(){focusFun=function(U){H.fire(c.FOCUS)},blurFun=function(U){H.fire(c.BLUR)},unloadFun=function(U){H.fire(c.BEFOREUNLOAD)};j.addEvent(window,c.FOCUS,focusFun);j.addEvent(window,c.BLUR,blurFun);if(j.isIOSSafari||j.isAndroid){j.addEvent(window,c.PAGEHIDE,unloadFun)}else{j.addEvent(window,c.BEFOREUNLOAD,unloadFun)}this.historyStateChanged=function(){H.fire(c.HISTORYSTATECHANGED)}}function b(){var ag=null,U=new Date().getTime(),ac=U,ae=j.getScrollY(),ab=-1,ad=function(){var aj=j.getScrollY(),ai=(ab===-1)?(aj-ae):(aj-ab),ah=(ai>0)?0:1;if(Math.abs(ai)>N.viewability_px){V.reevaluateModuleViewability();ab=aj;ac=new Date().getTime()}};var af=function(){if(ag!=null){clearTimeout(ag)}var ah=new Date().getTime();if((ah-U)<N.viewability_time){ae=j.getScrollY();ac=ah}ag=setTimeout(function(){ad()},N.viewability_time)};j.addEvent(window,"scroll",af);this.reInit=function(){ae=j.getScrollY();ab=-1;U=ac=new Date().getTime()};this.destroy=function(){j.rmEvent(window,"scroll",af)}}function G(){var af=null,U=lastApvTime=new Date().getTime(),ae=j.getScrollY(),ac=-1,ad=function(){var aj=j.getScrollY(),ai=(ac===-1)?(aj-ae):(aj-ac),ah=(ai>0)?0:1;if(Math.abs(ai)>N.apv_px){var ag={A_apv:1,A_apx:aj,A_asd:ah};S(ag,false,true);ac=aj;lastApvTime=new Date().getTime();if(N.apv_callback){N.apv_callback.call(this,{pixel_pos:aj,scroll_dir:ah})}}};var ab=function(){if(af!=null){clearTimeout(af)}var ag=new Date().getTime();if((ag-U)<N.apv_time){ae=j.getScrollY();lastApvTime=ag}af=setTimeout(function(){ad()},N.apv_time)};j.addEvent(window,"scroll",ab);this.reInit=function(){ae=j.getScrollY();ac=-1;U=lastApvTime=new Date().getTime()};this.destroy=function(){j.rmEvent(window,"scroll",ab)}}function R(){q();if(N.ldbg){l("tracked_mods: "+j.fData(N.tracked_mods))}f=new b();var ab=V.addModules(N.tracked_mods,false);var U=V.addModules(N.tracked_mods_viewability,N.viewability);if(N.USE_RAPID&&N.pageview_on_init){P.sendRapidNoDelay(ab.concat(U),N.client_only==1)}if(N.ywa&&N.pageview_on_init){P.sendYWAPV()}if(N.apv){j.executeOnLoad(function(){m=new G()})}}R();return{init:function(){},beaconEvent:function(ac,ad,ab){if(N.ldbg){l('beaconEvent: event="'+ac+'" data='+j.fData(ad)+" outcome="+ab)}var U=W(0,ac,ad,ab);P.sendEvents(U)},beaconRichView:function(U,ac){if(N.ldbg){l("beaconRichView: outcome="+ac)}var ab=W("richview","",U,ac);P.sendEvents(ab)},beaconClick:function(ab,U,af,ae,ac,ad){if(!ae&&ac){ae={}}if(ac){ae.outcm=ac}P.sendClick(p(ab,U,af,ae,ac),ad)},addModules:function(ad,af,ab){if(N.ldbg){l("addModules() called: mods="+j.fData(ad)+" isPage: "+af)}ab=ab||{};var U={A_am:1};if(ab.pp){j.aug(U,ab.pp)}ab.useViewability=ab.useViewability||false;var ae=false;if(!af){af=false}switch(af){case 1:case"1":case true:af=true;break;case 2:case"2":ae=true;af=false;ab.event=W("contentmodification","",{});break;case 0:case"0":case false:default:af=false;break}if(!N.yql_enabled){if(af){S(U,false)}else{if(ab.event){this.beaconRichView(U,ab.event.outcome)}}return}if(ab&&ab.event&&af){n("Cannot track event type and pageview at same time.");ab.event=null}var ac=V.addModules(ad,ab.useViewability);if(ac.length===0&&!ab.event){return}if(N.USE_RAPID||ab.event){if(af||ab.event||ab.pp){if(ab.event&&ab.event.data){j.aug(U,ab.event.data)}P.sendRapidNoDelay(ac,af,U,ab)}else{}}if(af===true){if(N.ywa){P.sendYWAPV(U)}if(N.apv&&m){m.reInit()}}},addModulesWithViewability:function(ab,ac,U){U=U||{};U.useViewability=N.viewability;this.addModules(ab,ac,U)},addModulesAsRichView:function(ac,ab){var ad=W("richview","",{},ab),U=true;this.addModules(ac,false,{event:ad});if(!N.yql_enabled){U=false}if(N.ywa&&U){P.sendYWAEvent(ad)}},refreshModule:function(ac,af,ab,U){if(N.ldbg){l("refreshModule called: mod="+ac+" isPV: "+af+" sendLinks: "+ab+" options: "+j.fData(U))}var ag=false;U=U||{};if(!af){af=false}switch(af){case 1:case"1":case true:af=true;break;case 2:case"2":ag=true;af=false;U.event=W("contentmodification","",{});break;case 0:case"0":case false:default:af=false;break}if(!N.yql_enabled){var ae=U.pp||{};if(af){S(ae,false)}else{if(U.event){this.beaconRichView(ae,U.event.outcome)}}return}var ad=(ab===false?false:true);if(af&&U&&U.event){U.event=null}V.refreshModule(ac,af,ad,U)},refreshModuleAsRichView:function(U,ac){var ad=W("richview","",{},ac),ab=true;this.refreshModule(U,false,true,{event:ad});if(!N.yql_enabled){ab=false}if(N.ywa&&ab){P.sendYWAEvent(ad)}},removeModule:function(U){V.removeModule(U)},isModuleTracked:function(U){if(N.ldbg){l("isTracked called: "+U)}return(V&&(V.exists(U)!==undefined))},destroy:function(){l("destroy called");V.destroy();if(m){m.destroy();m=null}if(f){f.destroy();f=null}},reInit:function(U){if(N.ldbg){l("reInit called with: "+j.fData(U))}U=U||{};if(!U.spaceid){n("Invalid spid in reInit config: "+j.fData(U));return}C=new M();N=w(U);j=L(U)},setRapidAttribute:function(ab){if(ab.keys){N.keys.absorb(ab.keys)}if(ab.ywa){if(j.isObj(ab.ywa)){for(var U in ab.ywa){if(j.hasOwn(ab.ywa,U)){N.ywa[U]=ab.ywa[U]}}}}if(ab.spaceid){N.spaceid=ab.spaceid}if(ab.referrer){N.referrer=ab.referrer.substring(0,j.MAX_VALUE_LENGTH)}if(ab.A_sid){N.keys.set("A_sid",ab.A_sid);N.persist_asid=true}},clearRapidAttribute:function(U){for(var ab in U){if(U[ab]==="keys"){var ac=N.keys.get("_w");var ad=N.keys.get("A_sid");N.keys=new M();N.keys.set("_w",ac);N.keys.set("A_sid",ad)}else{if(U[ab]==="referrer"){N.referrer=""}else{if(U[ab]==="A_sid"){N.keys.set("A_sid","");N.persist_asid=true}}}}},beaconPageview:function(U){S(U,true)},beaconECommerce:function(ab,U){if(N.ywa){P.sendYWAECommerce(ab,U)}},beaconInternalSearch:function(ab,U){if(N.ywa){P.sendInternalSearch(ab,U)}},getCurrentSID:function(){return C.get("A_sid")},notifyHistoryPushStateCalled:function(){},beaconLinkViews:function(U,ae,ac){if(N.ldbg){l("beaconLinkViews() called: eventType: "+ag)}ac=ac||{};var ab={};if(ac.pp){j.aug(ab,ac.pp)}var af=false;var ag=false;switch(ae){case 1:case"1":case true:ag=true;break;case 2:case"2":af=true;ag=false;ac.event=W("contentmodification","",{});break;case 0:case"0":case false:default:ag=false;break}if(!N.yql_enabled){if(ag){S(ab,false)}else{if(ac.event){this.beaconRichView(ab,ac.event.outcome)}}return}if(ac&&ac.event&&ag){n("Cannot track event type and pageview at same time.");ac.event=null}if(U.length===0&&!ac.event){return}var ad=[];U.forEach(function(aj){var ak=new h();ak.absorb_filter(aj,function(am){return(am!="sec"&&am!="_links")});var ah=[];var ai=1;aj._links.forEach(function(an){var am={viewable:true,data:{sec:aj.sec,_p:ai++,A_lv:2}};j.aug(am.data,an);ah.push(am)});var al={moduleName:aj.sec,moduleYLK:ak,links:ah,identifier:aj.sec};ad.push(al)});if(N.USE_RAPID||ac.event){if(ag||ac.event||ac.pp){if(ac.event&&ac.event.data){j.aug(ab,ac.event.data)}P.sendRapidNoDelay(ad,ag,ab,ac)}else{P.sendRapid(ad,ag,ab,ac)}}}};function L(al){var an=navigator.userAgent,ac=Object.prototype,ak=(an.match(/MSIE\s[^;]*/)||an.match(/Trident\/[^;]*/)?1:0),ai=((/KHTML/).test(an)?1:0),ag=(an.match(/(iPhone|iPad|iPod)/ig)!==null),ar=(an.indexOf("android")>-1),ae=(ag&&(an.match(/AppleWebKit/)!==null)),ap=(an.match(/AppleWebKit/)!==null&&an.match(/Chrome/)===null),ad=new RegExp(/\ufeff|\uffef|[\u0000-\u001f]|[\ue000-\uf8ff]/g),ao=new RegExp(/[\u007f-\u00a0]|\s{2,}/g),ab="http://",aq="https://",U="class",af=" ",ah=300,aj=-1,am=(window.location.protocol==="https:");if(ak){if(navigator.appVersion.match(/MSIE/)){aj=parseFloat(navigator.appVersion.split("MSIE")[1])}else{aj=parseFloat(navigator.appVersion.split("; rv:")[1])}}return{$:function(at){return document.getElementById(at)},ca:"%01",cb:"%02",cc:"%03",cd:"%04",ce:"%05",cf:"%06",cg:"%07",ch:"%08",ylk_kv_delim:al.ylk_kv_delim||":",ylk_pair_delim:al.ylk_pair_delim||";",DATA_ACTION:"data-action",data_action_outcome:"data-action-outcome",isIE:ak,isIOSSafari:ae,isSafari:ap,isWebkit:ai,ieV:aj,MAX_VALUE_LENGTH:ah,hasOwn:function(au,at){return ac.hasOwnProperty.call(au,at)},enc:encodeURIComponent,dec:decodeURIComponent,curProto:function(){return(am?aq:ab)},isSecure:function(){return am},isScrollHorizontalVisible:function(){return document.documentElement.scrollWidth>document.documentElement.clientWidth},getCompStyle:function(at,au){if(window.getComputedStyle!==undefined){return window.getComputedStyle(at,au)}this.el=at;this.getPropertyValue=function(aw){var av=/(\-([a-z]){1})/g;if(aw=="float"){aw="styleFloat"}if(av.test(aw)){aw=aw.replace(av,function(){return arguments[2].toUpperCase()})}return at.currentStyle[aw]?at.currentStyle[aw]:0};return this},getBorder:function(at,au){if(!at||!au){return 0}var av=parseInt(this.getCompStyle(at,null).getPropertyValue(au),10);if(isNaN(av)){av=0}return av},getElementHeight:function(at){if(!at){return 0}var au=at.offsetHeight||0;if(!au){return 0}return(au-this.getBorder(at,"border-top-width")-this.getBorder(at,"border-bottom-width"))},getPositionTop:function(at){var au=0;while(at){au+=at.offsetTop;at=at.offsetParent}return au},getScrollbarWidthHeight:function(){var au=this.make("div");au.style.overflow="scroll";au.style.visibility="hidden";au.style.position="absolute";au.style.width="100px";au.style.height="100px";document.body.appendChild(au);var at={width:au.offsetWidth-au.clientWidth,height:au.offsetHeight-au.clientHeight};this.rmBodyEl(au);return at},isAboveFold:function(au){if(ak&&(aj<=7)){return true}var ax=au.getBoundingClientRect();var aw=this.getElementHeight(au);var ay=aw*0.5;if((ax.top+ay)<0){return false}var av=window.innerHeight||document.documentElement.clientHeight;if(this.isScrollHorizontalVisible()){var at=this.getScrollbarWidthHeight();av-=at.height}if((ax.bottom-ay)<=av){return true}},strip:function(au){var ay={"/":"P",";":"1","?":"P","&":"1","#":"P"};var ax={url:au,clean:"",cookie:"",keys:[]};var at=0;while(au.indexOf("_yl",at)!==-1){var az=au.indexOf("_yl",at);if(at<az){ax.clean+=au.slice(at,az-1)}at=az+3;if(ay[au.charAt(az-1)]&&au.charAt(az+4)==="="){ax.ult=1;var av="_yl"+au.charAt(az+3);var aw="";for(az=az+5;az<au.length&&!ay[au.charAt(az)];az++){aw+=au.charAt(az)}ax.keys.push(av);ax[av]=aw;if(av!=="_ylv"){ax.cookie+="&"+av+"="+aw}if(ay[au.charAt(az)]&&ay[au.charAt(az)]==="P"){ax.clean+=au.charAt(az)}at=az+1}else{ax.clean+=au.slice(az-1,at)}}if(ax.ult){ax.cookie=ax.cookie.substr(1);ax.clean+=au.substr(at);if(ax._ylv==="0"){}}return ax},prevDef:function(at){if(at.preventDefault){at.preventDefault()}else{at.returnValue=false}},appBodyEl:function(at){document.body.appendChild(at)},rmBodyEl:function(at){document.body.removeChild(at)},sa:function(au,at,av){au.setAttribute(at,av)},getScrollY:function(){var at=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;return at},make:function(av,au){var aw=document.createElement(av);if(au&&this.isObj(au)){for(var at in au){this.sa(aw,at,au[at])}}return aw},getXHR:function(){var au=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];function at(){var ax=false,av=au.length;for(var aw=0;aw<av;aw++){try{ax=au[aw]()}catch(ay){continue}break}return ax}return at()},hasLS:function(){try{return"localStorage" in window&&window.localStorage!==null}catch(at){return false}},hasCORS:function(){if(ak&&(aj<10)){return false}if("withCredentials" in (new XMLHttpRequest)){return true}else{if(typeof XDomainRequest!=="undefined"){return true}}return false},hasWorkers:function(){return !!window.Worker},clearCookie:function(at,av,au){av=av?av:"/";au=au?au:"";document.cookie=at+"= ; path="+av+"; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain="+au+";"},uniqConcat:function(av,at,aw){var ay=[],ax={};function au(aA){for(var aB=0,az=aA.length;aB<az;aB++){var aC=aA[aB];if(!aC){continue}var aD=aw(aC);if(!ax[aD]){ax[aD]=1;ay.push(aC)}}}au(av);au(at);return ay},trim:function(at){if(!at){return at}return at.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},extDomain:function(at){var au=at.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);return(au&&au[1])},getAttribute:function(au,at){var av="";if(!document.documentElement.hasAttribute&&(at===U)){at="className"}if(au&&au.getAttribute){av=au.getAttribute(at,2)}return av},isDate:function(at){return ac.toString.call(at)==="[object Date]"},isArr:function(at){return ac.toString.apply(at)==="[object Array]"},isStr:function(at){return typeof at==="string"},isNum:function(at){return typeof at==="number"&&isFinite(at)},isNumeric:function(at){return(at-0)==at&&(at+"").replace(/^\s+|\s+$/g,"").length>0},isObj:function(at){return(at&&(typeof at==="object"))},rTN:function(au){try{if(au&&3===au.nodeType){return au.parentNode}}catch(at){n(at)}return au},getTarget:function(au){var at=au.target||au.srcElement;return this.rTN(at)},addEvent:function(av,at,au){if(av.addEventListener){av.addEventListener(at,au,false)}else{if(av.attachEvent){av.attachEvent("on"+at,au)}}},rmEvent:function(av,at,au){if(av.removeEventListener){av.removeEventListener(at,au,false)}else{if(av.detachEvent){av.detachEvent("on"+at,au)}}},aug:function(av,au,aw){if(!au){return}for(var at in au){if(this.hasOwn(au,at)){if(aw&&!aw.call(null,at)){continue}av[at]=au[at]}}},rmProto:function(at){if(!at){return""}if(at.substr(0,7)===ab){return at.substr(7,at.length)}if(at.substr(0,8)===aq){return at.substr(8,at.length)}return at},norm:function(at){if(at===null){return""}at=""+at;return this.trim(at.replace(ao," ").replace(ad,""))},_hasClass:function(au,at){var aw=false,av;if(au&&at){av=this.getAttribute(au,U)||"";if(at.exec){aw=at.test(av)}else{aw=at&&(af+av+af).indexOf(af+at+af)>-1}}return aw},hasClass:function(aw,av){if(this.isArr(av)){for(var au=0,at=av.length;au<at;au++){if(this._hasClass(aw,av[au])){return true}}return false}else{if(this.isStr(av)){return this._hasClass(aw,av)}else{return false}}},quote:function(at){var au=/["\\\x00-\x1f\x7f-\x9f]/g,av={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},ay='"',aw='"';if(at.match(au)){var ax=at.replace(au,function(aA){var az=av[aA];if(typeof az==="string"){return az}az=aA.charCodeAt();return"\\u00"+Math.floor(az/16).toString(16)+(aA%16).toString(16)});return ay+ax+ay}return aw+at+aw},sfy:function(au){if(!au&&au!==""){return{}}var aw,aB=(typeof au);if(aB==="undefined"){return"undefined"}if(aB==="number"||aB==="boolean"){return""+au}if(aB==="string"){return this.quote(au)}if(typeof au.toJSON==="function"){return this.sfy(au.toJSON())}if(this.isDate(au)){var aA=au.getUTCMonth()+1,aD=au.getUTCDate(),aC=au.getUTCFullYear(),aE=au.getUTCHours(),av=au.getUTCMinutes(),aG=au.getUTCSeconds(),ay=au.getUTCMilliseconds();if(aA<10){aA="0"+aA}if(aD<10){aD="0"+aD}if(aE<10){aE="0"+aE}if(av<10){av="0"+av}if(aG<10){aG="0"+aG}if(ay<100){ay="0"+ay}if(ay<10){ay="0"+ay}return'"'+aC+"-"+aA+"-"+aD+"T"+aE+":"+av+":"+aG+"."+ay+'Z"'}aw=[];if(this.isArr(au)){for(var ax=0,az=au.length;ax<az;ax++){aw.push(this.sfy(au[ax]))}return"["+aw.join(",")+"]"}if(aB==="object"){for(var aH in au){if(this.hasOwn(au,aH)){var aI=typeof aH,at=null;if(aI==="string"){at=this.quote(aH)}else{if(aI==="number"){at='"'+aH+'"'}else{continue}}aI=typeof au[aH];if(aI!=="function"&&aI!=="undefined"){var aF="";if(au[aH]===null){aF='""'}else{if(au[aH]===0){aF=0}else{aF=this.sfy(au[aH])}}aw.push(at+":"+aF)}}}return"{"+aw.join(",")+"}"}},toJSON:(function(){var at=null;return function(au){if(!at){at=((typeof JSON==="object"&&JSON.stringify&&aj!==6&&aj!==7&&aj!==8)?JSON.stringify:this.sfy)}return at.call(this,au)}})(),executeOnLoad:(function(az){var aw=false,av=function(aA){if(document.addEventListener||(aA&&aA.type==="load")||document.readyState==="complete"){aw=true;au();az.call(this)}},au=function(){if(document.addEventListener){document.removeEventListener("DOMContentLoaded",av,false);window.removeEventListener("load",av,false)}else{document.detachEvent("onreadystatechange",av);window.detachEvent("onload",av)}};if(document.readyState==="complete"){setTimeout(av)}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",av,false);window.addEventListener("load",av,false)}else{document.attachEvent("onreadystatechange",av);window.attachEvent("onload",av);var ay=false;try{ay=window.frameElement==null&&document.documentElement}catch(ax){}if(ay&&ay.doScroll){(function at(){if(!aw){try{ay.doScroll("left")}catch(aA){return setTimeout(at,50)}au();az.call(this)}})()}}}}),getLinkContent:function(at){for(var au=0,av="",aw;((aw=at.childNodes[au])&&aw);au++){if(aw.nodeType===1){if(aw.nodeName.toLowerCase()==="img"){av+=(this.getAttribute(aw,"alt")||"")+" "}av+=this.getLinkContent(aw)}}return av},fData:function(at){if(this.isStr(at)){return at}return this.toJSON(at)},getLT:function(at,au){if(!at){return"_"}var av="";au=au.toLowerCase();if(at.nodeName.toLowerCase()==="input"){av=this.getAttribute(at,"value")}else{if(au==="text"){if(ai){av=at.textContent}else{av=(at.innerText?at.innerText:at.textContent)}}else{if(au==="href"){av=this.rmProto(this.getAttribute(at,"href"))}else{av=this.getAttribute(at,au)||""}}}av=this.norm(av);if(av===""){av=this.norm(this.getLinkContent(at))}if(av&&av.length>j.MAX_VALUE_LENGTH){av=av.substring(0,j.MAX_VALUE_LENGTH)}return(av===""?"_":av)},clref:function(at){if(at.indexOf(ab)!==0&&at.indexOf(aq)!==0){return""}var au=this.strip(at);return au.clean||au.url},cold:function(){if(screen){return screen.colorDepth||screen.pixelDepth}return"unknown"},sr:function(at){return(screen?screen.width+(at?at:",")+screen.height:"")},xy:function(aw){function au(){var ay=document.documentElement,az=document.body;if(ay&&(ay.scrollTop||ay.scrollLeft)){return[ay.scrollTop,ay.scrollLeft]}else{if(az){return[az.scrollTop,az.scrollLeft]}else{return[0,0]}}}var av=null,at=aw.pageX,ax=aw.pageY;if(ak){av=au()}if(!at&&0!==at){at=aw.clientX||0;if(ak){at+=av[1]}}if(!ax&&0!==ax){ax=aw.clientY||0;if(ak){ax+=av[0]}}return at+","+ax},hasCC:function(av){for(var au=0,at=av.length;au<at;au++){var aw=av.charCodeAt(au);if(aw<32||aw==="="){return true}}return false},isValidPair:function(au,at){if(au.length>8||at.length>j.MAX_VALUE_LENGTH){Q("Invalid key/value pair ("+au+"="+at+") Size must be < 8/300 respectively.");return false}return true},ser:function(az,av){if(!az){return""}if(typeof av===undefined){av=true}var aA=[],ay="";for(var aw in az){if(this.hasOwn(az,aw)){var au=aw,at=az[aw];if(au===null||at===null){continue}au=au+"";at=at+"";if(at&&at.length>j.MAX_VALUE_LENGTH){at=at.substring(0,j.MAX_VALUE_LENGTH)}if(!this.isValidPair(au,at)){continue}if(!this.hasCC(au)&&!this.hasCC(at)){ay="";at=this.trim(at);if((at===""||at===" ")&&av){at="_"}try{ay=this.enc(au+"\x03"+at);ay=ay.replace(/'/g,"%27")}catch(ax){ay="_ERR_ENCODE_";n(ax)}aA.push(ay)}}}return aA.join(this.cd)},rand:function(){var at=0,au="",aw="";while(at++<16){var av=Math.floor(Math.random()*62);if(av<10){aw=av}else{aw=String.fromCharCode(av<36?av+55:av+61)}au+=aw}return au},tms:function(){return +new Date()},cookEn:function(){var au=(navigator.cookieEnabled)?1:0,at="rapidtc";if(typeof navigator.cookieEnabled=="undefined"&&!au){document.cookie=at+"=1";au=(document.cookie.indexOf("testcookie")!=-1)?true:false;document.cookie=at+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}return au},isResCF:function(au){var at={14:1,15:1,18:1,19:1,20:1};return at[au]},isTagOfInterest:function(aw,at){for(var av=0,au=at.length;av<au;av++){if(aw.tagName&&aw.tagName.toLowerCase()==at[av].toLowerCase()){return true}}return false}}}};

(function () {
var document = window["document"];


var YAD = {};

YAD.Error = function (message) {
    this.message = message;
};

/**
 * Yahoo Ad Syndication Widget
 * @constructor
 */
YAD.Widget = function (publisherId, config, snippetLoadedAt) {
    var defaults = {};

    // note down how long it took for all the files to load
    this.widgetInitialisationStartedAt = YAD.Helper.timeSinceNavigationStart();
    this.snippetLoadedAt = snippetLoadedAt ? YAD.Helper.timeSinceNavigationStart(snippetLoadedAt) : null;
    this.analytics = null;
    this.requestID = YAD.Helper.Ajax.generateRequestID();

    // we clone it to prevent YAD.Helper from overwriting the supposidly static defaults
    defaults = YAD.Helper.clone(YAD.Widget.DEFAULT_CONFIG);

    this.mergeConfig(defaults, config);

    if (!publisherId && !this.config['iframe']) {
        throw new YAD.Error('No publisherId was supplied');
    }

    if (publisherId && this.config['iframe']) {
        // defensive code
        // if the user supplies a publisher id, they can't be in our iframe.
        this.config['iframe'] = false;
    }
    //turn the snippet config override flag on and pass this param to brewer only when the value exist in snippet config
    this.config['ads_target_override'] = !!(config && config['ads_link_target']);
    this.config['content_target_override'] = !!(config && config['content_link_target']);

    if (!this.config['analytics']['pageURL']) {
        this.config['analytics']['pageURL'] = YAD.Helper.detectPageURL();
    }

    if (!this.config['analytics']['referrer']) {
        this.config['analytics']['referrer'] = YAD.Helper.detectReferrer();
    }

    if (!this.config['canonicalURL']) {
        this.config['canonicalURL'] = YAD.Helper.detectCanonical();
    }

    if (this.config['canonicalURL']) {
        this.config['analytics']['canonicalURL'] = this.config['canonicalURL'];
    }

    // defaults
    this.iframeParentDomain = '*';
    this.iframeParentWindow = window['parent'];


    // set the default brew path
    if (! this.config['brew']['path']) {
        this.config['brew']['path'] = YAD.Widget.API_PATH;
    }

    // we use it to append the widget straight after the calling <script> element
    // feel free to pass a Node if you need to
    if (!this.config['element']) {
        this.config['element'] = YAD.Helper.detectScriptTag();
    }

    // this is the unique identifier for this widget on the page.
    // No two widgets on a page should have the same id
    if (typeof this.config['id'] !== 'number') {
        throw new YAD.Error('ID is required and must be a number.');
    }
    this.id = this.config['id'];
    this.config['templateOptions']['id'] = this.id;

    this.publisherId = publisherId;
    this.user = {};
    this.publisher_name = '';
    this.customCSS = null;
    this.configCSS = null;
    this.cssURLs = [];
    this.themeType = null;
    this.unloadEventFired = false;
    this.currentPosition = {};

    this.init();
};

YAD.Widget.DEFAULT_CONFIG = {
    'template': '',
    'title': '',
    'analytics': {
        'type': 'rapid',
        'publisherId': null,
        'isYahooOwned': false,
        'requestID': '',
        'ccode': '',
        'page_url': null
    },
    'templateOptions': {
        'displayUsername': true,
        'logoPosition': 'bottom',
        'lang': 'en-US'
    },
    'canonicalURL': null,
    'ads_only': false,
    'iframe': false,
    'ads_link_target': '_blank', // The target of every kind of content
    'content_link_target': '_top',
    'web_link_target': '_blank',
    'brew': {
        'path': null, // set by YAD.Widget.API_PATH in the init. The variable is added in the environment config so cant be added here
        'secured': true
    },
    'after': null // the element to append the widget after. if null, this is auto detected.
};

YAD.Widget.DEFAULT_TITLE = 'Recommended';

// path to the brew request
// YAD.Widget.API_PATH = 'http://expectsoil-dl.london.corp.yahoo.com:4080/syndication/rest/brew';

YAD.Widget.prototype = {

    /**
     * Initialise the widget and options based on config
     */
    init: function () {
        this.validate(!this.isInIframe()); // if we're in an iframe, don't validate the publisher id yet
        this.adList = new YAD.List();
        this.recirculationList = new YAD.List();
        this.aroundTheWebList = new YAD.List();

        if (this.isInIframe()) {
            this.listen();
        }

        this.onReady();
    },

    setRenderer: function (template) {
        this.config['template'] = template;
        // set the template
        switch (template) {
        case 'single-column-text':
            // one column, no images
            this.renderer = new YAD.Renderer.SingleColumnText(this.config['templateOptions']);
            break;
        case 'single-column-thumbnail':
            // one column with thumbnail images
            this.renderer = new YAD.Renderer.SingleColumnThumbnail(this.config['templateOptions']);
            break;
        case 'dual-column-thumbnail':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualColumnThumbnail(this.config['templateOptions']);
            break;
        case 'dual-column-text':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualColumnText(this.config['templateOptions']);
            break;
        case 'dual-column-text-web':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualColumnTextWeb(this.config['templateOptions']);
            break;
        case 'dual-column-thumbnail-web':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualColumnThumbnailWeb(this.config['templateOptions']);
            break;
        case 'single-row-carousel':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.SingleRowCarousel(this.config['templateOptions']);
            break;
        case 'dual-row-carousel':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualRowCarousel(this.config['templateOptions']);
            break;
        case 'dual-row-carousel-web':
            // two columns with thumbnail images
            this.renderer = new YAD.Renderer.DualRowCarouselWeb(this.config['templateOptions']);
            break;
        case 'instrumentation-beacon':
            // treat instrumentation-beacon as a single-column-text module - for
            // lack of implementation for instrumentation-beacon renderer
            this.renderer = new YAD.Renderer.SingleColumnText(this.config['templateOptions']);
            break;
        default:
            // one column, no images
            this.renderer = new YAD.Renderer.SingleColumnText(this.config['templateOptions']);
            this.config['template'] = 'single-column-text';
            break;
        }

    },

    validate: function (validatePublisherId) {
        if (!this.validBrewer(this.config['brew']['path'])) {
            throw new YAD.Error('Invalid brew path');
        }

        // validatePublisherId is here because we don't want to validate it if we're in
        // an iframe and we're on the init. We only want to validate it if we are:
        // a) Not in an iframe
        // b) We've received the config from bootstrap via postmessage
        if (validatePublisherId && !this.validPublisherId(this.publisherId)) {
            throw new YAD.Error('Invalid publisherId');
        }
    },

    /**
     * Must check for valid brew URL to prevent XSS.
     *
     * Naughty people could send a PostMessage, overriding the brew path to some random script.
     * http://stage.syndication.streamads.yahoo.com/na_stream_brewer/v1/brew
     * @param  {String} brewPath The path to validate
     * @return {Boolean}          returns true if it's a valid url
     */
    validBrewer: function (brewPath) {
        var allButProtocol = brewPath.split('//')[1],
            server = allButProtocol.split('/')[0],
            domain = server.split(':')[0];

        return domain.indexOf('yahoo.com', domain.length - "yahoo.com".length) !== -1;
    },

    /**
     * Must check for valid publisherId so that naughty people don't override it via PostMessage
     * @param  {String} publisherId the publisher ID to check
     * @return {Boolean}            returns true if the format of the publisher id is allowed
     */
    validPublisherId: function (publisherId) {
        return (/^[a-zA-Z0-9._-]+$/).test(publisherId);
    },

    /**
     * Add the event listener to hear for events from parent page if we're in an iframe
     * No need to call this if we're not in an iframe
     */
    listen: function () {
        return YAD.PostMessage.listen(this.onReceivePostMessage, '*', this);
    },

    /**
     * When a message is received from the parent frame, call this
     * @param  {Object} data         the payload
     * @param  {String} origin       the origin that send this
     * @param  {Object} parentWindow the window object of the sender
     */
    onReceivePostMessage: function (data, origin, parentWindow) {
        try {
            switch (data['action']) {
            case 'init':
                this.mergeConfig(this.config, data['config']);
                this.config['ads_target_override'] = !!(data['config'] && data['config']['ads_link_target']);
                this.config['content_target_override'] = !!(data['config'] && data['config']['content_link_target']);
                this.publisherId = data['cid'];
                this.id = +data['id'];
                this.iframeId = +data['id'];
                this.config['templateOptions']['id'] = +this.id;
                this.widgetInitialisationStartedAt = data['tti'];
                this.snippetLoadedAt = data['tts'];
                this.iframeParentPageURL = data['url'];
                this.iframeParentDomain = origin;
                this.iframeParentWindow = parentWindow;
                this.validate(true);
                this.fetch();
                break;
            case 'inViewport':
                this.onInViewport();
                break;
            case 'scroll':
                this.currentPosition = {
                    scrollTop: data['scrollTop'],
                    scrollLeft: data['scrollLeft'],
                    viewportWidth: data['width'],
                    viewportHeight: data['height'],
                };
                this.onScrollRotationBeacon();
                break;
            case 'focus':
                this.onFocus();
                break;
            case 'blur':
                this.onBlur();
                break;
            }
        } catch (e) {
            try {
                YAD.Helper.Ajax.ajax(YAD.Widget.LOG_PATH, {
                  'exception' : e.message,
                  'type': 'widget:postmessage:' + data['action'],
                  'cid': (data && data['cid']) || this.publisherId,
                  'pvid': this.config['pageviewID'],
                  'url': (data && data['url']) || this.iframeParentPageURL || (window['location'] && window['location']['href'])
                });
            } catch (e2) {}
            throw e;
        }
    },

    /**
     * On scroll or resize, call analytics to deal with linkview & adsview beacon sending
     */
    onScrollRotationBeacon: function () {
        if(this.analytics) {
            this.analytics.onWindowLoadScrollResize(this, this.currentPosition.scrollTop, this.currentPosition.scrollLeft, this.currentPosition.viewportWidth, this.currentPosition.viewportHeight);
        }
    },

    /**
     * This is called when the widget enters the viewport.
     * Primarily used for linkviews.
     */
    onInViewport: function () {
        this.sendModuleview();
    },

    /**
     * Send module-view (moduleview) event with the total number of item as param
     * 2 params are sent with moduleview, one for loadedItemCount, the other for itemCount there SHOULD be
     * Ideally they should be equal, otherwise there may be some race condition that we send moduleview before all links loaded
     */
    sendModuleview: function () {
        var loadedLinks,
            loadedLinkCount = 0;

        if (!this.moduleviewSent && !this.isEmpty() && this.analytics) {
            this.moduleviewSent = true;

            if (this.template) {
                loadedLinks = this.template.querySelectorAll('.yad-item, .yad-learn-more-container, .yad-footer-logo-container');
                loadedLinkCount = (loadedLinks && loadedLinks.length) || 0;
            }

            this.analytics.sendEvent('trackmodule', this.getElementId());
            this.analytics.sendEvent('moduleview', {'link_ct': this.getItemCount() + 2, 'load_ct': loadedLinkCount}); //add 2 links for "learn more" and yahoo logo
        }
    },

    onFocus: function() {
        this.sendFocusEvent();
    },

    sendFocusEvent: function() {
        if (this.analytics) {
            this.analytics.sendEvent('yad-module-focus');
        }
    },

    onBlur: function() {
        this.sendBlurEvent();
    },

    sendBlurEvent: function() {
        if (this.analytics) {
            this.analytics.sendEvent('yad-module-blur');
        }
    },

    /**
     * When we're ready, send a ready message to the parent
     */
    onReady: function () {
        this.sendPostMessage({
            'action': 'ready'
        });
    },

    /**
     * Communicate with iframe parent window.
     *
     * Send a message to the parent. The standard here should be that message is an object.
     * {
     *     action: 'click',
     *     params: {
     *         some: 'other data'
     *     }
     * }
     *
     * @param  {Object} message the payload to send
     */
    sendPostMessage: function (message) {
        if (!message) {
            throw new YAD.Error('No message supplied');
        }

        message['id'] = this.iframeId;
        return YAD.PostMessage.send(message, this.iframeParentDomain, this.iframeParentWindow);
    },

    /**
     * Merge two config objects and set the config
     * @param  {Object} a defaults
     * @param  {Object} b overriding config
     * @return {Object}   reference to this.config
     */
    mergeConfig: function (a, b) {
        this.config = YAD.Helper.merge(a, b);

        if (this.config['canonicalURL']) {
            this.config['analytics']['canonicalURL'] = this.config['canonicalURL'];
        }

        return this.config;
    },

    /**
     * Initialise the analytics
     */
    initAnalytics: function () {
        this.config['analytics']['template'] = this.config['template'];
        this.config['analytics']['publisherId'] = this.publisherId;
        this.config['analytics']['pageviewID'] = this.config['pageviewID'];
        this.config['analytics']['inframe'] = this.config['inframe'];
        this.config['analytics']['requestID'] = this.requestID;
        this.config['analytics']['publisherUUID'] = this.config['publisher_uuid'];
        this.config['analytics']['bucketID'] = this.config['bucket_id'];

        if (this.config['analytics']['click_postmsg']) {
            this.config['analytics']['click_postmsg']['origin'] = this.iframeParentDomain;
            this.config['analytics']['click_postmsg']['window'] = this.iframeParentWindow;
        }

        switch (this.config['analytics']['type'].toLowerCase()) {
        case 'rapid':
        case 'ywa':
            this.analytics = new YAD.Analytics.Rapid(this.config['analytics']);

            // hook on to beforeunload/unload event and fire a module unload event when the user
            // is done with the page containing the module - we are handling
            // both events to ensure that it works across all browsers
            YAD.Helper.bind('beforeunload', window, this.unloadHandler, this);
            YAD.Helper.bind('unload', window, this.unloadHandler, this);

            break;
        default:
            throw new YAD.Error('Unknown analytics type: ' + this.config['analytics']['type'].toLowerCase());
        }
    },

    /**
     * Grabs the content from the Brew REST endpoint and calls to render the widget
     * once the data has loaded
     */
    fetch: function () {
        // override the template's params with the config
        var data = {}, rss, options, path, cssOptions = {};

        options = {
            'cid': this.publisherId,
            'url': this.windowLocation(),
            'v': YAD.VERSION,
            'rid': this.requestID,
            'pvid': this.config['pageviewID'],
            'mode': this.isInIframe() ? 'i' : 'd',

            // if there was a problem getting ads, return that number of content instead
            // if 2 ad items are requested, and 3 content and there was a problem getting the
            // ads, returns 5 content items instead
            'fill': true
        };

        if('' !== this.config['template']) {
            options['template'] = this.config['template'];
        }

        rss = YAD.Helper.getRSSUrls();

        if (rss && rss.length > 0) {
            options['rss'] = rss;
        }

        if (this.widgetInitialisationStartedAt) {
            options['tti'] = this.widgetInitialisationStartedAt;
        }
        if (this.snippetLoadedAt) {
            options['tts'] = this.snippetLoadedAt;
        }

        if (this.config['canonicalURL']) {
            options['canonical'] = this.config['canonicalURL'];
        }

        if (this.config['tracking']) {
            options['publisher_url_params'] = this.config['tracking'];
        }

        if (this.config['theme_type']) {
            options['theme_type'] = this.config['theme_type'];
        }

        if (this.config['bypassCanvasCache']) {
            options['bypassCanvasCache'] = this.config['bypassCanvasCache'];
        }

        if (this.config['ads_target_override'] && this.config['ads_link_target']) {
            options['ads_link_target'] = this.config['ads_link_target'];
        }

        if (this.config['content_target_override'] && this.config['content_link_target']) {
            options['content_link_target'] = this.config['content_link_target'];
        }

        cssOptions = this.getCssOptions();

        options = YAD.Helper.merge(options, cssOptions);

        // TODO refactor horrible ifs
        if (this.renderer && this.renderer.queryOptions) {
            data = YAD.Helper.clone(this.renderer.queryOptions);
            YAD.Helper.merge(data, options);
        } else {
            data = options;
        }

        // we want all the brew options but not the api path in the querystring
        path = this.config['brew']['path'];

        YAD.Helper.merge(data, this.config['brew']);

        delete data['path'];

        // disable SSL for debugging
        if (!this.config['brew']['secured'] && path.substring(0, 8) === 'https://') {
            path = 'http://' + path.substring(8);
        }

        // TODO find a better way of calling render - maybe use promises
        // TODO fix scope
        YAD.Helper.Ajax.ajax(path, data, this.onData, function () {
            // hide the widget
            this.hide();

            // Fire Page view even on error
            this.config['template'] = 'error';
            this.initAnalytics();

            // propagate error to parent
            if (this.isInIframe()) {
                this.sendPostMessage({
                    'action': 'error'
                });
            } else {
                // in dom mode - execute error callback
                if(this.config['onError'] && ('function' === typeof(this.config['onError']))) {
                    var error = new Error('brewer call failed');
                    this.config['onError'].apply(this, [error]);
                }
            }
        }, this);
    },


    /**
     * extract styling options from snippet parameters
     * @param config object passed from snippet
     * @return object containing only css options
     */
    getCssOptions: function() {
        var allOptions = {
                header_color: 1,
                header_font_size: 1,
                header_font_weight: 1,
                header_font_family: 1,
                header_background_color: 1,
                widget_background_color: 1,
                title_color: 1,
                title_hover_color: 1
            },
            cssOptions = {};

        for(var i in allOptions) {
            if (allOptions.hasOwnProperty(i)) {
                if(this.config.hasOwnProperty(i)) {
                    cssOptions[i] = this.config[i];
                }
            }
        }

        return cssOptions;
    },


    /**
     * When data is recieved, process and render
     * @param  {Object} response the response from the ajax call
     * @return {null}
     */
    onData: function(response) {
        var widget;

        // hydrate the lists with data
        this.processResponse(response);

        // init renderer once we have template from brewer
        this.setRenderer(this.config['template']);

        // Fire Page view
        this.initAnalytics();

        // notify the parent frame that we have data
        if (this.isInIframe()) {
            this.sendPostMessage({
                'action': 'data'
            });
        }

        // if we do not have a successful response status, don't render, but
        // hide the module immediately - can happen when the module is marked
        // invisible or if it is just a instrumentation beacon module
        if(!response || !response.status || 'SUCCESS' !== response.status) {
            this.hide();
            return;
        }

        // render the widget
        widget = this.render(this.renderer);

        // note down how long it took for all the files to load
        this.widgetRenderedAt = YAD.Helper.timeSinceNavigationStart();
    },

    /**
     * Helper function to get correct image smart crop type in upper case. Internal use only.
     */
    _getImageCropType: function(cropType) {
        var validTypeArray = {'SQUARE': 1, 'LANDSCAPE': 1},
            uppercaseCropType;

        if (cropType) {
            uppercaseCropType = cropType.toString().toUpperCase();
            if (validTypeArray.hasOwnProperty(uppercaseCropType)) {
                return uppercaseCropType;
            }
        }
        return 'SQUARE';
    },

    /**
     * Process the response from the brew call - hydrate the lists
     */
    processResponse: function (response) {
        var i, item, itemParams, imgCropType;

        imgCropType = this._getImageCropType(response['image_smart_crop_type']);

        // add the ads to the ads list
        if (response['ads']) {
            for (i = 0; i < response['ads'].length; i += 1) {
                itemParams = response['ads'][i];
                itemParams.sponsored = true;
                itemParams.target = response['ads_link_target'] || YAD.Widget.DEFAULT_CONFIG['ads_link_target'];
                itemParams.image_smart_crop_type = imgCropType;
                itemParams.includeSummary = response['adsSummaryEnabled'];
                itemParams.widget = this;
                if (response['adSourceDisplayDisabled'] || !itemParams.attribution) {
                    itemParams.attribution = '';
                }
                item = new YAD.Item(itemParams);
                this.adList.add(item);
            }
        }

        // add the recirculation content to the recirculation list
        if (response['recirc']) {
            for (i = 0; i < response['recirc'].length; i += 1) {
                itemParams = response['recirc'][i];
                itemParams.target = response['content_link_target'] || YAD.Widget.DEFAULT_CONFIG['content_link_target'];
                itemParams.image_smart_crop_type = imgCropType;
                itemParams.includeSummary = response['sourceSummaryEnabled'];
                itemParams.widget = this;
                item = new YAD.Item(itemParams);
                this.recirculationList.add(item);
            }
        }

        // add the recirculation content to the recirculation list
        if (response['web']) {
            for (i = 0; i < response['web'].length; i += 1) {
                itemParams = response['web'][i];
                itemParams.aroundTheWeb = true;
                itemParams.target = YAD.Widget.DEFAULT_CONFIG['web_link_target'];
                itemParams.image_smart_crop_type = imgCropType;
                itemParams.widget = this;
                item = new YAD.Item(itemParams);
                this.aroundTheWebList.add(item);
            }
        }


        if (response['first_name']) {
            this.user.first_name = response['first_name'];
        }

        if (response['publisher_name']) {
            this.publisher_name = response['publisher_name'];
        }

        if (response['css']) {
            this.customCSS = response['css'];
        }

        if (response['config_css']) {
            this.configCSS = response['config_css'];
        }

        if (response['css_urls']) {
            this.cssURLs = response['css_urls'];
        }

        if (response['theme_type']) {
            this.themeType = response['theme_type'];
        }

        if (response['meta'] && response['meta']['ccodes'] && response['meta']['ccodes']['recirc']) {
            this.config['analytics']['ccode'] = response['meta']['ccodes']['recirc'];
        }

        if (!this.config['title'] && response['title']) {
            this.config['title'] = response['title'];
        }

        if (response['template'] && ('' === this.config['template'])) {
            this.config['template'] = response['template'];
        }

        if (response['publisher_uuid']) {
            this.config['publisher_uuid'] = response['publisher_uuid'];
        }

        if (response['bucket_id']) {
            this.config['bucket_id'] = response['bucket_id'];
        }

        if (response['animation_enabled']) {
            this.config['templateOptions']['animation_enabled'] = response['animation_enabled'];
            if (response['animation']) {
                this.config['templateOptions']['animation'] = response['animation'];
            }
        }

        if (response['window_size']) {
            this.config['templateOptions']['window_size'] = response['window_size'];
        }

        if (response['lang']) {
            this.config['templateOptions']['lang'] = response['lang'];
        }
    },

    /**
     * Return the data in a similar format to the REST call but with objects
     */
    getResults: function () {
        return {
            ads: this.getAds(),
            recirculation: this.getRecirculationContent(),
            web: this.getAroundTheWebContent()
        };
    },

    /**
     * Return the YAD.List of ads
     */
    getAds: function () {
        return this.adList;
    },

    /**
     * Return the YAD.List of content
     */
    getRecirculationContent: function () {
        return this.recirculationList;
    },

    /**
     * Return the YAD.List of content
     */
    getAroundTheWebContent: function () {
        return this.aroundTheWebList;
    },

    /**
     * This is only really here for Rapid
     * @return {String} the id of the widget <div>
     */
    getElementId: function () {
        return this.renderer.getElementId();
    },

    /**
     * Clear all the data and reset
     */
    clearAll: function () {
        this.adList.empty();
        this.recirculationList.empty();
        this.aroundTheWebList.empty();
    },

    /**
     * Does this widget have any thing to show? is it empty?
     * If there's no recirc, no atw and no ads (if we're in ads_only mode)
     * return true
     */
    isEmpty: function () {
      return this.getRecirculationContent().isEmpty() &&
          this.getAroundTheWebContent().isEmpty() &&
          (!this.config['ads_only'] || this.adList.isEmpty());
    },

    /**
     * Get the number of items in this widget
     */
    getItemCount: function () {
        return this.getRecirculationContent().getLength() + this.getAroundTheWebContent().getLength() + this.getAds().getLength();
    },

    /**
     * Render the widget.
     */
    render: function (renderer) {
        // get the renderer to draw the widget
        return renderer.widget(this);
    },

    /**
      * If we're in an iframe, and theres no content, the renderer should call this
      * so we're not left with whitespace on the page
      */
    tellParentFrameToCollapse: function () {
        if (this.isInIframe()) {
            this.sendPostMessage({
                'action': 'hide'
            });
        }
    },

    isInIframe: function () {
        return !! this.config['iframe'];
    },

    /**
     * Bind relevant events to the rendered dom nodes
     */
    bind: function (template) {
        var about = template.querySelector('.yad-about');

        // TODO find a better way of doing this
        this.template = template;

        if(this.analytics) {
            this.analytics.bind(this);
        }

        // here for convenience
        if (this.isInIframe()) {
            YAD.PostMessage.sendHeight(this.iframeParentDomain, this.iframeParentWindow, {
                id: this.iframeId
            });
        }

        if (about) {
            YAD.Helper.bind('click', about, function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                if (this.isInIframe()) {
                    this.sendPostMessage({
                        action: 'about',
                        lang: this.config['templateOptions']['lang']
                    });
                } else {
                    new YAD.Lightbox(this.config['templateOptions']['lang']); //initialize lightbox
                }
            }, this);
        }
    },

    /**
     * This is in a separate funciton so we can mock it
     * @return {string} the current url of the page
     */
    windowLocation: function () {
        return this.isInIframe() ? this.iframeParentPageURL : window['location']['href'];
    },

    hasCustomCSS: function () {
        return !! this.customCSS;
    },

    getCustomCSS: function () {
        return this.customCSS;
    },

    hasConfigCSS: function () {
        return !! this.configCSS;
    },

    getConfigCSS: function () {
        return this.configCSS;
    },

    hasCSSURLs: function () {
        return (this.cssURLs.length) ? true : false;
    },

    getCSSURLs: function () {
        return this.cssURLs;
    },

    getThemeType: function () {
        return this.themeType;
    },

    getUserFirstName: function () {
        return this.config['templateOptions']['displayUsername']? this.user.first_name: false;
    },

    getModuleTitle: function () {
        return this.config['title'];
    },

    getCanvasId: function () {
        return this.publisherId;
    },

    getPublisherName: function () {
        return this.publisher_name;
    },

    getElement: function () {
        return this.config['element'];
    },

    isAdsOnly: function () {
        return this.config['ads_only'];
    },

    hide: function () {
        this.tellParentFrameToCollapse();
        this.getElement().style.display = "none";
        this.getElement().className += " yad-empty";
    },

    unloadHandler: function () {
        if(!this.unloadEventFired && this.analytics) {
            this.analytics.sendEvent('yad-module-unload');
            this.unloadEventFired = true;
        }
    }
};

YAD.Translation = {}; 

YAD.Translation["en-US"] = {
    "LEARN_MORE": "Learn more",
    "POWER_BY": "Powered by",
    "FOR": "for",
    "CONTENT_RECOMM_DESC": "This content was recommended to you by Yahoo’s content personalization technology. We hope you enjoy the content that we recommend.",
    "VIEW_OUR": "View our",
    "PRIVACY_POLICY": "privacy policy",
    "PERIOD": ".",
    "CONTACT_US": "Contact us",
    "ADD_YAHOO": "to add Yahoo recommends to your site.",
    "ADVERTISE": "Advertise",
    "TO_YAHOO_USERS": "to Yahoo users.",
    "SPONSORED": "Sponsored",
    "RECOMMENDED": "Recommended",
    "YOU": "you",
    "THIS_SITE": "this site"
};

YAD.Translation["es-ES"] = {
    "LEARN_MORE": "Más información",
    "POWER_BY": "Powered by",
    "FOR": "del",
    "CONTENT_RECOMM_DESC": "Este contenido se te ha recomendado a través de la tecnología de personalización de contenido de Yahoo. Esperamos que disfrutes del contenido recomendado.",
    "VIEW_OUR": "Consulta nuestra",
    "PRIVACY_POLICY": "política de privacidad",
    "PERIOD": ".",
    "CONTACT_US": "Contacta con nosotros",
    "ADD_YAHOO": "para añadir recomendaciones de Yahoo a tu sitio.",
    "ADVERTISE": "Anúnciate",
    "TO_YAHOO_USERS": "a usuarios de Yahoo.",
    "SPONSORED": "Patrocinado",
    "RECOMMENDED": "Recomendaciones",
    "YOU": "ti",
    "THIS_SITE": "este sitio"
};

YAD.Translation["es-MX"] = {
    "LEARN_MORE": "Learn more",
    "POWER_BY": "Powered by",
    "FOR": "for",
    "CONTENT_RECOMM_DESC": "This content was recommended to you by Yahoo’s content personalization technology. We hope you enjoy the content that we recommend.",
    "VIEW_OUR": "View our",
    "PRIVACY_POLICY": "privacy policy",
    "PERIOD": ".",
    "CONTACT_US": "Contact us",
    "ADD_YAHOO": "to add Yahoo recommends to your site.",
    "ADVERTISE": "Advertise",
    "TO_YAHOO_USERS": "to Yahoo users.",
    "SPONSORED": "Sponsored",
    "RECOMMENDED": "Recommended",
    "YOU": "you",
    "THIS_SITE": "this site"
};

YAD.Translation["es-US"] = {
    "LEARN_MORE": "Learn more",
    "POWER_BY": "Powered by",
    "FOR": "for",
    "CONTENT_RECOMM_DESC": "This content was recommended to you by Yahoo’s content personalization technology. We hope you enjoy the content that we recommend.",
    "VIEW_OUR": "View our",
    "PRIVACY_POLICY": "privacy policy",
    "PERIOD": ".",
    "CONTACT_US": "Contact us",
    "ADD_YAHOO": "to add Yahoo recommends to your site.",
    "ADVERTISE": "Advertise",
    "TO_YAHOO_USERS": "to Yahoo users.",
    "SPONSORED": "Sponsored",
    "RECOMMENDED": "Recommended",
    "YOU": "you",
    "THIS_SITE": "this site"
};

YAD.Translation["pt-BR"] = {
    "LEARN_MORE": "Saiba mais",
    "POWER_BY": "Desenvolvido por",
    "FOR": "para",
    "CONTENT_RECOMM_DESC": "Este conteúdo foi recomendado para você pela tecnologia de personalização de conteúdo do Yahoo. Esperamos que você goste do conteúdo que recomendamos.",
    "VIEW_OUR": "Veja nossa",
    "PRIVACY_POLICY": "política de privacidade",
    "PERIOD": ".",
    "CONTACT_US": "Fale conosco",
    "ADD_YAHOO": "para adicionar as recomendações do Yahoo ao seu site.",
    "ADVERTISE": "Anuncie",
    "TO_YAHOO_USERS": "para usuários do Yahoo.",
    "SPONSORED": "Patrocinado",
    "RECOMMENDED": "Recomendado",
    "YOU": "você",
    "THIS_SITE": "este site"
};


YAD.Links = {};

YAD.Links['en-US'] = {
        "PRIVACY_CENTER": "http://info.yahoo.com/privacy/us/yahoo/details.html",
        "WHY_THIS_ADS": "http://info.yahoo.com/privacy/us/yahoo/relevantads.html"
    };

YAD.Links['pt-BR'] = {
        "PRIVACY_CENTER": "http://info.yahoo.com/privacy/pt/yahoo/details.html",
        "WHY_THIS_ADS": "http://info.yahoo.com/privacy/pt/yahoo/relevantads.html"
    };

YAD.Links['es-ES'] = {
        "PRIVACY_CENTER": "http://info.yahoo.com/privacy/es/yahoo/details.html",
        "WHY_THIS_ADS": "http://info.yahoo.com/privacy/es/yahoo/relevantads.html"
    };

YAD.Links['es-US'] = {
        "PRIVACY_CENTER": "http://info.yahoo.com/privacy/es/yahoo/details.html",
        "WHY_THIS_ADS": "http://info.yahoo.com/privacy/es/yahoo/relevantads.html"
    };

YAD.FeatureWhitelists = {
    'ads-linkview': {
        '332922b7-041e-3a25-9adc-432e7e91ab1c': 1
    }
};

/**
 * This is an object that contains a bunch of library functions
 * @type {Object}
 */
YAD.Helper = {

    /**
     * Rapid likes short names. This is a simple helper to create shortnames for tempates.
     * @param  {String} longname the proper template name to convert
     * @return {String}          the shortname for ABF's sake
     */
    templateShortname: function (longname) {
        switch(longname) {
        case 'single-column-text':
            return 'sctext';
        case 'single-column-thumbnail':
            return 'scthumb';
        case 'dual-column-thumbnail':
            return 'dcthumb';
        case 'dual-column-text':
            return 'dctext';
        case 'dual-column-text-web':
            return 'dcwtext';
        case 'dual-column-thumbnail-web':
            return 'dcwthumb';
        case 'single-row-carousel':
            return 'srcarousel';
        case 'dual-row-carousel':
            return 'drcarousel';
        case 'dual-row-carousel-web':
            return 'drwcarousel';
        case 'instrumentation-beacon':
            return 'insbeacon';
        case 'error':
            return 'error';
        default:
            throw new YAD.Error('Could not get shortname for template: ' + longname);
        }
    },

    /**
     * Add a class to an existing element or elements array
     * @param  {Element}    element         the element to add class to
     * @param  {String}     classToAdd    the new class to add to this element
     */
    addClass: function (elements, classToAdd) {
        var i,
            elementsList = (elements instanceof Array) ? elements : [elements];
        for (i = 0; i < elementsList.length; i++) {
            YAD.Helper._addClass(elementsList[i], classToAdd);
        }
    },

    /**
     * Helper function: Add a class to a single element
     * @param  {Element}    element       the element to add class to
     * @param  {String}     classToAdd    the new class to add to this element
     */
    _addClass: function (element, classToAdd) {
        if (element.classList) {        //ie10+ only, WebKit browsers may not support
            element.classList.add(classToAdd);
        } else {                        //ie8, ie9, webkit browsers
            if (!(YAD.Helper.containClass(element, classToAdd))) {
                element.className += ' ' + classToAdd;
            }
        }
    },

    /**
     * Remove a class to an existing element or elements array
     * @param  {Element}    element         the element to remove class from
     * @param  {String}     classToRemove   the class to remove from this element
     */
    removeClass: function (elements, classToRemove) {
        var i,
            elementsList = (elements instanceof Array) ? elements : [elements];
        for (i = 0; i < elementsList.length; i++) {
            YAD.Helper._removeClass(elementsList[i], classToRemove);
        }
    },

    /**
     * Helper function: Remove a class from a single element
     * @param  {Element}    element         the element to remove class from
     * @param  {String}     classToRemove   the class to remove from this element
     */
    _removeClass: function (element, classToRemove) {
        var reg = new RegExp("(\\s|^)" + classToRemove + "(\\s|$)", "g"); //"g" for global multiple match
        if (element.classList) {                //ie10+ only, WebKit browsers may not support
            element.classList.remove(classToRemove);
        } else {                                //ie8, ie9, webkit browsers
            element.className = element.className.replace(reg, " ").replace(/\s\s+/g, " ");
        }
    },

    /**
     * Replace a class with another for an existing element or elements array
     * If the class to be replaced doesn't exist, still add another class.
     * @param  {Elements}    elements       the elements to remove class from
     * @param  {String}     oldClass        the class to remove
     * @param  {String}     newClass        the class to add
     */
    replaceClass: function (elements, oldClass, newClass) {
        var i,
            elementsList = (elements instanceof Array) ? elements : [elements];
        for (i = 0; i < elementsList.length; i++) {
            YAD.Helper._removeClass(elementsList[i], oldClass);
            YAD.Helper._addClass(elementsList[i], newClass);
        }
    },

    /**
     * Toggle a class for an existing element or elements array
     * @param  {Elements}    elements     the elements to toggle class
     * @param  {String}      toggleClass  the new class to toggle
     * @param  {Boolean}     toAdd        optionalthe boolean to control 
     */
    toggleClass: function (elements, toggleClass, toAdd) {
        var i,
            elementsList = (elements instanceof Array) ? elements : [elements];
        for (i = 0; i < elementsList.length; i++) {
            if (toAdd === true) {
                YAD.Helper._addClass(elementsList[i], toggleClass);
            } else if (toAdd === false) {
                YAD.Helper._removeClass(elementsList[i], toggleClass);
            } else { //no meaningful 3rd parameter, switch the class
                if (YAD.Helper.containClass(elementsList[i], toggleClass)) {
                    YAD.Helper._removeClass(elementsList[i], toggleClass);
                } else {
                    YAD.Helper._addClass(elementsList[i], toggleClass);
                }
            }
        }
    },

    /**
     * Decide whether an existing element contains a class
     * @param  {Element}    element         the element to test on
     * @param  {String}     classToTest     the class to test whether it is one of the classname of this element
     */
    containClass: function (element, classToTest) {
        var reg = new RegExp("(\\s|^)" + classToTest + "(\\s|$)");
        if (element.classList) {                //ie10+ only, WebKit browsers may not support
            return element.classList.contains(classToTest);
        }
        return reg.test(element.className);     //ie8, ie9, webkit browsers
    },

    /**
     * Extract attributes key-value pairs from a string like "g:608436e3-596a-31f8-9c2e-a30a97828907;elm:hdln;elmt:ct;ad:0;cpos:1;ct:1".
     * Currently used for extract value data-ylk and send link view beacon.
     * @param {String}  string          The string to extract attributes from
     * @param {Array}   attrArray       The array of attributes' keys
     * @returns {Object}        An object contains all the key-value pairs        
     */
    extractAttributeFromString: function (string, attrArray) {
        var i, reg, key, value, strToExtract, matchKeyStr, result = {};
        
        if (!string || !attrArray) {
            return result;
        }

        strToExtract = ";" + string + ";"; //To get regular key-pair for matching
        try {
            for (i = 0; i < attrArray.length; i++) {
                key = attrArray[i];
                matchKeyStr = ";" + key + ":";
                reg = new RegExp("" + matchKeyStr + "[^;]*");
                value = strToExtract.match(reg);
                if (value && value.length > 0) {
                    result[key] = value[0].replace(matchKeyStr, "");
                }
            }
        } catch (e) {}

        return result;
    },

    /**
     * Learn whether the browser support events like addEventListner, removeEventListner, etc.
     */
    getEventListenerCompatible: function () {
        var el = document.createElement('div');
        if (el.addEventListener) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Binds an event to an element
     * @param  {String}     event    the event name
     * @param  {Element}    element  the element to bind the event to
     * @param  {Function}   callback The function to call when the event is fired
     * @param  {Object}     scope    the scope in which the callback is called
     * @param  {Array}      args     an array of arguments passed, as arguments, to the callback
     */
    bind: function (e, element, callback, scope, args) {
        if (!e) {
            throw new YAD.Error('Valid event not supplied');
        }

        if (!element) {
            throw new YAD.Error('Valid element not supplied');
        }

        if (!callback) {
            throw new YAD.Error('Valid callback not supplied');
        }

        args = args || [];

        // allows user to provide list of events to bind this handler to if they wish.
        // Space-separated list (like jQuery)
        var events = e.split(' ');
        for (var i = 0; i < events.length; i++) {
            YAD.Helper._addEventListener(events[i], element, callback, scope, args);
        }
    },

    /**
     * Unbind an event to an element
     * @param  {String}     event    the event name
     * @param  {Element}    element  the element to bind the event to
     * @param  {Function}   callback The function to call when the event is fired
     * @param  {Object}     scope    the scope in which the callback is called
     * @param  {Array}      args     an array of arguments passed, as arguments, to the callback
     */
    unbind: function (e, element, callback) {
        if (!e) {
            throw new YAD.Error('Valid event not supplied');
        }

        if (!element) {
            throw new YAD.Error('Valid element not supplied');
        }

        if (!callback) {
            throw new YAD.Error('Valid callback not supplied');
        }

        // allows user to provide list of events to bind this handler to if they wish.
        // Space-separated list (like jQuery)
        var events = e.split(' ');
        for (var i = 0; i < events.length; i++) {
            YAD.Helper._removeEventListener(events[i], element, callback);
        }
    },

    /**
     * Support for IE8 so we can use custom events
     * This is used primarily for ad views to keep model/view separated.
     * @todo  tidy this function up
     * @param  {[type]}   eventName        [description]
     * @param  {[type]}   element  [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   scope    [description]
     * @param  {[type]}   args     [description]
     * @return {[type]}            [description]
     */
    bindCustom: function (eventName, element, callback, scope, args) {

        // modern browsers can go ahead and bind normally
        if (element.addEventListener) {
           return YAD.Helper.bind(eventName, element, callback, scope, args);
        }

        element[eventName] = 0;

        // old ie needs a little tlc
        return YAD.Helper.bind('propertychange', element, function (evt) {
            if (evt.propertyName === eventName) {
                callback.call(this, Array.prototype.slice.call(arguments, 1));
            }
        }, scope, args);
    },

    /**
     * Binds an event to an array of elements
     * @param  {String}     event    the event name
     * @param  {Array}      elements an array of elements to bind the event to
     * @param  {Function}   callback The function to call when the event is fired
     * @param  {Object}     scope    the scope in which the callback is called
     * @param  {Array}      args     an array of arguments passed, as arguments, to the callback
     */
    bindAll: function (event, elements, callback, scope, args) {
        if (!elements) {
            return;
        }

        for (var i = elements.length - 1; i >= 0; i -= 1) {
            YAD.Helper.bind(event, elements[i], callback, scope, args);
        }
    },

    /**
     * Add the event listener to an element in a cross-browser fashion
     *
     * You should normally use bind and bindAll, this shouldn't be called directly
     * and should be considered a private function.
     */
    _addEventListener: function (event, element, callback, scope, args) {
        if (element.addEventListener) {
            element.addEventListener(event, function (e) {
                if (!e['preventDefault']) {
                    e['preventDefault'] = function () {
                        this.returnValue = false;
                    };
                }

                callback.apply(scope, [e].concat(args));
            }, false);
        } else if (element.attachEvent)  {
            element.attachEvent('on' + event, function (e) {
                // for ie8
                if (!e['preventDefault']) {
                    e['preventDefault'] = function () {
                        this.returnValue = false;
                    };
                }

                callback.apply(scope, [e].concat(args));
            });
        } else {
            throw new YAD.Error('Tried to bind event to incompatible object. Object needs addEventListener (or attachEvent).');
        }
    },

    /**
     * Remove the event listener from an element in a cross-browser fashion
     *
     * You should normally use unbind, this shouldn't be called directly
     * and should be considered a private function.
     */
    _removeEventListener: function (event, element, callback) {
        if (element.removeEventListener) {
            element.removeEventListener(event, callback, false);
        } else if (element.detachEvent)  {
            element.detachEvent('on' + event, callback);
        } else {
            throw new YAD.Error('Tried to bind event to incompatible object. Object needs removeEventListener (or detachEvent).');
        }
    },

    /**
     * Dispatch event abstraction for IE<=9.
     * This is used primarily for ad views to keep model/view separated.
     * @param  {DOMNode} el        the element to trigger the event on
     * @param  {String} eventType the name of the event
     * @param  {[type]} data      [description]
     * @return {[type]}           [description]
     */
    dispatchEvent: function (el, eventName, data) {
        var e;
        if(document.createEvent){
            e = document.createEvent('HTMLEvents');
            e.initEvent(eventName,true,true);
        }else if(document.createEventObject){// IE < 9
            e = document.createEventObject();
            e.eventType = eventName;
        }

        if (!e) {
            throw new YAD.Error('dispatchEvent could not create click event');
        }

        for(var i in data) {
            if (data.hasOwnProperty(i)) {
                e[i] = data[i];
            }
        }

        e.eventName = eventName;

        if(el.dispatchEvent){
            el.dispatchEvent(e);
        }else if(el.fireEvent){// IE < 9
            // TODO make this neater - ideally without a list of 'real' events
            switch(e.eventType) {
            case 'click':
            case 'mousedown':
            case 'mouseover':
                el.fireEvent('on'+e.eventType, e);// can trigger only real event (e.g. 'click')
                break;
            default:
                el[e.eventType] = e;
                // i don't think we need this
                // e.propertyName = e.eventType;
                // el.fireEvent('onpropertychange', e);
            }

        // I don't think these below actually get used?
        }else if(el[eventName]){
            el[eventName](e);
        }else if(el['on'+eventName]){
            el['on'+eventName](e);
        }
    },

    /**
     * Returns a new DOM element
     *
     * (in it's own function so we can stub it in the tests)
     * @param  {string} tag the name of the tag to create
     * @return {DOMElement}     the new element
     */
    createElement: function (tag) {
        return document.createElement(tag);
    },

    /**
     * Adds a <script> tag to the head.
     * Used for jsonp but also to import the analytics library (may change)
     *
     * @warning I don't trust the callback will fire.
     *
     * @param {String}   url      the url to the script
     * @param {Function} callback called whe the script loads
     * @param {Object}   scope    the scope in which to call the callback
     */
    addScript: function (url, callback, scope) {
        return YAD.Helper.Ajax.addScript(url, callback, scope);
    },

    /**
     * Decide whether an element is CSS visible
     * @param  {DOMNode}    element         the element to test on
     * http://www.dzone.com/snippets/javascript-function-checks-dom
     * TODO: is checking el.parentNode really needed?
     */
    isVisible: function (el) {
        if (el === document) {
            return true;
        }
        if (!el) {
            return false;
        }
        if (!el.parentNode) {
            return false;
        }
        
        if (YAD.Helper.getComputedStyleCssProperty(el, 'display') === 'none' || YAD.Helper.getComputedStyleCssProperty(el, 'visibility') === 'hidden') {
            return false;
        }

        return YAD.Helper.isVisible(el.parentNode);
    },

    /**
     * Get outer height of an element (margin + element's height).
     * @param {DOMNode} - element - the node we want to get its computed style
     */
    getOuterHeight: function (el) {
        var marginTop = YAD.Helper.getComputedStyleCssProperty(el, 'margin-top'),
            marginBottom = YAD.Helper.getComputedStyleCssProperty(el, 'margin-bottom');
        
        try {
            marginTop = parseInt(marginTop, 10) || 0;
            marginBottom = parseInt(marginBottom, 10) || 0;
        } catch (e) {
            marginTop = 0;
            marginBottom = 0;
        }
        return (el.offsetHeight + marginTop + marginBottom);
    },
    
    /**
     * Get computed CSS property value
     * @param {DOMNode} - el - the element we want to get its computed style
     * @param {String} - cssProperty - the CSS property's name we want to get value of
     * http://johnkpaul.tumblr.com/post/17380987688/shim-for-javascript
     * https://developer.mozilla.org/en-US/docs/Web/API/Window.getComputedStyle
     * TODO: currentStyle seems not work well on IE8 (http://stackoverflow.com/questions/15733365/cross-browser-ie8-getcomputedstyle-with-javascript)
     * @returns the CSS property value of the specific element and property name
     */
    getComputedStyleCssProperty: function (el, cssProperty) {
        var camelCasedCssProperty;
        if(!window.getComputedStyle){
            camelCasedCssProperty = YAD.Helper._getCamelCasedCssProperty(cssProperty);
            if(el.currentStyle){
                return el.currentStyle[camelCasedCssProperty];
            } else{ //In case some weird thing happens
                return el.style[camelCasedCssProperty];
            }
        } else{
            return window.getComputedStyle(el).getPropertyValue(cssProperty);
        }
    },
    
    /**
     * IE only accept CSS property in Camel case, e.g., marginTop instead of margin-top.
     * Helper function, intent for internal used by function getComputedStyleCssProperty().
     * @param cssProperty
     * @returns the CSS property name required by IE
     */
    _getCamelCasedCssProperty: function (cssProperty) {
        return cssProperty.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    },

    /**
     * Truncate a long string to make sure it's of the supplied length.
     * Returns the string if the supplied length is more than the string's.
     * Returns the string clipped by length - 1 characters with an elipsis at the end.
     *
     * @param  {String} string the string to truncate
     * @param  {Number} length the max number of characters the returned string should be
     * @return {String}        the truncated string
     */
    truncateString: function (string, length) {
        if (!string || !string.length) {
            return '';
        }

        if (length === undefined) {
            return string;
        }

        if (string.length < length) {
            return string;
        }

        if (length <= 0) {
            return '';
        }

        var truncated = string.substring(0, length - 1),
            endOfFirstWord = truncated.lastIndexOf(" ");

        // if the first word is longer than length, return as much as possible of the word
        // otherwise, make sure that only whole words are returned.
        if (endOfFirstWord < length && endOfFirstWord !== -1) {
            truncated = truncated.substr(0, Math.min(truncated.length, endOfFirstWord));
        }

        // points for utf elipsis? Perhaps it'll cause more issues on sites that dont use utf.
        // if you get problems, change it for three periods (.) but remember to change length - 1 to length - 3
        return truncated + '…';
    },

    htmlEntities: function (str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g,'&#x2F;')
            .replace(/`/g, '&#x60;');
    },

    /**
     * Converts a string into a DocumentFragment
     * used mostly for templating
     *
     * @param  {String}             string      the string of HTML to convert
     * @return {DocumentFragment}   fragment    the DocumentFragment containing the HTML elements
     */
    fragmentFromString: function (string) {
        var fragment = document.createDocumentFragment(),
            tmp = document.createElement('body'),
            child;

        tmp.innerHTML = string;

        while ((child = tmp.firstChild) !== null) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    /**
     * Convert a document fragment into a string
     * @param  {DocumentFragment} fragment the fragment to convert
     * @return {String}          the fragment's html as a string
     */
    stringFromFragment: function (fragment) {
        var div = document.createElement('div');
        div.appendChild(fragment);
        return div.innerHTML;
    },

    /**
     * Renders a template (represented by a string) and replaces tags with data.
     *
     * Tags must be uppercase.
     * Params' keys can be lower case, they will match uppercase TAGS
     *
     * @param  {String} template the HTML for the template containing some/many/no {{TAGS}}
     * @param  {Object} params   key/value object. Replaces {{KEY}} with value. keys can be lower case.
     * @return {}          [description]
     */
    template: function (template, params) {
        var property,
            fragmentNumber = 0,
            fragments = [],
            value,
            id,
            i,
            domTemplate,
            temporaryElement;

        for (property in params) {
            if (params.hasOwnProperty(property)) {
                 // apparently this is more efficient than String.replace or Regex
                value = params[property];

                // if a document fragment is passed, store it so we can switch it later.
                // We can't just convert it to a string as it might have events and other bits associated
                if (this.isDocumentFragment(value)) {
                    // generate an identifier. We'll use this as the temporary element's id
                    // so we can switch it out later
                    id = 'yad-template-fragment-' + fragmentNumber;

                    // store a list of fragments for us to loop over later
                    fragments.push([id, value]);
                    value = '<span id="' + id + '"></span>';

                    fragmentNumber++;
                }

                template = template.split('{{' + property.toUpperCase() + '}}').join(value);
            }
        }

        // convert the template to a DocumentFragment
        domTemplate = YAD.Helper.fragmentFromString(template);

        // loop through the params that were documentfragments and replace their temporary elements with the frags.
        for (i = 0; i < fragments.length; i++) {
            temporaryElement = domTemplate.querySelector('#'+fragments[i][0]);
            // do the replacement
            temporaryElement.parentNode.replaceChild(fragments[i][1], temporaryElement);
        }

        return domTemplate;
    },

    /**
     * IE8 doesn't like instanceof DocumentFragment so this is a small workaround for now.
     * I expect it'll need some work
     * @param  {[type]}  value [description]
     * @return {Boolean}       [description]
     */
    isDocumentFragment: function (value) {
        try {
            return ((typeof DocumentFragment !== 'undefined' && value instanceof DocumentFragment) ||
                    // for ie8
                    (typeof  HTMLDocument !== 'undefined' && value instanceof HTMLDocument));
        } catch (e) {
            return typeof value !== 'string' && typeof value !== 'number';
        }
    },

    /**
     * Deep merge of objects
     * @param  {Object} object1 this object's info will get overwritten by
     * @param  {Object} object2 this will overwrite properties that exist in object1 or append if they dont exist
     * @return {Object}         the merged object
     */
    merge: function (destination, source) {
        var property;

        for (property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) { 
                if (!(destination[property] && destination[property].constructor && destination[property].constructor === Object)) {
                    destination[property] = {}; //if destination does not have this property or the value of this property is not an object
                }
                YAD.Helper.merge(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }

        return destination;
    },

    /**
     * Clone one object to a new one.
     * Removes function properties.
     * @param  {object} object Object to clone
     * @return {object}        the new clone of the object passed in
     */
    clone: function (object) {
        // this clones the object, no more byRef.
        // note, this will remove anonymous callback functions
        return (JSON.parse(JSON.stringify(object)));
    },

    /**
     * Cross-browser add <style> tag.
     * @param {String} css the css to include within the style tag
     */
    addStyleTag: function (css) {
        var style = YAD.Helper.createElement('style');
        style.setAttribute('type', 'text/css');

        // ie8
        if (style['styleSheet']) {
            document.getElementsByTagName('head')[0].appendChild(style);
            style.styleSheet.cssText = css;
        } else {
            // modern browsers
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    },

    /**
     * Cross-browser add <link> tag.
     * @param {Object} attributes for the link tag
     */
    addLinkTag: function (tagAttribs) {
        var key,
            link = YAD.Helper.createElement('link');

        for (key in tagAttribs) {
           if (tagAttribs.hasOwnProperty(key)) {
               link.setAttribute(key, tagAttribs[key]);
           }
        }

        document.getElementsByTagName('head')[0].appendChild(link);
    },

    /**
     * Given a widget object, adds all dynamic CSS to the module
     * @param {Object} widget object to process for dynamic CSS
     */
    addDynamicCSS: function (widget) {
        var cssURLs,
            linkAttribs = {
                rel: 'stylesheet',
                type: 'text/css'
            },
            i;

        // add config CSS
        if (widget.hasConfigCSS()) {
            YAD.Helper.addStyleTag('/* config CSS */ ' + widget.getConfigCSS());
        }

        // if the brewer returns some CSS URLs, add them via a link tag
        if (widget.hasCSSURLs()) {
            cssURLs = widget.getCSSURLs();
            for(i = 0; i < cssURLs.length; i++) {
                linkAttribs.href = cssURLs[i];
                YAD.Helper.addLinkTag(linkAttribs);
            }
        }

        // add custom CSS - last in order
        if (widget.hasCustomCSS()) {
            YAD.Helper.addStyleTag('/* custom CSS */ ' + widget.getCustomCSS());
        }
    },

    /**
     * Detect if an element is in the viewport
     * @param  {DOMNode}  el the element to check
     * @return {Boolean}    true if the element is in the viewport
     */
    isElementInViewport: function (el, amountInViewport, top, left, viewportWidth, viewportHeight) {
        // this is horrid and needs refactoring and properly testing
        if (typeof amountInViewport === 'undefined') {
            amountInViewport = 0;
        }

        var xoffset, yoffset;

        if (typeof window.pageXOffset !== 'undefined') {
            xoffset = window.pageXOffset;
        } else if (document.documentElement && typeof document.documentElement.scrollLeft !== 'undefined') {
            xoffset = document.documentElement.scrollLeft;
        } else if (typeof document.body.scrollLeft !== 'undefined') {
            xoffset = document.body.scrollLeft;
        }

        if (typeof window.pageYOffset !== 'undefined') {
            yoffset = window.pageYOffset;
        } else if (document.documentElement && typeof document.documentElement.scrollTop !== 'undefined') {
            yoffset = document.documentElement.scrollTop;
        } else if (typeof document.body.scrollTop !== 'undefined') {
            yoffset = document.body.scrollTop;
        }

        var win = {
            width: 0,
            height: 0
        };

        if (typeof viewportWidth !== 'undefined') {
            win.width = viewportWidth;
        } else if (typeof window['innerWidth'] !== 'undefined') {
            win.width = window['innerWidth'];
        } else {
            win.width = document.documentElement['clientWidth'];
        }

        if (typeof viewportHeight !== 'undefined') {
            win.height = viewportHeight;
        } else if (typeof window['innerHeight'] !== 'undefined') {
            win.height = window['innerHeight'];
        } else {
            win.height = document.documentElement['clientHeight'];
        }

        var viewport = {
            top: top ? top : yoffset,
            left: left ? left : xoffset
        };

        viewport.right = viewport.left + win.width;
        viewport.bottom = viewport.top + win.height;

        var percent = amountInViewport;

        var box = el.getBoundingClientRect();

        var element = {
            width: box.right - box.left,
            height: box.bottom - box.top
        };

        var bounds = {
            top: box.top,
            left: box.left
        };

        bounds.right = bounds.left + (element.width * (1 - percent));
        bounds.bottom = bounds.top + (element.height * (1 - percent));
        bounds.top = bounds.top + (element.height * percent);
        bounds.left = bounds.left + (element.width * percent);
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    },

    /**
     * Polyfill for Array.prototype.indexOf
     * @param  {Object} searchElement check the array for this item
     * @param  {Array} array    the array to verify
     * @return {Number}         the position in the array of the item. -1 if not found.
     */
    arrayIndexOf: function (searchElement, array) {
        if (Array.prototype.indexOf) {
            return array.indexOf(searchElement);
        } else {
            var length = array.length >>> 0, // Hack to convert object.length to a UInt32
                fromIndex = 0;

            if (Math.abs(fromIndex) === Infinity) {
                fromIndex = 0;
            }

            if (fromIndex < 0) {
                fromIndex += length;
                if (fromIndex < 0) {
                    fromIndex = 0;
                }
            }

            for (;fromIndex < length; fromIndex++) {
                if (array[fromIndex] === searchElement) {
                    return fromIndex;
                }
            }

            return -1;
        }
    },

    /**
     * detect and return current page url
     * @return {String} return current page url
     */
    detectPageURL: function () {
        return window['location']['href'];
    },

    /**
     * detect and return referrer
     * @return {String} return current page referrer
     */
    detectReferrer: function () {
        return window['document']['referrer'];
    },

    /**
     * detect and return canonical url of the page
     * @return {String} return current page's canonical url
     */
    detectCanonical: function () {
        var link = document.querySelector("link[rel='canonical']");

        if (!link) {
            return false;
        }

        return link.href;
    },

    /**
     * Gets the last script tag to auto-detect where to stick the iframe
     * @todo  make it work if script is loaded asynchronously
     * @return {DOMNode} the last script tag currently loaded on the page
     */
    detectScriptTag: function () {
        var scriptTags = document.querySelectorAll('script');

        if (!scriptTags) {
            throw new YAD.Error('No script tags could be found on the page');
        }

        // this is the script tag that called this function.
        return scriptTags[scriptTags.length - 1];
    },

    /**
     * Gets the rss feed to which this documents points to
     * @return Array of strings containing all the RSS urls that the page
     * points to
     */
    getRSSUrls: function () {
        var link = document.querySelectorAll('link[type="application/rss+xml"]'),
            i,
            urls = [];

        if (!link) {
            return;
        }

        for (i = 0; i < link.length; i += 1) {
            if (link[i].getAttribute('href')) {
                urls.push(link[i].getAttribute('href'));
            }
        }

        return urls;
    },

    /**
     * get height of the document passed in
     * @param {Object} document whose height you want
     * @return {Number} the current unix time in seconds
     */
    getDocumentHeight: function (d) {
        // we use the scrollHeight of the documentElement as it is a fair
        // representative of the height of the document.  We specifically avoid
        // using clientHeight - because it does not seem to be updated in Chrome
        // to reflect the actual height
        return d.documentElement.scrollHeight;
    },

    /**
     * Grab the current timestamp in seconds
     * Format/function taken from Rapid to fill events where Rapid doesn't send timestamps.
     * @return {Number} the current unix time in seconds
     */
    timestamp: function () {
        return Math.floor(new Date().valueOf() / 1000);
    },

    /**
     * Function to get different part like host and path from a url
     * @param  {String} url:   a url to parse
     * @return {Object} An key-value pairs object containing value of host and path
     */
    urlParser: function(url) {
        var parser = document.createElement('a'),
        result = {
            'host': '',
            'path': ''
        };

        try {
            parser.href = url;
            result = {
                    'host': parser.host,
                    'path': parser.pathname + parser.search + parser.hash
            };
        } catch (err) {
        }
        
        return result;
    },

    // Start: Clamp related functions

    applyEllipsis: function (elem, str) {
        if (!str || !str.replace) {
            elem['textContent'] = '';
        } else {
            elem['textContent'] = str.replace(/\s+$/g, '') + '…';
        }
    },

    /**
     * Return the current style for an element.
     * @param {HTMLElement} elem The element to compute.
     * @param {string} prop The style property.
     * @returns {number}
     */
    computeStyle: function (elem, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null).getPropertyValue(prop);
        } else {
            return false;
        }
    },

    /**
     * Returns the line-height of an element as an integer.
     */
    getLineHeight: function (elem) {
        var lh = this.computeStyle(elem, 'line-height');
        if (lh === 'normal') {
            // Normal line heights vary from browser to browser. The spec recommends
            // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
            lh = Math.ceil(parseFloat(this.computeStyle(elem, 'font-size'), 10) * 1.2);
        }
        return parseFloat(lh, 10);
    },

    /**
     * Returns the maximum height a given element should have based on the line-
     * height of the text and the given clamp value.
     */
    getMaxHeight: function (clmp, element) {
        var lineHeight = this.getLineHeight(element);
        return lineHeight * clmp;
    },

    /**
     * Gets an element's last child. That may be another node or a node's contents.
     */
    getLastChild: function (elem, rootElem) {
        //Current element has children, need to go deeper and get last child as a text node
        if (elem.lastChild.children && elem.lastChild.children.length > 0) {
            return this.getLastChild(Array.prototype.slice.call(elem.children).pop(), rootElem);
        }
        //This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
        else if (!elem.lastChild || '' === elem.lastChild.nodeValue) {
            elem.lastChild.parentNode.removeChild(elem.lastChild);
            return this.getLastChild(rootElem, rootElem);
        }
        //This is the last child we want, return it
        else {
            return elem.lastChild;
        }
    },

    truncateToHeight: function (target, maxHeight, originSplitOnChars, data) {
        if (!maxHeight || maxHeight <= 0) {return;}

        /**
         * Resets global variables.
         */
        function reset() {
            data['splitOnChars'] = originSplitOnChars.slice(0);
            data['splitChar'] = data['splitOnChars'][0];
            data['chunks'] = null;
            data['lastChunk'] = null;
        }

        var self= this,
            nodeValue = target['textContent'].replace('…', ''),
            element = data['element'],
            splitOnChars = data['splitOnChars'],
            splitChar = data['splitChar'],
            chunks = data['chunks'],
            lastChunk = data['lastChunk'];

        //Grab the next chunks
        if (!chunks) {
            //If there are more characters to try, grab the next one
            if (splitOnChars.length > 0) {
                splitChar = splitOnChars.shift();
            }
            //No characters to chunk by. Go character-by-character
            else {
                splitChar = '';
            }
            chunks = nodeValue.split(splitChar);
        }

        //If there are chunks left to remove, remove the last one and see if the nodeValue fits.
        if (chunks.length > 1) {
            lastChunk = chunks.pop();
            self.applyEllipsis(target, chunks.join(splitChar));
        }
        //No more chunks can be removed using this character
        else {
            chunks = null;
        }

        //Search produced valid chunks
        if (chunks) {
            //It fits
            if ((element.clientHeight && element.clientHeight <= maxHeight) || (element.offsetHeight && element.offsetHeight <= maxHeight)) {
                //There's still more characters to try splitting on, not quite done yet
                if (splitOnChars.length >= 0 && splitChar !== '') {
                    self.applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
                    chunks = null;
                }
                //Finished!
                else {
                    return false;
                }
            }
        }
        //No valid chunks produced
        else {
            //No valid chunks even when splitting by letter, time to move
            //on to the next node
            if (splitChar === '') {
                self.applyEllipsis(target, '');
                target = self.getLastChild(element, element);
                reset();
            }
        }

        self.truncateToHeight(target, maxHeight, originSplitOnChars, data);
    },

    /**
     * Get localized link. 
     * @param {string} url. Original US url.
     * @param {string} lang. Objective language.
     * @returns {string} The localized url.
     */
    getLocalizedLink: function (url, lang) {
        return this._getLocalizedResult(url, lang, 'Links');
    },

    /**
     * Get translated string. 
     * @param {string} url. Original en-US string.
     * @param {string} lang. Objective language.
     * @returns {string} The localized string.
     */
    getLocalizedString: function (string, lang) {
        return this._getLocalizedResult(string, lang, 'Translation');
    },

    /**
     * get translated string for a given short name. 
     * @param {string} string. Short name of the string.
     * @param {string} lang. Objective language.
     * @param {string} type. Valid options include {'Translation', 'Link'}.
     * @returns {string} The localized result.
     */
    _getLocalizedResult: function (string, lang, type) {
        var defaultLang = 'en-US',
            language = lang || defaultLang;

        if (!YAD[type] || !string) {
            return '';
        }
        if (YAD[type][language] && YAD[type][language][string]) {
            return YAD[type][language][string];
        }
        if (YAD[type][defaultLang]) { //fallback to en-US
            return YAD[type][defaultLang][string] || '';
        }
        return '';
    },

    /**
     * Clamps a text node.
     * @param {HTMLElement} element. Element containing the text node to clamp.
     * @param {Object} options. Options to pass to the clamper.
     */
    clamp: function (element, options) {
        options = options || {};
        if ('undefined' !== typeof options.clamp && options.clamp < 1) { // make sure the number of clamping line is a positive number.
            return;
        }

        var self = this,
            opt = {
                'clamp':              options.clamp || 2,
                'splitOnChars':       options.splitOnChars || ['.', '-', ' '] //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
            },
            splitOnChars = opt['splitOnChars'].slice(0),
            splitChar = splitOnChars[0],
            height = self.getMaxHeight(opt['clamp'], element);

        if ((element.clientHeight && height < element.clientHeight) || (element.offsetHeight && height < element.offsetHeight)) {
            self.truncateToHeight(self.getLastChild(element, element), height, splitOnChars, {
                'element': element,
                'splitOnChars': splitOnChars,
                'splitChar': splitChar,
                'chunks': null,
                'lastChunk': null
            });
        }
    },

    clampTitle: function (parentElement, selector, line) {
        if (line < 1 || false === line || !window.getComputedStyle) {
            return;
        }
        var lists = parentElement.querySelectorAll(selector);
        for (var i = 0; i < lists.length; i++) {
            this.clamp(lists[i], {clamp: line});
        }
    },

    /**
     * Detect if this module was put in an iframe
     */
    isInIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },

    /**
     * Get the number of milliseconds since the user hit the site.
     * Used to measure how long the widget tags to load.
     * @return {[type]} [description]
     */
    timeSinceNavigationStart: function (date) {
        if (typeof window['performance'] === 'undefined') {
            return false;
        }

        if (typeof window['performance']['timing'] === 'undefined') {
            return false;
        }

        if (!date) {
            date = (new Date()).getTime();
        }

        return date - window['performance']['timing']['domLoading'];
    }

};

YAD.Analytics = YAD.Analytics || {};
/**
 * Analytics tracking of the widget.
 * Each widget has a single instance of this.
 * @constructor
 */
YAD.Analytics.Rapid = function (config) {

    config = config || {};

    /**
     * This is a workaround for Rapid.
     * Rapid only supports one instance per page but doesn't supply a method of getting that instance
     * we, therefore, have to rely on the person implementing YAD to pass us the Rapid instance.
     * It'll throw a console error, no analytics will be tracked but the widget will still work.
     */
    // this has been disabled while we use our own version of rapid
    // if (!this.hasValidConfig(config)) {
    //     console.error('It looks like Rapid exists on the page but wasn\'t supplied to YAD');
    //     return this;
    // }

    this.analytics = config['rapid'];
    this.config = config;
    this.beaconedLinkviews = [];
    this.load();
};

// loads the library in the constructor
YAD.Analytics.Rapid.ANALYTICS_PATH = '';

YAD.Analytics.Rapid.prototype = {
    initConfig: {},
    /**
     * Load the library, calls onRapidLoad once we have it
     */
    load: function () {
        this.onRapidLoad();
    },

    /**
     * When rapid loads, create the instance of the library and process any events that were fired while we were waiting
     * @return {[type]} [description]
     */
    onRapidLoad: function () {
        // note, this needs to use array notation to stop closure compiler squishing it
        if (!this.analytics) {

            window['YAHOO']['i13n']['YWA_ACTION_MAP'] = {
               "yad-load":17
            };

            var keys = {
                "prtnr": this.config['publisherId'], // called 'prtnr' at request of Slingstone team.
                "pubid": this.config['publisherUUID'], // UUID of provider like CBS/Yahoo/VOX etc.
                "_w": this.config['pageURL'],
                "_R": this.config['referrer'],
                "rid": this.config['requestID'],
                "pvid": this.config['pageviewID'],
                "_ex": 1,
                "usergenf": 1,             
                "yadm": this.config['iframe'] ? 'i' : 'd', // The widget is in iframe mode (i) or dom mode (d)
                "yadt": YAD.Helper.templateShortname(this.config['template']),
                "inframe": this.config['inframe']
            };

            if (this.config['canonicalURL']) {
                keys['cw'] = this.config['canonicalURL'];
            }

            if (this.config['ccode']) {
                keys['ccode'] = this.config['ccode'];
            }

            if (this.config['bucketID']) {
                keys['test'] = this.config['bucketID'];
            }

            // set postmsg target to parent, if target window is not passed down
            if (this.config['click_postmsg'] && !this.config['click_postmsg']['window']) {
                this.config['click_postmsg']['window'] = window.parent;
            }

            this.initConfig = {
                "spaceid": 1197743274,
                "client_only": true,
                "tracked_mods": [],
                "compr_type":'deflate',
                "compr_on": !!this.config['iframe'],
                "async_all_clicks": this.config['isYahooOwned'],
                "nofollow_class":'yad-nofollow',
                "webworker_file": YAD.Analytics.Rapid.WORKER_PATH,
                "keys": keys,
                'click_postmsg': this.config['click_postmsg'],
                "ywa": {
                    "project_id": 1000958395862,
                    "host": "a.analytics.yahoo.com",
                    'ywa_action_map': {
                        'yad-load': 17
                    },
                    'cf': {
                        '11': this.config['publisherId']
                    }
                }
            };
            this.analytics = new window['YAHOO']['i13n']['Rapid'](this.initConfig);
        }
        this.sendEvent('load');
    },

    bind: function (widget) {
        if (!widget.config['iframe']) {
            YAD.Helper.bind('load scroll resize', window, function () {
                this.onWindowLoadScrollResize(widget);
            }, this);

            this.onWindowLoadScrollResize(widget);
        }
    },

    /**
     * Triggers a Rapid event beacon.
     * @param  {String} type            the event type (click/load/hover etc)
     * @param  {Object} eventData       the Event data that should be sent with the beacon
     */
    sendEvent: function (type, eventData) {
        switch (type) {
        case 'moduleview':
            this.analytics['beaconEvent']('yad-moduleview', eventData); //send module view beacon
            break;
        case 'trackmodule': //This is not to send link view, but to track all links event (e.g. click) within this element id
            this.analytics['addModules']([eventData], false);
            break;
        case 'linkviews':
            this.analytics['beaconLinkViews'](eventData);
            break;
        case 'adslinkview': //TODO: delete this temp code when the test is done.
            this.analytics['beaconEvent']('yad-adsview', eventData); //send an additional ads view ULT beacon for ABF to get it
            break;
        case 'yad-module-unload':
            this.analytics['beaconEvent']('yad-module-unload', {'beaconed': this.beaconedLinkviews.length}); //send an unload event
            break;
        case 'yad-module-focus':
        case 'yad-module-blur':
            this.analytics['beaconEvent'](type);
            break;
        }
    },

    /**
     * Called when the window loads, scrolls and resizes.
     * Used to detect if we're in the viewport. Called from #bind
     * @return {[type]} [description]
     */
    onWindowLoadScrollResize: function (widget, scrollTop, scrollLeft, viewportWidth, viewportHeight) {
        var link,
            linkviewItems,
            toBeacon = [], // All the links to beacon
            rapidObj = {},
            rapidKeys = ["g", "elm", "elmt", "ad", "cpos", "ct", "r", "tar", "tar_uri", "atw", "aid"];

        if (!widget.template) { // we're here too soon
            return;
        }

        //This part is for DOM mode only. The widget.onInViewport() method is called in widget when receiving "inViewport" message
        if (!widget.isInIframe() && YAD.Helper.isElementInViewport(widget.template, 0, scrollTop, scrollLeft, viewportWidth, viewportHeight)) {
            widget.onInViewport();
        }

        linkviewItems = widget.template.querySelectorAll('.yad-item, .yad-learn-more-container, .yad-footer-logo-container'); //all items and footer blocks

        for (var i = 0; i < linkviewItems.length; i++) {
            link = linkviewItems[i].querySelector('a'); //Only take the 1st link in this item
            if (link) {
                if (YAD.Helper.isElementInViewport(linkviewItems[i], 0.5, scrollTop, scrollLeft, viewportWidth, viewportHeight) &&             // if the element is in the viewport
                    YAD.Helper.arrayIndexOf(link.getAttribute('data-ylk'), this.beaconedLinkviews) === -1 &&    //  and we haven't already beaconed it
                    YAD.Helper.arrayIndexOf(link.getAttribute('data-ylk'), toBeacon) === -1 &&   // and we're not just about to beacon it
                    YAD.Helper.isVisible(linkviewItems[i])) {

                    // queue for beaconing
                    rapidObj = YAD.Helper.extractAttributeFromString(link.getAttribute('data-ylk'), rapidKeys);
                    rapidObj['slk'] = link.getAttribute('title') || link.textContent || link.innerText;
                    toBeacon.push(YAD.Helper.clone(rapidObj));
                    this.beaconedLinkviews.push(link.getAttribute('data-ylk'));

                    // for ad views
                    YAD.Helper.dispatchEvent(
                        link,
                        'yad-linkview',
                        {
                            'position': (i + 1)
                        }
                    );
                }
            }
        }

        if (toBeacon.length) {
            this.sendEvent('linkviews', [{"sec": "yad-widget-" + widget.id, "_links": toBeacon}]);
        }
    }
};

/**
 * Holds a matrix of lists
 * @constructor
 */
YAD.Matrix = function (lists) {
    this.lists = lists ? ((lists.length === undefined) ? [lists] : lists) : [];
};

YAD.Matrix.prototype = {
    /**
     * Is this matrix empty?
     */
    isEmpty: function () {
        return this.getLength() === 0;
    },

    /**
     * Returns an array of lists in the Matrix
     */
    getLists: function () {
        return this.lists;
    },

    /**
     * Returns the number of lists in the Matrix
     */
    getLength: function () {
        return this.lists.length;
    },

    /**
     * Render the matrix
     */
    render: function (renderer, isAnimate) {
        // ask the renderer to render this list
        return renderer.matrix(this, isAnimate);
    }
};

/**
 * Holds a list of adverts/content
 * @constructor
 */
YAD.List = function () {
    this.items = [];
};

YAD.List.prototype = {
    /**
     * Returns the first Item in the array
     * 
     * @todo [0] might have been deleted
     */
    first: function () {
        return this.items[0] ? this.items[0] : null;
    },

    /**
     * Returns the last YAD.Item in the List
     */
    last: function () {
        return this.items[this.items.length - 1] ? this.items[this.items.length - 1] : null;
    },

    /**
     * Remove all items from the list
     *
     * @todo unbind events on deletion?
     */
    empty: function () {
        this.items = [];
    },

    /**
     * Is this list empty?
     */
    isEmpty: function () {
        return this.getLength() === 0;
    },

    /**
     * Adds a YAD.Item to the list
     */
    add: function (item) {
        if (!item) {
            throw new YAD.Error('Please provide an item to add to the list');
        }

        this.items.push(item);
    },

    /**
     * Adds an array containing YAD.Items to the List
     * @param {[type]} items [description]
     */
    addAll: function (items) {
        if (items && items.length > 0) {
            for (var i = 0; i <= items.length - 1; i += 1) {
                this.add(items[i]);
            }
        }
    },

    /**
     * Clone this list, by creating a new list and adding all items of this list.
     * @return A new list with the same items.
     */
    clone: function() {
        var list = new YAD.List();
        list.addAll(this.items);
        return list;
    },

    /**
     * Returns a certain item in the List
     */
    getItem: function (index) {
        return this.items ? (this.items[index] ? this.items[index] : null) : null;
    },

    /**
     * Returns an array of items in the List
     */
    getItems: function () {
        return this.items;
    },

    /**
     * Returns the number of items in the List
     */
    getLength: function () {
        return this.items.length;
    },

    /**
     * Return a new list which contains part of the items
     */
    slice: function(beginIndex, endIndex) {
        var list = new YAD.List();
        list.addAll(this.items.slice(beginIndex, endIndex));
        return list;
    },

    /**
     * Splits this list into a given number of lists. Try to split items as evenly as possible.
     * Given items 1,2,3,4,5 in this list, it will return an array of lists
     * in the following order:
     * [[1,2],[3,4],[5]]
     * If you request 10 lists, but there are only 5 items, it will return 1 list of 5 items.
     * TODO return 5 lists of 1 item and 5 empty lists.
     * 
     * @param  {Number} number the number of lists to return
     * @return {Array}  an array of YAD.List
     */
    split: function (number) {
        var minItemsPerList,
            maxItemPerList,
            numOfListsWithMaxItems,
            numOfItemsInList,
            beginIndex = 0,
            i,
            newLists = [];
 
        if (number > this.getLength()) {// if the caller requested 10 lists, but only 5 items exist, return 1 list of 5 items.
            return [this];
        }

        minItemsPerList = Math.floor(this.getLength() / number);
        maxItemPerList = minItemsPerList + 1;
        numOfListsWithMaxItems = this.getLength() - (minItemsPerList * number);

        for (i = 0; i < number; i++) {
            numOfItemsInList = (i < numOfListsWithMaxItems) ? maxItemPerList : minItemsPerList;
            newLists.push(this.slice(beginIndex, beginIndex + numOfItemsInList));
            beginIndex = beginIndex + numOfItemsInList;
        }

        return newLists;

    },

    /**
     * Order the list by the item score.
     */
    order: function (order) {
        var isAsc,
            isObject,
            aScore,
            bScore;

        if (this.items.length === 0) {
            return;
        }

        isAsc = (order === 'asc') ? true : false;
        isObject = (typeof this.items[0] === 'object') ? true : false;
        
        this.items.sort(function (a, b) {
            aScore = isObject ? a.score : a;
            bScore = isObject ? b.score : b;
            if (aScore > bScore) {
                return (isAsc ? 1 : -1);
            }
            if (aScore < bScore) {
                return (isAsc ? -1 : 1);
            }
            return 0; // aScore == bScore
        });
    },

    /**
     * inserts items from list randomly into this list between a and b
     * @param  {YAD.List} the list to mix
     * @param {Number} a should be inserted at or after this index
     * @param {Number} b should be inserted at or before this index
     * @return {null}
     */
    mix: function (list, a, b) {
        var items = list.getItems(),
            i;

        for (i = 0; i <= items.length - 1; i += 1) {
            this.insertToRandomPosition(items[i], a, b);
        }
    },

    /**
     * Inserts the item to a random position in this list between a and b inclusive
     * @param  {YAD.Item} item the item to insert
     * @param {Number} a should be inserted at or after this index
     * @param {Number} b should be inserted at or before this index
     * @return {null}
     */
    insertToRandomPosition: function (item, a, b) {
        var index;

        if (typeof a === 'undefined' || a < 0) {
            a = 0;
        }
        if (typeof b === 'undefined' || b > this.items.length) {
            b = this.items.length;
        }
        index = Math.floor(Math.random() * (b - a + 1)) + a;

        this.items.splice(index, 0, item);
    },

    /**
     * Merge this list with the list supplied
     * @param  {YAD.List} list  the list to merge into this one
     * @param  {Boolean} order order this list after merging? default: true
     */
    merge: function (list, order) {
        this.items = this.items.concat(list.getItems());

        if (order === false) {
            return;
        }

        this.order(order);
    },

    /**
     * Render the list
     */
    render: function (renderer, index) {
        // ask the renderer to render this list
        return renderer.list(this, index);
    }
};

/**
 * Holds each ad or content item
 * @param {Object} params an object containing the properties of the item
 * @constructor
 */
YAD.Item = function (params) {
    // must use array notation here for closure compiler
    // with dot notation, it shortens the property names
    this.id = params['id'];
    this.title = params['title'];
    this.url = params['url'];
    this.description = params['description'];
    this.image = params['image'];
    this.track_url = params['track_url'];
    this.link_view = params['link_view'];
    this.impr_track_view = params['impr_track_view'];
    this.score = params['score'];
    this.sponsored = params['sponsored'];
    this.providerName = params['attribution'];
    this.aroundTheWeb = params['aroundTheWeb'];
    this.reason = params['reason'];
    this.image_smart_crop_type = params['image_smart_crop_type'];
    this.includeSummary = params['includeSummary'];
    this.summary = params['summary'];
    this.target = params['target'];
    this.widget = params['widget'];
    this.hasLinkviewSent = false;
};

YAD.Item.prototype = {
    /**
     * Render this item
     */
    render: function (renderer, index) {
        // ask the renderer to render this
        return renderer.item(this, index);
    },

    /**
     * Does this item have an image? Was an image supplied by brew?
     */
    hasImage: function () {
        return (!! this.image) && (!! this.image.url);
    },

    /**
     * Generate an HTML image tag if an image exists for this item
     */
    imageTag: function () {
        if (!this.hasImage()) {
            return '';
        }

        return '<img src="' + this.image.url + '" class="yad-image">';
    },

    /**
     * Return true if this is a sponsored item (i.e. an ad)
     * @return {Boolean} whether this is a sponsored item
     */
    isSponsored: function () {
        return !! this.sponsored;
    },

    /**
     * Return the name of provider of this content
     * @return {String} the name of provider of this item or undefined
     */
    getProviderName: function () {
        return this.providerName;
    },

    /**
     * Return the HTML tag for provider node
     */
    providerTag: function () {
        return this.providerName ? '<span class=\'yad-content-provider\'>' + this.providerName + '</span>': '';
    },

    /**
     * Return summary if the item is set to include summary
     * @return {String} the summary of this item
     */
    getSummary: function () {
        if (this.includeSummary) {
            return this.summary;
        }
        return '';
    },

    /**
     * Whether summary is expected by this item (no matter it really has summary or not)
     * @return {Boolean} true if this item is expect to include summary, false otherwise
     */
    getIncludeSummary: function () {
        if (this.includeSummary) {
            return true;
        }
        return false;
    },

    /**
     * Return true if this is a sponsored item (i.e. an ad)
     * @return {Boolean} whether this is a sponsored item
     */
    isAroundTheWeb: function () {
        return !! this.aroundTheWeb;
    },

    /**
     * Return the reason. The reason is why this piece of content was recommended in SS.
     * It's passed back to us in the Brewer.
     */
    getReason: function () {
        return this.reason ? this.reason : '';
    },

    getClass: function (index) {
        var values = [];
        if (!this.hasImage()) {
            values.push('yad-no-image');
        }
        if (this.isSponsored()) {
            values.push('yad-sponsored');
        }
        if (0 === index) {
            values.push('yad-first-item');
        }
        if (this.hasImage() && this.image.width > 0 && this.image.width < 100) {
            values.push('small-image');
        }
        return values.join(' ');
    },

    /**
     * Bind the necessary events to this item
     */
    bind: function () {
        var links = [],
            i;

        if (!this.template) {
            throw new YAD.Error('You must render the item before binding');
        }

        if (!this.track_url && !this.link_view) {
            return;
        }

        // bind the link swapper for each <a> tag
        links = this.template.querySelectorAll('a');

        for (i = 0; i < links.length; i += 1) {
            // If it's an adchoice link - ignore it
            // TODO is this really the best way to do this?
            var linkClasses = links[i].getAttribute('class');
            if (linkClasses && linkClasses.indexOf('ad-choices') !== -1) {
                continue;
            }

            if (this.track_url) {
                YAD.Helper.bind('mousedown', links[i], this.onMouseDown, this, [links[i]]);
            }

            if (this.link_view) {
                YAD.Helper.bindCustom('yad-linkview', links[i], this.onLinkView, this, [links[i]]);
            }
        }
    },

    /**
     * The event handler for when the user presses their mouse down
     */
    onLinkView: function (e) {
        var i, j, adslinkviewParams, canvasId, parsedUrl;
        if (!this.link_view || this.hasLinkviewSent || !YAD.Helper.isVisible(e.target)) {
            return;
        }

        this.hasLinkviewSent = true;

        // do the curveball beacon
        i = new window['Image']();
        i.src = this.link_view.replace('$(AD_POSN)', e.position); //Send ads view beacon to Gemini

        /*
         * This is a temporary section for test use. It sends an additional ads view RAPID beacon besides beap beacon
         */
        canvasId = this.widget.getCanvasId();
        parsedUrl = YAD.Helper.urlParser(this.url);
        if (canvasId && YAD.FeatureWhitelists['ads-linkview'][canvasId]) {
            adslinkviewParams = {
                    g: this.id,
                    slk: this.title,
                    elm: 'hdln',
                    elmt: 'ct',
                    ad:'1',
                    aid:this.id,
                    ct:1,
                    tar:parsedUrl.host,
                    tar_uri: parsedUrl.path
            };
            this.widget.analytics[0].sendEvent('adslinkview', adslinkviewParams); //Send ads view beacon to geo
        }

        // do the partner impression beacon - if available
        // it is a fire and forget beacon
        if (this.impr_track_view) {
            j = new window['Image']();
            j.src = this.impr_track_view;
        }
    },

    /**
     * The event handler for when the user presses their mouse down
     */
    onMouseDown: function (e, link) {

        if (!this.track_url) {
            return;
        }

        // if the href is the target url, swap for the tracker url (which will track, then do an HTTP redirect
        // to send them to the right place)
        if (link.getAttribute('href') === this.url) {
            link.setAttribute('href', this.track_url);

            // the actual url goes here so we can use it in analytics
            link.setAttribute('data-yad-href', this.url);
        }
    }

    /**
     * onClick
     *
     * This handler is in YAD.Widget.
     * There's a todo to find a neat way of moving it here.
     */
};

/**
* A library for PostMessage, the correct way of sending cross domain messages between iframes
*
* Author: Rob McCann (@rob_mccann)
*
* Send
* ====
*
* PostMessage.send({
*   'action': 'submitted',
* }, 'http://destination-url.com');
*
* Listen
* ======
*
* PostMessage.listen(function (data) {
*   switch(data.action) {
*       default:
*   }
* }, 'http://source-url.com');
*/

YAD.PostMessage = {

    lastHeight: null,

    /* json contains arbritrary data
    normally called on child page
    target is the destination url
    targetElement is the element to post the message on. this defaults to the window parent. */
    send: function (json, target, targetElement) {
        // some validation
        if (typeof target === "undefined") {
            throw new YAD.Error('You must supply a target as a string');
        }

        if (typeof targetElement === 'undefined') {
            targetElement = window.parent;
        }

        targetElement.postMessage(YAD.PostMessage._serialize(json), target);
    },

    /* Tip: use a variable called 'action' to decide what function to call in your callback
    origin is the source url. must be specified to prevent XSS. */
    listen: function (callback, origin, scope) {
        if (typeof origin === "undefined") {
            throw new YAD.Error('You must supply an origin or an array of origins');
        }

        // check the origin matches what we expect. You can have an array of origins.
        var onHear = function (e) {
            if (origin !== '*' && origin !== e.origin) {
                return false;
            }

            callback.call(scope, YAD.PostMessage._unserialize(e.data), e.origin, e.source);

        };

        // add the listener
        if ( window["addEventListener"] ) {
            window['addEventListener']('message', onHear, false);
        } else {
            window['attachEvent']('onmessage', onHear);
        }
    },

    /* a helper to sent the height of this document to the target
    used to auto resize iframes */
    sendHeight: function (target, targetElement, payload) {
        // initial call
        YAD.PostMessage._sendUpdateHeightMessage(target, targetElement, payload);
        // Call every half second
        // TODO allow for the interval time to be an option
        // TODO don't send the updated height if it hasn't changed
        window['setInterval'](function () {
            YAD.PostMessage._sendUpdateHeightMessage(target, targetElement, payload);
        }, 1000);
    },

    _sendUpdateHeightMessage: function(target, targetElement, payload) {
        var height = YAD.Helper.getDocumentHeight(document);

        // if the height hasn't changed, don't send the postmessage
        if (YAD.PostMessage.lastHeight === height) {
            return;
        }

        if (payload === undefined) {
            payload = {};
        }

        payload['action'] = 'height';
        payload['height'] = height;

        YAD.PostMessage.send(payload, target, targetElement);
        YAD.PostMessage.lastHeight = height;
    },

    _unserialize: function (string) {
        var obj = null;
        if ("string" === typeof string) {
            try {
                obj = JSON.parse(string);
            } catch (e) {
                // suppress parse error, returning null
            }
            return obj;
        } else {
            return string;
        }
    },

    _serialize: function (obj) {
        return JSON.stringify(obj);
    }
};


/**
 * We can reduce the page weight by sticking things that tend to stay the same between templates here.
 *
 * This should probably be done via classical inheritance but I can't get my head around that right now - feel free to refactor.
 *
 * @type {Object}
 */

YAD.Renderer = {};

YAD.Renderer.ADCHOICES = "<div>{{SPONSOR_TAG}}<a href='{{WHY_THIS_ADS}}' class='yad-ad-choices' target='_blank' data-ylk='slk:Sponsored;cpos:{{I}};'>{{SPONSORED}}</a></div>";
YAD.Renderer.BLANK_SQUARE = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQtJREFUeNrswQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8GkCDADRtwABUD3pdAAAAABJRU5ErkJggg==' class='yad-image'>";
YAD.Renderer.BLANK_LANDSCAPE = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAACDAQAAAACMujuZAAAAAnRSTlMAAHaTzTgAAAAbSURBVHgB7cEBDQAAAMIg+6c2xzdg9AEAAAAHEOMAASm3fXgAAAAASUVORK5CYII=' class='yad-image'>";
YAD.Renderer.HEADER = "<div class='yad-header C Fs Ff Fw Fz Td Bgc'>{{MODULE_TITLE}}</div>";
YAD.Renderer.SUMMARY = "<p class='yad-summary'>{{TEXT_SUMMARY}}</p>";

YAD.Renderer.FOOTER = "<div class='yad-footer-default'>" + /* The container of all footer, we put top border here*/
        "<span class='yad-learn-more-container'>" +  /* The container of "learn more", we use this container when we need to move it to right side of footer*/
            "<a href='#' class='yad-footer-learn-more yad-about yad-nofollow' data-ylk='slk:LearnMore;'>{{LEARN_MORE}}</a>" +
            "<span class='yad-footer-learn-more-space'>&nbsp;</span>" + /* Space to make sure the "learn more" and "powered by" is aligned*/
        "</span>"+
        "<span class='yad-footer-logo-container'>" + /* The container of logo*/
            "{{POWER_BY}} " +
            "<a href='https://yahoo.com' target='_blank' class='yad-nofollow' data-ylk='slk:YahooLogo;'>" +
                "<span class='yad-footer-logo'>Yahoo</span>" +
            "</a>" +
            " {{FOR}} <span class='yad-username'>{{FIRST_NAME}}</span>" +
        "</span></div>" +
    "</div>";

YAD.Renderer.COMMON_STYLE = ".yad-widget a{text-decoration:none}" +
    ".yad-widget li{list-style:none;padding:10px 0;border-bottom:1px solid #e2e2e6;position:relative}" +
    ".yad-widget.dark li{border-bottom:1px solid #525256;}" +
    ".yad-widget .yad-footer-logo{display:inline-block;text-indent:-9999px;width:40px;height:18px;background-position:0 8px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAJCAYAAABADm7+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7FJREFUeNp0lG1MW2UUx3+U8jIK8zIWDbpIyTRGp3IXX6JG5QIm25yJMKMm+qGtidFEDVTjJxMZxn0wmRSNLpoYbdUZExPBD7KxqG19w2AcBUfGssxekMzSsnJ5KdDStZ5bWgTDTnKT+5z/efk/5znnFDVyPFxBTegE+9vIy0GCnjAnnHHO1d/Bs3aoML5F003sbrqVa2lRV/g7dJJHDFP3NDNKmoQ6z1kzTk73MN+rxZQrViqNXhpC/E+a+diZIN6YZMGexaLX8kDwJM3eAr6fgcPi22i5xLBriWjrAfq1PDl1jnBHjFF3hF4jyZxf1J0bYqsx/jB1akExxSnxOZfT3cMbaiPvhecZ74zyuzbNUPs+ToWfRM/Z38Rzyv0cHU4Sc6SIdoXoaopyumuUY4/exfvDT3BBMe0sWBvSLGA9w9FAA6/12aj9RPT1aQxPhN8CMfq9LXzkXBGjLKVOqYi7nxaDLWSZCCXYSDIj1pf85dR4f+YFdwG34+y4BZf/EGP1o7zrsbFbGaBtbwH/h2/M12lbJRGu5gaP/LuypJUUk0GLaZAh7Z5l3L6Pr4cj/KLNMZkLXkylY4kZ7zwXJECR09QN8XJgK5JF8p3hc3nSHUoZ172zEcuw4p1mUNpgwVnONa1i49sqRjlVPsmVy5Nm1rx4wGoe/uQt/TZe7Srjqs5pxr1SvVAzH6oJZrUEEVcxlokdJNvFtKcQbIVZx318oOUvWGdSzJJVt1PPAK36xsSTfGnUcKMkXVRKqZJL2LbiRwWKnmU1958irg7yesBSAC2U9Uzxg4Q55Fs729oXuIgVq0eezzHHefsBBlr/u22171eeP2x+GVKFioQSxHiMMfvGxA/ytrJNSK0SNbJy3kbtFQhW20ukWdYKENXXeORlhDeNUrZTxS6aOKZcJuOcY8I1RnfbCEf2zvOXtwhLu0yxxhVkD08ZEYaEhMW5+fltzjTLxiqxvjhnvcWUObbyr2Snw0rWq9FjT7GQm3xrAbyZl5QSIbjW9EaH9IIxwafrYy9rxBdh0C9tEFwkLElT64GTxKU6i+J9PUtMN52mu/d2jtRZpDWkunWTDGnF0vhDdOkKmnucz/yymnrF1X2cnfpBfrRfZt4TZ8QokXnIUCovUOUr9Hae4Italoz/au5sOs8Xxtp0fbdpf9XykFk9EzNXQUhwI69XqqhTd/P4+h4UImreThwCmwZLMKWWe1t30Sh70BByy3qMUHCJi31TfGXcyiv+avboP/GM618BBgBllnJccZj4TQAAAABJRU5ErkJggg==)}" +
    ".yad-widget.dark .yad-footer-logo{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAJCAYAAABADm7+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNqsVFFtwzAQdaQBCIMZghk0YxAGaxGsDJYh6Bh4DDIG2RAkDNIhSBm476p32tWKtXzM0pN957Pv3eU5LqU0A70zA/YJWIAaCIA3e+JrZP7DF+gLbmXAvwciMHDeZ/ud7DleIqMxFyc9QKLRHLyLz308fyuaSSLtYIoZSczT5xk/apG0B2eMmetBN1jlwuT1RoISf8q6cTRfJGqula7O2gzy6JypILGCZKod+Lnl4NFcVCLYcvZZ4pp+JdoVCErHk8ndPIhRVdUZxhuWr8AH7IkkhcQB+AFegHdz37Mh+cg56H02MewL89ZEadhzAee+1qpULUbavels+w8dTBs7OK4FqI5q+1AM4WGjBruCBv0WDWqcK1TZsJIl21cS3cZXHLNX3GavuC+9Yv1F3eRhk2CS1/sEXKidKSfJPdHRJNrSpNSf9QXV252WfuOF8A7w1N438Em9Co8z1oerAAMAt/u7KFSv+S4AAAAASUVORK5CYII=)}" +
    ".yad-widget.dark .yad-header{color:#fff;}" +
    ".yad-widget.dark .yad-title{color:#fff;}" +
    ".yad-widget .yad-title{display:block}" +
    ".yad-widget .yad-summary{margin-top:0.3em;margin-bottom:0.3em}" +
    ".yad-widget .yad-sponsored{background-color:#f1f1f5;margin:0;border-top:1px solid #e2e2e6;border-bottom:1px solid #e2e2e6;margin-top:-1px}" +
    ".yad-widget.dark .yad-sponsored{background-color:#454545;border-top:1px solid #525256;border-bottom:1px solid #525256;}" +
    ".yad-widget.dark .yad-sponsored{background-color:rgba(230,230,230,0.2);}" +
    ".yad-widget .yad-content-provider{color:#6c6c6c;padding-right:7px;font-weight:normal;line-height:17px;z-index:1;font-family:Arial,sans-serif;font-size:11px}" +
    ".yad-widget.dark .yad-content-provider{color:#d3d3d3;}" +
    ".yad-widget .yad-list{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}" +
    ".yad-widget .yad-sponsored .yad-title{padding-bottom:0;display:inline;padding-right:10px}" +
    ".yad-widget h2{font-size:18px;line-height:20px;margin:10px 0 0;font-weight:300}" +
    ".yad-widget h3{font-size:11px;margin:4px 0 0;font-weight:normal}" +
    ".yad-widget .yad-patterned{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAALklEQVR4AWOAAhFq0SPQuNEwHA1D6ho3GoajYTgahqNhOBqGo2E4GoajYTgahgDJkx9B9Dk4vQAAAABJRU5ErkJggg==)}" +
    ".yad-widget .yad-ad-choices{display:inline-block;font-weight:normal;color:#999;cursor:pointer;line-height:17px;z-index:1;font-family:Arial,sans-serif;font-size:11px;background-repeat:no-repeat;background-position:right 1px;padding:0 18px 0 0;margin:1px 5px 0 0;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQFJREFUeNp8UksRg1AMfDAVgARwgINSB+AATlxBAVMF7ZUTdUAdgAQc9DkoEpqd2UwD/WRmJy/JJoQkzlH6vk8F8c6ejB3Dp3bo3gLnaOzIbWUi51Ok4iiIjJ1RR4hZbiCOnJWudV2vJukCLb7W+FC0ESxo1QuOgm6XBEKjBSgduT740m7G/1kIfKWy3UAOZnIIepOQEp7JK6c+6FTPAJMcK8NXCGYByCVjXvmhGDNbzKlLrmUw499wkBOK0dj9ifPGr63ESYtTsLIGrYKYSPCul4E3kwvTUUp/gpzAnpSoB4t42p28K+7vqbH9yaH/VgMcSmwG1pLzX3hm5a/4S4ABAJsRiQ0Ypb7pAAAAAElFTkSuQmCC)}" +
    ".yad-widget li .yad-item-shadow{z-index:-1;width:100%;height:100%;position:absolute;top:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAALklEQVR4AWOAAhFq0SPQuNEwHA1D6ho3GoajYTgahqNhOBqGo2E4GoajYTgahgDJkx9B9Dk4vQAAAABJRU5ErkJggg==)}" +
    ".yad-widget .yad-username{text-transform:none}" +
    ".yad-widget .yad-footer{position:relative}" +
    ".yad-widget .yad-footer-default{font-size:11px;color:#999;line-height:25px;padding-top:2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}" +
    ".yad-widget .yad-footer-logo-container{float:right;padding-top:1px;white-space:nowrap;}" +
    ".yad-widget .yad-footer-learn-more{color:#999;font-weight:normal}" +
    ".yad-widget .yad-footer-learn-more-space{font-weight:bold}" +
    ".yad-widget ol{padding:0;margin:0}" +
    ".yad-widget a img{border:0}" +
    ".yad-widget.dark a img{border:0}" +
    // retina support for logo
    "@media only screen and (-webkit-min-device-pixel-ratio: 1.5),only screen and (-o-min-device-pixel-ratio: 3/2),only screen and (min--moz-device-pixel-ratio: 1.5),only screen and (min-device-pixel-ratio: 1.5) {" +
        ".yad-widget .yad-footer-logo{background-size:40px 9px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAASCAYAAADMgVnKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACHhJREFUeNrcWF1wE9cV/iRZkmVsvMFJCA0M604mJNCWNZ2SvrSzBto4hAGR0r7kwfJT2klay9M89IURajPTDNPGJplm2skUye1kpiFNLCgUUzLRJpkknnQa1oAJsY1ZwAT/e/0ny7It9bvyjyxLtmySl/Z61pJ279295zvfOec7a9mNt687sU5OIKqfRUUZlhlP4r1AFKanDW+Zkxgru4O3DPwPD9qjWmCFBTb+t+MkvqOtZF0F/tXgQLEaR6zK8g08r05jIrwZe3kpUdOIvXVLPYwf4Rb8BePoqenGP5LzduO4VIRtEmCXQtihZ1v7bbworcO3pPuxE/1oMhuxz8w272n08T6QouhGBLdMOjRj3hM4K1vg5JGnCqNtcGhW5JtvY5u+EuN3I+ABbNUxRJQI+jCFCSOOKTOOuJKP+3EfFL0QDx77Ox4JLnWPx3EuYUch14758y7jd9qjeC44gBbPvdjuq8Dp4BIG1g7gKkbxhd6Hs/Mg03u+GEwvjRJr7lnimUoXmsIulIjv5TyyeroT5xQ71obzUZwxbxf+SMDW+CK4rU4hao6hT5+mCWuwoVJE0I9w1bDB6T+B0qyG78QRAlQYiGFAmcCITgAP6jgaWjjnAex338T56iJsDhzABZ8TxQdP4OtpjtmLd4WT+eRR2m41reKHFY6aQbQwLMclerY2k32aN4GYYuA8PW6vWXiNwHkG0Sa+SU8i7FnKaxMYRIKPXW6MowsDuMx58bTzj8FfS2+HI+hURnCt5kM8d4+OI+WX8EJ5E54tvYrXyz/BCxjCtcBP0BFYfN8teEYhYGErXIoNtuAnOFK2GDwxunAq1IvG8mEYwY9xWJ7AUPjHaFfSZyX4O8G/KHcZ0ZIAtuAlMw+F/m40ERC7pwJn1FTINErTGPPdxDs0PxLsxql5VuxB0GOBQ4ow5AZxRYBY+eUzkyXt1yP4mTeGqNcKJ/LgOPgpfpuRYrpxWpuESUBfNYfQ7jmE1tp0543UFuNhyY5iXYO3KtcO+nCuKoFp7RL+JNHmhvSr0zzi/D9onsMB3Tp3+jO8UhdFrxGhHwhibWr6aO0Yrks9ZKgVtsXsq4xhjHOm/AO4JE6ppLicZU/mXSBprMc+aRymrwAPErzi4Pv45ZJJvgunWdDiNR04xf1EvE/hUnIf67DHzX2qBdjESCvyr/ThjDT/KG6S1e3yU7g8H1mMIkEokmlYm4netEX5VXfwgahICpO1lwWC+abXcwsfi6XHWDjMFPvqZbJCHWbmoj/qmAdD4+gVl6oXb+Y/+JW+WvRYQAymFDeDWVqLhwSA9bmNdoREGhjBDYI4kdwHC8QBiTxmagIZE1rp8xnOmh1OY4CRxWp7YAGAigBwEqPNGQCShUQ1ofXg34KFvjiigWHc5ob6jB6cOZLOPptvin4Yx0DoCo6Snc76fug8b/F8VeFLx2ynXOAm89GI/Tklxi2cMO1w6aP8RgDncpdShI0iz2ur3U0e8o0oA5oAqikAJxFjwppk/puZk+FFZ9UQWq+XYDsLil26heaMwrEbf+Y1p3s4udFokhntCIQeQqUxjZi8F+94/ok9wUx4bCjClkrKFTXbhsfQufk2wmnVm1U2A9jlhgMFJgte0tC5exC8pM5b7bAjXyerqfempJRTJzdPsNSxaGUH8ApeNrbgp3Vd+NDLhSK/aZQtoXQgHG4ulYZgGK14JZTyTiI0jGteiSDxZwaArKT4HMcxjI6sG3ZRhxVjWwbolvRAyQGgi/MTIg8uYFIB71JwFwC6uNaevFvKxpgcw4iWunfWXOLy96PZW0IJvB5lxwjgIqPsvlFmiUJs0gWbXse9Gj+VAVxsbsdfKQYfVZ+gpjuLx/VFORal2F9Pnall12ovUdRPLkwBOsWumke1twoGStakEBqdvwfXK44ZbblaBlL25Ak2mykAJ0iDrnm7srr2CmqpzGN8pIzN2JVWQVk8KGhdci8ucout7gv4dXgrfpHg54UbCAXY4vF8p8iF1V9Bt9VM4U4ePIBDuKrmmvx9/F5yECw7YZymWJ6r5sMsKgxhdbUPJ5tlwWgqkXnAouhXWdyalwVwVlxnvUz2VUdZ3ClMtVa8ZmHIpx0MlyqT5YhrhZ6UZ1s5ZbWbp/4Ua1lVe0wh1J0oqcyd9F3uPM6kdhNGz1Xtk93MWMIeRol7pc//Ho6S+fmyk3EWx1h9Kg2N84jqOQHk4ozcQ+EspIvbxHVR5bLKinYEg9ROZPCkWD8XjtJdVGLZhCbY72/GH0TV84g0sXR/2iDZsLZ2BD00cahOQ7U+I0C1YD9adHYX4qdv5RW4wGdPYpAwzuPpZD5XUaeO4A5L5+mVAFiQJXkL6TKNfnxmduJvwWXYG5ztTKqFYV8mhglAHVkYbKLt7HjC2VgkXnTEMBG+gY8kAqhFMbJYMFddZJfC9KJwfSDXM3+INwIW5KvMdlwzenBhTh5ER3k6TlnGVlTLovKICpiSLq+RER3sezvEG4xgDhVP0d3kpbCmCN7kFS8F2MQzm73LjHIflu6XB5I9cwwPJyNgAYhsv9STYTzrW4+dDTvxquFCCYX2CEHtldrQoPRANxi+NWzD6rI4QTBG9MsN38Qzc0z2s/iF0h3xvpsFo1q8sOjFZbI/Xt6Cl/WUXRuVHThsnmFbm6sKy3MSIlVY3hDhVDobZMu2Zm0IGBuxr/wiXtQ2YI/YrIif0i/YtS7X1vWgSWy2tIByZj0eMxeBIIwVh8ycJicjamaIim7OgrQck8X1sg/wvGcTdlWuw9aGCrzHSlugzziiSziBEsvQTXxew/PBTrw5vwcZhzx5KAwQG+zAb0o/xWEDSylU8Y4wgjvhmVc83636CD8P4v9wSFAXV2Z9Nu9mjA34gXsNviZepIqwLm3D8eS8/wowAO6Vb/naJGOlAAAAAElFTkSuQmCC)}" +
        ".yad-widget.dark .yad-footer-logo{background-size:40px 9px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAASCAYAAADMgVnKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoBJREFUeNrcWItxgzAMJbkOwAZlBI/ACGwQOkHpBmxAN6CZgHYCskG6gbsB2YDaqZxThPyj7l0a3RnwR0Z61sd2Ns+znH/omHlIjelh7KRKkf1zUjqUuETwDYBBZSYx1Hh+thinvnMNpirCwWvG6JL/Zhz0aVlaKKXr3wx/rY0F6SJJXX/XnjkMtZxl2QQ/cpaq6p3hDQS/XDMO+kYk5whFIiBqx9wC63C2nuWYCv1DcgsDi3xtSNA4QWPPMDUOxSbUV/8FgHiROC8BPumQX7j084Qq4ZBReEFygQvugGlMDaBr8RjXNnJ2pG8MjfMMj7TIOHFMi4Ticm/0kxYpWVgsIBbAwucZlvh2JQe4paEqMsEsPAvNN3gTBam3zIobyiEzLVafCbxBADKAlAFK4/jUEQOYV2RpScFCxtL6THfCAdoRJwayMlNCALtY5VGiGLl6JIAj1QkBeNbjgeF7UkUDlkPR9EJXWr2MO+z1Y7PZvKv2L/WpLbNW9TeLXDsHiI+kLrJ4OiWYw9CnKiXC4SKj0u+g31vKoTo0CK+o6aDBIcMqmPSL9JnvXXa/pGPrISaWVK7YgLKlIDFL3KkLj7Y4HxSzSGJxUX8jSWRIkERGosclK29XmPAzcu0FQQzVVKOthFghfAEh4RQRFrC37OH9gbcgMdsYcFc8F46N8RZIti6uY9OEU33CjbTvvG3bSB9TbKSNfKETcAD2vnMvc/TKExzl8Ga+svBdYh2z4U9ylDO6BLkPYwkFjS+B/G2iy4QKgSTRZQJuazyXCTLiMsF2DhZB/s8AGHQlRWKIEfwmrrNg/oa5vqL1hrHi2nVcDToH3hvRC1XP4lbcncC3AAMAY/iTys++HOMAAAAASUVORK5CYII=)}" +
        ".yad-widget .yad-ad-choices{background-size:14px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhxJREFUeNrMVt1xgkAQFscCKEE7wAoSKwhWIHnyUa1ArADy6FPsIHSgHUAHUgIdJLvmO2dns8DBU25m5/Tu9u++3Y8LJiPG+XwOaSpJTtvt9jJEd9pi8JMk7dCLSOYQSz9lG94OabySHEkpGpH9Qxc2vB0eMGcjbvyobPQ7JFwKmm4cJSLW+7zHZyojO5YbbPwZs45IOcJYGxVO18Yynz0hGHMEiIyxashI7YGRLJZ6gE5IZyuXYYkNji6njaZDPxE48fm0p332JDt2yAlOxfU1MFQiIrPcadqIpQ2tJR1ZlSq436KhjHKaFpwdIrEMXKEsg+HfbT0bQpgYFuQjfWLogUHkrh1jLVrA9erCB8+pZ2/prN8EFAdfZ4+2MPqsMoqmAsahKJxE7NUQq2gineFVyd7oOXa2AhlYvPpFxmNjb6/tz2BIZ2M1Oq+vgCcbf1F8uTMaPtdBBgNIOYLRg7tyWivFlTGdrXox9HSWgMgZk5j+X8R1uuFXNArgDNe1VFUXioIJDZwb/XUQjV/IW5likw3cUXmNgV8OrC8qkxo4LVrosIHNO3w8yfsbmx99XApWedKVYxAfLqWzgbvSpe/XAlnefHBD4CkwDzurVJR/39fDyqhAGw2itswga2ncavY5dLKhr7ZYPBWqlodSrGkLZ93TJBmSYdb1EOoZ7+ox5eWwQAVWQ72h8E5tFBmMyMAVxx1B5ZP/PH4EGAAXrfj5wD1SbAAAAABJRU5ErkJggg==)}" +
    "}}";

// two columns, no images, only content
YAD.Renderer.SingleColumnText = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

/**
 * Template for each item in the list
 * @type {String}
 */
YAD.Renderer.SingleColumnText.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' class='yad-title C Fs Ff Fw Fz Td Bgc' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
        "{{TITLE}}" +
    "</a>" +
    "{{ADCHOICES}}" +
"</li>";

/**
 * Template for the two lists.
 * @type {String}
 */
YAD.Renderer.SingleColumnText.LIST = "<ol class='yad-list'></ol>";

/**
 * Template for the widget
 * @type {String}
 */
YAD.Renderer.SingleColumnText.WIDGET = "<div class='yad-widget Bgc yad-single-column-text {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{LIST}}" + YAD.Renderer.FOOTER;

// // styles for the widget
YAD.Renderer.SingleColumnText.STYLE = ".yad-single-column-text .yad-title{font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.SingleColumnText.prototype = {
    /**
     * Only retrive content, no ads. 6 in each column.
     * @type {String}
     */
    queryOptions: {
    },

    /**
     * Render an individual list item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.SingleColumnText.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'class': item.getClass(index),
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // if there's nothing in the list, return empty string
        if (list.isEmpty()) {
            return '';
        }

        container = YAD.Helper.template(
            YAD.Renderer.SingleColumnText.LIST
        );

        // appeach each item to the list
        ol = container.querySelector('ol');

        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            widgetTemplate = YAD.Renderer.SingleColumnText.WIDGET;

        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();

        // if there's no content, don't show anything, no even ads.
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        content.addAll(ads.getItems());

        // append the style
        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.SingleColumnText.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        // create the dom elements from the SingleColumnThumbnail
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'list': content.render(this),
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.SingleColumnThumbnail = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            },
            'description': {
                'count': 100
            }
        }
    }, config);
};

// each item in the list
YAD.Renderer.SingleColumnThumbnail.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}} {{NO_SUMMARY_CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-info'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' class='yad-title C Fs Ff Fw Fz Td Bgc' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "{{TITLE}}" +
        "</a>" +
        "{{SUMMARY}}" +
        "{{ADCHOICES}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.SingleColumnThumbnail.LIST = "<ol class='yad-list'></ol>";

// the wrapper for the widget
YAD.Renderer.SingleColumnThumbnail.WIDGET = "<div class='yad-widget Bgc yad-single-column-thumbnail {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{LIST}}" + YAD.Renderer.FOOTER;

// // styles for the widget
YAD.Renderer.SingleColumnThumbnail.STYLE = ".yad-single-column-thumbnail li > a{text-align:center;display:inline-block;overflow:hidden;height:auto;width:34%;max-width:100px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:middle;position:relative}" +
    ".yad-single-column-thumbnail li.yad-sponsored{z-index:0}" +
    ".yad-single-column-thumbnail li.yad-sponsored.small-image > a{background-size:inherit}" +
    ".yad-single-column-thumbnail img{max-width:100%;display:inline-block;vertical-align:middle}" +
    ".yad-single-column-thumbnail .yad-info{display:inline-block;width:66%;padding-left:10px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}" +
    ".yad-single-column-thumbnail .yad-title{font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.SingleColumnThumbnail.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url),
            itemSummary = item.getSummary();

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.SingleColumnThumbnail.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'desc': YAD.Helper.truncateString(item.description, this.config['truncate']['description']['count']),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'summary': itemSummary ? YAD.Helper.template(YAD.Renderer.SUMMARY, {'text_summary': itemSummary}) : '',
            'class': item.getClass(index),
            'no_summary_class': item.getIncludeSummary() ? (itemSummary ? '' : 'no-summary') : '',
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.SingleColumnThumbnail.LIST);

        // append the items to the list
        ol = container.querySelector('.yad-list');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            widgetTemplate = YAD.Renderer.SingleColumnThumbnail.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();
        content.addAll(ads.getItems());

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.SingleColumnThumbnail.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        // create the dom elements from the SingleColumnThumbnail
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'list': content.render(this),
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.DualColumnText = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
/**
 * Template for each item in the list
 * @type {String}
 */
YAD.Renderer.DualColumnText.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' class='yad-title C Fs Ff Fw Fz Td Bgc' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;atw:{{ATW}};r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
        "{{TITLE}}" +
    "</a>" +
    "{{ADCHOICES}}" +
"</li>";

/**
 * Template for the two lists.
 * @type {String}
 */
YAD.Renderer.DualColumnText.LIST = "<ol class='yad-list'></ol>";

/**
 * Template for the widget
 * @type {String}
 */
YAD.Renderer.DualColumnText.WIDGET = "<div class='yad-widget Bgc yad-dual-column-text yad-cols-{{COLS}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{FIRST_LIST}}{{SECOND_LIST}}" + YAD.Renderer.FOOTER;

/**
 * CSS for the widget
 * @type {String}
 */
YAD.Renderer.DualColumnText.STYLE = ".yad-dual-column-text .yad-list{display:inline-block;vertical-align:top}" +
    ".yad-dual-column-text.yad-cols-1 .yad-list{width:100%;display:block}" +
    ".yad-dual-column-text.yad-cols-2 .yad-list{width:50%;padding: 0 1% 0 0}" +
    ".yad-dual-column-text.yad-cols-2 .yad-list+.yad-list{padding: 0 0 0 1%}" +
    ".yad-dual-column-text .yad-item{min-height:2.5em}" +
    ".yad-dual-column-text .yad-title{font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.DualColumnText.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualColumnText.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'img': item.imageTag(),
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'atw': item.isAroundTheWeb() ? '1': '0',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualColumnText.LIST);

        // append the items to the list
        ol = container.querySelector('ol');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            numOfAds,
            columns = 0,
            firstColumn = '',
            secondColumn = '',
            widgetTemplate = YAD.Renderer.DualColumnText.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        // messy, but in order to get the publisher name in the list title
        this.widget = widget;

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualColumnText.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();
        numOfAds = ads.getLength();

        // split the content into two columns
        columns = content.split(2);

        // if we have 1 or more columns, render the first column
        if (columns.length >= 1) {
            if (numOfAds > 1) {
                columns[0].addAll(ads.slice(0, Math.floor(numOfAds/2)).getItems());
            }
            firstColumn = columns[0].render(this);
        }

        // if we have 2 columns, render the second one
        if (columns.length >= 2) {
            if (numOfAds >= 1) {
                columns[1].addAll(ads.slice(Math.floor(numOfAds/2), numOfAds).getItems());
            }
            secondColumn = columns[1].render(this);
        }

        // create the dom elements from the DualColumnText
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'first_list': firstColumn,
            'second_list': secondColumn,
            'cols': columns.length,
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.DualColumnThumbnail = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
YAD.Renderer.DualColumnThumbnail.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}} {{NO_SUMMARY_CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-info'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' class='yad-title C Fs Ff Fw Fz Td Bgc' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "{{TITLE}}" +
        "</a>" +
        "{{SUMMARY}}" +
        "{{ADCHOICES}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.DualColumnThumbnail.LIST = "<ol class='yad-list'></ol>";

// the wrapper for the widget
YAD.Renderer.DualColumnThumbnail.WIDGET = "<div class='yad-widget Bgc yad-dual-column-thumbnail {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{FIRST_LIST}}{{SECOND_LIST}}" + YAD.Renderer.FOOTER;

// // styles for the widget
YAD.Renderer.DualColumnThumbnail.STYLE = ".yad-dual-column-thumbnail .yad-list{padding:0 1% 0 0;margin:0;display:inline-block;width:50%;vertical-align:top}" +
    ".yad-dual-column-thumbnail .yad-list+.yad-list{padding:0 0 0 1%}" +
    ".yad-dual-column-thumbnail li > a{text-align:center;display:inline-block;overflow:hidden;height:auto;width:34%;max-width:100px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:middle;position:relative}" +
    ".yad-dual-column-thumbnail li.yad-sponsored{z-index:0}" +
    ".yad-dual-column-thumbnail li.yad-sponsored.small-image > a{background-size:inherit}" +
    ".yad-dual-column-thumbnail img {max-width:100%;display:inline-block;vertical-align:middle}" +
    ".yad-dual-column-thumbnail .yad-info {display:inline-block;width:66%;padding-left:10px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}" +
    ".yad-dual-column-thumbnail .yad-item{min-height:2.5em}" +
    ".yad-dual-column-thumbnail .yad-title{font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.DualColumnThumbnail.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url),
            itemSummary = item.getSummary();

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualColumnThumbnail.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'summary': itemSummary ? YAD.Helper.template(YAD.Renderer.SUMMARY, {'text_summary': itemSummary}) : '',
            'class': item.getClass(index),
            'no_summary_class': item.getIncludeSummary() ? (itemSummary ? '' : 'no-summary') : '',
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualColumnThumbnail.LIST);

        // append the items to the list
        ol = container.querySelector('.yad-list');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            numOfAds,
            columns = [],
            firstColumn = '',
            secondColumn = '',
            widgetTemplate = YAD.Renderer.DualColumnThumbnail.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        // messy, but in order to get the publisher name in the list title
        this.widget = widget;

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualColumnThumbnail.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();
        numOfAds = ads.getLength();

        // split the content into two columns
        columns = content.split(2);

        // if we have 1 or more columns, render the first column
        if (columns.length >= 1) {
            if (numOfAds > 1) {
                columns[0].addAll(ads.slice(0, Math.floor(numOfAds/2)).getItems());
            }
            firstColumn = columns[0].render(this);
        }

        // if we have 2 columns, render the second one
        if (columns.length >= 2) {
            if (numOfAds >= 1) {
                columns[1].addAll(ads.slice(Math.floor(numOfAds/2), numOfAds).getItems());
            }
            secondColumn = columns[1].render(this);
        }

        // create the dom elements from the DualColumnThumbnail
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'first_list': firstColumn,
            'second_list': secondColumn,
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.DualColumnTextWeb = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
/**
 * Template for each item in the list
 * @type {String}
 */
YAD.Renderer.DualColumnTextWeb.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' class='yad-title C Fs Ff Fw Fz Td Bgc' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;atw:{{ATW}};r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
        "{{TITLE}}" +
    "</a>" +
    "{{ADCHOICES}}" +
    "{{PROVIDER}}" +
"</li>";

/**
 * Template for the two lists.
 * @type {String}
 */
YAD.Renderer.DualColumnTextWeb.LIST = "<div class='yad-list'><h3>{{TITLE}}</h3><ol></ol></div>";

/**
 * Template for the widget
 * @type {String}
 */
YAD.Renderer.DualColumnTextWeb.WIDGET = "<div class='yad-widget Bgc yad-dual-column-text-web yad-cols-{{COLS}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{FIRST_LIST}}{{SECOND_LIST}}" + YAD.Renderer.FOOTER;

/**
 * CSS for the widget
 * @type {String}
 */
YAD.Renderer.DualColumnTextWeb.STYLE = ".yad-dual-column-text-web .yad-list{display:inline-block;vertical-align:top}" +
    ".yad-dual-column-text-web .yad-item:first-child {padding-top: 5px}" +
    ".yad-dual-column-text-web.yad-cols-1 .yad-list{width:100%;display:block}" +
    ".yad-dual-column-text-web.yad-cols-2 .yad-list{width:50%;padding: 0 1% 0 0}" +
    ".yad-dual-column-text-web.yad-cols-2 .yad-list+.yad-list{padding: 0 0 0 1%}" +
    ".yad-dual-column-text-web .yad-item{min-height:2.5em}" +
    ".yad-dual-column-text-web .yad-title{display:inline;padding-right:5px;font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.DualColumnTextWeb.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualColumnTextWeb.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'img': item.imageTag(),
            'provider': item.isAroundTheWeb() ? '&nbsp;'+item.providerTag() : '',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'atw': item.isAroundTheWeb() ? '1': '0',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null,
            title = '';

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        if (list.first().isAroundTheWeb()) {
            title = 'Around the web';
        } else if (this.widget.publisher_name) {
            title = 'On ' + this.widget.publisher_name;
        } else {
            title = 'On this site';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualColumnTextWeb.LIST, {
            'title': title
        });

        // append the items to the list
        ol = container.querySelector('ol');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            recirculationContent,
            ads,
            webContent,
            columns = 0,
            firstColumn = '',
            secondColumn = '',
            widgetTemplate = YAD.Renderer.DualColumnTextWeb.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        // messy, but in order to get the publisher name in the list title
        this.widget = widget;

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualColumnTextWeb.STYLE);
        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        webContent = widget.getAroundTheWebContent().clone();
        recirculationContent = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();

        // TODO refactor to lose duplicate code
        switch(ads.getLength()) {
        case 2:
            // if there's two ads, add one to each list
            if (recirculationContent.getLength() > 0) {
                recirculationContent.add(ads.first());
            }

            if (webContent.getLength() > 0) {
                webContent.add(ads.last());
            }
            break;
        case 1:
            // there's only 1 ad, randomly select which column it should go in.
            var hasWebContent = !webContent.isEmpty(),
                hasRecirc = !recirculationContent.isEmpty(),
                random = Math.round(Math.random());

            if (!hasWebContent && hasRecirc) {
                recirculationContent.add(ads.first());
            } else if (!hasRecirc && hasWebContent) {
                webContent.add(ads.first());
            } else if (!hasRecirc && !hasWebContent) {
                // widget is empty - we shouldn't really get here as there's a check above this block
                // to see if the widget is empty
            } else if(random) {
                webContent.add(ads.first());
            } else {
                recirculationContent.add(ads.first());
            }
            break;
        }

        // if we have 1 or more columns, render the first column
        if (recirculationContent.getLength() >= 1) {
            firstColumn = recirculationContent.render(this);
            columns++;
        }

        // if we have 2 columns, render the second one
        if (webContent.getLength() >= 1) {
            secondColumn = webContent.render(this);
            columns++;
        }

        // create the dom elements from the DualColumnTextWeb
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'first_list': firstColumn,
            'second_list': secondColumn,
            'cols': columns,
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.DualColumnThumbnailWeb = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];

    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
YAD.Renderer.DualColumnThumbnailWeb.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;atw:{{ATW}};r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-info'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' class='yad-title C Fs Ff Fw Fz Td Bgc' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;atw:{{ATW}};r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "{{TITLE}}" +
        "</a>" +
        "{{ADCHOICES}}" +
        "{{PROVIDER}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.DualColumnThumbnailWeb.LIST = "<div class='yad-list'><h3>{{TITLE}}</h3><ol></ol></div>";

// the wrapper for the widget
YAD.Renderer.DualColumnThumbnailWeb.WIDGET = "<div class='yad-widget Bgc yad-dual-column-thumbnail-web yad-cols-{{cols}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{FIRST_LIST}}{{SECOND_LIST}}" + YAD.Renderer.FOOTER;

// // styles for the widget
YAD.Renderer.DualColumnThumbnailWeb.STYLE = ".yad-dual-column-thumbnail-web .yad-list{padding:0 1% 0 0;margin:0;display:inline-block;width:50%;vertical-align:top}" +
    ".yad-dual-column-thumbnail-web .yad-list+.yad-list{padding:0 0 0 1%}" +
    ".yad-dual-column-thumbnail-web li > a{text-align:center;display:inline-block;overflow:hidden;height:auto;width:34%;max-width:100px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:middle;position:relative}" +
    ".yad-dual-column-thumbnail-web li.yad-sponsored{z-index:0}" +
    ".yad-dual-column-thumbnail-web li.yad-sponsored.small-image > a{background-size:inherit}" +
    ".yad-dual-column-thumbnail-web img{max-width:100%;display:inline-block;vertical-align:middle}" +
    ".yad-dual-column-thumbnail-web .yad-info {display:inline-block;width:66%;padding-left:10px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}"  +
    ".yad-dual-column-thumbnail-web .yad-item{min-height:2.5em}" +
    ".yad-dual-column-thumbnail-web .yad-title{font-size:15px;font-weight:normal;line-height:1.2}";

YAD.Renderer.DualColumnThumbnailWeb.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualColumnThumbnailWeb.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'provider': item.isAroundTheWeb() ? item.providerTag() : '',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'atw': item.isAroundTheWeb() ? '1': '0',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null,
            title = '';

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        if (list.first().isAroundTheWeb()) {
            title = 'Around the web';
        } else if (this.widget.publisher_name) {
            title = 'On ' + this.widget.publisher_name;
        } else {
            title = 'On this site';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualColumnThumbnailWeb.LIST, {
            'title': title
        });

        // append the items to the list
        ol = container.querySelector('ol');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            recirculationContent,
            ads,
            webContent,
            columns = 0,
            firstColumn = '',
            secondColumn = '',
            widgetTemplate = YAD.Renderer.DualColumnThumbnailWeb.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        // messy, but in order to get the publisher name in the list title
        this.widget = widget;

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualColumnThumbnailWeb.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        recirculationContent = widget.getRecirculationContent().clone();
        webContent = widget.getAroundTheWebContent().clone();
        ads = widget.getAds().clone();

        // TODO refactor to lose duplicate code
        switch(ads.getLength()) {
        case 2:
            // if there's two ads, add one to each list
            if (recirculationContent.getLength() > 0) {
                recirculationContent.add(ads.first());
            }

            if (webContent.getLength() > 0) {
                webContent.add(ads.last());
            }
            break;
        case 1:
            // there's only 1 ad, randomly select which column it should go in.
            var hasWebContent = !webContent.isEmpty(),
                hasRecirc = !recirculationContent.isEmpty(),
                random = Math.round(Math.random());

            if (!hasWebContent && hasRecirc) {
                recirculationContent.add(ads.first());
            } else if (!hasRecirc && hasWebContent) {
                webContent.add(ads.first());
            } else if (!hasRecirc && !hasWebContent) {
                // widget is empty - we shouldn't really get here as there's a check above this block
                // to see if the widget is empty
            } else if(random) {
                webContent.add(ads.first());
            } else {
                recirculationContent.add(ads.first());
            }
            break;
        }

        // if we have 1 or more columns, render the first column
        if (recirculationContent.getLength() >= 1) {
            firstColumn = recirculationContent.render(this);
            columns++;
        }

        // if we have 2 columns, render the second one
        if (webContent.getLength() >= 1) {
            secondColumn = webContent.render(this);
            columns++;
        }

        // create the dom elements from the DualColumnThumbnailWeb
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'first_list': firstColumn,
            'second_list': secondColumn,
            'cols': columns,
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two columns, with images
YAD.Renderer.SingleRowCarousel = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];
    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
    if (config['animation_enabled']){
        this.animation_enabled = true;
        this.animation_window_size = config['window_size'];
        this.animation_window_size = this.animation_window_size ? ((this.animation_window_size > 1) ? this.animation_window_size : 2) : 4;
        this.animation_rotation_speed = (config['animation'] && config['animation']['rotation_speed']) || 5500;
        this.animation_fade_speed = (config['animation'] && config['animation']['fade_speed']) || 400;  //TODO: to use fade_speed for dynamic setting
        this.animation_auto = ((config['animation'] && config['animation']['auto_start']) === false) ? false : true;
    }
};

// each item in the list
YAD.Renderer.SingleRowCarousel.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-title-container'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "<span class='yad-title C Fs Ff Fw Fz Td Bgc'>{{TITLE}}</span>" +
        "</a>" +
        "{{ADCHOICES}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.SingleRowCarousel.LIST = "<ol class='yad-list {{ITEM_COUNT}}' data-group='{{DATA_GROUP}}'></ol>";

//the wrapper for matrix
YAD.Renderer.SingleRowCarousel.MATRIX = "<div class='yad-list-container {{LIST_COUNT}}'>{{PREV_NEXT}}</div>";

// custom header for SingleRowCarousel
YAD.Renderer.SingleRowCarousel.HEADER = "<div class='yad-header-container'>" + YAD.Renderer.HEADER + "{{LIST_INFO}}</div>";

// list nav markup
YAD.Renderer.SingleRowCarousel.LIST_INFO = "<div class='yad-list-info'><span class='yad-list-count-from'></span> - <span class='yad-list-count-to'></span><span class='yad-list-count-of'> of </span><span class='yad-list-count-total'></span></div><button class='yad-list-control-button yad-btn yad-nofollow rapid-noclick-resp'><b class='yad-list-playpause'></b></button>";
YAD.Renderer.SingleRowCarousel.PREV_NEXT = "<button class='yad-nav yad-btn yad-prev yad-nofollow rapid-noclick-resp'><b class='yad-background-img'></b></button><button class='yad-nav yad-btn yad-next yad-nofollow rapid-noclick-resp'><b class='yad-background-img'></b></button>";

// the wrapper for the widget
YAD.Renderer.SingleRowCarousel.WIDGET = "<div class='yad-widget Bgc yad-single-row-carousel {{AD_ONLY_CLASS}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.SingleRowCarousel.HEADER + "{{MATRIX}}" + YAD.Renderer.FOOTER;

// // styles for the widget
YAD.Renderer.SingleRowCarousel.STYLE = ".yad-single-row-carousel li{display:inline-block;padding:0;margin:0;border:none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}" +
    ".yad-single-row-carousel.dark li{border:none;}" +
    ".yad-single-row-carousel li > a:first-child{text-align:center;display:block;overflow:hidden;height:auto;margin-bottom:5px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:top;position:relative}" +
    ".yad-single-row-carousel li.yad-sponsored.small-image > a:first-child{background-size:inherit}" +
    ".yad-single-row-carousel img{max-width:100%;display:inline-block;vertical-align:top}" +
    ".yad-single-row-carousel .yad-sponsored .yad-title-container{padding:0 6px 5px 5px}" +
    ".yad-single-row-carousel .yad-sponsored{padding:0;border:none;z-index:0}" +
    ".yad-single-row-carousel.dark .yad-sponsored{border:none;}" +
    ".yad-single-row-carousel .yad-list{margin-top:10px;table-layout:fixed;display:table;width:100%;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}" +
    ".yad-single-row-carousel .yad-footer-default{margin-top:10px;border-top:1px solid #e2e2e6}" +
    ".yad-single-row-carousel.dark .yad-footer-default{border-top:1px solid #525256}" +

    ".yad-single-row-carousel ol.yad-item-1 li{width:100%}" +
    ".yad-single-row-carousel ol.yad-item-2 li{width:47%;margin-left:6%}" +
    ".yad-single-row-carousel ol.yad-item-3 li{width:31%;margin-left:3.5%}" +
    ".yad-single-row-carousel ol.yad-item-4 li{width:22.75%;margin-left:3%}" +
    ".yad-single-row-carousel ol.yad-item-5 li{width:18.2%;margin-left:2.25%}" +
    ".yad-single-row-carousel ol.yad-item-6 li{width:15%;margin-left:2%}" +
    ".yad-single-row-carousel ol.yad-list li.yad-first-item{margin:0}" +

    // mobile/small carousel
    "@media all and (max-width: 450px){" +
        ".yad-single-row-carousel ol.yad-list li,.yad-single-row-carousel ol.yad-list li.yad-first-item{width:48%;border-bottom:none;padding: 0;margin:15px 2% 0 0}" +
        ".yad-single-row-carousel.dark ol.yad-list li,.yad-single-row-carousel.dark ol.yad-list li.yad-first-item{border-bottom:none;}" +
        ".yad-single-row-carousel ol.yad-list li:nth-child(even){margin-right:0;margin-left:2%}" +
    "}";

//// styles for the widget
YAD.Renderer.SingleRowCarousel.ANIMATE_STYLE = ".yad-header-container, .yad-list-container { position: relative; }" +
    ".yad-list { position: absolute; top: 0; left:0; z-index: 1; }" +
    ".yad-list-info { position: absolute; top: 0; right: 21px; font-size: 12px; margin-top: 3px; }" +
    ".yad-list-control-button { position: absolute; padding: 0; background-color: #e3e3e3; border-radius: 0; top: 0; right: 0; width: 18px; height: 18px; margin-top: 2px;}" +
    ".yad-list-control-button:hover { background-color: #71b7e6; cursor: pointer; }" +
    ".yad-list-playpause { text-align: center; display: inline-block; zoom: 1; position: relative; left: -0.5px; top: 0.5px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKBAMAAAB293L0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURQAAAP39//39//n5+////9fX6/n5+fz8/fn5//////0oF4IAAAAJdFJOUwDR4ZbEDVz7Le71kM8AAAAtSURBVAjXY2CAAuUABkYBBhGGmWoMnBMYZjLMnOkBpadbotJQcag6iD5BmDEAo4sQvvyRIZ8AAAAASUVORK5CYII=); width: 7px; height: 10px; background-position: -7px 0;}" +
    ".play .yad-list-playpause { background-position: 0 0; }" +
    ".yad-nav { position: absolute; background: #71b7e6; opacity: 0.8; width: 36px; height: 56px; text-align: center; cursor: pointer; z-index: 10; }" +
    ".yad-list-container:hover .yad-nav { opacity: 1; }" +
    ".yad-list-container .yad-nav:hover { opacity: 1; }" +
    ".yad-btn {border: 0; padding: 0; outline: none;}" +
    ".yad-prev { top: 25%; left: 0;  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);}" +
    ".yad-next { top: 25%; right: 0; box-shadow: -2px 2px 2px rgba(0,0,0,0.5);}" +
    ".yad-btn .yad-background-img{ width: 12px; height: 30px; text-align: center; display: inline-block; zoom: 1; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAMAAAAB8C7XAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADkUExURQAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0xIGlEAAABLdFJOUwAIO47c1fr+DDT8iQQS+an2A08V6AFYvQfmnsWsbjbtGrXDHph//UFKSEDRyeDf0i4OyicNL3iafpl9Binlep2uxih5b+4btB3CNx8Rm7kAAAEMSURBVCjPhVLVcgMxENvghZnhwsycNlCGRP//P63vxo3XuZn6ZTXS2LvWikie74tpNlt0d7J5fDWQz94JVdTqnx+o6vwqgRxRDokV5yNjxEWNYxxhwiOKUVGjRexVPug3+jbqG/7gjXf58CDxDj7Xn+CBNyBxwAuPxMNuyH277g51hzZaTxFWG4YxXVughFlBFQozPImaQmzDP7WJIUWUzuCs2/CGTJoqeEnqQrKMCj2j7Cz8PrXVha14SjSfc35uNRfjjti4hxFKFlhM9A9OFjbqGdwSo/eficL2tsRt1XaxqIGNBmxRRB2c5Go7PAxLGYYlDwO9yvgcnQJXr+HdKaINx4hSq2lelVD/APnzIk3LJjh/AAAAAElFTkSuQmCC);}" +
    ".yad-prev .yad-background-img{background-position: 0 0;}" +
    ".yad-next .yad-background-img{background-position: -12px 0;}" +
    ".yad-prev:active { box-shadow: none;}" +
    ".yad-next:active { box-shadow: none;}" +
    ".yad-list-container .hidden { visibility: hidden; z-index: 1;}" +
    ".yad-list-container .visible { visibility: visible; z-index: 2;}" +
    ".yad-list-container .fadeIn {opacity: 1;transition-property: opacity;transition-duration:400ms;-webkit-transition-duration:400ms;transition-timing-function: linear;}" +
    ".yad-list-container .fadeOut {opacity: 0;transition-property: opacity;transition-duration:400ms;-webkit-transition-duration:400ms;transition-timing-function: linear;}";

YAD.Renderer.SingleRowCarousel.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.SingleRowCarousel.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list, index) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.SingleRowCarousel.LIST, {
            'item_count': (list.items && list.items.length) ? 'yad-item-' +  list.items.length : '',
            'data_group': '' + index
        });

        // append the items to the list
        ol = container.querySelector('.yad-list');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the matrix
     */
    matrix: function (matrix, animationEnabled) {
        var i = 0,
            container = null,
            div = null;

        // dont render anything if the matrix is empty
        if (matrix.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.SingleRowCarousel.MATRIX, {
            'list_count': (matrix.lists && matrix.lists.length) ? 'yad-list-' +  matrix.lists.length : '',
            'prev_next': animationEnabled ? YAD.Renderer.SingleRowCarousel.PREV_NEXT : ''
        });

        // append the items to the list
        div = container.querySelector('.yad-list-container');
        for (i = 0; i < matrix.lists.length; i += 1) {
            div.appendChild(matrix.lists[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            numOfRows = 1,
            i,
            matrix,
            numItemsPerRow,
            lists = [],
            images,
            imageCount,
            loadedImageCount = 0,
            widgetTemplate = YAD.Renderer.SingleRowCarousel.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }
        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();
        if (this.animation_enabled) {
            numItemsPerRow = ads.isEmpty() ? this.animation_window_size : (this.animation_window_size - 1);
            numOfRows = Math.floor(content.getLength()/numItemsPerRow);
            numOfRows = (numOfRows > 0) ? numOfRows : 1;
            content = content.slice (0, numOfRows * numItemsPerRow); //discard the last row if not enough content
            lists = content.split(numOfRows);
            if (!(ads.isEmpty())) {
                for (i = 0; i < lists.length; i++) {
                    lists[i].add(ads.getItem(i) || ads.last()); //get last ads by default if numOfAds is not enough
                }
            }
        }
        else {
            lists[0] = content;
            lists[0].addAll(ads.getItems());
        }
        this.animation_enabled = (numOfRows > 1) ? true : false;

        matrix = new YAD.Matrix(lists);

        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.SingleRowCarousel.STYLE);

        if (this.animation_enabled) {
            YAD.Helper.addStyleTag(YAD.Renderer.SingleRowCarousel.ANIMATE_STYLE);
        }

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        // create the dom elements from the SingleRowCarousel
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'matrix': matrix.render(this, this.animation_enabled),
            'ad_only_class': widget.isAdsOnly() ? 'yad-ad-only' : '',
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'list_info': this.animation_enabled ? YAD.Renderer.SingleRowCarousel.LIST_INFO : '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        if (this.animation_enabled) {
            images = widgetContainer.querySelectorAll("img");
            imageCount = images.length;
            YAD.Helper.bindAll('load', images, function(e) {
                e.preventDefault();
                loadedImageCount++;
                if (loadedImageCount === imageCount) {
                    this.animateInit(widget);
                }
            }, this);
        }

        return widget;
    },

    animateInit: function (widget) {
        var groups = document.querySelectorAll(".yad-list"), //for ie8, css2 selector only
            outerHeight,
            autorotate = null,
            playpause = document.querySelector(".yad-list-control-button"),
            paused = false,
            rotationSpeed = this.animation_rotation_speed,
            maxHeight = 0,
            _this = this,
            nextButton = document.querySelector(".yad-next"),
            prevButton = document.querySelector(".yad-prev"),
            yadFrame = document.querySelector(".YAD"),
            transitionEndEventName = this.getTransitionEndEventName(),
            isEventListenerCompatible = YAD.Helper.getEventListenerCompatible(),
            i;

        YAD.Helper.addClass(groups[0], "yad-group-active"); //initial setting: 1st group to be active
        for (i = 0; i < groups.length; i++) {
            outerHeight = YAD.Helper.getOuterHeight(groups[i]);
            if (outerHeight > maxHeight) {
                maxHeight = outerHeight;
            }
            if (YAD.Helper.containClass(groups[i], "yad-group-active")) {
                YAD.Helper.addClass(groups[i], "visible");
            } else {
                YAD.Helper.addClass(groups[i], "hidden");
            }
        }
        document.querySelector(".yad-list-container").style.height = maxHeight + "px";

        // update counters
        document.querySelector(".yad-list-count-from").innerHTML = 1;
        document.querySelector(".yad-list-count-to").innerHTML = this.animation_window_size;
        document.querySelector(".yad-list-count-total").innerHTML = (groups.length) * (this.animation_window_size);

        //Auto animation or user control only
        if (this.animation_auto) {
            switchRotation(true);
        } else {
            YAD.Helper.addClass(playpause, "play");
            paused = true;
        }

        // Behaviors
        YAD.Helper.bind('click', playpause, function(e) {
            e.preventDefault();
            YAD.Helper.toggleClass(playpause, "play", !paused);
            switchRotation(paused);
            paused = !paused;
        }, this);

        YAD.Helper.bind('mouseover', yadFrame, function(e) {
            e.preventDefault();
            if (!paused) {
                switchRotation(false);
            }
        }, this);

        YAD.Helper.bind('mouseout', yadFrame, function(e) {
            e.preventDefault();
            if (!paused) {
                switchRotation(true);
            }
        }, this);

        YAD.Helper.bind('click', nextButton, function(e) {
            e.preventDefault();
            _this.changeGroup(true, groups, transitionEndEventName, isEventListenerCompatible, widget);
        }, this);

        YAD.Helper.bind('click', prevButton, function(e) {
            e.preventDefault();
            _this.changeGroup(false, groups, transitionEndEventName, isEventListenerCompatible, widget);
        }, this);

        function switchRotation(toStart) {
            window.clearInterval(autorotate);
            if (toStart) {
                autorotate = window.setInterval(function(){_this.changeGroup(true, groups, transitionEndEventName, isEventListenerCompatible, widget);}, rotationSpeed);
            }
        }
    },

    /* http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers */
    getTransitionEndEventName: function () {
        var i,
            el = document.createElement('div'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for (i in transitions) {
            if ( transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    },

    changeGroup: function (forward, groups, transitionEndEventName, isEventListenerCompatible, widget) {
        var currentActiveGroup = document.querySelector(".yad-group-active"),
            activeID,
            nextID,
            nextActiveGroup = null,
            i,
            itemsPerGroup = this.animation_window_size,
            nextButton = document.querySelector(".yad-next"),
            prevButton = document.querySelector(".yad-prev"),
            listFrom = document.querySelector(".yad-list-count-from"),
            listTo = document.querySelector(".yad-list-count-to"),
            listTotal = document.querySelector(".yad-list-count-total"),
            newTo,
            activeCalled = false;

        activeID = parseInt(currentActiveGroup.getAttribute("data-group"), 10);
        if (forward) {
            nextID = (activeID + 1) % groups.length;
        } else {
            nextID = (activeID + groups.length - 1) % groups.length;
        }
        for (i = 0; i < groups.length; i++) {
            if (parseInt(groups[i].getAttribute("data-group"), 10) === nextID) {
                nextActiveGroup = groups[i];
            }
        }

        if (transitionEndEventName === undefined || !isEventListenerCompatible) {  //For browser does not support css3 transition or EventListener
            YAD.Helper.replaceClass(currentActiveGroup, "visible", "hidden");
            YAD.Helper.replaceClass(nextActiveGroup, "hidden", "visible");
            YAD.Helper.removeClass(currentActiveGroup, "yad-group-active");
            YAD.Helper.addClass(nextActiveGroup, "yad-group-active");
            widget.onScrollRotationBeacon(); //Call widget method to decide what beacons to send
        } else {                                           // For modern browsers
            nextButton.setAttribute("disabled", "true");
            prevButton.setAttribute("disabled", "true");
            YAD.Helper.addClass(currentActiveGroup, "fadeOut");
            YAD.Helper.addClass(nextActiveGroup, "fadeIn");
            YAD.Helper.replaceClass(nextActiveGroup, "hidden", "visible");
            YAD.Helper.removeClass(currentActiveGroup, "yad-group-active");
            YAD.Helper.addClass(nextActiveGroup, "yad-group-active");
            var transitionEndActionList = function () {
                currentActiveGroup.removeEventListener(transitionEndEventName, transitionEndActionList, false);
                YAD.Helper.removeClass(currentActiveGroup, "fadeOut");
                YAD.Helper.removeClass(nextActiveGroup, "fadeIn");
                YAD.Helper.replaceClass(currentActiveGroup, "visible", "hidden");
                nextButton.removeAttribute("disabled");
                prevButton.removeAttribute("disabled");
                widget.onScrollRotationBeacon(); //Call widget method to decide what beacons to send
                activeCalled = true;
            };
            currentActiveGroup.addEventListener(transitionEndEventName, transitionEndActionList, false);
            var activeCallback = function () {
                if (!activeCalled) { // CSS transitionEnd events aren't always called (e.g. if browser window/tab is out of focus, paint stops.)
                    YAD.Helper.dispatchEvent(currentActiveGroup, transitionEndEventName);
                }
            };
            setTimeout(activeCallback, 400 + 50);
        }

        // update counters
        newTo = (nextID + 1) * itemsPerGroup;
        listFrom.innerHTML = newTo + 1 - itemsPerGroup;
        listTo.innerHTML = newTo;
        listTotal.innerHTML = (groups.length) * itemsPerGroup;
    },

    getElementId: function () {
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two rows carousel, with images
YAD.Renderer.DualRowCarousel = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];
    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
YAD.Renderer.DualRowCarousel.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-title-container'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "<span class='yad-title C Fs Ff Fw Fz Td Bgc'>{{TITLE}}</span>" +
        "</a>" +
        "{{ADCHOICES}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.DualRowCarousel.LIST = "<ol class='yad-list {{ITEM_COUNT}}'></ol>";

// the wrapper for the widget
YAD.Renderer.DualRowCarousel.WIDGET = "<div class='yad-widget Bgc yad-dual-row-carousel {{AD_ONLY_CLASS}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "{{TOP_ROW}}{{BOTTOM_ROW}}" + YAD.Renderer.FOOTER;


// // styles for the widget
YAD.Renderer.DualRowCarousel.STYLE = ".yad-dual-row-carousel li{display:inline-block;padding:0;margin:0;border:none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}" +
    ".yad-dual-row-carousel.dark li{border:none;}" +
    ".yad-dual-row-carousel li > a:first-child{text-align:center;display:block;overflow:hidden;height:auto;margin-bottom:5px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:top;position:relative}" +
    ".yad-dual-row-carousel li.yad-sponsored.small-image > a:first-child{background-size:inherit}" +
    ".yad-dual-row-carousel img{max-width:100%;display:inline-block;vertical-align:top}" +
    ".yad-dual-row-carousel .yad-sponsored .yad-title-container{padding:0 6px 5px 5px}" +
    ".yad-dual-row-carousel .yad-sponsored{padding:0;border:none;z-index:0}" +
    ".yad-dual-row-carousel.dark .yad-sponsored{border:none;}" +
    ".yad-dual-row-carousel .yad-list{margin-top:10px;table-layout:fixed;display:table;width:100%;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}" +
    ".yad-dual-row-carousel .yad-list+.yad-list{margin-top:20px}" +
    ".yad-dual-row-carousel .yad-footer-default{margin-top:10px;border-top:1px solid #e2e2e6}" +
    ".yad-dual-row-carousel.dark .yad-footer-default{border-top:1px solid #525256}" +

    ".yad-dual-row-carousel ol.yad-item-1 li{width:100%}" +
    ".yad-dual-row-carousel ol.yad-item-2 li{width:47%;margin-left:6%}" +
    ".yad-dual-row-carousel ol.yad-item-3 li{width:31%;margin-left:3.5%}" +
    ".yad-dual-row-carousel ol.yad-item-4 li{width:22.75%;margin-left:3%}" +
    ".yad-dual-row-carousel ol.yad-item-5 li{width:18.2%;margin-left:2.25%}" +
    ".yad-dual-row-carousel ol.yad-item-6 li{width:15%;margin-left:2%}" +
    ".yad-dual-row-carousel ol.yad-list li.yad-first-item{margin:0}" +

    // mobile/small carousel
    "@media all and (max-width: 450px){" +
        ".yad-dual-row-carousel ol.yad-list li,.yad-dual-row-carousel ol.yad-list li.yad-first-item{width:48%;border-bottom:none;padding: 0;margin:15px 2% 0 0}" +
        ".yad-dual-row-carousel.dark ol.yad-list li,.yad-dual-row-carousel.dark ol.yad-list li.yad-first-item{border-bottom:none;}" +
        ".yad-dual-row-carousel ol.yad-list li:nth-child(even){margin-right:0;margin-left:2%}" +
    "}";

YAD.Renderer.DualRowCarousel.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualRowCarousel.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualRowCarousel.LIST, {
            'item_count': (list.items && list.items.length)? 'yad-item-' +  list.items.length:''
        });

        // append the items to the list
        ol = container.querySelector('.yad-list');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            ads,
            numOfAds,
            rows = [],
            topRow = '',
            bottomRow = '',
            widgetTemplate = YAD.Renderer.DualRowCarousel.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        content = widget.getRecirculationContent().clone();
        ads = widget.getAds().clone();
        numOfAds = ads.getLength();

        // split the content into two columns
        rows = content.split(2);

        // if we have 1 or more columns, render the first column
        if (rows.length >= 1) {
            if (numOfAds > 1) {
                rows[0].addAll(ads.slice(0, Math.floor(numOfAds/2)).getItems());
            }
            topRow = rows[0].render(this);
        }

        // if we have 2 rows, render the second one
        if (rows.length >= 2) {
            if (numOfAds >= 1) {
                rows[1].addAll(ads.slice(Math.floor(numOfAds/2), numOfAds).getItems());
            }
            bottomRow = rows[1].render(this);
        }


        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualRowCarousel.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        // create the dom elements from the DualRowCarousel
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'top_row': topRow,
            'bottom_row': bottomRow,
            'ad_only_class': widget.isAdsOnly() ? 'yad-ad-only' : '',
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

YAD.Renderer = YAD.Renderer || {};

// two rows carousel, with images
YAD.Renderer.DualRowCarouselWeb = function (config) {
    this.id = 'yad-widget-' + config.id;
    this.itemCount = 0;
    this.lang = config['lang'];
    this.config = YAD.Helper.merge({
        'truncate': {
            'title' :{
                'max_lines': false,
                'count': 90
            }
        }
    }, config);
};

// each item in the list
YAD.Renderer.DualRowCarouselWeb.ITEM = "<li class='yad-item C Fs Ff Fw Fz Td Bgc {{CLASS}}'>" +
    "<a style='{{LINK_STYLE}}' href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:img;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>{{BLANK_IMAGE}}<div class='yad-item-shadow'></div></a>" +
    "<div class='yad-title-container'>" +
        "<a href='{{URL}}' title='{{FULL_TITLE}}' target='{{TARGET}}' data-ylk='g:{{ID}};elm:hdln;elmt:ct;ad:{{IS_AD}}{{AID}};cpos:{{I}};ct:1;r:{{R}};tar:{{TAR}};tar_uri:{{TAR_URI}}'>" +
            "<span class='yad-title C Fs Ff Fw Fz Td Bgc'>{{TITLE}}</span>" +
        "</a>" +
        "{{ADCHOICES}}" +
        "{{PROVIDER}}" +
    "</div>" +
"</li>";

// the wrapper for each list
YAD.Renderer.DualRowCarouselWeb.LIST = "<ol class='yad-list {{ITEM_COUNT}}'></ol>";

// the wrapper for the widget
YAD.Renderer.DualRowCarouselWeb.WIDGET = "<div class='yad-widget Bgc yad-dual-row-carousel-web {{AD_ONLY_CLASS}} {{THEME_TYPE_CLASS}}' id='{{ID}}'>" + YAD.Renderer.HEADER + "<div class='yad-body'><div class='yad-first-row'>{{TOP_TITLE}}{{TOP_ROW}}</div><div class='yad-second-row'>{{BOTTOM_TITLE}}{{BOTTOM_ROW}}</div></div>" + YAD.Renderer.FOOTER;


// // styles for the widget
YAD.Renderer.DualRowCarouselWeb.STYLE = ".yad-dual-row-carousel-web li{display:inline-block;padding:0;margin:0;border:none;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:top}" +
    ".yad-dual-row-carousel-web.dark li{border:none;}" +
    ".yad-dual-row-carousel-web li > a:first-child{text-align:center;display:block;overflow:hidden;height:auto;margin-bottom:5px;background-repeat:no-repeat;background-size:cover;background-position:50%;vertical-align:top;position:relative}" +
    ".yad-dual-row-carousel-web li.yad-sponsored.small-image > a:first-child{background-size:inherit}" +
    ".yad-dual-row-carousel-web img{max-width:100%;display:inline-block;vertical-align:top}" +
    ".yad-dual-row-carousel-web .yad-sponsored .yad-title-container{padding:0 6px 5px 5px}" +
    ".yad-dual-row-carousel-web .yad-sponsored{padding:0;border:none;z-index:0}" +
    ".yad-dual-row-carousel-web.dark .yad-sponsored{border:none;}" +
    ".yad-dual-row-carousel-web .yad-list{margin-top:7px;table-layout:fixed;display:table;width:100%;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}" +
    ".yad-dual-row-carousel-web .yad-footer-default{margin-top:10px;border-top:1px solid #e2e2e6}" +
    ".yad-dual-row-carousel-web.dark .yad-footer-default{border-top:1px solid #525256}" +
    ".yad-dual-row-carousel-web .yad-second-row h3{margin-top:15px}" +

    ".yad-dual-row-carousel-web ol.yad-item-1 li{width:100%}" +
    ".yad-dual-row-carousel-web ol.yad-item-2 li{width:47%;margin-left:6%}" +
    ".yad-dual-row-carousel-web ol.yad-item-3 li{width:31%;margin-left:3.5%}" +
    ".yad-dual-row-carousel-web ol.yad-item-4 li{width:22.75%;margin-left:3%}" +
    ".yad-dual-row-carousel-web ol.yad-item-5 li{width:18.2%;margin-left:2.25%}" +
    ".yad-dual-row-carousel-web ol.yad-item-6 li{width:15%;margin-left:2%}" +
    ".yad-dual-row-carousel-web ol.yad-list li.yad-first-item{margin:0}" +

    // mobile/small carousel
    "@media all and (max-width: 450px){" +
        ".yad-dual-row-carousel-web ol.yad-list li,.yad-dual-row-carousel-web ol.yad-list li.yad-first-item{width:48%;border-bottom:none;padding: 0;margin:15px 2% 0 0}" +
        ".yad-dual-row-carousel-web.dark ol.yad-list li,.yad-dual-row-carousel-web.dark ol.yad-list li.yad-first-item{border-bottom:none;}" +
        ".yad-dual-row-carousel-web ol.yad-list li:nth-child(even){margin-right:0;margin-left:2%}" +
    "}";

YAD.Renderer.DualRowCarouselWeb.prototype = {
    // we don't want to do anything fancy with the brew query
    queryOptions: {
    },

    /**
     * Render the item
     */
    item: function (item, index) {
        var parsedUrl = YAD.Helper.urlParser(item.url);

        // object keys must be strings here to prevent closure compiler flattening them
        item.template = YAD.Helper.template(YAD.Renderer.DualRowCarouselWeb.ITEM, {
            'id': item.id,
            'title': YAD.Helper.truncateString(item.title, this.config['truncate']['title']['count']),
            'full_title': YAD.Helper.htmlEntities(item.title),
            'url': item.url,
            'target': item.target,
            'blank_image': YAD.Renderer['BLANK_' + item.image_smart_crop_type],
            'tar': parsedUrl.host,
            'tar_uri': parsedUrl.path,
            'link_style': (item.image && item.image.url)? 'background-image:url('+item.image.url+')' :'',
            'provider': item.isAroundTheWeb() ? item.providerTag() : '',
            'adchoices': item.isSponsored() ? YAD.Helper.template(YAD.Renderer.ADCHOICES, {'sponsor_tag': item.providerTag(), 'i': this.itemCount + 1, 'sponsored': YAD.Helper.getLocalizedString('SPONSORED', this.lang), 'why_this_ads': YAD.Helper.getLocalizedLink('WHY_THIS_ADS', this.lang)}) : '',
            'class': item.getClass(index),
            'is_ad': +(item.isSponsored()),
            'aid': item.isSponsored() ? ';aid:' + item.id : '',
            'r': item.getReason(),
            'i': this.itemCount + 1
        });

        this.itemCount++;

        item.bind();

        return item.template;
    },

    /**
     * Render the list
     */
    list: function (list) {
        var i = 0,
            container = null,
            ol = null;

        // dont render anything if the list is empty
        if (list.isEmpty()) {
            return '';
        }

        // create the element from the template
        container = YAD.Helper.template(YAD.Renderer.DualRowCarouselWeb.LIST, {
            'item_count': (list.items && list.items.length)? 'yad-item-' +  list.items.length:''
        });

        // append the items to the list
        ol = container.querySelector('.yad-list');
        for (i = 0; i < list.items.length; i += 1) {
            ol.appendChild(list.items[i].render(this, i));
        }

        return container;
    },

    /**
     * Render the widget
     */
    widget: function (widget) {
        var container,
            widgetContainer,
            content,
            webContent,
            ads,
            numOfAds,
            rows = [],
            topRow = '',
            bottomRow = '',
            topTitle = '',
            bottomTitle = '',
            widgetTemplate = YAD.Renderer.DualRowCarouselWeb.WIDGET;

        // if there's nothing in the widget, dont render any of the containers or other fluff
        if (widget.isEmpty()) {
            widget.hide();
            return '';
        }

        // split the content into two columns
        content = widget.getRecirculationContent().clone();
        webContent = widget.getAroundTheWebContent().clone();
        ads = widget.getAds().clone();
        numOfAds = ads.getLength();
        rows = [content, webContent];
        topTitle = '<h3>On ' + (widget.getPublisherName() || 'this site') + '</h3>';
        bottomTitle = '<h3>Around the web</h3>';

        // if we have 1 or more columns, render the first column
        if (rows.length >= 1) {
            if (numOfAds > 1) {
                rows[0].addAll(ads.slice(0, Math.floor(numOfAds/2)).getItems());
            }
            topRow = rows[0].render(this);
        }

        // if we have 2 rows, render the second one
        if (rows.length >= 2) {
            if (numOfAds >= 1) {
                rows[1].addAll(ads.slice(Math.floor(numOfAds/2), numOfAds).getItems());
            }
            if ( rows[1].getLength() > 0) {
                bottomRow = rows[1].render(this);
            }
        }


        // render the CSS inside a style tag
        YAD.Helper.addStyleTag(YAD.Renderer.COMMON_STYLE);
        YAD.Helper.addStyleTag(YAD.Renderer.DualRowCarouselWeb.STYLE);

        // add dynamic CSS from brewer
        YAD.Helper.addDynamicCSS(widget);

        // create the dom elements from the DualRowCarousel
        container = YAD.Helper.template(widgetTemplate, {
            'id': this.getElementId(),
            'module_title': widget.getModuleTitle() || YAD.Widget.DEFAULT_TITLE,
            'top_row': topRow,
            'bottom_row': bottomRow,
            'ad_only_class': widget.isAdsOnly() ? 'yad-ad-only' : '',
            'first_name': widget.getUserFirstName() || YAD.Helper.getLocalizedString('YOU', this.lang),
            'publisher_name': widget.getPublisherName() || YAD.Helper.getLocalizedString('THIS_SITE', this.lang),
            'top_title': topTitle,
            'bottom_title': bottomTitle,
            'theme_type_class': widget.getThemeType() || '',
            'power_by': YAD.Helper.getLocalizedString('POWER_BY', this.lang),
            'for': YAD.Helper.getLocalizedString('FOR', this.lang),
            'learn_more': YAD.Helper.getLocalizedString('LEARN_MORE', this.lang)
        });

        widgetContainer = container.querySelector('.yad-widget');

        // maybe move these to yad() function?
        widget.getElement().appendChild(widgetContainer);

        widget.bind(widgetContainer);

        // If necessary, clamping/truncating the title by width from Browser
        YAD.Helper.clampTitle(widget.getElement(), '.yad-title', this.config['truncate']['title']['max_lines']);

        return widget;
    },

    getElementId: function () {
        // todo make this more robust - don't use random numbers
        return this.id;
    }
};

/**
 * This is an object that contains a bunch of library functions
 * @type {Object}
 */
YAD.Helper = YAD.Helper || {};

YAD.Helper.Ajax = {
    JSONPCallbacks: {},
    timeouts: {},
    AJAX_TIMEOUT: 1000,

    /**
     * Just a helper which will allow us to switch between jsonp and xhr easily
     */
    ajax: function (url, data, callback, error, scope) {
        return YAD.Helper.Ajax.jsonp(url, data, callback, error, scope);
    },

    /**
     * Performs an XMLHttpRequest
     * currently only supports GET
     *
     * @param  {String}   url      the string of the API to call
     * @param  {Object}   data     key/value of data to stick in the header/get params
     * @param  {Function} callback the function to call on success
     * @param  {Function} error    the function to call when there's an error
     * @param  {Object}   scope    the scope in which to call the success/error callbacks
     */
    xhr: function (url, data, callback, error, scope) {
        var xhr = new XMLHttpRequest();

        function ensureReadiness() {
            if (xhr.readyState < 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            // all is well
            if (xhr.readyState === 4) {
                callback.call(scope, xhr);
            }
        }

        xhr.onreadystatechange = ensureReadiness;

        xhr.open('GET', url, true);
        try {
            xhr.send('');
        } catch (e) {
            if (typeof error === 'function') {
                error(e);
            }
        }
    },

    /**
     * Performs an jsonp GET
     *
     * @param  {String}   url      the string of the API to call
     * @param  {Object}   data     key/value of data to stick in the header/get params
     * @param  {Function} callback the function to call on success
     * @param  {Function} error    the function to call when there's an error. Note: this gets fired if the API times out. It'll also fire if hasError: true is in the response object (needs to be supported by the API you're connecting to).
     * @param  {Object}   scope    the scope in which to call the success/error callbacks
     */
    jsonp: function (url, data, callback, error, scope) {
        var callbackFunctionID = (new Date()).getTime(),
            publisherUrlParams,
            validPublisherUrlParams = {},
            key;

        //publisher tracking url params should follow a seperate way of encoding
        if (data && data['publisher_url_params']) {
            publisherUrlParams = data['publisher_url_params'];
            delete data['publisher_url_params'];
        }
        // url encode the data and append it to the request
        if (data) {
            url += (-1 < url.indexOf("?") ? "&" : "?") + YAD.Helper.Ajax.urlencode(data);
        }
        //Add publisher_url_params to encode url
        if (publisherUrlParams){
            for (key in publisherUrlParams) {
                if (publisherUrlParams.hasOwnProperty(key)) {
                    if (typeof publisherUrlParams[key] === 'string' || typeof publisherUrlParams[key] === 'number' || typeof publisherUrlParams[key] === 'boolean') {
                        validPublisherUrlParams[key] = publisherUrlParams[key];
                    } else if (typeof publisherUrlParams[key] === 'undefined' || publisherUrlParams[key] === null) {
                        validPublisherUrlParams[key] = null;
                    }
                }
            }
            url += (-1 < url.indexOf("?") ? "&" : "?") + "publisher_url_params=" + encodeURIComponent(JSON.stringify(validPublisherUrlParams));
        }
        // pass the function the API needs to wrap the data in so we can tie it back to a callback when it returns
        url = url + (-1 < url.indexOf("?") ? "&" : "?") + "callback=" +
                ("YADJSONPCallbacks.receiveCallback_" + callbackFunctionID);

        // create the function that is called when the jsonp file is loaded
        YAD.Helper.Ajax.JSONPCallbacks["receiveCallback_" + callbackFunctionID] = function (response) {
            // clear the timeout handler
            window['clearTimeout'](YAD.Helper.Ajax.timeouts[callbackFunctionID]);

            if (response && response.error && error) {
                error.call(scope, response);
            } else if (response && response.error) {
                console.error('JSONP called returned an error, but there was no handler provided.');
            } else if (callback) {
                // call the callback in the correct scope
                callback.call(scope, response);
            }

            // save some memory as we won't be needing this again
            delete YAD.Helper.Ajax.JSONPCallbacks["receiveCallback_" + callbackFunctionID];
        };

        // timeout handler
        var timeout = setTimeout(function () {
            YAD.Helper.Ajax.JSONPCallbacks["receiveCallback_" + callbackFunctionID] = function () {
                delete YAD.Helper.Ajax.JSONPCallbacks["receiveCallback_" + callbackFunctionID];
            };

            if (error) {
                error.call(scope, {
                    error: true,
                    isTimeout: true
                });
            }
        }, YAD.Helper.Ajax.AJAX_TIMEOUT);

        YAD.Helper.Ajax.timeouts[callbackFunctionID] = timeout;

        // add the jsonp script to the head
        YAD.Helper.Ajax.addScript(url);
    },

    /**
     * Returns a new DOM element
     *
     * (in it's own function so we can stub it in the tests)
     * @param  {string} tag the name of the tag to create
     * @return {DOMElement}     the new element
     */
    createElement: function (tag) {
        return document.createElement(tag);
    },

    /**
     * Adds a <script> tag to the head.
     * Used for jsonp but also to import the analytics library (may change)
     *
     * @warning I don't trust the callback will fire.
     *
     * @param {String}   url      the url to the script
     * @param {Function} callback called whe the script loads
     * @param {Object}   scope    the scope in which to call the callback
     */
    addScript: function (url, callback, scope) {
        var script = YAD.Helper.Ajax.createElement("script"),
            head = document.getElementsByTagName("head")[0],
            done = false;

        script.type = "text/javascript";
        script.src = url;

        // I don't trust this, I seem to remember it not working on some edge cases
        // seems to work at the moment though. If you're having trouble
        // with callbacks not firing, I'd check here first
        if (callback) {
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState ||
                        this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;

                    callback.call(scope);
                }
            };
        }
        head.insertBefore(script, head.firstChild);
    },

    /**
     * Turns a JSON object into URL encoded parameters
     * @param  {Object} params key/value of params
     * @return {String}        a querystringified params
     */
    urlencode: function (params, _prefix) {
        var output = [],
            i,
            key,
            value;

        for (i in params) {
            if (params.hasOwnProperty(i)) {
                if (_prefix && params instanceof Array) {
                    key = _prefix + '[]';
                } else if (_prefix) {
                    key = _prefix + '[' + i + ']';
                } else {
                    key = i;
                }

                value = params[i];

                switch (typeof value) {
                case 'object':
                    if (!(value instanceof Array) || value.length > 0){
                        output.push(YAD.Helper.Ajax.urlencode(value, key));
                    }
                    break;
                default:
                    output.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
                }
            }
        }

        return output.join("&");
    },

    /**
     * Generate a unique request id for this pageload
     * @return {String} a unique id
     */
    generateRequestID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
};

// Make the jsonp callbacks globally accessible
// this is mainly for closure compiler
window['YADJSONPCallbacks'] = window['YADJSONPCallbacks'] || YAD.Helper.Ajax.JSONPCallbacks;

// path to the brew request
YAD.Widget.API_PATH = 'https://syndication.streamads.yahoo.com/na_stream_brewer/brew/v2';
YAD.Widget.LOG_PATH = '//syndication.streamads.yahoo.com/na_stream_brewer/error/v1';

YAD.DOMAIN = 'https://s.yimg.com';
YAD.Analytics.Rapid.WORKER_PATH = YAD.DOMAIN + '/uq/syndication/yad-analytics-rapid-worker.js';
YAD.Helper.Ajax.AJAX_TIMEOUT = 10000;
// This is not the snippet itself, rather, it's what the snippet calls.
// It's the only externally visible function

// The snippet loads, creates a phantom yad function that adds a list of calls to window['yad']['q']
// we then loop through that array and do the calls to the now-populated window['yad'] function

if (typeof window['yad'] === 'undefined' || !window['yad']['initialized']) {
  var item,
      widgets = [],
      canvasWidgets = {},
      pidUrlPairs =  {},
      asyncQueue = ((typeof window['yad'] !== 'undefined' && typeof window['yad']['q'] !== 'undefined') ? window['yad']['q'] : []);

  window['yad'] = function (publisherId, config, snippetLoadedAt) {
      config = config || {};

      var pageviewID,
          w = null,
          context = "Widget", // context captures if we are in a bootstrap/iframe mode or widget/DOM mode, modified during build with the DOM mode entry point is defined
          urlKey = window['location'] && (window['location']['pathname'] + window['location']['search']),
          hasConsole = config['debug'] && window['console'] && window['console']['error'];

      if (urlKey) {
          if (!pidUrlPairs[urlKey]){
              pidUrlPairs[urlKey] = YAD.Helper.Ajax.generateRequestID();
          }
          pageviewID = pidUrlPairs[urlKey];
      } else {
          pageviewID = YAD.Helper.Ajax.generateRequestID();
      }

      try {
          if ('undefined' === typeof canvasWidgets[publisherId]) {
            canvasWidgets[publisherId] = 0;
          }

          // The order of getting root DOM Element
          // 1. from config.element
          // 2. from DOM with class contains YAD-{CANVAS_ID}
          // 3. from DOM with class contains YAD
          if (!config['element']) {
              config['element'] = document.querySelectorAll('.YAD-' + publisherId)[canvasWidgets[publisherId]];
          }

          if (!config['element']) {
              config['element'] = document.querySelectorAll('.YAD')[widgets.length];
          }

          if (!config['element']) {
              throw new YAD.Error('Element with index #' + widgets.length + ' not found');
          }

          config.id = window['yad']['i'];
          config['pageviewID'] = pageviewID;
          config['inframe'] = YAD.Helper.isInIframe();

          w = new YAD.Widget(publisherId, config, snippetLoadedAt);
          widgets.push(w);
          canvasWidgets[publisherId] = canvasWidgets[publisherId] + 1;
          window['yad']['i']++;

          // fetch content immediately if we are injected on the host page
          if (! config['iframe'] && context === "Widget") {
             w.fetch();
          }


      } catch (e) {
          // there was an error, hide the module
          if (w) {
              w.hide();
          }

          try {
              YAD.Helper.Ajax.ajax(YAD.Widget.LOG_PATH, {
                  'exception' : e.message,
                  'type': 'Widget',
                  'cid': publisherId,
                  'pvid': pageviewID,
                  'url': (window['location'] && window['location']['href'])
              });
          } catch (e2) {
              if (hasConsole) {
                  window['console']['error']('YAD: Unable to send following message to log due to '+e2.message);
              }
          }

          if (!hasConsole) {
              return;
          }

          if (e instanceof YAD.Error) {
              window['console']['error']('YAD: ' + e.message);
          } else {
              throw e;
          }
      }
  };

  window['yad']['initialized'] = true;
  window['yad']['i'] = 1;
  window['yad']['widgets'] = widgets;

  while(asyncQueue && (item = asyncQueue.shift())) {
      if (typeof item[0] === 'string') {
          // DEPRECATED this is here for old snippets that don't include a timestamp for measuring tts
          window['yad'](item[0], item[1]);
      } else if (item[0] instanceof Array || item[0] instanceof Object) {
          window['yad'](item[0][0], item[0][1], item[1]);
      }
  }
}

YAD.VERSION="26bb287";})();