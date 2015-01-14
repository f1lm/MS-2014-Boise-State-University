jQuery(document).ready(function(){

jQuery('li.tabbed-widget').mousedown(function() {	
	    _gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Blog Cloud']);
		    return false;
	});
	
	jQuery('li.widget_text').mousedown(function() {	
		_gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Livestream']);
	    return false;

	});
	
	jQuery('li.widget_categoryposts').mousedown(function() {	
	    _gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Press releases & announcements']);
		    return false;
	});
	
	jQuery('li.widget_id_recent_comments').mousedown(function() {	
	    _gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Recent Comments']);
		    return false;
	});
	
	jQuery('li.widget_twittergoodieswidgetswidget').mousedown(function() {	
	    _gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Twitter']);
		    return false;
	});
	
		jQuery('li.widget_links').mousedown(function() {	
	    _gaq.push(['_trackEvent', 'Sidebar', 'Click', 'Related Blogs']);
		    return false;
	});
	
	});