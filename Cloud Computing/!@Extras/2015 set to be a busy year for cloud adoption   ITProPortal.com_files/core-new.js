
(function($){
    var trackEvent = function(label, value){
        if(typeof ga == 'function'){
            ga('send', 'event', 'NewWelcomeOverlay', label, value);
        }
    }

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	var navU = navigator.userAgent;
	// Android Mobile
	var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
	// Android Browser (not Chrome)
	var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
	var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
	var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
	var isAndroidBrowser = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion < 537;

	$(function(){	
		if($.cookie('itpp-competition-closed') === '1'){
			return;
		}


		displayInviteOverlay();
		
	});	
	

	function displayInviteOverlay(){
		// INVITE OVERLAY BEGIN
		// This is almost the same code as on current site
		(function($){
		    // Overlay for current site
		    if(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1) return true;
		    if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) return true;    

		    var logger = function(s){};

		    var twApi = {
		        init: function(){
		            window.twttr = (function (d, s, id) {
		                var t, js, fjs = d.getElementsByTagName(s)[0];
		                if (d.getElementById(id)) return;
		                js = d.createElement(s); js.id = id;
		                js.src= "https://platform.twitter.com/widgets.js";
		                fjs.parentNode.insertBefore(js, fjs);
		                return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
		            }(document, "script", "twitter-wjs"));
		        }
		    };

		    var fbApi = {        
		        init: function(){
		            window.fbAsyncInit = function() {
		                FB.init({
		                    appId      : '791814187549106', // App ID
		                    channelUrl : 'YOUR_WEBSITE_CHANNEL_URL',
		                    status     : true, // check login status
		                    cookie     : true, // enable cookies to allow the server to access the session
		                    xfbml      : false  // parse XFBML
		                });
		            };
		             
		            (function(d){
		                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		                if (d.getElementById(id)) {return;}
		                js = d.createElement('script'); js.id = id; js.async = true;
		                js.src = "//connect.facebook.net/en_US/all.js";
		                ref.parentNode.insertBefore(js, ref);
		            }(document));   
		        },
		        login: function(){
		            // TODO delay if fb not inited
		            trackEvent('Fb login clicked');          
		            FB.login(function(response) {
		               if (response.authResponse) 
		               {                
		                    fbApi.getUserInfo();                
		                } else
		                {
		                 logger('Authorization failed.');
		                }
		             }, {scope: 'email'});            
		        },

		        getUserInfo: function(){
		            FB.api('/me', function(response) {
		                if(!response.email) return;

		                $('.beta-overlay-popup form input[name=name]').hide();
		                $('.beta-overlay-popup form input[name=email]').hide();
		                //$('.beta-overlay-popup form input[type=submit]').val('LET\'S GO');
		            

		                logger('You are authorized - ' + response.name);
		                logger('Email - ' + response.email);

		                $('.beta-overlay-popup input[name=name]').val(response.name);
		                $('.beta-overlay-popup input[name=email]').val(response.email);

		                $('.beta-overlay-popup form').submit();

		            });
		        },
		        likeButtonObserver: function(){
		            var email = $('.beta-overlay-popup form input[name=email]').val();
		            trackEvent('Fb likebtn clicked', email);
		        }
		    };


		    var gpApi = {
		        init: function(){
		            window.___gcfg = {
		                lang: 'en-GB',
		                parsetags: 'parsetags'
		            };
		            (function() {
		                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		                po.src = 'https://apis.google.com/js/client:plusone.js';
		                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		            })();
		        },
		        login: function(){
		            trackEvent('G+ login clicked');

		              
		            var p = {
		                client_id: '68568001753-8m002lkfu6392010ghna0k1pbos4ieok.apps.googleusercontent.com',
		                scope: ['https://www.googleapis.com/auth/plus.me','email']
		            };
	             	gapi.client.setApiKey(
                            'AIzaSyAdtmQ9GEZ2hGU0Kqzc_kheed58mkkaQVc'
                    );
		            gapi.auth.authorize(p, gpApi.handleAuthResult);
		        },
		        handleAuthResult: function(authResult){
		            if (authResult && !authResult.error) {                
		                gpApi.makeApiCall();    
		            } else {
		                logger('Authorization failure');
		            }
		        },
		        makeApiCall: function() {
		            gapi.client.load('plus', 'v1', function() {
		                var request = gapi.client.plus.people.get({
		                  'userId': 'me'
		                });
		                request.execute(function(resp) {
		                    if(!resp.emails[0]) return;
		                    $('.beta-overlay-popup form input[name=name]').hide();
		                    $('.beta-overlay-popup form input[name=email]').hide();
		                    //$('.beta-overlay-popup form input[type=submit]').val('LET\'S GO');
		                    $('.beta-overlay-popup input[name=name]').val(resp.displayName);
		                    $('.beta-overlay-popup input[name=email]').val(resp.emails[0].value);

		                	$('.beta-overlay-popup form').submit();		                    
		                });
		            });
		        }        
		    };


		    var liApi = {
		        init: function(){    
		            $.getScript("http://platform.linkedin.com/in.js?async=true", function success() {
		                IN.init({
		                    api_key: '77a5xyd6y9uun3',
		                    authorize: true,
		                    scope: "r_basicprofile r_emailaddress"    
		                });
		            });

		        },
		        login: function(){
		            trackEvent('LinkedIn login clicked');
		            IN.User.authorize(function() {
		              IN.API.Profile("me").fields("firstName","lastName","headline","emailAddress")
		                .result(function(result) {
		                    if(!result.values[0] || !result.values[0].emailAddress) return;
		                    $('.beta-overlay-popup form input[name=name]').hide();
		                    $('.beta-overlay-popup form input[name=email]').hide();
		                    //$('.beta-overlay-popup form input[type=submit]').val('LET\'S GO');                    
		                    logger('You are authorized - ' + result.values[0].firstName + result.values[0].lastName);
		                    logger('Email - ' + result.values[0].emailAddress); 
		                    $('.beta-overlay-popup input[name=name]').val(result.values[0].firstName + ' ' + result.values[0].lastName);
		                    $('.beta-overlay-popup input[name=email]').val(result.values[0].emailAddress); 

		                	$('.beta-overlay-popup form').submit();

		                });
		            });            
		            
		        }
		              
		    };

		    $(function(){
		        
		        injectMediaCss();

		        var bg = $('<div class="beta-overlay-background"></div>');
		        bg.css({
		            background: 'black',
		            opacity: '0.8',
		            position: 'fixed',
		            top: '-10%',
		            left: '-10%',
		            height: '120%',
		            width: '120%',
		            'z-index': '2000000000'
		        });
		        $('body').append(bg);

		        var popup = $('<div class="beta-overlay-popup"></div>');
		        popup.css({
		            background: 'white',
		            position: 'fixed',
		            top: '0',
		            bottom: '0',
		            left: '0',
		            right: '0',
		            margin: '40px 30px',
		            height: '400px',
		            width: '660px',
		            'z-index': '2000000001',
		            color: '#676767',
		            padding: '40px',
		            'box-sizing': 'border-box',
		            'padding-top': '30px',
		            'line-height': '100%'
		        });
		        if(!isAndroidBrowser){
		        	popup.css({margin: 'auto'});
		        }
		        $('body').append(popup);



		        var h1 = $('<h1>Welcome to the new ITProPortal!</h1>');
		        h1.css({
		            'font-size': '24px',
		            'text-align': 'left',
		            'line-height': '28px',
		            'color': '#686868',
		            margin: 0	         
		        });
		        popup.append(h1);

				var p1 = $('<p>Our brand new site is officially out the box, and there\'s a treasure trove of new features for you to discover.</p>');
		        p1.css({
		            'font-size': '17px',
		            'text-align': 'left',
		            'line-height': '22px',
		            'color': '#686868',
		            margin: 0,
		            color: '#686868',
		            'margin-top': '22px',
		            'font-family': 'sans-serif',
		            'font-weight': 'lighter'
		        });
		        popup.append(p1);



		        var subtitle = $('<p><b>Join our fast growing community</b> and we\'ll send the latest news directly to your inbox along with our exclusive reports, interviews and daily deals.</p>');
		        subtitle.css({
		            'font-size': '17px',
		            'text-align': 'left',
		            'margin-top': '40px',
		            'margin-bottom': '8px',
		            'font-family': 'sans-serif',
		            'font-weight': 'lighter',
		            'margin-top': '15px',
		            'line-height': '22px',
		        });
		        popup.append(subtitle);     
	           
		        var bottom = $('<div class="bottom" style="height:288px;background: #72b5d5;width:auto;margin-right:-40px !important;margin-left:-40px !important;box-sizing:border-box;padding:30px;padding-left:45px;padding-right:45px;position:relative;"></div>');
		        bottom.css({
		        	'margin-top': '22px',
		        	'padding-top': '7px',
		        });

		 
		        var socialSection = $('<div class="social"></div>');
		        socialSection.css({
		        	width: '320px',
					margin: '0 auto',
					'text-align': 'center',
					'padding-top': '5px',
					'margin-top': '5px',
					'border-bottom': '1px solid #e2e2e2',
					'padding-bottom': '12px',
					position: 'relative'
		        });
		        createSocialSection(socialSection);
		        bottom.append(socialSection);

		        // popup.append('<span style="position: absolute;width: 40px;background: white;text-align: center;font-size: 17px;font-family:sans-serif;font-weight:lighter;margin-right: 0;right: 251px;bottom: 115px;padding: 10px;box-sizing: border-box;z-index:2;">or</span>');



		        var form = $(
		            '<form method="post" action="http://www.itproportal.com/wp-admin/admin-ajax.php?action=itpp_add_report_contact" style="height:165px;width:auto;margin-right:-40px !important;margin-left:-40px !important;box-sizing:border-box;padding:30px;padding-left:45px;padding-right:45px;margin-top:5px;position:relative;">'
		            +'<input class="step1" name="name" placeholder="Name" style="width: 272px;box-sizing: border-box;padding: 12px;font-size: 16px;font-family: sans-serif;font-weight: lighter;border-radius: 5px;border: 1px solid #white;margin-bottom:20px;outline:0;background:white;margin-right:15px;"/>'
		            +'<input class="step1" name="email" placeholder="E-mail" style="width: 272px;box-sizing: border-box;padding: 12px;font-size: 16px;font-family: sans-serif;font-weight: lighter;border-radius: 5px;border: 1px solid #white;margin-bottom:20px;outline:0;background:white"/>'
		            +'<input class="step1" type="submit" style="background:white;width:120px;padding:13px 15px 13px 15px !important; color:#72b5d5;border:0;border-radius: 5px;font-size:18px;outline:0;cursor:pointer;float:right;" value="Sign up"/>'
					+'<div class="step1" style="margin-top: 15px;width: 430px; float:left; padding-top:0;color: white;font-weight:lighter;font-size: 13px;"><input style="margin-right: 10px" id="allowcontact" type="checkbox" name="allowcontact"></input>Check this box if you do not wish to be contacted by our partners</div>'		            
		            +'</form>');


		        form.append('<span class="step1" style="color:white;position: absolute;width: 40px;background: #72b5d5;text-align: center;font-size: 17px;font-family:sans-serif;font-weight:lighter;margin-right: 0;right: 251px;bottom: 115px;padding: 10px;box-sizing: border-box;z-index:2;top: 0;left: 0;right: 0;margin: 0 auto;margin-top: -23px;height: 20px;">or</span>');

		//        popup.append('<div class="head" style="width: 320px;"></div>');

		        bottom.append(form);
		        popup.append(bottom);

		        popup.find('form').submit(function(e){
		        	e.preventDefault();
		            if($('.beta-overlay-popup form input[type=submit]').hasClass('disabled')) {
		                return false;
		            }
		            if(!validateForm()){
		                return false;
		            } else {
		            	// post request		                
		                var url = $(this).attr('action');
		                $(this).find('input[type=submit]').addClass('disabled');
		                $.post(url, $(this).serialize(), function(){
		                	allowAccess();
		                })
		            }
		        });		        


		        var close = $('<span class="close-btn"></span>');
		        close.css({
		            position: 'absolute',
		            top: '-35px',
		            right: '0px',
		            width: '35px',
		            height: '35px',
		            background: 'white url("http://files.itproportal.com/wp-content/themes/itpp5/assets/img/subscribe_close.png") 50% 50% no-repeat',
		            cursor: 'pointer',

		        });
		        close.click(function(){
                	 $('.beta-overlay-popup').remove();
                	 $('.beta-overlay-background').remove();
                	 $.cookie('itpp-competition-closed', '1', { expires: 900, path: '/'});    
                });
		  
		        popup.append(close);


			

		    });


		    function createSocialSection(wrapper){
		        var fb = $('<div class="fb-btn"><span>&nbsp;</span></div>');
		        var gp = $('<div class="gp-btn"><span>&nbsp;</span></div>');
		        var tw = $('<div class="tw-btn"><a href="http://twitter.com/itproportal" target="_blank"></a></div>');
		        var li = $('<div class="li-btn"><span>&nbsp;</span></div>');

		        var styles = {
		            width: '50px',
		            height: '48px',
		            margin: '8px auto',
		            'border-radius': '3px',
		            color: 'white',
		            'line-height': '50px',
		            'text-align': 'center',
		            'font-size': '20px',
		            cursor: 'pointer',
		            position: 'relative',
		            display: 'inline-block',
		            margin: '10px'
		        };

		        
		        fb.css(styles);
		        fb.css('background', '#3667b6');
		        fb.css('margin-top', '0');
		        tw.css(styles);
		        tw.css('background', '#2eb6f4');
		        gp.css(styles);
		        gp.css('background', '#de4041');
		        li.css(styles);
		        li.css('background', '#1c719e');


		        var spanStyles = {
		            display: 'block',
		            width: '30px',
		            height: '30px',
		            margin: 'auto',
		            top: '0',
		            left: '0',
		            right: '0',
		            bottom: '0',
		            position: 'absolute',
		            background: 'url(http://files.itproportal.com/wp-content/themes/itpp5/assets/img/popup_share.png) no-repeat 0px 0px'
		        };

		        fb.find('span').css(spanStyles);
		        tw.find('a').css(spanStyles);
		        gp.find('span').css(spanStyles);
		        li.find('span').css(spanStyles);
		        tw.find('a').css({
		            'background-position': '-30px 0px'
		        });
		        gp.find('span').css({
		            'background-position': '-90px 0px'
		        });
		        li.find('span').css({
		            'background-position': '-60px 0px'
		        });

	

		        wrapper.append(fb);
		        wrapper.append(gp);
		       // wrapper.append(tw);
		        wrapper.append(li);
 
 				fbApi.init();
   				fb.click(function(){
   					fbApi.login();
   				});
				gpApi.init();
   				gp.click(function(){
   					gpApi.login();
   				});
				liApi.init();
   				li.click(function(){
   					liApi.login();
   				});
   				twApi.init();
   				/*var clck = function(){
   					var l = $(this).find('a').attr('href');
   					window.open(l);
   				};
   				tw.click(clck);   				*/
		    }



		    function allowAccess(){
		    	trackEvent('Closed');
				$.cookie('itpp-competition-closed', '1', { expires: 900, path: '/'});    
                $('.beta-overlay-popup form .step1').remove();
                $('.beta-overlay-popup .social').remove();
                $('.beta-overlay-popup form').css('text-align', 'center');
                $('.beta-overlay-popup form').css('position', 'static');
                $('.beta-overlay-popup form').css('padding-top', '4px');
                $('.beta-overlay-popup .bottom').css('height', '180px');
                $('.beta-overlay-popup').css('height', '385px');
                $('.beta-overlay-popup form').append('<p style="background: url(http://files.itproportal.com/wp-content/themes/itpp5/assets/img/tick.png) left 50% no-repeat;color:white;font-size:18px;display:inline-block;margin-top:5px;margin-bottom:20px;padding-left:45px;padding-top:10px;padding-bottom:10px;margin:15px auto;left:0;right:0;">Success! Thank you for registering.</p>')
                var wrapper = $('<div class="social-wrapper"></div>');
                wrapper.css({
					width: '420px',
					display: 'inline-block',
					height: '80px',
					margin: 0,
					padding: '16px',
					'text-align': 'left',
					top: 0,
					right: 0,
					'padding-top': '0px',
					'text-align': 'center',
					float: 'left',
					'padding-left': 0,
					'margin-left': '-30px'
                });
                wrapper.append('<p style="color:white;font-size: 18px;padding-top:0;">Want even more? We\'re on social media too:</p>')
                wrapper.append('<fb:like href="http://facebook.com/ITProPortal" layout="button" action="like" data-layout="button" data-show-faces="true" share="false" style="height: auto !important;margin:2px;margin-left:0;display:inline-block;margin-left:15px;margin-right:15px;position:relative;top:-2px;"></fb:like>');
                wrapper.append('<div id="gp-like-widget-div" style="display:inline-block;margin:2px;margin-left:15px;margin-right:15px;"><div class="g-follow" data-annotation="none" data-height="20" data-href="https://plus.google.com/110289425678552666570" data-rel="publisher"></div></div>');
                wrapper.append('<div id="li-like-widget-div" style="display:inline-block;margin:2px;margin-left:15px;margin-right:15px;"><script type="IN/FollowCompany" data-id="3796635" data-counter="none"></script></div>');
		        wrapper.append('<div id="tw-like-button"  style="display:inline-block;margin:2px;margin-left:15px;margin-right:15px;"><a class="twitter-follow-button" href="https://twitter.com/ITProPortal" data-show-count="false" onclick="followButtonClicked(this);" data-show-screen-name="false">Follow @twitter</a></div>');

                $('.beta-overlay-popup form').append(wrapper);

                var btn = $('<p style="display:block;margin:0;margin-left:100px;background:#ff7d76;width:175px;text-align:center;padding:18px !important; color:white;border:0;border-radius: 5px;font-size:16px;outline:0;cursor:pointer;position:absolute;right:30px;bottom:30px;">Continue to site</p>');
                btn.click(function(){
                	 $('.beta-overlay-popup').remove();
                	 $('.beta-overlay-background').remove();
                });
                $('.beta-overlay-popup form').append(btn);


                FB.XFBML.parse($('.beta-overlay-popup')[0]); 
             	gapi.follow.go("gp-like-widget-div", {
		             'data-href': 'https://plus.google.com/+itproportal'
		        });
		        twttr.widgets.load(document.getElementById('#tw-like-button'));
		        IN.parse(document.getElementById('li-like-widget-div')); 
		        
		    }

		    function validateForm(){
		        var name = $('.beta-overlay-popup input[name=name]');
		        var email = $('.beta-overlay-popup input[name=email]');
		        var errorCSs = {'border-color': 'red', 'background': '#fee'};
		        var orgCss = {'border-color': '#cecece', 'background': 'white'};
		        name.css(orgCss);
		        email.css(orgCss);

		        var correct = true;
		        if(!name.val()){
		            name.css(errorCSs);
		            correct = false;
		        }

		        if(!email.val()){
		            email.css(errorCSs);
		            correct = false;
		        } else {
		            var emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
		            //' 
		            if( email.is(':visible') && !emailCheck.test(email.val()) ){
		                correct = false;
		            }
		        }

		        if(!correct){
		            return false;
		        }
		        trackEvent('Signup to beta', email.val());
		        return true;

		    }
 
		    function injectMediaCss(){
		        var code = '@media (max-width: 680px) { '
		        +' .beta-overlay-popup {display: none !important;}'
		        +' .beta-overlay-background {display: none !important;}'
		        +'}'
		        +' .beta-overlay-popup .sony:hover .hover {display: inline !important;}'
		        +' .beta-overlay-popup .button {display:inline-block;padding: 17px;border-radius: 4px;margin: 12px;color:white;cursor:pointer;}'
		        +' #spot-im-root {z-index:1000000000 !important;}';
		        var style = document.createElement('style');
		        style.type = 'text/css';
		        if (style.styleSheet) {
		            style.styleSheet.cssText = code;
		        } else {
		            style.innerHTML = code;
		        }
		        document.getElementsByTagName("head")[0].appendChild( style );
		    }
		})(jQuery);


		// INVITE OVERLAY END
	}




})(jQuery);
