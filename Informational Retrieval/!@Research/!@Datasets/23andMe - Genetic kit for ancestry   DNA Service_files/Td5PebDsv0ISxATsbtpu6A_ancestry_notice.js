// US Ancestry Only notice

$('.close-ancestry-only-notice').click(function(){
    $('.ancestry-only-nav-banner').slideUp();
    $.cookie('ancestry_only_notice', 'True', {expires: 365, path:'/', secure: true});
});
