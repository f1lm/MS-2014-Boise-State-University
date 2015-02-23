/**
 * Lithium Technologies
 * @author: Adam Ayres
 * 
 * Attempt to Sandbox the inclusion of the jQuery instance included
 * by Lithium and allow third party jQuery instances that may have been 
 * added before Lithium's.  This does not handle the case where
 * jQuery is contributed in the combined scripts in the plugin.
 */

;(function() { 

LITHIUM.Sandbox = function() {	
	/*
	 * Store the values of window.jQuery and window.$ before we add our jQuery
	 * in case another jQuery has been added to the page, then we can restore
	 * them once we have loaded all of our JS libraries (but before we run our
	 * script block);
	 */
	var localjQuery = window.jQuery;
	var local$ = window.$;
	
	return {
		restore: function() {						
			/*
			 * Only replace the objects if they orginally had values
			 */			
			window.jQuery = (localjQuery !== undefined) ? localjQuery : window.jQuery;
			window.$ = (local$ !== undefined) ? local$ : window.$; 
		}
	};
}();
	
})();
