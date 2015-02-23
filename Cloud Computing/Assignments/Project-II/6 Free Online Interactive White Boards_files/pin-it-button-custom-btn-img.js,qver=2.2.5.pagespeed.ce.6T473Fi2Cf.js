//JS to create count bubble for custom image button
//Modified from original Pinterest iframe pinit.html

(function($) {
    "use strict";

    $(function() {

        var baseApiUrl = "//partners-api.pinterest.com/v1/urls/count.json?callback=?";
        //before 1/1/2013: var baseApiUrl = "//api.pinterest.com/v1/urls/count.json?callback=?";

        //Loop through pin it button table that contains css/image and count bubble
        $(".pib-count-table").each(function (index) {
            var parentContainer = $(this);

            //Get link tag container
            var pinItLink = parentContainer.find(".pin-it-btn-custom-img-link");

            //Set vars from custom data attributes now
            var countLayout = pinItLink.data("count-layout");
            var targetUrl = pinItLink.data("target-url");
            var mediaUrl = pinItLink.data("media-url");

            //Request count from API
            if (countLayout != "none") {

                //If no targetUrl use mediaUrl
                if (!targetUrl) {
                    targetUrl = mediaUrl;
                }

                //Decode URL and convert + to space
                //http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
                targetUrl = decodeURIComponent(targetUrl.replace(/\+/g, " "));

                //Send url, ref and source variables like bottom of pinit.html from Pinterest
                $.getJSON(baseApiUrl, { url: targetUrl, ref: targetUrl, source: 6 }, function (data) {

                    //Don't show count bubble if count is zero
                    //Or returning dash ("-") as it is since 12/11/2012 when service from Pinterest became intermittent
                    if ( (data.count < 1) || (data.count === "-") ) {
                        return;
                    }

                    //Transform count (from Pinterest JS)
                    var count = data.count;
                    if (count > 999 && count <= 999999)
                        count = Math.floor(count / 1000) + "K+";
                    else if (count > 999999 && count <= 999999999)
                        count = Math.floor(count / 1000000) + "M+";
                    else if (count > 999999999)
                        count = "++";

                    //If this far display the bubble and count
                    parentContainer.find(".pib-count-cell").show();
                    parentContainer.find(".pib-count-bubble").html(count);
                });
            }
        });

    });

}(jQuery));
