(function( $ ){
	$.fn.resizeCarousel = function() {
		var carouselCropWidth = $(this).find('.carousel-inside-crop').width(); 
			
    	var itemDiv = $(this).find('.carousel-items > div');
    	itemDiv.width(carouselCropWidth);  
    	
    	return this;
    };
 })( jQuery );

$(document).ready(function(){
	
	//zoom image functionality
	$('article .zoom').attr('target','_blank'); //opening the link with a js window.open seems to trigger popup blockers.
	$('article .zoom').append('<div class="zoom-icon"></div>');
	/* $('article .zoom').click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		window.open(url,'_blank');
	}); */
	
	//initialize Prettify, which cleans up code samples
	prettyPrint();
	
	//accordion behavior for multiple pros/cons
	//Used on Test Center/reviews
	$(".proscons-wrapper.multi .ss-icon").click(function() {
		var clickedProsCons = $(this).parents(".proscons");
		if (clickedProsCons.hasClass("active")) {
			var toHide = clickedProsCons.find(".proscons-left, .proscons-right");
			toHide.slideUp();
			clickedProsCons.removeClass("active");
			$(this).text("dropdown");
		}
		else {
			var toShow = clickedProsCons.find(".proscons-left, .proscons-right");
			toShow.slideDown();
			clickedProsCons.addClass("active");
			$(this).text("directup");
		}
	});


	$("#collection-module-bottom .carousel-inside-crop").scrollableGroups({'size':6,'item':".excerpt"});
	var collectionCarousel = $("#collection-module-bottom .carousel-inside-crop").scrollable({
		keyboard:false,
		touch:true
	}).navigator({navi:"#collection-module-bottom .carousel-nav-nums",indexed:true});

	
	if ($("#collection-module-bottom .carousel-items > div").length > 1) {
		$("#collection-module-bottom .collection-header").removeClass("no-pages");
	}
	
	$("#collection-module-bottom").resizeCarousel();
	
	$(window).resize(function() {
		$("#collection-module-bottom").resizeCarousel();
	});

});


//user taps the promo handles - needs to be $(document).on() because the promo modules load via ajax
$(document).on('click', '.handle', function(e){
	$(this).prev().addClass('open');
    $(this).addClass('open');
});

//collapse and expand tables in CW wide articles - adding this in the global article.js in case of article-sharing

$(document).ready(function(){

	$(".sectionHeader").next().css("display","none");
	$(".sectionHeader").first().next().css("display","block");
	
	$(".sectionHeader").click(function(){
		$(this).next().slideToggle('slow');
	});

  
});