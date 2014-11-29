// click the shortstack button
$('#banner .masthead button').click(function(e){
    e.stopPropagation();
    $('#banner').toggleClass('nav-open');
    //make sure no subnavs peak out unexpectedly
    $('#banner').removeClass('sub');
    $('ul.primary li, ul.secondary li').each(function(){
        $(this).removeClass('nav-open');
    });
});

$('ul.primary > li, ul.secondary > li').hover(function(){
	$('ul.primary li, ul.secondary li').each(function(){
        $(this).removeClass('nav-open');
    });
	$(this).addClass('nav-open');
}, function(){
	$(this).removeClass('nav-open');
});

//this is needed for touch devices since hover states aren't reliable
$('ul.primary > li span, ul.secondary > li span').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('ul.primary li, ul.secondary li').each(function(){
        $(this).removeClass('nav-open');
    });
    $li = $(this).parent().parent();
    $li.toggleClass('nav-open');
});

$('#search-btn').click(function(e){
    e.preventDefault();
    if($('#banner').hasClass('expand-open') && $('section.tools-expand').hasClass('user')){
        // if the banner is already open on user, switch to search
        $('section.tools-expand').removeClass('user');
        $('#banner').addClass('search');
    } if($('#banner').hasClass('expand-open') && $('section.tools-expand').hasClass('search')){
        // if the banner is already open on search, close it
        $('#banner').removeClass('expand-open');
    } else{
        // open the banner, make sure user isn't visible, show search
        $('#banner').addClass('expand-open');
        $('section.tools-expand').removeClass('user').addClass('search');
    }
    $('#search-form #banner-search-term').focus();
});

$('#user-btn').click(function(e){
    e.preventDefault();
    if($('#banner').hasClass('expand-open') && $('section.tools-expand').hasClass('search')){
        // if the banner is already open on search, switch to user
        $('section.tools-expand').removeClass('search');
        $('#banner').addClass('user');
    } if($('#banner').hasClass('expand-open') && $('section.tools-expand').hasClass('user')){
        // if the banner is already open on user, close it
        $('#banner').removeClass('expand-open');
    } else{
        // open the banner, make sure search isn't visible, show user
        $('#banner').addClass('expand-open');
        $('section.tools-expand').removeClass('search').addClass('user');
    }
});

$('#reading-selector .label').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).parent().toggleClass('open');
    $(this).parent().parent().toggleClass('open');
});

$('#network-selector .label').click(function(e){
    e.preventDefault();
    $(this).parent().toggleClass('open');
});
$('#network-selector ul').on('mouseleave', function() {
    $('#network-selector').removeClass('open');
});

