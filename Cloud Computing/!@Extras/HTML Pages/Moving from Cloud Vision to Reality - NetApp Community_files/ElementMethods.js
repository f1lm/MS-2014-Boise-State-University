/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com 
 * @date: 03-21-09
 * 
 * Extenstions to the Element object.  These can be used by any extended element returned by Prototye.
 * The element is often extended for use by Ajax features that want to invoke a method on the list of
 * elements returned by the selector of an successful Ajax response.
 */
;(function($LITH) {

$LITH.fn.extend({	
	/**
	 * Element will morph the background color from one color to another
	 */
	containingRowSuccessHighlight: function() {
		return this.each(function() {		
			var rowElement = $LITH(this).closest("tr");
			rowElement.addClass(LITHIUM.Css.BASE_AJAX_SUCCESS_HIGHLIGHT);
			rowElement.addClass(LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START, 500, function() {
				rowElement.addClass(LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_END, 500)
			});
		});
	},
	/**
	 * Element will first morph the background color of the row and then
	 * remove it via a fade.
	 */
	containingRowRemoveHighlight: function() {		
		return this.each(function() {		
			var rowElement = $LITH(this).closest("tr");
			rowElement.addClass(LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START, 500, function() {
				rowElement.removeClass(LITHIUM.Css.BASE_EFFECT_HIGHLIGHT_START, 500);
				rowElement.fadeOut(1000, function() {
					rowElement.addClass(LITHIUM.Css.BASE_AJAX_REMOVE_HIGHLIGHT);
				});
			});
		});		
	},
	/**
	 * Remove the current row on which leave group action is being performed 
	 * Can be used in case of Delete action on a grid row
	 */
	 containingRemoveRow: function() {
	 	return this.each(function() {
	 		var rowElement = $LITH(this).closest("tr");
	 		rowElement.remove();
	 	});
	 },
	/**
	 * Add a method that will ensure the element exists before trying to show it, as well as attempt to remove
	 * the BASE_JS_HIDDEN CSS class before showing it, so that it is not inadvertantly hidden again by the
	 * Lithium dom:loaded method that hides elements with this CSS class 
	 * 
	 * @return jQuery 
	 */
	safeShow: function() {
		return $LITH(this).removeClass(LITHIUM.Css.BASE_JS_HIDDEN).show();
	},
	addHistory: function(value) {	
		LITHIUM.BrowserHistory.setNewValue(value, false);
	},
	replaceHistory: function(value) {
		LITHIUM.BrowserHistory.setNewValue(value, true);
	},
	setTinyMCEContent: function(tinyMCEContent) {	
		tinyMCE.activeEditor.setContent(tinyMCEContent); 
	},
	pulsate: function() {
		return this.queue(function() {
			var element = $LITH(this);	
			element.animate({opacity: 0}, 450).animate({opacity: 1}, 450);		
			element.queue('fx', function() { element.dequeue(); });
			element.dequeue();
		});
	},
	
	/**
	 * Blocks the specified event
	 */
	blockEvent : function(event) {
		return $LITH(this).bind(event, function() {
			return false;	
		});
	},
	
	/**
	 * Redirects to the specified URL
	 */
	redirect: function(url) {
		window.location = url;
	},
	
	/**
	 * Converts a non-absolutely-positioned element to an absolutely positioned one,
	 * retaining its original position
	 */
	absolutize: function() {
       	var element = this;
        if (element.css("position") == "absolute")
        {
            return element;
        }
     
        var offsets = element.position();
        var top = offsets.top;
        var left = offsets.left;
        var width = element[0].clientWidth;
        var height = element[0].clientHeight;
     
       	element.css("position", "absolute");
        element.css("top", top + "px");
        element.css("left", left + "px");
        element.css("width", width + "px");
        element.css("height", height + "px");
        
        return element;
        
	}
	
});

 $LITH.fn.replaceWith = $LITH.wrap($LITH.fn.replaceWith, function(proceed) {  
          if ($LITH.browser.msie) {
               $LITH(this).empty();
          }
          return proceed.apply(this, $LITH.makeArray(arguments).slice(1));
     });
	
})(LITHIUM.jQuery);


