'use strict';
var MITTR = MITTR || {};

$ = jQuery;

/**
 * ***********************************************************************
 * Function library for MITTR
 */

/**
 * ----------------------------------------------------------------------
 * [ux description]
 * sets up and controls the general ux parts of the page
 */
MITTR.ux = {

	init: function () {

		// is this mobile safari? no? turn things on...
		if ( !window.isMobileBrowser ) {
			// turn on stickiness
			MITTR.ux.getSticky();

			// turn on comments
			MITTR.livefyre.init();

		} else {
			$( "#livefyre-mobile a" ).click( function ( event ) {
				event.preventDefault();
				MITTR.livefyre.init();
				$( "#livefyre-mobile" ).hide();
			} );
			$( "#livefyre-mobile" ).show();

			if ( MITTR.lib.getQueryStringParameterByName( "desktop" ) == "true" ) {
				$.cookie( 'mobile_site_preferred', 'false', {
					expires: 365,
					path: "/",
					domain: ".technologyreview.com"
				} );
			}

			if ( $.cookie( "mobile_site_preferred" ) === null ) {
				if ( ( navigator.userAgent.match( /(iPad)/i ) !== null ) ) {

				} else {
					MITTR.mobile.showPromo();
				}
			} else if ( $.cookie( "mobile_site_preferred" ) === "true" ) {
				MITTR.mobile.switchTo();
			}
		}

		// global functions
		// back to top
		$( "#btt" ).on( "click", function ( event ) {
			event.preventDefault();

			$( 'body,html' ).animate( {
				scrollTop: 0
			}, 800 );
		} );

		// SEARCH BOX ----
		// remove all drupal add ons
		$( "#edit-search-block-form--2" ).prop( "onfocus", null );
		$( "#edit-search-block-form--2" ).prop( "onblur", null );
		$( "#edit-search-block-form--2" ).prop( "onclick", null );

		// make it clickable
		$( "#tr-global-search" ).on( "click", function () {
			$( "#tr-global-search" ).addClass( "on" );
			$( "#tr-global-search" ).removeClass( "waiting" );
			$( "#edit-search-block-form--2" ).focus();

			// clear the drupal value
			if ( $( "#edit-search-block-form--2" ).val() == "Search" ) {
				$( "#edit-search-block-form--2" ).val( "" );
			}
		} );

		//blur
		$( "#edit-search-block-form--2" ).on( "blur", function () {
			$( "#tr-global-search" ).addClass( "waiting" );
		} );

		// use a refresh? - set by querystring, query string number is in minutes
		if ( MITTR.lib.getQueryStringParameterByName( "refresh" ) !== null ) {
			setTimeout( "location.reload(true);", MITTR.lib.getQueryStringParameterByName( "refresh" ) * 1000 * 60 );
		}

		// set up "The Feeds"
		if ( $( "#the-feed" ).length ) {
			MITTR.theFeed.init();
		}

		// INTERNATIONAL (LANGUAGE) REDIRECT CHECK
		if ( MITTR.lib.getQueryStringParameterByName( "lang" ) == "en" ) {
			// This is linked from .es specifically to avoid the cookie redirect.
			// Remove the cookie so we aren't redirected again.
			if ( $.cookie( 'lang' ) !== null ) {
				$.cookie( 'lang', null, {
					path: "/",
					domain: ".technologyreview.com"
				} );
			}
		} else if ( $.cookie( 'lang' ) !== null ) {
			var lang = $.cookie( 'lang' );

			if ( ( lang == "es" || lang == "in" )
				// Limit it to certain paths.
				&& ( window.location.pathname == "/" || window.location.pathname == "/read_article.aspx" || window.location.pathname == "/blog/post.aspx" )
				// Make sure the referrer isn't something with technologyreview.com.
				&& ( !document.referrer || document.referrer.indexOf( "technologyreview.com" ) == -1 ) ) {
				var redirectUrl = "http://www.technologyreview." + lang + window.location.pathname + window.location.search + ( window.location.search ? "&" : "?" ) + "lang=" + lang;
				window.location = redirectUrl;
			}
		} // check "lang" in querystring

		// set up the periodic updates (timed updates)
		var timedUpdateInterval = setInterval( MITTR.timedUpdate, ( 1000 * 60 ) ); // repeats every 1 minute

		// set up navBar Promos
		// currently only running on "news and analysis" pages
		if ( $( "body#section-news" ).length ) {
			MITTR.navBarPromo.init();
			// MITTR.flyoutPromo.init();
		}

	}, // init

	// turn on the sticky items on the site
	getSticky: function () {

			// STICKY PRIMARY NAV ---------
			// settings
			var startStickingAfterHeight = 206;

			// this header the "collapsed" version? if yes, stick it now, else, stick it later

			if ( $( "#tr-global-header-sticky" ).hasClass( "collapsed" ) ) {
				$( "#tr-global-header-sticky" ).addClass( "on" );

			} else {

				$( window ).scroll( function () {
					// get current scroll height
					var currentScroll = $( window ).scrollTop();

					if ( currentScroll >= startStickingAfterHeight ) {
						$( "#tr-global-header-sticky" ).addClass( "on" );
					} else {
						$( "#tr-global-header-sticky" ).removeClass( "on" );
					}
				} );
			}

			// HD's Original Sticks --------
			//$("#tr-global-header").sticky({});

			// if the page is not a demo and the flyout has been seen this session
			if ( !$( "#main-article" ).hasClass( "demo" ) ) {
				$( "#why-it-matters" ).sticky( {
					topSpacing: 42,
					bottomSpacing: 20,
					stickTo: "article#main-article"
				} );
			}

			$( "#sharing-bar" ).sticky( {
				topSpacing: 42,
				bottomSpacing: 20,
				stickTo: "article#main-article"
			} );
			$( "#comments-ad-right" ).sticky( {
				topSpacing: 42,
				bottomSpacing: 20,
				stickTo: "#comments"
			} );
			// Think this is all that is needed to disable sticky meta bar
			//$("#main-article header div.meta-bar").sticky({topSpacing: 37});
			$( ".sticky" ).sticky( {
				topSpacing: 56,
				bottomSpacing: 0,
				stickTo: "#more-stream .stream-box"
			} );

		} // getSticky
};

/**
 * ----------------------------------------------------------------------
 * [timedUpdate description]
 * is called every X minutes to update content on the page
 */
MITTR.timedUpdate = function () {

	// update the timestamps
	MITTR.theFeed.timeCheck();
};

/**
 * ----------------------------------------------------------------------
 * [ux description]
 * sets up and controls the general ux parts of the page
 */
MITTR.mobile = {
	showPromo: function () {
		var section = $( "#section-news" );
		var article = $( "#main-article" );
		var showIt = false;

		if ( section.hasClass( "front" ) || section.hasClass( "page-taxonomy-term-10104" ) || section.hasClass( "page-taxonomy-term-10102" ) || section.hasClass( "page-taxonomy-term-10103" ) || section.hasClass( "page-taxonomy-term-10101" ) || section.hasClass( "page-taxonomy-term-10107" ) || section.hasClass( "page-taxonomy-term-10105" ) || section.hasClass( "page-taxonomy-term-10106" ) || section.hasClass( "page-taxonomy-term-10109" ) ) {
			showIt = true;
		}

		if ( article.length && article.hasClass( "mobile" ) ) {
			showIt = true;
		}

		if ( showIt ) {
			$.modal( '<div id="mobile-promo"><img class="close" src="/global/i/modal-close.png" alt="Close" width="60" height="60" /><a href="#"><img src="/assets/promo-mobile.png" alt="Mobile" width="90" height="176" /> View this on <br />mobile site &raquo;</a></div>', {
				opacity: 50,
				overlayCss: {
					backgroundColor: "#FFF"
				},
				overlayClose: true,
				onShow: function ( dialog ) {
					$( "#mobile-promo img.close" ).on( "click", function () {
						$.modal.close();
						$.modal.close();
					} );
					$( "#mobile-promo a" ).on( "click", function ( event ) {
						event.preventDefault();

						$.cookie( 'mobile_site_preferred', 'true', {
							expires: 365,
							path: "/",
							domain: ".technologyreview.com"
						} );

						MITTR.mobile.switchTo();
					} );
				},
				onClose: function ( dialog ) {
					$.cookie( 'mobile_site_preferred', 'false', {
						expires: 365,
						path: "/",
						domain: ".technologyreview.com"
					} );
				}
			} );
		}
	},

	switchTo: function () {
		var section = $( "#section-news" );
		var article = $( "#main-article" );
		var switchIt = false;

		// computing = page-taxonomy-term-10104
		// business = page-taxonomy-term-10102
		// communications = page-taxonomy-term-10103
		// biomedicine = page-taxonomy-term-10101
		// web = page-taxonomy-term-10107
		// energy = page-taxonomy-term-10105
		// materials = page-taxonomy-term-10106
		// mobile = page-taxonomy-term-10109

		if ( section.hasClass( "front" ) || section.hasClass( "page-taxonomy-term-10104" ) || section.hasClass( "page-taxonomy-term-10102" ) || section.hasClass( "page-taxonomy-term-10103" ) || section.hasClass( "page-taxonomy-term-10101" ) || section.hasClass( "page-taxonomy-term-10107" ) || section.hasClass( "page-taxonomy-term-10105" ) || section.hasClass( "page-taxonomy-term-10106" ) || section.hasClass( "page-taxonomy-term-10109" ) ) {
			switchIt = true;
		}

		if ( article.length && article.hasClass( "mobile" ) ) {
			switchIt = true;
		}

		if ( switchIt ) {
			window.location.href = "http://m.technologyreview.com" + window.location.pathname;
		}
	}
};

/**
 * ----------------------------------------------------------------------
 * [editions description]
 * sets up and controls the editions selector
 */
MITTR.editions = {

	init: function () {
		// click handler
		$( "#tr-global-nav ul li.global a" ).on( "click", function ( event ) {
			event.preventDefault();
			MITTR.editions.activateModal();
		} );

		// check query string to see if modal should autoload
		if ( MITTR.lib.getQueryStringParameterByName( "show" ) == "editions" ) {
			MITTR.editions.activateModal();
		}

		// set up other buttons to call the editions modal
		$( ".go-editions-selector" ).on( "click", function ( event ) {
			event.preventDefault();
			MITTR.editions.activateModal();
		} );
	},

	activateModal: function () {

			$( "#tr-global-editions" ).modal( {
				opacity: 80,
				overlayCss: {
					backgroundColor: "#000"
				},
				overlayClose: true,
				onShow: function ( dialog ) {
					$( "#tr-global-editions ul.languages a" ).on( "click", function ( event ) {
						event.preventDefault();

						if ( $( this ).hasClass( "open" ) ) {
							$( this ).removeClass( "open" );
							$( "#tr-global-editions div.editions" ).removeClass( this.className );
						} else {
							$( "#tr-global-editions ul.languages a" ).removeClass( "open" );
							$( this ).addClass( "open" );

							$( "#tr-global-editions div.editions" ).removeClass().addClass( "editions " + this.className );
						}
					} );

					$( "#tr-global-editions a.closer" ).on( "click", function ( event ) {
						event.preventDefault();

						$.modal.close();
					} );

					$( "#tr-global-editions form input[name='filter']" ).on( "change", function () {
						$( "#tr-global-editions div.filters, #tr-global-editions ul.languages" ).removeClass( "news magazine list events" ).addClass( this.value );

						var languages = $( "#tr-global-editions ul.languages" );
						var editions = $( "#tr-global-editions div.editions" );

						var l_active = languages.data( "active" );
						var e_active = editions.data( "active" );

						if ( l_active ) {
							languages.removeClass( l_active );
						}
						if ( e_active ) {
							editions.removeClass( e_active );
						}
					} );

					$( "#tr-global-editions ul.languages a, #tr-global-editions div.editions a" ).on( "mouseenter mouseleave", function () {
						var color_match = [ "#fff", "#ffffff", "rgb(255, 255, 255)" ];
						if ( color_match.indexOf( $( this ).css( "color" ).toLowerCase() ) >= 0 ) {
							var languages = $( "#tr-global-editions ul.languages" );
							var editions = $( "#tr-global-editions div.editions" );

							var l_active = languages.data( "active" );
							var e_active = editions.data( "active" );

							var lang = "";

							if ( $( this ).parent().data( "lang" ) ) {
								lang = $( this ).parent().data( "lang" );
							}

							var country = "l-" + lang;

							if ( $( this ).parent().data( "edition" ) ) {
								country = $( this ).parent().data( "edition" );
							}

							if ( l_active ) {
								languages.removeClass( l_active );
							}
							if ( e_active ) {
								editions.removeClass( e_active );
							}

							languages.addClass( lang ).data( "active", lang );
							editions.addClass( country ).data( "active", country );
						}
					} );
				}
			} );
		} // activateModal

}; // editions

/**
 * ----------------------------------------------------------------------
 * [theFeed description]
 * loops through "the feed" to set the time/date "ago", then display it
 */

MITTR.theFeed = {
	init: function () {

		MITTR.theFeed.timeCheck();

		// EXPLORE
		var explore = $( "#explore .left > .business-reports, #explore .left, #explore .middle, #explore .right" ).height();
		$( "#explore .left > .business-reports, #explore .left > ul.graphic-articles, #explore .middle ul.more-articles" ).css( "height", explore );

		$( '#the-feed' ).fadeIn( 1000 );

	}, // init

	timeCheck: function () {
		var timeNow = new Date();

		//console.log( Math.floor(timeNow / (60*60)) );

		/* FOR QC ONLY
		var timeBase = 60000; // 1 minute in milliseconds
		// minutes
		MITTR.theFeed.timeAgo(timeNow, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow+timeBase, timeNow, "en");
		// hours
		MITTR.theFeed.timeAgo(timeNow-60*timeBase, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((60*3)*timeBase), timeNow, "en");
		// days
		MITTR.theFeed.timeAgo(timeNow-1440*timeBase, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((1441*3)*timeBase), timeNow, "en");
		// weeks
		MITTR.theFeed.timeAgo(timeNow-10080*timeBase, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((10081*3)*timeBase), timeNow, "en");
		// months
		MITTR.theFeed.timeAgo(timeNow-47376*timeBase, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((47377*3)*timeBase), timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((47376*9)*timeBase), timeNow, "en");
		// years
		MITTR.theFeed.timeAgo(timeNow-525600*timeBase, timeNow, "en");
		MITTR.theFeed.timeAgo(timeNow-((525600*3)*timeBase), timeNow, "en");
		console.log("-------");
		*/

		// loop through each item within the feed, set it up and show it
		$( '#the-feed time' ).each( function ( index, thePost ) {
			var thisTimeStamp = new Date( $( thePost ).attr( "datetime" ) ).getTime();
			//console.log( $(thePost).attr("datetime") );

			$( thePost ).text( MITTR.theFeed.timeAgo( thisTimeStamp, timeNow, "en" ) );
		} );
	},

	timeAgo: function ( timeToCheck, timeNow, langcode ) {
			var timeStamp, timeStampNumber, timeStampWord, timeDiff, timeBase;

			timeBase = 60000; // 1 minute in milliseconds

			// convert time to minutes
			timeToCheck = Math.floor( timeToCheck / timeBase );
			timeNow = Math.floor( timeNow / timeBase );
			timeDiff = timeNow - timeToCheck;
			//console.log(timeToCheck + " " + timeNow + " " + timeDiff);

			/*
            1 year => 525600,
            1 month => 47376,
            1 week => 10080,
            1 day => 1440,
            1 hour => 60 min,
            1 min => 1
        */
			if ( timeDiff < 1 ) {
				timeStampWord = "just now";
				timeStampNumber = "";
			} else if ( timeDiff >= 1 && timeDiff < 60 ) {
				timeStampWord = "minute";
				timeStampNumber = timeDiff;
			} else if ( timeDiff >= 60 && timeDiff < 1440 ) {
				timeStampWord = "hour";
				timeStampNumber = Math.floor( timeDiff / 60 );
			} else if ( timeDiff >= 1440 && timeDiff < 10080 ) {
				timeStampWord = "day";
				timeStampNumber = Math.floor( timeDiff / 1440 );
			} else if ( timeDiff >= 10080 && timeDiff < 47376 ) {
				timeStampWord = "week";
				timeStampNumber = Math.floor( timeDiff / 10080 );
			} else if ( timeDiff >= 47376 && timeDiff < 525600 ) {
				timeStampWord = "month";
				timeStampNumber = Math.floor( timeDiff / 47376 );
			} else if ( timeDiff >= 525600 ) {
				timeStampWord = "year";
				timeStampNumber = Math.floor( timeDiff / 525600 );
			}

			// check for errors
			if ( isNaN( timeDiff ) ) {
				return;
			} else {
				// no errors, return val;
				if ( langcode === "en" ) {
					timeStamp = " ago";
				}

				// should this be plural?
				if ( timeStampWord === "just now" ) {
					timeStamp = timeStampWord;
				} else if ( timeStampNumber > 1 ) {
					timeStamp = timeStampNumber + " " + timeStampWord + "s" + timeStamp;
				} else {
					timeStamp = timeStampNumber + " " + timeStampWord + timeStamp;
				}
				//console.log(timeStamp);

				return timeStamp;
			}
		} // timeAgo
}; // theFeed

/**
 * ----------------------------------------------------------------------
 * [navBarPromo description]
 * when running an experiment for assets in the black nav bar
 * utilizes Google Content Experiments to make it happen
 *
 */

MITTR.navBarPromo = {
	init: function () {

		var max, min, rndm, $promos;

		// is an alert being shown? (if yes, bring in popular bar, but not mag box)
		if ( $( "#global-nav-alert" ).length ) {
			$( "ul.popular-topics" ).removeClass( 'off' );
		} else {

			// random promo display
			$promos = $( ".navbar-promo" );
			if ( $promos.length > 0 ) {
				max = $promos.length;
				min = 1;
				rndm = Math.floor( Math.random() * ( max - min + 1 ) );
				$promos.eq( rndm ).removeClass( 'off' );
			}

			// set the width for popular bar
			$( "ul.popular-topics" ).width( 310 );

			// pad the ad bar
			$( "#block-dfp-tr-www-head-post-nav-landscape" ).css( {
				'padding-top': '20px'
			} );

			// show the popular bar
			$( "ul.popular-topics" ).removeClass( 'off' );
		}
	}, // init
}; // navBarPromo

/**
 * ----------------------------------------------------------------------
 * [flyoutPromo description]
 * box that fades in on the right side of the screen
 * used to promote various internal
 initiatives
 *
 */

MITTR.flyoutPromo = {
	hasClosed: false,

	init: function () {
		// if not a mobile browser
		if ( !window.isMobileBrowser ) {
			// if page is news or view and not business report
			if ( ( $( '#main-article' ).hasClass( 'news' ) || $( '#main-article' ).hasClass( 'view' ) ) && $( '#business-report-toc' ).length == 0 ) {
				// if not already seen this session
				if ( $.cookie( "seen_flyout" ) !== "yes" ) {
					// activate the closer
					$( '.flyout-closer' ).click( function () {
						$( this ).parents( '.flyout' ).hide();
						MITTR.flyoutPromo.hasClosed = true;
						return false;
					} );

					//  get the height of the #main-article
					var mainHeight = $( '#main-article' ).position().top; // TODO: revisit load timing issue
					//  get the height of the viewport
					//  when the scroll reaches half the height of the #main-article,
					//  fade in the box with its top left corner positioned half-way down the viewport
					var startStickingAfterHeight = $( '#main-article' ).position().top + $( '#main-article' ).height() / 2;

					$( window ).scroll( function () {
						// get current scroll height
						var currentScroll = $( window ).scrollTop();

						if ( currentScroll >= startStickingAfterHeight && MITTR.flyoutPromo.hasClosed == false ) {
							$( ".flyout" ).css( "top", Math.min( startStickingAfterHeight + $( window ).height() * .8, $( '#main-article' ).position().top + $( '#main-article' ).height() ) );
							$( ".flyout" ).fadeIn( 1000 );
							$.cookie( 'seen_flyout', 'yes', {
								path: '/'
							} );
						}
					} );

				} // !seen this session
			} // news or view
		} // !mobile
	}, // init
}; // flyoutPromo

/**
 * ----------------------------------------------------------------------
 * [welcome description]
 * display welcome message about new site or activate the promo overlay
 */
MITTR.welcome = {

	init: function () {
		var goWelcome = this;
		var maxDisplays = 3; // how many times you want the user to see the dialog

		// check query string to see if modal should autoload
		if ( MITTR.lib.getQueryStringParameterByName( "show" ) == "welcome" ) {
			MITTR.welcome.show( 0 );
		} else if ( ( MITTR.lib.getQueryStringParameterByName( "show" ) == "promo" ) || ( !window.isMobileBrowser && ( $.cookie( "seen_promo" ) == undefined && ( $.cookie( "seen_emtech" ) == undefined || $.cookie( "seen_emtech" ) == "2" ) ) ) ) {
			// With the addition of the promo overlay, the logic changes to give the promo priority.
			// This condition is specific to the EmTech 2014 overlay promo
			// "seen_promo" is a session cookie to make sure users don't get more than one overlay

			// This allows people to bookmark /?hidewelcome without
			// having to view the emtech modal every time if they
			// clear cookies.
			if ( window.location.search && (window.location.search.indexOf( 'hidewelcome' ) != -1) ) {
				$.cookie( 'hide_welcome', 'true', {
					expires: 365,
					path: '/'
				} );
			} else if ( $.cookie( 'hide_welcome' ) != 'true' ) {
				MITTR.overlayPromo.init();
			}
		} else if ( !window.isMobileBrowser && $.cookie( "seen_promo" ) == undefined ) {
			// check the cookies to see if this should load
			// Insider launch: desired logic is for the user to see the overlay 3 times
			// with at least 1 week betwteen each successive viewing.
			//
			// NOTE: after the site has been live for a few weeks, this will be removed
			// remove the jquery.cookie plugin as well (bottom). lighten up the load.

			// for testing
			// $.cookie('seen_welcome', 'yes', { expires: 90, path: '/' });
			// $.cookie('last_visit', 'yes', { expires: 90, path: '/' });
			// $.removeCookie('seen_welcome');

			if ( !window.isMobileBrowser && $.cookie( "insider" ) == undefined ) {
				// This allows people to bookmark /?hidewelcome without
				// having to view the welcome modal every time if they
				// clear cookies.
				if ( window.location.search && window.location.search.indexOf( 'hidewelcome' ) ) {
					$.cookie( 'hide_welcome', 'true', {
						expires: 365,
						path: '/'
					} );
					MITTR.overlayPromo.logVisit(); // Log the session, in case of promo
				} else if ( $.cookie( 'hide_welcome' ) == 'true' ) {
					MITTR.overlayPromo.logVisit(); // Log the session, in case of promo
				} else if ( $.cookie( "seen_welcome" ) == undefined ) {
					goWelcome.show( undefined );
				} // end, has not already seen welcome
				else {
					// user has seen welcome at least once
					var cookieVal = $.cookie( "seen_welcome" ).split( ',' );
					if ( cookieVal.length < maxDisplays ) {
						// see if enough time has passed to show dialog again
						goWelcome.checkInterval( cookieVal[ cookieVal.length - 1 ] );
					} // end, user has seen welcome enough times
				}
			} //  end, not mobile browser
		} // end, check to show modal
	}, // init

	checkInterval: function ( prevDate ) {
		var interval = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
		var nextPossibleDate = Number( prevDate ) + interval;
		var now = new Date();
		var thisInstant = now.getTime();

		if ( thisInstant >= nextPossibleDate ) {
			MITTR.welcome.show( thisInstant );
		} // end, this visit is too soon to display welcome again
	},

	show: function ( timing ) {
			if ( $( "#welcome-overlay" ).length != 0 ) {
				$( "#welcome-overlay" ).modal( {
					opacity: 80,
					overlayCss: {
						backgroundColor: "#FFF"
					},
					overlayClose: true,
					onShow: function ( dialog ) {
						$( "#welcome-overlay .closer" ).on( "click", function ( event ) {
							event.preventDefault();

							$.modal.close();
						} );
					}
				} );
				// set or augment cookie that this has been shown
				var cookieVal;
				if ( timing == undefined ) { // user's first time
					//          if ( $.cookie("seen_welcome") == undefined ) {
					cookieVal = new Array();
					var now = new Date();
					cookieVal.push( now.getTime() );
				} else if ( timing != 0 ) { // user has been here before
					cookieVal = $.cookie( "seen_welcome" ).split( ',' );
					cookieVal.push( timing );
				} else { // likely here due to show=welcome, so leave cookie unaltered
					return;
				}
				cookieVal.join( ',' );
				$.cookie( 'seen_welcome', cookieVal, {
					expires: 365,
					path: '/'
				} );
			}
			// set or augment cookies that track whether:
			// a promo of any kind has been shown
			// a new session has happened
			MITTR.overlayPromo.logVisit();
		} // show
}; // MITTR.welcome

/**
 * ----------------------------------------------------------------------
 * [promo description]
 * display promo overlay (taking into account welcome overlay logic, above)
 */

MITTR.overlayPromo = {
	endDate: Date.UTC( 2015, 6, 1, 5 ),
	init: function () { // (by the time you get here, you know that seen_promo is undefined)

		// if there's a query string, show the promo
		if ( MITTR.lib.getQueryStringParameterByName( "show" ) == "promo" ) {
			MITTR.overlayPromo.show();
		} else if ( Date.now() > MITTR.overlayPromo.endDate ) { // you're outside the window. do nothing.
			;
		} else if ( $.cookie( "seen_emtech" ) == undefined || $.cookie( "seen_emtech" ) == 2 ) {
			MITTR.overlayPromo.show();
			MITTR.overlayPromo.logVisit();
		} else {;
		}
	},
	show: function () {
		if ( $( "#promo-overlay" ).length != 0 ) {
			$( "#promo-overlay" ).modal( {
				opacity: 80,
				overlayCss: {
					backgroundColor: "#FFF"
				},
				overlayClose: true,
				onShow: function ( dialog ) {
					$( "#promo-overlay .closer" ).on( "click", function ( event ) {
						event.preventDefault();
						$.modal.close();
					} );
				}
			} );
		}
	}, // show
	logVisit: function () {
			var expiration = new Date( MITTR.overlayPromo.endDate );
			// if the session cookie doesn't yet exist, make it
			// if the persistent cookie doesn't yet exist, make it
			// if the persistent cookie does exist, update its value
			if ( $.cookie( "seen_promo" ) == undefined ) {
				$.cookie( 'seen_promo', 'true' );
			}
			if ( $.cookie( "seen_emtech" ) == undefined ) {
				$.cookie( 'seen_emtech', '1', {
					expires: expiration,
					path: '/'
				} );
			} else if ( ( $.cookie( "seen_emtech" ) != undefined ) && ( Number( $.cookie( "seen_emtech" ) ) <= 2 ) ) {
				var views = Number( $.cookie( "seen_emtech" ) );
				$.cookie( 'seen_emtech', ++views, {
					expires: expiration,
					path: '/'
				} );
			}
		} // logVisit
}; // MITTR.promo

/**
 * ----------------------------------------------------------------------
 * [notifier description]
 * sets up modal to let users submit an email address for future notification
 *  TODO: unpack from all being in the init
 */
MITTR.notifier = {

	init: function () {

		$( "#notifier .btn, a.notifier" ).on( "click", function ( event ) {
			event.preventDefault();

			$( "#notify_overlay" ).modal( {
				opacity: 80,
				overlayCss: {
					backgroundColor: "#FFF"
				},
				overlayClose: true,
				onShow: function ( dialog ) {
					$( "#notify_overlay .closer" ).on( "click", function ( event ) {
						event.preventDefault();

						$.modal.close();
					} );
				},
			} );
		} );

		// handle submit
		$( "#email-signup" ).on( "submit", function ( event ) {
			event.preventDefault();

			var form = $( this );

			var request = $.ajax( {
				url: form.attr( "action" ),
				type: form.attr( "method" ),
				data: form.serialize(),
				dataType: "script",
				jsonp: false,
				jsonpCallback: "newsletterCallback"
			} );
		} );

	}, // init

}; // MITTR.notifier

function newsletterCallback( response ) {
	var message = response.description;
	if ( response.status === "success" ) {
		message = "Thank you.";
		//console.log("success");
	} else {
		//console.log("error");
	}
	//console.log(message);

	$( "p.status" ).removeClass().addClass( "status " + response.status ).text( message );
}

/**
 * ----------------------------------------------------------------------
 * [ads description]
 * inserts 'remove ad' links into the page
 */
MITTR.ads = {

	init: function () {

		if ( window.Drupal && window.Drupal.settings && window.Drupal.settings.mittrInsider && window.Drupal.settings.mittrInsider.removeAdsUrl ) {

			var removeAdsUrl = window.Drupal.settings.mittrInsider.removeAdsUrl;

			// put Remove Ad CTAs on all visible ads
			if ( $( '.dfp-tag-wrapper' ) ) {
				$( '.stream-ad, .ad-right, #homepage-feed-latest-ad-1, #homepage-feed-latest-ad-2' ).css( 'background-color', '#FFFFFF' );
				$( '.dfp-tag-wrapper > .dfp-tag-wrapper' ).each( function ( index, element ) {
					if ( index % 3 == 0
						// Don't show it inside a pagewrap.
						&& !$( element ).is( '#page-wrap .dfp-tag-wrapper' ) ) {
						$( element ).append( '<a href="' + removeAdsUrl + '" class="remove-ads clickevent overlay" data-click-category="Insider" data-click-action="Click to Remove Ads" data-click-noninteraction="1"><p style="width: inherit; margin: 0 0 -1rem 0; padding: .75rem 0 0 0; font-family: NHG, Helvetica Neue, Helvetica, Arial, sans-serif; font-weight: 500; font-size: 1.2rem; text-align: center; color: #000000;">Want to go ad free?</p></a>' );
					}
				} );
			}

			// click handler
			var $removeAds = $( ".remove-ads" );
			if ( $removeAds.length > 0 ) {
				$removeAds.on( "click", function ( event ) {
					event.preventDefault();
					MITTR.overlay.open( removeAdsUrl );
				} );
			}
		}
	},

}; // ads

/**
 * ----------------------------------------------------------------------
 * [handles "zoom cover" on mag TOCs]
 *
 */
MITTR.magazine = {

	init: function () {
			$( "#zoomer" ).on( "click", function ( event ) {
				event.preventDefault();

				$( this ).parent().toggleClass( "expanded" );
			} );

			var cover_story = $( "#in-issue .view-display-id-new_cover_story .col" );

			$( "#in-issue .view-display-id-new_feature_stories .col:eq(0)" ).html( cover_story.html() );
			cover_story.remove();
		} // init
}; // MITTR.magazine

/**
 * ----------------------------------------------------------------------
 * [contributor widget description]
 *
 */
MITTR.contribwidget = {

	init: function () {
			$( "#contributors-widget ul.tabs li a" ).on( "click", function ( event ) {
				event.preventDefault();

				var index = $( this ).parent().index();
				$( "#contributors-widget div.list div.view-views-page-contributors" ).hide();
				$( "#contributors-widget div.list div.view-views-page-contributors" ).eq( index ).show();
				$( "#contributors-widget ul.tabs li" ).removeClass( "active" ).eq( index ).addClass( "active" );
			} );
		} // init
}; // MITTR.contribwidget

MITTR.gallery = {
	slide: 0,
	total: 0,
	animating: false,
	widget: {},

	init: function () {
		var self = this;
		self.widget = $( "#slide" );

		if ( self.widget.length && typeof photo_gallery === "object" ) {
			self.slide = photo_gallery.selected_index;
			self.total = photo_gallery.slides.length;

			self.widget.find( ".play-pause a" ).on( "click", function ( event ) {
				event.preventDefault();

				self.animate();
			} );

			self.widget.find( ".directions a" ).on( "click", function ( event ) {
				event.preventDefault();

				self.loadSlide( self.getSlide( this.className ) );
				if ( self.animating ) {
					self.animate();
				}
			} );

			self.widget.find( "img" ).on( "load", function ( event ) {
				$( this ).fadeTo( 0, 1 );
				if ( self.animating ) {
					$( this ).addClass( "animate" );
				}
			} ).on( "animationend webkitAnimationEnd oanimationend MSAnimationEnd", function ( event ) {
				$( this ).fadeTo( 0, 0 ).removeClass( "animate" );
				self.loadSlide( self.getSlide( "next" ) );
			} );
		}
	},

	getSlide: function ( direction ) {
		if ( direction === "prev" ) {
			this.slide--;
		} else {
			this.slide++;
		}

		if ( this.slide < 0 ) {
			this.slide = 0;
		} else if ( this.slide >= this.total ) {
			this.slide = this.total - 1;
		}

		return photo_gallery.slides[ this.slide ];
	},

	loadSlide: function ( slide ) {
		this.widget.find( ".count" ).text( ( this.slide + 1 ) + " of " + this.total );
		this.widget.find( "img" ).fadeTo( 0, 0 ).attr( {
			"src": slide.image_url,
			"width": slide.width,
			"height": slide.height
		} );
		this.widget.find( "figcaption" ).empty().html( slide.caption );

		if ( this.slide === 0 ) {
			this.widget.find( "a.prev" ).hide();
			this.widget.find( "a.next" ).show();
		} else if ( this.slide === ( this.total - 1 ) ) {
			this.widget.find( "a.prev" ).show();
			this.widget.find( "a.next" ).hide();
			if ( this.animating ) {
				this.animate();
			}
		} else {
			this.widget.find( "a" ).show();
		}

		var path = window.location.pathname;
		if ( window.location.pathname.indexOf( "slide/" ) ) {
			path = window.location.pathname.substring( 0, window.location.pathname.indexOf( "slide/" ) );
		}

		_gaq.push( [ '_trackPageview', path + "slide/" + ( this.slide + 1 ) + "/" ] );
	},

	animate: function () {
		this.widget.find( ".play-pause" ).toggleClass( "playing" );
		if ( this.animating ) {
			this.animating = false;
			this.widget.find( "img" ).removeClass( "animate" );
		} else {
			this.animating = true;
			this.loadSlide( this.getSlide( "next" ) );
		}
	}
};

/**
 * ----------------------------------------------------------------------
 * VIEWS FROM THE MARKETPLACE
 * used for views from the marketplace
 */
MITTR.vftm = {

	// add an on onfocus to all input[type="text"] fields
	init: function () {

		// for tooltips -----------
		// find all the "explain" (what is this?) link, add tooltip to be shown on click
		$( "#vftm .explain, h3.vftm .explain" ).click( function ( event ) {
			event.preventDefault();

			// show hide the tooltip
			MITTR.vftm.tooltipShowHide( this );
		} );

		// add close function to tooltip's "X"
		$( "#vftm-tooltip-close" ).click( function ( event ) {
			event.preventDefault();

			$( "#vftm-tooltip" ).hide();
		} );

	}, // init

	tooltipShowHide: function ( buttonPressed ) {
			// get the position of the button that was clicked
			var buttonPosition = $( buttonPressed ).offset();
			var buttonX = buttonPosition.left;
			var buttonY = buttonPosition.top;

			// move the Y down below the text
			buttonY = buttonY + 20;

			// move the X so the left edge of the tooltip aligns with the left edge of the button
			var tooltipWidth = $( "#vftm-tooltip" ).width();
			var buttonWidth = $( buttonPressed ).width();
			buttonX = buttonX + buttonWidth - tooltipWidth + 10;

			// move the tooltip
			$( "#vftm-tooltip" ).css( "left", buttonX ).css( "top", buttonY ).show();

		} // tooltipShowHide;

}; // end vftm

/**
 * ----------------------------------------------------------------------
 * BUSINESS REPORTS
 * used for business reports
 */
MITTR.br = {
	lastArrowPos: 0,
	lastScrollPos: 0,

	// initialize the right/left arrows for business report issues
	init: function () {

		MITTR.br.positionNav();

		// set up repositioner
		$( window ).scroll( function ( baseArrowPos ) {
			MITTR.br.positionNav();
		} );

		// setup and fadein the next/prev links
		$( window ).load( function () {
			var fadeInSpeed = 800;
			MITTR.br.prevnext( '#business-report-issue-nav a[rel~="next"]', fadeInSpeed );
			MITTR.br.prevnext( '#business-report-issue-nav a[rel~="prev"]', fadeInSpeed );
		} );

	}, // init

	prevnext: function ( thisLink, thisSpeed ) {
		// settings
		var closedPosition = 0;
		var linkWidth = $( thisLink ).width();
		var openSpeed = 50 + ( linkWidth * 2 ); // dynamicly speed up/slow down opens based on width of tab
		var closeSpeed = 200;

		// is this left or right?
		var linkSide = "";

		if ( thisLink.indexOf( "next" ) > 0 ) {
			linkSide = "right";
		} else {
			linkSide = "left";
		}

		// position it
		closedPosition = ( linkWidth * ( -1 ) );
		$( thisLink ).css( linkSide, closedPosition + 'px' );

		// handle mouseenter
		$( thisLink ).on( "mouseenter", function () {
			var animateCSS = {};
			animateCSS[ linkSide ] = "0px";
			$( thisLink ).stop().animate( animateCSS, openSpeed );
		} );

		// handle mouseleave
		$( thisLink ).on( "mouseleave", function () {
			var animateCSS = {};
			animateCSS[ linkSide ] = closedPosition + "px";
			$( thisLink ).stop().animate( animateCSS, openSpeed );
		} );

		// fade it in
		$( thisLink ).hide().css( {
			'opacity': '1'
		} ).fadeIn( thisSpeed, 'linear' );

		$( thisLink ).css( {
			linkSide: closedPosition + 'px'
		} );
	}, // prevnext

	positionNav: function () {
		// article constants
		var maxYCoord = $( '#main-article' ).height() - $( '#business-report-issue-nav a[rel=prev]' ).height();
		var articlePos = $( '#main-article' ).position().top;
		var articleHeight = $( '#main-article' ).height();
		// window constants
		var navHeight = $( '#tr-global-header-sticky' ).height(); //37
		var windowHeight = $( window ).height();

		var currentScroll = $( window ).scrollTop();

		var articleTop = Math.min( windowHeight, Math.max( navHeight, articlePos - currentScroll ) );
		var articleBottom = Math.max( navHeight, Math.min( windowHeight, articleHeight + articlePos - currentScroll ) );

		var arrowPos = ( ( ( articleTop + articleBottom ) / 2 ) - articlePos + currentScroll ) - $( '#business-report-issue-nav a[rel=prev]' ).height() / 2;
		if ( arrowPos >= maxYCoord ) {
			arrowPos = maxYCoord;
		}
		if ( arrowPos <= 0 ) {
			arrowPos = 0;
		}
		$( '#business-report-issue-nav' ).css( 'top', arrowPos + 'px' );

	}, // positionNav

}; // end br

/**
 * ----------------------------------------------------------------------
 * PACKAGE TOC
 * used for package TOCs
 */
MITTR.packagetoc = {

	// initialize the right/left arrows for the package toc header
	init: function () {
		// setup and fadein the next/prev links
		$( window ).load( function () {
			var fadeInSpeed = 800;
			MITTR.packagetoc.prevnext( '#package-custom-stage-nav a[rel~="next"]', fadeInSpeed );
			MITTR.packagetoc.prevnext( '#package-custom-stage-nav a[rel~="prev"]', fadeInSpeed );
		} );

	}, // init

	prevnext: function ( thisLink, thisSpeed ) {
		// settings
		var closedPosition = 0;
		var linkWidth = $( thisLink ).width();
		var openSpeed = 50 + ( linkWidth * 2 ); // dynamicly speed up/slow down opens based on width of tab
		var closeSpeed = 200;

		// is this left or right?
		var linkSide = "";

		if ( thisLink.indexOf( "next" ) > 0 ) {
			linkSide = "right";
		} else {
			linkSide = "left";
		}

		// position it
		closedPosition = ( linkWidth * ( -1 ) );
		$( thisLink ).css( linkSide, closedPosition + 'px' );

		// handle mouseenter
		$( thisLink ).on( "mouseenter", function () {
			var animateCSS = {};
			animateCSS[ linkSide ] = "0px";
			$( thisLink ).stop().animate( animateCSS, openSpeed );
		} );

		// handle mouseleave
		$( thisLink ).on( "mouseleave", function () {
			var animateCSS = {};
			animateCSS[ linkSide ] = closedPosition + "px";
			$( thisLink ).stop().animate( animateCSS, openSpeed );
		} );

		// fade it in
		$( thisLink ).hide().css( {
			'opacity': '1'
		} ).fadeIn( thisSpeed, 'linear' );

		$( thisLink ).css( {
			linkSide: closedPosition + 'px'
		} );
	}, // prevnext
}

/**
 * ----------------------------------------------------------------------
 * Livefyre
 * used for livefyre
 */
MITTR.livefyre = {
	libraries: [],

	init: function () {},

	loadLibs: function () {
		if ( this.libraries.length ) {
			var library = this.libraries.shift();

			$.getScript( library, function () {
				MITTR.livefyre.loadLibs();
			} );
		}
	}
}; // end livefyre

/**
 * ----------------------------------------------------------------------
 * Authentication
 * used for events related to user authentication (log ins, log outs, etc.)
 */
MITTR.authentication = {
		alreadyLoggedIn: false,

		init: function () {
			// IE8 and below will throw and exception here. We don't support IE8 and
			// below, so don't offer an alternative menthod, but wrap it in a try{}
			// so that it won't prevent the Livefyre stream from loading.
			try {
				// Add the window.postMessage event listener. This is needed because the overlay might not be the same origin as the parent.
				window.addEventListener( "message", function ( e ) {
					MITTR.authentication.receiveMessage( e );
				}, false );
			} catch ( e ) {}
		},

		justLoggedOn: function ( updateUrl ) {

			if ( MITTR.authentication.alreadyLoggedIn ) {
				return;
			}

			if ( updateUrl ) {
				// call background account update
				$.getScript( updateUrl );
			}

			// update all menu items
			this.isLoggedOn();

		}, // justLoggedOn

		isLoggedOn: function () {

			// user is on, update the menus
			$( "a.login" ).attr( "href", "/my/" ).text( "My Account" );

			// remove overlay
			$( "a.login" ).removeAttr( 'data-overlay' );
			$( "a.login" ).off( "click" );

		}, // isLoggedOn

		receiveMessage: function ( event ) {
			// Make sure the message origin is either the same as our origin or with only the protocol swapped.
			var sameOrigin = window.location.protocol + "//" + window.location.host;
			var otherOrigin = ( window.location.protocol == "http:" ? "https:" : "http:" ) + "//" + window.location.host;
			if ( event.origin != sameOrigin && event.origin != otherOrigin ) {
				return;
			}

			var loginRegex = /^login(?:&updateurl=(.*))?$/;
			var loginMatch = loginRegex.exec( event.data );
			if ( loginMatch && loginMatch.length >= 1 ) {
				var updateUrl = loginMatch.length >= 2 ? loginMatch[ 1 ] : NULL;
				MITTR.authentication.justLoggedOn( updateUrl );
			}
		}

	} // end authentication

/**
 * ----------------------------------------------------------------------
 * ADDTHIS CONFIG AND SHARE SETTINGS
 *
 */
var addthis_config = {
	ui_click: true,
	pubid: "ra-4df12eda07a410ab",
	ui_508_compliant: true,
	ui_cobrand: "MIT Technology Review",
	ui_delay: 250,
	data_ga_property: "UA-7747898-5",
	data_ga_social: true,
	data_track_clickback: false,
	services_exclude: "print, printfriendly"
};

var addthis_share = {
	url_transforms: {
		shorten: {
			twitter: 'bitly'
		}
	},
	shorteners: {
		bitly: {}
	}
}; // end, addthis configs

/**
 * ***********************************************************************
 * LOAD UP THE PAGE
 */
$( document ).ready( function () {

	// bring in the applicable inits
	MITTR.ux.init();
	MITTR.authentication.init();
	MITTR.editions.init();
	MITTR.magazine.init();
	MITTR.contribwidget.init();
	MITTR.gallery.init();
	MITTR.welcome.init(); // disabled on 13 Nov 2012
	if ( $( '#notify_overlay' ) ) {
		MITTR.notifier.init();
	}
	// if($("article#main-article div.meta-bar.sponsored").length) {
	//  MITTR.abc.init();
	// }
	if ( $( '#business-report-issue-nav' ).length ) {
		MITTR.br.init();
	}
	if ( $( '#package-custom-stage-nav' ).length ) {
		MITTR.packagetoc.init();
	}

	// addthis, merge global with page specific variables, then init
	if ( typeof addthis_share_details == 'object' ) {
		jQuery.extend( addthis_share, addthis_share_details );
	}
	if ( typeof addthis != 'undefined' && typeof addthis.init != 'undefined' ) {
		addthis.init();
	}

	$( "#features-list li a" ).on( "mouseenter mouseleave", function ( event ) {
		event.preventDefault();

		var index = $( this ).parent().index();
		$( "#features-box li" ).hide().eq( index ).show();
		$( "#features-list li" ).removeClass( "active" ).eq( index ).addClass( "active" );

		_gaq.push( [ '_trackEvent', 'Home Page: Carousel: Editors Picks', 'Click', index.toString() ] );
	} );

	var height = 45;
	$( ".features-nav li" ).each( function ( index, element ) {
		if ( $( element ).height() > height ) {
			height = $( element ).height();
		}
	} );
	$( ".features-nav li a" ).height( height + "px" );

	$( ".features-nav li a" ).on( "mouseenter mouseleave", function ( event ) {
		event.preventDefault();

		var index = $( this ).parent().index();
		$( ".features-nav li" ).removeClass( "active" ).eq( index ).addClass( "active" );
		$( ".features-graphics li" ).removeClass( "active" ).eq( index ).addClass( "active" );

		_gaq.push( [ '_trackEvent', 'Home Page: Carousel: Editors Picks', 'Click', index.toString() ] );
	} );

	if ( !$( "#the-feed" ).length ) {
		$( "#tr-global-header-sticky ul.the-feed-header li.active" ).removeClass( "active" );
	}

	$( "#package-nav a.close" ).on( "click", function ( event ) {
		event.preventDefault();

		$( "#package-nav" ).toggleClass( "closed" );

		if ( $( "#package-nav" ).hasClass( "closed" ) ) {
			$( "#package-nav a.close" ).text( "Open Table of Contents" );
		} else {
			$( "#package-nav a.close" ).text( "Close" );
		}
	} );

	$( "#the-feed ul.tab-nav li a" ).on( "click", function ( event ) {
		event.preventDefault();

		var old_tab = $( "#the-feed ul.tab-nav li.active" ).attr( "id" );
		var tab = $( this ).parent().attr( "id" );
		var index = $( this ).parent().index();

		$( "#the-feed .homepage-feed" ).hide();
		$( "#" + old_tab ).removeClass( "active" );
		$( "#tr-global-header-sticky ul.the-feed-header li" ).removeClass( "active" ).eq( index ).addClass( "active" );

		$( "#" + old_tab.replace( "-tab", "" ) + "-ad-1 > .dfp-tag-wrapper" ).detach().appendTo( "#" + tab.replace( "-tab", "" ) + "-ad-1" );
		$( "#" + old_tab.replace( "-tab", "" ) + "-ad-2 > .dfp-tag-wrapper" ).detach().appendTo( "#" + tab.replace( "-tab", "" ) + "-ad-2" );

		$( "#" + tab ).addClass( "active" );
		$( "#" + tab.replace( "-tab", "" ) ).show();

		googletag.cmd.push( function () {
			googletag.display( "dfp-ad-tr_www_body_rail_right_bottom_portrait" );
		} );

		googletag.cmd.push( function () {
			googletag.display( "dfp-ad-tr_www_body_rail_right_bottom_portrait_only_300x250" );
		} );

		_gaq.push( [ '_trackEvent', 'Home Page: Carousel: The Latest', 'Click', tab ] );
	} );

	$( ".top-stories .tab-nav li a" ).on( "click", function ( event ) {
		event.preventDefault();

		$( '.top-stories .top-stories-list' ).hide();

		var parent = $( this ).parent();
		var section = parent.attr( "id" ).replace( "tab-nav-", "" );
		parent.siblings().removeClass( 'active' );

		parent.addClass( "active" );
		$( "#top-stories-" + section ).show();

		_gaq.push( [ '_trackEvent', 'Home Page: Carousel: Top Stories', 'Click', section ] );
	} );

	$( "#insider-homepage .tab-nav li a" ).on( "click", function ( event ) {
		event.preventDefault();

		$( '#insider-homepage .homepage-insider-section' ).hide();

		var parent = $( this ).parent();
		var section = parent.attr( "id" ).replace( "homepage-insider-tab-", "" );
		parent.siblings().removeClass( 'active' );

		parent.addClass( "active" );
		$( "#homepage-insider-" + section ).show();

		_gaq.push( [ '_trackEvent', 'Home Page: Insider', 'Click', section ] );
	} );

	$( "#related .feed-wrap ul.tab-nav li a" ).on( "click", function ( event ) {
		event.preventDefault();

		var parent = $( this ).parent();
		var new_index = parent.index();

		var active = parent.parent().children( ".active" );
		var old_index = active.index();
		active.removeClass( "active" );

		$( "#the-feed > div" ).eq( old_index ).hide();

		var old_ad_prefix = "";
		var new_ad_prefix = "";

		switch ( old_index ) {
		case 0:
			old_ad_prefix = "homepage-feed-story_explore_latest";
			break;
		case 1:
			old_ad_prefix = "homepage-feed-story_explore_popular";
			break;
		case 2:
			old_ad_prefix = "homepage-feed-story_explore_shared";
			break;
		}

		switch ( new_index ) {
		case 0:
			new_ad_prefix = "homepage-feed-story_explore_latest";
			break;
		case 1:
			new_ad_prefix = "homepage-feed-story_explore_popular";
			break;
		case 2:
			new_ad_prefix = "homepage-feed-story_explore_shared";
			break;
		}

		$( "#" + old_ad_prefix + "-ad-1 > .dfp-tag-wrapper" ).detach().appendTo( "#" + new_ad_prefix + "-ad-1" );
		$( "#" + old_ad_prefix + "-ad-2 > .dfp-tag-wrapper" ).detach().appendTo( "#" + new_ad_prefix + "-ad-2" );

		$( "#tr-global-header-sticky ul.the-feed-header li" ).removeClass( "active" ).eq( new_index ).addClass( "active" );

		parent.addClass( "active" );
		$( "#the-feed > div" ).eq( new_index ).show();

		googletag.cmd.push( function () {
			googletag.display( "dfp-ad-tr_www_body_rail_right_bottom_portrait" );
		} );

		googletag.cmd.push( function () {
			googletag.display( "dfp-ad-tr_www_body_rail_right_bottom_portrait_only_300x250" );
		} );

		_gaq.push( [ '_trackEvent', 'Story Page: Related Carousel: The Feed', 'Click', new_index.toString() ] );
	} );

	$( "#related div.panels ul.tab-nav li a" ).on( "click", function ( event ) {
		event.preventDefault();
		var self = $( this );
		var parent = self.parent();
		var index = parent.index();
		var panels = parent.parent().siblings( ".panel" );
		parent.siblings().removeClass( "active" );
		parent.addClass( "active" );
		panels.hide().eq( index ).show();

		var feed_wrap = panels.parent().siblings( "div.feed-wrap" );

		var height = panels.parent().height();
		var height_diff = feed_wrap.find( ".tab-nav" ).height();
		height -= height_diff + 21;

		feed_wrap.find( ".viewport" ).height( height + "px" );
		panels.parent().siblings( "div.feed-wrap" ).tinyscrollbar_update();

		_gaq.push( [ '_trackEvent', 'Story Page: Related Carousel', 'Click', ( index + 1 ).toString() ] );
	} );

	if ( $( "#page-wrap" ).length ) {
		var $window = $( window ),
			$wrapper = $( "div.hp-content div.wrapper" ),
			$clicker = $( ".clicker" );

		$window.resize( function () {
			$clicker.width( ( ( $window.width() - $wrapper.width() ) / 2 ) + "px" );
		} );

		$window.resize();
	}
} ); // end, jquery

$( window ).load( function () {
	if ( jQuery().tinyscrollbar ) {
		$( "#related .feed-wrap" ).find( ".viewport" ).height( ( $( "#related .panels" ).height() - ( $( "#related .tab-nav" ).height() + 21 ) ) + "px" ).end().tinyscrollbar();
	}

	MITTR.ads.init();
} );;
/**
 * Copyright (C) 2005 Brightcove, Inc.  All Rights Reserved.  No
 * use, copying or distribution of this work may be made except in
 * accordance with a valid license agreement from Brightcove, Inc.
 * This notice must be included on all copies, modifications and
 * derivatives of this work.
 *
 * Brightcove, Inc MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT
 * THE SUITABILITY OF THE SOFTWARE, EITHER EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT. BRIGHTCOVE SHALL NOT BE LIABLE FOR ANY DAMAGES SUFFERED
 * BY LICENSEE AS A RESULT OF USING, MODIFYING OR DISTRIBUTING THIS
 * SOFTWARE OR ITS DERIVATIVES.
 *
 * "Brightcove" is a trademark of Brightcove, Inc.
 **/

/*********************************************** CONFIGURATION ************************************************/

/**
 * This is the API Token assigned to each Brightcove customer that allows for the use of Brightcove's Media Read API.
 * Fill in your read API token (there are two versions, but you want the one that includes URL responses) here.
 */
var BCReadAPIToken = "jwmNofymLI9An7BstIE4ACabh5Y3I05U63ttajnMskk.";

/**
 * This value indicates whether or not your account is set-up for UDS. HTML5 requires that the files be delivered
 * over HTTP.  This is accomplished by having an account that is configured for HTTP (PD) delivery or that is set-up
 * for UDS. 
 */
var isUDS = false;

/* This variable is a dictionary that contains information about the location of each
 * Brightcove video object within the DOM of the page. Specifically, it is an associative array
 * where, for each stored mapping, the keys is the playerID of a given video, and the value is
 * the next sibling of that video object in the DOM. Keeping track of this sibling will allow
 * us to re-insert the mobile compatible <video> tag into the correct place (before this sibling)
 * in the DOM of the original page.
 */
var pagePlacementInfo = new Object();

/**********************************************************************************************************************/
/*********************************************** DOM MODIFICATION CODE ************************************************/
/**********************************************************************************************************************/

/* This is the main entry function. It goes through the list of all video objects that need to be removed,
 * and one by one, initiates a request that causes that object to be removed and replaced by the
 * appropriate <video> tag (if the JS detects that the browser is on a smartphone).
 */
function runMobileCompatibilityScript(bcExperienceID, videoTagID){
	//detect if this is a smartphone or not
	var thisIsSmartPhone = DetectSmartphone();

	if (!thisIsSmartPhone) {
	    return;
	}

	
	makeMobileCompatible(bcExperienceID, videoTagID);
}

/* This method works on a specific object, represented by id "strObjID". The method retrieves the
 * element with the given ID from the DOM, and then extracts the player ID from the video
 * object. Then, it removes the video object from the page's DOM and stores its location in the page
 * in a global dictionary variable (this will be useful when we want to add the corresponding
 * video tag back in the page in the appropriate place).
 *
 * Finally, the method submits an API Read request to the Brightcove server through the initiateMobileVideoRetrieval()
 * method in order to retrieve the sepcific Video URL corresponding to the given object.
 */
function makeMobileCompatible(strObjID, videoTagID){
	//our video object (which we need to remove)
	var vidObj = document.getElementById(strObjID);
	
	//extract the playerID of this video object before deleting it
	var vidPlayerID = getParamValueForVidObject(vidObj, 'playerID');
	var programmedVideo = getParamValueForVidObject(vidObj, '@videoPlayer');

	//if the video player ID could not be extracted from the Source Code, for some reason,
	//then refer to the dictionary provided by the user
	if (vidPlayerID == null || typeof vidPlayerID == 'undefined'){
			vidPlayerID = BCVidObjects[strObjID];
	}

	//store the parent of the node we wish to remove
	var parentObj = vidObj.parentNode;
	
	//this is the object before which our vidObj element occurs in the parent element's DOM.
	//likewise, when we insert our <video> tag, we will insert it BEFORE this element,
	//in order to maintain the look of the page (this is the best that we can do...)
	var nextAdjacentNode = vidObj.nextSibling;
	
	//if there are no nodes after this node that was removed, then store 'null' to indicate that this was the last
	//child.
	if (nextAdjacentNode == null){
		pagePlacementInfo[""+strObjID] = null;
	}
	//otherwise store the next sibling
	else {
		pagePlacementInfo[""+strObjID] = nextAdjacentNode;	
	}
	
	//now, dynamically remove the video object from the DOM
	parentObj.removeChild(vidObj);

	//this procedure will make the appropriate API calls to get the first video corresponding to the player ID 
	//of the object we just removed.
	
	initiateMobileVideoRetrieval(vidPlayerID, programmedVideo, BCReadAPIToken, videoTagID, strObjID);
}


/** 
 * This function takes an object representing a Brigthcove video embed and a particular 'parameter' that was
 * passed to the Brightcove video object and returns the parameter.
 */
function getParamValueForVidObject(vidObj, paramName) {
	//these are the children nodes of the given object in the DOM
	var childrenNodes = vidObj.childNodes;
	var tagName;
	
	//loop through all children of the video object, searching for <param> tags.
	//each time we find a <param> tag, we check whether its name is 'flashVars'.
	//if so, we store the param's value and break from the loop, otherwise we
	//continue
	for (var i = 0; i < childrenNodes.length; i++){
	    if (childrenNodes[i].nodeType != 1) {
		continue;
	    }

	    tagName = childrenNodes[i].tagName.toLowerCase();
	    if (tagName == "param"){
		if (childrenNodes[i].getAttribute("name") == paramName){
		    return childrenNodes[i].getAttribute("value");
		}
	    }
	}

	return null;
}

/**
 * Takes a string 'str' that consists of multiple arguments separated by ampersands (&),
 * and breaks it down so that it can extract and return the paramName from the string.
 */
function parseParamFromString(str, paramName) {
	var params = str.split("&"); //array of strings
	for (var i = 0; i < params.length; i++){
		if (params[i].indexOf(paramName) != -1){
			return params[i].substr(params[i].indexOf("=")+1);
		}
	}
	
	// if we could not find the param then return null
	return null;
}



/**********************************************************************************************************************/
/****************************************** MEDIA API CALLS & VIDEO TAG INSERTION *************************************/
/**********************************************************************************************************************/

/* This method calls the Brightcove Media API to get all playlists included within a particular
 * playerID.
 */
function initiateMobileVideoRetrieval(playerID, programmedVideoID, readAPIToken, videoTagID, strObjID) {
    var APICall;
    var scriptNode;
    var scriptText;
    var callbackMethodName;

    if (programmedVideoID) {
	if (programmedVideoID.indexOf('ref:') != -1) {
	    APICall = "http://api.brightcove.com/services/library?command=find_video_by_reference_id&reference_id="+programmedVideoID.substring(4)+"&token="
		+readAPIToken;
	}
	else {
	    APICall = "http://api.brightcove.com/services/library?command=find_video_by_id&video_id="+programmedVideoID+"&token="
		+readAPIToken;
	}

	//when we make the API call, we specify a response handler (known as a callback method) that will deal with the response from
	//the Brightcove server. However, we create a customized 'callback' method for each playerID, so that when we are 'inside' the
	//callback method (after receiving the server's reponse), we will know which playerID the response corresponds to. This variable
	//stores the name (which includes the playerID) of that callback method.
	callbackMethodName = "handleJSONResponseForID"+new Date().getTime();
	scriptNode = document.createElement("script");
	scriptNode.setAttribute("language", "javascript");
	scriptText = 
		"function "+callbackMethodName+"(JSONResponse){\n" + 
			"\thandleVideoResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+
		"}\n";
    }
    else {
	APICall = "http://api.brightcove.com/services/library?command=find_playlists_for_player_id&player_id="+playerID+"&token="
								+readAPIToken;
	callbackMethodName = "handleJSONResponseForID"+ new Date().getTime();
	scriptNode = document.createElement("script");
	scriptNode.setAttribute("language", "javascript");
	scriptText = 
		"function "+callbackMethodName+"(JSONResponse){\n" + 
			"\thandlePlaylistResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+
		"}\n";
    }

    if (isUDS) {
	APICall += "&media_delivery=http";
    }

	//NOTE: we add to the end of the body, so that we do not disrupt any of the order of the children
	//at the top of the body's DOM tree
	var scriptTextNode = document.createTextNode(scriptText);
	scriptNode.appendChild(scriptTextNode);
	document.body.appendChild(scriptNode);
	
	//make the API call, specifying the unique callback method for this request
	addScriptTag("getMobileRendition",  APICall, callbackMethodName);
}

/* Methods needed to make API Calls to the Brightcove server*/
function addScriptTag(id, url, callback) {
	var scriptTag = document.createElement("script");
	var noCacheIE = '&noCacheIE=' + (new Date()).getTime();
   
   // Add script object attributes
   scriptTag.setAttribute("type", "text/javascript");
   scriptTag.setAttribute("charset", "utf-8");
   scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
   scriptTag.setAttribute("id", id);
	
	var head = document.getElementsByTagName("head").item(0);	
	head.appendChild(scriptTag);
}

/**
 * This is the general response-handler for the JSON response from the Brightcove server for playlist based players.
 * The arguments to the method include the response object, as well as the playerID of the 
 * object which this response pertains to.
 *
 */
function handlePlaylistResponse(JSONResponse, playerID, videoTagID, strObjID) {
	//obtain first playlist in Brightcove Player given corresponding to this playerID
	var firstPlaylist = JSONResponse.items[0];
	
	//obtain the first video from our first playlist
	var firstVideo = firstPlaylist.videos[0];

	embedHTML5PlayerForVideo(firstVideo, playerID, videoTagID, strObjID);
}

/**
 * This is the general response-handler for the JSON response from the Brightcove server for playlist based players.
 * The arguments to the method include the response object, as well as the playerID of the 
 * object which this response pertains to.
 *
 */
function handleVideoResponse(JSONResponse, playerID, videoTagID, strObjID) {
    embedHTML5PlayerForVideo(JSONResponse, playerID, videoTagID, strObjID);
}

/** 
 * For a given video object (from the BC APIs) we will embed an HTML 5 'video' tag.
 * Requires searching through the renditions associated with the video object
 * for a rendition that is a 'best' match and passing the URL to the video
 * tag.
 *
 * In this handler, we explore the JSON object in search of the first video in the
 * first playlist that is returned by the Brightcove server. Then, once we identify
 * this first video, we examine the various renditions of the video and search
 * for the rendition that is most appropriate for a mobile (H.264 encoding 
 * and 256 kbps). 
 */
function embedHTML5PlayerForVideo(video, playerID, videoTagID, strObjID) {
	//obtain the array of various renditions that exist for this video.
	//NOTE: a rendition, from our perspective, has a certain encoding rate,
	//      and a certain encoding format. We wish to find the best rendition for
	//      a smartphone.
	var renditions = video.renditions;
	
	//In the for-loop that follows, we traverse all renditions of this first video, searching
	//for the H.264 (mobile-compatible) rendition whose encoding rate is closest to 256kbps
	var bestRenditionIndex = -1;
	var bestEncodingRateSoFar = -1;
	
	for (var i = 0; i < renditions.length; i = i+1){
		//if this rendition is not H264, skip it and move on to the next
		if (renditions[i].videoCodec != "H264"){
			continue;
		}
		
		//if best rendition index variable is uninitialized, then initialize it to
		//this rendition (which is H.264) - we need this because it's possible that
		//there are no H264 renditions at all, and starting our bestRenditionIndex at
		//an invalid value will help us figure out whether we came across any H264 renditions
		//as we were looping.
		if (bestRenditionIndex == -1){
			bestRenditionIndex = i;
			bestEncodingRateSoFar = renditions[i].encodingRate;
		}
		
		//otherwise check to see if this rendition has a better encoding rate than the best one before this
		else if (betterEncodingForMobile(renditions[i].encodingRate, bestEncodingRateSoFar) == renditions[i].encodingRate){
			//if so, then record this rendition as the best one so far
			bestRenditionIndex = i;
			bestEncodingRateSoFar = renditions[i].encodingRate;
		}
	}
	
	//after the for-loop has terminated, if best rendition index still == -1,
	//then that means we don't have ANY H264 renditions. so let the user know,
	//and don't add anything to the page
	if (bestRenditionIndex == -1){
	    bestRendition = video.videoFullLength;
	}
	else {
		bestRendition = renditions[bestRenditionIndex];
	}


	var bestRenditionURL = bestRendition.url;
	
	var vidName = video.name;
	var vidHeight = bestRendition.frameHeight;
	var vidWidth = bestRendition.frameWidth;
	var vidStillURL = video.videoStillURL;
		
	//construct the <video> tag as a DOM element
	var videoScriptTag = formVideoTagFromInfo(videoTagID, vidName, bestRenditionURL, vidWidth, vidHeight, vidStillURL);
	
	//retrieve the component before which this video tag needs to be inserted
	var nextSiblingOfVideo = pagePlacementInfo[strObjID];
	var videoTagParent = nextSiblingOfVideo.parentNode; //the sibling and this video share the same parent node!
		
	//if 'nextSibling' value is null, then we want to add our video as the last child of the parent,
	//so we use the append() method; if 'nextSibling' is defined, then we use insertBefore() to add our video tag
	//into the appropriate location in our page.
	if (nextSiblingOfVideo == null){
		videoTagParent.appendChild(videoScriptTag);
	}
	else{
		videoTagParent.insertBefore(videoScriptTag, nextSiblingOfVideo);
	}
}

/* This function takes two encoding rates and returns the one that
 * is more apprporiate for mobile phones.
 */
function betterEncodingForMobile(encoding1, encoding2){
	IDEAL_ENCODING_RATE = 256000; //bits per second; equivalent to 256 kbps
	
	diff1 = Math.abs(encoding1 - IDEAL_ENCODING_RATE);
	diff2 = Math.abs(encoding2 - IDEAL_ENCODING_RATE);
	
	return ((diff1 <= diff2) ? encoding1 : encoding2);
}

/**
 * This method takes properties of a video, its dimensions, and its poster (still image),
 * inserts them into an HTML 5.0 <video> tag. This <video> object is then returned.
 */
function formVideoTagFromInfo(videoTagID, videoID, videoURL, vidWidth, vidHeight, vidImageURL){
	var videoTag = document.createElement("video");
	if (videoTagID) {
	    videoTag.setAttribute("id", videoTagID);
	}
	else {
	    videoTag.setAttribute("id", videoID);
	}

	videoTag.setAttribute("poster", vidImageURL);
	videoTag.setAttribute("width",""+vidWidth);
	videoTag.setAttribute("height", ""+vidHeight);
	videoTag.setAttribute("controls", "true");
	videoTag.setAttribute("src", videoURL);
	
	return videoTag;
}


/**********************************************************************************************************************/
/****************************************** MOBILE BROWSER DETECTION CODE *********************************************/
/**********************************************************************************************************************/

// JavaScript Document

// Anthony Hand, ahand@hand-interactive.com
// Web: www.hand-interactive.com
// 
// License info: http://creativecommons.org/licenses/by/3.0/us/

//Initialize some initial string variables we'll look for later.
var deviceIphone = "iphone";
var deviceIPad = "ipad";
var deviceIpod = "ipod";
var devicePlaystation = "playstation";
var deviceWap = "wap";

var deviceWinMob = "windows ce";
var enginePie = "wm5 pie";
var deviceIeMob = "iemobile";

var deviceS60 = "series60";
var deviceSymbian = "symbian";
var deviceS60 = "series60";
var deviceS70 = "series70";
var deviceS80 = "series80";
var deviceS90 = "series90";

var deviceBB = "blackberry";

var deviceAndroid = "android";

var deviceMidp = "midp";
var deviceWml = "wml";
var deviceBrew = "brew";

var devicePalm = "palm";
var engineXiino = "xiino";
var engineBlazer = "blazer"; //Old Palm

var devicePda = "pda";
var deviceNintendoDs = "nitro";

var engineWebKit = "webkit";
var engineNetfront = "netfront";


var manuSonyEricsson = "sonyericsson";
var manuericsson = "ericsson";
var manuSamsung1 = "sec-sgh";

var svcDocomo = "docomo";
var svcKddi = "kddi";
var svcVodafone = "vodafone";

//Due to the flexibility of the S60 OSSO Browser, 
//   you may wish to let new S60 devices get the regular pages instead.
var s60GetsMobile = true;


//Due to the flexibility of the iPhone/iPod Touch Browser, 
//   you may wish to let new S60 devices get the regular pages instead.
var iphoneIpodGetsMobile = true;


//Initialize our user agent string.
var uagent = navigator.userAgent.toLowerCase();

//**************************
// Detects if the current device is an iPhone.
function DetectIphone()
{
   if (uagent.search(deviceIphone) > -1)
   {
      //The iPod touch says it's an iPhone! So let's disambiguate.
      if (uagent.search(deviceIpod) > -1)
         return false;
      else 
         return true;
   }
   else
      return false;
}

//**************************
// Detects if the current device is an iPhone.
function DetectIPad()
{
    if (uagent.search(deviceIPad) > -1) {
	return true;       
   }
    else {
      return false;
    }
}

//**************************
// Detects if the current device is an iPod Touch.
function DetectIpod()
{
   if (uagent.search(deviceIpod) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is an iPhone or iPod Touch.
function DetectIphoneOrIpodOrIPad()
{
   //We repeat the searches here because some iPods 
   //  may report themselves as an iPhone, which is ok.
   if (uagent.search(deviceIphone) > -1 ||
       uagent.search(deviceIpod) > -1 ||
       uagent.search(deviceIPad) > -1)

       return true;
    else
       return false;
}

//**************************
// Detects if the current device is an Android OS-based device.
function DetectAndroid()
{
   if (uagent.search(deviceAndroid) > -1)
      return true;
   else
      return false;
}


//**************************
// Detects if the current device is an Android OS-based device and
//   the browser is based on WebKit.
function DetectAndroidWebKit()
{
   if (DetectAndroid())
   {
     if (DetectWebkit())
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is based on WebKit.
function DetectWebkit()
{
   if (uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is the Nokia S60 Open Source Browser.
function DetectS60OssBrowser()
{
   if (DetectWebkit())
   {
     if ((uagent.search(deviceS60) > -1 || 
          uagent.search(deviceSymbian) > -1))
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current device is any Symbian OS-based device,
//   including older S60, Series 70, Series 80, Series 90, and UIQ, 
//   or other browsers running on these devices.
function DetectSymbianOS()
{
   if (uagent.search(deviceSymbian) > -1 ||
       uagent.search(deviceS60) > -1 ||
       uagent.search(deviceS70) > -1 ||
       uagent.search(deviceS80) > -1 ||
       uagent.search(deviceS90) > -1)
      return true;
   else
      return false;
}


//**************************
// Detects if the current browser is a BlackBerry of some sort.
function DetectBlackBerry()
{
   if (uagent.search(deviceBB) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a Windows Mobile device.
function DetectWindowsMobile()
{
   //Most devices use 'Windows CE', but some report 'iemobile' 
   //  and some older ones report as 'PIE' for Pocket IE. 
   if (uagent.search(deviceWinMob) > -1 ||
       uagent.search(deviceIeMob) > -1 ||
       uagent.search(enginePie) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is on a PalmOS device.
function DetectPalmOS()
{
   //Most devices nowadays report as 'Palm', 
   //  but some older ones reported as Blazer or Xiino.
   if (uagent.search(devicePalm) > -1 ||
       uagent.search(engineBlazer) > -1 ||
       uagent.search(engineXiino) > -1)
      return true;
   else
      return false;
}

//**************************
// Sets whether S60 devices running the 
//   Open Source Browser (based on WebKit)
//   should be detected as 'mobile' or not.
//   Set TRUE to be detected as mobile.
//   Set FALSE and it will not be detected as mobile.
function SetS60GetsMobile(setMobile)
{
   s60GetsMobile = setMobile;
};

//**************************
// Sets whether iPhone/iPod Touch devices running the 
//   Open Source Browser (based on WebKit)
//   should be detected as 'mobile' or not.
//   Set TRUE to be detected as mobile.
//   Set FALSE and it will not be detected as mobile.
function SetS60GetsMobile(setMobile)
{
   iphoneIpodGetsMobile = setMobile;
};


//**************************
// Check to see whether the device is a 'smartphone'.
//   You might wish to send smartphones to a more capable web page
//   than a dumbed down WAP page. 
function DetectSmartphone()
{
   //First, look for iPhone and iPod Touch.
   if (DetectIphoneOrIpodOrIPad())
      return true;

   //Now, look for S60 Open Source Browser on S60 release 3 devices.
   if (DetectS60OssBrowser())
      return true;

   //Check for other Symbian devices - older S60, UIQ, other.
   if (DetectSymbianOS())
      return true;

   //Check for Windows Mobile devices.
   if (DetectWindowsMobile())
      return true;

   //Next, look for a BlackBerry
   if (DetectBlackBerry())
      return true;

   //PalmOS.
   if (DetectPalmOS())
      return true;

   //Otherwise, return false.
   return false;
};


//**************************
// Detects if the current device is a mobile device.
//  This method catches most of the popular modern devices.
function DetectMobileQuick()
{
   //Attempt to detect most mobile devices, 
   //   especially mass market feature phones.
   // NOTE: Doesn't usually work reliably...
   if (uagent.search(deviceWap) > -1   || 
	uagent.search(deviceMidp) > -1 ||
	uagent.search(deviceWml) > -1  ||
	uagent.search(deviceBrew) > -1  )
   {
      return true;
   }

   //Detect for most smartphones.
   if (DetectSmartphone())
      return true;

   //Check for a NetFront browser
   if (uagent.search(engineNetfront) > -1)
      return true;

   //Check for a Playstation
   if (uagent.search(devicePlaystation) > -1)
      return true;

   //Check for a generic PDA
   if (uagent.search(devicePda) > -1)
      return true;

   return false;
};


//**************************
// Detects in a more comprehensive way if the current device is a mobile device.
function DetectMobileLonger()
{
   //Run the quick check first.
   if (DetectMobileQuick())
      return true;

   //Check for NTT Docomo
   if (uagent.search(svcDocomo) > -1)
      return true;

   //Check for KDDI
   if (uagent.search(svcKddi) > -1)
      return true;

   //Check for Nintendo DS
   if (uagent.search(deviceNintendoDs) > -1)
      return true;

   //Check for Vodafone 3G
   if (uagent.search(svcVodafone) > -1)
      return true;

   //Finally, detect for certain very old devices with stupid useragent strings.
   if (uagent.search(manuSamsung1) > -1 ||
	uagent.search(manuSonyEricsson) > -1 || 
	uagent.search(manuericsson) > -1)
   {
      return true;
   }

   return false;
};
;
function CreateArticleFlash(elementId, width, height, flashUrl, baseUrl)
{
	var element = document.getElementById(elementId);
	
	if (element)

		
		element.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" height="' + height + '" width="' + width + '"><param name="wmode" value="transparent"><param name="movie" value="' + flashUrl + '"><param name="base" value="' + baseUrl + '" /><embed src="' + flashUrl + '" quality="high" name="movie" type="application/x-shockwave-flash" height="' + height + '" width="' + width +'" base="' + baseUrl + '" wmode="transparent"></object>';
}


function CreateArticleVideo(elementId, width, height, videoId)
{
	var element = document.getElementById(elementId);
	
	if (element)
	
		element.innerHTML = 
		'<object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="playerID" value="605729513001" /><param name="playerKey" value="AQ%2E%2E,AAAAAAEgZvo%2E,jStb8wH-jnKKfspX0-PYNE5za6m3bvHq" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="videoSmoothing" value="true" /><param name="width" value="' + width + '" /><param name="height" value="' + height + '" /><param name="@videoPlayer" value="' + videoId + '" /></object>';

		

}
;
