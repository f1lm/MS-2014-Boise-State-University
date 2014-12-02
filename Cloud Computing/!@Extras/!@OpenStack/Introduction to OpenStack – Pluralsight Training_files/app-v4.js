$(document).foundation();

$('a.menu-button').click(function () {
    $('.hidden-nav').slideToggle();
});

$(document).on('click', '#expandAll', function (e) {
    e.preventDefault();
    $('[data-section] section').addClass('active');
});

$(document).ready(function() {
    $('.sub-navigation .menu > li').click(function (e) {
        $(this).siblings().find('ul').removeClass('expanded');
        $(this).find('ul').toggleClass('expanded');

        e.stopPropagation();
    });

    $(document).click(function () {
        $('.sub-navigation .menu li ul').removeClass('expanded');
    });
});