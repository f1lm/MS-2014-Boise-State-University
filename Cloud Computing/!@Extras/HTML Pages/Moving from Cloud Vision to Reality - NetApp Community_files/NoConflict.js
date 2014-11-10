/**
 * Lithium Technologies
 * @author: Adam Ayres 
 * @requires: jQuery
 * 
 * Turns on the jQuery noConflict mode and places the jQuery object in LITHIUM.jQuery. 
 */

LITHIUM.jQuery = LITHIUM.noConflict ? jQuery.noConflict() : jQuery;

/**
 * Add a field to the jQuery object to identify 
 * the jQuery version loaded by Lithium.
 */
jQuery.isLithium = true;

