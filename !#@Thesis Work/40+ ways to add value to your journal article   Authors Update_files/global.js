/*
 *  Table of contents:
 *  1. Document ready
 *    1.1 Expand the relevant categories on page load
 *    1.2 Expand the relevant categories on category click
 *    1.3 Set 'current' class for selected menu item
 *    1.4 Comments formatting
 *  2. Functions
 *    2.1 Expand the relevant categories on page load
 *    2.2 Expand the relevant categories on category click
 *    2.3 Set LH category active state
 *    2.4 Format comments
 *  3. Window load event
*/

(function ($) {
    $.fn.outside = function (ename, cb) {
        return this.each(function () {
            var $this = $(this),
            self = this;

            $(document).bind(ename, function tempo(e) {
                if (e.target !== self && !$.contains(self, e.target)) {
                    cb.apply(self, [e]);
                    if (!self.parentNode) $(document.body).unbind(ename, tempo);
                }
            });
        });
    };
}(jQuery));


/*
 *  1. DOCUMENT READY
 */
    $( document ).ready(function() { 

        // 1.1 On page load, expand the relevant selected node and highlight the parent nodes 
        $('.category-main').each(function(){
            expandSelectedCats($(this));
        });

        // 1.2 On click of plus/minus icon expand the relavant category
        $('.category-main .category-link .show-hide.expandable').on("click", function(){
            showCategories($(this));
        });

        // 1.3 Set LH category active state
        $('.content-left a').each(function (k, v) {
            setCurrentCategory($(this));
        });

        // 1.4 Comments formatting
        formatComments();
        
    });
    

/*
*  2. FUNCTIONS
*/

    // 2.1 Expand the relevant categories on page load
    function showCategories($this){

        var $thisMenu = $this.parents(".category-main"),
            child = ".category-sub-all",
            expandedClass = "expanded";

        if($thisMenu.hasClass(expandedClass)){
            $thisMenu.find(child).slideUp("fast");
            $thisMenu.removeClass(expandedClass);
        }else{

            //Collapse all current open categories
            //$(".category-main").each(function(){
            //    if($(this).hasClass(expandedClass)){
            //        $(this).find(child).hide();
            //        $(this).removeClass(expandedClass);
            //    }
            //});

            $thisMenu.find(child).slideDown("fast");

            $thisMenu.addClass(expandedClass);
        }
    }

    // 2.2 Expand the relevant categories on category click
    function expandSelectedCats($this){

            var pageID = $this.parent().attr("data-page-id"),
                $thisCategory = $this,
                $subCategory =  $thisCategory.find(".category-sub-all"),
                $showHideSection = $thisCategory.find(".category-link .show-hide"),
                expandableClass = "expandable",
                expandedClass = "expanded";
            
            if($subCategory.length){
                $showHideSection.addClass(expandableClass);
            }
 
            $thisCategory.find(".category-sub").each(function(){
                if($(this).attr("data-link-id") === pageID){
                    expandCategory();
                }
            });

            if($thisCategory.attr("data-category-id")  === pageID){
                expandCategory();
            }

            function expandCategory(){
                $subCategory.show();
                $thisCategory.addClass(expandedClass);
            }
    }

    // 2.3 Set LH category active state
    function setCurrentCategory($this){
        
        if (window.location.href === $this.attr('href')) {
            $this.addClass('current');
        }
    }

    // 2.4 Format comments
    function formatComments(){

        // NOTE THIS IS A TEMPORARY FIX!!!!
        $('.article-listing p').each(function (k, v) {
            $(this).html($(this).html().replace(/\[[^\]]+\]/g, ''));
        });

        //And do this again in the main article content!
        if ($('.article-content').length > 0) {
            var theHtml = $('.article-content').html().replace(/\[caption/g, '<div class="article-inner-replaced"');
            theHtml = theHtml.replace(/\[pullquote/g, '<div class="pullquote"');
            theHtml = theHtml.replace(/\[note/g, '<div class="box"');
            theHtml = theHtml.replace(/\[\/pullquote\]/g, '</div>');
            theHtml = theHtml.replace(/\[\/caption\]/g, '</div>');
            theHtml = theHtml.replace(/\[\/note\]/g, '</div>');
            theHtml = theHtml.replace(/\[divider\]/g, '<div class="su-divider"></div><br class="clearfix">');
            theHtml = theHtml.replace(/\[topdivider\]/g, '<div class="su-divider"><a href="#top">TOP</a></div><br class="clearfix">');
            theHtml = theHtml.replace(/\]/g, '>');

            $('.article-content').html(theHtml);

            $('.article-inner-replaced ').each(function (k, v) {
                $(this).addClass($(this).attr('align'));
            });
        }

        //count comments
        if ($('.comment-responses').length > 0) {
            $('.comment-responses').html($('.comment-list p').length + ' ');
        }
        //pagination
        $(".listing_pagination .prevnext").each(function () {
            if ($(this).parents("a").length == 0) $(this).remove();
        });


        /* Videos FlexSlider */
        if (jQuery('.videos-container .slides')) {
            jQuery('.videos-container').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                itemWidth: 160,
                itemMargin: 10,
                move: 4,
                maxItems: 4
            });
        }

        /* Commented on: 15 Aug 2013 by Bwalters
        //Replace Dividers
        $('divider').replaceWith('<div class="su-divider"></div>');
        $('topdivider').replaceWith('<div class="su-divider"><a href="#top">TOP</a></div>');
        */

        //Set certain attr
        $('.box[align]').each(function (k, v) {
            $(this).addClass($(this).attr('align')).removeAttr('align');
        });

        if ($('.listing-sorting').length > 0) {
            $('.listing-sorting select').change(function () {
                $(this).closest('form').submit();
            });
        };

        //Parse comment contents
        if ($('.comment-list p').length > 0) {
            $('.comment-list p').each(function (k, v) {
                $(this).html($(this).text().replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#]))/g, '<a href="$1">$1</a>').replace('&lt;p&gt;', '<p>'));
            });
        }

        //Clear search field on pages that are not results
        if (window.location.href.indexOf('?mode=results') < 0 && $(this).find('input[type="text"]').val() != '') {
            $(this).find('input[type="text"]').val('');
        }

        $('.search').outside('click', function () {
            if (window.location.href.indexOf('?mode=results') < 0 && $(this).find('input[type="text"]').val() != '') {
                $(this).find('input[type="text"]').val('');
            }
        });

        $('.article-content a, .comment-list a').each(function (k, v) {
            if ($(this).attr('target') != '_self' && !$(this).hasClass('target-self')) $(this).attr('target', '_blank');
        });

        //Remove target blank from top dividers - Mark T 12.09.2013
        $('.su-divider').find('a').attr('target', '_self');
/*
        $('.comment-reply-form').each(function (k, v) {
            $(this).find('form').attr('action', $(this).find('form').attr('action') + 'current_asset=' + $(this).attr('data-id'));
        });
        $('.comment-reply-form, #hidden-reply-form').hide();
        $('.comment-reply').click(function (e) {
            e.preventDefault();
            var target = $('.comment-reply-form[data-id="' + $(this).attr('data-id') + '"]');
            target.slideDown();
            $('.comment-reply').remove();
            target.html($('#hidden-reply-form').html());
            target.find('form').attr('action', target.find('form').attr('action') + 'current_asset=' + $(this).attr('data-id'));
            $('#hidden-reply-form').remove();
        });
        if (window.location.href.indexOf('?current_asset=')) {
            var id = window.location.href.split('?current_asset=');
            var target = $('.comment-reply-form[data-id="' + id[1] + '"]');
            target.html($('#hidden-reply-form').html()).show();;
        }

        if($('.comment-error li').length>0) {
          window.scrollTo(0,$('.comment-error').offset().top);
        } else {
          if($('.create-success-msg').length>0) window.scrollTo(0,$('.create-success-msg').offset().top);
        }
*/
        $('.comment-reply').click(function (e) {
            e.preventDefault();
            var offset = $('#disqus_thread').offset();
            console.log(offset.top)
            window.scrollTo(0,offset.top);
        });
        $('.comment-reply-form, #hidden-reply-form').hide();
        if($('#disqus_thread').length > 0) {
            var commentNumber = $('.comment-content').length;
            $('#archived-comments h2 span').html(commentNumber);
        }

    }
    
    function borderPictures() {
        //Add borders to all content images after they load - changed due to #101792
        $('.article-inner-replaced').each(function (k, v) {
            if ($(this).find('img').length > 0) {
                $(this).css('width', $(this).find('img').width() + 'px');
            }
        });
        $('img.caption').each(function(k,v) {
            var text = ($(this).attr('caption')) ? $(this).attr('caption') : $(this).attr('alt');
            var classes = 'align' + $(this).css('float') + ' article-inner-replaced';
            $(this).wrap('<div class="' + classes + '" style="width:' + $(this).css('width') + '" />');
            $(this).after(text);
            $(this).css('margin-top', '0');
        });
    }


/*
*  3. WINDOW LOAD EVENT
*/
    $(window).load(function(){
        borderPictures();
    });
    $('#ees_modePreviewFrame').load(function() {
        borderPictures();
    });