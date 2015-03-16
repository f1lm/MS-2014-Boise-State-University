			
// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// PID: 8614
// Generated on: 3/11/2015 6:23:51 AM (UTC 3/11/2015 11:23:51 AM)

(function(){var f=!0,g=!1,i=this;
function l(b){var a=typeof b;if("object"==a)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return a;var c=Object.prototype.toString.call(b);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
a&&"undefined"==typeof b.call)return"object";return a};var n,o,p,q;function r(){return i.navigator?i.navigator.userAgent:null}q=p=o=n=g;var t;if(t=r()){var u=i.navigator;n=0==t.indexOf("Opera");o=!n&&-1!=t.indexOf("MSIE");p=!n&&-1!=t.indexOf("WebKit");q=!n&&!p&&"Gecko"==u.product}var w=n,x=o,y=q,z=p,A;
a:{var B="",C;if(w&&i.opera)var D=i.opera.version,B="function"==typeof D?D():D;else if(y?C=/rv\:([^\);]+)(\)|;)/:x?C=/MSIE\s+([^\);]+)(\)|;)/:z&&(C=/WebKit\/(\S+)/),C)var E=C.exec(r()),B=E?E[1]:"";if(x){var F,G=i.document;F=G?G.documentMode:void 0;if(F>parseFloat(B)){A=""+F;break a}}A=B}var H={};
function I(b){var a;if(!(a=H[b])){a=0;for(var c=(""+A).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),h=(""+b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=Math.max(c.length,h.length),e=0;0==a&&e<d;e++){var m=c[e]||"",v=h[e]||"",aa=RegExp("(\\d*)(\\D*)","g"),ba=RegExp("(\\d*)(\\D*)","g");do{var j=aa.exec(m)||["","",""],k=ba.exec(v)||["","",""];if(0==j[0].length&&0==k[0].length)break;a=((0==j[1].length?0:parseInt(j[1],10))<(0==k[1].length?0:parseInt(k[1],10))?-1:(0==j[1].length?0:parseInt(j[1],
10))>(0==k[1].length?0:parseInt(k[1],10))?1:0)||((0==j[2].length)<(0==k[2].length)?-1:(0==j[2].length)>(0==k[2].length)?1:0)||(j[2]<k[2]?-1:j[2]>k[2]?1:0)}while(0==a)}a=H[b]=0<=a}return a}var J={};function K(){J[9]||(J[9]=x&&!!document.documentMode&&9<=document.documentMode)};!x||K();!x||K();x&&I("8");!z||I("528");y&&I("1.9b")||x&&I("8")||w&&I("9.5")||z&&I("528");!y||I("8");function L(b,a,c,h,d){b&&a&&("undefined"==typeof c&&(c=1E3),"undefined"==typeof h&&(h=20),0>--h?"function"===typeof d&&d():a()?b():setTimeout(function(){L(b,a,c,h,d)},c))};function ca(b){function a(){c||(c=f,b())}var c=g;if("complete"===document.readyState||"interactive"===document.readyState)a();else{if(document.addEventListener)document.addEventListener("DOMContentLoaded",a,g);else if(document.attachEvent){try{var h=null!=window.frameElement}catch(d){}if(document.documentElement.doScroll&&!h){var e=function(){if(!c)try{document.documentElement.doScroll("left"),a()}catch(b){setTimeout(e,10)}};e()}document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&
a()})}if(window.addEventListener)window.addEventListener("load",a,g);else if(window.attachEvent)window.attachEvent("onload",a);else{var m=window.onload;window.onload=function(){m&&m();a()}}}};function M(b){this.b=b}M.prototype.serialize=function(b){var a=[];N(this,b,a);return a.join("")};
function N(b,a,c){switch(typeof a){case "string":O(a,c);break;case "number":c.push(isFinite(a)&&!isNaN(a)?a:"null");break;case "boolean":c.push(a);break;case "undefined":c.push("null");break;case "object":if(null==a){c.push("null");break}if("array"==l(a)){var h=a.length;c.push("[");for(var d="",e=0;e<h;e++)c.push(d),d=a[e],N(b,b.b?b.b.call(a,""+e,d):d,c),d=",";c.push("]");break}c.push("{");h="";for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(d=a[e],"function"!=typeof d&&(c.push(h),O(e,c),c.push(":"),
N(b,b.b?b.b.call(a,e,d):d,c),h=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof a);}}var P={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},da=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function O(b,a){a.push('"',b.replace(da,function(a){if(a in P)return P[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return P[a]=d+b.toString(16)}),'"')};function Q(b){"function"===typeof ClickTaleExec&&ClickTaleExec(b)}function R(b){"function"===typeof ClickTaleEvent&&ClickTaleEvent(b)}function S(b){"function"===typeof window.ClickTaleRegisterFormSubmit&&window.ClickTaleRegisterFormSubmit(b)}function T(b,a){"function"===typeof window.ClickTaleRegisterElementAction&&ClickTaleRegisterElementAction(b,a)}window.ClickTaleDetectAgent&&window.ClickTaleDetectAgent()&&window.ClickTaleDetectAgent();var U="",V=document.location.pathname;function W(b,a,c){b.addEventListener?(b.addEventListener(a,c,g),W=function(a,c,b){a.addEventListener(c,b,g)}):b.attachEvent&&(b.attachEvent("on"+a,c),W=function(a,c,b){a.attachEvent("on"+c,b)})}function X(b,a){jQuery(document).one("mouseup",function(c){b===c.target&&a()})}
function Y(b){if(!window.ClickTaleSettings||!window.ClickTaleSettings.ctBoolAgentXDR)Q(b),Y=Q;else{var a=b.length;if(300>a)Q(b);else{Q('window.ctTempString="";');for(var a=Math.ceil(a/300),c=0;c<a;c++)Q('window.ctTempString+="'+b.substring(300*c,300*(c+1))+'";');Q("try { eval(window.ctTempString); } catch (e) { }")}}}function Z(){jQuery("#ClickTaleDiv").append("<form></form>");Z=function(){}}
function ea(){if(!window.ClickTaleFirstPCCGo){window.ClickTaleFirstPCCGo=f;var b={"/user/login/":"Login PopUp: ","/user/registration/":"Join Now PopUp: ","/user/forgotten-password/":"Forgot Password PopUp: "};"/"===V?U="HomePage: ":top!=self&&(U=b[V.toLowerCase()]);setTimeout(function(){if(window.s&&window.s_i_0_cbsinteractive){for(var a=window.s_i_0_cbsinteractive.src.split("?")[1].split("&"),c=0;c<a.length;c++)if(-1!==a[c].indexOf("c10=")){var b=a[c].split("c10=")[1];break}R("Page Type: "+b);var d=
"";jQuery('[id^="keep-up-"]').map(function(a,c){var b=jQuery(c).html(),h=jQuery('[id^="keep-up-"]').index(c);d+="jQuery('[id^=\"keep-up-\"]').eq("+h+").html(unescape('"+escape(b)+"')); "});Y(d)}0<jQuery('div[data-user-view="loggedIn"]:visible').length&&(U&&R(U+"Logged In User"),jQuery("#site-member > div").map(function(a,c){Q("jQuery('#site-member > div').eq("+a+").css('display','"+jQuery(c).css("display")+"');")}));top!=self&&U&&R(U.replace(/:/,""))},1E3);jQuery(document).on("dropdownshown dropdownhidden",
function(a,c){if(c&&c.$element){var b=c.$element.prop("id"),d="dropdownshown"===a.type?"show":"hide";b&&Q("try{jQuery('#"+b+"').data('dropdown')."+d+"();} catch(err){}")}});top!=self?(jQuery(".modal-iframe[id^=uid-]").map(function(a,c){"function"===typeof window.ClickTaleSetCustomElementID&&window.ClickTaleSetCustomElementID(c,"uid-"+a)}),Z(),jQuery(document).ajaxSuccess(function(a,c,b){-1!=b.url.search(/^https:\/\/secure\.techrepublic\.com\/user\/(login|forgotten-password|registration)/i)&&setTimeout(function(){if(jQuery("form.user-login,form.user-register,form.forgotten-password").get(0))var a=
jQuery("form.user-login,form.user-register,form.forgotten-password").get(0);else jQuery("body").append('<form id="ctTempId"></form>'),a=jQuery("body > form#ctTempId")[0];if(a)if(S(a),"function"===typeof window.ClickTaleRegisterFormSubmitSent&&window.ClickTaleRegisterFormSubmitSent(a),-1!=c.responseText.search(/"status":"success"/))"function"===typeof window.ClickTaleRegisterFormSubmitSuccess&&(a?window.ClickTaleRegisterFormSubmitSuccess(a):window.ClickTaleRegisterFormSubmitSuccess()),a===jQuery("body > form#ctTempId")[0]&&
(a=jQuery(".modal-iframe .modal-body").html(),Y("jQuery('.modal-iframe .modal-body').html(unescape('"+escape(a)+"'));"));else if(-1!=c.responseText.search(/"status":"failure"/)){"function"===typeof window.ClickTaleRegisterFormSubmitFailure&&(a?window.ClickTaleRegisterFormSubmitFailure(a):window.ClickTaleRegisterFormSubmitFailure());var b=[];jQuery(".alert-error",jQuery("form.user-login,form.user-register,form.forgotten-password").get(0)).map(function(a,c){var d=jQuery(c).text();b.unshift(jQuery.trim(d))});
Q("jQuery(window).trigger('ct-"+jQuery("form.user-login,form.user-register,form.forgotten-password").attr("class")+"-fail',["+(new M(void 0)).serialize(b)+"]);")}},300)}),jQuery(document).on("blur keyup input","form.user-login input,form.user-register input,form.forgotten-password input",function(){var a=this.id;a&&("user_email_email"!=a&&"user_email_confirm"!=a?Q("jQuery('#"+a+"').change();"):setTimeout(function(){if(jQuery("#"+a).hasClass("validate-error")){var c=jQuery("#"+a).siblings("div").text();
Q("jQuery(window).trigger('ctValidErr', ['"+a+"', '"+escape(c)+"']);")}else Q("jQuery(window).trigger('ctValidPass',['"+a+"']);")},100))}),jQuery(document).on("change","#user_captchu, #user_country",function(){var a=jQuery(this).val(),c=this.id;"user_captchu"===c&&""!=a&&"robot"!=a&&(a="human");Q("jQuery('#"+c+"').val('"+a+"').change();")})):jQuery(document).ajaxSend(function(a,c,b){-1!=b.url.search(/component\/load-more\/xhr/gi)&&U&&R(U+"Load More")});jQuery(document).mousedown(function(a){var c=
a.target,b=jQuery(c);T("mouseover",a);0<b.closest("a.load-more").length?X(c,function(a,c){return function(){T("mouseover",a);T("click",a);var b=jQuery("a.load-more").index(c.closest("a.load-more"));Q("jQuery('a.load-more').eq("+b+").click();");U&&R(U+"Load More")}}(a,b)):0<b.closest(".newsletter-list button.btn-primary").length&&X(c,function(a,c){return function(){T("mouseover",a);T("click",a);var b=jQuery(".newsletter-list button.btn-primary").index(c.closest(".newsletter-list button.btn-primary"));
Q("jQuery('.newsletter-list button.btn-primary').eq("+b+").click();");b=c.closest(".newsletter-list button.btn-primary").text();U&&b&&R(U+jQuery.trim(b))}}(a,b))});jQuery(document).click(function(a){var c=jQuery(a.target);if(0<c.closest(".horizaccordion section a.tab,span.next-arrow a,span.prev-arrow a").length){var b=jQuery(".horizaccordion section a.tab,span.next-arrow a,span.prev-arrow a").index(c.closest(".horizaccordion section a.tab,span.next-arrow a,span.prev-arrow a"));Q("jQuery('.horizaccordion section a.tab,span.next-arrow a,span.prev-arrow a').eq("+
b+").click();")}else if(0<c.closest('div[data-user-view="loggedOut"] a.nav-button').length)R(U+"Login"),Q("jQuery('div[data-user-view=\"loggedOut\"] a.nav-button').click();");else if(0<c.closest('#article-river a[href="#tab-content-1"]').length)b=jQuery('#article-river a[href="#tab-content-1"]').index(c.closest('#article-river a[href="#tab-content-1"]')),Q("jQuery('#article-river a[href=\"#tab-content-1\"]').eq("+b+").click();"),a=c.closest('#article-river a[href="#tab-content-1"]').text(),U&&a&&
R(U+jQuery.trim(a));else if(top!=self)if(0<c.closest("form button.btn.btn-primary").length)a=c.closest("form button.btn.btn-primary").text(),U&&a&&R(U+jQuery.trim(a)),-1!=V.search(/\/user\/registration\//i)&&(window.ClickTaleSettings.ElementPathRewriter=function(a,b){a===document.getElementById("dynamic_registration")&&(window.ClickTaleSettings.ctTempRegisterFormPath=b);return b},jQuery(".modal-iframe form.user-login,form.user-register,form.forgotten-password").click(),window.ClickTaleSettings.ElementPathRewriter=
function(a,b){return a===jQuery("body > form#ctTempId")[0]&&window.ClickTaleSettings.ctTempRegisterFormPath?window.ClickTaleSettings.ctTempRegisterFormPath:b}),Q("jQuery('form .alert-error').parent().remove();"),setTimeout(function(){if(0<jQuery(".validate-error").length){Q("jQuery('form button.btn.btn-primary').click();");var a=c.closest("form").get(0);a&&(S(a),"function"===typeof window.ClickTaleRegisterFormSubmitNotSent&&window.ClickTaleRegisterFormSubmitNotSent(a))}},100);else if(0<c.closest(".btn-newsletter-sub,.btn-group a.btn").length){var a=
c.text(),d=c.closest(".btn-newsletter-sub,.btn-group a.btn");U&&a&&R(U+jQuery.trim(a));b=jQuery(".btn-newsletter-sub,.btn-group a.btn").index(d);jQuery(document).one("ajaxComplete",function(a,c,e){-1!=e.url.search(/newsletters\/xhr\/subscription\/\?(un)?subs/)&&Q("jQuery('.btn-newsletter-sub,.btn-group a.btn').eq("+b+").attr('class', '"+d.attr("class")+"').text('"+d.text()+"');")})}else if(c.is(".checkbox label[for]")){var e={},m=jQuery("#"+c.attr("for")).get(0),v;for(v in a)e[v]=a[v];m&&(e.srcElement=
m,e.target=m);T("mouseover",e);T("click",e);T("mouseover",a)}});W(window,"message",function(a){a.data&&"https://secure.techrepublic.com"===a.origin?(-1!=a.data.search(/{"name":"closeModal"}/i)&&a.source&&(Q("try { jQuery('.modal:visible').data('modalIframe').close(); } catch (err) { }"),a.source.postMessage&&a.source.postMessage("ClickTaleStop",a.origin)),-1!=a.data.search(/{"name":"(loginSuccess|loginSubmitted)"/i)&&a.source&&Q("try { jQuery('.modal:visible').data('modalIframe').close(); } catch (err) { }"),
jQuery("#site-member > div").map(function(a,b){Q("jQuery('#site-member > div').eq("+a+").css('display','"+jQuery(b).css("display")+"');")})):a.data&&"http://www.techrepublic.com"===a.origin&&"ClickTaleStop"===a.data&&"function"===typeof ClickTaleStop&&ClickTaleStop()});jQuery(document).ready(function(){if("/user/registration/"==window.location.pathname){var a=g;jQuery("form button").mouseup(function(){setTimeout(function(){if((0<jQuery(".validate-error:visible").length||0<jQuery(".alert-error:visible").length)&&
!a)a=f,R("Client Side Validation Error Appears")},1500)});jQuery("form input, form select").blur(function(){setTimeout(function(){0<jQuery(".validate-error:visible").length&&!a&&(a=f,R("Client Side Validation Error Appears"))},800)})}})}}
(function(b){function a(){2==++window.okToStartOn2&&b()}window.okToStartOn2=0;ca(function(){a()});if("undefined"!==typeof window.ClickTaleIsRecording&&window.ClickTaleIsRecording()===f)a();else{var c=window.ClickTaleOnRecording||function(){};window.ClickTaleOnRecording=function(){a();return c.apply(this,arguments)}}})(function(){L(ea,function(){return window.jQuery&&"function"===typeof jQuery.fn.on?f:g},250,40)});})();


