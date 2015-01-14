function displayWhatsThisBox() {
	var whatsthisDiv = document.getElementById("guest-blog-box");
	if (whatsthisDiv != null){ 
		document.body.removeChild(whatsthisDiv);
	}else{
    var theMenuPosition = $(".guest-blog-link").offset();
    var theMenuLeft = theMenuPosition.left;
    var theMenuTop = theMenuPosition.top;
    var theBox = document.createElement("div");
    theBox.id = "guest-blog-box";
    var theBoxContent = "You may wish this story was real, but it's purely for entertainment purposes.";
    theBox.innerHTML=theBoxContent;
    document.body.appendChild(theBox);
    $(theBox).css("top",theMenuTop + 27).css("left",theMenuLeft).fadeIn("slow");
	}	
}
function displayBitdefenderPartnerPerspectivesBox() {
    var theMenuPosition = $(".bitdefender-partner-perspectives-link").offset();
    var theMenuLeft = theMenuPosition.left;
    var theMenuTop = theMenuPosition.top;
    var theBox = document.createElement("div");
    theBox.id = "guest-blog-box";
    var theBoxContent = "Dark Reading's <i>Partner Perspectives</i> allows thought leaders from our sponsor community connect directly with Dark Reading's audience - and participate in the conversation - on the Dark Reading digital publishing platform. Each <i>Partner Perspectives</i> post is written by the sponsor. For more information on <i>Partner Perspectives</i> please email us directly at <a href='mailto:partnerperspectives@ubm.com'>partnerperspectives@ubm.com</a>.";
    theBox.innerHTML=theBoxContent;
    document.body.appendChild(theBox);
    $(theBox).css("top",theMenuTop + 27).css("left",theMenuLeft).fadeIn("slow");
}
function displayPartnerPerspectivesBoxArticle() {
    var theMenuPosition = $(".partner-perspectives-link-article").offset();
    var theMenuLeft = theMenuPosition.left;
    var theMenuTop = theMenuPosition.top;
    var theBox = document.createElement("div");
    theBox.id = "guest-blog-box";
    var theBoxContent = "Dark Reading's <i>Partner Perspectives</i> lets thought leaders from our sponsor community connect directly with Dark Reading's audience -- and participate in the conversation -- on the Dark Reading digital publishing platform. Each <i>Partner Perspectives</i> post is written by the sponsor. For more information on <i>Partner Perspectives</i> please email us directly at <a href='mailto:partnerperspectives@ubm.com'>partnerperspectives@ubm.com</a>.";
    theBox.innerHTML=theBoxContent;
    document.body.appendChild(theBox);
    $(theBox).css("top",theMenuTop + 27).css("left",theMenuLeft).fadeIn("slow");
}
function highlightTopStory(theStory) {
    if ($(".top-headline.active").length > 0) {
        $(".top-headline.active").removeClass("active");
    }
    if ($(theStory).hasClass('theTopHeadline')) {
        // Do nothing
    } else {
        $(theStory).addClass("active");
    }
}
function ToggleNavButtonMenu(inButtonName, inOnOrOff) {
    var menuName = inButtonName + '_popmenu';
    //alert(inButtonName + ' ' + inOnOrOff + ' ' + menuName);
    if (inOnOrOff == 'on') {
        if (inButtonName == "inside_lr_events" || inButtonName == "inside_show_news" || inButtonName == "inside_video") {
            PopMenu(menuName,(returnPosXofObj(GetObject(inButtonName)) ),(returnPosYofObj(GetObject(inButtonName)) + 18));
        } else {
            PopMenu(menuName,(returnPosXofObj(GetObject(inButtonName)) ),(returnPosYofObj(GetObject(inButtonName)) + 27));
        }
        lockPoppedMenu = true;
        lockedPoppedMenuObjName = menuName;
        ToggleNavButton(inButtonName,'on');
    } else {
        lockPoppedMenu = false;
        lockedPoppedMenuObjName = '';
        PopMenuOff(menuName, -990, 38);
        ToggleNavButton(inButtonName,'off');
    }
}
function ToggleNavButton(inButtonName, inOnOrOff) {
    var currentTab = $("#"+inButtonName).hasClass("theSelectedNav");
    if (inButtonName == "inside_lr_events" || inButtonName == "inside_show_news" || inButtonName == "inside_video") {
        if (inOnOrOff == 'on') {
            //$('#' + inButtonName).css('background-color', '#000000').css('color','#FFFFFF');;
            //$('#' + inButtonName.replace('inside','outside')).css('background-color', '#000000');
        } else {
            if (currentTab) {
                // Do Nothing
            } else {
                //$('#' + inButtonName).css('background-color', '#F5F6F6').css('color','#484848');;
                //$('#' + inButtonName.replace('inside','outside')).css('background-color', '#ffffff');
            }
        }
    } else {
        if (inOnOrOff == 'on') {
            $('#' + inButtonName).find('a').css('color','#de1922');
            $('#' + inButtonName).css('color','#de1922');
            //$('#' + inButtonName.replace('inside','outside')).css('background-color', '#000000');
        } else {
            if (currentTab) {
                // Do Nothing
            } else {
                $('#' + inButtonName).find('a').css('color','#fff');
                $('#' + inButtonName).css('color','#fff');
                //$('#' + inButtonName.replace('inside','outside')).css('background-color', '#ffffff');
            }
        }
    }
}


var designlinesSliderHandler = new LRSliderHandler();

designlinesSliderHandler.thisSliderElementName = 'designlinesSliderHandler';
designlinesSliderHandler.sliderElementCount = 2;
designlinesSliderHandler.sliderElementSize = 798;
designlinesSliderHandler.sliderObjectViewsize = 1;
designlinesSliderHandler.sliderRightLimit = designlinesSliderHandler.sliderElementSize * ((designlinesSliderHandler.sliderElementCount - designlinesSliderHandler.sliderObjectViewsize) * -1) + 1;
designlinesSliderHandler.currentSliderElement = 1;
designlinesSliderHandler.sliderObjectId = 'designlines_outside';
designlinesSliderHandler.sliderDoSlide = false;

var designlinesLeftArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
var designlinesRightArrowButtonMouseoutImgSrc = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';

designlinesSliderHandler.LRSliderNavGraphicsHandlerSlideLeft = function() {
    // change the input box value
    //GetObject('designlines_navform_selector').value = this.currentSliderElement;
    // now deal with the images

    var currentImage = GetObject('designlines_rightarrowbutton');
    // if we're at currentSliderElement < sliderElementCount make sure the right button is active
    if (this.currentSliderElement < this.sliderElementCount) {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';
    } else {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_right.gif';
    }
    designlinesRightArrowButtonMouseoutImgSrc = currentImage.src;

    // if sliding left, change when currentSliderElement gets to 1
    currentImage = GetObject('designlines_leftarrowbutton');
    if (this.currentSliderElement == 1) {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
    } else {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_left.gif';
    }
    designlinesLeftArrowButtonMouseoutImgSrc = currentImage.src;

}

designlinesSliderHandler.LRSliderNavGraphicsHandlerSlideRight = function() {
    // change the input box value
    //GetObject('designlines_navform_selector').value = this.currentSliderElement;
    // now deal with the images

    var currentImage = GetObject('designlines_leftarrowbutton');
    // if we're at currentSliderElement > 1 make sure the left button is active
    if (this.currentSliderElement > 1) {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_left.gif';
    } else {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_left.gif';
    }
    designlinesLeftArrowButtonMouseoutImgSrc = currentImage.src;

    currentImage = GetObject('designlines_rightarrowbutton');
    // sliding right, change when currentSliderElement gets to this.sliderElementCount
    if (this.currentSliderElement == this.sliderElementCount) {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_dark_right.gif';
    } else {
        currentImage.src = 'http://img.deusm.com/eetimes/eetimes_designlines_arrow_light_right.gif';
    }
    designlinesRightArrowButtonMouseoutImgSrc = currentImage.src;
}

var oneScrollHeight = 26;
var currentTickerItem = 0;
var numberOfTickerItems = 0;
var tickerIsPopulated = false;
var tickerTimeout;
var tickerStopped = false;

function InitializeNewsTicker() {
    if (tickerIsPopulated) {
        // attach rotate stop command to hover state and start command to hover out
        $('.newstickerwindow_item').hover(function() {
            if (tickerIsPopulated && !tickerStopped) {
                StopNewsTicker();
            }
        }, function() {
            if (tickerIsPopulated  && tickerStopped) {
                StartNewsTicker();
            }
        });
        StartNewsTicker();
    }
}

function RotateNewsTicker() {
    var newTopValue = 0;
    var newTopValueString = newTopValue.toString();
    newTopValueString = newTopValueString + 'px';
    var newCurrentTickerItem = 1;
    if (tickerIsPopulated && !tickerStopped) {
        // move down one unless we are already at the bottom, in which case scroll all the way back to the top
        if (currentTickerItem >= numberOfTickerItems) {
            // leave top value b/c we want to scroll back
            // set newCurrentPosition
            newCurrentTickerItem = 0;
            currentTickerItem = newCurrentTickerItem;
        } else {
            newCurrentTickerItem = currentTickerItem + 1;
            currentTickerItem = newCurrentTickerItem;
            newTopValue = currentTickerItem * oneScrollHeight * -1;
            newTopValueString = newTopValue.toString();
            newTopValueString = newTopValueString + 'px';
        }
        // animate
        //$('#citynewswindow_scrollcontainer').animate({ top: newTopValueString },'slow',function() { StartNewsTicker(); };);
        var tickerAnimateParams = {};
        tickerAnimateParams['top'] = newTopValueString;
        $('#citynewswindow_scrollcontainer').animate(
            tickerAnimateParams,
            'slow',
            function() {
                StartNewsTicker();
            }
        );
    }
}

function StartNewsTicker() {
    if (tickerIsPopulated) {
        tickerStopped = false;
        clearTimeout(tickerTimeout);
        tickerTimeout = setTimeout('RotateNewsTicker();',10000);
    }
}

function StopNewsTicker() {
    if (tickerIsPopulated) {
        clearTimeout(tickerTimeout);
        tickerStopped = true;
    }
}

var superNavEventsMenuOpen = false;
function ToggleSuperNavEventsMenu() {
    var menuName = 'supernav_events_popmenu';
    if (!superNavEventsMenuOpen) {
        PopMenu(menuName,(returnPosXofObj(GetObject('supernav_events_link')) - 1),(returnPosYofObj(GetObject('supernav_events_link')) + 15));
        superNavEventsMenuOpen = true;
    } else {
        superNavEventsMenuOpen = false;
        PopMenuOff(menuName, -500, 38);
    }
}
$(document).ready(function() {
	$(".bitdefender-partner-perspectives-link").hover(function() {
        displayBitdefenderPartnerPerspectivesBox();
    }, function() {
        setTimeout(function() {
            document.getElementById("guest-blog-box").remove();
        }, 500);
    });	
	
	$(".partner-perspectives-link-article").hover(function() {
		displayPartnerPerspectivesBoxArticle();
    }, function() {
        setTimeout(function() {
            document.getElementById("guest-blog-box").remove();
        }, 200);
    });
});
