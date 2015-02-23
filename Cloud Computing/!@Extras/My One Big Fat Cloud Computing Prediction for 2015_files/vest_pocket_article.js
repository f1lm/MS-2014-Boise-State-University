var forbes = (function(app) {

  // The MV plugin and Forbes use different versions of jQuery. This module
  // will use the version of jQuery exported by the MediaVoice plugin.
  var $;
  //var debug;
  var counter = 0;
  var fills = {};

  function _fetch_plugin() {
    //debug("MediaVoice/Forbes: fetching the MediaVoice plugin");
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.type = "text/javascript";
      js.async = true;
      js.src = "http://plugin.mediavoice.com/plugin.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "nativeads-plugin");
  }

  function _configure_plugin() {
    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS.injectedAt = new Date().getTime();

    window.NATIVEADS_QUEUE = window.NATIVEADS_QUEUE || [];
    window.NATIVEADS_QUEUE.injectedAt = new Date().getTime();
    window.NATIVEADS_QUEUE.push(["logging.enable"], ["setPropertyID", "NA-FORBDESK-11235911"]);
    window.NATIVEADS_QUEUE.push(["enableMOAT", "true", "true"]);


    window.NATIVEADS_QUEUE.push(["setWillLinkRedirect", function(href) {
      return false;
    }]);

    // If we are on a MediaVoice/BrandVoice article, then we
    // need to track an "inbound" analytics event.
    if (forbes && forbes.page_meta && forbes.page_meta.brandvoice === true) {
      window.NATIVEADS_QUEUE.push(["configureSecondaryPage", {
        track: function() {
          return "inbound";
        }
      }]);
    }

    window.NATIVEADS.onReady = function(ads) {
      $ = ads.$;
    };
  }

  function _map(list, fn) {
    if (list && list.length) {
      var out = [];
      for (var i = 0; i < list.length; i++) {
        out.push(fn(list[i]));
      }
      return out;
    }
    return null;
  }

  function _timeout_wrap(time_ms, timeout_fn, fns) {
    var timeout = null;
    var did_timeout = false;
    var wrapped_fns = _map(fns, function(fn) {
      var wrapped_fn = function() {
        if (did_timeout) { return; }
        if (timeout) { clearTimeout(timeout); }
        fn.apply(null, arguments);
      }
      return wrapped_fn;
    });
    if (time_ms) {
      timeout = setTimeout(function() {
        did_timeout = true;
        timeout_fn();
        NATIVEADS_QUEUE.push(["log", "Ad took too long to load."]);
      }, time_ms);
    }
    return wrapped_fns;
  }

  // Splits the string which contains author's details
  // into various different categories such as
  // name, credentials, url, and img-url
  function _split_author_string(authorStr, model) {
    var authorArray = authorStr.split(/, /);
    var commas = (authorArray.length - 1);
    if (commas == 0) {
      // If there are no commas, store the string into the name variable only
      model["forbes-author-name"] = authorArray[0];
    } else if (commas == 1) {
      // If there is one comma, split the string into two parts
      // and check if the second part of the string is a url or the author's
      // credentials and store this data in the variable accordingly
      model["forbes-author-name"] = authorArray[0];
      if (authorArray[1].substring(0, 4) === "http") {
        model["forbes-author-url"] = authorArray[1];
      } else {
        model["forbes-author-cred"] = authorArray[1];
      }
    } else if (commas == 2) {
      // If there are two commas, split the string into three parts
      // and check what type of data each string contains and store
      // that data in their respective variables
      model["forbes-author-name"] = authorArray[0];
      if (authorArray[1].substring(0, 4) === "http") {
        model["forbes-author-url"] = authorArray[1];
        model["forbes-author-img"] = authorArray[2];
      } else {
        model["forbes-author-cred"] = authorArray[1];
        model["forbes-author-url"] = authorArray[2];
      }
    } else {
      // If there are three commas, split the string into four parts
      // and store in the name, cred, url, and img variable fields
      // respectively
      model["forbes-author-name"] = authorArray[0];
      model["forbes-author-cred"] = authorArray[1];
      model["forbes-author-url"] = authorArray[2];
      model["forbes-author-img"] = authorArray[3];
    }
  }

  function _initialize_vestpocket_config() {
    var vestpocket_config = {
      unit: {
        server: "dfp",
        id: "",
        size: "",
        targets: {
          pos: "",
          id: ""
        }
      },

      // The plugin will use this selector to locate where
      // it should inject the native ad collection.
      location: '.vp-wrapper .vp-box:eq(1)',

      // The template used to build the native ad article's
      // markup. This is a compiled Handlebars template.
      template: _get_template(),
      label: 'desktop-vestpocket',

      onRender: function($element) {
        if (forbes && forbes.advoice_specific && forbes.advoice_specific.init) {
          forbes.advoice_specific.init();
        }
      }
    };
    return vestpocket_config;
  }

  function _insert_article(options) {
    var startTime = new Date().getTime();
    counter++;
    var vestpocket_config = _initialize_vestpocket_config();
    var id = counter;
    var label = options.label;
    var unit = options.unit;
    var location = options.selector;
    var insertLocation = document.createElement('div');
    insertLocation.id = "mv-vest-pocket"+id;
    insertLocation.style.display = "none";
    jQuery(insertLocation).insertBefore(jQuery(location));
    var onRender = options.onRender || (function() {
      if (forbes && forbes.advoice_specific && forbes.advoice_specific.init) {
        forbes.advoice_specific.init();
      }
    });
    var onError = options.onError || (function() {});
    var onFill = options.onFill || (function() {});
    var timeout = options.timeout || false;

    var _success = function(model) {
      // Extract the sponsor name and tag from the `sponsorName` as
      // provided in the RSS feeds. For example, the string "gyroVoice -
      // Ignite something - Forbes" is parsed so that "gyro" is the sponsor
      // name and "Ignite something" is the tag.
      var sponsorName = model.sponsor.name;
      var nameMatch = sponsorName.match(/^(.+)Voice\s-\s(.+)\s-\s.+$/);
      if (nameMatch) {
        model["forbes-sponsor-name"] = nameMatch[1];
        model["forbes-sponsor-tag"] = nameMatch[2];
      }

      // Extract the article title without the BrandVoice prefix. For
      // example, this string "SAPVoice: This is a title" is parsed so that
      // the title is "This is a title".
      var titleMatch = model.title.match(/^.+Voice:\s(.+)$/);
      if (titleMatch) {
        model["forbes-title"] = titleMatch[1];
      }

      _split_author_string(model.author.name, model);
      onFill.apply(null, arguments);
      var endTime = new Date().getTime();
      var loadTime = endTime - startTime;
      NATIVEADS_QUEUE.push(["log", "Ad took " + loadTime + "ms to load."]);
    };

    var _error = function() {
      jQuery("#mv-vest-pocket"+id).remove();
      onError();
    };
    var _timeout_fns = _timeout_wrap(timeout, _error, [_success, _error]);
    vestpocket_config.onFill = _timeout_fns[0];
    vestpocket_config.onError = _timeout_fns[1];

    if (!(label === "")) {
      vestpocket_config.label = label;
    }
    if (!(unit.id === "")) {
      vestpocket_config.unit.id = unit.id;
    }
    if (!(unit.size === "")) {
      vestpocket_config.unit.size = unit.size;
    }
    if (!(location === "")) {
      vestpocket_config.location = "#mv-vest-pocket"+id;
    }
    if (!(unit.targets === "")) {
      vestpocket_config.unit.targets = unit.targets;
    }

    window.NATIVEADS_QUEUE.push(["insertPreview", vestpocket_config]);

  }

  function _get_template() {
      /*

       This function represents a pre-compiled Handlebars template. Pre-compiled
       templates are not pretty, but they provide a very significant performance
       boost, especially on mobile devices. For more information, see
       http://handlebarsjs.com/precompilation.html.

       Note that this code has been generated from the following markup:

    <div class="vp-box vp-native vp-visible">
      <div id="article_container_0_ntv-vest2" class="vp-native-ad ad_initialized">
      <link rel="stylesheet" href="http://images.forbes.com/css/2014/ntv-vest2.css" type="text/css">
        <div class="box_wrapper" style="top: 0px; padding-top: 225px; padding-bottom: 0px; margin-top: 0px; margin-bottom: 0px; position: relative;">
        <div id="ntv-vest">
        <div class="box article">
          {{#if image.href}}
          <a href="{{link}}" class="thumb exit_trigger_set" >
              <span class="icon">
              </span>
              <img src="{{image.href}}" width="136" height="90" alt="">
          </a>
          {{/if}}
          <h4>
            <a href="{{link}}" style="color:#000;" target="_parent">
              <span class="advoice"><span class="brandvoice">{{forbes-sponsor-name}}</span>​Voice</span>: {{forbes-title}}
              </a>
          </h4>
          <cite class="box_byline">
            {{#if forbes-author-url}}
              <a href="{{forbes-author-url}}" class="exit_trigger_set">
                {{#if forbes-author-img}}
                  <img src="{{forbes-author-img}}" width="20" height="20" class="avatar">
                {{/if}}
                <strong>{{forbes-author-name}}</strong>
                <span class="desc">{{forbes-author-cred}}</span>
              </a>
            {{else}}
              {{#if forbes-author-img}}
                <img src="{{forbes-author-img}}" width="20" height="20" class="avatar">
              {{/if}}
              <strong>{{forbes-author-name}}</strong><br>
              <span class="desc">{{forbes-author-cred}}</span>
            {{/if}}
           </cite>
        </div>
      </div>
      </div>
      </div>
    </div>

      */

  compiledTemplate0 = function (Handlebars,depth0,helpers,partials,data) {
      this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
      var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {

      var buffer = "", stack1;
      buffer += "\n      <a href=\"";
      if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "\" class=\"thumb exit_trigger_set\" >\n          <span class=\"icon\">\n          </span>\n          <img src=\""
        + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
        + "\" width=\"136\" height=\"90\" alt=\"\">\n      </a>\n      ";
      return buffer;
      }

    function program3(depth0,data) {

      var buffer = "", stack1;
      buffer += "\n          <a href=\"";
      if (stack1 = helpers['forbes-author-url']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-url']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "\" class=\"exit_trigger_set\">\n            ";
      stack1 = helpers['if'].call(depth0, depth0['forbes-author-img'], {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
      if(stack1 || stack1 === 0) { buffer += stack1; }
      buffer += "\n            <strong>";
      if (stack1 = helpers['forbes-author-name']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-name']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "</strong>\n            <span class=\"desc\">";
      if (stack1 = helpers['forbes-author-cred']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-cred']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "</span>\n          </a>\n        ";
      return buffer;
      }
    function program4(depth0,data) {

      var buffer = "", stack1;
      buffer += "\n              <img src=\"";
      if (stack1 = helpers['forbes-author-img']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-img']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "\" width=\"20\" height=\"20\" class=\"avatar\">\n            ";
      return buffer;
      }

    function program6(depth0,data) {

      var buffer = "", stack1;
      buffer += "\n          ";
      stack1 = helpers['if'].call(depth0, depth0['forbes-author-img'], {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
      if(stack1 || stack1 === 0) { buffer += stack1; }
      buffer += "\n          <strong>";
      if (stack1 = helpers['forbes-author-name']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-name']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "</strong><br>\n          <span class=\"desc\">";
      if (stack1 = helpers['forbes-author-cred']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-cred']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "</span>\n        ";
      return buffer;
      }
    function program7(depth0,data) {

      var buffer = "", stack1;
      buffer += "\n            <img src=\"";
      if (stack1 = helpers['forbes-author-img']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0['forbes-author-img']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "\" width=\"20\" height=\"20\" class=\"avatar\">\n          ";
      return buffer;
      }

      buffer += "<div class=\"vp-box vp-native vp-visible\">\n  <div id=\"article_container_0_ntv-vest2\" class=\"vp-native-ad ad_initialized\">\n  <link rel=\"stylesheet\" href=\"http://images.forbes.com/css/2014/ntv-vest2.css\" type=\"text/css\">\n    <div class=\"box_wrapper\" style=\"top: 0px; padding-top: 225px; padding-bottom: 0px; margin-top: 0px; margin-bottom: 0px; position: relative;\">\n    <div id=\"ntv-vest\">\n    <div class=\"box article\">\n      ";
      stack2 = helpers['if'].call(depth0, ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
      if(stack2 || stack2 === 0) { buffer += stack2; }
      buffer += "\n      <h4>\n        <a href=\"";
      if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
      else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
      buffer += escapeExpression(stack2)
        + "\" style=\"color:#000;\" target=\"_parent\">\n          <span class=\"advoice\"><span class=\"brandvoice\">";
      if (stack2 = helpers['forbes-sponsor-name']) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
      else { stack2 = depth0['forbes-sponsor-name']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
      buffer += escapeExpression(stack2)
        + "</span>​Voice</span>: ";
      if (stack2 = helpers['forbes-title']) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
      else { stack2 = depth0['forbes-title']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
      buffer += escapeExpression(stack2)
        + "\n          </a>\n      </h4>\n      <cite class=\"box_byline\">\n        ";
      stack2 = helpers['if'].call(depth0, depth0['forbes-author-url'], {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
      if(stack2 || stack2 === 0) { buffer += stack2; }
      buffer += "\n       </cite> \n    </div>\n  </div>\n  </div>\n  </div>\n</div>";
      return buffer;
      };

    return compiledTemplate0;
  }

  function _init() {
    //debug = forbes.util.debug;
    _fetch_plugin();
    _configure_plugin();
    _initialize_vestpocket_config();
  }

  app.mediavoice = {
    init: _init,
    insert_article_vp: _insert_article
  };

  return app;

}(forbes || {}));

forbes.bootstrap.register(forbes.mediavoice.init);
