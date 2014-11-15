
if (typeof epx_core === 'undefined') {
epx_loaded = false;
epx_core = function(s) {this.s = s;}
epx_core.prototype = {
exec: function(func, checkFunc, retry) {
if (retry) retry++; else retry = 1;
if (checkFunc()) {func();} else if (retry <= this.s.maxRetry) {var t = this.s.delay * retry;setTimeout(function() {epx_core_i.exec(func, checkFunc, retry);}, t);}
},
load: function() {function epx_htmlDecode(a){return jQuery("<div/>").html(a).text()}function epx_htmlEncode(a){return $("<div/>").text(a).html()}function epx_createDelegate(a,b){return function(){b.apply(a)}}if(typeof epx_timer==="undefined"){epx_timer=function(a,b){this._interval=a;this._enabled=false;this._timer=null;jQuery(this).bind("tick",this,b)};epx_timer.prototype={set_enabled:function(a){if(a!==this._enabled){this._enabled=a;a?this._startTimer():this._stopTimer()}},_timerCallback:function(){jQuery(this).trigger("tick")},_startTimer:function(){this._timer=window.setInterval(epx_createDelegate(this,this._timerCallback),this._interval)},_stopTimer:function(){window.clearInterval(this._timer);this._timer=null}}}epx_searchBoxState=function(){this.userSelectedTermFlag=false;this.userSelectedWordFlag=false;this.autocompleteTermsShownFlag=false;this.autocompleteWordsShownFlag=false};epx_searchBoxState.prototype={userSelectedTerm:function(){this.userSelectedTermFlag=true},userSelectedWord:function(){this.userSelectedWordFlag=true},autocompleteTermsShown:function(){this.autocompleteTermsShownFlag=true},autocompleteWordsShown:function(){this.autocompleteWordsShownFlag=true},getInstrumentationValue:function(){var a=0;if(!this.autocompleteTermsShownFlag)a=1;if(this.autocompleteTermsShownFlag)a=2;if(this.userSelectedTermFlag)a=3;if(!this.autocompleteTermsShownFlag&&!this.autocompleteWordsShownFlag)a=4;if(this.autocompleteWordsShownFlag&&!this.userSelectedWordFlag)a=5;if(this.autocompleteWordsShownFlag&&this.userSelectedWordFlag)a=6;return a}};epx_searchBoxCount=0;epx_searchBox=function(a){this.instanceId=epx_searchBoxCount++;this.sbData=a;this.serviceRequestDelay=400;this.flyoutSpeed=150;this.maxTerms=8;this.termItems=[];this.matchType="None";this.selectedTermIndex=-1;this.textBackground="#ffffff";this.state=new epx_searchBoxState;this.searchExecuting=false;this.flyoutEnabled=true;this.flyoutFocused=false;this.focused=false;this.wordMatchString="Word";this.termMatchString="Term";this.terms=[];this.textAlign="left";if(this.sbData.isRTL)this.textAlign="right";this.listStyle={"list-style":"none",padding:"4px 2px 0px 1px",cursor:"pointer",margin:"1px","white-space":"nowrap"};this.itemNormalStyle={backgroundColor:this.textBackground,"text-decoration":"none"};this.itemHoverStyle={"text-decoration":"underline",backgroundColor:"#eeeeee"}};epx_searchBox.prototype={loadTermsFromService:function(){this.requestTimer.set_enabled(false);var a=jQuery.trim(this.searchBoxElement.value),b=1024;if(a.length>=this.sbData.minimumTermLength&&a.length<=b&&!this.searchExecuting){var c=this.sbData.serviceUri+"Data/Terms?callback=?&t="+encodeURIComponent(a)+"&a="+this.sbData.appId+"&s="+this.sbData.scopeId+"&m="+this.maxTerms+"&mtl="+this.sbData.minimumTermLength;jQuery.ajax({url:c,success:this.termcb,global:false,dataType:"jsonp",context:this})}},instrumentSearch:function(a){var c=Math.floor(Math.random()*1e9),d=this.sbData.serviceUri+"Data/IS?a="+this.sbData.appId+"&s="+this.sbData.scopeId+"&t="+a+"&ac="+this.state.getInstrumentationValue();+"&rnd="+c;var b=new Image;b.src=d},updateTerms:function(){var a=jQuery.trim(this.searchBoxElement.value);if(!this.searchBoxElement.watermarkShown&&a.length>=this.sbData.minimumTermLength){if(a!==this.lastTerm){this.lastTerm=a;this.requestTimer.set_enabled(true)}}else{this.lastTerm="";this.clearTerms();this.updateFlyoutVisibility()}},clearTerms:function(){this.termItems=[];jQuery(this.completionListElement).empty();this.selectedTermIndex=-1},termcb:function(a){a.Term=epx_htmlDecode(a.Term);a.matchType=epx_htmlDecode(a.MatchType);a.Matches=jQuery.map(a.Matches,epx_htmlDecode);var b=this.context;if(b===undefined)b=this;if(b.shouldProcessResult(a)){b.clearTerms();this.matchType=a.MatchType;this.terms=a.Matches;for(var c=0;c<this.terms.length;c++){var d=b.createItem(this.terms[c],a.Term);b.termItems[c]=d;jQuery(b.completionListElement).append(d)}b.completionListElement.scrollTop=0;if(a.matchType==this.termMatchString)b.state.autocompleteTermsShown();else if(a.matchType==this.wordMatchString)b.state.autocompleteWordsShown()}else if(a&&a.Term.toUpperCase()===jQuery.trim(b.searchBoxElement.value).toUpperCase())b.clearTerms();if(a.matchType==this.wordMatchString&&this.getCursorPosition()<this.searchBoxElement.value.length-1)this.hideFlyout();else b.updateFlyoutVisibility()},shouldProcessResult:function(a){if(!(a&&a.Matches&&a.Matches.length))return false;if(a.matchType==this.termMatchString)return a.Term.toUpperCase()===jQuery.trim(this.searchBoxElement.value).toUpperCase()&&(a.Matches.length>1||a.Matches[0].toUpperCase()!==this.lastTerm.toUpperCase());else if(a.matchType==this.wordMatchString){var b=this.getLastWord(this.lastTerm.toUpperCase());return a.Matches.length>1||a.Matches[0].toUpperCase()!==b.toUpperCase()}},getLastWord:function(c){var a=c.split(" "),b=0;if(a.length>1)b=a.length-1;return a[b]},getWordTermSuggestion:function(d){var a=this.lastTerm.split(" "),b=0;if(a.length>1)b=a.length-1;a[b]=d;var c=jQuery(document.createElement("li"));c.attr("term",a.join(" "));return c},createItem:function(b,c){var a=jQuery(document.createElement("li"));a.bind("mouseover",this,function(a){a.data.highlightItem(this)});a.bind("mousedown",this,function(a){if(a.data.matchType==a.data.termMatchString){a.data.setText(this);a.data.executeSearch()}else if(a.data.matchType==a.data.wordMatchString){a.data.setText(a.data.getWordTermSuggestion(b));a.data.hideFlyout();a.data.executeSearch()}});if(this.matchType==this.wordMatchString){var g=c.split(" ");c=g[g.length-1]}if(c){var f=c,h=b.toUpperCase().indexOf(f.toUpperCase()),d=h+f.length;a.append(document.createTextNode(b.slice(0,d)));if(d<b.length){var e=document.createElement("span");e.style.fontWeight="bold";e.appendChild(document.createTextNode(b.slice(d)));a.append(e)}}else a.append(document.createTextNode(b));a.attr("term",b);a.css({padding:"3px",textAlign:this.textAlign,textOverflow:"ellipsis",overflow:"hidden"});return a},hideFlyout:function(){jQuery(this.flyoutElement).slideUp(this.flyoutSpeed)},getCursorPosition:function(){var a=this.searchBoxElement,b=0;if("selectionStart" in a)b=a.selectionStart;else if("selection" in document){a.focus();var c=document.selection.createRange(),d=c.text.length;c.moveStart("character",-a.value.length);b=c.text.length-d}return b},showFlyout:function(){var e=this.getFlyoutLocation(this.searchBoxElement),b=jQuery(this.searchBoxElement).width();if(this.matchType==this.wordMatchString&&this.sbData.isRTL==false){var f=3,g=35,a=this.searchBoxElement.value.split(" ");if(a.length>1){a[a.length-1]="";e.x+=Math.min(b,this.getOffset(a.join(" ")).width-f)}var d="";for(var c=0;c<this.terms.length;c++)if(d.length<this.terms[c].length)d=this.terms[c];b=Math.min(b,this.getOffset(d).width+g)}jQuery(this.flyoutElement).css("left",e.x);jQuery(this.flyoutElement).css("top",e.y);jQuery(this.flyoutElement).width(b);jQuery(this.flyoutElement).slideDown(this.flyoutSpeed)},getOffset:function(f){var b=0,c=0,a=document.createElement("div");document.body.appendChild(a);$(a).css({position:"absolute",left:-1e3,top:-1e3,display:"none"});a.innerHTML=epx_htmlEncode(f);var e=["font-size","font-style","font-weight","font-family","padding-left","padding-right","line-height","text-transform","letter-spacing"],d=$(this.searchBoxElement);$(e).each(function(){var b=this.toString();$(a).css(b,d.css(b))});b=$(a).outerHeight();c=$(a).outerWidth();$(a).remove();var g={height:b,width:c};return g},getFlyoutLocation:function(b){var a=jQuery(b).position(),c={x:a.left,y:a.top+jQuery(b).outerHeight()};return c},showWatermark:function(){if(this.shouldShowWatermark()){this.searchBoxElement.watermarkShown=true;jQuery(this.searchBoxElement).css({color:"#aaaaaa",fontStyle:"italic"});this.searchBoxElement.value=this.sbData.sr.searchLabel}},focusWithWatermark:function(){if(!this.searchBoxElement.watermarkShown){this.searchBoxElement.focus();return}if(window.location.toString().indexOf("#")!=-1)return;if(document.getSelection){this.searchBoxElement.focus();this.searchBoxElement.setSelectionRange(0,0)}else if(document.selection){var a=this.searchBoxElement;setTimeout(function(){var b=a.createTextRange();b.moveStart("character",0);b.collapse();b.select()},0)}},shouldShowWatermark:function(){return this.sbData.sr.searchLabel&&(this.searchBoxElement.watermarkShown||this.searchBoxElement.value.length==0||this.searchBoxElement.value===this.sbData.sr.searchLabel)},hideWatermark:function(){if(this.searchBoxElement.watermarkShown){this.searchBoxElement.watermarkShown=false;this.searchBoxElement.value="";this.searchBoxElement.style.color="";this.searchBoxElement.style.fontStyle=""}},updateFlyoutVisibility:function(){if(this.termItems.length>0)this.showFlyout();else this.hideFlyout()},onSearchBoxFocus:function(a){if(!a.data.sbData.focusOnInit){a.data.hideWatermark();a.stopPropagation();this.focused=true;return false}else a.data.focusWithWatermark()},onSearchBoxBlur:function(a){if(a.data.flyoutFocused)setTimeout(function(){a.data.searchBoxElement.focus()},10);else{a.data.hideFlyout();a.data.showWatermark();this.focused=false}},init:function(){this.searchBoxElement=jQuery("#"+this.sbData.boxId).get(0);if(this.sbData.maxTerms)this.maxTerms=this.sbData.maxTerms;if(this.searchBoxElement){this.initEventHandlers();this.initTimer();this.initSearchBoxElement();this.initCompletionList();this.showWatermark();if(this.sbData.focusOnInit&&this.searchBoxElement.watermarkShown)this.focusWithWatermark()}},initEventHandlers:function(){jQuery(document).bind("keyup",this,this.onKeyUp)},initTimer:function(){this.requestTimer=new epx_timer(this.serviceRequestDelay,epx_createDelegate(this,this.loadTermsFromService))},initSearchBoxElement:function(){var a=jQuery(this.searchBoxElement);a.attr("autocomplete","off");a.bind("focus",this,this.onSearchBoxFocus);a.bind("blur",this,this.onSearchBoxBlur);a.bind("keyup",this,this.onSearchBoxKeyUp);a.bind("keydown",this,this.onKeyDown);a.bind("paste",this,this.onPaste);document.getElementById(this.sbData.btnId).onclick=null;jQuery("#"+this.sbData.btnId).bind("click",this,this.onSearchButtonClick);jQuery("#"+this.sbData.btnId).bind("keydown",this,this.onSearchButtonKeydown);var b=this.sbData.sr.searchLabel;if(b.length>0)jQuery(this.searchBoxElement).attr("title",b);if(!this.isNullOrUndefined(this.sbData.sr.searchButtonTooltip)&&this.sbData.sr.searchButtonTooltip.length>0)jQuery("#"+this.sbData.btnId).attr("title",this.sbData.sr.searchButtonTooltip);else jQuery("#"+this.sbData.btnId).attr("title",b)},initCompletionList:function(){this.flyoutElement=this.createFlyout();jQuery(this.searchBoxElement).parent().append(this.flyoutElement)},createFlyout:function(){var a=this.createContainer();a.attr("id","SearchFlyoutContainer");a.bind("mouseover",this,function(a){a.data.flyoutFocused=true});a.bind("mouseout",this,function(a){a.data.flyoutFocused=false});a.css({display:"none",textAlign:this.textAlign,border:"solid 1px buttonshadow",position:"absolute",zIndex:"1000",padding:"2px","background-color":this.textBackground,color:$(this.searchBoxElement).css("color"),"font-family":$(this.searchBoxElement).css("font-family"),"font-size":$(this.searchBoxElement).css("font-size")});a.append(this.createSuggestionContainer());return a},createSuggestionContainer:function(){var a=this.createContainer();a.attr("id","SuggestionContainer");this.completionListElement=document.createElement("ul");jQuery(this.completionListElement).css(this.listStyle);a.append(this.completionListElement);a.bind("mouseout",this,function(a){a.data.selectedTermIndex=-1;a.data.resetItemStyle(jQuery("li",jQuery(this)))});return a},createSeparator:function(){var a=this.createContainer();a.css({border:"0px","border-top":"1px solid #dddddd",height:"1px","margin-top":"1px"});return a},createContainer:function(){return jQuery(document.createElement("div"))},onPaste:function(a){a.data.hideWatermark()},onKeyUp:function(a){if(a.keyCode===27)a.data.hideFlyout()},onSearchBoxKeyUp:function(a){var b=a.keyCode;if(b===9&&this.focused){a.stopPropagation();return false}if(b!==38&&b!==40)a.data.updateTerms();if(a.data.searchBoxElement.value.length===0){a.data.showWatermark();a.data.focusWithWatermark()}},onKeyDown:function(a){var b=a.keyCode;if(b===38){if(a.data.selectedTermIndex>0){a.data.selectedTermIndex--;a.data.highlightItemIdx(a.data.selectedTermIndex);if(a.data.matchType==a.data.termMatchString)a.data.setText(a.data.completionListElement.childNodes[a.data.selectedTermIndex]);else if(a.data.matchType==a.data.wordMatchString)a.data.setText(a.data.getWordTermSuggestion(a.data.completionListElement.childNodes[a.data.selectedTermIndex].textContent));a.stopPropagation();a.preventDefault()}}else if(b===40){if(a.data.selectedTermIndex<jQuery(a.data.completionListElement).children().length-1){a.data.selectedTermIndex++;a.data.highlightItemIdx(a.data.selectedTermIndex);if(a.data.matchType==a.data.termMatchString)a.data.setText(a.data.completionListElement.childNodes[a.data.selectedTermIndex]);else if(a.data.matchType==a.data.wordMatchString)a.data.setText(a.data.getWordTermSuggestion(a.data.completionListElement.childNodes[a.data.selectedTermIndex].textContent));a.stopPropagation();a.preventDefault()}}else if(b===13){a.data.executeSearch();a.stopPropagation();a.preventDefault()}else if(b===9){a.data.flyoutFocused=false;a.data.hideFlyout()}else if(b!==16&&b!==17&&b!==18&&b!==19&&b!==20&&b!==33&&b!==34&&b!==35&&b!==36&&b!==37&&b!==39&&b!==45)a.data.hideWatermark()},onSearchButtonClick:function(a){a.data.executeSearch();return false},onSearchButtonKeydown:function(b){var a=b.keyCode;if(a===13||a===32)b.data.executeSearch();else if(a===9)return true;return false},addInstrumentationToUrl:function(a){var b=a.split("#");a=b[0];a=a.replace(/(\?|&)ac=.+?($|&)/,function(c,a,b){return a=="?"?"?":b});var c=this.state.getInstrumentationValue();if(c>0)a+="&ac="+c;b[0]=a;return b.join("#")},executeSearch:function(){if(!this.sbData.allowEmptySearch&&(this.searchBoxElement.watermarkShown||jQuery.trim(jQuery(this.searchBoxElement).val()).length==0)||jQuery.trim(this.searchBoxElement.value)==this.sbData.sr.searchLabel)return;var query=encodeURIComponent(this.searchBoxElement.watermarkShown?"":jQuery.trim(this.searchBoxElement.value));this.instrumentSearch(query);this.searchExecuting=true;var href="";if(typeof buildSearchUrl==="function"&&buildSearchUrl!=="undefined"&&buildSearchUrl)href=this.addInstrumentationToUrl(buildSearchUrl(this.sbData.boxId));else{href=this.sbData.searchLocation+"?query="+query+this.sbData.queryParams;if(this.sbData.paramsCallback&&eval("typeof "+this.sbData.paramsCallback)!="undefined")href+=eval(this.sbData.paramsCallback+"()");href=this.addInstrumentationToUrl(href)}window.location.href=href},highlightItemIdx:function(a){this.highlightItem(jQuery(this.completionListElement).children().eq(a))},highlightItem:function(a){var b=jQuery(a).parent().children();this.selectedTermIndex=b.index(a);this.resetItemStyle(b);jQuery(a).css(this.itemHoverStyle)},resetItemStyle:function(a){a.css(this.itemNormalStyle)},setText:function(b){var a=jQuery(b).attr("term");if(this.isNullOrUndefined(a)&&!this.isNullOrUndefined(b))a=b;if(a){if(this.matchType==this.termMatchString)this.state.userSelectedTerm();else if(this.matchType==this.wordMatchString)this.state.userSelectedWord();this.searchBoxElement.value=a}},isNullOrUndefined:function(a){return a=="undefined"||a==null}};epx_loaded = true;}}    
epx_core_i = new epx_core({'delay':100,'maxRetry':20});
epx_core_i.exec(epx_core_i.load, function() {return typeof(jQuery) !== 'undefined'});
}
epx_core_i.exec(function(){
jQuery(document).ready(function(){new epx_searchBox({"allowEmptySearch":false,"appId":"1","boxId":"HeaderSearchTextBox","btnId":"HeaderSearchButton","focusOnInit":false,"isRTL":false,"maxTerms":null,"minimumTermLength":4,"paramsCallback":null,"queryParams":"&emptyWatermark=true","scopeId":"9","searchLocation":"http:\/\/social.msdn.microsoft.com\/Search\/en-US","serviceUri":"http:\/\/services.social.microsoft.com\/Search\/","sr":{"close":"Close","searchButtonTooltip":"Search MSDN","searchLabel":""}} ).init();});}, 
function() {return epx_loaded});