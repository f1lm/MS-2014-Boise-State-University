/**
 * @file
 * JavaScript for the Disqus Drupal module.
 */

// The Disqus global variables.
var disqus_shortname = '';
var disqus_url = '';
var disqus_title = '';
var disqus_identifier = '';
var disqus_developer = 0;
var disqus_def_name = '';
var disqus_def_email = '';
var disqus_config;

(function ($) {

/**
 * Drupal Disqus behavior.
 */
Drupal.behaviors.disqus = {
  attach: function (context, settings) {
    $('body').once('disqus', function() {
      // Load the Disqus comments.
      if (settings.disqus || false) {
        // Setup the global JavaScript variables for Disqus.
        disqus_shortname = settings.disqus.domain;
        disqus_url = settings.disqus.url;
        disqus_title = settings.disqus.title;
        disqus_identifier = settings.disqus.identifier;
        disqus_developer = settings.disqus.developer || 0;
        disqus_def_name = settings.disqus.name || '';
        disqus_def_email = settings.disqus.email || '';

        // Language and SSO settings are passed in through disqus_config().
        disqus_config = function() {
          if (settings.disqus.language || false) {
            this.language = settings.disqus.language;
          }
          if (settings.disqus.remote_auth_s3 || false) {
            this.page.remote_auth_s3 = settings.disqus.remote_auth_s3;
          }
          if (settings.disqus.api_key || false) {
            this.page.api_key = settings.disqus.api_key;
          }
          if (settings.disqus.sso || false) {
            this.sso = settings.disqus.sso;
          }
          if (settings.disqus.callbacks || false) {
            for (var key in settings.disqus.callbacks) {
              for (var i = 0; i < settings.disqus.callbacks[key].length; i++) {
                var callback = settings.disqus.callbacks[key][i].split('.');
                var fn = window;
                for (var j = 0; j < callback.length; j++) {
                  fn = fn[callback[j]];
                }
                if(typeof fn === 'function') {
                  this.callbacks[key].push(fn);
                }
              }
            }
          }
        };

        // Make the AJAX call to get the Disqus comments.
        jQuery.ajax({
          type: 'GET',
          url: '//' + disqus_shortname + '.disqus.com/embed.js',
          dataType: 'script',
          cache: false
        });
      }

      // Load the comment numbers JavaScript.
      if (settings.disqusComments || false) {
        disqus_shortname = settings.disqusComments;
        // Make the AJAX call to get the number of comments.
        jQuery.ajax({
          type: 'GET',
          url: '//' + disqus_shortname + '.disqus.com/count.js',
          dataType: 'script',
          cache: false
        });
      }
    });
  }
};

})(jQuery);
;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
// $Id$
/*
 * Drupal Most Popular - Showcase the most popular content across your Drupal website and engage your audience.
 * Copyright © 2009-2012 New Signature
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * You can contact New Signature by electronic mail at labs@newsignature.com -or- by U.S. Postal Service at 1100 H St. NW, Suite 940, Washington, DC 20005.
 */
/**
 * @file Adds javascript actions to the most popular block.
 */
(function($) {
  Drupal.behaviors.mostpopular = {
    attach: function(context) {

      // Get the configuration options
      var options = $.extend(Drupal.behaviors.mostpopular.defaultOptions,
          Drupal.settings.mostpopular);
  
      // Attach to all the most popular blocks on the page
      var parents = $(options.blockSelector, context);
      parents.each(function() {
        var block = $(this);
        
        var serviceTabs = block.find(options.servicesSelector).filter('[data-sid]');
        var intervalTabs = block.find(options.intervalsSelector).filter('[data-iid]');
  
        // Keep track of the page we're currently looking at
        var selected = { 'sid' : null, 'iid' : null };
        
        // Get our current page from the cookies
        var bid = block.attr('data-bid');
        var cookie = $.cookie('mostpopular-' + bid);
        if (cookie) {
          var parts = cookie.split('/');
          selected.sid = parts[0];
          selected.iid = parts[1];
        }
  
        // Create a content container
        var content = block.find(options.contentSelector);
        var wrapper = content.wrap("<div />").parent()
        .css({
          position : 'relative'
        });
  
        // Create a throbber image
        if (options.showThrobber) {
          var throbber = $(Drupal.theme('MostPopularThrobber'))
          .css({
            position : 'absolute',
            zIndex : 100
          }).appendTo(wrapper).hide();
  
          // Redefine the show function for the throbber to center it
          throbber.centerAndShow = function() {
            var top = parseInt((wrapper.outerHeight({margin: true}) - throbber.height()) / 2);
            var left = parseInt((wrapper.outerWidth({margin: true}) - throbber.width()) / 2);
            throbber.css({
              top : top,
              left : left
            }).show();
          };
        }
  
        // -----------------------------------------------------
        // Bind all the links to services
        serviceTabs.each(function() {
          var tab = $(this).data('service', true);
          var sid = tab.attr('data-sid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.sid = sid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            return link.click();
          });
          
          // If this service is currently selected, load the content
          if (!selected.sid) {
            selected.sid = sid;
          }
          if (selected.sid == sid) {
            tab.addClass(options.selectedClass);
          }
        });
  
        // -----------------------------------------------------
        // Bind all the links to intervals
        intervalTabs.each(function() {
          var tab = $(this).data('interval', true);
          var iid = tab.attr('data-iid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.iid = iid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            link.click();
          });
          
          // If this interval is currently selected, load the content
          if (!selected.iid) {
            selected.iid = iid;
          }
          if (selected.iid == iid) {
            tab.click();
          }
        });
        
        function getSelected(tab) {
          if (selected.sid && selected.iid) {
            startReload();
            
            var path = selected.sid + '/' + selected.iid;
            
            // Save the cookie
            $.cookie('mostpopular-' + bid, path, { path: '/' });
            
            // Fetch the content via AJAX
            var url = options.url + '/' + bid + '/' + path;
            $.get(url, function(data) {
              onGet(tab, data);
            });
          }
        }
        
        /**
         * This function is called when there is new data from the AJAX call.
         * 
         * @param link
         *   The link object that clicked.
         * @param data
         *   The new HTML sent back from Drupal.
         */
        function onGet(tab, data) {
          finishReload(data);
  
          // Select the appropriate tabs
          if (tab.data('service')) {
            serviceTabs.removeClass(options.selectedClass);
          }
          else if (tab.data('interval')) {
            intervalTabs.removeClass(options.selectedClass);
          }
          tab.addClass(options.selectedClass);
          return false;
        }
  
        /**
         * Starts the process of reloading the most popular items, by hiding
         * the existing content and showing the throbber, if necessary.
         * 
         * The hideContent() method defined in the options will be called.
         */
        function startReload() {
          // Show the throbber and dim the content
          if (throbber) {
            throbber.centerAndShow();
          }
          options.hideContent(content);
        }
  
        /**
         * Finishes the process of reloading the most popular items, by showing
         * the new content and hiding the throbber, if necessary.
         * 
         * The showContent() method defined in the options will be called.
         * 
         * @param response
         *   A JSON response from Drupal.  It contains one key, 'data', whose
         *   value is an HTML string to render.
         */
        function finishReload(response) {
          // Replace the content, fade it back in and hide the throbber
          options.showContent(content, response);
          if (throbber) {
            throbber.hide();
          }
        }
      });
    },
  
    /**
     * Defines the default options. Override these options in
     * Drupal.settings.mostpopular.
     */
    defaultOptions: {  
      'hideContent' : function(content) {
        content.fadeTo(200, 0.5);
      },
      'showContent' : function(content, html) {
        content.html(html).fadeTo(200, 1.0);
      },
      'showThrobber' : true,
      'blockSelector' : '.mostpopular-block',
      'servicesSelector' : 'ul.mostpopular--services li',
      'intervalsSelector' : 'ul.mostpopular--intervals li',
      'contentSelector' : 'div.mostpopular--content',
      'selectedClass' : 'selected',
      'url' : '/mostpopular/ajax'
    }
  };

  /**
   * Provides a default theme for the throbber that appears when content is
   * reloading.   You can override this in your own theme.
   * 
   * @return An HTML string to render the throbber.
   */
  Drupal.theme.prototype.MostPopularThrobber = function() {
    return '<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>';
  };
  
})(jQuery);;
