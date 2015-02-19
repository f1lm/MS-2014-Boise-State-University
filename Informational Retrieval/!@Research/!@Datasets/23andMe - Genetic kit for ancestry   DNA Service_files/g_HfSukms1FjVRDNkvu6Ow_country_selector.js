$(function(){
    var locale = $.cookie('selected_country')
    $('.js-locale-selector li').each(function() {
        var language = $(this).data('language');
        if (locale == language) {
            $(this).parent().prepend(this);
            $('a', this).removeAttr('href');
            $('a', this).addClass('first');
        }
    });
    $('.country-selector').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('open');
    });
    $('.mobile-nav .country-link').click(function(e){
        e.stopPropagation();
        $('.country-selector', this).toggleClass('open');
    });
    $('.selector-toggle-eu').not('.first').click(function(e){
        e.preventDefault();
        $('#selector-modal-eu').reveal();
    });
    $('.selector-toggle-gb').not('.first').click(function(e){
        e.preventDefault();
        $('#selector-modal-gb').reveal();
    });
    $(document).click(function(){
        $('.country-selector').removeClass('open');
    });
});
