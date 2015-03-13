jQuery(document).ready(function() {
	define('jquery-accessibility-menu-merged', ['/__data/assets/js_file/0003/206292/jquery-accessibleMegaMenu-merged.js'], function() {
		var $j = jQuery.noConflict(true);
		return $j; // requirejs will cache the returned value
	});

	require(['jquery-accessibility-menu-merged'], function($j) {
		/* ------------ */
		// Please put all jQuery 1.11.1 scripts in here

		$j(".mainnav").accessibleMegaMenu({

			/* prefix for generated unique id attributes, which are required 
           to indicate aria-owns, aria-controls and aria-labelledby */
			uuidPrefix: "accessible-megamenu",

			/* css class used to define the megamenu styling */
			menuClass: "nav-menu",

			/* css class for a top-level navigation item in the megamenu */
			topNavItemClass: "nav-item",

			/* css class for a megamenu panel */
			panelClass: "sub-group",

			/* css class for a group of items within a megamenu panel */
			panelGroupClass: "sub-menu",

			/* css class for the hover state */
			hoverClass: "hover",

			/* css class for the focus state */
			focusClass: "focus",

			/* css class for the open state */
			openClass: "open"
		});
		/* ------------ */
	});
}); // Document Ready End