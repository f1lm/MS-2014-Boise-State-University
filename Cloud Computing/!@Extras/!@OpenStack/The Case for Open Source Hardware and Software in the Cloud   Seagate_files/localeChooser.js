//var SUPPORTED_ECOMM_LOCALE = ["en-us","en-ca","en-gb","en-at","en-be","en-cy","en-cz","en-dk","en-ee","en-fi","en-gr","en-hu","en-ie","en-lv","en-lt","en-lu","en-mt","en-nl","en-pt","en-ro","en-sk","en-si","en-se","fr-fr","de-de","it-it","es-es","pl-pl","en-au"];
var SUPPORTED_ECOMM_LOCALE = ["en-us","en-ca","en-au", "en-ie", "en-cz", "en-dk","pl-pl","it-it","es-es","en-gb","de-de","fr-fr","en-hu","en-ro","en-se","en-lt"];
/** 
 * Array of two letter country codes supported by locale redirects
 * @global
 * SUPPORTED_COUNTRY and COUNTRY_KEYS must maintain the same order of countries, as the country array gets looped through and the iterator is then used to retrieve the keys.
 
 
  */
//var SUPPORTED_COUNTRY = ["us","gb","as","cn","tw","jp","kr","la","es","it","fr","tr","pl","ru","de","br","in","sg","au","em","id","em","ca","nl","ie","cz","dk","hu","lt","ro","se, "nl", "be""];
//var COUNTRY_KEYS = ["country.unitedStates","country.unitedKingdom","country.asean","country.china","country.taiwan","country.japan","country.republicofKorea","country.americaLatina","country.spain","country.italy","country.france","country.turkey","country.poland","country.russia","country.germany","country.brazil","country.india","country.singapore","country.australia","country.menaEnglish","country.indonesia","country.menaArabic","country.canada","country.netherlands","country.eurozone","country.czechRepublic","country.denmark","country.hungary","country.lithuania","country.romania","country.sweden","country.netherlands","country.belgium"];

var SUPPORTED_COUNTRY = ["us","gb","as","cn","tw","jp","kr","la","es","it","fr","tr","pl","ru","de","br","in","sg","au","em","id","ar","ca", "nl", "be", "be", "dk", "ie", "cz", "hu", "ro", "se", "lt" ];
var COUNTRY_KEYS = ["country.unitedStates","country.unitedKingdom","country.asean","country.china","country.taiwan","country.japan","country.republicofKorea","country.americaLatina","country.spain","country.italy","country.france","country.turkey","country.poland","country.russia","country.germany","country.brazil","country.india","country.singapore","country.australia","country.menaEnglish","country.indonesia","country.menaArabic","country.canada","country.netherlands","country.belgiumf","country.belgiumn","country.denmark","country.eurozone","country.czechRepublic","country.hungary","country.romania","country.sweden","country.lithuania"];

/** 
 * Array of valid locale codes supported by locale redirects
 * @global */
var SUPPORTED_LOCALE = ["en-us","en-gb","en-as","zh-cn","zh-tw","ja-jp","ko-kr","es-la","es-es","it-it","fr-fr","tr-tr","pl-pl","ru-ru","de-de","pt-br","en-in","en-sg","en-au", "en-em","id-id","ar-em","en-ca","nl-nl","fr-be","nl-be"];

/** 
 * List of URL patterns for supported locales
 * @global */
var SUPPORTED_LOCALE_STR = "/us/en,/gb/en,/as/en,/cn/zh,/tw/zh,/jp/ja,/kr/ko,/la/es,/es/es,/it/it,/fr/fr,/tr/tr,/pl/pl,/ru/ru,/de/de,/br/pt,/in/en,/sg/en,/au/en,/em/en,/id/id,/ca/en,/em/ar,/nl/nl,/be/fr,/be/nl";

//var DOMAIN_ARR_FORWARD = [".cn",".co.jp",".fr",".com","/www"];		

/** 
 * @todo Document this global variable
 * @global */
var DOMAIN_LOCALE_ARR = ["en-us","en-us","zh-cn","ja-jp","fr-fr"];

/** 
 * @todo Document this global variable
 * @global */
var DOMAIN_ARR = ["/www",".com",".cn",".co.jp",".fr"];	

/** 
 * @todo Document this global variable
 * @global */
var DOMAIN_LANG_ARR = ["en","en","zh","ja","fr"];

/** 
 * @todo Document this global variable
 * @global */
var DOMAIN_COUNTRY_ARR = ["us","us","cn","jp","fr"];

/** 
 * @todo Document this global variable
 * @global */
var DEFAULT_LOCALE="en-us";

/** 
 * @todo Document this global variable
 * @global */
var DEFAULT_COUNTRY = "us";

/** 
 * @todo Document this global variable
 * @global */
var DEFAULT_LANGUAGE = "English";

/** 
 * @todo Document this global variable
 * @global */
var DEFAULT_DOMAIN=".com";

/** 
 * @todo Document this global variable
 * @global */
var LOCALE_COOKIE_NAME_TEMP = "userSelectedLocaleCookie";

/** 
 * @todo Document this global variable
 * @global */
var LOCALE_COOKIE_NAME_PERMANENT = "permanentLocaleCookie";

/** 
 * @todo Document this global variable
 * @global */
var LOCALE_COOKIE_NAME_ECOMM_TEMP= "ecommSessionCookie";

/** 
 * @todo Document this global variable
 * @global */
var LOCALE_COOKIE_NAME_ECOMM_PERMANENT = "ecommLocaleCookie";
/**
 * Returns the escaped value of the first cookie found that matches the name passed.
 *
 * @author Anirudh Joshi
 * @param {string} c_name The name of the cookie to read.
 * @returns {string}
 */
function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name) {
		return unescape(y);
	  }
	}
}

/**
 * Deletes the specified cookie from the browser.
 *
 * @author Anirudh Joshi
 * @param {string} name The cookie name.
 * @param {string} path The cookie path
 * @param {string} domain The cookie domain.
 * @requires getCookie
 */
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}


/**
 * Sets a "permanent" cookie that lasts for the length of exdays. Also deletes userSelectedLocaleCookie and permanentLocaleCookie for www.seagate.com domain.
 *
 * @author Anirudh Joshi
 * @param {string} c_name The name of the cookie to create.
 * @param {string} value The value of the cookie.
 * @param {number} exdays The number of days from creation date to expire the cookie.
 * @requires deleteCookie
 */
function setPermanentCookie(c_name,value,exdays) {
	//var exdays = 365;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value + "; path=/ ; domain=.seagate.com ";

}

/**
 * Sets a session cookie for .seagate.com domain.
 *
 * @author Anirudh Joshi
 * @param {string} c_name The name of the cookie to create.
 * @param {string} value The value of the cookie.
 */
function setSessionCookie(c_name,value) {
	document.cookie=c_name + "=" + escape(value) + "; path=/ ;domain=.seagate.com";
}

/**
 * Sets cookie expiration date in the past to remove cookie
 *
 * @author Anirudh Joshi
 * @param {string} c_name The name of the cookie to create.
 * @todo Potentially replace this function with deleteCookie
 */
function removeCookie( c_name ) {
	document.cookie = c_name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;domain=.seagate.com";
}

/**
 * @todo Document this function
 */
function setLocaleOnLoadEdit(){
	domain=DEFAULT_DOMAIN;
	domainLang="en";
	domainCountry="us";
	localeUrl=DEFAULT_LOCALE;
	for(var i=0;i<DOMAIN_ARR.length;i++)
	{
		localeUrl = getLocaleFromURL(DOMAIN_ARR[i]+"/",DOMAIN_LOCALE_ARR[i]);
		if(localeUrl!=0)
		{
			domain=DOMAIN_ARR[i];
			domainLang=DOMAIN_LANG_ARR[i];
			domainCountry=DOMAIN_COUNTRY_ARR[i];
			break;
		}
	}
	currentLocale =  localeUrl;
	currentCountry = getCountryForLocale(currentLocale);
	chkForwardLocale(localeUrl,domain,domainLang,domainCountry);

}

function updateLocale(this_locale){
	if(getEcommLocale()!=""){
		setSessionCookie("clearCart",getDrLocale());
	}
	setNewLocale(this_locale);
	window.location.reload();
}


/**
 * @todo Document this function
 */
function setNewLocale(value, cookieFlag) {
    var cookieExists = getCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT) != null || getCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP) != null;
    var ecommValue = "";
	var revisedValue=value; // revised value is the value of the seaLocale
	for (var i = 0; i < SUPPORTED_ECOMM_LOCALE.length; i++) {
		var slocale = SUPPORTED_ECOMM_LOCALE[i];
		if (slocale == value) {
	    	for (j = 0; j < ecommLocaleMap.ecommLocalesList.length; j++) {
				if (ecommLocaleMap.ecommLocalesList[j].ecommLocale == value){
					if(cookieFlag != false) {
						ecommValue = ecommLocaleMap.ecommLocalesList[j].ecommLocale;	
					}
					revisedValue = ecommLocaleMap.ecommLocalesList[j].seaLocale;
				}
			}
		}
	}
	if(cookieFlag == undefined) // if arrived via the locale selector
	{
		var rememberMe = true;
		if(document.getElementById("nav-footer-remember")!=null)
			rememberMe=document.getElementById("nav-footer-remember").checked;
		if(rememberMe)
		{
			removeCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT);
			setPermanentCookie(LOCALE_COOKIE_NAME_PERMANENT,revisedValue,60);
			setSessionCookie(LOCALE_COOKIE_NAME_TEMP,revisedValue);		
			if (ecommValue != ""){
				setPermanentCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT,ecommValue,60);	
			}		
			//removeCookie(LOCALE_COOKIE_NAME_TEMP);
    		removeCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP);
		}
		else
		{
			setSessionCookie(LOCALE_COOKIE_NAME_TEMP,revisedValue);
			if (ecommValue != ""){
				setSessionCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP,ecommValue);	
			}
		}
	}
/*	else // this else is temporary while akamai is sorting out cookie issue.
	{	
		if (cookieExists == false && ecommValue == ""){
			if(SUPPORTED_ECOMM_LOCALE.indexOf(value)!= -1){
				ecommValue = revisedValue;
			}
		}
		if (ecommValue != ""){			
			if( isPDPPage == true && cookieExists == false  && getCookie(LOCALE_COOKIE_NAME_PERMANENT) == null){
				setSessionCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP,ecommValue);	
			}
			else if (isPDPPage == false && cookieExists == false) {
			 	setPermanentCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT,ecommValue,60);	
			}
		}
	}
*/
	for(var i=0;i<DOMAIN_ARR.length;i++)
	{
		localeUrl = getLocaleFromURL(DOMAIN_ARR[i]+"/",DOMAIN_LOCALE_ARR[i]);
		if(localeUrl!=0)
		{
			domain=DOMAIN_ARR[i];
			domainLang=DOMAIN_LANG_ARR[i];
			domainCountry=DOMAIN_COUNTRY_ARR[i];
			break;
		}
	}
	chkForwardLocale(revisedValue,domain,domainLang,domainCountry);
}

/**
 * @todo Document this function
 */
function chkForwardLocale(value,domain,lang,country)
{
	var newLangShort = value.substr(0, 2);
	var newCountry = value.substr(3, 2);
	var currentUrl = window.location;
	var currentUrlStr = currentUrl.toString();
	var currentUrlLength = currentUrlStr.length;
	var domainLength = domain.length;
	var domainToChk = DEFAULT_DOMAIN;
	//for removing locale for the same domain. us/en for .com ..
	for(var domainIndex=0;domainIndex<DOMAIN_ARR.length;domainIndex++)
	{
		if(domainToChk==DOMAIN_ARR[domainIndex])	
		{
			domainCountry = DOMAIN_COUNTRY_ARR[domainIndex];
			domainLang = DOMAIN_LANG_ARR[domainIndex];
			break;
		}
	}
	var domainString = "";
	if(domainCountry!=newCountry || domainLang!=newLangShort) //if not en-us locale
	{
		domainString="/"+newCountry+"/" + newLangShort + "/";
		if(document.URL.indexOf('shop.seagate.com') != -1){
			window.location = 'http://www.seagate.com' + domainString + '/store/';                            
			return;
		}
	}
	if(document.URL.indexOf('shop.seagate.com') != -1){
		window.location = 'http://www.seagate.com' + domainString + '/store/';                         
		return;
	}
	if(currentUrlLength == currentUrlStr.indexOf(domain)+domainLength && (newLangShort != lang || newCountry != country)) {
		window.location = currentUrlStr+domainString;                       
	} else if(currentUrlStr.indexOf(domain+"/") > 0) {
		var comIndex = currentUrlStr.indexOf(domain+"/");
		if(domain == '/www') {domain = ''}; // QC2480 remove /www from URL if it is present
		if((currentUrlLength < comIndex+10 || 
		   (currentUrlLength >= comIndex+10 && SUPPORTED_LOCALE_STR.indexOf(currentUrlStr.substr(comIndex+domainLength, 6).toLowerCase()) < 0)) 
		   && (newLangShort != lang || newCountry != country)) {
			window.location = currentUrlStr.replace(currentUrlStr.substr(comIndex, 5), domain+domainString);
		} else if (currentUrlLength >= comIndex+10 && SUPPORTED_LOCALE_STR.indexOf(currentUrlStr.substr(comIndex+domainLength, 6).toLowerCase()) >= 0 
		   && currentUrlStr.substr(comIndex+domainLength, 6).toLowerCase() != "/"+newCountry+"/"+newLangShort){
			domainString = domainString.substr(0,domainString.length-1);
			window.location = currentUrlStr.replace(currentUrlStr.substr(comIndex, 10), domain+domainString);
		}
	}                            
}

/**
 * @todo Document this function
 */
function getCountryForLocale(locale) {
	if (locale!=null) {
		var passedLocale = locale.toLowerCase();
		for (var i = 0; i < SUPPORTED_LOCALE.length; i++) {
			var slocale = SUPPORTED_LOCALE[i].toLowerCase();
			if (slocale==passedLocale) {
				return SUPPORTED_COUNTRY[i];
			}
		}
	return DEFAULT_COUNTRY;
	}
}

/**
 * @todo Document this function
 */
function getLocaleForCountry(country) {
	var passedCountry = country.toLowerCase();
	
	if ("nz"==passedCountry.toLowerCase()) {
		//return "en-AU"
		passedCountry="au";
	} else if ("th"==passedCountry.toLowerCase()) {
		//return "en-AS"
		passedCountry="as";
	}
	for (var i = 0; i < SUPPORTED_COUNTRY.length; i++) {
		var sCountry = SUPPORTED_COUNTRY[i].toLowerCase();
		if (sCountry==passedCountry) {
			return SUPPORTED_LOCALE[i];
		}
	}
	return DEFAULT_LOCALE;
}



/*updates the country/lang in the footer next to the globe. */
function setGlobeLocaleCountry(){
    var selectorCountry = null;
    var selectorLanguage = null;
    var ecommTempCookie = getCookie(LOCALE_COOKIE_NAME_ECOMM_TEMP);
    var ecommPermCookie = getCookie(LOCALE_COOKIE_NAME_ECOMM_PERMANENT);
    var localeTempCookie = getCookie(LOCALE_COOKIE_NAME_TEMP);
    var localePermCookie = getCookie(LOCALE_COOKIE_NAME_PERMANENT);
    if (ecommTempCookie != null && isSupportedEcommLocale(ecommTempCookie)){
    	selectorLanguage = ecommTempCookie.substr(0,2);
    	selectorCountry = ecommTempCookie.substr(3,5);
    } else if (ecommPermCookie != null && isSupportedEcommLocale(ecommPermCookie)){
        selectorLanguage = ecommPermCookie.substr(0,2);
    	selectorCountry = ecommPermCookie.substr(3,5);
    } else if (localeTempCookie != null){
     	selectorLanguage = localeTempCookie.substr(0,2);
    	selectorCountry = localeTempCookie.substr(3,5);
    } else if (localePermCookie != null){
    	selectorLanguage = localePermCookie.substr(0,2);
    	selectorCountry = localePermCookie.substr(3,5); 
    } else {
    	selectorCountry = currentCountry;
    }
	var countryKey="country.unitedStates";
	var languageKey = "country.unitedStates.lang";
	if (selectorCountry == "be"){
		if(selectorLanguage == "fr"){
			countryKey="country.belgiumf";
			languageKey = "country.belgiumf.lang";
		}else{
			countryKey="country.belgiumn";
			languageKey = "country.belgiumn.lang";
		}
    }else if (selectorCountry == "em"){
		if(selectorLanguage == "en"){
			countryKey="country.menaEnglish";
			languageKey = "country.menaEnglish.lang";
		}else{
			countryKey="country.menaArabic";
			languageKey = "country.menaArabic.lang";
		}
    }else{
		for (var i = 0; i < SUPPORTED_COUNTRY.length; i++) {
			var country = SUPPORTED_COUNTRY[i].toLowerCase();
			if (country==selectorCountry) {
				countryKey = COUNTRY_KEYS[i];
				languageKey = countryKey+".lang";
			}
		}
	}
	document.getElementById('currentCountry').innerHTML = document.getElementById(countryKey).innerHTML + " " + document.getElementById(languageKey).innerHTML;
}

function isSupportedEcommLocale(locale) {
	for (var i = 0; i < SUPPORTED_ECOMM_LOCALE.length; i++) {
		if (locale == SUPPORTED_ECOMM_LOCALE[i]) {
			return true;
		}
	}
	return false;
}

/**
 * @todo Document this function
 */
function isSupportedCountry(country) {
	var passedCountry = country.toLowerCase();
	if ("nz"==passedCountry.toLowerCase()) {
		//return "en-AU"
		passedCountry="au";
	} else if ("th"==passedCountry.toLowerCase()) {
		//return "en-AS"
		passedCountry="as";
	}
	for (var i = 0; i < SUPPORTED_COUNTRY.length; i++) {
		var sCountry = SUPPORTED_COUNTRY[i].toLowerCase();
		if (sCountry==passedCountry) {
			return true;
		}
	}
	return false;
}

/**
 * @todo Document this function
 */
function getLocaleFromURL(domain,defaultLocale)
{
	var currentUrl = window.location;
	var currentUrlStr = currentUrl.toString();
	if(currentUrlStr.indexOf(domain)>0)
	{
		var currentIndex = currentUrlStr.indexOf(domain);
		var subString = currentUrlStr.substring(currentIndex+domain.length,currentIndex+domain.length+5);
		if(subString!='' && SUPPORTED_LOCALE_STR.indexOf(subString)>-1)
		{
			var localeArr = subString.split("/");
			return localeArr[1]+"-"+localeArr[0];		
		}
		else
		{
			return defaultLocale;
		}
	}
	else
	{
		return 0;
	}

}

/**
 * @todo Document this function
 */
function setLocaleOnLoad() {
	var param_index = document.URL.indexOf('stxLoc');
	//var flagPage=$("#flagPage").val();
	var selectedLocaleCookie = getCookie(LOCALE_COOKIE_NAME_TEMP);
	var permanentLocaleCookie = getCookie(LOCALE_COOKIE_NAME_PERMANENT);
	var cookieFlag = false;
	if(selectedLocaleCookie != null && selectedLocaleCookie != "null" && selectedLocaleCookie != ""){
			currentLocale =  selectedLocaleCookie;
			currentCountry = getCountryForLocale(currentLocale);
	} else if(permanentLocaleCookie != null && permanentLocaleCookie != "") {
		currentLocale =  permanentLocaleCookie;
		currentCountry = getCountryForLocale(currentLocale);
	} else {
		for(var i=0;i<DOMAIN_ARR.length;i++) {
				localeUrl = getLocaleFromURL(DOMAIN_ARR[i]+"/",DOMAIN_LOCALE_ARR[i]);
				if(localeUrl!=0) {
					break;
				}
		}
		currentLocale =  localeUrl;
		currentCountry = getCountryForLocale(currentLocale);		
	}
	//Redirect if required
	if (param_index != -1){
		currentLocale = document.URL.substring(param_index +7, param_index + 12)
	}
	setNewLocale(currentLocale,cookieFlag);
}

function getKeyValueFromCookie (cookieName, key) {
	if (cookieName =="" ) {
		return "";
	} else if (key=="") {
		return "";
	} else {
	// get the cooke
	if(getCookie(cookieName)===null || getCookie('stxEdgescape') == undefined){
		 return "";
	}
	var cookieValue= getCookie(cookieName);
	//cookieValue = "country_code=US,region_code=OK,city=OKLAHOMACITY,lat=35.5506,long=-97.6404,timezone=CST,zip=73101-73132+73134-73137+73139-73157+73159-73160+73162-73165+73167+73169-73170+73172-73173+73178-73179+73184-73185+73189-73190+73194-73196,continent=NA,throughput=vhigh,asnum=18723,network=,network_type=,proxy=,pmsa=,msa=5880,area_code=,county=OKLAHOMA+CLEVELAND,fips=40109+40027"
	if (cookieValue!="") {
		var i,x,y,ARRcookies=cookieValue.split(",");
		for (i=0;i<ARRcookies.length;i++) {
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==key) {
			return unescape(y);
		  }
		}
	}	
	return "";
	}
}

