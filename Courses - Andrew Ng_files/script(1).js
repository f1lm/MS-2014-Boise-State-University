/* ================== init.superfish.js =================== */

;(function($){
    
/*--------------------------------------------
 *   superfish menu init
 *--------------------------------------------*/
    
    function init_superfish(speed, delay, fade){
        
        var animEff = { opacity:'show', height:'show' };
        if(fade) animEff.opacity = 'show';
        
        $('ul.sf-menu').superfish({ 
            delay:       delay,    // one second delay on mouseout 
            animation:   animEff,  // fade-in and slide-down animation 
            speed:       speed,    // faster animation speed 
            autoArrows:  true,     // disable generation of arrow mark-up 
            dropShadows: false     // disable drop shadows 
        });
    }
    init_superfish('fast', 100, true);
    
})(jQuery);

/* ================== init.averta.js =================== */

;(function($){

/*--------------------------------------------
 *  Averta plugins
 *--------------------------------------------*/
    
    // on document ready 
    $(document).ready(function(){
    
        $('.widget-tabs .widget-inner').avertaLiveTabs({
            tabs:            'ul.tabs > li',            // Tabs selector
            tabsActiveClass: 'active',                  // A Class that indicates active tab
            contents:        'ul.tabs-content > li',    // Tabs content selector    
            contentsActiveClass: 'active',              // A Class that indicates active tab-content    
            transition:      'fade',                    // Animation type white swiching tabs
            duration :        50                        // Animation duration in mili seconds
       });
   
   });
   
   
   $(".scroll2top").avertaScroll2top({ ease:'easeInOutQuint', speed:800 });
   
})(jQuery);

/* ================== init.retina.js =================== */


;(function($){

/*--------------------------------------------
 *  Load high resolution images on retina screens
 *--------------------------------------------*/

   if( window.devicePixelRatio && window.devicePixelRatio == 2.0 ){
       
        var $retina_ready_imgs = $("img[data-image2x]");
        
        if(!$retina_ready_imgs.length) return;
        
        $retina_ready_imgs.each( function( index, element ){
            var $this = $(this);
            var image2x_src = $this.data("image2x");
            if(image2x_src) 
                $this.attr('src', image2x_src );
        });
   }
   
})(jQuery);

/* ================== resize.js =================== */

   
/*--------------------------------------------
 *  on resize
 *--------------------------------------------*/

;(function($){
      
    backupStyles();
    resizeSections();
    
    $(window).bind("debouncedresize", resizeSections );
    
})(jQuery);

/*--------------------------------------------*/


function resizeSections(){
    $ = jQuery.noConflict();
    
    var imgRatio = 1.65;
    
    var screenWidth = $(window).width();
    
    if( screenWidth < 650 ) {
        // change blog land mode to portrait
        $('.widget-blog .land').each( function(index){
            $(this).removeClass("land");
        });
        
    } else {
        // rollback to blog land mode
        $('.widget-blog [data-class*="land"]').each( function(index){
            var $this = $(this).addClass("land");
        });
    }
    
    if( screenWidth < 768 ) { 
        // add mob class to widget title bar if filter nav exist
        $('.widget-nav.filterable').closest('.widget-title-bar').addClass('mob');
    } else {
        // remove mob class from widget title bar
        $('.widget-title-bar.mob').removeClass('mob');
    }
    
    
    if( screenWidth < 960 ) {
        // change blog land mode to portrait (sidebar)
        $('#main.land').each( function(index){
            $(this).removeClass("land");
        });
        
    } else {
        // rollback to blog land mode
        $('#main[data-class*="land"]').each( function(index){
            $(this).addClass("land");
        });
    }
    
    /*
    $(".g1 .col.height2, .g1 .col .height2").each(function(index){
        var $this = $(this);
        $this.height( 2 + Math.floor(($this.width() / imgRatio) * 2) );
    });
    
    //$(".g1 .col.height1, .g1 .col .height1").each(function(index){
    $(".col.height1, .col .height1").each(function(index){
        var $this = $(this);
        $this.height( Math.floor($this.width() / imgRatio) );
    });
    */  
}


function backupStyles() {
    $ = jQuery.noConflict();
    
    $('.land').each( function(index){
        var $this = $(this);
        $this.attr( "data-class" ,$this.attr("class"));
    });
}



/* ================== init.isotope.js =================== */

;(function($){
/*--------------------------------------------
 *  Isotope Filterable Widgets
 *--------------------------------------------*/
    
    function init_isotope_filter(widget, container, btns){
        
        var $btns      = $(btns);
        var $container = $(container);
        
        //get active filter
        var filterType = $btns.filter('.active').attr('data-filter');
        
        // provide selector
        var selector   = (filterType === 'all')?'' : '[data-filter="' + filterType + '"]';
        
        /* initialize isotope */
        $container.isotope({ 
            animationEngine : 'best-available',
            filter : selector
        });
        
        // filter items when filter link is clicked
        $btns.click(function(event) {
            var $this = $(this);
            event.preventDefault();
            
            // reset the active class on all the buttons
            $this.siblings().removeClass('active');
            $this.addClass('active');
            
            filterType = $this.data('filter');
            selector   = (filterType === 'all')? '': '[data-filter*="' + filterType + '"]';
            //console.log(selector);
            $container.isotope({ 
                filter :  selector ,
                animationEngine : 'best-available' ,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
        });
    }
    
    function init_filterable_sections(){
        
        for(var j=0,l = $widgets.length; j<l; ++j){
            var $widget    = $widgets.eq(j);
            var widget_selector = '#' + $widget.attr('id') + ' ';
            var container  = widget_selector + '.motion-wrapper';
            var btns       = widget_selector + '.filterable a';
            if(!$(btns).length) continue; 
            init_isotope_filter(widget_selector, container, btns);
        }
    }
    
    function update_filterable_sections(){
        
        for(var j=0,l = $widgets.length; j<l; ++j){
            var $widget    = $widgets.eq(j);
            var $btns      = $widget.find('.filterable a');
            if(!$btns.length) continue; 
            $btns.filter('.active').trigger("click");
        }
    }
    
    // get all portfolio and product widgets on page
    var $widgets = $('.widget-folio, .widget-product');
    
    // init isotope when widget images are loaded
    $widgets.imagesLoaded(init_filterable_sections);
    // update layout on page resize
    $(window).bind("debouncedresize", update_filterable_sections );
    
    
})(jQuery);


;(function($){
/*--------------------------------------------
 *  Isotope Masonry Widgets
 *--------------------------------------------*/
    
    function init_isotope_masonry_grid(container){
        
        var $container = $(container);
        
        /* initialize isotope */
        $container.isotope({ 
            animationEngine : 'best-available',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        
    }
    
    function init_masonry_sections(){
        
        for(var j=0,l = $widgets.length; j<l; ++j){
            var $widget    = $widgets.eq(j);
            var widget_selector = '#' + $widget.attr('id') + ' ';
            var container  = widget_selector + '.motion-wrapper';
            
            var is_filterable       = widget_selector + '.filterable a';
            var is_slideable        = widget_selector + '.widget-nav';
            if( $(is_filterable).length || $(is_slideable).length) continue; 
            init_isotope_masonry_grid(container);
        }
    }
    
    // get all portfolio widgets 
    var $widgets = $('.widget-folio, .widget-gallery');
    
    // init isotope when widget images are loaded
    $widgets.imagesLoaded(init_masonry_sections);
    // update layout on page resize
    $(window).bind("debouncedresize", init_masonry_sections );
    
})(jQuery);

/* ================== init.carousel.js =================== */


;(function($){
    
    // get all article type widgets and init carousel
    function init_article_carousels(){
        
        $.each($article_widgets, function(){
            $this = $(this);
            if($this.find('.widget-nav').hasClass('pagination'))
                init_article_carousel($this);
        });
    }
    
    
    function init_article_carousel($widget){
       
       var visible_items, min_num, availableW, itemW, $wrapper_width, screenWidth;
       
       screenWidth     = $(window).width();
       $widget_wrapper = $widget;
       $carou_wrapper  = $widget_wrapper.find(".motion-wrapper");
       
       $carou_wrapper.css("margin-left", 0).css("margin-right","-18px");
       $carou_items    = $carou_wrapper.children();
       
       $wrapper_width  = $widget_wrapper.width();
       
       if      ($carou_wrapper.hasClass("five-column") ){
           visible_items = 5;
       }else if($carou_wrapper.hasClass("four-column") ){
           visible_items = 4;
       }else if($carou_wrapper.hasClass("three-column")){
           visible_items = 3;
       }else if($carou_wrapper.hasClass("two-column")  ){
           visible_items = 2;
       }else if($carou_wrapper.hasClass("one-column")  ){
           visible_items = 1;
       }else{
           visible_items = 3;
       }
       
       if(screenWidth < 960){
           min_num = Math.floor($wrapper_width/ 310);
       }else{
           min_num = visible_items;
       }
       
       availableW = $wrapper_width - ((min_num - 1) * 18);
       itemW = Math.floor(availableW / min_num);
       
       $.each($carou_items, function(i){
           $this = $(this);
           $this.css("margin-right", "18px");
           $this.css("margin-left" , 0);
           $this.css("max-width"   , itemW);
       });
       
       var autoplay = ($carou_wrapper.closest(".widget-container").data("autoplay") == "yes");
       
       $carou_wrapper.carouFredSel({
            circular : autoplay,
            infinite : false,
            resonsive: true ,
            align    : "left",
            height   : "auto",
            items: {
                visible:visible_items
            },
            scroll: {
                items: 1,
                easing: "easeOutQuint"
            },
            auto: {  play  : autoplay,
                    duration : 1000, timeoutDuration:1700, pauseOnHover:true 
            },
            prev: {
                button: function() { 
                    return $(this).closest(".widget-container").find('.widget-title-bar .w_prev'); },
                easing: "easeOutCubic",
                items: 1,
                duration: 800
            },
            next: {
                button: function() { 
                    return $(this).closest(".widget-container").find('.widget-title-bar .w_next'); },
                easing: "easeOutCubic",
                items: 1,
                duration: 800
            },
            swipe: {
                items: 2,
                duration: 800,
                easing: "easeInOutCubic",
                onMouse: true,
                onTouch: true
            }
            
        });
        
        $widget_wrapper.find(".caroufredsel_wrapper").width("auto");
    }
    
    
    var $article_widgets = $(".widget-blog, .widget-news, .widget-product, .widget-folio, .widget-pages, .entry-related");
    
    // update widgets state on page resize
    $(window).on("debouncedresize", init_article_carousels);
    
    init_article_carousels();
    $(document).ready(init_article_carousels);
    $article_widgets.imagesLoaded( init_article_carousels );
})(jQuery);






;(function($){
    
    function init__brand_slider() {
        $brand_slider.children('li').show();
        // init carousel for client/brand section
        $brand_slider.carouFredSel({
            
            circular    : true,
            infinite    : true,
            debug       : false,
    
            width: '100%',
            height: 'auto',
            //responsive:true,
            items: {
                visible:{
                            min: 1,
                            max: 8
                        }
            },
            scroll: { 
                easing: "quadratic",
                pauseOnHover: "resume",
                items: 1,
                duration: 500
            } ,
            swipe: {
                onMouse: true,
                onTouch: true,
                items: 4,
                duration: 500,
                easing: "easeInOutCubic"
            },
            auto: {  play  : ($(this).closest(".wrapper_brands").data("autoplay") == "yes"), 
                     duration : 800, timeoutDuration:1500, pauseOnHover:true },
            prev: {
                button: function() { return $(this).parent().siblings(".arr_small_prev"); }
            },
            next: {
                button: function() { return $(this).parent().siblings(".arr_small_next"); }
            }
        });
    
    };
    
    $brand_slider = $('.wrapper_brands > ul.carousel_list');
    $brand_slider.imagesLoaded(init__brand_slider);
    
    $(document).ready(function() {
        // init testimonial carousel
        $('div.testimonial_slider').carouFredSel({
    
            height: 'auto',
            padding:[0,0, 220,0],
            direction: 'up',
            align:false,
            
            debug:false,
            
            items: {
                visible:1,
                width:"100%",
                height:"variable"
            },
            scroll: { 
                easing: "quadratic",
                pauseOnHover: "resume",
                fx : 'crossfade'
            } ,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            auto : {
                easing      : "quadratic",
                duration    : 1500,
                timeoutDuration: 6000,
                pauseOnHover: true
            },
            prev: {
                button: function() { 
                    var $this = $(this);
                    var isMax = $this.closest('.widget-testimonial').hasClass("max");
                    if(isMax){
                        return $(this).parent().siblings(".arr_small_prev"); 
                    }else{
                        return $(this).parent().siblings(".widget-title-bar").find('.w_prev'); 
                    }
                },
                easing      : "quadratic",
                duration    : 500,
                pauseOnHover: true
            },
            next: {
                button: function() { 
                    var $this = $(this);
                    var isMax = $this.closest('.widget-testimonial').hasClass("max");
                    if(isMax){
                        return $(this).parent().siblings(".arr_small_next"); 
                    }else{
                        return $(this).parent().siblings(".widget-title-bar").find('.w_next'); 
                    }
                },
                easing      : "quadratic",
                duration    : 500,
                pauseOnHover: true
            }
        });
        
        
    });
    
})(jQuery);


/* ================== init.map.js =================== */

;(function($){
    
    
    
})(jQuery);


/* ================== init.highlightjs.js =================== */

;jQuery(function($){
    if(typeof hljs !== 'undefined') { hljs.initHighlightingOnLoad(); }
});

/* ================== click.js =================== */

;(function($){
    
    $('.nav-toggle').unbind('click')
                    .bind('click', function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        $('nav#access .sf-menu').animate({ height:'toggle' });
    });
    
})(jQuery);

/* ================== elements.js =================== */

;jQuery(function($){
    
    // messagebox script
    $('.msgbox').each(function(i){
        
        $(this).find("a.close").on("click", function(event){
            event.preventDefault();
            var $block = $(this).closest('.msgbox');
            
            $block.slideUp(300, function(){
                $block.remove();
            });
        });
    
    });
    
});


// position callout button in safari
;(function($) {
    if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) return;
    
    var $callout = $('div.callout');
    var $btn     = $callout.find('.featured_btn');
    var $label   = $btn.find('span');
    
    function updateCalloutBtnPosition(){
        var topPos   = ($btn.height() - $label.height()) * 0.5;
        $label.css('top', topPos);
    }
    updateCalloutBtnPosition();
    $(window).bind("resize", updateCalloutBtnPosition );
})(jQuery);





/* ================== pages.js =================== */

// ---- product page ---------------------
// increase the min height for product info column if the info column was bigger than media
;(function($){
    var $singleProduct = $(".single-product");
    if(!$singleProduct.length) return;
    
    var infoHeight = $singleProduct.find(".single-info").height() + 110; // 100 is the height of product thumb carousel.
    if(infoHeight > 300)
        $singleProduct.find("#main .hentry .entry-content")
                            .css("min-height", infoHeight).end()
                      .find("#main .hentry .entry-wrapper")
                            .css("min-height", infoHeight);
    
})(jQuery);

/* ================== init.chart.js =================== */

/*--------------------------------------------
 *  Animate Progress chart
 *--------------------------------------------*/

jQuery(function($){

    $chart = $('.widget-chart');
    if(!$chart.length) return;
    
    $bars  = $chart.find('.chart-bar');
    
    $.each($bars, function(i){
        $this = $(this);
        $slider = $this.children('div');
        percent = parseInt($slider.find('em').text());
        
        $slider.width(0);
        $slider.delay(i * 150).animate(
            { 'width': (percent+"%") },
            { duration:2000,
              easing: 'easeOutQuad'
            }
        );
    });
    
});

/* ================== init.prettyphoto.js =================== */

;(function($){

/*--------------------------------------------
 *  prettyPhoto init
 *--------------------------------------------*/
    
    var viewportWidth = $('body').innerWidth();
    
    $("a[rel^='prettyPhoto'], a[data-rel^='prettyPhoto']").prettyPhoto({
        hook: 'data-rel',
        counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
        theme: 'light_square', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
        horizontal_padding: 0, /* The padding on each side of the picture */ 
        autoplay: true, /* Automatically start videos: True/False */
        
        markup: '<div class="pp_pic_holder"> \
                    <div class="pp_content_container"> \
                        <div class="pp_left"> \
                        <div class="pp_right"> \
                            <div class="pp_content"> \
                                <a class="pp_close" href="#">Close</a> \
                                <div class="pp_loaderIcon"></div> \
                                <div class="pp_fade"> \
                                    <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                    <div class="pp_hoverContainer"> \
                                        <a class="pp_next" href="#">next</a> \
                                        <a class="pp_previous" href="#">previous</a> \
                                    </div> \
                                    <div id="pp_full_res"></div> \
                                    <div class="pp_details"> \
                                        <div class="pp_nav"> \
                                            <a href="#" class="pp_arrow_previous">Previous</a> \
                                            <a href="#" class="pp_arrow_next">Next</a> \
                                        </div> \
                                        <div class="ppt">&nbsp;</div> \
                                        <p class="pp_description"></p> \
                                        <div class="pp_social">{pp_social}</div> \
                                    </div> \
                                </div> \
                            </div> \
                        </div> \
                        </div> \
                    </div> \
                </div> \
                <div class="pp_overlay"></div>',
        gallery_markup: '<div class="pp_gallery"> \
                            <a href="#" class="pp_arrow_previous">Previous</a> \
                            <div> \
                                <ul> \
                                    {gallery} \
                                </ul> \
                            </div> \
                            <a href="#" class="pp_arrow_next">Next</a> \
                        </div>',
        image_markup: '<img id="fullResImage" src="{path}" />',
        flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
        quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
        iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
        inline_markup: '<div class="pp_inline">{content}</div>',
        custom_markup: '',
        social_tools: '<ul class="socials"><li><a href="http://www.facebook.com/plugins/like.php?locale=en_US&href='+ location.href +'" class="icon-facebook-sign"></a></li><li><a href="http://twitter.com/share" class="icon-twitter"></a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></li></ul>',
        changepicturecallback: function(){
                                    if (viewportWidth < 1000) {
                                        $(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
                                    }
                                }
    });
    
})(jQuery);

/* ================== contact-form7.js =================== */

;(function($){

/*--------------------------------------------
 *  enable contact form 7 placeholder
 *--------------------------------------------*/
   
   var $cf7_fields = $("form.wpcf7-form").find("input, textarea");
   
   $cf7_fields.each(function() {
       var $this = $(this);
        $this.attr("placeholder", $this.attr("title") );       
    }); 
   
})(jQuery);

