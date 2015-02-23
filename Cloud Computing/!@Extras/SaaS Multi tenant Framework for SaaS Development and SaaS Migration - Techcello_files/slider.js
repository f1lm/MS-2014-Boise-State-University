(function($){
	$.fn.extend({
		Mainbanner:function(options) {
			var defaults = {
				arrow: true,
				dots : true,
				autoplay : true,
				speed:1000
			}
			
			var options = $.extend(defaults, options);
			return this.each(function() {
					var o = options;
					var obj = $(this);
					var banner_width = obj.find('ul.slider_ul').children('li').width();
					var length=obj.find('ul.slider_ul').children('li').length;
					obj.find('.main-banner').css('margin-left',(-(2*banner_width)-(banner_width/2)));
					obj.find('ul.slider_ul').children('li').eq(0).clone().appendTo(obj.find('ul.slider_ul')).addClass('first-banner');
					obj.find('ul.slider_ul').children('li').eq(1).clone().appendTo(obj.find('ul.slider_ul')).addClass('second-banner');
					obj.find('ul.slider_ul').children('li').eq(length-1).clone().prependTo(obj.find('ul.slider_ul')).addClass('last-banner');
					obj.find('ul.slider_ul').children('li').eq(length-1).clone().prependTo(obj.find('ul.slider_ul')).addClass('last-before-banner');;
					
					if(o.arrow==true){
						obj.append('<div class="arrow"><a href="#" class="prev">prev</a><a href="" class="next">Next</a></div>');
					}
                    if(o.autoplay === true){
                      setInterval(function() { $(".arrow .next").trigger("click"); }, 8000);
                    }
					if(o.dots==true){
						obj.append('<div class="dots"></div>');
						for(i=1;i<=length;i++){
							$('.dots').append('<a href="#" rel="count'+i+'" class="count'+i+'"></a>');
						}
						$('.dots').find('a:first-child').addClass('current');
					}
					
					$('.next',obj).click(function(){
						var left=Math.abs(parseInt($('.main-banner > ul.slider_ul',obj).css('left')));
						if(left==length*banner_width){
							$('.main-banner > ul.slider_ul',obj).not(':animated').css('left',0);
							$('.main-banner > ul.slider_ul',obj).not(':animated').animate({'left':'-='+banner_width},o.speed);
						}
						else{
							$('.main-banner > ul.slider_ul',obj).not(':animated').animate({'left':'-='+banner_width},o.speed);
						}
						var current=$('.dots').find('a.current');
						var newcurrent = current.next().length ? current.next() : $('.dots').find('a').eq(0);
						newcurrent.addClass('current').siblings().removeClass('current');
						return false;
					});
					
					$('.prev',obj).click(function(){
						var left=parseInt($('.main-banner > ul.slider_ul',obj).css('left'));
						if(left>=banner_width){
							var val=(length-1)*banner_width;
							$('.main-banner > ul.slider_ul',obj).not(':animated').css('left',-val);
							$('.main-banner > ul.slider_ul',obj).not(':animated').animate({'left':'+='+banner_width},o.speed);
						}
						else
							$('.main-banner > ul.slider_ul',obj).not(':animated').animate({'left':'+='+banner_width},o.speed);
						var current=$('.dots').find('a.current');
						var newcurrent = current.prev().length ? current.prev() : $('.dots').find('a:last-child');
						newcurrent.addClass('current').siblings().removeClass('current');
						return false;
					});
					
					$('.dots a',obj).click(function(){
						var count=$(this).attr('rel').replace('count','');
						$(this).addClass('current').siblings().removeClass('current');;
						$('.main-banner > ul.slider_ul',obj).not(':animated').animate({'left':-(count-1)*banner_width},o.speed);
						return false;
					});
	
			});
		}
	});
	
})(jQuery);





