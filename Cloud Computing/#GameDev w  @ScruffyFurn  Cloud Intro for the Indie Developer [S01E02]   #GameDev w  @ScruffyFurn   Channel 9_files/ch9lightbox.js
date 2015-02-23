$.fn.ch9lightbox = function (options) {
	var settings = {
		nextNavImgSrc: '/styles/images/wp7/appbar.next.rest.png',
		backNavImgSrc: '/styles/images/wp7/appbar.back.rest.png',
		closeNavImgSrc: '/styles/images/wp7/appbar.close.rest.png',
		loadingAnimationSrc: '/styles/images/ui-anim_basic_16x16.gif'
	};

	var modalId = 'modal';
	var lightboxId = 'lightbox';
	var imageContainerId = 'imageContainer';
	var navContainerId = 'navContainer';
	var navClass = 'nav';
	var nextNavId = 'navNext';
	var backNavId = 'navBack';
	var closeNavId = 'navClose';
	var loadingAnimationId = 'loading';

	var $links = this;
	var $modal = {};
	var $lightbox = {};
	var $imageContainer = {};
	var $navContainer = {};

	var windowHeight = $(window).height();

	$links.each(function () {
		var $link = $(this);
		$link.bind('click', function () {
			var href = $link.attr('href');

			showModal();
			loadLightbox();
			showImage(href, $link);

			return false;
		});
	});

	var createImage = function (imgId, imgSrc) {
		return $('<img />', {
			'id': imgId,
			'src': imgSrc
		});
	};

	var removeLoadingImage = function () {
		var $loadingImage = $('img#' + loadingAnimationId, $imageContainer);

		if ($loadingImage.length > 0)
			$loadingImage.remove();
	};

	var showImage = function (imageUrl, $link) {
		$imageContainer
			.empty()
			.append(createImage(loadingAnimationId, settings.loadingAnimationSrc));

		var $nextLink = $link.next('a');
		$('<img />', {
			'id': 'largeImage'
			})
			.on('load', function () {
				addImageToContainer($(this), $link);
			})
			.bind('click', function () {
				if ($nextLink && $nextLink.length > 0) {
					goNextImage($link);
					return false;
				}
			})
			.attr('src', imageUrl);
	};

	var addImageToContainer = function ($image, $link) {
		removeLoadingImage();

		var imageHeight = $image.get(0).height;
		var imageWidth = $image.get(0).width;

		$lightbox.css({
			'top': ((windowHeight / 2) - (imageHeight / 2) + $(window).scrollTop())
		});

		$imageContainer
			.animate({
				width: imageWidth
			}, 'slow', function () {
				$imageContainer
					.animate({
						height: imageHeight
					}, 'fast', function () {
						$image
							.appendTo($imageContainer)
							.fadeIn('fast');

						getCloseNav()
							.bind('click', function () {
								closeLightbox();
								return false;
							});

						$navContainer = getNavContainer().empty();
						getNav($link);
					});
			});
	};

	var getNav = function ($link) {
		var $nextLink = $link.next('a');
		if ($nextLink && $nextLink.length > 0) {
			var $nextNav = getNextNav()
				.bind('click', function () {
					goNextImage($link);
					return false;
				})
				.bind('mouseover', function () {
					$('img', this).show();
				})
				.bind('mouseout', function () {
					$('img', this).hide();
				});
		}

		var $backLink = $link.prev('a');
		if ($backLink && $backLink.length > 0) {
			var $backNav = getBackNav()
				.bind('click', function () {
					goBackImage($link);
					return false;
				})
				.bind('mouseover', function () {
					$('img', this).show();
				})
				.bind('mouseout', function () {
					$('img', this).hide();
				});
		}
	};

	var getNavContainer = function () {
		var $existing = $('div#' + navContainerId, $imageContainer);
		if ($existing.length == 0)
			return createNavContainer();

		return $existing;
	};

	var createNavContainer = function () {
		return $('<div />', {
			'id': navContainerId
		})
		.appendTo($imageContainer);
	};

	var getNextNav = function ($link) {
		var $existing = $('a#' + nextNavId, $navContainer);
		if ($existing.length == 0)
			return createNextNav($link);

		return $existing;
	};

	var createNextNav = function () {
		return $('<a />', {
			'id': nextNavId,
			'class': navClass
		})
		.append(createImage('', settings.nextNavImgSrc))
		.appendTo($navContainer);
	};

	var getBackNav = function ($link) {
		var $existing = $('a#' + backNavId, $navContainer);
		if ($existing.length == 0)
			return createBackNav($link);

		return $existing;
	};

	var createBackNav = function () {
		return $('<a />', {
			'id': backNavId,
			'class': navClass
		})
		.append(createImage('', settings.backNavImgSrc))
		.appendTo($navContainer);
	};

	var getCloseNav = function () {
		var $existing = $('a#' + closeNavId, $imageContainer);
		if ($existing.length == 0)
			return createCloseNav();

		return $existing;
	};

	var createCloseNav = function () {
		return $('<a />', {
			'id': closeNavId
		})
		.append(createImage('', settings.closeNavImgSrc))
		.appendTo($imageContainer);
	};

	var showModal = function () {
		$modal = getModal()
			.fadeIn('slow', function () {
				$(this).css({
					'opacity': '0.8'
				});
			});
	};

	var getModal = function () {
		var $existing = $('div#' + modalId);
		if ($existing.length == 0)
			return createModal();

		return $existing;
	};

	var createModal = function () {
		$newmodal = $('<div />', {
			'id': modalId
		})
		.bind('click', function () {
			closeLightbox();
		})
		.appendTo('body');

		return $newmodal;
	};

	var loadLightbox = function () {
		$lightbox = getLightbox().fadeIn('slow');
		$imageContainer = getImageContainer();
	};

	var getLightbox = function () {
		var $existing = $('div#' + lightboxId);
		if ($existing.length == 0)
			return createLightbox();

		return $existing.empty();
	};

	var createLightbox = function () {
		var $newlightbox = $('<div />', {
			'id': lightboxId
		})
		.bind('click', function () {
			closeLightbox();
		})
		.appendTo('body');

		return $newlightbox;
	};

	var getImageContainer = function () {
		var $existing = $('div#' + imageContainerId, $lightbox);
		if ($existing.length == 0)
			return createImageContainer();

		return $existing.empty();
	};

	var createImageContainer = function () {
		var $newImageContainer = $('<div />', {
			'id': imageContainerId
		})
		.appendTo($lightbox);

		return $newImageContainer;
	};

	var goNextImage = function ($link) {
		var $nextLink = $link.next('a');
		if ($nextLink && $nextLink.length == 0) return;
		var href = $nextLink.attr('href');
		showImage(href, $nextLink);
	};

	var goBackImage = function ($link) {
		var $backLink = $link.prev('a');
		if ($backLink && $backLink.length == 0) return;
		var href = $backLink.attr('href');
		showImage(href, $backLink);
	};

	var closeLightbox = function () {
		$lightbox.fadeOut('fast');
		$modal.fadeOut('fast');
	};
}