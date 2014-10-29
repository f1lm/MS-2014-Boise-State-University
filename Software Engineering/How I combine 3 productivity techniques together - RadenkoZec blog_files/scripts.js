jQuery(document).ready(function($){ // START


  // Input title
  $('input[title], textarea[title]').each(function() {if($(this).val() === '') {$(this).val($(this).attr('title'));}
    $(this).focus(function() {if($(this).val() == $(this).attr('title')) {$(this).val('').addClass('focused');}});
    $(this).blur(function() {if($(this).val() === '') {$(this).val($(this).attr('title')).removeClass('focused');}});
  });


  // Fade in and out
  $('.fade').hover(
    function() {$(this).fadeTo("medium", 1);},
    function() {$(this).fadeTo("medium", 0.5);}
  );


  // Add .has-sub class into sub menu parent
  $('ul ul').parent().addClass('has-sub');


  // Mobile-view navigation
	// Create the dropdown base
	$("<select class=\"mobile-nav\" />").appendTo("nav.nav");
	// Create default option "Navigate to..."
	$("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "Navigate to..."
	}).appendTo("nav.nav select");
	// Populate dropdown with menu items
	$("nav.nav a").each(function() {
		var el = $(this);
		$("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo("nav.nav select");
	});
	$("nav.nav select").change(function() {
		window.location = $(this).find("option:selected").val();
	});


  // Fluid video
  $(".article").fitVids();


}); // END