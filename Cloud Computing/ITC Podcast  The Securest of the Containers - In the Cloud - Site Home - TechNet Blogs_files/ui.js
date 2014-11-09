(function($) {

	var setupListDetailLinks = function(context) {
			// filter view links
			$(".view-type span.filter-option a", context.wrapper).bind('click', function(e){
				var link = $(e.target);

				// remove current 'selected' classes
				link.parents('div.view-type').find('span').removeClass('selected');
				// add selected to clicked link
				link.parent().addClass('selected');

				// get the type of view being shown from the css class name
				var filterType = link.attr('class').split(' ')[1].split('-')[1];
				var url = '';

				// determine what ajax url endoint to use
				if(filterType === 'list') {
					url = context.listUrl;
				} else if(filterType === 'detail') {
					url = context.detailUrl;
				}

				// load the ajax response into the list
				$.telligent.evolution.get({
					url: url,
					data: { w_viewType: context.viewType },
					success: function(response) {
						$('ul.content-list', context.wrapper).html(response);
					}
				})

				return false;
			});
		};

	var api = {
		register: function(context) {
			context.wrapper = $(context.wrapper);
			setupListDetailLinks(context);
		}
	};

	if (typeof $.telligent === 'undefined') { $.telligent = {}; }
	if (typeof $.telligent.evolution === 'undefined') { $.telligent.evolution = {}; }
	if (typeof $.telligent.evolution.widgets === 'undefined') { $.telligent.evolution.widgets = {}; }
	$.telligent.evolution.widgets.blogPostList = api;

})(jQuery);
