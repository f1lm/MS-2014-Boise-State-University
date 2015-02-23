$(document).ready(function(){
  // define width of window
  var width = $(window).width();

  // megamenu functionality
  $('#bds-main-menu li').hover(function(){
    $(this).children('.bds-primary-link').addClass('focus');
    $(this).children('.bds-megamenu').show();
  },
  function(){
    $(this).children('.bds-primary-link').removeClass('focus');
    $(this).children('.bds-megamenu').hide();
  });
  
  $('.bds-megamenu a').click(function(){
    $('.bds-primary-link').removeClass('focus');
    $('.bds-megamenu').hide();
  });
  
  // mobile menu functionality
  $('#bds-mobile-menu-button').click(function () {
    $('body').toggleClass('bds-mobile-menu-push');
    $('#bds-mobile-menu').toggleClass('bds-mobile-menu-open');
  });
  $('#bds-page-left a.active').prepend('<span>&raquo;</span>');

  // jump to top of tabs in mobile view when clicked
  if (width < 640) {
    $('.bds-tabs li').click(function() {
      $('html, body').animate({
        scrollTop: $(this).parent().offset().top
      }, 200);
    });
  }

  // program sticky navigation
  var sections = $("section");
  var navigation_links = $("#bds-program-nav nav a");
  
  sections.waypoint({
    handler: function(event, direction) {
      var active_section;
      active_section = $(this);
      if (direction === "up") active_section = active_section.prev();
    },
    offset: '25%'
  })
  
  navigation_links.click( function(event) {
    $.scrollTo(
      $(this).attr('href'),
      {
        duration: 200,
        offset: { 'left':0, 'top':-74 }
      }
    );
  });
  
  // jump menu
  $('#jumpmenu').change( function () {
    var targetPosition = $($(this).val()).offset().top;
    $('html,body').animate({ scrollTop: targetPosition}, 'slow');
  });
  
  // placeholder support for ie8
  $('input, textarea').placeholder();
  
  // google search
  
  if ($('#megamenu-search').val() !== '') {
    $('#megamenu-search').addClass('populated');
  }
  else {
    $('#megamenu-search').removeClass('populated');
  }
  $('#megamenu-search').blur(function() {
    if ($(this).val() !== '') {
      $(this).addClass('populated');
    }
    else {
      $(this).removeClass('populated');
    }
  });
});

$(window).resize(function() {
  // define width of window
  var width = $(window).width();

  // hide mobile menu 
  if (width > 639) {
    $('body').removeClass('bds-mobile-menu-push');
    $('#bds-mobile-menu').removeClass('bds-mobile-menu-open');
  }
});

$(window).scroll(function(){
  var elem = $('div#bds-program-nav');
  if (!elem.attr('data-top')) {
    if (elem.hasClass('navbar-fixed-top'))
      return;
     var offset = elem.offset()
    elem.attr('data-top', offset.top);
  }
  if (elem.attr('data-top') - elem.outerHeight() <= $(this).scrollTop() - $(elem).outerHeight()) {
    elem.addClass('navbar-fixed-top');
  }
  else {
    elem.removeClass('navbar-fixed-top');
  }
  
  $('#bds-program-nav ul.nav li a').click(function(event) {
    event.preventDefault();
  });
});