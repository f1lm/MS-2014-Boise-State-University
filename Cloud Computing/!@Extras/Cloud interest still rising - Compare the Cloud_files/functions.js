//Smooth scrolling
	$('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
	var target = $(this.hash); target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	if (target.length) { $('html,body').animate({ 
	scrollTop: target.offset().top-0 }, 1200); return false; } } });
//RWD resize
$(window).resize(function() {
	if ( $('.anchor').hasClass('hide') ) { 
	} else {
	$('.anchor').addClass('hide');} 
	});
//IMG swap
var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
}
$(function () {
    $('img.swap').hover(sourceSwap, sourceSwap);
});
//Random banner
	var image = new Array ();
	image[0] = "img/banner/a.jpg";
	image[1] = "img/banner/b.jpg";
	image[2] = "img/banner/c.jpg";
	var size = image.length
	var x = Math.floor(size*Math.random())
	$('#banner').attr('src',image[x]);
//Back to top
$(document).ready(function() {
    var offset = 520;
    var duration = 300;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) { $('.back-to-top').fadeIn(duration);
        } else { $('.back-to-top').fadeOut(duration); }
    }); $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration); return false; })
});
// CSS menu
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="indicatorContainer"><div id="pIndicator"><div id="cIndicator"></div></div></div>');
    var activeElement = $('#cssmenu>ul>li:first');

    $('#cssmenu>ul>li').each(function() {
        if ($(this).hasClass('active')) {
            activeElement = $(this);
        }
    });


	var posLeft = activeElement.position().left;
	var elementWidth = activeElement.width();
	posLeft = posLeft + elementWidth/2 -6;
	if (activeElement.hasClass('menu-item-has-children')) {
		posLeft -= 6;
	}

	$('#cssmenu #pIndicator').css('left', posLeft);
	var element, leftPos, indicator = $('#cssmenu pIndicator');
	
	$("#cssmenu>ul>li").hover(function() {
        element = $(this);
        var w = element.width();
        if ($(this).hasClass('menu-item-has-children'))
        {
        	leftPos = element.position().left + w/2 - 12;
        }
        else {
        	leftPos = element.position().left + w/2 - 6;
        }

        $('#cssmenu #pIndicator').css('left', leftPos);
    }
    , function() {
    	$('#cssmenu #pIndicator').css('left', posLeft);
    });

	$('#cssmenu>ul').prepend('<li id="menu-button"><a class="icon icon-menu">&nbsp;Menu</a></li>');
	$( "#menu-button" ).click(function(){
    		if ($(this).parent().hasClass('open')) {
    			$(this).parent().removeClass('open');
    		}
    		else {
    			$(this).parent().addClass('open');
    		}
    	});
    	
    $( ".compare-button" ).click(function(){	
    	event.preventDefault();
    	
    	var selected_providers = [];
    	var prov_pos = [];
        cookie = unescape($.cookie('ctc-providers'));
        if (typeof cookie != 'undefined') {
        	selected_providers = cookie.split(',');
        }
        
        console.log(selected_providers);
        
        var pid = $(this).data( "provider-id" );
        	
    	if ($(this).hasClass('selected-provider'))
        {
        	for (i = 0; i < selected_providers.length; i++) { 
	        	if(selected_providers[i] == pid){
		        	prov_pos.push(i);
	        	}
			}
			for (j = 0; j < prov_pos.length; j++) { 

		        selected_providers.splice(prov_pos[j], 1);
			}
			$.cookie('ctc-providers', escape(selected_providers.join(',')));
        	$(this).html('Compare');
        	$(this).removeClass('selected-provider');
        }
        else
        {
        	selected_providers.push(pid);
        	$.cookie('ctc-providers', escape(selected_providers.join(',')));
	        $(this).html('Selected');
	        $(this).addClass('selected-provider');
        }
    		
    	
    });
    
    $( ".clear-selection" ).click(function(){	
    	event.preventDefault();
    	$.removeCookie('ctc-providers');
    	$( ".selected-provider" ).each(function(){	
        	$(this).html('Compare');
        	$(this).removeClass('selected-provider');

        });
    		
    	
    });
    
    
    $( ".compare-providers " ).click(function(){	
    	event.preventDefault();
    	alert($.cookie('ctc-providers'));
    		
    });
    
    	
});