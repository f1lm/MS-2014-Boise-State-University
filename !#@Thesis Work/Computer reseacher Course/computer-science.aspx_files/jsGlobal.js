/*
	
	Include this file in every template.
	Contains the entire library of javascript code.

*/

function showCalendar(strDivID) {
    document.getElementById('tabCalendar1').style.display = 'none';
    document.getElementById('tabCalendar2').style.display = 'none';
    document.getElementById('tabCalendar3').style.display = 'none';
    
    document.getElementById('tabCalendar' + strDivID).style.display = 'block';
    
}

function getCookie(NameOfCookie){

	if (document.cookie.length > 0){ 

	begin = document.cookie.indexOf(NameOfCookie+"="); 
	if (begin != -1){ 

	begin += NameOfCookie.length+1; 
	end = document.cookie.indexOf(";", begin);
	if (end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(begin, end)); } 
	}
	return ''; 

}

function setCookie(NameOfCookie, value, expiredays){

	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

	document.cookie = NameOfCookie + "=" + escape(value) + 
	((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function delCookie (NameOfCookie){

	if (getCookie(NameOfCookie)) {
	document.cookie = NameOfCookie + "=" +
	"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

function popWin(in_url){
	var h = screen.availHeight * .75;
	/* var w = screen.availWidth * .75; */
	var w = 630;
	var t = (screen.availHeight - h) / 2;
	var l = (screen.availWidth - w) / 2;

	var popWindow = window.open(in_url, 'popWindow', 'height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + ',resizable=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,toolbar=yes');

	popWindow.window.focus();

}

function popWin2(strURL, intWinW, intWinH) {
		var wScreen = screen.availWidth;
		var hScreen = screen.availHeight;
		var l = (wScreen - intWinW) / 2;
		var t = (hScreen - intWinH) / 2;
		var oWindow = window.open(strURL, 'newWindow', 'height=' + intWinH + ',width=' + intWinW + ',top=' + t + ",left=" + l + ",scrollbars=yes");
		oWindow.focus();
}

function showFlyout(strFlyName) {
    document.getElementById(strFlyName).style.display = 'block';
    
}

function hideFlyout(strFlyName) {
    document.getElementById(strFlyName).style.display = 'none';
    
}

function openWin(strURL, intWinW, intWinH) {
		var wScreen = screen.availWidth;
		var hScreen = screen.availHeight;
		var l = (wScreen - intWinW) / 2;
		var t = (hScreen - intWinH) / 2;
		var oWindow = window.open(strURL, 'newWindow', 'height=' + intWinH + ',width=' + intWinW + ',top=' + t + ",left=" + l + ",scrollbars=yes");
		oWindow.focus();
}

