/*-------------------------------------------------------------------------

	Theme Name: Surreal Studio
	
-------------------------------------------------------------------------*/

jQuery(document).ready(function () {
	/*vars used throughout*/
	var wh,
		scrollSpeed = 1000,
		parallaxSpeedFactor = 0.6,
		scrollEase = 'easeOutExpo',
		targetSection,
		sectionLink = 'a.navigateTo',
	 	section = jQuery('.section');


//INIT --------------------------------------------------------------------------------/
	if (isMobile == true) {
		jQuery('.header').addClass('mobileHeader');	//add mobile header class
		jQuery('body').addClass('touch-device');
	} else {
		jQuery('.page').addClass('desktop');
		jQuery('.parallax').addClass('fixed-desktop');
	}


//MENU --------------------------------------------------------------------------------/
	jQuery(".menu a").click(function () {
		var $href = jQuery(this).attr("href").split('#');
        jQuery("html, body").animate({
            scrollTop: jQuery('#' + $href[1]).offset().top + "px"
        }, {
            duration: 1000,
            easing: "swing"
        });
        return false;
    });


//PARALLAX ----------------------------------------------------------------------------/
	jQuery(window).bind('load', function () {
		parallaxInit();						  
	});

	function parallaxInit() {
		if (isMobile == true) return false;
		jQuery('.parallax').each( function() {
			jQuery( this ).parallax();
		});
		/*add as necessary*/
	}


//HOMEPAGE SPECIFIC -----------------------------------------------------------------/
	function sliderHeight() {
		wh = jQuery(window).height();
		jQuery('.homepage').first().css({height: wh});
	}
	sliderHeight();


//	Accordion  ------------------------------------------------------------------------/

	(function () {

		var $container = jQuery('.accContainer'),
			$trigger   = jQuery('.accTrigger');
			fullWidth = $container.outerWidth(true);

		$container.hide();
		$trigger.first().addClass('active').next().show();

		$trigger.css('width', fullWidth - 2);
		$container.css('width', fullWidth - 2);

		$trigger.on('click', function (e) {
			if (jQuery(this).next().is(':hidden') ) {
			$trigger.removeClass('active').next().slideUp(300);
			jQuery(this).toggleClass('active').next().slideDown(300);
			}
			e.preventDefault();
		});

		// Resize
		jQuery(window).on('resize', function () {
			fullWidth = $container.outerWidth(true)
			$trigger.css('width', $trigger.parent().width());
			$container.css('width', $container.parent().width());
		});

	})();

// SUPERSIZED SLIDESHOW -----------------------------------------------------------------/
	var hslides = [];

	jQuery( '.hiddenslide').each( function() {
		var $this = jQuery( this );
		hslides.push( { image: $this.attr('data-src'), title: $this.attr('data-title') } );

	});

		if ( jQuery( '.hiddenslide').length > 0 ) {

		jQuery.supersized({

			// Functionality
			slideshow               :   1,			// Slideshow on/off
			autoplay				:	1,			// Slideshow starts playing automatically
			start_slide             :   1,			// Start slide (0 is random)
			stop_loop				:	0,			// Pauses slideshow on last slide
			random					:	0,			// Randomize slide order (Ignores start slide)
			slide_interval          :   5000,		// Length between transitions
			transition				:	2, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	600,		// Speed of transition
			new_window				:	1,			// Image links open in new window/tab
			pause_hover             :   0,			// Pause slideshow on hover
			keyboard_nav            :   1,			// Keyboard navigation on/off
			performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
			image_protect			:	1,			// Disables image dragging and right click with Javascript

			// Size & Position						   
			min_width		        :   0,			// Min width allowed (in pixels)
			min_height		        :   0,			// Min height allowed (in pixels)
			vertical_center         :   1,			// Vertically center background
			horizontal_center       :   1,			// Horizontally center background
			fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
			fit_portrait         	:	1,			// Portrait images will not exceed browser height
			fit_landscape			:   0,			// Landscape images will not exceed browser width

			// Components							
			slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links				:	0,			// Individual thumb links for each slide
			thumbnail_navigation    :   0,			// Thumbnail navigation
			slides 					:	hslides,
										
			// Theme Options			   
			progress_bar			:	0,			// Timer for each slide							
			mouse_scrub				:	0

		});

	}



//WINDOW EVENTS ---------------------------------------------------------------------/	
	 
	jQuery(window).bind('resize',function () {

		//Update slider height
		sliderHeight();

	});

	jQuery("#bgndVideo").on("YTPStart", function(){ jQuery("#eventListener").html("YTPStart")});
	jQuery("#bgndVideo").on("YTPEnd", function(){ jQuery("#eventListener").html("YTPEnd")});
	jQuery("#bgndVideo").on("YTPPause", function(){ jQuery("#eventListener").html("YTPPause")});
	jQuery("#bgndVideo").on("YTPBuffering", function(){ jQuery("#eventListener").html("YTPBuffering")});

	if ( jQuery("#bgndVideo").length > 0 )
		jQuery("#bgndVideo").mb_YTPlayer();

});