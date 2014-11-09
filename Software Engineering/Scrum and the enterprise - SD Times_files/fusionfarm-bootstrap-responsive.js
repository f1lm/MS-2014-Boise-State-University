var FusionfarmCR = {
	bootstrap: {
		action: {
			mobile: function() { // xsmall
				// do xsmall stuff
				FusionfarmCR.xsmall();
			},
			tablet: function() { // small
				FusionfarmCR.small();
			},
			desktop: function() { // medium
				FusionfarmCR.medium();
			},
			large: function() { // large
				FusionfarmCR.reset();
				// do large stuff
			}
		},
		// http://getbootstrap.com/css/#grid-options
		grid: {
			xsmall:  768, // <
			small:   768, // >=
			medium:  992, // >=
			large:  1200, // >=
			current:''
		},
		responsive: function(){
			var winWidth = jQuery(window).width();

			// console.log('resize to:' + winWidth);

			if((winWidth < this.grid.medium)&&(winWidth >= this.grid.small)) { //tablet
				if(this.grid.current != 'tablet') {
					this.grid.current = 'tablet';
					this.action.tablet();
				}
			}
			else if(winWidth < this.grid.xsmall){  //mobile
				if(this.grid.current != 'mobile') {
					this.grid.current = 'mobile';
					this.action.mobile();
				}
			}
			else if((winWidth > this.grid.medium)&&(winWidth <= this.grid.large)) { //desktop
				if(this.grid.current != 'desktop') {
					this.grid.current = 'desktop';
					this.action.desktop();
				}
			}
			else { // large
				if(this.grid.current != 'large') {
					this.grid.current = 'large';
					this.action.large();
				}
			}

			// console.log('resize to ' + this.grid.current);
		},
	},
	xsmall: function() {

		var i;

		/** banner ads
		 *
		 * show small containers,
		 * clone origin's elements if
		 * the xsmall container has 0 children
		 */
		for(i=0;i<FusionfarmCR.moveable_elements.length;i++) {
			if(FusionfarmCR.moveable_elements[i].group == 'banner_ads') {
				if(FusionfarmCR.moveable_elements[i].xsmall) {
					if( FusionfarmCR.moveable_elements[i].current_location != FusionfarmCR.moveable_elements[i].xsmall ) {
						jQuery( FusionfarmCR.moveable_elements[i].current_location ).children().appendTo( jQuery(FusionfarmCR.moveable_elements[i].xsmall ) );
					}
					FusionfarmCR.moveable_elements[i].current_location = FusionfarmCR.moveable_elements[i].xsmall;
					jQuery(FusionfarmCR.moveable_elements[i].xsmall).show();
				}
				jQuery(FusionfarmCR.moveable_elements[i].origin).hide();
			}
		}
	},
	small: function() {
		jQuery('#sm-top-banner-wrapper').append(jQuery('.top-ad.leader-board'));
		jQuery('.dmbs-header-text').append(jQuery('#top-search-form'));
		jQuery('#nav-grouping-1').addClass('small');
		jQuery('#nav-grouping-2').addClass('small');
		jQuery('.ticker').addClass('small');
		jQuery('#menu-main-desktop').append(jQuery('#nav-grouping-2 .social'));
	},
	medium: function() {
		jQuery('.dmbs-header-text').append(jQuery('.top-ad.leader-board'));
	},
	reset: function() {

		var i;

		jQuery('#nav-grouping-1').removeClass('small');
		jQuery('#nav-grouping-2').removeClass('small');
		jQuery('.ticker').removeClass('small');
		jQuery('#nav-grouping-2').append(jQuery('#top-search-form'));
		jQuery('#nav-grouping-2').append(jQuery('#nav-grouping-1 .social'));

		/* banner ads */
		//if ( ! jQuery.browser.msie ) { // jQuery.browser.version
			for(i=0;i<FusionfarmCR.moveable_elements.length;i++) {
				if(FusionfarmCR.moveable_elements[i].group == 'banner_ads') {
					if( FusionfarmCR.moveable_elements[i].current_location != FusionfarmCR.moveable_elements[i].origin ) {
						jQuery( FusionfarmCR.moveable_elements[i].current_location ).children().appendTo( jQuery(FusionfarmCR.moveable_elements[i].origin ) );

						jQuery(FusionfarmCR.moveable_elements[i].current_location).hide();
						FusionfarmCR.moveable_elements[i].current_location = FusionfarmCR.moveable_elements[i].origin;
						jQuery(FusionfarmCR.moveable_elements[i].origin).show();
					}
				}
			}
		//}

	},
	moveable_elements: [
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.medrec_1_ad', 'xsmall': '.mobile_ad.medrec_1_ad'},
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.medrec_2_ad', 'xsmall': '.mobile_ad.medrec_2_ad'},
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.medrec_3_ad', 'xsmall': '.mobile_ad.medrec_3_ad'},
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.medrec_4_ad', 'xsmall': '.mobile_ad.medrec_4_ad'},
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.sq_button_group', 'xsmall': '.mobile_ad.sq_button_group'},
		{'group':'banner_ads', 'current_location':'', 'origin':'.banner_ad.bottom-leaderboard', 'xsmall': '.mobile_ad.bottom-leaderboard'}
	],
	init: function() {
		/* banner ads */
		for(i=0;i<FusionfarmCR.moveable_elements.length;i++) {
			if( FusionfarmCR.moveable_elements[i].current_location == '' ) {
				FusionfarmCR.moveable_elements[i].current_location = FusionfarmCR.moveable_elements[i].origin;
			}
		}

		(function($) {
		    $(document).ready(function() {
		    	FusionfarmCR.bootstrap.responsive();
		    	$(window).resize(function() {
		    		// console.log('window resize');
		    		FusionfarmCR.bootstrap.responsive();
		    	});
		    });
		})(jQuery);
	}
};

FusionfarmCR.init();