/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, unused:true, browser:true, devel:true, jquery:true, expr:true, indent:4, maxerr:50 */

this.USN = {};

(function($, exports){

    // normalize all the location and page meta
    var meta = {
        domain: window.location.hostname,
        href: window.location.href,
        path: window.location.pathname.split('/'),
        hash: window.location.hash,
        title: $('title').text() || '',
        description: $('meta[name=description]').attr('content') || '',
        site: ($('meta[name=site]').attr('content') || '').toLowerCase(),
        zone: ($('meta[name=zone]').attr('content') || '').toLowerCase(),
        platformId: ($('meta[name=usn-platform-id]').attr('content') || '').toLowerCase(),
        contentType: ($('meta[name=usn-content-type]').attr('content') || '').toLowerCase(),
        keywords: (function(){
            var content = $('meta[name=keywords]').attr('content') || '',
                keywords = [];
            $.each(content.split(/\s*[,;]\s*/), function (i, keyword) {
                if (!keyword) return;
                keywords.push(keyword.replace(/[^\w]+/g, '').toLowerCase());
            });
            return keywords;
        })(),
        params: (function(){
            var params = {},
                search = window.location.search.split('?')[1] || '',
                raw = (search && search.split('&')) || [];
            $.each(raw, function(i, s){
                var split = s.split('='),
                    k = split[0],
                    v = split[1];
                params[k] = v;
            });
            return params;
        })()
    };

    // global configuration params, including mobile device detection
    var config = {

        debug: !!('debug' in meta.params && meta.params.debug === 'true'),
        // DID YOU KNOW: in ie8, window doesn't have hasOwnProperty? crazy.
        mobile: !!(Object.prototype.hasOwnProperty.call(window, 'orientation') || Math.min(screen.width, screen.height) <= 800),
        highLoad: false,
        scriptPath: (meta.platformId === 'a' ? '/scripts/jquery/' : '/scripts/'),
        staticURL: (function(){
            var remoteDomains = ['jobs.usnews.com', 'usnews.qa.indeed.net', 'usnews.indeed.com'];
            if ('https:' === window.location.protocol) {
                return 'https://secure.usnews.com/static';
            } else if ($.inArray(meta.domain, remoteDomains) !== -1) {
                return 'http://static.usnews.com';
            }
            return '/static';
        })(),
        googleMapsKey: (function(){
            var usn = 'ABQIAAAAUL-WRzPk3uGRWwlo4MpYxRQKRiq8lNJaxupx8aaQXwDifYaUYRThUZmJAgcBiY-MuW1aml-WpYZ6UQ',
                rr = 'ABQIAAAAUL-WRzPk3uGRWwlo4MpYxRRC8LpXqa7dvOnGnzV1_MR_CWLS6RREEnb26TGQZtPbc5xFU7I-tD04gA',
                key = (meta.domain.indexOf('rankingsandreviews.com') >= 0 ? rr : usn);
            return key;
        })()
    };

    // utility and misc functions
    var utils = {};

    utils.log = function () {
        if (typeof console === 'object') {
            console.log.apply(console, arguments);
        }
    };

    utils.debug = function () {
        if (config.debug) {
            this.log.apply(this, arguments);
        }
    };

    // absolutely the simplest handlebars render function possible
    utils.template = function (template, context) {
        if (!template) return '';
        context || (context = {});
        var rendered = template;
        $.each(context, function (key, value) {
            var sub = (['{{ ', key, ' }}']).join('');
            rendered = rendered.replace(sub, value);
        });
        return rendered;
    };

    // bare bones javascript loader
    var Loader = {};

    if (meta.platformId === 'b') {
        // old timey stuff
        // ignore this junk
        Loader.modules = {
            'jquery': '{{ staticURL }}/scripts/jquery/jquery-1.9.1.min.js',
            'jqueryui': '{{ staticURL }}/scripts/jquery/jquery-ui-1.10.1.min.js',
            'ads': 'http://www.usnews.com/usnews/v3/scripts/ads.js',
            'printing': 'http://www.usnews.com/usnews/v3/scripts/print.js',
            'socialbookmarking': 'http://www.usnews.com/usnews/v3/scripts/shareLinks.js',
            'striping': 'http://www.usnews.com/usnews/v3/scripts/stripe.js',
            'tabs': 'http://www.usnews.com/usnews/v3/scripts/tabs.js',
            'slider': 'http://www.usnews.com/usnews/v3/scripts/slide.js',
            'effects': 'http://www.usnews.com/usnews/v3/scripts/effects.js',
            'analytics': 'http://www.usnews.com/usnews/v3/scripts/analytics.js',
            'analyticsextensions': 'http://www.usnews.com/usnews/v3/scripts/analyticsCustom.js',
            'windows': 'http://www.usnews.com/usnews/v3/scripts/window.js',
            'technorati': 'http://www.usnews.com/usnews/v3/scripts/technorati.js',
            'gallery': 'http://www.usnews.com/usnews/v3/scripts/ibox.js',
            'ooyala': 'http://player.ooyala.com/v3/ZTY2M2E1ZmJlOTY4ODkzOGM5YjJiOGZi',
            'jquery.video-embed': '{{ staticURL }}/scripts/jquery/jquery.video-embed.js'
        };
    } else {
        /*
         * USE LOWERCASE!
         */
        Loader.modules = {
            'analytics': '{{ staticURL }}/scripts/Analytics.js',
            'utility': '{{ staticURL }}/scripts/Utility.js',
            'chosen': '{{ staticURL }}/packages/chosen/script/jquery.chosen.min.js',
            'jquery-ui': '{{ staticURL }}/scripts/jquery/jquery-ui-1.10.1.min.js',
            'jqueryui': '{{ staticURL }}/scripts/jquery/jquery-ui-1.10.1.min.js',
            'swfobject': '{{ staticURL }}/scripts/swfobject-2.2.min.js',
            'ckeditor': '{{ staticURL }}/packages/ckeditor/ckeditor.js',
            'detect_timezone': '{{ staticURL }}/scripts/detect_timezone.min.js',
            'jquery.address': '{{ staticURL }}/scripts/jquery/jquery.address-1.5.min.js',
            'googlemaps': 'http://maps.google.com/maps?file=api&v=2&key={{ googleMapsKey }}',
            'googlemapsv3': 'https://maps.googleapis.com/maps/api/js?v=3&sensor=false',
            'gumgum': 'http://g2.gumgum.com/javascripts/ggv2.js',
            'usngmapsv3': '{{ staticURL }}/scripts/USNgmapsV3.js',
            'ooyala': 'http://player.ooyala.com/v3/ZTY2M2E1ZmJlOTY4ODkzOGM5YjJiOGZi',
            'leaflet': '{{ staticURL }}/packages/leaflet/dist/leaflet.js',
            'usnopenstreetmaps': '{{ staticURL }}/scripts/USNopenstreetmaps.js',
            'jquery.history': '{{ staticURL }}/packages/history.js/scripts/bundled/html4+html5/jquery.history.js',
            'select2': '{{ staticURL }}/packages/select2/select2.js',
            'handlebars': '{{ staticURL }}/scripts/vendor/handlebars-2.0.0-alpha.4.min.js',
            'amzn': 'http://c.amazon-adsystem.com/aax2/amzn_ads.js'
        };
    }

    Loader.loaded = [];
    Loader.asyncQueue = [];

    function mungeFilename (f) {
        return (f || '').toLowerCase().replace(/\s+/g, '').replace('.js', '');
    }

    function mungeModuleList (m) {
        var arr = (typeof m === 'string' ? m.split(',') : m);
        $.each(arr, function (i, s) {
            arr[i] = s.replace(/\s+/g, '').replace('.js', '');
        });
        return arr;
    }

    Loader.writeScript = function (src) {
        src || (src = '');
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        document.write(s.outerHTML);
        utils.debug('sync load:', src);
        return src;
    };

    Loader.asyncScript = function (src, callback) {
        src || (src = '');
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = src;
        document.getElementsByTagName('head')[0].appendChild(s);
        s.onload = s.onreadystatechange = function () {
            utils.debug('async load:', src);
            callback && callback();
        };
        return s;
    };

    Loader.runAsyncQueue = function () {
        var q = this.asyncQueue,
            async = this.asyncScript,
            len = q.length;
        if (!q || !len) return this;
        (function next (i) {
            async(q[i], function(){
                if (q[i + 1]) next(i + 1);
            });
        })(0);
        return this;
    };

    Loader.load = function (filename, args) {
        if (!filename) return false;
        var options = $.extend({ async: false }, args),
            module;
        options.module = mungeFilename(filename);
        if (options.module in this.modules) {
            module = utils.template(this.modules[options.module], config);
        } else {
            module = ([config.staticURL, config.scriptPath, filename, '.js']).join('');
        }
        if ($.inArray(module, this.loaded) >= 0) {
            return module;
        }
        if (options.async) {
            this.asyncQueue.push(module);
        } else {
            this.writeScript(module);
        }
        this.loaded.push(module);
        return module;
    };

    // make it real...
    exports.VERSION = '4.0.2';
    exports.meta = meta;
    exports.config = config;
    exports.utils = utils;
    exports.Loader = Loader;

    // USN.load should still work as before
    exports.load = function (m, args) {
        var modules = mungeModuleList(m),
            loaded = [];
        $.each(modules, function (i, name) {
            var module = Loader.load(name, args);
            loaded.push(module);
        });
        return loaded;
    };

    exports.tabbify = function () {
        // curse you, mr. hutton
    };

    // return the USN singleton when/if someone still calls `USN = new Manager()` on a page
    function Manager () { return exports; }
    Manager.prototype = exports;
    this.Manager = Manager;

    // god awful globals that should die in many fires...
    exports.site = meta.site;
    exports.zone = meta.zone;
    this.base_url = config.staticURL;

    // we still need prototype on platform b
    if (meta.platformId === 'b') {
        jQuery.noConflict();
        Loader.load('prototype');
    }

    // go!!
    $(function(){
        Loader.runAsyncQueue();
    });

}).apply(this, [jQuery, this.USN]);
