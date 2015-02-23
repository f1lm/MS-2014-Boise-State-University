/**
 * @author Shwetha Nimmala
 */

/*global $, _, Backbone */

LobbyPage.AttendView = RegPage.SectionView.extend({
	
	className: 'attend-section section',
	
	initialize: function(options) {
		'use strict';
		this.options=options;
		this.template = _.template(RegPage.Templates.filter('#attend-tpl').html());
		this.modelBinder = new Backbone.ModelBinder();
		this.render();
		$(window).on("load", this.refreshLobby());
	},
	
	stylesBindings: {
		submitBorderColor: {selector: '.launchBtn', elAttribute: 'css', cssAttribute: 'border-color'},
		submitBkgColor: {selector: '.launchBtn', elAttribute: 'css', cssAttribute: 'background'},
		submitTxtColor: {selector: '.launchBtn', elAttribute: 'css', cssAttribute: 'color'}
	},
	

	events: {
		'click .js-submit': 'launch',
		'click .listen-by-phone-option':'checkListenByPhone'
	},

	sectionRender: function(){
		'use strict';
		this.$el.html( this.template({lobbyprop:LobbyPage.Properties}) );
		//TODO: I am testing without bindings, usign the element "name" attr, to see how it goes..
		this.modelBinder.bind(this.model, this.el);//, this.bindings);
		this.$el.find("[name='launchButton']").html(this.model.get('launchButton'));
		if(this.model.get('launchButton') == "") this.$el.find("[name='launchButton']").addClass('launchBtn');
		this.$el.find("[name='scheduleStr']").html(this.model.get('scheduleStr'));
		this.$el.find("[name='tys']").html(this.model.get('tys'));
		this.$el.find("[name='help']").html(this.model.get('help'));
		this.$el.find("[name='flashPlayerLink']").html(this.model.get('flashPlayerLink'));
		if(window.isMobile){
			this.$el.find("[name='tys']").hide();
			this.$el.find("[name='help']").hide();
			this.$el.find("[name='flashPlayerLink']").hide();
		}
		this.$el.find("[name='realPlayerLink']").html(this.model.get('realPlayerLink'));
		this.$el.find("[name='windowsPlayerLink']").html(this.model.get('windowsPlayerLink'));
		this.$el.find("[name='silverLightLink']").html(this.model.get('silverlightLink'));
		var calenderurl = this.model.get('calendarUrl');
		if(calenderurl !== ""){
			this.$el.find(".add-to-calendar a").attr("href", calenderurl);
			this.$el.find(".add-to-calendar a").html("<img border='0' src='/view/eventregistration/images/calendar.gif'>");
			this.$el.find(".add-to-calendar").show()
		}
		
		if((this.model.get('listenByPhone'))){
			this.$el.find(".listen-by-phone-container").show();
			this.$el.find(".listen-by-phone-container .computer-speakers input[name='format']").prop("checked", "checked");
			this.$el.find(".listen-by-phone-container .computer-speakers input").attr("value", this.checkFormat("fhvideo")?"fhvideo":"fhaudio");
			if(this.model.get("singleColumnLayout")){
				this.$el.find(".listen-by-phone-container").addClass('rowLeftAlign');
				this.$el.find(".listen-by-phone-options-container").addClass('rowLeftAlign');
			}
		}
		
		if(this.model.get('nonStreamingText') !== ""){
			this.$el.find(".dial-in-msg").html(this.model.get('nonStreamingText'));
		}
	},
	
	checkListenByPhone:function(evt){
		var current = evt.target;
		$(".listenByPhoneOption").css({
			"background-color": "#fff",
			"color":"#b1b1b1"
		
		});
		 $(current.parentNode).css({
			"background-color": "#f1f1f1",
			"color":"#222"
			
		});
		 
		 if(!this.model.get("singleColumnLayout")){
			 $("#arrow-img").addClass("arrow-img-double-layout");
		 	 $(".dial-in-msg").css("margin-top", "0px");
		 }
		 else{
			 $("#arrow-img").addClass("arrow-img-single-layout"); 
			 $(".dial-in-msg").css("margin-top", "50px");
		 }	
		 
		 if(current.value == "rmnonstreaming"){
			 $(".computer-speakers img").attr("src", "images/computer_inactive.png");
			 $(".dial-in img").attr("src", "images/phone_active.png");
			 if(this.model.get("nonStreamingText") !== "")$(".non-streaming-block").show();
			 
		 }else{
			 $(".computer-speakers img").attr("src", "images/computer_active.png");
			 $(".dial-in img").attr("src", "images/phone_inactive.png");
			 $(".non-streaming-block").hide();
				
		 }
	},
	
	launch: function(evt){
		'use-strict';
		
		if(this.options.eventInfo.mode === "preview") return;
		var formatfromLobbyLaunchButton = this.model.get('formatUploadImage'), httpprotocol = this.options.eventInfo.httpprotocol;
		var host = this.options.eventInfo.host, sessionid = this.options.eventInfo.sessionid,eventid = this.options.eventInfo.eventid, key = this.options.eventInfo.key, additionalparams = (window.additionalparams) ? window.additionalparams : "";
		var errorURLParam = (window.errorUrl)? window.errorUrl : "";
		var player_media= this.model.get('player_media'), playerheight = this.model.get('playerheight'), playerwidth = this.model.get('playerwidth');
		var isInternalUserStr = window.isInternalUser?"&download=n":"";
		var referrerStr = window.referrer ? "&referrer="+window.referrer : "";
		var isHelpCenterEnabled = window.isHelpCenterEnabled, mobs = window.mobs, wcchost = window.wcchost;
		var mobileDownloadURL = "http://" + wcchost + "/view/presentation/mobile/EventConsole.html?eventid=" + eventid + "&sessionid=" + sessionid + "&key=" +key+ "&mobs=" + mobs;
		var format = this.selectedFormat(), flashConsoleEnabled = typeof this.model.get('extendedEventInfo').launchFlashConsole != "undefined" && this.model.get('extendedEventInfo').launchFlashConsole.value == "CHECKED";
		
		var isFlashFormat= flashConsoleEnabled && format && (format.indexOf("fh") == 0 || format.indexOf("nonstreaming") !=-1 )? true:false;
        var mobileConsoleUrl = window.mobileConsoleUrl;
        var cdMode = this.options.eventInfo.caller === "createcd" ;
        var hasStandardPlayerUrl = this.model.get('playerurl').indexOf("/clients/default/presentation/default.html") != -1;
        var flashConsoleURL = window.flashConsoleURL;
        var silverlightPlayerDetected= this.checkFormat("wm")? "Silverlight.isInstalled(\"2.0\")" : true;
        var launchButtonBehavior  = this.model.get('launchButtonBehavior')? this.model.get('launchButtonBehavior') : "";
        var text_language_id = window.params.indexOf("text_language_id=") > 0 ? "" : "&text_language_id="+ this.model.get('textLanguageId');
        var localeCountryCode = window.params.indexOf("localeCountryCode=") > 0 ? "" : ( this.model.get('localeCountryCode') != "null" ? ("&localeCountryCode="+ this.model.get('localeCountryCode')) :"");
        var hasFlash = this.checkFormat("fh");
        var flashPlayerDetected = hasFlash ? (!window.isMobile ? FlashDetect.versionAtLeast(10) : true) : true;
                     		
		        if(hasFlash && !flashPlayerDetected){
		    		alert(LobbyPage.Properties['lobby.flash_notfound']);
		    		return false;
		    	}
		        
		    	if(window.isCookieSecurityEnabled && (!this.checkForCookies())){
		    				return false;
		    	}
		  		    	
		        if (window.launchMobileArchiveForOnDemand && window.mobileArchiveExists) {
		            var playerUrl =httpprotocol+"//"+host+'/eventRegistration/eventRegistrationServlet?'+window.params+'&sessionid='+sessionid+additionalparams+text_language_id+localeCountryCode+'&format=mbvideo1'+errorURLParam+"&playerwidth="+playerwidth+"&playerheight="+playerheight+isInternalUserStr+referrerStr;
		            playerUrl += "&helpcenter=" + isHelpCenterEnabled;
		            playerUrl += "&mobs=" + mobs + "&playerurl="+encodeURIComponent(mobileDownloadURL);           
		            window.location = playerUrl;
		        } else if (window.faaArchiveExists) {
		        	var playerUrl = httpprotocol+"//"+host+'/eventRegistration/eventRegistrationServlet?'+window.params+'&sessionid='+sessionid+additionalparams+text_language_id+localeCountryCode+errorURLParam+"&playerwidth="+playerwidth+"&playerheight="+playerheight+isInternalUserStr+referrerStr;
			        this.launchWebcastURL(playerUrl);        	
		        } else if (formatfromLobbyLaunchButton != "") {
		            var playerUrl = httpprotocol+"//"+host+'/eventRegistration/eventRegistrationServlet?'+window.params+'&sessionid='+sessionid+additionalparams+text_language_id+localeCountryCode+"&format="+formatfromLobbyLaunchButton+errorURLParam+"&playerwidth="+playerwidth+"&playerheight="+playerheight+isInternalUserStr+referrerStr;
			        if (window.isMobile) {
		            	playerUrl += '&playerurl=' + 'http://' + host + mobileConsoleUrl;
		            } else if (isFlashFormat) {
		            	if(cdMode){
		            	     playerUrl = "EventConsole.html" + playerUrl.substring(playerUrl.indexOf("?"))+"&consolemode=cd";
		            	}else if(hasStandardPlayerUrl){
		            		 playerUrl += "&playerurl="+flashConsoleURL;
		            	}
		            }
		            if(window.isSilverlightEnabled && silverlightPlayerDetected){
		                playerUrl += "&silverlight=true";
		            }
		            playerUrl += "&helpcenter=" + isHelpCenterEnabled;
		            player = null;
		            if(launchButtonBehavior === "popup"){
		            	player=window.open(playerUrl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
		            } else if(launchButtonBehavior === "closelobby"){
			            player=window.open(playerUrl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
			            self.close();
			        } else if(launchButtonBehavior === "replacelobby"){
		            	 if(player!= null && !(player.closed)) return false;
		                 location.href = playerUrl+ "&overwritelobby=y";
		            } else {
			            player=window.open(playerUrl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
			            setTimeout(function(){
			            	if(player != null && !(player.closed)) return false;
			                 location.href = playerUrl+ "&overwritelobby=y";
			            },5000);
		            }
		            return false;
		            
		        } else {
		            var playerUrl = httpprotocol+"//"+host+'/eventRegistration/eventRegistrationServlet?'+window.params+'&sessionid='+sessionid+additionalparams+errorURLParam+"&playerwidth="+playerwidth+"&playerheight="+playerheight+isInternalUserStr+referrerStr;
				   if(window.isSilverlightEnabled && silverlightPlayerDetected){
		                playerUrl += "&silverlight=true"
		            }
		            playerUrl += "&helpcenter=" + isHelpCenterEnabled;
		            this.launchWebcastURL(playerUrl, playerwidth, playerheight, launchButtonBehavior, isFlashFormat);
		        }
		  
	},
	
	launchWebcastURL : function(url, playerwidth, playerheight, launchbuttonbehavior, flashformat) {
		'use_strict';
		var formatparam = this.selectedFormat(),  httpprotocol = this.options.eventInfo.httpprotocol, host = this.options.eventInfo.host, cdMode = this.options.eventInfo.caller === "createcd" ;
		var hasStandardPlayerUrl = this.model.get('playerurl').indexOf("/clients/default/presentation/default.html") != -1;
	      
		
		var text_language_id = window.params.indexOf("text_language_id=") > 0 ? "" : "&text_language_id="+ this.model.get('textLanguageId');
        var localeCountryCode = window.params.indexOf("localeCountryCode=") > 0 ? "" : ( this.model.get('localeCountryCode') != "null" ? ("&localeCountryCode="+ this.model.get('localeCountryCode')) :"");
       
		if (formatparam==""){
            alert(noMediaFormatSelected);
            return false;
        }

        //var locationurl=url+"&format="+formatparam+getErrorURLParamString();
        var locationurl=url+text_language_id+localeCountryCode+"&format="+formatparam+"&mobile=" + window.isMobile + "&flashsupportedmobiledevice=" + window.isFlashSupportedMobileDevice ;
        
        if (window.isMobile) {
        		locationurl += '&playerurl=' + 'http://' + host + mobileConsoleUrl;
        } else if (flashformat) {
        	if(cdMode){
        		locationurl = "EventConsole.html" + playerUrl.substring(playerUrl.indexOf("?"))+"&consolemode=cd";
        	}else if(hasStandardPlayerUrl){
        		locationurl += "&playerurl="+flashConsoleURL;
        	}
        }
        player = null;   
        
        if (window.isMobile) {
        	if(player!=null && !player.closed) return false;
            location.href = locationurl+ "&overwritelobby=y";
         } else if(launchbuttonbehavior === "popup"){
        	player=window.open(locationurl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
        } else if(launchbuttonbehavior === "closelobby"){
            player=window.open(locationurl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
            self.close();
        } else if(launchbuttonbehavior === "replacelobby"){
        	 if(player !=null && !player.closed) return false;
             location.href = locationurl+ "&overwritelobby=y";
        } else {
            player=window.open(locationurl,"player","width="+playerwidth+",height="+playerheight+",resizeable=no,scrollbars=yes");
            setTimeout(function(){
            	if(player!= null && !player.closed) return false;
                 location.href = locationurl+ "&overwritelobby=y";
            },5000);
        }
        return false;
	},
	
	checkForCookies: function(){
		'use-strict';
		if (location.href.indexOf("http") != 0) {
			return true;
		}
		if (!window.eventCookieValue) {//} || eventCookieValue=='') {
			alert(LobbyPage.Properties['lobby.registrationcookie']);
			return false;		
		}	
		return true;
		
	},
	
	checkFormat: function(format){
		'use strict';
		var formats = this.model.get('formats').formatcode;
		if($.isArray(formats)){
			for(var i=0; i<formats.length; i++){
				if(formats[i].indexOf(format) != -1) return true;
				continue;
			}
		}else{
			return formats.indexOf(format) != -1;
		}
		
		return false;
	},
	
	selectedFormat: function() {
		'use_strict;'
		
		var formats = this.model.get('formats').formatcode, extendedEventInfo = this.model.get('extendedEventInfo');
		if($.isArray(formats)){
			/*for(var i=0; i<formats.length; i++){
				if(formats[i] && extendedEventInfo && extendedEventInfo[formats[i]].value !== ""){
					selectedFormat = formats[i];
					return selectedFormat;
				}
			}*/
			
			var  selectedOption = $(".listen-by-phone-container input:checked")[0] && $(".listen-by-phone-container input:checked")[0].value ? $(".listen-by-phone-container input:checked")[0].value: "";
			return selectedOption == "" ? "fhaudio" : selectedOption ;
		}else{
			return formats.text;
		}
		
		
	},
	
	refreshLobby:function() {
		'use_strict;'
		var minpagerefresh = this.options.eventInfo.minrefreshsecs ?  this.options.eventInfo.minrefreshsecs : 60, 
			pagerefresh = this.options.eventInfo.pagerefresh? this.options.eventInfo.pagerefresh : 7200,
			presentationAvailable  = window.presentationAvailable;
		setTimeout(function(){
			location.reload();
		}, presentationAvailable ? pagerefresh*1000 : minpagerefresh*1000);
	
	}
	
});
