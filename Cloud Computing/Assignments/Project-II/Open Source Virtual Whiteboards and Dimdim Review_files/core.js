// designed to have no dependencies!
// also designed to be super light weight since it is included in <head>.
// only put things here that you really need to have available before the end of the page!


// wrap up console.log to be happy in ie and other browsers that don't support console.log
window.hlog = function(s) {
  if (this.console) return console.log(s);
};


// makes sure namespace exists, and initializes to {} if it doesn't.
//   expects dot-separated list -- something like 'hubspot.analytics.campaigns'
//   ext is optional-- needs to be a hash-- each element will be copied into namespace (overwriting if already exists).
window.hns = function(ns, ext) {
  var n,i,
      names = ns.split('.'),
      len = names.length,
      obj = window;

  for (i=0; i<len; ++i) {
    n = names[i];
    obj[n] = obj[n] || {};
    obj = obj[n];
  }

  if (ext) this.hmerge(obj, ext);

  return obj;
};

// merges into obj another ext hash recursively-- does no work detangling references, so don't expect it to have copies of ext.
window.hmerge = function(obj, ext) {
  for (var k in ext) {
    if (typeof(obj[k]) == 'object') {
      this.hmerge(obj[k], ext[k]);
    } else {
      obj[k] = ext[k];
    }
  }
  return obj;
};

// setup our top level namespace
hns('hubspot');




// DEPRECATING $hs -- renamed to the function defined above!  see aliases at very bottom -- use those instead
window.$hs = {
  log: function(s) {
    window.hlog("$hs.log is DEPRECATED-- use hlog instead! see js best practices on wiki for more info");
    window.hlog(s);
  },

  debug: false,

  namespace: function(ns, ext) {
    window.hlog("$hs.namespace is DEPRECATED -- use hns instead! see js best practices on wiki for more info");

    var n,i,
        names = ns.split('.'),
        len = names.length,
        obj = window;

    for (i=0; i<len; ++i) {
      n = names[i];
      obj[n] = obj[n] || {};
      obj = obj[n];
    }

    if (ext) window.hmerge(obj, ext);

    return obj;
  },

  // merges into obj another ext hash recursively-- does no work detangling references, so don't expect it to have copies of ext.
  merge: function(obj, ext) {
    window.hlog("$hs.merge is DEPRECATED -- use hmerge instead! see js best practices on wiki for more info");

    for (var k in ext)
      if (typeof(obj[k]) == 'object')
        this.merge(obj[k], ext[k]);
      else
        obj[k] = ext[k];
  },

  // basic custom profiler
  //
  // designed to have no dependencies
  // should work well with chrome as well as firebugged-firefox and even firebugged-lite-IE
  //
  profile: (function() {
    // if console is not supported-- make it impotent
    if (!window.console) return function(a,b,f) {if (f) f();};

    var firstuse = true,
        timers = {};

    return function(timer, message, f, force_print) {
      // f optional-- easily log start/end of a function

      if (!message && !f) {
        message = timer;
        timer = 'global';
      }

      message = message || '';

      if (firstuse) {
        window.hlog('EPOCHTIME => MS SINCE PREVIOUS == MS SINCE START == TIMER == MESSAGE');
        firstuse = false;
      }

      if (f) {
        arguments.callee(timer,'<< starting: ' + message);
        f();
        arguments.callee(timer,'>> finished: ' + message);
      }

      var times = timers[timer],
          now = (new Date()).getTime(),
          blank = '     ';

      if (!times) times = timers[timer] = [now,now];  // start, last

      var t, s=[];
      for (var i=0; i<2; ++i) {
        t = (now-times[i]).toString();
        s[i] = blank.substring(Math.min(5,t.length)) + t + 'ms';
      }

      window.hlog(now + ' => ' + s[1] + ' == ' + s[0] + ' == ' + timer + ' == ' + message);
      times[0] = now;
    };

  })()

};

window.hubspot.log = $hs.log;
window.hubspot.namespace = $hs.namespace;

// A helper function futurejQuery(function() { ... }) so you can use jquery.ready before jquery is loaded
window.preJqueryReadyQueue = [];

window.futurejQuery = function(f) {
  if (!window.jQuery || !window.jQuery.fn) {
    if (typeof f === "function") {
      window.preJqueryReadyQueue.push(arguments);
    }

    return window.futurejQuery;
  } else {
    return jQuery(f);
  }
};

window.futurejQuery.ready = window.futurejQuery;

// Call this after jquery is loaded to pop everything off of window.preJqueryReadyQueue
window.playbackPreJqueryReadyQueue = function() {
  for (var l = window.preJqueryReadyQueue.length, i = 0; i < l;) {
      jQuery.apply(this, Array.prototype.slice.call(window.preJqueryReadyQueue[i++]));
  }

  window.preJqueryReadyQueue = undefined;
};







