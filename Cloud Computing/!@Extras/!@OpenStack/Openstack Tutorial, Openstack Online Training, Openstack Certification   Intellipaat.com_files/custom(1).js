jQuery(document).ready(function() {
			
	jQuery( "#browse_courses .dropdown-menu-list > li" )
		.mouseenter(function() {
			jQuery( "#browse_courses .dropdown-menu-list > li > a" ).removeClass( "maintainHover" );
			jQuery( "a:first", this ).addClass( "maintainHover" );
		});
	jQuery( "#browse_courses " )
		.mouseleave(function() {
			jQuery( "#browse_courses .dropdown-menu-list > li > a" ).removeClass( "maintainHover" );
	});
	jQuery('.dropdown-menu ul.dropdown-menu-list').click(function(e) {
        e.stopPropagation();
    });  // removed .dropdown-menu ul.dropdown-menu-list > li > a, as not needed
		
	//show youtube video in popups
	jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Fixes header tag when scrolled  --makarand
	jQuery(window).scroll(function(event){
		var st = jQuery(this).scrollTop();
		if(jQuery('#header-main').hasClass('fix')){
		  var headerheight = jQuery('header').height();
		  if(st > headerheight){
			jQuery('#header-main').addClass('fixed');
		  }else{
			jQuery('#header-main').removeClass('fixed');
		  }
		}
  });
	
	//flexsliver for thumb_carsoul shortcode ----makarand
	jQuery('.thumb_carousel.flexslider').flexslider({
													
		animation: "slide",
		animationLoop: true,
		controlNav: false,
		directionNav: true,
		itemWidth: 150,
		minItems: 2,
		maxItems: 7,
		itemMargin: 30,
		prevText: "<i class='icon-arrow-1-left'></i>",
		nextText: "<i class='icon-arrow-1-right'></i>",
		start: function() {
			   jQuery(this).removeClass('loading');
		   }    
	  });
	
	jQuery('.flexslider.review_carousel').flexslider({
													
		animation: true,
		animationLoop: true,
		controlNav: false,
		directionNav: true,
		itemWidth: 300,
		minItems:1,
		maxItems: 1,
		itemMargin: 30,
		prevText: "<i class='icon-arrow-1-left'></i>",
		nextText: "<i class='icon-arrow-1-right'></i>",
		
	  }).removeClass('loading').addClass('widget_carousel');
	
	//Scroll on course page when clicked on right sidebar menu link linked to hash tags.
     jQuery('.single-course #object-nav li a.scrollMe').click(function(event) {
		var myid = jQuery(this).attr('href');
		event.preventDefault();
		jQuery('body,html').animate({
			  scrollTop: jQuery(myid).offset().top -90
			}, 1200);
		return false;
    });	
	 
	//Toggle tabs in course from sidebar menu -makarand
	jQuery(".single-course #object-nav li a[data-index]").click(function(e){
		var index = jQuery(this).data('index');
		if( index >= 0){
			jQuery(".single-course #object-nav li").removeClass('selected');
			jQuery(this).parent('li').addClass('selected');			
			jQuery('.nav-tabs li:eq('+index+') a').tab('show');	
			jQuery('body,html').animate({
			  scrollTop: 80
			}, 1200);
			e.preventDefault();
		}
	});
	
	//toggle sidebar menu from tabs in course page ---makarand
	jQuery(".single-course .nav-tabs a").click(function(e){
		var index = jQuery(this).parent('li').index();
		if( index >= 0){
			var sidebar =jQuery(".single-course #object-nav li") ;
			sidebar.removeClass('selected');
			sidebar.find('a[data-index='+index+']').parent('li').addClass('selected');
		}
	});

});