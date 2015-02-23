jQuery(document).ready(function($) {
	// Show or hide the sticky footer button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$('.back-to-top').fadeIn(200);
		} else {
			$('.back-to-top').fadeOut(200);
		}
	});

	// Animate the scroll to top
	$('.back-to-top').click(function(event) {
		event.preventDefault();

		$('html, body').animate({scrollTop: 0}, 300);
	});
});
