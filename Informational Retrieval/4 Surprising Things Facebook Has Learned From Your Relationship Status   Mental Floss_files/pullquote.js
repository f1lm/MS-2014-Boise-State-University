(function ($) {

Drupal.behaviors.pullquote = {
  attach: function(context) {
    $('.pullquote:not(.pullquote-processed)', context).each(function () {
      var $span = $(this).addClass('pullquote-processed');
      // May be extended later on. (simply add ',div')
      var $parent = $span.parent('p');
      if ($parent.length) {
        // Apply conditional pullquote container styling.
        $parent.addClass('pullquote-container');
        $span.clone()
          .addClass('pullquote-quote')
          .prependTo($parent);
      }
    });
  }
};

})(jQuery);
