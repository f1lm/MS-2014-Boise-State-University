
var fb_show=1;var addthis_show=1;var tweetfeed_show=1;var tweetbutton_show=1;var linkedin_show=1;var googleplus_show=1;var fb_show_locales_white_list=["*"];var fb_show_locales_black_list=["de-de","zh-cn"];var add_this_locales_white_list=["*"];var add_this_locales_black_list=[];var current_locale=document.getElementsByTagName('html')[0].getAttribute('lang').toLowerCase()||document.getElementsByTagName('html')[0].getAttribute('xml:lang').toLowerCase();current_locale=current_locale.toLowerCase();var tmp_show=0;for(i=fb_show_locales_white_list.length-1;i>=0;i--){if((typeof(current_locale)!="undefined"&&(current_locale==fb_show_locales_white_list[i]))||fb_show_locales_white_list[i]=="*"){tmp_show=1;}}
if(fb_show==1&&tmp_show==0)fb_show=0;tmp_show=0;for(i=add_this_locales_white_list.length-1;i>=0;i--){if((typeof(current_locale)!="undefined"&&(current_locale==add_this_locales_white_list[i]))||add_this_locales_white_list[i]=="*"){tmp_show=1;}}
if(addthis_show==1&&tmp_show==0)addthis_show=0;tmp_show=1;for(i=fb_show_locales_black_list.length-1;i>=0;i--){if((typeof(current_locale)!="undefined"&&(current_locale==fb_show_locales_black_list[i]))||fb_show_locales_black_list[i]=="*"){tmp_show=0;}}
if(fb_show==1&&tmp_show==0)fb_show=0;tmp_show=1;for(i=add_this_locales_black_list.length-1;i>=0;i--){if((typeof(current_locale)!="undefined"&&(current_locale==add_this_locales_black_list[i]))||add_this_locales_black_list[i]=="*"){tmp_show=0;}}
if(addthis_show==1&&tmp_show==0)addthis_show=0;function hpeuck_checkPrefsBit(bit_no){var cookie=document.cookie.match('hpeuck_prefs'+'=(.*?)(;|$)');if(cookie!=null)var cookie=unescape(cookie[1]);var displayBeacon=true;if(cookie&&cookie.substring(bit_no,bit_no+1)==0){displayBeacon=false;}
return displayBeacon;}
if(!hpeuck_checkPrefsBit(3)){var fb_show=0;var addthis_show=0;}
function do_fb_like(fb_like_target_div_id,learn_more_class_to_use,learn_more_text,layout,show_faces,width,height,action,font,color){window.addEvent('domready',function(){var url='http://www.facebook.com/plugins/like.php?';var parent_div=document.getElementById(fb_like_target_div_id);if(fb_show==1){var href=location.href;var full_url=url+'layout='+layout+'&show_faces='+show_faces+'&width='+width+'&action='+action+'&font='+font+'&colorscheme='+color+'&height='+height+'&href='+encodeURI(href);parent_div.innerHTML='<iframe  allowtransparency="true" scrolling="no" frameborder="0" src="'+full_url+'" width="'+width+'" height="'+height+'" class="fb_like_page_iframe"></iframe><a href="http://www.facebook.com/help/?page=1068"  target="_blank" class="'+learn_more_class_to_use+'">'+learn_more_text+'</a>&nbsp;&rsaquo;';}
else{$(parent_div).setStyle('display','none');}});};

/*
Date: 8/23/2013 4:59:24 PM
Non-published images:
/webdav/17%20United%20States-English%20Web/Building%20Blocks/System/00%20Shared/Content/CSS/i/'+full_url+'
*/