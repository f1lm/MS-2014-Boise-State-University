$(function() {

    $(document).keydown(function(event) {

        if (event.which == 39) {
            player.gotopage('n');
        }
        if (event.which == 37) {
            player.gotopage('p');
        }
    });

    $("#pagnav").keydown(function(event) {
        if (event.which == 13) {
            player.gotopage($(this).val());
        }

    });


});

//var Player = function (total,container,imgpath,target){//constructor 
function Player(total, container, imgpath, target)
{
    //private members    
    var container = '#' + container;
    var index = 1;
    var total = total;
    var previndex = 1;
    var imgIndexes = 0;
    var playerclickedaction = '';
    var currentslide = "#" + target + index;
    var loadedarr = new Array();
    var floadedarr = new Array();
    var imageFURLs = new Array();
    loadedarr[1] = "#div" + index;
    this.gotopage = gotopage;
    var urls = [];
    var loadedURLS = [];
    var floadedURLS = [];

    for (i = 0; i < total; i++)
    {

        imgindex = imageURLs[i].substr(imageURLs[i].lastIndexOf('-n') + 2, (imageURLs[i].lastIndexOf('.jpg') - imageURLs[i].lastIndexOf('-n') - 2));

        imageURLs[i] = imgpath + '/' + imageURLs[i];

        imageFURLs[i] = imageURLs[i].replace('-n' + imgindex + '.jpg', '-l' + imgindex + '.jpg');

    }

    //preloadImages(imageURLs);
    //$(document).ready(function() start
    $(document).ready(function() {

        $(currentslide + ' span').children('img').attr('src', $(currentslide + ' span').children('img').attr('data-normal'));
        $(currentslide).attr('class', 'slideshow');
        $(currentslide).hide();

        $('.slideshow img').load(function() {

            loadedarr[index] = currentslide;
            $(currentslide).show();
            preloadImages(imageURLs);
        });
        $(container).click(function(event) {
            if (playerclickedaction == 'prev')
            {
                gotopage('p');
            }
            if (playerclickedaction == 'next')
            {
                gotopage('n');
            }
            $("#log").html("<div> Slide : " + index + "</div>");
        });

        $(".map").mousemove(function(event) {
            //var msg = "Handler for .mousemove() called at ";
            // msg += event.pageX + ", " + event.pageY;

            //$('html,body').css('cursor',url('left.png?339dfa1c1ef420a8e0560bc663bbf2d7047ef6a2'));
            //alert((event.pageX - this.offsetWidth));

            var position = $(this).offset();

            percent = 20;

            //if(FullScreenActivated == true)
            //percent = 40;

            currntx = (this.offsetWidth * percent / 100) + position.left;
            limx = (event.pageX);

            if (limx < currntx)
            {
                $(container).attr('class', 'leftcur');
                playerclickedaction = 'prev';
            }
            else if (event.pageX > (this.offsetWidth * 70 / 100) + position.left)
            {
                $(container).attr('class', 'rightcur');
                playerclickedaction = 'next';
            }

            /*if((event.pageX - this.offsetLeft) < 200)
             {
             
             $(container).attr('class','leftcur');
             playerclickedaction = 'prev';
             }
             else if(this.offsetWidth-200 < event.pageX)
             {
             $(container).attr('class','rightcur');
             playerclickedaction = 'next';
             }*/
            else
            {
                $(container).attr('class', 'defcur');
                playerclickedaction = '';
            }

        });

    });
    //$(document).ready(function()) end		
    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    function isInt(n) {
        return +n === n && !(n % 1);
    }
    // goto page start
    function gotopage(page)
    {

        $('#replay').hide();

        if (page == 'n' && index == total)
            $('#replay').show();
        if (page == 'n' && index + 1 <= total)
            index = index + 1;
        else if (page == 'p' && index - 1 >= 1)
            index = index - 1;
        else if (page == 'l')
            index = parseInt(total);
        else if (page == 'c') {
            index = index;
            previndex = index - 1;
            imgIndexes = index;
        }
        else if (page == 'f')
        {
            index = 1;
            playerclickedaction = '';
        }
        else if ($.isNumeric(page))
        {
            index = parseInt(page);
            //previndex = index-1;
        }
        else
            return;

        prevslide = "#" + target + previndex;
        prevslide2 = "#" + target + (previndex - 1);
        if (index <= total && index >= 1 && previndex != index)
        {
            if (index % 6 == 0)
            {
                if ($('#read').length > 0) {
                    $('#read').html('<iframe src="http://www.slideserve.com/re-ads.php" width="300" height="250" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" frameborder="0" scrolling="no"></iframe>').hide().fadeIn(1000);

                }
            }

            previndex = index;
            currentslide = "#" + target + index;


            if (!isInArray(imageFURLs[index], floadedURLS))
                imgIndexes = index;

            if (!isInArray(imageURLs[index - 1], loadedURLS))
                imgIndexes = index;

            $("#pagnav").val(index);

            if (!inArray(currentslide, loadedarr))
            {
                $(currentslide).hide();
                $(prevslide).attr('class', 'slide');
            }
            if (FullScreenActivated == false)
            {

                $(currentslide + ' span').children('img').attr('src', $(currentslide + ' span').children('img').attr('data-normal'));

                $(currentslide).attr('class', 'slideshow');
                $(prevslide).attr('class', 'slide');
                $('.slidew').css({'display': 'none'});
                //$(prevslide).hide();
                // if(inArray((currentslide-1),loadedarr))
                {
                    // $(prevslide).hide();

                    //alert(prevslide2);
                    $(prevslide2).hide();
                }
            }
            else
            {
                $(currentslide + ' span').children('img').attr('src', $(currentslide + ' span').children('img').attr('data-full'));
                $(currentslide).attr('class', 'slideshow');
                $(currentslide).attr('class', 'slideshow');
                $(prevslide).attr('class', 'slide');
                $('.slidew').css({'display': 'none'});
              
                if($('#htmlplayer').width() > $('#htmlplayer').height())
                $('.slideshow').css({'display': 'block'});
                else
                $('.slideshow').css({'display': 'table'});
                //if(!inArray((currentslide-1),loadedarr))
                {
                    //$(prevslide).hide();
                    // prevslide2 = "#"+target+previndex-1;

                    $(prevslide2).hide();
                }
            }


            prevImgloaded = imgIndexes;

            imgIndexes = imgIndexes - 3;

            for (i = imgIndexes; i <= (prevImgloaded + 3); i++)
            {
                if (i < total && i > 0)
                {



                    //if(!isInArray(imgpath+'/Slide'+(i+1)+'.png',loadedURLS))
                    {
                        var cacheImage = document.createElement('img');

                        //if(FullScreenActivated == false)
                        {
                            if (!isInArray(imageURLs[i], loadedURLS))
                            {

                                cacheImage.src = imageURLs[i];
                                loadedURLS[i] = imageURLs[i];
                            }

                        }
                        if (FullScreenActivated == true)
                        {
                            if (!isInArray(imageFURLs[i], floadedURLS))
                            {
                                var cacheImage = document.createElement('img');
                                cacheImage.src = imageFURLs[i];
                                floadedURLS[i] = imageFURLs[i];

                            }

                        }
                        //alert(imageURLs[i]);
                        imgIndexes++;
                    }
                }
            }


            if (FullScreenActivated == false)
                if (inArray(currentslide, loadedarr)) {
                    $(currentslide).attr('class', 'slideshow');
                    $(currentslide).show();
                    $(prevslide).attr('class', 'slide');
                    $(prevslide).children('img').attr('src', '');
                    $(prevslide).hide();
                    $('.slidew').css({'display': 'none'});
                }
            if (FullScreenActivated == true)
                if (inArray(currentslide, floadedarr)) {
                    $(currentslide).attr('class', 'slideshow');
                    $(currentslide).show();
                    $(prevslide).attr('class', 'slide');
                    $(prevslide).children('img').attr('src', '');
                    $(prevslide).hide();
                    $('.slidew').css({'display': 'none'});
                    
                    if($('#htmlplayer').width() > $('#htmlplayer').height())
                    $('.slideshow').css({'display': 'block'});
                    else
                    $('.slideshow').css({'display': 'table'});
                    
                }

            //$(currentslide+' img').load(function(){
            $(currentslide + ' span').children('img').load(function() {
                //$('.slideshow img').load(function(){
                $(currentslide).attr('class', 'slideshow');
                if (FullScreenActivated == false)
                    loadedarr[index] = currentslide;
                else
                    floadedarr[index] = currentslide;
                
                $(currentslide).show();
                $(prevslide).attr('class', 'slide');
                $(prevslide).hide();
                $('.slidew').css({'display': 'none'});

            });
        }
    }
    // goto page end

    //Preload images start
    function preloadImages(array) {

        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        for (var i = 0; i < (array.length - 1) && i < 3; i++) {
            /*var img = new Image();
             img.src = array[i];
             preloadImages.list.push(img);*/

            var cacheImage = document.createElement('img');
            cacheImage.src = array[i];

            loadedURLS[i] = array[i];

            imgIndexes++;
        }
    }
    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle)
                return true;
        }
        return false;
    }


}
;
