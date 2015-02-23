// Check for related links.
//
// Build an AJAX request from the title and body (description).
// This should return some HTML containing related links.
//
// Only use the title and body if they are valid, and contain
// data.

var DriggRelatedLinks = function () {
        var entry = $(this);
        var args = {};
	var title = $("#edit-title");

	if ( !DriggValidateBodyFull(false) ) {
		$("#related_links_box").html('');
		return;
	}
	if ( DriggValidateTitleFull(false) ) {
		args.text = title.val() + " ";
	}
	else {
		args.text = '';
	}

        args.operation = 'related_links';
        args.text += entry.val();
        $.ajax({
                data     : args,
                url      : Drupal.settings.drigg.base_path+"drigg/ajax/rl",
                type     : 'get',
                datatype : 'html',
                success  : function (result) {
			$("#related_links_box").html(result);
                },
                error: function( xhr, msg ) {
                },
                complete: function( xhr, stat ) {
                }
        });

}


$(function(){
	if ( $("#edit-drigg-node-form").length > 0 ) {
		$("#edit-body").blur(DriggRelatedLinks);
	}
});

