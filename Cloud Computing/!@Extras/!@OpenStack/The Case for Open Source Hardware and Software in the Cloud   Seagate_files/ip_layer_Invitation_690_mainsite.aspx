var _http = document.location.protocol;
var _path = _http +  '//ipinvite.iperceptions.com/Invitations/Javascripts/';
var gJSFile = _http + "//ipinvite.iperceptions.com/Invitations/Javascripts/Layer_690_mainsite.js";
var url = document.location;
function getQuerystring(key, default_) { 
 if (default_ === null) { default_ = ""; }
key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");  
  var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
var qs = regex.exec(window.location.href); 
 if (qs === null)   { return default_; } else { return qs[1]; }} 
function CC(name,value,days) {	if (days) { var expDate = new Date(); expDate.setTime(expDate.getTime()+(days*24*60*60*1000)); 
var expires = "; expires="+expDate.toUTCString(); }	
else var expires = ""; document.cookie = name+"="+value+expires+"; path=/; domain=seagate.com";}
function RC(NameOfCookie) {      if (document.cookie.length > 0) {
begin = document.cookie.indexOf(NameOfCookie+"=");
if (begin != -1) {            begin += NameOfCookie.length+1; end = document.cookie.indexOf(";", begin);    
if (end == -1) end = document.cookie.length;    return unescape(document.cookie.substring(begin, end));   }  }    return null; }
function EC(n) {CC(n,'',-1);}
function Ld(lk) {var sct= document.createElement('script');sct.setAttribute('type', 'text/javascript'); sct.setAttribute('src', lk);document.getElementsByTagName('head')[0].appendChild(sct);}
function Exec() { var sCName = 'IPERCEPTIONS_690'; var sCVal = 'IPERCEPTIONS_690_COOKIE';
var sCN ='IPE_S_690'; var sCV = 'IPE_690_S_COOKIE'; var sCVR; sCVR= RC(sCN);
var sCValRet; var tCVName='IPERCEPTIONS_TEST'; var tCVVal='IPERCEPTIONS_TEST_COOKIE'; var tCVValRet;
CC(tCVName,tCVVal,1);CC('ipeSeagate','true',1);	tCVValRet = RC(tCVName);sCValRet = RC(sCName);	EC(tCVName);
var rndNum = Math.floor((Math.random() * 100)); 
if (rndNum < 20 && tCVValRet !== null && sCVR === null && sCValRet === null) {	CC(sCName, sCVal, 90); Ld(gJSFile);}
  if (sCVR === null) {CC(sCN, sCV);}}
window.IPEServeChrome = true;Ld( _path + 'Layer_Global_aicollect_2012.js');