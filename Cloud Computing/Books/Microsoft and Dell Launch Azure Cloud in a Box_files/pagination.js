$(document).ready(function() {
		
		// hide all right column pagination
		$("#right .seeall").css("display","none");
		
		var webcastsInitiated=false;
		var caseStudiesInitiated=false;
		
		// tabs
		if($('#tabs').length!=0){

			$( "#tabs" ).tabs();
			
			$( "#tabs" ).bind( "tabsshow", function(event, ui) {
			  
			    // webcasts
				if(ui.index==1 && webcastsInitiated==false){
			  
					  if($('#tabs2').length!=0){
					  
					    webcastsInitiated=true;
						
						$('#tabs2').pajinate({
							items_per_page : 4,
							nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
							nav_label_next : '<img src="/mez/images/rightarrow.gif">',
							num_page_links_to_display : 3,
									wrap_around: true,
									show_first_last: false
						});
					}
					
				}//end if
				
				// case studies
				if(ui.index==2 && caseStudiesInitiated==false){
			  
					  if($('#tabs2').length!=0){
					    
						caseStudiesInitiated=true;
						
						$('#tabs3').pajinate({
							items_per_page : 4,
							nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
							nav_label_next : '<img src="/mez/images/rightarrow.gif">',
							num_page_links_to_display : 3,
									wrap_around: true,
									show_first_last: false
						});
					}
					
				}//end if
				
				
				
			  });
			  
		}//end if tabs
	
	    // paginate
		if($('#B2B_MEZ_BLOGFEED').length!=0){
			$('#B2B_MEZ_BLOGFEED').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_BLOGFEED_ARCHIVE').length!=0){
			$('#B2B_MEZ_BLOGFEED_ARCHIVE').pajinate({
				items_per_page : 10,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_WCM_BLOGFEED').length!=0){
			$('#B2B_MEZ_WCM_BLOGFEED').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_WSM_BLOGFEED').length!=0){
			$('#B2B_MEZ_WSM_BLOGFEED').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_WCM_FEATURED_RESOURCES').length!=0){
			$('#B2B_WCM_FEATURED_RESOURCES').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_WSM_FEATURED_RESOURCES').length!=0){
			$('#B2B_MEZ_WSM_FEATURED_RESOURCES').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_WHY_DELL_WCM').length!=0){
			$('#B2B_MEZ_WHY_DELL_WCM').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#B2B_MEZ_WHY_DELL_WSM').length!=0){
			$('#B2B_MEZ_WHY_DELL_WSM').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		if($('#tabs1').length!=0){
			$('#tabs1').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3,
						wrap_around: true,
						show_first_last: false
			});
		}
		
		
		
		if($('#blogfeed').length!=0){
			$('#blogfeed').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="/mez/images/leftarrow.gif">',
				nav_label_next : '<img src="/mez/images/rightarrow.gif">',
				num_page_links_to_display : 3
			});
		}
		
		if($('#resources').length!=0){
			$('#resources').pajinate({
				items_per_page : 4,
				nav_label_prev : '<img src="assets/images/leftarrow.gif">',
				nav_label_next : '<img src="assets/images/rightarrow.gif">',
				num_page_links_to_display : 3
			});
		}
		
		// twitter
		if($('#twitter').length!=0){
			$('#twitter').totemticker({
					row_height	:	'108px',
					next		:	'#ticker-next',
					previous	:	'#ticker-previous',
					stop		:	'#stop',
					start		:	'#start',
					mousestop	:	true
			});
		}
   
	
		
});
