var s_tc_cnetzdnetglobalsite=new TagContainer('cnetzdnetglobalsite');

function TagContainer(n){var t=this,w=t.w=window;t.d=w.document;t._c='s_t';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.tcn=t.l=0;t.stc=function(n){
var t=this,l=t.w.s_c_il,i,x;t.tcn=n;if(l)for(i=0;i<l.length;i++){x=l[i];if(x&&x._c=='s_l'&&x.tagContainerName==n)t.l=x}};t.stc(n);t.xd=function(s){var t=this,x=0;if(
t.d.implementation&&t.d.implementation.createDocument)x=(new DOMParser).parseFromString(s,'text/xml');else if(t.w.ActiveXObject){x=new ActiveXObject('Microsoft.XMLDOM');x.async='false';x.loadXML(s)}
return x};t.xe=function(x,t){var a,b=[],i,j;for(i=0;i<2;i++){if(i>0)t=t.toLowerCase();a=x.getElementsByTagName(t);if(a)for(j=0;j<a.length;j++)b[b.length]=a[j]}return b};t.xt=function(x){var t=this,b=
"",l,i;l=x.childNodes;if(l)for(i=0;i<l.length;i++)b+=t.xt(l[i]);if(x.data)b+=x.data;return b};t.cp=function(x){var t=this,tn=Math.floor((new Date).getTime()/1000),ts=x.s,te=x.e,tp=1,l=t.d.location,h=
l.hostname,hm=x.h,hp=1,p=l.pathname,pm=x.p,pp=1,q=l.search,qm=x.q,qp=1,qi,qv,c=t.d.cookie,cm=x.c,cp=1,ci,cv,i;if(ts)tp=(tn>=ts&&(!te||tn<=te));if(hm){hp=0;if(h){i=0;while(!hp&&i<hm.length){if(
h.indexOf(hm[i])>=0)hp=1;i++}}}if(pm){pp=0;if(p){i=0;while(!pp&&i<pm.length){if(p.indexOf(pm[i])>=0)pp=1;i++}}}if(qm){qp=0;if(q){if(q.substring(0,1)=='?')q=q.substring(1);q='&'+q+'&';i=0;while(
!qp&&i<qm.length){qi=q.indexOf('&'+qm[i].k+'=');if(!qm[i].v&&qi<0)qi=q.indexOf('&'+qm[i].k+'&');if(qi>=0)if(qm[i].v){qv=q.substring(qi+qm[i].k.length+2);qi=qv.indexOf('&');if(qi>=0){qv=unescape(
qv.substring(0,qi));if(qv==qm[i].v)qp=1}}else qp=1;i++}}}if(cm){cp=0;if(c){c=';'+c+';';c=c.split('; ').join(';');i=0;while(!cp&&i<cm.length){ci=c.indexOf(';'+cm[i].k+'=');if(!cm[i].v&&ci<0)ci=
c.indexOf(';'+cm[i].k+';');if(ci>=0)if(cm[i].v){cv=c.substring(ci+cm[i].k.length+2);ci=cv.indexOf(';');if(ci>=0){cv=unescape(cv.substring(0,ci));if(cv==cm[i].v)cp=1}}else cp=1;i++}}}return(
tp&&hp&&pp&&qp&&cp)};t.cl=[];t.cn=t.cpn=0;t.crt=0;t.bl=[];t.crl=function(cn,cpn){var t=this;if(cn==t.cn&&cpn==t.cpn)t.cr()};t.cr=function(){var t=this,d=t.d,b,c,p,n=1,o,u,x,y,l,i;if(t.cl.length>0){if(
!d.body){if(!t.crt)t.crt=setTimeout(function(){t.crt=0;t.cr()},13)}else{b=d.body;while(n&&t.cn<t.cl.length){c=t.cl[t.cn];if(t.cdwb){u=t.cdwb;t.cdwb=0;u='<div>'+u.replace(/&/g,'&amp;').replace(
/<img /gi,'<IMG ').replace(/<\/img>/gi,'</IMG>').replace(/<script /gi,'<SCRIPT ').replace(/<script>/gi,'<SCRIPT>').replace(/<\/script>/gi,'</SCRIPT>').replace(/<iframe /gi,'<IFRAME ').replace(
/<\/iframe>/gi,'</IFRAME>')+'</div>';x=t.xd(u);l=t.xe(x,'IMG');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'i',u:u})}l=t.xe(x,'SCRIPT');for(i=0;i<l.length;i++){u=l[i]
.getAttribute('src');if(u)c.p.splice(t.cpn,0,{t:'s',u:u});else{u=t.xt(l[i]);if(u)c.p.splice(t.cpn,0,{t:'c',c:u})}}l=t.xe(x,'IFRAME');for(i=0;i<l.length;i++){u=l[i].getAttribute('src');if(u)c.p.splice(
t.cpn,0,{t:'f',u:u})}}if((t.cpn>0||!c.x||t.cp(c.x))&&c.p&&t.cpn<c.p.length){p=c.p[t.cpn];if(p.t=='b'&&p.u){u=p.u;o=new Image;t.bl[t.bl.length]=o;o.onload=function(){var i;for(i=0;i<t.bl.length;i++)if(
t.bl[i]&&t.bl[i].src==u){t.bl.splice(i,1);return}};o.src=u}if((p.t=='s'&&p.u)||(p.t=='c'&&p.c)){n=0;t.cpn++;u=p.u;o=d.createElement('script');o.type='text/javascript';o.setAttribute('async','async')
x='s_c_il['+t._in+']';y=x+'.crl('+t.cn+','+t.cpn+')';if(p.t=='s'){o.n=new Function(y);o.t=0;o.i=setInterval(function(){if(o.readyState=='loaded')o.t++;if(o.readyState=='complete'||o.t>2){o.c();o.n()}}
,50);o.c=function(){if(o.i){clearInterval(o.i);o.i=0}};o.onreadystatechange=function(){if(o.readyState=='complete'){o.c();o.n()}};o.onload=function(){o.c();o.n()};o.src=u}else o.text=x+'.cdw='+x+
'.d.write;'+x+'.cdwb="";'+x+'.d.write=function(m){'+x+'.cdwb+=m};'+"\n"+p.c+"\n"+x+'.d.write='+x+'.cdw;'+y;x=b;l=d.getElementsByTagName('HEAD');if(l&&l[0])x=l[0];if(x.firstChild)x.insertBefore(o,
x.firstChild);else x.appendChild(o)}if(p.t=='f'&&p.u){u=p.u;o=d.createElement('IFRAME');o.setAttribute('style','display:none');o.setAttribute('width','0');o.setAttribute('height','0');o.setAttribute(
'src',u);b.appendChild(o)}if(n)t.cpn++}else{t.cn++;t.cpn=0}}if(n&&t.l){for(x in t.l.wl)if(!Object.prototype[x]){u=t.w[x];x=t.l.wl[x];if(u&&x)for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!=
'function'||(''+x[i]).indexOf('s_c_il')<0)u[i]=x[i]}}for(i=0;i<t.l.wq.length;i++){c=t.l.wq[i];u=c.f;if(u)if(c.o)x=t.w[c.o];else x=t.w;if(x[u]&&typeof(x[u])=='function'&&(''+x[u]).indexOf('s_c_il')<0){
if(c.a)x[u].apply(x,c.a);else x[u].apply(x)}}}}}};}

var om={};
om.getHashParam = function(variable){
	var hash = window.location.hash.substring(1);
	var n = '';
	var pair = '';

	if (hash.indexOf(variable) != -1){
		n = hash.substring(hash.indexOf(variable));
		if(n.indexOf("&") != -1){
			var vars = n.split("&");
			pair = vars[0].split("=");
		} else {
			pair = n.split("=");
		} // end else
		return pair[1];
	} else {
		return false;
	} // end else
} // getHashParam

var s_account="cnetzdnetglobalsite,cbsicbsiall" // live reportsuites
if(document.domain.match(/dev|staging/))
{s_account="cnetzdnetglobalsite-dev,cnetcbsiall-dev";}
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,zdnet.com,cbsi.com,"+document.domain
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

s.server="zdnet.com";
s.prop1="zdnet";
s.eVar1="D=c1";
s.prop3="responsive web";
s.eVar3="D=c3";
s.prop7="D=g";
s.eVar7="D=g";
s.prop8=document.title;
s.eVar8="D=c8";
s.prop9="D=User-Agent";
s.prop11='D=ch+":"+ch10';
s.eVar11="D=c11";
if (s_account){var om_sacc=new Array();om_sacc=s_account.split(','); if (typeof(om_sacc[0])!='undefined') {s.eVar5=om_sacc[0];s.prop5='D=v5'}}

/************************** PLUGINS CONFIG *************************/
s.usePlugins=true
function s_doPlugins(s) {
  /* Add calls to plugins here */
  var om_camp=new Array();
  if(om.getHashParam('ftag')!=''){om_camp.push('ftag:'+om.getHashParam('ftag'))}
  if(om.getHashParam('vndid')!=''){om_camp.push('vndid:'+om.getHashParam('vndid'))};
  if(s.getQueryParam('ttag')!=''){om_camp.push('ttag:'+s.getQueryParam('ttag'))};
  if(s.getQueryParam('utm_source')!=''){om_camp.push('utm_source:'+s.getQueryParam('utm_source'))};
  if(s.getQueryParam('utm_medium')!=''){om_camp.push('utm_medium:'+s.getQueryParam('utm_medium'))};
  if(s.getQueryParam('utm_campaign')!=''){om_camp.push('utm_campaign:'+s.getQueryParam('utm_campaign'))};
  if(s.getQueryParam('ftag')!=''){om_camp.push('ftag:'+s.getQueryParam('ftag'))};
  if(s.getQueryParam('vndid')!=''){om_camp.push('vndid:'+s.getQueryParam('vndid'))};
  if(s.getQueryParam('reg_success')=='1'){
    if(s.getValOnce(s.getQueryParam('reg_success'),'s_evts',30,'m')!=''){s.events='event75';} 
  };
  s.campaign=om_camp.join('|');
  s.eVar4=s.getQueryParam('tag');
  s.eVar45=s.getQueryParam('part');
  s.prop45="D=v45";
  s.eVar52=s.getVisitNum(30);
  s.eVar53=s.getNewRepeat(30,'s_getNewRepeat');
  s.eVar54=s.getDaysSinceLastVisit('s_lv_zdgl');
  s.eVar50=s.getTimeParting('h','-5');
  s.prop50="D=v50";
  s.eVar51=s.getTimeParting('d','-5');
  s.prop51="D=v51";

  var ppvArray = s.getPercentPageViewed(s.pageName);
  if(ppvArray){
    s.eVar55=ppvArray[0]+"|"+ppvArray[1]+"|"+ppvArray[2]+"|"+ppvArray[3];
    s.prop55="D=v55";
  }
  
  s.tnt=s.trackTNT();
}
s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");

/************************ getQueryParam 2.4 Start *************************/
/*
* Plugin: getQueryParam 2.4
*/
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/************************ getQueryParam 2.4 End *************************/

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 * -- includes auto calculation dst
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=X.split('|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else{d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else{if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else{s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else{d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
* Plugin: getValOnce_v1.1
*/
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
* Plugin: getPercentPageViewed v1.4
*/
s.handlePPVevents=new Function("",""
+"if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh"
+"t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,"
+"s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s."
+"d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documen"
+"tElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||"
+"(s.wd.document.documentElement.scrollTop||s.wd.document.body.scroll"
+"Top),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_pp"
+"v'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a[0]):"
+"escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>"
+"2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(pv>0)"
+"?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):'';s.c_w('s_pp"
+"v',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");

/************************ Test&Target Plugin Start *************************/
/*
* TNT Integration Plugin v1.0
*/
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
/*********************** Test&Target Plugin End *************************/


/* Audience Manager Manager POC */
if("function"!=typeof DIL)DIL=function(e,t){var n=[],r,i;e!==Object(e)&&(e={});var s,o,u,a,f,l,c,h,p,d,v;s=e.partner;o=e.containerNSID;u=e.iframeAttachmentDelay;a=!!e.disableDestinationPublishingIframe;f=e.iframeAkamaiHTTPS;l=e.mappings;c=e.uuidCookie;h=!0===e.enableErrorReporting;p=e.visitorService;d=e.declaredId;v=!0===e.removeFinishedScriptsAndCallbacks;var m,g,y;m=!0===e.disableScriptAttachment;g=!0===e.disableDefaultRequest;y=e.afterResultForDefaultRequest;h&&DIL.errorModule.activate();var b=!0===window._dil_unit_tests;(r=t)&&n.push(r+"");if(!s||"string"!=typeof s)return r="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:r,filename:"dil.js"}),Error(r);r="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(o||"number"==typeof o)o=parseInt(o,10),!isNaN(o)&&0<=o&&(r="");r&&(o=0,n.push(r),r="");i=DIL.getDil(s,o);if(i instanceof DIL&&i.api.getPartner()==s&&i.api.getContainerNSID()==o)return i;if(this instanceof DIL)DIL.registerDil(this,s,o);else return new DIL(e,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+s+" and containerNSID = "+o);var w={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},E={stuffed:{}},S={},x={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2e3,calledBack:!1,uuid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(e){try{if(!this.admsProcessingStarted){var t=this,n,r,i,s,o;if("function"==typeof e&&"function"==typeof e.getInstance){if(p===Object(p)&&(n=p.namespace)&&"string"==typeof n)r=e.getInstance(n);else{this.releaseType="no namespace";this.releaseRequests();return}if(r===Object(r)&&"function"==typeof r.isAllowed&&"function"==typeof r.getGlobalVisitorID){if(!r.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=r;this.admsProcessingStarted=!0;i=function(e){if("VisitorAPI"!=t.releaseType)t.uuid=e,t.releaseType="VisitorAPI",t.releaseRequests()};if(b&&(s=p.server)&&"string"==typeof s)r.server=s;o=r.getGlobalVisitorID(i);if("string"==typeof o&&o.length){i(o);return}setTimeout(function(){if("VisitorAPI"!=t.releaseType)t.releaseType="timeout",t.releaseRequests()},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(u){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;x.registerRequest()},getGlobalVisitorID:function(){return this.instance?this.instance.getGlobalVisitorID():null}},declaredId:{uuid:null,declaredId:{init:null,request:null},declaredIdCombos:{},dIdAlwaysOn:!1,dIdInRequest:!1,setDeclaredId:function(e,t){var n=k.isPopulatedString,r=encodeURIComponent;if(e===Object(e)&&n(t)){var i=e.dpid,s=e.dpuuid,o=null;if(n(i)&&n(s)){o=r(i)+"$"+r(s);if(!0===this.declaredIdCombos[o])return"setDeclaredId: combo exists for type '"+t+"'";this.declaredIdCombos[o]=!0;this.declaredId[t]={dpid:i,dpuuid:s};if("init"==t)this.dIdAlwaysOn=!0;else if("request"==t)this.dIdInRequest=!0;return"setDeclaredId: succeeded for type '"+t+"'"}}return"setDeclaredId: failed for type '"+t+"'"},getDeclaredIdQueryString:function(){var e=this.declaredId.request,t=this.declaredId.init,n="";null!==e?n="&d_dpid="+e.dpid+"&d_dpuuid="+e.dpuuid:null!==t&&(n="&d_dpid="+t.dpid+"&d_dpuuid="+t.dpuuid);return n},getUUIDQueryString:function(){var e=x.adms,t=k.isPopulatedString,n=!1,r=x.adms.getGlobalVisitorID();if(t(this.uuid)){if(t(r)&&this.uuid!=r)this.uuid=r}else this.uuid=r||e.uuid;if(this.dIdAlwaysOn||this.dIdInRequest)n=!0,this.dIdInRequest=!1;return t(this.uuid)&&n?"d_uuid="+this.uuid+"&":""}},registerRequest:function(e){var t=this.firingQueue;e===Object(e)&&t.push(e);if(!this.firing&&t.length)if(this.adms.calledBack){if(e=t.shift(),e.src=e.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.declaredId.getUUIDQueryString()+"d_nsid="),C.fireRequest(e),!this.firstRequestHasFired&&"script"==e.tag)this.firstRequestHasFired=!0}else this.processVisitorAPI()},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(e){if(!v)return"removeFinishedScriptsAndCallbacks is not boolean true";var t=this.toRemove,n,r;if(e===Object(e))n=e.script,r=e.callbackName,(n===Object(n)&&"SCRIPT"==n.nodeName||"no script created"==n)&&"string"==typeof r&&r.length&&t.push(e);if(this.readyToRemove&&t.length){r=t.shift();n=r.script;r=r.callbackName;"no script created"!=n?(e=n.src,n.parentNode.removeChild(n)):e=n;window[r]=null;try{delete window[r]}catch(i){}this.removed.push({scriptSrc:e,callbackName:r});DIL.variables.scriptsRemoved.push(e);DIL.variables.callbacksRemoved.push(r);return this.requestRemoval()}return"requestRemoval() processed"}};i=function(){var e="http://fast.";w.IS_HTTPS&&(e=!0===f?"https://fast.":"https://");return e+s+".demdex.net/dest4.html?d_nsid="+o+"#"+encodeURIComponent(document.location.href)};var T={THROTTLE_START:3e4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+s+"_"+o,url:i(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:w.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var e=this,t=document.createElement("iframe");t.id=this.id;t.style.cssText="display: none; width: 0; height: 0;";t.src=this.url;L.addListener(t,"load",function(){e.iframeHasLoaded=!0;e.requestToProcess()});document.body.appendChild(t);this.iframe=t},requestToProcess:function(e,t){var n=this;e&&!k.isEmptyObject(e)&&this.process(e,t);if(this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages){if(!this.throttleTimerSet)this.throttleTimerSet=!0,setTimeout(function(){n.messageSendingInterval=w.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START);this.sendingMessages=!0;this.sendMessages()}},process:function(e,t){var n=encodeURIComponent,r,i,s,o,u,a;t===Object(t)&&(a=L.encodeAndBuildRequest([x.declaredId.uuid||"",t.dpid||"",t.dpuuid||""],","));if((r=e.dests)&&r instanceof Array&&(i=r.length))for(s=0;s<i;s++)o=r[s],o=[n("dests"),n(o.id||""),n(o.y||""),n(o.c||"")],this.addMessage(o.join("|"));if((r=e.ibs)&&r instanceof Array&&(i=r.length))for(s=0;s<i;s++)o=r[s],o=[n("ibs"),n(o.id||""),n(o.tag||""),L.encodeAndBuildRequest(o.url||[],","),n(o.ttl||""),"",a],this.addMessage(o.join("|"));if((r=e.dpcalls)&&r instanceof Array&&(i=r.length))for(s=0;s<i;s++)o=r[s],u=o.callback||{},u=[u.obj||"",u.fn||"",u.key||"",u.tag||"",u.url||""],o=[n("dpm"),n(o.id||""),n(o.tag||""),L.encodeAndBuildRequest(o.url||[],","),n(o.ttl||""),L.encodeAndBuildRequest(u,","),a],this.addMessage(o.join("|"));this.jsonProcessed.push(e)},addMessage:function(e){var t=encodeURIComponent;this.messages.push((h?t("---destpub-debug---"):t("---destpub---"))+e)},sendMessages:function(){var e=this,t;this.messages.length?(t=this.messages.shift(),DIL.xd.postMessage(t,this.url,this.iframe.contentWindow),this.messagesPosted.push(t),setTimeout(function(){e.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},N={traits:function(e){if(k.isValidPdata(e)){if(!(S.sids instanceof Array))S.sids=[];L.extendArray(S.sids,e)}return this},pixels:function(e){if(k.isValidPdata(e)){if(!(S.pdata instanceof Array))S.pdata=[];L.extendArray(S.pdata,e)}return this},logs:function(e){if(k.isValidLogdata(e)){if(S.logdata!==Object(S.logdata))S.logdata={};L.extendObject(S.logdata,e)}return this},customQueryParams:function(e){k.isEmptyObject(e)||L.extendObject(S,e,x.reservedKeys);return this},signals:function(e,t){var n,r=e;if(!k.isEmptyObject(r)){if(t&&"string"==typeof t)for(n in r={},e)e.hasOwnProperty(n)&&(r[t+n]=e[n]);L.extendObject(S,r,x.reservedKeys)}return this},declaredId:function(e){x.declaredId.setDeclaredId(e,"request");return this},result:function(e){if("function"==typeof e)S.callback=e;return this},afterResult:function(e){if("function"==typeof e)S.postCallbackFn=e;return this},useImageRequest:function(){S.useImageRequest=!0;return this},clearData:function(){S={};return this},submit:function(e){C.submitRequest(S,e);S={};return this},getPartner:function(){return s},getContainerNSID:function(){return o},getEventLog:function(){return n},getState:function(){var e={},t={};L.extendObject(e,x,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});L.extendObject(t,T,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:S,otherRequestInfo:e,destinationPublishingInfo:t}},idSync:function(e){if(e!==Object(e)||"string"!=typeof e.dpid||!e.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof e.url||!e.url.length)return"Error: config.url is empty";var t=e.url,n=e.minutesToLive,r=encodeURIComponent,i=x.declaredId,t=t.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof n)n=20160;else if(n=parseInt(n,10),isNaN(n)||0>=n)return"Error: config.minutesToLive needs to be a positive number";i=L.encodeAndBuildRequest([x.adms.getGlobalVisitorID()||i.uuid||"",e.dpid,e.dpuuid||""],",");e=["ibs",r(e.dpid),"img",r(t),n,"",i];T.addMessage(e.join("|"));x.firstRequestHasFired&&T.requestToProcess();return"Successfully queued"},aamIdSync:function(e){if(e!==Object(e)||"string"!=typeof e.dpuuid||!e.dpuuid.length)return"Error: config or config.dpuuid is empty";e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid;return this.idSync(e)},passData:function(e){if(k.isEmptyObject(e))return"Error: json is empty or not an object";C.defaultCallback(e);return"json submitted for processing"}},C={submitRequest:function(e,t){x.registerRequest(C.createQueuedRequest(e,t));return!0},createQueuedRequest:function(e,t){var n=x,r,i=e.callback,u="img";if(!k.isEmptyObject(l)){var a,f,c;for(a in l)if(l.hasOwnProperty(a)&&(f=l[a],!(null==f||""===f)&&a in e&&!(f in e)&&!(f in x.reservedKeys)))c=e[a],null==c||""===c||(e[f]=c)}if(!k.isValidPdata(e.sids))e.sids=[];if(!k.isValidPdata(e.pdata))e.pdata=[];if(!k.isValidLogdata(e.logdata))e.logdata={};e.logdataArray=L.convertObjectToKeyValuePairs(e.logdata,"=",!0);e.logdataArray.push("_ts="+(new Date).getTime());if("function"!=typeof i)i=this.defaultCallback;if(n.useJSONP=!e.useImageRequest||"boolean"!=typeof e.useImageRequest)u="script",r=n.callbackPrefix+"_"+s+"_"+o+"_"+(new Date).getTime();return{tag:u,src:C.makeRequestSrc(e,r),internalCallbackName:r,callbackFn:i,postCallbackFn:e.postCallbackFn,useImageRequest:e.useImageRequest,requestData:e,useDocWrite:t===Object(t)&&!0===t.useDocumentWrite}},defaultCallback:function(e,t){var n,r,i,s,o,u,f,l,h;if((n=e.stuff)&&n instanceof Array&&(r=n.length))for(i=0;i<r;i++)if((s=n[i])&&s===Object(s)){o=s.cn;u=s.cv;f=s.ttl;if("undefined"==typeof f||""===f)f=Math.floor(L.getMaxCookieExpiresInMinutes()/60/24);l=s.dmn||"."+document.domain.replace(/^www\./,"");h=s.type;if(o&&(u||"number"==typeof u))"var"!=h&&(f=parseInt(f,10))&&!isNaN(f)&&L.setCookie(o,u,1440*f,"/",l,!1),E.stuffed[o]=u}n=e.uuid;r=x.declaredId;i=k.isPopulatedString;if(i(n)){if(!i(r.uuid))r.uuid=n;if(!k.isEmptyObject(c)){r=c.path;if("string"!=typeof r||!r.length)r="/";i=parseInt(c.days,10);isNaN(i)&&(i=100);L.setCookie(c.name||"aam_did",n,1440*i,r,c.domain||"."+document.domain.replace(/^www\./,""),!0===c.secure)}}!a&&!x.abortRequests&&T.requestToProcess(e,t)},makeRequestSrc:function(e,t){e.sids=k.removeEmptyArrayValues(e.sids||[]);e.pdata=k.removeEmptyArrayValues(e.pdata||[]);var n=x,r=L.encodeAndBuildRequest(e.sids,","),i=L.encodeAndBuildRequest(e.pdata,","),u=(e.logdataArray||[]).join("&");delete e.logdataArray;var a=w.IS_HTTPS?"https://":"http://",f=n.declaredId.getDeclaredIdQueryString(),l;l=[];var c,h,p,d;for(c in e)if(!(c in n.reservedKeys)&&e.hasOwnProperty(c))if(h=e[c],c=encodeURIComponent(c),h instanceof Array)for(p=0,d=h.length;p<d;p++)l.push(c+"="+encodeURIComponent(h[p]));else l.push(c+"="+encodeURIComponent(h));l=l.length?"&"+l.join("&"):"";return a+s+".demdex.net/event?d_nsid="+o+f+(r.length?"&d_sid="+r:"")+(i.length?"&d_px="+i:"")+(u.length?"&d_ld="+encodeURIComponent(u):"")+l+(n.useJSONP?"&d_rtbd=json&d_jsonv="+DIL.jsonVersion+"&d_dst=1&d_cts=1&d_cb="+(t||""):"")},fireRequest:function(e){if("img"==e.tag)this.fireImage(e);else if("script"==e.tag){var t=x.declaredId,t=t.declaredId.request||t.declaredId.init||{};this.fireScript(e,{dpid:t.dpid||"",dpuuid:t.dpuuid||""})}},fireImage:function(e){var t=x,i,s;if(!t.abortRequests)t.firing=!0,i=new Image(0,0),t.sent.push(e),i.onload=function(){t.firing=!1;t.fired.push(e);t.num_of_img_responses++;t.registerRequest()},s=function(i){r="imgAbortOrErrorHandler received the event of type "+i.type;n.push(r);t.abortRequests=!0;t.firing=!1;t.errored.push(e);t.num_of_img_errors++;t.registerRequest()},i.addEventListener?(i.addEventListener("error",s,!1),i.addEventListener("abort",s,!1)):i.attachEvent&&(i.attachEvent("onerror",s),i.attachEvent("onabort",s)),i.src=e.src},fireScript:function(e,t){var i=this,o=x,u,a,f=e.src,l=e.postCallbackFn,c="function"==typeof l,h=e.internalCallbackName;u=e.useDocWrite;if(!o.abortRequests){o.firing=!0;window[h]=function(i){try{i!==Object(i)&&(i={});var u=e.callbackFn;o.firing=!1;o.fired.push(e);o.num_of_jsonp_responses++;u(i,t);c&&l(i,t)}catch(f){f.message="DIL jsonp callback caught error with message "+f.message;r=f.message;n.push(r);f.filename=f.filename||"dil.js";f.partner=s;DIL.errorModule.handleError(f);try{u({error:f.name+"|"+f.message}),c&&l({error:f.name+"|"+f.message})}catch(p){}}finally{o.requestRemoval({script:a,callbackName:h}),o.registerRequest()}};var p=function(){o.firing=!1;o.requestRemoval({script:"no script created",callbackName:h})};m?p():u?DIL.windowLoaded||"complete"==document.readyState||"loaded"==document.readyState?(e.useDocWriteSuccessful=!1,p()):(document.write('<script type="text/javascript" src="'+f+'" id="'+h+'"></script>'),a=document.getElementById(h),e.useDocWriteSuccessful=!0):(a=document.createElement("script"),a.addEventListener&&a.addEventListener("error",function(t){o.requestRemoval({script:a,callbackName:h});r="jsonp script tag error listener received the event of type "+t.type+" with src "+f;i.handleScriptError(r,e)},!1),a.type="text/javascript",a.src=f,u=DIL.variables.scriptNodeList[0],u.parentNode.insertBefore(a,u));o.sent.push(e);o.declaredId.declaredId.request=null}},handleScriptError:function(e,t){var r=x;n.push(e);r.abortRequests=!0;r.firing=!1;r.errored.push(t);r.num_of_jsonp_errors++;r.registerRequest()}},k={isValidPdata:function(e){return e instanceof Array&&this.removeEmptyArrayValues(e).length?!0:!1},isValidLogdata:function(e){return!this.isEmptyObject(e)},isEmptyObject:function(e){if(e!==Object(e))return!0;for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},removeEmptyArrayValues:function(e){for(var t=0,n=e.length,r,i=[],t=0;t<n;t++)r=e[t],"undefined"!=typeof r&&null!=r&&i.push(r);return i},isPopulatedString:function(e){return"string"==typeof e&&e.length}},L={addListener:function(){if(document.addEventListener)return function(e,t,n){e.addEventListener(t,function(e){"function"==typeof n&&n(e)},!1)};if(document.attachEvent)return function(e,t,n){e.attachEvent("on"+t,function(e){"function"==typeof n&&n(e)})}}(),convertObjectToKeyValuePairs:function(e,t,n){var r=[],t=t||"=",i,s;for(i in e)s=e[i],"undefined"!=typeof s&&null!=s&&r.push(i+t+(n?encodeURIComponent(s):s));return r},encodeAndBuildRequest:function(e,t){return this.map(e,function(e){return encodeURIComponent(e)}).join(t)},map:function(e,t){if(Array.prototype.map)return e.map(t);if(void 0===e||null===e)throw new TypeError;var n=Object(e),r=n.length>>>0;if("function"!==typeof t)throw new TypeError;for(var i=Array(r),s=0;s<r;s++)s in n&&(i[s]=t.call(t,n[s],s,n));return i},filter:function(e,t){if(!Array.prototype.filter){if(void 0===e||null===e)throw new TypeError;var n=Object(e),r=n.length>>>0;if("function"!==typeof t)throw new TypeError;for(var i=[],s=0;s<r;s++)if(s in n){var o=n[s];t.call(t,o,s,n)&&i.push(o)}return i}return e.filter(t)},getCookie:function(e){var e=e+"=",t=document.cookie.split(";"),n,r,i;for(n=0,r=t.length;n<r;n++){for(i=t[n];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(e))return decodeURIComponent(i.substring(e.length,i.length))}return null},setCookie:function(e,t,n,r,i,s){var o=new Date;n&&(n*=6e4);document.cookie=e+"="+encodeURIComponent(t)+(n?";expires="+(new Date(o.getTime()+n)).toUTCString():"")+(r?";path="+r:"")+(i?";domain="+i:"")+(s?";secure":"")},extendArray:function(e,t){return e instanceof Array&&t instanceof Array?(Array.prototype.push.apply(e,t),!0):!1},extendObject:function(e,t,n){var r;if(e===Object(e)&&t===Object(t)){for(r in t)if(t.hasOwnProperty(r)&&(k.isEmptyObject(n)||!(r in n)))e[r]=t[r];return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(w.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1e3/60}};"error"==s&&0==o&&L.addListener(window,"load",function(){DIL.windowLoaded=!0});var A=function(){O();!a&&!x.abortRequests&&T.attachIframe();x.readyToRemove=!0;x.requestRemoval()},O=function(){a||setTimeout(function(){!g&&!x.firstRequestHasFired&&!x.adms.admsProcessingStarted&&!x.adms.calledBack&&("function"==typeof y?N.afterResult(y).submit():N.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},M=document;"error"!=s&&(DIL.windowLoaded?A():"complete"!=M.readyState&&"loaded"!=M.readyState?L.addListener(window,"load",A):DIL.isAddedPostWindowLoadWasCalled?L.addListener(window,"load",A):(u="number"==typeof u?parseInt(u,10):0,0>u&&(u=0),setTimeout(A,u||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));x.declaredId.setDeclaredId(d,"init");this.api=N;this.getStuffedVariable=function(e){var t=E.stuffed[e];!t&&"number"!=typeof t&&(t=L.getCookie(e),!t&&"number"!=typeof t&&(t=""));return t};this.validators=k;this.helpers=L;this.constants=w;this.log=n;if(b)this.pendingRequest=S,this.requestController=x,this.setDestinationPublishingUrl=i,this.destinationPublishing=T,this.requestProcs=C,this.variables=E},function(){var e=document,t;if(null==e.readyState&&e.addEventListener)e.readyState="loading",e.addEventListener("DOMContentLoaded",t=function(){e.removeEventListener("DOMContentLoaded",t,!1);e.readyState="complete"},!1)}(),DIL.extendStaticPropertiesAndMethods=function(e){var t;if(e===Object(e))for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])},DIL.extendStaticPropertiesAndMethods({version:"4.4",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(e){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof e?!!e():"boolean"==typeof e?e:!0},create:function(e){try{return new DIL(e)}catch(t){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(e,t,n){t=t+"$"+n;t in this.dils||(this.dils[t]=e)},getDil:function(e,t){var n;"string"!=typeof e&&(e="");t||(t=0);n=e+"$"+t;return n in this.dils?this.dils[n]:Error("The DIL instance with partner = "+e+" and containerNSID = "+t+" was not found")},dexGetQSVars:function(e,t,n){t=this.getDil(t,n);return t instanceof this?t.getStuffedVariable(e):""},xd:{postMessage:function(e,t,n){var r=1;if(t)if(window.postMessage)n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1"));else if(t)n.location=t.replace(/#.*$/,"")+"#"+ +(new Date)+r++ +"&"+e}}}),DIL.errorModule=function(){var e=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),t={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},n=!1;return{activate:function(){n=!0},handleError:function(r){if(!n)return"DIL error module has not been activated";r!==Object(r)&&(r={});var i=r.name?(new String(r.name)).toLowerCase():"",s=[],r={name:i,filename:r.filename?r.filename+"":"",partner:r.partner?r.partner+"":"no_partner",site:r.site?r.site+"":document.location.href,message:r.message?r.message+"":""};s.push(i in t?t[i]:t.noerrortypedefined);e.api.pixels(s).logs(r).useImageRequest().submit();return"DIL error report sent"},pixelMap:t}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(e,t,n){var r="",t=t||"Error caught in DIL module/submodule: ";e===Object(e)?r=t+(e.message||"err has no message"):(r=t+"err is not a valid object",e={});e.message=r;if(n instanceof DIL)e.partner=n.api.getPartner();DIL.errorModule.handleError(e);return this.errorMessage=r}}};DIL.tools.getSearchReferrer=function(e,t){var n=DIL.getDil("error"),r=DIL.tools.decomposeURI(e||document.referrer),i="",s="",o={queryParam:"q"},i=n.helpers.filter([t===Object(t)?t:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(e){return!(!e.hasOwnProperty("hostPattern")||!r.hostname.match(e.hostPattern))}).shift();return!i?{valid:!1,name:"",keywords:""}:{valid:!0,name:r.hostname,keywords:(n.helpers.extendObject(o,i),s=o.queryPattern?(i=(""+r.search).match(o.queryPattern))?i[1]:"":r.uriParams[o.queryParam],decodeURIComponent(s||"").replace(/\+|%20/g," "))}};DIL.tools.decomposeURI=function(e){var t=DIL.getDil("error"),n=document.createElement("a");n.href=e||document.referrer;return{hash:n.hash,host:n.host.split(":").shift(),hostname:n.hostname,href:n.href,pathname:n.pathname.replace(/^\//,""),protocol:n.protocol,search:n.search,uriParams:function(e,n){t.helpers.map(n.split("&"),function(t){t=t.split("=");e[t.shift()]=t.shift()});return e}({},n.search.replace(/^(\/|\?)?|\/$/g,""))}};DIL.tools.getMetaTags=function(){var e={},t=document.getElementsByTagName("meta"),n,r,i,s,o;for(n=0,i=arguments.length;n<i;n++)if(s=arguments[n],null!==s)for(r=0;r<t.length;r++)if(o=t[r],o.name==s){e[s]=o.content;break}return e};DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(e,t,n){try{var r=this,i={name:"DIL Site Catalyst Module Error"},s=function(e){i.message=e;DIL.errorModule.handleError(i);return e};this.dil=null;if(t instanceof DIL)this.dil=t;else return s("dilInstance is not a valid instance of DIL");i.partner=t.api.getPartner();if(e!==Object(e))return s("siteCatalystReportingSuite is not an object");if("function"!=typeof e.m_i||"function"!=typeof e.loadModule)return s("s.m_i is not a function or s.loadModule is not a function");e.m_DIL=function(e){e=e.m_i("DIL");if(e!==Object(e))return s("m is not an object");e.trackVars=r.constructTrackVars(n);e.d=0;e._t=function(){var e,t,n=","+this.trackVars+",",r=this.s,i,o=[];i=[];var u={},a=!1;if(r!==Object(r)||!(r.va_t instanceof Array))return s("Error in m._t function: s is not an object or s.va_t is not an array");if(this.d){if(r.lightProfileID)(e=r.lightTrackVars)&&(e=","+e+","+r.vl_mr+",");else if(r.pe||r.linkType){e=r.linkTrackVars;if(r.pe&&(t=r.pe.substring(0,1).toUpperCase()+r.pe.substring(1),r[t]))e=r[t].trackVars;e&&(e=","+e+","+r.vl_l+","+r.vl_l2+",")}if(e){for(t=0,o=e.split(",");t<o.length;t++)0<=n.indexOf(","+o[t]+",")&&i.push(o[t]);i.length&&(n=","+i.join(",")+",")}for(i=0,t=r.va_t.length;i<t;i++)e=r.va_t[i],0<=n.indexOf(","+e+",")&&null!=r[e]&&""!==r[e]&&(u[e]=r[e],a=!0);a&&this.d.api.signals(u,"c_").submit()}};e.setup=function(){this.d=t}};e.loadModule("DIL");if(e.DIL!==Object(e.DIL)||"function"!=typeof e.DIL.setup)return s("s.DIL is not an object or s.DIL.setup is not a function");e.DIL.setup();if(i.message)return i.message}catch(o){return this.handle(o,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(e){var t=[],n,r,i,s,o;if(e===Object(e)){n=e.names;if(n instanceof Array&&(i=n.length))for(r=0;r<i;r++)s=n[r],"string"==typeof s&&s.length&&t.push(s);e=e.iteratedNames;if(e instanceof Array&&(i=e.length))for(r=0;r<i;r++)if(n=e[r],n===Object(n)&&(s=n.name,o=parseInt(n.maxIndex,10),"string"==typeof s&&s.length&&!isNaN(o)&&0<=o))for(n=0;n<=o;n++)t.push(s+n);if(t.length)return t.join(",")}return this.constructTrackVars({names:"pageName,channel,campaign,products,events,pe,pev1,pev2,pev3".split(","),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(e,t,n){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var r={name:"DIL GA Module Error"},i="";t instanceof DIL?(this.dil=t,r.partner=this.dil.api.getPartner()):(i="dilInstance is not a valid instance of DIL",r.message=i,DIL.errorModule.handleError(r));!(e instanceof Array)||!e.length?(i="gaArray is not an array or is empty",r.message=i,DIL.errorModule.handleError(r)):this.arr=e;this.tv=this.constructTrackVars(n);this.errorMessage=i}catch(s){this.handle(s,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(e){var t=[],n,r,i,s;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){i=this.defaultTrackVars;s={};for(n=0,r=i.length;n<r;n++)s[i[n]]=!0;this.defaultTrackVarsObj=s}else s=this.defaultTrackVarsObj;if(e===Object(e)){e=e.names;if(e instanceof Array&&(r=e.length))for(n=0;n<r;n++)i=e[n],"string"==typeof i&&i.length&&i in s&&t.push(i);if(t.length)return t}return this.defaultTrackVars},constructGAObj:function(e){var t={},e=e instanceof Array?e:this.arr,n,r,i,s;for(n=0,r=e.length;n<r;n++)i=e[n],i instanceof Array&&i.length&&(i=[],s=e[n],i instanceof Array&&s instanceof Array&&Array.prototype.push.apply(i,s),s=i.shift(),"string"==typeof s&&s.length&&(t[s]instanceof Array||(t[s]=[]),t[s].push(i)));return t},addToSignals:function(e,t){if("string"!=typeof e||""===e||null==t||""===t)return!1;this.signals[e]instanceof Array||(this.signals[e]=[]);this.signals[e].push(t);return this.hasSignals=!0},constructSignals:function(){var e=this.constructGAObj(),t={_setAccount:function(e){this.addToSignals("c_accountId",e)},_setCustomVar:function(e,t,n){"string"==typeof t&&t.length&&this.addToSignals("c_"+t,n)},_addItem:function(e,t,n,r,i,s){this.addToSignals("c_itemOrderId",e);this.addToSignals("c_itemSku",t);this.addToSignals("c_itemName",n);this.addToSignals("c_itemCategory",r);this.addToSignals("c_itemPrice",i);this.addToSignals("c_itemQuantity",s)},_addTrans:function(e,t,n,r,i,s,o,u){this.addToSignals("c_transOrderId",e);this.addToSignals("c_transAffiliation",t);this.addToSignals("c_transTotal",n);this.addToSignals("c_transTax",r);this.addToSignals("c_transShipping",i);this.addToSignals("c_transCity",s);this.addToSignals("c_transState",o);this.addToSignals("c_transCountry",u)},_trackSocial:function(e,t,n,r){this.addToSignals("c_socialNetwork",e);this.addToSignals("c_socialAction",t);this.addToSignals("c_socialTarget",n);this.addToSignals("c_socialPagePath",r)}},n=this.tv,r,i,s,o,u,a;for(r=0,i=n.length;r<i;r++)if(s=n[r],e.hasOwnProperty(s)&&t.hasOwnProperty(s)&&(a=e[s],a instanceof Array))for(o=0,u=a.length;o<u;o++)t[s].apply(this,a[o])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(e){return this.handle(e,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(e,t,n){try{this.callback=this.dil=null,this.errorMessage="",e instanceof DIL?(this.dil=e,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(t)?t:"aam_ga",this.delimiter=this.v(n)?n:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(r){this.handle(r,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(e){var t,n,r,i,s,o;o=!1;var u=1;if(e===Object(e)&&(t=e.stuff)&&t instanceof Array&&(n=t.length))for(e=0;e<n;e++)if((r=t[e])&&r===Object(r))if(i=r.cn,s=r.cv,i==this.cookieName&&this.v(s)){o=!0;break}if(o){t=s.split(this.delimiter);if("undefined"==typeof window._gaq)window._gaq=[];r=window._gaq;for(e=0,n=t.length;e<n&&!(o=t[e].split("="),s=o[0],o=o[1],this.v(s)&&this.v(o)&&r.push(["_setCustomVar",u++,s,o,1]),u>this.LIMIT);e++);this.errorMessage=1<u?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var e=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(t){e.process(t)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(t){return this.handle(t,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(e,t,n){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=n===Object(n)?n:{};var n={name:"DIL Peer39 Module Error"},r=[],i="";if(this.isSecurePageButNotEnabled(document.location.protocol))i="Module has not been enabled for a secure page",r.push(i),n.message=i,DIL.errorModule.handleError(n);t instanceof DIL?(this.dil=t,n.partner=this.dil.api.getPartner()):(i="dilInstance is not a valid instance of DIL",r.push(i),n.message=i,DIL.errorModule.handleError(n));"string"!=typeof e||!e.length?(i="aid is not a string or is empty",r.push(i),n.message=i,DIL.errorModule.handleError(n)):this.aid=e;this.errorMessage=r.join("\n")}catch(s){this.handle(s,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(e){return"https:"==e&&!0!==this.optionals.enableHTTPS?!0:!1},constructSignals:function(){var e=this,t=this.constructScript(),n=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var t=e.processData(p39_KVP_Short("c_p","|").split("|"));t.hasSignals&&e.dil.api.signals(t.signals).submit()}catch(n){}finally{e.calledBack=!0,"function"==typeof e.optionals.afterResult&&e.optionals.afterResult()}};n.parentNode.insertBefore(t,n);this.scriptsSent.push(t);return"Request sent to Peer39"},processData:function(e){var t,n,r,i,s={},o=!1;this.returnedData.push(e);if(e instanceof Array)for(t=0,n=e.length;t<n;t++)r=e[t].split("="),i=r[0],r=r[1],i&&isFinite(r)&&!isNaN(parseInt(r,10))&&(s[i]instanceof Array||(s[i]=[]),s[i].push(r),o=!0);return{hasSignals:o,signals:s}},constructScript:function(){var e=document.createElement("script"),t=this.optionals,n=t.scriptId,r=t.scriptSrc,t=t.scriptParams;e.id="string"==typeof n&&n.length?n:"peer39ScriptLoader";e.type="text/javascript";"string"==typeof r&&r.length?e.src=r:(e.src=(this.dil.constants.IS_HTTPS?"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof t&&t.length&&(e.src+="?"+t));return e},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(e){return this.handle(e,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};var _scDilObj=s_gi(s_account);var cbsiDil=DIL.create({partner:"cbsi",uuidCookie:{name:"aam_uuid",days:30}});DIL.modules.siteCatalyst.init(_scDilObj,cbsiDil,{names:["pageName","channel","campaign","products","events","pe","referrer","server","purchaseID","zip","state"],iteratedNames:[{name:"eVar",maxIndex:75},{name:"prop",maxIndex:75},{name:"pev",maxIndex:3},{name:"hier",maxIndex:4},{name:"list",maxIndex:3}]})	

// Optimizely SiteCatalyst Integration
window.optimizely = window.optimizely || [];
window.optimizely.push("activateSiteCatalyst");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "cbsinteractive"
s.trackingServer = "om.cbsi.com"
s.trackingServerSecure = "som.cbsi.com"

s.setTagContainer("cnetzdnetglobalsite")
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase()"
+";else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.t"
+"cn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[u"
+"n]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;retur"
+"n ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if("
+"!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nr"
+"s){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'"
+"].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return '"
+"'}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=="
+"'s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x"
+";i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h."
+"substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length"
+">1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.lengt"
+"h;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.subst"
+"ring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nf"
+"l[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!n"
+"fl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk."
+"substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+"
+"ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',"
+"fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring("
+"0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+"
+"s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!="
+"'linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substrin"
+"g(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&"
+"&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1"
+"';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k"
+"=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascri"
+"ptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='h"
+"omepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k"
+"=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')"
+"q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eV"
+"ar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'"
+"';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLow"
+"erCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h"
+"=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||"
+"s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e"
+");return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s"
+".bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTr"
+"acking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t("
+");s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\""
+"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||(s.wd.name&&t==s.wd.name))){e.stopPropagation();e.stopI"
+"mmediatePropagation();e.preventDefault();n=s.d.createEvent(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.alt"
+"Key,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_fe=1;s.bct=e.target;s.bce=n}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h."
+"indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.ho"
+"st:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.to"
+"UpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=thi"
+"s,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''"
+"+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t"
+"=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u"
+"+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)re"
+"turn s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return "
+"0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',"
+"q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&"
+"s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i"
+"<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=f"
+"unction(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebKit')>=0"
+"&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,"
+"v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%"
+"10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.subst"
+"ring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if"
+"(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){v"
+"ar s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r"
+",l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s"
+";m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l="
+"m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c="
+"s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if("
+"x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,"
+"i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m"
+"[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl"
+",i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':'"
+");if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');"
+"i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'"
+"')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s"
+".d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,"
+"100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m"
+"=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x"
+" in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=n"
+"ew Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if("
+"!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if"
+"(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Mat"
+"h.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return f"
+"id};s.applyADMS=function(){var s=this,vb=new Object;if(s.wd.ADMS&&!s.visitorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_"
+"c_il['+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorID=v;s.admsq=0;if(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!vi"
+"sitorID']=0;s.admsq.push(vb);return 1}else{if(s.visitorID==-1)s.visitorID=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*100000000"
+"00000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds("
+")+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i"
+",x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&"
+"s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1"
+".7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaE"
+"nabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){"
+"bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\""
+":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)whi"
+"le(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.bro"
+"wserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);i"
+"f(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s."
+"eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if"
+"(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeav"
+"eQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else t"
+"rk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-o"
+"bject-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;"
+"if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt("
+"oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','"
+"var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+("
+"x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('"
+"t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType"
+"=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType="
+"t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){va"
+"r s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s"
+"[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf("
+"'s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i"
+"<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElements"
+"ByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf"
+"('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6"
+"));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.e"
+"m=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visito"
+"rID,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCod"
+"e,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookie"
+"DomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,e"
+"vents,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va"
+"_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t"
+"+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dy"
+"namicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilter"
+"s,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();i"
+"f(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


s_tc_cnetzdnetglobalsite.cl=[{p:[{t:'c',c:'s.maxDelay=750\ns.loadModule("Integrate")\n\ns.Integrate.onLoad=function(s,m){\n\n	/* BEGIN: ClickTale */\n	s.Integrate.add("ClickTale");\n	s.Integrate.ClickTale.sessionVar="eVar68";\n	s.Integrate.ClickTale.setVars=function(s,p){\n		if(typeof ClickTaleGetUID==\'function\'){\n			//s[p.sessionVar]=ClickTaleGetUID()\n			s[p.sessionVar]=s.readCookie(ClickTaleUIDCookieName)\n		}\n	}\n	s.Integrate.ClickTale.delay();\n	/* END: ClickTale */\n	\n}\ns.readCookie=function(n)\n{\n   var nameEQ = n + "=";\n   var ca = document.cookie.split(\';\');\n   for(var i=0;i < ca.length;i++)\n   {\n      var c = ca[i];\n      while (c.charAt(0)==\' \') c = c.substring(1,c.length);\n      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);\n   }\n   return null;\n}\n\n/* IMPORTANT: The following Module may already be included and does not need to be added to the s_code twice */\n\n/****************************** MODULES *****************************/\n/* Module: Integrate */\ns.m_Integrate_c="var m=s.m_i(\'Integrate\');m.add=function(n,o){var m=this,p;if(!o)o=\'s_Integrate_\'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"\n+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?\'use\':\'set\')+\'Vars\',tcf;for(i=0;i<m.l.length;i++){p=m[m."\n+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function(\'s\',\'p\',\'f\',\'var e;try{p[f](s,p)}catch(e){}\');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"\n+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != \'http\')u=\'http://\'+u;if(s.ssl)u=s.rep(u,\'http:\',\'https:\');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"\n+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf(\'[\',x);if(x>=0){y=u.indexOf(\']\',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)==\'s."\n+"\'){v=s[z.substring(2)];if(!v)v=\'\'}else{v=\'\'+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z)u=u.substring(0,x)+s.rep(escape(v),\'+\',\'%2B\')+u.substring(y+1);x=y}}}return u};m.get=function(u,v){var p"\n+"=this,m=p._m;if(!p.disable){if(!v)v=\'s_\'+m._in+\'_Integrate_\'+p._n+\'_get_\'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule(\'Integrate:\'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p."\n+"_d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=func"\n+"tion(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn=\'s_i_\'+m._in+\'_Integ"\n+"rate_\'+p._n+\'_\'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;"\n+"if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";\ns.m_i("Integrate");'}]},
{p:[{t:'s',u:'http://www.everestjs.net/static/st.v2.js'}]},
{p:[{t:'c',c:'var ef_event_type="pageview";\nvar ef_pageview_properties = "";\nvar ef_segment = "12969";\nvar ef_search_segment = "";\nvar ef_userid="4083";\nvar ef_pixel_host="pixel.everesttech.net";\nvar ef_fb_is_app = 0;\nvar ef_allow_3rd_party_pixels = 1;\neffp();'}]},
{p:[{t:'c',c:'(function(){var g=function(e,h,f,g){\nthis.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};\nthis.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};\nthis.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};\nthis.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g+ "&t=" + (new Date()).getTime();document.body&&document.body.appendChild(a)}};\nthis.start=function(){var a=this;window.addEventListener?window.addEventListener("load",function(){a.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){a.go()})}};\ntry{(new g(100,"r","QSI_S_ZN_3xeBFJDuSs0SRW5","//zn_3xebfjduss0srw5-cbs.siteintercept.qualtrics.com/WRSiteInterceptEngine/?Q_ZID=ZN_3xeBFJDuSs0SRW5&Q_LOC="+encodeURIComponent(window.location.href))).start()}catch(i){}})();'}]}];
s_tc_cnetzdnetglobalsite.cr();