$(function() {

	// Main drop down menus
	// If hoverIntent is available, use it.
	// Otherwise, use the default jquery hover event.
	try {
		$('ul#dropDownNav li').hoverIntent(
			function() {
				$(this).children('ul').slideDown(200);
				$(this).children('a:first').addClass("hover");
				//$(this).find('.mega-menu').show();
			},
			function() {
				$(this).children('ul').slideUp(200);
				$(this).children('a:first').removeClass("hover");
				//$(this).find('.mega-menu').hide();
			}
		);
	} catch(err) {
		$('ul#dropDownNav li').hover(
			function () {
				$(this).children('ul').slideDown(200);
				$(this).children('a:first').addClass("hover");
			},
			function () {
				$(this).children('ul').slideUp(200);
				$(this).children('a:first').removeClass("hover");
			}
		);
	}


	// Tabs ------------------------
	if( $('ul.tabs a').length > 0 ) {

		$('ul.tabs a').click(function(e) {
			e.preventDefault();
			$('ul.tabs a').removeClass('current');
			$(this).addClass('current');
			render_tabs();
		});

		var render_tabs = function() {
			var current_tab = $('ul.tabs a.current').attr('href').replace('#','');
			$('.tab').hide();
			$('#'+current_tab).show();
		}

		// If the page was called with a hash, attempt to highlight the corresponding tab
		try {
			var url_arg_pos = document.URL.lastIndexOf('#');

			if( url_arg_pos > 0 ) {
				var url_arg = document.URL.slice( url_arg_pos+1, document.URL.length );

				$a = null;
				$('ul.tabs a').each(function(){
					if( $(this).attr('href') == '#' + url_arg ) {
						$a = $(this);
					}
				});
				$tab = $('#'+url_arg);

				if( $a != null && $tab.length > 0 ) {
					$('ul.tabs a').removeClass('current');
					$('.tab').removeClass('current');
					$a.addClass('current');
					$tab.addClass('current');
				}
			}
		} catch(err) { /* do nothing */ }

		render_tabs();
	}

});