/* 
* * !!HAT - Version 1.0.3 - 2014.08.07!!!!!!!!!!!!!!!!!!
*/
if (window.jQuery) {
    (function($) {
        setTimeout('TimehatDropdown()', 700);
        setTimeout('hatResize()', 700);
    })(jQuery);

}
	
//Omniture Tracking
function getOmniture(val) {
    var prop20;
    prop20 = val.toLowerCase();
    if (typeof (s_time) == "object") {
        s_time.prop20 = 'gh_' + prop20 + '';
    }
}
var hattrackId;
function TimehatDropdown() {
    parent.jQuery("div#time_inc_hat").css({
        'height': '100%'
    });
    
    if(jQuery("#hatmain").length){
        hattrackId = jQuery(".hatmenu ul#hatslots li:nth-child(2) a").attr('href');   
        hattrackId = hattrackId.split(/\?/)[1];
    }
    if(hattrackId != ''){
        jQuery('#morelink').html("<a id='more' href='#'><p>MORE</p></a><ul id='hatmore' class='hatmore'></ul>");
        jQuery('#hatmore').append("<li id='allyou'><a href=\"http://www.allyou.com/?"+hattrackId+"\"><p>All You</p></a></li><li id='coastal'><a href=\"http://www.coastalliving.com/?"+hattrackId+"\"><p>Coastal Living</p></a></li><li id='cookinglight'><a href=\"http://www.cookinglight.com/?"+hattrackId+"\"><p>Cooking Light</p></a></li><li id='cozi'><a href=\"http://www.cozi.com/?"+hattrackId+"\"><p>Cozi</p></a></li><li id='departures'><a href=\"http://www.departures.com/?"+hattrackId+"\"><p>Departures</p></a></li><li id='essence'><a href=\"http://www.essence.com/?"+hattrackId+"\"><p>Essence</p></a></li><li id='ew'><a href=\"http://www.ew.com/ew/?"+hattrackId+"\"><p>Entertainment Weekly</p></a></li><li id='foodwine'><a href=\"http://www.foodandwine.com/?"+hattrackId+"\"><p>Food &amp; wine</p></a></li><li id='fortune'><a href=\"http://fortune.com/?"+hattrackId+"\"><p>Fortune</p></a></li><li id='golf'><a href=\"http://www.golf.com/?"+hattrackId+"\"><p>Golf</p></a></li><li id='health'><a href=\"http://www.health.com/health/?"+hattrackId+"\"><p>Health</p></a></li><li id='instyle'><a href=\"http://www.instyle.com/instyle/?"+hattrackId+"\"><p>InStyle</p></a></li> <li id='life'><a href=\"http://life.time.com/?"+hattrackId+"\"><p>Life</p></a></li><li id='money'><a href=\"http://time.com/money/?"+hattrackId+"\"><p>Money</p></a></li><li id='myhomeideas'><a href=\"http://www.myhomeideas.com/?"+hattrackId+"\"><p>My Home Ideas</p></a></li><li id='myrecipes'><a href=\"http://www.myrecipes.com/?"+hattrackId+"\"><p>My Recipes</p></a></li><li id='people'><a href=\"http://www.people.com/people/?"+hattrackId+"\"><p>People</p></a></li><li id='espanol'><a href=\"http://www.peopleenespanol.com/?"+hattrackId+"\"><p>People En Espanol</p></a></li><li id='realsimple'><a href=\"http://www.realsimple.com/?"+hattrackId+"\"><p>Real Simple</p></a></li><li id='southernliving'><a href=\"http://www.southernliving.com/?"+hattrackId+"\"><p>Southern Living</p></a></li><li id='si'><a href=\"http://www.si.com/?"+hattrackId+"\"><p>Sports Illustrated</p></a></li><li id='sunset'><a href=\"http://www.sunset.com/?"+hattrackId+"\"><p>Sunset</p></a></li><li id='time'><a href=\"http://time.com/?"+hattrackId+"\"><p>Time</p></a></li><li id='toh'><a href=\"http://www.thisoldhouse.com/toh/?"+hattrackId+"\"><p>This Old House</p></a></li><li id='travelleisure'><a href=\"http://www.travelandleisure.com/?"+hattrackId+"\"><p>Travel &#43; Leisure</p></a></li><li id='seeall'><a href=\"http://www.timeinc.com/brands/?"+hattrackId+"\"><p>See All Brands</p></a></li>");
    }
    jQuery("#hatmore").hover(
            function() {
                jQuery('#morelink a#more').css({
                    'background-image': 'url(\'http://img5.timeinc.net/hat/img/morelogo_hover.png\')'
                });
            },
            function() {
                jQuery('#morelink a#more').css({
                    'background-image': 'url(\'http://img5.timeinc.net/hat/img/morelogo.png\')'
                });
            }
    );
    jQuery("#more").hover(
            function() {
                jQuery(this).css({
                    'background-image': 'url(\'http://img5.timeinc.net/hat/img/morelogo_hover.png\')'
                });
            },
            function() {
                jQuery(this).css({
                    'background-image': 'url(\'http://img5.timeinc.net/hat/img/morelogo.png\')'
                });
            }
    );
    if(jQuery("ul#hatslots").length){
        var hatid2 = jQuery(".hatmenu ul#hatslots li:nth-child(2)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid2).addClass('hatslot-seven');
        var hatid3 = jQuery(".hatmenu ul#hatslots li:nth-child(3)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid3).addClass('hatslot-six');
        var hatid4 = jQuery(".hatmenu ul#hatslots li:nth-child(4)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid4).addClass('hatslot-five');
        var hatid5 = jQuery(".hatmenu ul#hatslots li:nth-child(5)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid5).addClass('hatslot-four');
        var hatid6 = jQuery(".hatmenu ul#hatslots li:nth-child(6)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid6).addClass('hatslot-three');
        var hatid7 = jQuery(".hatmenu ul#hatslots li:nth-child(7)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid7).addClass('hatslot-two');
        var hatid8 = jQuery(".hatmenu ul#hatslots li:nth-child(8)").attr('id').replace('hat', '');
        jQuery(".hatmenu ul#hatslots ul#hatmore li#" + hatid8).addClass('hatslot-one');
    }
    hatInIt();
}
function hatInIt(){
    if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none") {
        jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-one').removeClass("hatslot-one").addClass("hat1250");
    }
    if (jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none") {
        jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-two').removeClass("hatslot-two").addClass("hat1175");
    }
    if (jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none") {
        jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-three').removeClass("hatslot-three").addClass("hat1100");
    }
    if (jQuery('.hatmenu ul#hatslots li.hat1024').css('display') == "none") {
        jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-four').removeClass("hatslot-four").addClass("hat1024");
    }
           
    if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1024').css('display') == "none") {
        jQuery('.hatmain ul#hatslots ul#hatmore').css({
            'position':'absolute',
            top:'100%',
            left:'86%'
        });
    }
    else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none") {
        jQuery('.hatmain ul#hatslots ul#hatmore').css({
            'position':'absolute',
            top:'100%',
            left:'88%'
        });
    }
    else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none") {
        jQuery('.hatmain ul#hatslots ul#hatmore').css({
            'position':'absolute',
            top:'100%',
            left:'90%'
        });
    }
    else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none") {
        jQuery('.hatmain ul#hatslots ul#hatmore').css({
            'position':'absolute',
            top:'100%',
            left:'92%'
        });
    }
    else {
        jQuery('.hatmain ul#hatslots ul#hatmore').css({
            'position':'absolute',
            top:'100%',
            left:'92.5%'
        });
    }
}

function hatResize() {
    jQuery(window).resize(function() {
        if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none") {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-one').removeClass("hatslot-one").addClass("hat1250");
        }
        else {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hat1250').removeClass("hat1250").addClass("hatslot-one");
        }
        if (jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none") {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-two').removeClass("hatslot-two").addClass("hat1175");
        }
        else {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hat1175').removeClass("hat1175").addClass("hatslot-two");
        }
        if (jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none") {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-three').removeClass("hatslot-three").addClass("hat1100");
        }
        else {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hat1100').removeClass("hat1100").addClass("hatslot-three");
        }
        if (jQuery('.hatmenu ul#hatslots li.hat1024').css('display') == "none") {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hatslot-four').removeClass("hatslot-four").addClass("hat1024");
        }
        else {
            jQuery('.hatmenu ul#hatslots ul#hatmore li.hat1024').removeClass("hat1024").addClass("hatslot-four");
        }
        if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1024').css('display') == "none") {
            jQuery('.hatmain ul#hatslots ul#hatmore').css({
                'position': 'absolute', 
                top: '100%', 
                left: '86%'
            });
        }
        else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1100').css('display') == "none") {
            jQuery('.hatmain ul#hatslots ul#hatmore').css({
                'position': 'absolute', 
                top: '100%', 
                left: '88%'
            });
        }
        else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none" && jQuery('.hatmenu ul#hatslots li.hat1175').css('display') == "none") {
            jQuery('.hatmain ul#hatslots ul#hatmore').css({
                'position': 'absolute', 
                top: '100%', 
                left: '90%'
            });
        }
        else if (jQuery('.hatmenu ul#hatslots li.hat1250').css('display') == "none") {
            jQuery('.hatmain ul#hatslots ul#hatmore').css({
                'position': 'absolute', 
                top: '100%', 
                left: '92%'
            });
        }
        else {
            jQuery('.hatmain ul#hatslots ul#hatmore').css({
                'position': 'absolute', 
                top: '100%', 
                left: '92.5%'
            });
        }
    });
}