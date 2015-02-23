(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,clearTimeout,projekktor,location,setInterval,YT,clearInterval,pixelentity,prettyPrint */
	
	
	function imgfilter() {
		return this.href.match(/\.(jpg|jpeg|png|gif)$/i);
	}
	
	pixelentity.classes.Controller = function() {
		
		var body,mobile,jhtml;
		
		function autoFlare(idx,el) {
			el = $(el);
			el.attr("data-target","flare");
		}
		
		function start() {
			
			body = $("body");
			mobile = $.pixelentity.browser.mobile;
			
			jhtml = $("html");
			
			if (mobile) {
				jhtml.removeClass("desktop").addClass("mobile");
				if ($.pixelentity.browser.android) {
					jhtml.addClass("android");
				}
			} 
			
			/*
			links = $('a[data-target!="flare"]').not('a[data-toggle]');
			links.filter(imgfilter).each(autoFlare);
			*/
			
			$.pixelentity.widgets.build(body,{});
			
		}
		
		start();
	};
	
}(jQuery));
