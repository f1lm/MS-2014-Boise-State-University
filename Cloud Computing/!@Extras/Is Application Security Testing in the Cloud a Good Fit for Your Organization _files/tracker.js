if (undefined === skywordTracker || null === skywordTracker) {
    var skywordTracker = {trackComplete : false, trackScripts : []};
}

var skywordContentId = function () {
    var cid = null;
    try {

        if (undefined !== contentId && null !== contentId) {
            cid = contentId;
            skywordTracker.trackScripts.push(contentId);
        }
    } catch (e) {

    } finally {
        contentId = null;
    }
    return cid;
};

(function (cid) {

    /*!
     * domready (c) Dustin Diaz 2012 - License MIT
     */
    !function (name, definition) {
        this[name] = definition();
    }('domready', function (ready) {

        var fns = [], fn, f = false,
            doc = document,
            testEl = doc.documentElement,
            hack = testEl.doScroll,
            domContentLoaded = 'DOMContentLoaded',
            addEventListener = 'addEventListener',
            onreadystatechange = 'onreadystatechange',
            readyState = 'readyState',
            loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/,
            loaded = loadedRgx.test(doc[readyState]);

        function flush(f) {
            loaded = 1;
            while (f = fns.shift()) {
                f();
            }
        }

        doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
            doc.removeEventListener(domContentLoaded, fn, f);
            flush();
        }, f);


        hack && doc.attachEvent(onreadystatechange, fn = function () {
            if (/^c/.test(doc[readyState])) {
                doc.detachEvent(onreadystatechange, fn);
                flush();
            }
        });

        return (ready = hack ?
            function (fn) {
                self != top ?
                    loaded ? fn() : fns.push(fn) :
                    function () {
                        try {
                            testEl.doScroll('left');
                        } catch (e) {
                            return setTimeout(function () {
                                ready(fn);
                            }, 50);
                        }
                        fn();
                    }();
            } :
            function (fn) {
                loaded ? fn() : fns.push(fn);
            });
    });


    domready(function () {
        var queryString,
            params,
            scripts,
            i = 0,
            node,
            Track,
            patt,
            indexOf,
            index = -1,
            isMatch = false;

        scripts = document.getElementsByTagName("script");
//        console.log(scripts);
        if (true === skywordTracker.trackComplete) {
            return false;
        }

        indexOf = function (needle) {
            if (typeof Array.prototype.indexOf === 'function') {
                indexOf = Array.prototype.indexOf;
            } else {
                indexOf = function (needle) {
                    var i = -1, index = -1;

                    for (i = 0; i < this.length; i++) {
                        if (this[i] === needle) {
                            index = i;
                            break;
                        }
                    }

                    return index;
                };
            }

            return indexOf.call(this, needle);
        };

        function parseQuery(query) {
            var Params = {}, Pairs, i, key, val, KeyVal;
            if (!query) {
                return Params;
            }
            Pairs = query.split(/[;&]/);
            for (i = 0; i < Pairs.length; i++) {
                KeyVal = Pairs[i].split('=');

                if (!KeyVal || KeyVal.length !== 2) {
                    continue;
                }
                key = unescape(KeyVal[0]);
                val = unescape(KeyVal[1]);
                val = val.replace(/\+/g, ' ');
                Params[key] = val;
            }

            return Params;
        }

        patt = /tracking\.skyword\.com/ig;


        while (i < scripts.length) {
            node = scripts[i];
            isMatch = patt.test(node.src);
            if (true == isMatch || -1 < node.src.indexOf("tracking.skyword.com")) {

                queryString = node.src.replace(/^[^\?]+\??/, "");
                params = parseQuery(queryString);

                index = indexOf.call(skywordTracker.trackScripts, params["contentId"]);
                if (-1 === index && undefined !== params && undefined !== params["contentId"] && null !== params["contentId"]) {
                    skywordTracker.trackScripts.push(params["contentId"]);
                }

                node = null;
            }
            i = i + 1;
        }

//        console.log(skywordTracker.trackScripts);

        function Tracker(trackContentId) {
            this.baseUrl = window.location.protocol + '//';
            this.baseUrl += 'tracking.skyword.com' + (window.location.port != 80 ? (':' + window.location.port) : '') + '/tracker.gif';
            this.baseUrl += '?_url=' + escape(document.URL);
            this.baseUrl += '&_referer=' + escape(document.referrer);
            this.baseUrl += '&_cacheBust=' + (new Date()).getTime() + (((1 + Math.random()) * 0x10000) | 0).toString(16);
            this.baseUrl += '&_contentId=' + escape(trackContentId);
        }

        Tracker.prototype.trackIt = function () {
//            console.log("Tracking... " + this.baseUrl);
            var pixel = new Image();
            pixel.src = this.baseUrl;
        };

        i = 0;
        while (i < skywordTracker.trackScripts.length) {
            Track = new Tracker(skywordTracker.trackScripts[i]);
            Track.trackIt();
            i = i + 1;
        }

        skywordTracker.trackComplete = true;
    }, false);


}(skywordContentId()));
