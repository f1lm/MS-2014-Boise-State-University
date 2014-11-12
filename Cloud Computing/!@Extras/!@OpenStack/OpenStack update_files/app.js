$(document).foundation();

$('a#menu-button').click(function(){
  $('.hidden-nav').slideToggle();
});

$(document).on('click', '#expandAll', function (e) {
  e.preventDefault();
  $('[data-section] section').addClass('active');
});