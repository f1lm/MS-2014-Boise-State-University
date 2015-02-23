/*
 * jQuery Cookie for Fire Hose Announcements
 *
 */
	jQuery(document).ready(function() {
		if(!jQuery.cookie('dismiss-announcement')){
			jQuery('.announcement_wrap').fadeIn(500);
		} else {
			jQuery('.announcement_wrap').hide();
		}
		jQuery( "#dismiss" ).click(function() {
			jQuery.cookie("dismiss-announcement", 1, { expires : 1 });
			jQuery('.announcement_wrap').hide();
		});
        if (jQuery('body').hasClass('login')) {
			jQuery('.announcement_wrap').hide();
        }
	});
