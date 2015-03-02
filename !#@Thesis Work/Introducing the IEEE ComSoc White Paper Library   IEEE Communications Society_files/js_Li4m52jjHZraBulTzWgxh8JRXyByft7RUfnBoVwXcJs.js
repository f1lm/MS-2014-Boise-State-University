(function ($) {
	
  Drupal.behaviors.responsivevrGridMask = {
    attach: function (context, settings) {
      if ($('body.grid-mask-enabled').size() > 0) {
        var grid_width_pos = parseInt($('body').attr('class').indexOf('grid-width-')) + 11;
        var grid_width = $('body').attr('class').substring(grid_width_pos, grid_width_pos + 2);
        var grid = '<div id="grid-mask-overlay" class="full-width"><div class="row">';
        for (i = 1; i <= grid_width; i++) {
          grid += '<div class="block grid-1"><div class="inner"></div></div>';
        }
        grid += '</div></div>';
        $('body.grid-mask-enabled').prepend(grid);
        $('#grid-mask-overlay .row').addClass('container-' + grid_width);
        $('#grid-mask-overlay .block .inner').height($('body').height());
      }
    }
  };

  Drupal.behaviors.responsivevrGridMaskToggle = {
    attach: function (context, settings) {
      if ($('body.grid-mask-enabled').size() > 0) {
        $('body.grid-mask-enabled').prepend('<div id="grid-mask-toggle">grid</div>');
        $('div#grid-mask-toggle')
          .toggle( function () {
            $(this).toggleClass('grid-on');
            $('body').toggleClass('grid-mask');
          },
          function() {
            $(this).toggleClass('grid-on');
            $('body').toggleClass('grid-mask');
          });
      }
    }
  };
})(jQuery);;
