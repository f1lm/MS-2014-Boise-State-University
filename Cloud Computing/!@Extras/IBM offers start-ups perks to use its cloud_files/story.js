
/* File BEGIN: http://fm.cnbc.com/applications/cnbc.com/staticcontent/scripts/libraries/scrollpanel/scrollpanel.js?t=1415322279 */
﻿
function CNBC_ScrollPanel(){};(function($){CNBC_ScrollPanel.prototype._container=null;CNBC_ScrollPanel.prototype._callback=null;CNBC_ScrollPanel.prototype._isShowing=false;CNBC_ScrollPanel.prototype._breakPoint=0;CNBC_ScrollPanel.prototype._transTime=0;CNBC_ScrollPanel.prototype._respectiveContainer=null;CNBC_ScrollPanel.prototype._setLeft=false;CNBC_ScrollPanel.prototype._setLeftOffset=null;CNBC_ScrollPanel.prototype._hidePoint=null;CNBC_ScrollPanel.prototype._hidePointContainer=null;CNBC_ScrollPanel.prototype.init=function(args){var thisObj=this;var args=args||{};if(args.container!=null){thisObj.setContainer(args.container);thisObj.setOptionalOverrides(args);thisObj.initEvents();}else{CNBC_Common.ConsoleLog('Missing Arguments in Scroll Panel Library...');}};CNBC_ScrollPanel.prototype.setContainer=function(container){var thisObj=this;var type=typeof container;var container;if(type=='string'){container=$('#'+container);}else if(type=='object'&&container.length==1){container=container;}else{container=$(container);}
thisObj._container=container;};CNBC_ScrollPanel.prototype.setOptionalOverrides=function(args){var thisObj=this;if(args.callback){thisObj._callback=args.callback;}
if(args.breakPoint){thisObj._breakPoint=args.breakPoint;}
if(args.transTime){thisObj._transTime=args.transTime;}
if(args.respectiveContainer&&args.setLeft){thisObj._respectiveContainer=args.respectiveContainer;thisObj._setLeft=args.setLeft;}
if(args.respectiveContainer&&args.setLeftOffset){thisObj._setLeftOffset=args.setLeftOffset;}
if(args.hidePoint){thisObj._hidePoint=args.hidePoint;}
if(args.hidePointContainer){thisObj._hidePointContainer=args.hidePointContainer;}};CNBC_ScrollPanel.prototype.initEvents=function(){var thisObj=this;$(window).scroll(function(){var scrollValue=$(window).scrollTop();if(thisObj._hidePointContainer&&thisObj._hidePointContainer.length){thisObj._hidePoint=thisObj._hidePointContainer.offset().top+thisObj._hidePointContainer.outerHeight();}
if(thisObj._hidePoint&&scrollValue>thisObj._breakPoint&&scrollValue>thisObj._hidePoint){$(thisObj._container).addClass("bottomPage");$('div[gigid=\'showShareBarUI_showSimpleShareUI\']').hide();}
if(scrollValue>thisObj._breakPoint&&!thisObj._isShowing){thisObj._isShowing=true;thisObj.showElement();}else if(scrollValue<thisObj._breakPoint&&thisObj._isShowing){thisObj._isShowing=false;thisObj.hideElement();$('div[gigid=\'showShareBarUI_showSimpleShareUI\']').hide();}
if(thisObj._hidePoint&&scrollValue<=thisObj._hidePoint){$(thisObj._container).removeClass("bottomPage");}
return false;});if(thisObj._respectiveContainer&&thisObj._respectiveContainer.length&&thisObj._setLeft){var leftOffset=thisObj._respectiveContainer.offset().left;if(thisObj._setLeftOffset){leftOffset=leftOffset+thisObj._setLeftOffset;}
$(thisObj._container).css("left",leftOffset+'px');$(window).resize(function(){leftOffset=thisObj._respectiveContainer.offset().left;if(thisObj._setLeftOffset){leftOffset=leftOffset+thisObj._setLeftOffset;}
$(thisObj._container).css("left",leftOffset+'px');});}
$(thisObj._container).delegate('#'+$(thisObj._container).attr("id")+'-reaction5-icon_img','click',function(event){var gigOverlay=$('div[gigid=\'showShareBarUI_showSimpleShareUI\']');if($(thisObj._container).css('position')=='fixed'){var leftPos=$(this).offset().left;gigOverlay.css('position','fixed');gigOverlay.css('bottom','55px');gigOverlay.css('left',leftPos+'px');gigOverlay.css('top','inherit');}});};CNBC_ScrollPanel.prototype.showElement=function(){var thisObj=this;if(thisObj._transTime){$(thisObj._container).fadeTo(thisObj._transTime,1,function(){$(thisObj._container).css("display","block");});}else{$(thisObj._container).css("display","block");}
if(thisObj._callback){thisObj._callback(true);}};CNBC_ScrollPanel.prototype.hideElement=function(){var thisObj=this;if(thisObj._transTime){$(thisObj._container).fadeTo(thisObj._transTime,0,function(){$(thisObj._container).css("display","none");});}else{$(thisObj._container).css("display","none");}
if(thisObj._callback){thisObj._callback(false);}};})(jQuery);


/* File BEGIN: http://fm.cnbc.com/applications/cnbc.com/staticcontent/scripts/social-tools-omniture/gigya-omniture.js?t=1415322279 */
CNBC_Gigya_Omniture={};CNBC_Gigya_Omniture.uid=null;CNBC_Gigya_Omniture.onSendDone=function(event){CNBC_Gigya_Omniture.onSendDoneCommon(event,'mobile');};CNBC_Gigya_Omniture.onSendDoneVideoGall=function(event){if(event.providers){var providers=event.providers.split(",");for(i=0;i<providers.length;i++){var provider=providers[i];s.linkTrackVars="eVar14,eVar15,prop57,events";s.linkTrackEvents="event52";s.events="event52";s.eVar14=provider+": Share Published";s.eVar15="Video Gallery:Description";s.prop57=s.pageName;s.tl(this,'o','Gigya Share');}}};CNBC_Gigya_Omniture.onSendDoneTop=function(event){CNBC_Gigya_Omniture.onSendDoneCommon(event,'top');};CNBC_Gigya_Omniture.onSendDoneSlideshow=function(event){CNBC_Gigya_Omniture.onSendDoneCommon(event,'slideshow');};CNBC_Gigya_Omniture.onSendDoneQuiz=function(event){CNBC_Gigya_Omniture.onSendDoneCommon(event,'quiz');};CNBC_Gigya_Omniture.onSendDoneBottom=function(event){CNBC_Gigya_Omniture.onSendDoneCommon(event,'bottom');};CNBC_Gigya_Omniture.onSendDoneCommon=function(event,pos){var objPosition={'mobile':['Omiture Send Done Called - Mobile','Share Bar:Mobile'],'top':['Omiture Send Done Called - Top','Share Bar:Top of Page'],'bottom':['Omiture Send Done Called - Bottom','Share Bar:Bottom of Screen'],'quiz':['Omiture Send Done Called - Quiz','Share Bar:Quiz'],'slideshow':['Omiture Send Done Called - Slideshow','Share Bar:Slideshow']};CNBC_Common.ConsoleLog(objPosition[pos][0]);if(event.providers){var providers=event.providers.split(",");for(i=0;i<providers.length;i++){var provider=providers[i];s.linkTrackVars="eVar14,eVar15,prop57,events";s.linkTrackEvents="event52";s.events="event52";s.eVar14=provider+": Share Published";s.eVar15=objPosition[pos][1];s.prop57=s.pageName;s.tl(this,'o','Gigya Share');}}};CNBC_Gigya_Omniture.disqusDiscussionScroll=function(){if(typeof s!='undefined'){s.linkTrackVars="events";s.linkTrackEvents="event38";s.events="event38";s.tl(this,'o','Disqus Discussion Scroll');}};CNBC_Gigya_Omniture.trackLoginEvent=function(event){var action=event.eventName+": "+event.provider;s.linkTrackVars="eVar11,events";s.linkTrackEvents="event51";s.events="event51";s.eVar11=action;s.tl(this,'o','Gigya Login');};CNBC_Gigya_Omniture.onLogout=function(event){};CNBC_Gigya_Omniture.onConnectionAdded=function(event){var action=event.eventName+": "+event.provider;s.linkTrackVars="eVar12";CNBC_Common.ConsoleLog('UID: '+CNBC_Gigya_Omniture.uid);s.eVar12=CNBC_Gigya_Omniture.uid;s.tl(this,'o','Gigya UID');};CNBC_Gigya_Omniture.onConnectionRemoved=function(){};gigya.accounts.getAccountInfo({callback:CNBC_Gigya_Omniture.getAccountInfoResponse});CNBC_Gigya_Omniture.getAccountInfoResponse=function(response){if(response.errorCode==0){var profile=response['profile'];CNBC_Gigya_Omniture.uid=profile['UID'];}};CNBC_Gigya_Omniture.onReactionClicked=function(event){var reaction=event.reaction.text;s.linkTrackVars="eVar15,events";s.linkTrackEvents="event54";s.events="event54";s.eVar15=reaction+": Reaction Button Clicked";s.tl(this,'o','Gigya Reaction');};CNBC_Gigya_Omniture.onCommentSubmitted=function(event){s.linkTrackVars="eVar14,events";s.linkTrackEvents="event53";s.events="event53";s.eVar14="Gigya Comments : Comment Submitted";s.tl(this,'o','Gigya Comment');};CNBC_Gigya_Omniture.onCommentVoted=function(event){s.linkTrackVars="eVar13,events";s.linkTrackEvents="event55";s.events="event55";s.eVar13="Gigya Comments : Comment Ranked";s.tl(this,'§o','Gigya Comment Ranked');};
