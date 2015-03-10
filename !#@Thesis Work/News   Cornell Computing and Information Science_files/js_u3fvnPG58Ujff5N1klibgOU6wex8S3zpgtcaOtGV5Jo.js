(function($) {

    Drupal.behaviors.vanilla = {
        attach: function(cx, s) {
            $(window).load(function() {
                $('html').addClass('loaded');
            });
        }
    }

})(jQuery);
;
(function($) {

    Drupal.behaviors.vanillaForms = {
        attach: function(cx, s) {

            if (!!$.fn.customFileInput) {
                $('input[type="file"]').customFileInput();
            }

            if (!!$.fn.placeholder) {
                $('input, textarea').placeholder();
            }

            $('form').submit(function() {
                $(this).addClass('processing');
            });
        }
    }

})(jQuery);
;
/**
 * Cross-Browser console.log() Wrapper
 *
 * Version 2.0.0, 2013-10-20
 * By Craig Patik
 * https://github.com/patik/console.log-wrapper/
 */
Function.prototype.bind&&/^object$|^function$/.test(typeof console)&&typeof console.log=="object"&&typeof window.addEventListener=="function"&&["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(method){console[method]=this.call(console[method],console)},Function.prototype.bind);window.log||(window.log=function(){var i,sliced,args=arguments,isIECompatibilityView=!1,isIE8=function _isIE8(){return(!Function.prototype.bind||Function.prototype.bind&&typeof window.addEventListener=="undefined")&&typeof console=="object"&&typeof console.log=="object"};log.history=log.history||[];log.history.push(arguments);log.detailPrint&&log.needsDetailPrint&&function(){var ua=navigator.userAgent,winRegexp=/Windows\sNT\s(\d+\.\d+)/;console&&console.log&&/MSIE\s(\d+)/.test(ua)&&winRegexp.test(ua)&&parseFloat(winRegexp.exec(ua)[1])>=6.1&&(isIECompatibilityView=!0)}();if(isIECompatibilityView||typeof console.log=="function"){sliced=Array.prototype.slice.call(args);if(log.detailPrint&&log.needsDetailPrint){console.log("-----------------");args=log.detailPrint(args);i=0;while(i<args.length){console.log(args[i]);i++}}else sliced.length===1&&typeof sliced[0]=="string"?console.log(sliced.toString()):console.log(sliced)}else if(isIE8())if(log.detailPrint){args=log.detailPrint(args);args.unshift("-----------------");i=0;while(i<args.length){Function.prototype.call.call(console.log,console,Array.prototype.slice.call([args[i]]));i++}}else Function.prototype.call.call(console.log,console,Array.prototype.slice.call(args));else if(!document.getElementById("firebug-lite")){(function(){var script=document.createElement("script");script.type="text/javascript";script.id="firebug-lite";script.src="https://getfirebug.com/firebug-lite.js";document.getElementsByTagName("HEAD")[0].appendChild(script)})();setTimeout(function(){window.log.apply(window,args)},2e3)}else setTimeout(function(){window.log.apply(window,args)},500)});
;
/**
 * --------------------------------------------------------------------
 * jQuery customfileinput plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
(function( $ ){
	$.fn.customFileInput = function(){
		//apply events and styles for file input element
		var fileInput = $(this)
			.addClass('customfile-input') //add class for CSS
			.mouseover(function(){ upload.addClass('customfile-hover'); })
			.mouseout(function(){ upload.removeClass('customfile-hover'); })
			.focus(function(){
				upload.addClass('customfile-focus');
				fileInput.data('val', fileInput.val());
			})
			.blur(function(){
				upload.removeClass('customfile-focus');
				$(this).trigger('checkChange');
			 })
			 .bind('disable',function(){
				fileInput.attr('disabled',true);
				upload.addClass('customfile-disabled');
			})
			.bind('enable',function(){
				fileInput.removeAttr('disabled');
				upload.removeClass('customfile-disabled');
			})
			.bind('checkChange', function(){
				if(fileInput.val() && fileInput.val() != fileInput.data('val')){
					fileInput.trigger('change');
				}
			})
			.bind('change',function(){
				//get file name
				var fileName = $(this).val().split(/\\/).pop();
				//get file extension
				var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();
				//update the feedback
				uploadFeedback
					.text(fileName) //set feedback text to filename
					.removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
					.addClass(fileExt) //add file extension class
					.data('fileExt', fileExt) //store file extension for class removal on next change
					.addClass('customfile-feedback-populated'); //add class to show populated state
				//change text of button
				uploadButton.text('Change');
			})
			.click(function(){ //for IE and Opera, make sure change fires after choosing a file, using an async callback
				fileInput.data('val', fileInput.val());
				setTimeout(function(){
					fileInput.trigger('checkChange');
				},100);
			});
			
		//create custom control container
		var upload = $('<div class="customfile"></div>');
		//create custom control button
		var uploadButton = $('<span class="customfile-button" aria-hidden="true">Browse</span>').appendTo(upload);
		//create custom control feedback
		var uploadFeedback = $('<span class="customfile-feedback" aria-hidden="true">No file selected...</span>').appendTo(upload);
		
		//match disabled state
		if(fileInput.is('[disabled]')){
			fileInput.trigger('disable');
		}


		//on mousemove, keep file input under the cursor to steal click
		upload
			.mousemove(function(e){
				fileInput.css({
					'left': e.pageX - upload.offset().left - fileInput.outerWidth() + 20, //position right side 20px right of cursor X)
					'top': e.pageY - upload.offset().top - $(window).scrollTop() - 3
				});
			})
			.insertAfter(fileInput); //insert after the input

		fileInput.appendTo(upload);

		//return jQuery
		return $(this);
	};
})( jQuery );
;
/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (exception) {}
	}

}(this, document, jQuery));
;
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||function(a){"use strict";var c,d=a.documentElement,e=d.firstElementChild||d.firstChild,f=a.createElement("body"),g=a.createElement("div");return g.id="mq-test-1",g.style.cssText="position:absolute;top:-100em",f.style.background="none",f.appendChild(g),function(a){return g.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',d.insertBefore(f,e),c=42===g.offsetWidth,d.removeChild(f),{matches:c,media:a}}}(document);

/*! Respond.js v1.3.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(a){"use strict";function x(){u(!0)}var b={};if(a.respond=b,b.update=function(){},b.mediaQueriesSupported=a.matchMedia&&a.matchMedia("only all").matches,!b.mediaQueriesSupported){var q,r,t,c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=c.getElementsByTagName("base")[0],l=j.getElementsByTagName("link"),m=[],n=function(){for(var b=0;l.length>b;b++){var c=l[b],d=c.href,e=c.media,f=c.rel&&"stylesheet"===c.rel.toLowerCase();d&&f&&!h[d]&&(c.styleSheet&&c.styleSheet.rawCssText?(p(c.styleSheet.rawCssText,d,e),h[d]=!0):(!/^([a-zA-Z:]*\/\/)/.test(d)&&!k||d.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&m.push({href:d,media:e}))}o()},o=function(){if(m.length){var b=m.shift();v(b.href,function(c){p(c,b.href,b.media),h[b.href]=!0,a.setTimeout(function(){o()},0)})}},p=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),g=d&&d.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c;b.length&&(b+="/"),i&&(g=1);for(var j=0;g>j;j++){var k,l,m,n;i?(k=c,f.push(h(a))):(k=d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),m=k.split(","),n=m.length;for(var o=0;n>o;o++)l=m[o],e.push({media:l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:f.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},s=function(){var a,b=c.createElement("div"),e=c.body,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",e||(e=f=c.createElement("body"),e.style.background="none"),e.appendChild(b),d.insertBefore(e,d.firstChild),a=b.offsetWidth,f?d.removeChild(e):e.removeChild(b),a=t=parseFloat(a)},u=function(b){var h="clientWidth",k=d[h],m="CSS1Compat"===c.compatMode&&k||c.body[h]||k,n={},o=l[l.length-1],p=(new Date).getTime();if(b&&q&&i>p-q)return a.clearTimeout(r),r=a.setTimeout(u,i),void 0;q=p;for(var v in e)if(e.hasOwnProperty(v)){var w=e[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?t||s():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?t||s():1)),w.hasquery&&(z&&A||!(z||m>=x)||!(A||y>=m))||(n[w.media]||(n[w.media]=[]),n[w.media].push(f[w.rules]))}for(var C in g)g.hasOwnProperty(C)&&g[C]&&g[C].parentNode===j&&j.removeChild(g[C]);for(var D in n)if(n.hasOwnProperty(D)){var E=c.createElement("style"),F=n[D].join("\n");E.type="text/css",E.media=D,j.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(c.createTextNode(F)),g.push(E)}},v=function(a,b){var c=w();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},w=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}();n(),b.update=n,a.addEventListener?a.addEventListener("resize",x,!1):a.attachEvent&&a.attachEvent("onresize",x)}})(this);
;
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

		Drupal.behaviors.awpCISMenu = {
				attach: function(cx, s) {
					var vph = $(window).height();
					var header = $('#header');
					var menu = $('#block-system-main-menu > .menu');
					var buttonHTML = '<button class="menu-toggle">menu</button>';

					// Mobile Menu
					menu
						.prepend(buttonHTML)
						.addClass('closed')
						.children('li').each(function(i){
							$(this).css({
									transitionDelay: (i * 0.05) + "s",
									transitionTimingFunction: "cubic-bezier(.4, 0, 0, 1)"
							});
						});
					$('.menu-toggle').on('click', function(){
						if ( menu.hasClass('closed') ){
							menu
								.removeClass('closed')
						} else {
							menu
								.addClass('closed')
						}
					});

					// Load images on desktop only
					if (window.matchMedia("(min-width: 960px)").matches) {
						$('.view-megamenus img').each(function(){
							$(this).attr('src', $(this).attr('data-src'));
						});
					}

					// Megamenu
					$(document).click(function(e){
						$('#block-system-main-menu > .menu > .menu--expanded').removeClass('active-megamenu');
						$('.view-homepage-intro').removeClass('megamenu-open');
					});
					$('#block-system-main-menu > .menu > .menu--expanded').click(function(e){
						if (window.matchMedia("(min-width: 960px)").matches) {
							e.stopPropagation(); // don't close megamenu with above function
							if ($('#block-system-main-menu > .menu > .menu--expanded > a').is(e.target)){
								e.preventDefault(); // prevent going to url only if the main menu link is clicked
								$(this).siblings().removeClass('active-megamenu');
								$(this).toggleClass('active-megamenu');
							}
							if ($('.active-megamenu').length != 0){
								$('.view-homepage-intro').addClass('megamenu-open');
							} else {
								$('.view-homepage-intro').removeClass('megamenu-open');
							}
						}
					});

					// Search
					$('#header #search-block-form').on({
						click: function(){
							if ($('#header').is('.search-open') == false){
								$('#search-block-form input[type=text]').focus();
							}
						}
					});
					$('#search-block-form').on({
						focusin: function(){
							header.addClass('search-open');
						},
						focusout: function(){
							header.removeClass('search-open');
						}
					});
				}
		}

})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.awpCISAjax = {
		attach: function(cx, s) {
			$('#views-exposed-form-explore-page-1', cx).ajaxStart(function(){
				$('.view-explore .view-content').addClass('loading').fadeTo(200, 0);
			});
			$('#views-exposed-form-explore-page-1', cx).ajaxSuccess(function(){
				$('.view-explore .view-content').css('opacity', 0).fadeTo(200, 1.0);
			});
		}
	}

})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

		Drupal.behaviors.awpCISLoad = {
				attach: function(cx, s) {
					window.onload = function(){
						$('body, .animation').addClass('loaded');
					}
				}
		}

})(jQuery, Drupal, this, this.document);
;
(function($) {

	Drupal.behaviors.awpCISCoverImages = {
		attach: function(cx, s) {
			$('.img-bg').each(function( i ) {
				var imgSrc;
				var imgCurrent  = $(this).find('img');
				var imgSrc      = imgCurrent.attr('src');
				var imgSrcSmall = imgCurrent.attr('data-src-small');
				var imgSrcLarge = imgCurrent.attr('data-src-large');
				if (imgSrcLarge || imgSrcSmall) { // if either exists
					if (window.matchMedia("(min-width: 760px)").matches) {
						imgSrc = imgSrcLarge;
					} else {
						imgSrc = imgSrcSmall;
					}
				}
				imgCurrent
					.css({
						backgroundImage: 'url("' + imgSrc + '")'
					})
					.addClass('js-background')
					.attr('src', '');
			});
		}
	}

})(jQuery);
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.awpCISSmoothScroll = {
		attach: function(cx, s) {
			$('a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
					var target = $(this.hash),
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']'),
						headerOffset = $('#header').height();
					var endPoint = target.offset().top - headerOffset;

					if (target.length) {
						$('html,body').animate({
							scrollTop: endPoint
						}, 300);
						return false;
					}
				}
			});
		}
	}

})(jQuery, Drupal, this, this.document);
;
