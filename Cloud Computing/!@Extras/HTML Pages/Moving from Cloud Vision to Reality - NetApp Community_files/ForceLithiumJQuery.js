/**
 * Lithium Technologies
 * @author: Adam Ayres 
 * @requires: jQuery
 * 
 * This should be before the first page specific script loaded on every page.
 * We check to see if the version of jQuery currently in the window.jQuery
 * object is the one loaded by Lithium, if not then we replace it with ours.
 * This is to allow additional page specific jQuery plugins loaded by Lithium
 * to extend our jQuery object.  
 */
 
if (jQuery.isLithium !== true) {
	jQuery = LITHIUM.jQuery;
}
