if(typeof Object.create!=='function'){Object.create=function(a){function F(){};F.prototype=a;return new F()}};

/*==========================================================================
 * AvertaContentSlider v1.1 | Copyright (c) averta | http://averta.net
 ===========================================================================*/
;(function($){var Slider={init:function(el,options){var self=this;self.options=$.extend({},$.fn.avContentSlider.defaultOptions,options);self.$el=$(el);self.el=el;self.$tabs=self.$el.find(self.options.tabs);self.$cc=self.$el.find(self.options.contentsContainer);self.$contents=self.$cc.find(self.options.contents);self.total=self.$tabs.length;self.current=self.options.slideToStart;self.setup()},setup:function(){var self=this;self.$cc.height(self.$contents.first().height());self.$cc.css({overflow:'hidden'});self.$contents.each(function(index){var $this=$(this).hide();$this.css({position:'absolute',top:'0'})});self.$tabs.each(function(index){var $this=$(this);$this.attr('data-index',index)});self.$tabs.parent().delegate('li','click',function(e){e.preventDefault();var $this=$(this);self.goTo($this.data('index'))});if(self.options.slideshow==="true"){self.playTimer();if(self.options.pauseOnHover==="true"){self.$el.on('mouseenter',function(){self.pauseTimer()}).on('mouseleave',function(){self.playTimer()})}}self.slideContent()},playTimer:function(){var self=this;self.interval=window.setInterval(function(){self.goTo(self.current+1)},self.options.slideshowSpeed)},pauseTimer:function(){clearInterval(this.interval)},goTo:function(index){this.$tabs.eq(this.current).removeClass(this.options.tabActiveClass);this.$contents.eq(this.current).fadeOut(this.options.animationDuration*.4);this.current=(index<0)?this.total-1:index%this.total;this.slideContent()},slideContent:function(){var self=this;var tab=self.$tabs.eq(self.current).addClass(self.options.tabActiveClass);var content=self.$contents.eq(self.current).fadeIn(self.options.animationDuration*.6)}};$.fn.avContentSlider=function(options){return this.each(function(){var slider=Object.create(Slider);slider.init(this,options)})};$.fn.avContentSlider.defaultOptions={tabs:"ul:first-child li",tabActiveClass:"active-thumb",contentsContainer:".thumb-content-container",contents:".thumb-content",animation:"fade",slideDirection:"",slideshow:"true",slideshowSpeed:5000,animationDuration:800,randomize:"",slideToStart:0,pauseOnHover:"true"}})(jQuery);

/*==========================================================================
 * AvertaImagePreloader v1.0.1 | Copyright (c) averta | http://averta.net
 ===========================================================================*/
;(function($){var Images={init:function(el,options){var self=this;self.options=$.extend({},$.fn.avertaImagePreloader.defaultOptions,options||{});self.$el=$(el);self.el=el;self.$images=self.$el.find('img');self.setup()},setup:function(){var self=this;self.$images.css({'visibility':'hidden','opacity':0}).parents(self.options.preload_wrapper).addClass('preload');self.startTimer()},startTimer:function(){var self=this;self.interval=window.setInterval(function(){if(self.$images.length){self.checkLoadedImgs();console.log('1')}else if(self.options.tryNums){--self.options.tryNums;self.checkLoadedImgs();console.log('2')}else{self.stopTimer();console.log('3')}},400)},stopTimer:function(){clearInterval(this.interval)},checkLoadedImgs:function(){var self=this;self.$images.each(function(index){if(this.complete){self.$images=self.$images.not(this);self.showImage(this,index)}});return self.$images.length},showImage:function(image,index){var self=this;var $image=$(image);$image.css({visibility:'visible'}).delay(index*self.options.delay).animate({opacity:1},self.options.fadeDuration,function(){var $this=$(this);$this.removeAttr('style').parents(self.options.preload_wrapper).removeClass(self.options.preloadClass).addClass(self.options.loadedClass||'')})}};$.fn.avertaImagePreloader=function(options){var images=Object.create(Images);images.init(this,options);return this};$.fn.avertaImagePreloader.defaultOptions={delay:200,fadeDuration:300,preloadClass:"preload",loadedClass:"loaded",preload_wrapper:".imgHolder",tryNums:5}})(jQuery);

/*======================================================================================
 * Checkbox decoration plugin
 *======================================================================================*/
;(function($){ var i=function(e){if(!e)var e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()};$.fn.checkbox=function(f){try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}var g={cls:'jquery-checkbox',empty:'empty.png'};g=$.extend(g,f||{});var h=function(a){var b=a.checked;var c=a.disabled;var d=$(a);if(a.stateInterval)clearInterval(a.stateInterval);a.stateInterval=setInterval(function(){if(a.disabled!=c)d.trigger((c=!!a.disabled)?'disable':'enable');if(a.checked!=b)d.trigger((b=!!a.checked)?'check':'uncheck')},10);return d};return this.each(function(){var a=this;var b=h(a);if(a.wrapper)a.wrapper.remove();a.wrapper=$('<span class="'+g.cls+'"><span class="mark"><img src="'+g.empty+'" /></span></span>');a.wrapperInner=a.wrapper.children('span:eq(0)');a.wrapper.hover(function(e){a.wrapperInner.addClass(g.cls+'-hover');i(e)},function(e){a.wrapperInner.removeClass(g.cls+'-hover');i(e)});b.css({position:'absolute',zIndex:-1,visibility:'hidden'}).after(a.wrapper);var c=false;if(b.attr('id')){c=$('label[for='+b.attr('id')+']');if(!c.length)c=false}if(!c){c=b.closest?b.closest('label'):b.parents('label:eq(0)');if(!c.length)c=false}if(c){c.hover(function(e){a.wrapper.trigger('mouseover',[e])},function(e){a.wrapper.trigger('mouseout',[e])});c.click(function(e){b.trigger('click',[e]);i(e);return false})}a.wrapper.click(function(e){b.trigger('click',[e]);i(e);return false});b.click(function(e){i(e)});b.bind('disable',function(){a.wrapperInner.addClass(g.cls+'-disabled')}).bind('enable',function(){a.wrapperInner.removeClass(g.cls+'-disabled')});b.bind('check',function(){a.wrapper.addClass(g.cls+'-checked')}).bind('uncheck',function(){a.wrapper.removeClass(g.cls+'-checked')});$('img',a.wrapper).bind('dragstart',function(){return false}).bind('mousedown',function(){return false});if(window.getSelection)a.wrapper.css('MozUserSelect','none');if(a.checked)a.wrapper.addClass(g.cls+'-checked');if(a.disabled)a.wrapperInner.addClass(g.cls+'-disabled')})}})(jQuery);

/*========================================================================================
 * AvertaColorpicker v1.0.1 | Copyright (c) averta | http://averta.net
 *========================================================================================*/
;(function($){var Colorpicker={init:function(el,options){var self=this;self.options=$.extend({},$.fn.avertaColorpicker.defaultOptions,options||{});self.$el=$(el);self.el=el;self.setup()},setup:function(){var self=this;var $input=$('<input/>',{'id':self.$el.attr('id'),'class':self.$el.attr('class'),'type':'text','width':'55px','height':'25px'}).val(self.$el.val()).on('change',self.onColorpicker_update).on('keyup',self.onColorpicker_update);self.$el.replaceWith($input);$input.wrap('<div class="colorpicker_section" />');var $parent=$input.parent();var $selector=$('<span/>',{'class':'colorSelector'});$selector.prependTo($parent).css({'background-color':'#'+$input.val()}).ColorPicker({onBeforeShow:function(){$(this).ColorPickerSetColor($input.val())},onSubmit:function(hsb,hex,rgb,el){var $el=$(el);var $input=$el.siblings('input');$input.val(hex).change()}})},onColorpicker_update:function(){var $this=$(this);var $picker=$this.siblings('span');if($picker.length){var hex=$this.val();if(hex.toString().indexOf('#')!==-1){hex=hex.toString().replace("#","");$this.val(hex)}if(hex.toString().length<6)return;$picker.css('background-color','#'+$this.val())}}};$.fn.avertaColorpicker=function(options){return this.each(function(){var cp=Object.create(Colorpicker);cp.init(this,options)})};$.fn.avertaColorpicker.defaultOptions={addSelector:'true'}})(jQuery);
jQuery('[type="color"]').avertaColorpicker();

/*=======================================================================================
 * http://mths.be/placeholder v2.0.7 by @mathias
 *=======================================================================================*/
;(function(f,h,$){var a='placeholder' in h.createElement('input'),d='placeholder' in h.createElement('textarea'),i=$.fn,c=$.valHooks,k,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){var l=this;l.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind({'focus.placeholder':b,'blur.placeholder':e}).data('placeholder-enabled',true).trigger('blur.placeholder');return l};j.input=a;j.textarea=d;k={get:function(m){var l=$(m);return l.data('placeholder-enabled')&&l.hasClass('placeholder')?'':m.value},set:function(m,n){var l=$(m);if(!l.data('placeholder-enabled')){return m.value=n}if(n==''){m.value=n;if(m!=h.activeElement){e.call(m)}}else{if(l.hasClass('placeholder')){b.call(m,true,n)||(m.value=n)}else{m.value=n}}return l}};a||(c.input=k);d||(c.textarea=k);$(function(){$(h).delegate('form','submit.placeholder',function(){var l=$('.placeholder',this).each(b);setTimeout(function(){l.each(e)},10)})});$(f).bind('beforeunload.placeholder',function(){$('.placeholder').each(function(){this.value=''})})}function g(m){var l={},n=/^jQuery\d+$/;$.each(m.attributes,function(p,o){if(o.specified&&!n.test(o.name)){l[o.name]=o.value}});return l}function b(m,n){var l=this,o=$(l);if(l.value==o.attr('placeholder')&&o.hasClass('placeholder')){if(o.data('placeholder-password')){o=o.hide().next().show().attr('id',o.removeAttr('id').data('placeholder-id'));if(m===true){return o[0].value=n}o.focus()}else{l.value='';o.removeClass('placeholder');l==h.activeElement&&l.select()}}}function e(){var q,l=this,p=$(l),m=p,o=this.id;if(l.value==''){if(l.type=='password'){if(!p.data('placeholder-textinput')){try{q=p.clone().attr({type:'text'})}catch(n){q=$('<input>').attr($.extend(g(this),{type:'text'}))}q.removeAttr('name').data({'placeholder-password':true,'placeholder-id':o}).bind('focus.placeholder',b);p.data({'placeholder-textinput':q,'placeholder-id':o}).before(q)}p=p.removeAttr('id').hide().prev().attr('id',o).show()}p.addClass('placeholder');p[0].value=p.attr('placeholder')}else{p.removeClass('placeholder')}}}(this,document,jQuery));
;jQuery('input, textarea').placeholder();

/*=======================================================================================
 * jQuery imagesLoaded plugin v2.1.2 | http://github.com/desandro/imagesloaded | MIT License. by Paul Irish et al.
 *=======================================================================================*/
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);

/*========================================================================================
 * vimeo api
 *========================================================================================*/
var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
!1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=window.$f=e}();

/*========================================================================================
 * AvertaLiveTabs v1.0. | Copyright (c) averta | http://averta.net
 *========================================================================================*/
;(function($){
    
    var Container = {
        
        init : function(el, options){
            //cache this
            var self        = this;
            self.options    = $.extend({} ,$.fn.avertaLiveTabs.defaultOptions, options || {} );
            
            // Access to jQuery and DOM versions of element
            self.$el        = $(el);
            self.el         = el;
            
            self.$tabs      = self.$el.find(self.options.tabs);
            self.$contents  = self.$el.find(self.options.contents);
            
            self.setup();
        },
        
        setup: function(){
            var self = this;
            self.$tabs.on('click', {self:self}, self.onTab_clicked);
            var $active_content = (self.$tabs.filter('.active').length)?self.$tabs.filter('.active'):self.$tabs.first();
            $active_content.trigger('click');
        },
        
        onTab_clicked:function(event){
            event.preventDefault();
            var self   = event.data.self;
            var $this  = $(this);
            
            self.$tabs.removeClass(self.options.tabsActiveClass);
            $this.addClass(self.options.tabsActiveClass);
            
            self.$contents.eq($this.index()).siblings().hide(0);
            self.$contents.eq($this.index()).fadeIn(self.options.duration);
        }
    };
    
    
    
     $.fn.avertaLiveTabs = function(options){
        return this.each(function(){
            var container = Object.create(Container);
            container.init(this, options);
        });
    };
    
    $.fn.avertaLiveTabs.defaultOptions = {          
        tabs:            'ul.tabs > li',            // Tabs selector
        tabsActiveClass: 'active',                  // A Class that indicates active tab
        contents:        'ul.tabs-content > li',    // Tabs content selector    
        contentsActiveClass: 'active',              // A Class that indicates active tab-content    
        transition:      'fade',                    // Animation type white swiching tabs
        duration :        500                       // Animation duration in mili seconds
    };
    
})(jQuery);

/*========================================================================================
 * AvertaScroll2top v1.02. | Copyright (c) averta | http://averta.net
 *========================================================================================*/

;(function($){
    
    var Scroll = {
        
        init : function(el, options){
            //cache this
            var self        = this;
            self.options    = $.extend({},$.fn.avertaScroll2top.defaultOptions, options || {});
            
            // Access to jQuery and DOM versions of element
            self.$el        = $(el);
            self.el         = el;
            
            self.setup();
        },
        
        setup: function(){
            var self = this;
            
            if(self.options.autoFade && (self.$el.data("autofade") != false) ) self.autofade();
            
            self.$el.on("click", function(){
                $('body,html').animate({scrollTop:0}, self.options.speed, self.options.ease);
                return false;
            });
            
            
        },
        
        autofade: function(){
            var self = this;
            
            //hide btn on init
            if(window.scrollY < self.options.offset) { self.$el.fadeOut(0); }
            
            $(window).scroll(function(){
                
                if ('pageXOffset' in window) {  // all browsers, except IE before version 9
                    var topOffset = window.pageYOffset;
                }
                else {      // Internet Explorer before version 9
                    var topOffset = document.documentElement.scrollTop ;
                }
                
                
                if(topOffset > self.options.offset){
                    self.$el.fadeIn(self.options.fadeDuration);
                }else {
                    self.$el.fadeOut(self.options.fadeDuration);
                }
            });
        }
        
    };
    
    
    $.fn.avertaScroll2top = function(options){
        return this.each(function(){
            var scroll = Object.create(Scroll);
            scroll.init(this, options);
        });
    };
    
    $.fn.avertaScroll2top.defaultOptions = {
        speed:200,                   // scroll duration in millisecond
        fadeDuration:400,            // btn fade duration in millisecond
        ease: 'linear',              // scroll easing
        offset:100,                  // the distance in pixel to autoFade the btn 
        autoFade:true                // specify whether fade the element when scroll offset passed
    };
    
})(jQuery);

/*========================================================================================
 * debouncedresize: special jQuery event that happens once after a window resize
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 *========================================================================================*/
;(function($) {

var $event = $.event,
    $special,
    resizeTimeout;

$special = $event.special.debouncedresize = {
    setup: function() {
        $( this ).on( "resize", $special.handler );
    },
    teardown: function() {
        $( this ).off( "resize", $special.handler );
    },
    handler: function( event, execAsap ) {
        // Save the context
        var context = this,
            args = arguments,
            dispatch = function() {
                // set correct event type
                event.type = "debouncedresize";
                $event.dispatch.apply( context, args );
            };

        if ( resizeTimeout ) {
            clearTimeout( resizeTimeout );
        }

        execAsap ?
            dispatch() :
            resizeTimeout = setTimeout( dispatch, $special.threshold );
    },
    threshold: 150
};

})(jQuery);



