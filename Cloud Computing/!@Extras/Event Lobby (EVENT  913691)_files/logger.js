/**
 * @author Juan Bernardez
 * 
 * Little utility to safely do console logs
 */

/*global $, _ */

RegPage.Logger = {
	
	/*
	* Prints an error text passed in "errorText" into the console.error output,
	* if exists.
	* @param errorText: Error text
	*/
	error: function(errorText) {
		'use strict';
		if (window.console && window.console.error) {
			window.console.error(errorText);
		}
	},
	
	/*
	* Prints a log text passed in "log" parameter into the console.log output,
	* if exists.
	* @param log: The log text
	*/
	log: function(log){
		'use strict';
		if (window.console && window.console.log) {
			window.console.log(log);
		}
	}
	
};