/**
 * Class: Tooltip
 * Author: Tim Wong
 * 
 * Creates a tooltip using the tooltip functionality in jQuery Tools.
 */
/*global LITHIUM: false */

;(function($LITH) {
	LITHIUM.Tooltip = function(params) {
		// move the tooltip to the body to allow it proper width.
		var tooltip = $LITH(params.tooltipElementSelector);
		var tooltipContent = $LITH(params.tooltipContentSelector);
		var trigger = $LITH(params.triggerSelector);
		var originalWidth = null;
		trigger.tooltip({
			predelay: 750,
			delay: params.delay,
			position: params.position,
			relative: false,
			tip: params.tooltipElementSelector,
			events: params.events,
			// resize the tooltip if it overflows to the left
			onBeforeShow: function(event, position) {
				// save the original width
				originalWidth = tooltip.width();
				// IE7 hack to force the stem position to align to the tooltip
				tooltip.width(originalWidth);
				// if the tooltip's position is off the screen, adjust its width to size it to the screen
				if (position.left < 0) {
					var adjustedWidth = trigger.offset().left;
					tooltip.width(adjustedWidth);
					tooltipContent.width(adjustedWidth);
				}
			},
			// reset the tooltip width so the tooltip may expand to its natural width on next show
			onHide: function(event) {
				tooltip.width(originalWidth);
				//TODO: it is conceivably problematic to "restore" this width, when it was never explicitly
				//set to begin with. If so, remove tweaking of 'tooltipContent' width; this was does for a visual optimization
				tooltipContent.width(originalWidth);
			}
		});

		//trap/swallow click event for links
		if (trigger.get(0).nodeName.toLowerCase() === "a") {
			trigger.click(function(event) {
				return false;
			});
		}

		// IE6 hack to prevent tooltip blip when appending to body
		tooltip.hide();
		if (LITHIUM.Loader.isLoaded() === true) {
			tooltip.appendTo(params.bodySelector);
		} else {
			LITHIUM.Loader.onLoad(function() {
				tooltip.appendTo(params.bodySelector);
			});
		}
	};
})(LITHIUM.jQuery);
