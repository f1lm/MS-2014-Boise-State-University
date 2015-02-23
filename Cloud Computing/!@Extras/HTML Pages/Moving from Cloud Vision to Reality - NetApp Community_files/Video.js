/**
* Lithium Technologies
* @author: Adam Ayres, Kerry Liu
* @requires: jQuery
* 
* Resizes an Ooyala video player to be within the dimensions of its parent element.
*/
;(function($LITH) {
	
LITHIUM.Video = function(playerId, eventName, eventParams) {
	if (eventName === "ooyalaPlayerEmbedded" || eventName === "playerEmbedded") {
		var embed = $LITH("#" + playerId);
		var videoContainer = embed.parent();		
		var parentWidth = videoContainer.closest(".lia-vid-container").parent().width();
		
		var defaultWidth = 400;
		// the embed/object tags will always have these attributes. If the parent container happens to have a width of 0, 
		// embed.width() will also return 0
		var originalWidth = embed.attr("width"); 
		var originalHeight = embed.attr("height");
		if(originalWidth <= 0) {
			// avoid a divide by zero error
			originalWidth = defaultWidth;
			originalHeight = defaultWidth;
		}
		// check to see if we need to resize the video				
		var uploadedVideoContainer = videoContainer.closest('div.UploadedVideoDisplay.single-video');
		if (uploadedVideoContainer.size() > 0 ) {
			// use a different parent width when showing single video and use 75% only so it will have space for the metadata
			parentWidth = uploadedVideoContainer.width() * 0.75;
		}	
		if(originalWidth > parentWidth) {		
			var calculatedWidth = (parentWidth > 0) ? parentWidth : defaultWidth;
			var calculatedHeight = Math.round((originalHeight * calculatedWidth) / originalWidth);
			
			videoContainer.height(calculatedHeight);
			videoContainer.width(calculatedWidth);			
			embed.height(calculatedHeight);		
			embed.width(calculatedWidth);
		}
	}
};

LITHIUM.Video.parentWidth = 0;

})(LITHIUM.jQuery);
