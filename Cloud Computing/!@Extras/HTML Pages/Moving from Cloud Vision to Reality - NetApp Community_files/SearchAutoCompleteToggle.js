/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @requires: jQuery
 * 
 *
 */
 
;(function($LITH) {

LITHIUM.SearchAutoCompleteToggle = function(params) {
	var container = $LITH(params.containerSelector);
	var inputs = container.find(params.autoCompleteSelector);	
	
	container.bind(params.enableAutocompleteSuccessEvent, function() {		
		container.find(params.enableAutoCompleteSelector).hide();
		container.find(params.disableAutoCompleteSelector).show();
		inputs.autocompleteEnable();
		inputs.not(":hidden").focus();	
	});
	
	container.bind(params.disableAutocompleteSuccessEvent, function() {
		container.find(params.disableAutoCompleteSelector).hide();
		container.find(params.enableAutoCompleteSelector).show();
		inputs.autocompleteDisable();	
	});	
}

})(LITHIUM.jQuery);
