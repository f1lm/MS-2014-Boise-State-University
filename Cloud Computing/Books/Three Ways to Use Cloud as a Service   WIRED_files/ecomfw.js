/*!
* @version ecomfw.js v2.6.3:1101 01.11.2010
* @author Paul Bronshteyn
* @author Russell Munson
* @comment Built by a geek loaded on caffeine ...
* @copyright (c) Conde Nast Digital
*/

/*
* @changelog
* @082410 DP - removed ping of Offermatica.
* @012110 PB - patch for the double encoded url coming back from amg-ecommerce
* @011110 RC - added edebug & targetVer - targetVer is passed in request to ATG
* @100509 Rmunson - created helper functions for element hide/show, and child remove/append
*                   upsell iframe now uses atg-provided url.
* @091609 Rmunson - getForm() now takes empty fields as well
* @080509 Fix for the scrollbar apearing on VF
*/

if (typeof window.CNP === 'undefined' || !window.CNP) {
    /**
    * Conde Nast Publications global namespace object
    * @namespace Conde Nast Publications global namespace object
    */
    window.CNP = {};
}

/**
* @class CNP Ecommerce Framework
* @description Contains methods for working with ATG eCommerce Platform
* @public
* @author Paul Bronshteyn
* @version ecomfw.js v2.53.1457 09.16.2009
* @example
    Start:
        CNP.ecom.start({
            // required
            cnd: <%= !StringUtils.isEmpty(request.getHeader("cdn-request")) %>,
            // optional, default magazine.currentdomain.com
            host: "&lt;spring:message code='ecom.baseUrl' /&gt;",
            // optional
            pingPath: "status.jsp",
            // optional
            offerPath: "targettedOffer.jsp",
            // optional
            subPath: "embeddedForm.jsp",
            // optional
            showPath: "showOffer.jsp",
            // optional
            path: "/ecom/",
            // optional
            section: "site_section",
            // optional
            user: "user_id",
            // optional
            https: false,
            // optional
            timeout: 4,
            // optional type of javascript encoding would be used to deliver the content
            jsEnc: 'jsesc',
            // optional type of content encoding would be used, default is xml
            contentEnc: 'xml',
            // optional parameters to be sent to ATG
            params: {
                key: value
            },
            // optional, will be called if ping to ATG servers is successful
            callalive: {
                func: some_function,
                params: {
                    name: 'value'
                }
            },
            // optional, will be called if ping to ATG servers timedout or invalid
            calldead: {
                func: some_function,
                params: {
                    name: 'value'
                }
            }
        });

    Request:
        CNP.ecom.request({
            // required
            pid: 'placement_id',
            // required
            tgt: 'targeter_name',
            // optional, additional parameters to be sent to ATG
            params: {
                name: 'value'
            },
            // optional, will be called before the call to ATG
            callbefore: {
                func: some_function,
                params: {
                    name: 'value'
                }
            },
            // optional, will be called after ATG responds
            callafter: {
                func: some_function,
                params: {
                    name: 'value'
                }
            }
        });
*/
CNP.ecom = (function() {
    var
        /**
        * Internal framework name
        * @memberOf CNP.ecom
        * @private
        * @type string
        * @default ecom
        */
        fwid = 'ecom',

        /**
        * Ping Timer
        * @memberOf CNP.ecom
        * @private
        * @type null|timeout
        * @see CNP.ecom.ping
        * @see CNP.ecom.clearPing
        */
        pingTimer = null,

        /**
        * Ping Image.
        * @memberOf CNP.ecom
        * @private
        * @type object
        * @see CNP.ecom.ping
        * @see CNP.ecom.clearPing
        */
        pingImage = null,

        /**
        * Framework ready switch.
        * @description Ready is always true unless ping fails.
        * @memberOf CNP.ecom
        * @private
        * @type boolean
        * @default true
        */
        ready = true,

        /**
        * Framework live switch.
        * @description Live is set by the ping response.
        * @memberOf CNP.ecom
        * @private
        * @type boolean
        * @default false
        * @see CNP.ecom.alive
        * @see CNP.ecom.dead
        */
        live = false,

        /**
        * Ecom calls object.
        * @description Stores all the requests and responses processed.
        * @memberOf CNP.ecom
        * @private
        * @type object
        */
        requests = { idx: 0 },

        /**
        * Ecom suppressed targeters.
        * @description Stores the names of targeters to be suppressed.
        * @memberOf CNP.ecom
        * @private
        * @type string
        */
        suppressed = '',

        /**
        * Request queue.
        * @description Stores all the requests that need to be processed.
        * @memberOf CNP.ecom
        * @private
        * @type array
        */
        queue = [],

        /**
        * window.document shortcut
        * @memberOf CNP.ecom
        * @private
        * @type object
        */
        sd = document,

        /**
        * window.location shortcut
        * @memberOf CNP.ecom
        * @private
        * @type object
        */
        sl = location,

        /**
        * window.location.search shortcut
        * @memberOf CNP.ecom
        * @private
        * @type object
        */
        ss = sl.search,

        /**
        * Test cookie name.
        * @description Test cookie will be set if test url query parameter is used to
                       switch the host ecom framework uses to call ATG.
        * @memberOf CNP.ecom
        * @private
        * @type string
        * @default ecom_test
        * @see CNP.ecom.testparam
        */
        testcookie = fwid + '_test',

        /**
        * Test url query parameter name.
        * @description This parameter lets you switch the host that is being used to call ATG.
        * @memberOf CNP.ecom
        * @private
        * @type string
        * @default ecommerce_test_site
        * @example: http://www.self.com/?ecommerce_test_site=test-magazine.self.com
        */
        testparam = 'ecommerce_test_site',

        /**
        * Sets debug mode.
        * @description This parameter allows usage of debug parameters.
        * @memberOf CNP.ecom
        * @private
        * @type intiger
        * @default 0
        * @example: http://www.self.com/?edebug=1
        */
        edebug = 0,

        /**
        * Sets target version (edebug parameter used in uri).
        * @description This parameter lets you set the targeter version which is being used to call ATG.
        * @memberOf CNP.ecom
        * @private
        * @type bolean/string
        * @default ''
        * @example: http://www.self.com/?targetVer=TEST
        */
        targetVer = false,

        /**
        * Common error prefix.
        * @description This is a common error message prefix used in form validation.
        * @memberOf CNP.ecom
        * @private
        * @type string
        */
        errPrefix = 'Please enter a valid ',

        /**
        * Regular expression to test email addresses
        * @memberOf CNP.ecom
        * @private
        * @type regex
        */
        emailregx = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

        /**
        * Regular expression to test US zipcode
        * @memberOf CNP.ecom
        * @private
        * @type regex
        */
        uszipregx = /(^\d{5}$)|(^\d{5}-\d{4}$)/,

        /**
        * Browser User Agent
        * @memberOf CNP.ecom
        * @private
        * @type string
        */
        userAgent = navigator.userAgent.toLowerCase(),

        /**
        * Browsers object.
        * @memberOf CNP.ecom
        * @private
        * @type object
        */
        browser = {
            safari: /webkit/.test(userAgent),
            opera: /opera/.test(userAgent),
            msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
            moz: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
        },

        /**
        * Sets height property depending on browser
        * @memberOf CNP.ecom
        * @private
        * @type string
        */
        heightprop = ((browser.moz || browser.safari) ? 'offset' : 'scroll') + 'Height',

       /**
        * custom callback names for open /close iframe
        * @memberOf CNP.ecom
        * @private
        * @type Array
        * @default ecom
        */
        customCallbacks = {},

         getElmHeight = function(){
            var D = document;
            return Math.max(
                Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                Math.max(D.body.clientHeight, D.documentElement.clientHeight)
            );
        },


        /**
        * Open a layer with an iFrame
        * @memberOf CNP.ecom
        * @private
        * @param {string} url Url for the iFrame
        * @uses CNP.ecom.elmnew
        * @uses CNP.ecom.selects
        * @uses CNP.ecom.urlParam
        */
        openFrame = function(url) {
            var div,
                frame,
                win = jQuery(window);
            if(elmbyid(fwid + 'usc')){
                div = elmbyid(fwid + 'usc');
            }else{
                div = elmnew('div');
                div.id = fwid + 'usc';
            }
            if(elmbyid(fwid + 'usf')){
                frame = elmbyid(fwid + 'usf');
            }else{
                frame = elmnew('iframe');
                frame.id = fwid + 'usf';
            }

            sd.body.style.overflow = 'hidden';
            merge(div.style, {
                width: sd.body.scrollWidth + 'px',
                height: getElmHeight() + 'px',
                filter: 'alpha(opacity = 80)',
                opacity: '.80',
                zIndex: 110000000,
                position: 'absolute',
                left: '0px',
                top: '0px',
                background: '#000000'
            });

            elmchild(sd.body,div,'ap');

            // hide select boxes on the document
            selects(true);

            merge(frame, {
                name: fwid + 'usf',
                src: urlParam(uriencdec(url).replace(/^https*:\/\//g, protocol()), 'iframe', 'true'),
                width: 749,
                height: 669,
                scrolling: 'no'
            });

            merge(frame.style, {
                background: '#ffffff',
                border: '0px',
                position: 'absolute',
                zIndex: 120000000,
                left: (win.width()/2 - frame.width / 2) + 'px',
                top: (win.scrollTop() + (win.height()/7)) + 'px'
            });


            elmchild(sd.body,frame,'ap');

            bind('load', frame, function() {
                try {
                    this.height = this.contentDocument.body[heightprop] + 'px';
                } catch(e) {}
            });

            bind('resize', window, function() {
                var div = elmbyid(fwid + 'usc'),
                    frame = elmbyid(fwid + 'usf');

                div.style.width = sd.body.scrollWidth + 'px';
                div.style.height = sd.body.scrollHeight + 'px';
                frame.style.left = (win.width()/2 - frame.width / 2) + 'px';
                frame.style.top =  (win.scrollTop() + (win.height()/7)) + 'px';
            });



            div = frame = null;
        },


        /**
        * Create new element shortcut
        * @memberOf CNP.ecom
        * @private
        * @param {string} type Element type to create
        * @param {object} [context] Document in which to create an element
        * @return {object} New element
        */
        elmnew = function(type, context) {
            return (context || sd).createElement(type);
        },

        /**
        * Get element by id shortcut
        * @memberOf CNP.ecom
        * @private
        * @param {string} id Id of the element we are looking for
        * @param {object} [context] Context in which to look for the element
        * @return {object|null} Element
        */
        elmbyid = function(id, context) {
            return (context || sd).getElementById(id);
        },

        /**
        * Get element(s) by tag name shortcut
        * @memberOf CNP.ecom
        * @private
        * @param {string} tag Tag name of the element(s) we are looking for
        * @param {object} [context] Context in which to look for the element(s)
        * @return {array} Array of located elements
        */
        elmbytag = function(tag, context) {
            return (context || sd).getElementsByTagName(tag) || [];
        },

        /**
        * Remove or append Child node to Parent (or adoptive parent)
        * @memberOf CNP.ecom
        * @private
        * @param {object} parent DOM element to append to or remove from
        * @param {object} child DOM element to append or remove from parent
        * @param {String} operation Operation to perform (ap:append or rm:remove)
        */
        elmchild = function(parent, child, operation) {
           (operation === 'rm' ? parent.removeChild(child) :
                (operation === 'ap' ? parent.appendChild(child) :
                    false
                )
            );
        },

        /**
        * Show or hide element via css: display
        * @memberOf CNP.ecom
        * @private
        * @param {object} el DOM element to show/hide
        * @param {String} operation Operation to perform (default : show)
        */
        elmdisplay = function(el, operation) {
           el.style.display = (operation === "hide" ? "none" : "block");
        },

        /**
        * Edit innerHTML of an element
        * @memberOf CNP.ecom
        * @private
        * @param {object} el DOM element to show/hide
        * @param {String} html Contents to be added to el
        */
        elmhtml = function(el, html) {
           el.innerHTML = html;
        },

        /**
        * Show/hide select boxes
        * @memberOf CNP.ecom
        * @private
        * @param {boolean} [hide] If set to true will hide, otherwise show
        * @uses CNP.ecom.elmbytag
        */
        selects = function(hide) {
            var selects = elmbytag('select'),
                i = 0,
                il = selects.length;

            for (; i < il; i++) {
                selects[i].style.visibility = (hide) ? 'hidden' : '';
            }
        },

        /**
        * URI encode/decode a string
        * @memberOf CNP.ecom
        * @private
        * @param {string} str String to encoded or decoded
        * @param {boolean} [encode] Will encode if set to true, otherwise decode
        * @return {string} Encoded or decoded string
        */
        uriencdec = function(str, encode) {
            return (encode) ? encodeURIComponent(str) : decodeURIComponent(str);
        },

        /**
        * Get XML Node Value
        * @memberOf CNP.ecom
        * @private
        * @param {object} node XML document node
        * @return {string} Value of the node
        */
        xmlvalue = function(node) {
            return (node && node.firstChild) ? node.firstChild.nodeValue : '';
        },

        /**
        * Get, Set or Replace url query parameters
        * @memberOf CNP.ecom
        * @private
        * @param {string} query Query string to be parsed
        * @param {string} param Parameter name
        * @param {string} [value] Parameter value to be set
        * @return {string} Parameter value or Query string
        */
        urlParam = function(query, param, value) {
            if ((empty(query) && value == null) || empty(param)) {
                return '';
            }

            var re = new RegExp('(^|[?=&\|]+)' + param + '=([^&\|]*)(&|$)?', 'i'),
                ismatch = query.match(re);

            // not setting value, return param value
            if (value == null) {
                return (ismatch || '')[2] || '';
            }

            // replace or add param
            if (ismatch) {
                return query.replace(re, (empty(value) ? '' : '$1' + param + '=' + value));
            } else {
                return query += (query.match(/\?/) ? '&' : '?') + param + '=' + value;
            }
        },

        /**
        * Resize iFrame to fit inner content
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        */
        resizeiFrame = function(rid) {
            if (requests[rid].fid) {
                try {
                    requests[rid].fid.frameElement.style.height = requests[rid].doc.body[heightprop] + 'px';
                } catch(e) {}
            }
        },

        /**
        * Bind an event to DOM element
        * @memberOf CNP.ecom
        * @private
        * @param {string} type Event type
        * @param {object} elem DOM element
        * @param {function} handle Handler function for the event
        */
        bind = function(type, elem, handle) {
            if (elem.attachEvent) {
                elem.attachEvent('on' + type, handle);
            } else {
                elem.addEventListener(type, handle, false);
            }

            // prevent memory leaks in IE
            elem = null;
        },

        /**
        * unBind an event from DOM element
        * @memberOf CNP.ecom
        * @private
        * @param {string} type Event type
        * @param {object} elem DOM element
        * @param {function} handle Handler function for the event
        */
        unbind = function(type, elem, handle) {
            if (elem.detachEvent) {
                elem.detachEvent('on' + type, handle);
            } else {
                elem.removeEventListener(type, handle, false);
            }

            // prevent memory leaks in IE
            elem = null;
        },

        /**
        * Get current page protocol (http:// or https://)
        * @memberOf CNP.ecom
        * @private
        * @return {string} Current protocol
        */
        protocol = function() {
            return (location.protocol === 'https:' || settings.https) ? 'https://' : 'http://';
        },

        /**
        * Get current site domain
        * @memberOf CNP.ecom
        * @private
        * @return {string} Domain name in format: example.com
        */
        domain = function() {
            var d = location.hostname.split(':')[0].split('.'),
                dl = d.length;
            return d.slice(dl - 2, dl).join('.');
        },

        /**
        * Get user id.
        * @description Retrives used id from amg_user_record cookie
        * @memberOf CNP.ecom
        * @private
        * @return {string} User ID
        * @uses CNP.ecom.urlParam
        */
        user = function() {
            return urlParam(cookie.get('amg_user_record'), 'uid');
        },

        /**
        * Get current section
        * @memberOf CNP.ecom
        * @private
        * @return {string} Section name
        */
        section = function() {
            var uripart = sl.pathname.split('/')[1] || '';
            return ((uripart !=='' ? uripart.match(/^[^\.]*$/) : ['homepage']) || [''])[0];
        },

        /**
        * Ping ATG server.
        * @description Creates an image, assings events to the image load, error and abort. Set's the src
          to status.jsp.
        * @memberOf CNP.ecom
        * @private
        * @uses CNP.ecom.bind
        */
        ping = function() {
            pingImage = elmnew('img');
            bind('load', pingImage, alive);
            bind('error', pingImage, dead);
            bind('abort', pingImage, dead);
            pingImage.src = settings.host + settings.pingPath + '?ts=' + (new Date()).getTime() + ((settings.user) ? '&amgUserId=' + settings.user : '') + '&parent.referrer=' + uriencdec(sd.referrer, true);
            pingTimer = setTimeout(dead, settings.timeout * 1000);
        },

        /**
        * Ping cleanup.
        * @description Clear timer, unload events and set the image to null.
                       We do not really need to do this, but to be safe and to free up some
                       memory for the browser we are.
        * @memberOf CNP.ecom
        * @private
        * @uses CNP.ecom.unbind
        */
        clearPing = function() {
            clearTimeout(pingTimer);
            unbind('load', pingImage, alive);
            unbind('error', pingImage, dead);
            unbind('abort', pingImage, dead);
            pingImage = null;
        },

        /**
        * ATG server responded, ping came back.
        * @description The following actions are taken:
                    <ul>
                        <li>Set the framework live if ready.</li>
                        <li>Call ping cleanup.</li>
                        <li>Execute initial callback if one was set.</li>
                        <li>Execute all requests still in queue.</li>
                    </ul>
        * @memberOf CNP.ecom
        * @private
        * @uses CNP.ecom.clearPing
        * @uses CNP.ecom.process
        * @uses CNP.ecom.callback
        */
        alive = function() {
            if (!ready) {
                return;
            }

            // clear ping
            clearPing();

            // it's alive ..... aliiiiiveeeeeee ................
            live = true;

            // execute call back
            if (settings.callalive) {
                callback(settings.callalive);
            }

            // run queue
            for (var q; q = queue.shift();) {
                process(q);
            }
        },

        /**
        * ATG server did not respond in time, ping timeout or returned error.
        * @description The following actions are taken:
                    <ul>
                        <li>Set the framework ready and live to false.</li>
                        <li>Call ping cleanup.</li>
                        <li>Clean queue array and calls objects</li>
                    </ul>
        * @memberOf CNP.ecom
        * @private
        * @uses CNP.ecom.clearPing
        */
        dead = function() {
            clearPing();
            ready = live = false;
            queue = requests = null;
            // execute call back
            if (settings.calldead) {
                callback(settings.calldead);
            }
        },

        /**
        * Write request script tag to the placement container
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @param {string} path Path to ATG jsp page
        * @param {object} query Query parameters to be sent with the call
        * @param {string} [temp] Internal use for mbox calls
        * @uses CNP.ecom.merge
        * @uses CNP.ecom.elmnew
        * @uses CNP.ecom.elmbytag
        * @uses CNP.ecom.makeParams
        */
        writeScript = function(rid, path, query, temp) {
            query = merge(query, {
                'js.enc': (settings.jsEnc === 'jsesc' ? 'jsesc' : true),
                encType: requests[rid].enc,
                'js.callback': ((requests[rid].fid) ? 'parent.' : '') + 'CNP.ecom.response',
                'js.reqId': rid,
                tgt: requests[rid].tgt
            });

            var script = elmnew('script');
            script.type = 'text/javascript';
            script.id = fwid + rid + ((temp) ? temp : '');
            script.src = settings.host + path + '?ts=' + (new Date()).getTime() + '&' + makeParams(query);
            elmchild(requests[rid].p,script,'ap');
            script = null;
        },

        /**
        * Cleanup request script tag from head tag
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @uses CNP.ecom.elmbyid
        * @uses CNP.ecom.elmbytag
        */
        cleanScript = function(rid) {
            var elm = elmbyid(fwid + rid);
            if (elm) {
                elmchild(requests[rid].p, elm, 'rm');
            }
            elm = null;
        },

        /**
        * Process request.
        * @description Collects all the params from the request, used id (if logged in) and site section.
                       Writes script tag in the head to call ATG server.
                       Executes a 'callbefore' callback if one was set for the request.
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @uses CNP.ecom.writeScript
        * @uses CNP.ecom.callback
        */
        process = function(rid) {
            if (settings.user) {
                requests[rid].params.amgUserId = settings.user;
            }

            if (settings.section) {
                requests[rid].params.section = settings.section;
            }

            // execute callback
            if (requests[rid].callbefore) {
                callback(requests[rid].callbefore, requests[rid].fid);
            }

            // write call
            writeScript(rid, settings.offerPath, requests[rid].params);
        },

        /**
        * Execute callback function
        * @memberOf CNP.ecom
        * @private
        * @param {function} callback Function to be called
        * @param {object} params Object of parameters to be passed to the callback function
        * @param {object} [win] Window in which to call the function
        */
        callback = function(callback, win) {
            // execute call back
            callback.func = callback.func || '';
            callback.params = callback.params || {};
            win = win || window;

            if (typeof callback.func === 'function') {
                callback.func.call(this, callback.params);
            } else if (typeof win[callback.func] === 'function') {
                win[callback.func].call(this, callback.params);
            }
        },

        /**
        * Convert parameter object into url query string
        * @memberOf CNP.ecom
        * @private
        * @param {object} params Object of parameters to be converted
        * @return {string} Query string
        * @uses CNP.ecom.uriencdec
        */
        makeParams = function(params) {
            var query = [],
                i;

            for (i in params) {
                query.push(i + '=' + uriencdec(params[i], true));
            }

            return query.join('&');
        },

        /**
        * Cookie functions object
        * @memberOf CNP.ecom
        * @private
        */
        cookie = {
            /**
            * Get cookie
            * @memberOf CNP.ecom
            * @private
            * @param {string} name Cookie name
            * @return {string} Cookie value
            * @example cookie.get('the_cookie');
              Get the value of a cookie.
            */
            get: function(name) {
                var cookies = sd.cookie.split('; '),
                    cookie = [],
                    c = 0,
                    cl = cookies.length;

                for (; c < cl; c++) {
                    cookie = cookies[c].split('=');
                    if (cookie[0] === name) {
                        return uriencdec(cookie.slice(1).join('='));
                    }
                }

                return '';
            },

            /**
            * Delete the cookie with the given name.
            * @param {string} name Cookie name
            *
            * @example
                Delete the cookie:
                cookie.del('the_cookie');
            */
            del: function(name) {
                return this.set(name, '', { expires: -1 });
            },

            /**
            * Create a cookie with the given name and value and other optional parameters.
            * @memberOf CNP.ecom
            * @private
            * @param {string} name Cookie name
            * @param {string} [value] Cookie value
            * @param {object} [options] Cookie options
            *
            * @example
                Create or set the value of a cookie.
                cookie.set('the_cookie', 'the_value');

                Create a cookie with all available options.
                cookie.set('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'condenast.com', secure: true });

                Delete the cookie
                cookie.set('the_cookie', '', { expires: -1 });
            */
            set: function(name, value, options) {
                options = options || {};
                value = value || '';
                if (options.expires) options.expires=options.expires instanceof Date ? options.expires.toUTCString() : typeof options.expires === 'number' ? (new Date(+(new Date) + options.expires * 60 * 60 * 1000)).toUTCString() : '';
                options.path = '/';
                options.domain = settings.domain;

                var cookie = [name + '=' + uriencdec(value, true)];

                if (options.expires) cookie.push('expires=' + options.expires);
                if (options.path) cookie.push('path=' + options.path);
                if (options.domain) cookie.push('domain=' + options.domain);
                if (options.secure) cookie.push('secure');

                return options.secure && cookie.push('secure'), sd.cookie = cookie.join(';'), true;
            }
        },

        /**
        * Merge two objects
        * @memberOf CNP.ecom
        * @private
        * @param {object} destination Destination object
        * @param {object} source Source object
        * @return {object} Merged object
        */
        merge = function(destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        },

        /**
        * Trim string, remove leading and trailing spaces, new line and tab characters
        * @memberOf CNP.ecom
        * @private
        * @param {string} str The string being trimmed
        * @return {string} Trimmed string
        */
        trim = function(str) {
            str = str || '';
            var start = -1, end = str.length;
            while (str.charCodeAt(--end) < 33);
            while (++start < end && str.charCodeAt(start) < 33);
            return str.slice(start, end + 1);
        },

        /**
        * Determines whether or not the provided string is empty
        * @memberOf CNP.ecom
        * @private
        * @param {string} str The string being tested
        * @return {boolean} the result
        */
        empty = function(str) {
            return !/\S/.test(str || '');
        },

        /**
        * Validator methods functions
        * @memberOf CNP.ecom
        * @private
        */
        validateMethods = {
            /**
            * Validate required field
            * @memberOf CNP.ecom
            * @private
            * @param {string} value Field value
            * @return {object} Field passed requirements (boolean), Error message (string)
            * @uses CNP.ecom.empty
            */
            required: function(value) {
                return {
                    res: !empty(value),
                    msg: this.title + ' is required'
                }
            },

            /**
            * Validate email field
            * @memberOf CNP.ecom
            * @private
            * @param {string} value Field value
            * @return {object} Field passed requirements (boolean), Error message (string)
            * @uses CNP.ecom.empty
            */
            email: function(value) {
                return {
                    res: empty(value) || emailregx.test(value),
                    msg: errPrefix + 'email address'
                }
            },

            /**
            * Validate zipcode field
            * @memberOf CNP.ecom
            * @private
            * @param {string} value Field value
            * @return {object} Field passed requirements (boolean), Error message (string)
            * @uses CNP.ecom.empty
            */
            zipcode: function(value) {
                return {
                    res: empty(value) || uszipregx.test(value),
                    msg: errPrefix + 'zipcode'
                }
            }
        },

        /**
        * Validate field closure
        * @memberOf CNP.ecom
        * @private
        * @param {object} elm Element to be validated
        * @param {object} rules Object of rules for the field to be validated against
        * @param {integer} rid Request ID
        * @return {boolean} Validation passed?
        * @uses CNP.ecom.validateMethods
        * @uses CNP.ecom.resizeiFrame
        */
        validateField = function(elm, rules, rid) {
            return function() {
                var errfield = elmbyid(elm.name + '_err_' + rid),
                    result = {},
                    f = 0,
                    fl = rules.length;

                for (; f < fl; f++) {
                    result = validateMethods[rules[f]].call(elm, elm.value);
                    if (!result.res) {
                        elmhtml(errfield,result.msg);
                        elmdisplay(errfield);
                        break;
                    }
                    elmdisplay(errfield,'hide');
                }

                resizeiFrame(rid);
                return result.res;
            }
        },

        /**
        * Get form fields as object of key/value pairs
        * @memberOf CNP.ecom
        * @private
        * @param {object} form Form element
        * @return {object} Form fields
        * @uses CNP.ecom.empty
        */
        getForm = function(form) {
            if (!form) return {};

            var fields = {},
                elms = form.elements,
                elm,
                e = 0,
                el = elms.length;

            for (; e < el; e++) {
                elm = elms[e];
                if (elm.tagName !== 'FIELDSET' && elm.type !== 'submit') {
                    fields[elm.name] = elm.value;
                }
            }

            return fields;
        },

        /**
        * Initiate form validation.
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @uses CNP.ecom.elmbyid
        * @uses CNP.ecom.elmbytag
        * @uses CNP.ecom.validateField
        * @uses CNP.ecom.getForm
        * @uses CNP.ecom.bind
        * @uses CNP.ecom.writeScript
        */
        validate = function(rid) {
            var form = elmbytag('form', requests[rid].p)[0],
                elms = form.elements,
                e = 0,
                el = elms.length;

            if (!form || !el) {
                return false;
            }

            requests[rid].fh = [];

            for (; e < el; e++) {
                var rules = [],
                    elm = elms[e],
                    classes = (elm.className) ? elm.className.split(/\s/) : [],
                    c = 0,
                    cl = classes.length;

                if (!cl) {
                    continue;
                }

                if (elm.type === 'submit') {
                    requests[rid].btn = elm;
                    continue;
                }

                for (; c < cl; c++) {
                    if (classes[c] in validateMethods) {
                        rules.push(classes[c]);
                    }
                }

                if (rules.length) {
                    var handle = new validateField(elm, rules, rid);
                    requests[rid].fh.push(handle);
                    bind('blur', elm, handle);
                }
            }

            /* set submit event */
            bind('submit', form, function(e) {
                /* cancel the event, stop form submit */
                if (e.cancelable) {
                    e.preventDefault();
                }

                e.returnValue = false;

                var valid = true,
                    h = 0,
                    hl = requests[rid].fh.length;

                /* fire each validation rule */
                for (; h < hl; h++) {
                    valid &= requests[rid].fh[h]();
                }

                /* collect form inputs and submit */
                if (valid) {
                    requests[rid].btn.disabled = 'disabled';
                    requests[rid].btn.value = 'Processing';
                    writeScript(rid, settings.subPath, getForm(e.srcElement || e.target));

                    requests[rid].frmto = setTimeout(function() {
                        form.reset();
                        requests[rid].btn.disabled = '';
                        requests[rid].btn.value = 'Submit';
                        var err = elmbyid('frm_error_' + rid, requests[rid].doc);
                        elmhtml(err,'There was an error processing your order.<br />Please try again.');
                        elmdisplay(err);
                    }, 5000);
                }

                /* cancel the event, stop form submit */
                return false;
            })
        },

        /**
        * Initiate AutoSub form monitor
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @uses CNP.ecom.elmbytag
        * @uses CNP.ecom.bind
        * @uses CNP.ecom.setAutoSub
        * @uses CNP.ecom.urlParam
        */
        monitorAutoSub = function(rid) {
            var elms = elmbytag('input', requests[rid].p),
                i = 0,
                il = elms.length,
                current = urlParam(ss, 'as'),
                elm;

            for (; i < il; i++) {
                elm = elms[i];

                if (elm.value === current && !elm.checked) {
                    elm.checked =  true;
                    setAutoSub.apply(elm, [elm]);
                }

                if (elm.type !== 'hidden') {
                    bind('change', elm, setAutoSub);
                }

            }
        },

        /**
        * Set AutoSub form action
        * @memberOf CNP.ecom
        * @private
        * @param {event} e Event object
        * @uses CNP.ecom.urlParam
        */
        setAutoSub = function(e) {
            var elm = e.srcElement || e.target || e,
                furl = elm.form.action.split('?');

            furl[1] = ((!furl[1]) ? '' : '?' + furl[1]);
            elm.form.action = furl[0] + urlParam(furl[1], 'as', elm.checked?elm.value:0);
        },

        /**
        * Attach mBox request to document load event
        * @memberOf CNP.ecom
        * @private
        * @param {integer} rid Request ID
        * @param {string} js mBox javascript code
        * @uses CNP.ecom.bind
        * @uses CNP.ecom.setMbox
        */
        attachMbox = function(rid, js) {
            var code = js.match(/mboxCreate\(([^\)]*)\)/)[1];
            if (!code || typeof mbox !== 'function') {
                return;
            }
            // remove mboxDefault class
            requests[rid].p.firstChild.className = '';
            bind('load', self, function() {
                setMbox(rid, code);
            });
        },

        /**
        * Create mBox
        * @memberOf CNP.ecom
        * @private
        * @requires mbox.js
        * @param {integer} rid Request ID
        * @param {string} code mBox javascript code
        * @uses CNP.ecom.elmnew
        */
        setMbox = function(rid, code) {
            var mbd = elmnew('div'),
                params = code.replace(/'/g, '').split(','),
                q;

            // set temp div id and append
            mbd.id = 'tempmbox' + rid;
            elmdisplay(mbd,'hide');
            elmchild(requests[rid].p,mbd,'ap');
            // add div id to begining params
            params.unshift(mbd.id);
            // call mbox
            q = mboxDefine.apply(this, params);
            q.w.addParameter('rid', rid);
            q.setFetcher(new mboxAjaxFetcher());

            q.getUID = function() {
                var c = this.w.getParameters(),
                    i = 0,
                    il = c.length;

                for (; i < il; i++) {
                    if (c[i].name === 'rid') {
                        return c[i].value;
                    }
                }

                return 0;
            }

            // remove div id from params for the second call
            params.shift();
            mboxUpdate.apply(this, params);
            mbd = null;
        },

       /**
        * Base 64 Encode/Decode
        * @memberOf CNP.ecom
        * @private
        */
        base64 = {
            /**
            * Base 64 character base
            * @memberOf CNP.ecom
            * @private
            * @type string
            */
            s: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

            /**
            * Base 64 Decode
            * @memberOf CNP.ecom
            * @private
            * @param {string} str Encoded string
            * @return {string} Decoded string
            */
            d: function(str) {
                var bits,
                    decOut = '',
                    i = 0,
                    il = str.length;

                for (; i < il; i += 4) {
                    bits = (this.s.indexOf(str.charAt(i)) & 0xff) << 18 | (this.s.indexOf(str.charAt(i + 1)) & 0xff) << 12 | (this.s.indexOf(str.charAt(i + 2)) & 0xff) << 6 | this.s.indexOf(str.charAt(i + 3)) & 0xff;
                    decOut += String.fromCharCode((bits & 0xff0000) >> 16, (bits & 0xff00) >> 8, bits & 0xff);
                }

                if (str.charCodeAt(i - 2) === 61) {
                    return decOut.substring(0, decOut.length - 2);
                } else if (str.charCodeAt(i - 1) === 61) {
                    return decOut.substring(0, decOut.length - 1);
                } else {
                    return decOut;
                }
            }
        },

        /**
        * Show testing alert div
        * @memberOf CNP.ecom
        * @private
        * @uses CNP.ecom.elmnew
        * @uses CNP.ecom.merge
        * @uses CNP.ecom.cookie.set
        * @uses CNP.ecom.urlParam
        */
        showPreview = function() {
            var div = elmnew('div'),
                a = elmnew('a');

            div.id = testcookie;
            elmhtml(div,'!!! ATTENTION !!! YOU ARE USING ECOM PREVIEW SERVER !!! ATTENTION !!!<br />');

            merge(div.style, {
                zIndex: 100000000,
                backgroundColor: '#FFD700',
                color: '#809000',
                padding: '4px',
                fontWeight: 'bold',
                textAlign: 'center',
                border: '1px solid #333',
                marginBottom: '10px',
                position: 'fixed',
                width: '100%',
                top: '0px'
            });

            elmhtml(a,'[ return to normal mode ]');
            a.href = '#';
            elmchild(div,a,'ap');
            elmchild(sd.body,div,'ap');

            bind('click', a, function(e) {
                cookie.del(testcookie);
                elmchild(sd.body,(e.srcElement || e.target).parentNode,'rm');
                sl.search = urlParam(ss, testparam, '');
                return false;
            });

            div = a = null;
        },

        /**
        * Default settings
        * @memberOf CNP.ecom
        * @private
        */
        settings = {
            pingPath: 'status.jsp',
            offerPath: 'targetedOffer.jsp',
            subPath: 'embeddedForm.jsp',
            showPath: 'showOffer.jsp',
            docDomain: true,
            domain: domain(),
            host: 'magazine.' + this.domain,
            path: '/ecom/',
            user: user(),
            section: section(),
            timeout: 2,
            https: false,
            callback: null,
            params: {},
            cdn: false,
            onload: false,
            contentEnc: 'xml',
            jsEnc: 'true'
        };

    /**
    * @scope CNP.ecom
    */
    return {
        /**
        * Start Ecom
        * @param {object} [options] Options object
        * @uses CNP.ecom.urlParam
        * @example
            CNP.ecom.start({
                // required
                cnd: <%= !StringUtils.isEmpty(request.getHeader("cdn-request")) %>,
                // optional, default magazine.currentdomain.com
                host: "&lt;spring:message code='ecom.baseUrl' /&gt;",
                // optional
                pingPath: "status.jsp",
                // optional
                offerPath: "targettedOffer.jsp",
                // optional
                subPath: "embeddedForm.jsp",
                // optional
                showPath: "showOffer.jsp",
                // optional
                path: "/ecom/",
                // optional
                section: "site_section",
                // optional
                user: "user_id",
                // optional
                https: false,
                // optional
                timeout: 4,
                // load content on document load
                onload: false,
                // optional type of content encoding would be used, default is xml
                contentEnc: 'xml',
                // optional type of javascript encoding would be used to deliver the content
                jsEnc: 'true',
                // optional
                params: {
                    key: value
                },
                // optional, will be called if ping to ATG servers is successful
                callalive: {
                    func: some_function,
                    params: {
                        name: 'value'
                    }
                },
                // optional, will be called if ping to ATG servers timedout or invalid
                calldead: {
                    func: some_function,
                    params: {
                        name: 'value'
                    }
                }
            });
        */
        start: function(options) {
            if (urlParam(ss, 'nojoy') === '1') {
                return ready = live = false;
            }

            for (var set in settings) {
                settings[set] = urlParam(ss, fwid + set) || (options || {})[set] || settings[set];
            }

            if (settings.cdn === false) {
                // set preview enviroment
                var ecomtest = urlParam(ss, testparam) || cookie.get(testcookie) || '';

                if (ecomtest) {
                    cookie.set(testcookie, ecomtest);
                    bind('load', self, showPreview);
                    settings.host = ecomtest;
                } else {
                    cookie.del(testcookie);
                }
            } else {
                cookie.del(testcookie);
            }

            // set document.domain if enabled
            if (settings.docDomain && settings.domain) {
                sd.domain = settings.domain;
            }

            // set host
            settings.host = protocol() + settings.host.replace(/^https*:\/\/|\/+$/g, '') + settings.path;

            // ping server
            ping();


            // bind window load event
            bind('load', self, function() {
                // kill mboxCreate functionality after page load as it only creates errors after that
                mboxCreate = function() { return false; }

                // deliver upsell if url parameter 'ecomupsell' exists
                if (urlParam(ss, 'ecomupsell') === 'true') {
                    //openFrame(settings.host + settings.upsellPath);
                    openFrame(uriencdec(urlParam(ss,"ecomupsellurl")).replace(/^https*:\/\//g, protocol())); /*Enable this for lightbox iframed popup window*/
                }

                // if unload, bind load event
                if (settings.onload) {
                    settings.onload = false;
                    // run queue
                    for (var q; q = queue.shift();) {
                        process(q);
                    }
                }
            })

            suppressed = urlParam(ss, 'nojoytgt');

            edebug = (urlParam(ss, 'edebug')==='1')?1:0;

            // activate debug parameters
            if (edebug) {
                targetVer = urlParam(ss, 'targetVer') || false;
            }
        },

        /**
        * mBox ecom call.
        * @description Grabs placement id from mBox call and creates a call back to ATG servers
                       with thatmBox placement id.
        * @param {integer} rid Request ID
        * @param {integer} placeid mBox Placement ID
        * @uses CNP.ecom.writeScript
        */
        mbox: function(rid, placeid) {
            if (typeof rid.getUID === 'function') {
                writeScript(rid.getUID(), settings.showPath, { 'placementId': placeid }, 'mbox');
            }
        },


        /**
        * Set callbacks for open/close iframe
        * @private
        * @param {string} name open / close
        * @param {Array} callback functions
        * @usgae:CNP.ecom.setCallback({name: 'open',callback: [function(){
        *        CN.brightcove.pauseVideo();
        *    }]});
        */

        setCallback: function(options) {
           var name = options.name;

           for (var i = 0; i < options.callback.length; i++) {
            if (!customCallbacks[name]) {
              customCallbacks[name] = [];
            }
            customCallbacks[name].push(options.callback[i]);
          }
        },


        /**
        * Close iFrame for upsell offer
        * @uses CNP.ecom.elmbyid
        * @uses CNP.ecom.selects
        */
        closeiframe: function() {
            sd.body.style.overflow = 'visible';
            elmdisplay(elmbyid(fwid + 'usf'),'hide');
            elmdisplay(elmbyid(fwid + 'usc'),'hide');

            // show select boxes
            selects(false);

            setTimeout(function() {
                elmchild(sd.body,elmbyid(fwid + 'usf'),'rm');
                elmchild(sd.body,elmbyid(fwid + 'usc'),'rm');
            }, 2000);
        },

        /**
        * Open iFrame for upsell offer
        */
        openiframe: function(url) {
           if(!url){
                return;
            }
            openFrame(url);
        },

        /**
        * Process Request.
        * @description Process:
            <ul>
                <li>If we are not ready and not live, exit</li>
                <li>Locate placement element, if none exit</li>
                <li>Figure out if the calls are originating from a frame</li>
                <li>Add request to request stack</li>
                <li>If not live, add request to queue stack and exit</li>
                <li>If live, process request</li>
            </ul>
        * @param {object} params Request parameters
        * @uses CNP.ecom.elmbyid
        * @uses CNP.ecom.process
        * @example
                CNP.ecom.request({
                    // required
                    pid: 'placement_id',
                    // required
                    tgt: 'targeter_name',
                    // optional, additional parameters to be sent to ATG
                    params: {
                        name: 'value'
                    },
                    callbefore: {
                        func: some_function,
                        params: {
                            name: 'value'
                        }
                    },
                    callafter: {
                        func: some_function,
                        params: {
                            name: 'value'
                        }
                    }
                });
        */
        request: function(req) {
            if ((!ready && !live) || suppressed.indexOf(req.pid) !== -1) {
                return;
            }

            // check params
            req = req || {};
            req.doc = (req.fid) ? req.fid.document : sd;
            req.p = elmbyid(req.pid, req.doc);
            req.params = req.params || {};

            // add params
            if(targetVer) {
                req.params.targetVer = targetVer;
            }

            if (!req.p) {
                return;
            }

            req.enc = req.enc || settings.contentEnc;

            // create unique request id
            //var rid = ;
            requests[++requests.idx] = req;

            // live? no, push to queue
            if (!live || settings.onload) {
                return queue.push(requests.idx);
            }

            // live? yes, process request
            process(requests.idx);
        },

        /**
        * Process Response
        * @param {integer} rid Request ID
        * @param {string} code Base64 encoded string
        * @uses CNP.ecom.empty
        * @uses CNP.ecom.trim
        * @uses CNP.ecom.base64.d
        * @uses CNP.ecom.elmbytag
        * @uses CNP.ecom.elmbyid
        * @uses CNP.ecom.xmlvalue
        * @uses CNP.ecom.validate
        * @uses CNP.ecom.attachMbox
        * @uses CNP.ecom.monitorAutoSub
        * @uses CNP.ecom.openFrame
        * @uses CNP.ecom.resizeiFrame
        * @uses CNP.ecom.cleanScript
        * @uses CNP.ecom.callback
        */
        response: function(rid, code) {
            // verify we have something to work with
            if (typeof requests[rid] === 'undefined' || empty(code)) {
                return;
            }

            // add code to our call object
            requests[rid].code = code;

            // decode
            var xml = trim( (settings.jsEnc === 'jsesc' ? unescape(code) : base64.d(code)) ),
                xmldoc = null;

            if (empty(xml)) {
                return;
            }

            // process code
            if (requests[rid].enc === 'xml') {
                // parse xml

                if (typeof DOMParser === 'function' || typeof DOMParser === 'object') {
                    xmldoc = (new DOMParser()).parseFromString(xml, 'text/xml');
                    if (xmldoc.documentElement.nodeName === 'parsererror') {
                        return;
                    }
                } else {
                    xmldoc = new ActiveXObject('Microsoft.XMLDOM');
                    xmldoc.async = 'false';
                    xmldoc.loadXML(xml);
                    if (xmldoc.parseError.errorCode !== 0) {
                        return;
                    }
                }

                if (!xmldoc) {
                    return;
                }

                // Target Offer Response
                if (elmbytag('targetedOffer', xmldoc)[0]) {
                    // insert content
                    var html = trim(xmlvalue(elmbytag('content', xmldoc)[0])),
                        js = (html.match(/<script(?:[^>]*src=["']([^"']*)["'][^>]*|[^>]*)>([\s\S]*?)<\/script>/i) || [null, null, null]);
                        js_scr = js[1],
                        js_txt = trim(js[2]);

                    if (empty(html)) {
                        return;
                    }

                    elmhtml(requests[rid].p,html.replace(/<script(.|\s)*?\/script>/g, ''));

                    switch (xmlvalue(elmbytag('placementType', xmldoc)[0])) {
                        // if content is HTML (Link/Banner), eval any javascript
                        case 'Banner':
                        case 'Link':
                            if (!(js_scr || js_txt)) {
                                break;
                            }

                            var script = elmnew('script');
                            script.type = 'text/javascript';
                            script.id = fwid + 'js' + rid;

                            if(js_txt){
                                if (browser.msie) {
                                    script.text = js_txt;
                                } else {
                                    elmchild(script,sd.createTextNode(js_txt),'ap');
                                }
                            } else {
                                script.src=js_scr;

                            }

                            elmchild(requests[rid].p,script,'ap');
                            //elmchild(requests[rid].p,script,'rm');
                            script = null;
                        break;

                        // if content is form, set validation
                        case 'embeddedForm':
                            validate(rid);
                        break;

                        // if content is autosub, set check
                        case 'autoSub':
                            monitorAutoSub(rid);
                        break;

                        // content is mbox, eval script
                        case 'testPlacement':
                        case 'testPlacement_Banner':
                        case 'testPlacement_Link':
                            attachMbox(rid, js);
                        break;

                        // if content is autosub, set check
                        case 'testPlacement_autoSub':
                            attachMbox(rid, js);
                            monitorAutoSub(rid);
                        break;

                        // content is mbox, eval script
                        case 'testPlacement_embeddedForm':
                            attachMbox(rid, js);
                            validate(rid);
                        break;
                    }

                    // call after callback function
                    if (requests[rid].callafter) {
                        callback(requests[rid].callafter, requests[rid].fid);
                    }
                // Form Submition Response
                } else if (elmbytag('response', xmldoc)[0]) {
                    clearTimeout(requests[rid].frmto);
                    var err = elmbyid('frm_error_' + rid, requests[rid].doc);

                    // Form Error
                    if (elmbytag('errors', xmldoc)[0]) {
                        var errstr = '',
                            errors = elmbytag('error', xmldoc),
                            e = 0,
                            el = errors.length;

                        for (; e < el; e++) {
                            errstr += xmlvalue(elmbytag('errorMessage', errors[e])[0]) + '<br />';
                        }

                        elmhtml(err,errstr);
                        elmdisplay(err);

                    // Clean error, reset form, open confirmation
                    } else {
                        elmdisplay(err,'hide');
                        elmhtml(err,'');

                        if (elmbytag('ccUpsellPage', xmldoc)[0]) {
                            openFrame(xmlvalue(elmbytag('ccUpsellPage', xmldoc)[0]).replace(/^https*:\/\//g, protocol()));
                        }

                        elmbytag('form', requests[rid].p)[0].reset();
                    }

                    requests[rid].btn.disabled = '';
                    requests[rid].btn.value = 'Submit';
                }
            } else {
                elmhtml(requests[rid].p,code);
            }

            // if iframe - resize to fit content
            resizeiFrame(rid);

            // clean script tags
            cleanScript(rid);
        },

        displayCmPlacement: function(placement_id){
            if((typeof pageAds != 'undefined') && (typeof pageAds[placement_id] != 'undefined') && (CN.url.params('nojoy') !=1) ) {
                var div = document.getElementById(placement_id);
                div.innerHTML = pageAds[placement_id];
            }
            else { // If NO response from HEARST
                //var failSafeArea = "${failsafeDiv}"; var displayFailsafeDiv = document.getElementById(failSafeArea); displayFailsafeDiv.style.display = "block";
            }
       },

       displayEcomErrors: function(){

            var country = jQuery('#country').val(),
            offerId = jQuery('input[name=offer_id]:checked').val(),
            subscribe = jQuery('input[id=subscribeY]:checked').val(),
            siteMagTld = CN.site.tld,
            sweepsError =   '<div id="nonus">'+
                            '<p> We apologize for the inconvenience but we cannot automatically process subscriptions with a Canadian or International address from our registration forms.</p>'+
                            '<p> Please <a href="http://www.'+siteMagTld+'/subscribe" style="color:#000000;" target="_blank">click here</a> to have your subscription sent to a non-U.S. address.</p>'+
                            '<p> If you supplied a country other than the United States by accident, please fill out your U.S. address below and click Submit.</p></div>';

            if(offerId == 'undefined' || offerId == undefined)
                {
                    if(country != 'US' && subscribe == 'SUBSCRIBED')
                    {
                        jQuery('#nonus').show();
                        if(jQuery('#nonus').size() == 0){
                            jQuery('#sweepSignup').prepend(sweepsError);
                        }
                        jQuery('html, body').animate({scrollTop:0}, 'fast');
                        return false;
                    }
                    else
                    {
                        jQuery('#nonus').hide();
                        return true;
                    }
                }
            if(country !='US' && offerId != '0')
                {
                    jQuery('#nonus').show();
                    if(jQuery('#nonus').size() == 0){
                        jQuery('#sweepSignup').prepend(sweepsError);
                    }
                    jQuery('html, body').animate({scrollTop:0}, 'fast');
                    return false;
                }
                 else
                {
                    jQuery('#nonus').hide();
                    return true;
                }
        },

        messageHandler  :   function(e){
            if(e.data == 'closeIframe')
                CNP.ecom.closeiframe();
        }
    }
})();


/* Cross Protocol/Domain event listener for ccUpsell iframe
 * @description Listens to all cross domain messages and closes the iframe if the data property matches
 * */
if (window.addEventListener) {  // all browsers(except IE before version 9)
    window.addEventListener( "message", CNP.ecom.messageHandler, false);
} else if (window.attachEvent) {  // IE before version 9
    window.attachEvent( "onmessage", CNP.ecom.messageHandler);
}
