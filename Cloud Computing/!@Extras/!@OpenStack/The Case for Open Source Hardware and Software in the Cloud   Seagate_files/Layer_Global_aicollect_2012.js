// ***************************************************
//File:          Layer_Global_aicollect.js
//Description:   This js file is located on the iPerceptions server
//               It is used to shut off all scripts.
//version:       March.2012
//****************************************************

var globalswitch;

globalswitch = true;
try {
    if( (document.getElementById("IPEMaintenanceMessage") !== null && /iperceptions_(comment_)?\d\d*/i.test(window.name)) || window.IPerceptionsMobileAllow) {
        //Comment card fix.  Do not turn block mobile/tablet/IE10.
    } else {
        //Prevent crawlers and Mobile browers
        globalswitch = (function (a) { if (/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|googlebot|google web preview|msbot|yahoo|bingbot|silk|mobile|rim tablet|hp-tablet|touch;|touch\)|wpdesktop/i.test(a)) return false; else return true; })(navigator.userAgent || navigator.vendor || window.opera);

        //block IE10
        //(function() { try { if(globalswitch) {var ua = navigator.userAgent.toLowerCase(), isIE = ua.indexOf('msie') != -1 && ua.indexOf('opera') == -1 && ua.indexOf('webtv') == -1; re = /trident\/([\d]+)/.exec(ua); if(isIE && re && re[1] && parseInt(re[1]) >= 6) { globalswitch = false; } } } catch(err) {  } })();

        //block Opera
        if (navigator.userAgent.toLowerCase().indexOf('opera') != -1 || navigator.userAgent.toLowerCase().indexOf('opr/') != -1) { globalswitch = false; }

    }
}
catch(e) {
}

 //globalswitch = false; //To stop invitation

//If Google Chrome: don't serve
if (globalswitch == true) {

    try {

        

        if (typeof(iperceptions) !== "undefined" && typeof (iperceptions) !== "object" && iperceptions !== null && typeof (iperceptions.execute) === "function") {
           iperceptions.execute();
        }
        else if ((typeof (keepThisInvitationActive) !== "undefined")) {
                if ((keepThisInvitationActive == "true") || (keepThisInvitationActive == true)) {

                    Hitit();
                }
        } 
        else {
          Exec();
        }
        

    }
    catch (err) { /*alert(err)*/ }
}
