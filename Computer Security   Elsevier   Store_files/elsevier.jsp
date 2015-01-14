


usi_alert = function(msg){}


var USIqs = "";
var USIsiteID = "";
var USI_key = "";
var USIDHqs = "";
var USIDHsiteID = "";
var usi_url = location.href.toLowerCase();

if (usi_url.indexOf("elsevier.com") != -1){
	function usi_setCookie(name, value, expires){
	   var date = new Date();
	   date.setTime(date.getTime()+expires);
	   expires = '; expires='+date.toGMTString();
	   document.cookie = name+"="+escape(value)+expires+'; path=/';
	   var cookie = null;
	}
	function usi_readCookie(name){
	   var nameEQ = name + "=";
	   var ca = document.cookie.split(';');
	   for(var i=0;i < ca.length;i++){
		  var c = ca[i];
		  while (c.charAt(0)==' ') c = c.substring(1,c.length);
		  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	   }
	   return null;
	}
	if (usi_url.indexOf("utm_source=cj") != -1){
	   usi_setCookie("usi_afftraffic", "1", 60*60*360*60);
	}
	if (usi_url.indexOf("usi=10p") != -1 && usi_readCookie("usi_Discount") == null){
	   usi_setCookie("usi_Discount", "10p", 60*60*360*60*500);
	}else if (usi_url.indexOf("usi=30p") != -1 && usi_readCookie("usi_Discount") == null){
	   usi_setCookie("usi_Discount", "30p", 60*60*360*60*500);
	}
	if (usi_readCookie("usi_Discount") == "10p" && usi_url.indexOf("store.elsevier.com/cart.jsp") != -1){
	   usi_setCookie("usi_Discount", "0", 60*60*360*60);
	   try{
		   document.getElementById("discountInput").value="CHAT10";
		   document.getElementById("submit-btn").click();
	   }catch (e){}
	} else if (usi_readCookie("usi_Discount") == "30p" && usi_url.indexOf("store.elsevier.com/cart.jsp") != -1){
	   usi_setCookie("usi_Discount", "0", 60*60*360*60);
	   try{
		   document.getElementById("discountInput").value="SIGCSE14";
		   document.getElementById("submit-btn").click();
	   }catch (e){}
	}
	if (usi_url.indexOf("store.elsevier.com/cart.jsp") != -1 || usi_url.indexOf("store.elsevier.com/cartlogin.jsp") != -1 || usi_url.indexOf("store.elsevier.com/checkoutaddress.jsp") != -1){
	   USIDHqs = "221262202213336276302278306291292325301275323345312307307334";
	   USIDHsiteID = "8918";
	}
	if (usi_url.indexOf("cartlogin.jsp") == -1){
		var theCartItems = "0";
		try{
		var divs = document.getElementsByTagName('div');
		for (var i=0; i<divs.length; i++ ) {
			if (divs[i].className != null && divs[i].className.indexOf("shopcard orange_cart_ribbon") != -1) {
				if (divs[i].innerHTML.indexOf("Cart") != -1) {
					theInnerHTML = divs[i].innerHTML;
					theInnerHTML = theInnerHTML.substring(theInnerHTML.lastIndexOf("(")+1, theInnerHTML.length);
					theInnerHTML = theInnerHTML.substring(0, theInnerHTML.indexOf(")"));
					theCartItems = theInnerHTML;
				}
			}
		}
		if (theCartItems >= 1) {
			USIqs = "226234242268342332337338275289312293329343333302303330294344";
			USIsiteID = "9889";
		}
		}catch(e) {}
	}else if (usi_url.indexOf("cartlogin.jsp") != -1){
		var USI_headID = document.getElementsByTagName("head")[0];
		var USI_dynScript = document.createElement("script");
		USI_dynScript.setAttribute("type","text/javascript");
		USI_dynScript.setAttribute("src","https://www.upsellit.com/cookie.jsp?value=seenChat&maxAge=86400&siteID=9889");
		USI_headID.appendChild(USI_dynScript);
	}
	if (USIqs != "" && usi_readCookie("usi_afftraffic") == null && usi_url.indexOf("cartlogin.jsp") == -1){
	   var USI_headID = document.getElementsByTagName("head")[0];
	   var USI_dynScript = document.createElement("script");
	   USI_dynScript.setAttribute("type","text/javascript");
	   USI_dynScript.setAttribute("src","//www.upsellit.com/upsellitJS4.jsp?qs="+USIqs+"&siteID="+USIsiteID+"&keys="+USI_key);
	   USI_headID.appendChild(USI_dynScript);
	}
	if (USIDHqs != ""){
	   var USI_headID = document.getElementsByTagName("head")[0];
	   var USI_dynScript2 = document.createElement("script");
	   USI_dynScript2.setAttribute("type","text/javascript");
	   USI_dynScript2.setAttribute("src","//www.upsellit.com/hound/monitor.jsp?qs="+USIDHqs+"&siteID="+USIDHsiteID);
	   USI_headID.appendChild(USI_dynScript2);
	}
}
