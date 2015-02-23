jQuery(document).ready(function($){
	$('.ts-fab-tabs > div').removeClass( 'visible-tab' );
	$('.ts-fab-tabs > div:first-child').addClass( 'visible-tab' );
	$('.ts-fab-list li:first-child').addClass('active');

	$('.ts-fab-list li a').click(function() {
		$(this).closest('.ts-fab-wrapper').find('li').removeClass('active');
		$(this).parent().addClass('active');
		var currentTab = $(this).attr('href');
		if(currentTab.indexOf('#') != -1) {
			currentTabExp = currentTab.split('#');
			currentTab = '#' + currentTabExp[1];
		}

		$(this).closest('.ts-fab-wrapper').find('.ts-fab-tabs > div').removeClass( 'visible-tab' );
		$(currentTab).addClass( 'visible-tab' );

		return false;
	});
});