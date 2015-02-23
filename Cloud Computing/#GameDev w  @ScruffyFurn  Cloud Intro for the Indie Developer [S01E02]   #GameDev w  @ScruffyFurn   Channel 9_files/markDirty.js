/*
*
* This will display a javascript prompt when a user navigates away from the page
* after changing any input field
*
* Input fields inside of '.search' are excluded
*
*
*
*/

(function () {
	//set up dirty flag
	var formDirty = false;

	$(document).on('change', ':input', function (event) {
		if (!$(event.target).is('.search :input') && !$(event.target).hasClass('bypassDirty') && !$(event.target).parents('form').hasClass('bypassDirty')) {
			formDirty = true;
		}
	});

	$(document).on('submit', 'form', function () {
		formDirty = false;
	});

	$(window).bind("beforeunload", function () {
		try {
			if ((typeof tinyMCE != 'undefined') && (typeof tinyMCE.editors != 'undefined') && (typeof tinyMCE.editors.length != 'undefined')) {
				for(var i=0; i<tinyMCE.editors.length; i++){
					if (tinyMCE.editors[i].isDirty()) {
						formDirty = true;
					}
				}
			}
			if (formDirty) {
				return 'You have unsubmitted text in a form field.';
			}
		} catch (e) { /*this should never stop a page from exiting because of an error*/ }
	});
})();
