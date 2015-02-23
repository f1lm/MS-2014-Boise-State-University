jQuery( document ).ready( function( $ ) {
    jQuery("#menu-menu-left ul.sub-menu li").each(function(){
    	jQuery('a[title="marketing"]').parent('li').addClass('marketingLink');
        //jQuery(this).addClass(" " + jQuery(this).attr("title") + " ");
    });
});   
