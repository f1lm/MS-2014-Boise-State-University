require(['jquery/nyt'], function($) {
    $(document).ready(function () {
        $(".toggleContent").on("click", ".showContent", function() {
            $(this).hide().parents(".toggleContent").find(".hiddenContent").slideDown("fast");
        });
        $(".entry-content").on("click", ".toggle-more-link", function() {
            $(this).hide().parents(".entry-content").find(".toggle-content").slideDown("fast").removeClass("hidden");
        });
    });
});
