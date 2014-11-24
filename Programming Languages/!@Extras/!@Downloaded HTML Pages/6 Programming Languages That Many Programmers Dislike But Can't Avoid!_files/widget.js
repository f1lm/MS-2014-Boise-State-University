/**
 * Widget Javascript 
 *
 * Embeds widget into a webpage
 *
 *
 * @since April 29, 2011
 */ 


 
var scripts = document.getElementsByTagName('script');
var index = scripts.length - 1;
var PRNWidget_LocalIP = "widget.prnewswire.com";
var queryString;
for(var i = index; i >= 0;i--){
	var myScript = scripts[i];
	if( myScript.src.indexOf(PRNWidget_LocalIP) != -1 ){
		if(myScript.src.indexOf("https")!= -1){
			httpHeader = false;
		}else{
			httpHeader = true;
		}
		queryString = myScript.src.replace(/^[^\?]+\??/,'');
		break;
	}
}
var params = parseQuery( queryString );

var newScript = null;
var headID = null;
var url=document.URL;
var prnwidget_url = url;
var loc = url.substring(url.lastIndexOf('/')+1)
var ix = loc.lastIndexOf('?');
var PRNWidget_RootDir = "/";
//var PRNWidget_RootDir = "/";

if( ix != -1 )
{
	loc = loc.substring(0,ix);
}


if( queryString ){
	Run();
}

	/**
	 * Adds a div for the widget, and adds a LoadEvent to render the widget
	 * into the div.
	 */ 
	function Run()
	{
		//SendLog(params);

		var style = "";
		if( 'width' in params  ) {
			style = "width: " + (parseInt(params['width'])+10) + "px;";
		} 
		else
		{
			if( ! ('doc' in params) && !('showRelease' in params && params['showRelease']==1 ) ) //if doc is in params, it is the landing page
			{
				//style = "width: 300px;";
			}
		}
		if( params['expandheight'] == "1" || 'type' in params && params['type'] == "expand" ) 
		{
			style += "overflow:auto; padding:10px;";
		}
		else if( 'height' in params) {
			style += "overflow:auto; height: " + params['height'] + "px; padding:10px;";
		}
		else
		{
			style += "overflow:auto; height: 120px; padding:10px;";
		}
		style += " overflow-x: hidden;";
		//console.log(params);
		var backcolor = "";
		if( 'bkgcolor' in params )
		{
			backcolor = " background-color:#"+params['bkgcolor']+";";
			//alert(backcolor);
		}

		var randString = randomString("abcdefghijklmnopqrstuvwxyz",7);
		var containerName = "prnwcontainer_"+randString;
		if( 'container' in params  ) {
			containerName = params['container'];
			var x = document.getElementById(containerName);
			if( x == undefined )
			{
				
			}
			//x.style = backcolor;
			x.innerHTML = "<div id='prnaddthis' style='"+backcolor+"'></div>";
		}
		else
		{
			document.write("<div style='"+backcolor+"'><div id='prnaddthis' style='"+backcolor+"'></div><div id='"+containerName+"' align='left' style='"+style+";'></div></div>");
		}
		
		var containerNames = Array();
		containerNames.push(containerName);

		
		//CallBackFunc("df");
		var func = InsertList;
		if( 'doc' in params || params['showRelease'] == 1 ) {
			func = InsertRelease
		}
		else {
			func = InsertList;
		}

		var tempString = containerName.toString();
		var tempString2 = queryString.toString();
		var tempFunction = function(){func(eval("'"+tempString2+"'"),eval("'"+tempString+"'"))}
		if('rude' in params)
		{
			tempFunction();
			//alert("rude, bro");
		}
		else if(window.addEventListener)
		{
			//window.addEventListener('load', function(){func(queryString,containerName);},false);
			//var tempString = containerName.toString();
			//var tempString2 = queryString.toString();
			//alert(tempString);
			//var tempFunction = function(){func(eval("'"+tempString2+"'"),eval("'"+tempString+"'"))};
			addLoadEvent( tempFunction );
			//alert("adding " + containerName);
		}
		else if(window.attachEvent)
		{
			//window.attachEvent('onload',function(){func(queryString,containerName);});
			//var tempString = containerName.toString();
			//var tempString2 = queryString.toString();
			//alert(tempString);
			//var tempFunction = function(){func(eval("'"+tempString2+"'"),eval("'"+tempString+"'"))};
			addLoadEvent( tempFunction );
		}
		CallBackFuncB(params);
	}


	/**
	 * 
	 */ 
	function InsertList(queryString,containerName) 
	{
		
		
		headID = document.getElementsByTagName("head")[0];
		newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = (httpHeader?"http":"https") + "://" + PRNWidget_LocalIP + PRNWidget_RootDir + "/widget/widget.php?"+queryString+"&cname="+containerName+"&loc="+escape(loc)+"&url="+escape(prnwidget_url)+"&callback=CallBackFunc";
		headID.appendChild(newScript);
		//alert(newScript.src);
	
	}

	/**
	 * 
	 */ 
	function InsertRelease(queryString,containerName) 
	{
		headID = document.getElementsByTagName("head")[0];
		newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = (httpHeader?"http":"https")+"://" + PRNWidget_LocalIP + PRNWidget_RootDir + "/widget/widget.php?callback=CallBackFunc&"+queryString+"&cname="+containerName+"&loc="+escape(loc)+"&url="+escape(url)+"&"+window.location.search.substring(1);
		headID.appendChild(newScript);
		//alert("relase " + newScript.src);
		
	}
	
	
	function InsertCSS()
	{
		try
		{
			var stl = document.getElementById("stylesheetInfo").innerHTML;
				
			var newStylesheet = document.createElement("style");
			newStylesheet.type = "text/css";
			headID.appendChild(newStylesheet);
			var def = stl;
			if (newStylesheet.styleSheet) {   // IE
				newStylesheet.styleSheet.cssText = def;
			} else {                // the world
				var tt1 = document.createTextNode(def);
				newStylesheet.appendChild(tt1);
			}
		}
		catch(err)
		{
		
		}
	}

	function CallBackFunc(html) {
		var cleanHtml = eval(html);
		var x = document.getElementById(cleanHtml.containerName);
		if( x == undefined )
		{
			x = document.getElementById("prnwcontainer");
		}
		x.innerHTML += decodeURIComponent(cleanHtml.html);
		
		InsertCSS();
	}

	function CallBackFuncB(Params) {
		
		if( 'social' in Params && 1 == Params['social'] ) {
			var x = document.getElementById("prnaddthis");
			x.innerHTML =  '<div class="addthis_toolbox addthis_default_style"><a href="http://www.addthis.com/bookmark.php?v=250&amp;username=xa-4c5c4c135f933235" class="addthis_button_compact">Share</a><span class="addthis_separator">|</span><a class="addthis_button_facebook"></a><a class="addthis_button_myspace"></a><a class="addthis_button_google"></a><a class="addthis_button_twitter"></a></div>';
				headID = document.getElementsByTagName("head")[0];
			newScript2 = document.createElement("script");
			newScript2.type = "text/javascript";
			newScript2.src = (httpHeader? "http":"https")+"://s7.addthis.com/js/250/addthis_widget.js#username=xa-4c5c4c135f933235&domload=1";
			headID.appendChild(newScript2);
			Params = parseQuery(queryString);
		}
		
		InsertCSS();
	}

	function DoStuff()
	{
		headID = document.getElementsByTagName("body")[0];
		newScript2 = document.createElement("script");
		newScript2.type = "text/javascript";
		newScript2.src = "http://s7.addthis.com/js/250/addthis_widget.js#username=xa-4c5c4c135f933235&domready=1";
		headID.appendChild(newScript2);
	//alert('x');
	}

	function DoLightbox()
	{
		headID = document.getElementsByTagName("body")[0];
		newScript3 = document.createElement("div");
		newScript3.style.backgroundColor = "#000000";
		newScript3.style.width = "110%";
		newScript3.style.height = "1000%";
		newScript3.style.opacity = 2/10;
		newScript3.style.filter = 'alpha(opacity=' + 2*10 + ')';
		newScript3.style.position = 'absolute';
		newScript3.style.top = '0';
		newScript3.style.left = '-8px';
		newScript3.style.margin = "0px";
		newScript3.zIndex = 50;
		//newScript3.style = "background-color: #FFFFFF; width: 100%; height: 100%";
		headID.appendChild(newScript3);	
		
		newScript4 = document.createElement("div");
		var objh = parseFloat(600)/2;
		var objw = parseFloat(600)/2;
		//newScript4.style.setAttribute("margin-left: 0px; position: absolute; left: "+Math.floor(Math.round((document.documentElement.offsetWidth/2)+document.body.scrollLeft)-objw)+"px; top: "+Math.floor(document.body.scrollTop + 100)+"px; width: 600px; height: 600px; background-color: #FFFFFF;");
		//alert( "doc height: " + document.documentElement.offsetHeight + "  scrollTop: " + document.body.scrollTop + "  objh: " + objh );
		//newScript4.style.top = Math.floor(Math.round((document.documentElement.offsetHeight/2)+document.body.scrollTop)-objh)+'px';
		newScript4.style.top = Math.floor(document.body.scrollTop + 100)+'px';
		newScript4.style.left = Math.floor(Math.round((document.documentElement.offsetWidth/2)+document.body.scrollLeft)-objw)+'px';
		newScript4.style.height = "600px";
		newScript4.style.width = "600px";
		newScript4.style.backgroundColor="#FFFFFF";
		newScript4.zIndex="51";
		newScript4.style.position = 'absolute';
		//newScript4.position="absolute";
		newScript4.innerHTML='<div id="prnaddthis" ></div><div id="prnwcontainer_lb" style="height: 500px; overflow: auto;"></div>';
		headID.appendChild(newScript4);
		
		
		headID = document.getElementsByTagName("head")[0];
		newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = "http://" + PRNWidget_LocalIP + PRNWidget_RootDir + "/widget/widget.php?callback=CallBackFunc&doc=201008021610PR_NEWS_USPR_____NY44318&p=.";
		//newScript.onload = scriptLoaded;
		headID.appendChild(newScript);
		  
	}



	/**
	 * Parses out the parameters of request into an array.  from 
	 * http://feather.elektrum.org/book/src.html
	 */ 
	function parseQuery ( query ) {
	   var Params = new Object ();
	   if ( ! query ) return Params; // return empty object
	   var Pairs = query.split(/[;&]/);
	   for ( var i = 0; i < Pairs.length; i++ ) {
		  var KeyVal = Pairs[i].split('=');
		  if ( ! KeyVal || KeyVal.length != 2 ) continue;
		  var key = unescape( KeyVal[0] );
		  var val = unescape( KeyVal[1] );
		  val = val.replace(/\+/g, ' ');
		  Params[key] = val;
	   }
	   return Params;
	}

	/**
	 * Logs that the widget has been hit
	 */ 
	function SendLog()
	{
	var hn = window.location.href;
	
	var qix = hn.indexOf("?");
	var doc = "";
	if( qix > 0 )
	{
		var ok = hn.substr(0,qix);
		var temp = hn.substr(qix);
		temp = temp.replace("?","");
		
		var params = parseQuery(temp);
		doc = params['doc'];
		hn = ok;
	}
	
		headID = document.getElementsByTagName("head")[0];
		
		newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = "http://" + PRNWidget_LocalIP + PRNWidget_RootDir + "/Store.php?loc="+escape(hn)+"&doc="+escape(doc);
		headID.appendChild(newScript);

		
	}

	/**
	 * Makes random string of characters (for div names)
	 */ 
	function randomString(sChrs,iLen) {
		var sRnd = '';
		for (var i=0; i<iLen; i++){
			var randomPoz = Math.floor(Math.random() * sChrs.length);
			sRnd += sChrs.substring(randomPoz,randomPoz+1);
		}
		return sRnd;
	}

	/**
	 * Makes queue of functions to load
	 */ 
	function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
		window.onload = func;
	  } else {
		window.onload = function() {
		  if (oldonload) {
			oldonload();
		  }
		  func();
		}
	  }
	}

	function DoNewWindow(address)
	{
		newwindow=window.open(address,'name','height=600,width=600,resizable=1');
		if (window.focus) {newwindow.focus()}
		return false;
	}



