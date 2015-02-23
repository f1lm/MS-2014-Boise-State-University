/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @requires: jQuery
 * 
 */

;(function($LITH) {

LITHIUM.AutoComplete = function(params) {
	$LITH.extend($LITH.Autocompleter.defaults, {
		inputClass: "lia-autocomplete-input",
		// legacy support, when not using a header the CSS class differs
		resultsClass: params.options.defaultText ? "lia-autocomplete-container" : "lia-autocomplete",
		hasResultsClass: "lia-autocomplete-has-results",
		loadingClass: "lia-autocomplete-input-loading",
		activeClass: params.activeClass,
		oddRowClass: "lia-autocomplete-list-odd-row",
		evenRowClass: "lia-autocomplete-list-even-row",
		headerClass: "lia-autocomplete-header",
		footerClass: "lia-autocomplete-footer",
		listWrapperClass: "lia-autocomplete-content",		
		scroll: false,
		selectFirst: false,
		highlight: false,
		// matching subset causes issues when there is more complex
		// data sent
		matchSubset: false
	});
	
	$LITH.extend(params.options, { 
		// override the normal parse function in favor
		// of the content already being sent properly from the server		
		parse: function(data) {			
			return $LITH.evalJSON(data);			
		}
	})
	
	var inputField = $LITH(params.inputSelector);
	
	inputField.autocomplete(params.url, params.options);

	inputField.bind(($LITH.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		if (event.which == 13) {
			$LITH(this).trigger("autocompleteResultEnter", event);
		}
	});
	
	inputField.autocompleteReceiveData(function() {
		inputField.trigger(params.resizeImageEvent);
	});	
	
	if (params.redirectToItemLink === true) {
		inputField.bind("autocompleteResult", function(event, row, data) {
			window.open(data.url, '_blank');
		});
	} 
}

})(LITHIUM.jQuery);	
