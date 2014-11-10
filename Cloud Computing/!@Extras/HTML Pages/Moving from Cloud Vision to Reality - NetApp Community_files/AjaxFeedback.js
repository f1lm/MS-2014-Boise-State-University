/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @requires: jQuery
 *
 */

;(function($LITH) {
		
LITHIUM.AjaxFeedback = function(feedbackSelector, hideFeedbackEvent) {
	if (LITHIUM.AjaxFeedback.init !== true) {
		LITHIUM.AjaxFeedback.init = true;
		$LITH(document).on(hideFeedbackEvent, function() {
			$LITH(feedbackSelector).children().hide();	
		});
	}
}	

})(LITHIUM.jQuery);
		
