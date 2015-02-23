/**
 * @version 1.0
 * @modified by Yufang Chang
 * @project Description
 * @handlging mobile site behaviors object[id^=flashObj]:has(param[value*="brightcove"]);
 */

if (typeof CN === 'undefined' || !CN) {
    var CN = {};
}

CN.mobile = CN.mobile || {};

CN.mobile = (function($) {
    var audioPlacementInfo = {},
        uagent = navigator.userAgent.toLowerCase(),
        videoSelectors = {
           bcBlogObject : 'object[id^=flashObj]:has(param[value*="brightcove"])',
           bcBlogEmbed  : 'embed[base*="brightcove"]'
        },




       /**
        * @method formAudioTagFromInfo
        * @private
        * @update create audio tag object
       */
       formAudioTagFromInfo = function(song, config){
            return $('<audio/>').attr({controls : 'controls',src :song }).addClass("audio");
       },


        /**
        * @method embedHTML5Audio()
        * @public
        * @embed html 5 audio
        */
        embedHTML5Audio = function(data) {
            var config = (this.config) ? this.config : this.context['config'],
                id = config.index,
                song = $("file",$(data).find('song')[0]).text(),
                caption = '<div class="caption">'+$("name",$(data).find('song')[0]).text()+'</div>',
                audioScriptTag = formAudioTagFromInfo(song, config),
                nextSiblingOfAudio = audioPlacementInfo[id],
                audioTagParent = nextSiblingOfAudio.parentNode;

               if (!nextAdjacentNode.length){
                  $(audioScriptTag).appendTo(audioPlacementInfo[id]).wrap('<div class="audio-container" />').parent().prepend(caption);
               } else {
                  $(audioScriptTag).insertBefore(audioPlacementInfo[id]).wrap('<div class="audio-container" />').parent().prepend(caption);
               }


            return this;
        },




        getXML = function(config) {
           if (!config.xml) {
              return;
           }

           $.ajax({
                url: config.xml,
                cache: true,
                context: { config: config },
                success:  embedHTML5Audio
            });

         };



    return {

    /**
        * @method init()
        * @public
        * @add mobile class to body tag
    */
    init: function() {

       if (CN.mobile.detectDevicesSupported() && CN.site.mobilecompatible !== undefined) {
         $('body').addClass('mobile');
       }

       return this;
    },


   /**
        * @method createHtml5Audios()
        * @public
        * @param id of the div
    */
    createHtml5Audios: function(id,swf) {
          var audioObj =  $("#"+id),
              nextAdjacentNode = audioObj.next(),
              parentAdjacentNode = audioObj.parent(),
              config = {
                       xml : swf.flashvars.replace("xmlFile=", ""),
                       width : swf.width,
                       height : swf.height,
                       index : id
              };

              audioPlacementInfo[id] = (!nextAdjacentNode.length) ? parentAdjacentNode : nextAdjacentNode;
              getXML(config);

        return this;
    },




    /**
        * @method removeFlashContent()
        * @public
        * @removed all flash objects on the page besides brightcove
           flash video objects
    */
    removeFlashContent: function() {

       $('body.mobile embed[type="application/x-shockwave-flash"],body.mobile object[type="application/x-shockwave-flash"]').not(videoSelectors['bcBlogObject'] + "," + videoSelectors['bcBlogEmbed']).parent().remove();
       return this;
    },


     /**
        * @method removeBlogVideos()
        * @public
        * @removed all flash objects on the page besides brightcove
           flash video objects
    */
    removeSwf: function(obj,frm) {
     obj.remove();
     $(window).trigger('CN.customEvents.swfRemoved');
     CN.debug.info('swf object is removed', [frm.src])
     return this;
    },

    /**
        * @method removeIframeFlashContent()
        * @public
        * @removed all flash objects in sandbox iframe
    */
    removeIframeFlashContent: function() {

       $("body.mobile iframe[src^='/sandbox']").each(function() {
         var frame     = $(this)[0],
             frameBody = frame.contentWindow.document.body;

             $(window).bind('CN.customEvents.swfRemoved', function() {
                CN.frame.resize(frame);
                $(window).unbind('CN.customEvents.swfRemoved');
             });

             CN.mobile.removeSwf($(frameBody.getElementsByTagName("embed"),frameBody.getElementsByTagName("object")),frame);

       });

       return this;
    },






    /**
        * @method removeBlogVideos()
        * @public
        * @removed all flash objects on the page besides brightcove
           flash video objects
    */
    removeBlogVideos: function() {
     $(videoSelectors['bcBlogObject']).each(function(index) {
          var oid = jQuery(this).attr("id");
          jQuery(this).attr("id",oid+index);
          CN.brightcove.mobile.init(jQuery(this).attr("id"));
     });

     $(videoSelectors['bcBlogEmbed']).each(function(index) {
       CN.brightcove.mobile.embedBlogVideos(jQuery(this));
     });

     return this;
    },

    /**
     * @method detectIPad
     * @public
     * @return true if iphone or ipad
     */
     detectIPad: function() {
       return (uagent.search('ipad') > -1 ? true : false);

     },

     /**
      * @method detectIPhone
      * @public
      * @return true if iphone or ipad
      */
      detectIPhone: function() {
         return(uagent.search('iphone') > -1 ? true : false);
      },

      /**
      * @method detectBlackBerry
      * @public
      * @return true if on blackberry
      */
      detectBlackBerry: function() {
          return(uagent.search('blackberry') > -1 ? true : false);

      },

       /**
      * @method detectAndroid
      * @public
      * @return true if on android
      */
      detectAndroid: function() {
          return((uagent.search('android') > -1 || uagent.search('droid') > -1) ? true : false);
      },

      detectDevicesSupported: function() {
        return(CN.mobile.detectIPhone() || CN.mobile.detectIPad() || CN.mobile.detectBlackBerry() || CN.mobile.detectAndroid());
      },

      updateOrientation: function() {
          $("body").removeClass((window.orientation == 0) ? "landscape" : "portrait").addClass((window.orientation == 0) ? "portrait" : "landscape");
      }



    };
})(jQuery);

jQuery(document).ready(function() {
 CN.mobile.init().removeBlogVideos().removeFlashContent().removeIframeFlashContent();
});








