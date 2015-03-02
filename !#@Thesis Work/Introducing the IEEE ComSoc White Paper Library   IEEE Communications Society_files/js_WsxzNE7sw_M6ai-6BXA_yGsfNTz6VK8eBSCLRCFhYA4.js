(function ($) {

Drupal.jQueryUiFilter = Drupal.jQueryUiFilter || {}

/**
 * Custom hash change event handling
 */
var _currentHash = location.hash;
Drupal.jQueryUiFilter.hashChange = function(func) {
  // Handle URL anchor change event in js
  // http://stackoverflow.com/questions/2161906/handle-url-anchor-change-event-in-js
  if ('onhashchange' in window) {
    $(window).bind('hashchange', func);
  }
  else {
    window.setInterval(function () {
      if (location.hash != _currentHash) {
        _currentHash = location.hash;
        func();
      }
    }, 100);
  }
}


/**
 * Apply jQuery UI filter widget options as the global default options.
 */
Drupal.jQueryUiFilter.globalOptions = function(widgetType) {
  Drupal.jQueryUiFilter.cleanupOptions(jQuery.extend(
    $.ui[widgetType].prototype.options,
    Drupal.settings.jQueryUiFilter[widgetType + 'Options'],
    Drupal.jQueryUiFilter[widgetType + 'Options']
  ));
}

/**
 * Get jQuery UI filter widget options.
 */
Drupal.jQueryUiFilter.getOptions = function(widgetType, options) {
  return Drupal.jQueryUiFilter.cleanupOptions(jQuery.extend(
    {}, // Using an empty object insures that new object is created and returned.
    Drupal.settings.jQueryUiFilter[widgetType + 'Options'],
    Drupal.jQueryUiFilter[widgetType + 'Options'],
    options || {}
  ));
}

/**
 * Cleanup jQuery UI filter options by converting 'true' and 'false' strings to native JavaScript Boolean value.
 */
Drupal.jQueryUiFilter.cleanupOptions = function(options) {
  // jQuery UI options that are Booleans must be converted from integers booleans
  for (var name in options) {
    if (typeof(options[name]) == 'string' && options[name] == '') {
      delete options[name];
    }
    else if (options[name] == 'false') {
      options[name] = false;
    }
    else if (options[name] === 'true') {
      options[name] = true;
    }
    else if (name === 'position' && options[name].indexOf(',') != -1) {
      options[name] = options[name].split(/\s*,\s*/);
    }
    else if (typeof(options[name]) == 'object') {
      options[name] = Drupal.jQueryUiFilter.cleanupOptions(options[name]);
    }
  }
  return options;
}

})(jQuery);
;
(function ($) {
  Drupal.behaviors.fitvids = {
    attach: function (context, settings) {
      try
      {
        // Check that fitvids exists
        if (typeof $.fn.fitVids !== 'undefined') {
        
          // Check that the settings object exists
          if (typeof settings.fitvids !== 'undefined') {
            
            // Default settings values
            var selectors = ['body'];
            var simplifymarkup = true;
            var custom_domains = [];
            
            // Get settings for this behaviour
            if (typeof settings.fitvids.selectors !== 'undefined') {
              selectors = settings.fitvids.selectors;
            }
            if (typeof settings.fitvids.simplifymarkup !== 'undefined') {
              simplifymarkup = settings.fitvids.simplifymarkup;
            }
            if (typeof settings.fitvids.custom_domains !== 'undefined') {
              custom_domains = settings.fitvids.custom_domains;
            }
                
            // Remove media wrappers
            if (simplifymarkup) {
              if ($(".media-youtube-outer-wrapper").length) {
                $(".media-youtube-outer-wrapper").removeAttr("style");
                $(".media-youtube-preview-wrapper").removeAttr("style");
                $(".media-youtube-outer-wrapper").removeClass("media-youtube-outer-wrapper");
                $(".media-youtube-preview-wrapper").removeClass("media-youtube-preview-wrapper");
              }
              if ($(".media-vimeo-outer-wrapper").length) {
                $(".media-vimeo-outer-wrapper").removeAttr("style");
                $(".media-vimeo-preview-wrapper").removeAttr("style");
                $(".media-vimeo-outer-wrapper").removeClass("media-vimeo-outer-wrapper");
                $(".media-vimeo-preview-wrapper").removeClass("media-vimeo-preview-wrapper");
              }
            }
            
            // Fitvids!
            for (var x = 0; x < selectors.length; x ++) {
              $(selectors[x]).fitVids({customSelector: custom_domains});
            }
          }
        }
      }
      catch (e) {
        // catch any fitvids errors
        window.console && console.warn('Fitvids stopped with the following exception');
        window.console && console.error(e);
      }
    }
  };
}(jQuery));
;
/*
	--------------------------------------------------------------------------
	(c) 2007 Lawrence Akka
	 - jquery version of the spamspan code (c) 2006 SpamSpan (www.spamspan.com)

	This program is distributed under the terms of the GNU General Public
	Licence version 2, available at http://www.gnu.org/licenses/gpl.txt
	--------------------------------------------------------------------------
*/

(function ($) { //Standard drupal jQuery wrapper.  See http://drupal.org/update/modules/6/7#javascript_compatibility
// load SpamSpan
Drupal.behaviors.spamspan = {
  attach: function(context, settings) {
// get each span with class spamspan
       $("span.spamspan", context).each(function (index) {
// for each such span, set mail to the relevant value, removing spaces
	    var _mail = ($("span.u", this).text() +
	    	"@" +
	    	$("span.d", this).text())
	    	.replace(/\s+/g, '')
	    	.replace(/\[dot\]/g, '.');
// Find the header text, and remove the round brackets from the start and end
	    var _headerText = $("span.h", this).text().replace(/^ ?\((.*)\) ?$/, "$1");
	    // split into individual headers, and return as an array of header=value pairs
	    var _headers = $.map(_headerText.split(/, /), function(n, i){
            return (n.replace(/: /,"="));
          });
// Find the anchor text, and remove the round brackets from the start and end
	    var _anchorText = $("span.t", this).text().replace(/^ \((.*)\)$/, "$1");
// Build the mailto URI
  var _mailto = "mailto:" + encodeURIComponent(_mail);
  var _headerstring = _headers.join('&');
  _mailto += _headerstring ? ("?" + _headerstring) : '';
// create the <a> element, and replace the original span contents
   	    $(this).after(
		$("<a></a>")
		.attr("href", _mailto)
		.html(_anchorText ? _anchorText : _mail)
		.addClass("spamspan")
		).remove();
	} );
}
};
}) (jQuery);;
(function ($) {

Drupal.jQueryUiFilter = Drupal.jQueryUiFilter || {}
Drupal.jQueryUiFilter.accordionOptions = Drupal.jQueryUiFilter.accordionOptions || {}

/**
 * Scroll to an accordion's active element.
 */
Drupal.jQueryUiFilter.accordionScrollTo = function(accordion) {
  var options = $(accordion).data('options') || {}
  if (!options['scrollTo']) {
    return;
  }

  var top = $(accordion).find('.ui-state-active').offset().top;
  if (options['scrollTo']['duration']) {
    $('html, body').animate({scrollTop: top}, options['scrollTo']['duration']);
  }
  else {
    $('html, body').scrollTop(top);
  }
}

/**
 * Accordion change event handler to bookmark active element in location.hash.
 */
Drupal.jQueryUiFilter.accordionChangeStart = function(event, ui) {
  var href = ui.newHeader.find('a').attr('href');
  if (href) {
    location.hash = href;
    return false; // Cancel event and let accordionHashChangeEvent handler activate the element.
  }
  else {
    return true;
  }
}

/**
 * On hash change activate and scroll to an accordion element.
 */
Drupal.jQueryUiFilter.accordionHashChangeEvent = function() {
  // NOTE: Accordion 'Active' property not change'ing http://bugs.jqueryui.com/ticket/4576
  $accordionHeader = $('.ui-accordion > .ui-accordion-header:has(a[href="' + location.hash + '"])')
  $accordion = $accordionHeader.parent();
  var index = $accordionHeader.prevAll('.ui-accordion-header').length;
  $accordion.accordion('activate', index);
}

/**
 * jQuery UI filter accordion behavior.
 */
Drupal.behaviors.jQueryUiFilterAccordion  = {attach: function(context) {
  if (Drupal.settings.jQueryUiFilter.disabled) {
    return;
  }

  var headerTag = Drupal.settings.jQueryUiFilter.accordionHeaderTag;

  $('div.jquery-ui-filter-accordion', context).once('jquery-ui-filter-accordion', function () {
    var options = Drupal.jQueryUiFilter.getOptions('accordion');

    // Look for jQuery UI filter header class.
    options['header'] = '.jquery-ui-filter-accordion-header';

    if ($(this).hasClass('jquery-ui-filter-accordion-collapsed')) { // Set collapsed options
      options['collapsible'] = true;
      options['active'] = false;
    }

    // Convert <h*> to div to remove tag and insure the accordion does not use the existing h3 style.
    // Sets active item based on location.hash.
    var index = 0;
    $(this).find(headerTag + '.jquery-ui-filter-accordion-header').each(function(){
      var id = this.id || $(this).text().toLowerCase().replace(/[^-a-z0-9]+/gm, '-');
      var hash = '#' + id;
      if (hash == location.hash) {
        options['active'] = index;
      }
      index++;

      $(this).replaceWith('<div class="jquery-ui-filter-header jquery-ui-filter-accordion-header"><a href="' + hash + '">' + $(this).html() + '</a></div>');
    });

    // DEBUG:
    // console.log(options);

    // Save options as data and init accordion
    $(this).data('options', options).accordion(options);

    // Scroll to active
    Drupal.jQueryUiFilter.accordionScrollTo(this);

    // Bind accordion change event to record history
    if (options['history']) {
      $(this).bind('accordionchangestart', Drupal.jQueryUiFilter.accordionChangeStart);
    }

    // Init hash change event handling once
    if (!Drupal.jQueryUiFilter.accordionInitialized) {
      Drupal.jQueryUiFilter.hashChange(Drupal.jQueryUiFilter.accordionHashChangeEvent);
    }
    Drupal.jQueryUiFilter.accordionInitialized = true;
  });

}}

})(jQuery);
;
(function ($) {

Drupal.jQueryUiFilter = Drupal.jQueryUiFilter || {}
Drupal.jQueryUiFilter.dialogOptions = Drupal.jQueryUiFilter.dialogOptions || {closeText : 'close'}

// Set default dialog query parameter.
var match = /dialogFeatures=([^&]+)/.exec(location.search);
Drupal.jQueryUiFilter.dialogOptions.dialogFeatures = ((match) ? match[1] : {});

/**
 * Reload page with uuid to insure cache is cleared
 */
Drupal.jQueryUiFilter.dialogReloadPage = function() {
  top.location.href = top.location.pathname +
    ((top.location.search) ? top.location.search + '&' : '?') +
    'no-cache=' + ((new Date().getTime()) * Math.random(10));

  // Close dialog so that the user sees something has happened.
  $('#jquery-ui-filter-dialog').dialog('destroy');
}

/**
 * Convert dialogFeatures array to string.
 */
Drupal.jQueryUiFilter.dialogFeaturesToString = function(dialogFeatures) {
  if (typeof dialogFeatures == 'string') {
    return dialogFeatures;
  }

  dialogFeatures['protocol'] = location.protocol.replace(':', '');

  var features = [];
  for(var name in dialogFeatures) {
    features[features.length] = name + '=' + dialogFeatures[name];
  }
  return features.join(',');
}

/**
 * Append to dialogFeatures to URL query string via '?dialogFeatures=1' or '?dialogFeatures=form-onsubmit_close=1'.
 */
Drupal.jQueryUiFilter.dialogFeaturesAppendToURL = function(url, dialogFeatures) {
  if (url.indexOf('dialogFeatures') !== -1) {
    return url;
  }

  dialogFeatures = dialogFeatures || Drupal.jQueryUiFilter.dialogOptions.dialogFeatures;
  dialogFeatures = Drupal.jQueryUiFilter.dialogFeaturesToString(dialogFeatures);

  var query = ((url.indexOf('?') === -1) ? '?' : '&') + 'dialogFeatures=' + dialogFeatures;
  if (url.indexOf('#') !== -1) {
    return url.replace('#', query + '#');
  }
  else {
    return url + query;
  }
}

/**
 * Open jQuery UI filter dialog. Allows other modules to re-use this functionality.
 */
Drupal.jQueryUiFilter.dialogOpen = function(url, options) {
  // Check url against whitelist
  if (url.indexOf('://') !== -1) {
    var domain = url.match(/:\/\/(.[^/]+)/)[1];
    var whitelist = Drupal.settings.jQueryUiFilter.dialogWhitelist.split(/\s+/);
    whitelist[whitelist.length] = location.hostname; // Always add custom host
    if (jQuery.inArray(domain, whitelist) == -1) {
      window.location = url;
      return;
    }
  }

  // Initialize options with dialogFeatures.
  options = jQuery.extend(
    {dialogFeatures: {}},
    $.ui.dialog.prototype.options,
    options
  );

  // Automatically adjust iframe height based on window settings.
  var windowHeight = $(window).height() - 50;
  var windowWidth = $(window).width() - 50;
  if (options['height'] == 'auto') {
    options['height'] = options['maxHeight'] || windowHeight;
  }
  if (options['width'] == 'auto') {
    options['width'] = options['maxWidth'] || windowWidth;
  }

  // Make sure dialog is not larger then the viewport.
  if (options['height'] > windowHeight) {
    options['height'] = windowHeight;
  }
  if (options['width'] > windowWidth) {
    options['width'] = windowWidth;
  }

  // Add close button to dialog
  if (options['closeButton']) {
    options['buttons'][ Drupal.t(options['closeText'] || 'Close') ] = function() {
      $(this).dialog('close');
    }
  }
  delete options['closeButton'];

  // Set dialog URL with ?dialogFeature= parameters.
  url = Drupal.jQueryUiFilter.dialogFeaturesAppendToURL(url, options['dialogFeatures']);

  // Remove existing dialog and iframs, this allows us to reset the
  // dialog's options and allow dialogs to open external domains.
  $('#jquery-ui-filter-dialog').dialog('destroy').remove();

  // Create iframe
  $('body').append('<div id="jquery-ui-filter-dialog">'
    + '<div id="jquery-ui-filter-dialog-container">'
    + '<iframe id="jquery-ui-filter-dialog-iframe" name="jquery-ui-filter-dialog-iframe" width="100%" height="100%" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="auto" src="' + url + '" />'
    + '</div>'
    + '</div>'
  );

  // Open dialog
  $('#jquery-ui-filter-dialog').dialog(options);

  // DEBUG:
  // console.log(options);
}

/**
 * jQuery UI filter dialog behavior
 */
Drupal.behaviors.jQueryUiFilterDialog = {attach: function(context) {
  if (Drupal.settings.jQueryUiFilter.disabled) {
    return;
  }

  // Append ?jquery_ui_filter_dialog=1 to all link and form action inside a dialog iframe.
  if (top != self) {
    $('a', context).once('jquery-ui-filter-dialog-link', function() {
      if (this.tagName == 'A') {
        this.href = Drupal.jQueryUiFilter.dialogFeaturesAppendToURL(this.href);
      }
      else if (this.tagName == 'FORM') {
        this.action = Drupal.jQueryUiFilter.dialogFeaturesAppendToURL(this.action);
      }
    });

    // Do not allow dialogs to be nested inside of dialogs.
    return;
  }

  $('a.jquery-ui-filter-dialog', context).once('jquery-ui-filter-dialog', function () {
    $(this).click(function() {
      // Get hidden JSON string that has been cleaned up on the server using PHP.
      // See _jquery_ui_filter_dialog_process_replacer().
      var json  = $(this).attr('rel');
      if (json) {
        var options = Drupal.jQueryUiFilter.getOptions('dialog', JSON.parse(unescape(json)));
      }
      else {
        var options = Drupal.jQueryUiFilter.getOptions('dialog', {});
      }
      // Customize dialog using the link's title.
      if ($(this).attr('title')) {
        options['title'] = $(this).attr('title');
      }

      Drupal.jQueryUiFilter.dialogOpen(this.href, options);
      return false;
    });
  });
}}

})(jQuery);
;
(function ($) {

/**
 * Equal height plugin.
 *
 * From: http://www.problogdesign.com/coding/30-pro-jquery-tips-tricks-and-strategies/
 */
if (jQuery.fn.equalHeight == undefined) {
  jQuery.fn.equalHeight = function () {
    var tallest = 0;
    this.each(function() {
      tallest = ($(this).height() > tallest)? $(this).height() : tallest;
    });
    return this.height(tallest);
  }
}

Drupal.jQueryUiFilter = Drupal.jQueryUiFilter || {}
Drupal.jQueryUiFilter.tabsOptions = Drupal.jQueryUiFilter.tabsOptions || {}

/**
 * Tabs pagings
 *
 * Inspired by : http://css-tricks.com/2361-jquery-ui-tabs-with-nextprevious/
 */
Drupal.jQueryUiFilter.tabsPaging = function(selector, options) {
  options = jQuery.extend({paging: {'back': '&#171; Previous', 'next': 'Next &#187;'}}, options);

  var $tabs = $(selector);
  var numberOfTabs = $tabs.find(".ui-tabs-panel").size() - 1;

  // Add back and next buttons.
  // NOTE: Buttons are not 'themeable' since they should look like a themerolled jQuery UI button.
  $tabs.find('.ui-tabs-panel').each(function(i){
    var html = '';
    if (i != 0) {
      html += '<button type="button" class="ui-tabs-prev" rel="' + (i-1) + '" style="float:left">' + Drupal.t(options.paging.back) + '</button>';
    }
    if (i != numberOfTabs) {
      html += '<button type="button" href="#" class="ui-tabs-next" rel="' + (i+1) + '" style="float:right">' + Drupal.t(options.paging.next) + '</button>';
    }
    $(this).append('<div class="ui-tabs-paging clearfix clear-block">' +  html + '</div>');
  });

  // Init buttons
  $tabs.find('button.ui-tabs-prev, button.ui-tabs-next,').button();

  // Add event handler
  $tabs.find('.ui-tabs-next, .ui-tabs-prev').click(function() {
    $tabs.tabs('select', parseInt($(this).attr("rel")));
    return false;
  });
}

/**
 * Scroll to an accordion's active element.
 */
Drupal.jQueryUiFilter.tabsScrollTo = function(tabs) {
  var options = $(tabs).data('options') || {}
  if (!options['scrollTo']) {
    return;
  }

  var top = $(tabs).offset().top;
  if (options['scrollTo']['duration']) {
    $('html, body').animate({scrollTop: top}, options['scrollTo']['duration']);
  }
  else {
    $('html, body').scrollTop(top);
  }
}


/**
 * Tabs select event handler to bookmark selected tab in location.hash.
 */
Drupal.jQueryUiFilter.tabsSelect = function(event, ui) {
  location.hash = $(ui.tab).attr('href');
}

/**
 * On hash change select tab.
 *
 * Inspired by: http://benalman.com/code/projects/jquery-bbq/examples/fragment-jquery-ui-tabs/
 */
Drupal.jQueryUiFilter.tabsHashChangeEvent = function() {
  var $tab = $('.ui-tabs-nav > li:has(a[href="' + location.hash + '"])');
  $tabs = $tab.parent().parent();

  var selected = $tab.prevAll().length;

  if ($tabs.tabs('option', 'selected') != selected) {
    $tabs.tabs('select', selected);
  }
}

/**
 * jQuery UI filter tabs behavior
 */
Drupal.behaviors.jQueryUiFilterTabs = {attach: function(context) {
  if (Drupal.settings.jQueryUiFilter.disabled) {
    return;
  }

  var headerTag = Drupal.settings.jQueryUiFilter.tabsHeaderTag;

  // Tabs
  $('div.jquery-ui-filter-tabs', context).once('jquery-ui-filter-tabs', function () {
    var options = Drupal.jQueryUiFilter.getOptions('tabs');

    // Get <h*> text and add to tabs.
    // Sets selected tab based on location.hash.
    var scrollTo = false;
    var index = 0;
    var tabs = '<ul>';
    $(this).find(headerTag + '.jquery-ui-filter-tabs-header').each(function(){
      var id = this.id || $(this).text().toLowerCase().replace(/[^-a-z0-9]+/gm, '-');
      var hash = '#' + id;

      if (hash == location.hash) {
        scrollTo = true;
        options['selected'] = index;
      }
      index++;

      tabs += '<li><a href="' + hash + '">' + $(this).html() + '</a></li>';
      $(this).next('div.jquery-ui-filter-tabs-container').attr('id', id);
      $(this).remove();
    });
    tabs += '</ul>';
    $(this).prepend(tabs);

    // DEBUG:
    // console.log(options);

    // Save options as data and init tabs
    $(this).data('options', options).tabs(options);

    // Equal height tab
    $(this).find('.ui-tabs-nav li').equalHeight();

    // Add paging.
    if (options['paging']) {
      Drupal.jQueryUiFilter.tabsPaging(this, options);
    }

    // Bind tabs select event to record history
    if (options['history']) {
      $(this).bind('tabsselect', Drupal.jQueryUiFilter.tabsSelect);
    }

    // Scroll to selected tabs widget
    if (scrollTo) {
      Drupal.jQueryUiFilter.tabsScrollTo(this);
    }

    // Init hash change event handling once
    if (!Drupal.jQueryUiFilter.hashChangeInit) {
      Drupal.jQueryUiFilter.hashChange(Drupal.jQueryUiFilter.tabsHashChangeEvent);
    }
    Drupal.jQueryUiFilter.hashChangeInit = true;
  });
}}

})(jQuery);
;
