//tealium universal tag - utag.1008 ut4.0.201411050607, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _tealiumDM=[];function DM_prepClient(csid,client){for(var i=0;i<_tealiumDM.length;i++){client[_tealiumDM[i]["func"]].apply(this,_tealiumDM[i]["args"]);}
window._tealiumDM=[];}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.csid="F09828";u.bpid="cbsinteractive";u.base_url="//js.revsci.net/gateway/gw.js?";u.map={};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=="csid"){u.csid=b[d];}else if(e[f]=="bpid"){u.bpid=b[d];}else if(e[f]=="DM_onSegsAvailable"){window["DM_onSegsAvailable"]=window[b[d]];}else if(e[f].indexOf("addEncToLoc|")>-1){_tealiumDM.push({func:e[f].split('|')[0],args:[e[f].split('|')[1],b[d]]});}else{_tealiumDM.push({func:e[f],args:[b[d]]});}}}}
if(u.csid)c.push("csid="+u.csid);if(u.bpid)c.push("bpid="+u.bpid);c.push("auto=t");var id='tealium-tag-1067';if(document.getElementById(id)){window[rsi_csid].DM_tag();}else{u.head=document.getElementsByTagName("head")[0];u.scr=document.createElement("script");u.scr.id=id;u.scr.type="text/javascript";u.scr.src=u.base_url+c.join(u.qsp_delim);u.head.appendChild(u.scr);}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('1008','cbsi.zdnetglobalsite');}catch(e){}