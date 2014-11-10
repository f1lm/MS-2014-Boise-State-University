function validateEmail(email) {
	var re = /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&*+/=?^_`{|}~.]+/;
	return re.test(email);
}
function subscribe(parentElement, source) {
	jQuery(parentElement + ' .subscribe-field').focus(function () {
		jQuery(this).removeClass('error');
		jQuery(parentElement + ' .email-error').fadeOut();
	});

	var dataString = "", email = jQuery(parentElement + ' .subscribe-email'), emailVal = email.val(), nameVal = jQuery(parentElement + ' .subscribe-name').val(), companyVal = jQuery(parentElement + ' .subscribe-company').val(), requiredFieldsFilled = [];
	if (nameVal.length === 0) {
		jQuery(parentElement + ' .subscribe-name').addClass('error');
		jQuery(parentElement + ' .invalid-name-error').fadeIn();
		requiredFieldsFilled[0] = 'false';
	}
	if (emailVal.length === 0) {
		email.addClass('error');
		jQuery(parentElement + ' .required-error').fadeIn();
		requiredFieldsFilled[1] = 'false';
	}
	if (requiredFieldsFilled[0] !== 'false' && requiredFieldsFilled[1] !== 'false') {
		var isFullName = nameVal.indexOf(" ");
		if (isFullName !== -1) {
			var firstNamePart = nameVal.substr(0, isFullName), lastNamePart = nameVal.substr(isFullName + 1);
			dataString = 'firstname=' + firstNamePart + '&lastname=' + lastNamePart + '&company=' + companyVal + '&email=' + encodeURIComponent(emailVal) + '&subscriptionPage=' + window.location.href;
		} else {
			dataString = 'firstname=' + nameVal + '&company=' + companyVal + '&email=' + encodeURIComponent(emailVal) + '&subscriptionPage=' + window.location.href;
		}
		if (validateEmail(emailVal)) {
			email.removeClass('error');
			jQuery(parentElement + ' .email-error').fadeOut();
			jQuery(parentElement + ' .loader').removeClass('hide-loader');
			jQuery(parentElement + ' .subscribe-btn').fadeOut('fast', function () {jQuery(parentElement + ' .loader').fadeIn('fast'); });
			jQuery.ajax({
				type: 'POST',
				url: '/blog/wp-content/themes/lespaul-child-theme/marketo.php',
				data: dataString,
				success: function (data) {
					if (data.indexOf('Email not DEA') !== -1) {
						jQuery(parentElement + ' .subscribe-form').html('<div class="subscribe-message"></div>');
						jQuery(parentElement + ' .subscribe-message').html('<h3>Thank you for subscribing!</h3><p>We just sent you an email with the links to download the free e-Books.</p>');
						_gaq.push(['_trackEvent', 'Blog Subscription', 'Subscribed', source]);
						if (source === 'Popup') {
							setTimeout(function () {jQuery('#darkbackground').fadeOut(); }, 2500);
						}
					}
					if (data.indexOf('Email is DEA') !== -1) {

						email.addClass('error');
						jQuery(parentElement + ' .dea-email-error').fadeIn();
						jQuery(parentElement + ' .loader').fadeOut('fast', function () {jQuery(parentElement + ' .subscribe-btn').fadeIn('fast'); });
						jQuery(parentElement + ' .loader').addClass('hide-loader');
					}

				},
				error: function () {
					jQuery(parentElement + ' .subscribe-form').html('<div class="subscribe-message"></div>');
					jQuery(parentElement + ' .subscribe-message').html('<h3>Sorry buy something went wrong, please try again later.</h3>');
					setTimeout(function () {jQuery('#darkbackground').fadeOut(); }, 2500);
				}
			});
			return false;
		} else {
			email.addClass('error');
			jQuery(parentElement + ' .invalid-email-error').fadeIn();
		}
	}
}
/*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path], domain)
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/
var docCookies = {
	getItem: function (sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	},
	removeItem: function (sKey, sPath, sDomain) {
		if (!sKey || !this.hasItem(sKey)) { return false; }
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
		return true;
	},
	hasItem: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: /* optional method: you can safely remove it! */ function () {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};
function createUTMCookie(qParamName) {
	var qParamValue = jQuery.getUrlVar(qParamName);
	if (qParamValue !== "" && qParamValue !== undefined) {
		docCookies.setItem(qParamName, qParamValue, 86400, "/");
	}
};
jQuery.extend({
	getUrlVars: function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
		for (var i=0; i< hashes.length;i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name) {
		return jQuery.getUrlVars()[name];
	}
});
jQuery(document).ready(function ($) {
	var $root = $('html, body');
	var target = $(document.location.hash);
	if (target.length) {
		console.log("Moo");
		$root.animate({
			scrollTop: target.offset().top - 30
		}, 50);
	}
	$('.single-post .post .wp-post-image.attachment-post-single').prependTo('.single-post .post>p:first-of-type');
	$('#main-heading h1.entry-title').prependTo('.single-post .post');
	$('.single-post #main-heading .pane').html('<h2 class="subtitle"><a href="/blog/">Agile Dev &amp; Test Environments With Nested Virtualization</a></h2>');
	$('.home #main-heading .pane').html('<h1 class="subtitle"><a href="/blog/">Agile Dev &amp; Test Environments With Nested Virtualization</a></h1>');
	$('.logo a').attr('href', 'http://www.ravellosystems.com').attr('title', 'Ravello Systems');
	$('.single .meta-article.meta-bottom').insertBefore('#bottom-ctas-container');
	$('.logo a img').attr('alt', 'Ravello Systems').attr('title', 'Ravello Systems');
	$('.modal-video .close').click(function () {
		$(this).siblings('iframe').attr('src', '');
		//$('body').removeClass('noscroll');
	});
	$('.modal-video-link').click(function () {
		var href = $(this).attr('href'), src = $(href).find('.video_url_hidden').text();
		$(href).find('iframe').attr('src', src);
		//jQuery('body').addClass('noscroll');
	});
	$('.yarpp-related-none').remove();

	$('#video-cta').click(function () {
		var sidebarVideo = $('#sidebar-video')
		sidebarVideo.modal('hide');
		sidebarVideo.find('iframe').attr('src', '');
		$('#hp_register_button').modal('show');
	});
	$('.modal-video').on('hidden.bs.modal', function (e) {
		$(this).find('iframe').attr('src', '');
	});

	var metaBottom = $('footer.meta-article.meta-bottom');
	if (metaBottom.length > 0) {
		metaBottom.insertBefore($('.single-post-about'));
		$('.social-links').insertBefore(metaBottom);
	} else {
		$('.social-links').insertBefore($('.single-post-about'));
	}

	$('.textwidget .subscribe-btn').click(function () {
		subscribe('.textwidget', 'Sidebar');
	});
	$('#newsletter-popup .subscribe-btn').click(function () {
		subscribe('#newsletter-popup', 'Popup');
	});
	function timedPopup () {
		if  (!docCookies.getItem('newsletter_popup') && (window.location.pathname !== '/blog/' && window.location.pathname !== '/blog')) {
			$('#newsletter-popup').modal('show');
			docCookies.setItem('newsletter_popup', 'popup-seen', 172800, "/");
		}
	}
	setTimeout(timedPopup, 15000);

	//Free Trial Popup Opened
	$('a[href="#hp_register_button"]').click(function () {
		var source = window.location.href;
		var id = $(this).attr('id');
		if (!!id) {
			id = id.replace(/-/g, " ");
			source = source + ' (' + id + ')';
		}
		_gaq.push(['_trackEvent', 'Free Trial Popup', 'Opened', source]);
	});

	//Demo Request Popup Opened
	$('a[href="#live_demo_button"]').click(function () {
		var source = window.location.href;
		var id = $(this).attr('id');
		if (!!id) {
			id = id.replace(/-/g, " ");
			source = source + ' (' + id + ')';
		}
		_gaq.push(['_trackEvent', 'Demo Request Popup', 'Opened', source]);
	});
	/*Save UTM Params in cookies*/
	createUTMCookie("utm_source");
	createUTMCookie("utm_medium");
	createUTMCookie("utm_content");
	createUTMCookie("utm_campaign");
	docCookies.setItem('currentPage', unescape(window.location.href), 86400, "/");

	function getViewportHeight() {
		var height = window.innerHeight; // Safari, Opera
		var mode = document.compatMode;

		if ( (mode || !$.support.boxModel) ) { // IE, Gecko
			height = (mode == 'CSS1Compat') ?
				document.documentElement.clientHeight : // Standards
				document.body.clientHeight; // Quirks
		}

		return height;
	}

	$(window).scroll(function () {
		var vpH = getViewportHeight(),
			scrolltop = (document.documentElement.scrollTop ?
				document.documentElement.scrollTop :
				document.body.scrollTop),
			elems = [];

		// naughty, but this is how it knows which elements to check for
		$.each($.cache, function () {
			if (this.events && this.events.inview) {
				elems.push(this.handle.elem);
			}
		});

		if (elems.length) {
			$(elems).each(function () {
				var $el = $(this),
					top = $el.offset().top,
					height = $el.height(),
					inview = $el.data('inview') || false;

				if (scrolltop > (top + height) || scrolltop + vpH < top) {
					if (inview) {
						$el.data('inview', false);
						$el.trigger('inview', [ false ]);
					}
				} else if (scrolltop < (top + height)) {
					if (!inview) {
						$el.data('inview', true);
						$el.trigger('inview', [ true ]);
					}
				}
			});
		}
	});
	$(function () {
		$(window).scroll();
	});
	$('#footer').bind('inview',function(event,visible){
		if (visible === true) {
			$('.side-banner-widget').fadeOut();
		} else {
			$('.side-banner-widget').fadeIn();
		}
	});
	var vph = window.innerHeight;
	function resizeMainFold() {
		vph = window.innerHeight;
		if (vph >= 715) {
			$('.sidebar-banner').css({'height': vph - 70 + 'px'});
			$('.fixed-sidebar-banner, .side-banner-widget').width($('.sidebar .widget:first-child').width());
		} else {
			$('.sidebar-banner').css({'height': '640px'});
			$('.sidebar-banner-widget').removeClass('fixed-sidebar-banner');
		}

	}
	resizeMainFold();
	window.onresize = function(event) {
		resizeMainFold();
	};
	var sideBannerTop = $(".side-banner-widget").offset().top - 70;
	$(window).on('scroll', function () {
		if (sideBannerTop <= $(window).scrollTop() && vph >= 715) {
			$('.side-banner-widget').addClass('fixed-sidebar-banner');
			$('.fixed-sidebar-banner, .side-banner-widget').width($('.sidebar .widget:first-child').width());
		} else {
			$('.side-banner-widget').removeClass('fixed-sidebar-banner');
		}
	})


	/*Gogle Analytics Events*/
	$('.sidebar-banner.vmware-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'VMware']);
	});

	$('.sidebar-banner.openstack-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'Openstack']);
	});

	$('.sidebar-banner.android-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'Android']);
	});

	$('.sidebar-banner.devops-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'DevOps']);
	});

	$('.sidebar-banner.dev-test-infra-cloud-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'Dev/Test Infra Cloud']);
	});

	$('.sidebar-banner.nested-virtualization-banner').click(function(){
		_gaq.push(['_trackEvent', 'Blog: Sidebar Banner', 'Clicked', 'Nested Virtualization']);
	});


	$('.single-post-about .cta').click(function () {
		_gaq.push(['_trackEvent', 'Blog: About Us Video', 'CTA', 'Clicked']);
	});
	$('.yarpp-related li a').click(function () {
		_gaq.push(['_trackEvent', 'Blog: Related Posts Link', 'Link', 'Clicked']);
	});
	$('.single-post-about a.modal-video-link').click(function () {
		_gaq.push(['_trackEvent', 'Blog: About Us Video', 'Video', 'Opened']);
	});
	$('.single-post #content .main p a[href*="http://www.ravellosystems.com"]').click(function () {
		_gaq.push(['_trackEvent', 'Blog: Link in Post Content', 'Clicked', 'Link to Page on Ravello Site/Blog']);
	});
	$('.single-post #content .main p a.register-link-in-post').click(function () {
		_gaq.push(['_trackEvent', 'Blog: Registration Link in Post Content', 'Clicked', window.location.href]);
	});
	$('.single-post #content .main p a').not('[href*="http://www.ravellosystems.com"]').click(function () {
		_gaq.push(['_trackEvent', 'Blog: Link in Post Content', 'Clicked', 'Link to External Page']);
	});
	setTimeout("_gaq.push(['_trackEvent','Profitable Engagement: At Least 1 Minute on Page', 'Blog', window.location.href])", 60000);

	$('.sidebar-cats a').click(function () {
		var linkText = $(this).html();
		_gaq.push(['_trackEvent', 'Blog: Sidebar Navigation', linkText, window.location.href]);
	});
});

