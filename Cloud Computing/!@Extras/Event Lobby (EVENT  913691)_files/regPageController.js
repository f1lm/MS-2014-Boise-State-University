/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.RegPageController = Backbone.Controller.extend({
	
	eventInfo: {},
	
	/*
	 * Initialize listeners, eventInfo, get server data, and create sections views
	 */
	initialize: function(options) {
		'use strict';
		
		RegPage.Vent.on('show:login', _.bind(this.showLogin, this));
		RegPage.Vent.on('show:error', _.bind(this.showError, this));
		this.setEventInfo();
		//Get data so we have something to show in the views!
		$.when(
				this.getRegPageData(),
				this.getLobbyPageData(),
				this.getEventData()
					//this.getPresentationEndTimeData()
		).done(_.bind(this.serverEventDataReady, this));
		
	},
	
	/*
	 * Set the event info in the eventInfo object, retrieving it from url params
	 */
	setEventInfo: function() {
		'use strict';
		
		var urlQuery = window.parent.location.search.substring(1),
			queryArr = urlQuery.split("&"),
			i, pair;
			
		for(i = 0; i < queryArr.length; i++) {
			pair = queryArr[i].split('=');
			if (pair[1]) {
				this.eventInfo[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
				if(pair[0]==='target' && pair[1].indexOf('lobby')>-1){
					this.eventInfo.isLobby = true;
				}
			}
			
		}
		this.eventInfo['httpprotocol'] = window.parent.location.protocol ;
		this.eventInfo['host'] = window.parent.location.host ;
	},
		
	/*
	 * Retrieves the Registration page data from the Server. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 */
	getRegPageData: function() {
		'use strict';
		var defer = $.Deferred();
		
		//Get Registration page data
		$.ajax({
			url:'/eventManager/presentation/displayElementXml.jsp',
			dataType: 'xml',
			data:{
				eventid: this.eventInfo.eventid,
				sessionid: this.eventInfo.sessionid,
				key: this.eventInfo.key,
				code: 'registration',
				mode: this.eventInfo.mode || "",
				//TODO: How does this "filter" work??
				//filter: 'eventsessionmediapresentationlogplayerxmlformateventrootmediabaseurldialininfomobileenv',
				random: Math.random
			},
			success: function(data) {
				defer.resolve(RegPage.ServerDataParser.parseServerRegPageData(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving registration data");
			}
		});
		
		return defer.promise();
	},
	
	/*
	 * Retrieves the Registration page data from the Server. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 */
	getLobbyPageData: function() {
		'use strict';
		var defer = $.Deferred();
		
		//Get Registration page data
		$.ajax({
			url:'/eventManager/presentation/displayElementXml.jsp',
			dataType: 'xml',
			data:{
				eventid: this.eventInfo.eventid,
				sessionid: this.eventInfo.sessionid,
				key: this.eventInfo.key,
				code: 'lobby',
				mode: this.eventInfo.mode || "",
				random: Math.random
			},
			success: function(data) {
				defer.resolve(RegPage.ServerDataParser.parseServerRegPageData(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving lobby data");
			}
		});
		
		return defer.promise();
	},
	
	
	/*
	 * Retrieves the Event data from the Server. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 */
	getEventData: function() {
		'use strict';
		var self = this,
			defer = $.Deferred();
		
		//Get Event data
		$.ajax({
			url:'/eventRegistration/includes/event.jsp',
			dataType: 'xml',
			data:{
				eventid: this.eventInfo.eventid,
				sessionid: this.eventInfo.sessionid,
				key: this.eventInfo.key,
				//TODO: How does this "filter" work??
				filter: 'eventsessionmediapresentationlogplayerxmlformateventrootmediabaseurldialininfomobileenvondemand',
				random: Math.random
			},
			success: function(data) {
				defer.resolve(RegPage.ServerDataParser.parseServerEventData(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving event data");
			}
		});
		
		return defer.promise();
	},
	
	/*
	 * Retrieves the Event End Time from the Server which is used fo OD/Simulive events. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 
	getPresentationEndTimeData: function() {
		'use strict';
		var self = this, presentationEndTime = 0,
			defer = $.Deferred();
		
		//Get Event data
		$.ajax({
			url:'/presentationManager/',
			dataType: 'json',
			data:{
				command:'eventRecording',
				action:'getPresentationEndTime',
				eventId: this.eventInfo.eventid,
				eventSessionId: this.eventInfo.sessionid,
				key: this.eventInfo.key
			},
			success: function(data) {
				presentationEndTime = data.presentationEndTime;
				defer.resolve(presentationEndTime);
				
			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving Presentation end time");
			}
		});
		
		return defer.promise();
	},
	*/
	
	/*
	 * Retrieves the Translations data from the Server. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 */
	getTranslationsData: function() {
		'use strict';
		var self = this,
			defer = $.Deferred();

		var params = {
			eventid: this.eventInfo.eventid,
			key: this.eventInfo.key,
			text_language_id: this.eventData.event.localelanguagecode, //TODO: Where do we get this?
			format: 'xml',
			page: 'registration,mobile.registration',
			random: Math.random
		};

		if(this.eventData.event.localecountrycode !== 'null'){
			params.localeCountryCode = this.eventData.event.localecountrycode;
		}
    
    if(this.eventData.event.localelanguagecode == 'iw'){
			$("html").attr("dir", "rtl");
		}

		//Get Event data
		$.ajax({
			url:'/eventRegistration/includes/messages.jsp',
			dataType: 'xml',
			data: params,
			success: function(data) {
				//defer.resolve($.xml2json(data));
				var parsedData,
					translations={};
				try {
					parsedData = $.xml2json(data);
					//Backend returning array of data....
					_.each(parsedData.message, function(message){
						translations[message.resourceCode] = message.resourceValue;
					});
				} catch (e) {
					if (window.console) {
						window.console.error("Error parsing localization data. Error: " + e);
					}
					defer.resolve();
				}
				defer.resolve(translations);

			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving translation data");
			}
		});
		
		return defer.promise();
	},
	
	/*
	 * Retrieves the Translations data from the Server. It returns a Promise
	 * from the Deferred object that will be resolved when data is returned.
	 * 
	 * @return: The promise from the Deferred object used to defer the data retrieval
	 */
	getLobbyTranslationData: function() {
		'use strict';
		var self = this,
			defer = $.Deferred();

		var params = {
			eventid: this.eventInfo.eventid,
			key: this.eventInfo.key,
			text_language_id: this.eventData.event.localelanguagecode, //TODO: Where do we get this?
			format: 'xml',
			page: 'lobby',
			random: Math.random
		};

		if(this.eventData.event.localecountrycode !== 'null'){
			params.localeCountryCode = this.eventData.event.localecountrycode;
		}

		//Get Event data
		$.ajax({
			url:'/eventRegistration/includes/messages.jsp',
			dataType: 'xml',
			data: params,
			success: function(data) {
				defer.resolve($.xml2json(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				RegPage.Logger.log("Error retrieving translation data");
			}
		});
		
		return defer.promise();
	},
	
	/*
	 * Creates and shows an Android Native Browser warning overlay (if that
	 * is the used browser), recommending a different browser. 
	 */
	browserWarning: function() {
		'use strict';
		if (RegPage.Detection.isAndroidNativeBrowser()) {
			this.androidNativeWarningView = new RegPage.BrowserWarningView({
				el: '#browser-warning-container'
			});
		}
	},
	
	/*
	 * Shows the login view. It will be created in case it not exist,
	 * or just shown in other case
	 */
	showLogin: function() {
		'use strict';
		if(!this.loginView) {
			this.loginView = new RegPage.LoginView({
				el: '#login-container',
				eventInfo: this.eventInfo,
				passwordField: this.regPageData.displayelement.reg_event_pswd,
				model: new Backbone.Model({
					customStyles: this.customStylesDataModel
				})
			});
		} else {
			this.loginView.show();
		}
	},
	
	/*
	 * Stores the data retrieved from the server on appropiate vars
	 * 
	 * 
	 * @param regPageData: Registration Page related data
	 * @param eventData: Event / Webcast related data
	 * 
	 */
	serverEventDataReady: function(regPageData, lobbyPageData, eventData) {
		'use strict';
		//Store regPageData and eventData in this object, so it's accesible
		this.regPageData = regPageData;
		
		if(this.eventInfo.isLobby)
			this.lobbyPageData = lobbyPageData;
		this.eventData = eventData;
		//Store a Backbone model from Style Data, so it can be bindable to views
		this.customStylesDataModel = new Backbone.Model(regPageData.customStylesData);
		$(document).trigger('serverEventDataReady', [eventData]);
		RegPage.eventData = this.eventData;
		
		
		//Just for testing...
		RegPage.Logger.log(regPageData);
		RegPage.Logger.log(eventData);
		RegPage.Logger.log("template_reg_layout: ");
		RegPage.Logger.log(regPageData.displayelement.template_reg_layout);
		
		//Get Translation data
		$.when(
			this.getTranslationsData(),
			this.getLobbyTranslationData()
		).done(_.bind(this.serverTranslationDataReady, this));
	
	},

	/*
	* Stores translation data retrieved from the server on appropiate var,
	* and calls createSections
	*
	* @param translationData: Translations for labels, static texts, etc. 
	*/
	serverTranslationDataReady: function(translationData, lobbyTranslationData){
		//Store the translationData so it's accesible from the whole app
		RegPage.Properties = translationData;
		if(this.eventInfo.isLobby)LobbyPage.Properties = lobbyTranslationData;
		RegPage.Logger.log(translationData);
	
		this.createSections();
	},
	
	/*
	 * Creates the layout where the sections will be shown, and append it to the 
	 * DOM. It also creates the sections themselves, showing them in the layout.
	 * Also the banner view gets created and shown.
	 */
	createSections: function() {
		'use strict';
		var enableloginonly = this.eventData.event.extendedeventinfo.eventinfo.enableloginonly,
			errorCode = $.trim(window.errorCode);
		//Show error if there is any
		try {
			//Global variable set by Rajesh in JSP wrapper
			if (errorCode) {
				this.showError(errorCode);
			}
		}catch(errEx){
			RegPage.Logger.error('Error trying to create Error Message: ' + errEx);
		}
		//Banner
		try {
			this.bannerView = this.createBanner(this.regPageData.displayelement.event_logo);
		}catch(banEx){
			RegPage.Logger.error('Error trying to create Banner: ' + banEx);
		}
		//Sections Layout
		try{
			this.sectionsLayout = this.createSectionsLayout();
		}catch(layEx){
			RegPage.Logger.error('Error trying to create Sections Layout: ' + layEx);
		}
		//OverView Section
		try{
			this.sectionsLayout.appendSection(this.createOverviewSection(), RegPage.Cons.OVERVIEW_SECTION);
		}catch(ovrEx){
			RegPage.Logger.error('Error trying to create Overview Section: ' + ovrEx);
		}
		//Summary Section
		try{
			this.sectionsLayout.appendSection(this.createSummarySection(), RegPage.Cons.SUMMARY_SECTION);
		}catch(sumEx){
			RegPage.Logger.error('Error trying to create Summary Section: ' + sumEx);
		}
		//Speaker Bio Section
		try{
			this.sectionsLayout.appendSection(this.createSpeakerBioSection(), RegPage.Cons.SPEAKERS_SECTION);
		}catch(spkEx){
			RegPage.Logger.error('Error trying to create Speaker Section: ' + spkEx);
		}

		//Registration Section
		if(!this.eventInfo.isLobby){
			try{
				if (enableloginonly && enableloginonly.value === 'CHECKED') {
					this.sectionsLayout.appendSection(this.createSeamlessLoginSection(), RegPage.Cons.REGISTRATION_SECTION);
				}else{
					this.sectionsLayout.appendSection(this.createRegistrationSection(), RegPage.Cons.REGISTRATION_SECTION);
				}
			}catch(regEx){
				RegPage.Logger.error('Error trying to create Registration Section: ' + regEx);
			}
			//If the browser is Android Native, show warning recomending Chrome
			try{
				this.browserWarning();	
			}catch(e){
				RegPage.Logger.error('Error creating Android browser warning message: '+ e);
			}
		}else{
			this.sectionsLayout.appendSection(this.createAttendSection(), RegPage.Cons.ATTEND_SECTION);
		}
		

		//Show the footer. Starts hided while the data is loaded and the view created
		$('#footer').show();
	},
	
	/*
	 * Creates the banner view
	 * 
	 * @param bannerData: Banner data retrieved from the server
	 * 
	 * @return: the instanciated banner view
	 */
	createBanner: function(bannerData) {
		'use strict';
		var bannerView,
			mediaURL = this.eventData.event.session.mediaurlinfo.mediaurl;
		
		if (bannerData.mediaURLID !== '-1') {
			bannerView = new RegPage.BannerView({
				el: '#banner-container',
				model: new Backbone.Model({
					bannerURL: mediaURL.url || mediaURL[bannerData.mediaURLID].url
				})
			});
		}
		return bannerView;
	},
	
	/*
	 * Creates (if needed) and shows the error message view
	 * 
	 * @param errorCode: Code of the error we need to show
	 * 
	 * @return: the instanciated error view
	 */
	showError: function(errorCode) {
		'use strict';
		//We don't want to show error message for Registration Capacity Reached
		if ($.trim(errorCode) !== 'regcapreached') {
			if (!this.errorView) {
				this.errorView = new RegPage.ErrorView({
					el: '#error-container',
					model: new Backbone.Model({
						errorCode: errorCode
					})
				});
			}else {
				this.errorView.update(errorCode);
				this.errorView.show();
			}
		}
	},
	
	/*
	 * Creates the sectionsLayoutView, assigning it different layout templates
	 * depending on the layout data retrieved from the server
	 * 
	 * @param layoutData: Sections layout data retrieved from the server. If 
	 *					displayelementoption data is not empty, means two-column
	 *					layout. "displayOptionLabel" indicates wether the layout
	 *					is "left or right aligned"
	 * 
	 * @return: the instantiated sections layout view 
	 */
	createSectionsLayout: function() {
		'use strict';
		var layoutTemplate,
			layoutView,
			layoutAlign,layoutData= $.isArray(this.regPageData.displayelement.template_reg_layout)? 
					this.regPageData.displayelement.template_reg_layout[(this.regPageData.displayelement.template_reg_layout.length) - 1]:this.regPageData.displayelement.template_reg_layout;
					//to fix multiple template_reg_layout in display_element table (WCC - 18565)
		//Two columns layout
		if (layoutData && layoutData.displayelementoptioninfo.displayelementoption) {
			layoutAlign = layoutData.displayelementoptioninfo.displayelementoption.displayOptionValue === 'N' ? 'right_align' : 'left_align';
			layoutTemplate = layoutAlign === RegPage.Cons.LEFT_ALIGN
				? RegPage.Templates.filter('#two-column-left-layout-tpl')
				: RegPage.Templates.filter('#two-column-right-layout-tpl');
		} 
		//One column layout by default
		else {
			layoutTemplate = RegPage.Templates.filter('#one-column-layout-tpl');
		}
		//Create the sections layout View with the template selected above
		layoutView = new RegPage.SectionsLayoutView({
			el: '#sections-layout-container',
			align: layoutAlign,
			template: layoutTemplate
		});
		return layoutView;
	},
	
	/*
	 * 
	 */
	createOverviewSection: function() {
		'use strict';
		var self = this,
			overviewView,
			overviewModel,
			evt = this.eventData.event,
			htmlTitle = RegPage.ServerDataParser.htmlUnescape(evt.description),
			sectionOverviewData = this.regPageData.displayelement.template_reg_overview;
		
		//Check if we need to display Overview Section
		if (typeof sectionOverviewData === "undefined"  ||  sectionOverviewData && sectionOverviewData.displayElementValue === 'Y') {
			overviewModel = new RegPage.OverviewModel({
				//TODO: get labels from i18n API
				sectionLabel: RegPage.Properties['registration.overview.header'],
				titleLabel: RegPage.Properties['registration.overview.title']+':',
				dateLabel: RegPage.Properties['registration.overview.date']+':',
				timeLabel: RegPage.Properties['registration.overview.time']+':',
				durationLabel: RegPage.Properties['registration.overview.duration']+':',
				title: htmlTitle,
				date: evt.localizedeventdate,
				time: evt.localizedeventtime,
				endDate: Number(evt.session.enddate),
				goodAfter: Number(evt.goodafter),
				odDuration: Number(evt.session.enddate)- Number(evt.goodafter) == 0 ? this.getOdDuration() : '',
				customStyles: this.customStylesDataModel
			},
			{
				parse: true
			});
			
			overviewView = new RegPage.OverviewView({model: overviewModel});
		}
		return overviewView;
	},
	
	createAttendSection : function(){
		'use strict';
		var self = this,
		attendView,
		attendModel,
		evt = this.eventData.event,
		layoutData= $.isArray(this.regPageData.displayelement.template_reg_layout)? 
				this.regPageData.displayelement.template_reg_layout[this.regPageData.displayelement.template_reg_layout.length]:this.regPageData.displayelement.template_reg_layout,
		singleColumnLayout = !(layoutData && layoutData.displayelementoptioninfo.displayelementoption),	
		lobbyElements = this.lobbyPageData.displayelement,
		htmlTitle = RegPage.ServerDataParser.htmlUnescape(evt.description),
		sectionOverviewData = this.regPageData.displayelement.template_reg_overview,
		tysUrl = this.testYourSystem(),
		tys = (lobbyElements.lobby_links || lobbyElements.lobby_test_your_system)? "<a href='' onClick='"+tysUrl+";return false;'  target='_blank' onMouseOver=\"window.status='"+LobbyPage.Properties['lobby.tys_link']+"'; return true;\" onMouseOut=\"window.status='';\"><font class=utilitylink>"+LobbyPage.Properties['lobby.testyoursystem']+"</font></a>" : "",
		helpURL="http://event.on24.com/view/help/ehelp.html?text_language_id=en&fh=true&ngwebcast=true",
		helpURL = helpURL.replace('text_language_id=en', 'text_language_id='+evt.localelanguagecode),		
		//<A HREF='#' onclick='"+testYourSystem();return false;+"' onMouseOver='window.status='"+LobbyPage.Properties['lobby.tys_link']+"'; return true;' onMouseOut='window.status='';'><font class=utilitylink>"+LobbyPage.Properties['lobby.testyoursystem']+"</font></a>
		help = (lobbyElements.lobby_online_help)? "<a href='"+helpURL+"' target='_blank' class=help>"+LobbyPage.Properties['lobby.help']+"</a>" : "",
		formats = this.eventData.event.formats,
		hasFlash = (this.checkFormat("fh"))? true : false,
		hasReal =  this.checkFormat("rm") && !this.checkFormat("rmnonstreaming")? true : false,
		hasWindows = (this.checkFormat("wm") && !window.isSilverLightEnabled )? true : false,
		hasNonStreaming = this.checkFormat("rmnonstreaming") && ((new Date().getTime() < Number(evt.session.enddate))|| (this.eventInfo["previewtype"] === "live"))? true : false,
		hasSilverLight = this.checkFormat("wm") && window.isSilverLightEnabled,
		dldFlashPlayer =  (hasFlash && lobbyElements.lobby_links) || (hasFlash && lobbyElements.lobby_download_flash),
		dldRealPlayer =  (hasReal && lobbyElements.lobby_links) || (hasReal && lobbyElements.lobby_download_real),
		dldWindowsPlayer =  (hasWindows && lobbyElements.lobby_links) || (hasWindows && lobbyElements.lobby_download_windows),
		dldSilverLight = (hasSilverLight && lobbyElements.lobby_links)|| (hasSilverLight && lobbyElements.lobby_download_windows),
		flashPlayerLink = dldFlashPlayer? "<a href='http://www.adobe.com/go/getflashplayer'  onMouseOver=\"window.status='"+LobbyPage.Properties['lobby.flashplayer_link']+"'; return true;\" onMouseOut=\"window.status='';\" target=_blank><font class=utilitylink>"+LobbyPage.Properties['lobby.flashplayer_download']+"</font></a>" :"",
		realPlayerLink = dldRealPlayer? "<a href='/utils/downloadreal.html'  onMouseOver='window.status='"+LobbyPage.Properties['lobby.realplayer_link']+"'; return true;' onMouseOut='window.status='';' target=_blank><font class=utilitylink>"+LobbyPage.Properties['lobby.realplayer_download']+"</font></a>" :"",
		windowsPlayerLink = dldWindowsPlayer? "<a href='/utils/downloadwindowsmedia.html'  onMouseOver='window.status='"+LobbyPage.Properties['lobby.wmp_link']+"'; return true;' onMouseOut='window.status='';' target=_blank><font class=utilitylink>"+LobbyPage.Properties['lobby.wmp_download']+"</font></a>" :"",
		silverLightLink = dldSilverLight? "<a href='/utils/downloadsilverlight.html'  onMouseOver='window.status='"+LobbyPage.Properties['lobby.silverlight_link']+"'; return true;' onMouseOut='window.status='';' target=_blank><font class=utilitylink>"+LobbyPage.Properties['lobby.silverlight_download']+"</font></a>" :"";
		
		var player_console_properties = this.eventData.event.session.displayelementinfo.displayelement.player_console_properties;
		var playerwidth = player_console_properties.displayelementoptioninfo.displayelementoption[0].displayOptionValue;
		var playerheight = player_console_properties.displayelementoptioninfo.displayelementoption[1].displayOptionValue;
		var launchButtonOption = this.eventData.event.session.displayelementinfo.displayelement.player_console_properties.displayelementoptioninfo.displayelementoption[2];
		var launchButtonBehavior  = launchButtonOption && launchButtonOption.displayOptionValue;
        if(this.lobbyPageData.displayelement.lobby_layout && this.lobbyPageData.displayelement.lobby_layout.displayelementoptioninfo.displayelementoption[1] )
        	launchButtonBehavior = this.lobbyPageData.displayelement.lobby_layout.displayelementoptioninfo.displayelementoption[1].displayOptionValue;
        var extendedEventInfo = this.eventData.event.extendedeventinfo.eventinfo;
        var player_media= this.eventData.event.session.displayelementinfo.displayelement.player_media;
        var player_selection = this.lobbyPageData.displayelement.lobby_player_selection_block, iseliteclient = (window.eliteClient), isDialIn = false, isComputerSpeakers = false,
        presentationAvailable = window.presentationAvailable,listenByPhone = false,media_selection_block = "",
        listenByPhoneSelected = (evt.extendedeventinfo.eventinfo.hasOwnProperty("rmnonstreaming") && evt.extendedeventinfo.eventinfo.rmnonstreaming.value === "CHECKED"),
        nonStreamingText= listenByPhoneSelected && evt.extendedeventinfo.eventinfo.hasOwnProperty("nonstreamingtext") ? evt.extendedeventinfo.eventinfo.nonstreamingtext.value:"",
        moreFormats = $.isArray(formats.formatcode);
        
        
        if(player_selection && iseliteclient && presentationAvailable && moreFormats){
        	if(hasNonStreaming && hasFlash)listenByPhone = true;
           	//if(hasNonStreaming) isDialIn = true;
        	//if(hasFlash)isComputerSpeakers = true;
        	
        }else if(player_selection && presentationAvailable && moreFormats){
        	media_selection_block = true;
        	
        }
     	attendModel = new LobbyPage.AttendModel({
				//TODO: get labels from i18n API
				sectionLabel: LobbyPage.Properties['lobby.attend.header'],
				scheduleStr: this.getScheduleStr(this.eventData),
				launchButton: this.displayLaunchPresentation(),
				tys: tys,
				help: help,
				title: htmlTitle,
				flashPlayerLink: flashPlayerLink,
				realPlayerLink: realPlayerLink,
				windowsPlayerLink: windowsPlayerLink,
				silverLightLink: silverLightLink,
				launchButtonBehavior:launchButtonBehavior,
				formats:formats,
				extendedEventInfo:extendedEventInfo,
				player_media:player_media,
				playerurl:this.eventData.event.playerurl,
				playerwidth:playerwidth,
				playerheight:playerheight,
				calendarUrl:this.getCalendarUrl(),
				listenByPhone:listenByPhone,
				hasNonStreaming:hasNonStreaming,
				nonStreamingText:nonStreamingText,
				addCalendarMsg:LobbyPage.Properties['add.event.to.calendar'],
				singleColumnLayout:singleColumnLayout,
				textLanguageId: evt.localelanguagecode,
				localeCountryCode: evt.localecountrycode,
				formatUploadImage:this.lobbyPageData.displayelement.hasOwnProperty('image')? this.lobbyPageData.displayelement.hasOwnProperty('image').displayElementValue : "",
				customStyles: this.customStylesDataModel
			
			},
			{
				parse: true
			});
			
		
		attendView = new LobbyPage.AttendView({
			model: attendModel,
			eventInfo: this.eventInfo
			});
		
		
		return attendView;
	},
	
	getScheduleStr: function(eventData){
		'use strict';
		var scheduleStr;
		var goodafter= eventData.event.goodafter, archivestartdate = eventData.event.session.archivestartdate,
		archiveenddate = eventData.event.session.archiveenddate, startdate = eventData.event.session.startdate,
		currenttime = new Date().getTime(), goodafterdateString = $.trim(eventData.event.localizedeventdate + " at " + eventData.event.localizedeventtime),
		enddate = eventData.event.session.enddate, archiveeventdatestring = $.trim(eventData.event.localizedarchivestartdate+" at "+eventData.event.localizedarchivestarttime) ,
		archiveenddatestring=eventData.event.localizedarchiveenddate + " at " + eventData.event.localizedarchiveendtime,
		minutestolive = eventData.event.minutestolive, minutestoarchive = eventData.event.minutestoarchive;
		
		if(archivestartdate == archiveenddate && archiveenddate > currenttime && ( enddate < currenttime  || startdate == enddate)){
			scheduleStr=LobbyPage.Properties['lobby.archiveended'];
		} else if (minutestolive > 0){
			var lobbyTime=Math.abs((goodafter-startdate)/(60*1000));
			scheduleStr=LobbyPage.Properties['lobby.prelive']+".<br><br>";
			scheduleStr = scheduleStr.replace('#EVENTDATETIME#',goodafterdateString);
			if (lobbyTime>0) scheduleStr+=LobbyPage.Properties['lobby.audience_prelive_msg']+"<br>";
			scheduleStr = scheduleStr.replace('#PRELIVEMINUTES#',lobbyTime.toString());
		}else if (minutestolive == 0){
			//if they are in the "pre-live" period (i.e., before event start date, but after session start date)
			if (goodafter > currenttime) {
				scheduleStr = LobbyPage.Properties['lobby.prelive']+".<br>";
				scheduleStr = scheduleStr.replace('#EVENTDATETIME#',goodafterdateString);
			}
			else{
				scheduleStr =LobbyPage.Properties['lobby.live']+".<br>";
				scheduleStr = scheduleStr.replace('#EVENTDATETIME#',goodafterdateString);
			}
		}else if (minutestoarchive > 0){
			scheduleStr =(LobbyPage.Properties['lobby.archivestart']+".<br>");
			scheduleStr = scheduleStr.replace('#ARCHIVESTARTDATETIME#',archiveeventdatestring);
		}else if (minutestoarchive == 0){
			scheduleStr=(LobbyPage.Properties['lobby.archiveend']+".<br>");
			scheduleStr = scheduleStr.replace('#ARCHIVEENDDATETIME#',archiveenddatestring);
		}     
		else { //if this session is available in any form (Live or Archived)
			scheduleStr=("<font color=red>"+LobbyPage.Properties['lobby.presentation_unavailable']+"</font>");
		}
		scheduleStr+=("<!--minutesToLive="+minutestolive+"  minutesToArchive="+minutestoarchive+"-->");	
		scheduleStr = scheduleStr.replace(" .", ".");
		
		return scheduleStr;
	},

	displayLaunchPresentation: function(){
		'use strict';
		var lobbyLaunchButton = this.lobbyPageData.displayelement.lobby_launch_button, isMobileConsoleEnabled = window.isMobileConsoleEnabled,
		formats = this.eventData.event.formats, isMobile = window.isMobile,
		presentationAvailable = window.presentationAvailable,
		displayMessage = "", worksOnMobileDevice = window.worksOnMobileDevice, previewMode = (this.eventInfo['mode'] === 'preview');
		
		if(lobbyLaunchButton) {
			if(isMobile && !isMobileConsoleEnabled){
				displayMessage = "Your device is not supported at this time."; 
			} else if (((presentationAvailable && (formats != 'undefined'  && formats.formatcode !='undefined')) && (!isMobile || (isMobile && worksOnMobileDevice))) || 
				(presentationAvailable && !(formats != 'undefined'  && formats.formatcode != 'undefined') && isMobile && worksOnMobileDevice))	{
				var btnUrl = lobbyLaunchButton.displayElementValue;
				var  mediaUrlId =  lobbyLaunchButton.mediaURLID;
				var mediaUrl = this.eventData.event.session.mediaurlinfo.mediaurl;
				if(mediaUrlId > 0 && (mediaUrl != "")) btnUrl = mediaUrl; //this.replaceHost(host, mediaUrl);
			   
				if(mediaUrlId == -1){
					if(!isMobile || (isMobile && worksOnMobileDevice)){
						var launchString = !previewMode ? '' : '';
						displayMessage+="<input text="+mediaUrlId+" type ='button' value ='"+ LobbyPage.Properties["lobby.launchpresentation"]+"' class='btn launchBtn' onClick='"+launchString+"' onMouseOver=\"window.status='Click here to Launch the Webcast';return true;\" onMouseOut=\"window.status='';\" id='launchBtnImg'/>";
						
					}
				}else{
					if(!previewMode && (!isMobile || (isMobile && worksOnMobileDevice))){
						displayMessage+="<a href='#' onclick='' onMouseOver=\"window.status='Click here to Launch the Webcast'; return true;\" onMouseOut=\"window.status='';\">";
					}
					if(!isMobile || (isMobile && worksOnMobileDevice)){
						displayMessage+="<img id='launchBtnImg' src='"+btnUrl+"' border='0'>";
					}
					if(!previewMode && (!isMobile || (isMobile && worksOnMobileDevice))){
						displayMessage+="</a>";
					}
				}
			}
		}
		
		return displayMessage;
			
	},
	
	/*
	 * 
	 */
	createRegistrationSection: function() {
		'use strict';
		var registrationView,
			registrationModel,
			registrationFields,
			regElements = this.regPageData.displayelement;
		
		//added this if stmt because "Already registered" and "Register now ' links
		//overlapped in Hebrew (WCC-20336)
		if(this.eventData.event.localelanguagecode == 'iw')
			this.customStylesDataModel.attributes.paddingRight='72%';

		registrationFields = this.getRegistrationFields();
		
		//TODO: get labels from i18n API
		registrationModel = new Backbone.Model({
				sectionLabel: RegPage.Properties['registration.registration.header'],
				customStyles: this.customStylesDataModel,
				clientId: this.eventData.event.clientid,
				clientName: this.eventData.event.clientname
		});
		
		registrationView = new RegPage.RegistrationView({
			model: registrationModel,
			fieldsCollection: registrationFields,
			eventInfo: this.eventInfo
		});

		return registrationView;
	},
	
	
	/*
	 * Gets the registration fields from the displayelementArray, choosing only
	 * whose displayElementTypeCode is among those listed in the "fieldTypes" array
	 * defined in the method.
	 * It also checks if the field value is passed as an url parameter, checking it's
	 * existence in the "eventInfo" object. In case the value is passed, that value
	 * is setted in the "inputValue" property of the field object. 
	 */
	getRegistrationFields: function() {
		'use strict';
		var i, registrationFields = [],
			fieldTypes = ['textbox', 'textarea', 'listbox', 'checkbox', 'multicheck', 'option', 'password'],
			preFillFieldTypes = ['textbox', 'textarea'],
			domainFilter = this.regPageData.displayelement.reg_block_allow_user,
			field;
		
		for (i = 0; i< this.regPageData.displayelementArray.length; i++) {
			field = this.regPageData.displayelementArray[i];
			if (_.contains(fieldTypes, field.displayElementTypeCode)) {
				//If there is an eventInfo token with the same name as the
				//displayElementValueCode value, we will fill the field data with that value
				if (this.eventInfo[field.displayElementValueCode] && _.contains(preFillFieldTypes, field.displayElementTypeCode)) {
					field.inputValue = this.eventInfo[field.displayElementValueCode];
				}
				if (field.validationTypeCode === 'email'
					&& domainFilter && domainFilter.displayElementValue[domainFilter.displayElementValue.length-1] === 'Y') {
					field.domainFilter = domainFilter;
				}
				//TODO maybe don't add the whole object, only the needed info. We need
				//to know first what info it's needed to send to the server when registering
				registrationFields.push(field);
			}
		}
		
		return registrationFields;
	},
	
	/*
	 * 
	 */
	createSeamlessLoginSection: function() {
		'use strict';
		var seamlessLoginView;
		
		seamlessLoginView = new RegPage.SeamlessLoginView({
			template: RegPage.Templates.filter('#seamless-login-tpl'),
			eventInfo: this.eventInfo,
			passwordField: this.regPageData.displayelement.reg_event_pswd,
			model: new Backbone.Model({
				customStyles: this.customStylesDataModel
			})
		});
		
		return seamlessLoginView;
	},
	
	/*
	 * 
	 */
	createSummarySection: function() {
		'use strict';
		var summaryView,
			summaryModel,
			//eventSummary = RegPage.ServerDataParser.htmlUnescape(this.eventData.event.session.eventAbstract);
			eventSummary = this.eventData.event.session.eventAbstract;

		if(eventSummary.length > 0 ){
			summaryModel = new RegPage.SummaryModel({
					//TODO: get labels from i18n API
					sectionLabel: RegPage.Properties['registration.summary.header'],
					summary: eventSummary,
					customStyles: this.customStylesDataModel
				},
				{
					parse: true,
					eventData: this.eventData
				}
			);
			summaryView = new RegPage.SummaryView({model: summaryModel});
		}
		return summaryView;
	},

	/*
	*
	*/
	createLobbyLoginSection: function(){
		'use strict';
		var lobbyLoginView, 
			lobbyLoginModel;

		lobbyLoginModel = new RegPage.OverviewModel({
			//TODO: get labels from i18n API
			sectionLabel: 'Login',
			customStyles: this.customStylesDataModel
		});
		
		lobbyLoginView = new RegPage.LobbyLoginView({model: lobbyLoginModel});
		console.log(lobbyLoginView)
		return lobbyLoginView;
	},

	createSpeakerBioSection: function() {
		'use strict';
		var speakerbioView,
			speakerbioModel,
			speakerBioData = this.regPageData.displayelement.template_reg_speaker_bios,
			displayElement = this.eventData.event.session.displayelementinfo.displayelement,
			speakers = this.getSpeakerBios(displayElement.player_speaker_bio_widget);
			
		if(speakers.length && speakerBioData && speakerBioData.displayElementValue === "Y") {
			//speakerBioTextValue = this.getSpeakerBios(displayElement['player_speaker_bio_widget']);
			/*param = displayElement['player_speaker_bio_widget'] ? displayElement['player_speaker_bio_widget'].displayElementValue.params.param: "",
			speakBioJson = RegPage.ServerDataParser.paramsToJSON(param),
			speakBioText = speakBioJson.bioData ? $.xml2json(speakBioJson.bioData.text):"",
			speakerBioTextValue = $(speakBioText.bio).length > 1 ? speakBioText.bio:speakBioText;*/
				
			speakerbioModel = new Backbone.Model({
					//TODO: get labels from i18n API
					sectionLabel: RegPage.Properties['registration.speakers.header'],
					customStyles: this.customStylesDataModel
			});
				
			speakerbioView = new RegPage.SpeakerBioView({
				model: speakerbioModel,
				speakers: speakers
			});
		}
		
		return speakerbioView;
	},
	
	getSpeakerBios:function(speakerBioData){
		'use strict';
		var outputSpeakerBio = new Array() , param, speakBioJson, self = this;
		if(speakerBioData && speakerBioData.length  > 1) {
			_.each(speakerBioData,function(speakerBio){
				param = speakerBio.displayElementValue.params.param;
				speakBioJson = RegPage.ServerDataParser.paramsToJSON(param);
				if(self.isActiveSpeakerBio(speakBioJson)) {
					var output = self.parseSpeakerBio(speakBioJson);
					$.merge(outputSpeakerBio,output);
				}
			});
		} else {
			param = speakerBioData? speakerBioData.displayElementValue.params.param : "";
			speakBioJson = RegPage.ServerDataParser.paramsToJSON(param);
			if(this.isActiveSpeakerBio(speakBioJson)){
				outputSpeakerBio = this.parseSpeakerBio(speakBioJson);
			}
		}
		return outputSpeakerBio;
	},
	
	parseSpeakerBio: function(speakerJsonData){
		'use strict';
		var speakerBioTextArray = new Array(),
			speakBioText = speakerJsonData.bioData ? $.xml2json(speakerJsonData.bioData.text):"";
		if( $(speakBioText.bio).length > 1) {
			_.each(speakBioText.bio,function(bio){
				if(bio) speakerBioTextArray.push(bio);
			});
		}else {
			if(speakBioText.bio)speakerBioTextArray.push(speakBioText.bio);
		}
		return speakerBioTextArray;
	},
	
	isActiveSpeakerBio: function(speakerBio){
		'use strict';
		return  speakerBio.persistenceStatus && (speakerBio.persistenceStatus.text === "PersistenceStatusSaveComplete" 
				&& speakerBio.persistenceState.text !== "PersistenceStateDelete"
				&& speakerBio.isActive.text);
	},

	/*
	* Checks for end live log in presentation log info and returns the odoffset value
	*/
	getOdDuration: function(){
		var presentationLogInfoData = this.eventData.event.session.presentationloginfo,
			odDuration;

		_.each(presentationLogInfoData, function(presentationLogInfo){
			var presentationInfoData = presentationLogInfo.presentationinfo;
			if(presentationInfoData){
				_.each(presentationInfoData, function(presentationInfo){
					if(presentationInfo.presentationcode === 'endlive'){
						odDuration =  presentationInfo.ondemandoffset;
						return;
					}
				});
				return;
			}

		});
		return Number(odDuration);
	},
	
	testYourSystem: function(){
	'use strict';
	var eventinfo = this.eventInfo, eventid = eventinfo.eventid , sessionid = eventinfo.sessionid, key = eventinfo.key, eventuserid = eventinfo.eventuserid,
	minhighbw = eventinfo.minhighbw,
	evt = this.eventData.event,
	text_language_id = evt.localelanguagecode, 
	extendedeventinfo = evt.extendedeventinfo.eventinfo,
	mediaurlinfo = evt.session.mediaurlinfo,
	formats = this.eventData.event.formats,
	ngwebcast = (extendedeventinfo.ngwebcast && extendedeventinfo.ngwebcast.value === "CHECKED"),
	requireMacSupport = (extendedeventinfo.requireMacSupport && extendedeventinfo.requireMacSupport.value === "CHECKED"),
	requireLinuxSupport = ( extendedeventinfo.requireLinuxSupport && extendedeventinfo.requireLinuxSupport.value === "CHECKED"),
	flashConsoleEnabled = (extendedeventinfo.launchFlashConsole && extendedeventinfo.launchFlashConsole.value === "CHECKED"),
	isPCView = (extendedeventinfo.pcview && extendedeventinfo.pcview.value === "CHECKED"),
	isSilverlightEnabled = window.isSilverLightEnabled,
	isInternalUser = window.isInternalUser,
	hasFlash = this.checkFormat("fh")? true : false,
	hasReal =  this.checkFormat("rm") && !this.checkFormat("rmnonstreaming") ? true : false,
	hasWindows = (this.checkFormat("wm")) && !window.isSilverLightEnabled ? true : false,
	hasNonStreaming = (this.checkFormat("rmnonstreaming")) && (Number(evt.session.enddate) < new Date().getTime()) && (eventinfo.previewtype === "live")? true : false,
	mediaStr,flashType = "",
	flashStr = (extendedeventinfo.fhaudio || extendedeventinfo.flashdemo || extendedeventinfo.fhmulti)? "&checkflash=true" : ""  ,
	localecountrycode =  evt.localecountrycode,
	host= this.eventInfo.host;
	 	
	if(this.checkFormat('audio') &&  this.checkFormat('video')) {
		mediaStr = "&mediaStr=both";
	}else if (this.checkFormat('audio') && !this.checkFormat('video') ){
		mediaStr = "&mediaStr=audio";
	}else if(this.checkFormat('video') && !this.checkFormat('audio')){
		mediaStr = "&mediaStr=video";
	}else{
		mediaStr = "";
	}
	
	//mediaurlinfo.
	
	if(flashType !== "" && flashStr !== "") flashStr+="&flashtype="+flashType;
			
	var params='eventid='+eventid+'&sessionid='+sessionid+'&key='+key;
     
	if(eventuserid)
		params+= '&eventuserid='+eventuserid;
	
   
	params+='&checkBrowser=true&checkOS=true&checkBandwidth=true&checkCookie=true' ;
	params+=flashStr;
	
	/*if(hasNonStreaming || isPCview)
		 params+= "&checkJava=true";
	*/	
	if(hasReal||hasWindows)
		 params+= '&checkMP=true';
	
	params+=mediaStr;
	
	if(text_language_id)params+='&text_language_id='+text_language_id;
	if(hasReal) params+='&hasReal=true';
	if(hasWindows) params+='&hasWin=true'; 
	if(isInternalUser) params+="&download=n'";
	if(minhighbw!=null && minhighbw !== "") params+='&minhighbw='+minhighbw;
	if(isSilverlightEnabled)params+='&isSilverlightEnabled'+isSilverlightEnabled;
	if(localecountrycode !== 'null')params+='&localeCountryCode='+localecountrycode;
	if(requireMacSupport) params+='&mac=true';
	if(requireLinuxSupport)params+='&linux=true';
	if(ngwebcast)params+='&ngwebcast=true';
	if(flashConsoleEnabled)params+='&flashconsole=true';
	
	 
	return 'window.open("http://'+host+'/utils/test/testYourSystem.html?'+params+'",'+'"ON24_Test_System"'+','+'"status=no,width=470,height=620,directories=no,location=no,toolbar=no,scrollbars=yes,resizable=no")';
	//return params;
    

},

checkFormat: function(format){
	'use strict';
	var formats = this.eventData.event.formats.formatcode;
	if($.isArray(formats)){
		for(var i=0; i<formats.length; i++ ){
			if(formats[i].indexOf(format) != -1) return true;
			continue;
		}
	}else{
		return formats.indexOf(format) != -1;
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

getCalendarUrl : function(){
	'use-strict';
	var evt = this.eventData.event, iseliteclient = window.eliteClient, calendarurl = window.calendarUrl;
	var livestarttime = evt.session.startdate, addtocalender = this.lobbyPageData.displayelement.hasOwnProperty("lobby_add_to_calendar") ? this.lobbyPageData.displayelement.lobby_add_to_calendar.displayElementValue === 'Y' : true;
	var currenttime = new Date().getTime();
	if(iseliteclient &&  (currenttime < livestarttime) && addtocalender )
		return calendarurl;
	else
		//return "http://eventqa.on24.com/eventRegistration/EventCalendarServlet.ics?organizer=&reminder=15&start=20140812T033000Z&end=20140812T043000Z&abstract=Test_Reg&title=Please+click+the+link+below+to+attend.%5Cn%5Cnhttp%3A%2F%2Fwqa.on24.com%2Fr.htm%3Fe%3D1064503%26s%3D1%26k%3DE51CF47A0A6F1F090BF32235B0C258EC";
		return "";
}
	
	
});
