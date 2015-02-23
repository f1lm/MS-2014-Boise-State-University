function launchFullscreen(element) {

    if (FullScreenActivated == true)
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    else if (FullScreenActivated == false)
    {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    else
        return;

}

document.addEventListener("fullscreenchange", function(e) {
    ResizePlayer()
});
document.addEventListener("mozfullscreenchange", function(e) {
    ResizePlayer()
});
document.addEventListener("webkitfullscreenchange", function(e) {
    ResizePlayer()
});
document.addEventListener("msfullscreenchange", function(e) {
    ResizePlayer()
});

function ResizePlayer()
{
    if (FullScreenActivated == true)
    {
        FullScreenActivated = false;
        player.gotopage('c');
        $("#AdSense").show();
        $('.slidew').css({'display': 'block'});
        $('.imgsl').css({'display': 'block'});
        $('.slideshow').css({'display': 'block'});
        $('.map').css({'height': ''});

        $("#full-overlay").css({'height': ''});
        $("#full-overlay").css({'overflow-y': ''});
        var cnt = $("#full-overlay").contents();
        $("#full-overlay").replaceWith(cnt);

        $("#blank_box").css({'position': 'absolute'});
        $("#blank_box").css({'top': '75px'});
        $("#blank_box").css({'left': '60px'});
        $('#view-fullscreen').attr('title', 'Full Screen');
        $("#full-overlay").css({'overflow-y': ''});
        $("#share_box").removeClass("share_box-full")
        $("#share_box").addClass("share_box");
        
        if(imgheight < 452)
        {
            perc = 452 - imgheight;
            perc = perc+3+'px';
            //alert(perc);
            $('.map').css({'padding-top': perc});
        }
        
    }
    else
    {
        FullScreenActivated = true;
        player.gotopage('c');
        
        $("#AdSense").hide();

        $("#full-overlay").css({'overflow': 'hidden'});
        $("#share_box").removeClass("share_box");
        $("#share_box").addClass("share_box-full");
        $("#blank_box").css({'position': 'absolute'});
        $("#blank_box").css({'top': '35%'});
        $("#blank_box").css({'left': '30%'});       
        {  
            $('.map').css({
                'max-height': 'none',
                'width': 'auto',
                'height': '100%',
                'vertical-align': 'middle',
                'max-width': '100%',
                'text-align': 'center',
                'padding-top':'0px'
            });
            $('.slidew').css({'display': 'table'});
            $('.imgsl').css({'display': 'table-cell'});
            $('.slideshow').css({'display': 'table'});              
        }
 
        
    }
}

