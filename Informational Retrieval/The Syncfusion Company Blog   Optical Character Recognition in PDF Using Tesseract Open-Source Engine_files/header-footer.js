$(document).ready(function () {

    if (typeof $.browser.msie != "undefined" && $.browser.msie && $.browser.version < 7) {
        //alert("For best viewing of our site in IE, please try with IE7 or higher version of IE");
        $('#master-main-section').after("<div id='IEVersion'></div");
        $('#IEVersion').load('/home/IEVersion');
    }

    $(".menuitem").mouseover(function () {
        var offsetValue = -Math.abs($(this).offset().left);
        if ($(this).find("#submenu_container")) {
            $(this).find(".submenu_container").css("left", offsetValue);
        }
    });

    //backgorund size issue fix for IE version<=8
    if (typeof $.browser.msie != "undefined" && $.browser.version <= 8) {
        $(".master-header-left").css({ "width": "166px", "margin-right": "18px", "padding": "10px 0px" });
        $(".master-header-left #logo").css({ "height": "49px" });
    }

    //search and account changes
    $("search-container").hide();
    $('#search').attr("autocomplete", "off").attr("NAME", "keyword");

    $(document).on('click', '.logout-icon, .arrow-icon', function () {
        $('#logout-section').css("top", $("#menu-signin").outerHeight());
        $('#logout-section').slideToggle("fast");
        if ($('#menu-signin').hasClass("bghover")) {
            $('#menu-signin').removeClass("bghover");
        }
        else {
            $('#menu-signin').addClass("bghover");
        }
    });


    if (typeof $.browser.msie != "undefined" && $.browser.version <= 9) {
        $(".placeholder").show();
        $("#Password,#Email").focus(function () {
            $(this).siblings(".placeholder").css('z-index', '-1');
        });
        $("#Password,#Email").focusout(function () {
            if ($(this).val() == '') {
                $(this).siblings(".placeholder").css('z-index', '1');
            }
        });
    }


    $('.search-icon').on('click', function () {
        $('#search-container').slideToggle("fast");
        if ($(this).parent().hasClass("bghover")) {
            $(this).parent().removeClass("bghover");
        }
        else {
            $(this).parent().addClass("bghover");

        }
        $("#search").focus();

    });



    $(".search-btn").click(function () {
        if ($('#search').val() == "") {
            return false;
        }
        return true;
    });


});


function ajaxLogin() {

    if ($('#Email').val() != '' && $('#Password').val() != '') {
        var url = "/account/ajaxlogin";
        var data = '{"username":"' + $('#Email').val() + '", "password":"' + $('#Password').val() + '", "rememberMe":"' + $("#Rememberme").is(':checked') + '"}';
        $.ajax({
            type: "POST",
            url: url,
            beforeSend: onBeginLogin,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: onLoginSuccess,
            error: function (result) {
                $("#login-section").removeWaitingPopUp();
                window.location = window.location.href;
            }
        });
        $('.User-login').addClass("login-button");
    }
    else if ($('#Email').val() == '' && $('#Password').val() == '') {
        $('#emailValidationError').html("*Please enter your email address").show();
        $('.form-group').css("margin-top", "20px");
        $('#passwordValidationError').html("*Please enter your password").show();
    }
    else if ($('#Email').val() == '') {
        $('#emailValidationError').html('*Please enter your email address').show();
        $('.form-group').css("margin-top", "20px");
        $('#passwordValidationError').hide();
    }
    else {
        $('#emailValidationError').hide();
        $('.form-group').css("margin-top", "0px");
        $('#passwordValidationError').html("*Please enter your password").show();
    }
}
function onBeginLogin() {
    $("#login-section").showWaitingPopUp({ loadingImage: "/Content/en-US/Home/Images/spinner_1.GIF" })
    $("#login-section").css("position", "absolute");
}

function onLoginSuccess(result) {
    $("#login-section").removeWaitingPopUp();
    var loc = $("#login-section");
    if (result != null) {
        if (result.IsLoginSuccess) {
            if (result.DisplayName.length > 8) {
                var displayName = result.DisplayName.substring(0, 6) + '...';
            }
            else {
                var displayName = result.DisplayName;
            }
            $('#menu-signin').html('<div class="logout-icon content-medium">Hi, ' + displayName + '</div>' + '<div class="arrow-icon"></div>');
            $('#menu-signin').removeClass("bghover");
            click = false;
            $('#login-section').slideUp("slow");
            $('#logout-section .customername').html(result.DisplayName);
            if (result.DisplayImage != null) {
                $('#logout-section .customerimage').html('<div id="cus-image" style="background-image:url(' + 'data:image/jpeg;base64,' + result.DisplayImage + ')" ></div>')
            }
            else {
                $('#logout-section .customerimage').html('<img id="cus-image" src="/Content/en-US/Images/default-profile.png" alt="default picture" />');
            }
        }
        else {
            if (result.EmailResult != null && result.EmailResult != '' && result.PasswordResult != null && result.PasswordResult != '') {
                $('#emailValidationError').html(result.EmailResult).show();
                $('.form-group').css("margin-top", "20px");
                $('#passwordValidationError').html("*" + result.PasswordResult).show();
            }
            else if (result.EmailResult != null && result.EmailResult != '') {
                $('#emailValidationError').html("*" + result.EmailResult).show();
                $('.form-group').css("margin-top", "20px");
                $('#passwordValidationError').hide();
            }
            else if (result.PasswordResult != null && result.PasswordResult != '') {
                $('#emailValidationError').hide();
                $('.form-group').css("margin-top", "0px");
                $('#passwordValidationError').html("*" + result.PasswordResult).show();
            }
        }
    }
}


function maintestResults(formelement) {
    var key = $('#search').val();
    if (key == null || key == "Search site" || key == "") {
        return false;
    }
    else
        return true;
}

function AutoCompleteSearchText(arg) {
    autocompleteObj = $("#search").ejAutocomplete("instance");


    var keyword = arg.value;

    if (keyword.trim() != "") {
        $.ajax({
            type: "post",
            url: "/search/GetData",
            data: { "QueryString": keyword },
            dataType: "json",

            success: function (result) {

                autocompleteObj.model.dataSource = result;
                autocompleteObj._OnTextEnter();

            }
        });

    }
}

function AutoCompleteSelectedText(Suggestedurl) {

    var key = arg.value;
    var url = "/search/" + key + "/1/website";
    window.location = Suggestedurl;
}

$(document).on("click", function (event) {
    $(".menuitem .title").removeClass('bghover');

    if ($("#login-section").is(":visible") && !$(event.target).closest("#login-section").length && !$(event.target).closest("#menu-signin").length) {
        $("#login-section").slideUp("fast");
        $("#menu-signin").removeClass("bghover");

    }

    if ($("#logout-section").is(":visible") && !$(event.target).closest("#logout-section .column").length && !$(event.target).closest("#menu-signin").length) {
        $("#logout-section").slideUp("fast");
        $("#menu-signin").removeClass("bghover");

    }

    if ($("#search-container").is(":visible") && !$(event.target).closest("#search-container").length && !$(event.target).closest(".search-bar").length && !$(event.target).closest("#search_suggestion").length) {
        $("#search-container").slideUp("fast");
        $('.search-bar').removeClass("bghover");
    }
});


$(window).load(function () {

    var windowWidth = $(window).width();
    $(".menuitem .submenu_container").css("width", windowWidth);

});

$(window).resize(function () {
    var windowWidth = $(window).width();
    $(".menuitem .submenu_container").css("width", windowWidth);

    if ($("#submenu_container").is(":visible")) {
        var offsetValue = -Math.abs($("#submenu_container").closest(".menuitem").offset().left);
        $(".submenu_container").css("left", offsetValue);
    }
    $('#logout-section').slideUp("fast");
    $('#menu-signin').removeClass("bghover");
});

function menuClick(args) {
    var currentTarget = args.Events.event.currentTarget;
    var targetElement = args.Events.event.target;
    if ($(targetElement).closest(".submenu_container").length && $("#syncfusionMenu").is(":visible") && !$(currentTarget).hasClass("dl-back")) {
        if (args.Events.event.target.nodeName == "A") {
            window.location.href = args.Events.event.target.href;
        }
        else {
            $(targetElement).closest(".submenu_container").attr("aria-hidden", false);
            $(targetElement).closest(".submenu_container").css("display", "block");
            $(targetElement).closest(".submenu_container").stop();
        }
    }

    if ($(currentTarget).hasClass('menuitem')) {
        if ($("#login-section").is(":visible")) {
            $("#login-section").slideUp("fast");
            $("#menu-signin").removeClass("bghover");
        }
        if ($("#search-container").is(":visible")) {
            $("#search-container").slideUp("fast");
            $('.search-bar').removeClass("bghover");
        }
        if ($("#logout-section").is(":visible")) {
            $("#logout-section").slideUp("fast");
            $("#menu-signin").removeClass("bghover");
        }

    }

    if ($(targetElement).hasClass('title')) {
        if ($(targetElement).hasClass('bghover'))
            $(targetElement).removeClass('bghover');
        else {
            $(".menuitem .title").removeClass('bghover');
            $(targetElement).addClass('bghover');
        }
    }
}

function menuCreate(args) {
    $(".syncfusion-menu").show();
}

