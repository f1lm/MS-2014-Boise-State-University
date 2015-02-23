/**
 * Lithium Technologies
 * @author: Jeff Poyzner
 * @requires: jQuery
 */
;(function($LITH) {

LITHIUM.InformationBox = function(params) {
	var component = $LITH(params.componentSelector);
	var $doc = $LITH(document);
	
	if (params.faceLinkUrl) {
		component.click(function() {
			window.location.href = params.faceLinkUrl;
		});
	}
	
	if (params.closeLinkSelector) {
		var closeLink = $LITH(params.closeLinkSelector);
		if (closeLink.exists()) {
			closeLink.click(function() {
				component.remove();
				return false;
			});
		}
	}
	
	if ($doc.data('li-information-box-hide-init') === undefined) {
		$doc.data('li-information-box-hide-init', true);		
		$doc.on(params.updateFeedbackEvent, function(event) {
			$LITH(params.feedbackSelector).hide();	
		});
	}
};

})(LITHIUM.jQuery);
