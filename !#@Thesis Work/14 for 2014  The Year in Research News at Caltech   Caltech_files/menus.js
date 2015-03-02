(function ($, Drupal, window, document, undefined) {

  /////////////////////////////////////////////////////////////////////////////
  // Menu functions
  /////////////////////////////////////////////////////////////////////////////
  var menuInited = false;
  function init_menu() {
    if (!menuInited) {
      // Delete the text in the <h3> for any submenus with a title that includes the substring "-2nd-col".
      // The menu maintainers are trained so that if they ever need to split a submenu across two columns, they
      // need to title the second one the same as the first, but with "-2nd-col" appended.
      $('h3:contains("-2nd-col")').html('&nbsp;');
      
      // Add classes to the slots to set up their sizes appropriately.
      $('div#desktop_menu .megamenu-bin').each(function() {
        var slots = $(this).find('.megamenu-slot');
        if (slots.length === 5) {
          slots.addClass('five');
        }
        else if (slots.length === 4) {
          slots.addClass('four');
        }
      });

      // For tablets, we want the 1st click of a Menu Parent to show the menu, not navigate. A second click will navigate.
      $('.megamenu-parent-title').click(function(event) {
        if ($('html').hasClass('touch') && $('body').hasClass('desktop')) {
          if ($(this).hasClass('selected') || $(this).parent().hasClass('displayed')) {
            // This menu parent is already selected (or was set as "displayed" at page load),
            // so allow the click to go through to the <a>.
            return true;
          }
          // This menu parent is not already selected, so select it, unselect all the others, and cancel the click.
          $('.megamenu-parent-title').removeClass('selected');
          $(this).addClass('selected');
          event.preventDefault();
        }
      });
      
      // Download the menu pointer image at page load time, so that it won't flicker when the user first hovers a menu title.
      var img0 = new Image(), img1 = new Image();
      img0.src = '/sites/all/themes/caltech_mte/img/menu-pointer.png';
      
      menuInited = true;
    }
  }
  
  var closetimer = null;
  var hovertimer = null;
  
  // Hovering a parent menu opens the menu.
  function open_menu(parent) {
    // Hide all the menus.
    $('.megamenu-bin').removeClass('displayed');
    $('.megamenu-bin').hide();
    $('.megamenu-parent').removeClass('displayed');
    // Remove the active-trail class, so that non-hovered menu parents don't show the ^.
    $('.megamenu-parent.active-trail').removeClass('active-trail').addClass('active');
    
    // Then display the one that the user hovered.
    $('.megamenu-bin', parent).addClass('displayed');
    $('.megamenu-bin', parent).show();
    parent.addClass('displayed');
    
    // Display the COSE MENU button.
    $('#close_menu').removeClass('hidden');
  }
  
  // Clicking the CLOSE MENU button or un-hovering the banner closes the menu.
  function close_menu(parent) {
    $('.megamenu-bin').removeClass('displayed');
    $('.megamenu-bin').hide();
    $('.megamenu-parent').removeClass('displayed');
    // Put back the active-trail class onto the menu parent which had it removed.
    $('.megamenu-parent.active').removeClass('active').addClass('active-trail');
    
    // Hide the COSE MENU button.
    $('#close_menu').addClass('hidden');
  }
  
  function start_closetimer() {
    // Close the Menu after 'closewait' ms.
    cancel_closetimer();
    cancel_hovertimer();
    closetimer = window.setTimeout(close_menu, Drupal.settings.caltech_social_media.closewait);
  }
  
  function cancel_closetimer() {
    if (closetimer) {
      window.clearTimeout(closetimer);
      closetimer = null;
    }
  }
  
  function start_hovertimer() {
    cancel_hovertimer();
    // Save the reference to "this", since it will no longer be the correct object by the time open_menu gets called.
    var that = $(this);
    if (!that.hasClass('filler')) {
      // Activate the hover mechanics only on real menu-parents.
      hovertimer = window.setTimeout(function() {open_menu(that);}, 400);
    }
  }
  
  function cancel_hovertimer() {
    if (hovertimer) {
      window.clearTimeout(hovertimer);
      hovertimer = null;
    }
  }
  
  ////////////////////////////////////////////////////////
  // On document.ready();
  ////////////////////////////////////////////////////////
  function on_ready() {
    init_menu();
    $('#close_menu').click(close_menu);
    // Hovering over any of the top-level menus for long enough opens the menu. Moving the mouse outside of the banner for long enough closes the menu.
    $('.megamenu-parent').mouseenter(start_hovertimer).mouseleave(cancel_hovertimer);
    $('#banner_content').mouseleave(start_closetimer).mouseenter(cancel_closetimer);
  }
  
  $(document).ready(on_ready);
  
}(jQuery, Drupal, this, this.document));
