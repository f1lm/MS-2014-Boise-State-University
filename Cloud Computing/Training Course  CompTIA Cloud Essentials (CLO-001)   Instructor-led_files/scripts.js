$(function() {
	  if ($.browser.msie && $.browser.version.substr(0,1)<7)
	  {
		$('li').has('ul').mouseover(function(){
			$(this).children('ul').show();
			}).mouseout(function(){
			$(this).children('ul').hide();
			})
	  }
	});        

// Sildorion Functions
$(document).ready(function(){
	$('#slidorion').slidorion({
		speed: 1000,
		interval: 8000,
		hoverPause: true,
});
});

// jQuery News Ticker Functions
    $(function () {
        $('#js-news').ticker({
			displayType: 'fade',
			fadeInSpeed: 0,      // Speed of fade in animation
       		fadeOutSpeed: 0,      // Speed of fade out animation
			pauseOnItems: 7500,    // The pause on a news item before being replaced
			titleText: '',   // To remove the title set this to an empty String
			});
    });


// jQuery Table Zebra Striping
$(document).ready(function(){
	$("tr:odd").addClass("odd");
});