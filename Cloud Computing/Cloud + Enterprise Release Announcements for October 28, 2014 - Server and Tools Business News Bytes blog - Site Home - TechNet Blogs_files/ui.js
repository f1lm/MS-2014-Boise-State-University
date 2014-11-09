(function($) {

	var api = {
		register: function(context) {
			context.feedWrapper = $(context.feedWrapper);

			$.telligent.evolution.get({
				url: context.feedItemsUrl,
				data: {
					w_feedUrl: context.feedUrl,
					w_pageSize: context.pageSize,
					w_viewType: context.viewType
				},
				success: function(response) {
					context.feedWrapper.html(response);
				}
			});
		}
	};

	if (typeof $.telligent === 'undefined') { $.telligent = {}; }
	if (typeof $.telligent.evolution === 'undefined') { $.telligent.evolution = {}; }
	if (typeof $.telligent.evolution.widgets === 'undefined') { $.telligent.evolution.widgets = {}; }
	$.telligent.evolution.widgets.temporaryRssFeedItemList = api;

}(jQuery));
