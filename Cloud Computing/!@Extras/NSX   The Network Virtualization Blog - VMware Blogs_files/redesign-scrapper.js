/*

    VMWare SCRAPPER JS
    VERSION 0.0.1
    AUTHOR KARTHIK NAIDU

    DEPENDENCIES:
    - jQuery 1.8.3

    TODO:
    - GET NEW LOOK N FEEL FOR OLD HTML

*/
//var $ = jQuery.noConflict();

// Do something with jQuery
Scrapper = {},
Scrapper.newLook = {
	init: function(){
		var $body = $('html>body'),
			$searchInput = $('input.btn-search'),
			$dropOne = $('.drop-one'),
			$dropTwo = $('.drop-two'),
			$menu = $('.nav'),
			$menuDiv = $('.nav li>div'),
			$menuLink = $('.nav li'),
			$primaryNav = $('#primary-navigation'),
			$secNav = $('#secondary-navigation'),
			$host = '//www.vmware.com';
			
			
			
			//add bg's to the body
			$body.prepend('<div class="page-b-footer-pattern" />').prepend('<div class="page-b-footer-gradient" />').prepend('<div class="page-b-header-gradient" />');
			
			//replace the image for search icon
			if($searchInput.length) $searchInput.attr('src', $host+'/files/images/framework/search-b-icon.png');	
						
			//Megamenu manipulation starts
			if($dropTwo.length){
				$dropTwo.each(function(){
					$(this).addClass('drop-one').removeClass('drop-two');
				});
			}				
			
			//Add placeholder for global search
			if($('form[name=frmSearchGLOBAL]').length){
				var placehold = $('#search-form .text-input').attr('placeholder'),
					searchTxt = $('#search-form .text-input').attr('value');
				if((placehold == '' || !placehold) && (searchTxt == '' || !searchTxt)) $('#search-form .text-input').attr('placeholder','Search').removeAttr('value');
				$.getScript($host+"/files/js/framework/placeholder.js", function(){						
					Placeholder.init();
				});
			}
			
			if($menu.length){
				$menuDiv.each(function(){
					var i = 1;
					$(this).find('.c-column-heading, .c-heading').each(function(){
							var h = i++;
							var head = $(this),
								content = $(this).next('.c-column-links');
								$(this).parents('.c-column-container').append('<div class="newData" id="newDiv_'+h+'"><div class="c-column-heading">'+head.html()+'</div><div class="c-column-links">'+content.html()+'</div></div>');	
					});
					$('.c-bg-gradient').hide();
				});
				$menuLink.hover( function () {					
					var $that = $(this);
					clearTimeout(window.delayMenuOut);
					clearTimeout(window.delayMenuIn);
					window.delayMenuIn = window.setTimeout(function(){	
							$that.siblings('li').find('a:first').removeClass('menu-active').parent('li').find('.drop-one').hide();							
							$that.find('a:first').addClass('menu-active').parent('li').find('.drop-one').show();
						}, 324);
					},
					function () {
						var $that = $(this);
						clearTimeout(window.delayMenuOut);
						clearTimeout(window.delayMenuIn);
						window.delayMenuOut = window.setTimeout(function(){							
							$(".menu-active").removeClass('menu-active');
								$('.drop-one').hide();	
						}, 521);
					}
				);
				
				/*if($('#top-of-page').length){
					$('#top-of-page').mouseover(function(e){
						e.preventDefault();
						$('.drop-one').hide();
					}).find('.nav > ul').mouseover(function(e) { 
						e.stopPropagation();
					});
					$('#content-container, .page-b-header-gradient, .page-b-footer-gradient').mouseover(function(){
						$('.drop-one').hide();
					});
				}*/
				
				/*if($dropOne.length){
					$dropOne.hover(function (e) {
							e.preventDefault();
							$(this).show();
						},
						function () {
							//$(this).hide();
					});	
				}*/	
				//Megamenu manipulation ends
				//alert($('.nav ul').width())
				if($menu.find('ul').width() > 900) $menuLink.find('> a').css('padding','15px 5px');
			
			}

			if($primaryNav.length){
				var h1 = $.trim($('#header').find('h1').text());			
				if(h1 == '') $primaryNav.addClass('noHead');
				if($primaryNav.find('h2')){
					 $('#content-container #content').css('padding-top','30px');
				}
			}
			
			if($('#vam-login-nav').length){
				var text = $('#vam-login-nav > .right-side > a');
				var link = $('.c>ul>li>a');
				$('#vam-login-nav').hide();
				$('.visual-entry').append('<div id="login-register"><a href="'+text.attr('href')+'">'+text.html()+'</a><a class="btn-login-register" href="'+ link.attr('href') +'">'+link.text()+'</a></div>')
			}
			
			if(!$('#header > h1').length && $('#content > h1').length){	
				var h1 = $('#content').find('h1'),
					h1text = $.trim(h1.text());
				h1.addClass('noHead').text(h1text);
			}
			
			if(!$('#iheader h1').length && $('#content table h1').length){	
				var h1 = $('#content table').find('h1'),
					h1text = $.trim(h1.text());
				h1.addClass('noHead').text(h1text);
			}
			
			if($('h1.h-1').length){	
				var h1 = $('h1.h-1.b-wid-75'),
					h1text = $.trim(h1.text());
				h1.html(h1text);
			}
			
			/* if($('#content p').length){
				$('#content p').each(function(){
					if($.trim($(this).text()) == '') $(this).addClass('emptyTag');
					else $(this).removeClass('emptyTag');
				});
			}	 */		
			
			if($('font').length) $('font').removeAttr('size');
			
			if($('#filterbox').length) $('table').addClass('filter-box-table');
			
			
			if($secNav.length){
				$secNav.find('li').each(function(){
					if($(this).find('ul').length){
						$(this).addClass('has-subnav');
					}		
					if($(this).hasClass('active')) $(this).children('ul').show();
					else $(this).children('ul').hide();
				});					
				
				$secNav.find('.has-subnav').click(function(e){
					e.preventDefault();
					var $this = $(this);
					if($this.hasClass('active')){
						$this.removeClass('active').children('ul').hide();
					}else{
						$this.addClass('active').siblings('li').removeClass('active').children('ul').hide();
						$this.children('ul').show();
					}
					return false;
				}).find('a').click(function(e) { 
					e.stopPropagation();
				});
			}
			
			if($("#menu-share").length){
				var switchTo5x=true;
				var url = document.location.protocol == "http" ? "http://w.sharethis.com/button/buttons.js" : "https://ws.sharethis.com/button/buttons.js";
				$.getScript(url, function(){
					stLight.options({publisher: "ur-7d4b1f76-45d-c891-c19-c2924529ce2", doNotHash: false, doNotCopy: false, hashAddressBar: false});
				});				
			}
			
			
			if($('#navigation-bottom').length){
				var $feedback = $('#navigation-bottom');
				var	feedbaklink = $feedback.find('li:last').find('a');
				var	lang = $('html').attr('lang');

				// Start 
				var urlLocaleMapper = {};
				urlLocaleMapper["en"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=EN','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["zh"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=ZH-S','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["cn"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=ZH-S','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["ja"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=JA','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["de"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=DE','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["fr"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=FR','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["tw"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=ZH-T','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["ko"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=KO','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["br"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=PT-BR','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["es"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=ES','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["ru"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=RU','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper["it"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=IT','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);"
				urlLocaleMapper["undefined"] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=EN','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				urlLocaleMapper[""] = "javascript:window.open('https://vmware.co1.qualtrics.com/SE/?SID=SV_b3COdXybimzMJH7&Q_lang=EN','','width=715,height=675,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');void(0);";
				
				feedbaklink.attr('href', urlLocaleMapper[lang]);				
			}
			
			window.setTimeout(function(){
				$("body").append("<div id='ph-locale-text-holder' style='display:none'></div>");
				$("[placeholder]").each(function(){
					var placeholder = $(this).attr("placeholder");
					placeholder = placeholder === null ? "" : placeholder;
					$("#ph-locale-text-holder").empty();
					$("#ph-locale-text-holder").html(placeholder);
					placeholder = $("#ph-locale-text-holder").text();
					if($.browser.msie && $.browser.version == "8.0")
					{
						$(this).val(placeholder);
					}
					else
					{
						if(!$(this).val())
						$(this).attr("placeholder", placeholder);
					}
				});	
			},521);
			
			//mega menu width adjustments
			if($('#support-mm .c-column-container').length <= 3) $('#support-mm').css('width','750px');
			if($('#downloads-mm .c-column-container').length <= 3) $('#downloads-mm').css('width','750px');
			if($('#consulting-mm .c-column-container').length == 1){
				$('#consulting-mm').addClass('consulting-onecolumn').css('width','290px');
			}else if($('#consulting-mm .c-column-container').length <= 3) {
				$('#consulting-mm').css('width','750px');
			}
			if($('#partners-mm .c-column-container').length == 2){
				$('#partners-mm').css('width','520px');
			}else if($('#partners-mm .c-column-container').length <= 3) {
				$('#partners-mm').css('width','750px');
			}
			if($('#company-mm .c-column-container').length == 2){
				$('#company-mm').css('width','520px');
			}else if($('#company-mm .c-column-container').length <= 3) {
				$('#company-mm').css('width','750px');
			}
			
	}
}
$(document).ready(function(){	
	Scrapper.newLook.init();
});
