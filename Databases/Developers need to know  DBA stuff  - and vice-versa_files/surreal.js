var isMobile = false;
	
if( navigator.userAgent.match(/Android/i) || 
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) || 
	navigator.userAgent.match(/iPad/i)|| 
	navigator.userAgent.match(/iPod/i) || 
	navigator.userAgent.match(/BlackBerry/i)){
				
		isMobile = true;
			
}

/*iOS5 fixed-menu fix*/
var iOS5 = false;

if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)){

	iOS5 = true;

}

jQuery(document).ready(function(){

	jQuery("nav").sticky({topSpacing:0});

	jQuery("#nav").tinyNav({active: 'current-menu-item'});

	jQuery( '.dropmenu').on('change', function() {

		moveTo(this.value);

	});

});

function moveTo(contentArea){

	if ( contentArea.indexOf("http://") >= 0 )
		window.location = contentArea;

	var goPosition = jQuery(contentArea).offset().top;
	jQuery('html,body').animate({ scrollTop: goPosition}, 'slow');
}

  jQuery('#carouselSlider').flexslider({
	animation: "slide",
	animationLoop: true,
	itemWidth: 236,
	itemMargin: 0,
	prevText: "", 
	nextText: "",
	start: function(slider){
		jQuery('body').removeClass('loading');
	}
  });

jQuery(document).ready(function(){

	jQuery( '.page > div > h3:not(:last-child)').css( 'margin-bottom', '0' );
	
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',slideshow:6000});


	jQuery("button").not(".command").click(function(){
		jQuery("button").not(".command").removeClass("sel");
		jQuery(this).addClass("sel");
	});

	jQuery('div').hover( function() {
		jQuery( this ).children('ul').children('li').children('.bar').each( function() {
			jQuery( this ).css('width',jQuery( this ).attr('data-width'));
		});
	}, function() {
		jQuery( this ).children('ul').children('li').children('.bar').each( function() {
			jQuery( this ).css('width','22px');
		});
	});

	jQuery( '.section:not(.contact-section) .container .columns:first-child h1' ).each( function() {

		var $this = jQuery( this ),
		t = $this.text(),
		first = t.split("|")[0],
		second = ( t.split("|")[1] == undefined ) ? '' : t.split("|")[1];

		if ( second == '' ) {
		var thefinal = t;
		} else {
		var thefinal = '<span>' + first + '</span><br>' + second;
		}

		$this.html( thefinal );

	});

	jQuery( '.section.contact-section .container .columns:first-child h1' ).each( function() {

		var $this = jQuery( this ),
		t = $this.text(),
		first = t.split("|")[0],
		second = ( t.split("|")[1] == undefined ) ? '' : t.split("|")[1];

		if ( second == '' ) {
		var thefinal = t;
		} else {
		var thefinal = first + '<span>' + second + '</span>';
		}

		$this.html( thefinal );

	});
	
	jQuery( '.skill' ).each( function() {
		jQuery( this ).closest( 'ul' ).css( 'list-style', 'none' ).css( 'margin', 0 );
		jQuery( this ).closest( 'li' ).css( 'margin', 0 );
	});

	jQuery( '.gmap-toggle' ).click( function() {

		var $this = jQuery( this ),
			map = jQuery( '.gmap-wrap'),
			form = jQuery( '.peThemeContactForm' );

		if ( $this.hasClass( 'toggled' ) ) {
			$this.toggleClass( 'toggled' );
			map.css( 'height', '0px' ).css( 'visibility', 'hidden' ).css( 'opacity', '0' );
			form.fadeIn();
		} else {
			$this.toggleClass( 'toggled' );
			map.css( 'height', '300px' ).css( 'visibility', 'visible' ).css( 'opacity', '1' );
			form.fadeOut();
		}

		return false;

	});
	
});

jQuery(window).load(function(){
	jQuery('body').removeClass('loading');

	jQuery('.post-media .flexslider').flexslider({
		animation: "slide",
		prevText: "", 
		nextText: ""
	});

	jQuery( '.section:not(.contact-section) .container .columns:first-child h1' ).each( function() {

		if ( jQuery( this ).children( 'span' ).length > 0 ) {
			jQuery( this ).closest( '.page' ).css( 'padding-top', 0 );
		}

	})

	jQuery('.gallery-container .flexslider').flexslider({
		animation: "slide",
		prevText: "", 
		nextText: ""
	});

});