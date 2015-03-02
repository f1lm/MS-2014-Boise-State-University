(function($){
	/* hoverIntent by Brian Cherne */
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
	
})(jQuery);;
/*
 * jQuery MegaMenu v1.1
 * http://megamenu.megadrupal.com/
 *
 * Copyright 2013 MegaDrupal
 */

(function($){

    $(window).resize(function () {
        $('.mdmegamenu').each(function() {
            var self = $(this),
                menuWidth = self.outerWidth(true);
            var fullwidth = self.width();
            if (self.hasClass("md-vertical")) {  // vertical menu
                // Right to left
                if (self.hasClass("md-vertical-rtl")) {
                    var ulwidth = $('> ul', self).width();
                    var ulright = ($(window).width() - ($('> ul', self).offset().left + $('> ul', self).outerWidth()));
                    fullwidth = $(window).width() - ulwidth - ulright - 20;
                    if (fullwidth > 960) fullwidth = 960 - ulwidth;
                    $('div.mm-customwidth', self).each(function() {
                        var thiswidth = parseInt($(this).data("width"));
                        if(fullwidth < thiswidth) {
                            $(this).addClass('mm-fullwidth');
                        } else {
                            $(this).width(thiswidth);
                            $(this).removeClass('mm-fullwidth');
                        }
                    });
                    if(ulwidth > ($(window).width() - ulright - 20) / 2) {
                        $('.mm-container', self).each(function() {
                            var parent = $(this).parent();
                            $(this).css({top: parent.height(), left: 0});
                            if($(this).hasClass("mm-fullwidth"))
                                $(this).width(self.width());
                        });
                    } else {
                        $('div.mm-fullwidth', self).width(fullwidth);
                    }
                } else {
                    // Left to right
                    var ulwidth = $('> ul', self).width();
                    var ulleft = $('> ul', self).offset().left;
                    fullwidth = $(window).width() - ulwidth - ulleft - 20;
                    if (fullwidth > 960) fullwidth = 960 - ulwidth;
                    $('div.mm-customwidth', self).each(function() {
                        var thiswidth = parseInt($(this).data("width"));
                        if(fullwidth < thiswidth) {
                            $(this).addClass('mm-fullwidth');
                        } else {
                            $(this).width(thiswidth);
                            $(this).removeClass('mm-fullwidth');
                        }
                    });
                    if(ulwidth > ($(window).width() - ulleft - 20) / 2) {
                        $('.mm-container', self).each(function() {
                            var parent = $(this).parent();
                            $(this).css({top: parent.height(), left: 0});
                            if($(this).hasClass("mm-fullwidth"))
                                $(this).width(self.width());
                        });
                    } else {
                        $('div.mm-fullwidth', self).width(fullwidth);
                    }
                }

            } else {
                if(self.hasClass('mm-fixed-bottom')) {
                    _tmpheight = self.outerHeight() - parseInt(self.css('borderTopWidth')) - parseInt(self.css('borderBottomWidth'));
                    $('> ul > li', self).each(function() {
                        $("> .mm-container", $(this)).css('bottom', _tmpheight);
                    });
                } else {
                    $('> ul > li', self).each(function() {
                        $("> .mm-container", $(this)).css('top', $(this).height() + $(this).position().top);
                    });
                }
                $('div.mm-customwidth', self).each(function() {
                    var thiswidth = parseInt($(this).data("width"));
                    /*if(fullwidth < thiswidth) {
                        $(this).css({'left': 0, 'width': '100%'});
                        $(this).addClass('mm-fullwidth');
                    } else {*/
                        $(this).width(thiswidth);
                        $(this).removeClass('mm-fullwidth');
                    //}
                    var position = $(this).parent("li").position(),
                        parentLeft = position.left,
                        thisWidth = $(this).width(),
                        thisRight = parentLeft + thisWidth;
                    if (self.hasClass('mm-fixed-bottom') || self.hasClass('mm-fixed-top')) {
                        menuWidth = menuWidth * 2;
                    }
                    if(thisRight > menuWidth) {
                        mainSubLeft = menuWidth - thisWidth;
                        if($.browser.msie) {
                            if ((parseInt($.browser.version, 10) == 7) || (parseInt($.browser.version, 10) == 8) || (parseInt($.browser.version, 10) == 9))
                                 mainSubLeft = menuWidth - thisWidth + 5;
                        }
                        $(this).css('left', mainSubLeft);
                    } else {
                        $(this).css('left', parentLeft);
                    }
                });
                $(".mm-dropdown", self).each(function() {
                    $(this).children('.mm-container').css('left', $(this).position().left);
                });
            }



            $("div.mm-sub", self).each(function() {
                var cols = $(this).children(".background-color").not(".mmg_12");
                $(cols).each(function() {
                    var col = $(this),
                        _height = 0,
                        mmcontainer = col.parents(".mm-container");

                    mmcontainer.show();
                    _height = col.parent().height();
                    if(_height > 0) {
                        col.height(_height);
                    }
                    mmcontainer.hide();
                });
            });
        });
    });

    $.fn.megadrupalMenu = function(options){
        function megaOver(){
            megaAction(this);
        }
        function megaOut(){
            megaActionClose(this);
        }

        function megaReset(megaMenu){
            $('li', megaMenu).removeClass('mm-hover');
            $('.mm-container', megaMenu).hide();
        }
        function megaAction(obj){
            var $dropDown = $('> .mm-container', obj);
            $(obj).parents(".mdmegamenu").find(".mm-container").not($(obj).parents(".mm-container")).hide();
            $(obj).addClass('mm-hover');
            if ($dropDown.length > 0 && $dropDown.is(':hidden') == false) return;
            if($dropDown.is(':hidden')) {
                switch(opts.effects.effectTypeOpen)
                {
                    case 'slide':
                        $dropDown.stop(true, true).delay(opts.timeBeforeOpening).slideDown(opts.effects.effectSpeedOpen, opts.effects.effectOpen);
                        break;
                    case 'fade':
                        $dropDown.stop(true, true).delay(opts.timeBeforeOpening).fadeIn(opts.effects.effectSpeedOpen, opts.effects.effectOpen);
                        break;
                    default :
                        $dropDown.stop(true, true).delay(opts.timeBeforeOpening).show();
                }
            }
        }
        function megaActionClose(obj){
            var $dropDown = $('> .mm-container', obj);
            if($dropDown.length > 0 && $dropDown.is(':hidden') == false) {
                switch(opts.effects.effectTypeClose)
                {
                    case 'slide':
                        $dropDown.stop(true, true).delay(opts.timeBeforeClosing).slideUp(opts.effects.effectSpeedClose, opts.effects.effectClose, function(){$(obj).removeClass('mm-hover');});
                        break;
                    case 'fade':
                        $dropDown.stop(true, true).delay(opts.timeBeforeClosing).fadeOut(opts.effects.effectSpeedClose, opts.effects.effectClose, function(){$(obj).removeClass('mm-hover');});
                        break;
                    default :
                        $dropDown.stop(true, true).delay(opts.timeBeforeClosing).hide();
                        $(obj).removeClass('mm-hover');
                }
            }
            else {
                $(obj).removeClass('mm-hover');
            }
        }

        var opts = $.extend({
            effects : {
                effectSpeedOpen : 300,
                effectSpeedClose : 200,
                effectTypeOpen : 'slide',
                effectTypeClose : 'slide',
                effectOpen : 'linear',
                effectClose : 'linear'
            },
            timeBeforeOpening : 100,
            timeBeforeClosing : 200,
            trigger : "hover-intent",
            arrow: false,
            vertical: false,
            verticalDirection: "ltr", // ltr and rtl, default is ltr
            subAlign: "middle"
        }, options);
        //Mobile - iOS
        var deviceAgent = navigator.userAgent.toLowerCase();
        var is_Mobile = deviceAgent.match(/(iphone|ipod|ipad|android|"windows phone")/);

        return this.each(function() {
            var megaMenu = $(this),
                megaMenuWrap = megaMenu.parent(),
                menuItem = $("li.mm-parent", megaMenu);

            if (megaMenuWrap.hasClass('mm-fixed-bottom') || megaMenuWrap.hasClass('mm-fixed-top')){
                $('.mm-toggle', megaMenuWrap).click(function(){
                    $(this).toggleClass('mm-toggle-show');
                    megaMenuWrap.toggleClass('mm-toggle-hide');
                    $('> ul', megaMenuWrap).slideToggle();
                    return false;
                })
            }


            menuItem.each(function() {
                var self = $(this);
                if(opts.arrow) {
                    $("> a", self).addClass('with-arrow').append('<span class="mm-arrow"></span>');
                }

                if (opts.vertical) {
                    if(opts.subAlign == "middle") {
                        var position = self.position(),
                            parentTop = position.top,
                            parentHeight = self.height(),
                            mainSub = $('> .mm-container', this),
                            mainSubHeight = mainSub.height(),
                            mainSubTop = (mainSubHeight/2 - parentHeight/2);
                        if(parentTop > mainSubTop)
                            mainSub.css('top', -mainSubTop);
                        else {
                            mainSub.css('top', -parentTop);
                        }
                    }
                }
            });
            /* Actions on parents links */
            if(opts.trigger === "hover") {
                menuItem.hover(megaOver, megaOut);
            } else if(opts.trigger === "click") {
                $('body').mouseup(function(e){
                    if(!$(e.target).parents('.mm-hover').length){
                        megaReset(megaMenu);
                    }
                });

                $('> a', menuItem).click(function(e){
                    var $parentLi = $(this).parent();
                    if(!$parentLi.hasClass('mm-hover')){
                        megaAction($parentLi);
                        e.preventDefault();
                    }
                });
            } else {
                var config = {
                    sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
                    interval: 100, // number = milliseconds for onMouseOver polling interval
                    over: megaOver, // function = onMouseOver callback (REQUIRED)
                    timeout: 400, // number = milliseconds delay before onMouseOut
                    out: megaOut // function = onMouseOut callback (REQUIRED)
                };
                menuItem.hoverIntent(config);
            }

            if (is_Mobile) {
                var text_arrow = "&darr;";
                if (opts.vertical) text_arrow = "&rarr;";
                $('<span class="mm-close">&times;</span>').appendTo($("> li.mm-parent > a", megaMenu)).hide().click(function(e) {
                    e.preventDefault();
                    "open" == $(this).attr("data-mega-status") ? (megaActionClose($(this).parents("li.mm-parent")[0]), $(this).html(text_arrow).attr("data-mega-status", "closed")) : (megaAction($(this).parents("li.mm-parent")[0]), $(this).html("&times;").attr("data-mega-status", "open"));
                    return false;
                });
                $("> li.mm-parent", megaMenu).hover(function(e){
                    e.preventDefault();
                    $(this).find(".mm-close").html("&times;").attr("data-mega-status", "open").show();
                    $(this).find(".mm-arrow").hide();
                }, function(e){
                    $(this).find(".mm-close").hide();
                    $(this).find(".mm-arrow").show();
                });
            }
            $(window).resize();
        });
    };
})(jQuery);;
/*!
 * SelectNav.js (v. 0.1)
 * Converts your <ul>/<ol> navigation into a dropdown list for small screens
 */window.selectnav=function(){"use strict";var a=function(a,b){function l(a){var b;a||(a=window.event),a.target?b=a.target:a.srcElement&&(b=a.srcElement),b.nodeType===3&&(b=b.parentNode),b.value&&(window.location.href=b.value)}function m(a){var b=a.nodeName.toLowerCase();return b==="ul"||b==="ol"}function n(a){for(var b=1;document.getElementById("selectnav"+b);b++);return a?"selectnav"+b:"selectnav"+(b-1)}function o(a){i++;var b=a.children.length,c="",k="",l=i-1;if(!b)return;if(l){while(l--)k+=g;k+=" "}for(var p=0;p<b;p++){var q=a.children[p].children[0],r=q.innerText||q.textContent,s="";d&&(s=q.className.search(d)!==-1||q.parentElement.className.search(d)!==-1?j:""),e&&!s&&(s=q.href===document.URL?j:""),c+='<option value="'+q.href+'" '+s+">"+k+r+"</option>";if(f){var t=a.children[p].children[1];t&&m(t)&&(c+=o(t))}}return i===1&&h&&(c='<option value="">'+h+"</option>"+c),i===1&&(c='<select class="selectnav" id="'+n(!0)+'">'+c+"</select>"),i--,c}a=document.getElementById(a);if(!a)return;if(!m(a))return;document.documentElement.className+=" js";var c=b||{},d=c.activeclass||"active",e=typeof c.autoselect=="boolean"?c.autoselect:!0,f=typeof c.nested=="boolean"?c.nested:!0,g=c.indent||"→",h=c.label||"- Navigation -",i=0,j=" selected ";a.insertAdjacentHTML("afterend",o(a));var k=document.getElementById(n());return k.addEventListener&&k.addEventListener("change",l),k.attachEvent&&k.attachEvent("onchange",l),k};return function(b,c){a(b,c)}}();;
