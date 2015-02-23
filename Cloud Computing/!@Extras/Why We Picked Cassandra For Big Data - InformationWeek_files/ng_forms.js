	var siteLogo = 'http://img.deusm.com/informationweek/IWK-logo-250x30.png';
	var privacyLogo = 'http://img.deusm.com/lightreading/ubm_tech_logo_footer_grey88x111.jpg';
	var privacyText = 'By registering, I agree to the <a href="http://legal.us.ubm.com/terms-of-service/" target="_blank">UBM Tech Terms and Conditions</a>';
	var loginRedirectURL = '';
	var loginNextAction = '';
	var reloadOnClose = false;
	var ngconfig = new UBM.Widget.Helper.Config(ngenv);
	var regHeaderContent = '<div style="text-align:center" ><img class="brand-logo-image" src="'+siteLogo+'"></div>';
	var regAction = '/ng_register.asp';
	
	// instantiate the Login Widget Helper
	var loginWidget = new UBM.Widget.Helper.Login({
		environment: ngenv,
		// login callback
		callback: function(data){
			if(data.success === true) {
			UBM.Widget.loadingStart("Processing, please wait...");
			$.post("/ng_loginsuccess.asp",
				 data,
				  function(data,status){
					UBM.Widget.loadingStop();
					if (data.remember_me) {
						$('<iframe />', {
							name: 'nggateway',
							id:   'nggateway',
							src: '/ng_gateway.asp',
							frameborder: '0',
							width: '0',
							height: '0'
						}).appendTo('body');	
					};
					setTimeout(function() {
					if(loginRedirectURL != ''){
						document.location.assign(loginRedirectURL);
					}else if(loginNextAction != ''){
						if (loginNextAction == 'profile'){
							updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
						}else if (loginNextAction == 'password'){
							loginNextAction = '';
							changePassword();
						}else if (loginNextAction == 'newsletter'){	
							loginNextAction = '';
							newsletterForm();
						}
					}else{
						document.location.reload(false);
					}
					loginWidget.close();
					}, 500);
				  })
				  .fail(function() {
				  	UBM.Widget.alert("There was a problem processing your login");
				  	UBM.Widget.loadingStop();
				  	loginWidget.close();
				  });
			}
		},
		footerContent: 'New here? <a href="#" onclick="loginWidget.close(); openForm(); return false;">Register for an account</a>',
		brandLogo : siteLogo,
		title : "<strong>Login</strong>" , 
		maxHeight: 430,
		extAuthUrl: '/ng_extauthgrant.asp',
		extAuthSuccessCallback: function(token,provider) {
			//alert('Successfully logged in with provider '+provider+'. <div>Token: '+token+', use this to authenticate with gateway</div>');
			$.post("/ng_loginsuccess.asp?token="+token+"&provider="+provider+"&mode=extauth",
				 '',
				  function(result){
				  	var theJSON = jQuery.parseJSON(result);
				  	UBM.Widget.loadingStop();
				  	if(theJSON.success === true){
						// we will automatically remember the person
						$('<iframe />', {
							name: 'nggateway',
							id:   'nggateway',
							src: '/ng_gateway.asp',
							frameborder: '0',
							width: '0',
							height: '0'
						}).appendTo('body');	
						setTimeout(function() {
						// External login success, user created. Now check if there is additional info we need
						var ord=Math.random()*10000000000000000;
						var theUrl = "/ng_socialregcheck.asp?cb=" + ord;
						$.get(theUrl,
							function(text){
								if (text.toLowerCase()=='true') {
									//this means they have already answered all the questions necessary
									trackSocialMediaBasicRegistration();
									if(loginRedirectURL != ''){
										document.location.assign(loginRedirectURL);
									}else if(loginNextAction != ''){
										if (loginNextAction == 'profile'){
											updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
										}else if (loginNextAction == 'password'){
											loginNextAction = '';
											changePassword();
										}else if (loginNextAction == 'newsletter'){	
											loginNextAction = '';
											newsletterForm();
										}
									}else{
										document.location.reload(false);
									}
									loginWidget.close();
									
								} else {
									// we need more info
									// first we'll set a cookie that says they need to answer the questions. If they don't, we'll need to log
									// them out.
									ngCreateCookie("extAuthSuppNeeded", "yes", 1);
									loginWidget.close();
									var xmlFile = '/ngextsuppform_xml.asp?cb=' + ord;
									$.get(xmlFile,function(xml){
										externalAuthSuppWidget.openFormWindowWithXml(xml);
									});								
								}
							}
							);
							}, 500);
					} else {
						UBM.Widget.alert(theJSON.error);
					}
				})
				  .fail(function() {
				  	UBM.Widget.alert("There was a problem processing your login");
				  	UBM.Widget.loadingStop();
				  	loginWidget.close();
				  });
		},
		changePasswordIframeWidth: 300,
		passwordResetIframeWidth: 300,
		loginDescription : "The same username and password you use for Techweb, Network Computing or EETimes will also work here.",
		//loginDescription : "",
		template : '<div id="modalHeader"><div>{logo}</div><div class="modal-description">{description}</div></div><div>{form}{extAuth}</div><div id="modal-footer">{footer}</div>',
		// password reset callback
		passwordResetTemplate: '<div id="modalHeader"><div class="modal-logo">{logo}</div><div class="modal-description"></div></div>{form}<div id="modal-footer"></div>',
		passwordResetRequestCallback: function(data){
			UBM.Widget.alert("An e-mail has been sent to the address you provided that will contain a link to reset your password.");
			loginWidget.close();
		},
		passwordResetCallback: function(data){
			loginWidget.close();
			trackPasswordResetOpen();
		},
		// password change callback
		passwordChangeCallback: function(data){
			loginWidget.close();
		}
	});

	var registrationWidget = new UBM.Widget.Helper.Registration({
		environment: ngenv,
		title  : "<strong>Registration</strong>", rememberMeCheckboxAfterField : 121, 
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: regAction,
		successCallback: function(data){ 
			trackRegistrationThankYou();
			if (data.remember_me) {
				$('<iframe />', {
					name: 'nggateway',
					id:   'nggateway',
					src: '/ng_gateway.asp',
					frameborder: '0',
					width: '0',
					height: '0'
				}).appendTo('body');	
			}
			registrationWidget.close();
			openRegisterThanks();
		},
		errorCallback: function(data){
		},
		loginLinkCallback: function (){
			loginWidget._options.loginDescription='';
			registrationWidget.close();
			loginWidget.open();
			trackLoginOpen();
		},
		headerContent: regHeaderContent,
		privacyLogo: privacyLogo,
		privacyText: privacyText,
		maxHeight: Math.min(700,$(window).height() - 50 ),
		accountAlreadyExistsOnClick: "registrationWidget.close(); loginWidget.open(); trackLoginOpen(); return false;",
		serviceApiKey: ngserv,
		recaptchaToken: '6Lc_efgSAAAAANa1O8urNcnkjqbSqlxCDzJuJKju'
	});

	var updateWidget = new UBM.Widget.Helper.UpdateProfile({
		environment: ngenv,
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: "/ng_profile.asp",
		avatarPostUrl: "/thumbnail.aspx",
		successCallback: function(data){ 
			$('#welcome').html('Welcome '+data.username);
			$('.profileUsername').html(data.username);
			updateWidget.close();
		},
		errorCallback: function(data){
		},
		avatarSuccessCallback:function(data){ 
			UBM.Widget.loadingStart();
			$.get("/ng_thumbnail.asp?filename="+data.filename,
				  function(thisdata){
					UBM.Widget.loadingStop();
					if (thisdata.success) {
						updateWidget.updateAvatarImage(thisdata.url);
					} else {
						alert("There was a problem processing your file. Please try again.");
					}
				  })
				  .fail(function() {
				  	UBM.Widget.loadingStop();
				  	alert("There was a problem processing your file. Please make sure your image is less than 5 Megabytes");
				  });

		},
		loginLinkCallback: function (){
			loginWidget._options.loginDescription='';
			updateWidget.close();
			loginWidget.open();
			trackLoginOpen();
		},
		avatarErrorCallback: function(data){
			UBM.Widget.loadingStop();
			alert("There was a problem processing your file. Images must be less than 5 Megabytes");
		},
		headerContent: 'Update your profile by filling out the form below<br />Click here to <a href="#" onclick="UBM.Widget.loadingStart(); updateWidget.close(); newsletterForm(); return false;">update your Newsletter Preferences</a>',
		privacyLogo: privacyLogo,
		privacyText: privacyText,
		serviceApiKey: ngserv,
		updateForm: true,
		changePasswordAction: function() {
			updateWidget.close();
			changePassword();
		}
	});

	var optoutWidget = new UBM.Widget.Helper.Optout({
		environment: ngenv
		//message: 'To opt-out of any future online event offers, please click on the submit button below',
		//confirmMessage: 'Thank You. You will be removed from any future online event offers within 10 days.',
	});

	var newsletterWidget = new UBM.Widget.Form({
		environment: ngenv,
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: "/ng_newsletterprefs.asp",
		windowTitle: "Newsletter Preferences",
		windowWidth: 600,
		ajaxCompleteCallback: function(d) {
			UBM.Widget.loadingStop();
			trackNewsletterPrefsConfirm();
			newsletterWidget.closeFormWindow();
		},
		ajaxErrorCallback: function(d){
			UBM.Widget.loadingStop();
		},
		successCallback: function(d) {
			UBM.Widget.loadingStart("Processing, please wait...");
			return true;
		},
		failureCallback: function(d){
		}
	});

	var externalAuthSuppWidget = new UBM.Widget.Form({
		environment: ngenv,
		ajax: true,
		submitFormId: true,
		submitFieldTypeTable: true,
		method: "post",
		action: "/ng_asset.asp",
		windowTitle: "More Info",
		windowWidth: 600,
		windowClosable: true,
		onClose: function() {ngLogoutUser();},
		emailConfirmationField: false,
		loginLinkCallback: function (){
			loginWidget._options.loginDescription='';
			externalAuthSuppWidget.close();
			loginWidget.open();
			trackLoginOpen();
		},
		//serviceApiKey: ngserv,
		//emailCheckService: ngconfig.getNgServiceUrl('emailCheck'),
		//nicknameCheckService: ngconfig.getNgServiceUrl('nicknameCheck'),
		ajaxCompleteCallback: function(d) {
			UBM.Widget.loadingStop();
			if(d.success){
				trackRegistrationThankYou();
				trackSocialMediaBasicRegistration();
				ngEraseCookie("extAuthSuppNeeded");
				externalAuthSuppWidget.closeFormWindow();
				if(loginRedirectURL != ''){
					document.location.assign(loginRedirectURL);
				} else if(loginNextAction != ''){
					if (loginNextAction == 'profile'){
						updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
					}else if (loginNextAction == 'password'){
						loginNextAction = '';
						changePassword();
					}else if (loginNextAction == 'newsletter'){	
						loginNextAction = '';
						newsletterForm();
					}
				} else {
					document.location.reload(false);
				}
			} else {
				UBM.Widget.alert(d.error);
			}
		},
		ajaxErrorCallback: function(d){
			UBM.Widget.loadingStop();
		},
		successCallback: function(d) {
			UBM.Widget.loadingStart("Processing, please wait...");
			return true;
		},
		failureCallback: function(d){
		}
	});

	function openRegisterThanks() {
		UBM.Widget.Helper.Modal.open('<br /><div align="center"><h2><b>Thank you for registering</b></h2><br /><br /><a href="#" onclick="UBM.Widget.Helper.Modal.close(); location.reload(true);">Close this window</a></div>', 
			{
			title: "Registration",
			width: 400,
			height: 250, 
			onClose: function(){location.reload(true); } 
			}
		);
		
	}

	function login(nextURL) {
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					loginRedirectURL = nextURL;
					loginWidget._options.loginDescription='';
					loginWidget.open();
					trackLoginOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to login.");
				}
		});		
	}

	function loginWithMessage(nextURL,headerMessage) {
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					loginRedirectURL = nextURL;
					loginWidget._options.loginDescription=headerMessage;
					loginWidget.open();
					trackLoginOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to login.");
				}
		});		
	}

	function changePassword() {
		verifyToken(function(validToken){
			if(validToken == "True"){
				loginWidget.openChangePassword();
			}else{
				loginNextAction = 'password';
				loginWidget.open();
				trackLoginOpen();
			}
		});
	}

	function openForm() {
		ngCreateCookie("ngTestCookie", "yes", 1);
		$.get("/ng_checkcookieenable.asp",
			  function(thisdata){
				if (thisdata.success) {
					setNGReg();
					registrationWidget.openWithAjaxForm('/ngregform_xml.asp');
					trackShortRegistrationOpen();
				} else {
					UBM.Widget.alert("You must have cookies enabled to register.");
				}
		});		
	}

	function updateForm() {
		verifyToken(function(validToken){
				if(validToken == "True"){
					$.get("/ng_checkforthumbnail.asp",
						  function(thisdata){
							if (thisdata.success) {
								updateWidget.updateAvatarImage(thisdata.url);
							} else {
								//alert("There was a problem processing your file. Images must be less than 5 Megabytes");
							}
						  })
						  .fail(function() {
							//alert("There was a problem processing your file. Images must be less than 5 Megabytes");
						  });
					updateWidget.openWithAjaxForm('/ngprofileform_xml.asp');
					
				}else{
					// if the url contains update_profile just let the page refresh when we login so we can see their profile page, then page will pop up profiles page
					if(location.search.indexOf('update_profile=')<0) {
						loginNextAction = 'profile';
					}
					loginWidget.open();
					trackLoginOpen();
				}
		});
		
	}

	function newsletterForm() {
		verifyToken(function(validToken){
			if(validToken == "True"){
				var xmlFile = '/ngnewsletterform_xml.asp';
				$.get(xmlFile,function(xml){
					newsletterWidget.setFormHeader( 'Please choose the newsletters you would like to receive:' );
					newsletterWidget.openFormWindowWithXml(xml);
					trackNewsletterPrefsOpen();
					UBM.Widget.loadingStop();
				});
			}else{
				if(location.search.indexOf('update_newsletter=')<0) {
					loginNextAction = 'newsletter';
				}
				UBM.Widget.loadingStop();
				loginWithMessage('','Please log in or register to update your newsletter preferences.');
				trackLoginOpen();
			}
		});
	}

	function extAuthSuppForm(theXML) {
		externalAuthSuppWidget.openFormWindowWithXml(theXML);
	}

	function verifyToken(callback){
		$.get("/ng_verifytoken.asp", function(validToken) {
			callback(validToken);
		});
		
	}

	function ngLogoutUser(){
		$.get("/ng_logout.asp");	
	}

	// jQuery extension to get query string parameters
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});
	
    $(document).ready(function() {
   		loginWidget.init();
		
		welcomeLinks.usernameText = unescape(GetCookie("piddlNGUsername"));

		var welcomeHTML = '<div class="first-level-nav-item">Welcome Guest</div><div class="first-level-nav-item"><a onclick="login(\'\'); return false;" class="color-link" href="#" id="login" >'+welcomeLinks.loginText+'</a></div><div style="float: left;" class="first-level-nav-item"><a href="'+welcomeLinks.register+'"  class="color-link" title="'+welcomeLinks.registerText+'"  >'+welcomeLinks.registerText+'</a></div>';
		var welcomeHTMLMobile = '<li><a onclick="login(\'\'); return false;" href="#" id="login" >'+welcomeLinks.loginText+'</a></li><li><a href="'+welcomeLinks.register+'" title="'+welcomeLinks.registerText+'"  >'+welcomeLinks.registerText+'</a></li>';
		
		if ( ! GetCookie("piddlUserIDEnc") ){
			if ( GetCookie("piddlPermUserIDEnc") ){
				welcomeHTML = '<div id="welcome" class="first-level-nav-item">Welcome '+welcomeLinks.usernameText+'</div><div class="first-level-nav-item"><a onclick="login(\'\'); return false;" class="color-link" href="#" id="login" >'+welcomeLinks.loginText+'</a></div><div class="first-level-nav-item"><a href="'+welcomeLinks.logout+'" class="color-link">'+welcomeLinks.logoutText+'</a></div>';
				welcomeHTMLMobile = '<li><a onclick="login(\'\'); return false;" href="#" id="login" >'+welcomeLinks.loginText+'</a></li><li><a href="'+welcomeLinks.logout+'" >'+welcomeLinks.logoutText+'</a></li>';
			}
			$('#loginLinks').html(welcomeHTML);
			$('#loginLinksMobile').prepend(welcomeHTMLMobile);
		}else{
			verifyToken(function(validToken){
				if(validToken == "True"){
					welcomeHTML = '<div id="welcome" class="first-level-nav-item">Welcome '+welcomeLinks.usernameText+'</div><div class="first-level-nav-item"><a href="/profile.asp" class="color-link">'+welcomeLinks.profileText+'</a></div><div class="first-level-nav-item"><a href="'+welcomeLinks.logout+'" class="color-link">'+welcomeLinks.logoutText+'</a></div>';
					welcomeHTMLMobile = '<li><a href="/profile.asp" >'+welcomeLinks.profileText+'</a></li><li><a href="'+welcomeLinks.logout+'">'+welcomeLinks.logoutText+'</a></li>';
					$('#loginLinks').html(welcomeHTML);
					$('#loginLinksMobile').prepend(welcomeHTMLMobile);
				}else{
					$('#loginLinks').html(welcomeHTML);
					$('#loginLinksMobile').prepend(welcomeHTMLMobile);
				}
			});
		}
		
		if(! GetCookie("piddlUserIDEnc")){
			if (location.search.indexOf('ngAction=register')>=0 && !(location.search.indexOf('token=')>=0)){
				openForm();
			}else if(location.search.indexOf('token=')>=0 && (location.search.indexOf('gateway_return=')>=0 || location.search.indexOf('ngAction=register')>=0)) {
				ngCreateCookie("ngTestCookie", "yes", 1);
				$.get("/ng_checkcookieenable.asp",
					  function(thisdata){
						if (thisdata.success) {
							loginWidget.open();
							trackLoginOpen();
						} else {
							UBM.Widget.alert("You must have cookies enabled to register.");
						}
				});		
			}
		}
		//if we don't recognize them, and query string requests the register window open
		if ((! GetCookie("piddlUserIDEnc")) && location.search.indexOf('pAction=register')>=0){
			openForm();
		}		
    });

function ngCreateCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function ngRreadCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function ngEraseCookie(name) {
    ngCreateCookie(name, "", -1);
}

function trackShortRegistrationOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event43';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackSocialMediaBasicRegistration(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event46';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLongRegistrationOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event44';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLoginOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event45';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackLoginSuccess(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event2';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackPasswordResetOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event48';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackNewsletterPrefsOpen(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_nltrackproduct;
	s.events='event49';
	s.tl(this,'o',omn_nltrackproduct);
}

function trackNewsletterPrefsConfirm(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_nltrackproduct;
	s.events='event50';
	s.tl(this,'o',omn_nltrackproduct);
}

function trackShortRegistrationConfirm(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event3';
	s.tl(this,'o',omn_regtrackproduct);
}

function trackRegistrationThankYou(){
	var s=s_gi('cmpglobalvista');
	s.products=omn_regtrackproduct;
	s.events='event7';
	s.tl(this,'o',omn_regtrackproduct);
}
