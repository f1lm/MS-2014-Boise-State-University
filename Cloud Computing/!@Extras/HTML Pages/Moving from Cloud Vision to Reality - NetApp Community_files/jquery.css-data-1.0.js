/**
 * jQuery CSS Data Plugin v1.0
 * 
 * Author: Adam Ayres 
 * Requires: jquery.function-util-1.0.js
 */

;(function($) {

/**
 * Retrives metadata from an elements CSS class names that match the
 * proper pattern.
 */
$.cssData = function(elem, key, options) {		
	var data;
	if (elem.attributes) {
		var settings = $.extend({}, $.fn.cssData.defaults, options);
		// LIA-18952 attr  returns undefined  for the  document object  and the  window object.
		var classes = $(elem).attr("class") || "";	
		var classNames = classes.split(" ");			
		
		if ((key !== undefined) && (typeof key === "string")) {
			$.each(classNames, function(i, className) {		
				// Format: data-<key>-
				var dataKeyPrefix = settings.dataPrefix + settings.prefixDelimeter + key + settings.pairDelimeter;			
				
				// If the className starts with the prefix and there is a valid value 
				// after the prefix, retrieve the value.
				if ((className.indexOf(dataKeyPrefix) == 0) && (dataKeyPrefix.length < className.length)) {
					data = className.substring(dataKeyPrefix.length); 
					return;
				}
			});
		} else {
			// If there are no arguments, then retrieve all of the metadata for the element 
			data = {};					
			$.each(classNames, function(i, className) {
				// Format: data-
				var dataDelimPrefix = settings.dataPrefix + settings.prefixDelimeter;
				if ((className.indexOf(dataDelimPrefix) == 0) && (dataDelimPrefix.length < className.length)) {
					var pair = className.substring(dataDelimPrefix.length);
					var pairDelimeterIndex = pair.indexOf(settings.pairDelimeter);
					if ((pairDelimeterIndex > 0) && (pairDelimeterIndex < pair.length)) {
						var dataKey = pair.substring(0, pairDelimeterIndex);
						var dataValue = pair.substring(pairDelimeterIndex + 1);
						data[dataKey] = dataValue; 
					}
				}
			});
		}
	}	
	return data;	
}	

$.fn.cssData = function(key, options) {
	if (this.length) {
		return $.cssData(this[0], key, options);
	}
}

$.fn.cssData.defaults = {
	dataPrefix: "data",
	prefixDelimeter: "-",
	pairDelimeter: "-"
}

/**
 * Wrap jQuery's native data method so that we can leverage it to
 * inspect an element for metadata.  Only look for metadata in the 
 * CSS class if there is no value set in the elements data.  Once 
 * a value is retrieved from metadata we store it in the elements
 * data.
 */
$.fn.data = $.wrap($.fn.data, function(proceed, key, value) {	
	var response = proceed.apply(this, $.makeArray(arguments).slice(1));
	if (value === undefined && (response === undefined || response === null)) {			
		response = $(this).cssData(key);			
		proceed(key, response);			
	}
	return response;
});	

	
})(jQuery);
