/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com 
 * @date: 03-21-09
 */

LITHIUM.Loader = (function() {	
	var functionCache = [];
	var loaded = false;
	return {
		/**
		 * Executes a function after the close of the body 
		 * and all of the Lithium JavaScript has been loaded
		 * onto the page.
		 * 
		 * @param func (Function) The function to execute.
		 */
		"onLoad": function(func) {
			if (typeof func === "function") {
				if (loaded === true) {
					func();
				} else {
					functionCache.push(func);	
				}
			}
		},
		getOnLoadFunctions: function() {
			return functionCache;
		},
		setLoaded: function() {
			loaded = true;
		},
		/**
		 * Whether or not the loaded flag has been set.
		 */
		isLoaded: function() {
			return loaded;	
		}
	} 	
})();
