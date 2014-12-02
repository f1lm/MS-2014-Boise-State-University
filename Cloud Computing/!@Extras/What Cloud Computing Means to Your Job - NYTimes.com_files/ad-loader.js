window.NYTADX = {};

/**
 * AdX positions for the article page
 *
 * @public
 * @param NYTADX[positions]
**/
NYTADX.positions = [
	'XXL',
	'Middle1C',
	'HP',
	'Bar1',
	'Box1',
	'Box3', // C Column
	'Moses',
	'Frame4A',
	'Spon2',
	'Position1',
	'Ribbon',
	'RibbonInterstitial',
	'SponLink',
	'SponLinkA',
	'MiddleLeft',
	'MostEm',
	'Slideshow_int',
	'Slideshow_end',
	'SFMiddle',
	'CcolumnSS', // Dealbook
	'Anchor',
	'Inv1',
	'ab1',
	'ab2',
	'ab3',
	'PaidPost',
	'TimesTalks_promo'
];

/**
 * Meta tags on the page. Used only by blogs.
 */
NYTADX.metas = document.getElementsByTagName('meta');

NYTADX.width = (function () {
	if (document.documentElement && document.documentElement.clientWidth) {
		return document.documentElement.clientWidth;
	} else if (window.self && window.self.innerWidth) {
		return window.self.innerWidth;
	} else if (document.body) {
		return document.body.clientWidth;
	} else {
		return 0;
	}
})();

NYTADX.isLandscapeIpad = (function () {
	return ( /iPad/i.test( navigator.userAgent ) && 90 === Math.abs( window.orientation ) );
})();

NYTADX.isFirstDraft = ( -1 !== document.documentElement.className.indexOf( 'blog-first-draft' ) );

if ( ! NYTADX.isFirstDraft || NYTADX.width > 960 || NYTADX.isLandscapeIpad ) {
	NYTADX.positions = NYTADX.positions.concat([
		'TopAd',
		'TopAd1', // for first draft
		'TopAd2',
		'TopAd3',
		'TopAd4',
		'TopAd5'
	]);
}

if ( ( ! NYTADX.isFirstDraft || NYTADX.width <= 960 ) && ! NYTADX.isLandscapeIpad ) {

	if ( NYTADX.isFirstDraft ) {
		NYTADX.positions = NYTADX.positions.concat([
			'MiddleRight1',
			'MiddleRight2',
			'MiddleRight3',
			'MiddleRight4',
			'MiddleRight5'
		]);
	} else {
		NYTADX.positions = NYTADX.positions.concat([
			'MiddleRight',
			'MiddleRight1',
			'MiddleRight2',
			'MiddleRight3',
			'MiddleRight4',
			'MiddleRight5',
			'MiddleRight6',
			'MiddleRight7',
			'MiddleRight8',
			'MiddleRight9',
			'MiddleRight10',
			'MiddleRight11',
			'MiddleRight12',
			'MiddleRight13',
			'MiddleRight14',
			'MiddleRight15'
		]);
	}
}

/**
 * Constructs an ADX call and adds a blocking script tag
 *
 * @public
 * @namespace NYTADX
 * @method buildAdx
**/
NYTADX.buildAdx = function (keywords, sensitivity, isBlocking) {

    //adx host
    var host = 'www.nytimes.com';
    if (/sbx|dev|stg/.test(window.location.host)) {
        host = 'www.stg.nytimes.com';
    } else if (/dev/.test(window.location.host)) {
        host = 'www.dev.nytimes.com';
    }

    //browser width
    var width = NYTADX.width;

    /**
     * Provides a way to access the url parameters
     *
     * @private
     * @method getParams
    **/
    var getParams = (function () {
        var i, param, len, urlParams;
        var urlString = window.location.search;
        var params = {};

        if (urlString.length === 0) {
            return false;
        }

        urlParams = urlString.substring(1).split('&');

        for (i = 0, len = urlParams.length; i < len; i += 1) {
            param = urlParams[i].split('=');
            if (param[1] && param[1].indexOf(',') >= 0) {
                params[param[0]] = param[1].split(',');
            } else {
                params[param[0]] = param[1] || '';
            }
        }

        return params;
    }());

    /**
     * This is a blog function.
     * Check ad_sensitivity and adxPage values and buiild adx call
     */
    var getMeta = function (meta) {
        var metas = NYTADX.metas;

        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === null) {
                continue;
            } else if (metas[i].getAttribute('name').toLowerCase() === meta) {
                return metas[i].getAttribute('content');
            }
        }

        return '';
    };

    /**
     * This is a blog function.
     * Remove XXL if ad_sensitivity meta has noxxl value set
     */
    var getPositions = function () {
        var index, positions = NYTADX.positions;

        if ('noxxl' === getMeta('ad_sensitivity')) {
            index = positions.indexOf("XXL");
            if (index > -1) {
                positions.splice(index, 1);
            }
        }

        return positions.join(',');
    };

    /**
     * Returns the campaign page with a query string override
     *
     * @private
     * @method getPage
    **/
    var getPage = function () {
        var path = location.pathname;
        var campaign = getParams.adx_campaign || 'www.nytimes.com';

        //edit the campaign if an ad sensitivity occurs
        if (sensitivity) {
            return 'www.nytimes.com/' + sensitivity;
        } else {
            return getMeta('adxpage'); //we are going to do strict check with .toLowerCase
        }

        //all other pages get the yr/mo/day structure
        path = path.replace(/\d{4}/, 'yr').replace(/\d{2}/, 'mo').replace(/\d{2}/, 'day');

        return campaign + path;
    };

    /**
     * Returns the keywords supplied by the query string and the article
     *
     * @private
     * @method getKeywords
    **/
    var getKeywords = function () {
        keywords.push('nyt5');

        //make sure we don't get billboard ads with smaller screen sizes
        if (width <= 960) {
            keywords.push('smallviewport');
        }

        //add ricochet parameters to adx if they exist
        if (getParams['rico'] === '1') {
            keywords.push(getParams['keywords']);
        }

        //add homepage keyword
        if (typeof getParams['hp'] !== 'undefined') {
            keywords.push('hp');
        }

        //add any keywords from the url
        if (getParams['ad-keywords']) {
            keywords.push(getParams['ad-keywords']);
        }
        // Add src params
        if (getParams['src']) {
            keywords.push('src-' + getParams['src']);
        }

        return encodeURIComponent(keywords.join(','));
    };

    /**
     * Returns the adx settings
     *
     * @private
     * @method getAdxSettings
    **/
    var getAdxSettings = function () {
        var param;
        var deliveryProofParams = ['adxforce', 'debug'];
        var settings = [
            'autoconfirm=0',
            'interstitials=1',
            'cpp=1',
            'v=3',
            'attributes=nyt5'
        ];

        // proof of ad delivery
        for (var i = deliveryProofParams.length - 1; i >= 0; i -= 1) {
            param = getParams[deliveryProofParams[i]];

            if (typeof param !== 'undefined') {
                settings.push(deliveryProofParams[i] + '=' + (param || '1'));
            }
        }

        return settings.join('&');
    };

    /**
     * Creates the URL to send off to ADX
     *
     * @private
     * @method constructUrl
    **/
    var constructUrl = function () {
        return 'http://' + host + '/adx/bin/adxrun.html?jsonp=NYTADX.processAdx' +
            '&page=' + getPage() +
            '&positions=' + getPositions() +
            '&' + getAdxSettings() +
            '&keywords=' + getKeywords();
    };

    //If AdX is running well, block execution of the page. Otherwise fall back to
    //Backbone's async approach.
    if (isBlocking === true || typeof isBlocking === 'undefined') {
        document.write('<scr' + 'ipt src="' + constructUrl() + '"></sc' + 'ript>');
    }

};

/**
 * Processes the JSONP response from ADX
 *
 * @public
 * @namespace NYTADX
 * @method processAdx
**/
NYTADX.processAdx = function (response) {
    var i, rootEl = document.getElementsByTagName('html')[0];
    var ads = response.ads || {};

    //Determines if adx returned any ads
    var hasAds = function () {
        var ads = response.ads || {};

        if (Object.keys) {
             return Object.keys(ads).length !== 0;
        } else {
            var prop;
            var keyCount = 0;

            //count the ads old school style
            for (prop in ads) {
                keyCount++;
            }
            return keyCount !== 0;
        }
    };

    //When there are no ads, add a special class
    if (!hasAds()) {
        rootEl.className += ' no-ads';
    } else {
		window.blogsRemoveAds = [];
		for ( i = 0; i < NYTADX.positions.length; i += 1 ) {
			if ( ads[ NYTADX.positions[ i ] ] ) {
				continue;
			}
			window.blogsRemoveAds.push( NYTADX.positions[ i ] );
		}

		if ( window.blogsRemoveAds.length ) {
			window.onload = function () {
				var node, i;
				for ( i = 0; i < window.blogsRemoveAds.length; i += 1 ) {
					node = document.getElementById( window.blogsRemoveAds[ i ] );
					if ( ! node ) {
						continue;
					}

					if ( -1 !== node.parentNode.className.indexOf( 'first-draft-ad' ) ) {
						node.parentNode.parentNode.removeChild( node.parentNode );
					} else {
						node.parentNode.removeChild( node );
					}
				}
			};
		}
	}

    //Add classes if there is an XXL
    if (ads.XXL) {
        rootEl.className += ' has-xxl';

    //Add classes if MiddleRight is directly sold
    } else if (ads.MiddleRight && ads.MiddleRight.classification !== 'blank' && ads.MiddleRight.isDirectlySold === 'true') {
        if (parseInt(ads.MiddleRight.width, 10) === 300 && parseInt(ads.MiddleRight.height, 10) === 600) {
            rootEl.className += ' has-half-page';
        } else {
            rootEl.className += ' has-big-ad';
        }
    }

    //Add top ad if it exists and is not empty
    if (ads.TopAd && ads.TopAd.classification !== 'blank') {
        rootEl.className += ' has-top-ad';
    }

    //only add the ads if there is a response
    if (ads) {
        NYTADX.response = response;
    }
};
