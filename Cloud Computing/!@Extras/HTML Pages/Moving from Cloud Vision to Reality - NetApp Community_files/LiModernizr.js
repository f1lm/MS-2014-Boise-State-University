/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com 
 * @date: 2012-12-19
 * 
 * This code was copied liberally from the Modernizr.js library to 
 * detect if the browser supports JavaScript. The full
 * Modernizr library will be added as needed.
 */
LITHIUM.LiModernizr = function() {
	var docElement = document.documentElement;
	
	// Remove "no-js" class from <html> element, if it exists:
	// Add the new classes to the <html> element.
	docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" js");
}();
