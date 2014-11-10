/**
 * jQuery Position Toggle Plugin v1.0
 * 
 * Author: Adam Ayres 
 */

;(function($) {
	
$.fn.extend({
	/**
	 * Moves element off screen using absolute positioning
	 * and a negative left value.
	 */
	hideOffScreen: function() {
		return this.each(function() {		
			$(this).css({			
				position:"absolute", 
				left:"-9999px",
				top:"0px",
				visibility: "hidden"
			});		
		});		
	},
	
	/**
	 * Moves an element onto the screen, inverse of hideOnScreen
	 */
	showOnScreen: function() {
		return this.each(function() {
			$(this).css({
				position:"static",
				visibility: "visible"
			});		
		});
	}
});

})(jQuery);
