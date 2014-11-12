var SSInstrumentationWrapper = {
  experiments: {},
  // setup tracking
  // set a variable to tag the user so that he can be tracked sitewide
  // only 5 variables allowed at a time by GA
  init_experiment: function(config){
    if (config.disabled){
      return;
    }
    var SESSION_SCOPE = 2;
    var experimentName = config.experiment_name;
    var experimentBucket = config.bucket;
    var experimentConfig = {
      bucket : experimentBucket
    };
    this.experiments[experimentName] = {};
    // if any of the experiments need mixpanel, load it asynchronously
    if (config.mpq){
      this.async_load_mpq(config.mpq.api_key);
      experimentConfig.mpq = true;
    }
    var customVarPosition;
    // setup session_tracking for GA and MPQ based
    if (config.ga){
      customVarPosition = (config.ga && config.ga.custom_var_position) || 2;
      var gaConfig = {
        position : customVarPosition
      }; // just use config.ga = customVarPosition ?

      experimentConfig.ga = true;
      experimentConfig.gaConfig = gaConfig;
    }
    experimentConfig.ga && window._gaq && _gaq.push(['_setCustomVar', customVarPosition, experimentName, experimentBucket, SESSION_SCOPE]);
    var mpqSettings = {};
    mpqSettings[experimentName] = experimentBucket;
    experimentConfig.mpq && window.mpq && mpq.register(mpqSettings);
    this.experiments[experimentName] = experimentConfig;
  },
  
  // tracks an event.
  track : function(experimentName, eventName){
    var experimentConfig = this.experiments[experimentName] || {};
    var eventLabel = eventName + '_' + (experimentConfig.bucket || 'out');
    experimentConfig.ga && window._gaq && _gaq.push(['_trackEvent', 'ss_experiment_'+ experimentName, eventLabel]);
    experimentConfig.mpq && window.mpq && mpq.track(eventLabel);
  },
  push : function(command){
    if (command[0]){
      this[command[0]] && this[command[0]].apply(this, command.slice(1));
    }
  },
  async_load_mpq : function(apiKey){
    var mpq=(window.mpq||[]);
    mpq.push(["init",apiKey]);
    (function(){
      var a,b,c,d,e;
      b=document.createElement("script");
      b.type="text/javascript";
      b.async=true;
      b.src=(document.location.protocol==="https:"?"https:":"http:")+"//api.mixpanel.com/site_media/js/api/mixpanel.js";
      a=document.getElementsByTagName("script")[0];
      a.parentNode.insertBefore(b,a);
      e=function(f){
        return function(){
          mpq.push([f].concat(Array.prototype.slice.call(arguments,0)));
        };
      };
      d=[
        "init",
        "track",
        "track_links",
        "track_forms",
        "register",
        "register_once",
        "identify",
        "name_tag",
        "set_config"
      ];
      for(c=0;c<d.length;c++){
        mpq[d[c]]=e(d[c]);
      }
    })();
        //End of MixPanel



  }
};

(function(){
  window._sstq = window._sstq || [];
  var queueLength = _sstq.length;

  _sstq.push = function(obj){SSInstrumentationWrapper.push(obj);};
  for (var i=0; i<queueLength; i++){
    SSInstrumentationWrapper.push(_sstq.shift());
  }

})();
