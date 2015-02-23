/*
	Easy plugin to get element index position
	Author: Peerapong Pulpipatnan
	http://themeforest.net/user/peerapong
*/

$.fn.getIndex = function(){
	var $p=$(this).parent().children();
    return $p.index(this);
}

$.fn.setNav = function(){
	jQuery('.nav li ul').css({display: 'none'});

	jQuery('.nav li').each(function()
	{	
		
		var $sublist = jQuery(this).find('ul:first');
		
		jQuery(this).hover(function()
		{	
			$sublist.stop().css({overflow:'hidden', height:'auto', display:'none'}).slideDown(200, function()
			{
				jQuery(this).css({overflow:'visible', height:'auto', display: 'block'});
			});	
		},
		function()
		{	
			$sublist.stop().slideUp(200, function()
			{	
				jQuery(this).css({overflow:'hidden', display:'none'});
			});
		});	
		
	});
	
	jQuery('.nav li').each(function()
	{
		
		jQuery(this).hover(function()
		{	
			jQuery(this).find('a:first').addClass('hover');
		},
		function()
		{	
			jQuery(this).find('a:first').removeClass('hover');
		});	
		
	});
	
	jQuery('.main_nav li ul').css({display: 'none'});

	jQuery('.main_nav li').each(function()
	{	
		
		var $sublist = jQuery(this).find('ul:first');
		
		jQuery(this).hover(function()
		{	
			$sublist.stop().css({overflow:'hidden', height:'auto', display:'none'}).slideDown(200, function()
			{
				jQuery(this).css({overflow:'visible', height:'auto', display: 'block'});
			});	
		},
		function()
		{	
			$sublist.stop().slideUp(200, function()
			{	
				jQuery(this).css({overflow:'hidden', display:'none'});
			});
		});	
		
	});
	
	jQuery('.main_nav li').each(function()
	{
		
		jQuery(this).hover(function()
		{	
			jQuery(this).find('a:first').addClass('hover');
		},
		function()
		{	
			jQuery(this).find('a:first').removeClass('hover');
		});	
		
	});
	
}

jQuery(function () {

    	jQuery('.slideshow').anythingSlider({
    	        easing: "easeInOutExpo",
    	        autoPlay: false,
    	        startStopped: false,
    	        animationTime: 600,
    	        hashTags: true,
    	        buildNavigation: true,
    	        buildArrows: false,
    			pauseOnHover: true,
    			startText: "Go",
    	        stopText: "Stop"
    	    });
    	    
    });

$(document).ready(function(){ 

	$(document).setNav();
	
	$('.img_frame').fancybox({ 
		padding: 10,
		overlayColor: '#000',
		transitionIn: 'elastic',
		transitionOut: 'elastic',
		overlayOpacity: .8
	});
	
	$('.pp_gallery a').fancybox({ 
		padding: 0,
		overlayColor: '#000', 
		transitionIn: 'elastic',
		transitionOut: 'elastic',
		overlayOpacity: .8
	});
	
	$('.flickr li a').fancybox({ 
		padding: 0,
		overlayColor: '#000', 
		transitionIn: 'elastic',
		transitionOut: 'elastic',
		overlayOpacity: .8
	});
	
	$.validator.setDefaults({
		submitHandler: function() { 
		    var actionUrl = $('#contact_form').attr('action');
		    
		    $.ajax({
  		    	type: 'POST',
  		    	url: actionUrl,
  		    	data: $('#contact_form').serialize(),
  		    	success: function(msg){
  		    		$('#contact_form').hide();
  		    		$('#reponse_msg').html(msg);
  		    	}
		    });
		    
		    return false;
		}
	});
		    
		
	$('#contact_form').validate({
		rules: {
		    your_name: "required",
		    email: {
		    	required: true,
		    	email: true
		    },
		    message: "required"
		},
		messages: {
		    your_name: "Please enter your name",
		    email: "Please enter a valid email address",
		    agree: "Please enter some message"
		}
	});	
	
	if(BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 8)
	{
		var zIndexNumber = 1000;
		$('div').each(function() {
			$(this).css('zIndex', zIndexNumber);
			zIndexNumber -= 10;
		});

		$('#thumbNav').css('zIndex', 1000);
		$('#thumbLeftNav').css('zIndex', 1000);
		$('#thumbRightNav').css('zIndex', 1000);
		$('#fancybox-wrap').css('zIndex', 1001);
		$('#fancybox-overlay').css('zIndex', 1000);
	}
	
	$(".accordion").accordion({ collapsible: true });
	
	$(".accordion_close").find('.ui-accordion-header a').click();
	
	$(".tabs").tabs();
	
	$('.thumb li a').tipsy();
	
	$('.social_media li a').tipsy();
	
	$('#nivo_slider').nivoSlider({ pauseTime: parseInt($('#slider_timer').val() * 1000), pauseOnHover: true, effect: 'fade', controlNav: true, captionOpacity: 1, directionNavHide: true });
	
	jQuery('#nivo_slider').hover(function()
	{	
	    $(this).find('.nivo-controlNav').fadeIn();
	},
	function()
	{	
	    $(this).find('.nivo-controlNav').fadeOut();
	});
	
	var footerLi = 0;
	jQuery('#footer .sidebar_widget li.widget').each(function()
	{
		footerLi++;
		
		if(footerLi%4 == 0)
		{ 
			$(this).addClass('widget-four');
		}
	});

});