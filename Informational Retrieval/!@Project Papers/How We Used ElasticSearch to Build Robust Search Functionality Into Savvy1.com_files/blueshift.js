(function(){function i(e){var t=[];while(e.parentNode!=null){var n=0;var r=0;for(var i=0;i<e.parentNode.childNodes.length;i++){var s=e.parentNode.childNodes[i];if(s.nodeName==e.nodeName){if(s===e){r=n}n++}}if(e.id!=""){t.unshift(e.nodeName.toLowerCase()+"#"+e.id)}else if(n>1){t.unshift(e.nodeName.toLowerCase()+"["+r+"]")}else{t.unshift(e.nodeName.toLowerCase())}e=e.parentNode}return t}function s(e,t){var n=document.getElementById(e);y(n,"change",function(){d({0:"icapture",1:t,2:document.getElementById(e).value})},false)}function o(e){var t=new Image(1,1);t.onload=function(){iterator=0};t.src=e}function u(e,t){try{var n=new XMLHttpRequest;n.open("GET",e,t);n.onreadystatechange=function(){if(n.readyState>=this.OPENED)n.abort()};n.send(e)}catch(r){}}function a(){var e="";try{e=window.top.document.referrer}catch(t){if(window.parent){try{e=window.parent.document.referrer}catch(n){e=""}}}if(e===""){e=document.referrer}return e}function f(e){e=e||window.event;element=e.target||e.srcElement;var t=new String(i(element));d(["click",{p:t,c:element.href,a:element.innerHTML}])}function l(e,t,n){var r=new Date;r.setDate(r.getDate()+n);var i=window.location.hostname;var s=i.split(".");if(s.length==4&&s[0]>=0&&s[0]<=255&&s[1]>=0&&s[1]<=255&&s[2]>=0&&s[2]<=255&&s[3]>=0&&s[3]<=255){}else{i="."+i.replace(/^www./,"")}var o=escape(t)+(n==null?"":";expires="+r.toUTCString())+";path=/;domain="+i;document.cookie=e+"="+o}function c(e){var t,n,r,i=document.cookie.split(";");for(t=0;t<i.length;t++){n=i[t].substr(0,i[t].indexOf("="));r=i[t].substr(i[t].indexOf("=")+1);n=n.replace(/^\s+|\s+$/g,"");if(n==e){return unescape(r)}}}function h(){function e(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function p(n){var i=n[0];var f=a();var p=Math.floor(Math.random()*1e6+1);var d=Math.round(new Date/1e3);var m=c("_bs");if(m==undefined){m=h();l("_bs",m,365)}if(i=="track"){i=n[1];n=n[2]}else if(i=="capture"){s(n[1],n[2]);return true}else if(i=="retarget"){r=true;return true}else if(i=="icapture"){i="capture";g=n[1];value=n[2];n={};n[g]=value}else{n=n[1]}req=e+"?t="+d+"&e="+i+"&r="+encodeURIComponent(f)+"&z="+p+"&x="+window._blueshiftid+"&k="+m+"&u="+encodeURIComponent(window.location.href);for(var g in n){v=n[g];if(typeof v=="object"){req+="&"+g+"_json="+encodeURIComponent(JSON.stringify(v))}else{req+="&"+g+"="+encodeURIComponent(v)}}var y=true;if(i=="click"){y=/chrome/.test(navigator.userAgent.toLowerCase())==false}var b=typeof XMLHttpRequest!="undefined"&&"withCredentials"in new XMLHttpRequest;if(false&&b){u(req,y)}else{o(req);if(r==true&&i=="pageload"){req=t+e+"?t="+d+"&e=appnexus"+"&z="+p+"&x="+window._blueshiftid+"&k="+m+"&appnexus_id=$UID"+"&u="+encodeURIComponent(window.location.href)+"&r="+encodeURIComponent(f);o(req)}}return true}function d(e){n?p(e):setTimeout(function(){d(e)},20)}function m(){n=true}var e=("https:"===document.location.protocol?"https:":"http:")+"//api.getblueshift.com/unity.gif";var t=("https:"===document.location.protocol?"https:":"http:")+"//ib.adnxs.com/getuid?";var n=false;var r=false;if(typeof blueshift=="object"){var g=typeof blueshift.slice=="undefined"?[]:blueshift.slice(0);blueshift={events:[],load:function(){m()},capture:function(e,t){s(e,t)},retarget:function(){d(["retarget"])},track:function(e,t){d(["track",e,t])},pageload:function(e){d(["pageload",e])},identify:function(e){d(["identify",e])}};for(w=0;w<g.length;w++){blueshift.events.push(g[w])}}if(document.addEventListener){var y=function(e,t,n){e.addEventListener(t,n,false)}}else{var y=function(e,t,n){e.attachEvent("on"+t,n)}}var b=document.getElementsByTagName("a");for(var w=0,E=b.length;w<E;w++){y(b[w],"click",f)}for(w=0;w<blueshift.events.length;w++){d(blueshift.events[w])}document.readyState==="complete"?m():window.addEventListener?window.addEventListener("load",m,!1):window.attachEvent?window.attachEvent("onload",m):m})();