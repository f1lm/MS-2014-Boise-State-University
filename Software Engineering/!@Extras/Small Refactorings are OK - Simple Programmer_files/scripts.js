jQuery(document).ready(function($){var ytcplayer={};$('.ytclink').click(function(){var iframeid=$(this).attr('data-playerid');var youtubeid=$(this).attr('href').split("watch?v=")[1];var quality=$(this).attr('data-quality');checkIfInView($('#'+ iframeid));ytcplayVideo(iframeid,youtubeid,quality);return false;});function ytcplayVideo(iframeid,youtubeid,quality){if(iframeid in ytcplayer){ytcplayer[iframeid].loadVideoById(youtubeid);}else{ytcplayer[iframeid]=new YT.Player(iframeid,{events:{'onReady':function(){ytcplayer[iframeid].loadVideoById(youtubeid);ytcplayer[iframeid].setPlaybackQuality(quality);}}});}}
function checkIfInView(element){if($(element).offset()){if($(element).offset().top<$(window).scrollTop()){$('html,body').animate({scrollTop:$(element).offset().top- 10},500);}
else if($(element).offset().top+ $(element).height()>$(window).scrollTop()+(window.innerHeight||document.documentElement.clientHeight)){$('html,body').animate({scrollTop:$(element).offset().top-(window.innerHeight||document.documentElement.clientHeight)+ $(element).height()+ 10},500);}}}
var currentTallest=0,currentRowStart=0,rowDivs=new Array(),$el,topPosition=0;jQuery('.ytc-td-bottom .ytc-row .ytctitledesc-cont').each(function(){$el=jQuery(this);topPostion=$el.position().top;if(currentRowStart!=topPostion){for(currentDiv=0;currentDiv<rowDivs.length;currentDiv++){rowDivs[currentDiv].height(currentTallest);}
rowDivs.length=0;currentRowStart=topPostion;currentTallest=$el.height();rowDivs.push($el);}else{rowDivs.push($el);currentTallest=(currentTallest<$el.height())?($el.height()):(currentTallest);}
for(currentDiv=0;currentDiv<rowDivs.length;currentDiv++){rowDivs[currentDiv].height(currentTallest);}});});