/*global Drupal:true */
(function ($, Drupal, window, document, undefined) {
  /////////////////////////////////////////////////////////////////////////////
  // Utility functions
  /////////////////////////////////////////////////////////////////////////////
  function trim_news_listing_body() {
    $("div.news-listing div.ds-2col div.group-left").each(function() {
      var ele = $(this);
      var d = ele.find('div.field-name-publish-date');
      var t = ele.find('div.field-name-teaser-title, div.field-name-listing-title');
      var w = ele.find('div.field-name-field-writer');
      var max_h = ele.height() - d.height() - t.height() - w.height();
      var body = ele.find("div.field-name-body, div.field-name-field-description");
      var h = body.height() + parseInt(body.css("margin-top"), 10) + 10;
      var p, text, idx, c;
      
      if (h > max_h) {
        body.css("background", "red");
        p = body.find("p");
        if (p.length > 1) {
          c = body.find('div.field-item.even');
          c.empty();
          c.append(p[0]);
          p = body.find("p");
        } else {
          if (p.length === 0) {
            p = body.find('div.field-item.even');
          }
        }
        text = p.html();
        while (text.length && (h > max_h)) {
          idx = text.lastIndexOf(" ");
          text = text.substring(0, idx);
          p.html(text + " ...");
          h = body.height() + parseInt(body.css("margin-top"), 10) + 10;
        }
        body.css("background", "");
      }
    });
  }
  
  function fix_background() {
    var bg = $("div#bg"),
      footer = $("div#footer"),
      w, h, bw, bh, loff, toff,
      footer_toff, scale;
    
    // This is hard-coded because IE <9 doesn't provide the 'background-size' CSS.
    // Fortunately, all the background images are required to be 1600x1200.
    // For mobile, the backgroud image gets scaled down to 640 x 480
    bw = (screen.width > 320) ? 1600 : 640;
    bh = (screen.width > 320) ? 1200 : 480;
    w = $(window).width();
    h = $(window).height();
    scale = w / bw;
    loff = ((w - bw) / 2) + "px";
    toff = "0px";
    
    // Set the 'background-position' value for the bg div and the footer.
    bg.css("background-position", loff + " " + toff);
    if (footer.length) {
      footer_toff = "-" + (footer.position().top  - window.scrollY) + "px";
      footer.css("background-position", loff + " " + footer_toff);
    }
  }
  
  function add_play_button_to_videos() {
    $(".file-video:not(:has(div.play_button)) a.media-colorbox").append('<div class="play_button"></div>');
  }
  
  /////////////////////////////////////////////////////////////////////////////
  // Search box functions
  /////////////////////////////////////////////////////////////////////////////
  function search_box_clear() {
    if ($(this).val() === $(this).attr('data')) {
      $(this).removeClass('default-text-active');
      $(this).val('');
    }
  }
  
  function search_box_fill(event) {
    if ($(this).val() === '') {
      $(this).addClass('default-text-active');
      $(this).val($(this).attr('data'));
    }
  }
  
  function clear_default_text() {
    $(".default-text", this).each(function() {
      if($(this).val() === $(this).attr('data')) {
        $(this).val("");
      }
    });
  }
  
  function add_link_to_all_teaser_images() {
    // First let's do all of the image+link style teasers. They are all ds-2col with a right subsection with the link.
    $(".pane div.ds-2col, div.ds-2col.pane").each(function() {
      // Sometimes, there will be a '.group-right a' inside a '.group-left' div (e.g. Tagged News Listing Launchers)
      // In that case, don't attempt to create the <a> wrapper.
      if ($(this).parents('.group-left').length) {
        return;
      }
      var link = $(this).children(".group-right").find("a").attr("href");
      // If there is a link in the box, wrap a copy of it around the entire thing.
      if (link) {
        $(this).wrap('<a style="display:block;" href="' + link + '" />');
      }
    });
    // And now we need the same for the color, title, link type.
    $("div.ds-1col.node-color-title-link").each(function() {
      var link = $(this).find("a").attr("href");
      if (link.length > 0) {
        $(this).wrap('<a style="display:block;" href="' + link + '" />');
      }
    });
  }
  
  // On the search results pages, hook the submit action of our banner search bar into the submit action of the
  // (hidden) Drupal search bar.
  function attach_banner_search() {
    var cmp = '/search/';
    
    // There's no string.startswith() in JS; this is the next best thing:
    if (window.location.pathname.slice(0, cmp.length) === cmp) {
      var drupal_search = $('#search-form #edit-keys');
      var our_search = $('#caltech-mte-search-bar-keys');
      
      // Copy the text from the Drupal search box into ours.
      our_search.removeClass('default-text-active');
      our_search.val(drupal_search.val());
      
      // When the user submits our search form, copy the text from our form into Drupal's,
      // then submit that form instead of ours.
      $('#caltech-mte-search-bar-form').submit(function() {
        drupal_search.val(our_search.val());
        $('#search-form').submit();
        return false;
      });
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////
  // OTHER FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////////////////
  
  // The gradient divs in front of grid images are problematic for videos, because they
  // partially cover the play button, making it difficult to click. This function shortens
  // the gradient divs over videos so that they don't cover the play buttons.
  function shorten_video_gradients() {
    var right = $("div.file-video").closest("div.group-left").next();
    var parent_height = parseInt(right.parent().css('height'));
    right.css({"height": (parent_height * 2/5) + "px"});
  }
  
  // The content team wants to make sure that News Listing Launchers never display the same
  // image more than once per grid page. This functionality is implemented by having the
  // News Listing Launchers render 2 images instead of 1, and hiding the second. This function 
  // determines which single image should be shown for each launcher.
  function change_duplicate_news_listing_launchers() {
    var launchers = $('.view-news-spotlight-image-only');
    if (!launchers.length) {
      return;
    }
    
    // Mark all views-row-1's as 'show', so that subsequent passes can find all currently visible images.
    launchers.find('.views-row-1').addClass('show');
    
    // Search for duplicate images in all visible rows.
    var fixed_duplicates = [];
    launchers.find('.views-row.show').each(function() {
      var img_path_array = $(this).find('img').attr('src').split('/');
      var filename = img_path_array[img_path_array.length-1];
      
      // If we've already fixed the dupes of this image, skip this loop.
      if (_.contains(fixed_duplicates, filename)) {
        return;
      }
      var same_named_imgs = $('img[src$="' + filename + '"]');
      
      // If there is more than one views-row with the same image showing, show the second views-row instead.
      if (same_named_imgs.length >= 2) {
        var dup_row = same_named_imgs.eq(1).closest('.views-row');
        dup_row.removeClass('show').addClass('hide').next().addClass('show');
        
        // No longer including a third duplicate replacement. If they don't accept this fix, I'll write a service that
        // provides duplicate replacements through AJAX calls. -- rrollins, 10-17-2012
        //if (same_named_imgs.length == 3) {
        //  dup_row = same_named_imgs.eq(2).closest('.views-row');
        //  dup_row.removeClass('show').addClass('hide').next().next().addClass('show');
        //}
        
        // Record that we've fixed the duplicates of this file, so we don't try to "fix" the next launcher which
        // has this file in it.
        fixed_duplicates.push(filename);
      }
      
    });
  }
  
  // Global var used by resize_slideshow_images() which will get set up in resize_image_slideshow().
  var new_slide_height;
  
  function resize_slideshow_images(slide) {
    slide = $(slide);
    if (slide.height() > new_slide_height) {
      var img = $('img', slide);
      var img_ratio = img.height()/img.width();
      var caption = $('div.field-name-field-caption', slide);
      var caption_height = caption.length ? (caption.height() + parseInt(caption.css('margin-top'))) : 0;
      var sane_label = $('div.field-name-credit-sane-label', slide);
      var sane_label_height = sane_label.length ? (sane_label.height() + parseInt(sane_label.css('margin-top'))) : 0;
      
      img.attr('height', new_slide_height - caption_height - sane_label_height);
      img.attr('width', img.height() / img_ratio);
    }
  }
  
  // News articles which have multiple images with dramatically different dimentions cause large amounts of 
  // white-space to appear between the pager and the caption/image. This function inspects the height of the entire
  // slideshow mechanism and the number of images. If there are five or less images, it shrinks the entire 
  // slideshow (pager, caption, and image) to fit visibly on a laptop screen. If there are more than five images, 
  // which causes the pager to be 2+ rows tall, it resizes the image+caption section of the slideshow to fit, letting
  // the pager fall below the fold.
  var max_height = 550;
  function resize_image_slideshow(context) {
    var pager = $('ul.file-entity-slideshow-pager', context);
    var pager_height, image_count;
    if (pager.length) {
      pager_height = pager.height() + parseInt(pager.css('margin-top'));
      image_count = pager.children().length;
    }
    else {
      pager_height = 0;
      image_count = 1;
    }
    var slides = $('li.file-entity-slideshow-slide', context);
    
    // Determine the median height of the slides.
    var heights = [];
    _.each(slides, function(slide) {
      heights.push($(slide).height());
    });
    heights.sort();
    var median_height = heights[Math.floor(heights.length/2)];
    // If there are only 2, take the shorter one as the median.
    if (heights.length == 2) {
      median_height = heights[0];
    }
    
    // Set the new maximum slide height to the median height of the slides.
    new_slide_height = median_height;
    
    // If that's still too large to fit inside max_height, reduce it.
    if (new_slide_height > max_height) {
      new_slide_height = max_height;
    }
    
    // If there are few enough images in the pager to fit in one row, and the slideshow
    // + pager is still too tall to fit on screen, drop the new maximum slide height again.
    if (image_count <= 5 && (new_slide_height + pager_height) > max_height) {
      new_slide_height = max_height - pager_height;
    }
    
    // Resize the too-tall images inside the slides.
    _.each(slides, resize_slideshow_images);
  }
  
  // Performs some necessary setup for Slideshow pages.
  function setup_slideshow_page() {
    // Move all the non-slideshow fields up to z-index 100, so that the slideshow won't overlap them.
    $('div.node-slideshow').children().each(function() {
      var field = $(this);
      if (!field.hasClass('field-name-field-slideshow')) {
        field.addClass('zindex100');
      }
    });
  }
  
  // Sets up the AJAXiness of the Experts Guide page.
  function setup_experts_guide() {
    // Stick the hidden AJAX progress throbber into the page, to be shown while
    // AJAX calls are being made.
    $('body').append('<div id="ajax-throbber" class="hidden">');
    
    // Set up the Expert Search AJAX.
    $('#search-form').submit(function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      var that = $(this);
      $('#ajax-throbber').removeClass('hidden');
      $.ajax({
        type: 'POST',
        data: that.serialize(),
        url: that.attr('action'),
        context: that,
        success: display_expert_search_results,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $('#ajax-throbber').addClass('hidden');
          alert("We're sorry, but an error has occured. Please try again.");
        }
      });
      return false;
    });
    
    // Set up the Expanded Experts AJAX.
    $(".view-expert-research-topics .views-field-expander a").each(function() {
      var row = $(this).parents('.views-row');
      $(this).click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if ($('.expanded-experts', row).length) {
          // Rather than creating a new expanded experts list when there's
          // already one here, hide/show the existing one.
          $('.expanded-experts', row).toggle();
          
          // Toggle the "up/down" arrow.
          var arrow = $(this).children('img').eq(0);
          if (arrow.hasClass('up')) {
            arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_down.png');
            arrow.removeClass('up');
          }
          else {
            arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_up.png');
            arrow.addClass('up');
          }
          return;
        }
        
        $('#ajax-throbber').removeClass('hidden');
        $.ajax({
          url: $(this).attr('href'),
          context: row,
          success: expand_experts,
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#ajax-throbber').addClass('hidden');
            alert("We're sorry, but an error has occured. Please try again.");
          }
        });
      });
    });
  }
  
  function expand_experts(response) {
    var list = $('<ul class="expanded-experts">');
    _.each(response.experts, function(expert, index) {
      // Construct an <li> from the data returned by the AJAX call.
      var li = $('<li class="expert">');
      if (index % 2 == 0) {
        // Since JS is 0-indexed, the 'odd' ones are 0, 2, 4, ...
        li.addClass('odd');
      }
      li.append('<div class="name"><h4>' + expert.name + '</h4></div>');
      if (expert.title) {
        li.append('<div class="title">' + expert.title + '</div>');
      }
      if (expert.summary) {
        li.append('<div class="summary">' + expert.summary + '</div>');
      }
      list.append(li);
    });
    
    // Add the newly-created <ul> to the parent views-row.
    this.append(list);
    
    // Change the down arrow to "up".
    var arrow = this.find('.views-field-expander img').eq(0);
    arrow.attr('src', '/sites/all/themes/caltech_mte/img/expand_up.png');
    arrow.addClass('up');
    
    $('#ajax-throbber').addClass('hidden');
  }
  
  // Displays the search results retrieved from the AJAX form post, hiding the 
  // Expert Research Topics panel to make room.
  function display_expert_search_results(response) {
    var panel = $('.panel-col-first .inside');
    var topics = $('.pane-expert-research-topics-panel-pane-1');
    var search_results_panel = $('<div id="search-results-panel"></div>');
    var search_results = $('<div id="search-results" style="display:none">');
    var list = $('<ol class="search-results caltech_search_experts-results">');
    _.each(response, function(node, index) {
      var li = $('<li class="search-result">');
      if (index % 2 == 0) {
        // Since JS is 0-indexed, the 'odd' ones are 0, 2, 4, ...
        li.addClass('odd');
      }
      li.append(node);
      list.append(li);
    });
    
    // The "Resturn to Research Topics" link closes the search results and 
    // re-displays the Research Topics list.
    var return_to_topics = $('<a href="javascript:void(0)">Return to Research Topics</a>');
    return_to_topics.click(function() {
      $('#search-results-panel').remove();
      topics.fadeIn();
    });
    search_results_panel.append(return_to_topics);
    
    if (response.length) {
      search_results.append('<h2>Search Results</h2>');
      search_results.append(list);
    }
    else {
      var no_results = '<div>' + 
        '<h2>Your search yielded no results.</h2> ' +
        '<ul>' +
          '<li>Check if your spelling is correct.</li>' +
          '<li>Only searches for complete words or acronyms will return results.</li>' + 
          '<li>Search terms must be at least 3 characters.</li>' +
        '</ul></div>';
      search_results.append(no_results);
    }
    
    // Hide the research topics panel, to make room for the search results.
    topics.hide();
    
    // Remove any existing #search-results-panel div.
    panel.find('div#search-results-panel').remove();
    
    $('#ajax-throbber').addClass('hidden');
    search_results_panel.append(search_results);
    panel.append(search_results_panel);
    search_results.fadeIn();
  }
  
  // Sets up Google Analytics tracking for clicks on various parts of the UI.
  function setup_google_analytics_for_menus() {
    // Main Menu
    $('#megamenu-main-menu a').click(function() {
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', 'Menus', 'Main Menu', link_name]);
    });
    
    // Above Search Menu
    $('#above_search_links a').click(function() {
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', 'Menus', 'Above Search', link_name]);
    });
    
    // JPL Link
    $('#jpl a').click(function() {
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', 'Menus', 'JPL', link_name]);
    });
    
    // Footer Legalese Links
    $('#cb_legalese a').click(function() {
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', 'Footer', 'Legalese', link_name]);
    });
    
    // Footer Social Media Links
    $('#social_media_footer_links a').click(function() {
      var link_name = $(this).data('name');
      _gaq.push(['_trackEvent', 'Footer', 'Social Media', link_name]);
    });
    
    // Quick Links menu
    $('#quick_links a').click(function() {
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', 'Menus', 'Quick Links', link_name]);
    });
  }
  
  // Sets up the long description clicks and Google Analytics tracking for Quick Links pages.
  function setup_quick_links() {
    $('.link-farm-long-description-icon').click(function(event) {
      $('.link-farm-long-description').hide();
      $(this).siblings('.link-farm-long-description').show();
      event.stopPropagation();
      return false;
    });
    
    // This would be $('body').click(), but Mobile Safari is stupid.
    $('#page_content').click(function() {
      $('.link-farm-long-description').hide();
    });
    
    $('.link-farm-collection a').click(function(event) {
      var page_title = $('.link-farm-page-title').text();
      var collection = $(this).parents('.link-farm-collection-wrapper').find('.link-farm-collection-name').text();
      var link_name = $(this).text();
      _gaq.push(['_trackEvent', page_title, collection, link_name]);
    });
  }
  
  // TODO: If/when we migrate the separate banner render strategy from devisions to here,
  // #banner will need to be changed to #header.
  function resize_main_content() {
    // If the #main element is taller than the content within it, shrink it to fit the browser window.
    var header_height = $('#banner').height();
    var main_height = window.innerHeight || $('#main').height();
    var content_height = $('#main-content > .tabs').height() + $('#main-content > .region').height() + $('#footer-pad').height();
    
    // Only resize if the content is shorter than #main.
    if (content_height < main_height) {
      if (main_height - header_height >= content_height) {
        // If subtracing the #banner height leaves #main taller than the content, do that.
        $('#main').height(main_height - header_height);
      }
      else {
        // If subtracting the #banner height makes #main shorter than the content, that's too short.
        // Instead, resize to fit the content.
        $('#main').height(content_height);
      }
    }
  }
  
  ////////////////////////////////////////////////////////
  // Before document.ready();
  ////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////
  // On document.ready();
  ////////////////////////////////////////////////////////
  function on_ready() {
    if (!$('body.page-user.not-logged-in').length) {
      resize_main_content();
    }
    
    // Set up the banner search bar's default text.
    $(".default-text").focus(search_box_clear);
    $(".default-text").blur(search_box_fill);
    $("form").submit(clear_default_text);
    // Fill any .default-text styled input fields with their default text string.
    $(".default-text").blur();
    
    // Focuses the username input field when the /user page loads. Unfortunately, this won't help on
    // iPhone because it refuses to bring up the keyboard without a user actually tapping the input field.
    if (window.location.pathname === '/user') {
      $("input#edit-name").focus();
    }
    
    // Position the background image on page load, and reposition it whenever the browser window changes size.
    fix_background();
    $(window).resize(fix_background);
    
    // Hooks the banner search bar into the Drupal search mechanism.
    attach_banner_search();
    
    $('#getdirections-direction-form').submit(function() {
      setTimeout(
        function() {
          $('#getdirections-direction-form input').removeAttr('disabled');
        },
        500
      );
    });
    
    shorten_video_gradients();
    change_duplicate_news_listing_launchers();
    
    // On nodes which have the field_images field, resize it if it's too tall.
    var context = $('div.field-name-field-images');
    if (context.length > 0 && context.height() > max_height) {
      resize_image_slideshow(context);
    }
    
    if ($('body').hasClass('node-type-slideshow')) {
      setup_slideshow_page();
    }
    
    if ($('body').hasClass('page-experts-guide')) {
      setup_experts_guide();
    }
    
    if ($('body').hasClass('page-quick-links')) {
      setup_quick_links();
    }
    
    setup_google_analytics_for_menus();
  }

  $(document).ready(on_ready);

  /////////////////////////////////////////////////////////
  // Set needed Drupal.behaviors variables
  /////////////////////////////////////////////////////////
  Drupal.behaviors.caltech_mte = {
    attach: function(context, settings) {
      trim_news_listing_body();
      add_play_button_to_videos();
      add_link_to_all_teaser_images();
      
      // Make all Teaser Listings clickable throughout the listing div, rather
      // than just on the title link. This is here because it needs to be run each time a new
      // page of infinite scroller results comes in.
      
      $('.node.view-mode-teaser_listing, .node.view-mode-teaser_series_listing, .node.view-mode-teaser_headline_story').each(function() {
        var url = $('div[class*="title"] a', this).attr('href');
        var link = $('<a>').attr('href', url);
        
        // Only wrap a listing if it isn't already wrapped.
        if (!$(this).parent().is('a')) {
          $(this).wrap(link);
          
          // Remove the Colorbox link that wraps video thumbnails. Allison wants user clicks to lead to the video's
          // full page, instead of playing it directly from the listing page.
          var top = $(this).find('.group-right .field-item');
          var top_wrapper = $(top).children('.file-video');
          var bottom_wrapper = top_wrapper.find('.file-video');
          top_wrapper.detach();
          top.append(bottom_wrapper);
        }
      });
    },
    fix_background: function() {fix_background();},
  };
}(jQuery, Drupal, this, this.document));
