function livefyreInit( loginUrl, overlayLoginUrl, logoutUrl, configInit ) {
	function livefyreStreamInit() {
		jQuery.getScript( 'http://zor.fyre.co/wjs/v3.0/javascripts/livefyre.js', function () {
			window.livefyreAuthDelegate = new fyre.conv.RemoteAuthDelegate();
			livefyreAuthDelegate.curLoginHandlers = null;
			livefyreAuthDelegate.login = function ( handlers ) {
				// window.postMessage is needed to communicate with the overlay.
				if ( MITTR && MITTR.overlay && window.postMessage ) {
					MITTR.overlay.open( overlayLoginUrl );
				} else {
					location = loginUrl;
				}
				livefyreAuthDelegate.curLoginHandlers = handlers;
			};
			livefyreAuthDelegate.logout = function ( delegate ) {
				location = logoutUrl;
			};
			livefyreAuthDelegate.viewProfile = function ( handlers, author ) {
				if ( author && author.profileUrl ) {
					location = author.profileUrl;
				}
			}
			livefyreAuthDelegate.editProfile = function ( handlers, author ) {
				if ( author && author.settingsUrl ) {
					location = author.settingsUrl;
				}
			}

			function livefyreOverlayReturn( data ) {
				MITTR.overlay.close();
				if ( data && data.livefyreUserToken ) {
					fyre.conv.login( data.livefyreUserToken );
					if ( livefyreAuthDelegate.curLoginHandlers ) {
						livefyreAuthDelegate.curLoginHandlers.success();
					}
				}
			}

			// IE8 and below will throw and exception here. We don't support IE8 and
			// below, so don't offer an alternative menthod, but wrap it in a try{}
			// so that it won't prevent the Livefyre stream from loading.
			try {
				window.addEventListener( "message", function ( event ) {
					livefyreReceiveMessage( event );
				}, false );
			} catch ( e ) {}

			function livefyreReceiveMessage( event ) {
				// Make sure the message origin is either the same as our origin or with
				// only the protocol swapped.
				var sameOrigin = window.location.protocol + "//" + window.location.host;
				var otherOrigin = ( window.location.protocol == "http:" ? "https:" : "http:" ) + "//" + window.location.host;
				if ( event.origin != sameOrigin && event.origin != otherOrigin ) {
					return;
				}

				var livefyreOverlayReturnRegex = /^return=livefyreOverlayReturn(?:&|$)/;
				if ( livefyreOverlayReturnRegex.test( event.data ) ) {
					MITTR.overlay.close();
					// Luckily, the livefyreUserToken is just a string and not an object,
					// so we can just URL decode it.
					var livefyreUserTokenRegex = /(?:^|&)livefyreUserToken=([^&]*)/;
					var livefyreUserTokenMatch = livefyreUserTokenRegex.exec( event.data );
					if ( livefyreUserTokenMatch && livefyreUserTokenMatch.length == 2 ) {
						var livefyreUserToken = decodeURIComponent( livefyreUserTokenMatch[ 1 ] );
						fyre.conv.login( livefyreUserToken );
						if ( livefyreAuthDelegate.curLoginHandlers ) {
							livefyreAuthDelegate.curLoginHandlers.success();
						}
					}
				}
			}

			configInit();
		} );
	}

	if ( !window.isMobileBrowser ) {
		livefyreStreamInit();
	} else {
		$( "#livefyre-mobile a" ).click( function ( event ) {
			event.preventDefault();
			livefyreStreamInit();
			$( "#livefyre-mobile" ).hide();
		} );
		$( "#livefyre-mobile" ).show();
	}
};
(function ($) {

$(document).ready(function() {

  // Expression to check for absolute internal links.
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (ga.trackDomainMode == 2 && isCrossDomain(this.hostname, ga.trackCrossDomains)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            event.preventDefault();
            _gaq.push(["_link", this.href]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function() {
    var href = $.colorbox.element().attr("href");
    if (href) {
      _gaq.push(["_trackPageview", href.replace(isInternal, '')]);
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
function isCrossDomain(hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
}

})(jQuery);
;
