/*jslint browser:true, white:true */

//global variable used to pass load more states from backend to the frontend
var loadMoreButtonStates = {};

(function(expose, $){
    // on page load
    $(function(){
        disableIsotopeShadeIpad();
        homepageGrid.centerPage();
        homepageGrid.onImagesAndArticlesLoaded(); // Init Isotope
        initIsotopeFilterControls();
        initIsotopeScreen();
        initTickerControls();
        initCustomSelectDropdowns();
        initGlobalNavMenus(headerInteractions, carousel); //this is kind of ugly
        initBackToTopLink();
        initGAEventTracking();
        $('#global-footer img.lazy').lazyload();
        applyFitVids();
	});

    /**
     * homepageGrid
     * @object
     */
	var homepageGrid = {
        cellWidth: 320,
        padding: 40, // padding left/right of whole page

        /**
         * centerPage
         *
         * Keeps the wrapper sized based on the cell width
         */
        centerPage: function(){
            var _cellWidth = homepageGrid.cellWidth;
            var windowWidth = $(window).width() - homepageGrid.padding;
            var numCols = Math.floor(windowWidth/_cellWidth);
            expose.numCols = numCols;
            expose.numColsSaved = numCols;

            //FIXME there's a bug here that causes right side of the window to get cut off
            if(windowWidth > 1024){
                var centeredWidth = numCols * _cellWidth;
                $('div.wrap').css('width', centeredWidth);
                //$('ul.primary').css('width', centeredWidth + 40);
                $('#iso-content').css('width', _cellWidth * (numCols - 2));
                $('#iso-content #tag-filter').css('width', _cellWidth * (numCols - 2) - 20);
            }
            else{
                $('div.wrap').css('width', _cellWidth * 3);
                $('html').css('width', 1024);
                $('#iso-content').css('width', _cellWidth);
                $('#iso-content #tag-filter').css('width', _cellWidth - 20);
            }


            expose.onresize = function(){
                var windowWidth = $(window).width() - homepageGrid.padding;

                if(windowWidth > 1250){

                    var numCols = Math.floor(windowWidth/_cellWidth);

                    expose.numCols = numCols;
                    var centeredWidth = numCols * _cellWidth;
                    $('div.wrap').css('width', centeredWidth);

                    //$('ul.primary').css('width', centeredWidth + 40);
                    $('#iso-content').css('width', _cellWidth * (numCols - 2));
                    $('#iso-content #tag-filter').css('width', _cellWidth * (numCols - 2) - 20);
                    $('div.articles').isotope('reLayout');

                }
                else{
                    $('div.wrap').css('width', _cellWidth * 3);
                    $('#iso-content').css('width', _cellWidth);
                    $('#iso-content #tag-filter').css('width', _cellWidth - 20);
                    $('div.articles').isotope('reLayout');
                }
                if($(window).width() < 1000){
                    $('html').css('width', 1024);
                }  else{
                    $('html').removeAttr('style');
                }
            }
        },

        /**
         * onImagesAndArticlesLoaded
         *
         * Initializes isotope layout.
         */
        onImagesAndArticlesLoaded: function(){
            $('span.blur').show(); //show hidden "screen" over isotope modules

            var lazyLoaded = $('div.articles img.lazy');

            lazyLoaded.lazyload({
                failure_limit: 200,
                skip_invisible: false
            });
            lazyLoaded.lazyload({ event: 'scroll' });
            
            getPath = location.pathname
            
            if(getPath.indexOf('blog') > -1){
                $('#iso-content .commented-item:first').prepend( '<h2 style="margin-top: 0;">Most Commented Posts</h2>');
             }else if(getPath.indexOf('podcast') < 0 && getPath.indexOf('webbinar') < 0 ){
                $('#iso-content .related-item:first').prepend( '<h2 style="margin-top: 0;">Related Stories</h2>');
             }

            console.info('initializing isotope layout');
            $('#iso-content div.articles').isotope({
                // options
                animationEngine: 'css',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                },
                itemSelector : 'article.item',
                containerStyle: {overflow: 'visible'},
                resizable: false,
                resizesContainer: true,
                transformsEnabled: false,
                layoutMode: 'masonryAdsRight',
                masonryAdsRight: {
                    columnWidth: homepageGrid.cellWidth,
                },
                filter: '.recent-item'

            });
			$('div.articles').isotope({
				// options
                animationEngine: 'css',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                },
				itemSelector : 'article.item',
                containerStyle: {overflow: 'visible'},
				resizable: false,
                resizesContainer: true,
				transformsEnabled: false,
                layoutMode: 'masonryAdsRight',
                masonryAdsRight: {
                    columnWidth: homepageGrid.cellWidth,
                },
                filter: '.recent-item',
                getSortData: {
                    recent: function($elem) {
                        return parseInt($elem.data('recent-rank'));
                    },
                    viewed: function($elem) {
                        return parseInt($elem.data('viewed-rank'));
                    },
                    commented: function($elem) {
                        return parseInt($elem.data('commented-rank'));
                    }
                },
                sortBy: 'recent'
            });
		}
	};

    /**
     * headerInteractions
     */
    var headerInteractions = {
        navOffset: $('#mainNav').position(),
        currMenu: false,
        currLink: false,
        slider: $("div.slider"),
        navigation: $("nav ul.primary a"),
        currentSlug:"",
        currentType:"",
        init: function(){


            // HoverIntent config for main nav
            var mnConfig = {
                over: function(e){ headerInteractions.hoverOnNav(this, e);},
                timeout: 500,
                out: function(e){ return false;},
                interval: 300
            }

            //Hover Intent for Main Nav hovers
            headerInteractions.navigation.hoverIntent(mnConfig).click( function(e){headerInteractions.hoverOnNav(this, e); });

            // HoverIntent config for Sort Links in Header dropdowns
            var slConfig = {
                over: headerInteractions.sortLinks,
                timeout: 100,
                out: function(e){return false;},
                interval: 200
            }
            //Hover Intent for Sort link hovers
            $('ul.sort-links a').hoverIntent(slConfig);

            //Sticky main nav, but not for iPad
            //TODO detect android tablets
			if ($.browser.msie  && parseInt($.browser.version, 10) < 9) {

			// do not use this script for IE browsers IE 8 or older
			} else if(navigator.userAgent.indexOf('iPad') < 0) {
                headerInteractions.stickyTop();
            }

            // Uncomment the next few lines if you want to enable swiping the whole rich nav again
            // remember that it conflicts with the More Stories carousels that are also in the rich nav
            /*
            $("header nav").touchwipe({
                wipeLeft: function() { headerInteractions.onSwipe("left"); },
                wipeRight: function() { headerInteractions.onSwipe("right"); }
            });
            */
			$(window).resize(headerInteractions.swapPosts);
        },
        sortLinks: function(event){
        	var source = event.target || event.srcElement;
        	var slug = $(this).attr("data-slug");
		var channelType = $(this).attr("data-channelType");
		currentSlug = slug;
		currentType = channelType;
            	//$('.sort-links a').on('mouseenter', function(e){
                //var type = $(this).data('content'), title = $(this).html(), target = $(this).parents('.cols').find('li.tStories');
                var clas = $(this).data('class');
                var parent = $(this).parents('.cols');

                parent.find('span.sortable-list').children().hide();
                parent.find('li.mStories .carousel').hide();
                parent.find('span.sortable-list .'+clas+', , li.mStories span.carousel').fadeIn(200);

                carousel.init();


                var moreNode =$("#sliderStories-"+ currentType)
            	if($(window).width() > 1320){//if Larger Screen
            	   moreNode.html($("#"+currentSlug+"-"+currentType).html());
            	}else{
            		moreNode.html($("#"+currentSlug+"-"+currentType+"-smallScreen").html());
            	}
        },

        /**
         *
         */
        stickyTop: function(){

            //note - we have to change the height of the pinned eleeent to fix the scrolling issue

            var ceil = Math.ceil(headerInteractions.navOffset.top);
            if($(window).scrollTop() > ceil){
                $('body').addClass('pinned');
            }
            $(window).scroll( function(){
                if($(window).scrollTop() > parseInt(ceil)){
                    $('body').addClass('pinned');
					$('.pinned #header').css('top','-' + ceil + 'px');
                    $('#ticker').hide();
                }else{
                    $('body').removeClass('pinned');
					$('#ticker').show();

                }
            });
        },

        /**
         *
         * @param dir
         */
        onSwipe: function(dir){
            var newMenu, newLink;

            if(dir == "left" && headerInteractions.currMenu.next().length){//if there is a next
                newMenu = headerInteractions.currMenu.next();
                newLink = headerInteractions.currLink.next();
            }else if(dir == "right" && headerInteractions.currMenu.prev().length){
                newMenu = headerInteractions.currMenu.prev();
                newLink = headerInteractions.currLink.prev();
            }else{
                return false;
            }

            headerInteractions.animateMenuSwap(headerInteractions.currMenu, newMenu);
            newMenu.addClass("active");
            headerInteractions.currMenu.removeClass("active");

            // Update the Current LI (link)
            headerInteractions.currLink.removeClass('active');
            newLink.addClass('active');
            headerInteractions.currLink = newLink;
        },

        /**
         * This is called from hoverIntent AND from a click, so there's potential for a race condition.
         * This is resolved by:
         *
         * 1.   In the first set of if/else, we check the type of event. If it was a click,
         *      we false out of the function before we get to the 2nd if/else.
         * 2.   In the 2nd if/else statements, there's an else if that makes sure the hovered link does not
         *      equal the clicked link. if they are equal, we return false
         *
         * @param link (native <a> tag (this) )
         * @param e (event)
         */
        hoverOnNav: function(link, e){

            var linkID = headerInteractions.navID(link);
            headerInteractions.resetMenu(linkID);
            //IF there is an event, this function was triggered by a click
            // Return flase from each clause if it was a click so it doesn't run through the rest of the function

            if(e.type == 'click' && !headerInteractions.currLink && !headerInteractions.currMenu){
                headerInteractions.firstTimeShow(link, linkID);
                e.preventDefault();
                return false;
            }else if(e.type == 'click'){
                if($(link).parent('li').hasClass('active')){
                    headerInteractions.hideSlider();
                }else{
                    headerInteractions.menuUpdate(link, linkID);
                }
                e.preventDefault();
                return false;
            }

        },


        /**
         * This is called when showing a header dropdown for the first time
         *
         * @param link (native <a> tag (this) )
         * @param id (the ID of the link)
         */
        firstTimeShow: function(link, id){
       	    currentType = id;
       	    showForScreenSize();
            $(link).parent('li').addClass("active");
            headerInteractions.currLink = $("nav ul.primary li.active");
            headerInteractions.showDrawerItem($("." + id + ".cols"));
            headerInteractions.currMenu = $("." + id + ".cols");
        },

        /**
         * This updates the header dropdown when menu has already been opened
         *
         * @param link (native <a> tag (this) )
         * @param id (the ID of the link)
         */
        menuUpdate: function(link, id){

           headerInteractions.resetMenu(id);
            // First, remove the actve class from the menu link
            headerInteractions.currLink.removeClass('active');
            // GIve the link newly hovered an active class and reset THAT link as the Current link.
            $(link).parent('li').addClass("active");
            headerInteractions.currLink = $("nav ul.primary li.active");

            // Now figure out the new menu to show
            var newSubmenu = $("." + id + ".cols");

            //firstTimeShow(link, id);
            // Now animate to the new menu from the old one (currMenu)
            headerInteractions.animateMenuSwap(headerInteractions.currMenu, newSubmenu);
            newSubmenu.addClass("active");
            headerInteractions.currMenu.removeClass("active");

            showForScreenSize();

        },

        resetMenu:function(id){
       	    console.log("In Reset Menu: " + id);
       	    var topStoriesNode = $("#"+id+"-Top-Stories");
            currentSlug = "Top-Stories";
	    currentType = "topics";
    	    //$('.sort-links a').on('mouseenter', function(e){
            //var type = $(this).data('content'), title = $(this).html(), target = $(this).parents('.cols').find('li.tStories');
            var clas = "Top-Stories";
            var parent = topStoriesNode.parents('.cols');

            parent.find('span.sortable-list').children().hide();
            parent.find('li.mStories .carousel').hide();
            parent.find('span.sortable-list .'+clas+', , li.mStories span.carousel').show();

            //carousel.init();


           var moreNode =$("#sliderStories-"+ currentType)
            if($(window).width() > 1320){//if Larger Screen
        	   moreNode.html($("#"+currentSlug+"-"+currentType).html());
            }else{
        	  moreNode.html($("#"+currentSlug+"-"+currentType+"-smallScreen").html());
            }

        },

        /**
         * Return the ID of the clicked/hovered link
         *
         * @param link (native <a> tag (this) )
         */
        navID: function(link){
            return $(link).attr("id");
        },

        /**
         * Animates to a new menu AND sets currMenu to the newly shown menu
         * It's called from menuUpdate() and onSwipe() (assuming you've engaged onSwipe..)
         *
         * @param oldMenu (jQuery Object)
         * @param newMenu (jQuery Object)
         */
        animateMenuSwap: function(oldMenu, newMenu){
            if(oldMenu == undefined || oldMenu == null){
                return false;
            }

            oldMenu.stop(true, true);
            newMenu.stop(true, true);

            oldMenu.hide();
            newMenu.removeClass("hidden").fadeIn(250, function(){
                newMenu.parents('.slider').animate({"height": newMenu.outerHeight()}, 150, function(){
                    headerInteractions.currMenu = newMenu;
                });
            });
        },

        /**
         * Opens the global nav drawer.
         * Called from firstTimeShow
         * Fires document.globalNavDrawerOpen event
         *
         * @param $item (the actual UL jQuery obj)
         */
        showDrawerItem: function($item){
            $("div.slider ul.cols").addClass("hidden");
            $("div.slider ul.cols.active").removeClass("active");
            $item.addClass("active").removeClass('hidden').fadeIn( 50, function(){

                //Hide the Ticker
                $('#ticker').hide();

                // Stop the current animation.
                headerInteractions.slider.stop();

                // show the drawer
                headerInteractions.slider
                    .delay(200) //wait 200
                    .animate({ // animate to height of new menu item
                        height: $item.outerHeight()
                    },
                    200,
                    function(){ // after animation, attach mouseleave event to header
                        $("header").on("mouseleave", function(){
                            $(this).off("mouseleave"); // remove mouseleave event from the header
                            headerInteractions.hideSlider(); //toggle slider
                        });
                    })
                    .removeClass('collapsed'); // remove class.
            });
            $(document).trigger('globalNavDrawerOpen'); //fire event
            $('#menuContainer img').trigger('globalNavVisible'); //fire event for lazy load handler
        },

        /**
         * Hide (Close) the global nav drawer
         * Fires document.globalNavDrawerClosed event
         */
        hideSlider: function(){
            headerInteractions.slider.animate({height: "0px"}, 200, function(){
                headerInteractions.showTicker();
                $("nav ul.primary li.active").removeClass("active");
                // Set these back to false so we know that everything has been closed
                headerInteractions.currLink = false;
                headerInteractions.currMenu = false;
            }).addClass('collapsed');
            $(document).trigger('globalNavDrawerClosed'); //fire event
        },
        /**
         * checks to make sure the conditions are right to re-show the ticker
         */
        showTicker: function(){
            if(!$('body').hasClass('pinned')){
                $('#ticker').show();
            }
        }
    };

    /**
     * Carousel Code
     */
    var carousel = {
        /**
         * This initializes carousels, the scope of which depends on the CSS selector you pass in.
         * If you don't specify a selector, it inits all carousels
         *
         * It gets called once at page load, and once every time the screen width goes above or below
         * a Column threshhold. If the can can only accommodate 3 columns, responsive.less adjusts wide-template pages
         * to a smaller one. Here's the use case:
         *
         * User opens page in a browser window that accommodates at least 4 columns (@ 320px each). If the user is on
         * a wide template page (Mag Archive, Mag Issue, SLideshow), they'll see the full template width. If the user
         * then resizes the browser window to a width that only accommodates 3 columns, the carousels on wide template
         * pages then need to be re-calculated in order to allow for the correct number of pages. The same is true
         * inversely.
         *
         * @param selector
         */
        init: function(selector){ 
            var _selector = (selector) ? selector : '.carousel';
            carousel.cInstance = [];
            $(_selector).each( function(i,e){

                //Store some basic parameters each carousel on the page as an object in cInstance
                carousel.cInstance[i] = {
                    slideshow: $(this).hasClass('slideshow'),
                    parent: $(this),
                    curPage: 0,
                    slideWidth: $(this).find('span.slide, article').outerWidth(),
                    slides: $(this).find('span.slide, article').length,
                    pages: Math.ceil(($(this).find('span.slide, article').length * $(this).find('span.slide, article').width()) / $(this).outerWidth()),
                    inner : $(this).find('.carouselInner'),
                    pageWidth: $(this).outerWidth(),
                    animW: Math.ceil($(this).outerWidth() / $(this).find('span.slide, article').outerWidth()) * $(this).find('span.slide, article').outerWidth()
                };

                //Now store that locally
                var params = carousel.cInstance[i];

                // Show arrows only if there's more than one page
                if(params.pages > 1){
                    $(this).find('span.arrows').show();
                }


                // This will deal with the content text below the carousel on the slideshow page
                if(params.slideshow){
                    carousel.updateSlideshowContent(params, $(this));
                    $(this).next('div.slideshow-content').find('span.totalPage').html(params.pages);
                }

                // Set the width of the sliding container based on the number of slides * the slide width
                params.inner.css({width: params.slides * params.slideWidth}).animate({left: 0}, 300);;

                var prev = $(this).find('a.prev');
                var next = $(this).find('a.next').removeClass('inactive');
                if(!prev.hasClass('inactive')) {
                    prev.addClass('inactive');
                }

                // Attach click events for arrows
                prev.data('index', i).off('click').on('click', carousel.prevSlide) ;
                next.data('index', i).off('click').on('click', carousel.nextSlide) ;


                // Attach swiping to sliding container for iPad, if it has not been already
				// conditionally load the touchwipe plugin (for the wipe effect on iPad)

				if(navigator.userAgent.indexOf('iPad') > 0){
					if(!params.inner.hasClass('swipeAdded')){
						params.inner.addClass('swipeAdded').touchwipe({
							wipeLeft: function(){carousel.clickArrow(next, 'next'); },
							wipeRight: function(){carousel.clickArrow(prev, 'prev'); }
						});
					}
				}

                // For the Slideshow preview frame
                $(this).find('div.preview-frame').off('click').on('click', function(e){
                    $(this).fadeOut(300);
                });
                //The slide show image magnifier click event.
                $(".magnifier").click(function(event) {
                    $("#slide-"+carousel.cInstance[i].curPage).trigger('click');
                });

            });

            carousel.recalculate();
        },
        /**
         * If the user resizes the screen above or below 1320px wide - or - when window width changes
         * between 3 & 4 columns.
         *
         * @dependency homepageGrid.centerPage()
         */
        recalculate: function(){
            $(window).resize( function(){
                // Only resize carousels when the numCOls value has actually changed
                // (not for every change in window size, that would be crazy)
                if((expose.numCols != expose.numColsSaved) && expose.numCols < 5){
                    expose.numColsSaved = expose.numCols;
                    carousel.init();
                }

            });

        },
        /**
         * Called on swipe left/right
         *
         * @param arrow (jQuery obj)
         * @param dir   (the direction of the swipe)
         */
        clickArrow: function(arrow, dir){
            //alert(arrow.attr('class'));
            if(dir == 'next'){
                arrow.click();
            }
            if(dir == 'prev'){
                arrow.click();
            }

        },
        /**
         * Called when next arrow is clicked
         *
         * @param e (event)
         */
        nextSlide: function(e){
            var i = $(this).data('index');
            var p = $(this).parents('.carousel');
            var params = carousel.cInstance[$(this).data('index')];

            if (params.curPage == parseInt(params.pages - 2)){
                $(this).addClass('inactive');
            }
            if(params.curPage < parseInt(params.pages - 1)){
                params.inner.animate({left: '-=' + parseInt(params.animW) }, 300);
                carousel.cInstance[i].curPage++;
                p.find('.prev').removeClass('inactive');

                if(params.slideshow){
                    carousel.updateSlideshowContent(params, p);
                }
            }
            e.preventDefault();
        },
        /**
         * Called when previous arrow is clicked
         *
         * @param e (event)
         */
        prevSlide: function(e){
            var i = $(this).data('index');
            var p = $(this).parents('.carousel');
            var params = carousel.cInstance[$(this).data('index')];
            if (params.curPage == 1){
                if(!$(this).hasClass('inactive')){
                    $(this).addClass('inactive');
                }
            }
            if(params.curPage > 0){
                params.inner.animate({left: '+=' + parseInt(params.animW) }, 300);
                $(this).parents('.carousel').find('.next').removeClass('inactive');
                carousel.cInstance[i].curPage--;

                if(params.slideshow){
                    carousel.updateSlideshowContent(params, p);
                }
            }
            e.preventDefault();
        },
        /**
         * Used for the Slideshow. Updates the content below the carousel
         *
         * @param params (object from cInstance generated in the init function)
         * @param parent (the parent carousel as a jQuery obj.)
         */
        updateSlideshowContent: function(params, parent){
          

            /*if(!$("#isSlideShowPage")){ alert("Not a slide show page..");
              return;
            } */

            var newContent = params.inner.find('article').eq(params.curPage).find('.ai').html();
            var content    = parent.next('div.slideshow-content').find('> p');
            content.hide();
            content.empty().html(newContent).fadeIn(300);
            parent.next('div.slideshow-content').find('span.curPage').html(params.curPage + 1);


            carousel.resizeImageRatio(params.curPage);

        },
        /**
         *  Method to resize image ratio based on screen size to
         *  fit into the article tag frame in slide show page.
         *  @param i The index of the current frame in sound slide.
         *  @return void.
         */
        resizeImageRatio:function(i){
             //Reverted for current release.
            /*if($("#isSlideShowPage").val() == undefined){
               $(".feature-slides .carousel").css({"width":"620px","height":"465px",});
               return;
            }  */

            var imageObj =  $("#slideImage"+i);
            if(!(jQuery.type( imageObj ) === "undefined")){

                console.log("Source Image:" + imageObj.attr("src"));
                var inMemory = new Image();
                inMemory.src = imageObj.attr("src");
                var width    = inMemory.width;
                var height   = inMemory.height;



                console.log("Is Resized :"+(imageObj.attr("resized")));
                console.log(i + "Before resized : width:"+ width + " px" + "height:"+ height + " px");

                var windowAspectRatio = 1.33;
                var aspectRatio = width/height;
                var margin = 0;
                console.log("Aspect Ratio of Image :" + aspectRatio);

                if(imageObj.attr("resized") == "false"){
                    if(aspectRatio > 1.33){//if Larger Screen
                        console.log("Window Width: 1->" + $(window).width());
                        if( $(window).width() < 1320){
                           width  = width  > 620 ? 619 : width;
                           height =   0.48 *  height;
                            margin = 0.5 * (465 - height);
                        }else{
                            width  = width  > 740 ? 739 : width;
                            height =   0.58 *  height;
                            margin = 0.5 * ( 554 - height);
                        }
                        //center vertically
                        console.log("couter:" + $(".cOuter").height());
                        console.log("Height : " + height);


                        //margin -= 13;
                        imageObj.css({"width":width + "px", "height":height + "px", "margin-top":margin + "px"});
                        imageObj.attr("resized","true");
                        console.log("Added margin:"+ margin);
                    }else if(aspectRatio < 1.33){
                        //width  = width  > 620 ? 619 : width;
                        console.log("Window Width: 2->" + $(window).width());
                        if( $(window).width() < 1320){
                            height = height > 465 ? 464 : height;
                            width  = 0.55 * width;
                        }else{
                            height = height > 555 ? 554 : height;
                            width  = 0.65 * width;
                        }
                        //center horizontally
                        imageObj.css({"width":width + "px", "height":height + "px", "text-align":"center"});
                        imageObj.attr("resized","true");
                        console.log("Added horizontal alignment");
                    }
                }

                console.log("width:"+ width + " px" + "height:"+ height + " px");

            }


        }
    };

    initIsotopeLayoutControls();
	
})(window, jQuery);


/**
* Disables (on iPad) the gray shade that appears over isotope element images to prevent the "double-tap" bug
*/
function disableIsotopeShadeIpad() {
    if(navigator.userAgent.indexOf('iPad') > 0){
        $('div.articles .shade').css('display', 'none');
    }
}

function getLoadOffset(filter) {
    var offset = 0;
    if (filter == '.recent-item') {
        offset = $('div.articles ' + filter).size() - $('div.articles ' + '.ad-item').size();
    } else {
        offset = $('div.articles ' + filter).size();
    }
    console.info('offset: ' + offset);
    return offset;
}

function homeLoadMore(evt){
    //TODO need flag/check to prevent user from clicking load more twice
    var filter = $('#tag-filter .active').attr('data-filter');

    var loadMoreButton = $('.load-more-btn');
    loadMoreButton.text('');
    loadMoreSpinnerInit(loadMoreButton[0]);

    $.get('/isotope/home/load-more', { offset: getLoadOffset(filter), isotopeFilter: filter }, function(data) {
        //console.info('loaded:' + data);
        var parsedResponse = $(data);
        if (parsedResponse.filter('#has-more-content').size() > 0) {
            updateLoadMoreButtonState(filter, true);
        } else {
            updateLoadMoreButtonState(filter, false);
        }
        var containerSelector = 'div.articles';
        var container = $(containerSelector);
        var loadedItems = parsedResponse.filter('.item');
        container.isotope('insert', loadedItems);

        //immediately load visible isotope modules, but trigger off-screen ones
        //using lazy-load
        //TODO this could be optimized in terms of selecting fewer items
        $(containerSelector + ' img.lazy').lazyload({ event: 'loadMoreFinished' });
        $(containerSelector + ' img.lazy').lazyload({ event: 'scroll' });
        $(containerSelector + ' img.lazy').filter(":in-viewport").trigger('loadMoreFinished');

        $('.load-more-btn').text('Load More'); //revert load text
    }, 'html');
}

function updateLoadMoreButtonState(filter, hasMoreContent) {
    loadMoreButtonStates[filter] = hasMoreContent
    
    //TODO duplicates code in isotope filter control handler
        var loadMoreButton = $('#home-load-more');
    if(loadMoreButtonStates[filter] == true) {
        loadMoreButton.removeClass('hidden');
    } else {
        loadMoreButton.addClass('hidden');
    }
}

var blogPage = 1; //global var to keep track of next page for "load more button" on blog pages
function blogLoadMore(){
    var container = 'section#medium-content'
    $.get(window.location.pathname + '/page' + '/' + blogPage, 
        function(data) {
            blogPage++;
            $(container + ' > :last').append(data);
            $("#article-list").fitVids();
        }
    );
}

$(document).ready(function() {
    var loadMoreButton = $('#home-load-more');
    if (loadMoreButton != null) loadMoreButton.click(homeLoadMore);
    
    if (loadMoreButton != null) {
        loadMoreButton = $('#blog-load-more');
        if (loadMoreButton != null) loadMoreButton.click(blogLoadMore);
    }
});

function loadMoreSpinnerInit(target){
    var opts = {
    lines: 11, // The number of lines to draw
  length: 7, // The length of each line
  width: 7, // The line thickness
  radius: 5, // The radius of the inner circle
  corners: 0.4, // Corner roundness (0..1)
  rotate: 27, // The rotation offset
  color: '#FFF', // #rgb or #rrggbb
  speed: 1.1, // Rounds per second
  trail: 48, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};
    var spinner = new Spinner(opts).spin(target);
}

//Method for document ready.
function showForScreenSize(){	
	if(currentType && $(window).width() < 1320){
		$("#sliderStories-"+ currentType).html($("#sliderStories-"+ currentType + "-smallScreen").html());			
	}
}

/**
* Bind event handlers for GA event tracking.
*/
function initGAEventTracking() {
    //Back to Top button
    $('a.backtotop').click(function(event) {
        _gaq.push(['_trackEvent', 'Navigation', 'BackToTop', window.location.pathname, null, true]);
        console.info('tracked back to top clicked event');
    });

    //Global nav dropdown headings
    $(document).on('globalNavDrawerOpen', function(event) {
        _gaq.push(['_trackEvent', 'GlobalNavigation', 'Open', window.location.pathname, null, true]);
        console.info('tracked global navigation open');
    });

    $(document).on('globalNavDrawerClosed', function(event) {
        _gaq.push(['_trackEvent', 'GlobalNavigation', 'Closed', window.location.pathname, null, true]);
        console.info('tracked global navigation closed');
    });

    //isotope filter tabs/buttons and layout
    $('#tag-filter #recent').click(function(event) {
        _gaq.push(['_trackEvent', 'IsotopeFilter', 'ClickedRecent', window.location.pathname, null, true]);
        console.info('tracked isotope filter clicked recent');
    });

    $('#tag-filter #trending').click(function(event) {
        _gaq.push(['_trackEvent', 'IsotopeFilter', 'ClickedTrending', window.location.pathname, null, true]);
        console.info('tracked isotope filter clicked trending');
    });

    $('#tag-filter #social').click(function(event) {
        _gaq.push(['_trackEvent', 'IsotopeFilter', 'ClickedSocial', window.location.pathname, null, true]);
        console.info('tracked isotope filter clicked social');
    });

    $('#layout-controls #masonry-layout').click(function(event) {
        _gaq.push(['_trackEvent', 'Layout', 'MasonryLayout', window.location.pathname, null, true]);
        console.info('tracked masonry layout clicked');
    });

    $('#layout-controls #grid-layout').click(function(event) {
        _gaq.push(['_trackEvent', 'Layout', 'GridLayout', window.location.pathname, null, true]);
        console.info('tracked grid layout clicked');
    });

    //track click throughs on isotope modules on content pages
    $('#iso-content .item a').click(function(event) {
		var href = $(event.delegateTarget).attr('href');
		_gaq.push(['_trackEvent','IsotopeClickThrough', href, window.location.pathname]);
    });

    $(document).on('isotopeScreenLifted', function(event) {
        _gaq.push(['_trackEvent', 'IsotopeScreen', 'Lifted', window.location.pathname, null, true]);
        console.info('tracked isotope screen lifted');
    });

    $(document).on('isotopeScreenDropped', function(event) {
        _gaq.push(['_trackEvent', 'IsotopeScreen', 'Dropped', window.location.pathname, null, true]);
        console.info('tracked isotope screen dropped');
    });

    $('.load-more-btn').click(function(event) {
        _gaq.push(['_trackEvent', 'LoadMore', 'Clicked', window.location.pathname, null, true]);
        console.info('tracked load more button clicked');
    });

    console.info('finished binding GA event tracking handlers');
}

/**
* global nav event handlers need to be initialized separately because the global
* nav is not loaded via AJAX
*/
function initGlobalNavGAEventTracking() {
    //TODO
}

function initBackToTopLink() {
    // NOTE: this will not work for mobile devices, though it seems to work fine on iPad
    $('a.backtotop').live('click', function() { //FIXME $.live() is deprecated in jQuery 1.7
        $('html, body').animate({scrollTop:0}, 1000);
        if ($.browser.msie  && parseInt($.browser.version, 10) < 9) {
            // do not hide for IE browsers IE 8 or older
        } else {
            $('a.backtotop').hide();
        }
        return false;
    });

    if ($.browser.msie  && parseInt($.browser.version, 10) < 9) {
        // do not use this script for IE browsers IE 8 or older
    } else {
        // show the back to top link only when the user is further down on the page (global)
        $('a.backtotop').hide();
        $(window).scroll(function() {
            var top = $(window).scrollTop();
            if (top > 400) {
                $('a.backtotop').fadeIn();
            } else {
                $('a.backtotop').fadeOut();
            }
        });
    }
}

function initCustomSelectDropdowns() {
    // Custom select boxes don't work on iPad (global)
    if(navigator.userAgent.indexOf('iPad') < 0){
        $('.custom-select').sbCustomSelect();
    }
}

function initGlobalNavMenus(headerInteractions, carousel) {
     $.ajax({
       url: '/getGlobalNavData',
       context: document.body
     }).done(function(html) {
         $("#menuContainer").html(html);

        //init the header interactions
        headerInteractions.init();

        //Init any carousels
        carousel.init();
        console.log("Rendered Menu....");

        $('#menuContainer img.lazy').lazyload({
            event: 'globalNavVisible'
        });

        //var top_nav = $('nav').offset().top;

        // Watermark for the Search field search menu
        $('input.headSearch').watermark('Search', {useNative: false});
     });
}

function initIsotopeFilterControls() {
    var container = $('div.articles');

    $('#tag-filter').show(); //hidden initially to prevent broken layout while page is loading

    $('.isotope-filter-control').click(function(e){
        var filter = $(this).data('filter');
        var sort = $(this).data('sort');
        if(filter !== undefined){
            container.isotope({
                filter: filter,
                sortBy: sort
            });

            //force triggering of image lazy loading
            var filteredInView = $('div.articles ' + filter).filter(':in-viewport');
            console.debug('triggering lazy loading for items: ' + filteredInView.length);
            console.debug(filteredInView);
            filteredInView.trigger('scroll'); //fire fake scroll event to trigger image loading
        }

        $('.isotope-filter-control').removeClass('active');
        $(this).addClass('active');

        //enable/disable the load more button depending if there is more content, if present
        //depends on a hash of button states populated in the global var loadMoreButtonStates
        var loadMoreButton = $('#home-load-more');
        if (loadMoreButton != null) {
            if(loadMoreButtonStates[filter] == true) {
                loadMoreButton.removeClass('hidden');
            } else {
                loadMoreButton.addClass('hidden');
            }
        }

        e.preventDefault();
    });
}

function initIsotopeLayoutControls() {
	if ($('#layout-controls').size() > 0) {

		$('#grid-layout').click(function(evt) {
			var $this = $(this);
			
			evt.preventDefault();
			$this.siblings().andSelf().removeClass('active');
			$this.addClass('active');
			$('div.articles').isotope({
				layoutMode: 'fitRows'
			});
		});

		$('#masonry-layout').click(function(evt) {
			var $this = $(this);
			
			evt.preventDefault();
			$this.siblings().andSelf().removeClass('active');
			$this.addClass('active');
			$('div.articles').isotope({
				layoutMode: 'masonryAdsRight'
			});
		});

		//hidden initially to prevent broken layout while page is loading
		setTimeout(function() {
			$('#layout-controls').show();
		}, 1000);
	}
}

/**
* handle the opaque "screen" on Isotope .item elements (global)
*/
function initIsotopeScreen() {
    var screenedIsotopeItems = $('span.blur');
    if (screenedIsotopeItems.size() > 0) {
        if ($.browser.msie  && parseInt($.browser.version, 10) < 9) {
            screenedIsotopeItems.hide();
        } else {
            if(navigator.userAgent.indexOf('iPad') < 0){ // removed from iPad
                $('div.articles').on('mouseenter', function(){
                    screenedIsotopeItems.stop().fadeOut(120, function(){
                        $(this).css('height', 0);
                    });
                $(document).trigger('isotopeScreenLifted');
                }).on('mouseleave', function(){
                    screenedIsotopeItems.stop().css('height', '90%').fadeTo(120, 0.65);
                    $(document).trigger('isotopeScreenDropped');
                });
            } else {

                screenedIsotopeItems.hide(); // if default, hide with iPad
            }
        }
    }
}

function initTickerControls() {
    $('#close-ticker').on('click', function(e){
       $(this).parents('#ticker').slideUp(100, function(){
           $(this).remove();
           $('body').addClass('ticker_off');
       });
        e.preventDefault();
    });
}

/**
* Pushes GA event for navigation click.
*/
function trackNavigationHandler(event){
    //console.debug('tracked event: ' + event.data.action)
    //TODO check for _gaq
    _gaq.push(['_trackEvent','Navigation', 'clicked', event.data.action, 0, true]);
}

/**
* Applying fitVids to content containers to resize video embeds
*/
function applyFitVids(){
    var articleDetail = $('#medium-content .entry-content');
    var articleList = $('#medium-content #article-list');
    if (articleDetail || articleList){
        articleDetail.fitVids();
        articleList.fitVids();
    };  
}