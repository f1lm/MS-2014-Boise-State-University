!function(){var e=window.location.href.split("?",2);if(!(e.length<2)){var t=e[1].split("#",2),n=t[0].replace(/(^|\&)ref(=[^&]*)?(?=&|$)/g,"").replace(/^\&/,"?");if(n!=t[0]){var o=e[0]+n+window.location.hash;window.history.replaceState&&window.history.replaceState(null,document.title,o)}}}(),viipg.ready(function(){$(document).ajaxSend(function(e,t,n){function o(e){var t=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var i=jQuery.trim(n[o]);if(i.substring(0,e.length+1)==e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}/^http:.*/.test(n.url)||/^https:.*/.test(n.url)||t.setRequestHeader("X-CSRFToken",o("csrftoken"))}),$("#lang_sel").click(function(){return $("#jq_userctl").load("/site/ajax/lang_sel/"),!1}),1===$("#vl_seealso").children().length&&$("#vl_seealso").hide()});