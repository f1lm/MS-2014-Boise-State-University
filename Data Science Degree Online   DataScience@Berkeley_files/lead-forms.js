/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.2",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

})( window );

/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[0], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[0] );
		$.data( this[0], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(event.target).hasClass("cancel") ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $(event.target).attr("formnovalidate") !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
		if ( $(this[0]).is("form")) {
			return this.validate().form();
		} else {
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() {
				valid = valid && validator.element(this);
			});
			return valid;
		}
	},
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function( index, value ) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function( command, argument ) {
		var element = this[0];

		if ( command ) {
			var settings = $.data(element.form, "validator").settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				// remove messages from rules, but allow them to be set separetely
				delete existingRules.messages;
				staticRules[element.name] = existingRules;
				if ( argument.messages ) {
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function( index, method ) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if ( data.required ) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function( a ) { return !$.trim("" + $(a).val()); },
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function( a ) { return !!$.trim("" + $(a).val()); },
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function( a ) { return !$(a).prop("checked"); }
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each(params, function( i, n ) {
		source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
			return n;
		});
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $([]),
		errorLabelContainer: $([]),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element, event ) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function( element, event ) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function( element, event ) {
			if ( event.which === 9 && this.elementValue(element) === "" ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function( element, event ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element(element);
			}
			// or option elements, check parent select in that case
			else if ( element.parentNode.name in this.submitted ) {
				this.element(element.parentNode);
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split(/\s/);
				}
				$.each(value, function( index, name ) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function( key, value ) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if ( validator.settings[eventType] ) {
					validator.settings[eventType].call(validator, this[0], event);
				}
			}
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if ( this.settings.invalidHandler ) {
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if ( !this.valid() ) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !(element.name in errors);
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$(this.currentForm).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this);
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
					return false;
				}

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $(selector)[0];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.replace(" ", ".");
			return $(this.settings.errorElement + "." + errorClass, this.errorContext);
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		elementValue: function( element ) {
			var type = $(element).attr("type"),
				val = $(element).val();

			if ( type === "radio" || type === "checkbox" ) {
				return $("input[name='" + $(element).attr("name") + "']:checked").val();
			}

			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "");
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength(rules) ) {
				this.successList.push(element);
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function( element, method ) {
			return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if ( arguments[i] !== undefined ) {
					return arguments[i];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + ">")
					.attr("for", this.idOrName(element))
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length ) {
					if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement(label, $(element) );
					} else {
						label.insertAfter(element);
					}
				}
			}
			if ( !message && this.settings.success ) {
				label.text("");
				if ( typeof this.settings.success === "string" ) {
					label.addClass( this.settings.success );
				} else {
					this.settings.success( label, element );
				}
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function( element ) {
			var name = this.idOrName(element);
			return this.errors().filter(function() {
				return $(this).attr("for") === name;
			});
		},

		idOrName: function( element ) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function( element ) {
			// if radio/checkbox, validate first element in group instead
			if ( this.checkable(element) ) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return (/radio|checkbox/i).test(element.type);
		},

		findByName: function( name ) {
			return $(this.currentForm).find("[name='" + name + "']");
		},

		getLength: function( value, element ) {
			switch( element.nodeName.toLowerCase() ) {
			case "select":
				return $("option:selected", element).length;
			case "input":
				if ( this.checkable( element) ) {
					return this.findByName(element.name).filter(":checked").length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		},

		dependTypes: {
			"boolean": function( param, element ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$(param, element.form).length;
			},
			"function": function( param, element ) {
				return param(element);
			}
		},

		optional: function( element ) {
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[element.name] ) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		number: {number: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[className] = rules;
		} else {
			$.extend(this.classRuleSettings, className);
		}
	},

	classRules: function( element ) {
		var rules = {};
		var classes = $(element).attr("class");
		if ( classes ) {
			$.each(classes.split(" "), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
		}
		return rules;
	},

	attributeRules: function( element ) {
		var rules = {};
		var $element = $(element);
		var type = $element[0].getAttribute("type");

		for (var method in $.validator.methods) {
			var value;

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr(method);
			}

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number(value);
			}

			if ( value ) {
				rules[method] = value;
			} else if ( type === method && type !== 'range' ) {
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var method, value,
			rules = {}, $element = $(element);
		for (method in $.validator.methods) {
			value = $element.data("rule-" + method.toLowerCase());
			if ( value !== undefined ) {
				rules[method] = value;
			}
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {};
		var validator = $.data(element.form, "validator");
		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each(rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[prop];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch (typeof val.depends) {
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				}
				if ( keepRule ) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function( rule, parameter ) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength'], function() {
			if ( rules[this] ) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			var parts;
			if ( rules[this] ) {
				if ( $.isArray(rules[this]) ) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				} else if ( typeof rules[this] === "string" ) {
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min && rules.max ) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength && rules.maxlength ) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function( name, method, message ) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if ( method.length < 3 ) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend(param, element) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			}
			if ( this.checkable(element) ) {
				return this.getLength(value, element) > 0;
			}
			return $.trim(value).length > 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function( value, element ) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function( value, element ) {
			return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function( value, element ) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function( value, element ) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function( value, element ) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test(value) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if ( bEven ) {
					if ( (nDigit *= 2) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) === 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if ( this.settings.onfocusout ) {
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid();
				});
			}
			return value === target.val();
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function( value, element, param ) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) {
				this.settings.messages[element.name] = {};
			}
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && {url:param} || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function( response ) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	$.extend($.fn, {
		validateDelegate: function( delegate, type, handler ) {
			return this.bind(type, function( event ) {
				var target = $(event.target);
				if ( target.is(delegate) ) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));

/*
    json2.js
    2013-05-26

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

(function() {
  var Utils, Validations, changePortalIntensity, reactToDegreeQuestion, reactToHasDegreeQuestion, reactToTeacherQuestion, setDegreeInterest, tweakInlineForm, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  window.LeadForm = {
    jQuery: jQuery,
    Forms: {
      Templates: {},
      Validations: {}
    },
    Programs: {
      Utils: {}
    },
    Requests: {},
    Testing: {},
    Utils: {}
  };

  jQuery.noConflict(true);

  LeadForm.Forms.Templates = (_ref = LeadForm.Forms.Templates) != null ? _ref : {};

  LeadForm.Forms.Templates['inline'] = "<div class=\"lead_forms_widget\">\n    <div id=\"lead-form-dialog\" class=\"\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"form-message\">\n            <!-- Copy added from program config -->\n            <h2 id=\"title\"></h2>\n            <p id=\"intro_text\"></p>\n	    <p id=\"intro_sub_text\" class=\"small\"></p>\n        </div>\n        <div class=\"form-body steps\">\n            <div class=\"form-error\"></div>\n            <form name=\"leadForm\" class=\"lead-form validate form-vertical\">\n                <div class=\"progress\">\n                    <p class=\"progress-percentage\">&nbsp;10% Complete</p>\n                    <div class=\"bar\" style=\"width: 10%;\"></div>\n                </div><!-- progress -->\n\n                <div class=\"step-markers\">\n                    <p class=\"progress-markers\">\n                    </p>\n                </div><!-- step markers -->\n\n                <div class=\"lead-form-steps\"></div>\n\n                <input type=\"hidden\" id=\"lead_source\" name=\"lead_source\" value=\"web\">\n                <input type=\"hidden\" id=\"splash_creative\" name=\"SFQ-Splash_Creative__c\" value=\"\">\n<input type=\"hidden\" id=\"ef_id\" name=\"SFQ-EF_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"l\" name=\"SFQ-Landing_Page__c\" value=\"\">\n<input type=\"hidden\" id=\"c\" name=\"SFQ-Creative_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"permguid\" name=\"SFQ-IgnitionOne__c\" value=\"\">\n<input type=\"hidden\" id=\"campaign\" name=\"campaign_id\" value=\"\">\n        <input type=\"hidden\" id=\"sendid\" name=\"SFQ-Send_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"portal_intensity\" name=\"portal_intensity\" value=\"lite\">\n\n                <a class=\"btn btn-large btn-primary lead-form-next-step\" role=\"button\" href=\"#\">Next Step</a>\n            </form>\n        </div>\n    </div>\n</div>";

  LeadForm.Forms.Templates['lead_forms_hp_widget'] = "<div class='home-page-step widget lead_forms_widget lead_forms_hp_widget'>\n<span class='span3 more-info'><h2 id='title'></h2></span>\n<div class='span6'>\n    <div class='lead-form-step'></div>\n</div>\n<div class='span3'>\n    <a class=\"show-form btn btn-large btn-primary hp-next-step\" href='#'>Next Step</a>\n</div>\n</div>";

  LeadForm.Forms.Templates['lead_forms_sharebox_widget'] = "<div class='widget lead_forms_widget lead_forms_sharebox_widget'>\n<a href=\"#\" role=\"button\" class=\"btn-sharebox show-form\">Request Info</a>\n</div>\n";

  LeadForm.Forms.Templates['modal'] = "<div class=\"lead_forms_widget lead_forms_widget_modal\">\n    <div id=\"lead-form-dialog\" class=\"hide modal fade in\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">close</button>\n            <h2 id=\"title\"></h2>\n            <p>This will only take a minute.</p>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"form-message\"><p id=\"intro_text\"></p></div>\n            <div class=\"form-error\"></div>\n            <form name=\"leadForm\" class=\"lead-form validate form-vertical\">\n                <div class=\"progress\">\n                    <p class=\"progress-percentage\">&nbsp;10% Complete</p>\n                    <div class=\"bar\" style=\"width: 10%;\"></div>\n                </div><!-- progress -->\n\n                <div class=\"step-markers\">\n                    <p class=\"progress-markers\">\n                    </p>\n                </div><!-- step markers -->\n\n                <div class=\"lead-form-steps\"></div>\n\n                <input type=\"hidden\" id=\"lead_source\" name=\"lead_source\" value=\"web\">\n                <input type=\"hidden\" id=\"splash_creative\" name=\"SFQ-Splash_Creative__c\" value=\"\">\n<input type=\"hidden\" id=\"ef_id\" name=\"SFQ-EF_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"l\" name=\"SFQ-Landing_Page__c\" value=\"\">\n<input type=\"hidden\" id=\"c\" name=\"SFQ-Creative_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"permguid\" name=\"SFQ-IgnitionOne__c\" value=\"\">\n<input type=\"hidden\" id=\"campaign\" name=\"campaign_id\" value=\"\">\n        <input type=\"hidden\" id=\"sendid\" name=\"SFQ-Send_ID__c\" value=\"\">\n<input type=\"hidden\" id=\"portal_intensity\" name=\"portal_intensity\" value=\"lite\">\n\n                <a class=\"btn btn-large btn-primary lead-form-next-step\" role=\"button\" href=\"#\">Next Step</a>\n            </form>\n        </div>\n    </div>\n</div>";

  LeadForm.Programs = (_ref1 = LeadForm.Programs) != null ? _ref1 : {};

  LeadForm.Programs['nu-mac.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"30\" >\n<label for=\"describe\">Which best describes you?</label>\n<div id=\"describeField\">\n    <select id=\"describe\"\n            name=\"SFQ-Which_Best_Describes_You__c\"\n      title=\"Which best describes you?\" class=\"valid\" required\n            data-msg-required=\"Please select which best describes you.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"I am starting my career in professional psychology or counseling\">I am starting my career in professional psychology or counseling</option>\n      <option value=\"I am currently employed in professional psychology or counseling\">I am currently employed in professional psychology or counseling</option>\n    </select>\n</div>\n</div><!--step1 -->\n\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"60\">\n\n<label for=\"education\">Highest level of education completed?</label>\n<div id=\"educationField\">\n    <select id=\"education\"\n            name=\"SFQ-Level_of_Education__c\"\n            title=\"Highest level of education completed?\"\n            class=\"valid\"\n            required\n            data-msg-required=\"Please provide your highest level of education.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n\n      <option value=\"High School\" title=\"\">High School</option>\n\n      <option value=\"Associate&rsquo;s Degree\" title=\"\">Associate&rsquo;s Degree</option>\n\n      <option value=\"Bachelor&rsquo;s in progress\" title=\"\">Bachelor&rsquo;s in progress</option>\n\n      <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n\n      <option value=\"Master&rsquo;s in progress\" title=\"\">Master&rsquo;s in progress</option>\n\n      <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n\n      <option value=\"Doctorate in progress\" title=\"\">Doctorate in progress</option>\n\n      <option value=\"Doctorate\" title=\"\">Doctorate</option>\n\n      <option value=\"Professional Degree\" title=\"\">Professional Degree</option>\n    </select>\n</div>\n<label for=\"gpaRange\">What was your undergraduate <abbr title='Grade Point Average'>GPA</abbr>?</label>\n<div id=\"gpaRangeField\">\n    <select id=\"gpaRange\"\n            name=\"SFQ-Stated_GPA_Range__c\"\n            title=\"What was your undergraduate GPA?\"\n            class=\"valid\"\n            required\n            data-msg-required=\"Please provide your GPA range.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n\n      <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n\n      <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n\n      <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n\n      <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n\n      <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n    </select>\n</div>\n</div><!-- step2 -->\n\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n<div class=\"row\">\n  <div class=\"span3\" >\n    <label for=\"first_name\">First / Given Name</label>\n    <input id=\"first_name\"\n         name=\"first_name\"\n         size=\"20\"\n         type=\"text\"\n         required\n         data-msg-required=\"Please provide your first/given name.\"/>\n  </div>\n  <div class=\"span3\" >\n    <label for=\"last_name\">Last / Family Name</label>\n    <input id=\"last_name\"\n         name=\"last_name\"\n         size=\"20\"\n         type=\"text\"\n         required\n         data-msg-required=\"Please provide your family/last name.\" />\n  </div>\n</div><!-- end of name fields -->\n<label for=\"email\">Email</label>\n<input id=\"email\"\n     name=\"email\"\n     size=\"20\"\n     type=\"email\"\n     required\n     data-msg-required=\"Please provide your email address.\"/>\n<label for=\"country\">Country of Residence</label>\n<div id=\"countryField\">\n  <select id=\"country\"\n    name=\"SFQ-Country\"\n    required\n    data-msg-required=\"Please select your country of residence.\">\n    <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n    <option value=\"United States\" title=\"1\">United States</option>\n    <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n    <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n    <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n    <option value=\"Albania \" title=\"355\">Albania </option>\n    <option value=\"Algeria\" title=\"213\">Algeria</option>\n    <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n    <option value=\"Andorra\" title=\"376\">Andorra</option>\n    <option value=\"Angola\" title=\"244\">Angola</option>\n    <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n    <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n    <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n    <option value=\"Argentina\" title=\"54\">Argentina</option>\n    <option value=\"Armenia\" title=\"374\">Armenia</option>\n    <option value=\"Aruba\" title=\"297\">Aruba</option>\n    <option value=\"Australia\" title=\"61\">Australia</option>\n    <option value=\"Austria\" title=\"43\">Austria</option>\n    <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n    <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n    <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n    <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n    <option value=\"Barbados\" title=\"246\">Barbados</option>\n    <option value=\"Belarus\" title=\"375\">Belarus</option>\n    <option value=\"Belgium\" title=\"32\">Belgium</option>\n    <option value=\"Belize\" title=\"501\">Belize</option>\n    <option value=\"Benin\" title=\"229\">Benin</option>\n    <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n    <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n    <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n    <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n    <option value=\"Botswana\" title=\"267\">Botswana</option>\n    <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n    <option value=\"Brazil\" title=\"55\">Brazil</option>\n    <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n    <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n    <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n    <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n    <option value=\"Burundi\" title=\"257\">Burundi</option>\n    <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n    <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n    <option value=\"Canada\" title=\"1\">Canada</option>\n    <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n    <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n    <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n    <option value=\"Chad\" title=\"235\">Chad</option>\n    <option value=\"Chile\" title=\"56\">Chile</option>\n    <option value=\"China\" title=\"86\">China</option>\n    <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n    <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n    <option value=\"Colombia\" title=\"57\">Colombia</option>\n    <option value=\"Comoros\" title=\"269\">Comoros</option>\n    <option value=\"Congo\" title=\"242\">Congo</option>\n    <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n    <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n    <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n    <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n    <option value=\"Croatia\" title=\"285\">Croatia</option>\n    <option value=\"Cuba\" title=\"53\">Cuba</option>\n    <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n    <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n    <option value=\"Denmark\" title=\"45\">Denmark</option>\n    <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n    <option value=\"Dominica\" title=\"767\">Dominica</option>\n    <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n    <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n    <option value=\"Egypt\" title=\"20\">Egypt</option>\n    <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n    <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n    <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n    <option value=\"Estonia\" title=\"372\">Estonia</option>\n    <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n    <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n    <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n    <option value=\"Fiji\" title=\"679\">Fiji</option>\n    <option value=\"Finland\" title=\"358\">Finland</option>\n    <option value=\"France\" title=\"33\">France</option>\n    <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n    <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n    <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n    <option value=\"Gabon\" title=\"241\">Gabon</option>\n    <option value=\"Gambia\" title=\"220\">Gambia</option>\n    <option value=\"Georgia\" title=\"995\">Georgia</option>\n    <option value=\"Germany\" title=\"49\">Germany</option>\n    <option value=\"Ghana\" title=\"233\">Ghana</option>\n    <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n    <option value=\"Greece\" title=\"30\">Greece</option>\n    <option value=\"Greenland\" title=\"299\">Greenland</option>\n    <option value=\"Grenada\" title=\"473\">Grenada</option>\n    <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n    <option value=\"Guam\" title=\"671\">Guam</option>\n    <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n    <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n    <option value=\"Guinea\" title=\"594\">Guinea</option>\n    <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n    <option value=\"Guyana\" title=\"592\">Guyana</option>\n    <option value=\"Haiti\" title=\"509\">Haiti</option>\n    <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n    <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n    <option value=\"Honduras\" title=\"504\">Honduras</option>\n    <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n    <option value=\"Hungary\" title=\"36\">Hungary</option>\n    <option value=\"Iceland\" title=\"354\">Iceland</option>\n    <option value=\"India\" title=\"91\">India</option>\n    <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n    <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n    <option value=\"Iraq\" title=\"964\">Iraq</option>\n    <option value=\"Ireland\" title=\"353\">Ireland</option>\n    <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n    <option value=\"Israel\" title=\"972\">Israel</option>\n    <option value=\"Italy\" title=\"39\">Italy</option>\n    <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n    <option value=\"Japan\" title=\"81\">Japan</option>\n    <option value=\"Jersey\" title=\"44\">Jersey</option>\n    <option value=\"Jordan\" title=\"962\">Jordan</option>\n    <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n    <option value=\"Kenya\" title=\"254\">Kenya</option>\n    <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n    <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n    <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n    <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n    <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n    <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n    <option value=\"Latvia\" title=\"371\">Latvia</option>\n    <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n    <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n    <option value=\"Liberia\" title=\"231\">Liberia</option>\n    <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n    <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n    <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n    <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n    <option value=\"Macao\" title=\"853\">Macao</option>\n    <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n    <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n    <option value=\"Malawi\" title=\"265\">Malawi</option>\n    <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n    <option value=\"Maldives\" title=\"960\">Maldives</option>\n    <option value=\"Mali\" title=\"223\">Mali</option>\n    <option value=\"Malta\" title=\"356\">Malta</option>\n    <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n    <option value=\"Martinique\" title=\"596\">Martinique</option>\n    <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n    <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n    <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n    <option value=\"Mexico\" title=\"52\">Mexico</option>\n    <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n    <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n    <option value=\"Monaco\" title=\"377\">Monaco</option>\n    <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n    <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n    <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n    <option value=\"Morocco\" title=\"212\">Morocco</option>\n    <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n    <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n    <option value=\"Namibia\" title=\"264\">Namibia</option>\n    <option value=\"Nauru\" title=\"674\">Nauru</option>\n    <option value=\"Nepal\" title=\"977\">Nepal</option>\n    <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n    <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n    <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n    <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n    <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n    <option value=\"Niger\" title=\"227\">Niger</option>\n    <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n    <option value=\"Niue\" title=\"683\">Niue</option>\n    <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n    <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n    <option value=\"Norway\" title=\"47\">Norway</option>\n    <option value=\"Oman\" title=\"968\">Oman</option>\n    <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n    <option value=\"Palau\" title=\"680\">Palau</option>\n    <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n    <option value=\"Panama\" title=\"507\">Panama</option>\n    <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n    <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n    <option value=\"Peru\" title=\"51\">Peru</option>\n    <option value=\"Philippines\" title=\"63\">Philippines</option>\n    <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n    <option value=\"Poland\" title=\"48\">Poland</option>\n    <option value=\"Portugal\" title=\"351\">Portugal</option>\n    <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n    <option value=\"Qatar\" title=\"974\">Qatar</option>\n    <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n    <option value=\"Romania\" title=\"40\">Romania</option>\n    <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n    <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n    <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n    <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n    <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n    <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n    <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n    <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n    <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n    <option value=\"Samoa\" title=\"685\">Samoa</option>\n    <option value=\"San Marino\" title=\"378\">San Marino</option>\n    <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n    <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n    <option value=\"Senegal\" title=\"221\">Senegal</option>\n    <option value=\"Serbia\" title=\"381\">Serbia</option>\n    <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n    <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n    <option value=\"Singapore\" title=\"65\">Singapore</option>\n    <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n    <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n    <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n    <option value=\"Somalia\" title=\"252\">Somalia</option>\n    <option value=\"South Africa\" title=\"27\">South Africa</option>\n    <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n    <option value=\"Spain\" title=\"34\">Spain</option>\n    <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n    <option value=\"Sudan\" title=\"249\">Sudan</option>\n    <option value=\"Suriname\" title=\"597\">Suriname</option>\n    <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n    <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n    <option value=\"Sweden\" title=\"46\">Sweden</option>\n    <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n    <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n    <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n    <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n    <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n    <option value=\"Thailand\" title=\"66\">Thailand</option>\n    <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n    <option value=\"Togo\" title=\"228\">Togo</option>\n    <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n    <option value=\"Tonga\" title=\"676\">Tonga</option>\n    <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n    <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n    <option value=\"Turkey\" title=\"90\">Turkey</option>\n    <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n    <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n    <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n    <option value=\"Uganda\" title=\"256\">Uganda</option>\n    <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n    <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n    <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n    <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n    <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n    <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n    <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n    <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n    <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n    <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n    <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n    <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n    <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n    <option value=\"Yemen\" title=\"967\">Yemen</option>\n    <option value=\"Zambia\" title=\"260\">Zambia</option>\n    <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n  </select>\n</div>\n<label for=\"phone\">Phone</label>\n<input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n     data-msg-required=\"Please provide your phone number.\">\n\n<label for=\"zipcode\">Zip / Postal Code</label>\n<input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n           data-msg-required=\"Please provide your zip / postal code.\"\n           data-msg-minlength=\"ZIP code must have at least 5 characters.\">\n<label for=\"state\">State</label>\n<div id=\"stateField\">\n    <select id=\"state\" name=\"state\" title=\"State\"\n            data-msg-required=\"Please provide your state.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\" \" title=\"\">N/A</option>\n      <option value=\"Alabama\" title=\"\">Alabama</option>\n      <option value=\"Alaska\" title=\"\">Alaska</option>\n      <option value=\"Arizona\" title=\"\">Arizona</option>\n      <option value=\"Arkansas\" title=\"\">Arkansas</option>\n      <option value=\"California\" title=\"\">California</option>\n      <option value=\"Colorado\" title=\"\">Colorado</option>\n      <option value=\"Connecticut\" title=\"\">Connecticut</option>\n      <option value=\"Delaware\" title=\"\">Delaware</option>\n      <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n      <option value=\"Florida\" title=\"\">Florida</option>\n      <option value=\"Georgia\" title=\"\">Georgia</option>\n      <option value=\"Hawaii\" title=\"\">Hawaii</option>\n      <option value=\"Idaho\" title=\"\">Idaho</option>\n      <option value=\"Illinois\" title=\"\">Illinois</option>\n      <option value=\"Indiana\" title=\"\">Indiana</option>\n      <option value=\"Iowa\" title=\"\">Iowa</option>\n      <option value=\"Kansas\" title=\"\">Kansas</option>\n      <option value=\"Kentucky\" title=\"\">Kentucky</option>\n      <option value=\"Louisiana\" title=\"\">Louisiana</option>\n      <option value=\"Maine\" title=\"\">Maine</option>\n      <option value=\"Maryland\" title=\"\">Maryland</option>\n      <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n      <option value=\"Michigan\" title=\"\">Michigan</option>\n      <option value=\"Minnesota\" title=\"\">Minnesota</option>\n      <option value=\"Mississippi\" title=\"\">Mississippi</option>\n      <option value=\"Missouri\" title=\"\">Missouri</option>\n      <option value=\"Montana\" title=\"\">Montana</option>\n      <option value=\"Nebraska\" title=\"\">Nebraska</option>\n      <option value=\"Nevada\" title=\"\">Nevada</option>\n      <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n      <option value=\"New Jersey\" title=\"\">New Jersey</option>\n      <option value=\"New Mexico\" title=\"\">New Mexico</option>\n      <option value=\"New York\" title=\"\">New York</option>\n      <option value=\"North Carolina\" title=\"\">North Carolina</option>\n      <option value=\"North Dakota\" title=\"\">North Dakota</option>\n      <option value=\"Ohio\" title=\"\">Ohio</option>\n      <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n      <option value=\"Oregon\" title=\"\">Oregon</option>\n      <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n      <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n      <option value=\"South Carolina\" title=\"\">South Carolina</option>\n      <option value=\"South Dakota\" title=\"\">South Dakota</option>\n      <option value=\"Tennessee\" title=\"\">Tennessee</option>\n      <option value=\"Texas\" title=\"\">Texas</option>\n      <option value=\"Utah\" title=\"\">Utah</option>\n      <option value=\"Vermont\" title=\"\">Vermont</option>\n      <option value=\"Virginia\" title=\"\">Virginia</option>\n      <option value=\"Washington\" title=\"\">Washington</option>\n      <option value=\"West Virginia\" title=\"\">West Virginia</option>\n      <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n      <option value=\"Wyoming\" title=\"\">Wyoming</option>\n    </select>\n</div>\n<input type=\"hidden\" id=\"country_code\" name=\"country_code\", value=\"\">\n</div>";

  LeadForm.Programs['sc-msn.form'] = "<div data-percentage=\"10\" class=\"lead-form-step lead-form-step-0\">\n  <label for=\"license\">Are You a Licensed Registered Nurse?</label>\n  <div id=\"licenseField\">\n    <select id=\"license\" name=\"SFQ-Registered_Nurse__c\" required\n    data-msg-required=\"Please select whether or not you are a Licensed Registered Nurse.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Yes\" title=\"\">Yes</option>\n      <option value=\"No\" title=\"\">No</option>\n      <option value=\"Currently Obtaining\" title=\"\">Currently Obtaining</option>\n    </select>\n  </div>\n</div>\n<div data-percentage=\"30\" class=\"hide lead-form-step lead-form-step-1\">\n  <label for=\"education\">What is the highest level of education you have completed?</label>\n  <div id=\"educationField\">\n    <select id=\"education\" name=\"SFQ-Level_of_Education__c\" required\n    data-msg-required=\"Please select your highest level of education.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"High School\" title=\"\">High School</option>\n      <option value=\"Associate&rsquo;s Degree\" title=\"\">Associate&rsquo;s Degree</option>\n      <option value=\"Bachelor&rsquo;s in progress\" title=\"\">Bachelor&rsquo;s in progress</option>\n      <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n      <option value=\"Master&rsquo;s in progress\" title=\"\">Master&rsquo;s in progress</option>\n      <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n      <option value=\"Doctorate in progress\" title=\"\">Doctorate in progress</option>\n      <option value=\"Doctorate\" title=\"\">Doctorate</option>\n      <option value=\"Professional Degree\" title=\"\">Professional Degree</option>\n    </select>\n  </div>\n  <label for=\"gpaRange\">What was your undergraduate<abbr title=\"Grade Point Average\"> GPA</abbr>?</label>\n  <div id=\"gpaRangeField\">\n    <select id=\"gpaRange\" name=\"SFQ-Stated_GPA_Range__c\" required\n    data-msg-required=\"Please provide your GPA range.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n      <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n      <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n      <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n      <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n    </select>\n  </div>\n  <label for=\"bsn\">Do You Have a Bachelor of Science in Nursing (BSN)?</label>\n  <div id=\"bsnField\">\n    <select id=\"bsn\" name=\"SFQ-Bachelors_of_Science_in__c\" required\n    data-msg-required=\"Please select whether or not you have a Bachelor of Science in Nursing Degree.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Yes\" title=\"\">Yes</option>\n      <option value=\"No\" title=\"\">No</option>\n      <option value=\"Currently Obtaining\" title=\"\">Currently Obtaining</option>\n    </select>\n  </div>\n  <label for=\"BSN-school\">If you have earned your BSN, what was your BSN/CNL school? (Optional)</label>\n  <input id=\"BSN-school\" name=\"SFQ-Name_of_BSN_CNL_School__c\" size=\"20\" type=\"text\">\n  <label for=\"degree\">Which degree option are you interested in pursuing?</label>\n  <div id=\"degreeField\">\n    <select id=\"degree\" name=\"SFQ-Prospect_Indicated_Degree_Interest__c\" required\n    data-msg-required=\"Please select the degree you are interested in pursuing.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"RN to BSN\" title=\"\">RN to BSN</option>\n      <option value=\"RN to MSN\" title=\"\">RN to MSN (bachelor's degree not required)</option>\n      <option value=\"MSN\" title=\"\">MSN (bachelor's degree required)</option>\n    </select>\n  </div>\n</div>\n<div data-percentage=\"90\" class=\"hide lead-form-step lead-form-step-2\">\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"first_name\">First Name</label>\n      <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n     required data-msg-required=\"Please provide your first name.\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"last_name\">Last Name</label>\n      <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n     required data-msg-required=\"Please provide your last name.\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"email\">Email</label>\n      <input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n     data-msg-required=\"Please provide your email address.\">\n    </div>\n    <input type=\"hidden\" id=\"country_code\" name=\"country_code\" value=\"1\">\n    <div class=\"span3\">\n      <label for=\"phone\">Phone</label>\n      <input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n     data-msg-required=\"Please provide your phone number.\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"zipcode\">Zip</label>\n      <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\" required\n     data-msg-required=\"Please provide your ZIP / postal code.\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"state\">State</label>\n      <div id=\"stateField\">\n<select id=\"state\" name=\"state\" required\n	data-msg-required=\"Please provide your state.\">\n  <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n  <option value=\" \" title=\"\">N/A</option>\n  <option value=\"Alabama\" title=\"\">Alabama</option>\n  <option value=\"Alaska\" title=\"\">Alaska</option>\n  <option value=\"Arizona\" title=\"\">Arizona</option>\n  <option value=\"Arkansas\" title=\"\">Arkansas</option>\n  <option value=\"California\" title=\"\">California</option>\n  <option value=\"Colorado\" title=\"\">Colorado</option>\n  <option value=\"Connecticut\" title=\"\">Connecticut</option>\n  <option value=\"Delaware\" title=\"\">Delaware</option>\n  <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n  <option value=\"Florida\" title=\"\">Florida</option>\n  <option value=\"Georgia\" title=\"\">Georgia</option>\n  <option value=\"Hawaii\" title=\"\">Hawaii</option>\n  <option value=\"Idaho\" title=\"\">Idaho</option>\n  <option value=\"Illinois\" title=\"\">Illinois</option>\n  <option value=\"Indiana\" title=\"\">Indiana</option>\n  <option value=\"Iowa\" title=\"\">Iowa</option>\n  <option value=\"Kansas\" title=\"\">Kansas</option>\n  <option value=\"Kentucky\" title=\"\">Kentucky</option>\n  <option value=\"Louisiana\" title=\"\">Louisiana</option>\n  <option value=\"Maine\" title=\"\">Maine</option>\n  <option value=\"Maryland\" title=\"\">Maryland</option>\n  <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n  <option value=\"Michigan\" title=\"\">Michigan</option>\n  <option value=\"Minnesota\" title=\"\">Minnesota</option>\n  <option value=\"Mississippi\" title=\"\">Mississippi</option>\n  <option value=\"Missouri\" title=\"\">Missouri</option>\n  <option value=\"Montana\" title=\"\">Montana</option>\n  <option value=\"Nebraska\" title=\"\">Nebraska</option>\n  <option value=\"Nevada\" title=\"\">Nevada</option>\n  <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n  <option value=\"New Jersey\" title=\"\">New Jersey</option>\n  <option value=\"New Mexico\" title=\"\">New Mexico</option>\n  <option value=\"New York\" title=\"\">New York</option>\n  <option value=\"North Carolina\" title=\"\">North Carolina</option>\n  <option value=\"North Dakota\" title=\"\">North Dakota</option>\n  <option value=\"Ohio\" title=\"\">Ohio</option>\n  <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n  <option value=\"Oregon\" title=\"\">Oregon</option>\n  <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n  <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n  <option value=\"South Carolina\" title=\"\">South Carolina</option>\n  <option value=\"South Dakota\" title=\"\">South Dakota</option>\n  <option value=\"Tennessee\" title=\"\">Tennessee</option>\n  <option value=\"Texas\" title=\"\">Texas</option>\n  <option value=\"Utah\" title=\"\">Utah</option>\n  <option value=\"Vermont\" title=\"\">Vermont</option>\n  <option value=\"Virginia\" title=\"\">Virginia</option>\n  <option value=\"Washington\" title=\"\">Washington</option>\n  <option value=\"West Virginia\" title=\"\">West Virginia</option>\n  <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n  <option value=\"Wyoming\" title=\"\">Wyoming</option>\n</select>\n      </div>\n    </div>\n  </div>\n  <label for=\"partner\" class=\"checkbox\">Nursing@Simmons's technology partner works with an additional university to offer online nursing education.</label>\n  <div id=\"partnerField\" class=\"checkboxes\">\n    <input id=\"partnerOptIn\" type=\"checkbox\" value=\"Simmons Marketing\" name=\"SFQ-Lead_Share_Opt_In__c\" checked=\"\">\n    <label for=\"partnerOptIn\">Yes, I would like to learn more about this additional online graduate nursing opportunity.</label>\n  </div>";

  LeadForm.Programs['smu-mds.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"30\" >\n<label for=\"why-data-science\">Why are you interested in earning your master's in data science?</label>\n<div id=\"whyDataScienceField\">\n    <select id=\"why-data-science\"\n            name=\"SFQ-Why_Interested_in_Master_of_Data_Science__c\"\n      title=\"Why are you interested in earning your master's in data science?\" class=\"valid\" required\n            data-msg-required=\"Please select why you are interested in earning your master's in data science.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Advance my career\" title=\"\">Advance my career</option>\n      <option value=\"Switch to a new career\" title=\"\">Switch to a new career</option>\n      <option value=\"Develop my professional skills\" title=\"\">Develop my professional skills</option>\n    </select>\n</div>\n</div><!--step1 -->\n\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"60\">\n<label for=\"education\">What is your highest level of education completed?</label>\n<div id=\"educationField\">\n  <div class=\"custom-select-wrapper\">\n    <select id=\"education\"\n            name=\"SFQ-Level_of_Education__c\"\n      title=\"Highest level of education completed?\" class=\"valid\" required\n            data-msg-required=\"Please select your highest level of education.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"High School\" title=\"\">High School</option>\n      <option value=\"Associate&rsquo;s Degree\" title=\"\">Associate&rsquo;s Degree</option>\n      <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n      <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n      <option value=\"Doctorate\" title=\"\">Doctorate</option>\n    </select>\n  </div>\n</div>\n<label for=\"gpaRange\">What was your undergraduate GPA?</label>\n<div id=\"gpaRangeField\">\n    <select id=\"gpaRange\" name=\"SFQ-Stated_GPA_Range__c\"\n      title=\"What was your undergraduate GPA?\" class=\"valid\" required\n            data-msg-required=\"Please select your GPA.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n      <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n      <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n      <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n      <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n    </select>\n</div>\n<label for=\"takengre\">Have you taken the GRE within the last five years?</label>\n<div id=\"takengreField\">\n    <select id=\"takengre\"\n      name=\"SFQ-GRE_GMAT_Taken__c\"\n      title=\"Have you taken the GRE within the last five years??\"\n      class=\"valid\" required\n      data-msg-required=\"Please select whether or not you have taken the GRE within the last five years.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Yes\" title=\"\">Yes</option>\n      <option value=\"No\" title=\"\">No</option>\n      <option value=\"Registered but not taken\" title=\"\">Registered but not taken</option>\n    </select>\n</div>\n</div><!-- step2 -->\n\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"first_name\">First Name</label>\n    <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your first name.\">\n  </div>\n  <div class=\"span3\">\n    <label for=\"last_name\">Last Name</label>\n    <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your last name.\">\n  </div>\n</div><!-- end of name fields -->\n\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"email\">Email</label>\n    <input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n   data-msg-required=\"Please provide your email address.\">\n </div>\n</div>\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"country\">Country of Residence</label>\n    <div id=\"countryField\">\n      <select id=\"country\"\n        name=\"SFQ-Country\"\n        required\n        data-msg-required=\"Please select your country of residence.\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"United States\" title=\"1\">United States</option>\n        <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n        <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n        <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n        <option value=\"Albania \" title=\"355\">Albania </option>\n        <option value=\"Algeria\" title=\"213\">Algeria</option>\n        <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n        <option value=\"Andorra\" title=\"376\">Andorra</option>\n        <option value=\"Angola\" title=\"244\">Angola</option>\n        <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n        <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n        <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n        <option value=\"Argentina\" title=\"54\">Argentina</option>\n        <option value=\"Armenia\" title=\"374\">Armenia</option>\n        <option value=\"Aruba\" title=\"297\">Aruba</option>\n        <option value=\"Australia\" title=\"61\">Australia</option>\n        <option value=\"Austria\" title=\"43\">Austria</option>\n        <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n        <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n        <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n        <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n        <option value=\"Barbados\" title=\"246\">Barbados</option>\n        <option value=\"Belarus\" title=\"375\">Belarus</option>\n        <option value=\"Belgium\" title=\"32\">Belgium</option>\n        <option value=\"Belize\" title=\"501\">Belize</option>\n        <option value=\"Benin\" title=\"229\">Benin</option>\n        <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n        <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n        <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n        <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n        <option value=\"Botswana\" title=\"267\">Botswana</option>\n        <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n        <option value=\"Brazil\" title=\"55\">Brazil</option>\n        <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n        <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n        <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n        <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n        <option value=\"Burundi\" title=\"257\">Burundi</option>\n        <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n        <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n        <option value=\"Canada\" title=\"1\">Canada</option>\n        <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n        <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n        <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n        <option value=\"Chad\" title=\"235\">Chad</option>\n        <option value=\"Chile\" title=\"56\">Chile</option>\n        <option value=\"China\" title=\"86\">China</option>\n        <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n        <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n        <option value=\"Colombia\" title=\"57\">Colombia</option>\n        <option value=\"Comoros\" title=\"269\">Comoros</option>\n        <option value=\"Congo\" title=\"242\">Congo</option>\n        <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n        <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n        <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n        <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n        <option value=\"Croatia\" title=\"285\">Croatia</option>\n        <option value=\"Cuba\" title=\"53\">Cuba</option>\n        <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n        <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n        <option value=\"Denmark\" title=\"45\">Denmark</option>\n        <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n        <option value=\"Dominica\" title=\"767\">Dominica</option>\n        <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n        <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n        <option value=\"Egypt\" title=\"20\">Egypt</option>\n        <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n        <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n        <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n        <option value=\"Estonia\" title=\"372\">Estonia</option>\n        <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n        <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n        <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n        <option value=\"Fiji\" title=\"679\">Fiji</option>\n        <option value=\"Finland\" title=\"358\">Finland</option>\n        <option value=\"France\" title=\"33\">France</option>\n        <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n        <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n        <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n        <option value=\"Gabon\" title=\"241\">Gabon</option>\n        <option value=\"Gambia\" title=\"220\">Gambia</option>\n        <option value=\"Georgia\" title=\"995\">Georgia</option>\n        <option value=\"Germany\" title=\"49\">Germany</option>\n        <option value=\"Ghana\" title=\"233\">Ghana</option>\n        <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n        <option value=\"Greece\" title=\"30\">Greece</option>\n        <option value=\"Greenland\" title=\"299\">Greenland</option>\n        <option value=\"Grenada\" title=\"473\">Grenada</option>\n        <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n        <option value=\"Guam\" title=\"671\">Guam</option>\n        <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n        <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n        <option value=\"Guinea\" title=\"594\">Guinea</option>\n        <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n        <option value=\"Guyana\" title=\"592\">Guyana</option>\n        <option value=\"Haiti\" title=\"509\">Haiti</option>\n        <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n        <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n        <option value=\"Honduras\" title=\"504\">Honduras</option>\n        <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n        <option value=\"Hungary\" title=\"36\">Hungary</option>\n        <option value=\"Iceland\" title=\"354\">Iceland</option>\n        <option value=\"India\" title=\"91\">India</option>\n        <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n        <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n        <option value=\"Iraq\" title=\"964\">Iraq</option>\n        <option value=\"Ireland\" title=\"353\">Ireland</option>\n        <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n        <option value=\"Israel\" title=\"972\">Israel</option>\n        <option value=\"Italy\" title=\"39\">Italy</option>\n        <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n        <option value=\"Japan\" title=\"81\">Japan</option>\n        <option value=\"Jersey\" title=\"44\">Jersey</option>\n        <option value=\"Jordan\" title=\"962\">Jordan</option>\n        <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n        <option value=\"Kenya\" title=\"254\">Kenya</option>\n        <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n        <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n        <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n        <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n        <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n        <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n        <option value=\"Latvia\" title=\"371\">Latvia</option>\n        <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n        <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n        <option value=\"Liberia\" title=\"231\">Liberia</option>\n        <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n        <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n        <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n        <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n        <option value=\"Macao\" title=\"853\">Macao</option>\n        <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n        <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n        <option value=\"Malawi\" title=\"265\">Malawi</option>\n        <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n        <option value=\"Maldives\" title=\"960\">Maldives</option>\n        <option value=\"Mali\" title=\"223\">Mali</option>\n        <option value=\"Malta\" title=\"356\">Malta</option>\n        <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n        <option value=\"Martinique\" title=\"596\">Martinique</option>\n        <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n        <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n        <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n        <option value=\"Mexico\" title=\"52\">Mexico</option>\n        <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n        <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n        <option value=\"Monaco\" title=\"377\">Monaco</option>\n        <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n        <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n        <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n        <option value=\"Morocco\" title=\"212\">Morocco</option>\n        <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n        <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n        <option value=\"Namibia\" title=\"264\">Namibia</option>\n        <option value=\"Nauru\" title=\"674\">Nauru</option>\n        <option value=\"Nepal\" title=\"977\">Nepal</option>\n        <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n        <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n        <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n        <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n        <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n        <option value=\"Niger\" title=\"227\">Niger</option>\n        <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n        <option value=\"Niue\" title=\"683\">Niue</option>\n        <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n        <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n        <option value=\"Norway\" title=\"47\">Norway</option>\n        <option value=\"Oman\" title=\"968\">Oman</option>\n        <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n        <option value=\"Palau\" title=\"680\">Palau</option>\n        <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n        <option value=\"Panama\" title=\"507\">Panama</option>\n        <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n        <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n        <option value=\"Peru\" title=\"51\">Peru</option>\n        <option value=\"Philippines\" title=\"63\">Philippines</option>\n        <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n        <option value=\"Poland\" title=\"48\">Poland</option>\n        <option value=\"Portugal\" title=\"351\">Portugal</option>\n        <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n        <option value=\"Qatar\" title=\"974\">Qatar</option>\n        <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n        <option value=\"Romania\" title=\"40\">Romania</option>\n        <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n        <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n        <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n        <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n        <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n        <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n        <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n        <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n        <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n        <option value=\"Samoa\" title=\"685\">Samoa</option>\n        <option value=\"San Marino\" title=\"378\">San Marino</option>\n        <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n        <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n        <option value=\"Senegal\" title=\"221\">Senegal</option>\n        <option value=\"Serbia\" title=\"381\">Serbia</option>\n        <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n        <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n        <option value=\"Singapore\" title=\"65\">Singapore</option>\n        <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n        <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n        <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n        <option value=\"Somalia\" title=\"252\">Somalia</option>\n        <option value=\"South Africa\" title=\"27\">South Africa</option>\n        <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n        <option value=\"Spain\" title=\"34\">Spain</option>\n        <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n        <option value=\"Sudan\" title=\"249\">Sudan</option>\n        <option value=\"Suriname\" title=\"597\">Suriname</option>\n        <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n        <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n        <option value=\"Sweden\" title=\"46\">Sweden</option>\n        <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n        <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n        <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n        <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n        <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n        <option value=\"Thailand\" title=\"66\">Thailand</option>\n        <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n        <option value=\"Togo\" title=\"228\">Togo</option>\n        <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n        <option value=\"Tonga\" title=\"676\">Tonga</option>\n        <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n        <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n        <option value=\"Turkey\" title=\"90\">Turkey</option>\n        <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n        <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n        <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n        <option value=\"Uganda\" title=\"256\">Uganda</option>\n        <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n        <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n        <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n        <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n        <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n        <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n        <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n        <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n        <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n        <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n        <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n        <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n        <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n        <option value=\"Yemen\" title=\"967\">Yemen</option>\n        <option value=\"Zambia\" title=\"260\">Zambia</option>\n        <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n      </select>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"SFQ-Phone\">Phone</label>\n    <input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n           data-msg-required=\"Please provide your phone number.\">\n  </div>\n  <div class=\"span3\">\n    <label for=\"zipcode\">Zip / Postal Code</label>\n    <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n           data-msg-required=\"Please provide your zip / postal code.\">\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"state\">State</label>\n    <div id=\"stateField\">\n        <select id=\"state\" name=\"state\" title=\"State\"\n                data-msg-required=\"Please provide your state.\">\n          <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n          <option value=\" \" title=\"\">N/A</option>\n          <option value=\"Alabama\" title=\"\">Alabama</option>\n          <option value=\"Alaska\" title=\"\">Alaska</option>\n          <option value=\"Arizona\" title=\"\">Arizona</option>\n          <option value=\"Arkansas\" title=\"\">Arkansas</option>\n          <option value=\"California\" title=\"\">California</option>\n          <option value=\"Colorado\" title=\"\">Colorado</option>\n          <option value=\"Connecticut\" title=\"\">Connecticut</option>\n          <option value=\"Delaware\" title=\"\">Delaware</option>\n          <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n          <option value=\"Florida\" title=\"\">Florida</option>\n          <option value=\"Georgia\" title=\"\">Georgia</option>\n          <option value=\"Hawaii\" title=\"\">Hawaii</option>\n          <option value=\"Idaho\" title=\"\">Idaho</option>\n          <option value=\"Illinois\" title=\"\">Illinois</option>\n          <option value=\"Indiana\" title=\"\">Indiana</option>\n          <option value=\"Iowa\" title=\"\">Iowa</option>\n          <option value=\"Kansas\" title=\"\">Kansas</option>\n          <option value=\"Kentucky\" title=\"\">Kentucky</option>\n          <option value=\"Louisiana\" title=\"\">Louisiana</option>\n          <option value=\"Maine\" title=\"\">Maine</option>\n          <option value=\"Maryland\" title=\"\">Maryland</option>\n          <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n          <option value=\"Michigan\" title=\"\">Michigan</option>\n          <option value=\"Minnesota\" title=\"\">Minnesota</option>\n          <option value=\"Mississippi\" title=\"\">Mississippi</option>\n          <option value=\"Missouri\" title=\"\">Missouri</option>\n          <option value=\"Montana\" title=\"\">Montana</option>\n          <option value=\"Nebraska\" title=\"\">Nebraska</option>\n          <option value=\"Nevada\" title=\"\">Nevada</option>\n          <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n          <option value=\"New Jersey\" title=\"\">New Jersey</option>\n          <option value=\"New Mexico\" title=\"\">New Mexico</option>\n          <option value=\"New York\" title=\"\">New York</option>\n          <option value=\"North Carolina\" title=\"\">North Carolina</option>\n          <option value=\"North Dakota\" title=\"\">North Dakota</option>\n          <option value=\"Ohio\" title=\"\">Ohio</option>\n          <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n          <option value=\"Oregon\" title=\"\">Oregon</option>\n          <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n          <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n          <option value=\"South Carolina\" title=\"\">South Carolina</option>\n          <option value=\"South Dakota\" title=\"\">South Dakota</option>\n          <option value=\"Tennessee\" title=\"\">Tennessee</option>\n          <option value=\"Texas\" title=\"\">Texas</option>\n          <option value=\"Utah\" title=\"\">Utah</option>\n          <option value=\"Vermont\" title=\"\">Vermont</option>\n          <option value=\"Virginia\" title=\"\">Virginia</option>\n          <option value=\"Washington\" title=\"\">Washington</option>\n          <option value=\"West Virginia\" title=\"\">West Virginia</option>\n          <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n          <option value=\"Wyoming\" title=\"\">Wyoming</option>\n        </select>\n      </div>\n    </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"span3\">\n      <label for=\"countrycit\">Country of Citizenship</label>\n      <div id=\"countrycitField\">\n        <select id=\"countrycit\"\n          name=\"SFQ-Country_of_Citizenship__c\"\n          required\n          data-msg-required=\"Please select your country of citizenship.\">\n          <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n          <option value=\"United States\" title=\"1\">United States</option>\n          <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n          <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n          <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n          <option value=\"Albania \" title=\"355\">Albania </option>\n          <option value=\"Algeria\" title=\"213\">Algeria</option>\n          <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n          <option value=\"Andorra\" title=\"376\">Andorra</option>\n          <option value=\"Angola\" title=\"244\">Angola</option>\n          <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n          <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n          <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n          <option value=\"Argentina\" title=\"54\">Argentina</option>\n          <option value=\"Armenia\" title=\"374\">Armenia</option>\n          <option value=\"Aruba\" title=\"297\">Aruba</option>\n          <option value=\"Australia\" title=\"61\">Australia</option>\n          <option value=\"Austria\" title=\"43\">Austria</option>\n          <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n          <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n          <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n          <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n          <option value=\"Barbados\" title=\"246\">Barbados</option>\n          <option value=\"Belarus\" title=\"375\">Belarus</option>\n          <option value=\"Belgium\" title=\"32\">Belgium</option>\n          <option value=\"Belize\" title=\"501\">Belize</option>\n          <option value=\"Benin\" title=\"229\">Benin</option>\n          <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n          <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n          <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n          <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n          <option value=\"Botswana\" title=\"267\">Botswana</option>\n          <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n          <option value=\"Brazil\" title=\"55\">Brazil</option>\n          <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n          <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n          <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n          <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n          <option value=\"Burundi\" title=\"257\">Burundi</option>\n          <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n          <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n          <option value=\"Canada\" title=\"1\">Canada</option>\n          <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n          <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n          <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n          <option value=\"Chad\" title=\"235\">Chad</option>\n          <option value=\"Chile\" title=\"56\">Chile</option>\n          <option value=\"China\" title=\"86\">China</option>\n          <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n          <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n          <option value=\"Colombia\" title=\"57\">Colombia</option>\n          <option value=\"Comoros\" title=\"269\">Comoros</option>\n          <option value=\"Congo\" title=\"242\">Congo</option>\n          <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n          <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n          <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n          <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n          <option value=\"Croatia\" title=\"285\">Croatia</option>\n          <option value=\"Cuba\" title=\"53\">Cuba</option>\n          <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n          <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n          <option value=\"Denmark\" title=\"45\">Denmark</option>\n          <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n          <option value=\"Dominica\" title=\"767\">Dominica</option>\n          <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n          <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n          <option value=\"Egypt\" title=\"20\">Egypt</option>\n          <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n          <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n          <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n          <option value=\"Estonia\" title=\"372\">Estonia</option>\n          <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n          <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n          <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n          <option value=\"Fiji\" title=\"679\">Fiji</option>\n          <option value=\"Finland\" title=\"358\">Finland</option>\n          <option value=\"France\" title=\"33\">France</option>\n          <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n          <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n          <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n          <option value=\"Gabon\" title=\"241\">Gabon</option>\n          <option value=\"Gambia\" title=\"220\">Gambia</option>\n          <option value=\"Georgia\" title=\"995\">Georgia</option>\n          <option value=\"Germany\" title=\"49\">Germany</option>\n          <option value=\"Ghana\" title=\"233\">Ghana</option>\n          <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n          <option value=\"Greece\" title=\"30\">Greece</option>\n          <option value=\"Greenland\" title=\"299\">Greenland</option>\n          <option value=\"Grenada\" title=\"473\">Grenada</option>\n          <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n          <option value=\"Guam\" title=\"671\">Guam</option>\n          <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n          <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n          <option value=\"Guinea\" title=\"594\">Guinea</option>\n          <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n          <option value=\"Guyana\" title=\"592\">Guyana</option>\n          <option value=\"Haiti\" title=\"509\">Haiti</option>\n          <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n          <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n          <option value=\"Honduras\" title=\"504\">Honduras</option>\n          <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n          <option value=\"Hungary\" title=\"36\">Hungary</option>\n          <option value=\"Iceland\" title=\"354\">Iceland</option>\n          <option value=\"India\" title=\"91\">India</option>\n          <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n          <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n          <option value=\"Iraq\" title=\"964\">Iraq</option>\n          <option value=\"Ireland\" title=\"353\">Ireland</option>\n          <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n          <option value=\"Israel\" title=\"972\">Israel</option>\n          <option value=\"Italy\" title=\"39\">Italy</option>\n          <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n          <option value=\"Japan\" title=\"81\">Japan</option>\n          <option value=\"Jersey\" title=\"44\">Jersey</option>\n          <option value=\"Jordan\" title=\"962\">Jordan</option>\n          <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n          <option value=\"Kenya\" title=\"254\">Kenya</option>\n          <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n          <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n          <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n          <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n          <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n          <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n          <option value=\"Latvia\" title=\"371\">Latvia</option>\n          <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n          <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n          <option value=\"Liberia\" title=\"231\">Liberia</option>\n          <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n          <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n          <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n          <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n          <option value=\"Macao\" title=\"853\">Macao</option>\n          <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n          <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n          <option value=\"Malawi\" title=\"265\">Malawi</option>\n          <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n          <option value=\"Maldives\" title=\"960\">Maldives</option>\n          <option value=\"Mali\" title=\"223\">Mali</option>\n          <option value=\"Malta\" title=\"356\">Malta</option>\n          <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n          <option value=\"Martinique\" title=\"596\">Martinique</option>\n          <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n          <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n          <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n          <option value=\"Mexico\" title=\"52\">Mexico</option>\n          <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n          <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n          <option value=\"Monaco\" title=\"377\">Monaco</option>\n          <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n          <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n          <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n          <option value=\"Morocco\" title=\"212\">Morocco</option>\n          <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n          <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n          <option value=\"Namibia\" title=\"264\">Namibia</option>\n          <option value=\"Nauru\" title=\"674\">Nauru</option>\n          <option value=\"Nepal\" title=\"977\">Nepal</option>\n          <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n          <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n          <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n          <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n          <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n          <option value=\"Niger\" title=\"227\">Niger</option>\n          <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n          <option value=\"Niue\" title=\"683\">Niue</option>\n          <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n          <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n          <option value=\"Norway\" title=\"47\">Norway</option>\n          <option value=\"Oman\" title=\"968\">Oman</option>\n          <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n          <option value=\"Palau\" title=\"680\">Palau</option>\n          <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n          <option value=\"Panama\" title=\"507\">Panama</option>\n          <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n          <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n          <option value=\"Peru\" title=\"51\">Peru</option>\n          <option value=\"Philippines\" title=\"63\">Philippines</option>\n          <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n          <option value=\"Poland\" title=\"48\">Poland</option>\n          <option value=\"Portugal\" title=\"351\">Portugal</option>\n          <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n          <option value=\"Qatar\" title=\"974\">Qatar</option>\n          <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n          <option value=\"Romania\" title=\"40\">Romania</option>\n          <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n          <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n          <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n          <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n          <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n          <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n          <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n          <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n          <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n          <option value=\"Samoa\" title=\"685\">Samoa</option>\n          <option value=\"San Marino\" title=\"378\">San Marino</option>\n          <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n          <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n          <option value=\"Senegal\" title=\"221\">Senegal</option>\n          <option value=\"Serbia\" title=\"381\">Serbia</option>\n          <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n          <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n          <option value=\"Singapore\" title=\"65\">Singapore</option>\n          <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n          <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n          <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n          <option value=\"Somalia\" title=\"252\">Somalia</option>\n          <option value=\"South Africa\" title=\"27\">South Africa</option>\n          <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n          <option value=\"Spain\" title=\"34\">Spain</option>\n          <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n          <option value=\"Sudan\" title=\"249\">Sudan</option>\n          <option value=\"Suriname\" title=\"597\">Suriname</option>\n          <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n          <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n          <option value=\"Sweden\" title=\"46\">Sweden</option>\n          <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n          <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n          <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n          <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n          <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n          <option value=\"Thailand\" title=\"66\">Thailand</option>\n          <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n          <option value=\"Togo\" title=\"228\">Togo</option>\n          <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n          <option value=\"Tonga\" title=\"676\">Tonga</option>\n          <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n          <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n          <option value=\"Turkey\" title=\"90\">Turkey</option>\n          <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n          <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n          <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n          <option value=\"Uganda\" title=\"256\">Uganda</option>\n          <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n          <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n          <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n          <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n          <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n          <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n          <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n          <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n          <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n          <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n          <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n          <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n          <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n          <option value=\"Yemen\" title=\"967\">Yemen</option>\n          <option value=\"Zambia\" title=\"260\">Zambia</option>\n          <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n        </select>\n      </div>\n    </div>\n</div>\n<label for=\"partner\" class=\"checkbox\">\n  DataScience@SMU's technology partner works with an additional university to offer online data science education.\n</label>\n<div id=\"partnerField\" class=\"checkboxes\">\n  <input id=\"partnerOptIn\" type=\"checkbox\" value=\"SMU-MDS Marketing\" name=\"SFQ-Lead_Share_Opt_In__c\" checked=\"\">\n  <label for=\"partnerOptIn\">\n    Yes, I would like to learn more about this additional online graduate data science opportunity.\n  </label>\n  <br>\n</div>\n<input type=\"hidden\" id=\"country_code\" name=\"country_code\", value=\"\">\n</div>";

  LeadForm.Programs['syr-mba.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"30\" >\n  <div id=\"degreeWrapper\">\n    <label for=\"degreeInterest\">In which program are you interested?</label>\n    <div id=\"degreeInterestField\">\n        <select id=\"degreeInterest\"\n                name=\"SFQ-Degree_Interest__c\"\n          title=\"In which program are you interested?\" class=\"valid\" required\n                data-msg-required=\"Please select which program you are interested in.\">\n          <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n          <option value=\"MBA\" title=\"\">MBA@Syracuse (MBA)</option>\n          <option value=\"MSA\" title=\"\">Accounting@Syracuse (MSA)</option>\n        </select>\n    </div>\n  </div>\n</div><!--step1 -->\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"60\">\n  <div id=\"experienceWrapper\">\n    <label for=\"experience\">How many years of work experience do you have?</label>\n    <div id=\"experienceField\">\n        <select id=\"experience\"\n                name=\"SFQ-Years_of_Work_Experience__c\"\n          title=\"How many years of work experience do you have?\" class=\"valid\" required\n                data-msg-required=\"Please select how many years of work experience you have.\">\n          <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n          <option value=\"less than 2\" title=\"\">Less than 2</option>\n          <option value=\"2 to 4\" title=\"\">2 to 4</option>\n          <option value=\"5 to 7\" title=\"\">5 to 7</option>\n          <option value=\"8 to 10\" title=\"\">8 to 10</option>\n          <option value=\"10 or more\" title=\"\">10 or more</option>\n        </select>\n    </div>\n  </div>\n  <label for=\"plans\">After earning your degree, in which industry do you plan to work?</label>\n  <div id=\"plansField\">\n      <select id=\"plans\"\n              name=\"SFQ-Planned_Industry_After_MBA__c\"\n              title=\"Which industry do you plan to work in?\" class=\"valid\" required\n              data-msg-required=\"Please select your desired industry.\">\n        <option value=\"\">&mdash; Select &mdash;</option>\n        <option value=\"Consulting\">Consulting</option>\n        <option value=\"Consumer Products\">Consumer Products</option>\n        <option value=\"Education\">Education</option>\n        <option value=\"Financial Services\">Financial Services</option>\n        <option value=\"Government\">Government</option>\n        <option value=\"Manufacturing\">Manufacturing</option>\n        <option value=\"Media/Entertainment\">Media/Entertainment</option>\n        <option value=\"Nonprofit\">Nonprofit</option>\n        <option value=\"Petroleum/Energy\">Petroleum/Energy</option>\n        <option value=\"Pharmaceutical/Biotechnology/Health Care Products\">Pharmaceutical/Biotechnology/Health Care Products</option>\n        <option value=\"Real Estate\">Real Estate</option>\n        <option value=\"Technology\">Technology</option>\n        <option value=\"Other\">Other</option>\n      </select>\n  </div>\n  <label for=\"education\">What is your highest level of education completed?</label>\n  <div id=\"educationField\">\n    <div class=\"custom-select-wrapper\">\n      <select id=\"education\"\n              name=\"SFQ-Level_of_Education__c\"\n        title=\"Highest level of education completed?\" class=\"valid\" required\n              data-msg-required=\"Please select your highest level of education.\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"High School\" title=\"\">High School</option>\n        <option value=\"Associate&rsquo;s\" title=\"\">Associate&rsquo;s</option>\n        <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n        <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n        <option value=\"Doctorate\" title=\"\">Doctorate</option>\n      </select>\n    </div>\n  </div>\n  <label for=\"gpaRange\">What was your undergraduate GPA?</label>\n  <div id=\"gpaRangeField\">\n      <select id=\"gpaRange\" name=\"SFQ-Stated_GPA_Range__c\"\n        title=\"What was your undergraduate GPA?\" class=\"valid\" required\n              data-msg-required=\"Please select your GPA.\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n        <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n        <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n        <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n        <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n      </select>\n  </div>\n  <label for=\"takengre\">Have you taken the GRE, GMAT or LSAT within the last five years?</label>\n  <div id=\"takengreField\">\n      <select id=\"takengre\"\n        name=\"SFQ-GRE_GMAT_LSAT_Taken_in_Last_5_Years__c\"\n        title=\"Have you taken the GRE, GMAT or LSAT within the last five years??\"\n        class=\"valid\" required\n        data-msg-required=\"Please select whether or not you have taken the GMAT, GRE, or LSAT.\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"Yes\" title=\"\">Yes</option>\n        <option value=\"No\" title=\"\">No</option>\n        <option value=\"Registered but not taken\" title=\"\">Registered but not taken</option>\n      </select>\n  </div>\n</div><!-- step2 -->\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"first_name\">First Name</label>\n      <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n             required data-msg-required=\"Please provide your first name.\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"last_name\">Last Name</label>\n      <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n             required data-msg-required=\"Please provide your last name.\">\n    </div>\n  </div><!-- end of name fields -->\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"email\">Email</label>\n      <input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n     data-msg-required=\"Please provide your email address.\">\n   </div>\n  </div>\n  <label for=\"country\">Country of Residence</label>\n  <div id=\"countryField\">\n    <select id=\"country\"\n      name=\"country\"\n      required\n      data-msg-required=\"Please select your country of residence.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"United States\" title=\"1\">United States</option>\n      <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n      <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n      <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n      <option value=\"Albania \" title=\"355\">Albania </option>\n      <option value=\"Algeria\" title=\"213\">Algeria</option>\n      <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n      <option value=\"Andorra\" title=\"376\">Andorra</option>\n      <option value=\"Angola\" title=\"244\">Angola</option>\n      <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n      <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n      <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n      <option value=\"Argentina\" title=\"54\">Argentina</option>\n      <option value=\"Armenia\" title=\"374\">Armenia</option>\n      <option value=\"Aruba\" title=\"297\">Aruba</option>\n      <option value=\"Australia\" title=\"61\">Australia</option>\n      <option value=\"Austria\" title=\"43\">Austria</option>\n      <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n      <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n      <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n      <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n      <option value=\"Barbados\" title=\"246\">Barbados</option>\n      <option value=\"Belarus\" title=\"375\">Belarus</option>\n      <option value=\"Belgium\" title=\"32\">Belgium</option>\n      <option value=\"Belize\" title=\"501\">Belize</option>\n      <option value=\"Benin\" title=\"229\">Benin</option>\n      <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n      <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n      <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n      <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n      <option value=\"Botswana\" title=\"267\">Botswana</option>\n      <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n      <option value=\"Brazil\" title=\"55\">Brazil</option>\n      <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n      <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n      <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n      <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n      <option value=\"Burundi\" title=\"257\">Burundi</option>\n      <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n      <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n      <option value=\"Canada\" title=\"1\">Canada</option>\n      <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n      <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n      <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n      <option value=\"Chad\" title=\"235\">Chad</option>\n      <option value=\"Chile\" title=\"56\">Chile</option>\n      <option value=\"China\" title=\"86\">China</option>\n      <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n      <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n      <option value=\"Colombia\" title=\"57\">Colombia</option>\n      <option value=\"Comoros\" title=\"269\">Comoros</option>\n      <option value=\"Congo\" title=\"242\">Congo</option>\n      <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n      <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n      <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n      <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n      <option value=\"Croatia\" title=\"285\">Croatia</option>\n      <option value=\"Cuba\" title=\"53\">Cuba</option>\n      <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n      <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n      <option value=\"Denmark\" title=\"45\">Denmark</option>\n      <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n      <option value=\"Dominica\" title=\"767\">Dominica</option>\n      <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n      <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n      <option value=\"Egypt\" title=\"20\">Egypt</option>\n      <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n      <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n      <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n      <option value=\"Estonia\" title=\"372\">Estonia</option>\n      <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n      <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n      <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n      <option value=\"Fiji\" title=\"679\">Fiji</option>\n      <option value=\"Finland\" title=\"358\">Finland</option>\n      <option value=\"France\" title=\"33\">France</option>\n      <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n      <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n      <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n      <option value=\"Gabon\" title=\"241\">Gabon</option>\n      <option value=\"Gambia\" title=\"220\">Gambia</option>\n      <option value=\"Georgia\" title=\"995\">Georgia</option>\n      <option value=\"Germany\" title=\"49\">Germany</option>\n      <option value=\"Ghana\" title=\"233\">Ghana</option>\n      <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n      <option value=\"Greece\" title=\"30\">Greece</option>\n      <option value=\"Greenland\" title=\"299\">Greenland</option>\n      <option value=\"Grenada\" title=\"473\">Grenada</option>\n      <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n      <option value=\"Guam\" title=\"671\">Guam</option>\n      <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n      <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n      <option value=\"Guinea\" title=\"594\">Guinea</option>\n      <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n      <option value=\"Guyana\" title=\"592\">Guyana</option>\n      <option value=\"Haiti\" title=\"509\">Haiti</option>\n      <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n      <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n      <option value=\"Honduras\" title=\"504\">Honduras</option>\n      <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n      <option value=\"Hungary\" title=\"36\">Hungary</option>\n      <option value=\"Iceland\" title=\"354\">Iceland</option>\n      <option value=\"India\" title=\"91\">India</option>\n      <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n      <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n      <option value=\"Iraq\" title=\"964\">Iraq</option>\n      <option value=\"Ireland\" title=\"353\">Ireland</option>\n      <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n      <option value=\"Israel\" title=\"972\">Israel</option>\n      <option value=\"Italy\" title=\"39\">Italy</option>\n      <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n      <option value=\"Japan\" title=\"81\">Japan</option>\n      <option value=\"Jersey\" title=\"44\">Jersey</option>\n      <option value=\"Jordan\" title=\"962\">Jordan</option>\n      <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n      <option value=\"Kenya\" title=\"254\">Kenya</option>\n      <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n      <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n      <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n      <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n      <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n      <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n      <option value=\"Latvia\" title=\"371\">Latvia</option>\n      <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n      <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n      <option value=\"Liberia\" title=\"231\">Liberia</option>\n      <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n      <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n      <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n      <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n      <option value=\"Macao\" title=\"853\">Macao</option>\n      <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n      <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n      <option value=\"Malawi\" title=\"265\">Malawi</option>\n      <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n      <option value=\"Maldives\" title=\"960\">Maldives</option>\n      <option value=\"Mali\" title=\"223\">Mali</option>\n      <option value=\"Malta\" title=\"356\">Malta</option>\n      <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n      <option value=\"Martinique\" title=\"596\">Martinique</option>\n      <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n      <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n      <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n      <option value=\"Mexico\" title=\"52\">Mexico</option>\n      <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n      <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n      <option value=\"Monaco\" title=\"377\">Monaco</option>\n      <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n      <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n      <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n      <option value=\"Morocco\" title=\"212\">Morocco</option>\n      <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n      <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n      <option value=\"Namibia\" title=\"264\">Namibia</option>\n      <option value=\"Nauru\" title=\"674\">Nauru</option>\n      <option value=\"Nepal\" title=\"977\">Nepal</option>\n      <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n      <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n      <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n      <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n      <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n      <option value=\"Niger\" title=\"227\">Niger</option>\n      <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n      <option value=\"Niue\" title=\"683\">Niue</option>\n      <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n      <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n      <option value=\"Norway\" title=\"47\">Norway</option>\n      <option value=\"Oman\" title=\"968\">Oman</option>\n      <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n      <option value=\"Palau\" title=\"680\">Palau</option>\n      <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n      <option value=\"Panama\" title=\"507\">Panama</option>\n      <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n      <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n      <option value=\"Peru\" title=\"51\">Peru</option>\n      <option value=\"Philippines\" title=\"63\">Philippines</option>\n      <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n      <option value=\"Poland\" title=\"48\">Poland</option>\n      <option value=\"Portugal\" title=\"351\">Portugal</option>\n      <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n      <option value=\"Qatar\" title=\"974\">Qatar</option>\n      <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n      <option value=\"Romania\" title=\"40\">Romania</option>\n      <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n      <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n      <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n      <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n      <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n      <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n      <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n      <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n      <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n      <option value=\"Samoa\" title=\"685\">Samoa</option>\n      <option value=\"San Marino\" title=\"378\">San Marino</option>\n      <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n      <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n      <option value=\"Senegal\" title=\"221\">Senegal</option>\n      <option value=\"Serbia\" title=\"381\">Serbia</option>\n      <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n      <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n      <option value=\"Singapore\" title=\"65\">Singapore</option>\n      <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n      <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n      <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n      <option value=\"Somalia\" title=\"252\">Somalia</option>\n      <option value=\"South Africa\" title=\"27\">South Africa</option>\n      <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n      <option value=\"Spain\" title=\"34\">Spain</option>\n      <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n      <option value=\"Sudan\" title=\"249\">Sudan</option>\n      <option value=\"Suriname\" title=\"597\">Suriname</option>\n      <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n      <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n      <option value=\"Sweden\" title=\"46\">Sweden</option>\n      <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n      <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n      <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n      <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n      <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n      <option value=\"Thailand\" title=\"66\">Thailand</option>\n      <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n      <option value=\"Togo\" title=\"228\">Togo</option>\n      <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n      <option value=\"Tonga\" title=\"676\">Tonga</option>\n      <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n      <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n      <option value=\"Turkey\" title=\"90\">Turkey</option>\n      <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n      <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n      <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n      <option value=\"Uganda\" title=\"256\">Uganda</option>\n      <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n      <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n      <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n      <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n      <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n      <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n      <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n      <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n      <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n      <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n      <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n      <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n      <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n      <option value=\"Yemen\" title=\"967\">Yemen</option>\n      <option value=\"Zambia\" title=\"260\">Zambia</option>\n      <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n    </select>\n  </div>\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"phone\">Phone</label>\n      <input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n             data-msg-required=\"Please provide your phone number.\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"zipcode\">Zip</label>\n      <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n             data-msg-required=\"Please provide your zip / postal code.\"\n             data-msg-minlength=\"ZIP code must have at least 5 characters.\">\n    </div>\n  </div>\n  <label for=\"state\">State</label>\n  <div id=\"stateField\">\n      <select id=\"state\" name=\"state\" title=\"State\"\n              data-msg-required=\"Please provide your state.\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\" \" title=\"\">N/A</option>\n        <option value=\"Alabama\" title=\"\">Alabama</option>\n        <option value=\"Alaska\" title=\"\">Alaska</option>\n        <option value=\"Arizona\" title=\"\">Arizona</option>\n        <option value=\"Arkansas\" title=\"\">Arkansas</option>\n        <option value=\"California\" title=\"\">California</option>\n        <option value=\"Colorado\" title=\"\">Colorado</option>\n        <option value=\"Connecticut\" title=\"\">Connecticut</option>\n        <option value=\"Delaware\" title=\"\">Delaware</option>\n        <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n        <option value=\"Florida\" title=\"\">Florida</option>\n        <option value=\"Georgia\" title=\"\">Georgia</option>\n        <option value=\"Hawaii\" title=\"\">Hawaii</option>\n        <option value=\"Idaho\" title=\"\">Idaho</option>\n        <option value=\"Illinois\" title=\"\">Illinois</option>\n        <option value=\"Indiana\" title=\"\">Indiana</option>\n        <option value=\"Iowa\" title=\"\">Iowa</option>\n        <option value=\"Kansas\" title=\"\">Kansas</option>\n        <option value=\"Kentucky\" title=\"\">Kentucky</option>\n        <option value=\"Louisiana\" title=\"\">Louisiana</option>\n        <option value=\"Maine\" title=\"\">Maine</option>\n        <option value=\"Maryland\" title=\"\">Maryland</option>\n        <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n        <option value=\"Michigan\" title=\"\">Michigan</option>\n        <option value=\"Minnesota\" title=\"\">Minnesota</option>\n        <option value=\"Mississippi\" title=\"\">Mississippi</option>\n        <option value=\"Missouri\" title=\"\">Missouri</option>\n        <option value=\"Montana\" title=\"\">Montana</option>\n        <option value=\"Nebraska\" title=\"\">Nebraska</option>\n        <option value=\"Nevada\" title=\"\">Nevada</option>\n        <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n        <option value=\"New Jersey\" title=\"\">New Jersey</option>\n        <option value=\"New Mexico\" title=\"\">New Mexico</option>\n        <option value=\"New York\" title=\"\">New York</option>\n        <option value=\"North Carolina\" title=\"\">North Carolina</option>\n        <option value=\"North Dakota\" title=\"\">North Dakota</option>\n        <option value=\"Ohio\" title=\"\">Ohio</option>\n        <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n        <option value=\"Oregon\" title=\"\">Oregon</option>\n        <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n        <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n        <option value=\"South Carolina\" title=\"\">South Carolina</option>\n        <option value=\"South Dakota\" title=\"\">South Dakota</option>\n        <option value=\"Tennessee\" title=\"\">Tennessee</option>\n        <option value=\"Texas\" title=\"\">Texas</option>\n        <option value=\"Utah\" title=\"\">Utah</option>\n        <option value=\"Vermont\" title=\"\">Vermont</option>\n        <option value=\"Virginia\" title=\"\">Virginia</option>\n        <option value=\"Washington\" title=\"\">Washington</option>\n        <option value=\"West Virginia\" title=\"\">West Virginia</option>\n        <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n        <option value=\"Wyoming\" title=\"\">Wyoming</option>\n      </select>\n  </div>\n  <label for=\"countrycit\">Country of Citizenship</label>\n  <div id=\"countrycitField\">\n    <select id=\"countrycit\"\n      name=\"SFQ-Country_of_Citizenship__c\"\n      required\n      data-msg-required=\"Please select your country of citizenship.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"United States\" title=\"1\">United States</option>\n      <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n      <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n      <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n      <option value=\"Albania \" title=\"355\">Albania </option>\n      <option value=\"Algeria\" title=\"213\">Algeria</option>\n      <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n      <option value=\"Andorra\" title=\"376\">Andorra</option>\n      <option value=\"Angola\" title=\"244\">Angola</option>\n      <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n      <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n      <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n      <option value=\"Argentina\" title=\"54\">Argentina</option>\n      <option value=\"Armenia\" title=\"374\">Armenia</option>\n      <option value=\"Aruba\" title=\"297\">Aruba</option>\n      <option value=\"Australia\" title=\"61\">Australia</option>\n      <option value=\"Austria\" title=\"43\">Austria</option>\n      <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n      <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n      <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n      <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n      <option value=\"Barbados\" title=\"246\">Barbados</option>\n      <option value=\"Belarus\" title=\"375\">Belarus</option>\n      <option value=\"Belgium\" title=\"32\">Belgium</option>\n      <option value=\"Belize\" title=\"501\">Belize</option>\n      <option value=\"Benin\" title=\"229\">Benin</option>\n      <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n      <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n      <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n      <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n      <option value=\"Botswana\" title=\"267\">Botswana</option>\n      <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n      <option value=\"Brazil\" title=\"55\">Brazil</option>\n      <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n      <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n      <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n      <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n      <option value=\"Burundi\" title=\"257\">Burundi</option>\n      <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n      <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n      <option value=\"Canada\" title=\"1\">Canada</option>\n      <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n      <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n      <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n      <option value=\"Chad\" title=\"235\">Chad</option>\n      <option value=\"Chile\" title=\"56\">Chile</option>\n      <option value=\"China\" title=\"86\">China</option>\n      <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n      <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n      <option value=\"Colombia\" title=\"57\">Colombia</option>\n      <option value=\"Comoros\" title=\"269\">Comoros</option>\n      <option value=\"Congo\" title=\"242\">Congo</option>\n      <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n      <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n      <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n      <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n      <option value=\"Croatia\" title=\"285\">Croatia</option>\n      <option value=\"Cuba\" title=\"53\">Cuba</option>\n      <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n      <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n      <option value=\"Denmark\" title=\"45\">Denmark</option>\n      <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n      <option value=\"Dominica\" title=\"767\">Dominica</option>\n      <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n      <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n      <option value=\"Egypt\" title=\"20\">Egypt</option>\n      <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n      <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n      <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n      <option value=\"Estonia\" title=\"372\">Estonia</option>\n      <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n      <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n      <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n      <option value=\"Fiji\" title=\"679\">Fiji</option>\n      <option value=\"Finland\" title=\"358\">Finland</option>\n      <option value=\"France\" title=\"33\">France</option>\n      <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n      <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n      <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n      <option value=\"Gabon\" title=\"241\">Gabon</option>\n      <option value=\"Gambia\" title=\"220\">Gambia</option>\n      <option value=\"Georgia\" title=\"995\">Georgia</option>\n      <option value=\"Germany\" title=\"49\">Germany</option>\n      <option value=\"Ghana\" title=\"233\">Ghana</option>\n      <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n      <option value=\"Greece\" title=\"30\">Greece</option>\n      <option value=\"Greenland\" title=\"299\">Greenland</option>\n      <option value=\"Grenada\" title=\"473\">Grenada</option>\n      <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n      <option value=\"Guam\" title=\"671\">Guam</option>\n      <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n      <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n      <option value=\"Guinea\" title=\"594\">Guinea</option>\n      <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n      <option value=\"Guyana\" title=\"592\">Guyana</option>\n      <option value=\"Haiti\" title=\"509\">Haiti</option>\n      <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n      <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n      <option value=\"Honduras\" title=\"504\">Honduras</option>\n      <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n      <option value=\"Hungary\" title=\"36\">Hungary</option>\n      <option value=\"Iceland\" title=\"354\">Iceland</option>\n      <option value=\"India\" title=\"91\">India</option>\n      <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n      <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n      <option value=\"Iraq\" title=\"964\">Iraq</option>\n      <option value=\"Ireland\" title=\"353\">Ireland</option>\n      <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n      <option value=\"Israel\" title=\"972\">Israel</option>\n      <option value=\"Italy\" title=\"39\">Italy</option>\n      <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n      <option value=\"Japan\" title=\"81\">Japan</option>\n      <option value=\"Jersey\" title=\"44\">Jersey</option>\n      <option value=\"Jordan\" title=\"962\">Jordan</option>\n      <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n      <option value=\"Kenya\" title=\"254\">Kenya</option>\n      <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n      <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n      <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n      <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n      <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n      <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n      <option value=\"Latvia\" title=\"371\">Latvia</option>\n      <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n      <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n      <option value=\"Liberia\" title=\"231\">Liberia</option>\n      <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n      <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n      <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n      <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n      <option value=\"Macao\" title=\"853\">Macao</option>\n      <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n      <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n      <option value=\"Malawi\" title=\"265\">Malawi</option>\n      <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n      <option value=\"Maldives\" title=\"960\">Maldives</option>\n      <option value=\"Mali\" title=\"223\">Mali</option>\n      <option value=\"Malta\" title=\"356\">Malta</option>\n      <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n      <option value=\"Martinique\" title=\"596\">Martinique</option>\n      <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n      <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n      <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n      <option value=\"Mexico\" title=\"52\">Mexico</option>\n      <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n      <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n      <option value=\"Monaco\" title=\"377\">Monaco</option>\n      <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n      <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n      <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n      <option value=\"Morocco\" title=\"212\">Morocco</option>\n      <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n      <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n      <option value=\"Namibia\" title=\"264\">Namibia</option>\n      <option value=\"Nauru\" title=\"674\">Nauru</option>\n      <option value=\"Nepal\" title=\"977\">Nepal</option>\n      <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n      <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n      <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n      <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n      <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n      <option value=\"Niger\" title=\"227\">Niger</option>\n      <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n      <option value=\"Niue\" title=\"683\">Niue</option>\n      <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n      <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n      <option value=\"Norway\" title=\"47\">Norway</option>\n      <option value=\"Oman\" title=\"968\">Oman</option>\n      <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n      <option value=\"Palau\" title=\"680\">Palau</option>\n      <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n      <option value=\"Panama\" title=\"507\">Panama</option>\n      <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n      <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n      <option value=\"Peru\" title=\"51\">Peru</option>\n      <option value=\"Philippines\" title=\"63\">Philippines</option>\n      <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n      <option value=\"Poland\" title=\"48\">Poland</option>\n      <option value=\"Portugal\" title=\"351\">Portugal</option>\n      <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n      <option value=\"Qatar\" title=\"974\">Qatar</option>\n      <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n      <option value=\"Romania\" title=\"40\">Romania</option>\n      <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n      <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n      <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n      <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n      <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n      <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n      <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n      <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n      <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n      <option value=\"Samoa\" title=\"685\">Samoa</option>\n      <option value=\"San Marino\" title=\"378\">San Marino</option>\n      <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n      <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n      <option value=\"Senegal\" title=\"221\">Senegal</option>\n      <option value=\"Serbia\" title=\"381\">Serbia</option>\n      <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n      <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n      <option value=\"Singapore\" title=\"65\">Singapore</option>\n      <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n      <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n      <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n      <option value=\"Somalia\" title=\"252\">Somalia</option>\n      <option value=\"South Africa\" title=\"27\">South Africa</option>\n      <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n      <option value=\"Spain\" title=\"34\">Spain</option>\n      <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n      <option value=\"Sudan\" title=\"249\">Sudan</option>\n      <option value=\"Suriname\" title=\"597\">Suriname</option>\n      <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n      <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n      <option value=\"Sweden\" title=\"46\">Sweden</option>\n      <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n      <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n      <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n      <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n      <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n      <option value=\"Thailand\" title=\"66\">Thailand</option>\n      <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n      <option value=\"Togo\" title=\"228\">Togo</option>\n      <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n      <option value=\"Tonga\" title=\"676\">Tonga</option>\n      <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n      <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n      <option value=\"Turkey\" title=\"90\">Turkey</option>\n      <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n      <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n      <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n      <option value=\"Uganda\" title=\"256\">Uganda</option>\n      <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n      <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n      <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n      <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n      <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n      <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n      <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n      <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n      <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n      <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n      <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n      <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n      <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n      <option value=\"Yemen\" title=\"967\">Yemen</option>\n      <option value=\"Zambia\" title=\"260\">Zambia</option>\n      <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n    </select>\n  </div>\n  <div id=\"optInWrapper\" class=\"\">\n    <label for=\"partner\" class=\"checkbox\">\n      MBA@Syracuse's technology partner works with an additional university to offer an online MBA program.\n    </label>\n    <div id=\"partnerField\" class=\"checkboxes\">\n      <input id=\"partnerOptIn\" type=\"checkbox\" value=\"SYR-MBA Marketing\" name=\"SFQ-Lead_Share_Opt_In__c\" checked>\n      <label for=\"partnerOptIn\">\nYes, I would like to learn more about this additional online graduate business program.\n      </label>\n      <br>\n    </div>\n  </div>\n  <input type=\"hidden\" id=\"country_code\" name=\"country_code\", value=\"\">\n</div>";

  LeadForm.Programs['ucb-mids.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"10\" >\n<label for=\"describes\">Why are you interested in earning your degree?</label>\n<div id=\"describesField\">\n    <select id=\"describes\"\n            name=\"SFQ-Why_Are_You_Interested_In_Earning_a_MIDS__c\"\n            title=\"Why are you interested in earning your degree?\" \n            class=\"field-0 valid\" \n            required\n            data-msg-required=\"Please select why are you interested in earning your degree.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Advance my career\" title=\"\">Advance my career</option>\n      <option value=\"Switch to a new career\" title=\"\">Switch to a new career</option>\n      <option value=\"Develop my professional skills\" title=\"\">Develop my professional skills</option>\n    </select>\n</div>\n</div><!-- step1 -->\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"30\" >\n<label for=\"education\">What is your highest level of education?</label>\n<div id=\"educationField\">\n    <select id=\"education\"\n            name=\"SFQ-Level_of_Education__c\"\n            title=\"What is your highest level of education?\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please select your highest level of education.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"High School\" title=\"\">High School</option>\n      <option value=\"Associate&rsquo;s Degree\" title=\"\">Associate&rsquo;s Degree</option>\n      <option value=\"Bachelor&rsquo;s in progress\" title=\"\">Bachelor&rsquo;s in progress</option>\n      <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n      <option value=\"Master&rsquo;s in progress\" title=\"\">Master&rsquo;s in progress</option>\n      <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n      <option value=\"Doctorate in progress\" title=\"\">Doctorate in progress</option>\n      <option value=\"Doctorate\" title=\"\">Doctorate</option>\n      <option value=\"Professional Degree\" title=\"\">Professional Degree</option>\n    </select>\n</div>\n<label for=\"gpaRange\">What was your undergraduate <abbr title='Grade Point Average'>GPA</abbr>?</label>\n<div id=\"gpaRangeField\">\n    <select id=\"gpaRange\"\n            name=\"SFQ-Stated_GPA_Range__c\"\n            title=\"What was your undergraduate GPA?\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please select your GPA.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n\n      <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n\n      <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n\n      <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n\n      <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n\n      <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n    </select>\n</div>\n<label for=\"takengre\">Have you taken the GRE or GMAT?</label>\n<div id=\"takengreField\">\n    <select id=\"takengre\"\n            name=\"SFQ-GRE_GMAT_Taken__c\"\n            title=\"Have you taken the GRE or GMAT?\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please select whether or not you have taken the GRE or GMAT.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"GRE\" title=\"\">GRE</option>\n\n      <option value=\"GMAT\" title=\"\">GMAT</option>\n\n      <option value=\"Registered for GMAT, but have not taken\" title=\"\">Registered for GMAT, but have not taken</option>\n\n      <option value=\"Registered for GRE, but have not taken\" title=\"\">Registered for GRE, but have not taken</option>\n\n      <option value=\"Both\" title=\"\">Both</option>\n\n      <option value=\"Neither\" title=\"\">Neither</option>\n    </select>\n</div>\n</div><!-- step2 -->\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"first_name\">First Name</label>\n    <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your first name.\" />\n  </div>\n  <div class=\"span3\">\n    <label for=\"last_name\">Last Name</label>\n    <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your last name.\" />\n  </div>\n</div><!-- end of name fields -->\n\n<label for=\"email\">Email</label>\n<input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n data-msg-required=\"Please provide your email address.\" />\n\n<label for=\"country_code\">Country of Residence</label>\n<div id=\"countryField\">\n    <select id=\"country_code\" \n            name=\"country_code\"\n            title=\"Country\"\n            required\n            data-msg-required=\"Please provide your country of residence.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"1\">United States (+1)</option>\n      <option value=\"93\">Afghanistan (+93)</option>\n      <option value=\"358\">&#x00C5;land Islands (+358)</option>\n      <option value=\"357\">Akrotiri and Dhekelia (+357)</option>\n      <option value=\"355\">Albania  (+355)</option>\n      <option value=\"213\">Algeria (+213)</option>\n      <option value=\"1 684\">American Samoa (+1 684)</option>\n      <option value=\"376\">Andorra (+376)</option>\n      <option value=\"244\">Angola (+244)</option>\n      <option value=\"264\">Anguilla (+264)</option>\n      <option value=\"672\">Antarctica (+672)</option>\n      <option value=\"268\">Antigua and Barbuda (+268)</option>\n      <option value=\"54\">Argentina (+54)</option>\n      <option value=\"374\">Armenia (+374)</option>\n      <option value=\"297\">Aruba (+297)</option>\n      <option value=\"61\">Australia (+61)</option>\n      <option value=\"43\">Austria (+43)</option>\n      <option value=\"994\">Azerbaijan  (+994)</option>\n      <option value=\"242\">Bahamas (+242)</option>\n      <option value=\"973\">Bahrain (+973)</option>\n      <option value=\"880\">Bangladesh (+880)</option>\n      <option value=\"246\">Barbados (+246)</option>\n      <option value=\"375\">Belarus (+375)</option>\n      <option value=\"32\">Belgium (+32)</option>\n      <option value=\"501\">Belize (+501)</option>\n      <option value=\"229\">Benin (+229)</option>\n      <option value=\"441\">Bermuda (+441)</option>\n      <option value=\"975\">Bhutan (+975)</option>\n      <option value=\"591\">Bolivia, Plurinational State of (+591)</option>\n      <option value=\"387\">Bosnia and Herzegovina (+387)</option>\n      <option value=\"267\">Botswana (+267)</option>\n      <option value=\"55\">Brazil (+55)</option>\n      <option value=\"246\">British Indian Ocean Territory (+246)</option>\n      <option value=\"673\">Brunei Darussalam (+673)</option>\n      <option value=\"359\">Bulgaria (+359)</option>\n      <option value=\"226\">Burkina Faso (+226)</option>\n      <option value=\"257\">Burundi (+257)</option>\n      <option value=\"855\">Cambodia (+855)</option>\n      <option value=\"237\">Cameroon (+237)</option>\n      <option value=\"1\">Canada (+1)</option>\n      <option value=\"238\">Cape Verde (+238)</option>\n      <option value=\"345\">Cayman Islands (+345)</option>\n      <option value=\"236\">Central African Republic (+236)</option>\n      <option value=\"235\">Chad (+235)</option>\n      <option value=\"56\">Chile (+56)</option>\n      <option value=\"86\">China (+86)</option>\n      <option value=\"61\">Christmas Island (+61)</option>\n      <option value=\"61\">Cocos (+Keeling) Islands (+61)</option>\n      <option value=\"57\">Colombia (+57)</option>\n      <option value=\"269\">Comoros (+269)</option>\n      <option value=\"242\">Congo, Democratic Republic of the (+242)</option>\n      <option value=\"682\">Cook Islands (+682)</option>\n      <option value=\"506\">Costa Rica (+506)</option>\n      <option value=\"225\">C&#x00F4;te D'Ivoire (+225)</option>\n      <option value=\"285\">Croatia (+285)</option>\n      <option value=\"53\">Cuba (+53)</option>\n      <option value=\"357\">Cyprus (+357)</option>\n      <option value=\"420\">Czech Republic (+420)</option>\n      <option value=\"45\">Denmark (+45)</option>\n      <option value=\"253\">Djibouti (+253)</option>\n      <option value=\"767\">Dominica (+767)</option>\n      <option value=\"809\">Dominican Republic (+809)</option>\n      <option value=\"593\">Ecuador (+593)</option>\n      <option value=\"20\">Egypt (+20)</option>\n      <option value=\"503\">El Salvador (+503)</option>\n      <option value=\"240\">Equatorial Guinea (+240)</option>\n      <option value=\"291\">Eritrea (+291)</option>\n      <option value=\"372\">Estonia (+372)</option>\n      <option value=\"251\">Ethiopia (+251)</option>\n      <option value=\"500\">Falkland Islands (+Malvinas) (+500)</option>\n      <option value=\"298\">Faroe Islands (+298)</option>\n      <option value=\"679\">Fiji (+679)</option>\n      <option value=\"358\">Finland (+358)</option>\n      <option value=\"33\">France (+33)</option>\n      <option value=\"594\">French Guiana (+594)</option>\n      <option value=\"689\">French Polynesia (+689)</option>\n      <option value=\"689\">French Southern Territories (+689)</option>\n      <option value=\"241\">Gabon (+241)</option>\n      <option value=\"220\">Gambia (+220)</option>\n      <option value=\"995\">Georgia (+995)</option>\n      <option value=\"49\">Germany (+49)</option>\n      <option value=\"233\">Ghana (+233)</option>\n      <option value=\"350\">Gibraltar (+350)</option>\n      <option value=\"30\">Greece (+30)</option>\n      <option value=\"299\">Greenland (+299)</option>\n      <option value=\"473\">Grenada (+473)</option>\n      <option value=\"590\">Guadeloupe (+590)</option>\n      <option value=\"671\">Guam (+671)</option>\n      <option value=\"502\">Guatemala (+502)</option>\n      <option value=\"44\">Guernsey (+44)</option>\n      <option value=\"594\">Guinea (+594)</option>\n      <option value=\"245\">Guinea-bissau (+245)</option>\n      <option value=\"592\">Guyana (+592)</option>\n      <option value=\"509\">Haiti (+509)</option>\n      <option value=\"672\">Heard Island and Mcdonald Islands (+672)</option>\n      <option value=\"39\">Holy See (+Vatican City State) (+39)</option>\n      <option value=\"504\">Honduras (+504)</option>\n      <option value=\"852\">Hong Kong (+852)</option>\n      <option value=\"36\">Hungary (+36)</option>\n      <option value=\"354\">Iceland (+354)</option>\n      <option value=\"91\">India (+91)</option>\n      <option value=\"62\">Indonesia (+62)</option>\n      <option value=\"98\">Iran, Islamic Republic of (+98)</option>\n      <option value=\"44\">Isle of Man (+44)</option>\n      <option value=\"964\">Iraq (+964)</option>\n      <option value=\"353\">Ireland (+353)</option>\n      <option value=\"972\">Israel (+972)</option>\n      <option value=\"39\">Italy (+39)</option>\n      <option value=\"876\">Jamaica (+876)</option>\n      <option value=\"81\">Japan (+81)</option>\n      <option value=\"44\">Jersey (+44)</option>\n      <option value=\"962\">Jordan (+962)</option>\n      <option value=\"7\">Kazakhstan (+7)</option>\n      <option value=\"254\">Kenya (+254)</option>\n      <option value=\"686\">Kiribati (+686)</option>\n      <option value=\"850\">Korea, Democratic People's Republic of (+850)</option>\n      <option value=\"82\">Korea, Republic of (+82)</option>\n      <option value=\"965\">Kuwait (+965)</option>\n      <option value=\"996\">Kyrgyzstan (+996)</option>\n      <option value=\"856\">Lao People's Democratic Republic (+856)</option>\n      <option value=\"371\">Latvia (+371)</option>\n      <option value=\"961\">Lebanon (+961)</option>\n      <option value=\"266\">Lesotho (+266)</option>\n      <option value=\"231\">Liberia (+231)</option>\n      <option value=\"218\">Libyan Arab Jamahiriya (+218)</option>\n      <option value=\"423\">Liechtenstein (+423)</option>\n      <option value=\"370\">Lithuania (+370)</option>\n      <option value=\"352\">Luxembourg (+352)</option>\n      <option value=\"853\">Macao (+853)</option>\n      <option value=\"389\">Macedonia, The Former Yugoslav Republic of (+389)</option>\n      <option value=\"261\">Madagascar (+261)</option>\n      <option value=\"265\">Malawi (+265)</option>\n      <option value=\"60\">Malaysia (+60)</option>\n      <option value=\"960\">Maldives (+960)</option>\n      <option value=\"223\">Mali (+223)</option>\n      <option value=\"356\">Malta (+356)</option>\n      <option value=\"692\">Marshall Islands (+692)</option>\n      <option value=\"596\">Martinique (+596)</option>\n      <option value=\"222\">Mauritania (+222)</option>\n      <option value=\"230\">Mauritius (+230)</option>\n      <option value=\"269\">Mayotte (+269)</option>\n      <option value=\"52\">Mexico (+52)</option>\n      <option value=\"691\">Micronesia, Federated States of (+691)</option>\n      <option value=\"373\">Moldova, Republic of (+373)</option>\n      <option value=\"377\">Monaco (+377)</option>\n      <option value=\"976\">Mongolia (+976)</option>\n      <option value=\"382\">Montenegro (+382)</option>\n      <option value=\"664\">Montserrat (+664)</option>\n      <option value=\"212\">Morocco (+212)</option>\n      <option value=\"258\">Mozambique (+258)</option>\n      <option value=\"95\">Myanmar (+95)</option>\n      <option value=\"264\">Namibia (+264)</option>\n      <option value=\"674\">Nauru (+674)</option>\n      <option value=\"977\">Nepal (+977)</option>\n      <option value=\"31\">Netherlands (+31)</option>\n      <option value=\"599\">Netherlands Antilles (+599)</option>\n      <option value=\"687\">New Caledonia (+687)</option>\n      <option value=\"64\">New Zealand (+64)</option>\n      <option value=\"505\">Nicaragua (+505)</option>\n      <option value=\"227\">Niger (+227)</option>\n      <option value=\"234\">Nigeria (+234)</option>\n      <option value=\"683\">Niue (+683)</option>\n      <option value=\"672\">Norfolk Island (+672)</option>\n      <option value=\"1 670\">Northern Mariana Islands (+1 670)</option>\n      <option value=\"47\">Norway (+47)</option>\n      <option value=\"968\">Oman (+968)</option>\n      <option value=\"92\">Pakistan (+92)</option>\n      <option value=\"680\">Palau (+680)</option>\n      <option value=\"970\">Palestinian Territory, Occupied (+970)</option>\n      <option value=\"507\">Panama (+507)</option>\n      <option value=\"675\">Papua New Guinea (+675)</option>\n      <option value=\"595\">Paraguay (+595)</option>\n      <option value=\"51\">Peru (+51)</option>\n      <option value=\"63\">Philippines (+63)</option>\n      <option value=\"64\">Pitcairn (+64)</option>\n      <option value=\"48\">Poland (+48)</option>\n      <option value=\"351\">Portugal (+351)</option>\n      <option value=\"787\">Puerto Rico (+787)</option>\n      <option value=\"974\">Qatar (+974)</option>\n      <option value=\"262\">R&#x00E9;union (+262)</option>\n      <option value=\"40\">Romania (+40)</option>\n      <option value=\"7\">Russian Federation (+7)</option>\n      <option value=\"250\">Rwanda (+250)</option>\n      <option value=\"590\">Saint Barth&#x00E9;lemy (+590)</option>\n      <option value=\"290\">Saint Helena, Ascension and Tristan Da Cunha (+290)</option>\n      <option value=\"869\">Saint Kitts and Nevis (+869)</option>\n      <option value=\"758\">Saint Lucia (+758)</option>\n      <option value=\"1 599\">Saint Martin (+1 599)</option>\n      <option value=\"508\">Saint Pierre and Miquelon (+508)</option>\n      <option value=\"784\">Saint Vincent and The Grenadines (+784)</option>\n      <option value=\"685\">Samoa (+685)</option>\n      <option value=\"378\">San Marino (+378)</option>\n      <option value=\"239\">Sao Tome and Principe (+239)</option>\n      <option value=\"966\">Saudi Arabia (+966)</option>\n      <option value=\"221\">Senegal (+221)</option>\n      <option value=\"381\">Serbia (+381)</option>\n      <option value=\"248\">Seychelles (+248)</option>\n      <option value=\"232\">Sierra Leone (+232)</option>\n      <option value=\"65\">Singapore (+65)</option>\n      <option value=\"421\">Slovakia (+421)</option>\n      <option value=\"386\">Slovenia (+386)</option>\n      <option value=\"677\">Solomon Islands (+677)</option>\n      <option value=\"252\">Somalia (+252)</option>\n      <option value=\"27\">South Africa (+27)</option>\n      <option value=\"500\">South Georgia and The South Sandwich Islands (+500)</option>\n      <option value=\"34\">Spain (+34)</option>\n      <option value=\"94\">Sri Lanka (+94)</option>\n      <option value=\"249\">Sudan (+249)</option>\n      <option value=\"597\">Suriname (+597)</option>\n      <option value=\"47\">Svalbard and Jan Mayen (+47)</option>\n      <option value=\"268\">Swaziland (+268)</option>\n      <option value=\"46\">Sweden (+46)</option>\n      <option value=\"41\">Switzerland (+41)</option>\n      <option value=\"963\">Syrian Arab Republic (+963)</option>\n      <option value=\"886\">Taiwan (+886)</option>\n      <option value=\"992\">Tajikistan (+992)</option>\n      <option value=\"255\">Tanzania, United Republic of (+255)</option>\n      <option value=\"66\">Thailand (+66)</option>\n      <option value=\"670\">Timor-leste (+670)</option>\n      <option value=\"228\">Togo (+228)</option>\n      <option value=\"690\">Tokelau (+690)</option>\n      <option value=\"676\">Tonga (+676)</option>\n      <option value=\"868\">Trinidad and Tobago (+868)</option>\n      <option value=\"216\">Tunisia (+216)</option>\n      <option value=\"90\">Turkey (+90)</option>\n      <option value=\"993\">Turkmenistan (+993)</option>\n      <option value=\"649\">Turks and Caicos Islands (+649)</option>\n      <option value=\"688\">Tuvalu (+688)</option>\n      <option value=\"256\">Uganda (+256)</option>\n      <option value=\"380\">Ukraine (+380)</option>\n      <option value=\"971\">United Arab Emirates (+971)</option>\n      <option value=\"44\">United Kingdom (+44)</option>\n      <option value=\"1\">United States Minor Outlying Islands (+1)</option>\n      <option value=\"598\">Uruguay (+598)</option>\n      <option value=\"998\">Uzbekistan (+998)</option>\n      <option value=\"678\">Vanuatu (+678)</option>\n      <option value=\"58\">Venezuela, Bolivarian Republic of (+58)</option>\n      <option value=\"84\">Viet Nam (+84)</option>\n      <option value=\"284\">Virgin Islands, British (+284)</option>\n      <option value=\"340\">Virgin Islands, U.S. (+340)</option>\n      <option value=\"681\">Wallis and Futuna (+681)</option>\n      <option value=\"212\">Western Sahara (+212)</option>\n      <option value=\"967\">Yemen (+967)</option>\n      <option value=\"260\">Zambia (+260)</option>\n      <option value=\"263\">Zimbabwe (+263)</option>\n    </select>\n    <input type=\"hidden\" id=\"country_name\" name=\"country\" value=\"\">\n</div>\n\n<label for=\"phone\">Phone</label>\n<input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n       data-msg-required=\"Please provide your phone number.\">\n\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"zipcode\">ZIP / Postal Code</label>\n    <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n           data-msg-required=\"Please provide your ZIP / postal code.\"\n           data-msg-minlength=\"ZIP code must have at least 5 characters.\">\n  </div>\n  <div class=\"span3\">\n      <label for=\"state\">State</label>\n      <div id=\"stateField\">\n            <select id=\"state\" name=\"state\" title=\"State\"\n                    data-msg-required=\"Please provide your state.\">\n              <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n              <option value=\" \" title=\"\">N/A</option>\n              <option value=\"Alabama\" title=\"\">Alabama</option>\n              <option value=\"Alaska\" title=\"\">Alaska</option>\n              <option value=\"Arizona\" title=\"\">Arizona</option>\n              <option value=\"Arkansas\" title=\"\">Arkansas</option>\n              <option value=\"California\" title=\"\">California</option>\n              <option value=\"Colorado\" title=\"\">Colorado</option>\n              <option value=\"Connecticut\" title=\"\">Connecticut</option>\n              <option value=\"Delaware\" title=\"\">Delaware</option>\n              <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n              <option value=\"Florida\" title=\"\">Florida</option>\n              <option value=\"Georgia\" title=\"\">Georgia</option>\n              <option value=\"Hawaii\" title=\"\">Hawaii</option>\n              <option value=\"Idaho\" title=\"\">Idaho</option>\n              <option value=\"Illinois\" title=\"\">Illinois</option>\n              <option value=\"Indiana\" title=\"\">Indiana</option>\n              <option value=\"Iowa\" title=\"\">Iowa</option>\n              <option value=\"Kansas\" title=\"\">Kansas</option>\n              <option value=\"Kentucky\" title=\"\">Kentucky</option>\n              <option value=\"Louisiana\" title=\"\">Louisiana</option>\n              <option value=\"Maine\" title=\"\">Maine</option>\n              <option value=\"Maryland\" title=\"\">Maryland</option>\n              <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n              <option value=\"Michigan\" title=\"\">Michigan</option>\n              <option value=\"Minnesota\" title=\"\">Minnesota</option>\n              <option value=\"Mississippi\" title=\"\">Mississippi</option>\n              <option value=\"Missouri\" title=\"\">Missouri</option>\n              <option value=\"Montana\" title=\"\">Montana</option>\n              <option value=\"Nebraska\" title=\"\">Nebraska</option>\n              <option value=\"Nevada\" title=\"\">Nevada</option>\n              <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n              <option value=\"New Jersey\" title=\"\">New Jersey</option>\n              <option value=\"New Mexico\" title=\"\">New Mexico</option>\n              <option value=\"New York\" title=\"\">New York</option>\n              <option value=\"North Carolina\" title=\"\">North Carolina</option>\n              <option value=\"North Dakota\" title=\"\">North Dakota</option>\n              <option value=\"Ohio\" title=\"\">Ohio</option>\n              <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n              <option value=\"Oregon\" title=\"\">Oregon</option>\n              <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n              <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n              <option value=\"South Carolina\" title=\"\">South Carolina</option>\n              <option value=\"South Dakota\" title=\"\">South Dakota</option>\n              <option value=\"Tennessee\" title=\"\">Tennessee</option>\n              <option value=\"Texas\" title=\"\">Texas</option>\n              <option value=\"Utah\" title=\"\">Utah</option>\n              <option value=\"Vermont\" title=\"\">Vermont</option>\n              <option value=\"Virginia\" title=\"\">Virginia</option>\n              <option value=\"Washington\" title=\"\">Washington</option>\n              <option value=\"West Virginia\" title=\"\">West Virginia</option>\n              <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n              <option value=\"Wyoming\" title=\"\">Wyoming</option>\n            </select>\n      </div>\n  </div>\n</div>\n<label for=\"countrycit\">Country of Citizenship</label>\n<div id=\"countrycitField\">\n  <select id=\"countrycit\"\n      name=\"SFQ-Country_of_Citizenship__c\"\n      required\n      data-msg-required=\"Please select your country of citizenship.\">\n    <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n    <option value=\"United States\" title=\"1\">United States</option>\n    <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n    <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n    <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n    <option value=\"Albania \" title=\"355\">Albania </option>\n    <option value=\"Algeria\" title=\"213\">Algeria</option>\n    <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n    <option value=\"Andorra\" title=\"376\">Andorra</option>\n    <option value=\"Angola\" title=\"244\">Angola</option>\n    <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n    <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n    <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n    <option value=\"Argentina\" title=\"54\">Argentina</option>\n    <option value=\"Armenia\" title=\"374\">Armenia</option>\n    <option value=\"Aruba\" title=\"297\">Aruba</option>\n    <option value=\"Australia\" title=\"61\">Australia</option>\n    <option value=\"Austria\" title=\"43\">Austria</option>\n    <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n    <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n    <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n    <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n    <option value=\"Barbados\" title=\"246\">Barbados</option>\n    <option value=\"Belarus\" title=\"375\">Belarus</option>\n    <option value=\"Belgium\" title=\"32\">Belgium</option>\n    <option value=\"Belize\" title=\"501\">Belize</option>\n    <option value=\"Benin\" title=\"229\">Benin</option>\n    <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n    <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n    <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n    <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n    <option value=\"Botswana\" title=\"267\">Botswana</option>\n    <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n    <option value=\"Brazil\" title=\"55\">Brazil</option>\n    <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n    <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n    <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n    <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n    <option value=\"Burundi\" title=\"257\">Burundi</option>\n    <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n    <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n    <option value=\"Canada\" title=\"1\">Canada</option>\n    <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n    <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n    <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n    <option value=\"Chad\" title=\"235\">Chad</option>\n    <option value=\"Chile\" title=\"56\">Chile</option>\n    <option value=\"China\" title=\"86\">China</option>\n    <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n    <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n    <option value=\"Colombia\" title=\"57\">Colombia</option>\n    <option value=\"Comoros\" title=\"269\">Comoros</option>\n    <option value=\"Congo\" title=\"242\">Congo</option>\n    <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n    <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n    <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n    <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n    <option value=\"Croatia\" title=\"285\">Croatia</option>\n    <option value=\"Cuba\" title=\"53\">Cuba</option>\n    <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n    <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n    <option value=\"Denmark\" title=\"45\">Denmark</option>\n    <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n    <option value=\"Dominica\" title=\"767\">Dominica</option>\n    <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n    <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n    <option value=\"Egypt\" title=\"20\">Egypt</option>\n    <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n    <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n    <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n    <option value=\"Estonia\" title=\"372\">Estonia</option>\n    <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n    <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n    <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n    <option value=\"Fiji\" title=\"679\">Fiji</option>\n    <option value=\"Finland\" title=\"358\">Finland</option>\n    <option value=\"France\" title=\"33\">France</option>\n    <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n    <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n    <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n    <option value=\"Gabon\" title=\"241\">Gabon</option>\n    <option value=\"Gambia\" title=\"220\">Gambia</option>\n    <option value=\"Georgia\" title=\"995\">Georgia</option>\n    <option value=\"Germany\" title=\"49\">Germany</option>\n    <option value=\"Ghana\" title=\"233\">Ghana</option>\n    <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n    <option value=\"Greece\" title=\"30\">Greece</option>\n    <option value=\"Greenland\" title=\"299\">Greenland</option>\n    <option value=\"Grenada\" title=\"473\">Grenada</option>\n    <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n    <option value=\"Guam\" title=\"671\">Guam</option>\n    <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n    <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n    <option value=\"Guinea\" title=\"594\">Guinea</option>\n    <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n    <option value=\"Guyana\" title=\"592\">Guyana</option>\n    <option value=\"Haiti\" title=\"509\">Haiti</option>\n    <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n    <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n    <option value=\"Honduras\" title=\"504\">Honduras</option>\n    <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n    <option value=\"Hungary\" title=\"36\">Hungary</option>\n    <option value=\"Iceland\" title=\"354\">Iceland</option>\n    <option value=\"India\" title=\"91\">India</option>\n    <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n    <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n    <option value=\"Iraq\" title=\"964\">Iraq</option>\n    <option value=\"Ireland\" title=\"353\">Ireland</option>\n    <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n    <option value=\"Israel\" title=\"972\">Israel</option>\n    <option value=\"Italy\" title=\"39\">Italy</option>\n    <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n    <option value=\"Japan\" title=\"81\">Japan</option>\n    <option value=\"Jersey\" title=\"44\">Jersey</option>\n    <option value=\"Jordan\" title=\"962\">Jordan</option>\n    <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n    <option value=\"Kenya\" title=\"254\">Kenya</option>\n    <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n    <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n    <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n    <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n    <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n    <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n    <option value=\"Latvia\" title=\"371\">Latvia</option>\n    <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n    <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n    <option value=\"Liberia\" title=\"231\">Liberia</option>\n    <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n    <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n    <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n    <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n    <option value=\"Macao\" title=\"853\">Macao</option>\n    <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n    <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n    <option value=\"Malawi\" title=\"265\">Malawi</option>\n    <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n    <option value=\"Maldives\" title=\"960\">Maldives</option>\n    <option value=\"Mali\" title=\"223\">Mali</option>\n    <option value=\"Malta\" title=\"356\">Malta</option>\n    <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n    <option value=\"Martinique\" title=\"596\">Martinique</option>\n    <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n    <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n    <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n    <option value=\"Mexico\" title=\"52\">Mexico</option>\n    <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n    <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n    <option value=\"Monaco\" title=\"377\">Monaco</option>\n    <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n    <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n    <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n    <option value=\"Morocco\" title=\"212\">Morocco</option>\n    <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n    <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n    <option value=\"Namibia\" title=\"264\">Namibia</option>\n    <option value=\"Nauru\" title=\"674\">Nauru</option>\n    <option value=\"Nepal\" title=\"977\">Nepal</option>\n    <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n    <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n    <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n    <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n    <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n    <option value=\"Niger\" title=\"227\">Niger</option>\n    <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n    <option value=\"Niue\" title=\"683\">Niue</option>\n    <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n    <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n    <option value=\"Norway\" title=\"47\">Norway</option>\n    <option value=\"Oman\" title=\"968\">Oman</option>\n    <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n    <option value=\"Palau\" title=\"680\">Palau</option>\n    <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n    <option value=\"Panama\" title=\"507\">Panama</option>\n    <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n    <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n    <option value=\"Peru\" title=\"51\">Peru</option>\n    <option value=\"Philippines\" title=\"63\">Philippines</option>\n    <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n    <option value=\"Poland\" title=\"48\">Poland</option>\n    <option value=\"Portugal\" title=\"351\">Portugal</option>\n    <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n    <option value=\"Qatar\" title=\"974\">Qatar</option>\n    <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n    <option value=\"Romania\" title=\"40\">Romania</option>\n    <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n    <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n    <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n    <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n    <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n    <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n    <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n    <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n    <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n    <option value=\"Samoa\" title=\"685\">Samoa</option>\n    <option value=\"San Marino\" title=\"378\">San Marino</option>\n    <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n    <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n    <option value=\"Senegal\" title=\"221\">Senegal</option>\n    <option value=\"Serbia\" title=\"381\">Serbia</option>\n    <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n    <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n    <option value=\"Singapore\" title=\"65\">Singapore</option>\n    <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n    <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n    <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n    <option value=\"Somalia\" title=\"252\">Somalia</option>\n    <option value=\"South Africa\" title=\"27\">South Africa</option>\n    <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n    <option value=\"Spain\" title=\"34\">Spain</option>\n    <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n    <option value=\"Sudan\" title=\"249\">Sudan</option>\n    <option value=\"Suriname\" title=\"597\">Suriname</option>\n    <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n    <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n    <option value=\"Sweden\" title=\"46\">Sweden</option>\n    <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n    <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n    <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n    <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n    <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n    <option value=\"Thailand\" title=\"66\">Thailand</option>\n    <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n    <option value=\"Togo\" title=\"228\">Togo</option>\n    <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n    <option value=\"Tonga\" title=\"676\">Tonga</option>\n    <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n    <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n    <option value=\"Turkey\" title=\"90\">Turkey</option>\n    <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n    <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n    <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n    <option value=\"Uganda\" title=\"256\">Uganda</option>\n    <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n    <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n    <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n    <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n    <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n    <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n    <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n    <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n    <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n    <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n    <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n    <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n    <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n    <option value=\"Yemen\" title=\"967\">Yemen</option>\n    <option value=\"Zambia\" title=\"260\">Zambia</option>\n    <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n  </select>\n</div>\n<label for=\"partner\" class=\"checkbox\">\n  datascience@berkeley&apos;s technology service provider works with\n  a different university to offer an online data science program\n  that is unaffiliated with the University of California.\n</label>\n<div id=\"partnerField\" class=\"checkboxes\">\n  <input id=\"partnerOptIn\" type=\"checkbox\" \n	   value=\"UCB-MIDS Marketing\" \n	   name=\"SFQ-Lead_Share_Opt_In__c\" checked>\n  <label for=\"partnerOptIn\">\n    Yes, I would like to learn more about this other online graduate\n    data science opportunity.\n  </label>\n</div>\n</div>";

  LeadForm.Programs['unc-mpa.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"10\" >\n  <label for=\"interested\">Why are you interested in earning an MPA?</label>\n  <div id=\"interestedField\">\n      <select id=\"interested\"\n              name=\"SFQ-Why_are_you_interested_in_earning_an_MPA__c\" \n      title=\"Why are you interested in earning an MPA?\" class=\"field-0 valid\" required\n              data-msg-required=\"Please answer the above question\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"Advance my career\" title=\"\">Advance my career</option>\n        <option value=\"Switch to a new career\" title=\"\">Switch to a new career</option>\n        <option value=\"Develop my professional skills\" title=\"\">Develop my professional skills</option>\n        <option value=\"Personal fulfillment\" title=\"\">Personal fulfillment</option>\n      </select>\n  </div>\n</div><!-- step1 -->\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"30\" >\n  <label for=\"experience\">How many years of work experience?</label>\n  <div id=\"experienceField\">\n      <select id=\"experience\"\n              name=\"SFQ-How_many_years_of_work_experience__c\" \n      title=\"How many years of work experience?\" class=\"valid\" required\n              data-msg-required=\"Please answer the above question\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"less than 2\" title=\"\">less than 2</option>\n        <option value=\"2-4\" title=\"\">2-4</option>\n        <option value=\"5-7\" title=\"\">5-7</option>\n        <option value=\"8-10\" title=\"\">8-10</option>\n        <option value=\"10 or more\" title=\"\">10 or more</option>\n      </select>\n  </div>\n  <label for=\"education\">Highest level of education completed?</label>\n  <div id=\"educationField\">\n      <select id=\"education\"\n              name=\"SFQ-Highest_level_of_education_completed__c\" \n      title=\"Highest level of education completed?\" class=\"valid\" required\n              data-msg-required=\"Highest level of education is required\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"High School\" title=\"\">High School</option>\n        <option value=\"Associate&rsquo;s\" title=\"\">Associate&rsquo;s</option>\n        <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n        <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n        <option value=\"Doctorate\" title=\"\">Doctorate</option>\n      </select>\n  </div>\n  <label for=\"gpaRange\">What was your undergraduate <abbr title='Grade Point Average'>GPA</abbr>?</label>\n  <div id=\"gpaRangeField\">\n      <select id=\"gpaRange\" name=\"SFQ-Undergraduate_GPA_range__c\" \n      title=\"What was your undergraduate GPA?\" class=\"valid\" required\n              data-msg-required=\"GPA range is required\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n        <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n        <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n        <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n        <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n      </select>\n  </div>\n  <label for=\"takengre\">Have you taken the GRE or GMAT?</label>\n  <div id=\"takengreField\">\n      <select id=\"takengre\"\n      name=\"SFQ-Have_you_taken_the_GRE__c\" \n      title=\"Have you taken the GRE or GMAT?\"\n      class=\"valid\" required\n      data-msg-required=\"GRE status is required\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\"Yes\" title=\"\">Yes</option>\n        <option value=\"No\" title=\"\">No</option>\n        <option value=\"Registered but not taken\" title=\"\">Registered but not taken</option>\n      </select>\n  </div>\n</div><!-- step2 -->\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"first_name\">First Name</label>\n      <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n             required data-msg-required=\"First name is required\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"last_name\">Last Name</label>\n      <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n             required data-msg-required=\"Last name is required\">\n    </div>\n  </div><!-- end of name fields -->\n  <label for=\"email\">Email</label>\n  <input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n data-msg-required=\"Email address is required\">\n  <label for=\"country_code\">Country of Residence</label>\n  <div id=\"countryField\">\n      <select id=\"country_code\" name=\"country_code\" title=\"Country\" required\n              data-msg-required=\"Country of Residence is required\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n<option value=\"1\">United States (+1)</option>\n<option value=\"93\">Afghanistan (+93)</option>\n<option value=\"358\">&#x00C5;land Islands (+358)</option>\n<option value=\"357\">Akrotiri and Dhekelia (+357)</option>\n<option value=\"355\">Albania  (+355)</option>\n<option value=\"213\">Algeria (+213)</option>\n<option value=\"1 684\">American Samoa (+1 684)</option>\n<option value=\"376\">Andorra (+376)</option>\n<option value=\"244\">Angola (+244)</option>\n<option value=\"264\">Anguilla (+264)</option>\n<option value=\"672\">Antarctica (+672)</option>\n<option value=\"268\">Antigua and Barbuda (+268)</option>\n<option value=\"54\">Argentina (+54)</option>\n<option value=\"374\">Armenia (+374)</option>\n<option value=\"297\">Aruba (+297)</option>\n<option value=\"61\">Australia (+61)</option>\n<option value=\"43\">Austria (+43)</option>\n<option value=\"994\">Azerbaijan  (+994)</option>\n<option value=\"242\">Bahamas (+242)</option>\n<option value=\"973\">Bahrain (+973)</option>\n<option value=\"880\">Bangladesh (+880)</option>\n<option value=\"246\">Barbados (+246)</option>\n<option value=\"375\">Belarus (+375)</option>\n<option value=\"32\">Belgium (+32)</option>\n<option value=\"501\">Belize (+501)</option>\n<option value=\"229\">Benin (+229)</option>\n<option value=\"441\">Bermuda (+441)</option>\n<option value=\"975\">Bhutan (+975)</option>\n<option value=\"591\">Bolivia, Plurinational State of (+591)</option>\n<option value=\"387\">Bosnia and Herzegovina (+387)</option>\n<option value=\"267\">Botswana (+267)</option>\n<option value=\"55\">Brazil (+55)</option>\n<option value=\"246\">British Indian Ocean Territory (+246)</option>\n<option value=\"673\">Brunei Darussalam (+673)</option>\n<option value=\"359\">Bulgaria (+359)</option>\n<option value=\"226\">Burkina Faso (+226)</option>\n<option value=\"257\">Burundi (+257)</option>\n<option value=\"855\">Cambodia (+855)</option>\n<option value=\"237\">Cameroon (+237)</option>\n<option value=\"1\">Canada (+1)</option>\n<option value=\"238\">Cape Verde (+238)</option>\n<option value=\"345\">Cayman Islands (+345)</option>\n<option value=\"236\">Central African Republic (+236)</option>\n<option value=\"235\">Chad (+235)</option>\n<option value=\"56\">Chile (+56)</option>\n<option value=\"86\">China (+86)</option>\n<option value=\"61\">Christmas Island (+61)</option>\n<option value=\"61\">Cocos (+Keeling) Islands (+61)</option>\n<option value=\"57\">Colombia (+57)</option>\n<option value=\"269\">Comoros (+269)</option>\n<option value=\"242\">Congo, Democratic Republic of the (+242)</option>\n<option value=\"682\">Cook Islands (+682)</option>\n<option value=\"506\">Costa Rica (+506)</option>\n<option value=\"225\">C&#x00F4;te D'Ivoire (+225)</option>\n<option value=\"285\">Croatia (+285)</option>\n<option value=\"53\">Cuba (+53)</option>\n<option value=\"357\">Cyprus (+357)</option>\n<option value=\"420\">Czech Republic (+420)</option>\n<option value=\"45\">Denmark (+45)</option>\n<option value=\"253\">Djibouti (+253)</option>\n<option value=\"767\">Dominica (+767)</option>\n<option value=\"809\">Dominican Republic (+809)</option>\n<option value=\"593\">Ecuador (+593)</option>\n<option value=\"20\">Egypt (+20)</option>\n<option value=\"503\">El Salvador (+503)</option>\n<option value=\"240\">Equatorial Guinea (+240)</option>\n<option value=\"291\">Eritrea (+291)</option>\n<option value=\"372\">Estonia (+372)</option>\n<option value=\"251\">Ethiopia (+251)</option>\n<option value=\"500\">Falkland Islands (+Malvinas) (+500)</option>\n<option value=\"298\">Faroe Islands (+298)</option>\n<option value=\"679\">Fiji (+679)</option>\n<option value=\"358\">Finland (+358)</option>\n<option value=\"33\">France (+33)</option>\n<option value=\"594\">French Guiana (+594)</option>\n<option value=\"689\">French Polynesia (+689)</option>\n<option value=\"689\">French Southern Territories (+689)</option>\n<option value=\"241\">Gabon (+241)</option>\n<option value=\"220\">Gambia (+220)</option>\n<option value=\"995\">Georgia (+995)</option>\n<option value=\"49\">Germany (+49)</option>\n<option value=\"233\">Ghana (+233)</option>\n<option value=\"350\">Gibraltar (+350)</option>\n<option value=\"30\">Greece (+30)</option>\n<option value=\"299\">Greenland (+299)</option>\n<option value=\"473\">Grenada (+473)</option>\n<option value=\"590\">Guadeloupe (+590)</option>\n<option value=\"671\">Guam (+671)</option>\n<option value=\"502\">Guatemala (+502)</option>\n<option value=\"44\">Guernsey (+44)</option>\n<option value=\"594\">Guinea (+594)</option>\n<option value=\"245\">Guinea-bissau (+245)</option>\n<option value=\"592\">Guyana (+592)</option>\n<option value=\"509\">Haiti (+509)</option>\n<option value=\"672\">Heard Island and Mcdonald Islands (+672)</option>\n<option value=\"39\">Holy See (+Vatican City State) (+39)</option>\n<option value=\"504\">Honduras (+504)</option>\n<option value=\"852\">Hong Kong (+852)</option>\n<option value=\"36\">Hungary (+36)</option>\n<option value=\"354\">Iceland (+354)</option>\n<option value=\"91\">India (+91)</option>\n<option value=\"62\">Indonesia (+62)</option>\n<option value=\"98\">Iran, Islamic Republic of (+98)</option>\n<option value=\"44\">Isle of Man (+44)</option>\n<option value=\"964\">Iraq (+964)</option>\n<option value=\"353\">Ireland (+353)</option>\n<option value=\"972\">Israel (+972)</option>\n<option value=\"39\">Italy (+39)</option>\n<option value=\"876\">Jamaica (+876)</option>\n<option value=\"81\">Japan (+81)</option>\n<option value=\"44\">Jersey (+44)</option>\n<option value=\"962\">Jordan (+962)</option>\n<option value=\"7\">Kazakhstan (+7)</option>\n<option value=\"254\">Kenya (+254)</option>\n<option value=\"686\">Kiribati (+686)</option>\n<option value=\"850\">Korea, Democratic People's Republic of (+850)</option>\n<option value=\"82\">Korea, Republic of (+82)</option>\n<option value=\"965\">Kuwait (+965)</option>\n<option value=\"996\">Kyrgyzstan (+996)</option>\n<option value=\"856\">Lao People's Democratic Republic (+856)</option>\n<option value=\"371\">Latvia (+371)</option>\n<option value=\"961\">Lebanon (+961)</option>\n<option value=\"266\">Lesotho (+266)</option>\n<option value=\"231\">Liberia (+231)</option>\n<option value=\"218\">Libyan Arab Jamahiriya (+218)</option>\n<option value=\"423\">Liechtenstein (+423)</option>\n<option value=\"370\">Lithuania (+370)</option>\n<option value=\"352\">Luxembourg (+352)</option>\n<option value=\"853\">Macao (+853)</option>\n<option value=\"389\">Macedonia, The Former Yugoslav Republic of (+389)</option>\n<option value=\"261\">Madagascar (+261)</option>\n<option value=\"265\">Malawi (+265)</option>\n<option value=\"60\">Malaysia (+60)</option>\n<option value=\"960\">Maldives (+960)</option>\n<option value=\"223\">Mali (+223)</option>\n<option value=\"356\">Malta (+356)</option>\n<option value=\"692\">Marshall Islands (+692)</option>\n<option value=\"596\">Martinique (+596)</option>\n<option value=\"222\">Mauritania (+222)</option>\n<option value=\"230\">Mauritius (+230)</option>\n<option value=\"269\">Mayotte (+269)</option>\n<option value=\"52\">Mexico (+52)</option>\n<option value=\"691\">Micronesia, Federated States of (+691)</option>\n<option value=\"373\">Moldova, Republic of (+373)</option>\n<option value=\"377\">Monaco (+377)</option>\n<option value=\"976\">Mongolia (+976)</option>\n<option value=\"382\">Montenegro (+382)</option>\n<option value=\"664\">Montserrat (+664)</option>\n<option value=\"212\">Morocco (+212)</option>\n<option value=\"258\">Mozambique (+258)</option>\n<option value=\"95\">Myanmar (+95)</option>\n<option value=\"264\">Namibia (+264)</option>\n<option value=\"674\">Nauru (+674)</option>\n<option value=\"977\">Nepal (+977)</option>\n<option value=\"31\">Netherlands (+31)</option>\n<option value=\"599\">Netherlands Antilles (+599)</option>\n<option value=\"687\">New Caledonia (+687)</option>\n<option value=\"64\">New Zealand (+64)</option>\n<option value=\"505\">Nicaragua (+505)</option>\n<option value=\"227\">Niger (+227)</option>\n<option value=\"234\">Nigeria (+234)</option>\n<option value=\"683\">Niue (+683)</option>\n<option value=\"672\">Norfolk Island (+672)</option>\n<option value=\"1 670\">Northern Mariana Islands (+1 670)</option>\n<option value=\"47\">Norway (+47)</option>\n<option value=\"968\">Oman (+968)</option>\n<option value=\"92\">Pakistan (+92)</option>\n<option value=\"680\">Palau (+680)</option>\n<option value=\"970\">Palestinian Territory, Occupied (+970)</option>\n<option value=\"507\">Panama (+507)</option>\n<option value=\"675\">Papua New Guinea (+675)</option>\n<option value=\"595\">Paraguay (+595)</option>\n<option value=\"51\">Peru (+51)</option>\n<option value=\"63\">Philippines (+63)</option>\n<option value=\"64\">Pitcairn (+64)</option>\n<option value=\"48\">Poland (+48)</option>\n<option value=\"351\">Portugal (+351)</option>\n<option value=\"787\">Puerto Rico (+787)</option>\n<option value=\"974\">Qatar (+974)</option>\n<option value=\"262\">R&#x00E9;union (+262)</option>\n<option value=\"40\">Romania (+40)</option>\n<option value=\"7\">Russian Federation (+7)</option>\n<option value=\"250\">Rwanda (+250)</option>\n<option value=\"590\">Saint Barth&#x00E9;lemy (+590)</option>\n<option value=\"290\">Saint Helena, Ascension and Tristan Da Cunha (+290)</option>\n<option value=\"869\">Saint Kitts and Nevis (+869)</option>\n<option value=\"758\">Saint Lucia (+758)</option>\n<option value=\"1 599\">Saint Martin (+1 599)</option>\n<option value=\"508\">Saint Pierre and Miquelon (+508)</option>\n<option value=\"784\">Saint Vincent and The Grenadines (+784)</option>\n<option value=\"685\">Samoa (+685)</option>\n<option value=\"378\">San Marino (+378)</option>\n<option value=\"239\">Sao Tome and Principe (+239)</option>\n<option value=\"966\">Saudi Arabia (+966)</option>\n<option value=\"221\">Senegal (+221)</option>\n<option value=\"381\">Serbia (+381)</option>\n<option value=\"248\">Seychelles (+248)</option>\n<option value=\"232\">Sierra Leone (+232)</option>\n<option value=\"65\">Singapore (+65)</option>\n<option value=\"421\">Slovakia (+421)</option>\n<option value=\"386\">Slovenia (+386)</option>\n<option value=\"677\">Solomon Islands (+677)</option>\n<option value=\"252\">Somalia (+252)</option>\n<option value=\"27\">South Africa (+27)</option>\n<option value=\"500\">South Georgia and The South Sandwich Islands (+500)</option>\n<option value=\"34\">Spain (+34)</option>\n<option value=\"94\">Sri Lanka (+94)</option>\n<option value=\"249\">Sudan (+249)</option>\n<option value=\"597\">Suriname (+597)</option>\n<option value=\"47\">Svalbard and Jan Mayen (+47)</option>\n<option value=\"268\">Swaziland (+268)</option>\n<option value=\"46\">Sweden (+46)</option>\n<option value=\"41\">Switzerland (+41)</option>\n<option value=\"963\">Syrian Arab Republic (+963)</option>\n<option value=\"886\">Taiwan (+886)</option>\n<option value=\"992\">Tajikistan (+992)</option>\n<option value=\"255\">Tanzania, United Republic of (+255)</option>\n<option value=\"66\">Thailand (+66)</option>\n<option value=\"670\">Timor-leste (+670)</option>\n<option value=\"228\">Togo (+228)</option>\n<option value=\"690\">Tokelau (+690)</option>\n<option value=\"676\">Tonga (+676)</option>\n<option value=\"868\">Trinidad and Tobago (+868)</option>\n<option value=\"216\">Tunisia (+216)</option>\n<option value=\"90\">Turkey (+90)</option>\n<option value=\"993\">Turkmenistan (+993)</option>\n<option value=\"649\">Turks and Caicos Islands (+649)</option>\n<option value=\"688\">Tuvalu (+688)</option>\n<option value=\"256\">Uganda (+256)</option>\n<option value=\"380\">Ukraine (+380)</option>\n<option value=\"971\">United Arab Emirates (+971)</option>\n<option value=\"44\">United Kingdom (+44)</option>\n<option value=\"1\">United States Minor Outlying Islands (+1)</option>\n<option value=\"598\">Uruguay (+598)</option>\n<option value=\"998\">Uzbekistan (+998)</option>\n<option value=\"678\">Vanuatu (+678)</option>\n<option value=\"58\">Venezuela, Bolivarian Republic of (+58)</option>\n<option value=\"84\">Viet Nam (+84)</option>\n<option value=\"284\">Virgin Islands, British (+284)</option>\n<option value=\"340\">Virgin Islands, U.S. (+340)</option>\n<option value=\"681\">Wallis and Futuna (+681)</option>\n<option value=\"212\">Western Sahara (+212)</option>\n<option value=\"967\">Yemen (+967)</option>\n<option value=\"260\">Zambia (+260)</option>\n<option value=\"263\">Zimbabwe (+263)</option>\n      </select>\n      <input type=\"hidden\" id=\"country_name\" name=\"country\" value=\"\">\n  </div>\n  <div class=\"row\">\n    <div class=\"span3\">\n      <label for=\"phone\">Phone</label>\n      <input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n             data-msg-required=\"Phone number is required\">\n    </div>\n    <div class=\"span3\">\n      <label for=\"zipcode\">ZIP / Postal Code</label>\n      <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n             data-msg-required=\"ZIP / postal code is required\"\n             data-msg-minlength=\"ZIP code must have at least 5 characters.\">\n    </div>\n  </div>\n  <label for=\"state\">State</label>\n  <div id=\"stateField\">\n      <select id=\"state\" name=\"state\" title=\"State\"\n              data-msg-required=\"State is required\">\n        <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n        <option value=\" \" title=\"\">N/A</option>\n        <option value=\"Alabama\" title=\"\">Alabama</option>\n        <option value=\"Alaska\" title=\"\">Alaska</option>\n        <option value=\"Arizona\" title=\"\">Arizona</option>\n        <option value=\"Arkansas\" title=\"\">Arkansas</option>\n        <option value=\"California\" title=\"\">California</option>\n        <option value=\"Colorado\" title=\"\">Colorado</option>\n        <option value=\"Connecticut\" title=\"\">Connecticut</option>\n        <option value=\"Delaware\" title=\"\">Delaware</option>\n        <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n        <option value=\"Florida\" title=\"\">Florida</option>\n        <option value=\"Georgia\" title=\"\">Georgia</option>\n        <option value=\"Hawaii\" title=\"\">Hawaii</option>\n        <option value=\"Idaho\" title=\"\">Idaho</option>\n        <option value=\"Illinois\" title=\"\">Illinois</option>\n        <option value=\"Indiana\" title=\"\">Indiana</option>\n        <option value=\"Iowa\" title=\"\">Iowa</option>\n        <option value=\"Kansas\" title=\"\">Kansas</option>\n        <option value=\"Kentucky\" title=\"\">Kentucky</option>\n        <option value=\"Louisiana\" title=\"\">Louisiana</option>\n        <option value=\"Maine\" title=\"\">Maine</option>\n        <option value=\"Maryland\" title=\"\">Maryland</option>\n        <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n        <option value=\"Michigan\" title=\"\">Michigan</option>\n        <option value=\"Minnesota\" title=\"\">Minnesota</option>\n        <option value=\"Mississippi\" title=\"\">Mississippi</option>\n        <option value=\"Missouri\" title=\"\">Missouri</option>\n        <option value=\"Montana\" title=\"\">Montana</option>\n        <option value=\"Nebraska\" title=\"\">Nebraska</option>\n        <option value=\"Nevada\" title=\"\">Nevada</option>\n        <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n        <option value=\"New Jersey\" title=\"\">New Jersey</option>\n        <option value=\"New Mexico\" title=\"\">New Mexico</option>\n        <option value=\"New York\" title=\"\">New York</option>\n        <option value=\"North Carolina\" title=\"\">North Carolina</option>\n        <option value=\"North Dakota\" title=\"\">North Dakota</option>\n        <option value=\"Ohio\" title=\"\">Ohio</option>\n        <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n        <option value=\"Oregon\" title=\"\">Oregon</option>\n        <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n        <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n        <option value=\"South Carolina\" title=\"\">South Carolina</option>\n        <option value=\"South Dakota\" title=\"\">South Dakota</option>\n        <option value=\"Tennessee\" title=\"\">Tennessee</option>\n        <option value=\"Texas\" title=\"\">Texas</option>\n        <option value=\"Utah\" title=\"\">Utah</option>\n        <option value=\"Vermont\" title=\"\">Vermont</option>\n        <option value=\"Virginia\" title=\"\">Virginia</option>\n        <option value=\"Washington\" title=\"\">Washington</option>\n        <option value=\"West Virginia\" title=\"\">West Virginia</option>\n        <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n        <option value=\"Wyoming\" title=\"\">Wyoming</option>\n      </select>\n  </div>\n</div>";

  LeadForm.Programs['usc-mat.form'] = "<div class=\"lead-form-step lead-form-step-0\" data-percentage=\"10\" >\n<label for=\"teacher\">Are you a teacher?</label>\n<div id=\"teacherField\">\n    <select id=\"teacher\"\n            name=\"SFQ-Teacher__c\"\n            title=\"Are you a teacher?\" \n            class=\"field-0 valid\" \n            required\n            data-msg-required=\"Please select whether or not you are a teacher.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"Yes\" title=\"\">Yes</option>\n      <option value=\"No\" title=\"\">No</option>\n    </select>\n</div>\n</div><!-- step1 -->\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"30\" >\n<label for=\"degreeInterest\">What degree are you interested in pursuing?</label>\n<div id=\"degreeInterestField\">\n    <select id=\"degreeInterest\"\n            name=\"SFQ-Intended_Program__c\"\n            title=\"What degree are you interested in pursuing?\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please select the degree you are interested in pursuing.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"ME in Teacher Leadership\" title=\"\">Master of Education in Teacher Leadership</option>\n      <option value=\"MAT\" title=\"\">Master of Arts in Teaching</option>\n      <option value=\"MAT TESOL\" title=\"\">Master of Arts in Teaching - TESOL</option>\n      <option value=\"EdD in Organizational Change and Leadership\" title=\"\">EdD in Organizational Change and Leadership</option>\n    </select>\n</div>\n<label for=\"gpaRange\">What was your undergraduate <abbr title='Grade Point Average'>GPA</abbr>?</label>\n<div id=\"gpaRangeField\">\n    <select id=\"gpaRange\"\n            name=\"SFQ-Stated_GPA_Range__c\"\n            title=\"What was your undergraduate GPA?\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please provide your GPA range.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n\n      <option value=\"4.00 and above\" title=\"\">4.00 and above</option>\n\n      <option value=\"3.99 - 3.50\" title=\"\">3.99 - 3.50</option>\n\n      <option value=\"3.49 - 3.00\" title=\"\">3.49 - 3.00</option>\n\n      <option value=\"2.99 - 2.50\" title=\"\">2.99 - 2.50</option>\n\n      <option value=\"2.49 and below\" title=\"\">2.49 and below</option>\n    </select>\n</div>\n<label for=\"education\">Highest completed level of education</label>\n<div id=\"educationField\">\n    <select id=\"education\"\n            name=\"SFQ-Level_of_Education__c\"\n            title=\"Highest completed level of education\" \n            class=\"valid\" \n            required\n            data-msg-required=\"Please provide your highest level of education.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n\n      <option value=\"High School\" title=\"\">High School</option>\n\n      <option value=\"Associate&rsquo;s Degree\" title=\"\">Associate&rsquo;s Degree</option>\n\n      <option value=\"Bachelor&rsquo;s in progress\" title=\"\">Bachelor&rsquo;s in progress</option>\n\n      <option value=\"Bachelor&rsquo;s\" title=\"\">Bachelor&rsquo;s</option>\n\n      <option value=\"Master&rsquo;s in progress\" title=\"\">Master&rsquo;s in progress</option>\n\n      <option value=\"Master&rsquo;s\" title=\"\">Master&rsquo;s</option>\n\n      <option value=\"Doctorate in progress\" title=\"\">Doctorate in progress</option>\n\n      <option value=\"Doctorate\" title=\"\">Doctorate</option>\n\n      <option value=\"Professional Degree\" title=\"\">Professional Degree</option>\n    </select>\n</div>\n</div><!-- step2 -->\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"first_name\">First Name</label>\n    <input id=\"first_name\" name=\"first_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your first name.\" />\n  </div>\n  <div class=\"span3\">\n    <label for=\"last_name\">Last Name</label>\n    <input id=\"last_name\" name=\"last_name\" size=\"20\" type=\"text\"\n           required data-msg-required=\"Please provide your last name.\" />\n  </div>\n</div><!-- end of name fields -->\n\n<label for=\"email\">Email</label>\n<input id=\"email\" name=\"email\" size=\"20\" type=\"email\" required\n data-msg-required=\"Please provide your email address.\" />\n\n<label for=\"country_code\">Country of Residence</label>\n<div id=\"countryField\">\n    <select id=\"country_code\" \n            name=\"country_code\"\n            title=\"Country\"\n            required\n            data-msg-required=\"Please provide your country of residence.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"1\">United States (+1)</option>\n      <option value=\"93\">Afghanistan (+93)</option>\n      <option value=\"358\">&#x00C5;land Islands (+358)</option>\n      <option value=\"357\">Akrotiri and Dhekelia (+357)</option>\n      <option value=\"355\">Albania  (+355)</option>\n      <option value=\"213\">Algeria (+213)</option>\n      <option value=\"1 684\">American Samoa (+1 684)</option>\n      <option value=\"376\">Andorra (+376)</option>\n      <option value=\"244\">Angola (+244)</option>\n      <option value=\"264\">Anguilla (+264)</option>\n      <option value=\"672\">Antarctica (+672)</option>\n      <option value=\"268\">Antigua and Barbuda (+268)</option>\n      <option value=\"54\">Argentina (+54)</option>\n      <option value=\"374\">Armenia (+374)</option>\n      <option value=\"297\">Aruba (+297)</option>\n      <option value=\"61\">Australia (+61)</option>\n      <option value=\"43\">Austria (+43)</option>\n      <option value=\"994\">Azerbaijan  (+994)</option>\n      <option value=\"242\">Bahamas (+242)</option>\n      <option value=\"973\">Bahrain (+973)</option>\n      <option value=\"880\">Bangladesh (+880)</option>\n      <option value=\"246\">Barbados (+246)</option>\n      <option value=\"375\">Belarus (+375)</option>\n      <option value=\"32\">Belgium (+32)</option>\n      <option value=\"501\">Belize (+501)</option>\n      <option value=\"229\">Benin (+229)</option>\n      <option value=\"441\">Bermuda (+441)</option>\n      <option value=\"975\">Bhutan (+975)</option>\n      <option value=\"591\">Bolivia, Plurinational State of (+591)</option>\n      <option value=\"387\">Bosnia and Herzegovina (+387)</option>\n      <option value=\"267\">Botswana (+267)</option>\n      <option value=\"55\">Brazil (+55)</option>\n      <option value=\"246\">British Indian Ocean Territory (+246)</option>\n      <option value=\"673\">Brunei Darussalam (+673)</option>\n      <option value=\"359\">Bulgaria (+359)</option>\n      <option value=\"226\">Burkina Faso (+226)</option>\n      <option value=\"257\">Burundi (+257)</option>\n      <option value=\"855\">Cambodia (+855)</option>\n      <option value=\"237\">Cameroon (+237)</option>\n      <option value=\"1\">Canada (+1)</option>\n      <option value=\"238\">Cape Verde (+238)</option>\n      <option value=\"345\">Cayman Islands (+345)</option>\n      <option value=\"236\">Central African Republic (+236)</option>\n      <option value=\"235\">Chad (+235)</option>\n      <option value=\"56\">Chile (+56)</option>\n      <option value=\"86\">China (+86)</option>\n      <option value=\"61\">Christmas Island (+61)</option>\n      <option value=\"61\">Cocos (+Keeling) Islands (+61)</option>\n      <option value=\"57\">Colombia (+57)</option>\n      <option value=\"269\">Comoros (+269)</option>\n      <option value=\"242\">Congo, Democratic Republic of the (+242)</option>\n      <option value=\"682\">Cook Islands (+682)</option>\n      <option value=\"506\">Costa Rica (+506)</option>\n      <option value=\"225\">C&#x00F4;te D'Ivoire (+225)</option>\n      <option value=\"285\">Croatia (+285)</option>\n      <option value=\"53\">Cuba (+53)</option>\n      <option value=\"357\">Cyprus (+357)</option>\n      <option value=\"420\">Czech Republic (+420)</option>\n      <option value=\"45\">Denmark (+45)</option>\n      <option value=\"253\">Djibouti (+253)</option>\n      <option value=\"767\">Dominica (+767)</option>\n      <option value=\"809\">Dominican Republic (+809)</option>\n      <option value=\"593\">Ecuador (+593)</option>\n      <option value=\"20\">Egypt (+20)</option>\n      <option value=\"503\">El Salvador (+503)</option>\n      <option value=\"240\">Equatorial Guinea (+240)</option>\n      <option value=\"291\">Eritrea (+291)</option>\n      <option value=\"372\">Estonia (+372)</option>\n      <option value=\"251\">Ethiopia (+251)</option>\n      <option value=\"500\">Falkland Islands (+Malvinas) (+500)</option>\n      <option value=\"298\">Faroe Islands (+298)</option>\n      <option value=\"679\">Fiji (+679)</option>\n      <option value=\"358\">Finland (+358)</option>\n      <option value=\"33\">France (+33)</option>\n      <option value=\"594\">French Guiana (+594)</option>\n      <option value=\"689\">French Polynesia (+689)</option>\n      <option value=\"689\">French Southern Territories (+689)</option>\n      <option value=\"241\">Gabon (+241)</option>\n      <option value=\"220\">Gambia (+220)</option>\n      <option value=\"995\">Georgia (+995)</option>\n      <option value=\"49\">Germany (+49)</option>\n      <option value=\"233\">Ghana (+233)</option>\n      <option value=\"350\">Gibraltar (+350)</option>\n      <option value=\"30\">Greece (+30)</option>\n      <option value=\"299\">Greenland (+299)</option>\n      <option value=\"473\">Grenada (+473)</option>\n      <option value=\"590\">Guadeloupe (+590)</option>\n      <option value=\"671\">Guam (+671)</option>\n      <option value=\"502\">Guatemala (+502)</option>\n      <option value=\"44\">Guernsey (+44)</option>\n      <option value=\"594\">Guinea (+594)</option>\n      <option value=\"245\">Guinea-bissau (+245)</option>\n      <option value=\"592\">Guyana (+592)</option>\n      <option value=\"509\">Haiti (+509)</option>\n      <option value=\"672\">Heard Island and Mcdonald Islands (+672)</option>\n      <option value=\"39\">Holy See (+Vatican City State) (+39)</option>\n      <option value=\"504\">Honduras (+504)</option>\n      <option value=\"852\">Hong Kong (+852)</option>\n      <option value=\"36\">Hungary (+36)</option>\n      <option value=\"354\">Iceland (+354)</option>\n      <option value=\"91\">India (+91)</option>\n      <option value=\"62\">Indonesia (+62)</option>\n      <option value=\"98\">Iran, Islamic Republic of (+98)</option>\n      <option value=\"44\">Isle of Man (+44)</option>\n      <option value=\"964\">Iraq (+964)</option>\n      <option value=\"353\">Ireland (+353)</option>\n      <option value=\"972\">Israel (+972)</option>\n      <option value=\"39\">Italy (+39)</option>\n      <option value=\"876\">Jamaica (+876)</option>\n      <option value=\"81\">Japan (+81)</option>\n      <option value=\"44\">Jersey (+44)</option>\n      <option value=\"962\">Jordan (+962)</option>\n      <option value=\"7\">Kazakhstan (+7)</option>\n      <option value=\"254\">Kenya (+254)</option>\n      <option value=\"686\">Kiribati (+686)</option>\n      <option value=\"850\">Korea, Democratic People's Republic of (+850)</option>\n      <option value=\"82\">Korea, Republic of (+82)</option>\n      <option value=\"965\">Kuwait (+965)</option>\n      <option value=\"996\">Kyrgyzstan (+996)</option>\n      <option value=\"856\">Lao People's Democratic Republic (+856)</option>\n      <option value=\"371\">Latvia (+371)</option>\n      <option value=\"961\">Lebanon (+961)</option>\n      <option value=\"266\">Lesotho (+266)</option>\n      <option value=\"231\">Liberia (+231)</option>\n      <option value=\"218\">Libyan Arab Jamahiriya (+218)</option>\n      <option value=\"423\">Liechtenstein (+423)</option>\n      <option value=\"370\">Lithuania (+370)</option>\n      <option value=\"352\">Luxembourg (+352)</option>\n      <option value=\"853\">Macao (+853)</option>\n      <option value=\"389\">Macedonia, The Former Yugoslav Republic of (+389)</option>\n      <option value=\"261\">Madagascar (+261)</option>\n      <option value=\"265\">Malawi (+265)</option>\n      <option value=\"60\">Malaysia (+60)</option>\n      <option value=\"960\">Maldives (+960)</option>\n      <option value=\"223\">Mali (+223)</option>\n      <option value=\"356\">Malta (+356)</option>\n      <option value=\"692\">Marshall Islands (+692)</option>\n      <option value=\"596\">Martinique (+596)</option>\n      <option value=\"222\">Mauritania (+222)</option>\n      <option value=\"230\">Mauritius (+230)</option>\n      <option value=\"269\">Mayotte (+269)</option>\n      <option value=\"52\">Mexico (+52)</option>\n      <option value=\"691\">Micronesia, Federated States of (+691)</option>\n      <option value=\"373\">Moldova, Republic of (+373)</option>\n      <option value=\"377\">Monaco (+377)</option>\n      <option value=\"976\">Mongolia (+976)</option>\n      <option value=\"382\">Montenegro (+382)</option>\n      <option value=\"664\">Montserrat (+664)</option>\n      <option value=\"212\">Morocco (+212)</option>\n      <option value=\"258\">Mozambique (+258)</option>\n      <option value=\"95\">Myanmar (+95)</option>\n      <option value=\"264\">Namibia (+264)</option>\n      <option value=\"674\">Nauru (+674)</option>\n      <option value=\"977\">Nepal (+977)</option>\n      <option value=\"31\">Netherlands (+31)</option>\n      <option value=\"599\">Netherlands Antilles (+599)</option>\n      <option value=\"687\">New Caledonia (+687)</option>\n      <option value=\"64\">New Zealand (+64)</option>\n      <option value=\"505\">Nicaragua (+505)</option>\n      <option value=\"227\">Niger (+227)</option>\n      <option value=\"234\">Nigeria (+234)</option>\n      <option value=\"683\">Niue (+683)</option>\n      <option value=\"672\">Norfolk Island (+672)</option>\n      <option value=\"1 670\">Northern Mariana Islands (+1 670)</option>\n      <option value=\"47\">Norway (+47)</option>\n      <option value=\"968\">Oman (+968)</option>\n      <option value=\"92\">Pakistan (+92)</option>\n      <option value=\"680\">Palau (+680)</option>\n      <option value=\"970\">Palestinian Territory, Occupied (+970)</option>\n      <option value=\"507\">Panama (+507)</option>\n      <option value=\"675\">Papua New Guinea (+675)</option>\n      <option value=\"595\">Paraguay (+595)</option>\n      <option value=\"51\">Peru (+51)</option>\n      <option value=\"63\">Philippines (+63)</option>\n      <option value=\"64\">Pitcairn (+64)</option>\n      <option value=\"48\">Poland (+48)</option>\n      <option value=\"351\">Portugal (+351)</option>\n      <option value=\"787\">Puerto Rico (+787)</option>\n      <option value=\"974\">Qatar (+974)</option>\n      <option value=\"262\">R&#x00E9;union (+262)</option>\n      <option value=\"40\">Romania (+40)</option>\n      <option value=\"7\">Russian Federation (+7)</option>\n      <option value=\"250\">Rwanda (+250)</option>\n      <option value=\"590\">Saint Barth&#x00E9;lemy (+590)</option>\n      <option value=\"290\">Saint Helena, Ascension and Tristan Da Cunha (+290)</option>\n      <option value=\"869\">Saint Kitts and Nevis (+869)</option>\n      <option value=\"758\">Saint Lucia (+758)</option>\n      <option value=\"1 599\">Saint Martin (+1 599)</option>\n      <option value=\"508\">Saint Pierre and Miquelon (+508)</option>\n      <option value=\"784\">Saint Vincent and The Grenadines (+784)</option>\n      <option value=\"685\">Samoa (+685)</option>\n      <option value=\"378\">San Marino (+378)</option>\n      <option value=\"239\">Sao Tome and Principe (+239)</option>\n      <option value=\"966\">Saudi Arabia (+966)</option>\n      <option value=\"221\">Senegal (+221)</option>\n      <option value=\"381\">Serbia (+381)</option>\n      <option value=\"248\">Seychelles (+248)</option>\n      <option value=\"232\">Sierra Leone (+232)</option>\n      <option value=\"65\">Singapore (+65)</option>\n      <option value=\"421\">Slovakia (+421)</option>\n      <option value=\"386\">Slovenia (+386)</option>\n      <option value=\"677\">Solomon Islands (+677)</option>\n      <option value=\"252\">Somalia (+252)</option>\n      <option value=\"27\">South Africa (+27)</option>\n      <option value=\"500\">South Georgia and The South Sandwich Islands (+500)</option>\n      <option value=\"34\">Spain (+34)</option>\n      <option value=\"94\">Sri Lanka (+94)</option>\n      <option value=\"249\">Sudan (+249)</option>\n      <option value=\"597\">Suriname (+597)</option>\n      <option value=\"47\">Svalbard and Jan Mayen (+47)</option>\n      <option value=\"268\">Swaziland (+268)</option>\n      <option value=\"46\">Sweden (+46)</option>\n      <option value=\"41\">Switzerland (+41)</option>\n      <option value=\"963\">Syrian Arab Republic (+963)</option>\n      <option value=\"886\">Taiwan (+886)</option>\n      <option value=\"992\">Tajikistan (+992)</option>\n      <option value=\"255\">Tanzania, United Republic of (+255)</option>\n      <option value=\"66\">Thailand (+66)</option>\n      <option value=\"670\">Timor-leste (+670)</option>\n      <option value=\"228\">Togo (+228)</option>\n      <option value=\"690\">Tokelau (+690)</option>\n      <option value=\"676\">Tonga (+676)</option>\n      <option value=\"868\">Trinidad and Tobago (+868)</option>\n      <option value=\"216\">Tunisia (+216)</option>\n      <option value=\"90\">Turkey (+90)</option>\n      <option value=\"993\">Turkmenistan (+993)</option>\n      <option value=\"649\">Turks and Caicos Islands (+649)</option>\n      <option value=\"688\">Tuvalu (+688)</option>\n      <option value=\"256\">Uganda (+256)</option>\n      <option value=\"380\">Ukraine (+380)</option>\n      <option value=\"971\">United Arab Emirates (+971)</option>\n      <option value=\"44\">United Kingdom (+44)</option>\n      <option value=\"1\">United States Minor Outlying Islands (+1)</option>\n      <option value=\"598\">Uruguay (+598)</option>\n      <option value=\"998\">Uzbekistan (+998)</option>\n      <option value=\"678\">Vanuatu (+678)</option>\n      <option value=\"58\">Venezuela, Bolivarian Republic of (+58)</option>\n      <option value=\"84\">Viet Nam (+84)</option>\n      <option value=\"284\">Virgin Islands, British (+284)</option>\n      <option value=\"340\">Virgin Islands, U.S. (+340)</option>\n      <option value=\"681\">Wallis and Futuna (+681)</option>\n      <option value=\"212\">Western Sahara (+212)</option>\n      <option value=\"967\">Yemen (+967)</option>\n      <option value=\"260\">Zambia (+260)</option>\n      <option value=\"263\">Zimbabwe (+263)</option>\n    </select>\n    <input type=\"hidden\" id=\"country_name\" name=\"country\" value=\"\">\n</div>\n\n<label for=\"phone\">Phone</label>\n<input id=\"phone\" name=\"phone\" size=\"20\" type=\"tel\" required\n       data-msg-required=\"Please provide your phone number.\">\n\n<div class=\"row\">\n  <div class=\"span3\">\n    <label for=\"zipcode\">ZIP / Postal Code</label>\n    <input id=\"zipcode\" name=\"zipcode\" size=\"20\" type=\"text\"\n           data-msg-required=\"Please provide your ZIP / postal code.\"\n           data-msg-minlength=\"ZIP code must have at least 5 characters.\">\n  </div>\n  <div class=\"span3\">\n      <label for=\"state\">State</label>\n      <div id=\"stateField\">\n            <select id=\"state\" name=\"state\" title=\"State\"\n                    data-msg-required=\"Please provide your state.\">\n              <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n              <option value=\" \" title=\"\">N/A</option>\n              <option value=\"Alabama\" title=\"\">Alabama</option>\n              <option value=\"Alaska\" title=\"\">Alaska</option>\n              <option value=\"Arizona\" title=\"\">Arizona</option>\n              <option value=\"Arkansas\" title=\"\">Arkansas</option>\n              <option value=\"California\" title=\"\">California</option>\n              <option value=\"Colorado\" title=\"\">Colorado</option>\n              <option value=\"Connecticut\" title=\"\">Connecticut</option>\n              <option value=\"Delaware\" title=\"\">Delaware</option>\n              <option value=\"District of Columbia\" title=\"\">District of Columbia</option>\n              <option value=\"Florida\" title=\"\">Florida</option>\n              <option value=\"Georgia\" title=\"\">Georgia</option>\n              <option value=\"Hawaii\" title=\"\">Hawaii</option>\n              <option value=\"Idaho\" title=\"\">Idaho</option>\n              <option value=\"Illinois\" title=\"\">Illinois</option>\n              <option value=\"Indiana\" title=\"\">Indiana</option>\n              <option value=\"Iowa\" title=\"\">Iowa</option>\n              <option value=\"Kansas\" title=\"\">Kansas</option>\n              <option value=\"Kentucky\" title=\"\">Kentucky</option>\n              <option value=\"Louisiana\" title=\"\">Louisiana</option>\n              <option value=\"Maine\" title=\"\">Maine</option>\n              <option value=\"Maryland\" title=\"\">Maryland</option>\n              <option value=\"Massachusetts\" title=\"\">Massachusetts</option>\n              <option value=\"Michigan\" title=\"\">Michigan</option>\n              <option value=\"Minnesota\" title=\"\">Minnesota</option>\n              <option value=\"Mississippi\" title=\"\">Mississippi</option>\n              <option value=\"Missouri\" title=\"\">Missouri</option>\n              <option value=\"Montana\" title=\"\">Montana</option>\n              <option value=\"Nebraska\" title=\"\">Nebraska</option>\n              <option value=\"Nevada\" title=\"\">Nevada</option>\n              <option value=\"New Hampshire\" title=\"\">New Hampshire</option>\n              <option value=\"New Jersey\" title=\"\">New Jersey</option>\n              <option value=\"New Mexico\" title=\"\">New Mexico</option>\n              <option value=\"New York\" title=\"\">New York</option>\n              <option value=\"North Carolina\" title=\"\">North Carolina</option>\n              <option value=\"North Dakota\" title=\"\">North Dakota</option>\n              <option value=\"Ohio\" title=\"\">Ohio</option>\n              <option value=\"Oklahoma\" title=\"\">Oklahoma</option>\n              <option value=\"Oregon\" title=\"\">Oregon</option>\n              <option value=\"Pennsylvania\" title=\"\">Pennsylvania</option>\n              <option value=\"Rhode Island\" title=\"\">Rhode Island</option>\n              <option value=\"South Carolina\" title=\"\">South Carolina</option>\n              <option value=\"South Dakota\" title=\"\">South Dakota</option>\n              <option value=\"Tennessee\" title=\"\">Tennessee</option>\n              <option value=\"Texas\" title=\"\">Texas</option>\n              <option value=\"Utah\" title=\"\">Utah</option>\n              <option value=\"Vermont\" title=\"\">Vermont</option>\n              <option value=\"Virginia\" title=\"\">Virginia</option>\n              <option value=\"Washington\" title=\"\">Washington</option>\n              <option value=\"West Virginia\" title=\"\">West Virginia</option>\n              <option value=\"Wisconsin\" title=\"\">Wisconsin</option>\n              <option value=\"Wyoming\" title=\"\">Wyoming</option>\n            </select>\n      </div>\n  </div>\n</div>\n\n</div>";

  LeadForm.Programs['wu-llm.form'] = "<div class=\"lead-form-step lead-form-step-0 hide\" data-percentage=\"10\">\n  <label for=\"hasDegree\">Do you have a law degree?</label>\n  <select id=\"hasDegree\"\n  name=\"SFQ-Has_Law_Degree__c\"\n  required\n  data-msg-required=\"Please indicate whether or not you have a law degree.\">\n    <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n    <option value=\"Yes\" title=\"\">Yes</option>\n    <option value=\"No\" title=\"\">No</option>\n  </select>\n</div>\n\n<div class=\"lead-form-step lead-form-step-1 hide\" data-percentage=\"30\">\n  <div id=\"programFieldWrapper\">\n    <label for=\"whichProgram\">Which program are you interested in pursuing?</label> \n    <div id=\"programField\">\n      <select id=\"whichProgram\" \n      name=\"SFQ-Lead_Program_Selection__c\" \n      required\n      data-msg-required=\"Please indicate which program you are interested in pursuing.\">\n<option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n<option value=\"LL.M. in U.S. Law\" title=\"\">LL.M. in U.S. Law</option>\n<option value=\"Dual LL.M. in U.S. Law and Transnational Legal Practice\" title=\"\">Dual LL.M. in U.S. Law and Transnational Legal Practice</option>\n<option value=\"I am interested in learning about all program options\" title=\"\">I am interested in learning about all program options</option>\n      </select>\n    </div>\n  </div>\n  \n  <label for=\"startdate\">When are you interested in starting?</label> \n  <div id=\"startdateField\">\n    <select id=\"startdate\" \n    name=\"SFQ-Prospect_Indicated_Start_Date__c\"\n    required\n    data-msg-required=\"Please select when you are interested in starting.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"January 2015\" title=\"\">January 2015</option>\n      <option value=\"April 2015\" title=\"\">April 2015</option>\n      <option value=\"July 2015\" title=\"\">July 2015</option>\n    </select>\n  </div>\n</div>\n\n<div class=\"lead-form-step lead-form-step-2 hide\" data-percentage=\"90\">\n  <div class=\"row\">\n    <div class=\"span3\" >		\n      <label for=\"first_name\">First / Given Name</label>\n      <input id=\"first_name\" \n     name=\"first_name\" \n     size=\"20\" \n     type=\"text\" \n     required\n     data-msg-required=\"Please provide your first/given name.\"/>\n    </div>\n    <div class=\"span3\" >		\n      <label for=\"last_name\">Last / Family Name</label>\n      <input id=\"last_name\" \n     name=\"last_name\" \n     size=\"20\" \n     type=\"text\" \n     required\n     data-msg-required=\"Please provide your family/last name.\" />\n    </div>\n  </div><!-- end of name fields -->\n  <label for=\"email\">Email</label>\n  <input id=\"email\" \n name=\"email\" \n size=\"20\" \n type=\"email\" \n required\n data-msg-required=\"Please provide your email address.\"/>\n  \n  <label for=\"country\">Country of Residence</label> \n  <div id=\"countryField\">\n    <select id=\"country\" \n    name=\"SFQ-Country_of_Residence__c\"\n    required\n    data-msg-required=\"Please select your country of residence.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"United States\" title=\"1\">United States</option>\n      <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n      <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n      <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n      <option value=\"Albania \" title=\"355\">Albania </option>\n      <option value=\"Algeria\" title=\"213\">Algeria</option>\n      <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n      <option value=\"Andorra\" title=\"376\">Andorra</option>\n      <option value=\"Angola\" title=\"244\">Angola</option>\n      <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n      <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n      <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n      <option value=\"Argentina\" title=\"54\">Argentina</option>\n      <option value=\"Armenia\" title=\"374\">Armenia</option>\n      <option value=\"Aruba\" title=\"297\">Aruba</option>\n      <option value=\"Australia\" title=\"61\">Australia</option>\n      <option value=\"Austria\" title=\"43\">Austria</option>\n      <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n      <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n      <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n      <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n      <option value=\"Barbados\" title=\"246\">Barbados</option>\n      <option value=\"Belarus\" title=\"375\">Belarus</option>\n      <option value=\"Belgium\" title=\"32\">Belgium</option>\n      <option value=\"Belize\" title=\"501\">Belize</option>\n      <option value=\"Benin\" title=\"229\">Benin</option>\n      <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n      <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n      <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n      <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n      <option value=\"Botswana\" title=\"267\">Botswana</option>\n      <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n      <option value=\"Brazil\" title=\"55\">Brazil</option>\n      <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n      <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n      <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n      <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n      <option value=\"Burundi\" title=\"257\">Burundi</option>\n      <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n      <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n      <option value=\"Canada\" title=\"1\">Canada</option>\n      <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n      <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n      <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n      <option value=\"Chad\" title=\"235\">Chad</option>\n      <option value=\"Chile\" title=\"56\">Chile</option>\n      <option value=\"China\" title=\"86\">China</option>\n      <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n      <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n      <option value=\"Colombia\" title=\"57\">Colombia</option>\n      <option value=\"Comoros\" title=\"269\">Comoros</option>\n      <option value=\"Congo\" title=\"242\">Congo</option>\n      <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n      <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n      <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n      <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n      <option value=\"Croatia\" title=\"285\">Croatia</option>\n      <option value=\"Cuba\" title=\"53\">Cuba</option>\n      <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n      <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n      <option value=\"Denmark\" title=\"45\">Denmark</option>\n      <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n      <option value=\"Dominica\" title=\"767\">Dominica</option>\n      <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n      <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n      <option value=\"Egypt\" title=\"20\">Egypt</option>\n      <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n      <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n      <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n      <option value=\"Estonia\" title=\"372\">Estonia</option>\n      <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n      <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n      <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n      <option value=\"Fiji\" title=\"679\">Fiji</option>\n      <option value=\"Finland\" title=\"358\">Finland</option>\n      <option value=\"France\" title=\"33\">France</option>\n      <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n      <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n      <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n      <option value=\"Gabon\" title=\"241\">Gabon</option>\n      <option value=\"Gambia\" title=\"220\">Gambia</option>\n      <option value=\"Georgia\" title=\"995\">Georgia</option>\n      <option value=\"Germany\" title=\"49\">Germany</option>\n      <option value=\"Ghana\" title=\"233\">Ghana</option>\n      <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n      <option value=\"Greece\" title=\"30\">Greece</option>\n      <option value=\"Greenland\" title=\"299\">Greenland</option>\n      <option value=\"Grenada\" title=\"473\">Grenada</option>\n      <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n      <option value=\"Guam\" title=\"671\">Guam</option>\n      <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n      <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n      <option value=\"Guinea\" title=\"594\">Guinea</option>\n      <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n      <option value=\"Guyana\" title=\"592\">Guyana</option>\n      <option value=\"Haiti\" title=\"509\">Haiti</option>\n      <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n      <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n      <option value=\"Honduras\" title=\"504\">Honduras</option>\n      <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n      <option value=\"Hungary\" title=\"36\">Hungary</option>\n      <option value=\"Iceland\" title=\"354\">Iceland</option>\n      <option value=\"India\" title=\"91\">India</option>\n      <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n      <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n      <option value=\"Iraq\" title=\"964\">Iraq</option>\n      <option value=\"Ireland\" title=\"353\">Ireland</option>\n      <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n      <option value=\"Israel\" title=\"972\">Israel</option>\n      <option value=\"Italy\" title=\"39\">Italy</option>\n      <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n      <option value=\"Japan\" title=\"81\">Japan</option>\n      <option value=\"Jersey\" title=\"44\">Jersey</option>\n      <option value=\"Jordan\" title=\"962\">Jordan</option>\n      <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n      <option value=\"Kenya\" title=\"254\">Kenya</option>\n      <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n      <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n      <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n      <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n      <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n      <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n      <option value=\"Latvia\" title=\"371\">Latvia</option>\n      <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n      <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n      <option value=\"Liberia\" title=\"231\">Liberia</option>\n      <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n      <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n      <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n      <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n      <option value=\"Macao\" title=\"853\">Macao</option>\n      <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n      <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n      <option value=\"Malawi\" title=\"265\">Malawi</option>\n      <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n      <option value=\"Maldives\" title=\"960\">Maldives</option>\n      <option value=\"Mali\" title=\"223\">Mali</option>\n      <option value=\"Malta\" title=\"356\">Malta</option>\n      <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n      <option value=\"Martinique\" title=\"596\">Martinique</option>\n      <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n      <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n      <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n      <option value=\"Mexico\" title=\"52\">Mexico</option>\n      <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n      <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n      <option value=\"Monaco\" title=\"377\">Monaco</option>\n      <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n      <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n      <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n      <option value=\"Morocco\" title=\"212\">Morocco</option>\n      <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n      <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n      <option value=\"Namibia\" title=\"264\">Namibia</option>\n      <option value=\"Nauru\" title=\"674\">Nauru</option>\n      <option value=\"Nepal\" title=\"977\">Nepal</option>\n      <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n      <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n      <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n      <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n      <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n      <option value=\"Niger\" title=\"227\">Niger</option>\n      <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n      <option value=\"Niue\" title=\"683\">Niue</option>\n      <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n      <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n      <option value=\"Norway\" title=\"47\">Norway</option>\n      <option value=\"Oman\" title=\"968\">Oman</option>\n      <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n      <option value=\"Palau\" title=\"680\">Palau</option>\n      <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n      <option value=\"Panama\" title=\"507\">Panama</option>\n      <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n      <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n      <option value=\"Peru\" title=\"51\">Peru</option>\n      <option value=\"Philippines\" title=\"63\">Philippines</option>\n      <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n      <option value=\"Poland\" title=\"48\">Poland</option>\n      <option value=\"Portugal\" title=\"351\">Portugal</option>\n      <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n      <option value=\"Qatar\" title=\"974\">Qatar</option>\n      <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n      <option value=\"Romania\" title=\"40\">Romania</option>\n      <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n      <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n      <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n      <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n      <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n      <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n      <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n      <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n      <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n      <option value=\"Samoa\" title=\"685\">Samoa</option>\n      <option value=\"San Marino\" title=\"378\">San Marino</option>\n      <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n      <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n      <option value=\"Senegal\" title=\"221\">Senegal</option>\n      <option value=\"Serbia\" title=\"381\">Serbia</option>\n      <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n      <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n      <option value=\"Singapore\" title=\"65\">Singapore</option>\n      <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n      <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n      <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n      <option value=\"Somalia\" title=\"252\">Somalia</option>\n      <option value=\"South Africa\" title=\"27\">South Africa</option>\n      <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n      <option value=\"Spain\" title=\"34\">Spain</option>\n      <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n      <option value=\"Sudan\" title=\"249\">Sudan</option>\n      <option value=\"Suriname\" title=\"597\">Suriname</option>\n      <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n      <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n      <option value=\"Sweden\" title=\"46\">Sweden</option>\n      <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n      <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n      <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n      <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n      <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n      <option value=\"Thailand\" title=\"66\">Thailand</option>\n      <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n      <option value=\"Togo\" title=\"228\">Togo</option>\n      <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n      <option value=\"Tonga\" title=\"676\">Tonga</option>\n      <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n      <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n      <option value=\"Turkey\" title=\"90\">Turkey</option>\n      <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n      <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n      <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n      <option value=\"Uganda\" title=\"256\">Uganda</option>\n      <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n      <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n      <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n      <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n      <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n      <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n      <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n      <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n      <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n      <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n      <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n      <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n      <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n      <option value=\"Yemen\" title=\"967\">Yemen</option>\n      <option value=\"Zambia\" title=\"260\">Zambia</option>\n      <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n    </select>\n  </div>\n  \n  <label for=\"countrycit\">Country of Citizenship</label> \n  <div id=\"countrycitField\">\n    <select id=\"countrycit\" \n    name=\"SFQ-Country_of_Citizenship__c\"\n    required\n    data-msg-required=\"Please select your country of citizenship.\">\n      <option value=\"\" title=\"\">&mdash; Select &mdash;</option>\n      <option value=\"United States\" title=\"1\">United States</option>\n      <option value=\"Afghanistan\" title=\"93\">Afghanistan</option>\n      <option value=\"Akrotiri and Dhekelia\" title=\"357\">Akrotiri and Dhekelia</option>\n      <option value=\"&Aring;land Islands\" title=\"358\">&Aring;land Islands</option>\n      <option value=\"Albania \" title=\"355\">Albania </option>\n      <option value=\"Algeria\" title=\"213\">Algeria</option>\n      <option value=\"American Samoa\" title=\"1 684\">American Samoa</option>\n      <option value=\"Andorra\" title=\"376\">Andorra</option>\n      <option value=\"Angola\" title=\"244\">Angola</option>\n      <option value=\"Anguilla\" title=\"264\">Anguilla</option>\n      <option value=\"Antarctica\" title=\"672\">Antarctica</option>\n      <option value=\"Antigua and Barbuda\" title=\"268\">Antigua and Barbuda</option>\n      <option value=\"Argentina\" title=\"54\">Argentina</option>\n      <option value=\"Armenia\" title=\"374\">Armenia</option>\n      <option value=\"Aruba\" title=\"297\">Aruba</option>\n      <option value=\"Australia\" title=\"61\">Australia</option>\n      <option value=\"Austria\" title=\"43\">Austria</option>\n      <option value=\"Azerbaijan \" title=\"994\">Azerbaijan </option>\n      <option value=\"Bahamas\" title=\"242\">Bahamas</option>\n      <option value=\"Bahrain\" title=\"973\">Bahrain</option>\n      <option value=\"Bangladesh\" title=\"880\">Bangladesh</option>\n      <option value=\"Barbados\" title=\"246\">Barbados</option>\n      <option value=\"Belarus\" title=\"375\">Belarus</option>\n      <option value=\"Belgium\" title=\"32\">Belgium</option>\n      <option value=\"Belize\" title=\"501\">Belize</option>\n      <option value=\"Benin\" title=\"229\">Benin</option>\n      <option value=\"Bermuda\" title=\"441\">Bermuda</option>\n      <option value=\"Bhutan\" title=\"975\">Bhutan</option>\n      <option value=\"Bolivia, Plurinational State of\" title=\"591\">Bolivia, Plurinational State of</option>\n      <option value=\"Bosnia and Herzegovina\" title=\"387\">Bosnia and Herzegovina</option>\n      <option value=\"Botswana\" title=\"267\">Botswana</option>\n      <option value=\"Bouvet Island\" title=\"\">Bouvet Island</option>\n      <option value=\"Brazil\" title=\"55\">Brazil</option>\n      <option value=\"British Indian Ocean Territory\" title=\"246\">British Indian Ocean Territory</option>\n      <option value=\"Brunei Darussalam\" title=\"673\">Brunei Darussalam</option>\n      <option value=\"Bulgaria\" title=\"359\">Bulgaria</option>\n      <option value=\"Burkina Faso\" title=\"226\">Burkina Faso</option>\n      <option value=\"Burundi\" title=\"257\">Burundi</option>\n      <option value=\"Cambodia\" title=\"855\">Cambodia</option>\n      <option value=\"Cameroon\" title=\"237\">Cameroon</option>\n      <option value=\"Canada\" title=\"1\">Canada</option>\n      <option value=\"Cape Verde\" title=\"238\">Cape Verde</option>\n      <option value=\"Cayman Islands\" title=\"345\">Cayman Islands</option>\n      <option value=\"Central African Republic\" title=\"236\">Central African Republic</option>\n      <option value=\"Chad\" title=\"235\">Chad</option>\n      <option value=\"Chile\" title=\"56\">Chile</option>\n      <option value=\"China\" title=\"86\">China</option>\n      <option value=\"Christmas Island\" title=\"61\">Christmas Island</option>\n      <option value=\"Cocos (Keeling) Islands\" title=\"61\">Cocos (Keeling) Islands</option>\n      <option value=\"Colombia\" title=\"57\">Colombia</option>\n      <option value=\"Comoros\" title=\"269\">Comoros</option>\n      <option value=\"Congo\" title=\"242\">Congo</option>\n      <option value=\"Congo, Democratic Republic of the\" title=\"242\">Congo, Democratic Republic of the</option>\n      <option value=\"Cook Islands\" title=\"682\">Cook Islands</option>\n      <option value=\"Costa Rica\" title=\"506\">Costa Rica</option>\n      <option value=\"C&ocirc;te D'Ivoire\" title=\"225\">C&ocirc;te D'Ivoire</option>\n      <option value=\"Croatia\" title=\"285\">Croatia</option>\n      <option value=\"Cuba\" title=\"53\">Cuba</option>\n      <option value=\"Cyprus\" title=\"357\">Cyprus</option>\n      <option value=\"Czech Republic\" title=\"420\">Czech Republic</option>\n      <option value=\"Denmark\" title=\"45\">Denmark</option>\n      <option value=\"Djibouti\" title=\"253\">Djibouti</option>\n      <option value=\"Dominica\" title=\"767\">Dominica</option>\n      <option value=\"Dominican Republic\" title=\"809\">Dominican Republic</option>\n      <option value=\"Ecuador\" title=\"593\">Ecuador</option>\n      <option value=\"Egypt\" title=\"20\">Egypt</option>\n      <option value=\"El Salvador\" title=\"503\">El Salvador</option>\n      <option value=\"Equatorial Guinea\" title=\"240\">Equatorial Guinea</option>\n      <option value=\"Eritrea\" title=\"291\">Eritrea</option>\n      <option value=\"Estonia\" title=\"372\">Estonia</option>\n      <option value=\"Ethiopia\" title=\"251\">Ethiopia</option>\n      <option value=\"Falkland Islands (Malvinas)\" title=\"500\">Falkland Islands (Malvinas)</option>\n      <option value=\"Faroe Islands\" title=\"298\">Faroe Islands</option>\n      <option value=\"Fiji\" title=\"679\">Fiji</option>\n      <option value=\"Finland\" title=\"358\">Finland</option>\n      <option value=\"France\" title=\"33\">France</option>\n      <option value=\"French Guiana\" title=\"594\">French Guiana</option>\n      <option value=\"French Polynesia\" title=\"689\">French Polynesia</option>\n      <option value=\"French Southern Territories\" title=\"689\">French Southern Territories</option>\n      <option value=\"Gabon\" title=\"241\">Gabon</option>\n      <option value=\"Gambia\" title=\"220\">Gambia</option>\n      <option value=\"Georgia\" title=\"995\">Georgia</option>\n      <option value=\"Germany\" title=\"49\">Germany</option>\n      <option value=\"Ghana\" title=\"233\">Ghana</option>\n      <option value=\"Gibraltar\" title=\"350\">Gibraltar</option>\n      <option value=\"Greece\" title=\"30\">Greece</option>\n      <option value=\"Greenland\" title=\"299\">Greenland</option>\n      <option value=\"Grenada\" title=\"473\">Grenada</option>\n      <option value=\"Guadeloupe\" title=\"590\">Guadeloupe</option>\n      <option value=\"Guam\" title=\"671\">Guam</option>\n      <option value=\"Guatemala\" title=\"502\">Guatemala</option>\n      <option value=\"Guernsey\" title=\"44\">Guernsey</option>\n      <option value=\"Guinea\" title=\"594\">Guinea</option>\n      <option value=\"Guinea-bissau\" title=\"245\">Guinea-bissau</option>\n      <option value=\"Guyana\" title=\"592\">Guyana</option>\n      <option value=\"Haiti\" title=\"509\">Haiti</option>\n      <option value=\"Heard Island and Mcdonald Islands\" title=\"672\">Heard Island and Mcdonald Islands</option>\n      <option value=\"Holy See (Vatican City State)\" title=\"39\">Holy See (Vatican City State)</option>\n      <option value=\"Honduras\" title=\"504\">Honduras</option>\n      <option value=\"Hong Kong\" title=\"852\">Hong Kong</option>\n      <option value=\"Hungary\" title=\"36\">Hungary</option>\n      <option value=\"Iceland\" title=\"354\">Iceland</option>\n      <option value=\"India\" title=\"91\">India</option>\n      <option value=\"Indonesia\" title=\"62\">Indonesia</option>\n      <option value=\"Iran, Islamic Republic of\" title=\"98\">Iran, Islamic Republic of</option>\n      <option value=\"Iraq\" title=\"964\">Iraq</option>\n      <option value=\"Ireland\" title=\"353\">Ireland</option>\n      <option value=\"Isle of Man\" title=\"44\">Isle of Man</option>\n      <option value=\"Israel\" title=\"972\">Israel</option>\n      <option value=\"Italy\" title=\"39\">Italy</option>\n      <option value=\"Jamaica\" title=\"876\">Jamaica</option>\n      <option value=\"Japan\" title=\"81\">Japan</option>\n      <option value=\"Jersey\" title=\"44\">Jersey</option>\n      <option value=\"Jordan\" title=\"962\">Jordan</option>\n      <option value=\"Kazakhstan\" title=\"7\">Kazakhstan</option>\n      <option value=\"Kenya\" title=\"254\">Kenya</option>\n      <option value=\"Kiribati\" title=\"686\">Kiribati</option>\n      <option value=\"Korea, Democratic People's Republic of\" title=\"850\">Korea, Democratic People's Republic of</option>\n      <option value=\"Korea, Republic of\" title=\"82\">Korea, Republic of</option>\n      <option value=\"Kuwait\" title=\"965\">Kuwait</option>\n      <option value=\"Kyrgyzstan\" title=\"996\">Kyrgyzstan</option>\n      <option value=\"Lao People's Democratic Republic\" title=\"856\">Lao People's Democratic Republic</option>\n      <option value=\"Latvia\" title=\"371\">Latvia</option>\n      <option value=\"Lebanon\" title=\"961\">Lebanon</option>\n      <option value=\"Lesotho\" title=\"266\">Lesotho</option>\n      <option value=\"Liberia\" title=\"231\">Liberia</option>\n      <option value=\"Libyan Arab Jamahiriya\" title=\"218\">Libyan Arab Jamahiriya</option>\n      <option value=\"Liechtenstein\" title=\"423\">Liechtenstein</option>\n      <option value=\"Lithuania\" title=\"370\">Lithuania</option>\n      <option value=\"Luxembourg\" title=\"352\">Luxembourg</option>\n      <option value=\"Macao\" title=\"853\">Macao</option>\n      <option value=\"Macedonia, The Former Yugoslav Republic of\" title=\"389\">Macedonia, The Former Yugoslav Republic of</option>\n      <option value=\"Madagascar\" title=\"261\">Madagascar</option>\n      <option value=\"Malawi\" title=\"265\">Malawi</option>\n      <option value=\"Malaysia\" title=\"60\">Malaysia</option>\n      <option value=\"Maldives\" title=\"960\">Maldives</option>\n      <option value=\"Mali\" title=\"223\">Mali</option>\n      <option value=\"Malta\" title=\"356\">Malta</option>\n      <option value=\"Marshall Islands\" title=\"692\">Marshall Islands</option>\n      <option value=\"Martinique\" title=\"596\">Martinique</option>\n      <option value=\"Mauritania\" title=\"222\">Mauritania</option>\n      <option value=\"Mauritius\" title=\"230\">Mauritius</option>\n      <option value=\"Mayotte\" title=\"269\">Mayotte</option>\n      <option value=\"Mexico\" title=\"52\">Mexico</option>\n      <option value=\"Micronesia, Federated States of\" title=\"691\">Micronesia, Federated States of</option>\n      <option value=\"Moldova, Republic of\" title=\"373\">Moldova, Republic of</option>\n      <option value=\"Monaco\" title=\"377\">Monaco</option>\n      <option value=\"Mongolia\" title=\"976\">Mongolia</option>\n      <option value=\"Montenegro\" title=\"382\">Montenegro</option>\n      <option value=\"Montserrat\" title=\"664\">Montserrat</option>\n      <option value=\"Morocco\" title=\"212\">Morocco</option>\n      <option value=\"Mozambique\" title=\"258\">Mozambique</option>\n      <option value=\"Myanmar\" title=\"95\">Myanmar</option>\n      <option value=\"Namibia\" title=\"264\">Namibia</option>\n      <option value=\"Nauru\" title=\"674\">Nauru</option>\n      <option value=\"Nepal\" title=\"977\">Nepal</option>\n      <option value=\"Netherlands\" title=\"31\">Netherlands</option>\n      <option value=\"Netherlands Antilles\" title=\"599\">Netherlands Antilles</option>\n      <option value=\"New Caledonia\" title=\"687\">New Caledonia</option>\n      <option value=\"New Zealand\" title=\"64\">New Zealand</option>\n      <option value=\"Nicaragua\" title=\"505\">Nicaragua</option>\n      <option value=\"Niger\" title=\"227\">Niger</option>\n      <option value=\"Nigeria\" title=\"234\">Nigeria</option>\n      <option value=\"Niue\" title=\"683\">Niue</option>\n      <option value=\"Norfolk Island\" title=\"672\">Norfolk Island</option>\n      <option value=\"Northern Mariana Islands\" title=\"1 670\">Northern Mariana Islands</option>\n      <option value=\"Norway\" title=\"47\">Norway</option>\n      <option value=\"Oman\" title=\"968\">Oman</option>\n      <option value=\"Pakistan\" title=\"92\">Pakistan</option>\n      <option value=\"Palau\" title=\"680\">Palau</option>\n      <option value=\"Palestinian Territory, Occupied\" title=\"970\">Palestinian Territory, Occupied</option>\n      <option value=\"Panama\" title=\"507\">Panama</option>\n      <option value=\"Papua New Guinea\" title=\"675\">Papua New Guinea</option>\n      <option value=\"Paraguay\" title=\"595\">Paraguay</option>\n      <option value=\"Peru\" title=\"51\">Peru</option>\n      <option value=\"Philippines\" title=\"63\">Philippines</option>\n      <option value=\"Pitcairn\" title=\"64\">Pitcairn</option>\n      <option value=\"Poland\" title=\"48\">Poland</option>\n      <option value=\"Portugal\" title=\"351\">Portugal</option>\n      <option value=\"Puerto Rico\" title=\"787\">Puerto Rico</option>\n      <option value=\"Qatar\" title=\"974\">Qatar</option>\n      <option value=\"R&eacute;union\" title=\"262\">R&eacute;union</option>\n      <option value=\"Romania\" title=\"40\">Romania</option>\n      <option value=\"Russian Federation\" title=\"7\">Russian Federation</option>\n      <option value=\"Rwanda\" title=\"250\">Rwanda</option>\n      <option value=\"Saint Barth&eacute;lemy\" title=\"590\">Saint Barth&eacute;lemy</option>\n      <option value=\"Saint Helena, Ascension and Tristan Da Cunha\" title=\"290\">Saint Helena, Ascension and Tristan Da Cunha</option>\n      <option value=\"Saint Kitts and Nevis\" title=\"869\">Saint Kitts and Nevis</option>\n      <option value=\"Saint Lucia\" title=\"758\">Saint Lucia</option>\n      <option value=\"Saint Martin\" title=\"599\">Saint Martin</option>\n      <option value=\"Saint Pierre and Miquelon\" title=\"508\">Saint Pierre and Miquelon</option>\n      <option value=\"Saint Vincent and The Grenadines\" title=\"784\">Saint Vincent and The Grenadines</option>\n      <option value=\"Samoa\" title=\"685\">Samoa</option>\n      <option value=\"San Marino\" title=\"378\">San Marino</option>\n      <option value=\"Sao Tome and Principe\" title=\"239\">Sao Tome and Principe</option>\n      <option value=\"Saudi Arabia\" title=\"966\">Saudi Arabia</option>\n      <option value=\"Senegal\" title=\"221\">Senegal</option>\n      <option value=\"Serbia\" title=\"381\">Serbia</option>\n      <option value=\"Seychelles\" title=\"248\">Seychelles</option>\n      <option value=\"Sierra Leone\" title=\"232\">Sierra Leone</option>\n      <option value=\"Singapore\" title=\"65\">Singapore</option>\n      <option value=\"Slovakia\" title=\"421\">Slovakia</option>\n      <option value=\"Slovenia\" title=\"386\">Slovenia</option>\n      <option value=\"Solomon Islands\" title=\"677\">Solomon Islands</option>\n      <option value=\"Somalia\" title=\"252\">Somalia</option>\n      <option value=\"South Africa\" title=\"27\">South Africa</option>\n      <option value=\"South Georgia and The South Sandwich Islands\" title=\"500\">South Georgia and The South Sandwich Islands</option>\n      <option value=\"Spain\" title=\"34\">Spain</option>\n      <option value=\"Sri Lanka\" title=\"94\">Sri Lanka</option>\n      <option value=\"Sudan\" title=\"249\">Sudan</option>\n      <option value=\"Suriname\" title=\"597\">Suriname</option>\n      <option value=\"Svalbard and Jan Mayen\" title=\"47\">Svalbard and Jan Mayen</option>\n      <option value=\"Swaziland\" title=\"268\">Swaziland</option>\n      <option value=\"Sweden\" title=\"46\">Sweden</option>\n      <option value=\"Switzerland\" title=\"41\">Switzerland</option>\n      <option value=\"Syrian Arab Republic\" title=\"963\">Syrian Arab Republic</option>\n      <option value=\"Taiwan\" title=\"886\">Taiwan</option>\n      <option value=\"Tajikistan\" title=\"992\">Tajikistan</option>\n      <option value=\"Tanzania, United Republic of\" title=\"255\">Tanzania, United Republic of</option>\n      <option value=\"Thailand\" title=\"66\">Thailand</option>\n      <option value=\"Timor-leste\" title=\"670\">Timor-leste</option>\n      <option value=\"Togo\" title=\"228\">Togo</option>\n      <option value=\"Tokelau\" title=\"690\">Tokelau</option>\n      <option value=\"Tonga\" title=\"676\">Tonga</option>\n      <option value=\"Trinidad and Tobago\" title=\"868\">Trinidad and Tobago</option>\n      <option value=\"Tunisia\" title=\"216\">Tunisia</option>\n      <option value=\"Turkey\" title=\"90\">Turkey</option>\n      <option value=\"Turkmenistan\" title=\"993\">Turkmenistan</option>\n      <option value=\"Turks and Caicos Islands\" title=\"649\">Turks and Caicos Islands</option>\n      <option value=\"Tuvalu\" title=\"688\">Tuvalu</option>\n      <option value=\"Uganda\" title=\"256\">Uganda</option>\n      <option value=\"Ukraine\" title=\"380\">Ukraine</option>\n      <option value=\"United Arab Emirates\" title=\"971\">United Arab Emirates</option>\n      <option value=\"United Kingdom\" title=\"44\">United Kingdom</option>\n      <option value=\"United States Minor Outlying Islands\" title=\"1\">United States Minor Outlying Islands</option>\n      <option value=\"Uruguay\" title=\"598\">Uruguay</option>\n      <option value=\"Uzbekistan\" title=\"998\">Uzbekistan</option>\n      <option value=\"Vanuatu\" title=\"678\">Vanuatu</option>\n      <option value=\"Venezuela, Bolivarian Republic of\" title=\"58\">Venezuela, Bolivarian Republic of</option>\n      <option value=\"Viet Nam\" title=\"84\">Viet Nam</option>\n      <option value=\"Virgin Islands, British\" title=\"284\">Virgin Islands, British</option>\n      <option value=\"Virgin Islands, U.S.\" title=\"340\">Virgin Islands, U.S.</option>\n      <option value=\"Wallis and Futuna\" title=\"681\">Wallis and Futuna</option>\n      <option value=\"Western Sahara\" title=\"212\">Western Sahara</option>\n      <option value=\"Yemen\" title=\"967\">Yemen</option>\n      <option value=\"Zambia\" title=\"260\">Zambia</option>\n      <option value=\"Zimbabwe\" title=\"263\">Zimbabwe</option>\n    </select>\n  </div>\n\n  <label for=\"phone\">Phone</label>\n  <input id=\"phone\" \n   name=\"phone\" \n   size=\"20\" \n   type=\"tel\" \n   required\n   data-msg-required=\"Please provide your phone number.\"/>\n\n  <label for=\"skype\">Skype Name (not required)</label>\n  <input id=\"skype\" \n   name=\"SFQ-Skype_Address__c\" \n   size=\"20\" \n   type=\"text\" />\n\n  <input type=\"hidden\" id=\"country_code\" name=\"country_code\", value=\"\">\n</div>";

  LeadForm.BaseModalWidget = (function() {
    var $;

    $ = LeadForm.jQuery;

    function BaseModalWidget(name, element, config) {
      var _this = this;
      this.config = config;
      this.modal = new LeadForm.Form(this.config);
      element = $(element);
      element.append(LeadForm.Forms.Templates[name]);
      element.find("." + name).find(".show-form").click(function(event) {
        event.preventDefault();
        _this.modal.show();
        return $("html, body").animate({
          scrollTop: 0
        }, "slow");
      });
    }

    return BaseModalWidget;

  })();

  LeadForm.Form = (function() {
    var $, Forms, Requests, Utils, formIsValid, programTemplateName;

    $ = LeadForm.jQuery;

    Forms = LeadForm.Forms;

    Requests = LeadForm.Requests;

    Utils = LeadForm.Utils;

    Form.prototype.defaultConfig = {
      target: 'body',
      template: 'modal'
    };

    function Form(config) {
      this.error = __bind(this.error, this);
      this.success = __bind(this.success, this);
      var subText,
        _this = this;
      this.config = $.extend({}, this.defaultConfig, config, Utils.QueryParameters.parsedParameters());
      this.backdrop = $("<div class='modal-backdrop fade in'></div>");
      this.dialog = this.insertDialog();
      this.steps = this.insertSteps();
      Utils.SetFields.fromConfig(this.dialog, this.config);
      subText = this.dialog.find('#intro_sub_text');
      if (!subText.text()) {
        subText.remove();
      }
      this.dialog.find('.close').click(function() {
        _this.steps.showOnlyFirstStep();
        return _this.hide();
      });
      this.theNextStepButton().click(function(event) {
        event.preventDefault();
        if (formIsValid(_this.theForm())) {
          return _this.steps.showNextStep();
        }
      });
    }

    Form.prototype.theNextStepButton = function() {
      return this.dialog.find('.lead-form-next-step');
    };

    Form.prototype.insertDialog = function() {
      var template;
      template = $(Forms.Templates[this.config.template]);
      $(this.config.target).append(template);
      return $.extend(template.find('#lead-form-dialog'), Utils.ShowHide);
    };

    Form.prototype.theForm = function() {
      return this.dialog.find('form');
    };

    Form.prototype.insertSteps = function() {
      var lastStepFn, steps, stepsTemplate, submitForm, _name, _ref2,
        _this = this;
      lastStepFn = function() {
        return _this.theNextStepButton().text('Submit');
      };
      submitForm = function() {
        return Requests.SubmitToUrl.submit(_this.formData(), _this.config.apiUrl, _this.success, _this.error);
      };
      stepsTemplate = LeadForm.Programs[programTemplateName(this.config)];
      if (!stepsTemplate) {
        if (typeof console !== "undefined" && console !== null) {
          console.error("No template for " + (programTemplateName(this.config)) + " found.");
        }
      }
      steps = new Forms.Steps(this.dialog, stepsTemplate, lastStepFn, submitForm);
      if ((_ref2 = LeadForm.Programs) != null) {
        if (typeof _ref2[_name = this.config.program.toLowerCase()] === "function") {
          _ref2[_name](this.theForm(), this.config);
        }
      }
      return steps;
    };

    Form.prototype.formData = function() {
      this.theNextStepButton().addClass('disabled');
      return Forms.FormDataCollector.collectFrom(this.theForm());
    };

    programTemplateName = function(config) {
      return ("" + config.program + ".form").toLowerCase();
    };

    formIsValid = function(form) {
      var Validations;
      Validations = LeadForm.Forms.Validations;
      form.validate({
        ignoreTitle: true,
        rules: {
          zipcode: {
            required: {
              depends: Validations.dependsOnUS
            },
            minlength: {
              param: 5,
              depends: Validations.dependsOnUS
            }
          },
          state: {
            required: {
              depends: Validations.dependsOnUS
            }
          }
        }
      });
      return form.valid();
    };

    Form.prototype.show = function() {
      $('body').append(this.backdrop);
      return this.dialog.show();
    };

    Form.prototype.hide = function() {
      this.backdrop.remove();
      return this.dialog.hide();
    };

    Form.prototype.success = function(response) {
      var account, analyticsCallback, baseUrl, info, label, _ref2,
        _this = this;
      analyticsCallback = function(err, batch) {
        if (!err) {
          return _this.redirectToLocation(_this.constructUrl(baseUrl, info));
        }
      };
      this.onRequestComplete();
      account = (_ref2 = response.account) != null ? _ref2 : {};
      this.config.portal_intensity = account.portal_intensity;
      baseUrl = Utils.ThankYouChooser(this.config);
      label = this.config.lead_source === "web" ? "organic" : "paid";
      info = $.extend({}, account, {
        lead_source: this.config.lead_source,
        label: label
      });
      if (window.analytics && !Utils.is_empty(account)) {
        return window.analytics.track("Lead Form Submit", $.extend({}, info, {
          "event_id": "leadform.success.submit"
        }), analyticsCallback);
      } else {
        return this.redirectToLocation(this.constructUrl(baseUrl, info));
      }
    };

    Form.prototype.error = function(response) {
      return this.onRequestComplete(response.message);
    };

    Form.prototype.onRequestComplete = function(message) {
      if (message == null) {
        message = '';
      }
      this.theNextStepButton().removeClass('disabled');
      return this.dialog.find(".form-error").text(message);
    };

    Form.prototype.constructUrl = function(baseUrl, accountInfo) {
      var separator;
      if (accountInfo == null) {
        accountInfo = {};
      }
      separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
      return ("" + baseUrl + separator) + $.param({
        ref_code: accountInfo.ref_code,
        type: accountInfo.type,
        lead_source: accountInfo.lead_source
      });
    };

    Form.prototype.redirectToLocation = function(location) {
      return window.location = location;
    };

    return Form;

  })();

  LeadForm.Forms.FormDataCollector = (function() {
    function FormDataCollector() {}

    FormDataCollector.collectFrom = function(form) {
      var data, reduceFn;
      reduceFn = function(dict, obj) {
        dict[obj.name] = obj.value;
        return dict;
      };
      data = form.serializeArray().reduce(reduceFn, {});
      return data;
    };

    return FormDataCollector;

  })();

  LeadForm.Forms.ProgressMarkers = (function() {
    var $, initMarkers, makeMarkers, makeOneMarker, progressMarker, removeMarkers, setProgressBar;

    $ = LeadForm.jQuery;

    function ProgressMarkers(scope, numSteps) {
      this.scope = scope;
      initMarkers(this.scope, numSteps);
    }

    ProgressMarkers.prototype.updateMarker = function(currentStep, nextStep) {
      progressMarker(currentStep, this.scope).deactivate();
      progressMarker(nextStep, this.scope).activate();
      return setProgressBar(nextStep.data("percentage"), this.scope);
    };

    initMarkers = function(scope, numSteps) {
      if (numSteps < 2) {
        return removeMarkers(scope);
      } else {
        return makeMarkers(scope, numSteps);
      }
    };

    removeMarkers = function(scope) {
      scope.find('.progress').remove();
      return scope.find('.step-markers').remove();
    };

    makeMarkers = function(scope, numSteps) {
      var i, markerLocation, _i, _results;
      markerLocation = scope.find('.step-markers .progress-markers');
      markerLocation.html('');
      _results = [];
      for (i = _i = 0; 0 <= numSteps ? _i < numSteps : _i > numSteps; i = 0 <= numSteps ? ++_i : --_i) {
        _results.push(markerLocation.append(makeOneMarker(i)));
      }
      return _results;
    };

    makeOneMarker = function(idx) {
      var klass;
      klass = "s" + idx;
      if (idx === 0) {
        klass += " active-step";
      }
      return $("<span class='" + klass + "'>" + (idx + 1) + "</span>");
    };

    progressMarker = function(step, scope) {
      var marker;
      marker = scope.find(".progress-markers span")[step.stepNumber];
      return $.extend(marker, {
        activate: function() {
          if (marker) {
            return $(marker).addClass("active-step");
          }
        },
        deactivate: function() {
          if (marker) {
            return $(marker).removeClass("active-step");
          }
        }
      });
    };

    setProgressBar = function(percentage, scope) {
      scope.find(".progress-percentage").text("" + percentage + "% Complete");
      return scope.find(".progress .bar").css({
        width: percentage + "%"
      });
    };

    return ProgressMarkers;

  })();

  LeadForm.Forms.Steps = (function() {
    var $, extend, getCurrentStep, stepNumber;

    $ = LeadForm.jQuery;

    function Steps(location, formHtml, lastStepFn, submitForm) {
      var numSteps;
      this.lastStepFn = lastStepFn;
      this.submitForm = submitForm;
      this.steps = location.find('.lead-form-steps').append(formHtml);
      numSteps = this.steps.find('.lead-form-step').length;
      this.progressMarkers = new LeadForm.Forms.ProgressMarkers(location, numSteps);
      if (this.lastStepFn && numSteps < 2) {
        this.lastStepFn();
      }
      this.showOnlyFirstStep();
    }

    Steps.prototype.showOnlyFirstStep = function() {
      this.steps.find('.lead-form-step').addClass('hide');
      return this.steps.find('.lead-form-step-0').removeClass('hide');
    };

    Steps.prototype.showNextStep = function() {
      var currentStep, nextStep;
      currentStep = getCurrentStep(this.steps);
      if (currentStep.hasNext) {
        nextStep = currentStep.nextStep;
        this.progressMarkers.updateMarker(currentStep, nextStep);
        currentStep.hide();
        nextStep.show();
        if (!nextStep.hasNext) {
          return this.lastStepFn();
        }
      } else {
        return this.submitForm();
      }
    };

    getCurrentStep = function(steps) {
      var currentStep, currentStepNumber, nextStep;
      currentStep = steps.find(".lead-form-step:not(.hide)");
      currentStepNumber = stepNumber(currentStep);
      nextStep = currentStep.next();
      extend(nextStep, {
        stepNumber: currentStepNumber + 1,
        hasNext: nextStep.next().length === 1
      });
      return extend(currentStep, {
        stepNumber: currentStepNumber,
        nextStep: nextStep,
        hasNext: nextStep.length === 1
      });
    };

    extend = function(step, data) {
      return $.extend(step, data, LeadForm.Utils.ShowHide);
    };

    stepNumber = function(step) {
      var match;
      match = /\d/.exec(step.attr("class"));
      if (match) {
        return parseInt(match[0], 10);
      } else {
        return -1;
      }
    };

    return Steps;

  })();

  LeadForm.HomepageWidget = (function(_super) {
    var $;

    __extends(HomepageWidget, _super);

    $ = LeadForm.jQuery;

    function HomepageWidget(element, config) {
      var clone, name, setField, step,
        _this = this;
      this.config = config;
      setField = LeadForm.Utils.SetFields.set;
      name = 'lead_forms_hp_widget';
      HomepageWidget.__super__.constructor.call(this, name, element, this.config);
      step = this.modal.dialog.find(".lead-form-step-0");
      clone = step.clone();
      element = $(element);
      element.find("." + name).find(".lead-form-step").append(clone);
      element.find("." + name).find('.show-form').click(function(event) {
        var i, _i, _len, _ref2;
        _ref2 = clone.find("select");
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          i = _ref2[_i];
          setField(step.find("select"), $(i).val());
        }
        if (step.find('select').val() !== '') {
          return _this.modal.steps.showNextStep();
        }
      });
      LeadForm.Utils.SetFields.fromConfig(element, config);
    }

    return HomepageWidget;

  })(LeadForm.BaseModalWidget);

  LeadForm.InlineWidget = (function() {
    var $;

    $ = LeadForm.jQuery;

    function InlineWidget(element, config) {
      config.target = element;
      config.template = 'inline';
      this.inline = new LeadForm.Form(config);
    }

    return InlineWidget;

  })();

  LeadForm.ModallinkWidget = (function(_super) {
    var $;

    __extends(ModallinkWidget, _super);

    $ = LeadForm.jQuery;

    function ModallinkWidget(element, config) {
      this.config = config;
      ModallinkWidget.__super__.constructor.call(this, 'post', element, this.config);
    }

    return ModallinkWidget;

  })(LeadForm.BaseModalWidget);

  /*
  Polyfill for Array.reduce (for IE8)
  */


  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback, opt_initialValue) {
      var index, isValueSet, length, value, _i;
      if (!this) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function');
      }
      length = this.length >>> 0;
      isValueSet = false;
      if (1 < arguments.length) {
        value = opt_initialValue;
        isValueSet = true;
      }
      for (index = _i = 0; 0 <= length ? _i < length : _i > length; index = 0 <= length ? ++_i : --_i) {
        if (this.hasOwnProperty(index)) {
          if (isValueSet) {
            value = callback(value, this[index], index, this);
          } else {
            value = this[index];
            isValueSet = true;
          }
        }
      }
      if (!isValueSet) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      return value;
    };
  }

  /*
  Polyfill for String.trim (for IE8)
  */


  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  LeadForm.Programs['nu-mac'] = function(element) {
    return LeadForm.Programs.Utils.linkCountryAndCountryCode(element);
  };

  LeadForm.Programs['smu-mds'] = function(element) {
    return LeadForm.Programs.Utils.linkCountryAndCountryCode(element);
  };

  LeadForm.Programs['syr-mba'] = function(element, config) {
    reactToDegreeQuestion(element);
    setDegreeInterest(element, config);
    return LeadForm.Programs.Utils.linkCountryAndCountryCode(element);
  };

  setDegreeInterest = function(element, config) {
    var programModifier, setupVariant;
    programModifier = config.program_modifier;
    setupVariant = function(degree) {
      var degreeField, degreeWrapper, experienceWrapper, formStepOne, setField;
      setField = LeadForm.Utils.SetFields.set;
      degreeField = element.find("#degreeInterest");
      degreeWrapper = element.find("#degreeWrapper");
      experienceWrapper = element.find("#experienceWrapper");
      formStepOne = element.find(".lead-form-step-0");
      setField(degreeField, degree);
      degreeWrapper.attr('class', 'hide');
      experienceWrapper.remove();
      return formStepOne.append(experienceWrapper);
    };
    if (programModifier === 'degree-interest=mba') {
      return setupVariant("MBA");
    } else if (programModifier === 'degree-interest=msa') {
      return setupVariant("MSA");
    }
  };

  reactToDegreeQuestion = function(element) {
    var degreeField, optInCheckBox, optInWrapper, react;
    degreeField = element.find("#degreeInterest");
    optInWrapper = element.find("#optInWrapper");
    optInCheckBox = optInWrapper.find("#partnerOptIn");
    react = function() {
      if (degreeField.val() === "MSA") {
        optInWrapper.attr("class", "hide");
        return optInCheckBox.prop('checked', false);
      }
    };
    return degreeField.change(react);
  };

  LeadForm.Programs['ucb-mids'] = function(element, config) {
    LeadForm.Programs.Utils.linkCountryCodeAndCountryName(element);
    return changePortalIntensity(element, config);
  };

  changePortalIntensity = function(element, config) {
    var setField;
    setField = LeadForm.Utils.SetFields.set;
    LeadForm.jQuery(function() {
      var portalIntensity, splashCreative;
      portalIntensity = element.find('#portal_intensity');
      splashCreative = element.find('#splash_creative').val().toLowerCase();
      if (splashCreative.indexOf('max') !== -1) {
        return setField(portalIntensity, 'max');
      }
    });
    return LeadForm.Utils.ThankYouChooser = function(config) {
      if (config.altThankYouUrl && config.portal_intensity === 'max') {
        return config.altThankYouUrl;
      } else {
        return config.thankYouUrl;
      }
    };
  };

  LeadForm.Programs['unc-mpa'] = function(element, config) {
    LeadForm.Programs.Utils.linkCountryCodeAndCountryName(element);
    return tweakInlineForm(element, config);
  };

  tweakInlineForm = function(element, config) {
    var setField;
    setField = LeadForm.Utils.SetFields.set;
    if (config.template === 'inline') {
      element.find('.progress').remove();
    }
    LeadForm.jQuery(function() {
      var portalIntensity, splashCreative;
      portalIntensity = element.find('#portal_intensity');
      splashCreative = element.find('#splash_creative').val();
      if (splashCreative === 'max') {
        return setField(portalIntensity, 'max');
      }
    });
    return LeadForm.Utils.ThankYouChooser = function(config) {
      if (config.altThankYouUrl && config.portal_intensity === 'max') {
        return config.altThankYouUrl;
      } else {
        return config.thankYouUrl;
      }
    };
  };

  LeadForm.Programs['usc-mat'] = function(element) {
    reactToTeacherQuestion(element);
    return LeadForm.Programs.Utils.linkCountryCodeAndCountryName(element);
  };

  reactToTeacherQuestion = function(element) {
    var degreeInterestField, degreeSelect, isTeacherField, react;
    isTeacherField = element.find('#teacher');
    degreeInterestField = element.find('#degreeInterestField');
    degreeSelect = degreeInterestField.find('select');
    react = function() {
      if (isTeacherField.val() === "No") {
        return degreeSelect.find("option[value='ME in Teacher Leadership']").remove();
      }
    };
    return isTeacherField.change(react);
  };

  Utils = LeadForm.Programs.Utils;

  Utils.linkCountryCodeAndCountryName = function(element) {
    var codeField, extractCountryName, nameField, setField, update;
    setField = LeadForm.Utils.SetFields.set;
    codeField = element.find('#country_code');
    nameField = element.find('#country_name');
    update = function() {
      var selectedCountry;
      selectedCountry = codeField.find('option:selected').text();
      return setField(nameField, extractCountryName(selectedCountry));
    };
    extractCountryName = function(countryLine) {
      return countryLine.split('(').slice(0, -1).join('(').trim();
    };
    return codeField.change(update);
  };

  Utils.linkCountryAndCountryCode = function(element) {
    var countryField, setField, update;
    setField = LeadForm.Utils.SetFields.set;
    countryField = element.find('#country');
    update = function() {
      var country_code;
      country_code = countryField.find('option:selected').attr('title');
      return setField(element.find('#country_code'), country_code);
    };
    return countryField.change(update);
  };

  LeadForm.Programs['wu-llm'] = function(element) {
    reactToHasDegreeQuestion(element);
    return LeadForm.Programs.Utils.linkCountryAndCountryCode(element);
  };

  reactToHasDegreeQuestion = function(element) {
    var containingDiv, hasDegreeField, programField, programSelect, react, setField;
    setField = LeadForm.Utils.SetFields.set;
    hasDegreeField = element.find('#hasDegree');
    programField = element.find('#programField');
    containingDiv = programField.parent();
    programSelect = programField.find('select');
    react = function() {
      if (hasDegreeField.val() === "No") {
        containingDiv.addClass('hide');
        programSelect.append("<option value='MLS'></option>");
        return setField(programSelect, 'MLS');
      } else {
        programField.parent().removeClass('hide');
        setField(programSelect, '');
        return programSelect.find("option[value='MLS']").remove();
      }
    };
    return hasDegreeField.change(react);
  };

  LeadForm.Requests.CorsRequest = (function() {
    var $, parseResponseJSON;

    $ = LeadForm.jQuery;

    function CorsRequest(submittedData, url, successFn, errorFn) {
      this.submit = function() {
        return $.ajax({
          type: 'POST',
          contentType: "application/json",
          url: url,
          dataType: 'text',
          data: JSON.stringify(submittedData),
          success: function(jqXHR) {
            return successFn(parseResponseJSON(jqXHR));
          },
          error: function(jqXHR) {
            return errorFn(parseResponseJSON(jqXHR));
          }
        });
      };
    }

    parseResponseJSON = function(jqXHR) {
      var SyntaxError, response, _ref2;
      try {
        response = JSON.parse((_ref2 = jqXHR.responseText) != null ? _ref2 : jqXHR);
      } catch (_error) {
        SyntaxError = _error;
        response = {
          code: 500,
          message: "An error occurred while trying to " + "communicate with the server. Try again later.",
          type: "error"
        };
      }
      if (response['message'] && "[" === response['message'][0]) {
        response.message = JSON.parse(response['message']);
      }
      return response;
    };

    return CorsRequest;

  })();

  LeadForm.Requests.CorsSupport = (function() {
    function CorsSupport() {}

    CorsSupport.supportType = function() {
      var error;
      try {
        if ((typeof XMLHttpRequest !== "undefined") && ((new XMLHttpRequest()).withCredentials != null)) {
          return "XHR";
        } else if (typeof XDomainRequest !== "undefined") {
          return "XDR";
        }
      } catch (_error) {
        error = _error;
        return "NONE";
      }
      return "NONE";
    };

    return CorsSupport;

  })();

  LeadForm.Requests.NonCorsRequest = (function() {
    var $, buildRequestUrl;

    $ = LeadForm.jQuery;

    function NonCorsRequest(data, url, success) {
      window.jsonpCallback = success;
      this.requestUrl = buildRequestUrl(url, data);
    }

    NonCorsRequest.prototype.submit = function() {
      return $.getScript(this.requestUrl);
    };

    buildRequestUrl = function(url, data) {
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
      return "" + url + "-jsonp?callback=jsonpCallback&" + ($.param(data));
    };

    return NonCorsRequest;

  })();

  LeadForm.Requests.SubmitToUrl = (function() {
    function SubmitToUrl() {}

    SubmitToUrl.submit = function(submittedData, url, successFn, errorFn) {
      var requestObj;
      requestObj = void 0;
      if (LeadForm.Requests.CorsSupport.supportType() === 'XHR') {
        requestObj = new LeadForm.Requests.CorsRequest(submittedData, url, successFn, errorFn);
      } else {
        requestObj = new LeadForm.Requests.NonCorsRequest(submittedData, url, successFn);
      }
      return requestObj.submit();
    };

    return SubmitToUrl;

  })();

  LeadForm.ShareboxWidget = (function(_super) {
    var $;

    __extends(ShareboxWidget, _super);

    $ = LeadForm.jQuery;

    function ShareboxWidget(element, config) {
      var _ref2;
      this.config = config;
      ShareboxWidget.__super__.constructor.call(this, 'lead_forms_sharebox_widget', element, this.config);
      this.config.button_background = (_ref2 = this.config.button_background) != null ? _ref2 : 'black';
      $(element).find('.show-form').css({
        'background-color': this.config.button_background
      });
    }

    return ShareboxWidget;

  })(LeadForm.BaseModalWidget);

  LeadForm.Utils.is_empty = function(obj) {
    var key;
    if ((obj == null) || obj.length === 0) {
      return true;
    }
    if ((obj.length != null) && obj.length > 0) {
      return false;
    }
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  };

  LeadForm.Utils.QueryParameters = (function() {
    function QueryParameters() {}

    QueryParameters.parsedParameters = function() {
      var item, items, overrideFn, overrides, reduceFn, searchString, splitNameFromValue;
      searchString = this.rawParameters();
      if (searchString.length === 0) {
        return {};
      }
      overrides = {
        's': 'lead_source'
      };
      overrideFn = function(v) {
        var _ref2;
        return (_ref2 = overrides[v]) != null ? _ref2 : v;
      };
      splitNameFromValue = function(s) {
        var name, valueParts, _ref2;
        _ref2 = item.split('='), name = _ref2[0], valueParts = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        return [name, valueParts.join('=')];
      };
      reduceFn = function(acc, nameAndValue) {
        var name, value;
        name = nameAndValue[0], value = nameAndValue[1];
        acc[overrideFn(name)] = value;
        return acc;
      };
      items = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = searchString.slice(1).split('&');
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          item = _ref2[_i];
          _results.push(splitNameFromValue(item));
        }
        return _results;
      })();
      return items.reduce(reduceFn, {});
    };

    QueryParameters.rawParameters = function() {
      return window.location.search;
    };

    return QueryParameters;

  })();

  LeadForm.Utils.SetFields = (function() {
    var _find, _set;

    function SetFields() {}

    SetFields.fromConfig = function(element, config) {
      var k, v, _results;
      _results = [];
      for (k in config) {
        v = config[k];
        _results.push(_set(_find(element, k), v));
      }
      return _results;
    };

    SetFields.set = function(element, value) {
      return _set(element, value);
    };

    _find = function(element, id) {
      return element.find("#" + id);
    };

    _set = function(f, v) {
      if (f.length === 0) {
        return;
      }
      if (f.is('input') || f.is('select')) {
        f.val(v);
      } else {
        f.text(v);
      }
      return f.change();
    };

    return SetFields;

  })();

  LeadForm.Utils.ShowHide = {
    show: function() {
      return LeadForm.jQuery(this).removeClass("hide");
    },
    hide: function() {
      return LeadForm.jQuery(this).addClass("hide");
    }
  };

  LeadForm.Utils.ThankYouChooser = function(config) {
    return config.thankYouUrl;
  };

  Validations = LeadForm.Forms.Validations;

  Validations.dependsOnUS = function() {
    var countryCode;
    countryCode = LeadForm.jQuery('#country_code');
    return countryCode.val() === "1";
  };

}).call(this);
