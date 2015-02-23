/*-----------------------------------------------------------------------------------*/
/*	Create Share Function for TCRAF
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function(){
	
	jQuery('.tcraf-social-button').click(function(event){
		
		// Cache Vars
		var this_button = jQuery(this);
		var this_container = jQuery('.tcraf-social-container');
		var this_share_url = this_container.attr('data-share-url');
		var this_tweet_text = this_container.attr('data-tweet-text');
		var this_fb_title = this_container.attr('data-fb-title');
		var this_fb_text = this_container.attr('data-fb-text');
		var this_fb_image = this_container.attr('data-fb-image');
		var this_window_url = '';
		var this_window_title = '';

		// Get Button Type
		if( this_button.hasClass('facebook') ){ // Facebook Setup
			this_window_url = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+this_share_url+'&p[images][0]='+this_fb_image+'&p[title]='+this_fb_title+'&p[summary]='+this_fb_text;
			this_window_title = 'Share on Facebook';
		} else if( this_button.hasClass('twitter') ){ // Twitter Setup
			this_window_url = 'http://twitter.com/share?url='+this_share_url+'&text='+this_tweet_text;
			this_window_title = 'Share on Twitter';
		} else if( this_button.hasClass('google') ){
			this_window_url = 'https://plus.google.com/share?url='+this_share_url;
			this_window_title = 'Share on Google+';
		}
		
		// Setup Popup Window
		var width  = 575,
		height = 250,
		left   = (jQuery(window).width()  - width)  / 2,
		top    = (jQuery(window).height() - height) / 2,
		url    = this.href,
		opts   = 'status=1' +
		',width='  + width  +
		',height=' + height +
		',top='    + top    +
		',left='   + left;
		
		// Open and return
		window.open(this_window_url, this_window_title, opts);
		return false;
		
	});
	
});
