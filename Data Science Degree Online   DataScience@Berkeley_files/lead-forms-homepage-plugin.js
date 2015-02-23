(function() {
    new LeadForm.HomepageWidget('#lead-forms-homepage', leadFormOptions);

    // Add custom select menu wrapper and div to the homepage first question for the Small Lead Form style
    $('.lead_form_small #home_reqinf select').each(function() {
        var $this = $(this);
        $this.wrap('<div class="custom-select-wrapper" />').after('<div class="custom-select"><span class="selection">'+$this.val()+'</span><span class="chevron-up-down"></span></div>');
        $('.selection').text($(':selected', $this).text());
    });

    // Change text in custom select menu when option is selected.
    $('.custom-select-wrapper select').bind('change', function() {
        var $this = $(this);
        $(this).parent().find('.selection').text($(':selected', $this).text());
    });

})();