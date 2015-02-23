/*-----------------------------------------------------------------------------------

 	Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/
 

jQuery(document).ready(function() {
	

/*-----------------------------------------------------------------------------------*/
/*	Superfish Settings - http://users.tpg.com.au/j_birch/plugins/superfish/
/*-----------------------------------------------------------------------------------*/
	
	if (jQuery().superfish) {
		
		jQuery('#primary-nav ul').superfish({
			delay: 200,
			animation: {opacity:'show', height:'show'},
			speed: 'fast',
			autoArrows: false,
			dropShadows: false
		}); 
	
	}


/*-----------------------------------------------------------------------------------*/
/*	Slides Navigation Effect
/*-----------------------------------------------------------------------------------*/
	
	if (jQuery().slides) {
		
		jQuery("#slider").hover( function() {
			jQuery('.slides-nav').fadeIn(200);
		}, function () {
			jQuery('.slides-nav').fadeOut(200);
		});
		
	}
	
	
/*-----------------------------------------------------------------------------------*/
/*	Contact From Validation
/*-----------------------------------------------------------------------------------*/
	
	if (jQuery().validate) {
		
		jQuery("#contactForm").validate();
		
	}


/*-----------------------------------------------------------------------------------*/
/*	Portfolio Overlay Effect
/*-----------------------------------------------------------------------------------*/
	
	function tz_overlay() {
			
		jQuery('.post-thumb a').hover( function () {
			
			jQuery(this).find('.overlay').stop().animate({ opacity: 1 }, 200);
		
		}, function () {
			
			jQuery(this).find('.overlay').stop().animate({ opacity: 0 }, 200);
		});
	
	}
	
	tz_overlay();


/*-----------------------------------------------------------------------------------*/
/*	PrettyPhoto - http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/
/*-----------------------------------------------------------------------------------*/
	
	function tz_lightbox() {
		
		jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			animationSpeed:'fast',
			slideshow:5000,
			theme:'dark_rounded',
			show_title:false,
			overlay_gallery: false
		});
	
	}
	
	if(jQuery().prettyPhoto) {
	
		tz_lightbox(); 
			
	}


/*-----------------------------------------------------------------------------------*/
/*	Opacity changes
/*-----------------------------------------------------------------------------------*/

	jQuery(".blog .post-thumb img, .archive .post-thumb img, .search-results .post-thumb img").css({
		opacity: 1
	});
	
	jQuery(".blog .post-thumb img, .archive .post-thumb img, .search-results .post-thumb img").hover(function() {
		jQuery(this).stop().animate({
			opacity: 0.6
			}, 200);
	},function() {
		jQuery(this).stop().animate({
			opacity: 1
			}, 500);
	});



/*-----------------------------------------------------------------------------------*/
/*	Portfolio Sorting
/*-----------------------------------------------------------------------------------*/
	
	if (jQuery().quicksand) {
		
		(function($) {
		  $.fn.sorted = function(customOptions) {
			var options = {
			  reversed: false,
			  by: function(a) { return a.text(); }
			};
			$.extend(options, customOptions);
			$data = $(this);
			arr = $data.get();
			arr.sort(function(a, b) {
			  var valA = options.by($(a));
			  var valB = options.by($(b));
			  if (options.reversed) {
				return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
			  } else {		
				return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
			  }
			});
			return $(arr);
		  };
		})(jQuery);
		
		// DOMContentLoaded
		jQuery(function() {
		
		  // bind radiobuttons in the form
		  var $filterType = jQuery('#filter li a').html();
		  var $filterSort = jQuery('#filter li.sort a').html();
		
		  // get the first collection
		  var $applications = jQuery('#items');
		
		  // clone applications to get a second collection
		  var $data = $applications.clone();
		
		  // attempt to call Quicksand on every form change
		  jQuery('#filter li a').click(function(e) {
			
			if (jQuery(this).html() == 'All') {
			  var $filteredData = $data.find('li');
			} else {
			  var $filteredData = $data.find('li[data-type=' + jQuery(this).html() + ']');
			}
		
			
		  // if sorted by name
		  var $sortedData = $filteredData.sorted({
			by: function(v) {
			  return jQuery(v).find('strong').text().toLowerCase();
			}
		  });
		
			// finally, call quicksand
			$applications.quicksand($sortedData, {
			  duration: 600,
			  adjustHeight: 'dynamic'
			}, function () {
					tz_overlay();
					tz_lightbox();
			});
			
			e.preventDefault();
		
		  });
		
		});
	
	}

});