$(document).ready(function() {
    //  console.log("afterview called");

    $("ul.sf-menu").supersubs({
        pathClass: 'currently-selected-menu-item',
        minWidth: 12,   // minimum width of sub-menus in em units 
        maxWidth: 26,   // maximum width of sub-menus in em units 
        extraWidth: 1     
    });  // call supersubs first, then superfish, so that subs are 
    // not display:none when measuring. Call before initialising 
    // containing tabs for same reason.
    $("#nav").css("display", "block");

    $("#master-footer").removeClass("hide");
}
);