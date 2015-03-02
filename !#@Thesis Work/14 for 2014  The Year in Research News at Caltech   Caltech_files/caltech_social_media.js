/*global Drupal:true */
(function($) {
  var closetimer = null;
  var hovertimer = null;
  var sticky_footer = false;
  
  //////////////////////////////////////////////////////////////////
  // Social Media Footer
  //////////////////////////////////////////////////////////////////
  // Clicking the UP arrow or hovering the footer raises the Social Media Footer.
  function open_smf() {
    // 250px is the value of @desktop_open_footer_h, but we can't pull it from the CSS because of how .animate() works.
    $("#footer").animate({height: '250px'}, {
      complete: function() {
        $("#footer_arrow_down").removeClass('hidden');
        $("#footer_arrow_up").addClass('hidden');
        $("#footer").addClass('expanded');
        if (Drupal.behaviors.caltech_mte) {
          Drupal.behaviors.caltech_mte.fix_background();
        }
      }
    });
  }
  
  // Clicking the DOWN arrow or un-hovering the footer closes the Social Media Footer.
  function close_smf() {
    // 50px is the value of @desktop_closed_footer_h, but we can't pull it from the CSS because of how .animate() works.
    $("#footer").animate({height: '50px'}, {
      complete: function() {
        $("#footer_arrow_up").removeClass('hidden');
        $("#footer_arrow_down").addClass('hidden');
        $("#footer").removeClass('expanded');
        if (Drupal.behaviors.caltech_mte) {
          Drupal.behaviors.caltech_mte.fix_background();
        }
        sticky_footer = false;
      }
    });
  }
  
  function toggle_sticky_smf() {
    // If the user clicks one of the footer arrows, disable hover entirely until they click an arrow again.
    cancel_closetimer();
    cancel_hovertimer();
    
    if (!sticky_footer) {
      if ($("#footer").hasClass('expanded')) {
        // This only happens if the user clicks the down arrow after raising the footer with a hover.
        // To ensure that clicking the down arrow has a consistent result, always close the footer here.
        close_smf();
        return;
      }
      sticky_footer = true;
      _gaq.push(['_trackEvent', 'Menus', 'Footer', 'Opened via Click']);
      open_smf();
    }
    else {
      close_smf();
      // sticky_footer is set to false at the end of the animation, instead of right away, to prevent
      // the user's mouse hover events from firing improperly during the animation.
    }
  }
  
  function start_closetimer() {
    if (sticky_footer) {
      return;
    }
    // Close the Social Media Footer after 'closewait' ms.
    cancel_closetimer();
    cancel_hovertimer();
    closetimer = window.setTimeout(close_smf, Drupal.settings.caltech_social_media.closewait);
  }

  function cancel_closetimer() {
    if (closetimer) {
      window.clearTimeout(closetimer);
      closetimer = null;
    }
  }

  function start_hovertimer() {
    if (sticky_footer) {
      return;
    }
    // Raise the Social Media Footer after 'hoverwait' ms.
    cancel_hovertimer();
    hovertimer = window.setTimeout(function() {
      _gaq.push(['_trackEvent', 'Menus', 'Footer', 'Opened via Hover']);
      open_smf();
    }, Drupal.settings.caltech_social_media.hoverwait);
  }
  
  function cancel_hovertimer() {
    if (hovertimer) {
      window.clearTimeout(hovertimer);
      hovertimer = null;
    }
  }
  
  function setup_social_media_links() {
    var main = $('#social_media_footer_links');
    $('a.icon', main).each(function() {
      $(this).mouseenter(function() {
        $('#social_media_name').text($(this).data('name')).show();
      });
      $(this).mouseleave(function() {
        $('#social_media_name').hide();
      });
    });
  }
  
  function on_ready() {
    setup_social_media_links();
    
    $("#footer_arrows").click(toggle_sticky_smf);
    $("#connect").mouseenter(start_hovertimer);
    $("#footer").mouseleave(start_closetimer);
    
    $('#social_media_footer_carousel ul').jcarousel({
      scroll: 4,
      visible: 4
    });
    
    // jCarousel appears to determine that there is another page left after the current page
    // based on whether there are any pixels of content left after the rightmost visible item.
    // Thus it assumes there is still another page left after we get to the end, due to the fact
    // that we have 1-pixel borders on our carousel items. Reducing the size of the last element
    // by 3 pixels cancels out the borders just right, making jcarousel treat the last page properly.
    // Reducing it by even 1 more pixel (somehow) makes it think that the second-to-last page is
    // only 3 items long, breaking the last page behavior in a different way. 247px is exactly right.
    $('#social_media_footer_carousel li.jcarousel-item.last').css('width', '247px');
  }

  $(document).ready(on_ready);
  
  /////////////////////////////////////////////////////////
  // Set needed Drupal.behaviors variables
  /////////////////////////////////////////////////////////
  Drupal.behaviors.caltech_social_media = {
    attach: function(context, settings) {}
  };
}(jQuery));
