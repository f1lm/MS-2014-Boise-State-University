jQuery(function($){
    $('#fileforum-tab-switch li a').click(function() {
      var dest_tab = $(this).attr('data-tab');
      // show appropriate content
      $('div.section.fileforum div.content > div').hide();
      $('div.section.fileforum div#' + dest_tab).show();

      // update active class
      $(this).closest('ul').find('li').removeClass('active');
      $(this).closest('li').addClass('active');

      return false;
    });

    // post paging
    $('a[data-action="load-next-page"]').live('click', function() {
      var $this = $(this);
      $this.html('Loading More Articles...');
      
      $.get($this.attr('href'), function(data) {
        $this.closest('.loadMore').replaceWith(data);
      });

      return false;
    });

    // ethics div toggling
    $('a[data-action="toggle-ethics"]').bind('click', function() {
      $('#ethics').toggle();
      return false;
    });

    $.facebox.settings.closeImage = '/wp-content/themes/betanews/images/facebox/closelabel.gif';
    $.facebox.settings.loadingImage = '/wp-content/themes/betanews/images/facebox/loading.gif';

    // facebox
    $('a[rel="facebox"]').facebox();

    $('form[data-action="remote"] input[type="submit"]').live('click', function() {
      console.log(this, $(this));

      var $this = $(this), form = $this.closest('form');

      var data = form.serialize();
      data += "&send=1";

      $.post(form.attr('action'), data, function(data) {
        form.html(data);
      });

      return false;
    });
});
