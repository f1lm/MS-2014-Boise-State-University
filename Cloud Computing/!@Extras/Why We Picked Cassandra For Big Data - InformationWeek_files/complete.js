// this variable should be populated conditionally in the site template
var theSiteDomain = 'www.lightreading.com';

// this variable should be populated before including msgchatqueue js file
var theMsgChatQueueInclude = '';

// this variable should be populated before including chatstatus js file
var theChatStatusInclude = '';

// this variable should be changed if you don't want switching divs to opacity fade in and out
var doHideShowDivOpacityFade = true;

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) {
  window.open(theURL,winName,features);
}

function SwitchColor(objname,thiscolor){
	var theObj;
	if (document.all) {
		// if it's IE...
		// get object
		theObj = eval('document.all.' + objname + '.style');
		// change color
		theObj.backgroundColor = thiscolor;
	} else {
		// for not IE, check to see if old NS
		if (document.layers) {
			// this is old NS
			// get object
			theObj = eval('document.' + objname);
			// change color
			theObj.backgroundColor = thiscolor;
		} else {
			// check to see if uses new DOM, like new Mozillas (Firefox, NS, and Mozilla)
			// note: this check assumes that objname refers to a valid id in the document
			if (document.getElementById(objname)) {
				// it does
				// get object
				theObj = document.getElementById(objname);
				// change color
				theObj.style.backgroundColor = thiscolor;
			}
		}
	}
}

function MakeDark(objname,thecolor){
	//var thecolor = "#ffffff";
	SwitchColor(objname,thecolor);
}

function MakeLight(objname,thecolor){
	//var thecolor = "#e6e6e6";
	SwitchColor(objname,thecolor);
}

// determine browser support
pop_ns4 = (document.layers)?true:false
pop_dom = (document.all)?true:false

var pop_collection="";
var pop_styleObj="";
if (pop_dom) {
	pop_collection="all.";
	pop_styleObj=".style";
	//document.write("dom is true<br>");
}

if (pop_ns4) {
	//document.write("ns4 is true<br>");
}

function GetObject(objname) {
	var theObj;
	if (pop_ns4 || pop_dom) {
		theObj= eval("document." + pop_collection + objname);
	} else {
		if (document.getElementById(objname)) {
			theObj = document.getElementById(objname);
		}
		
	}
	return theObj;
}

function SwitchHTML(thisguy,newhtml){
	thisobj = GetObject(thisguy);
	// this revealTrans crap is unreliable... kill it
	/*if(document.all &&! window.opera) {
		thisobj.filters.revealTrans.apply();
	}*/
	thisobj.innerHTML = newhtml;
	/*if(document.all &&! window.opera) {
		thisobj.filters.revealTrans.play();
	}*/
}

function SwitchDivs(objnameone,objnametwo) {
	HideDiv(objnameone); 
	ShowDiv(objnametwo); 
}

function HideDiv(objname) {
	var divHide = GetObject(objname); 
	if (doHideShowDivOpacityFade) {
		SlideObjOpacity(objname, 100, 0, 3);
	}
	divHide.style.display = 'none';
	if (doHideShowDivOpacityFade) {
		ChangeObjOpacity(objname, 100);
	}
}

function ShowDiv(objname) {
	var divShow = GetObject(objname); 
	if (doHideShowDivOpacityFade) {
		ChangeObjOpacity(objname, 0);
	}
	divShow.style.display = 'block';
	if (doHideShowDivOpacityFade) {
		SlideObjOpacity(objname, 0, 100, 3);
	}
}

function URLEncodeString(inString) { 
	var outString = escape(inString); 
	outString = outString.replace('+', '%2B'); 
	outString = outString.replace('/', '%2F');  
	return outString; 
}

var opacitySliderTimeouts = new Array();

function SlideObjOpacity(inObjName, inStartOpacity, inEndOpacity, inSlideFrameTime) {
	// initialize frame count
	var thisFrame = 0;
	
	// figure out if we're going up or down
	if (inStartOpacity < inEndOpacity) {
		for (var s = inStartOpacity; s <= inEndOpacity; s++) {
			opacitySliderTimeouts['opacity_slider_' + inObjName + '_'+ thisFrame] = setTimeout('ChangeObjOpacity(\'' + inObjName +'\', ' + s + ');', (thisFrame * inSlideFrameTime));
			thisFrame++;
		}
	}
	else if (inStartOpacity > inEndOpacity) {
		for (var s = inStartOpacity; s >= inEndOpacity; s--) {
			opacitySliderTimeouts['opacity_slider_' + inObjName + '_'+ thisFrame] = setTimeout('ChangeObjOpacity(\'' + inObjName +'\', ' + s + ');', (thisFrame * inSlideFrameTime));
			thisFrame++;
		}
	}
	else {
		// do nothing
	}
}

function ChangeObjOpacity(inObjName, inOpacity) {
	var theObj = GetObject(inObjName);
	theObj.style.filter = 'alpha(opacity=' + inOpacity +')';
	theObj.style.MozOpacity = (inOpacity / 100);
	theObj.style.KhtmlOpacity = (inOpacity / 100);
	theObj.style.opacity = (inOpacity / 100);
}

var heightSliderTimeouts = new Array();

function SlideObjHeight(inObjName, inStartHeight, inEndHeight, inSlideFrameTime) {
	// initialize frame count
	var thisFrame = 0;
	
	// figure out if we're going up or down
	if (inStartHeight < inEndHeight) {
		for (var s = inStartHeight; s <= inEndHeight; s++) {
			heightSliderTimeouts['height_slider_' + inObjName + '_'+ thisFrame] = setTimeout('ChangeObjHeight(\'' + inObjName +'\', ' + s + ');', (thisFrame * inSlideFrameTime));
			thisFrame++;
		}
	}
	else if (inStartHeight > inEndHeight) {
		for (var s = inStartHeight; s >= inEndHeight; s--) {
			heightSliderTimeouts['height_slider_' + inObjName + '_'+ thisFrame] = setTimeout('ChangeObjHeight(\'' + inObjName +'\', ' + s + ');', (thisFrame * inSlideFrameTime));
			thisFrame++;
		}
	}
	else {
		// do nothing
	}
}

function ChangeObjHeight(inObjName, inHeight) {
	var theObj = GetObject(inObjName);
	theObj.style.overflow = 'hidden';
	if (inHeight == null || inHeight <= 0) {
		theObj.style.display = 'none';
	} 
	else {
		theObj.style.height = inHeight;
		if (theObj.style.display == 'none') {
			theObj.style.display = 'block';
		}
	}
}

function ClearTimeoutArray(inArray,objname) {
	// when setting keys in the array, the name of the object being moved should be included somewhere in the key
	thisArray = inArray;
	for(key in thisArray){
		if (objname) {
			if (key.indexOf(objname) >= 0) {
				clearTimeout(thisArray[key]);
			}
		}
		else {
			clearTimeout(thisArray[key]);
		}
	}
}

function AttachEventFunctionToObject(inObjectName, inEventName, inFunctionName) {
	// make sure to pass inEventName without "on" at the beginning... we'll add that automatically below
	// remember that you can't pass variables to function you will call when the event happens
	var theObject = GetObject(inObjectName);
	if (theObject.addEventListener){
		theObject.addEventListener(inEventName, inFunctionName, false);
	} 
	else if (theObject.attachEvent) {
		theObject.attachEvent('on' + inEventName, inFunctionName);
	}
}

function RemoveEventFunctionFromObject(inObjectName, inEventName, inFunctionName) {
	// make sure to pass inEventName without "on" at the beginning... we'll add that automatically below
	// remember that you can't pass variables to function you will call when the event happens
	var theObject = GetObject(inObjectName);
	if (theObject.addEventListener){
		theObject.removeEventListener(inEventName, inFunctionName, false);
	} 
	else if (theObject.attachEvent) {
		theObject.detachEvent('on' + inEventName, inFunctionName);
	}
}
function SetCookie(cookieName, cookieValue, daysTilExpires) {
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + daysTilExpires);
	document.cookie = cookieName + '=' + escape(cookieValue) + 
	( (daysTilExpires==null) ? '' : ';expires=' + expDate.toGMTString() );
}

function GetCookie(cookieName) {
	var theCookie = unescape(document.cookie);
	if (theCookie.length > 0) {
		var cookieValStart = theCookie.indexOf(cookieName + '=');
		if (cookieValStart != -1) { 
			cookieValStart = cookieValStart + cookieName.length + 1; 
			cookieValEnd = theCookie.indexOf(';',cookieValStart);
    			if (cookieValEnd == -1) {
    				cookieValEnd = theCookie.length;
    			}
			return theCookie.substring(cookieValStart,cookieValEnd);
		} 
		else {
		}
	}
	else {
	}
return '';
}

function AlignObject(objName, leftAlignObjName, topAlignObjName) {
	var leftAlignObj = GetObject(leftAlignObjName);
	var leftVal = returnPosXofObj(leftAlignObj); 
	var topAlignObj = GetObject(topAlignObjName);
	var topVal = returnPosYofObj(topAlignObj);
	MoveObject(objName, leftVal, topVal);
}

function MoveObject(objName, theLeftVal, theTopVal) {
	var theObj = GetObject(objName);
	theObj.style.position = 'absolute';
	ShowMenu(objName,theLeftVal,theTopVal);
}

function MoveDivToColTop(inDivToMoveName, inColumnName, inColTopDivName) {
	// get column parent element and the element at the top of that column
	var theColumn = GetObject(inColumnName);
	var divTopOfColumn = GetObject(inColTopDivName);
	// grab the element to move by removing it to variable
	var divToMove = GetObject(inDivToMoveName);
	// insert that element before the top of column element
	theColumn.insertBefore(divToMove,divTopOfColumn);
	// remove the top of column element
	theColumn.removeChild(divTopOfColumn);
	// insert the top of column element before the element we just moved to the top
	theColumn.insertBefore(divTopOfColumn,divToMove);
}

function AddEventListenerToObj(targetObj, eventType, functionRef, atCapture) {
	if (typeof targetObj.addEventListener != 'undefined') {
		targetObj.addEventListener(eventType, functionRef, atCapture);
	}
	else if (typeof targetObj.attachEvent != 'undefined') {
		targetObj.attachEvent("on" + eventType, functionRef);
	}
	else {
		eventType = "on" + eventType;

		if (typeof targetObj[eventType] == 'function') {
			var existingListener = targetObj[eventType];

			targetObj[eventType] = function() {
				oldListener();
				
				return functionRef();
			}
		}
		else {
			targetObj[eventType] = functionRef;
		}
	}
	
	return true; 
}

function ContentNotifyPrefsShortSubmit(inFormName, inFormMessageDiv) { 
	var theForm = GetObject(inFormName); 
	var theContentNotifyPrefsSubmitURL = 'http://'+ theSiteDomain +'/register_action.asp?p_outmsgname='+ inFormMessageDiv +'&'; 
	for (var felt = 0; felt <  theForm.elements.length; felt++) {
		var thisElt = theForm.elements[felt]; 
		if (thisElt.type == 'checkbox' || thisElt.type == 'radio') { 
			if (thisElt.checked) { 
				if (thisElt.name == 'pcep_cdids') {
					theContentNotifyPrefsSubmitURL = theContentNotifyPrefsSubmitURL + 'pcep_cdids' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_exc_cdids') {
					theContentNotifyPrefsSubmitURL = theContentNotifyPrefsSubmitURL + 'pcep_exc_cdids' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_fdids') {
					theContentNotifyPrefsSubmitURL = theContentNotifyPrefsSubmitURL + 'pcep_fdids' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_exc_fdids') {
					theContentNotifyPrefsSubmitURL = theContentNotifyPrefsSubmitURL + 'pcep_exc_fdids' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
			} 
		} 
		else { 
			theContentNotifyPrefsSubmitURL = theContentNotifyPrefsSubmitURL + thisElt.name + '=' + URLEncodeString(thisElt.value) + '&'; 
		} 
	} 
	//alert(theContentNotifyPrefsSubmitURL); 
	LoadScript(theContentNotifyPrefsSubmitURL); 
	return false; 
} 

function ContentNotifyPrefsShortGenerateAndDisplayRSSFeed(inFormName, inFormMessageDiv, inMessageStart, inMessageEnd) { 
	var theForm = GetObject(inFormName); 
	var theRSSURL = 'http://www.internetevolution.com/rss_simple.asp?videoblogs=yes&'; 
	for (var felt = 0; felt <  theForm.elements.length; felt++) {
		var thisElt = theForm.elements[felt]; 
		if (thisElt.type == 'checkbox' || thisElt.type == 'radio') { 
			if (thisElt.checked) { 
				if (thisElt.name == 'pcep_cdids') {
					theRSSURL = theRSSURL + 'f_s' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_exc_cdids') {
					theRSSURL = theRSSURL + 'f_exs' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_fdids') {
					theRSSURL = theRSSURL + 'f_n' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_exc_fdids') {
					theRSSURL = theRSSURL + 'f_exn' + '=' + URLEncodeString(thisElt.value) + '&'; 
				}
				if (thisElt.name == 'pcep_exc_cdstr') {
					if (thisElt.value == 'Video Blog') {
						theRSSURL = 'http://www.internetevolution.com/rss_simple.asp?videoblogs=yes';
						break;
					}
				}
			} 
		} 
	} 
	//alert(theRSSURL); 
	GetObject(inFormMessageDiv).innerHTML = inMessageStart + '<a href=\"' + theRSSURL + '\" target=\"new\"><u>Click here for your RSS feed.</u></a><br \/><br \/>' + inMessageEnd;
	return false; 
} 

function RedirectConfirm(inConfirmPrompt,inRedirectUrl) {
	var answer = confirm(inConfirmPrompt);
	if (answer){
		window.location = inRedirectUrl;
	}
	return false;
}

function blend(theObj) {
	//if(document.all &&! window.opera) {
	//	theObj.filters.revealTrans.apply(); 
	//	theObj.filters.revealTrans.play(); 
	//} 
} 

function returnPosYofObj(obj) {
	var objtop = 0;
	// check to see if obj has a container
	if(obj.offsetParent)
	while(1) {
		objtop += obj.offsetTop;
		// if there is no further container, get out of while
		if(!obj.offsetParent)
			break;
		obj = obj.offsetParent;
	}
	else if(obj.y)
		objtop += obj.y;
	return objtop;
}

function returnPosXofObj(obj) {
	var objleft = 0;
	// check to see if obj has a container
	if(obj.offsetParent)
	while(1) {
		objleft += obj.offsetLeft;
		// if there is no further container, get out of while
		if(!obj.offsetParent)
			break;
		obj = obj.offsetParent;
	}
	else if(obj.x)
		objleft += obj.x;
	return objleft;
}

function returnCurrentWindowYOffset() {
	if (document.all) {
		// if it's IE...
		return document.body.scrollTop;
	} else {
		return window.pageYOffset;
	}
}

function returnCurrentWindowXOffset() {
	if (document.all) {
		// if it's IE...
		return document.body.scrollLeft;
	} else {
		return window.pageXOffset;
	}
}

var menuMoverTimeouts = new Array();

var menuMoverTimeouts = new Array();
var menuMoverTimeoutCounter = 1;

var menuMaxOpacity = 90;

function ShowMenu(objname,xVal,yVal) {
	// function gets the object name, then conditionally grabs the object and moves its x,y coords to where we want them
	
	var theObj = GetObject(objname);
	if (returnPosXofObj(theObj) == xVal && returnPosYofObj(theObj) == yVal){
		// clear our timeout arrays
		ClearTimeoutArray(closeMenuTimeouts, objname);
		ClearTimeoutArray(menuMoverTimeouts, objname);
		ClearTimeoutArray(opacitySliderTimeouts,objname);
		ChangeObjOpacity(objname, menuMaxOpacity);
	}
	else {
		// if the object is already visible, slide it to the new position... else, fade out/in as normal
		if ((xVal > 0 && yVal > 0) && (returnPosXofObj(theObj) > 0 && returnPosYofObj(theObj) > 0)) {
			
			// clear any other timeouts
			ClearTimeoutArray(menuMoverTimeouts, objname);
			
			// handle slow catchup to scrolling windows
			
			var proximityCheckVal = 100;
			if ((returnPosXofObj(theObj) - xVal) > proximityCheckVal){
				// we're moving to the left
				ChangeObjectLeft(objname, xVal + proximityCheckVal);
			}
			else if ((returnPosXofObj(theObj) - xVal) < -proximityCheckVal) {
				// we're moving to the right
				ChangeObjectLeft(objname, xVal - proximityCheckVal);
			}
			if ((returnPosYofObj(theObj) - yVal) > proximityCheckVal){
				// we're moving up
				ChangeObjectTop(objname, yVal + proximityCheckVal);
			}
			else if ((returnPosYofObj(theObj) - yVal) < -proximityCheckVal) {
				// we're moving down
				ChangeObjectTop(objname, yVal - proximityCheckVal);
			}
			
			// move the menu the rest of the way
			
			if (returnPosXofObj(theObj) > xVal) {
				for (var incr = 1; incr <=  NumStepsToMove(returnPosXofObj(theObj),xVal); incr++) {
					menuMoverTimeouts['menu_move_' + objname + '_left_'+ menuMoverTimeoutCounter + '_' + incr] = setTimeout('ChangeObjectLeft(\'' + objname  + '\', '+ (returnPosXofObj(theObj) - incr) + ');',(incr * 2));
					menuMoverTimeoutCounter++;
				}
			}
			else {
				for (var incr = 1; incr <=  NumStepsToMove(returnPosXofObj(theObj),xVal); incr++) {
					menuMoverTimeouts['menu_move_' + objname + '_left_'+ menuMoverTimeoutCounter + '_'+ incr] = setTimeout('ChangeObjectLeft(\'' + objname + '\', '+ (returnPosXofObj(theObj) + incr) + ');',(incr * 2));
					menuMoverTimeoutCounter++;
				}
			}
			if (returnPosYofObj(theObj) > yVal) {
				for (var incr = 1; incr <=  NumStepsToMove(returnPosYofObj(theObj),yVal); incr++) {
					menuMoverTimeouts['menu_move_' + objname + '_top_'+ menuMoverTimeoutCounter + '_'+ incr] = setTimeout('ChangeObjectTop(\'' + objname + '\', '+ (returnPosYofObj(theObj) - incr) + ');',(incr * 2));
					menuMoverTimeoutCounter++;
				}
			}
			else {
				for (var incr = 1; incr <=  NumStepsToMove(returnPosYofObj(theObj),yVal); incr++) {
					menuMoverTimeouts['menu_move_' + objname + '_top_'+ menuMoverTimeoutCounter + '_'+ incr] = setTimeout('ChangeObjectTop(\'' + objname + '\', '+ (returnPosYofObj(theObj) + incr) + ');',(incr * 2));
					menuMoverTimeoutCounter++;
				}
			}

			if (returnPosXofObj(theObj) != xVal) {
				if (returnPosXofObj(theObj) > xVal) {
					ChangeObjectLeft(objname, returnPosXofObj(theObj) - 1);
				}
				else {
					ChangeObjectLeft(objname, returnPosXofObj(theObj) + 1);
				}
			}
			if (returnPosYofObj(theObj) != yVal) {
				if (returnPosYofObj(theObj) > yVal) {
					ChangeObjectTop(objname, returnPosYofObj(theObj) - 1);
				}
				else {
					ChangeObjectTop(objname, returnPosYofObj(theObj) + 1);
				}
			}
			
		}
		else {
			
			// change opacity to 0
			ChangeObjOpacity(objname, 0);
			// move it
			ChangeObjectLeft(objname, xVal);
			ChangeObjectTop(objname, yVal);
			// slide opacity from 0 to 100
			SlideObjOpacity(objname, 0, menuMaxOpacity, 2);
		}
	}
}

function ChangeObjectLeft(objname, xVal) {
	// function gets the object name, then conditionally grabs the object and moves its x,y coords to where we want them
	var theObj = GetObject(objname);
	if (document.all) {
		// if it's IE...
		theObj.style.pixelLeft = xVal;
	} else {
		// for not IE, check to see if old NS
		if (document.layers) {
			// this is old NS
			theObj.left = xVal;
		} else {
			// check to see if uses new DOM, like new Mozillas (Firefox, NS, and Mozilla)
			// note: this check assumes that objname refers to a valid id in the document
			if (document.getElementById(objname)) {
				// it does
				theObj.style.left = xVal + 'px';
			}
		}
	}
}

function ChangeObjectTop(objname, yVal) {
	// function gets the object name, then conditionally grabs the object and moves its x,y coords to where we want them
	var theObj = GetObject(objname);
	if (document.all) {
		// if it's IE...
		theObj.style.pixelTop = yVal;
	} else {
		// for not IE, check to see if old NS
		if (document.layers) {
			// this is old NS
			theObj.top = yVal;
		} else {
			// check to see if uses new DOM, like new Mozillas (Firefox, NS, and Mozilla)
			// note: this check assumes that objname refers to a valid id in the document
			if (document.getElementById(objname)) {
				// it does
				theObj.style.top = yVal + 'px';
			}
		}
	}
}

function NumStepsToMove(startVal,endVal) {
	var stepsToMove = Math.abs((startVal - endVal));
	return stepsToMove;
}

function AddPopMenuEventListener(targetObjName, menuObjName, xOffset, yOffset) {
	var theXOffset = 0;
	var theYOffset = 0;
	if (typeof xOffset == 'number') {
		theXOffset = xOffset;
	}
	if (typeof yOffset == 'number') {
		theYOffset = yOffset;
	}
	
	if (typeof GetObject(targetObjName) != 'undefined') {
		AddEventListenerToObj(GetObject(targetObjName),'mouseover', function() { PopMenu(menuObjName,(returnPosXofObj(GetObject(targetObjName)) + theXOffset),(returnPosYofObj(GetObject(targetObjName)) + theYOffset)); }, false);
		AddEventListenerToObj(GetObject(targetObjName),'mouseout', function() { PopMenuOff(menuObjName, -500, 38); }, false);
		AddEventListenerToObj(GetObject(menuObjName),'mouseout', function() { PopMenuOff(menuObjName, -500, 38);}, false);
	}
}

var lockPoppedMenu = false;
var lockedPoppedMenuObjName = '';

function PopMenu(menuObjName,xVal,yVal) {
	var thePoppedMenu = GetObject(menuObjName);
	var doMenuAdd = true;
	
	if (!lockPoppedMenu || (lockPoppedMenu && lockedPoppedMenuObjName == lockedPoppedMenuObjName)) {

		ShowMenu(menuObjName,xVal,yVal);

		AddEventListenerToObj(thePoppedMenu, 'mouseover', function() { ShowMenu(menuObjName,xVal,yVal); }, false);

		//thePoppedMenu.onmouseover = function() {
		//	ShowMenu(menuObjName,xVal,yVal);
		//};
	}
}

var closeMenuTimeouts = new Array();
var closeMenuTimeoutCounter = 1;

function PopMenuOff(menuObjName, xVal, yVal) {
	
	closeMenuTimeouts['close_menu_' + menuObjName + '_' + closeMenuTimeoutCounter] = setTimeout('ShowMenu(\''+ menuObjName +'\','+ xVal +','+ yVal +'); ClearTimeoutArray(closeMenuTimeouts, \''+ menuObjName +'\');',100);
	closeMenuTimeoutCounter++;
	
	//ShowMenu(menuObjName, xVal, yVal);
}

var globalPopXDiff = 10;
var globalPopYDiff = 0;

function createSubmenu(subMenuName, linkArr, attachTo, inPopMenuClass, inPopMenuSubItemWrapperClass, inPopMenuLastSubItemWrapperClass, inPopMenuSubItemClass, inPopLeft, inPopTop, inXDiff, inYDiff) {
	var attachToName;
	var attachMenu;
	var myFunction = new Array();
	var subMenuObj;
	var inPopMenuClass;
	var inPopMenuSubItemWrapperClass;
	var inPopMenuLastSubItemWrapperClass;
	var inPopMenuSubItemClass;
	var inPopLeft;
	var inPopTop;
	var inXDiff;
	var inYDiff;
	var popMenuClass = 'popmenu';
	var popMenuSubItemWrapperClass = 'popmenusubitemwrapper';
	var popMenuLastSubItemWrapperClass = 'popmenulastsubitemwrapper';
	var popMenuSubItemClass = 'popmenusubitem';
	var popLeft = false;
	var popTop = false;
	// assumes that the global diff will be added to the width or height of the element to which the menu is attached
	// NOTE:  this applies to non-popTop and non-popLeft as well
	var popXDiff = globalPopXDiff;
	var popYDiff = globalPopYDiff;
	
	if (subMenuName.indexOf('{') >= 0 || subMenuName.indexOf('}') >= 0) {
		subMenuObj = eval('(' + subMenuName + ')');
		theSubMenuName = subMenuObj.theSubMenuName;
		inPopMenuClass = subMenuObj.menuClass;
		inPopMenuSubItemWrapperClass = subMenuObj.menuSubItemWrapperClass;
		inPopMenuLastSubItemWrapperClass = subMenuObj.menuLastSubItemWrapperClass;
		inPopMenuSubItemClass = subMenuObj.menuSubItemClass;
		inPopLeft = subMenuObj.menuPopLeft;
		inPopTop = subMenuObj.menuPopTop;
		inXDiff = subMenuObj.menuXDiff;
		inYDiff = subMenuObj.menuYDiff;
	} else {
		theSubMenuName = subMenuName;
	}
	
	if (typeof inPopMenuClass == 'string') {
		popMenuClass = inPopMenuClass;
	}
	if (typeof inPopMenuSubItemWrapperClass == 'string') {
		popMenuSubItemWrapperClass = inPopMenuSubItemWrapperClass;
	}
	if (typeof inPopMenuLastSubItemWrapperClass == 'string') {
		popMenuLastSubItemWrapperClass = inPopMenuLastSubItemWrapperClass;
	}
	if (typeof inPopMenuSubItemClass == 'string') {
		popMenuSubItemClass = inPopMenuSubItemClass;
	}
	
	if (typeof inPopLeft == 'boolean') {
		popLeft = inPopLeft;
	}
	if (typeof inPopTop == 'boolean') {
		popTop = inPopTop;
	}
	
	var newSubmenu = document.createElement('div');
	newSubmenu.setAttribute('id', theSubMenuName);
	newSubmenu.setAttribute('name', theSubMenuName);
	newSubmenu.setAttribute('class', popMenuClass);
	newSubmenu.setAttribute('className', popMenuClass);
	for (var i=0; i < linkArr.length; i++) {
		var newDiv = document.createElement('div');
		newDiv.setAttribute('id', theSubMenuName + "_submenuwrapper" + i);
		newDiv.setAttribute('name', theSubMenuName +"_submenuwrapper" + i);
		// don't do this if this is the last item in the menu
		if (i != (linkArr.length - 1)) {
			newDiv.setAttribute('class', popMenuSubItemWrapperClass);
			newDiv.setAttribute('className', popMenuSubItemWrapperClass);
		} else {
			newDiv.setAttribute('class', popMenuLastSubItemWrapperClass);
			newDiv.setAttribute('className', popMenuLastSubItemWrapperClass);
		}
		newSubmenu.appendChild(newDiv);
		var newSubDiv = document.createElement('div');
		newSubDiv.setAttribute('id', theSubMenuName + '_submenu' + i);
		newSubDiv.setAttribute('name', theSubMenuName + '_submenu' + i);
		newSubDiv.setAttribute('class', popMenuSubItemClass);
		newSubDiv.setAttribute('className', popMenuSubItemClass);
		if (linkArr[i][1] + '' != '') {
			newSubDiv.innerHTML = '<a href=\''+ linkArr[i][1] +'\'>' + linkArr[i][0] +'</a>';
		} else {
			newSubDiv.innerHTML = linkArr[i][0];
		}
		newDiv.appendChild(newSubDiv);
	}
	document.body.appendChild(newSubmenu);
	// grab pop width using submenu
	// inXDiff overrides global
	if (typeof inXDiff == 'number') {
		if (popLeft) {
			popXDiff = inXDiff - GetObject(theSubMenuName).offsetWidth;
		} else {
			popXDiff = inXDiff;
		}
	} else {
		if (popLeft) {
			popXDiff = -1 * (GetObject(theSubMenuName).offsetWidth + popXDiff);
		} else {
			// stays the same
			popXDiff = popXDiff;
		}
	}
	if (attachTo instanceof Array) {
		for (var j=0; j < attachTo.length; j++ ) {
			attachMenuNodes = document.getElementsByName(attachTo[j]);
			if ( attachMenuNodes.length > 0 ) {
				var attachMenu = attachMenuNodes[0];
			}
			attachToName = attachTo[j];
			// inYDiff overrides global
			if (typeof inYDiff == 'number') {
				if (popTop) {
					popYDiff = -1 * (GetObject(theSubMenuName).offsetHeight + inYDiff);
				} else {
					popYDiff = inYDiff;
				}
			} else {
				if (popTop) {
					popYDiff = -1 * (GetObject(theSubMenuName).offsetHeight + popYDiff);
				} else {
					popYDiff = GetObject(theSubMenuName).offsetHeight + popYDiff;
				}
			}
			AddPopMenuEventListener(attachToName, theSubMenuName, popXDiff, popYDiff);
		}
	}
	else {
		attachMenuNodes = document.getElementsByName(attachTo);
		// inYDiff overrides global
		if (typeof inYDiff == 'number') {
			if (popTop) {
				popYDiff = -1 * GetObject(theSubMenuName).offsetHeight + inYDiff;
			} else {
				popYDiff = inYDiff;
			}
		} else {
			if (popTop) {
				popYDiff = -1 * (GetObject(theSubMenuName).offsetHeight + popYDiff);
			} else {
				popYDiff = GetObject(attachTo).offsetHeight + popYDiff;
			}
		}
		AddPopMenuEventListener(attachTo, theSubMenuName, popXDiff, popYDiff);
	}
}

// since there will potentially be many of these on a page, instantiate with a unique name
function LRSliderHandler() {

	this.thisSliderElementName = '';
	this.sliderElementCount = 0;
	this.sliderElementSize = 0;
	this.sliderElementHeight = 0;
	this.sliderObjectViewsize = 0;
	this.sliderRightLimit = this.sliderElementSize * ((this.sliderElementCount - this.sliderObjectViewsize) * -1) + 1;
	this.sliderBottomLimit = this.sliderElementHeight * ((this.sliderElementCount - this.sliderObjectViewsize) * -1) + 1;
	this.currentSliderElement = 1;
	this.sliderObjectId = '';
	this.sliderDoSlide = true;
	
	var myself = this;
	
	// by default, these don't do anything... replace them contextually with functions that does what you need
	this.LRSliderNavGraphicsHandlerSlideLeft = function() {
		
	}
	
	this.LRSliderNavGraphicsHandlerSlideRight = function() {
		
	}

	this.LRSliderSlide = function(newElement) {
		var newPosition = newElement - this.currentSliderElement;
		if (newElement >= 1 && newElement <= this.sliderElementCount) {
			if (newPosition < 0) {
				// we need to slide left
				this.LRSliderSlideLeft(Math.abs(newPosition));
			} else if (newPosition > 0) {
				// we need to slide right
				this.LRSliderSlideRight(newPosition);
			}
		}
	}

	this.LRSliderSlideLeft = function(count){
		if (this.sliderDoSlide) {
			for (i = 1; i <= (count * this.sliderElementSize);i++){
				setTimeout(this.thisSliderElementName + '.LRSliderScroll(' + 1 + ');', (i * 2));
			}
		} else {
			setTimeout(this.thisSliderElementName + '.LRSliderJump(' + 1 * count * this.sliderElementSize + ');', (2));
		}
		for (i = 0; i < count; i++){
			if(this.currentSliderElement > 1){
				this.currentSliderElement = this.currentSliderElement - 1;
				this.LRSliderNavGraphicsHandlerSlideLeft();
			}
		}
	}
	
	this.LRSliderSlideTop = function(count){
		if (this.sliderDoSlide) {
			for (i = 1; i <= (count * this.sliderElementHeight);i++){
				setTimeout(this.thisSliderElementName + '.LRSliderScrollVert(' + 1 + ');', (i * 2));
			}
		} else {
			setTimeout(this.thisSliderElementName + '.LRSliderJumpVert(' + 1 * count * this.sliderElementHeight + ');', (2));
		}
		for (i = 0; i < count; i++){
			if(this.currentSliderElement > 1){
				this.currentSliderElement = this.currentSliderElement - 1;
				this.LRSliderNavGraphicsHandlerSlideLeft();
			}
		}
	}

	this.LRSliderSlideRight = function(count) {
		if (this.sliderDoSlide) {
			for (i = 1; i <= (count * this.sliderElementSize); i++){
				setTimeout(this.thisSliderElementName + '.LRSliderScroll(' + (-1) + ');', (i * 2));
			}
		} else {
			setTimeout(this.thisSliderElementName + '.LRSliderJump(' + (-1) * count * this.sliderElementSize + ');', (2));
		}
		for (i = 0; i < count; i++){
			if(this.currentSliderElement <= this.sliderElementCount - this.sliderObjectViewsize){
				this.currentSliderElement = this.currentSliderElement + 1;
				this.LRSliderNavGraphicsHandlerSlideRight();
			}
		}
	}
	
	
	this.LRSliderSlideBottom = function(count) {
		if (this.sliderDoSlide) {
			for (i = 1; i <= (count * this.sliderElementHeight); i++){
				setTimeout(this.thisSliderElementName + '.LRSliderScrollVert(' + (-1) + ');', (i * 2));
			}
		} else {
			setTimeout(this.thisSliderElementName + '.LRSliderJumpVert(' + (-1) * count * this.sliderElementHeight + ');', (2));
		}
		for (i = 0; i < count; i++){
			if(this.currentSliderElement <= this.sliderElementCount - this.sliderObjectViewsize){
				this.currentSliderElement = this.currentSliderElement + 1;
				this.LRSliderNavGraphicsHandlerSlideRight();
			}
		}
	}

	this.LRSliderScroll = function(j) {
		var viewOutside = GetObject(this.sliderObjectId);
		if (parseInt(viewOutside.style.left) == 1 && j == 1){
			//do nothing
		} else if (parseInt(viewOutside.style.left) == this.sliderRightLimit && j == -1) {

		} else {
			//viewOutside.style.left = parseInt(viewOutside.style.left) + j +'px';
			var total = parseInt(viewOutside.style.left) + j + 'px';
			$(viewOutside).not(":animated").animate({
            	left: total
        	}, 700, 'swing');
		}
	}
    
    this.LRSliderScrollVert = function(j) {
		var viewOutside = GetObject(this.sliderObjectId);
		if (parseInt(viewOutside.style.top) == 1 && j == 1){
			//do nothing
		} else if (parseInt(viewOutside.style.top) == this.sliderBottomLimit && j == -1) {

		} else {
			//viewOutside.style.top = parseInt(viewOutside.style.top) + j +'px';
			var total = parseInt(viewOutside.style.top) + j + 'px';
			$(viewOutside).not(":animated").animate({
            	top: total
        	}, 700, 'swing');
		}
	}

	this.LRSliderJump = function(j) {
		var viewOutside = GetObject(this.sliderObjectId);
		if (parseInt(viewOutside.style.left) == 1 && j > 1){
			//do nothing
		} else if (parseInt(viewOutside.style.left) == this.sliderRightLimit && j < 1) {
			//do nothing
		} else {
			//viewOutside.style.left = parseInt(viewOutside.style.left) + j +'px';
			var total = parseInt(viewOutside.style.left) + j + 'px';
			if ((parseInt(total) > 0)){
					total = this.sliderBottomLimit;
			}
			else if ((parseInt(total) < this.sliderRightLimit)){
				total = this.sliderRightLimit-1;
			}
			$(viewOutside).not(":animated").animate({
            	left: total
        	}, 700, 'swing');
		}
	}
    
    this.LRSliderJumpVert = function(j) {
		var viewOutside = GetObject(this.sliderObjectId);
		if (parseInt(viewOutside.style.top) == 1 && j > 1){
			//do nothing
		} else if (parseInt(viewOutside.style.top) == this.sliderBottomLimit && j < 1) {
			//do nothing
		} else {
			//viewOutside.style.top = parseInt(viewOutside.style.top) + j +'px';
			var total = parseInt(viewOutside.style.top) + j + 'px';
			$(viewOutside).not(":animated").animate({
            	top: total
        	}, 700, 'swing');
		}
	}
}

// determine browser support
active_pop_ns4 = (document.layers)?true:false
active_pop_dom = (document.all)?true:false

var active_pop_collection="";
var active_pop_styleObj="";
if (active_pop_dom) {
	active_pop_collection="all.";
	active_pop_styleObj=".style";
	//document.write("dom is true<br>");
}

function GetActiveObject(objname) {
	var theObj;
	if (active_pop_ns4 || active_pop_dom) {
		theObj= eval("document." + active_pop_collection + objname);
	} else {
		if (document.getElementById(objname)) {
			theObj = document.getElementById(objname);
		}
		
	}
	return theObj;
}

function PrintActiveContent(objname, inHTML){
	// THIS FUNCTION ASSUMES THE GetActiveObject FUNCTION IS AVAILABLE
	var myActiveObj = GetActiveObject(objname);
	if (typeof myActiveObj != 'undefined') {
		myActiveObj.innerHTML = inHTML;
	}
}

// NOTE: this requires that a variable called theSiteDomain be set... should be like www.thesite.com

function LoadScript(theSource,theChildName) {
	// function takes the input src url and creats a new script element that loads it
	var scriptChild = document.createElement('script');
	scriptChild.src = theSource;
	scriptChild.type='text/javascript';
	if (typeof theChildName != 'undefined') {
		scriptChild.name = theChildName;
		scriptChild.id = theChildName;
	}
	document.getElementsByTagName('head')[0].appendChild(scriptChild);
}

function RemoveScript(theChildName) {
	var scriptChild = GetObject(theChildName);
	if (typeof scriptChild != 'undefined') {
		document.getElementsByTagName('head')[0].removeChild(scriptChild);
	}
}

var theRateLink = '';

function ShowRateMenu(thePageObj,theContentID,theIconsString) {
	// set values
	ChangeRateMenuFormParam('piddl_pageobj',thePageObj);
	ChangeRateMenuFormParam('piddl_contentid',theContentID);
	ChangeRateMenuFormParam('piddl_rate','rate');
	ChangeRateMenuFormParam('piddl_icons',theIconsString);
	// show menu
	ShowMenu('menu_box_rate',(returnPosXofObj(GetObject(thePageObj)) + 25),(returnPosYofObj(GetObject(thePageObj)) + 5));
}

function ShowSaveInfo(thePageObj) {
	// show menu
	ShowMenu('menu_box_save',(returnPosXofObj(GetObject(thePageObj)) + 120),(returnPosYofObj(GetObject(thePageObj)) + 10));
}

function HideSaveInfo() {
	// hide menu
	ShowMenu('menu_box_save',-500,38);
}

function HideRateMenu() {
	// clear the form 
	ClearRateMenuForm();
	// close the menu
	ShowMenu('menu_box_rate',-500,38);
}

function RateThis(theRatingValue) {
	// adds rating value to form (rest of form populated when the window is popped-in
	ChangeRateMenuFormParam('piddl_rating',theRatingValue); 
	// process form and create link that will be loaded
	BuildAndLoadRateMenuScript(); 
	// clear the form and close the menu
	HideRateMenu();
}

function ChangeRateMenuFormParam(theParam,theValue) {
	// function grabs the ratemenu form and changes the value for the parameter specified to the specified value
	var theForm = GetObject('rate_menu');
	theForm.elements[theParam].value = theValue;
}

function BuildAndLoadRateMenuScript(){
	//function simply reads the rate_menu form and builds an url using it 
	var thisSiteDomain = theSiteDomain;
	var theForm = GetObject('rate_menu');
	for (var thisFieldKey = 0; thisFieldKey < theForm.length; thisFieldKey++) {
		var theField = theForm.elements[thisFieldKey];
		var theLinkKey = theField.name
		var theLinkValue = theField.value
		theRateLink = theRateLink + '&' + theLinkKey + '=' + theLinkValue
	}
	// kill the extra &
	theRateLink = theRateLink.substring(1);
	theRateLink = 'http://' + thisSiteDomain + '/rate.asp?' + theRateLink;
	// load the script
	//alert(theRateLink);
	LoadScript(theRateLink);
	// clear the link variable
	ClearRateLink();
}

function ClearRateMenuForm(){
	// just call ChangeRateMenuFormParam to clear each value
	ChangeRateMenuFormParam('piddl_pageobj','');
	ChangeRateMenuFormParam('piddl_contentid','');
	ChangeRateMenuFormParam('piddl_rate','');
	ChangeRateMenuFormParam('piddl_rating','');
}

function ClearRateLink(){
	//
	theRateLink = '';
}

// placeholder function to use with calls to log content consumption... should be superceded at the local level by an inline function... it's here so we can call it from the 
//	top level without worrying about whether or not it exists
function ContentConsumptionLoggedSuccess(inContentIDStr){
	// do nothing
}

// placeholder function to use with calls to log content sign-up... should be superceded at the local level by an inline function... it's here so we can call it from the 
//	top level without worrying about whether or not it exists
function ContentSignUpLoggedSuccess(inContentIDStr){
	// do nothing
}


// *** This object depends on having SlideObjOpacity and GetObject functions available

function ObjectFader(objName, inArray, inSize, inFadeInterval) {
	
	var myself = this;
	this.objName = objName;
	this.pObject = GetObject(objName);
	this.pictures = inArray;
	this.size = inSize;
	this.fadeInterval = inFadeInterval;
	this.clicked = false;
	
	if (this.pObject.attachEvent) {
		this.pObject.attachEvent("onmouseover", function() {
			clearInterval(myself.interval);
			ChangeObjOpacity(myself.objName, 100);
		});

		this.pObject.attachEvent("onclick", function() {
			clearInterval(myself.interval);
			myself.clicked = true;
		});

		this.pObject.attachEvent("onmouseout", function() {
			if (!myself.clicked)
				myself.interval = setInterval(callFade, myself.fadeInterval);
		});
	
	} else {
		this.pObject.addEventListener("mouseover", function() {
			clearInterval(myself.interval);
		}, false);

		this.pObject.addEventListener("click", function() {
			clearInterval(myself.interval);
			myself.clicked = true;
		}, false);

		this.pObject.addEventListener("mouseout", function() {
			if (!myself.clicked)
				myself.interval = setInterval(callFade, myself.fadeInterval);
		}, false);
	}
	
	this.Populate = function() {
		var myHTML ='';
		if (!this.pObject.currentLoc) this.pObject.currentLoc=0;

		var position = this.pObject.currentLoc

		for(i=0; i<this.size; i++) {
			myHTML += this.pictures[(position+i)%this.pictures.length]
		}
		this.pObject.innerHTML = myHTML;
		position = (position + this.size) % this.pictures.length;
		this.pObject.currentLoc = position;
	}

	function callPopulate() {
		myself.Populate();
	}
	
	this.Fade = function() {
		SlideObjOpacity(this.objName,100,0,5);
		setTimeout(callPopulate, 750);
		var callFunc = 'SlideObjOpacity(\''+this.objName+'\',0,100,5);'
		setTimeout(callFunc, 1750);
	}

	function callFade() {
		myself.Fade();
	}
	
	this.Start = function() {
		callPopulate();
		this.interval = setInterval(callFade, this.fadeInterval);
	}
}

function PageEffectPopUp(inObjectName) {

	var theObject = GetObject(inObjectName);
	var myself = this;

	this.Show = function(inXpos, inYpos, inFade) {
		if (document.layers)
		{
			theObject.left = inXpos;
			theObject.top = inYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.display = 'block';
			}
		}
		else if (document.all)
		{
			theObject.style.pixelLeft = inXpos;
			theObject.style.pixelTop = inYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.style.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.style.display = 'block';
			}
		}
		else if (document.getElementById)
		{
			theObject.style.left = inXpos;
			theObject.style.top = inYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.style.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.style.display = 'block';
			}
		}
	}

	this.Place = function(inRefObjectName, inPosition, inFade) {

		var refObject = GetObject(inRefObjectName);

		var refXpos = returnPosXofObj(refObject);
		var refYpos = returnPosYofObj(refObject);
		//var meXpos = returnPosXofObj(theObject);
		//var meYpos = returnPosYofObj(theObject);

		var finalXpos = 0;
		var finalYpos = 0;
		var theOffsetX = 0;

		switch (inPosition) {
			case 'left':
				//Get the width of the popup, subtract from reference X position
				//Add a buffer of 2
				//In order to get the width of the object, it cannot have display none
				//Solution is to turn its visibility to hidden, display to block, check the width, then reverse
				if (document.layers) {
					theObject.visibility = 'hidden';
					theObject.display = 'block';
					theOffsetX = returnWidthofObj(theObject);
					theObject.display = 'none';
					theObject.visibility = 'visible';
					}
				else
					{
					theObject.style.visibility = 'hidden';
					theObject.style.display = 'block';
					theOffsetX = returnWidthofObj(theObject);
					theObject.style.display = 'none';
					theObject.style.visibility = 'visible';
					}
				finalXpos = refXpos - theOffsetX - 2;
				finalYpos = refYpos;
				if (finalXpos < 0) finalXpos = 0;
				break;

			case 'right':
				//Get the width of the reference object, add to reference X position
				//Add a buffer of 2
				theOffsetX = returnWidthofObj(refObject);
				finalXpos = refXpos + theOffsetX + 2;
				finalYpos = refYpos;
				break;
		}

		if (document.layers)
		{
			theObject.left = finalXpos;
			theObject.top = finalYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.display = 'block';
			}
		}
		else if (document.all)
		{
			theObject.style.pixelLeft = finalXpos;
			theObject.style.pixelTop = finalYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.style.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.style.display = 'block';
			}
		}
		else if (document.getElementById)
		{
			theObject.style.left = finalXpos;
			theObject.style.top = finalYpos;
			if (inFade) {
				ChangeObjOpacity(inObjectName, 0)
				theObject.style.display = 'block';
				SlideObjOpacity(inObjectName, 0, 90, 2);
			}
			else {
				ChangeObjOpacity(inObjectName, 90)
				theObject.style.display = 'block';
			}
		}
	}


	this.Hide = function(inFade) {
		if (document.layers)
		{
			if (inFade) {
				SlideObjOpacity(inObjectName, 90, 0, 2);
				setTimeout(callHelperHide, 750);
			}
			else {
				this.helperHide();
			}

		}
		else if (document.all)
		{
			if (inFade) {
				SlideObjOpacity(inObjectName, 90, 0, 2);
				setTimeout(callHelperHide, 750);
			}
			else {
				this.helperHide();
			}
		}
		else if (document.getElementById)
		{
			if (inFade) {
				SlideObjOpacity(inObjectName, 90, 0, 2);
				setTimeout(callHelperHide, 750);
			}
			else {
				this.helperHide();
			}

		}


	}
	function callHelperHide() {
		myself.helperHide();
		}

	this.helperHide = function () {
		if (document.layers)
		{
			theObject.display = 'none';
			theObject.left = 0;
			theObject.top = 1000;
		}
		else if (document.all)
		{
			theObject.style.display = 'none';
			theObject.style.pixelLeft = 0;
			theObject.style.pixelTop = 1000;
		}
		else if (document.getElementById)
		{
			theObject.style.display = 'none';
			theObject.style.left = 0;
			theObject.style.top = 1000;
		}

	}

}

function returnWidthofObj(obj) {
	return obj.offsetWidth;
}

function cookiesEnabled()
{
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
	{ 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return (cookieEnabled);
}

