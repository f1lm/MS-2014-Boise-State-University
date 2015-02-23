;(function($LITH) {
	LITHIUM.DeferredImages = function() {
		$LITH("." + LITHIUM.Css.BASE_DEFERRED_IMAGE).each(function() {			
			var img = $LITH(this);			
			var clone = img.clone();
			clone.attr("src", img.attr("data-deferredsrc"));			
			img.replaceWith(clone);			
		});		
	}
})(LITHIUM.jQuery);

