
/* File BEGIN: http://fm.cnbc.com/applications/cnbc.com/staticcontent/scripts/libraries/Partner/available_partner_experiences.1.js?t=1415322275 */
var availablePartnerExperiences=[{"partner_name":"xfinity","partner_home_nodes":[100291100],"partner_home_urls":["xfinity.cnbc.com"],"partner_referers":["http://philly.xfinity.comcast.net/","mr.qa.xfinity.comcast.net","xfinity.comcast.net","finance.comcast.net","staging.xfinity.comcast.net","comcast.com","customer.comcast.com","xfinitytv.comcast.net","xfinityconnect.mail.comcast.net","search.comcast.net"],"partner_experience_ttl_in_hours":"1"}];


/* File BEGIN: http://fm.cnbc.com/applications/cnbc.com/staticcontent/scripts/libraries/Partner/partner_experience.1.js?t=1415322275 */
var CNBC_Partner_Experience={};(function(){if(!('indexOf'in Array.prototype)){Array.prototype.indexOf=function(find,i){if(i===undefined)i=0;if(i<0)i+=this.length;if(i<0)i=0;for(var n=this.length;i<n;i++)
if(i in this&&this[i]===find)
return i;return-1;};}})();(function(){window.activePartnerExperience="";CNBC_Partner_Experience.pageNodeId=0;CNBC_Partner_Experience.docReferrer="";CNBC_Partner_Experience.init=function(args){args=args||{};this.pExperiences=args.availablePartnerExperiences||[];if(this.pExperiences.length==0){return"";}else{this.pageNodeId=Number(window.location.pathname.split("/").splice(2,1))||this.pageNodeId;this.docReferrer=document.referrer||this.docReferrer;window.activePartnerExperience=this.checkPartners();}};CNBC_Partner_Experience.checkPartners=function(){for(var i in this.pExperiences){var pExperiences=this.pExperiences[i];var partnerName=pExperiences.partner_name;this.partnerHomeNodes=pExperiences.partner_home_nodes;this.partnerHomeURLs=pExperiences.partner_home_urls;this.partnerReferrers=pExperiences.partner_referers;var partnerTTL=Number(pExperiences.partner_experience_ttl_in_hours);var activePartnerExp=this.readCookie('active_partner_exp');if(this.partnerHomeNodes.indexOf(this.pageNodeId)!=-1){if(activePartnerExp!=""){return activePartnerExp;}
if(activePartnerExp!=partnerName){this.createCookie('active_partner_exp',partnerName,partnerTTL);}
if(this.checkReferrer(this.docReferrer)){this.createCookie('active_partner_exp',partnerName,partnerTTL);}
return partnerName;}else if(this.partnerHomeURLs.indexOf(window.location.hostname)!=-1){if(activePartnerExp!=""){return activePartnerExp;}
if(activePartnerExp!=partnerName){this.createCookie('active_partner_exp',partnerName,partnerTTL);}
if(this.checkReferrer(this.docReferrer)){this.createCookie('active_partner_exp',partnerName,partnerTTL);}
return partnerName;}else if(this.checkReferrer(this.docReferrer)){this.createCookie('active_partner_exp',partnerName,partnerTTL);return partnerName;}else{return activePartnerExp;}
this.partnerReferrers=[];this.partnerHomeNodes=[];return"";}};CNBC_Partner_Experience.checkReferrer=function(docReferrer){for(var i in this.partnerReferrers){if(docReferrer.indexOf(this.partnerReferrers[i])!=-1){return true;}}
return false;};CNBC_Partner_Experience.createCookie=function(name,value,hours){if(hours!=0){var date=new Date();date.setHours(date.getHours()+hours);expires=';expires='+date.toUTCString();}else{expires="";}
document.cookie=name+"="+value+expires+";domain=.cnbc.com;path=/";};CNBC_Partner_Experience.parseCookieValues=function(name,data){for(var i=0,len=data.length;i<len;i++){var c=data[i];while(c.charAt(0)==' '){c=c.substring(1,c.length);};if(c.indexOf(name)==0){return c.substring(name.length,c.length);}};return"";};CNBC_Partner_Experience.readCookie=function(name){var nameEQ=name+"=";var result=this.parseCookieValues(nameEQ,document.cookie.split(';'));if(result==null){var unescaped=unescape(document.cookie);result=this.parseCookieValues(nameEQ,unescaped.split(';'));};return result;};})();CNBC_Partner_Experience.init({availablePartnerExperiences:window.availablePartnerExperiences});

