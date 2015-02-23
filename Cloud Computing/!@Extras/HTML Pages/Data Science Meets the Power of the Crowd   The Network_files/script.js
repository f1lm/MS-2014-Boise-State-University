var expand = function(item){
	var $parent = '#' + jQuery(item).attr('id');
	var $expand = jQuery($parent + ' #body li div.btn a').attr('class');
	var openIcon = 'transparent url(/cisco-nci-theme/images/open_icon.png) center center no-repeat';
	var closeIcon = 'transparent url(/cisco-nci-theme/images/close_icon.png) center center no-repeat'
	var $div = jQuery('<div>').attr('id', 'newContent');
	
	var content;
	content = '<div class="type clearfix"><small class="miniHeader">Cisco Culture</small></div>';
	content += '<h3><img src="/cisco-nci-theme/images/video_thumb.jpg"><span>Headline for the News Article, Press Release, Video, Image or Podcast</span></h3>';
	content += '<p><small>08/15/2010</small><br/><small>by <a href="#">Humphrey Bogart</a></small></p>';
	content += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare pellentesque libero, a volutpat quam gravida in. Maecenas eget ligula et ipsum pretium pharetra ut at elit. <a href="#" class="arrow_right">Read More</a></p>';
	content += '<p><span>Tags:</span> <a href="#">virtualization</a>, <a href="#">emerging markets</a></p>';
	content += '<div class="relatedMedia clearfix"><p><span>Related Media</span></p><ul class="img_list"><li><a href="#"><img src="/cisco-nci-theme/images/list_thumb1.jpg"/></a></li><li><a href="#"><img src="/cisco-nci-theme/images/list_thumb2.jpg"/></a></li></ul></div>';
	content += '<div class="socialMedia topborder"><div class="comments"><span>18 Comments</span></div><div class="facebook"><img src="/cisco-nci-theme/images/facebook_like.png" alt="Facebook Like" /><span>12,250</span></div><div class="retweet"><img src="/cisco-nci-theme/images/retweet.png" alt="Retweet" /><span>1,280</span></div><div class="email"><img src="/cisco-nci-theme/images/email.png" alt="Retweet" /><span>800</span></div><div class="share"><img src="/cisco-nci-theme/images/share.png" alt="Share" /></div><div class="stats"><img src="/cisco-nci-theme/images/stats_icon.png" alt="stats" /><span>stats</span></div></div>';
	
var counter = 0;
	
	$('.' + $expand).bind('click', function(e){
		e.preventDefault();
		
		if($(this).parent().parent().attr('class') == 'open'){
			$(this).css({'background' : openIcon});
			changeItem.reset();
		}else{
			$('#news #body li div.btn a').css({'background' : openIcon});
			$(this).css({'background' : closeIcon});
			changeItem.change({item: $(this), height: 405});
		}
	});
	
	var changeItem = {
		height: 117,
		newsItem: 'currItem',
		change: function(input){
		var obj = this;
			
			$('#newContent').remove();
			$('#news #body ul li.open').animate({height: obj.height});
			$('#news #body ul li.open').children().fadeIn('fast');
			$('#news #body li').removeClass('open');
			
			this.newsItem = $(input.item).parent().parent().animate({height: input.height});
			
			var currentRow = $(this.newsItem).find('div.row');

			currentRow.parent().addClass('open');
			
			$div.html(content);
			
			var newItem = $($div).prependTo(this.newsItem);
			
			currentRow.fadeOut('fast', function(){	
				newItem.fadeIn('fast');
			});
			
			return this.newsItem;
		},
		reset: function(){
			var obj = this;
			
			$('#newContent').fadeOut('fast', function(){
				$('#newContent').remove();
				$('#news #body ul li.open').animate({height: obj.height});
				$('#news #body ul li.open').children().fadeIn('fast');
				$('#news #body li').removeClass('open');
			});
			
			return this.newsItem;
		}
	}
}

function videoDrawer(){
	
	jQuery('#video_drawer p.btn_expand').toggle(function(e){
		
		// change icon
		jQuery(this).addClass('open');
		
		jQuery('#video_content').slideUp('fast');
		e.preventDefault();
	}, function(e){
		
		// change icon
		jQuery(this).removeClass('open');
		
		jQuery('#video_content').slideDown();
		
		e.preventDefault();
	});
}

function newsToggle(){
	
	// List View
	$('#style_menu a#list').bind('click', function(e){
		changeButton(this);
		
		$('#news_small').removeClass('grid_view').addClass('list_view');
		
		// remove extras
		$('#news_small.list_view ul li:even').removeClass('left');
		$('#news_small.list_view ul li:last-child').removeClass('last');
		
		e.preventDefault();
	});
	
	// Grid View
	$('#style_menu a#grid').bind('click', function(e){
		changeButton(this);
		
		$('#news_small').removeClass('list_view').addClass('grid_view');
		
		// a few extras
		$('#news_small.grid_view ul li:even').addClass('left');
		$('#news_small.grid_view ul li:last-child').addClass('last');
		
		e.preventDefault();
	});
	
	// change icon selection function
	function changeButton(e){
		$('#style_menu li a').removeClass('selected');
		$(e).addClass('selected');
	}
}


var NCShare_ = {
  data: null,  
  srch: function(o) {
    _gaq.push(['_trackEvent', 'Search', o]);
    return true;
  }
};


jQuery(document).ready(function($){
	
	if($('#rotator').length) {
		rotateCarousel.init();
	}
	
	if($('#news').length){
		$('#news #body li:first').css({'border-top' : 0})
		
		expand($('#news'));
	}
	
	if($('#video_drawer').length > 0){
		videoDrawer();
	}
	
	if($('#news_small').length){
		newsToggle();
	}
});