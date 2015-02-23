var adsLo;
try {adsLo=top.location.href}
catch (e){}
if (!adsLo||adsLo==null){
try {adsLo=window.location.href}
catch (e){}
}
adsLo=adsLo||""
var adsUAC=adsLo.search(/atwUAC=/i),adsDebug=adsLo.search(/adcallqa/i),adsUACH,adsIntMN='',adsGUID=1,adsSecure=(location.protocol=='https:')?1:0;
function adsDisableGUID(){adsGUID=0}
function adsGUIDFn(e){
if (e.origin==='http://cdn.at.atwola.com'){
 var x=e.data.split('=');
 if (x.length==2&&x[0]=='guid')localStorage.setItem('adsGUID', x[1]);
}
}
if (window.addEventListener)window.addEventListener("message",adsGUIDFn,false);
function adSet101x1(v){
if (v)adsIntMN=v;
}
function adSetMOAT(v,r){
if (v&&v!='0'){
window.moatConfig=r||{};
var d=document,s=d.createElement("script"),h=d.getElementsByTagName("head")[0],sr;
if (String(window.moatConfig.moatHosted)==='true'){
 if (adsSecure)sr='https://z'
 else sr='http://s'
 sr+='.moatads.com/aolalways5fd2/moatuac.js';
}
else{
 if (adsSecure)sr='https://s'
 else sr='http://o'
 sr+='.aolcdn.com/os/moat/prod/moatuac.js';
}
s.src=sr;
h.appendChild(s); 
} 
}
var adsLoadSync=0,adsSyncTime='',adsSyncDelay=0,adsMSP=1,adsMobDyn=1,adsAddOnMQ='';
function adsDisableMSP(){adsMSP=0}
function adsDisableMobDyn(){adsMobDyn=0}
function adSetAddOnPl(v){
if (v)adsAddOnMQ=v;
}
function adSetSyncDelay(v){
 if (v)adsSyncDelay=parseInt(v)
 else adsSyncDelay=200;
} 
function adsLoadedSync(){
 var z=adsDivs.length,v;
 for (var i=0;i<z;i++){
  v=adsGetObj(adsDivs[i]);
  if (v.textAd!=1&&v.iframe!=1&&v.delayed)v.LoadAd();
 }
 adsLoadSync=1;
}
function adsLoadUAC(){
var u,x;
if (adsDebug>0){
 u='adsWrapperInfo.js';
 adsUACH='http://browsertest.web.aol.com/ads/';
}
else {
 x=adsLo.substring(adsUAC+7,adsLo.length).replace(/&.*$/,'').split(/\||;/);
 if (x[1]&&x[1]=='c')adsUACH='http://cdn.atwola.com/_media/uac/'
 else if (x[1]&&x[1]=='s')adsUACH='https://s.aolcdn.com/ads/'
 else adsUACH='http://browsertest.web.aol.com/ads/';
 u=x[0];
}
if(/^[0-9A-Za-z\/.]+$/.test(unescape(u)))document.write('<script type="text/javascript" src="'+adsUACH+u+'"></scr','ipt>')
}
if ((adsUAC>0||adsDebug>0)&&!window.adsUACH)adsLoadUAC()
else{
if (window.adsIn!=1){
adsIn=1
var adsHt="",adsNt='5113.1',adsPl='221794',adsESN='',adsATWM='',adsTp='J',
adsATOth='',adsATMob='',adsSrAT='',adsTacOK=1,adsD=new Date(),aolAdFdBkStr='',adsAddOn=1,adsAJAXAddOn=0,adsMob=0,adsCo='us',
adsVal='',adsCp=0,adsMNS,adsTPS,adsExcV='',adsLNm=0,adsKV,adsIP,adsNt2,adsPing,
adsUA=navigator.userAgent.toLowerCase(),adsIE,adsAJAX=0,adsTzAT="aduho="+(-1*adsD.getTimezoneOffset())+";",
adsNMSG='',adsTile=1,adsPage='',adsDivs=[],adsQuigo=0,adsCA,adsCF=[],adsCW=[],adsCH=[],adsCAd=[],adsChn='',
adsScr=(window.s_265&&window.s_265.prop55)?window.s_265.prop55:adsD.getTime()%0x3b9aca00,adsRRDevil='',adsRRCalled='',
adsDev=(typeof window.onorientationchange!='undefined')?'1':'2',atwAd1Time='',atwLoaded=0,atwReset=0;
if ((adsUA.indexOf('mobile')>-1)||(/android|iphone|ipad|playbook|hp-tablet|kindle|silk|webos|blackberry|opera mini/i).test(navigator.appVersion))adsDev='1';
if (!adsDev)adsDev='2';
if (!window.ATW3_AdObj){
try {
if (parent.window.ATW3_AdObj){
var ATW3_AdObj=parent.window.ATW3_AdObj;
adsScr=ATW3_AdObj.scr;
}else{
var ATW3_AdObj=new Object();
ATW3_AdObj.scr=adsScr;
ATW3_AdObj.tile=0;
parent.window.ATW3_AdObj=ATW3_AdObj; 
}}
catch (e){
var ATW3_AdObj=new Object();
ATW3_AdObj.scr=adsScr;
ATW3_AdObj.tile=0;
}}
else{
adsScr=ATW3_AdObj.scr;
}
function adsTacFn(){
atwLoaded=1;
if (!adsSecure){
var t1='http://cdn.atwola.com/_media/uac/tcodewads_at.html',t2='http://cdn.at.atwola.com/_media/uac/tcode3.html';
var n=2,d=document,r=d.referrer,q=0,i,i1='',j,p='';
if (adsGUID){
i=d.createElement('iframe');
i.style.display="none";
i.id="localStorage";
i.style.width='0px';
i.style.height='0px';
i.src='http://cdn.at.atwola.com/_media/uac/guid.html';
d.body.appendChild(i);
}
if (adsTacOK==2)n=1
if (adsTacOK){
try {
if (top.location.href!=location.href){
if (parent.window.adsIn==1)q=1}}
catch (e){}
if (q!=1){
for (j=0;j<n;j++){
i=d.createElement('iframe')
i.style.display="none"
i.id="adTacFr"+j
i.style.width='0px'
i.style.height='0px'
if (j==0&&(adsESN||adsUA.indexOf("aol")!=-1)){
i1=t1
if (adsESN)i1+="#"+adsESN
}
if (j==1){
var x=''
if (window.tacProp){
for (var t in tacProp){x+="&"+t+"="+tacProp[t]}
}
p+=x
if ((typeof(r)!='undefined')&&(r!='')){
 if (r.indexOf('mapquest')!=-1)r=r.replace(/[?#].*$/,'')
 p+="&tacref="+r;
}
i1=(p)?t2+"#"+p:t2
}
if (i1){
i.src=i1
d.body.appendChild(i)
}}}}}
}
function adsDisableTacoda(v){
if (v&&v.indexOf('aolws')!=-1)adsTacOK=2
else adsTacOK=0
}
function adUACInit(){
if (!adsSecure){
var w=window;
if (w.addEventListener)w.addEventListener("load",adsTacFn,false)
else if (w.attachEvent)w.attachEvent("onload",adsTacFn)
}
if (/(^|;)?RSP_COOKIE=.*?&name=(.*?)(&|;|$)/i.test(document.cookie))adsESN='&ESN='+unescape(RegExp.$2);
var at=adsLo.search(/atwcrpr=/i);
adsIE=(navigator.appName=="Microsoft Internet Explorer");
if (adsLo.search(/atwdistcode/i)>0)adsDisableTacoda()
if (at>0){
adsCA=adsLo.substr(at+8).split(/\||;/);
adsCp=1;
var z=adsCA.length;
for (var i=0,k=0;i<z;i=i+4,k++){adsCF[k]=adsCA[i];adsCW[k]=adsCA[i+1];adsCH[k]=adsCA[i+2];adsCAd[k]=adsCA[i+3]}
}
adsMNS=(/(\?|&)atw[Mm][Nn]=(.*?)(&|$)/.test(adsLo))?(RegExp.$2).split(/\||;/):'';
if (!(/^[0-9A-Za-z,-]+$/.test(unescape(adsMNS))))adsMNS='';
adsPing=(/(\?|&)atw[Pp]ing=(.*?)(&|$)/.test(adsLo))?(RegExp.$2):'';
if (!(/^[0-9]+$/.test(unescape(adsPing))))adsPing='';
adsTPS=(/(\?|&)atw[Tt]p=(.*?)(&|$)/.test(adsLo))?(RegExp.$2).split(/\||;/):'';
if (!(/^[0-9A-Za-z,-]+$/.test(unescape(adsTPS))))adsTPS='';
adsKV=(/(\?|&)atw[Kk][Vv]=(.*?)(&|$)/.test(adsLo))?escape(RegExp.$2):'';
if (!(/^[0-9A-Za-z,;=]+$/.test(unescape(adsKV))))adsKV='';
if (adsKV&&adsKV[adsKV.length-1]!=';')adsKV+=';'
if (adsKV)adsATOth+=adsKV;
adsExcV=(/(\?|&)atw[Ee]xc=(.*?)(&|$)/.test(adsLo))?(RegExp.$2):'';
adsIP=(/(\?|&)atw[Ii][Pp]=(.*?)(&|$)/.test(adsLo))?(RegExp.$2):'';
if (!(/^[a-z0-9\.=;]+$/.test(unescape(adsIP))))adsIP='';
if (adsIP)adsATOth+='ip='+adsIP+';';
}
adUACInit()
function adsCkCol(f,d){
var dv=document.getElementById(f.divName),i=d.getElementById('adDiv').innerHTML,z,s='http';
if (f.id[f.id.length-1]==adsPing-1) { 
  z=document.createElement('script');
  if (adsSecure)s+='s://s'
  else s+='://o'
  z.src=s+'.aolcdn.com/ads/blank.js';
  document.body.appendChild(z);
}
var x=((i.indexOf('AOL - HTML - Blank HTML Ad')!=-1)||(i.indexOf('ATCollapse.gif')!=-1));
if (dv&&dv.col){
if (!x){
f.width=f.w;
f.height=f.h;
f.style.visibility='visible';
}}
if (x){
f.style.width="0px"
f.style.height="0px"
dv.width=0
dv.height=0 
f.style.display='none'
adsDevilObj(f.divName,'1','1',f,d,'1');
return true
}
else {
 if (f.textAd!=1&&!dv.dynSz)adsDevilObj(f.divName,f.w,f.h,f,d,'0');
 return false
}
}
function adsDoOnL(f,d){
if (f){
if (!adsCkCol(f,d)&&f.divName){
var s=d.getElementById('adDiv').innerHTML,n=s.indexOf('\<\!--'),n2=s.indexOf('3PTextDynamic'),wi,h;
if (s.indexOf('3rd Party Text')<0&&s.indexOf('TextVendor')<0&&s.indexOf('TextCustom')<0){
if (n2>0){
adsQuigo=2
adsRMIFOnL(f,d)
}else{
if (n>0){
var x=s.substr(n,s.length),p=document.getElementById(f.divName),z=f.contentWindow.adComRedirect;
if (z){ 
 adSetupDiv(f.w,f.h,z,f.divName,f.src,'text',f.mn,'0','0','0');
 adsDivs[adsDivs.length-1].LoadAd()
}
else { 
 p.innerHTML=x
 adsDevilObj(f.divName,f.w,f.h,f,d,'0');
}}}}
else{
if (/aolsize=["']([\d]*?)\|([\d]*)["']/i.test(s)){
 wi=unescape(RegExp.$1);
 h=unescape(RegExp.$2);
}else{
 wi=f.w;
 h=f.h;
}
if (s.indexOf('TextCustom')>-1){
f.style.width=wi+'px';
f.style.height=h+'px';
f.style.display='block';
f.style.visibility='visible';
}
adsDevilObj(f.divName,wi,h,f,d,'1');
}}}}
function adSetNetId(v){adsNt=v}
function adSetPlId(v){adsPl=v}
function adSetHtNm(){}
function adSetHtNmAT(v){
var p=location.protocol;
adsHt=(/^https?/i.test(v))?v:((/^\/\//.test(v))?p+v:p+'//'+v);
if (adsHt.charAt(adsHt.length-1)=='/')adsHt=adsHt.substring(0,adsHt.length-1);
}
function adSetAMS(){}
function adSetTarget(){}
function adSetSN(v){var c
if (v){
v=v.toString()
if ((v.indexOf('@aol.com')!=-1)||(v.indexOf('@aim.com')!=-1)){
v=v.split('@');
v=v[0];
}
if (window.btoa)c=btoa(v)
else{
var o="",c1,c2,c3,e1,e2,e3,e4,i=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
do {
c1=v.charCodeAt(i++)
c2=v.charCodeAt(i++)
c3=v.charCodeAt(i++)
e1=c1 >> 2
e2=((c1 & 3) << 4) | (c2 >> 4)
e3=((c2 & 15) << 2) | (c3 >> 6)
e4=c3 & 63
if (isNaN(c2))e3=e4=64
else if (isNaN(c3))e4=64
o=o+s.charAt(e1)+s.charAt(e2)+s.charAt(e3)+s.charAt(e4)
}
while (i<v.length);
c=o;
}
adsESN='&ESN='+c;}
}
function adSetWM(v){adsATWM='kvwm='+escape(v)+';'}
function adSetOthAT(v){
if (v){
 if (v.charAt(v.length-1)!=';')v+=';'
 var x=v.split(';'),l=x.length,y;
 for (i=0;i<l-1;i++){
  if (x[i].charAt(x[i].length-1)!='='){
    y=x[i].split('=');
    adsATOth+=escape(y[0])+"="+escape(y[1])+';';  
  }
 }
}
else if (v=='')adsATOth='';
try {ATW3_AdObj.adsATOth=adsATOth;}
catch(e){}
}
function adSetOthMob(v){
if (v){v=v.replace(/;/g,'&');
if (v[0]!='&')adsATMob='&'+v
else adsATMob=v;
try {ATW3_AdObj.adsATMob=adsATMob;}
catch(e){}
}}
function adSetCo(v){
if (v)adsCo=v.toLowerCase();
}
function adSetAddOn(v){
if (adsAddOn!=2)adsAddOn=parseInt(v);
}
function adSetAJAXAddOn(v){adsAJAXAddOn=v}
function adSetType(v){
if (v=='')v='J'
adsTp=v.toUpperCase()
}
function adSetSearch(v){
v=v.replace(/ /g,'+')
v=(window.encodeURIComponent)?encodeURIComponent(v):escape(v)
adsSrAT="KEY="+v+";"
}
function adSendTerms(){}
function adSetAdURL(u){adsPage=u}
function adsShowDiv(d){
var v=adsGetObj(d);
v.style.display="block"
}
function adsHideDiv(d){
var v=adsGetObj(d);
v.style.display="none"
}
function adsResetPg(){
adsTile=1
adsDivs=[]
adsD=new Date()
adsScr=adsD.getTime()%0x3b9aca00
adsATOth=''
adsATMob=''
adsSrAT=''
adsAddOn=1
atwReset=1;
adsRRDevil='';
aol_devil_flag='';
}
function adsReloadAll(){
adsD=new Date()
var z=adsDivs.length;
for (var i=0;i<z;i++)adsReloadAd(adsDivs[i],'','all')
}
function adsReloadAd(d,m,v){
if (v!='all')adsD=new Date()
var v=adsGetObj(d),s=v.adURL,dt=adsD.getTime()%0x3b9aca00;
if (s){
s=unescape(s);
if (m)s=s.replace(/alias=[0-9]*;/,"alias="+m+";").replace(/kvmn=[0-9]*;/,"kvmn="+m+";");
var i=s.indexOf(';grp='),u=''
if (i==-1)u=s.replace(/ /, "")+" "
else u=s.substring(0,i+5)+dt
u=u.replace(/kvgrp=[0-9]*;/,"kvgrp="+dt+";")
v.adURL=u
v.LoadAd()
}}
function adsReloadIframe(n,m,v){
var f='',s='';
try {f=document.getElementById(n)}
catch (e){}
if (f){
if (v!='all')adsD=new Date()
try {s=f.src}
catch (e){}
if (s){
s=unescape(s);
if (m)s=s.replace(/alias=[0-9]*;/,"alias="+m+";").replace(/kvmn=[0-9]*;/,"kvmn="+m+";")
var dt=adsD.getTime()%0x3b9aca00,i=s.indexOf(';grp=');
s=s.replace(/kvgrp=[0-9]*;/,"kvgrp="+dt+";")
try {f.src=s.substring(0,i+5)+dt}
catch(e){}}}
}
function adsReloadIframeAll(){
var n,f='';
adsD=new Date()
for (var i=0;i<adsTile;i++){
n='adsF'+i
try {f=document.getElementById(n)}
catch (e){break}
if (f)adsReloadIframe(n,'','all')}
}
function adSetOthDclk(v){
var x=v.split(';'),z=x.length-1;
for (var i=0;i<z;i++){
var y=x[i].split('=')
adsATOth+="kv"+escape(y[0])+"="+escape(y[1])+";"
}}
function adSetDelay(){}
function adSetExt(){}
function adsGetAdURL(w){
var d=w.frameElement.parentNode;
return d.adURL
}
function adsDevilObj(d,w,h,f,doc,r){
var dv=document.getElementById(d),i=doc.getElementById('adDiv').innerHTML,n=dv.adNum+1;
var m=(/mnum=(.*?)\//i.test(i))?RegExp.$1:'',
a=(/aolAdId=("|')(.*?)("|')/i.test(i))?RegExp.$2:'|',
t=(/aolFormat=("|')(.*?)("|')/i.test(i))?RegExp.$2:'',
tx=(f.textAd)?'1':'0';
if (f.mn)aolAdFdBkStr+=f.mn+'|'+w+'|'+h+'|'+a+'|'+m+';';
if (a=='|')a='';
f.setAttribute('banId',a);
try {
window.adsDevilAd=window.adsDevilAd||{};
window.adsDevilAd.ad=window.adsDevilAd.ad||[];
adsDevilAd.ad[n]={
 divName:f.divName,
 mn:f.mn,
 adId:a,
 aolFormat:t,
 width:w,
 height:h,
 mnum:m,
 sz:f.sz,
 textAd:tx
};
}
catch(e){}
try {
 adsDevilAd.ad[n].aolDevilFlag=top.aol_devil_flag;
 if (!adsRRDevil){
  if (f.sz=='300x250,300x600,300x1050'&&h!='1050')adsRRDevil='n';
  if (top.aol_devil_flag||(f.sz=='300x250,300x600,300x1050'&&h=='1050'))adsRRDevil='y'
 }
}
catch(e){}
try {
if (window.adsDevilAd.hasOwnProperty('resized'))adsDevilAd.resized(d,w,h);
if (window.adsDevilAd.hasOwnProperty('adinfo'))adsDevilAd.adinfo(n,d,w,h);
if (window.adsDevilAd.hasOwnProperty('adinfo2'))adsDevilAd.adinfo2(n,d,w,h);
if (window.adsDevilAd.hasOwnProperty('moat'))adsDevilAd.moat(n,d,w,h,tx);
if (w=='300'){
 adsDevilAd.RRWidth=w;
 adsDevilAd.RRHeight=h;
}
}catch(e){}
}
function adsRMIFOnL(w,d){
var f,wi='',h='',z=0,c=0,a=0;
if (adsQuigo>0)f=w
else f=w.frameElement
var v=f.parentNode,s=d.getElementById("adSpan"),aD=d.getElementById("adDiv"),aD1=aD.innerHTML;
if (/ACE_AR(.*?)possible_size(.*?)[,}]/i.test(aD1))a=1;
if (/ACE_AR(.*?)Size(.*?)['"](.*?)['"]/i.test(aD1)){
 if (unescape(RegExp.$3).indexOf(',')>0)a=1;
}
if (adsQuigo==0&&(/aolSize=["']([\d]*?)\|([\d]*)["']/i.test(aD1))&&(unescape(RegExp.$2)>1)){
 wi=unescape(RegExp.$1);
 h=unescape(RegExp.$2);
 c=1;
}
else{
 if (/ACE_AR(.*?)Size(.*?)[,}]/i.test(aD1)&&!a){
  var as=unescape(RegExp.$2).replace(/[^\d\+]/g,"");
  wi=parseInt(as.substring(0,3),10);
  h=parseInt(as.substring(3,s.length),10);
 }
 else {
  if (!adsMob){
   if (/img (.*?)width=["']?(.*?)(\"|\'| )/i.test(aD1))wi=parseInt(RegExp.$2);
   if (/img (.*?)height=["']?(.*?)[\"|\'| ]/i.test(aD1))h=parseInt(RegExp.$2);
  }
  if (!wi||!h||wi<2||h<2){
   if ((v.childNodes.length==1)||(d.adsWidth&&d.adsHeight)){
    if (d.adsWidth&&d.adsHeight){wi=d.adsWidth;h=d.adsHeight;}
    else{
     if (s){
      wi=s.offsetWidth
      if (adsIE&&parseInt(adsUA.charAt(adsUA.indexOf('trident/')+8))<5)h=s.offsetHeight
      else h=aD.offsetHeight
     }
    }
   }
   else if (adsMob){
    try{
     wi=f.contentWindow.document.body.scrollWidth;
     h=f.contentWindow.document.body.scrollHeight;
    }
    catch(e){}
   } 
  }
 }
}
if ((wi&&h&&wi>1&&h>1&&!(v.w==wi&&v.h==h)&&(aD1.indexOf('AOLDevilNoExpand')==-1))||(aD1.indexOf('AOLDevilExpand')!=-1)){
 var x=0;
 if (v.sz){
  var s=v.sz.split(','),l=s.length;
  for (i=0;i<l;i++){
   x=s[i].split('x');
   if ((wi==x[0])&&(h==x[1])&&(h!=1)){
    if (!a){
     f.width=wi;
     f.height=h;
    }
    z=1;
    break;
   } 
  }
  if (!z&&v.sz=='300x250,300x600,300x1050'){
   if (h<350)h='250'
   else if (h>450&&h<750)h='600'
   else if (h>900) h='1050';
   if (!a){
    f.width=300;
    f.height=h;
   }
   z=1;
  }
  if (!z&&v.sz=='728x90,948x250,970x66,970x90,950x252,970x250,940x230'){
   if (h<78)h='66'
   else if (h<150)h='90'
   else h='250';
   if (wi<800)wi='728'
   else wi='970';
   if (!a){
    f.width=wi;
    f.height=h;
   }
   z=1;
  }
 }
}
if (c&&v.w=='320'&&v.h=='50'&&wi=='320'&&h=='68'){
 if(adsMobDyn&&!a){
  f.width=320; 
  f.height=68;
 }
}
else if (!z){wi=v.w;h=v.h;}
adsDevilObj(v.divName,wi,h,f,d,z);
if (wi&&h&&f&&adsQuigo==0)f.className="uac_"+wi+"x"+h;
adsQuigo=0
}
function adsRmChildren(o){
var f=null;
while (o.childNodes.length>0){
var c=o.childNodes[0],i=c.id
if (i){
if (i.toString().indexOf("atwAdFrame")!=-1){
f=c
f.src="about:blank"}
c.i=""}
if (c.childNodes.length>0)adsRmChildren(c)
o.removeChild(c)}
}
function adsClrDiv(){adsRmChildren(this)}
function adsClrAd(d){
var o=adsGetObj(d);
adsRmChildren(o)
}
function adsGetObj(d){
var o;
if (typeof(d)!='object')o=document.getElementById(d)
else o=d
return o
}
function adsLoadAd(){
if (adsTile==1)atwAd1Time=new Date();
this.ClearAd()
var f=document.createElement('iframe');
f.textAd=this.textAd
if ((this.textAd==1)||(this.col)){
f.visibility='hidden'
f.width=0;
f.height=0;
}else{
f.width=this.w
f.height=this.h
}
f.title="Ad"
f.marginWidth=0
f.marginHeight=0
f.setAttribute('allowtransparency','true')
f.frameBorder=0
f.scrolling="no"
f.w=this.w
f.h=this.h
f.mn=this.mn
f.divName=this.divName
f.sz=this.sz
f.inV=this.vis
f.timing=new Date().getTime();
this.appendChild(f)
if (this.iframe){f.id="adsF"+this.adNum
f.src=this.adURL
}else{
f.id="atwAdFrame"+this.adNum
if ((document.domain!=location.hostname)&&(this.adPage.indexOf('#')==-1))this.adPage=this.adPage+'#'+document.domain
if (this.adPage){
if (f.inV=='0'){
 f.src=this.adPage;
}
else{
 f.url=this.adPage;
 this.adURL=this.adURL.replace(/kvmn=/,"kvvis=1;kvmn=");
 var z=setTimeout(function(){adsDelaySonar(f,adsSonarT);},100);
}}}
}
function adsDelaySonar(f,t){
if (atwLoaded&&(atwReset==0||adsRRDevil!='')){
 if (t){
  setTimeout(function(){adsDelaySonar(f,0);},t);
 }
 else if (f.inV!='D'||adsRRDevil=='n'||!adsRRCalled){
  if (adsSonar(f,function(){},{visibility:adsSonarV})){
   f.src=f.url;
  }
  else{ 
   adsSonar(f,function(){
    this.scrollin=false;
    if (f.inV!='D'||adsRRDevil=='n'||!adsRRCalled){
      f.src=f.url;
    };
    },
    {visibility:adsSonarV}
   )
  }
 }
}
else {
 setTimeout(function(){adsDelaySonar(f,t);},100);
}
}
function adSetupDiv(w,h,u,dv1,pg,ds,m,sz,c,v){
var s="adsDiv"+adsDivs.length,d;
if (!dv1||dv1==""){
document.write("<div id='"+s+"'></div>")
d=document.getElementById(s)
dv1=s
}
else d=adsGetObj(dv1)
if (typeof(dv1)=='object'){
 try {
  if (dv1.id==''){
   d.divName=s;
   d.id=s;
  }
  else d.divName=dv1.id
 }
 catch(e){}
}
else {
 d.divName=dv1
}
d.LoadAd=adsLoadAd
d.ClearAd=adsClrDiv
d.mn=m
if (ds=='text')d.textAd=1
else d.textAd=0;
if (ds&&ds!='text'&&ds!='iframe')d.dynSz=1
else d.dynSz=0;
if (sz)d.sz=sz
else d.sz=0;
d.w=w;d.h=h;
d.adURL=u
d.adPage=pg
d.adNum=adsDivs.length
d.col=c;
d.vis=v;
d.delayed=0;
if (ds=='iframe')d.iframe=1
else d.iframe=0;
adsDivs[adsDivs.length]=d
}
function adsCkPlg(){
var dF='',n=navigator,a,d;
if (adsIE&&(adsUA.indexOf('win')!=-1)){
try {a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if (a){d=a.GetVariable("$version").split(" ")[1].split(",");
if (d[0]>=10)dF=d[0]
}}catch(e){}
}else{
var p=n.plugins
if (p){
var l=p.length
if (l>1){
var m=n.mimeTypes,fl=m['application/x-shockwave-flash']
if (m&&((fl&&fl.enabledPlugin&&(fl.suffixes.indexOf('swf')!=-1)))){
var ds,f="Flash ",fS
for (var i=0;i<l;i++){
ds=p[i].description
fS=ds.indexOf(f)
if (fS!=-1){
if (ds.substring(fS+6,fS+8)>=10){dF=ds.substring(fS+6,fS+8)}
}}}
if (fl==null)dF=''
}}}
adsNMSG=dF
}
function adsGetValues(){
var l=unescape(adsLo),p='',r='',s='',t='',v,x=0,re='',le,ln;
adsNt2=(/(\?|&)atw[Nn][Tt]=(.*?)(&|$)/.test(adsLo))?(RegExp.$2):'';
if (adsNt2)adsNt=adsNt2;
if (l.indexOf('&pLid')>0)v=l.match(/[?&]icid=.*?[|](.*?)[|](.*?)[|](.*?)&pLid=(.*?)($|\&|\|)/);
else v=l.match(/[?&]icid=.*?[|](.*?)[|](.*?)[|](.*?)[|](.*?)($|\&|\|)/);
if (v){
for (var i=1;i<=4;i++){
if (!(/^[0-9A-Za-z:\/._|\-]+$/.test(v[i]))){x=1;
break;
}
r+=v[i]+':'
}
if (!x)r='kvdl='+r.substring(0,r.length-1)+';';
else r='';
}
p=adsLo.substr(7).toLowerCase();
if (p.indexOf('patch.com')>-1)p=p.replace(/.*\.com\//,'patch/');
else {
 p=p.replace(/www\./,'');
 p=p.replace(/\.com/,'');
}
p=p.replace(/[?#].*$/,'');
p=escape(p);
le=p.length;
if (le>65){
 p=p.substr(0,65);
 ln=p.length;
 if (p[ln-1]=='%')p=p.substr(0,64);
 else if (p[ln-2]=='%')p=p.substr(0,63);
}
p="kvpg="+p+";";
p=p.replace(/\/;$/,';');
p=p.replace(/\//g,'%2F');
if (adsATOth.indexOf('kvugc')==-1){
 s='kvugc=';
 if (window.adSetUGC==0)s+='0;'
 else if (window.adSetUGC==1)s+='1;'
 else{
  if (adsATOth.indexOf('cmsid')==-1)s+='0;'
  else s+='1;'
 }
}
if (/(^|;)?UNAUTHID=(.*?)[.](.*?)[.]/i.test(document.cookie))t='kvui='+unescape(RegExp.$3)+';';
var y1,g='kvh5lsid=0;';
try {
 y1=window.localStorage.getItem('adsGUID');
 if (y1){
   g=g.replace('0','1');
   g+='GUID='+y1+';';
 }
}
catch(e){}
try {
 var u=document.referrer;
 if (u){
   v=u.match(/https?\:\/\/(?:www.)?(.*?)(?:[\/?#]|$)/);
   re='kvrefd='+ RegExp.$1+';';
 }
}
catch(e){}
return p+r+s+t+g+re;
}
(function(d,k,l){function f(c,a){var b;return function(){function g(){b=l;c.call(this)}b||(b=d.setTimeout(g,a))}}function i(c,a,b){if(!j)j=k.body;var g=c,e=0,f=j.offsetHeight,h=d.innerHeight||k.documentElement.clientHeight||j.clientHeight||0,i=k.documentElement.scrollTop||d.pageYOffset||j.scrollTop||0,m=c.offsetHeight||0;if(!c.sonarElemTop||c.sonarBodyHeight!==f){if(g.offsetParent){do e+=g.offsetTop;while(g=g.offsetParent)}c.sonarElemTop=e;c.sonarBodyHeight=f}a=a===l?0:a;return!(c.sonarElemTop+(b?
0:m*b)<i-a)&&!(c.sonarElemTop+(b?m*b:0)>i+h+a)}function e(){var c,a,b;for(c in h)if(h.hasOwnProperty(c)&&(a=h[c],a.scrollin||a.scrollout))if(b=i(a.elem,a.distance,a.visibility),b!==a.detected)b?a.scrollin&&a.scrollin.call(a,a.elem):a.scrollout&&a.scrollout.call(a,a.elem),a.detected=b}var j,h=[];d.addEventListener?(d.addEventListener("scroll",f(e,200),!1),d.addEventListener("resize",f(e,200),!1)):d.attachEvent&&(d.attachEvent("onscroll",f(e,200)),d.attachEvent("onresize",f(e,200)));d.adsSonar=function(c,
a,b){if("object"===typeof a)b=a;else if("function"===typeof a)b?b.scrollin=a:b={scrollin:a};if(b.scrollin||b.scrollout)b.elem=c,h.push(b),e();return i(c,b.distance,b.visibility)}})(this,document);
var adSetInV='0',adsSonarT=0,adsSonarV=0;
function adSetInView(o,v,t){
if (o)adSetInV=o; 
if (v)adsSonarV=parseFloat(v);
if (t)adsSonarT=parseInt(t);
}
function adsSonarTestFn(i,m){
var t=new Date(),ti=(t-atwAd1Time)/1000,t2,d=''
if (ti<180)t2='1' 
else if (ti>180&&ti<210)t2='2' 
else if (ti>210&&ti<240)t2='3' 
else if (ti>240&&ti<270)t2='4' 
else if (ti>270&&ti<300)t2='5'
else if (ti>300)t2='6';
if (!adsRRDevil)d='f'
else d=adsRRDevil;
i.src='http://at.atwola.com/adserv/3.0/5113.1/221794/0/-1/size=1x1;noperf=1;alias='+m+';cfp=1;noaddonpl=y;kvismob='+adsDev+';kvvis=1;kvvist='+t2+';kvvisd='+d+';grp='+adsScr;
}
function adsSonarTest(d,m,t,v){
if (!v)v=0;
if (d)d=adsGetObj(d)
else {
var x='d'+adsD.getTime()%0x3b9aca00;
document.write("<div id='"+x+"'></div>")
d=adsGetObj(x)
}
var i=document.createElement('img'),d1='';
i.style.display="none";
i.style.width='1px';
i.style.height='1px';
d.appendChild(i);
if (!adsRRDevil)d1='f'
else d1=adsRRDevil;
var u='http://at.atwola.com/adserv/3.0/5113.1/221794/0/-1/size=1x1;noperf=1;alias='+m+';cfp=1;noaddonpl=y;kvismob='+adsDev+';kvvis=1;kvvist=0;kvvisd='+d1+';grp='+adsScr;
if (adsSonar(d,function(){},{visibility:v}))i.src=u
else {
 if (!t)adsSonar(d,function(){adsSonarTestFn(i,m);this.scrollin=false},{visibility:v})
 else setTimeout(function(){adsSonar(d,function(){adsSonarTestFn(i,m);this.scrollin=false},{visibility:v})},t);
}
}
function htmlAdWHDyn(m,s,t,dv,fn,ds){htmlAdWH(m,'','',t,dv,fn,ds,s.toString())}
function htmlAdWH(m,w,h,t,dv,fn,ds,sz){
if (m)m=m.toString()
else return 0;
var d=document,inc='',s,r=0,st="<script type='text/javascript' src='",sp1,ye=0,c=0,f=0,rr=0,wi=window,pr=location.protocol+'//';
if (pr.indexOf('http')<0)pr='http://';
if (!adsVal)adsVal=adsGetValues()
if (!adsChn&&wi.s_265&&wi.s_265.channel)adsChn='kvoch='+escape(wi.s_265.channel)+';'
if (t){
t=t.toLowerCase()
if (t.indexOf('c')>0){c=1;t=t.substr(0,t.length-1)}
}
if (adsTp=='F'||t=='ajax'||t=='f')f=1
if (t=='text'||f){
if (!fn||fn=='')fn=adsPage
if (fn==''||(adsUA.indexOf('opera')>-1)){adsTp='J';t='',f=''}
}
if (sz){
sp1=sz.split(',')[0].split('x');
w=sp1[0];
h=sp1[1];
if (f)ds='r'
}
if (w=='RR'||w=='rr'){
 w=300;h=250;
 if (f)ds='r'
 sz='300x250,300x600,300x1050';
 rr=1;
 adsRRCalled='1';
}
if (w=='LB'||w=='lb'){
w=728,h=90;
if (f)ds='r'
sz='728x90,948x250,970x66,970x90,950x252,970x250,940x230'
if (!adsIntMN)sz+=',101x1';
}
if (adsCp){
var cl=adsCF.length;
for (var i=0;i<cl;i++){
if ((/http[s]{0,1}:\/\/[^\/]*?aol.com(:[0-9]*?){0,1}\//.test(adsCF[i]))&&(/^[0-9A-Za-z\/.:_\-]+$/.test(unescape(adsCF[i])))){
if ((adsCAd[i]=='I')&&(adsTile==1))adsIntMN=adsCF[i]+'.js';
if (sz){
var sp2=sz.split(','),le=sp2.length,sp3;
for (var j=0;j<le;j++){
sp3=sp2[j].split('x');
if (adsCW[i]==sp3[0]&&adsCH[i]==sp3[1])ye=1;
}}
if (ye||(adsCW[i]==w&&adsCH[i]==h)||(adsCAd[i]==adsTile)){
if (adsTp=='I'||t=='iframe')s=adsCF[i]+'.html'
else s=adsCF[i]+'.js'
adsCW[i]=0
r=1
break 
}}}}
if (adsMNS){
var mL=adsMNS.length,wxh=w+'x'+h,num,all=0;
for (var i=0;i<mL;i=i+2){
num=adsMNS[i+1];
if (num.indexOf('a')>0){
 num=num.replace('a','');
 all=1;
}
else {
 all=0;
}
if (num.indexOf('only')>-1){
 num=num.replace('only','');
 only=1;
}  
else {
 only =0; 
}
if ((adsTile==num)||(wxh==num)||(num=='RRxRR'&&rr==1)){
m=adsMNS[i];
if (!all)adsMNS[i+1]='';
if (only)adsMNS[i+1]='only';
}
else if (only){m='0';}
if (adsMNS[i+1]=='I')adsIntMN=adsMNS[i];
}}
if (m=='0'){adsTile++;return 0}
var adsTpOrig=adsTp;
if (adsTPS){
var tL=adsTPS.length;
for (var i=0;i<tL;i=i+2){
if (adsTile==adsTPS[i+1]){
t=adsTPS[i].toLowerCase()
if (t=='j'){adsTp='J';t=''}
else if (t=='i'){adsTp='I';t=''}
else adsTp='';
break
}}}
if (r==0){
if (!adsNMSG&&adsUA.indexOf('ipad')==-1)adsCkPlg()
if (!adsNMSG)inc='artexc=art_flash,art_rrflash;'
if ((m.indexOf('-')>-1)&&(/^[0-9a-fm\-]+$/i.test(m))){
 if (m.substring(0,1).toLowerCase()=='m')m=m.substring(1,m.length);
 if (adsHt)s=adsHt
 else {
  s=pr+'mads';
  if (adsCo!='us')s+='uk'
  s+='.at.atwola.com';
 }
 adsMob=1;
 if (f)ds='r'
 var kf='kvmflash=',swh='',inI=false,inSD=true,pU,sd='';
 if (adsNMSG)kf+='true;'
 else kf+='false;';
 if (wi.screen && wi.screen.width && wi.screen.height)
 swh='swh='+wi.screen.width+'x'+wi.screen.height+';screenwidth='+wi.screen.width+';screenheight='+wi.screen.height+';';
 try {
 if (wi.devicePixelRatio)sd='screendensity='+wi.devicePixelRatio+';';
 if (wi.top!==wi.self)inI=true;
 pU=wi.top.location.href.toString();
 } 
 catch (e){}
 if (!pU||pU==="undefined"){
  inI=true;
  inSD=false;
 }
 var f1="f="+(inI?(inSD?"1":"2"):"0")+";",f2="fv="+(adsNMSG?adsNMSG:"0")+";";
 s+='/adcall?mpid='+m+';rettype=js;width='+w+';height='+h+';'  
 s+=adsATOth+adsSrAT+adsATWM+adsVal+'kvmn='+m+';kvgrp='+adsScr+';kvismob='+adsDev+';'+adsChn+"extmirroring=0;"+adsTzAT+kf+swh+sd+f1+f2+'optn=1;random='+adsScr;
}
else {
 if (adsDev=='1'&&adsMSP&&adsTp!='A0'&&adsTp!='A1'){
  var sm='alias='+m+';random='+adsScr+';sizeId=-1;';
  if (sz&&!rr)sm+="allowedSizes="+sz+";"
  else if (ds!='r')sm+="size="+w+"x"+h+";"
  sm+="noperf=1;";
  if (adsTile!=1)sm+="cfp=1;"
  if (adsAddOnMQ){
    if (adsAddOnMQ=='y')sm+="noaddonpl=y;"
  }
  else {
  if (inc!=''||(t=='ajax'&&!adsAJAXAddOn)||adsAddOn==2||adsIntMN!=''){
   sm+="noaddonpl=y;";
   adsAddOn=2;
  }
  else{
   if (adsTile==1){
    if (adsAddOn==1)adsAddOn=2;
    else sm+="noaddonpl=y;";
    }
    else {
     if (adsAddOn!=1)sm+="noaddonpl=y;";
     else adsAddOn=2;
    }
   }
  }
  if (adsExcV=='blank')inc='artexc=all;'
  else if (adsExcV=='imgOnly')inc='artexc=all;artinc=art_image,art_img1x1,art_3pimg,art_rrimage,art_rrimg1x1,art_rr3pimg';
 sm+=inc+adsATOth+adsSrAT+adsATWM+adsVal+"kvmn="+m+";kvgrp="+adsScr+";kvismob="+adsDev+";"+adsChn+"extmirroring=0;target=_blank;"+adsTzAT+"grp="+adsScr
  s=pr;
  if (t=='iframe'||adsTp=='I'){
   sm+='|'+adsNt+'|'+adsPl+'|'+adsCo;
   sm=unescape(sm);
   if (adsSecure)s+='s';
   else s+='o';
   s+='.aolcdn.com/ads/mobileIframe.html?s='+escape(sm);
  } 
  else {
    s+='mads';
    if (adsCo!='us')s+='uk';
    s+='.at.atwola.com/adcall?mpid=348-d-d-e;rettype=js;callProtocol=3.0;networkId='+adsNt+';placementid='+adsPl+';'+sm;
  }
}
else
{
if (adsHt)s=adsHt
else s=pr+'at.atwola.com';
s+="/addyn/3.0/"+adsNt+"/"+adsPl+"/0/-1/"
if (sz&&!rr)s+="allowedSizes="+sz+";"
else if (ds!='r')s+="size="+w+"x"+h+";"
s+="noperf=1;alias="+m+";"
if (adsTile!=1)s+="cfp=1;"
if (adsAddOnMQ){
    if (adsAddOnMQ=='y')s+="noaddonpl=y;"
}
else {
if (inc!=''||(t=='ajax'&&!adsAJAXAddOn)||adsAddOn==2||adsIntMN!=''){
s+="noaddonpl=y;";
adsAddOn=2;
}else{
 if (adsTile==1){
 if (adsAddOn==1)adsAddOn=2;
 else s+="noaddonpl=y;";
 }else {
 if (adsAddOn!=1)s+="noaddonpl=y;";
 else adsAddOn=2;
 }
}
}
if (adsExcV=='blank')inc='artexc=all;'
else if (adsExcV=='imgOnly'||adsUA.indexOf('cs 2000')!=-1)inc='artexc=all;artinc=art_image,art_img1x1,art_3pimg,art_rrimage,art_rrimg1x1,art_rr3pimg';
s+=inc+adsATOth+adsSrAT+adsATWM+adsVal+"kvmn="+m+";kvgrp="+adsScr+";kvismob="+adsDev+";"+adsChn+"extmirroring=0;target=_blank;"+adsTzAT+"grp="+adsScr
}
}
}
if (t=='return'){
adsTile++;
adsTp=adsTpOrig;
return s;
}
if (t=='text'){
adSetupDiv(w,h,s,dv,fn,'text',m,sz,c,adSetInV);
adsDivs[adsDivs.length-1].LoadAd()
}
else if (t=='ajax'){
adsAJAX=1
adSetupDiv(w,h,s,dv,fn,ds,m,sz,c,adSetInV)
if (!adsSyncDelay||adsDivs.length==1||adsLoadSync)adsDivs[adsDivs.length-1].LoadAd()
else {
adsDivs[adsDivs.length-1].delayed=1;
if (!adsSyncTime)adsSyncTime=setTimeout(adsLoadedSync,adsSyncDelay)
}
}
else if (t=='iframe'){
adSetupDiv(w,h,s.replace(/addyn\/3.0/,"adiframe/3.0"),dv,fn,'iframe',m,sz,c,'0')
adsDivs[adsDivs.length-1].LoadAd()
}
else if (adsTp=='F'||t=='f'){
adSetupDiv(w,h,s,dv,fn,ds,m,sz,c,adSetInV);
if (!adsSyncDelay||adsDivs.length==1||adsLoadSync)adsDivs[adsDivs.length-1].LoadAd()
else {
adsDivs[adsDivs.length-1].delayed=1;
if (!adsSyncTime)adsSyncTime=setTimeout(adsLoadedSync,adsSyncDelay)
}
}
else if (adsTp=='A0'||adsTp=='A1'){
var ai
if (adsTp=='A0')ai=d.getElementById('adsF0')
else ai=d.getElementById('adsF1')
adsD=new Date()
dt=adsD.getTime()%0x3b9aca00
var s1=s.replace(/addyn\/3.0/,"adiframe/3.0").replace(/grp=[0-9]*/, "grp=" + dt);
ai.src=s1
}
else if (adsTp!='J'){
var s1=s.replace(/addyn\/3.0/,"adiframe/3.0")
d.write("<iframe title='Ad' name='adsF"+adsLNm+"' id='adsF"+adsLNm+"' src='"+s1+"' width='"+w+"' height='"+h+"' scrolling=no frameborder=0 marginheight=0 marginwidth=0></iframe>")
adsLNm++
}
else if (adsTp=='J'){
if (dv==undefined||adsMob)d.write(st+s+"'></script>")
else {
 s=s.replace(/allowedSizes=.*?;/,"size="+w+"x"+h+";");
 if (s.indexOf('size=')==-1)s=s.replace(/\/0\/-1\//, "\/0\/-1\/size="+w+"x"+h+";");
 var div=adsGetObj(dv),img=d.createElement('img'),li=document.createElement('a'),sI=s.replace(/addyn/,"adserv"),sH=s.replace(/addyn/,"adlink");
 li.href=sH;
 li.target='_blank';
 img.src=sI;
 img.alt='Ad';
 img.height=h;
 img.width=w;
 li.appendChild(img);
 div.appendChild(li);
}}
if (adsIntMN&&adsTile==1){
 w='101';
 h='1';
 if (adsIntMN.indexOf('.js')>-1){
  m='ITest';
  s=adsIntMN;
 } 
 else{
  if (adsHt)s=adsHt
  else s='http://at.atwola.com';
  s+="/addyn/3.0/"+adsNt+"/"+adsPl+"/0/-1/size="+w+"x"+h+";noperf=1;alias="+adsIntMN+";cfp=1;noaddonpl=y;";
  s+=inc+adsATOth+adsSrAT+adsATWM+adsVal+"kvmn="+adsIntMN+";kvgrp="+adsScr+";kvismob="+adsDev+";"+adsChn+"extmirroring=0;target=_blank;"+adsTzAT+"grp="+adsScr
 }
 if (f){ 
  var z=document.createElement('div')
  z.id='101Div';
  document.body.appendChild(z)
  adSetupDiv(w,h,s,z,fn,'',m,sz,c,'0')
  adsDivs[adsDivs.length-1].LoadAd()
 }
 else{
  document.write('<script type="text/javascript" src="'+s+'"></script>')
 } 
} 
adsTile++;
adsTp=adsTpOrig;
}
function imageAdWH(){}
(function(w) {
var c=w['mraid']||w['ormma'];
if (c)w['open']=c['open'];
})(window);
}}