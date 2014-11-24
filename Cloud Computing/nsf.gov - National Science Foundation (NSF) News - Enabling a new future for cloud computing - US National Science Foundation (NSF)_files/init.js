var $j = jQuery.noConflict();

$j(window).load(function(){ //$j(window).load() must be used instead of $j(document).ready() because of Webkit compatibility	
	
	// ==== Main Slides Code === /
	$j(function(){
		// Set starting slide to 1
		var startSlide = 1;
		var mainslides = 0;
		var numberofSlides = $j('.main-slides .slide').children().size();
		// Get slide number if it exists
		if (window.location.hash) {
			startSlide = window.location.hash.replace('#','');
		}
		// Initialize Slides
		$j('.main-slides').slides({
			preload: true,
			preloadImage: 'images/loading.gif',
			generatePagination: true,
			play: 5000,
			pause: 0,
			slideSpeed: 500,
			container: 'slides_container',
			hoverPause: false,
			// Get the starting slide
			start: startSlide,
			animationComplete: function(current){
		     mainslides++;
			    if( mainslides == numberofSlides ){
			       $j('.next').trigger('click');
			    }
				// Set the slide number as a hash
				window.location.hash = '#' + current;
			}
		});
	});

	// ==== Gallery #2 Slides Code === /
	
	$j(function(){
		// Set starting slide to 1
		var startSlide = 1;
		// Get slide number if it exists
		if (window.location.hash) {
			startSlide = window.location.hash.replace('#','');
		}
		// Initialize Slides
		$j('#gallery-tab2').slides({
			preload: true,
			preloadImage: 'images/loading.gif',
			generatePagination: false,
			play: 0,
			pause: 0,
			hoverPause: true,
			// Get the starting slide
			start: startSlide,
			animationComplete: function(current){
				// Set the slide number as a hash
				window.location.hash = '#' + current;
			}
		});
	});
	
	// ==== Gallery Tabs Code === /
		
	//When page loads...
	$j(".tab-content").hide(); //Hide all content
	$j(".gallery-tabs ul li:first").addClass("active").show(); //Activate first tab
	$j(".tab-content:first").show(); //Show first tab content

	//On Click Event
	$j(".gallery-tabs ul li").click(function() {

		$j(".gallery-tabs ul li").removeClass("active"); //Remove any "active" class
		$j(this).addClass("active"); //Add "active" class to selected tab
		$j(".tab-content").hide(); //Hide all tab content

		var activeTab = $j(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$j(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});
	
	// ==== Top Tasks Dropdown Code === /
	
	$j(".top-tasks>a").click(function(){
		$j(".top-tasks-dropdown").slideToggle('fast', function() {
			if($j('.top-tasks-dropdown').is(":hidden")) {
				$j('.main-nav').css('z-index', '500');
				$j(".top-tasks").removeClass('top-tasks-up');
				$j(".top-tasks-dropdown>.address").hide();		
			} else {
				$j('.main-nav').css('z-index', '');
				$j(".top-tasks").addClass('top-tasks-up');
				$j(".top-tasks-dropdown>.address").fadeIn();
			}
		});
		return false;
	})

	
	// ==== Alert Bar Close Code === /
	
	$j(".alert-bar>a.close").click(function(){
		$j(".alert-bar").slideToggle();
		return false;
	})
	
	// ==== Sidebar select dropdown styling Code === /
	
	$j("#organization")
		.sb({ fixedWidth: true })
		.change(function(){
			$j(this).siblings('.selectbox').removeClass('error')
		});

	// ==== Gallery Hide Code === /
	
	$j(".gallery-tabs a.hide").click(function(){
		if($j('.gallery-tabs-container').is(":hidden")) {
			$j(".gallery-tabs-container").slideToggle();
			$j(".gallery-tabs a.hide").text('Hide').removeClass('up');			
		} else {
			$j(".gallery-tabs-container").slideToggle();
			$j(".gallery-tabs a.hide").text('Show').addClass('up');		
		}
		return false;
	})


	// ==== Search Fields Javascript === /

	$j('#QueryText').focus(function() {		
		var test = $j(this).attr('value');
		if (test=='SEARCH') {
			$j(this).attr('value','');
			}
		});	
			
	$j('#QueryText').blur(function() {
		var test = $j(this).attr('value');
		if (test==='') {
			$j(this).attr('value','SEARCH');
			}
		});	
		
		
	$j('#fundingQueryText').focus(function() {
		var test = $j(this).attr('value');
		if (test=='Enter search term') {
			$j(this).attr('value','');
			}
		});	
			
	$j('#fundingQueryText').blur(function() {
		var test = $j(this).attr('value');
		if (test==='') {
			$j(this).attr('value','Enter search term');
			}
		});				
	
	// ==== Main Nav Mega Menu === /
    $j('.main-nav').css('z-index', '500');    
	//On Hover Over
	
	/*function megaHoverOver(){
	    $j(this).find(".sub").stop().fadeTo('fast', 1).show(); //Find sub and fade it in
	   }
	   
	//On Hover Out
	
	function megaHoverOut(){
	  $j(this).find(".sub").stop().fadeTo('fast', 0, function() { //Fade to 0 opactiy
	      $j(this).hide();  //after fading, hide it
	  });
	}
	
	//Set custom configurations
	
	var config = {
	     sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
	     interval: 50, // number = milliseconds for onMouseOver polling interval
	     over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
	     timeout: 400, // number = milliseconds delay before onMouseOut
	     out: megaHoverOut // function = onMouseOut callback (REQUIRED)
	};
	
	$j("ul.main li .sub").css({'opacity':'0'}); //Fade sub nav to 0 opacity on default
	$j("ul.main li").hoverIntent(config); //Trigger Hover intent with custom configurations*/
});