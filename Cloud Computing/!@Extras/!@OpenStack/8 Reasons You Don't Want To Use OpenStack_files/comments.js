jQuery( document ).ready( function( $ ) {
	$( ".toggle-comments, .comment-share a, .close-comments").click(function() {
    	$( "#comments" ).slideToggle('fast');
	}); 
});    