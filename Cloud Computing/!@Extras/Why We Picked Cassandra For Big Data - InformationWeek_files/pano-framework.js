function displayWhatsThisBox1() {
// What's This? Hover Display
    var theMenuPosition = $(".guest-blog-link").offset();
    var theMenuLeft = theMenuPosition.left;
    var theMenuTop = theMenuPosition.top;
    var theBox = document.createElement("div");
    theBox.id = "guest-blog-box";
    var theBoxContent = "InformationWeek's <i>Partner Perspectives</i> allows thought leaders from our sponsor community connect directly with InformationWeek's audience - and participate in the conversation - on the InformationWeek digital publishing platform. Each <i>Partner Perspectives</i> post is written by the sponsor. For more information on <i>Partner Perspectives</i> please email us directly at <a href='mailto: partnerperspectives@ubm.com'>partnerperspectives@ubm.com</a>.";
    theBox.innerHTML=theBoxContent;
    document.body.appendChild(theBox);
    $(theBox).css("top",theMenuTop + 27).css("left",theMenuLeft).fadeIn("slow");
}
function displayAuthorInfoBox(el, authorName, authorTitle) {
    if ($('#featured-writer-box').length > 0) {
        document.getElementById("featured-writer-box").remove();
    }
    var theMenuPosition = $(el).offset();
    var theMenuLeft = theMenuPosition.left;
    var theMenuTop = theMenuPosition.top;
    var theBox = document.createElement("div");
    theBox.id = "featured-writer-box";
    var theBoxContent = "<span class='tiny allcaps'>" + authorName + "</span><br /><span class='tiny'>" + authorTitle + "</span>";
    theBox.innerHTML=theBoxContent;
    document.body.appendChild(theBox);
    $(theBox).css("top",theMenuTop + 47).css("left",theMenuLeft + 10).fadeIn("slow");
}
function showMobileIconOverlay(theName) {
// This function will display the selected mobile navigation while closing any that may be currently open
    if ($("#mobile-menu-on").length > 0) {
        var theMenu = $("#mobile-menu-on").attr("name");
        closeMobileOverlayMenu(theMenu);
    }
    $("div#mobile-menu-" + theName).attr("id","mobile-menu-on");
    goToByScroll("container-main");
}
function closeMobileOverlayMenu(theName) {
// This function will close the selected mobile navigation
    $("div#mobile-menu-on").attr("id","mobile-menu-" + theName);
}
function goToByScroll(e) {
// This function will scroll the supplied element into view
    $("html,body").animate({scrollTop:$("#"+e).offset().top},"normal");
}
function sizeAnyBrightcoveObjects() {
// This function scales Brightcove objects
    $("span[id^='_containermyExperience_']").css("width","100%");
    $("span[id^='_containermyExperience_'] object").width("100%");
    $("object[id^='myExperience_']").width("100%").css("width","100%");
    $("div[id^='bcplayer_'] object").width("100%").css("width","100%");
    $("#radio_player object, .BrightcoveExperience").width("100%").css("width","100%");
}
function sizeDocImageClass() {
// This image scales docimages relative to their container
    $(".docimage").each(function() {
        var imgWidth = $(this).width();
        var colWidth = $(this).parent().width();
        if (imgWidth > colWidth) {
            $(this).width("100%");
        }
    })
}
// Mobile Swipe Functionality
function swipeleftHandler(event){
    var theVideoContent = $(this).attr("id");
    theVideoContent = theVideoContent.replace('LRSlider_Content_','');
    eval(theVideoContent + "SliderHandler.LRSliderSlideRight(1)");
}
function swiperightHandler(event){
    var theVideoContent = $(this).attr("id");
    theVideoContent = theVideoContent.replace('LRSlider_Content_','');
    eval(theVideoContent + "SliderHandler.LRSliderSlideLeft(1)");
}
// Mobile Touch-Enabled Drop Down Functions
function tapholdHandler(event){
    $(".navbuttonbuttonhasmenu").not(this).each(function() {
        var buttonName = $(this).attr("name");
        ToggleNavButtonMenu(buttonName, 'off');
    });
    var buttonName = $(this).attr("name");
    ToggleNavButtonMenu(buttonName, 'on');
}
function tapholdOutHandler(event){
    $(".navbuttonbuttonhasmenu").each(function() {
        var buttonName = $(this).attr("name");
        ToggleNavButtonMenu(buttonName, 'off');
    });
}
