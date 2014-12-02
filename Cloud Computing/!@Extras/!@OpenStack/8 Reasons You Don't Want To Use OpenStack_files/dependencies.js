(function ($) { 

    $.fn.stickySidebar = function (options) {

        var config = $.extend({ 
            wrapperSelector: '#content', 
            sidebarTopMargin: 150
        }, options);

        //var runTwice = false;

        var fixSidebr = function () {
            var viewportHeight = $(window).height() - ($('header[role=banner]').height() + $('#wpadminbar').height()); 
            var viewportWidth = $(window).width();
            var documentHeight = $(document).height(); 

            var content = $(this);
            var contentTop = content.offset().top;
            var contentHeight = $(content).outerHeight();
            var contentBottom = contentTop + contentHeight;

            var wrapper = $(content).closest(config.wrapperSelector);
            var wrapperTop = $(wrapper).offset().top; 
            var wrapperHeight = $(wrapper).outerHeight();

            var breakingPoint1 = $(wrapper).offset().top + 20;
            var breakingPoint2 = (wrapperTop + wrapperHeight) - contentHeight;

            var wrapperBottom = breakingPoint1 + wrapperHeight;
            
            var scroll_top = $(window).scrollTop() + ($('header[role=banner]').height() + $('#wpadminbar').height()); 


            // Check all important value
            // console.log('wrapper sticky content height:'+wrapperHeight+ ', sticky content height '+contentHeight+ ', viewport height : '+viewportHeight);
            
            // calculate
            //console.log('not clean '+wrapperHeight+' '+contentHeight);
            if ((viewportHeight > contentHeight) && (viewportHeight > contentHeight)) {


                if (scroll_top < breakingPoint1) {

                    content.removeClass('sticky-element');

                } else if ((scroll_top >= breakingPoint1) && (scroll_top < breakingPoint2)) {

                    content.addClass('sticky-element').css('top', config.sidebarTopMargin); 

                } else/* if( contentTop > breakingPoint1 && contentBottom < wrapperBottom)*/{

                    var negative = breakingPoint2 - scroll_top + ($('header[role=banner]').height() + $('#wpadminbar').height());
                    content.addClass('sticky-element').css('top', negative);

                }

                /*
                if(wrapperHeight < contentHeight){
                    content.removeClass('sticky-element');
                    console.log('clean '+wrapperHeight+' '+contentHeight);
                }*/
            }

        }

        
        return this.each(function () {
            $(window).on('scroll', $.proxy(fixSidebr, this));
            $(window).on('resize', $.proxy(fixSidebr, this))
            $.proxy(fixSidebr, this)(); 
        });
 
    };

    /**
     * Fix url with anchor, put an offset of the menu height since the top menu is fixe, so the targeted position of the anchor goes under the menu
     */
    $(document).ready(function() {
        var identifier = window.location.hash;
        if (identifier!='' && $(identifier).offset()) {
            $('html, body').animate({
                scrollTop: $(identifier).offset().top-$('#primary-bar').height()-$('#secondary-bar').height()
            }, 200);
        }
    });
}(jQuery));

/**
 * JSON Polyfill
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Browser_compatibility
 *
 * The JSON object is not supported in older browsers. You can work around this by inserting the following code at the beginning of your scripts, allowing use of JSON object in implementations which do not natively support it (like Internet Explorer 6).
 *
 * The following algorithm is an imitation of the native JSON object:
 */

if(!window.JSON) {
  window.JSON = {
    parse: function (sJSON) { return eval("(" + sJSON + ")"); },
    stringify: function (vContent) {
      if(vContent instanceof Object) {
        var sOutput = "";
        if(vContent.constructor === Array) {
          for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
            return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
        }
        if(vContent.toString !== Object.prototype.toString) {
          return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
        }
        for (var sProp in vContent) {
          sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
        }
        return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
     }
     return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
    }
  };
}