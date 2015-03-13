// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Improvements by Hunter Dougless (hntrdglss)
// Created: 2/14/2011
// Date: 8/7/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//			  It will only set the 'top' and 'position' of your element, you
//			  might need to adjust the width in some cases.

(function($) {
	var defaults = {
			topSpacing: 0,
			bottomSpacing: 0,
			className: 'is-sticky',
			stuckClassName: 'is-stuck',
			wrapperClassName: 'sticky-wrapper',
			stickTo: ''
		},
		$window = $(window),
		$document = $(document),
		sticked = [],
		windowHeight = $window.height(),
		scroller = function() {
			var scrollTop = $window.scrollTop(),
				documentHeight = $document.height(),
				dwh = documentHeight - windowHeight,
				extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
			for (var i = 0; i < sticked.length; i++) {
				var s = sticked[i],
					elementTop = s.stickyWrapper.offset().top,
					etse = elementTop - s.topSpacing - extra;
					ebse = (s.stickTo.length) ? s.stickTo.outerHeight() + s.stickTo.offset().top
						 - s.stickyElement.outerHeight() - s.bottomSpacing - s.topSpacing - extra : null;
				if (scrollTop <= etse) {
					if (s.currentTop !== null) {
						s.stickyElement
							.css('position', '')
							.css('top', '')
							.removeClass(s.className);
						s.stickyElement.parent().removeClass(s.className);
						s.currentTop = null;
					}
				}
				else if (ebse !== null && scrollTop > ebse) {
					if (s.stickyElement.hasClass(s.className)) {
						// var newTop = scrollTop - $(s.stickyElement.parent().offsetParent()).offset().top + s.topSpacing; // if scrolling too quickly, sticks past end
						var newTop = s.stickTo.outerHeight() + s.stickTo.offset().top - s.stickyElement.outerHeight() - 100 - $(s.stickyElement.parent().offsetParent()).offset().top + s.topSpacing;
						s.stickyElement
							.css('position', 'absolute')
							.css('top', newTop)
							.removeClass(s.className);
						s.stickyElement.parent().removeClass(s.className).addClass(s.stuckClassName);
						s.currentTop = newTop;
					}
				}
				else {
					var newTop = documentHeight - s.stickyElement.outerHeight()
						- s.topSpacing - s.bottomSpacing - scrollTop - extra;
					if (newTop < 0) {
						newTop = newTop + s.topSpacing;
					} else {
						newTop = s.topSpacing;
					}
					if (s.currentTop != newTop) {
						s.stickyElement
							.css('position', 'fixed')
							.css('top', newTop)
							.addClass(s.className);
						s.stickyElement.parent().removeClass(s.stuckClassName).addClass(s.className);
						s.currentTop = newTop;
					}
				}
			}
		},
		resizer = function() {
			windowHeight = $window.height();
		},
		methods = {
			init: function(options) {
				var o = $.extend({}, defaults, options);
				return this.each(function() {
					var stickyElement = $(this);

					stickyId = stickyElement.attr('id');
					wrapper = $('<div></div>')
						.attr('id', stickyId + '-sticky-wrapper')
						.addClass(o.wrapperClassName);
					stickyElement.wrapAll(wrapper);
					var stickyWrapper = stickyElement.parent();
					stickyWrapper.css('height', stickyElement.outerHeight());
					var stickTo = ($(stickyElement.data("stick-to")).length) ? $(stickyElement.data("stick-to")) : $(o.stickTo);
					sticked.push({
						topSpacing: o.topSpacing,
						bottomSpacing: o.bottomSpacing,
						stickTo: stickTo,
						stickyElement: stickyElement,
						currentTop: null,
						stickyWrapper: stickyWrapper,
						className: o.className,
						stuckClassName: o.stuckClassName
					});
				});
			},
			update: scroller
		};

	// should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
	if (window.addEventListener) {
		window.addEventListener('scroll', scroller, false);
		window.addEventListener('resize', resizer, false);
	} else if (window.attachEvent) {
		window.attachEvent('onscroll', scroller);
		window.attachEvent('onresize', resizer);
	}

	$.fn.sticky = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.sticky');
		}
	};
	$(function() {
		setTimeout(scroller, 0);
	});
})(jQuery);
;
/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});
;
/*
 * Tiny Scrollbar
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 08 / 2012
 * @version 1.81
 * @author Maarten Baijs
 *
 */
;( function( $ ) 
{
    $.tiny = $.tiny || { };

    $.tiny.scrollbar = {
        options: {
                axis         : 'y'    // vertical or horizontal scrollbar? ( x || y ).
            ,   wheel        : 40     // how many pixels must the mouswheel scroll at a time.
            ,   scroll       : true   // enable or disable the mousewheel.
            ,   lockscroll   : true   // return scrollwheel to browser if there is no more content.
            ,   size         : 'auto' // set the size of the scrollbar to auto or a fixed number.
            ,   sizethumb    : 'auto' // set the size of the thumb to auto or a fixed number.
            ,   invertscroll : false  // Enable mobile invert style scrolling
        }
    };

    $.fn.tinyscrollbar = function( params )
    {
        var options = $.extend( {}, $.tiny.scrollbar.options, params );
        
        this.each( function()
        { 
            $( this ).data('tsb', new Scrollbar( $( this ), options ) ); 
        });

        return this;
    };

    $.fn.tinyscrollbar_update = function(sScroll)
    {
        return $( this ).data( 'tsb' ).update( sScroll ); 
    };

    function Scrollbar( root, options )
    {
        var oSelf       = this
        ,   oWrapper    = root
        ,   oViewport   = { obj: $( '.viewport', root ) }
        ,   oContent    = { obj: $( '.overview', root ) }
        ,   oScrollbar  = { obj: $( '.scrollbar', root ) }
        ,   oTrack      = { obj: $( '.track', oScrollbar.obj ) }
        ,   oThumb      = { obj: $( '.thumb', oScrollbar.obj ) }
        ,   sAxis       = options.axis === 'x'
        ,   sDirection  = sAxis ? 'left' : 'top'
        ,   sSize       = sAxis ? 'Width' : 'Height'
        ,   iScroll     = 0
        ,   iPosition   = { start: 0, now: 0 }
        ,   iMouse      = {}
        ,   touchEvents = 'ontouchstart' in document.documentElement
        ;

        function initialize()
        {
            oSelf.update();
            setEvents();

            return oSelf;
        }

        this.update = function( sScroll )
        {
            oViewport[ options.axis ] = oViewport.obj[0][ 'offset'+ sSize ];
            oContent[ options.axis ]  = oContent.obj[0][ 'scroll'+ sSize ];
            oContent.ratio            = oViewport[ options.axis ] / oContent[ options.axis ];

            oScrollbar.obj.toggleClass( 'disable', oContent.ratio >= 1 );

            oTrack[ options.axis ] = options.size === 'auto' ? oViewport[ options.axis ] : options.size;
            oThumb[ options.axis ] = Math.min( oTrack[ options.axis ], Math.max( 0, ( options.sizethumb === 'auto' ? ( oTrack[ options.axis ] * oContent.ratio ) : options.sizethumb ) ) );
        
            oScrollbar.ratio = options.sizethumb === 'auto' ? ( oContent[ options.axis ] / oTrack[ options.axis ] ) : ( oContent[ options.axis ] - oViewport[ options.axis ] ) / ( oTrack[ options.axis ] - oThumb[ options.axis ] );
            
            iScroll = ( sScroll === 'relative' && oContent.ratio <= 1 ) ? Math.min( ( oContent[ options.axis ] - oViewport[ options.axis ] ), Math.max( 0, iScroll )) : 0;
            iScroll = ( sScroll === 'bottom' && oContent.ratio <= 1 ) ? ( oContent[ options.axis ] - oViewport[ options.axis ] ) : isNaN( parseInt( sScroll, 10 ) ) ? iScroll : parseInt( sScroll, 10 );
            
            setSize();
        };

        function setSize()
        {
            var sCssSize = sSize.toLowerCase();

            oThumb.obj.css( sDirection, iScroll / oScrollbar.ratio );
            oContent.obj.css( sDirection, -iScroll );
            iMouse.start = oThumb.obj.offset()[ sDirection ];

            oScrollbar.obj.css( sCssSize, oTrack[ options.axis ] );
            oTrack.obj.css( sCssSize, oTrack[ options.axis ] );
            oThumb.obj.css( sCssSize, oThumb[ options.axis ] );
        }

        function setEvents()
        {
            if( ! touchEvents )
            {
                oThumb.obj.bind( 'mousedown', start );
                oTrack.obj.bind( 'mouseup', drag );
            }
            else
            {
                oViewport.obj[0].ontouchstart = function( event )
                {   
                    if( 1 === event.touches.length )
                    {
                        start( event.touches[ 0 ] );
                        event.stopPropagation();
                    }
                };
            }

            if( options.scroll && window.addEventListener )
            {
                oWrapper[0].addEventListener( 'DOMMouseScroll', wheel, false );
                oWrapper[0].addEventListener( 'mousewheel', wheel, false );
                oWrapper[0].addEventListener( 'MozMousePixelScroll', function( event ){
                    event.preventDefault();
                }, false);
            }
            else if( options.scroll )
            {
                oWrapper[0].onmousewheel = wheel;
            }
        }

        function start( event )
        {
            $( "body" ).addClass( "noSelect" );

            var oThumbDir   = parseInt( oThumb.obj.css( sDirection ), 10 );
            iMouse.start    = sAxis ? event.pageX : event.pageY;
            iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
            
            if( ! touchEvents )
            {
                $( document ).bind( 'mousemove', drag );
                $( document ).bind( 'mouseup', end );
                oThumb.obj.bind( 'mouseup', end );
            }
            else
            {
                document.ontouchmove = function( event )
                {
                    event.preventDefault();
                    drag( event.touches[ 0 ] );
                };
                document.ontouchend = end;        
            }
        }

        function wheel( event )
        {
            if( oContent.ratio < 1 )
            {
                var oEvent = event || window.event
                ,   iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3
                ;

                iScroll -= iDelta * options.wheel;
                iScroll = Math.min( ( oContent[ options.axis ] - oViewport[ options.axis ] ), Math.max( 0, iScroll ));

                oThumb.obj.css( sDirection, iScroll / oScrollbar.ratio );
                oContent.obj.css( sDirection, -iScroll );

                if( options.lockscroll || ( iScroll !== ( oContent[ options.axis ] - oViewport[ options.axis ] ) && iScroll !== 0 ) )
                {
                    oEvent = $.event.fix( oEvent );
                    oEvent.preventDefault();
                }
            }
        }

        function drag( event )
        {
            if( oContent.ratio < 1 )
            {
                if( options.invertscroll && touchEvents )
                {
                    iPosition.now = Math.min( ( oTrack[ options.axis ] - oThumb[ options.axis ] ), Math.max( 0, ( iPosition.start + ( iMouse.start - ( sAxis ? event.pageX : event.pageY ) ))));
                }
                else
                {
                     iPosition.now = Math.min( ( oTrack[ options.axis ] - oThumb[ options.axis ] ), Math.max( 0, ( iPosition.start + ( ( sAxis ? event.pageX : event.pageY ) - iMouse.start))));
                }

                iScroll = iPosition.now * oScrollbar.ratio;
                oContent.obj.css( sDirection, -iScroll );
                oThumb.obj.css( sDirection, iPosition.now );
            }
        }
        
        function end()
        {
            $( "body" ).removeClass( "noSelect" );
            $( document ).unbind( 'mousemove', drag );
            $( document ).unbind( 'mouseup', end );
            oThumb.obj.unbind( 'mouseup', end );
            document.ontouchmove = document.ontouchend = null;
        }

        return initialize();
    }

}(jQuery));;
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) {}
    }

    var config = $.cookie = function(key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                config.raw ? key : encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, {
                expires: -1
            }));
            return true;
        }
        return false;
    };

}));;
// Rivets.js + Sightglass.js
// version: 0.7.1
// author: Michael Richards
// license: MIT
(function(){function t(t,i,s,n){return new e(t,i,s,n)}function e(t,e,s,n){this.options=n||{},this.options.adapters=this.options.adapters||{},this.obj=t,this.keypath=e,this.callback=s,this.objectPath=[],this.parse(),i(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}function i(t){return"object"==typeof t&&null!==t}function s(t){throw new Error("[sightglass] "+t)}t.adapters={},e.tokenize=function(t,e,i){for(tokens=[],current={i:i,path:""},index=0;index<t.length;index++)chr=t.charAt(index),~e.indexOf(chr)?(tokens.push(current),current={i:chr,path:""}):current.path+=chr;return tokens.push(current),tokens},e.prototype.parse=function(){interfaces=this.interfaces(),interfaces.length||s("Must define at least one adapter interface."),~interfaces.indexOf(this.keypath[0])?(root=this.keypath[0],path=this.keypath.substr(1)):("undefined"==typeof(root=this.options.root||t.root)&&s("Must define a default root adapter."),path=this.keypath),this.tokens=e.tokenize(path,interfaces,root),this.key=this.tokens.pop()},e.prototype.realize=function(){return current=this.obj,unreached=!1,this.tokens.forEach(function(t,e){i(current)?("undefined"!=typeof this.objectPath[e]?current!==(prev=this.objectPath[e])&&(this.set(!1,t,prev,this.update.bind(this)),this.set(!0,t,current,this.update.bind(this)),this.objectPath[e]=current):(this.set(!0,t,current,this.update.bind(this)),this.objectPath[e]=current),current=this.get(t,current)):(unreached===!1&&(unreached=e),(prev=this.objectPath[e])&&this.set(!1,t,prev,this.update.bind(this)))},this),unreached!==!1&&this.objectPath.splice(unreached),current},e.prototype.update=function(){(next=this.realize())!==this.target&&(i(this.target)&&this.set(!1,this.key,this.target,this.callback),i(next)&&this.set(!0,this.key,next,this.callback),oldValue=this.value(),this.target=next,this.value()!==oldValue&&this.callback())},e.prototype.value=function(){return i(this.target)?this.get(this.key,this.target):void 0},e.prototype.setValue=function(t){i(this.target)&&this.adapter(this.key).set(this.target,this.key.path,t)},e.prototype.get=function(t,e){return this.adapter(t).get(e,t.path)},e.prototype.set=function(t,e,i,s){action=t?"observe":"unobserve",this.adapter(e)[action](i,e.path,s)},e.prototype.interfaces=function(){return interfaces=Object.keys(this.options.adapters),Object.keys(t.adapters).forEach(function(t){~interfaces.indexOf(t)||interfaces.push(t)}),interfaces},e.prototype.adapter=function(e){return this.options.adapters[e.i]||t.adapters[e.i]},e.prototype.unobserve=function(){this.tokens.forEach(function(t,e){(obj=this.objectPath[e])&&this.set(!1,t,obj,this.update.bind(this))},this),i(this.target)&&this.set(!1,this.key,this.target,this.callback)},"undefined"!=typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd?define([],function(){return this.sightglass=t}):this.sightglass=t}).call(this);
(function(){var t,e,i,n,r=function(t,e){return function(){return t.apply(e,arguments)}},s=[].slice,o={}.hasOwnProperty,u=function(t,e){function i(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},h=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};t={options:["prefix","templateDelimiters","rootInterface","preloadData","handler"],extensions:["binders","formatters","components","adapters"],"public":{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(t,e,i){return this.call(t,e,i.view.models)},configure:function(e){var i,n,r,s;null==e&&(e={});for(r in e)if(s=e[r],"binders"===r||"components"===r||"formatters"===r||"adapters"===r)for(n in s)i=s[n],t[r][n]=i;else t["public"][r]=s},bind:function(e,i,n){var r;return null==i&&(i={}),null==n&&(n={}),r=new t.View(e,i,n),r.bind(),r}}},window.jQuery||window.$?(n="on"in jQuery.prototype?["on","off"]:["bind","unbind"],e=n[0],i=n[1],t.Util={bindEvent:function(t,i,n){return jQuery(t)[e](i,n)},unbindEvent:function(t,e,n){return jQuery(t)[i](e,n)},getInputValue:function(t){var e;return e=jQuery(t),"checkbox"===e.attr("type")?e.is(":checked"):e.val()}}):t.Util={bindEvent:function(){return"addEventListener"in window?function(t,e,i){return t.addEventListener(e,i,!1)}:function(t,e,i){return t.attachEvent("on"+e,i)}}(),unbindEvent:function(){return"removeEventListener"in window?function(t,e,i){return t.removeEventListener(e,i,!1)}:function(t,e,i){return t.detachEvent("on"+e,i)}}(),getInputValue:function(t){var e,i,n,r;if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){for(r=[],i=0,n=t.length;n>i;i++)e=t[i],e.selected&&r.push(e.value);return r}return t.value}},t.TypeParser=function(){function t(){}return t.types={primitive:0,keypath:1},t.parse=function(t){return/^'.*'$|^".*"$/.test(t)?{type:this.types.primitive,value:t.slice(1,-1)}:"true"===t?{type:this.types.primitive,value:!0}:"false"===t?{type:this.types.primitive,value:!1}:"null"===t?{type:this.types.primitive,value:null}:"undefined"===t?{type:this.types.primitive,value:void 0}:isNaN(Number(t))===!1?{type:this.types.primitive,value:Number(t)}:{type:this.types.keypath,value:t}},t}(),t.TextTemplateParser=function(){function t(){}return t.types={text:0,binding:1},t.parse=function(t,e){var i,n,r,s,o,u,h;for(u=[],s=t.length,i=0,n=0;s>n;){if(i=t.indexOf(e[0],n),0>i){u.push({type:this.types.text,value:t.slice(n)});break}if(i>0&&i>n&&u.push({type:this.types.text,value:t.slice(n,i)}),n=i+e[0].length,i=t.indexOf(e[1],n),0>i){o=t.slice(n-e[1].length),r=u[u.length-1],(null!=r?r.type:void 0)===this.types.text?r.value+=o:u.push({type:this.types.text,value:o});break}h=t.slice(n,i).trim(),u.push({type:this.types.binding,value:h}),n=i+e[1].length}return u},t}(),t.View=function(){function e(e,i,n){var s,o,u,h,l,a,p,d,c,f,b,v;for(this.els=e,this.models=i,null==n&&(n={}),this.update=r(this.update,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.select=r(this.select,this),this.build=r(this.build,this),this.componentRegExp=r(this.componentRegExp,this),this.bindingRegExp=r(this.bindingRegExp,this),this.options=r(this.options,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),c=t.extensions,l=0,p=c.length;p>l;l++){if(o=c[l],this[o]={},n[o]){f=n[o];for(s in f)u=f[s],this[o][s]=u}b=t["public"][o];for(s in b)u=b[s],null==(h=this[o])[s]&&(h[s]=u)}for(v=t.options,a=0,d=v.length;d>a;a++)o=v[a],this[o]=n[o]||t["public"][o];this.build()}return e.prototype.options=function(){var e,i,n,r,s;for(i={},s=t.extensions.concat(t.options),n=0,r=s.length;r>n;n++)e=s[n],i[e]=this[e];return i},e.prototype.bindingRegExp=function(){return new RegExp("^"+this.prefix+"-")},e.prototype.componentRegExp=function(){return new RegExp("^"+this.prefix.toUpperCase()+"-")},e.prototype.build=function(){var e,i,n,r,s,o,u,h;for(this.bindings=[],e=this.bindingRegExp(),n=this.componentRegExp(),i=function(e){return function(i,n,r,s){var o,u,h,l,a,p,d;return a={},d=function(){var t,e,i,n;for(i=s.split("|"),n=[],t=0,e=i.length;e>t;t++)p=i[t],n.push(p.trim());return n}(),o=function(){var t,e,i,n;for(i=d.shift().split("<"),n=[],t=0,e=i.length;e>t;t++)u=i[t],n.push(u.trim());return n}(),l=o.shift(),a.formatters=d,(h=o.shift())&&(a.dependencies=h.split(/\s+/)),e.bindings.push(new t[i](e,n,r,l,a))}}(this),s=function(r){return function(o){var u,h,l,a,p,d,c,f,b,v,y,g,m,w,x,k,E,N,V,T,O,R,B,C,j,S,U,A;if(3===o.nodeType){if(b=t.TextTemplateParser,(d=r.templateDelimiters)&&(m=b.parse(o.data,d)).length&&(1!==m.length||m[0].type!==b.types.text)){for(k=0,T=m.length;T>k;k++)g=m[k],y=document.createTextNode(g.value),o.parentNode.insertBefore(y,o),1===g.type&&i("TextBinding",y,null,g.value);o.parentNode.removeChild(o)}}else if(1===o.nodeType)if(n.test(o.nodeName))w=o.nodeName.replace(n,"").toLowerCase(),r.bindings.push(new t.ComponentBinding(r,o,w));else{for(a="SCRIPT"===o.nodeName||"STYLE"===o.nodeName,C=o.attributes,E=0,O=C.length;O>E;E++)if(u=C[E],e.test(u.name)){if(w=u.name.replace(e,""),!(l=r.binders[w])){j=r.binders;for(c in j)x=j[c],"*"!==c&&-1!==c.indexOf("*")&&(v=new RegExp("^"+c.replace(/\*/g,".+")+"$"),v.test(w)&&(l=x))}l||(l=r.binders["*"]),l.block&&(a=!0,h=[u])}for(S=h||o.attributes,N=0,R=S.length;R>N;N++)u=S[N],e.test(u.name)&&(w=u.name.replace(e,""),i("Binding",o,w,u.value))}if(!a){for(U=function(){var t,e,i,n;for(i=o.childNodes,n=[],e=0,t=i.length;t>e;e++)f=i[e],n.push(f);return n}(),A=[],V=0,B=U.length;B>V;V++)p=U[V],A.push(s(p));return A}}}(this),h=this.els,o=0,u=h.length;u>o;o++)r=h[o],s(r);this.bindings.sort(function(t,e){var i,n;return((null!=(i=e.binder)?i.priority:void 0)||0)-((null!=(n=t.binder)?n.priority:void 0)||0)})},e.prototype.select=function(t){var e,i,n,r,s;for(r=this.bindings,s=[],i=0,n=r.length;n>i;i++)e=r[i],t(e)&&s.push(e);return s},e.prototype.bind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.bind());return r},e.prototype.unbind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r},e.prototype.sync=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.sync());return r},e.prototype.publish=function(){var t,e,i,n,r;for(n=this.select(function(t){return t.binder.publishes}),r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.publish());return r},e.prototype.update=function(t){var e,i,n,r,s,o,u;null==t&&(t={});for(i in t)n=t[i],this.models[i]=n;for(o=this.bindings,u=[],r=0,s=o.length;s>r;r++)e=o[r],u.push(e.update(t));return u},e}(),t.Binding=function(){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.getValue=r(this.getValue,this),this.update=r(this.update,this),this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.publish=r(this.publish,this),this.sync=r(this.sync,this),this.set=r(this.set,this),this.eventHandler=r(this.eventHandler,this),this.formattedValue=r(this.formattedValue,this),this.parseTarget=r(this.parseTarget,this),this.observe=r(this.observe,this),this.setBinder=r(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i,n;if(!(this.binder=this.view.binders[this.type])){n=this.view.binders;for(t in n)i=n[t],"*"!==t&&-1!==t.indexOf("*")&&(e=new RegExp("^"+t.replace(/\*/g,".+")+"$"),e.test(this.type)&&(this.binder=i,this.args=new RegExp("^"+t.replace(/\*/g,"(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},e.prototype.observe=function(e,i,n){return t.sightglass(e,i,n,{root:this.view.rootInterface,adapters:this.view.adapters})},e.prototype.parseTarget=function(){var e;return e=t.TypeParser.parse(this.keypath),0===e.type?this.value=e.value:(this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target)},e.prototype.formattedValue=function(e){var i,n,r,o,u,h,l,a,p,d,c,f,b,v;for(v=this.formatters,o=d=0,f=v.length;f>d;o=++d){for(u=v[o],r=u.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g),h=r.shift(),u=this.view.formatters[h],r=function(){var e,i,s;for(s=[],e=0,i=r.length;i>e;e++)n=r[e],s.push(t.TypeParser.parse(n));return s}(),a=[],i=c=0,b=r.length;b>c;i=++c)n=r[i],a.push(0===n.type?n.value:((p=this.formatterObservers)[o]||(p[o]={}),(l=this.formatterObservers[o][i])?void 0:(l=this.observe(this.view.models,n.value,this.sync),this.formatterObservers[o][i]=l),l.value()));(null!=u?u.read:void 0)instanceof Function?e=u.read.apply(u,[e].concat(s.call(a))):u instanceof Function&&(e=u.apply(null,[e].concat(s.call(a))))}return e},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.handler,function(n){return i.call(t,this,n,e)}},e.prototype.set=function(t){var e;return t=t instanceof Function&&!this.binder["function"]?this.formattedValue(t.call(this.model)):this.formattedValue(t),null!=(e=this.binder.routine)?e.call(this,this.el,t):void 0},e.prototype.sync=function(){var t,e;return this.set(function(){var i,n,r,s,o,u,h;if(this.observer){if(this.model!==this.observer.target){for(o=this.dependencies,i=0,r=o.length;r>i;i++)e=o[i],e.unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(u=this.options.dependencies)?u.length:void 0))for(h=this.options.dependencies,n=0,s=h.length;s>n;n++)t=h[n],e=this.observe(this.model,t,this.sync),this.dependencies.push(e)}return this.observer.value()}return this.value}.call(this))},e.prototype.publish=function(){var t,e,i,n,r,o,u,h,l;if(this.observer){for(n=this.getValue(this.el),u=this.formatters.slice(0).reverse(),r=0,o=u.length;o>r;r++)e=u[r],t=e.split(/\s+/),i=t.shift(),(null!=(h=this.view.formatters[i])?h.publish:void 0)&&(n=(l=this.view.formatters[i]).publish.apply(l,[n].concat(s.call(t))));return this.observer.setValue(n)}},e.prototype.bind=function(){var t,e,i,n,r,s,o;if(this.parseTarget(),null!=(r=this.binder.bind)&&r.call(this,this.el),null!=this.model&&(null!=(s=this.options.dependencies)?s.length:void 0))for(o=this.options.dependencies,i=0,n=o.length;n>i;i++)t=o[i],e=this.observe(this.model,t,this.sync),this.dependencies.push(e);return this.view.preloadData?this.sync():void 0},e.prototype.unbind=function(){var t,e,i,n,r,s,o,u,h,l;for(null!=(o=this.binder.unbind)&&o.call(this,this.el),null!=(u=this.observer)&&u.unobserve(),h=this.dependencies,r=0,s=h.length;s>r;r++)n=h[r],n.unobserve();this.dependencies=[],l=this.formatterObservers;for(i in l){e=l[i];for(t in e)n=e[t],n.unobserve()}return this.formatterObservers={}},e.prototype.update=function(t){var e,i;return null==t&&(t={}),this.model=null!=(e=this.observer)?e.target:void 0,this.unbind(),null!=(i=this.binder.update)&&i.call(this,t),this.bind()},e.prototype.getValue=function(e){return this.binder&&null!=this.binder.getValue?this.binder.getValue.call(this,e):t.Util.getInputValue(e)},e}(),t.ComponentBinding=function(e){function i(t,e,i){var n,s,o,u,l;for(this.view=t,this.el=e,this.type=i,this.unbind=r(this.unbind,this),this.bind=r(this.bind,this),this.update=r(this.update,this),this.locals=r(this.locals,this),this.component=this.view.components[this.type],this.attributes={},this.inflections={},u=this.el.attributes||[],s=0,o=u.length;o>s;s++)n=u[s],l=n.name,h.call(this.component.attributes,l)>=0?this.attributes[n.name]=n.value:this.inflections[n.name]=n.value}return u(i,e),i.prototype.sync=function(){},i.prototype.locals=function(t){var e,i,n,r,s,o,u,h,l;null==t&&(t=this.view.models),s={},h=this.inflections;for(i in h)for(e=h[i],l=e.split("."),o=0,u=l.length;u>o;o++)r=l[o],s[i]=(s[i]||t)[r];for(i in t)n=t[i],null==s[i]&&(s[i]=n);return s},i.prototype.update=function(t){var e;return null!=(e=this.componentView)?e.update(this.locals(t)):void 0},i.prototype.bind=function(){var e,i;return null!=this.componentView?null!=(i=this.componentView)?i.bind():void 0:(e=this.component.build.call(this.attributes),(this.componentView=new t.View(e,this.locals(),this.view.options)).bind(),this.el.parentNode.replaceChild(e,this.el))},i.prototype.unbind=function(){var t;return null!=(t=this.componentView)?t.unbind():void 0},i}(t.Binding),t.TextBinding=function(t){function e(t,e,i,n,s){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=s?s:{},this.sync=r(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return u(e,t),e.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},e.prototype.sync=function(){return e.__super__.sync.apply(this,arguments)},e}(t.Binding),t["public"].binders.text=function(t,e){return null!=t.textContent?t.textContent=null!=e?e:"":t.innerText=null!=e?e:""},t["public"].binders.html=function(t,e){return t.innerHTML=null!=e?e:""},t["public"].binders.show=function(t,e){return t.style.display=e?"":"none"},t["public"].binders.hide=function(t,e){return t.style.display=e?"none":""},t["public"].binders.enabled=function(t,e){return t.disabled=!e},t["public"].binders.disabled=function(t,e){return t.disabled=!!e},t["public"].binders.checked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)===(null!=e?e.toString():void 0):!!e}},t["public"].binders.unchecked={publishes:!0,priority:2e3,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)!==(null!=e?e.toString():void 0):!e}},t["public"].binders.value={publishes:!0,priority:2e3,bind:function(e){return this.event="SELECT"===e.tagName?"change":"input",t.Util.bindEvent(e,this.event,this.publish)},unbind:function(e){return t.Util.unbindEvent(e,this.event,this.publish)},routine:function(t,e){var i,n,r,s,o,u,l;if(null!=window.jQuery){if(t=jQuery(t),(null!=e?e.toString():void 0)!==(null!=(s=t.val())?s.toString():void 0))return t.val(null!=e?e:"")}else if("select-multiple"===t.type){if(null!=e){for(l=[],n=0,r=t.length;r>n;n++)i=t[n],l.push(i.selected=(o=i.value,h.call(e,o)>=0));return l}}else if((null!=e?e.toString():void 0)!==(null!=(u=t.value)?u.toString():void 0))return t.value=null!=e?e:""}},t["public"].binders["if"]={block:!0,priority:3e3,bind:function(t){var e,i;return null==this.marker?(e=[this.view.prefix,this.type].join("-").replace("--","-"),i=t.getAttribute(e),this.marker=document.createComment(" rivets: "+this.type+" "+i+" "),this.bound=!1,t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t)):void 0},unbind:function(){var t;return null!=(t=this.nested)?t.unbind():void 0},routine:function(e,i){var n,r,s,o;if(!!i==!this.bound){if(i){s={},o=this.view.models;for(n in o)r=o[n],s[n]=r;return(this.nested||(this.nested=new t.View(e,s,this.view.options()))).bind(),this.marker.parentNode.insertBefore(e,this.marker.nextSibling),this.bound=!0}return e.parentNode.removeChild(e),this.nested.unbind(),this.bound=!1}},update:function(t){var e;return null!=(e=this.nested)?e.update(t):void 0}},t["public"].binders.unless={block:!0,priority:3e3,bind:function(e){return t["public"].binders["if"].bind.call(this,e)},unbind:function(){return t["public"].binders["if"].unbind.call(this)},routine:function(e,i){return t["public"].binders["if"].routine.call(this,e,!i)},update:function(e){return t["public"].binders["if"].update.call(this,e)}},t["public"].binders["on-*"]={"function":!0,priority:1e3,unbind:function(e){return this.handler?t.Util.unbindEvent(e,this.args[0],this.handler):void 0},routine:function(e,i){return this.handler&&t.Util.unbindEvent(e,this.args[0],this.handler),t.Util.bindEvent(e,this.args[0],this.handler=this.eventHandler(i))}},t["public"].binders["each-*"]={block:!0,priority:3e3,bind:function(t){var e,i,n,r,s;if(null==this.marker)e=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t);else for(s=this.iterated,n=0,r=s.length;r>n;n++)i=s[n],i.bind()},unbind:function(){var t,e,i,n,r;if(null!=this.iterated){for(n=this.iterated,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r}},routine:function(e,i){var n,r,s,o,u,h,l,a,p,d,c,f,b,v,y,g,m,w,x,k,E;if(l=this.args[0],i=i||[],this.iterated.length>i.length)for(w=Array(this.iterated.length-i.length),f=0,y=w.length;y>f;f++)s=w[f],c=this.iterated.pop(),c.unbind(),this.marker.parentNode.removeChild(c.els[0]);for(o=b=0,g=i.length;g>b;o=++b)if(h=i[o],r={index:o},r[l]=h,null==this.iterated[o]){x=this.view.models;for(u in x)h=x[u],null==r[u]&&(r[u]=h);p=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,a=this.view.options(),a.preloadData=!0,d=e.cloneNode(!0),c=new t.View(d,r,a),c.bind(),this.iterated.push(c),this.marker.parentNode.insertBefore(d,p.nextSibling)}else this.iterated[o].models[l]!==h&&this.iterated[o].update(r);if("OPTION"===e.nodeName){for(k=this.view.bindings,E=[],v=0,m=k.length;m>v;v++)n=k[v],n.el===this.marker.parentNode&&"value"===n.type?E.push(n.sync()):E.push(void 0);return E}},update:function(t){var e,i,n,r,s,o,u,h;e={};for(i in t)n=t[i],i!==this.args[0]&&(e[i]=n);for(u=this.iterated,h=[],s=0,o=u.length;o>s;s++)r=u[s],h.push(r.update(e));return h}},t["public"].binders["class-*"]=function(t,e){var i;return i=" "+t.className+" ",!e==(-1!==i.indexOf(" "+this.args[0]+" "))?t.className=e?""+t.className+" "+this.args[0]:i.replace(" "+this.args[0]+" "," ").trim():void 0},t["public"].binders["*"]=function(t,e){return null!=e?t.setAttribute(this.type,e):t.removeAttribute(this.type)},t["public"].adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(t){var e;return t.hasOwnProperty(this.id)||(e=this.counter++,this.weakmap[e]={callbacks:{}},Object.defineProperty(t,this.id,{value:e})),this.weakmap[t[this.id]]},stubFunction:function(t,e){var i,n,r;return n=t[e],i=this.weakReference(t),r=this.weakmap,t[e]=function(){var e,s,o,u,h,l,a,p,d,c;u=n.apply(t,arguments),a=i.pointers;for(o in a)for(s=a[o],c=null!=(p=null!=(d=r[o])?d.callbacks[s]:void 0)?p:[],h=0,l=c.length;l>h;h++)e=c[h],e();return u}},observeMutations:function(t,e,i){var n,r,s,o,u,l;if(Array.isArray(t)){if(s=this.weakReference(t),null==s.pointers)for(s.pointers={},r=["push","pop","shift","unshift","sort","reverse","splice"],u=0,l=r.length;l>u;u++)n=r[u],this.stubFunction(t,n);if(null==(o=s.pointers)[e]&&(o[e]=[]),h.call(s.pointers[e],i)<0)return s.pointers[e].push(i)}},unobserveMutations:function(t,e,i){var n,r,s;return Array.isArray(t&&null!=t[this.id])&&(r=null!=(s=this.weakReference(t).pointers)?s[e]:void 0)&&(n=r.indexOf(i),n>=0)?r.splice(n,1):void 0},observe:function(t,e,i){var n,r;return n=this.weakReference(t).callbacks,null==n[e]&&(n[e]=[],r=t[e],Object.defineProperty(t,e,{enumerable:!0,get:function(){return r},set:function(s){return function(o){var u,l,a;if(o!==r){for(r=o,a=n[e].slice(),u=0,l=a.length;l>u;u++)i=a[u],h.call(n[e],i)>=0&&i();return s.observeMutations(o,t[s.id],e)}}}(this)})),h.call(n[e],i)<0&&n[e].push(i),this.observeMutations(t[e],t[this.id],e)},unobserve:function(t,e,i){var n,r;return n=this.weakmap[t[this.id]].callbacks[e],r=n.indexOf(i),r>=0&&n.splice(r,1),this.unobserveMutations(t[e],t[this.id],e)},get:function(t,e){return t[e]},set:function(t,e,i){return t[e]=i}},t.factory=function(e){return t.sightglass=e,t["public"]._=t,t["public"]},"object"==typeof("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=t.factory(require("sightglass")):"function"==typeof define&&define.amd?define(["sightglass"],function(e){return this.rivets=t.factory(e)}):this.rivets=t.factory(sightglass)}).call(this);;
'use strict';
var MITTR = MITTR || {};

( function ( $ ) {

	/**
	 * ***********************************************************************
	 * Function library for MITTR
	 */

	/**
	 * ----------------------------------------------------------------------
	 * [ux description]
	 * sets up and controls the general ux parts of the page
	 */
	MITTR.shared = {

		ux: {
			init: function () {
				// global settings
				window.isMobileBrowser = ( ( navigator.userAgent.match( /(Android|webOS|BlackBerry|IEMobile)/i ) !== null ) || ( ( navigator.userAgent.match( /(iPod|iPhone|iPad)/i ) !== null ) && ( navigator.userAgent.match( /AppleWebKit/i ) !== null ) ) ) ? true : false;

				// check font size to see if browser default is not 16px
				var calculated_font_size = MITTR.shared.ux.getCalculatedFontSize();

				if ( $( "#warning-bar:visible" ).length ) { // ie
					// don't do anything, IE message takes priority
				} else { // if everyone else
					if ( calculated_font_size !== 10 ) {
						MITTR.shared.ux.showFontSizeWarningBar( calculated_font_size );
					}
				}

				// fix pagination
				this.fixPagination();
			}, // init

			// get the browser's calculated font size (based on default font size)
			getCalculatedFontSize: function () {
				var pa = document.body;
				var who = document.createElement( 'div' );
				who.appendChild( document.createTextNode( 'M' ) );
				pa.appendChild( who );
				var fs = [ who.offsetWidth, who.offsetHeight ];
				pa.removeChild( who );
				return fs[ 1 ];
			}, // getCalculatedFontSize

			showFontSizeWarningBar: function ( calculated_font_size ) {
				var relativity = "";
				if ( calculated_font_size < 10 ) {
					relativity = "small";
				} else if ( calculated_font_size > 10 ) {
					relativity = "big";
				}

				var message = "<strong>Is this site looking too " + relativity + "?</strong> The site automatically scales based on the font size set in your browser. <a href='#' class='close'><strong>&times;</strong></a>";

				$( "#warning-bar p" ).html( message );
				$( "#warning-bar p a" ).on( "click", function ( event ) {
					event.preventDefault();
					$( "#warning-bar" ).hide();
					$.cookie( 'seen_font_warning', 'yes', {
						expires: 90,
						path: '/'
					} );

					_gaq.push( [ '_trackEvent', 'warning-bar: font-size', 'click', 'close' ] );
				} );

				if ( $.cookie( "seen_font_warning" ) === null ) {
					$( "#warning-bar" ).show();
				} else {
					$( "#warning-bar" ).hide(); // necessary to force hiding on dev/stage environments, should handle better so dev/stage message shows
				}

				_gaq.push( [ '_trackEvent', 'warning-bar: font-size', 'show', calculated_font_size ] );
			}, // showFontSizeWarningBar

			// fix pagination, given Drupal's output
			fixPagination: function () {
					var pagination = $( ".pagination" );

					$.each( pagination, function ( index, paginator ) {
						paginator = $( paginator );
						if ( !paginator.find( ".cta-block" ).length ) { // only apply to Drupal
							paginator.find( ".pager-current" ).addClass( "active" );
							var next = paginator.find( ".pager-next a" );

							// build label element
							var label_el = $( document.createElement( "li" ) ).addClass( "header" ).text( "Page" );
							// attach to DOM
							paginator.find( "ul" ).prepend( label_el );

							// build backing element
							var backing_el = $( document.createElement( "div" ) ).addClass( "backing" );
							// attach to DOM
							paginator.append( backing_el );

							if ( next.length ) {
								// build Continue CTA element
								var continue_href = next.attr( "href" );
								var continue_el = $( document.createElement( "a" ) ).addClass( "continue cta-block" ).attr( "href", continue_href ).text( "Continue" );

								// attach to DOM
								paginator.append( continue_el );
							}
						}
					} );
				} // fixPagination
		} // ux

	}; // shared

	/**
	 * ----------------------------------------------------------------------
	 * Insider Access Customizations
	 *
	 * Injects changes into a page to dynamically change the UX based on
	 * whether or not the current visitor is accessing the site with an
	 * "Insider" account.
	 */
	MITTR.insider = {

		init: function () {
			this.conditionalContent();
		}, // init

		/**
		 * Conditional Content Display
		 *
		 * This method configures data-binding to make it easy for us to
		 * control the dynamic display for call to actions in order to hide
		 * them when a user isn't enrolled.
		 */
		conditionalContent: function () {

			var $conditionalContent = $( '[data-conditional-content]' ),
				self = this;

			// check current page for defined actions
			if ( $conditionalContent.length <= 0 )
				return;

			// do they have Insider access?
			var access = self.access( function ( access ) {

				// video
				var $videoPromo = $( '[data-conditional-content="insider-videos"]' );
				if ( $videoPromo.length > -1 ) {
					rivets.bind( $videoPromo, {
						access: access.insider,
						action: {
							text: function () {
								if ( access.insider )
									return 'You have access to all videos because you’re an Insider.';
								else
									return 'Want unlimited access to event videos?';
							},
							link: 'Sign up for Insider.',
							url: '/getinsider/'
						}
					} );
				}

				// content
				var $insiderContent = $( '[data-conditional-content="insider-content"]' );
				if ( $insiderContent.length > -1 ) {
					rivets.bind( $insiderContent, {
						access: access.insider,
						action: {
							text: "You have access to this story because you're an Insider."
						}
					} );
				}

			} );
		},

		/**
		 * Check for Insider access
		 *
		 * See if they don't have Insider access. Accepts a cb() callback to
		 * pass the AJAX values back to calling function
		 */
		access: function ( cb ) {

			var access = {};
			access.insider = false;

			// first check for Drupal.settings
			if ( typeof Drupal != "undefined" && typeof Drupal.settings == "object" ) {

				// check for active paywall and current user access
				if ( Drupal.settings.mittrInsider.active && Drupal.settings.mittrInsider.unlocked )
					access.insider = true;

				// callback passes result
				cb( access );
			}

			// fallback to AJAX request (for static sites)
			else {
				$.ajax( '/my/js/' ).done( function ( data ) {

					// access check (true)
					if ( data && data.insider_level )
						access.insider = true;

					// callback passes result
					cb( access );
				} );
			}
		}

	}; // MITTR.insider

	/**
	 * ----------------------------------------------------------------------
	 * [menus description]
	 * turns on and controls the menus in header and footer of the site
	 * since the sticky and full navs use the same content, the menus are set, in html
	 * on one menu, and then - on first click - cloned to the second menu
	 *
	 */
	MITTR.menus = {

		init: function () {
			this.header.init();
			this.actionbar.init();
		}, // init

		// handle the menus in the header (standard, sticky, and home button)
		header: {
			/**
			 * header menus available:
			 * -- menu_sticky_home
			 * -- menu_sticky_sections
			 * -- menu_sticky_connect
			 * -- menu_standard_connect
			 * -- menu_standard_more
			 * -- menu_nav_home
			 */

			// settings
			menuIsOpen: false,
			menuOpenName: "",
			panelIsOpen: false,
			panelOpenName: "",
			isCloned_menu_standard_connect: false,
			isCloned_menu_nav_home: false,

			init: function () {
				var go = this;
				// disabling connect drop down for now, will revisit

				// set up the menus
				go.setupMenu( "menu_sticky_sections" );
				//go.setupMenu("menu_sticky_connect");
				//go.setupMenu("menu_standard_connect");
				go.setupMenu( "menu_standard_more" );

				// only set up home button menus if they are not set to "is-off"
				if ( !$( "#menu_nav_home_button" ).hasClass( "menuisoff" ) ) {

					// set up sticky home menu
					go.setupMenu( "menu_sticky_home" );

					// then, only set up the main home button if this is not the home page
					if ( !$( "#menu_nav_home_button a.candrop" ).hasClass( "on" ) ) {
						go.setupMenu( "menu_nav_home" );
					}

				}

				// set up the panels
				//go.setupPanel("menu_standard_connect");
				//go.setupPanel("menu_sticky_connect");
				go.setupPanel( "menu_sticky_sections" );

				return go;
			},

			setupMenu: function ( thisMenuID ) {
				var go = this;
				var thisMenuSetup = "#" + thisMenuID;
				var thisButtonSetup = thisMenuSetup + "_button";

				// move the original href to data attr
				var orghref = $( thisButtonSetup + " a.candrop" ).prop( "href" );
				$( thisButtonSetup + " a.candrop" ).data( "header_menu_href", orghref );
				$( thisButtonSetup + " a.candrop" ).removeAttr( "href" );

				// add click handler
				$( thisButtonSetup ).on( "click", function ( event ) {
					go.handleClick( thisMenuID );
				} );

				// add mouseout handler to button's parent
				$( thisButtonSetup ).on( "mouseleave", function () {
					go.closeMenu();
				} );

			}, // setupMenu

			handleClick: function ( thisMenuID ) {
				var go = this;
				var thisButton = "#" + thisMenuID + "_button";

				if ( go.menuOpenName != thisMenuID ) {
					go.openMenu( thisMenuID );
				} else {
					$( thisButton + " a.candrop" ).prop( "href", $( thisButton + " a.candrop" ).data( "header_menu_href" ) );
				}
			}, // handleClick

			openMenu: function ( thisMenuID ) {
				var go = this;
				var thisMenu = "#" + thisMenuID;
				var thisButton = thisMenu + "_button";

				// clone on click
				// menu_standard_connect
				if ( thisMenuID == "menu_standard_connect" && !go.isCloned_menu_standard_connect ) {
					// clone "menu_sticky_connect" content over to "menu_standard_connect"
					//$("#menu_sticky_connect").children().clone().appendTo("#menu_standard_connect");
					//go.isCloned_menu_standard_connect = true;
				}

				// menu_nav_home
				if ( thisMenuID == "menu_nav_home" && !go.isCloned_menu_nav_home ) {
					// clone "menu_sticky_home" content over to "menu_nav_home"
					$( "#menu_sticky_home" ).children().clone().appendTo( "#menu_nav_home" );
					go.isCloned_menu_nav_home = true;
				}

				// close the open menu
				if ( go.menuIsOpen ) {
					go.closeMenu();
				}

				// open the selected menu
				$( thisMenu ).addClass( "on" );
				$( thisButton ).addClass( "on" );

				go.menuIsOpen = true;
				go.menuOpenName = thisMenuID;
			}, // openMenu

			closeMenu: function () {
				var go = this;
				if ( go.menuOpenName !== "" && go.menuIsOpen ) {
					var thisMenuOff = "#" + go.menuOpenName;
					var thisButtonOff = thisMenuOff + "_button";

					$( thisMenuOff ).removeClass( "on" );
					$( thisButtonOff ).removeClass( "on" );

					// remove the button's href again
					$( thisButtonOff + " a.candrop" ).removeAttr( "href" );

					go.menuOpenName = "";
					go.menuIsOpen = false;
				}
			}, // closeMenu

			setupPanel: function ( thisMenuID ) {
				var go = this;
				var panelParentID = "#" + thisMenuID;
				$( panelParentID + " .panel-list li" ).each( function ( index ) {
					$( this ).on( "mouseenter mouseleave", function () {
						go.hoverPanel( thisMenuID, $( this ).attr( 'class' ) );
					} );
				} );
			}, // setupPanel

			hoverPanel: function ( thisMenuID, panelName ) {
				var panelHoverID = "#" + thisMenuID;

				// turn off current panel
				$( panelHoverID + " .panel-holder .panel-contents" ).removeClass( "on" );

				// turn off the active link highlight
				$( panelHoverID + " .panel-list li a" ).removeClass( "active" );

				// turn on this panel
				$( panelHoverID + " .panel-holder .panel-contents." + panelName ).addClass( "on" );

				// turn on this link hightlight
				$( panelHoverID + " .panel-list li." + panelName + " a" ).addClass( "active" );
			}
		},

		// handle the action bar (running down side of stories)
		actionbar: {
			init: function () {
				// only set up, if the action bar exists on this page
				if ( $( "#sharing-bar" ).length ) {

					// add print calls to print button
					$( "#sb-print a" ).on( "click", function ( event ) {
						event.preventDefault();
						window.print();
					} );

					// removing hover/flags for now
					if ( false ) {
						// add hover controls to all links within sharing-bar
						$( "#sharing-bar li a" ).on( "mouseenter", function () {
							// grow the a container, slide out the div.flag
							$( this ).stop( true, false ).delay( 225 ).animate( {
								"width": "240px"
							}, 200, "linear" );
						} );

						// and when the user leaves
						$( "#sharing-bar li a" ).on( "mouseleave", function () {
							// grow the a container, slide in the div.flag
							$( this ).stop( true, false ).animate( {
								"width": "24px"
							}, 200, "linear" );

						} );

						// focus the mouse into the input for links
						$( "#sb-link a" ).on( "click", function ( event ) {
							event.preventDefault();
							$( "#mittr-url" ).select();
						} );
						$( "#sb-link a div.flag" ).on( "mouseenter", function ( event ) {
							event.preventDefault();
							$( "#mittr-url" ).select();
						} );
					}
				}
			}

		} // actionbar
	}; // MITTR.menus

	/**
	 * ----------------------------------------------------------------------
	 * [looks for links to pages that can be handled via an iframe in an overlay]
	 *
	 */
	MITTR.overlay = {

		isOpen: false,

		init: function () {
			// if this is not a mobile browser and the browser is larger than 1020, then find links that can be overlaid

			// window.postMessage is needed to communicate with the overlay.
			if ( !isMobileBrowser && window.postMessage && $( window ).width() >= 1020 ) {
				// find any links pointing to an overlay
				$( 'a[data-overlay]' ).each( function ( index ) {

					// get the type of overlay (currently only "modal" is available)
					var overlayType = $( this ).data( "overlay" );

					// get the intended href
					var overlaySrc = $( this ).attr( 'href' );

					if ( overlaySrc.indexOf( "?" ) == "-1" ) {
						overlaySrc = overlaySrc + "?" + overlayType;
					} else {
						overlaySrc = overlaySrc + "&" + overlayType;
					}

					// add the onclick
					$( this ).on( "click", function ( event ) {
						event.preventDefault();

						MITTR.overlay.open( overlaySrc );
					} );
				} ); // .each
			} // isMobileBrowser

			// IE8 and below will throw and exception here. We don't support IE8 and
			// below, so don't offer an alternative menthod, but wrap it in a try{}
			// so that it won't prevent the Livefyre stream from loading.
			try {
				// Add the window.postMessage event listener. This is needed because the overlay might not be the same origin as the parent.
				window.addEventListener( "message", function ( e ) {
					MITTR.overlay.receiveMessage( e );
				}, false );
			} catch ( e ) {}

			//MITTR.overlay.open("/login/?test=testing&modal");
		}, // init

		open: function ( theSrc ) {
			// is the overlay already open?
			if ( !MITTR.overlay.isOpen ) {
				// make sure the window width is still wide enough to handle modal overlays
				if ( $( window ).width() < 1020 ) {
					var redirectTo = theSrc.toString().replace( "?modal", "?" ).replace( "&modal", "&" );
					window.location = redirectTo;
				} else {
					//console.log(theSrc);

					// get top scroll position of the window
					var scrollPosition = $( window ).scrollTop();

					// set up the dom objects to use
					var overlayElements = '';
					overlayElements = overlayElements + '<div id="overlay-container" style="top:' + scrollPosition + 'px;">';
					overlayElements = overlayElements + '<div id="overlay-loader"></div>';
					overlayElements = overlayElements + '<div class="overlay-modal-background"></div>';
					overlayElements = overlayElements + '<iframe src="' + theSrc + '" id="overlay-modal-iframe" class="overlay-iframe" frameborder="0" scrolling="auto" allowtransparency="true" title="MIT TR Overlay - Modal"></iframe>';
					overlayElements = overlayElements + '</div>';

					$( "body" ).append( overlayElements );

					$( '#overlay-loader' ).empty();

					// load the overlay-container (show "loading...")
					$( "#overlay-container" ).stop().fadeIn( 400 );

					// fade in the iframe after it has loaded
					$( "#overlay-modal-iframe" ).load(
						function () {
							// "loading..." fade out
							$( "#overlay-loader" ).fadeOut( 300, function () {
								$( this ).remove();
							} );

							// iframe fade in
							$( "#overlay-modal-iframe" ).fadeIn( 200 );

							// fix scroll bars on parent html page
							$( "html" ).addClass( "overlay-open" );
						}
					);

					// add click to close to background
					// add the onclick
					$( ".overlay-iframe" ).on( "click", function ( event ) {
						event.preventDefault();
						MITTR.overlay.close();
					} );

					MITTR.overlay.isOpen = true;
				} // make sure window is 1020 or wider
			} // if overlay is not already open

		}, // open

		close: function () {
			if ( MITTR.overlay.isOpen ) {
				$( "html" ).removeClass( "overlay-open" );
				$( "#overlay-container" ).remove();

			}

			MITTR.overlay.isOpen = false;
		}, // close

		resize: function () {
			if ( MITTR.overlay.isOpen ) {
				// get top scroll position of the window
				var scrollPosition = $( window ).scrollTop();

				// keep the modal on top
				$( "#overlay-container" ).css( "top", scrollPosition + "px" );
			}
		}, // resize

		receiveMessage: function ( event ) {
				// Make sure the message origin is either the same as our origin or with only the protocol swapped.
				var sameOrigin = window.location.protocol + "//" + window.location.host;
				var otherOrigin = ( window.location.protocol == "http:" ? "https:" : "http:" ) + "//" + window.location.host;
				if ( event.origin != sameOrigin && event.origin != otherOrigin ) {
					return;
				}

				switch ( event.data ) {
				case 'close':
					MITTR.overlay.close();
					break;
				default:
					var widthUrlRegex = /^width=(\d+)&url=(.*)$/;
					var widthUrlMatch = widthUrlRegex.exec( event.data );
					if ( widthUrlMatch && widthUrlMatch.length == 3 ) {
						var width = parseInt( widthUrlMatch[ 1 ] );
						var url = decodeURIComponent( widthUrlMatch[ 2 ] );
						if ( $( top.window ).width() < width ) {
							window.location = url;
						}
					}
					break;
				}
			} // receiveMessage

	}; // MITTR.overlay

	/**
	 * ----------------------------------------------------------------------
	 * [protectElectronicMailAddress description]
	 * initialized on pages with an @tr email address,
	 * used to do some baseline spam bot protection
	 */
	MITTR.protectElectronicMailAddress = {

		// find all <span data-accountname="accountname" class="ElectronicMailAddress">
		init: function () {
			var baseline = "grpuabybtlerivrj pbz";
			var dhold = MITTR.protectElectronicMailAddress.reRearranger( baseline ).replace( " ", "." );

			$( '.ElectronicMailAddress' ).each( function ( index ) {

				var thelink = $( this ).data( "accountname" ) + '@' + dhold;
				$( this ).prop( "href", "mailto:" + thelink );

				// remove data prop, in case init runs again
				$( this ).removeData( "accountname" );

				// is there display text to show?
				if ( $( this ).data( "displaytext" ) !== undefined ) {
					var displayText = $( this ).data( "displaytext" );
					$( this ).append( displayText );
				} else {
					// no display text, just show the email address
					$( this ).append( thelink );
				}

			} );
		},

		reRearranger: function ( s ) {
			var b = [],
				c, i = s.length,
				a = 'a'.charCodeAt(),
				z = a + 26,
				A = 'A'.charCodeAt(),
				Z = A + 26;
			while ( i-- ) {
				c = s.charCodeAt( i );
				if ( c >= a && c < z ) {
					b[ i ] = String.fromCharCode( ( ( c - a + 13 ) % ( 26 ) ) + a );
				} else if ( c >= A && c < Z ) {
					b[ i ] = String.fromCharCode( ( ( c - A + 13 ) % ( 26 ) ) + A );
				} else {
					b[ i ] = s.charAt( i );
				}
			}
			return b.join( '' );
		}

	}; // end protectElectronicMailAddress

	/**
	 * ----------------------------------------------------------------------
	 * [formHandler description]
	 * manually initialized on pages with forms, used to set errors, clear forms, etc.
	 */
	MITTR.formHandler = {

		// add an on onfocus to all input[type="text"] fields
		init: function () {
			$( "input" ).focus( function () {
				$( this ).removeClass( "error" );
			} );
			$( "textarea" ).focus( function () {
				$( this ).removeClass( "error" );
			} );
			$( "input" ).on( "focus", function ( event ) {
				$( this ).removeAttr( 'placeholder' );
			} );
		}

	}; // end formHandler

	/**
	 * ----------------------------------------------------------------------
	 * listeners
	 */
	MITTR.listeners = {

		init: function () {
			// resize listener
			var $window = $( window );
			$window.resize( function () {

				// things that happen when the browser is resized
				MITTR.overlay.resize();

			} );
			$window.scroll( function () {
				// Also call resize when scrolling.
				// This prevents a problem that happened when someone began
				// scrolling before the paywall modal finished loading: the modal
				// wasn't in the right location, and some of the page behind it was
				// showing.
				MITTR.overlay.resize();
			} );
			$window.resize();
		},

	}; // end listeners

	/**
	 * ----------------------------------------------------------------------
	 * GENERAL FUNCTIONS
	 * can be used across other classes
	 */
	MITTR.lib = {
		// pull values out of the query string by name
		getQueryStringParameterByName: function ( name ) {
				var match = new RegExp( '[?&]' + name + '=([^&]*)' ).exec( window.location.search );
				return match && decodeURIComponent( match[ 1 ].replace( /\+/g, ' ' ) );
			} // getQueryStringParameterByName
	}; // end lib

	/**
	 * ***********************************************************************
	 * LOAD UP THE PAGE
	 */
	$( document ).ready( function () {

		// bring in the applicable inits
		MITTR.shared.ux.init();
		MITTR.menus.init();
		MITTR.overlay.init();
		MITTR.listeners.init();
		MITTR.insider.init();

	} ); // end, jquery

} )( jQuery );

// Avoid `console` errors in browsers that lack a console.
( function () {
	var method;
	var noop = function () {};
	var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
	var length = methods.length;
	var console = ( window.console = window.console || {} );

	while ( length-- ) {
		method = methods[ length ];

		// Only stub undefined methods.
		if ( !console[ method ] ) {
			console[ method ] = noop;
		}
	}
}() );;
var loadingSwiffy = {"internedStrings":[":90e0xa:66da45e:a:66Dc","::0xa:66da42p:a4j66Dc",":35k0xa:66da07e:a4j66Dc","::0xa:66da90e:a:99ga45e:a:99Ga07e:a4j66Dc","::0xa:66da90e:a:66Dc:45e:a:66da07e:a4j66Dc",":50c25ja0x80da45e:a0x80Dc",":30d65da0p0xa45e:a0p0Xc",":35k0xa:66da07e:a4j66Dc:05Q0Da:46ea49e0Da:66Da49E0Dc",":50c45ia0x60ea45e:a0x60Ec",":50c85ka0x20ca45e:a0x20Cc",":39i0ha49C0pa:66da49c0pa:86Gc",":50c25na0x0ha45e:a0x0Hc",":86m:a1Y0xa:66da7r0xa4f46Ic",":30d85ca0p20ca45e:a0p20Cc",":316e977ba48F:",":06o:a71C0xa:66da7z0xa4j46Ic",":46j:a4f46ia7b0Xa:66Da1I0Xc",":30d65ha0p40fa45e:a0p40Fc",":82h:a4f46ia7r0Xa:66Da1Y0Xc",":62i:a4f46ia7j0Xa:66Da1Q0Xc",":26e5va4f80da45e:a0h80Dc",":35k0xa:66da07e:a4j66Dc:65P0Ha:26fa09e0Ha:66Da09E0Hc",":06m:a1Q0xa:66da7j0xa4f46Ic",":99f0ha9J0pa:66da9j0pa:86Gc",":10e85ga0h20ga45e:a0h20Gc",":35k0xa:66da07e:a4j66Dc:25N0Pa:86ga9z0Pa:66Da9Z0Pc",":39k0ta49E0da:66da49e0da:46Ec",":35k0xa:66da07e:a4j66Dc:45M0Pa:86ga9r0Pa:66Da9R0Pc",":02f0pa4j26fa27d0Ha:66Da31E0Hc",":35k0xa:66da07e:a4j66Dc:05O0Pa:86ga49c0Pa:66Da49C0Pc",":66p0pa31E0ha:66da27d0ha4j26Fc",":79g0ha9R0pa:66da9r0pa:86Gc",":50c65la0x0xa45e:a0x0Xc",":30d05ca0p00da45e:a0p00Dc",":26l:a1I0xa:66da7b0xa4f46Ic",":99j0pa09E0ha:66da09e0ha:26Fc",":59f0ha9F0pa:66da9f0pa:86Gc",":50c25fa0x0ha45e:a0x0Hc",":35k0xa:66da07e:a4j66Dc:25L0Pa:86ga9f0Pa:66Da9F0Pc",":30d45ea0p0pa45e:a0p0Pc",":50c45ma0x0pa45e:a0x0Pc",":35k0xa:66da07e:a4j66Dc:85O0Pa:86ga29d0Pa:66Da29D0Pc",":19j0ha29D0pa:66da29d0pa:86Gc",":50c05ka0x00da45e:a0x00Dc",":35k0xa:66da07e:a4j66Dc:65L0Pa:86ga9j0Pa:66Da9J0Pc",":59h0ha9Z0pa:66da9z0pa:86Gc",":62g:a4j46ia7z0Xa:66Da71C0Xc"],"tags":[{"frames":[],"scenes":[{"name":"Scene 1","offset":0}],"type":23},{"bounds":[{"ymin":240,"ymax":2305,"xmin":0,"xmax":1746}],"id":1,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga:00ha45e:a:00Ha:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"id":1,"matrix":0,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":2225,"xmin":0,"xmax":1746}],"id":2,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0H20ga05g:a0H20Ga:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":2,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":2145,"xmin":0,"xmax":1746}],"id":3,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0P40fa65h:a0P40Fa:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":3,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":2065,"xmin":0,"xmax":1746}],"id":4,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X60ea25j:a0X60Ea:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":4,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1985,"xmin":0,"xmax":1746}],"id":5,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X80da25j:a0X80Da:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":5,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1905,"xmin":0,"xmax":1746}],"id":6,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X00da25j:a0X00Da:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":6,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1825,"xmin":0,"xmax":1746}],"id":7,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X20ca25j:a0X20Ca:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":7,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1745,"xmin":0,"xmax":1746}],"id":8,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X0xa25j:a0X0Xa:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":8,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1665,"xmin":0,"xmax":1746}],"id":9,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X0pa25j:a0X0Pa:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":9,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1585,"xmin":0,"xmax":1746}],"id":10,"fillstyles":[{"color":[-1],"type":1}],"paths":[{"fill":0,"data":["::0xa:66da90e:a:99ga0X0ha25j:a0X0Ha:99Ga07e:a4j66Dc"]}],"flat":true,"type":1},{"replace":true,"id":10,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":11,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#11"]}],"type":1},{"replace":true,"id":11,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":12,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#40"]}],"type":1},{"replace":true,"id":12,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":13,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#32"]}],"type":1},{"replace":true,"id":13,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":14,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#9"]}],"type":1},{"replace":true,"id":14,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":15,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#43"]}],"type":1},{"replace":true,"id":15,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":16,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#5"]}],"type":1},{"replace":true,"id":16,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":17,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#8"]}],"type":1},{"replace":true,"id":17,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":18,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#17"]}],"type":1},{"replace":true,"id":18,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":19,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#24"]}],"type":1},{"replace":true,"id":19,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":20,"fillstyles":[{"color":[-1],"type":1},{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e06ga:99ga45e:a:99Gc"]},{"fill":2,"data":[":90e05ga:00ha45e:a:00Hc"]}],"type":1},{"replace":true,"id":20,"type":3,"depth":5},{"type":2},{"type":2},{"type":4,"depth":5},{"bounds":[{"ymin":240,"ymax":1425,"xmin":0,"xmax":1746}],"id":21,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0H20ga05g:a0H20Gc"]}],"type":1},{"id":21,"matrix":0,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":1345,"xmin":0,"xmax":1746}],"id":22,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0P40fa65h:a0P40Fc"]}],"type":1},{"replace":true,"id":22,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":1265,"xmin":0,"xmax":1746}],"id":23,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X60ea25j:a0X60Ec"]}],"type":1},{"replace":true,"id":23,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":1185,"xmin":0,"xmax":1746}],"id":24,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X80da25j:a0X80Dc"]}],"type":1},{"replace":true,"id":24,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":1105,"xmin":0,"xmax":1746}],"id":25,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X00da25j:a0X00Dc"]}],"type":1},{"replace":true,"id":25,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":1025,"xmin":0,"xmax":1746}],"id":26,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X20ca25j:a0X20Cc"]}],"type":1},{"replace":true,"id":26,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":945,"xmin":0,"xmax":1746}],"id":27,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X0xa25j:a0X0Xc"]}],"type":1},{"replace":true,"id":27,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":865,"xmin":0,"xmax":1746}],"id":28,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X0pa25j:a0X0Pc"]}],"type":1},{"replace":true,"id":28,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":785,"xmin":0,"xmax":1746}],"id":29,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":[":90e05ga0X0ha25j:a0X0Hc"]}],"type":1},{"replace":true,"id":29,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":30,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#37"]}],"type":1},{"replace":true,"id":30,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":31,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#39"]}],"type":1},{"replace":true,"id":31,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":32,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#6"]}],"type":1},{"replace":true,"id":32,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":33,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#13"]}],"type":1},{"replace":true,"id":33,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":34,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#33"]}],"type":1},{"replace":true,"id":34,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":225,"ymax":706,"xmin":0,"xmax":1746}],"id":35,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#4"]},{"fill":2,"data":["#20"]}],"type":1},{"replace":true,"id":35,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":36,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#4"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":36,"type":3,"depth":4},{"type":2},{"type":4,"depth":4},{"bounds":[{"ymin":200,"ymax":2987,"xmin":41,"xmax":5326}],"id":37,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"data":["#14"],"line":0},{"fill":0,"data":["#0"]},{"fill":1,"data":["#7"]},{"fill":2,"data":["#0"]}],"linestyles":[{"color":[-1],"width":[20]}],"type":1},{"id":37,"matrix":0,"type":3,"depth":5},{"type":2},{"type":4,"depth":5},{"bounds":[{"ymin":160,"ymax":786,"xmin":81,"xmax":1746}],"id":38,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#21"]},{"fill":2,"data":["#0"]}],"type":1},{"id":38,"matrix":0,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":161,"xmax":1746}],"id":39,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#41"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":39,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":241,"xmax":1746}],"id":40,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#29"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":40,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":321,"xmax":1746}],"id":41,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#25"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":41,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":401,"xmax":1746}],"id":42,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#27"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":42,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":481,"xmax":1746}],"id":43,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#44"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":43,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":521,"xmax":1746}],"id":44,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#38"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":44,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":45,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#36"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":45,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":46,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#23"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":46,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":47,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#31"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":47,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":48,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#45"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":48,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":49,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#10"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":49,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":50,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#42"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":50,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1746}],"id":51,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#35"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":51,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":200,"ymax":746,"xmin":590,"xmax":1746}],"id":52,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#26"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":52,"type":3,"depth":4},{"type":2},{"type":4,"depth":4},{"bounds":[{"ymin":240,"ymax":706,"xmin":590,"xmax":1746}],"id":53,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#0"]}],"type":1},{"id":53,"matrix":0,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1666}],"id":54,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#30"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":54,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1506}],"id":55,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#15"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":55,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1386}],"id":56,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#12"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":56,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1306}],"id":57,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#22"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":57,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1226}],"id":58,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#34"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":58,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1137}],"id":59,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#16"]},{"fill":0,"data":["#0"]}],"type":1},{"replace":true,"id":59,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":60,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#19"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":60,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":61,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#18"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":61,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":62,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#46"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":62,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1135}],"id":63,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#28"]},{"fill":0,"data":["#0"]}],"type":1},{"replace":true,"id":63,"type":3,"depth":3},{"type":2},{"type":4,"depth":3},{"bounds":[{"ymin":240,"ymax":706,"xmin":590,"xmax":1135}],"id":64,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#0"]}],"type":1},{"id":64,"matrix":0,"type":3,"depth":2},{"type":2},{"type":2},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":590,"xmax":1135}],"id":65,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#0"]}],"type":1},{"replace":true,"id":65,"type":3,"depth":2},{"type":2},{"type":4,"depth":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1135}],"id":66,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#28"]},{"fill":0,"data":["#0"]}],"type":1},{"id":66,"matrix":0,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":67,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#46"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":67,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":68,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#18"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":68,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1135}],"id":69,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#19"]},{"fill":1,"data":["#0"]}],"type":1},{"replace":true,"id":69,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1137}],"id":70,"fillstyles":[{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":0,"data":["#16"]},{"fill":0,"data":["#0"]}],"type":1},{"replace":true,"id":70,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1226}],"id":71,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#34"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":71,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1306}],"id":72,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#22"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":72,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1386}],"id":73,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#12"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":73,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":0,"ymax":946,"xmin":590,"xmax":1506}],"id":74,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#15"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":74,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1666}],"id":75,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#30"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":75,"type":3,"depth":3},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":590,"xmax":1746}],"id":76,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":76,"type":3,"depth":3},{"type":2},{"type":4,"depth":3},{"bounds":[{"ymin":200,"ymax":746,"xmin":590,"xmax":1746}],"id":77,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#26"]},{"fill":2,"data":["#0"]}],"type":1},{"id":77,"matrix":0,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":590,"xmax":1746}],"id":78,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#35"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":78,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":79,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#42"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":79,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":80,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#10"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":80,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":81,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#45"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":81,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":82,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#31"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":82,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":83,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#23"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":83,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":590,"xmax":1746}],"id":84,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#2"]},{"fill":2,"data":["#36"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":84,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":521,"xmax":1746}],"id":85,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#38"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":85,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":481,"xmax":1746}],"id":86,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#44"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":86,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":401,"xmax":1746}],"id":87,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#27"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":87,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":321,"xmax":1746}],"id":88,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#25"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":88,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":241,"xmax":1746}],"id":89,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#29"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":89,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":80,"ymax":866,"xmin":161,"xmax":1746}],"id":90,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#41"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":90,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":160,"ymax":786,"xmin":81,"xmax":1746}],"id":91,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#21"]},{"fill":2,"data":["#0"]}],"type":1},{"replace":true,"id":91,"type":3,"depth":4},{"type":2},{"type":4,"depth":4},{"bounds":[{"ymin":200,"ymax":2987,"xmin":41,"xmax":5326}],"id":92,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"data":["#14"],"line":0},{"fill":0,"data":["#0"]},{"fill":1,"data":["#7"]},{"fill":2,"data":["#0"]}],"linestyles":[{"color":[-1],"width":[20]}],"type":1},{"id":92,"matrix":0,"type":3,"depth":5},{"type":2},{"type":4,"depth":5},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":93,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#4"]},{"fill":2,"data":["#0"]}],"type":1},{"id":93,"matrix":0,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":225,"ymax":706,"xmin":0,"xmax":1746}],"id":94,"fillstyles":[{"color":[-14475488],"type":1},{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#0"]},{"fill":1,"data":["#4"]},{"fill":2,"data":["#20"]}],"type":1},{"replace":true,"id":94,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":95,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#33"]}],"type":1},{"replace":true,"id":95,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":96,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#13"]}],"type":1},{"replace":true,"id":96,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":97,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#6"]}],"type":1},{"replace":true,"id":97,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":98,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#39"]}],"type":1},{"replace":true,"id":98,"type":3,"depth":4},{"type":2},{"bounds":[{"ymin":240,"ymax":706,"xmin":0,"xmax":1746}],"id":99,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#1"]},{"fill":1,"data":["#37"]}],"type":1},{"replace":true,"id":99,"type":3,"depth":4},{"type":2},{"replace":true,"id":29,"type":3,"depth":4},{"type":2},{"replace":true,"id":28,"type":3,"depth":4},{"type":2},{"replace":true,"id":27,"type":3,"depth":4},{"type":2},{"replace":true,"id":26,"type":3,"depth":4},{"type":2},{"replace":true,"id":25,"type":3,"depth":4},{"type":2},{"replace":true,"id":24,"type":3,"depth":4},{"type":2},{"replace":true,"id":23,"type":3,"depth":4},{"type":2},{"replace":true,"id":22,"type":3,"depth":4},{"type":2},{"replace":true,"id":21,"type":3,"depth":4},{"type":2},{"type":4,"depth":4},{"id":20,"matrix":0,"type":3,"depth":5},{"type":2},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":100,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#24"]}],"type":1},{"replace":true,"id":100,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":101,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#17"]}],"type":1},{"replace":true,"id":101,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":102,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#8"]}],"type":1},{"replace":true,"id":102,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":103,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#5"]}],"type":1},{"replace":true,"id":103,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":104,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#43"]}],"type":1},{"replace":true,"id":104,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":105,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#9"]}],"type":1},{"replace":true,"id":105,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":106,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#32"]}],"type":1},{"replace":true,"id":106,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":107,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#40"]}],"type":1},{"replace":true,"id":107,"type":3,"depth":5},{"type":2},{"bounds":[{"ymin":240,"ymax":1505,"xmin":0,"xmax":1746}],"id":108,"fillstyles":[{"color":[-1],"type":1},{"color":[-2680790],"type":1}],"paths":[{"fill":0,"data":["#3"]},{"fill":1,"data":["#11"]}],"type":1},{"replace":true,"id":108,"type":3,"depth":5},{"type":2},{"replace":true,"id":10,"type":3,"depth":5},{"type":2},{"replace":true,"id":9,"type":3,"depth":5},{"type":2},{"replace":true,"id":8,"type":3,"depth":5},{"type":2},{"replace":true,"id":7,"type":3,"depth":5},{"type":2},{"replace":true,"id":6,"type":3,"depth":5},{"type":2},{"replace":true,"id":5,"type":3,"depth":5},{"type":2},{"replace":true,"id":4,"type":3,"depth":5},{"type":2},{"replace":true,"id":3,"type":3,"depth":5},{"type":2},{"replace":true,"id":2,"type":3,"depth":5},{"type":2},{"replace":true,"id":1,"type":3,"depth":5},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2},{"type":2}],"fileSize":2670,"v":"5.3.0","backgroundColor":-1,"frameSize":{"ymin":0,"ymax":2305,"xmin":0,"xmax":1746},"frameCount":143,"frameRate":36,"version":10};
;
