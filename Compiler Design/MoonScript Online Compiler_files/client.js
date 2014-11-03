// Generated by CoffeeScript 1.7.1
(function() {
  var ExamplePicker, Page, SnippetSaver, WebCompiler, track, track_event,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  track_event = function(cat, action, label, value, interactive) {
    var e;
    if (value == null) {
      value = 0;
    }
    if (interactive == null) {
      interactive = true;
    }
    try {
      return _gaq.push(['_trackEvent', cat, action, label, value, interactive]);
    } catch (_error) {
      e = _error;
    }
  };

  track = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return track_event.apply(null, ["compiler"].concat(__slice.call(args)));
  };

  WebCompiler = (function() {
    function WebCompiler() {
      this.execute = __bind(this.execute, this);
      this.compile = __bind(this.compile, this);
    }

    WebCompiler.prototype.api = "proxy.php";

    WebCompiler.prototype.compile = function(code, callback) {
      return $.post("" + this.api + "?action=compile", {
        code: code
      }, callback);
    };

    WebCompiler.prototype.execute = function(code, callback) {
      return $.post("" + this.api + "?action=run", {
        code: code
      }, callback);
    };

    WebCompiler.prototype.version = function(callback) {
      return $.get("" + this.api + "?action=version", callback);
    };

    return WebCompiler;

  })();

  Page = (function() {
    function Page(container) {
      var buttons;
      this.container = $(container);
      this.status = $("#status");
      this.out = $("#out");
      this.compiler = new WebCompiler(this);
      this.compiler.version((function(_this) {
        return function(v) {
          return $("#version").text("(" + v + ")");
        };
      })(this));
      this.set_status("success", "Ready");
      this.highlighter = new Lua;
      this.last_action = null;
      this.editor = CodeMirror.fromTextArea($("#input")[0], {
        tabMode: "shift",
        theme: "moon",
        lineNumbers: true
      });
      this.examples = new ExamplePicker("#example-picker", this);
      this.snippets = new SnippetSaver($("#header").find(".toolbar"), this);
      buttons = $("#compile, #run").prop("disabled", false);
      this.container.on("click", "#compile", (function(_this) {
        return function() {
          var code, start_time;
          track("code", "compile");
          buttons.prop("disabled", true);
          start_time = new Date;
          _this.set_status("loading", "Compiling...");
          code = _this.editor.getValue();
          _this.compiler.compile(code, function(res) {
            buttons.prop("disabled", false);
            if (res.error) {
              _this.set_status("error", "Fatal error");
              _this.put_output(res.msg);
            } else {
              _this.set_status("success", "Finished in " + (new Date - start_time) + "ms");
              _this.put_lua(res.code);
            }
            return _this.last_action = {
              type: "compile",
              input: code,
              output: res.code
            };
          });
          return false;
        };
      })(this));
      this.container.on("click", "#run", (function(_this) {
        return function() {
          var code, start_time;
          track("code", "run");
          buttons.prop("disabled", true);
          start_time = new Date;
          _this.set_status("loading", "Running...");
          code = _this.editor.getValue();
          _this.compiler.execute(code, function(res) {
            buttons.prop("disabled", false);
            if (res.error) {
              _this.set_status("error", "Fatal error");
              _this.put_output(res.msg);
            } else {
              _this.set_status("success", "Finished in " + (new Date - start_time) + "ms");
              _this.put_output(res.stdout);
            }
            return _this.last_action = {
              type: "run",
              input: code,
              output: res.stdout
            };
          });
          return false;
        };
      })(this));
      this.container.on("click", "#clear", (function(_this) {
        return function() {
          _this.editor.setValue("");
          _this.editor.focus();
          return false;
        };
      })(this));
    }

    Page.prototype.set_status = function(type, msg) {
      if (type === "loading") {
        msg = "<img src='img/ajax-loader.gif' /> " + msg;
      }
      return this.status.removeClass("success error loading").addClass(type).html(msg);
    };

    Page.prototype.put_lua = function(code) {
      return this.out.html(this.highlighter.format_text(code));
    };

    Page.prototype.put_output = function(text) {
      if (text === "") {
        return this.out.html('<span class="meta">&rarr; No output</span>');
      } else {
        return this.out.text(text);
      }
    };

    return Page;

  })();

  SnippetSaver = (function() {
    SnippetSaver.prototype.api = "snippet.php";

    SnippetSaver.prototype.error = function(msg) {
      return this.status.html("<span class=\"error\"><b>Error: </b>" + msg + "</span>");
    };

    SnippetSaver.prototype.load_snippet = function() {
      var hash;
      hash = window.location.hash;
      if (hash) {
        if (this.page.last_action && ("#" + this.page.last_action.id) === hash) {
          return;
        }
        hash = hash.substr(1);
        if (!hash.match(/^[0-9a-z]+$/i)) {
          return;
        }
        this.status.html('<img src="img/ajax-loader.gif" /> Loading Snippet...');
        return $.ajax({
          url: "" + this.api + "?" + ($.param({
            act: "get",
            id: hash
          })),
          success: (function(_this) {
            return function(res) {
              if (res.error) {
                _this.error(res.msg);
                return;
              }
              track("snippet", "load", +hash, false);
              _this.status.text("Loaded snippet #" + hash);
              _this.page.editor.setValue(res.input);
              _this.page.editor.focus();
              _this.page.put_output(res.output || "");
              res.id = hash;
              return _this.page.last_action = res;
            };
          })(this),
          error: (function(_this) {
            return function() {
              return _this.error("Failed to load snippet");
            };
          })(this)
        });
      }
    };

    function SnippetSaver(container, page) {
      var button;
      this.page = page;
      this.error = __bind(this.error, this);
      this.container = $(container);
      button = this.container.find("#save_button");
      this.status = this.container.find("#toolbar_status");
      this.url = this.container.find("#snippet_url");
      $(window).on("hashchange", (function(_this) {
        return function() {
          return _this.load_snippet();
        };
      })(this));
      this.load_snippet();
      this.container.on("click", "#save_button", (function(_this) {
        return function(e) {
          var action;
          action = _this.page.last_action;
          if (!action || action.id) {
            alert("You must compile or execute before saving");
            return false;
          }
          if (action.input.match(/^\s*$/)) {
            alert("Can't save blank snippet");
            return false;
          }
          button.prop("disabled", true);
          _this.url.hide();
          _this.status.html('<img src="img/ajax-loader.gif" /> Saving...');
          track("snippet", "save");
          $.post("" + _this.api + "?act=save", action, function(res) {
            button.prop("disabled", false);
            if (res.error) {
              alert(res.msg);
              _this.status.empty();
              return;
            }
            _this.url.show().val('http://moonscript.org/compiler/#' + res.id);
            _this.status.text("Saved!");
            action.id = res.id;
            return window.location.hash = "#" + res.id;
          });
          return false;
        };
      })(this));
    }

    return SnippetSaver;

  })();

  ExamplePicker = (function() {
    ExamplePicker.prototype.example_dir = "examples";

    ExamplePicker.prototype.update = function(fname) {
      return this.page.editor.setValue(this.cache[fname]);
    };

    function ExamplePicker(container, page) {
      this.page = page;
      this.update = __bind(this.update, this);
      this.container = $(container);
      this.cache = {};
      this.container.on("change", (function(_this) {
        return function(e) {
          var fname;
          if (!(fname = $(e.currentTarget).val())) {
            return;
          }
          console.log("getting", fname);
          if (_this.cache[fname]) {
            return _this.update(fname);
          } else {
            return $.get("" + _this.example_dir + "/" + fname, function(res) {
              _this.cache[fname] = res;
              return _this.update(fname);
            });
          }
        };
      })(this));
    }

    return ExamplePicker;

  })();

  $(function() {
    var page;
    page = new Page("#compiler");
    return page.editor.focus();
  });

}).call(this);
