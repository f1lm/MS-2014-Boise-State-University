jQuery(document).ready(function($) {

/*SETTINGS 
********************************************/
// Enter Disqus Forum Shortname here
	var disqus_shortname = 'thenewstack';

//Set-up columns for equal height
	equalheight('.normalstory-box, .sponsor-box');

/*LOGO REFRESH SCRIPT
*******************************************/
	$("div.sponsor-logo").hide();

	var divs = $("div.sponsor-logo").get().sort(function(){

	return Math.round(Math.random())-0.5; //random so we get the right +/- combo

		}).slice(0,6);

		$(divs).show();

		

/* Nav Menu and Search Panel Animation
*******************************************/

var overlay = $(".overlay");

var wrap = $("#page");

var menuRight = $("#responsive-menu");

var showNav = $("#site-navigation .menu-bar");

var closeNav = $("#responsive-menu .menu-close");


var searchRight = $("#navsearchform");

var showSearch = $("#site-navigation .navsearch, .searchlink");

var closeSearch = $("#navsearchform .menu-close");


	showNav.on('click', function(e) {

		e.preventDefault();

			wrap.toggleClass("push-wrap");

			showNav.toggleClass("active");

			menuRight.toggleClass("menu-open");

			overlay.toggleClass("cover");

	});



	closeNav.on('click', function(e) {

		console.log("this is clicked");

			wrap.removeClass("push-wrap");

			menuRight.removeClass("menu-open");

			overlay.removeClass("cover");

	});

	overlay.on('click', function(e) {

		e.preventDefault();

			wrap.removeClass("push-wrap");

			menuRight.removeClass("menu-open");
			
			searchRight.removeClass("search-open");

			overlay.removeClass("cover");

	});



	showSearch.on('click', function(e) {

		e.preventDefault();

			showSearch.toggleClass("active");

			searchRight.toggleClass("search-open");

			overlay.toggleClass("cover");

			$(".ns-search").focus();

	});



	closeSearch.on('click', function(e) {

		e.preventDefault();

			searchRight.removeClass("search-open");

			overlay.removeClass("cover");

	});


/* SINGLE POST COMMENT STUFF
***********************************************************/
 // Navigate to Comments on Single Post
$(".social-header .commentcloud").on('click', function() {
	
	event.preventDefault();

	$("html, body").stop().animate({
				scrollLeft: $(".comment-block").offset().left,
				scrollTop: $(".comment-block").offset().top
			}, 1200, function(){
				$.ajax ({
					type: "GET",
					url: "http://" + disqus_shortname + ".disqus.com/embed.js",
					dataType: "script",
					cache: true
				});

				$(".showDisqus").fadeOut();

			});

 });


//click on footer commentclick
$(".social-footer .commentcloud").on('click', function() {

	$.ajax ({
		type: "GET",
		url: "http://" + disqus_shortname + ".disqus.com/embed.js",
		dataType: "script",
		cache: true
	});

	$(".showDisqus").fadeOut();

});


// View/ Add Comments Button

	$(".showDisqus").on("click", function(){

		$.ajax ({
			type: "GET",
			url: "http://" + disqus_shortname + ".disqus.com/embed.js",
			dataType: "script",
			cache: true
		});

		$(this).fadeOut();


	});

/* RESPONSIVE NAV BAR PIN ON TOP
***********************************************************/
var navBar = $(".nav-bar");
var scrolled = false;

makeNavSticky = function () {


		$(window).scroll(function() {

			if (40 < $(window).scrollTop() && !scrolled && !$("#page").hasClass("push-wrap")) {

				navBar.css('top', '-40px');

			navBar.addClass("pinTop").animate({ top: '0px' });
			 
			scrolled= true;

			}

			if (1 > $(window).scrollTop() && scrolled) {

			navBar.removeClass("pinTop");
			scrolled= false;
			}


		}); //end window scroll function
};

/* DYNAMIC RESPONSIVE CENTERING FOR STORY BLOCK
***********************************************************/
centerBlocks = function() {

	if(620 > $(window).width() ) {

		var mainWidth = $("#main").width();

		// console.log(mainWidth);

		var totalMargin = mainWidth - 290;

		// console.log(totalMargin);

		var halfMargin = totalMargin/2;

		// console.log(halfMargin);

		$('.normalstory-box').css('margin-left', halfMargin);
		$('.singlerss-wrap').css('margin-left', halfMargin);

	}

	if(620 < $(window).width() ) {

		$('.normalstory-box').css('margin-left', 10);
		$('.singlerss-wrap').css('margin-left', '');

	}
};

/* DYNAMIC RESPONSIVE CENTERING FOR EVENT BLOCK HEADING
***********************************************************/

centerEventsMeta = function () {

	if (375 > $(window).width() ) {

		//console.log("correct width entered");

		$("h4.mobile-date").each(function(i) {

			var height = $(this).height();

			var refheight = $(".event-logo img").height();

			var difference = refheight - height;

			var margin = difference/2;

			$(this).css('margin-top', margin);

			console.log (i + ": " + height + " margin given: " + margin + " this contains: " + $(this).text());

		});

		
	}

};

/* DROPCAP FOR STORIES
***********************************************************/

// $(".post-content p:eq(0)").each(function() {
//     var text = $(this).html();
//     var first = $('<span>'+text.charAt(0)+'</span>').addClass('dropcap');
//     $(this).html(text.substring(1)).prepend(first);
// });


/* AUTHOR BIO EFFECTS
***********************************************************/
var showChar = 250;
var ellipsesText = "...";

if(620 > $(window).width() ) {

	$(".description").each(function() {

		var content = $(this).html();

		var c = content.substr(0, showChar);
	    var h = content.substr(showChar, content.length - showChar);

	    var html = c + '<span class="moreellipses">' + ellipsesText + ' </span><span class="morecontent"><span>' + h + '</span></span>';

	    $(this).html(html);

	});

	$(".button").on("click", function(e){

		e.preventDefault();

		$(".morecontent span").toggle();
	        $(".moreellipses").hide();
	        $(this).hide();
	        return false;


	});

}

/*************************  this is the END of FIRST DOCUMENT.READY	**********************/
});


/* OTHER EVENT SPECIFIC TRIGGERS
****************************************************************************************/

	//on Ready
	jQuery(document).ready(function($) {

		centerBlocks();

		centerEventsMeta();
	
	});

	//on LOAD
	jQuery(window).load(function($) {

		centerBlocks();

		makeNavSticky();
	
		equalheight('.normalstory-box, .sponsor-box');

	});

	//on RESIZE
	jQuery(window).resize(function($){
		//centering script
		centerBlocks();

		//make nav sticky if we have reached breakpoint
		makeNavSticky();
		
		// recalculate need for equalHeight
		equalheight('.normalstory-box, .sponsor-box');

		centerEventsMeta();

	});


	//on ORIENTATION CHANGE
	jQuery(window).on("orientationchange", function($){
		//centering script
		centerBlocks();

		// recalculate need for equalHeight
		equalheight();

		centerEventsMeta();

	});