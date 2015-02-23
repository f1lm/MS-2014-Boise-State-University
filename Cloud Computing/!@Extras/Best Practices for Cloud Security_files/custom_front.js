/**
 * Styler pack is jQuery plugin add line numbers and code box custom styles 
 * Copyright © 2014 Clivern
 * version 1.0
 */
(function($) {
 //add global function to jQuery core
 $.fn.stylerPack = function(opts) {
  //code box defaults will be overriden with user defined options
  var defaults = {
   colboxMinWidth: "85%", /* show line numbers */
   colboxTransition: 500 /* make links clickable */
  };
  //override default options with user defined options
  var options = $.extend(defaults, opts);
  //return element
  return this.each(function() {
   //set element to new variable
   var originalElement = $(this);
   //get element options and split into array
   var elemOptions = originalElement.attr('data-bit').split(",");
   /********************************/
   /**
    * data-bit=line numbers,link clickable,wrap long lines,collapse box,collapse box title,pos or com
    * true,true,false,false,Source code,pos or com
    */
   if (elemOptions[0] === 'true') {
    //line numbers
    var lines = originalElement.text().match(/\n/g);
    lines = (lines ? lines.length : 0) + 1;

    if (lines > 1) {
     var l = '';
     for (var i = 0; i < lines; i++) {
      l += (i + 1) + '\n';
     }
     originalElement.attr('data-lines', l);
    }
   }
   /********************************/
   if (elemOptions[1] === 'true') {
    //link clickable
    $(this).html($(this).html().replace(/\bhttp[^ ]+/ig, function(str) {
     return '<a href="' + str + '" target="_blank">' + str + '<\/a>';
    }));
   }
   /********************************/
   if (elemOptions[2] === 'true') {
    //wrap long lines
    originalElement.children("code").css({"white-space": "pre-wrap"});
   } else {
    originalElement.children("code").css({
     "min-width": options.colboxMinWidth,
     "white-space": "pre"
    });
   }
   /********************************/
   if (elemOptions[3] === 'true') {
    //hide source code
    originalElement.hide();
    if (elemOptions[5] === 'pos') {
     //wrap source code with div
     originalElement.wrap('<div class="posts_collapsable-box" />');
    } else {
     originalElement.wrap('<div class="comments_collapsable-box" />');
    }
    //add click event to its parent
    var originalelementParent = originalElement.parent();
    //add title to collapsable box
    originalelementParent.prepend(elemOptions[4]);
    //add click event
    originalelementParent.click(function() {
     originalElement.slideToggle(options.colboxTransition);
    });
   }
  });
 };
})(jQuery);
/**
 * comment styler pack
 * Copyright © 2014 Clivern
 * version 1.0
 */
(function($) {
 //add global function to jQuery core
 $.fn.commentstylerPack = function(opts) {
  //code box defaults will be overriden with user defined options
  var defaults = {
   colboxMinWidth: "85%", /* show line numbers */
   colboxTransition: 500 /* make links clickable */
  };
  //override default options with user defined options
  var options = $.extend(defaults, opts);
  //return element
  return this.each(function() {
   //set element to new variable
   var originalElement = $(this);
   //get element parent
   var originalElementParent = originalElement.parent('div[data-bit$="com"]');
   //check if lang exist
   var text_lenght = originalElement.text().match(/\n/g);
   text_lenght = (text_lenght ? text_lenght.length : 0) + 1;
   if (text_lenght > 1) {
    //wrap code tag with pre tag containing data-bit attr
    originalElement.wrap('<pre data-bit="' + originalElementParent.attr('data-bit') + '" />');
    //get element options and split into array
    var elemOptions = originalElementParent.attr('data-bit').split(",");
    originalElement.children('br').remove();
    //change original element to pre
    originalElement = originalElement.parent('pre');
    /********************************/
    /**
     * data-bit=line numbers,link clickable,wrap long lines,collapse box,collapse box title,highcom
     * true,true,false,false,Source code,highcom
     */
    if (elemOptions[0] === 'true') {
     //line numbers
     var lines = originalElement.text().match(/\n/g);
     lines = (lines ? lines.length : 0) + 1;

     if (lines > 1) {
      var l = '';
      for (var i = 0; i < lines; i++) {
       l += (i + 1) + '\n';
      }
      originalElement.attr('data-lines', l);
     }
    }
    /********************************/
    if (elemOptions[1] === 'true') {
     //link clickable
     $(this).html($(this).html().replace(/\bhttp[^ ]+/ig, function(str) {
      return '<a href="' + str + '" target="_blank">' + str + '<\/a>';
     }));
    }
    /********************************/
    if (elemOptions[2] === 'true') {
     //wrap long lines
     originalElement.children("code").css({"white-space": "pre-wrap"});
    } else {
     originalElement.children("code").css({
      "min-width": options.colboxMinWidth,
      "white-space": "pre"
     });
    }
    /********************************/
    if (elemOptions[3] === 'true') {
     //hide source code
     originalElement.hide();
     if (elemOptions[5] === 'pos') {
      //wrap source code with div
      originalElement.wrap('<div class="posts_collapsable-box" />');
     } else {
      originalElement.wrap('<div class="comments_collapsable-box" />');
     }
     //add click event to its parent
     var originalelementParent = originalElement.parent();
     //add title to collapsable box
     originalelementParent.prepend(elemOptions[4]);
     //add click event
     originalelementParent.click(function() {
      originalElement.slideToggle(options.colboxTransition);
     });
    }
   } else {
    //code is inline just add highlight class
    originalElement.addClass('highlight');
   }
  });
 };
})(jQuery);
/*******************************************************************************/
/* custom script for bits plugin admin page built with love and cup of coffee */
jQuery(document).ready(function($) {
 //set highlighter
 $('pre[data-bit$="pos"]').stylerPack({});
 $('div[data-bit$="com"] > code').commentstylerPack({});
});