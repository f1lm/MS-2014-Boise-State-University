/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @requires: jQuery, Prototype
 * 
 * Ports of Prototype event handling to make transition easier
 * from Prototype to jQuery.
 */

;(function($LITH) {

/**
 * Port of the Prototype Event#stop method.
 */
$LITH.Event.prototype.stop = function() {
	this.preventDefault();
  	this.stopPropagation();  					
}

/**
 * AOP style wrap of the jQuery.fn.trigger method.  We apply the data arguments
 * of the trigger onto the event under the memo field similar to Prototype.
 * We then proceed with the normal triggering of the event.
 */
$LITH.fn.trigger = $LITH.wrap($LITH.fn.trigger, function(proceed, type, data) {
	if (typeof type === "string") {
		type = { 
			type: type,
			memo: data || {}
		} 
	} else if (typeof type === "object") {
		var memo = {};
		$LITH.extend(memo, type.data);
		$LITH.extend(memo, data);
		$LITH.extend(type, { memo: memo });
	}
	return proceed(type, data);
});
	
})(LITHIUM.jQuery);

