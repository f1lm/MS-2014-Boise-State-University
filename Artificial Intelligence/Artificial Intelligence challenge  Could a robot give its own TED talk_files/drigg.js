// Validate all required fields before submission.
// All fields are tested for validity when they lose focus, so
// don't worry about non-required fields.
//
// If any of the fields possess the "error" class, we know
// there's something wrong. Abort the submission.

var DriggValidateBeforeSubmit = function () {
	$(".error").removeClass("error");
	$(".messages.error").remove();
	DriggValidateBodyFull( true );
	DriggValidateTitleFull( true );

        if( ! Drupal.settings.drigg.allow_empty_url){
	  DriggValidateURL( $("#edit-url"), "Story's URL", 'sURL', true);
        }

	if ( $(".error").length > 0 ) {
		return false;
	}
	return true;
}

// cname: The error "class name"
// error: The error message to display
//
// Generate an error message in a standard error message box.
// The error has an error name (cname) and an error message.
// The cname is assigned as the class name to the error message.
// In that way, everything that can generate an error has a distinct
// error message location. That message is generated, cleared, or
// modified based on the cname.

function DriggAddError( cname, error ) {
	var msgs = $(".messages.error ul");

	// If the error display area doesn't exist, create it.
	// Arbitrarily, it is created after the div with class "help"
	if ( msgs.length == 0 ) {
		$(".messages.error").remove();
		$("form#node-form").before('<div class="messages error"><ul></ul></div>' );
		msgs = $(".messages.error ul");
	}
	// Remove any current messages with a class of <cname>
	msgs.find("."+cname).remove();

	// Create a new error item identified by <cname>
	msgs.append('<li class="' + cname + '">' + error + '</li>');
}


// cname: The "error class" identifier
//
// Remove the error message identified by <cname>.
// If there are no more error messages, remove the error
// message box.

function DriggRemoveError( cname ) {
	var msgs = $(".messages.error ul");

	msgs.find("." + cname).remove();
	if( msgs.children().length == 0 ) {
		$(".messages.error").remove();
	}
}

// Validate the "Story description" text area. Do this by
// calling DriggValidateBodyFull. The "false" indicates 
// this is not a full check-- don't generate an error if
// the field is empty.

var DriggValidateBody = function() {
	DriggValidateBodyFull( false );
}

// check: Full check flag
//
// Validate the "Story description" text area. If <check> is true,
// generate an error if the field is empty. Otherwise, only generate
// an error if the field contains characters, but does not contain
// the minimum required number of characters.
//
// Returns "true" if the field validates, "false" otherwise.

var DriggValidateBodyFull = function( check ) {
	var body = $("#edit-body");

	if ( check || body.val().length > 0 )
	{
		check = true;
	}
	else {
		DriggRemoveError("bodyErr");
		body.removeClass("error");
	}

	if ( check ) {
		if ( Drupal.settings.drigg.body_minimum_length != 0 && $("#edit-body").val().length < Drupal.settings.drigg.body_minimum_length ) {
			DriggAddError("bodyErr", "The description must be at least " + 
				Drupal.settings.drigg.body_minimum_length + " characters long.");
			$("#edit-body").addClass("error");
			return false;
		} else if ( Drupal.settings.drigg.body_maximum_length != 0 && $("#edit-body").val().length > Drupal.settings.drigg.body_maximum_length ) {
			DriggAddError("bodyErr", "The description cannot be more than " + 
				Drupal.settings.drigg.body_maximum_length + " characters long.");
			$("#edit-body").addClass("error");
			return false;
		} else {
			DriggRemoveError("bodyErr");
			$("#edit-body").removeClass("error");
			return true;
		}
	}
	else {
		return false;
	}
}

// Validate the "Story's title" text input. Do this by
// calling DriggValidateTitleFull. The "false" indicates 
// this is not a full check-- don't generate an error if
// the field is empty.

var DriggValidateTitle = function( ) {
	DriggValidateTitleFull( false );
}

// check: Full check flag
//
// Validate the "Story's title" text input. If <check> is true,
// generate an error if the field is empty. Otherwise, only generate
// an error if the field contains characters, but does not contain
// the minimum required number of characters.
//
// Returns "true" if the field validates, "false" otherwise.

var DriggValidateTitleFull = function( check ) {
	var title = $("#edit-title");
	if ( check || title.val().length > 0 )
	{
		check = true;
	}
	else {
		DriggRemoveError("titleErr");
		title.removeClass("error");
	}
	if ( check )
	{
		if ( Drupal.settings.drigg.title_minimum_length != 0 && $("#edit-title").val().length < Drupal.settings.drigg.title_minimum_length ) {
			DriggAddError("titleErr", "The title must be at least "
					+ Drupal.settings.drigg.title_minimum_length + " characters.");
			$("#edit-title").addClass("error");
			return false;
		} else if ( Drupal.settings.drigg.title_maximum_length != 0 && $("#edit-title").val().length > Drupal.settings.drigg.title_maximum_length ) {
			DriggAddError("titleErr", "The title cannot be longer than "
					+ Drupal.settings.drigg.title_maximum_length + " characters.");
			$("#edit-title").addClass("error");
			return false;
		} else {
			DriggRemoveError("titleErr");
			$("#edit-title").removeClass("error");
			return true;
		}
	}
	else {
		return false;
	}
}

// Validate the "Trackback URL" text input. Do this by
// calling DriggValidateURL. (SEE DriggValidateURL for
// a complete description of the arguments.) 

var DriggValidatePingURL = function() {
	DriggValidateURL( this, 'Trackback URL', 'tbURL', false);
}

// Validate the "Story's URL" text input. Do this by
// calling DriggValidateURL. (SEE DriggValidateURL for
// a complete description of the arguments.) 

var DriggValidateStoryURL = function() {

        var entry = $(this);
        var url = entry.val();

        // If an empty URL is allowed, then don't check and take the error out
        if( Drupal.settings.drigg.allow_empty_url &&  url.length == 0 ) {
          entry.removeClass("error");
          DriggRemoveError('sURL');
          return;
        }

        DriggValidateURL( this, "Story's URL", 'sURL', false);
}

// elem: The text input to validate
// prefix: A string to display in the error box
// errtype: A unique identifier (<cname> in DriggCreateError
//          and DriggRemoveError) 
// check: Full check flag
//
// Validates the text contained in <elem> to make sure the URL
// is valid. This is done via the server, so we pass it in
// with AJAX.
//
// If the entry is not a valid URL, generate an error of class
// <errtype>. The error message begins with "prefix," which
// should help distinguish the error for the user.
//
// If <check> is false, don't bother reporting if the field is
// empty. This helps make things a little nicer when navigating
// the form.

var DriggValidateURL = function(elem, prefix, errtype, check) {
	var entry = $(elem);
	var args = {};
	args.operation = 'validate_url';
	args.url = entry.val();

        if(Drupal.settings.drigg.editing_node){
          args.editing_node=Drupal.settings.drigg.editing_node;
        }

	if ( args.url == '' )
	{
		if ( !/required/.test(entry[0].className) ) {
			check = false;
		}
		DriggRemoveError(errtype);
		entry.removeClass("error");
	}
	else {
		check = true;
	}

	if ( check ) {
		if ( args.url == '' ) {
			DriggAddError(errtype, prefix + ' is required');
			entry.addClass("error");
	
			return false;
		}

		$.ajax({
			data     : args,
                	url      : Drupal.settings.drigg.base_path+"drigg/ajax/handle",
			type     : 'get',
			datatype : 'html',
			success  : function (result) {
				if ( result == 'success' ) {
					entry.removeClass("error");
					DriggRemoveError(errtype);
				}
				else {
					DriggAddError(errtype, prefix + ': ' + result);
					entry.addClass("error");
				}
			},
			error: function( xhr, msg ) {
				entry.addClass("error");
			},
			complete: function( xhr, stat ) {
			}	
		});
	
	}
}

// This is executed on document load.
//
// If this appears to be a drigg node form, wire up the text
// entries for validation.

$(function(){
  if ( $("#edit-drigg-node-form").length > 0 ) {
    $("#edit-trackback-ping-url").blur(DriggValidatePingURL);
                //if(! Drupal.settings.drigg.editing_node ){
    $("#edit-url").blur(DriggValidateStoryURL);
                //}
    $("#edit-title").blur(DriggValidateTitle);
    $("#edit-body").blur(DriggValidateBody);
    //$("#node-form").submit(DriggValidateBeforeSubmit);
  }
});

