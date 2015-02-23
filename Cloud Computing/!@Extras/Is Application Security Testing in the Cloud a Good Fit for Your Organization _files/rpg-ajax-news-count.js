// the purpose of this script is to show the visitor the number of news items posted since their last visit
jQuery(document).ready(function($) {
	
    data = {};
    data.action = "news_count_ajax",

    // console.log(data);

    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: data,
        dataType: 'json',
        success: function(e) {
            var count = parseInt(e.msg);
            if (!isNaN(parseFloat(count)) && count !== 0) {
                // Full size nav
                $('.item-news').append('<span class="news-count">' + count + '</span>');
                $('.news-count').hide().fadeIn(500);
                // Mobile nav
                $('#menu-item-358185 a').append(' <span class="news-count-mobile">' + count + '</span>');
                $('.news-count-mobile').hide().fadeIn(500);
            }
        }
    });

});