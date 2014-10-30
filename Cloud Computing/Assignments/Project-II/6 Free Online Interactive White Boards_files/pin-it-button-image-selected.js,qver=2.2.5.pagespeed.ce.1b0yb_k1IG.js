//Custom button image "image pre-selected" JS
//Hooks up click event to open popup like original embed code

(function($) {
    "use strict";

    $(function() {

        $("a.pin-it-btn-custom-img-pre-selected").on("click", function(event) {
            event.preventDefault();
            var modal = window.open($(this).attr("href"), "pibModal", "width=760,height=370");
            if (window.focus) {
                modal.focus();
            }
            event.stopPropagation();
        });

    });

}(jQuery));
