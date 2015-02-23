/*




 */
// http://stackoverflow.com/questions/2170439/how-to-embed-javascript-widget-that-depends-on-jquery-into-an-unknown-environmen
(function(window, document, version, callback) {
		

    var j, d;
    var loaded = false;
    if (!(j = window.jQuery) || version > j.fn.jquery || callback(j, loaded)) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
        script.onload = script.onreadystatechange = function() {
            if (!loaded && (!(d = this.readyState) || d == "loaded" || d == "complete")) {
                callback((j = window.jQuery).noConflict(1), loaded = true);
                j(script).remove();
            }
        };
        //document.documentElement.childNodes[0].appendChild(script)
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    }
})(window, document, "1.6", function($, jquery_loaded) {


	$(document).ready(function($) { 
		var  hosts = ['ibm.com'];
		
		function endsWith(str, suffix) {
			if (str) {
		    	return str.indexOf(suffix, str.length - suffix.length) !== -1;				
			} 
			return false;
		}


		function parse_url (str, component) {
		    // http://kevin.vanzonneveld.net
		    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
		    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
		    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
		    var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
		            'relative', 'path', 'directory', 'file', 'query', 'fragment'],
		        ini = (this.php_js && this.php_js.ini) || {},
		        mode = (ini['phpjs.parse_url.mode'] &&
		            ini['phpjs.parse_url.mode'].local_value) || 'php',
		        parser = {
		            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
		        };

		    var m = parser[mode].exec(str),
		        uri = {},
		        i = 14;
		    while (i--) {
		        if (m[i]) {
		            uri[key[i]] = m[i];
		        }
		    }

		    if (component) {
		        return uri[component.replace('PHP_URL_', '').toLowerCase()];
		    }
		    if (mode !== 'php') {
		        var name = (ini['phpjs.parse_url.queryKey'] &&
		            ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
		        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
		        uri[name] = {};
		        uri[key[12]].replace(parser, function ($0, $1, $2) {
		            if ($1) {uri[name][$1] = $2;}
		        });
		    }
		    delete uri.source;
		    return uri;
		}

		
		
		$("script[type='ibm/report']").each(function(i, ele) {
			settings = $.parseJSON( $(this).html() )    	    
			if (settings) {
				if (settings.attr) {
					$('a').each(function(j, elej) {
						url = parse_url(elej)
						
						for (var k = 0; k < hosts.length; k++) {
							if (endsWith(url.host, hosts[i])) {
								if (url.query) {
									$(elej).attr( "href", $(elej).attr( "href") + "&CE=" + settings.attr);									
								} else {
									$(elej).attr( "href", $(elej).attr( "href") + "?CE="+ settings.attr);																		
								}
							}
						}
					
						
					});
				}
			}
		});
	});








});



