/**
 * jQuery iFrame Shim Plugin v1.0
 * 
 * Author: Adam Ayres 
 */

;(function($) {

$.extend({
	shim: function() {
		var options = {
			createNew: false
		};
				
		function createShim() {
			return $("<iframe/>")
				.attr({
					"src": "javascript:void(0);"})
				.css({
					"zIndex" : "500",
					"position": "absolute",
					"frameborder": "0", 
					"border": "0",
					"opacity": "0"})
				.hide();
		}
		
		var singletonShim = createShim();
		
		return {
			setOptions: function(options) {
				$.extend($.shim.options, options);
			},
			getShim: function(createNew) {
				return (createNew === true) ? createShim(): singletonShim;				
			}
		};
	}()
});

$.fn.shim = function(options) {
	if (typeof options === "boolean") {
		return this.each(function() {
			var shim = $(this).data("shim");
			if (shim) {
				shim.hide();
			}
		});
	} else {
		var settings = $.extend({}, $.cssData.options, options);
		
		return this.each(function() {
			var shim = $.shim.getShim(settings.createNew);
			var element = $(this);
			element.data("shim", shim);
			
			if ($.browser.msie) {
				element.after(shim);						
				shim.css(element.position());
			} else {
				element.offsetParent().after(shim);						
				shim.css(element.offset());	
			}
			shim.css({
				height: element.outerHeight(),
				width: element.outerWidth()
			}).show();
		});	
	}
}
	
})(jQuery);
