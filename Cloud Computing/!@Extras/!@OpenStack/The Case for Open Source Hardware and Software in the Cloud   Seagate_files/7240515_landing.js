// Copyright Channel Intelligence, Inc. 2002-2010
var ci_vid= 7240515;
var ci_cookieDomain=".seagate.com";
var ci_refDomain=".seagate.com";
var ci_imgs=[];

function ci_FP(ci_pix_url,protocol){var ci_pic=new Image(1,1);ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}

function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function ci_CC(name,value,daysTillExpire){
	if (daysTillExpire){
		var exDate=new Date();
		exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
		document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
	}
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
function CI_ReadCookie(ci_cookieName) {
	var ci_cookieParts = document.cookie.split(';');
	ci_cookieName += '=';
	for (var ci_cookiePartIndex=0;ci_cookiePartIndex<ci_cookieParts.length;ci_cookiePartIndex++)
	{
		var ci_cookiePart=ci_cookieParts[ci_cookiePartIndex];
		while (ci_cookiePart.charAt(0)===' '){ci_cookiePart=ci_cookiePart.substring(1,ci_cookiePart.length);}
		if (ci_cookiePart.indexOf(ci_cookieName)===0){return ci_cookiePart.substring(ci_cookieName.length,ci_cookiePart.length);}
	}
	return null;
}
function ci_PIX(loc,eid,tid,src,sku,tag){
	var url='';
	if (loc===2){url=window.location.protocol.toLowerCase()=='http:'?'cts-log.channelintelligence.com?':'ttwbs.channelintelligence.com?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(tag!==null){url+='&tag='+tag;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url);
}
try {
	var ci_cpncode=ci_RQV('cpncode');
	var ci_srccode=ci_RQV('srccode');
	var ci_src=ci_RQV('ci_src');
	var ci_sku=ci_RQV('ci_sku');
	var ci_tag=ci_RQV('ci_tag');
	var ci_tid=ci_UID(ci_sku);
	var ci_cmpid=ci_RQV('cmpid');
	var CI_LinkID='';
	
	if(ci_cmpid!==null){
		ci_CC('ci_cmpid',ci_cmpid,90);
	}
	if(CI_ReadCookie('ci_cmpid')!==null){
		CI_LinkID=CI_ReadCookie('ci_cmpid');
	}
	
	if(ci_cpncode!==null){
		ci_CC('ci_cpncode',ci_cpncode,30);
		ci_CC('ci_src',ci_srccode,30);
		ci_CC('ci_tid',"",-1);
	} else if(ci_src!==null && ci_sku!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_CC('ci_src',ci_src,30);
		ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
	} else if(ci_tag!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,30);
		ci_PIX(2,7,ci_tid,null,null,ci_tag);
	} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1&&document.referrer!==''){
	    ci_PIX(2,13,null,null,null,null);
	}
}    
catch(err){}