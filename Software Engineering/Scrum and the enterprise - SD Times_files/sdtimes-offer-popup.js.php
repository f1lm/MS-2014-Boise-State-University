var Fusionfarm = {
    'verbose': false, // test mode = true
    'disable_cookies': false,  // test mode = true
    'base_url': 'http://sdtimes.com',
    'domain' : 'sdtimes.com',
    'setup_events': function() {
        Fusionfarm.addEvent(document, "mouseout", function(e) {
            e = e ? e : window.event;
            var from = e.relatedTarget || e.toElement;
            if (!from || from.nodeName == "HTML") {
                Fusionfarm.init();
            }
        });
    },
    'init': function () {
        if (Fusionfarm.verbose) {console.log('init');}
        Fusionfarm.Hubspot.getHubspotutk();
        if (Fusionfarm.no_recent_offer() && Fusionfarm.Hubspot.hubspotutk) {
            // outdated cookie date, check subscriptions
            Fusionfarm.Hubspot.API.getSubscription();
        } else if (!Fusionfarm.no_recent_offer()) {
            if (Fusionfarm.verbose) {console.log('waiting for offer to expire');}
        } else if (!Fusionfarm.Hubspot.hubspotutk) {
            // No hubspotutk cookie
            if (Fusionfarm.verbose) {console.log('No hubspotutk cookie. If testing, try using Fusionfarm.Hubspot.test.init(hubspotutk);.');}
            Fusionfarm.popup.show('news_on_mondays');
        }
    },
    'popup': {
        'url': '',
        'show': function (offer) {

            if(Fusionfarm.verbose) {
                console.log('pop offer: ' + offer);
            }

            
            if (offer === 'news_on_mondays') {
                /* SET THE URL TO THE POPUP */
                this.url = Fusionfarm.base_url + '/hubspot-api/SDTimes/offers/news_on_mondays.php';
            } else if (offer === 'sdtimes') {
                /* SET THE URL TO THE POPUP */
                this.url = Fusionfarm.base_url + '/hubspot-api/SDTimes/offers/sdtimes.php';
            } else if (offer === 'other') {
                /* SET THE URL TO THE POPUP */
                this.url = Fusionfarm.base_url + '/hubspot-api/SDTimes/offers/other.php';
            }

            if(Fusionfarm.verbose) {
                console.log('pop offer url: ' + this.url);
            }

            if (offer === 'news_on_mondays' || offer === 'sdtimes' || offer === 'other') {
                // SETTINGS: http://www.jacklmoore.com/colorbox/

                if(! jQuery.colorbox ) {
                    console.log('colorbox is undefined');
                } else {
                    jQuery.colorbox({iframe:true, innerWidth:"300px", innerHeight:"250px",  href:Fusionfarm.popup.url, onClosed:Fusionfarm.popup.closed});
                    Fusionfarm.Hubspot.offer.current_offer = offer;
                    Fusionfarm.cookie.set_offer_date();
                }
            }
        },
        'closed':function() {
            Fusionfarm.Hubspot.offer.declined();
        }
    },
    'addEvent':function(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }
    },
    /**
     * Check the cookie and compare the date of the last offer
    */
    'no_recent_offer': function () {
        var today, cookie_date;

        today = new Date();
        cookie_date = Fusionfarm.cookie.get_subscroffer();

        if ((typeof cookie_date === 'object') && (cookie_date.getTime() > today.getTime())) {
            return false;
        }

        return true;
    },
    'generateUUID': function () {
        var d, uuid, r;

        d = new Date().getTime();
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    },
    'Hubspot': {
        'getHubspotutk': function () {
            this.hubspotutk = Fusionfarm.cookie.read('hubspotutk');
            if (Fusionfarm.verbose && this.hubspotutk) {console.log( 'hubspotutk: ' + this.hubspotutk );}
            else if (Fusionfarm.verbose) {console.log( 'Error: missing hubspotutk!' );}
        },
        'hubspotutk': '',
        'offer': {
            'name': 'subscroffer',
            'expires_in_hours': 24,
            'current_offer':'',
            'declined':function() {
                if(Fusionfarm.Hubspot.offer.current_offer) {
                    if(Fusionfarm.verbose) {
                        console.log('Offer for ' + Fusionfarm.Hubspot.offer.current_offer + ' declined');
                    }
                    Fusionfarm.Hubspot.API.offerDeclined();
                }
            }
        },
        'API': {
            'xmlhttp': '',
            'get_subscript_url': '',
            'get_offerdeclined_url':'',
            'getSubscription': function () {
                var api_url, response;

                Fusionfarm.Hubspot.API.xmlhttp=new XMLHttpRequest();
                api_url = Fusionfarm.Hubspot.API.get_subscript_url + '?guid=' + Fusionfarm.generateUUID() + '&hubspotutk=' + Fusionfarm.Hubspot.getHubspotutk();
                if (Fusionfarm.verbose) {console.log('AJAX:' + api_url);}
                Fusionfarm.Hubspot.API.xmlhttp.open("GET",api_url,true);
                this.xmlhttp.onreadystatechange=function () {
                    if (Fusionfarm.Hubspot.API.xmlhttp.readyState==4 && Fusionfarm.Hubspot.API.xmlhttp.status==200) {
                        response = eval('(' + Fusionfarm.Hubspot.API.xmlhttp.response + ')');
                        if (Fusionfarm.verbose) {console.log('response:' + Fusionfarm.Hubspot.API.xmlhttp.response);}
                        if ( response && response.offer ) {
                            Fusionfarm.popup.show( response.offer );
                        } else if (response && response.error) {
                            if (Fusionfarm.verbose) {console.log('Error:' + response.error);}
                        }
                    }
                };
                Fusionfarm.Hubspot.API.xmlhttp.send();
            },
            'offerDeclined': function () {
                var api_url, response;

                Fusionfarm.Hubspot.API.xmlhttp=new XMLHttpRequest();
                api_url = Fusionfarm.Hubspot.API.get_offerdeclined_url + '?guid=' + Fusionfarm.generateUUID() + '&offer_declined=' + Fusionfarm.Hubspot.offer.current_offer;
                if (Fusionfarm.verbose) {console.log('AJAX:' + api_url);}
                Fusionfarm.Hubspot.API.xmlhttp.open("GET",api_url,true);
                this.xmlhttp.onreadystatechange=function () {
                    if (Fusionfarm.Hubspot.API.xmlhttp.readyState==4 && Fusionfarm.Hubspot.API.xmlhttp.status==200) {
                        response = eval('(' + Fusionfarm.Hubspot.API.xmlhttp.response + ')');
                        if (Fusionfarm.verbose) {console.log('response:' + Fusionfarm.Hubspot.API.xmlhttp.response);}
                        // all done
                    }
                };
                Fusionfarm.Hubspot.API.xmlhttp.send();
            }
        }
    },
    'test': {
        'init': function ( hubspotutk ) {
            if (hubspotutk) {
                Fusionfarm.cookie.set('hubspotutk', hubspotutk);
            }
        }
    },
    'cookie': {
        'set': function ( key, value, expire ) {
            var cookie=key+'='+value;
            cookie=(typeof expire == 'object')?cookie+this.create_expiration_date(expire):cookie;
            cookie+="; path=/";
            if (Fusionfarm.disable_cookies) {
                console.log(cookie);
            } else {
                document.cookie=cookie;
            }
        },
        'read': function ( cookie_name ) {

            var name, ca, i, c;

            if (Fusionfarm.verbose) {console.log('read '+cookie_name);}
            name = cookie_name  + "=";
            ca = document.cookie.split(';');
            for(i=0; i<ca.length; i++) {
                c = ca[i].trim();
                if (c.indexOf(name)===0) {
                    return c.substring(name.length,c.length);
                }
            }
            return "";
        },
        'remove': function(name, value, days) {

            if(!name) {
                name = Fusionfarm.Hubspot.offer.name;
            }

            if(!value) {
                value = '';
            }

            if(!days) {
                days = -1;
            }

            var path = '/';
            var domain = Fusionfarm.domain;
            var cookie, date, value;

            var expires = '',
            date = new Date();

            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();

            cookie = name + '=' + value + expires + '; path=/';

            console.log(cookie);

            document.cookie = cookie;

            return true;
        },
        'set_offer_date': function () {
            var t, Y, M, D, cookie;

            t = new Date();

            t.setHours(t.getHours() + Fusionfarm.Hubspot.offer.expires_in_hours );

            Y = t.getFullYear();
            M = t.getMonth() + 1;
            D = t.getDate();

            cookie = M + '-' + D + '-' + Y;

            this.set(Fusionfarm.Hubspot.offer.name, cookie, t);
        },
        'create_expiration_date': function (t) {
            var day_of_week, date, month, year, hour, min, cookie;
            /*expires=Thu, 18 Dec 2013 12:00:00 GMT*/
            day_of_week = this.en_days[t.getUTCDay()];
            month = this.en_months[t.getUTCMonth()];
            date  = t.getUTCDate();
            year  = t.getUTCFullYear();
            hour  = t.getUTCHours();
            min   = t.getUTCMinutes();
            cookie=';expires='+day_of_week+', '+date+' '+month+' '+year+' '+hour+':'+min+':00 GMT';

            if (Fusionfarm.verbose) {console.log('cookie expires: '+cookie);}

            return cookie;
        },
        'en_days': ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        'en_months': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        'get_subscroffer': function () {

            var t, M, D, Y, date;

            t = this.read( Fusionfarm.Hubspot.offer.name );

            if ( t ) {
                t = t.split('-');

                M = t[0] - 1;
                D = t[1];
                Y = t[2];

                date = new Date();
                date.setDate( D );
                date.setFullYear( Y );
                date.setMonth( M );

                return date;
            }

            return false;
        }
    }
};
