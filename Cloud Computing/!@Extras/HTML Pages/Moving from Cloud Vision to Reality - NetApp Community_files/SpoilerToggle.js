;(function($LITH) {

LITHIUM.SpoilerToggle = function() {
	var opened = "open";

	$LITH("." + LITHIUM.Css.BASE_CONTENT).on("click", "." + LITHIUM.Css.BASE_SPOILER_LINK, function() {
		var link = $LITH(this);
		var container = link.closest("." + LITHIUM.Css.BASE_SPOILER_CONTAINER).find("." + LITHIUM.Css.BASE_SPOILER_CONTENT).first();
		if (link.hasClass(opened)) {
			container.hide();
			link.removeClass(opened);
		} else {
			container.show();
			link.addClass(opened);
		}
		return false;
	});
};

})(LITHIUM.jQuery);

LITHIUM.SpoilerToggle();
