/*
	Global blogs js for headers and footers.
*/

(function($) {
	$(document).ready(function() {
		/* Reviews Category Dropdown */
		$('#pnav_list_test a.primaryLink').bind('mouseenter', function() {
			// hide all the menus that may be showing already
			$('.dropdownMenu').hide();
			$(this).parentsUntil('#pnav_list_test').find('.dropdownMenu').show();
			$(this).addClass('over');
		});
		// Actions on leaving the dropdown
		$('#pnav_list_test li .dropdownMenu').bind('mouseleave', function() {
			$(this).delay(500).fadeOut(200);
			$(this).parentsUntil('#pnav_list_test').find('a.primaryLink').removeClass('over');
		});

		/* Top 3 */
		var tallestHeight = 0;
		var top3 = $('body.top-3 div.top-3-product ul.top-3-details').not('body.top-3 div.top-3-product.product-4 ul.top-3-details');
		top3.each(function() {
			if ($(this).height() > tallestHeight) {
				tallestHeight = $(this).height();
			}
		});
		top3.height(tallestHeight).children('li.rating-review-link').addClass('sticky');

		/* Reviews */
		// @todo according to jslint resizeImage and displayPosts are never called? do we need them?
		function resizeImage(img, new_width, new_height) {
			if (img.width === new_width && img.height === new_height) {
				img.className = 'prod_review_img_on';
				return;
			} else {
				var h, w;
				if ($(img).height() > $(img).width()) {
					h = new_height;
					w = Math.ceil($(img).width() / $(img).height() * new_height);
				} else {
					w = new_width;
					h = Math.ceil($(img).height() / $(img).width() * new_width);
				}
				$(img).css({
					height: h,
					width: w
				});
				img.className = 'prod_review_img_offset';
			}
		}

		// top three widget toggly oggily
		if ($('#top3-widget').length) {

			$('.toggle-nav').click(function() {
				$(this).siblings('.reviews-subnav').toggleClass('visually-hidden-only');
			});

		}

		// reviews subcategory toggly oggily
		if ($('#cat-select').length) {
			$('#cat-select').click(function(e) {
				e.preventDefault();
				$(this).find('.drop-down').toggleClass('visually-hidden-only');
			});
		}


	});
})(jQuery);