jQuery(function($) {
	$('.navbar .dropdown').hover(function() {
			$(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown();
		}, function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp(1);
	});
	$('.navbar .dropdown > a').click(function(){
		location.href = this.href;
	});
});
jQuery(function($) {
	$('#searchsubmit').blur(function() {
		if(this.value == '')
			$('#s').css('background-image', 'none');
	});
});