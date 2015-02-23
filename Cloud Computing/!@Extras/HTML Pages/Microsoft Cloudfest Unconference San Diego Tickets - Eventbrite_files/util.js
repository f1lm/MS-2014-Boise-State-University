tp.util = {
    logger : function(message){
        if (tp.hashObj.debugging !== "on"){
            return;
        }
        if ( ! window.console ) console = { log: function(){} };

        console.group("::TRACKING_PIXEL_DEBUG::");
        console.log(message);
        console.groupEnd("::TRACKING_PIXEL_DEBUG::");
    },
    createImgPix : function(imgPixel){
        var img = document.createElement("img");
        img.style.display="none";
        img.src = imgPixel;
        img.width = "1";
        img.height = "1";
        img.alt="";
        img.className = "img-pixel";
        document.getElementById("img-holder").appendChild(img);
    },
    calculateHash : function(url){

        var hash = null; // fill this in below
        var hash_index = url.indexOf('#'); // find the hash ourselves, see mozilla bug #582361
        if (hash_index >= 0) {
            // grab the stuff after the # character
            hash = url.substring(hash_index + 1);
        } else {
            hash = "";
        }

        var obj;
        var decoded = decodeURIComponent(hash.replace(/\+/g, '%20')).replace(/&#34;/g, '"');

        if (decoded){
            try {
                obj = JSON.parse(decoded);
            } catch (e) {
                obj = {};
            }
        }

        return obj;
    },
    buildURL : function(baseUrl, parameters){

        var query = "?";

        for (var i in parameters) {
            query += "&" + i + "=" + parameters[i];
        }

        return baseUrl += query;

    },
    idsMatch : function(data){

        var orderFlowPages = ["event","register","orderconfirmation"];

        // if eid, organizer_uid and organizer_id all undefined then pixel is global
        if (typeof data.eid == "undefined" && typeof data.organizer_uid == "undefined" && typeof data.organizer_id == "undefined"){
            return true;
        }

        if (orderFlowPages.indexOf(tp.hashObj.page_ref) != -1){

            if (data.eid.indexOf(tp.hashObj.eid) != -1){
                return true;
            }
            else if (data.organizer_id.indexOf(tp.hashObj.organizer_id) != -1){
                return true;
            }
            else if (data.organizer_uid.indexOf(tp.hashObj.organizer_uid) != -1){
                return true;
            }

            return false;

        }

        return true;

    }
};