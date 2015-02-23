// DOM Ready
jQuery(function() {
	
	// SVG fallback
	// toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script#update
	if (!Modernizr.svg) {
		var imgs = document.getElementsByTagName('img');
		var dotSVG = /.*\.svg$/;
		for (var i = 0; i != imgs.length; ++i) {
			if(imgs[i].src.match(dotSVG)) {
				imgs[i].src = imgs[i].src.slice(0, -3) + "png";
			}
		}
	}

	// Place holder para todos los navegadores
	jQuery('input, textarea').placeholder();
	// HEADER - Multiples columnas para todos los navegadores
	jQuery('.menu ul li ul').columnize({ width:220, height:150 });

	/************
	*Tag Cloud
	************/
	if(!jQuery('#myCanvas').tagcanvas({
          textColour: '#1e3042',
          outlineColour: '#1e3042',
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05,
          textHeight:12,
          // stretchX:2,
          weightSizeMax:15
        },'tags')) {
          // something went wrong, hide the canvas container
          jQuery('#tag_cloud-container').hide();
        }


     /**************
     *Ordenar columna de eventos
     **************/
     jQuery('.events-table .colmn1').on('click', function(){
     	jQuery('.events-table .row ').tsort('.colmn1',{returns:true});
     	console.log('clickeado');
     });

     jQuery('.events-table .colmn2').on('click', function(){
     	jQuery('.events-table .row ').tsort('.colmn2',{returns:true});
     	console.log('clickeado');
     })

     jQuery('.events-table .colmn3').on('click', function(){
     	jQuery('.events-table .row ').tsort('.colmn3',{returns:true});
     	console.log('clickeado');
     })


  /* Implementation of Nivo Slider
    $('#slider').nivoSlider({
    effect: 'fade',
    pauseTime: '3000',
        controlNavThumbs: true,
        controlNavThumbsFromRel: true,
        directionNav: false,
        directionNavHide: false,
        captionOpacity: false
  });

  $('.sub-main-post .nivo-control').each(function() {
    $('<div class="overlay">').appendTo(this);
  });
*/

});

jQuery('.popup').click(function(event) {
    var width  = 575,
        height = 400,
        left   = (jQuery(window).width()  - width)  / 2,
        top    = (jQuery(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, 'twitter', opts);
 
    return false;
  });
