jQuery.fn.fontresizermanager = function () {
    var fontResizer_value = jQuery('#fontResizer_value').val();
    var fontResizer_ownid = jQuery('#fontResizer_ownid').val();
    var fontResizer_ownelement = jQuery('#fontResizer_ownelement').val();
    var fontResizer_resizeSteps = jQuery('#fontResizer_resizeSteps').val();
    var fontResizer_cookieTime = jQuery('#fontResizer_cookieTime').val();
    var fontResizer_element = fontResizer_value;
	if(fontResizer_value == "innerbody") {
		fontResizer_element = "div#innerbody";
	} else if(fontResizer_value == "ownid") {
		fontResizer_element = "div#" + fontResizer_ownid;
	} else if(fontResizer_value == "ownelement") {
		fontResizer_element = fontResizer_ownelement;
	}
	var startFontSize = parseFloat(jQuery(fontResizer_element+"").css("font-size"));
	var savedSize = jQuery.cookie('fontSize');
	if(savedSize > 4) {
		jQuery(fontResizer_element).css("font-size", savedSize + "px");
	}
	jQuery('.fontResizer_add').css("cursor","pointer");
	jQuery('.fontResizer_minus').css("cursor","pointer");
	jQuery('.fontResizer_reset').css("cursor","pointer");
	jQuery('.fontResizer_add').click(function() {
		var newFontSize = parseFloat(jQuery(fontResizer_element+"").css("font-size"));
		newFontSize=newFontSize+parseFloat(fontResizer_resizeSteps);
		jQuery(fontResizer_element+"").css("font-size",newFontSize+"px");
		jQuery.cookie('fontSize', newFontSize, {expires: parseInt(fontResizer_cookieTime), path: '/'});
	});
	jQuery('.fontResizer_minus').click(function() {
		var newFontSize = parseFloat(jQuery(fontResizer_element+"").css("font-size"))
		newFontSize=newFontSize-fontResizer_resizeSteps;
		jQuery(""+fontResizer_element+"").css("font-size",newFontSize+"px");			 
		jQuery.cookie('fontSize', newFontSize, {expires: parseInt(fontResizer_cookieTime), path: '/'});
	});
	jQuery('.fontResizer_reset').click(function() {
		jQuery(""+fontResizer_element+"").css("font-size",startFontSize);			 
		jQuery.cookie('fontSize', startFontSize, {expires: parseInt(fontResizer_cookieTime), path: '/'});
	});
}
