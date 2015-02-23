jQuery(document).ready(function($) {
	var elementOffset = $('#nav').offset().top;
    $(window).scroll(function() {
    	if ($(window).width() > 940 || $('#nav').hasClass('rpg_sticky')) {
			var scrollTop = $(window).scrollTop();
			if (scrollTop >= elementOffset) {
		        if (!$('#nav').hasClass('rpg_sticky')) {
		            $('#nav').addClass('rpg_sticky').css({
		                top: '-60px'
		            }).stop().animate({
		                top: 0
		            }, 500);
		        }
			} else {
				$('#nav').removeClass('rpg_sticky').removeAttr('style');
			}
		}
	});
});