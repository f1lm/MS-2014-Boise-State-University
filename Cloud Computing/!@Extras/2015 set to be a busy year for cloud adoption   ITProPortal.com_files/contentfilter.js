var glList;

// You can wrap in self-invoking function and turn jQuery into $
// Makes it a bit easier to read I think...
(function($) {

	// I think that because we have filter & infinite scroll functions here
	// maybe we should give this object a general name like "List" or "Grid"? (maybe rename the whole plugin?)
	var List = {
		lock: false,
		limit: 0,
		$filter: $('div.grid-filter'),
		$inputWrap: $('.grid-filter .input-wrap'),
		$pagination: $('div.pagination'),
		$pageNum: 1,
		init: function() {
			List.hideElements();
			List.observeScroll();
			List.observeForm();
			List.observeResize();
			if (List.$filter.find('input[type=checkbox]:checked').length)
				List.clearButton();
			
			glList = this;
		},
		observeResize: function() {
			$(window).resize(function() {
				if (List.$pageNum < 2) {
					var num = $('.grid-post').length;
					if ($('.grid-mpu1').hasClass('double')) {
						num++;
					}

					if (num % 2 !== 0) {
						var url = List.$pagination.find('a.next').attr('href');
						if (!url) {
							return;
						}
						//$('.grid-post:last').hide();
					}
				}
			});
		},
		hideElements: function() {
			if ($('header.archive-header').length) {
				// don't hide standard pagination for archive pages!
				return false;
			}
			List.$pagination.hide();
			List.$filter.find('.submit').hide();
		},
		observeForm: function() {

			// prevent all checkboxes from passing as variables
			// these ids will be joined and added as single variables
			List.$filter.find('input[type=checkbox]').removeAttr('name');

			// add selected class to divs which contain checked checkboxes
			List.$inputWrap.each(function() {
				if ($(this).find('input').prop('checked'))
					$(this).addClass('selected');
			});

			// Check/uncheck checkbox on div click
			List.$inputWrap.on('click', function() {
				if($(this).hasClass('anchor')){
					return;
				}
				
				var currentList = $(this).parent();
				currentList.find('input').prop('checked', false);
				
				var checkbox = $(this).find('input');
				if (checkbox.prop('checked')) {
					checkbox.prop('checked', false);
				} else {
					checkbox.prop('checked', true);
				}
				List.submitForm();
			});

			List.$filter.find('input[type=checkbox], input[type=radio]').on('click', function() {
				List.submitForm();
			});

		},
		clearForm: function() {
			$('input[type=checkbox]').attr('checked', false);
			List.submitForm();
		},
		clearButton: function() {

			List.$filter.append('<div class="filter-clear"><div class="filter-set-header"><span>X Reset Filter</span></span></div>');

			$('.filter-clear').on('click', function() {
				List.clearForm();
			});

		},
		submitForm: function() {
			var ids = {};
			List.$filter.find('form input[type=checkbox]:checked').each(function() {
				// if variable name is not specified use default 'filter' name
				var fname = $(this).attr('data-filter-name');
				if (typeof fname === 'undefined') {
					fname = 'filter';
				}

				if (typeof ids[fname] === 'undefined') {
					ids[fname] = [];
				}

				ids[fname].push($(this).val());
			});

			var count = 0;

			List.$filter.find('form input[type=radio]:checked').each(function() {
				// there may be a radio inputs also. Need to count them to make 
				// the calculated number correct
				count++;
			});

			// adding hidden fields to pass IDS in more user-friendly way
			var separator = '--';
			if (List.$filter.find('form').attr('data-separator')) {
				separator = List.$filter.find('form').attr('data-separator');
			}
			for (var filter in ids) {
				List.$filter.find('form').append($('<input name="' + filter + '" type="hidden">'));
				List.$filter.find('input[name=' + filter + ']').val(ids[filter].join(separator));
				count++;
			}

			if (count == 0) {
				// disable inputs if there is no parameters. prevents from passing empty variables
				List.$filter.find('form input').attr('disabled', 'disabled');
				List.$filter.find('form input[data-never-disable=1]').removeAttr('disabled');
			}

			if (!List.$filter.find('form').hasClass('friendly-url')) {
				// default form submit
				return List.$filter.find('form').submit();
			}
			
			// this form can be passed with more user-friendly urls
			// instead of creating query string we can add every single
			// form field into URL
			// because of the way how URL rewrites work in wordpress
			// the order of parameters DOES matter

			var url = List.$filter.find('form').attr('action');
			var query = '/';

			// dont' pass ftype parameters, it is detected on server side
			List.$filter.find('form input[name=ftype]').remove();

			List.$filter.find('form input').each(function() {
				if (jQuery(this).attr('type') == 'radio' && !jQuery(this).is(':checked')) {
					return;
				}
				if (jQuery(this).attr('name')) {
					query += jQuery(this).attr('name') + '/' + jQuery(this).val() + '/';
				}
			});
			if (url.substr(url.length - 1) == '/') {
				url = url.substr(0, url.length - 1);
			}
			if (count == 0) {
				// don't want to pass empty parameter's values
				document.location.href = url;
			} else {
				document.location.href = url + query;
			}



		},
		observeScroll: function() {
			var margin = 60;
			$(window).scroll(function() {
				if (!List.lock) {
					if ($(document).height() - $(window).height() - $(window).scrollTop() <= margin) {
						if( List.limit < 3 ) {
							List.loadNextPage();
							List.limit++;
						}
						else {
							var url = List.$pagination.find('a.next').attr('href');
							if (url)
								$('.view-more').show();
							else
								$('.view-more').hide();
						}
					}
				}
			});
		},
		loadNextPage: function() {
			var url = List.$pagination.find('a.next').attr('href');
			if (!url) {
				$('.view-more').hide();
				// checking if it isn't article page
				if (!jQuery('article.post').length) {
					return;
				}
				// pagination doesn't exists (url variable is empty).
				// we alse sure that this is article page
				// need to load home page:
				return List.loadHomePage();
			}
			
			List.lock = true;
			$('main.grid').append('<div class="grid-loader">Loading...</div>');
			List.$pageNum++;
			$.ajax({
				url: url, 
				type: 'GET',
				processData: false
			}).done(function(res) {
				var wrapper = $('<div>');
				wrapper.append(res);
				var content = $(wrapper).find('div.grid-post:first').parent();
				var nextUrl = $(wrapper).find('div.pagination a.next').attr('href');
				content.find('.pagination').remove();

				$('.grid-loader').remove();
				var wasHidden = $('.grid-post:last').is(':hidden');
				$('.grid-post:last').show();
				if(wasHidden){
					content.find('.grid-post:last').hide();
				}
				$('main.grid').append(content.children());
				ITPP.LumaAds.onScrollLoad();

				if (nextUrl) {
					List.$pagination.find('a.next').attr('href', nextUrl);
				} else {
					List.$pagination.find('a.next').attr('href', '');
				}
				List.lock = false;
			});
		},
		loadHomePage: function() {
			if (List.homePageLoaded) {
				return;
			}
			var url = Inline.base_url + '/ajax/';

			// to prevent loading home page again when there is no next page link
			// i.e. we reach the last page by scrolling and next page URL is empty
			List.homePageLoaded = true;


			List.lock = true;

			// adding CSS clear property to fix layout
			// TODO Fix the layout, this should be done in different way
			var loader = $('<div class="grid-loader">Loading...</div>');


			$('#main').append(loader);

			// fetching the home page...
			$.ajax({
				url: url, 
				type: 'GET',
				processData: false
			}).done(function(res) {		
				var p = res.indexOf('<section class="featured">');
				// remove anything before featured ones 
				// it is only to remove jetpack scripts which are added
				// to the top of body and causes errors because they use
				// document.write while content is appended by jquery
				if(p!==-1){
					res = res.substr(p);
				}
				var wrapper = $('<div class="entry-home">');
				wrapper.append(res);

				// TODO Fix the layout, this should be done in different way
				//wrapper.find('.featured').css('clear', 'both');

				// preparing pagination variables to be sure that regular loadNextPage
				// method will be able to deal with next scroll event after reaching bottom
				var nextUrl = wrapper.find('div.pagination a.next').attr('href');
				nextUrl = nextUrl.replace('ajax/', '');

				// hidding all loaders
				$('.grid-loader').remove();
				$('#main').append(wrapper);
				ITPP.LumaAds.onScrollLoad();

				// reinit List class variables
				// because we sure now that pagination exists 
				List.$pagination = $('div.pagination');

				if (nextUrl) {
					List.$pagination.find('a.next').attr('href', nextUrl);
				} else {
					List.$pagination.find('a.next').attr('href', '');
				}


				List.hideElements();
				ITPP.Trending.init();
				List.lock = false;
			});

		}

	};

	$(function() {
		List.init();
	});
})(jQuery);

// Note - this has been added in as $('.view-more').click( function() {
//				List.loadNextPage();
//			});
// does not register on the article pages causing a bug. An A link works fine.
function loadViewMore() {
	glList.loadNextPage();
}