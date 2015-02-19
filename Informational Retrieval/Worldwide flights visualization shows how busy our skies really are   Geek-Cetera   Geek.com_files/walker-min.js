
var zd=zd||{};var zd_walker_skip_nodes=zd_walker_skip_nodes||["ABBR","META","NOSCRIPT","NAV","IMG","HEADER","FOOTER","SCRIPT","LINK","STYLE","FORM","INPUT","SELECT","BUTTON"];zd.walker={lzma_src:"http://cdn.static.zdbb.net/js/lzma-min.js",skipNodes:zd_walker_skip_nodes,skipAttributes:["outbrain","header","disqus","sponsor","sponsors","branding","advertise","navigation","masthead","ad","nav","footer","header","navigation","advertising","advertisement","menu","copyright"],harmlessNodes:["A","I","B","STRONG","EM","FONT","P","SPAN"],interestingMeta:["keywords","description","zdid","canonical","live_date","type_of","tags"],snippets:{}};zd.poster={lzma_src:"http://cdn.static.zdbb.net/js/lzma-worker-min.js",post_url:"http://walker.zdbb.net/receive_uint8",url:document.location.toString(),href:document.location.href.toString(),check_url:"http://walker.zdbb.net/check?href="};zd.walker.array_contains=function(e,t){var n=e.length;while(n--){if(e[n]==t){return true}}return false};zd.walker.validNode=function(e){if(!e||typeof e=="undefined"||typeof e.tagName!="undefined"&&zd.walker.array_contains(zd.walker.skipNodes,e.tagName)){return false}else{var t=[];if(typeof e.style!="undefined"&&e.style.display=="none"){return false}if(typeof e.children=="undefined"){return false}var n=true;if(typeof e.attributes!="undefined"){for(var r,i=0,s=e.attributes,o=s.length;i<o;i++){r=s.item(i);if(r){var u=e.className;if(typeof u=="undefined")u="";var a=e.id;if(typeof a=="undefined")a="";u=u+" "+a;var f=r.value;if(typeof f=="undefined")continue;f+=" "+u;f=f.toLowerCase().replace(","," ").replace(/\./gi," ").replace(/-/gi," ").replace(/_/gi," ");f=f.split(" ");for(var l in f){try{var c=f[l].replace(/^[ ]+/gi,"").replace(/[ ]$/gi,"");if(zd.walker.array_contains(zd.walker.skipAttributes,c)){n=false;break}else if(c.indexOf("disqus")>-1||c.indexOf("twitter")>-1||c.indexOf("pintrest")>-1||c.indexOf("fb-")>-1||c.indexOf("facebook")>-1){n=false;break}else if(c.indexOf("main")>-1){break}}catch(h){console.log("zd.walker error:"+h)}}}}}}return n};zd.walker.cleanse=function(e){e=e.replace(/[\r\n]/gi," ").replace(/\t/gi," ").replace(/[ ]+/gi," ").replace(/^[ ]+/gi,"").replace(/[ ]+$/gi,"");e=e.replace(/[\r\n]/gi," ").replace(/[ ]+/," ").replace(/^[\t\s ]+/gi,"");e=e.replace(/<[^>]*>/gi,"");e=e.replace(/\"/gi,"'");return e};zd.walker.getSentences=function(e){var t=e.match(/([A-Za-z][^.!?]+[A-Za-z]{2,}[.!?])/gi);if(t==null)t=e.match(/([A-Z][a-z]+[ ]){2,}/gi);return t};zd.walker.harmlessKids=function(e){if(!zd.walker.validNode(e))return false;if(typeof e.children=="undefined")return false;if(e.children.length==0)return true;var t=true;for(var n=0;n<e.children.length;n++){if(e.children[n].nodeType!=3)t=false}if(t)return true;for(var n=0;n<e.children.length;n++){var r=e.children[n];if(typeof r.tagName=="undefined"||!zd.walker.array_contains(zd.walker.harmlessNodes,r.tagName)){return false}}return true};zd.walker.getText=function(e,t){if(!e)return false;for(var n=e.firstChild;n;n=n.nextSibling){if(zd.walker.validNode(n)){zd.walker.getText(n,t)}}if(zd.walker.validNode(e)&&typeof e.children!="undefined"&&(e.children.length==0||zd.walker.harmlessKids(e))){var r=e.innerText;if(typeof r=="undefined")r=e.textContent;if(typeof r=="undefined")return false;if(r.toLowerCase().indexOf("ads by google")>-1)return false;if(typeof e.id!="undefined"){if(e.id.toLowerCase().indexOf("google_ads")>-1)return false}if(typeof r!="undefined"){var r=zd.walker.cleanse(r);var i=zd.walker.getSentences(r);if(r&&i!=null&&r!=""&&(!this.snippets[r]||typeof this.snippets[r]=="undefined")){this.snippets[r]=1;t.push(r);return true}else if(i!=null){this.snippets[r]+=1;return true}else return false}}else{return false}};zd.walker.getMetas=function(){var e=document.getElementsByTagName("meta");var t={};for(var n=0;n<e.length;n++){var r=e[n].getAttribute("name");var i=e[n].getAttribute("content");if(zd.walker.array_contains(zd.walker.interestingMeta,r)){t[r]=i}}return t};zd.poster.init=function(){var e=new XMLHttpRequest;var t=this.check_url+encodeURIComponent(this.href);e.onreadystatechange=function(){if(e.readyState==4){if(e.responseText=="TRUE"){zd.poster.check_response()}}};e.open("GET",t,true);e.send(null)};zd.poster.domready=function(){var e=[],t=document,n="DOMContentLoaded",r=/^loaded|^i|^c/.test(t.readyState),i=function(){t.removeEventListener(n,i);r=1;while(i){i=e.shift();if(typeof i!=="undefined"){i()}}};if(!r){t.addEventListener(n,i)}return function(t){if(r){t()}else{e.push(t)}}}();zd.poster.check_response=function(){var e=document.createElement("script");e.setAttribute("src",zd.walker.lzma_src);document.body.appendChild(e)};zd.poster.send_page=function(){var e=5;var t=new LZMA(this.lzma_src);zd.poster.domready(function(){var n=[];var r=[];var i=document.body;zd.walker.getText(i,n);n=n.reverse();var s=n[0];var o=[s];for(var u=1;u<n.length;u++){try{if(s.indexOf(n[u])==-1){var a=n[u]+"";o[o.length]=a;s=a+"\n"+s}}catch(f){console.log("zd.walker error:"+f)}}o=o.reverse();var l=o.join(" -$BREAK$- ");var c=zd.walker.getMetas();var h=document.title;var p=document.location.toString();var d=p.replace(/\?.*/gi,"");var v=JSON.stringify({url:p,canonical_url:d,metas:c,title:h,page_text:l});t.compress(v,e,function(t){var n=l.length;var r=t.length;var i=new Uint8Array(t);var s=new XMLHttpRequest;s.open("POST",zd.poster.post_url,true);s.setRequestHeader("Cache-Control","no-cache");s.setRequestHeader("Content-Type","application/octet-stream");s.send(i)})})};zd.poster.init()


