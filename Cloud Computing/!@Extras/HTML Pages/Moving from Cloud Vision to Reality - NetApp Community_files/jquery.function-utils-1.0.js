/**
 * jQuery Function Utils Plugin v1.0
 * 
 * Author: Adam Ayres 
 */

;(function($) {
	
$.fn.extend({
 	outerHTML: function() { 		
 		var element = this.get(0);
 		if(element.outerHTML) {
 			return element.outerHTML;
 		}
		return $("<div>").append(this.eq(0).clone()).html();
 	}
});

$.fn.exists = function() {
	return this.length > 0;
};

$.extend({
	/** 
	 * Port of Prototype JS Function#bind:
	 * 
	 * Wraps the function in another, locking its execution scope to an object specified by scope.
	 */
	protoBind: function(func, scope) {
		return function() {
			return func.apply(scope, $.makeArray(arguments));
		}
	},
	
	/** 
	 * Port of Prototype JS Function#wrap:
	 * 
	 * Returns a function "wrapped" around the original function.
	 */
	wrap: function(func, wrapper) {		
		return function() {
			return wrapper.apply(this, [$.protoBind(func, this)].concat($.makeArray(arguments)));
		}
	}
});
	
})(jQuery);
