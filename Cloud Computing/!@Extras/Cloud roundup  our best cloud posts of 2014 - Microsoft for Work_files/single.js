(function(window, document, $, undefined) {

	(function($){
		$.fn.msSocialPopup = function(options){

		//settings
		var settings = $.extend({
			"popUpWidth" : 600,               /*Width of the Pop-Up Window*/
			"popUpHeight": 450,               /*Height of the Pop-Up Window*/
			"popUpTop"   : 100,               /*Top value for Pop-Up Window*/
			"useCurrentLocation" : false      /*Whether or not use current location for sharing*/
		}, options);

		/*Attach this plugin to each element in the DOM selected by jQuery Selector and retain statement chaining*/
		return this.each(function(index, value){

			/*Respond to click event*/
			$(this).bind('click', function(e){

				e.preventDefault();

				/*Define*/
				var social = $(this).data('social'),
				width=settings.popUpWidth,
				height=settings.popUpHeight,
				sHeight=screen.height,
				sWidth=screen.width,
				left=Math.round((sWidth/2)-(width/2)),
				top=settings.popUpTop,
				url,
				useCurrentLoc = settings.useCurrentLocation,
				socialURL = (useCurrentLoc) ? window.location : encodeURIComponent(social.url),
				socialText = social.text,
				socialRelated = encodeURIComponent(social.related),
				socialImage = encodeURIComponent(social.image);

				switch(social.type){
					case 'facebook':
						url = 'https://www.facebook.com/sharer.php?u='+ socialURL + '&t=' + socialText;
						break;
					case 'twitter':
						url = 'https://twitter.com/share?url='+ socialURL + '&text=' + socialText + '&related=' + socialRelated;
						break;
					case 'linkedin':
						url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + socialURL + '&title=' + socialText;
						break;
				}

				/*Finally fire the Pop-up*/
				window.open(url, '', 'left='+left+' , top='+top+', width='+width+', height='+height+', personalbar=0, toolbar=0, scrollbars=1, resizable=1');
				});
			});
		};
		}(jQuery));

		$('.social-icons-wrap a').msSocialPopup();

})(window, document, jQuery);

jQuery(document).ready(function() {
    var share_count = jQuery('.fb-share-populated-container').html();
    jQuery('.fb-share-container').html( share_count );
});
