// Copyright 2006-2014 ClickTale Ltd., US Patent Pending
// Generated on: 11/10/2014 10:31:15 AM (UTC 11/10/2014 4:31:15 PM)

if (typeof(ct_dispatcher) == 'undefined')
{
	ct_dispatcher = {
		configName : null,
		cookieName : "ct_configName",
		getParameterByName : function (name)
		{
			 name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			 var regexS = "[\\?&]" + name + "=([^&#]*)";
			 var regex = new RegExp(regexS, "i");
			 var results = regex.exec(window.location.search);
			 if(results == null)
			   return "";
			 else
			   return decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		createCookie: function (name,value,days) 
		{
			if (days) 
			{
				var date = new Date();
				date.setTime(date.getTime( )+( days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString( );
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie : function (name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';');
			for( var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
				if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
			}
			return null;
		}
	};
		
	// Read from querystring
	var ct_pdc_qs_val = ct_dispatcher.getParameterByName(ct_dispatcher.cookieName);
	if (ct_pdc_qs_val)
	{
		// Override/create cookie
		ct_dispatcher.createCookie(ct_dispatcher.cookieName, ct_pdc_qs_val, 14);
		ct_dispatcher.configName = ct_pdc_qs_val;
	}
	else
	{
		// Read from cookie
		ct_dispatcher.configName = ct_dispatcher.readCookie(ct_dispatcher.cookieName);
	}

	
}

		var configFoundPTC = false;
	
if (ct_dispatcher.configName == 'Release_07112014')
{
	configFoundPTC = true;
			document.write("<script type='text/javascript'>\/\/ Copyright 2006-2014 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 9056\r\n\/\/ WR destination: www09\r\n\/\/ WR version: 14.17\r\n\/\/ Recording ratio: 0.1\r\n\/\/ Generated on: 11\/10\/2014 10:31:15 AM (UTC 11\/10\/2014 4:31:15 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = false;\r\n\r\n\t\r\ndocument.write(unescape(\"%3Cscript%20src=\u0027\"+\r\n(document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www09\/pcc\/5a999966-75a6-4b89-a92c-23702f4d9c94.js?DeploymentConfigName=Release_07112014\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www09\/pcc\/5a999966-75a6-4b89-a92c-23702f4d9c94.js?DeploymentConfigName=Release_07112014\u0026Version=1\u0027)+\r\n\"\u0027%20type=\u0027text\/javascript\u0027%3E%3C\/script%3E\"));\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = { XHRWrapper: { Enable: true, MaxResponseSize: 1000000} };\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=9056, \r\n\t\tRatio=0.1, \r\n\t\tPartitionPrefix=\"www09\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tvar uaType = ClickTaleDetectAgent();\r\n\/\/exclude IE 8 and 7\r\nif(uaType.t == uaType.IE \u0026\u0026 uaType.v \u003c= 8){\r\n\treturn;\r\n}\r\nClickTaleFetchFromWithCookies.setFromCookie(\"zdregion\");\r\nClickTaleFetchFrom = ClickTaleFetchFromWithCookies.constructFetchFromUrl();\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\t\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\ndocument.write(unescape(\"%3Cdiv%20id%3D%22ClickTaleDiv%22%20style%3D%22display%3A%20none%3B%22%3E%3C\/div%3E\"));\r\n\r\ndocument.write(unescape(\"%3Cscript%20src=\u0027\"+window.ClickTaleScriptSource+\"tc\/WRe17.js\"+\"\u0027%20type=\u0027text\/javascript\u0027%3E%3C\/script%3E\"));\r\n\r\n\r\n<\/script>");
	}
			
	

	// Default configuration
if (!configFoundPTC)
{
			document.write("<script type='text/javascript'>\/\/ Copyright 2006-2014 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 9056\r\n\/\/ WR destination: www09\r\n\/\/ WR version: 14.17\r\n\/\/ Recording ratio: 0.1\r\n\/\/ Generated on: 11\/10\/2014 10:31:15 AM (UTC 11\/10\/2014 4:31:15 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = false;\r\n\r\n\t\r\ndocument.write(unescape(\"%3Cscript%20src=\u0027\"+\r\n(document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www09\/pcc\/5a999966-75a6-4b89-a92c-23702f4d9c94.js?DeploymentConfigName=Release_10112014\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www09\/pcc\/5a999966-75a6-4b89-a92c-23702f4d9c94.js?DeploymentConfigName=Release_10112014\u0026Version=1\u0027)+\r\n\"\u0027%20type=\u0027text\/javascript\u0027%3E%3C\/script%3E\"));\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = { XHRWrapper: { Enable: true, MaxResponseSize: 1000000} };\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=9056, \r\n\t\tRatio=0.1, \r\n\t\tPartitionPrefix=\"www09\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tvar uaType = ClickTaleDetectAgent();\r\n\/\/exclude IE 8 and 7\r\nif(uaType.t == uaType.IE \u0026\u0026 uaType.v \u003c= 8){\r\n\treturn;\r\n}\r\nClickTaleFetchFromWithCookies.setFromCookie(\"zdregion\");\r\nClickTaleFetchFrom = ClickTaleFetchFromWithCookies.constructFetchFromUrl();\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\t\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\ndocument.write(unescape(\"%3Cdiv%20id%3D%22ClickTaleDiv%22%20style%3D%22display%3A%20none%3B%22%3E%3C\/div%3E\"));\r\n\r\ndocument.write(unescape(\"%3Cscript%20src=\u0027\"+window.ClickTaleScriptSource+\"tc\/WRe17.js\"+\"\u0027%20type=\u0027text\/javascript\u0027%3E%3C\/script%3E\"));\r\n\r\n\r\n<\/script>");
	}

