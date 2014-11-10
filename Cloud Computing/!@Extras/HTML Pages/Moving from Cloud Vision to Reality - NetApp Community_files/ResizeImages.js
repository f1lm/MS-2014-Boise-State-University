/**
 * Lithium Technologies
 * @author: Doug Schroeder
 * @portedby: Pranthik Samal
 * @requires: jQuery
 * Class: Resize Images
 * 
 * Handles dynamic image resizing - checks the width of all images in the element 
 * item and resizes them to the max width if they are larger than the max width;
 */

;(function($LITH) {

LITHIUM.ResizeImages = function(maxWidth, elementCssSelector, maxWidthCssClass){
	$LITH(elementCssSelector).each(function() { 
		if (this.width > maxWidth) {			
			$LITH(this).attr({
				width: maxWidth,
				height: this.clientHeight * (maxWidth / this.clientWidth),
				"class": maxWidthCssClass 
			});			
		}
	});
}
	
})(LITHIUM.jQuery);
