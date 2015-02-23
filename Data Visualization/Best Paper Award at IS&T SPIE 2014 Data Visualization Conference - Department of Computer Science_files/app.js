/**
 * Framewerk
 * @author: Westwerk
 * @author URI: http://www.westwerkdesign.com
 * @licence: Code GPL, Design &copy;2012 Westwerk
 */

jQuery(document).ready(function($) {
	
	/* Add external link icon to all a tags inside the main content, remove icon from a tags with images.
	================================================== */
	if($('.page-template-template-home-php').length <= 0){
		
		$('.container.content a:not(.button)').not('.dept-list li a').filter(function() {
		
			
			// strip sub domain from hostname
			function stripSub(str) {
				var parts = str.split('.');
				if (parts.length === 3) {
					parts.shift();
				}
				return parts.join('.');
			}
		
			//this.hostname !== window.location.hostname.replace(/([a-zA-Z0-9]+.)/,"")
			// Return true or false for each url that matches selector
			return this.hostname && stripSub(this.hostname) !== stripSub(location.hostname);
				
		}).addClass("external");
			
		// remove external class from all links containing images
		$('.container.content a').has('img').removeClass("external");
		
		
	}
	
	
	$(".mobile-menu-open").pageslide();
	

	/* Colorbox on Homepage Slider
	================================================== */
	$(function(){
	
		if($('body.wp-admin').length <= 0){ // don't activate on admin pages
			$(".embed").colorbox({iframe:true,width:"90%", height:"90%", maxWidth:"800px", maxHeight:"600px",colorClass:"blue"});
			$(".iframe").colorbox({iframe:true, width:"90%", height:"90%", maxWidth:"800px", maxHeight:"600px",colorClass:"blue"});
			$(".lightbox").colorbox({maxWidth:"800px", maxHeight:"600px",colorClass:"blue"});
		}
	});
	
	/* Mega Menu
	================================================== */
	$(function(){ // run after page loads
			$("div.drop").css({'display' : 'none'});
		
			$("ul#fw-mega-menu > li").hover(function(){
			
			var the_width = $(this).parent('ul#fw-mega-menu').width();
			$(this).find("div.drop").css({'width':the_width,'z-index':9999});
			
			$(this).children('div').show();
			
			
			}, function() {
				$(this).children('div').hide();
			});

	});
	
	/* Mobal Menu
	================================================== */
	$(function(){ // run after page loads

		// Load link on select
		$("select.mobile-menu").change(function() {
			window.location = $(this).find("option:selected").val();
		});
    });

	
	// Forum Login
	$(function(){ // run after page loads
		$("#toggle").click(function() {
		// hides matched elements if shown, shows if hidden
		$("#login-form").slideToggle();
		});
	});

	// Style Tags
	$(function(){ // run after page loads
		$('p.tags a')
		.wrap('<span class="st_tag" />');
	});
	

	// Toggle Slides
	$(function(){ // run after page loads
			$(".toggle_container").hide();
			//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
			$("p.trigger").click(function(){
				$(this).toggleClass("active").next().slideToggle("normal");
				return false; //Prevent the browser jump to the link anchor
			});
	});
	
	// valid XHTML method of target_blank
	$(function(){ // run after page loads
		$('a[rel*=external]').click( function() {
			window.open(this.href);
			return false;
		});
	});
	
	
	/* To the Top Slide Function
	================================================== */
	$(".to-the-top a").click(function(){
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
	});

	
	/* Search Toggle Checkboxes
	================================================== */
	$(function(){
		$('a.search_check').click(function(e) {
		$(this).parent('#search_toggle').find('.search_check').removeClass('active');
		$(this).addClass('active');
    
		check_radio = $(this).attr('data-radio');
		
		$(this).parent().siblings('input:radio').removeAttr("checked");
			$(this).parent().parent().find("."+check_radio).attr("checked", "checked");

			e.preventDefault();
		});

		var currenthost = $('.bloginfo').html();
		if($.params('site') == currenthost){
			$('a.this_s').trigger('click');
			// console.log($('input.this-site').val() +"=="+ currenthost);
		}
	
	});
	
	/* Replace this site search value with current hostname
	================================================== */
	
	/* Utility function to get GET parameterts */
	$.params = function(param_name){
		try{
			var value = new RegExp('[\\?&]' + param_name + '=([^&#]*)').exec(window.location.href);
			return value[1];
		}catch(e){
			return 0;
		}
				
	};
	
	// Set input value for "search this site"
	if($('.page-template-template-home-php').length <= 0){
		
		// Set input value
		var currenthost = $('.bloginfo').html();
		$('input.this-site').attr('value', currenthost);
		$('#searchform').attr('action', 'http://'+currenthost);
				
	}
	
	
	/* Left Sidebar Accordian
	================================================== */
	$(function(){
		$('#sidebar li.page_item').has('ul.children').prepend('<a class="child_toggle" href="#">Dropdown</a>');
		
		var allPanels = $('#sidebar .children').hide();
		if ($('.current_page_item').has('ul.children')) {
			$('.current_page_item ul.children').show();
			$('.current_page_item a.child_toggle').addClass('active');
		}
		$('ul.children').has('.current_page_item').show();
		$('.current_page_parent a.child_toggle').addClass('active');
		
		$('a.child_toggle').click(function(e) {
			$(this).next().next('.children').slideToggle();
			$(this).toggleClass('active');
			e.preventDefault();
		});
	
	});
	
	$(function(){
		$('#sidebar li.menu-item').has('ul.sub-menu').prepend('<a class="child_toggle" href="#">Dropdown</a>');
		
		var allPanels = $('#sidebar .sub-menu').hide();
		if ($('.current_page_item').has('ul.sub-menu')) {
			$('.current_page_item ul.sub-menu').show();
			$('.current_page_item a.child_toggle').addClass('active');
		}
		$('ul.sub-menu').has('.current_page_item').show();
		$('.current_page_parent a.child_toggle').addClass('active');
		
		$('a.child_toggle').click(function(e) {
			$(this).next().next('.sub-menu').slideToggle();
			$(this).toggleClass('active');
			e.preventDefault();
		});
	
	});


	/* Tabs Activiation
	================================================== */
	var tabs = $('ul.tabs');
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).find('> li > a');
		$("ul.tabs li:first-child").addClass("active").fadeIn('fast'); //Activate first tab
		$("ul.tabs li:first-child a").addClass("active").fadeIn('fast'); //Activate first tab
		$("ul.tabs-content li:first-child").addClass("active").fadeIn('fast'); //Activate first tab
		
		tab.click(function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr('href') + "Tab";
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();
			
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				
				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
				
			}
		});
	});
	
	/**
	* Homepage Slider Init
	*
	*/
	
	var homeslider = $('.hero .flexslider').flexslider({
		animation:'slide',
		directionNav: true,
		controlNav: false,
		slideshowSpeed: flexslider_settings.slideshowSpeed
		
	});
	
	/**
	* Homepage Tier 1 Slider Init
	*
	*/
	
	var tier1slider = $('.page-template-template-tier1-php .flexslider, .page-template-template-tier1-full-width-php .flexslider').flexslider({
		animation:'fade',
		slideshowSpeed:8000
	});
	
	/**
	* Homepage Newsslider Init
	*
	*/
	
	var newsslider = $('.campus-news .flexslider, .department-news .flexslider').flexslider({
		animation:'slide',
		directionNav: true,
		controlNav: false,
		slideshow: false,
		
		
	});
	
	
	// Manual nav to advance slider
	$('.campus-news-nav a.next, .department-news-nav a.next').click(function(e){
		
		$(".campus-news .next, .department-news .next").trigger("click");
	
		e.preventDefault();
	});
	
	$('.campus-news-nav a.prev, .department-news-nav a.prev').click(function(e){
		
		$(".campus-news .prev, .department-news .prev").trigger("click");
	
		e.preventDefault();
	});
	
	//Gateway slider
	$('.gateway_slider').flexslider({
		animation:'fade',
		slideshowSpeed:8000,
	});
	
	/**
	* Search Bar auto clear default content on focus
	*
	*/

    var Input2 = $('#searchbar');
    var default_value = Input2.find('#q').val();
    Input2.on('focus','#q',function(){
		Input = $('#searchbar #s,#searchbar #q');
		if(Input.val() == default_value) Input.val("");
		
    }).on('blur','#q',function(){
		Input = $('#searchbar #s,#searchbar #q');
		if(Input.val().length === 0) Input.val(default_value);
		
    });

	
	
	/**
	* Tool Tip 
	*
	*/
	
	var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
 
    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip === '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
 
        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
 
            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
 
            if( pos_left + tooltip.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
 
            if( pos_top < 0 )
            {
                pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
 
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        init_tooltip();
        $( window ).resize( init_tooltip );
 
        var remove_tooltip = function()
        {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });
 
            target.attr( 'title', tip );
        };
 
        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });
	
	
	/**
	* Add span wrap to all default UL LI for styling purposes
	*
	*/
	
	$('.entry-content ol li').not('.dept-list li').wrapInner('<span />');
	$('.entry-content ul li').not('.dept-list li').wrapInner('<span />');

	
	/**
	* Print Button
	* 
	* Add print button only if user has Javascript enabled. Best practice.
	* 
	*/
	
	$('.breadcrumb .share').prepend('<li class="print"><a href="javascript:window.print()">Print</a></li>');
	

	// Prevent right click on photos in colorbox for flicker plugin
	$(document).on('contextmenu','img.cboxPhoto', function(e) {
		return false;
	});


	// Responsive video jquery plugin
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	var ua = navigator.userAgent.toLowerCase();
	var Android = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	
	if(iOS || Android){
		// console.log('mobile');
		$(".entry-content ").fitVidsMobile();
		
	}else{
		// console.log('desktop');
		$(".entry-content ").fitVids();
	}
		
}); // End jQuery Ready