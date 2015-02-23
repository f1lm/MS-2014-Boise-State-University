 /**
 * Lithium Technologies
 * @author: Adam Ayres
 * @date: 10-18-09
 * 
 * Keys will be provided to the Text object by the application.
 * THis object provides a common storage for the text values
 * that need to be exposed to common JavaScript actions on a 
 * per request basis. 
 */
;(function($LITH) {

LITHIUM.Text = function() {
	var localMessages = {};
	return {
		/**
		 * Set messages in the internal map.
		 * 
		 * @Param messages an object literal containing key value pairs of text key and values
		 */
		set:function(messages) {
			$LITH.extend(localMessages, messages || {});
		},
		/**
		 * Retrieves a text value from the message catalog by its key.
		 * Optional parameters maybe passed in that will be replaced with the 
		 * text keys parametrization.
		 */
		get: function(key) {
			var str = localMessages[key];
			if(arguments.length > 1) {
			    for(var i=1; i<arguments.length; i++) {
					var re = new RegExp('\\{' + (i-1) + '\\}','gm');
					str = str.replace(re, arguments[i]);
			    }
			}
		    return str;
		}
	} 	
}();

})(LITHIUM.jQuery);
