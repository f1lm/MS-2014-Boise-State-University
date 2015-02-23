var SocializeLinks = function(facebookAppId) {
    var $ = jQuery.noConflict(), postToFacebookFeed = function(link, name, caption, description, image, callback) {
        if (FB) {
            var options = {
                method: "feed",
                link: link,
                picture: image,
                name: name,
                caption: caption,
                description: description
            };
            FB.ui(options, callback);
        }
    };
    $("a.share").click(function(e) {
        e.preventDefault();
        var action = $(this).attr("data-action"), loc = location.href, text = $(this).attr("data-text"), url = $(this).attr("data-url");
        if (url = url || loc, "facebook" === action) {
            var callback, name = text, caption = $(this).attr("data-caption"), desc = $(this).attr("data-desc"), image = $(this).attr("data-image");
            postToFacebookFeed(url, name, caption, desc, image, callback);
        }
    }), window.fbAsyncInit = function() {
        FB.init({
            appId: facebookAppId,
            channelUrl: "//" + window.location.host + "/facebookChannel.php",
            status: !0,
            cookie: !0,
            xfbml: !0
        });
    }, function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        d.getElementById(id) || (js = d.createElement(s), js.id = id, js.src = "//connect.facebook.net/en_US/all.js", 
        fjs.parentNode.insertBefore(js, fjs));
    }(document, "script", "facebook-jssdk");
}, scrollbarWidth = function() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'), $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner), inner = $inner[0], outer = $outer[0];
    jQuery("body").append(outer);
    var width1 = inner.offsetWidth;
    $outer.css("overflow", "scroll");
    var width2 = outer.clientWidth;
    return $outer.remove(), width1 - width2;
};

jQuery.fn.eqHeights = function() {
    var el = jQuery(this);
    return el.length > 0 && !el.data("eqHeights") && (jQuery(window).bind("resize.eqHeights", function() {
        el.eqHeights();
    }), el.data("eqHeights", !0)), el.each(function() {
        var curHighest = 0, columns = jQuery(this).children(), viewportWidth = jQuery(document).width() + scrollbarWidth();
        670 > viewportWidth ? columns.height("auto") : columns.each(function() {
            var el = jQuery(this), elHeight = el.height("auto").height();
            elHeight > curHighest && (curHighest = elHeight);
        }).height(curHighest);
    });
}, jQuery(document).ready(function($) {
    $(document).foundation(), SocializeLinks("339486449527368"), $("header.header").on("click", ".btn-resp-menu", function(e) {
        e.preventDefault();
        var menuBtn = $(this);
        return menuBtn.hasClass("open") ? ($(".resp-menu-container").hide(), menuBtn.removeClass("open")) : ($(".resp-menu-container").show(), 
        menuBtn.addClass("open")), !1;
    }), $("body.home").length > 0 && $(".callstoaction > ul").eqHeights();
});