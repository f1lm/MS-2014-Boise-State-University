$( document ).ready(function() {
    
    $( ".service_type_dropdown" ).click(function(){	
    	event.preventDefault();
    	$( ".service_types_list" ).toggle();
     
    });
    
     $( ".thumb" ).click(function(){	
     
     	if(jQuery(this).hasClass( "pitch_voted" ) == false) {
	    	post_id = jQuery(this).attr("data-post_id");
			nonce = jQuery(this).attr("data-nonce");
			thumb_div = jQuery(this);
		      jQuery.ajax({
		         type : "post",
		         dataType : "json",
		         url : myAjax.ajaxurl,
		         data : {action: "pitch_vote", post_id : post_id, nonce: nonce},
		         success: function(response) {
		            if(response.type == "success") {
		               jQuery(".rating"+post_id).html('+'+response.vote_count);
		               jQuery(".thumb"+post_id).addClass( "pitch_voted" );
		            }
		            else {
		               alert("Your vote could not be added");
		            }
		         }
		      }) 
		}
    });
    	
});