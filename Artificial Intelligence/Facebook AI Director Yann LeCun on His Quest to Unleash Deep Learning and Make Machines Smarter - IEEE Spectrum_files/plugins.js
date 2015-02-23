// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/

window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

/*
The Sparkbox custom select plugin.. CAUTION: THIS CONTAINS MODS
Line 48:  toggleClass('off') on sb-select
Line 100: $('.sb-select').attr('class','sb-select off');
Line 105: the targetHideDropdown function is new to allow click on custom "select" to close

 */
(function($) {
    var selectboxCounter = 0;

    $.fn.sbCustomSelect = function(options) {
        var iOS = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)),
            android = (navigator.userAgent.match(/Android/i)),
            UP = 38, DOWN = 40, SPACE = 32, RETURN = 13, TAB = 9,
            matchString = '',
            settings = $.extend({
                appendTo: false
            }, options);

        // Sync custom display with original select box and set selected class and the correct <li>
        var updateSelect = function() {
            var $this = $(this),
                $dropdown = $('.sb-dropdown[data-id=' + $this.parent().data('id') + ']'),
                $sbSelect = $this.siblings('.sb-select');

            if (this.selectedIndex != -1) {
                $sbSelect.val(this[this.selectedIndex].innerHTML).toggleClass('off');

                $dropdown.children().removeClass('selected')
                    .filter(':contains(' + this[this.selectedIndex].innerHTML + ')').addClass('selected');
            }
        };

        // Update original select box, hide <ul>, and fire change event to keep everything in sync
        var dropdownSelection = function(e) {
            var $target = $(e.target),
                id = $target.closest('ul').attr('data-id'),
                $option = $('.sb-custom[data-id=' + id + ']').find('option').filter('[value="' + $target.parent().data('value') + '"]');

            e.preventDefault();


            $option[0].selected = true;
            $target.closest('ul').fadeOut('fast');
            $option.parent().trigger('change');
        };

        // Create the <ul> that will be used to change the selection on a non iOS/Android browser
        var createDropdown = function($select, i) { 
            var $options = $select.children(),
                $dropdown = $('<ul data-id="' + i + '" class="sb-dropdown"/>');

            $options.each(function() {
                $this = $(this);
                $dropdown.append('<li data-value="' + $this.val() + '"><a href=".">' + $this.text() + '</a></li>');
            });
            $dropdown.bind('click', dropdownSelection);

            return $dropdown;
        };

        // Clear keystroke matching string and show dropdown
        var viewList = function(e) {
            var $this = $(this),
                id = $this.data('id');

            clearKeyStrokes();

            $('.sb-dropdown').filter('[data-id!=' + id + ']').fadeOut('fast');
            $('.sb-dropdown').filter('[data-id=' + id + ']').fadeIn('fast');

            e.preventDefault();
        };

        // Hide the custom dropdown
        var hideDropdown = function(e) {
            if (!$(e.target).closest('.sb-custom').length) {
                $('.sb-dropdown').fadeOut('fast');
                $('.sb-select').attr('class','sb-select off'); // Custom!
            }
        };

        // Gotcha! This function is a customization
        var targetHideDropdown = function(target){

            if(!$(this).hasClass('off')){
                $(this).prev('.sb-dropdown').fadeOut('fast');
            }else{

            }
            $(this).toggleClass('off');
            return false;
        };

        // Manage keypress to replicate browser functionality
        var selectKeypress = function(e) {
            var $this = $(this),
                $current = $('.sb-dropdown[data-id=' + $this.data('id') + ']').find('.selected');


            // if ($('.sb-dropdown[data-id=' + $this.data('id') + ']').find('.selected') || $('.sb-dropdown[data-id=' + $this.data('id') + ']');
            // $this.siblings('ul').find('.selected');

            if ((e.keyCode == UP || e.keyCode == DOWN || e.keyCode == SPACE) && $current.is(':hidden')) {
                $current.focus();
                return;
            }

            if (e.keyCode == UP && $current.prev().length) {
                e.preventDefault();
                $current.removeClass('selected');
                $current.prev().addClass('selected');
            } else if (e.keyCode == DOWN && $current.next().length) {
                e.preventDefault();
                $current.removeClass('selected');
                $current.next().addClass('selected');
            }

            if (e.keyCode == RETURN || e.keyCode == SPACE) {
                $current.trigger('click');
                return;
            }

            if (e.keyCode >= 48 && e.keyCode <= 90) {
                matchString += String.fromCharCode(e.keyCode);
                checkforMatch(e);
            }

            if (e.keyCode == TAB && $current.is(':visible')) {
                e.preventDefault();
                $current.trigger('click');
                hideDropdown(e);
            }
        };

        // Check keys pressed to see if there is a text match with one of the options
        var checkforMatch = function(e) {

            var re = '/' + matchString + '.*/';

            $(e.target).siblings('ul').find('a').each(function() {
                if (this.innerHTML.toUpperCase().indexOf(matchString) === 0) {
                    $(this).trigger('click');
                    return;
                }
            });
        };

        // Clear the string used for matching keystrokes to select options
        var clearKeyStrokes = function() {
            matchString = '';
        };



        /* jQuery Plugin Loop
         *
         * Take the select box out of the tab order.
         *
         * Add the field that will show the currently selected item and attach the change event to update the .sb-select input.
         *
         * If this is iOS or Android then we want to use the browsers standard UI controls. Set the opacity of the select to 0
         * and lay it over our custom display of the current value.
         * Otherwise, we're going to create a custom <ul> for the dropdown
         *
         * After all of the setup is complete, trigger the change event on the original select box to update the .sb-select input
         */
        this.each(function() { 
            var $self = $(this);

            $self.attr('tabindex', -1)
                .wrap('<div data-id="' + selectboxCounter + '" class="sb-custom"/>')
                .after('<mark class="sb-sprite"/>')
                .after('<input data-id="' + selectboxCounter + '" type="text" class="sb-select" readonly="readonly"  />')
                .bind('change', updateSelect);

            var textInput = $self.next('input');


            if (iOS || android) {
                $self.show().css({
                    'display': 'block',
                    'height': $self.next().innerHeight(),
                    'opacity': 0,
                    'position': 'absolute',
                    'width': '100%',
                    'z-index': 5000
                });
            } else {

                $self.next().bind('click', viewList);

                if (!settings.appendTo) {
                    $self.after(createDropdown($self, selectboxCounter));
                    textInput.css({'width': '142px'}); //textInput.parent().width()
                } else {
                    var offset = $self.parent().offset();

                    $(settings.appendTo).append(createDropdown($self, selectboxCounter).css({
                        'top': parseInt(offset.top),
                        'left': parseInt(offset.left),
                        'width': $self.parent().width() * 0.8
                    }));
                }
            }

            $self.trigger('change');
            selectboxCounter++;
        });

        // Hide dropdown when click is outside of the input or dropdown
        $(document).bind('click', hideDropdown);

        $('.sb-custom').find('.sb-select').live('keydown', selectKeypress).live('click', targetHideDropdown); // Gotcha, the second .live is custom!
        $('.sb-custom').bind('blur', clearKeyStrokes);
        $(document).delegate('.sb-dropdown', 'focus', viewList);

        return this;
    };
})(jQuery);


/*
 Watermark v3.1.3 (March 22, 2011) plugin for jQuery
 http://jquery-watermark.googlecode.com/
 Copyright (c) 2009-2011 Todd Northrop
 http://www.speednet.biz/
 Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function(a,h,y){var w="function",v="password",j="maxLength",n="type",b="",c=true,u="placeholder",i=false,t="watermark",g=t,f="watermarkClass",q="watermarkFocus",l="watermarkSubmit",o="watermarkMaxLength",e="watermarkPassword",d="watermarkText",k=/\r/g,s="input:data("+g+"),textarea:data("+g+")",m="input:text,input:password,input[type=search],input:not([type]),textarea",p=["Page_ClientValidate"],r=i,x=u in document.createElement("input");a.watermark=a.watermark||{version:"3.1.3",runOnce:c,options:{className:t,useNative:c,hideBeforeUnload:c},hide:function(b){a(b).filter(s).each(function(){a.watermark._hide(a(this))})},_hide:function(a,r){var p=a[0],q=(p.value||b).replace(k,b),l=a.data(d)||b,m=a.data(o)||0,i=a.data(f);if(l.length&&q==l){p.value=b;if(a.data(e))if((a.attr(n)||b)==="text"){var g=a.data(e)||[],c=a.parent()||[];if(g.length&&c.length){c[0].removeChild(a[0]);c[0].appendChild(g[0]);a=g}}if(m){a.attr(j,m);a.removeData(o)}if(r){a.attr("autocomplete","off");h.setTimeout(function(){a.select()},1)}}i&&a.removeClass(i)},show:function(b){a(b).filter(s).each(function(){a.watermark._show(a(this))})},_show:function(g){var p=g[0],u=(p.value||b).replace(k,b),h=g.data(d)||b,s=g.attr(n)||b,t=g.data(f);if((u.length==0||u==h)&&!g.data(q)){r=c;if(g.data(e))if(s===v){var m=g.data(e)||[],l=g.parent()||[];if(m.length&&l.length){l[0].removeChild(g[0]);l[0].appendChild(m[0]);g=m;g.attr(j,h.length);p=g[0]}}if(s==="text"||s==="search"){var i=g.attr(j)||0;if(i>0&&h.length>i){g.data(o,i);g.attr(j,h.length)}}t&&g.addClass(t);p.value=h}else a.watermark._hide(g)},hideAll:function(){if(r){a.watermark.hide(m);r=i}},showAll:function(){a.watermark.show(m)}};a.fn.watermark=a.fn.watermark||function(p,o){var t="string";if(!this.length)return this;var s=i,r=typeof p===t;if(r)p=p.replace(k,b);if(typeof o==="object"){s=typeof o.className===t;o=a.extend({},a.watermark.options,o)}else if(typeof o===t){s=c;o=a.extend({},a.watermark.options,{className:o})}else o=a.watermark.options;if(typeof o.useNative!==w)o.useNative=o.useNative?function(){return c}:function(){return i};return this.each(function(){var B="dragleave",A="dragenter",z=this,i=a(z);if(!i.is(m))return;if(i.data(g)){if(r||s){a.watermark._hide(i);r&&i.data(d,p);s&&i.data(f,o.className)}}else{if(x&&o.useNative.call(z,i)&&(i.attr("tagName")||b)!=="TEXTAREA"){r&&i.attr(u,p);return}i.data(d,r?p:b);i.data(f,o.className);i.data(g,1);if((i.attr(n)||b)===v){var C=i.wrap("<span>").parent(),t=a(C.html().replace(/type=["']?password["']?/i,'type="text"'));t.data(d,i.data(d));t.data(f,i.data(f));t.data(g,1);t.attr(j,p.length);t.focus(function(){a.watermark._hide(t,c)}).bind(A,function(){a.watermark._hide(t)}).bind("dragend",function(){h.setTimeout(function(){t.blur()},1)});i.blur(function(){a.watermark._show(i)}).bind(B,function(){a.watermark._show(i)});t.data(e,i);i.data(e,t)}else i.focus(function(){i.data(q,1);a.watermark._hide(i,c)}).blur(function(){i.data(q,0);a.watermark._show(i)}).bind(A,function(){a.watermark._hide(i)}).bind(B,function(){a.watermark._show(i)}).bind("dragend",function(){h.setTimeout(function(){a.watermark._show(i)},1)}).bind("drop",function(e){var c=i[0],a=e.originalEvent.dataTransfer.getData("Text");if((c.value||b).replace(k,b).replace(a,b)===i.data(d))c.value=a;i.focus()});if(z.form){var w=z.form,y=a(w);if(!y.data(l)){y.submit(a.watermark.hideAll);if(w.submit){y.data(l,w.submit);w.submit=function(c,b){return function(){var d=b.data(l);a.watermark.hideAll();if(d.apply)d.apply(c,Array.prototype.slice.call(arguments));else d()}}(w,y)}else{y.data(l,1);w.submit=function(b){return function(){a.watermark.hideAll();delete b.submit;b.submit()}}(w)}}}}a.watermark._show(i)})};if(a.watermark.runOnce){a.watermark.runOnce=i;a.extend(a.expr[":"],{data:function(c,d,b){return!!a.data(c,b[3])}});(function(c){a.fn.val=function(){var e=this;if(!e.length)return arguments.length?e:y;if(!arguments.length)if(e.data(g)){var f=(e[0].value||b).replace(k,b);return f===(e.data(d)||b)?b:f}else return c.apply(e,arguments);else{c.apply(e,arguments);a.watermark.show(e);return e}}})(a.fn.val);p.length&&a(function(){for(var b,c,d=p.length-1;d>=0;d--){b=p[d];c=h[b];if(typeof c===w)h[b]=function(b){return function(){a.watermark.hideAll();return b.apply(null,Array.prototype.slice.call(arguments))}}(c)}});a(h).bind("beforeunload",function(){a.watermark.options.hideBeforeUnload&&a.watermark.hideAll()})}})(jQuery,window);
