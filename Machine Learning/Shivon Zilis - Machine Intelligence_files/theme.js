/*!
 * domready (c) Dustin Diaz 2012 - License MIT
 */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}})

/*!
 * eventie v1.0.5
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */
;(function(e){"use strict";function r(t){var n=e.event;n.target=n.target||n.srcElement||t;return n}var t=document.documentElement;var n=function(){};if(t.addEventListener){n=function(e,t,n){e.addEventListener(t,n,false)}}else if(t.attachEvent){n=function(e,t,n){e[t+n]=n.handleEvent?function(){var t=r(e);n.handleEvent.call(n,t)}:function(){var t=r(e);n.call(e,t)};e.attachEvent("on"+t,e[t+n])}}var i=function(){};if(t.removeEventListener){i=function(e,t,n){e.removeEventListener(t,n,false)}}else if(t.detachEvent){i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(r){e[t+n]=undefined}}}var s={bind:n,unbind:i};if(typeof define==="function"&&define.amd){define(s)}else if(typeof exports==="object"){module.exports=s}else{e.eventie=s}})(this)
;(function(){function i(e){this.el=e;var n=e.className.replace(/^\s+|\s+$/g,"").split(/\s+/);for(var r=0;r<n.length;r++){t.call(this,n[r])}}function s(e,t,n){if(Object.defineProperty){Object.defineProperty(e,t,{get:n})}else{e.__defineGetter__(t,n)}}if(typeof window.Element==="undefined"||"classList"in document.documentElement)return;var e=Array.prototype,t=e.push,n=e.splice,r=e.join;i.prototype={add:function(e){if(this.contains(e))return;t.call(this,e);this.el.className=this.toString()},contains:function(e){return this.el.className.indexOf(e)!=-1},item:function(e){return this[e]||null},remove:function(e){if(!this.contains(e))return;for(var t=0;t<this.length;t++){if(this[t]==e)break}n.call(this,t,1);this.el.className=this.toString()},toString:function(){return r.call(this," ")},toggle:function(e){if(!this.contains(e)){this.add(e)}else{this.remove(e)}return this.contains(e)}};window.DOMTokenList=i;s(Element.prototype,"classList",function(){return new i(this)})})()

/*! forEach polyfill
 */
if(!Array.prototype.forEach){Array.prototype.forEach=function(e){"use strict";if(this===void 0||this===null)throw new TypeError;var t=Object(this);var n=t.length>>>0;if(typeof e!=="function")throw new TypeError;var r=arguments.length>=2?arguments[1]:void 0;for(var i=0;i<n;i++){if(i in t)e.call(r,t[i],i,t)}}}

/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.1
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(e,t){"use strict";function r(e,t){return function(){return e.apply(t,arguments)}}var n;t=t||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=t.touchBoundary||10;this.layer=e;this.tapDelay=t.tapDelay||200;if(FastClick.notNeeded(e)){return}var i=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var s=this;for(var o=0,u=i.length;o<u;o++){s[i[o]]=r(s[i[o]],s)}if(deviceIsAndroid){e.addEventListener("mouseover",this.onMouse,true);e.addEventListener("mousedown",this.onMouse,true);e.addEventListener("mouseup",this.onMouse,true)}e.addEventListener("click",this.onClick,true);e.addEventListener("touchstart",this.onTouchStart,false);e.addEventListener("touchmove",this.onTouchMove,false);e.addEventListener("touchend",this.onTouchEnd,false);e.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;if(t==="click"){i.call(e,t,n.hijacked||n,r)}else{i.call(e,t,n,r)}};e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;if(t==="click"){i.call(e,t,n.hijacked||(n.hijacked=function(e){if(!e.propagationStopped){n(e)}}),r)}else{i.call(e,t,n,r)}}}if(typeof e.onclick==="function"){n=e.onclick;e.addEventListener("click",function(e){n(e)},false);e.onclick=null}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);var deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if(deviceIsIOS&&e.type==="file"||e.disabled){return true}break;case"label":case"video":return true}return/\bneedsclick\b/.test(e.className)};FastClick.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return true;case"select":return!deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}};FastClick.prototype.sendClick=function(e,t){"use strict";var n,r;if(document.activeElement&&document.activeElement!==e){document.activeElement.blur()}r=t.changedTouches[0];n=document.createEvent("MouseEvents");n.initMouseEvent(this.determineEventType(e),true,true,window,1,r.screenX,r.screenY,r.clientX,r.clientY,false,false,false,false,0,null);n.forwardedTouchEvent=true;e.dispatchEvent(n)};FastClick.prototype.determineEventType=function(e){"use strict";if(deviceIsAndroid&&e.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(e){"use strict";var t;if(deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){t=e.value.length;e.setSelectionRange(t,t)}else{e.focus()}};FastClick.prototype.updateScrollParent=function(e){"use strict";var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n;e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}if(t){t.fastClickLastScrollTop=t.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(e){"use strict";if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};FastClick.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1){return true}t=this.getTargetElementFromEventTarget(e.target);n=e.targetTouches[0];if(deviceIsIOS){r=window.getSelection();if(r.rangeCount&&!r.isCollapsed){return true}if(!deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier){e.preventDefault();return false}this.lastTouchIdentifier=n.identifier;this.updateScrollParent(t)}}this.trackingClick=true;this.trackingClickStart=e.timeStamp;this.targetElement=t;this.touchStartX=n.pageX;this.touchStartY=n.pageY;if(e.timeStamp-this.lastClickTime<this.tapDelay){e.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;if(Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n){return true}return false};FastClick.prototype.onTouchMove=function(e){"use strict";if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(e){"use strict";if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,s,o=this.targetElement;if(!this.trackingClick){return true}if(e.timeStamp-this.lastClickTime<this.tapDelay){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=e.timeStamp;n=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){s=e.changedTouches[0];o=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||o;o.fastClickScrollParent=this.targetElement.fastClickScrollParent}r=o.tagName.toLowerCase();if(r==="label"){t=this.findControl(o);if(t){this.focus(o);if(deviceIsAndroid){return false}o=t}}else if(this.needsFocus(o)){if(e.timeStamp-n>100||deviceIsIOS&&window.top!==window&&r==="input"){this.targetElement=null;return false}this.focus(o);this.sendClick(o,e);if(!deviceIsIOS||r!=="select"){this.targetElement=null;e.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){i=o.fastClickScrollParent;if(i&&i.fastClickLastScrollTop!==i.scrollTop){return true}}if(!this.needsClick(o)){e.preventDefault();this.sendClick(o,e)}return false};FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(e){"use strict";if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};FastClick.prototype.onClick=function(e){"use strict";var t;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}t=this.onMouse(e);if(!t){this.targetElement=null}return t};FastClick.prototype.destroy=function(){"use strict";var e=this.layer;if(deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchmove",this.onTouchMove,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(e){"use strict";var t;var n;if(typeof window.ontouchstart==="undefined"){return true}n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(n){if(deviceIsAndroid){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1){return true}if(n>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(e.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(e,t){"use strict";return new FastClick(e,t)};if(typeof define!=="undefined"&&define.amd){define(function(){"use strict";return FastClick})}else if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}



domready(function() {
	
	"use strict"
	
	// speeds up links on mobile
	FastClick.attach(document.body);
	
	var menu = document.querySelector('.menu'),
		menuItems = document.querySelector('.menu ul'),
		categories = document.querySelectorAll('.category'),
		open = document.querySelector('.menu-open'),
		close = document.querySelector('.menu-close');
	
	[].forEach.call(categories, function(category) {
		
		// get all the needed elements
		var link = category.querySelector('a'),
			list = category.querySelector('ul');
		
		// dont run anything else if this is an empty category
		if (! list) return false;
		
		// disable transitions and calculate max-height
		list.classList.add('no-transition');
		category.classList.add('active');
		list.setAttribute('data-height', list.offsetHeight);
		
		// reset classes
		if(!category.classList.contains('selected')) category.classList.remove('active');
		list.style.maxHeight = (category.classList.contains('active') ? list.getAttribute('data-height') + 'px' : '');
		setTimeout(function(){list.classList.remove('no-transition');},250);
		
		// only toggle clicks if it has a href (meaning it's a dropdown)
		if(link.hasAttribute('href')) {
			eventie.bind(link, 'click', function(event) {
				// returnValue used here for ie8 strangeness
				(event.preventDefault) ? event.preventDefault() : event.returnValue = false; 
				category.classList.toggle('active');
				list.style.maxHeight = (category.classList.contains('active') ? list.getAttribute('data-height') + 'px' : '');
			});
		}
		
	});
	
	// responsive navigation
	eventie.bind(open, 'click', showMenu);
	eventie.bind(close, 'click', hideMenu);
	
	function showMenu(e) {
		e.preventDefault();
		menu.classList.add('active');
		eventie.bind(document, 'touchmove', disableScroll);
		eventie.bind(menuItems, 'touchmove', menuScroll);
	}
	
	function hideMenu(e) {
		e.preventDefault();
		eventie.unbind(document, 'touchmove', disableScroll);
		eventie.unbind(menuItems, 'touchmove', menuScroll);
		menu.classList.remove('active');
	}
	
	function disableScroll(e) {
		// disables scrolling on body
		e.preventDefault();
	}
	
	function menuScroll(e) {
		// only allows scrolling if needed because
		// otherwise it passes through the menu element
		if(this.scrollHeight > this.offsetHeight)
			e.stopPropagation();
	}
	
	
	// lazyloading images
	
	if(isMobile()) {
		
		// just swap out images for mobile, lazyloading is too intense
		[].forEach.call(document.querySelectorAll('[data-src]'), function(el) {
			el.src = el.getAttribute('data-src');
			el.parentNode.parentNode.parentNode.classList.remove('loading');
		});
		
	} else {
		
		_4ORMAT.Lazyload.add('.image .lazyload-wrap img', {
			complete: function(img) { 
				img.parents('.image').removeClass('loading');
			}
		});
		_4ORMAT.Lazyload.init();
		
	}
	
	// utility functions
	function isMobile() {
	   return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i));
	}
	
});