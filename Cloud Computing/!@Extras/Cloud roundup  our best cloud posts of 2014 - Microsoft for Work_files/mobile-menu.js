(function($){
	$(function() {
		var $mobileDropdown = $('.header-mobile-dropdown'),
			$mobileDropdownToggle = $( '.header-mobile-dropdown-toggle' );

		$mobileDropdownToggle.click( function(e) {
			e.preventDefault();

			$mobileDropdownToggle.toggleClass('open');
			$mobileDropdown.toggleClass('open');
		});
	});
})(jQuery);
