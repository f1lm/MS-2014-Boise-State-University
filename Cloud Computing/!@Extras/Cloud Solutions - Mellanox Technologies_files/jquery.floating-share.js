/*!
 * jQuery Floating Share Plugin v1.0.0
 * http://www.burakozdemir.co.uk
 *
 * Copyright 2014 Burak Özdemir - <mail@burakozdemir.co.uk>
 * Released under the MIT license
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "floatingShare",
        defaults = {
            place: "top-left",
            counter: true,
            buttons: ["facebook","twitter","google-plus","linkedin","envelope"],
            title: document.title,
            url: window.location.href,
            text: "share with ",
            description: $("meta[name='description']").attr("content"),
            popup_width: 400,
            popup_height: 300
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {

            // store to access in for each
            var $gey = this;

            // check if user's place is defined in places
            if ($.inArray(this.settings.place, places) == -1)
                this.settings.place = this._defaults.place;

            // create element, attention : important tag in size
            var $template = $("<div>", {id: "floatingShare"});
            var $child = $("<div>", {class: this.settings.place})
            $child.appendTo($template);

            // for each buttons, append the buttons
            $.each( this.settings.buttons, function( index, value ){
                $.each( networks, function( k, v ) {
                    if (value == k) {
                        var $component = $("<a>", { title: $gey.settings.title, class: ""+v.className+" pop-upper"});
                        var $icon = $("<i>", {class: "mtop5 fa fa-" + value + ""}); // font-awesome here
                        var _href = v.url;
                        _href = _href.replace('{url}', $gey.settings.url).replace('{title}', $gey.settings.title).replace('{description}', $gey.settings.description);
                        $component.attr("href", _href).attr("title", $gey.settings.text + value).append($icon);
                        if($gey.settings.counter === true){
                            setShareCount(value, $gey.settings.url,$component);
                        }
                        $child.append($component);
                        return false; // end each networks if found
                    }
                });
            });
            // appended all the elements
            $template.appendTo(this.element);

            // get all the popup guys
            var diss = $(this.element).find('.pop-upper');
            diss.on("click",function(event) {
                event.preventDefault();
                openPopUp($(this).attr("href"),$(this).attr("title"),$gey.settings.popup_width,$gey.settings.popup_height);
            });
        }

    });

    var networks = {
        "facebook" : { className: "feysbuk", url:"https://www.facebook.com/sharer/sharer.php?u={url}&t={title}" },
        "twitter": { className: "tivitir", url:"https://twitter.com/home?status={url}" },
        "google-plus": { className: "gogil", url: "https://plus.google.com/share?url={url}" },
        "linkedin":  { className: "linktin", url: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}&source=" },
        "envelope":  { className: "meyil", url: "mailto:info@mellanox.com.com?subject={url}" },
        "pinterest":  { className: "pinter", url: "https://pinterest.com/pin/create%2Fbutton/?url={url}" },
        "stumbleupon":  { className: "stambul", url: "https://www.stumbleupon.com/submit?url={url}&title={title}" }
    };

    var places = ["top-left", "top-right"];

    function openPopUp(url, title, width, height){
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((w / 2) - (width / 2)) +  10;
        var top = ((h / 2) - (height / 2)) +  50;
        var userWindow = window.open(url, title, 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
        userWindow.focus();
    }

    function setShareCount(network,url,$component){
        switch(network) {
            case "facebook":
                $.get('http://graph.facebook.com/'+url, function(data){
                    if(data.shares && data.shares > 0){
                        var $shareCount = $("<div>", {class: "shareCount"});
                        $shareCount.append(data.shares); // probably didn't get here so we will update it
                        $component.append($shareCount);
                        // had been shared before, then remove the margin top
                        $component.find("i").removeClass("mtop5");
                    }
                },'jsonp');
                break;
            case "twitter":
                $.get('http://urls.api.twitter.com/1/urls/count.json?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<div>", {class: "shareCount"});
                        $shareCount.append(data.count); // probably didn't get here so we will update it
                        $component.append($shareCount);
                        // had been shared before, then remove the margin top
                        $component.find("i").removeClass("mtop5");
                    }
                },'jsonp');
                break;
            case "linkedin":
                $.get('http://www.linkedin.com/countserv/count/share?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<div>", {class: "shareCount"});
                        $shareCount.append(data.count); // probably didn't get here so we will update it
                        $component.append($shareCount);
                        // had been shared before, then remove the margin top
                        $component.find("i").removeClass("mtop5");
                    }
                },'jsonp');
                break;
            case "pinterest":
                $.get('http://api.pinterest.com/v1/urls/count.json?url='+url+'&callback=?', function(data){
                    if(data.count && data.count > 0){
                        var $shareCount = $("<div>", {class: "shareCount"});
                        $shareCount.append(data.count); // probably didn't get here so we will update it
                        $component.append($shareCount);
                        // had been shared before, then remove the margin top
                        $component.find("i").removeClass("mtop5");
                    }
                },'jsonp');
                break;
            default:
                return -1;
        }
    }


    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );
