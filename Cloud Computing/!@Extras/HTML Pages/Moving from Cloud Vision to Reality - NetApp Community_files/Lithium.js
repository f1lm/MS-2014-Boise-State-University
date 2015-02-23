/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com 
 * @date: 03-21-09
 * 
 * Methods triggered automatically when the DOM has completely loaded.
 */

;(function($LITH) {

$LITH(function() {	
	/**
	 * Performs the fade effect on all elements with the CSS class of LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START. 
	 */
	$LITH("." + LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START).delay(500)
		.switchClass(LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START, LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_END, 1000);
	
	/**
	 * Special handling for IE for scrolling to an element that has the CSS class 
	 * LITHIUM.Css.BASE_FEEDBACK_SCROLL_TO. This is typically handled using a fragment
	 * ID, however IE strips the request of the fragment ID during redirects. 
	 */
	if ($LITH.browser.msie) {
		var position = $LITH("a." + LITHIUM.Css.BASE_FEEDBACK_SCROLL_TO).offset(); 
		if (position && window === window.top) {
			// Only do this if we're not inside an iframe
			window.scrollTo(position.left, position.top);
		}
	}	
	
	/**
	 * Runs all of the functions that have been registered with LITHIUM.Loader.onLoad 
	 * one dom has been loaded as well as all of the common scripts. 
	 */
	 LITHIUM.Loader.setLoaded(); 
	 $LITH.each(LITHIUM.Loader.getOnLoadFunctions(), function(index, func) {
	 	func();
	 });

	LITHIUM.renderImages = function() {	
		/**
		  * Load images that have been deferred until after window.onload
		  */
		 LITHIUM.DeferredImages();
	};
	
	LITHIUM.renderImages();
	
	$LITH(document.body).bind("LITHIUM:renderImages", LITHIUM.renderImages);	
});

/**
 * Wrap the jQuery.show() method so that when show is called we attempt to remove 
 * the LITHIUM.Css.BASE_JS_HIDDEN CSS class that was hiding the element.  This then
 * exposes the element which can then be hidden and re-shown using jQuery.hide()
 * and jQuery.show() respectively.
 * 
 * The LITHIUM.Css.BASE_JS_HIDDEN CSS class is used to hide elements during page
 * load and lets us programatically expose the elements through JS when needed.
 * 
 * LIA-18938 The cost of running through all elements with the LITHIUM.Css.BASE_JS_HIDDEN
 * CSS class when the DOM loads could be expensive when there are a lot of elements with
 * this CSS class.  Instead we lazily do it when the jQuery.show method is called.
 * 
 * LIA-28290 The wrapping of show does not need to wait until the dom is ready. 
 */
$LITH.fn.show = $LITH.wrap($LITH.fn.show, function(proceed) {
	var element = $LITH(this);
	if (element.hasClass(LITHIUM.Css.BASE_JS_HIDDEN)) {
		element.hide().removeClass(LITHIUM.Css.BASE_JS_HIDDEN);
	}			
	return proceed.apply(this, $LITH.makeArray(arguments).slice(1));		
});	

})(LITHIUM.jQuery);

