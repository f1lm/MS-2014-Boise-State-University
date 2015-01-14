$(function() {
    $("img.lazy").lazyload({ 
    	effect : "fadeIn", 
    	threshold: 200,
    	failure_limit:20 
    });
});

/* global $(document).ready() for every IDGE site */

$(document).ready(function(){
		
	//close hamburger nav and most read when clicked outside of - Mule code had this only in the article js file
	 $('body').click(function(e){
         $('#banner').removeClass('nav-open');
         $('#reading-selector').removeClass('open');
         $(".user-info .user-actions").removeClass("open");
     });
	 
	 //click event for BrandPost "Learn More" buttons
	 $(".learn-more").click(function(event) {
		 var brandpost_txt = "<div class=\"about-brandposts\"><p>BrandPosts are written and edited by members of our sponsor community. BrandPosts create an opportunity for an individual sponsor to provide insight and commentary from their point-of-view directly to our audience. The editorial team does not participate in the writing or editing of BrandPosts.</p><hr/><a class=\"close-bar\" href=\"#\">Close</i></a></div>";
		 $("body").append(brandpost_txt);
		 $(".about-brandposts").css("top",event.pageY);
		 if ($("body").width() >= 955) { // need different behavior at desktop breakpoint and above
			 //find difference between X position clicked and body width and set as right attr 
			 //this is so tooltip doesn't overflow window
			 var xpos = $("body").width() - event.pageX;
			 $(".about-brandposts").css({"right":xpos,"margin-right":"0"});
		 }
		 $(".about-brandposts .close-bar").click(function() {
			 $(".about-brandposts").remove();
			 return false;
		 });
		 return false;
	 });
	 
	 // Tooltip click events for Contributor Network badges
	 $(".cn-click-tooltip").click(function(event) {
			
			$(".about-cn-users").remove(); //clean up any stray tooltips that may be hanging out
			
			var tooltipBegin = "<div class=\"about-cn-users\"><img class=\"arrow-up\" src=\"http://idge.staticworld.net/nww/arrow-up.png\" alt=\"arrow up\" />";
			var tooltipEnd = "<hr/><a class=\"close-bar\" href=\"#\">Close</a></div>";
			var tooltipText = "";
			
			if ($(this).hasClass('advisor')) {
				tooltipText = "<p>This person has reached <strong>Advisor</strong> status as part of IDG's contributor Network. <a class=\"cn-learn-more\" href=\"/contributor-network/signup.html\">Learn more</a></p>";
			}
			else if ($(this).hasClass('influencer')) {
				tooltipText = "<p>This person has reached <strong>Influencer</strong> status as part of IDG's contributor Network. <a class=\"cn-learn-more\" href=\"/contributor-network/signup.html\">Learn more</a></p>";
			}
			
			else if ($(this).hasClass('thought-leader')) {
				tooltipText = "<p>This person has reached <strong>Thought Leader</strong> status as part of IDG's contributor Network. <a class=\"cn-learn-more\" href=\"/contributor-network/signup.html\">Learn more</a></p>";
			}
			
			else if ($(this).hasClass('cn-tooltip')) {
				tooltipText = "<p>The IDG Contributor Network is the best way to voice your opinion on our site. <br /><a class=\"cn-learn-more\" href=\"/contributor-network/signup.html\">Learn more</a> | <a class=\"cn-learn-more\" href=\"/contributor-network/signup.html\">Apply to be a contributor</a></p>";
			}
			 var user_txt = tooltipBegin + tooltipText + tooltipEnd;
			 $("body").append(user_txt);
			 $(".about-cn-users").css("top",event.pageY);
			 if ($("body").width() >= 955) { // need different behavior at desktop breakpoint and above
				 //find difference between X position clicked and body width and set as right attr 
				 //this is so tooltip doesn't overflow window
				 //adding 30px so that the tooltip point lands where the click event happened
				 var xpos = $("body").width() - event.pageX + 30;
				 $(".about-cn-users").css({"right":xpos,"margin-right":"-290px"});
			 }
			 $(".about-cn-users .close-bar").click(function() {
				 $(".about-cn-users").remove();
				 return false;
			 });
			 return false;
		 });
	 
	 //new functionality for sticky searchbox
	 if ($('.fixed-bar .fixed-search-wrapper').length > 0) {
			$(window).scroll(function(){
				var pageScrollTop = $(window).scrollTop();
				var searchOffset = $('.fixed-bar').offset();				
				var searchOffsetTop = searchOffset.top;
				var searchHeight =  $('.fixed-bar').outerHeight();
				var fixedSearchHeight = $('.fixed-bar .fixed-search-wrapper').outerHeight();
				searchOffsetTop = searchOffsetTop + (searchHeight - fixedSearchHeight); //this handles where there's an intro blurb or not
			
				if (pageScrollTop > searchOffsetTop) {
					$('body').addClass('fixed-search-scroll');
					$('.fixed-bar').css('padding-bottom', fixedSearchHeight);
				}
				else {
					$('body').removeClass('fixed-search-scroll');
					$('.fixed-bar').css('padding-bottom', 0);
				}
			});
	 }
	 
	 //learn more in expanded search bar intro text
	 $('#search-intro .more').click(function(){
		 $(this).addClass('open');
		 $('#search-intro .more-text').addClass('open');
	 });
});

//new functionality for sites with logins
$("li.signed-in").on("click", ".user-info .avatar, .user-info .user-name", function(e){
	 e.preventDefault();
	 e.stopPropagation();
	 $(".user-info .user-actions").toggleClass("open");
});

//does the site have a gigya login system with custom buttons? this makes it work...
$(document).on("click", ".social-signin li", function(e){
	e.preventDefault();
	//alert('clicked: ' + $(this).data("provider"));
	var params = {
	    provider: $(this).data("provider")
	    //callback: function(){}
	};
	if (typeof(gigya) != "undefined") {
		gigya.accounts.socialLogin(params);
	}
});


/* js functionality for the search page, static page nav */

$(document).ready(function(){
	 $('.filter-list').change( function() {
	    window.location.href = $('option:selected',this).data('jumpurl');
	 }); 
});


/*--------------------------------------------------------
 *  User
 *-------------------------------------------------------*/
var NarfUser = function(NarfUser) {
	
	this.loaded = true;	
	
	this.isAuthd = function(cookies){
		var checksum = Cooker.readCookie("checksum");
		var uname = Cooker.readCookie("uname");
		var email = Cooker.readCookie("email");
		email = email.replace(/\"/g,'');
		var auth = Cooker.readCookie("auth");
		var balance = $.md5(auth + uname + email);
		return (checksum === balance)?true:false;
	};
	

	
	this.handleEmailCheckMyAccount = function(obj) {
		var validLook =  (obj.emailValid)?'MediumAquaMarine':'pink';
		$('#emailInput').css({background:validLook});
		if (obj.emailValid) {
			$("#account-errors").removeClass("error").html("");
		} else {
			$("#account-errors").addClass("error").append("Email is invalid");
		}
	};

	this.showLogin = function(showSocial) {
		showSocial = (typeof showSocial != "undefined" && showSocial == false)?false:true;
		if (!this.Logon.isValid) {
			var d = $('#loginModal');
			d.html('').hide();
			d.css({"top": $(window).scrollTop()}).hide();
			d.load('/user/login', {'showSocial':showSocial},function() {
		        d.fadeIn(1000).center();
			    $('#close').css({cursor:'pointer'
			    }).click(function(){unloadLogin();});
		    });
		}
		else if (!($thm.deviceWidthAtLeast($thm.deviceBreakpoints.desktop) && !$thm.isMobile())){
			var d = $('#logoffModal');
			d.html('').hide();
			d.css({"top": $(window).scrollTop()}).hide();
			d.load('/user/logout!input', "",function() {
		        d.fadeIn(1000).center();
			    $('#close').css({cursor:'pointer'
			    }).click(function(){unloadLogin();});
		    });
		}
	};
	


	
	this.unloadLogin = function() {
		var d = $('#loginModal');
		d.fadeOut(1000, function(){d.html('');});
	};
	


	this.checkLogin = function() {
		var uname = Cooker.readCookie("uname");
    	if (typeof uname != 'undefined' && uname != "" && Logon.isValid) {
     		//Some old Insider accounts use double quotes and spaces in the username    		
    		uname = uname.replace(new RegExp("[^a-zA-Z0-9]","g"),"");
    		//remove all non alphanumeric characters
    		$("#network-tools ul.hmenu").addClass('welcome');
	    	$("#network-tools ul.hmenu li.siteSignIn").html('<a href="/user/account2"><span>Hi, </span>' + $(uname).truncate(10) + '</a>');
	    	$("#network-tools ul.hmenu li:last").html('<a id="logout" href="javascript://">Sign out</a>');
	    	$("body").addClass("userLoggedIn");
	    	$("#mobile-user-link").css({color:'#fff'});
	    	$('#logout').click(function(e) {
	    		e.preventDefault();
	    		logout();
	    	}).css({
	        	cursor:'pointer'
	    	});
		}
	};
	
	this.checkUserName = function(username,callback) {
		var unameRegex=/^[0-9A-Za-z]+$/; //username alpha/numeric
		if (typeof username === "undefined" ||
				username.length <= 3 ||
				username.length > 26 ||
				!unameRegex.test(username)) {handleUsernameCheck("true");
				return;/*send true(a.k.a. taken) if not valid*/
		}
		$.post('/user/isEmailUsernameValid', {'username':username},function(data) {
			callback($.trim(response));
		});
	};
	
	this.checkEmailValid = function(email) {
		return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))?true:false;
	};

	this.logout = function(response) {
		Cooker.deletAuthCookies();
		if (typeof(gigya) != "undefined") {
			gigya.services.socialize.logout(SocialConf.gigyaConf,{});
		}
		window.location.reload();
	};
	
	/* moved these styles to _comments.scss, a more logical place for them - 
	 * we do not need to apply them again every single time we hide/show -- lfracalossi
	 * var modalCss = {
    };
    */

		
	return this;
	
}(NarfUser || {});

var SocialConf = function(socialConf){
	this.popLoginParams = {
			useHTML: 'true'
			,showTermsLink: 'false'
			,height: 30
			,width: 250
			,containerID: 'socialComponentDiv'
			,hideGigyaLink: 'false'
			,lastLoginIndication: 'none'
			,showTooltips: 'true'
			,pendingRegistration: 'true'
		};
	
	this.gigyaConf = {
	    enabledProviders: 'facebook,twitter,yahoo,google,linkedin'
	};
	
	return this;
}(SocialConf || {});
var Social = function(social) {
	
	this.loaded = true;

	this.setCommentAvatar = function (data) {
		if (data.user.thumbnailURL && data.user.thumbnailURL != "" && data.user.thumbnailURL.length > 0) {
			$("#forumUserThumbnail").attr("src",data.user.thumbnailURL).show();
		}
	};

	this.handleCommentSubmit = function() {
		/* Omniture: comment initiated */
		//TODO: Omniture
		Analytics.logArticleComment();

		if (Logon.isValid) {
			ArticleComments.postComment();
		} else {
			NarfUser.showLogin();  
		}
		return false;
	};

	this.loadSignInPop = function() {
		var d = $('#loginModal');
		d.fadeOut(1000).html('');
		d.css({"top": $(window).scrollTop()}).hide();
		d.load('/user/socialLogin', function() {
	        d.fadeIn(1000).center();
		    $('#close-login').css({
		    	 margin:'-21px -8px 0 0'
		    	,position:'absolute'
		    	,right: '0'
		    	,'font-weight':'bolder'
		    	,cursor:'pointer'
		    }).click(function(){unloadSignInPop();});
	    });
	};
	
	this.unloadSignInPop = function() {
		var d = $('#loginModal');
		d.fadeOut(1000, function(){d.html('');});
	};
	
	this.submitSignInPop = function(data) {
		var gUid = data.user.UID;
	    var nickname = data.user.nickname;
	    var firstName = data.user.firstName;
	    var lastName = data.user.lastName;
	    var email = data.user.email;
	    var proxiedEmail = data.user.proxiedEmail;
	    var provider = data.user.loginProvider;
	    var photoURL = data.user.photoURL;
	    var signatureTimestamp = data.user.signatureTimestamp;
	    var signature = data.user.UIDSignature;
	    
		Analytics.logSocialSignin(data.user.loginProvider);
	    
		var d = $('#loginModal');
		$.post('/user/socialLogin2',{
	        gUid : gUid,
	        nickname : nickname,
	        firstName : firstName,
	        lastName : lastName,
	        email : email,
	        proxiedEmail : proxiedEmail,
	        photoURL : photoURL,
	        provider : provider,
	        signatureTimestamp : signatureTimestamp,
	        signature : signature
	    },function(data) {
	    	if (data.error) {
				$("#login-custom-errors-pop").html(data.error).fadeIn("fast");
			} else {
				$('#loginModal').html(data);
	        d.fadeIn(1000).center();
			    $('#close').click(function(){unloadSignInPop();});
			};
	    });
	};
	
	this.checkLogin = function(response) {
		var uname = Cooker.readCookie("uname");
    	if (typeof uname != 'undefined' && uname != "" && Logon.isValid) {
    		//Some old Insider accounts use double quotes and spaces in the username    		
    		uname = uname.replace(new RegExp("[^a-zA-Z0-9]","g"),"");
    		//remove all non alphanumeric characters
    		$("#network-tools ul.hmenu").addClass('welcome');
	    	$("#network-tools ul.hmenu li.siteSignIn").html('<a href="/user/account2"><span>Hi, </span>' + $(uname).truncate(10) + '</a>');
	    	$("#network-tools ul.hmenu li:last").html('<a id="logout" href="javascript://">Sign out</a>');
	    	$("body").addClass("userLoggedIn");
	    	$("#mobile-user-link").css({color:'#fff'});
	    	$('#logout').click(function(e) {
	    		e.preventDefault();
	    		logout();
	    	}).css({
	        	cursor:'pointer'
	    	});
		}
	};
	
	this.logout = function(response) {
		Cooker.deletAuthCookies();
		if (typeof(gigya) != "undefined") {
			gigya.services.socialize.logout(gigyaConf,{});
		}
		window.location.reload();
	};
	
	return this;

}(Social || {});

//************ jQuery Plug-in ************//
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft() + "px");
    return this;
};

jQuery.fn.truncate = function (tLength) {
	if (typeof this.selector == 'string')  {
		if (tLength >= 3 && this.selector.length > 3) {
			return (this.selector.length > tLength)?this.selector.substr(0,tLength - 3) + "...":this.selector;
		} else {
			return this.selector;
		}
	};
};
function readCookie(name){
	return unescape(readRawCookie(name));
}

function readRawCookie(name){
	if(navigator.cookieEnabled&&document.cookie!=''){
		var strAll = document.cookie;
		var i1 = strAll.indexOf(name);
		if(i1!=-1){
			// skip name and '='
			i1 = i1+name.length+1;
			i2 = strAll.indexOf(';', i1);
			if(i2==-1) i2 = strAll.length;
			return strAll.substring(i1, i2);
		}
	}
	return "";
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(emailAddress);
}
/*--------------------------------------------------------
 *  cookies
 *-------------------------------------------------------*/
var Cooker = function(cooker) {
	this.loaded = true;
	
	this.cookies = document.cookie;
	
	this.readCookie = function(name,cookies){
		return unescape(this.readRawCookie(name,cookies));
	};
	
	this.readRawCookie = function(name,cookies){
		if(navigator.cookieEnabled&&cookies!=''){
			var strAll = document.cookie;
			var i1 = strAll.indexOf(name);
			if(i1!=-1){
				// skip name and '='
				i1 = i1+name.length+1;
				i2 = strAll.indexOf(';', i1);
				if(i2==-1) i2 = strAll.length;
				return strAll.substring(i1, i2);
			}
		}
		return "";
	};
	
	this.deleteCookie = function(name) {
		removeCookie(name, getCookieDomain());
	};
	
	this.deletAuthCookies= function() {
		var authCookies = ["uname",
		                   "forumUser",
		                   "socialProvider",
		                   "email",
		                   "checksum",
		                   "mwInsider"];
		$.each(authCookies, function(i,v) {
			deleteCookie(v);
		});
	};
	
	return this;

}(Cooker || {});

/*--------------------------------------------------------
 *  allow for obfuscation of mailto links, format =  href="mgoebel(at)idgcommunications.com" + class="email"
 *-------------------------------------------------------*/
$(document).ready(function(){
	
	(function($) {
	    jQuery.fn.mailto = function() {
	        return this.each(function() {
	            var email_add = $(this).attr("href").replace(/\s*\(.+\)\s*/, "@");
	            var email_text = $(this).html();
	            $(this).before('<a href="mailto:' + email_add + '" rel="nofollow" title="Email ' + email_add + '">' + email_text + '</a>').remove();
	        });
	    };

	})(jQuery);

	$(document).ready(function() {
	    $(function() {
	        $('.email').mailto();
	    });
	});

});

/*--------------------------------------------------------
 * Name: getUrlParams
 * Description: Return URL parameters as a hash
 * Input: key - The key of the parameter for which you want the value. Returning all params (key is blank) is not supported currently.
 * Return: Hash of Parameters for 'key'
 * Usage: http://dev-narf4.fram.www.idgesg.infoworld.com/article/2608316/consumerization-of-it/the-proper-care-and-support-of-today-s-mobile-worker.html?myparam=%22%22&phint=newt%3Dcio_mobile&phint=idg_eid%3Db50de66d737b51d65b2ecb8faa838250#tk.CFOWORLDNLE_nlt_update_2016-12-06
 * 		getUrlParams('phint') - Returns {newt: "cio_mobile", idg_eid: "b50de66d737b51d65b2ecb8faa838250"
 * 		getUrlParams('myparam') - Returns {myparam: """"}
 *-------------------------------------------------------*/
function getUrlParams(key) {
	var map = new Object();
	var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)','gi');
	while ((instance = re.exec(document.location.search)) != null) 
	{
		decoded = decodeURIComponent(instance[1]);
		if(decoded.indexOf('=') == -1) 
		{
			map[key] = decoded;
		}
		else 
		{
			var keyval = decoded.split('=');
			map[keyval[0]] = keyval[1];
		}
	}
	
	return map;
}
