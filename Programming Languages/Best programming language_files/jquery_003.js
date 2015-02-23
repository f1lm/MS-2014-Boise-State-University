(function($) {
	"use strict";
	
	$(document).ready(function() {
		
		$("#crestashareicon .sbutton").each(function(index) {
			$(this).delay(150*index).fadeIn(500);
		});	

	});
	
})(jQuery);