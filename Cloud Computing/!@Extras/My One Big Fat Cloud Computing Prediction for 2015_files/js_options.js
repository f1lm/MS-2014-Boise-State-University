var forbes = (function( app ) {

	/* define new module */
	app.js_options = (function(){

		// set up private variables
		var _welcome_ad_disable = false; //default variable is false
		var user_logged_in = "fuid";
		
		if(document.cookie.indexOf(user_logged_in)>=0)		{ //User is logged in he will not see the welcome ad
			_welcome_ad_disable= true;
		}
		
		return{
			welcome_ad_disable:_welcome_ad_disable
		};
	}());

	return app; /* return augmented app object */

}( forbes || {})); /* import app if exists, or create new; */
