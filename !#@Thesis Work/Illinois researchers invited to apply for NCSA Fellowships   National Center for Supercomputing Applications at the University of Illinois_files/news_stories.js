$(document).ready(function() {


	if ($(window).width() > 1023) {
		$("a.fancybox").addClass("fancybox-mark");
		$("a.fancybox").removeClass("fancybox");
	}
	else {
		$("a.fancybox-mark").addClass("fancybox");
		$("a.fancybox-mark").removeClass("fancybox-mark");
	}



	if ($(window).width() > 1023) {stopCarousel();}
        else {
        	addJscripts();
            	startCarousel();
        }
        $("#myCarousel").swiperight(function() {$("#myCarousel").carousel('prev');});
       	$("#myCarousel").swipeleft(function() {$("#myCarousel").carousel('next');});
        
        $(".fancybox").fancybox({
            openEffect  : 'none',
            closeEffect : 'none'
        });
        $(".various").fancybox({
            fitToView   : false,
            autoResize  : true,
            autoCenter  : false,
            autoSize    : true,
            closeClick  : false,
            topRatio    : 0.25,
            leftRatio   : 0.25,
            openEffect  : 'none',
            closeEffect : 'none',
            iframe      : {
            preload 	: false
            }
        });
    });

/*function to load files for news story */
function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}

	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}
/*function to remove files when news is big */
function removejscssfile(filename, filetype){
var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
var allsuspects=document.getElementsByTagName(targetelement)
for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
}
}  
enquire.register("screen and (min-width:0px) and (max-width: 1023px)", {
	match : function() {
        	addJscripts();
		setTimeout(function() {startCarousel()}, 1000);
        },
        unmatch : function() {stopCarousel();}
    });

function startCarousel() {
	$('.carousel').carousel({
		interval: 10000
	})
    $('.carousel-control').show();
    $('.item').attr('class', 'item');
    $('.item:first-child').attr('class', 'active item');
    $('.carousel-indicators').show();
    $('.carousel .slideExtra').hide();
}

function stopCarousel() {
    removeJscripts() ;
    $('.carousel').carousel('pause');
    $('.carousel-control').hide();
    $('.item').attr('class', 'active item');
    $('.carousel-indicators').hide();
    $('.carousel .slideExtra').show();
}
function addJscripts() {
	loadjscssfile("/assets/js/jquery_mobile_custom.min.js", "js");
	loadjscssfile("/assets/js/bootstrap.min.js", "js");
	loadjscssfile("/?css=styles/bootstrap.min.v.1380575541", "css");  
	loadjscssfile("/assets/js/jquery.fancybox.pack.js", "js");
	loadjscssfile("/?css=styles/jquery.fancybox.v.1380032341", "css");  
}
function removeJscripts() {
	removejscssfile("/assets/js/jquery_mobile_custom.min.js", "js");
	removejscssfile("/assets/js/bootstrap.min.js", "js");
	removejscssfile("/?css=styles/bootstrap.min.v.1380575541", "css");
    	removejscssfile("/assets/js/jquery.fancybox.pack.js", "js");
    	removejscssfile("/?css=styles/jquery.fancybox.v.1380032341", "css");
}

