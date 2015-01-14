
/***************************************
 * Validate Registration URL
 * and Show Popup when validated success
 *
 */
CN.validateRegistration=(function(){
    var url_Param_ecomUpsellURL, url_window=window.location.href;
    return {
        checkSuccessURL : function() {
            if(CN.url.params("ecomUpsell", url_window)=="true") {
                url_Param_ecomUpsellURL=decodeURIComponent(decodeURIComponent(CN.url.params("ecomUpsellURL", url_window)));
                url_Param_ecomUpsellURL=url_Param_ecomUpsellURL.replace(/^https*:\/\//g, window.location.protocol+"//");
               var isiFrame = CN.config.get('isiFrame');
                if(isiFrame == true) {
                    CNP.ecom.openiframe(url_Param_ecomUpsellURL);
                } else {
                    window.open(url_Param_ecomUpsellURL, "PaymentPage", "menubar=1,status=0,resizable=0,toolbar=0,scrollbars=0,width=910,height=560,left="+((screen.width)/3)+",top="+((screen.height)/3));
                }

            }

        }
    };
})();


CN.hearstQue = (function() {

    var queue = [], alreadyDone = false, order = 0;

        return {

            register: function(fn) {
                if (!fn){
                    return;
                }

                queue.push(fn);

                if(alreadyDone) {
                    this.run(window.pageAds);
                }
            },

            getQue: function(){
                return queue;
            },

            run: function(pageAds) {
                while(queue.length > 0) {
                    queue[0](pageAds);
                    queue.shift();
                }
                alreadyDone  = true;
            }
    };

})();

jQuery(document).ready(function() {
    CN.validateRegistration.checkSuccessURL();
});
