(function($) {
  Drupal.behaviors.searchbox = {
    attach: function (context, settings) {
      if ($('#search-block-form .form-text').val() == '') {
        $('#search-block-form .form-text').val('Search the site');
      }

      $('#search-block-form .form-text').focus( function() {
        $(this).val('');
        $(this).css('border', '1px groove #999999');
      });

      $('#search-block-form .form-text').blur( function() {
        if ($(this).val() == ''){
          $(this).val('Search the site');	
        }
        $(this).css('border', '1px groove #ffffff');
      });
  
      $('#header-search #edit-actions .form-submit').mouseover( function(){
	    $(this).css('background-image', 'url(/sites/default/themes/responsive_vr/img/magnifier-blue.png)');
      });
  
      $('#header-search #edit-actions .form-submit').mouseout( function(){
	    $(this).css('background-image', 'url(/sites/default/themes/responsive_vr/img/magnifier-grey.png)');
      });

      $('#search-block-form').submit( function() {
        if ($('#search-block-form .form-text').val() == 'Search the site') {
          $('#search-block-form .form-text').val('');
        }
      });
    }
  };
  
  Drupal.behaviors.searchboxToggle = {
    attach: function (context, settings) {
      $('ul#secondarynavmenu li.search a').click(function () {
	    $('div#header-search').toggleClass('show-search hide-search');
		return false;
      });
      $('div#header-search').addClass('hide-search');
	}
  };
})(jQuery);