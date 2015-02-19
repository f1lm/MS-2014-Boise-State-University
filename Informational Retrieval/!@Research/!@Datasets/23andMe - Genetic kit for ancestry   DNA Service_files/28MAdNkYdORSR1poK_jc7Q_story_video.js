(function(){
    var videoId = TTAM.howitworks.videoid;
    var videoTitle = 'A 23andMe Ancestry Story: Reuniting Sisters';

    // vars for xb support
    var ytPlayerReady = false;
    var playClicked = false;

    // user-agent switching
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1
    var isIphone = ua.indexOf('iphone') > -1;
    var isIpad = ua.indexOf('ipad') > -1;

    // don't load the video on iPhones or android devices
    if ( !isAndroid && !isIphone && !isIpad){
        window.onYouTubeIframeAPIReady = function() {
            var player = new YT.Player('inner-video-container', {
                width: '854',
                height: '480',
                videoId: videoId,
                playerVars: {
                    'autohide':'1',
                    'theme': 'light',
                    'showinfo': '0',
                    'wmode': 'transparent',
                    'suggestedQuality': 'large'
                },
                events: {
                    'onStateChange': onPlayerStateChange,
                    'onReady': onPlayerReady
                }
            });
            $('.video-still2').click(function() {
                playClicked = true;
                $('.hide-when-video-playing').hide();
                $('.video-container').fadeIn('slow');
                if( ytPlayerReady === true ) {  // for chrome & mac ff
                    player.playVideo();
                }
            });
            $('.close-video').click(function() {
                player.pauseVideo();
                $('.hide-when-video-playing').show();
                $('.video-container').hide();
            });
        };
    } else {
        $('<iframe id="story-video" class="youtube-player" type="text/html" width="854" height="480" src="https://www.youtube.com/embed/' + videoId + '?wmode=transparent&autohide=1&theme=light&showinfo=0&modestbranding=0&rel=0&color=white" frameborder="0"></iframe>').appendTo('#inner-video-container');
        if ((isIphone || isAndroid) && $(window).height() <= 500) {
            $('#story-video').css('max-height', '219px');
        }
    }

    function onPlayerReady(event) {
        // some browser-player combinations trigger this on page load
        // others trigger it when the player is shown. Handle both cases.
        ytPlayerReady = true;
        if( playClicked === true ) {
            event.target.playVideo();
        }
    }

    function onPlayerStateChange(event) {
        // hide video when it ends
        if(event.data ===  YT.PlayerState.ENDED){
            $('.video-container').hide();
            $('.hide-when-video-playing').show();
        }
    }

    $(document).ready(function() {
        // let android & iPhone users open the video natively since
        // the iframe embeds are inconsistent on these mobile platforms
        if( isAndroid || isIphone || isIpad) {

            $('.video-still2').click(function() {
                $('.hide-when-video-playing').hide();
                $('.video-container').fadeIn('slow');
            });

            $('.close-video').click(function() {
                $('#story-video').attr('src', $('#story-video').attr('src'));
                $('.hide-when-video-playing').show();
                $('.video-container').hide();
            });

        }
        $('a.video-still2').click(function(){
            trackGAEvent("Story Video", "Play", videoTitle);
        });
    });
}());
