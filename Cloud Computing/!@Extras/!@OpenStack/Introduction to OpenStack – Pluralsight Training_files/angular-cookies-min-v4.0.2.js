angular.module("ivpusic.cookie",["ipCookie"]),angular.module("ipCookie",["ng"]).factory("ipCookie",["$document",function(e){"use strict";return function(){function i(i,t,o){var n,r,s,p,u,a,x,c,d;if(o=o||{},void 0!==t)return t="object"==typeof t?JSON.stringify(t):t+"","number"==typeof o.expires&&(d=o.expires,o.expires=new Date,-1===d?o.expires=new Date("Thu, 01 Jan 1970 00:00:00 GMT"):void 0!==o.expirationUnit?"hours"===o.expirationUnit?o.expires.setHours(o.expires.getHours()+d):"minutes"===o.expirationUnit?o.expires.setMinutes(o.expires.getMinutes()+d):"seconds"===o.expirationUnit?o.expires.setSeconds(o.expires.getSeconds()+d):o.expires.setDate(o.expires.getDate()+d):o.expires.setDate(o.expires.getDate()+d)),e[0].cookie=[encodeURIComponent(i),"=",encodeURIComponent(t),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("");for(r=[],c=e[0].cookie,c&&(r=c.split("; ")),n={},x=!1,s=0;r.length>s;++s)if(r[s]&&(p=r[s],u=p.indexOf("="),a=p.substring(0,u),t=decodeURIComponent(p.substring(u+1)),void 0===i||i===a)){try{n[a]=JSON.parse(t)}catch(f){n[a]=t}if(i===a)return n[a];x=!0}return x&&void 0===i?n:void 0}return i.remove=function(e,t){var o=void 0!==i(e);return o&&(t||(t={}),t.expires=-1,i(e,"",t)),o},i}()}]);