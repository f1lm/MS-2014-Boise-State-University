jQuery(document).ready(function() {
  //$('#skip-link').toc();
        $('#skip-link a').click(function(e){
            $($(this).attr('href')).focus();
            $(this).hide();
            e.preventDefault();
        });
   
    jQuery('#global-nav .apply a').attr("tabindex", 2);
     if (jQuery('#contentmain').length > 0)
                jQuery('#contentmain').attr("tabindex", 0);

    // Super-fish custom for main menu
    jQuery('#global-nav ul.sf-menu').supersubs({
        minWidth: 12, // minimum width of sub-menus in em units
        maxWidth: 19, // maximum width of sub-menus in em units
        extraWidth: 1 // extra width can ensure lines don't sometimes turn over due to slight rounding differences and font-family
    }).superfish({
        delay: 0, // delay on mouseout in milliseconds
        animation: {
            opacity:'show',
            height:'show'
        },  // fade-in and slide-down animation
        animationOut: {
            opacity:'hide',
            height:'hide'
        }, // Used to animate the submenu closed
        speed: 'fast', // speed of the opening animation.
        speedOut: 100, // speed of the closing animation.
        cssArrows: true, // allow generation of arrow mark-up
        disableHI: true // set to true to disable hoverIntent detection
    });

    // Super-fish custom for auxiliary menu
    jQuery('#global-auxiliary ul.sf-menu').superfish({
        delay: 0, // delay on mouseout in milliseconds        
        animation: {
            opacity:'show',
            height:'show'
        },  // fade-in and slide-down animation
        animationOut: {
            opacity:'hide',
            height:'hide'
        }, // Used to animate the submenu closed
        speed: 'fast', // speed of the opening animation.
        speedOut: 100, // speed of the closing animation.
        cssArrows: true, // allow generation of arrow mark-up
        disableHI: true // set to true to disable hoverIntent detection
    });

    // Sharebox animation
    if (jQuery('body').hasClass('home') !== true){
        var msie6 = jQuery.browser == 'msie' && jQuery.browser.version < 7;

        if (!msie6) {
            jQuery(function() {
                var offset = jQuery("#sharebox").offset();
                var topPadding = 35;

                jQuery(window).scroll(function() {

                    if (jQuery(window).scrollTop() > offset.top) {
                        jQuery("#sharebox").stop().animate({
                            marginTop: jQuery(window).scrollTop() - offset.top + topPadding
                        });
                    } else {
                        jQuery("#sharebox").stop().animate({
                            marginTop: 0
                        });
                    }
                });
            });
        }
    }
    $('#global-nav ul.sub-menu li.menu-item-has-children a.sf-with-ul').keydown(function(e){
        if(e.keyCode == 27) {
            $(this).parent().parent().hide();
            if ($(this).parent().parent().parent().next().length > 0)
            $(this).parent().parent().parent().next().find('a').first().focus();
            e.stopPropagation();
        }
              
    });
     $('#global-nav ul.sub-menu li.menu-item-object-page a').keydown(function(e){
        if(e.keyCode == 27) {
            $(this).parent().parent().hide();
            if ($(this).parent().parent().parent().next().length > 0)
            $(this).parent().parent().parent().next().find('a').first().focus();
            e.stopPropagation();
        }
              
    });
      var pdfImage = template_dir + '/images/acrobat-icon.gif';
        jQuery('#contentmain a[href$=".pdf"]').append('<img class="pdf-img" src="' + pdfImage + '" alt="PDF"/>');
        jQuery('#contentmain a[href$=".PDF"]').append('<img class="pdf-img" src="' + pdfImage + '" alt="PDF"/>');
        var externalImage = template_dir + '/images/external-link-icon.png';
        jQuery('#contentmain a').not('#contentmain a[href$=".pdf"],div.insidepg a').filter(function() {
                 return this.hostname && this.hostname !== location.hostname;
            }).append(' <img class="external-img" src="' + externalImage  + '" alt="External link"/>');
});