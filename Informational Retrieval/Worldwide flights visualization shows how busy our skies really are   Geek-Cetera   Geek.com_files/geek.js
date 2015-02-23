var __GEEK = __GEEK || {};
__GEEK.galleryAds = __GEEK.galleryAds || [];
/* Implementing GPT ads on slideshow gallery */
var reopen = false;
/*Ad is not displaying when gallery is initialized until we refresh the gallery ad.
 so we are implementing in a way to refresh ad when you initialize gallery.
 Note: Ad was not making double click request until ad is refreshed 
 so we don't get duplicate requests/impressions.*/
function buildAds(){
	     jQuery(".gallery-ad").attr("id","GalleryAd");
		 jQuery(".gallery-ad img").hide();
	     overlayAd("GalleryAd", __GEEK.currentAds[1].adUnit, __GEEK.currentAds[1].adZdid);
		 refreshAd();
}	
function overlayAd(adTitle,adUnit,adZdid){
		 googletag.cmd.push(function() {
							var adSlot = googletag.defineSlot(adUnit,[300,250],adTitle);
								adSlot.addService(googletag.pubads())
								.setTargeting("zdid",adZdid)
								.setTargeting("cmn","zd")
								.setCollapseEmptyDiv(true);
								 googletag.enableServices();
								 googletag.display(adTitle); 
							 __GEEK.galleryAds.push({slot: adSlot});
     	 }); 
}
function refreshAd(){
        googletag.pubads().refresh([__GEEK.galleryAds[0].slot]);
}
function is_touch_device() {
  return !!('ontouchstart' in window);
}
function image_advance(){
	//GA pageview (hash is included)
	_gaq.push(['_trackPageview', document.location.href]);
	
	// Omniture pageview
	 s.t({'prop13':document.location.href})
}
var once = true;
function open_gallery(){
	/* post gallery lightbox */
	 if(once){
	   function redBars () {
			var width = jQuery(".tn3a-thumbs ul").parent().width();
			var li_width = jQuery(".tn3a-thumbs ul li").width();
			function overeffects(){
				var leftPos = -(jQuery(".tn3a-thumbs ul li:last-child").position().left - width);
				var ul_left = jQuery(".tn3a-thumbs ul").position().left;
			    if(ul_left < leftPos){
					jQuery(".tn3a-next-page").css({'border-left':'8px solid #900000'});
				} else if(ul_left > leftPos) {
					jQuery(".tn3a-next-page").css({'border-left':'8px solid #fb2e39'});
				}
			    if(ul_left < -li_width ){
					jQuery(".tn3a-prev-page").css({'border-left':'8px solid #fb2e39'});
				} else {
					jQuery(".tn3a-prev-page").css({'border-left':'8px solid #900000'});
				}
			}
			
			window.setInterval(overeffects,200);
		}
	 
		jQuery('.mygallery').tn3({
		    skinDir: templateDir+'/css/skins',
			skin:"tn3a",
			cssID:"tn3a",
			keyNavigation:'always',
			mouseWheel: false,
			albums_click: false,
			touch: {
				skin: 'tn3a'
			},
			history: { 
				slugField: 'slug',
				key: 'gallery'
			},
			image:{
				crop:true,
				transitions:[{
					type:"blinds",
					duration:300
				}],
				transition:function(){
				    buildAds();
				}
			},
			thumbnailer:{
				 load:function(){
				     var li_len = jQuery(".tn3a-thumbs ul li").length;
					 if(li_len > 6){
						     jQuery(".tn3a-thumbs .tn3a-next-page").css({'display':'block','border-left':'8px solid #fb2e39'});
							 jQuery(".tn3a-thumbs .tn3a-prev-page").css({'display':'block','border-left':'8px solid #900000'});
							 redBars();
			         }
				}
			}
		}); /* tn3 */
		once = false;
	} /* once */
	
	jQuery.fancybox({
			'href':'#gallery',
			'overlayShow': true,
			'padding': 0,
			'margin': 0,
			'autoSize': true,
			'minWidth': 980,
			'width': 980,
			'scrolling':'no',
			'arrows':false,
			'closeEffect':'fade',
			'openSpeed':0,
			'closeSpeed':300,
			'afterClose':function(){
			    reopen = true;
			},
			'afterShow':function(){
		       if(reopen == true){
			        refreshAd();
                }
			}
		});
}
__GEEK.emailValid = __GEEK.emailValid || function(email){
	    var emailReg =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailaddressVal = emailReg.test(jQuery.trim(email));
        return  emailaddressVal;
}
__GEEK.emailSignup = __GEEK.emailSignup || function(clientId, key, endpoint){
              jQuery("#email-submit").click(function() {
              	     jQuery(".error").hide();
              	     var hasError = false;
              	     var email = jQuery(".email-input").val().toLowerCase();
                     var emailSignupVal = __GEEK.emailValid(email);
                     if (email == '' || email == 'Email Address...' ) {
                           jQuery("#email-submit").after('<span class="error">Please Enter Your Email Address</span>');
                           hasError = true;
                     } else if (!emailSignupVal) {
                           jQuery("#email-submit").after('<span class="error">Please Enter a valid Email Address</span>');
                           hasError = true;
                     }
                     if (hasError == true) {
                          return false;
                     }
                     var data = {
                       action:"subscribe",
                       email: email,
                       listName:"geek",
                       mailFormat:"H",
                       memberSource:"GK"
                     };
                     zdbb.email.client_id = clientId ;
                     zdbb.email.hash_key = key;
                     zdbb.email.subscribe_user(data, function(response){
                      try {
                          jsonresult = JSON.parse(response);
                      } catch (e) {
                          jsonresult = eval(response);  
                      }
                      if(jsonresult.success == false){
                        jQuery(".success").hide();
                        jQuery("#email-submit").after('<span class="error">' + jsonresult.message +'</span>');
                      }else{
                        jQuery(".error").hide();
                        jQuery("#email-submit").after('<span class="success">Thank you for signing up!</span>');
                      }
                     }, endpoint);
              
                  }); 
};
jQuery(document).ready(function(){
	
	jQuery('body').addClass('hasjs');
	
	/* sticky header/footer */
	var menu = jQuery('#menu'),
		container = jQuery('#container'),
		pos = menu.offset().top,
		social = jQuery('.socialmediabottom'),
		footer = jQuery('footer');
	
	// detect header pos for home		
	if(jQuery('body').hasClass('home') && !jQuery('body').hasClass('paged')){
	
		jQuery(window).scroll(function(){
		
			if(jQuery(this).scrollTop() > pos + menu.height() && menu.hasClass('default')){
					menu.removeClass('default').addClass('fixed');
					container.css('padding-top', '104px' );
			} else if(jQuery(this).scrollTop() <= pos && menu.hasClass('fixed')){
					menu.removeClass('fixed').addClass('default');
					container.css('padding-top', '20px' );
			}
		});
	
	// otherwise set fixed
	}else{
	
		menu.removeClass('default').addClass('fixed');
		container.css('padding-top', '104px' );
	}
	
	// footer detection
	if( jQuery('body').hasClass('single-post') || jQuery('body').hasClass('single-deal_categories') ){
		
		// touch devices don't handle scroll detect well
		if(is_touch_device()){
			social.addClass('fixedfooter');
			footer.css('padding-bottom','50px');
		}else{
		
			jQuery(window).scroll(function(){
			
				if(jQuery(this).scrollTop() + jQuery(window).height() > jQuery('footer').offset().top && social.hasClass('fixedfooter')){
						social.removeClass('fixedfooter');
						container.css('padding-bottom','0px')
				} else if(jQuery(this).scrollTop() + jQuery(window).height() <= jQuery('footer').offset().top && !social.hasClass('fixedfooter')){
						social.addClass('fixedfooter');
						container.css('padding-bottom','50px');;
				}		
			});
		}
	}
		
	var infPage = 1;
	
	/* infinite scroll */
	if( jQuery('body').hasClass('category') || 
		(jQuery('body').hasClass('home') && jQuery('body').hasClass('paged') ) || 
		jQuery('body').hasClass('author') || 
		jQuery('body').hasClass('tag') ){

			if(jQuery('body').hasClass('home')) infPage = 2;

			/* To get the current page number and set infPage to it */
			var currPath = window.location.pathname;
			var page = currPath.match('/.*page\/([0-9]*)\/?.*/');
			if (page != null) infPage = page[1];
			
			var infinite_scroll = {
				loading: {
					img: templateDir + '/images/loading.gif',
					msgText: '',
					finishedMsg: '',
					speed: 0
				},
				state: {
					currPage: infPage
				},
				pathParse: function(path,nextPage){
				   path = path.split('//').slice(1).toString();
				   match = path.match('/(.*\/)([0-9]*)(.*)/');
				   return ['/'+match[1], '/'];
				 },
				bufferPx: 2000,
				nextSelector: '.pagenationsearch a:last-child',
				navSelector: '.pagenationsearch',
				itemSelector: '.section2',
				contentSelector: '.rightpanel',
				maxPage: maxPages
			};
			
			jQuery( infinite_scroll.contentSelector ).infinitescroll( 
				infinite_scroll,
				function(){
				
					/* on page load */
					infPage++;
					
					// Omniture
					s.t({'evar3':s.pageName + ' | ' + infPage});
					
					//GA
					_gaq.push(['_trackPageview', document.location.href+'page/'+infPage]);
				} 
			);
	}
	
	
	jQuery(".fancybox").click(function(event) {
			
		event.preventDefault();
		open_gallery();
		
	});	/* click */
    /* Newsletter Email Signup focus/blur function */
	    jQuery('.email-input').each(function() {
            var default_value = this.value;
            jQuery(this).focus(function() {
                if (this.value == default_value) {
                    this.value = '';
                }
            });
           jQuery(this).blur(function() {
                if (this.value == '') {
                    this.value = default_value;
                }
            });
        });
	/* Newsletter */
	// Email validation
	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/i);
		return pattern.test(emailAddress);
	}

	jQuery('FORM.newsletter').submit(function(e) {
		var msgElmt = jQuery(this).find('.message');

		e.preventDefault(); // Prevent form from submitting
		msgElmt.html(''); // Clear previous messages

		if (!isValidEmailAddress(jQuery(this).find('INPUT[type="text"]').val())) msgElmt.addClass('err').html('Error, invalid email address.');
		else {
			var data = jQuery(this).serialize();
			jQuery.post(jQuery(this).attr('action'), data, function(data, textStatus, jqXHR) {
				msgElmt.addClass('success').html(data['message']);
			}, 'json').error(function() {
				msgElmt.addClass('err').html('Error, please try again.');
			});
		}
	}); /* Newsletter */
	
	
	/* check hash for gallery popup */
	var hash = window.location.hash.slice(1);
	if(hash.indexOf('gallery') > -1){
		open_gallery();
	} 
	
	
	/* link tracking */	
	jQuery('a[ctr]').click(function(event){
	   s.prop31 = 'Home Page';
	   s.prop32 = jQuery(this).attr('ctr');
	   s.prop33 = jQuery(this).attr('ctr') + ' | ' + jQuery(this).attr('title');
	   s.prop38 = jQuery(this).attr('type');
	   s.linkTrackVars = 'prop31,prop32,prop33,prop38';
	   s.tl(true, 'o', s.prop31 + ' CTR');
	});
	/*Follow us */
	
	jQuery('li.followus').hover(function(){
						jQuery('#follow').show();
						 },function(){
						jQuery('#follow').hide();
	}); 
	
	/* Disqus comment count showing/hiding */
	/*jQuery('.disquscount').bind('DOMNodeInserted', function(e) {
		if (jQuery(this).html() != '0') {
			jQuery(this).parent('DIV').show();
			if (jQuery('.commentsblock .heading H5').length > 0) {
				jQuery('.commentsblock .heading H5').width(jQuery('.commentsblock .heading H5').width() - jQuery('.commentsblock .heading .number').width());
			}
		}
	});*/

	/* Disqus comment count showing/hiding */
	jQuery('.disquscount').each(function(i, elem) {
		var interval = setInterval(function() {
			// If <a> inner HTML is not empty string AND it has no span child
			if (jQuery(elem).html() != '' && jQuery(elem).children('SPAN').length <= 0) {
				// Display comment count if the count is not "0"
				if (jQuery(elem).html() != '0') {
					jQuery(elem).parent('DIV').show();

					// Resize the heading width to fit the comment count bubble
					if (jQuery('.commentsblock .heading H5').length > 0) {
						jQuery('.commentsblock .heading H5').width(jQuery('.commentsblock .heading H5').width() - jQuery('.commentsblock .heading .number').width());
					}
				}

				clearInterval(interval); // Stop the interval
			}
		}, 1000);
	});

	/* Show more Geek Deals content */
	var hidden = true;

	jQuery('.geek-deal .show-more').click(function() {
		if (hidden) jQuery('.geek-deal .show-more A').html('- Less');
		else jQuery('.geek-deal .show-more A').html('+ More');
		hidden = !hidden;
		jQuery('.geek-deal .hidden').slideToggle();
		return false;
	});
	
	/* Email Signup Overlay for Holidays */
	 var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "visited=true";
            cookieEnabled = (document.cookie.indexOf("visited=true") != -1) ? true : false;
        }
        if (cookieEnabled == true) {
            if (document.cookie.indexOf('visited=true') == -1) { //set cookie for user
                if (navigator && navigator.userAgent && navigator.userAgent != null) {
                    var strUserAgent = navigator.userAgent.toLowerCase();
                    var arrMatches = strUserAgent.match(/(iphone|ipod|ipad|android)/);
                    if (!arrMatches) {
                        var singleDay = 1000 * 60 * 60 * 24 * 365 * 10;
                        var expires = new Date((new Date()).valueOf() + singleDay);
                        document.cookie = "visited=true;expires=" + expires.toUTCString() + ";domain=.geek.com;path=/";
                        jQuery.colorbox({
                            width: "510px",
                            height: "190px",
                            inline: true,
                            href: "#newsletter-signup",
                            scrolling: false,
                            overlayClose: true
                        });
                    }
                }
			}
            var timer = window.setTimeout(function() { 
                jQuery.colorbox.close();
            }, 10000);
            jQuery('#UserEmail').click(function() { 
                clearTimeout(timer);
            });	
			jQuery('FORM.email-overlay').submit(function(e) {
		           var msgElmt = jQuery(this).find('.message');
                		e.preventDefault(); // Prevent form from submitting
		                msgElmt.html(''); // Clear previous messages
                		if (!isValidEmailAddress(jQuery(this).find('INPUT[type="text"]').val())) 
						    msgElmt.addClass('err').html('Error, invalid email address.');
						else {
							var data = jQuery(this).serialize();
					    	jQuery.post(jQuery(this).attr('action'), data, function(data, textStatus, jqXHR) {
							   var future = 1000 * 60 * 60 * 24 * 365 * 2; 
                               var expires = new Date((new Date()).valueOf() + future);
                               document.cookie = "visited=true;expires=" + expires.toUTCString() + ";domain=.geek.com;path=/";
                               jQuery("#email-overlay,.nl_text").hide();
							   jQuery.fn.colorbox.resize({
									height: "110px"
								});
							   jQuery("#cboxLoadedContent").css('background',"url('/wp-content/themes/geek7/images/thankyou_bg.png') no-repeat 0 0");
							   jQuery("#thankyou-overlay span").html(data['message']);
							   jQuery("#thankyou-overlay").show();
							}, 'json').error(function() {
								msgElmt.addClass('err').html('Error, please try again.');
							});
						}
	        });
            
      }

}); /* Doc Ready */
