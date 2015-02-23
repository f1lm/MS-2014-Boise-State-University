if(document.referrer.match("facebook.com")) {
	var thirtyminutes = new Date();
	thirtyminutes = new Date(thirtyminutes.getTime() + 30*60000);
	jQuery.cookie('fbref', 1, { expires: thirtyminutes });
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    	dd='0'+dd
} 
if(mm<10) {
   		 mm='0'+mm
} 
today = yyyy+ '-' +mm + '-'+dd;

jQuery(document).ready(function() {
	if (window.location.pathname.length <=1) { //home page
		//jQuery('.brilliant-wrapper').corner("bevel br");
		//jQuery('.brilliant-triangle').corner("bevel tl");
	}

	jQuery('body.gla-takeover').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.location.href = 'http://ad.doubleclick.net/ddm/clk/282991228;109887109;v';
		}
	});

	jQuery('body.garfunkel-oates').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.location.href = 'http://www.ifc.com/shows/garfunkel-and-oates';
		}
	});

	jQuery('body.knk').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.location.href = 'http://ads.pointroll.com/PortalServe/?pid=2382383A39820140728183237&pos=c&r=1407503018';
		}
	});
    jQuery('body.Hyundai-takeover').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.location.href = 'https://ad.doubleclick.net/ddm/clk/284049812;111032197;y';
		}
	});
	jQuery('body.Mercedes-takeover').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.open('http://ad.doubleclick.net/ddm/clk/284537803;111768553;m', '_blank');
		}
	});
	jQuery('body.Mini-takeover').click(function(e) {
		if(e.target.tagName == "BODY") {
			window.open('http://ad.doubleclick.net/ddm/clk/285023694;112016825;a', '_blank');
		}
	});
	
	
	// jQuery('body#pid-convenience').click(function(e) {
// 	if(e.target.tagName == "BODY") { 
//        			window.open('http://adfarm.mediaplex.com/ad/ck/16161-203032-44278-36?mpcr=39568035&mpt=[CACHEBUSTER]', '_blank');
// 		}
// 	});
// 	
// 	jQuery('body#pid-section-wellsconvenience').click(function(e) {
// 	if(e.target.tagName == "BODY") { 
//        			window.open('http://adfarm.mediaplex.com/ad/ck/16161-203032-44278-36?mpcr=39568035&mpt=[CACHEBUSTER]', '_blank');
// 		}
// 	});  
// 	
	// for INSTANTEXPERT remove active trail from KF menu item
	jQuery("body#pid-section-instantexpert  ul.main-menu li.sf-item-2").removeClass('active-trail');
});

//Refresh the ads on the page
function refreshAds() {
    //console.log("Loading ads");
    try {
        googletag.pubads().refresh();
    }
    catch(ex) {
    	console.log("Error refreshing ads-" + ex.toString());
    }
}

var imageArray = new Array();
			imageArray[0] = "<div><a href='http://store.mentalfloss.com/Mental-Floss-Store/MF-Gift-Guide' onClick='_gaq.push(['_trackEvent', 'Ads', 'Ad1', 'Mental_Floss Store']);'><img src='http://dev2.mentalfloss.com/sites/default/themes/mental_floss/assets/images/pi2_knowledgeFeed.jpg' class='subscribe' /></a></div>"; //You can replace these image file names with your own image names.
			imageArray[1] = "<div><a href='http://store.mentalfloss.com/Mental-Floss-Store/MF-Gift-Guide' onClick='_gaq.push(['_trackEvent', 'Ads', 'Ad1', 'Mental_Floss Store']);'><img src='http://dev2.mentalfloss.com/sites/default/themes/mental_floss/assets/images/pi3_knowledgeFeed.jpg' class='subscribe' /></a></div>";
					function doIt()
					{
						var rand = Math.floor(Math.random()*2);
						var imgPath = imageArray[rand];
						document.getElementById("ad").innerHTML = imgPath;

					}
