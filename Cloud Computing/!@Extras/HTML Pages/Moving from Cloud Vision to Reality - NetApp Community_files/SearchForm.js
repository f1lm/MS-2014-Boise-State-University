/**
 * Lithium Technologies
 * @author: Adam Ayres, Paul Craddick
 * @portedby: Adam Ayres
 * @requires: jQuery
 * 
 * Handles changing the title text of the button when search scope changed. 
 * Also handles toggling the advanced search form.
 */
 
;(function($LITH) {

LITHIUM.SearchForm = function(params) {
	var form = $LITH(params.formSelector);
	var selectElements = form.find(params.selectSelector);
	var buttonElements = form.find(params.buttonSelector);
	var activeInput = form.find("input[type='text']").not(":hidden");
	var inputs = form.find(params.inputSelector);
	var isSearching = false;
	var isFormSubmit = false;	
		
	var updateAutoCompleteContext = function(context) {
		if (params.useAutoComplete === true) {
			activeInput.autcompleteSetOptions({
				extraParams: {
					searchContext: context
				}
			});
		}
	};
		
	selectElements.change(function() {		
		var currentOptionValue = selectElements.val();
		if (params.nodesModel.hasOwnProperty(currentOptionValue)) {
			var selectedItem = params.nodesModel[currentOptionValue];
			buttonElements.attr("title", selectedItem.title);
			activeInput.hide();			
			activeInput = form.find(selectedItem.inputSelector).val(activeInput.val()).show();
			
			updateAutoCompleteContext(currentOptionValue);					
		};
	});
	
	if (params.useAutoComplete === true) {
		updateAutoCompleteContext(selectElements.val());
		
		form.bind("autocompleteResult", function(event, row, data) {
			window.location = data.url;	
		});
		
		form.bind("autocompleteSearchServer", function() {			
			isSearching = true;			
		});
			
		form.bind("autocompleteReceiveData", function() {
			isSearching = false;			
			if (isFormSubmit === true) {				
				buttonElements.click();
			}
		});
		
		form.submit(function(event) {
			activeInput.trigger("autocompleteDisable");
			if (isSearching === true) {				
				event.stop();				
				isFormSubmit = true;
			}
			isSearching = true;		
		});
	}	
};

})(LITHIUM.jQuery);
