
// TRACKING
// Tracking has to be the last click event bind to A elements
jQuery(function($) { 
	
	var get_label = function(a){
		a = $(a)
		var label,
			href = a.attr('href');
		if (!href){ return ""; }
		var hreflo = href.toLowerCase();
		// If the link points to a PDF or to another website, the URL is displayed.
		if (hreflo.indexOf('.pdf') != -1 || (hreflo.indexOf('http') != -1 && hreflo.indexOf(document.domain) == -1)){
			href = href.replace('http://', '');
			href = href.replace('www.', '');
			label = href;			
		// If it's a link in our site, we display the link text, or the alt attribute if it's an image link (such as the logo).
		} else {
			aText = $.trim(a.text());
			if (aText != '' && aText != '&nbsp;') {
				label = a.text();			 
			} else if (a.attr('title')){
				label = a.attr('title');
			} else if (a.find('img').length) {
				label = a.find('img').attr('alt');
			} else {
				label = href; // We fallback to the href if no other option.
			}
		}
		return smartTrim(label, 30)
	}
	
	var track = function(selector, category, customlabel){
		$(document).on('click', selector, function(e){ 
			var label = customlabel || get_label(this);
			var data = ['_trackEvent', category, 'click', label];
			if (typeof _gaq != 'undefined'){ _gaq.push(data); }
			// If the link has other events that prevent its redirect, let them happen. 
			// Otherwise, redirect using a timeout so we have time to hit the tracking server.
			// This is the Google-sanctioned technice as per
			// http://www.google.com/support/googleanalytics/bin/answer.py?hl=en&answer=55527
			var href = $(this).attr('href');
			if (href && !e.isDefaultPrevented() && label.indexOf('addthis.com') == -1) {
				setTimeout('document.location = "'+ href +'"', 200);
				return false;
			}
		});		
	}

	var smartTrim = function(string, maxLength) {
	    if (!string) return string;
	    if (maxLength < 1) return string;
	    if (string.length <= maxLength) return string;
	    if (maxLength == 1) return string.substring(0,1) + '...';
	
	    var midpoint = Math.ceil(string.length / 2);
	    var toremove = string.length - maxLength;
	    var lstrip = Math.ceil(toremove/2);
	    var rstrip = toremove - lstrip;
	    return string.substring(0, midpoint-lstrip) + '...' + string.substring(midpoint+rstrip);
	}	
	
	return gatracker = {
		smartTrim: smartTrim,
		track: track
	}

});	