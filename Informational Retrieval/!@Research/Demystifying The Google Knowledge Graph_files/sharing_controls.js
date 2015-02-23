/*
 *		sharing_controls.js
 *
 *		Description:
 *			Provides positioning behaviors for the social sharing widget.
 *
 */

var TDM = (function( app, $ ) {

	app.sharing_controls = (function($){

		// private vars
		var debug = null,
			_name = "SharingControls",
			$controls = null,
			_mode = 'inline',
			_timeout_scroll_reset = null,
			_timeout_resize_reset = null
		;

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {

			debug = TDM.util.debug;

			debug( 'init: ' + _name );
			
			// if ($('html').hasClass('touch')) return app;

			$controls = $('section.sharing_controls');

			if ($controls.length < 1) return app;

			_init_event_tracking();
			_init_hover_events();
			_init_click_events();

			_reveal_controls();

			return app;

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _reveal_controls() {

			setTimeout(function() {

				$controls.show();

				_check_mode();
				clearTimeout(_timeout_resize_reset);

				if ( _get_page_type() === 'article' ) {

					_reset_for_article();

				} else if ( _get_page_type() === 'channel' ) {

					_reset_for_channel();

				}

				_on_scroll();

				_update_text(
					$controls.find('li.count span.count'),
					$controls.find('li.count').data('activity-new-count')
				);

				_update_text(
					$controls.find('li.comments span'),
					$controls.find('li.comments').data('activity-new-count')
				);

				$controls.find('ul li').each(function(i){

					$(this).delay( (i * 80) + 300 ).animate({
						'opacity' : 1
					},{
						'duration' : 200,
						'easing' : 'easeInOutCubic'
					});

				});

				setTimeout(function() {

					_subscribe();

				}, 940);


			}, 500);

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _subscribe() {

			TDM.mediator.add( _name, function() {

				return {

					name: _name,

					onWindowScroll: function() {
						_on_scroll();
					},

					onWindowResize: function() {
						_on_resize();
					}

				};

			}());

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_event_tracking() {

			$controls.find('li').not('.count').each(function(){
				var $this = $(this);
				$this.on('click',function(){
					/*
					TDM.event_tracking.track_ga_event([
						'Sharing',
						'Click',
						$this.data('id')
					]);
					*/
				});
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_hover_events() {

			$controls.find( 'li.more' ).each( function(){

				var $this = $( this );

				$this.on( 'mouseenter', function(){

					_reveal_more_buttons_that_fit_screen();

				});
			});

			$controls.on( 'mouseleave', function(){

				if ( $(window).width() > 767 ) {

					$controls.find( 'li.after_more_button' ).hide();

				}

			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		/* 
		 * Conditionally reveal sharing buttons as needed
		 *
		 */

		function _reveal_more_buttons_that_fit_screen() {

			var controls_pos = parseInt($controls.find('ul').css('top'),10),
				win_height = $(window).height(),
				halfway_point = (win_height / 2),
				controls_height = _get_controls_height(),
				controls_end = halfway_point + controls_pos + controls_height,
				available_height = win_height - controls_end - 20,
				height_being_revealed = 0
			;

			if ( $controls.hasClass( 'mode_inline' ) ) {

				/*
				 * If in inline mode, skip the conditional reveal
				 *
				 */

				$controls.find( 'li.after_more_button' ).show();

				return;

			}

			$controls.find('li.after_more_button').each(function(){

				var $this = $(this);

				$this.show();

				if ( (height_being_revealed + $this.height() ) < available_height ) {

					height_being_revealed += $this.height();

				} else {

					$this.hide();

				}

			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_click_events() {

			$controls.find('li').not('.count').on('click', function(){
				var $this = $(this),
					share_url = null,
					share_copy = '',
					twitter_handle = $controls.data('twitter-handle').replace('@',''),
					linkedin_source = $controls.data('linkedin-source'),
					permalink = $controls.data('permalink'),
					image = $controls.data('featured-image'),
					win_width = 720,
					win_height = 380,
					shortlink = $controls.data('shortlink'),

					full_title = $controls.data('full-title'),
					abbreviated_title = $controls.data('abbreviated-title'),

					email_subject = $controls.data('email-subject'),
					email_body = $controls.data('email-body').replace(/\[newline\]/g, escape("\n") ).replace(/\[title\]/g, full_title ).replace(/\[shortlink\]/g, shortlink )
				;

				switch ($this.data('id')) {
					case 'facebook':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/facebook/offer?pubid=ra-53e918f660794f37&ct=1&url=' + encodeURIComponent(permalink)
						;
					break;

					case 'twitter':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/twitter/offer?pubid=ra-53e918f660794f37&ct=1';

						// add in text
						if (abbreviated_title.length > 0 && shortlink.length > 0) {
							share_copy += abbreviated_title;
							share_copy += ' ' + shortlink;
							share_copy += ' via @' + twitter_handle;

							// attach to url
							share_url += '&text=' + encodeURIComponent(full_title) + '&via=' + encodeURIComponent(twitter_handle) + '&url=' + encodeURIComponent(permalink)

						} else {

							share_url += '&text=' + encodeURIComponent(full_title) + '&via=' + encodeURIComponent(twitter_handle) + '&url=' + encodeURIComponent(permalink)
						}

						win_width = 550;
						win_height = 420;
					break;

					case 'pinterest':
						share_url = 'http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(permalink) +
							'&media=' +
							encodeURIComponent(image) +
							'&description=' +
							encodeURIComponent(abbreviated_title)
						;
						win_width = 750;
						win_height = 316;
					break;

					case 'google':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/googleplus/offer?pubid=ra-53e918f660794f37&ct=1&url=' + encodeURIComponent(permalink)
						;
					break;

					case 'reddit':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/reddit/offer?pubid=ra-53e918f660794f37&ct=1&title=' + encodeURIComponent(abbreviated_title) + '&url=' + encodeURIComponent(permalink);
						win_width = 848;
						win_height = 600;
					break;

					case 'linkedin':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/linkedin/offer?pubid=ra-53e918f660794f37&ct=1' + 
							'&title=' + encodeURIComponent(abbreviated_title) +
							'&url=' + encodeURIComponent(permalink)
						;
						win_width = 600;
						win_height = 511;
					break;

					case 'buffer':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/buffer/offer?pubid=ra-53e918f660794f37&ct=1' +
							'&title=' + encodeURIComponent(abbreviated_title) +
							'&url=' + encodeURIComponent(permalink)
						;
						win_width = 860;
						win_height = 570;
					break;

					case 'tumblr':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/tumblr/offer?pubid=ra-53e918f660794f37&ct=1' +
							'&title=' + encodeURIComponent(abbreviated_title) +
							'&url=' + encodeURIComponent(permalink)
						;
						win_width = 600;
						win_height = 511;
					break;

					case 'email':
						share_url = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?pubid=ra-53e918f660794f37&ct=1' +
							'&title=' + encodeURIComponent(full_title) +
							'&url=' + encodeURIComponent(permalink)
						;
						win_width = 600;
						win_height = 511;
					break;

				}

				if ( share_url && (share_url.indexOf('http') !== -1 || share_url.indexOf('mailto') !== -1) ) {
					
					_open_window( share_url, [win_width, win_height]);
					
				}
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		/*
		*	Pop share window
		*/
		function _open_window( url, size ) {
			var width,
				height,
				left,
				top,
				options = [
					'toolbar=no',
					'location=no',
					'directories=no',
					'status=no',
					'menubar=no',
					'scrollbars=no',
					'resizable=no',
					'copyhistory=no',
				]
			;

			if ( typeof size === 'object' ) {
				width = size[0];
				height = size[1];
			}
			else {
				width = size;
				height = size;
			}

			left = (screen.width / 2) - (width / 2);
			top = (screen.height / 2) - (height / 2);

			options.push(
				'width=' + width,
				'height=' + height,
				'top=' + top,
				'left=' + left
			);

			return window.open(
				url,
				'Share',
				options.join(',')
			);
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _check_mode() {

			var $wrap = null,
				win_width = $(window).width();

			$wrap = _get_wrap();

			if ( _get_page_type() === 'article' ) {

				_set_mode_for_article( $wrap, win_width );

				clearTimeout( _timeout_resize_reset );

				_timeout_resize_reset = setTimeout(function() {

					_reset_for_article();

					_on_scroll();

				}, 30 );

			} else {

				_set_mode_for_channel( win_width );

				clearTimeout( _timeout_resize_reset );

				_timeout_resize_reset = setTimeout(function() {

					_reset_for_channel();

					_on_scroll();

				}, 30 );

			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _get_page_type() {

			var page_type = null;

			if ( $( 'body' ).hasClass( 'template-article' ) ) {

				page_type = 'article';

			} else if ( $( 'body' ).hasClass( 'template-channel' ) ) {
	
				page_type = 'channel';

			}

			return page_type;

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _set_mode_for_article( $node, win_width ) {

			if ( ( $node.length > 0 ) && ( $node.width() < 800 ) && ( win_width > 980 ) ) {

				_mode = 'content';

			} else if ( win_width < 980 ) {

				_mode = 'inline';

			} else {

				_mode = 'sticky';

			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _set_mode_for_channel( win_width ) {

			if ( win_width < 1370 ) {

				_mode = 'inline';

			} else {

				_mode = 'sticky';

			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		/*
		 * Detect if this is an article page or a channel page 
		 * and return the appropriate wrapper reference.
		 *
		 */

		function _get_wrap() {

			var $wrap = null,
				selectors = [
					'.article-content .body-content',
					'.channel-content'
				];

			if ( $( selectors[ 0 ] ).length > 0 ) {

				$wrap = $( selectors[ 0 ] );

			} else if ( $( selectors[ 1 ] ).length > 0 ) {

				$wrap = $( selectors[ 1 ] );

			}

			return $wrap;

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _update_text( $target, value ) {
			$target.text(
				_convert_num_to_abbreviated_value(
					Math.ceil( value )
				)
			);
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _convert_num_to_abbreviated_value( num ) {

			var return_val = num;

			if (num > 999999) {
				return_val = TDM.util.number_format(num / 1000000, 1) + 'm';
			}

			if (num > 999) {
				return_val = TDM.util.number_format(num / 1000, 1) + 'k';
			}

			// convert return_val to string
			return_val = return_val + '';

			if ( return_val.indexOf('.0') !== -1 ) {
				// strip out the .0 val
				return_val = return_val.replace('.0','');
			}

			return return_val;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function destroy() {

			clearTimeout( _timeout_scroll_reset );

			clearTimeout( _timeout_resize_reset );

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _on_resize() {

			_check_mode();

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _get_controls_height() {
			var height = 0;

			$controls.find('li').not('.after_more_button').each(function(){
				height += $(this).height();
			});

			return height;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _on_scroll() {

			clearTimeout(_timeout_scroll_reset);

			if ( $controls.length < 1 || _mode === 'inline' ) return false;

			var page_scroll = parseInt( $( document ).scrollTop(), 10 );

			if ( page_scroll < 0 ) page_scroll = 0;

			var	startpoints = {
					'$node_1': $( $controls.data( 'sticky-startpoint-selector') ),
					'$node_2': $( $controls.data( 'content-startpoint-selector' ) )
				},

				endpoints = {
					'$node_1': $( $controls.data( 'sticky-endpoint-selector') ),
					'$node_2': $( $controls.data( 'content-endpoint-selector' ) )
				},

				win_height = $(window).height(),

				controls_height = _get_controls_height(),

				$startpoint = ( _mode === 'sticky' ) ? startpoints.$node_1 : startpoints.$node_2,

				$endpoint = ( _mode === 'sticky' ) ? endpoints.$node_1 : endpoints.$node_2,

				margin_bottom = 40,

				fixed_range_top = $startpoint.offset().top - page_scroll + (controls_height / 2),

				fixed_range_bottom = $endpoint.offset().top - page_scroll - (controls_height / 2) - margin_bottom,

				range_diff = ((win_height / 2) - (controls_height / 2)) - $startpoint.offset().top
			;

			if (range_diff < 0) range_diff = 0;

			fixed_range_top -= range_diff;
			
			var	diff_bottom = (win_height / 2) - fixed_range_bottom + range_diff,
				diff_top = (win_height / 2) - fixed_range_top - range_diff
			;

			if ( fixed_range_top > (win_height / 2) ) {

				$controls.find('ul').css(
					'top',
					((controls_height / 2) * -1) - diff_top
				);

			} else if (fixed_range_bottom < (win_height / 2)) {

				$controls.find('ul').css(
					'top',
					((controls_height / 2) * -1) - diff_bottom
				);

			} else {

				_timeout_scroll_reset = setTimeout(function() {

					$controls.find('ul').css({
						'top' : ((controls_height / 2) * -1) - range_diff
					});

				}, 10);

			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _reset_for_article() {

			if ( _mode === 'inline' ) {

				_set_position( 'inline' );

			} else if ( _mode === 'content' ) {

				_set_position( 'content' );
				
			} else if ( _mode === 'sticky' ) {

				_set_position( 'sticky' );
				
			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _reset_for_channel() {

			if ( _mode === 'inline' ) {

				_set_position( 'inline' );

			} else if ( _mode === 'sticky' ) {

				_set_position( 'sticky' );
				
			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _set_position( mode ) {
			
			var sticky_left,
				window_width = $( window ).width();

			$controls.removeClass( 'mode_sticky mode_content mode_inline' );

			if ( mode === 'inline' ) {

				$controls
					.addClass('mode_inline');
					
				$controls
					.find('ul')
					.stop()
					.css({
						'top' : 'auto',
						'left' : 'auto'
					});

				if ( window_width < 980 ) {

					$controls
						.find( '.after_more_button' )
						.show();

				} else {

					$controls
						.find( '.after_more_button' )
						.hide();

				}

			} else if ( mode === 'content' ) {

				$controls
					.addClass( 'mode_content' );

				$controls
					.find( 'ul' )
					.stop()
					.css({
						'left' : $( '.sharing_content_channel' ).offset().left
					});
 
			} else if ( mode === 'sticky' ) {

				sticky_left = $( 'div.content' ).children().first().offset().left - 30;

				sticky_left -= $controls.find( 'ul li:first' ).outerWidth();

				$controls.addClass( 'mode_sticky' );

				if ( parseInt( $controls.find( 'ul' ).css( 'left' ), 10 ) !== sticky_left ) {
				
					$controls
						.find('ul')
						.css({
							'left' : sticky_left
						});

				}

			}

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function update_ui() {

			_check_mode();

			_on_scroll();

			setTimeout( function() {

				_on_scroll();

			}, 50 );

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init,
			destroy : destroy,
			update_ui : update_ui
		};

	}($));

	return app; /* return augmented app object */

}( TDM || {}, jQuery )); /* import app if exists, or create new; import jQuery */

TDM.sharing_controls.init();