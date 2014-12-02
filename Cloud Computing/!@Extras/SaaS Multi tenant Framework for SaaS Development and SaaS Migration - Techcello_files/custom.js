var fixedPos =jQuery('.fixedPos > a');
if(fixedPos.length>0){
	fixedPos.click(function(){
		jQuery(this).closest('section').siblings('section.fixedopen').removeClass('fixedopen');
		jQuery(this).closest('section').toggleClass('fixedopen');
		return false;
	});
}

function support_form(){
	    //alert("vinothkumar");return false;
		var flag = 1;
	    var support_first_name = jQuery("#support_first_name").val();
		if(jQuery.trim(support_first_name) == ""){
			jQuery("#support_first_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#support_first_name").removeClass('form_empty'); 
		}
		var support_last_name = jQuery("#support_last_name").val();
		if(jQuery.trim(support_last_name) == ""){
			jQuery("#support_last_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#support_last_name").removeClass('form_empty');
 		}
		var support_email = jQuery("#support_email").val();
		if(jQuery.trim(support_email) == ""){
			jQuery("#support_email").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#support_email").removeClass('form_empty');
 		}
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(support_email)){
 			jQuery("#support_email").addClass('form_empty');
			flag = 0;
	     } else {
			jQuery("#support_email").removeClass('form_empty');
 		}

		var support_phone = jQuery("#support_phone").val();
		if(jQuery.trim(support_phone) == ""){
			jQuery("#support_phone").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#support_phone").removeClass('form_empty');
 		}
		var support_company = jQuery("#support_company").val();
		if(jQuery.trim(support_company) == ""){
			jQuery("#support_company").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#support_company").removeClass('form_empty');
 		}

		var support_country = jQuery("#support_country").val();
		if(flag == 0){
			return false;
		}

		jQuery.ajax({
			type: "POST",
			url: "index.php?option=com_slider&controller=SliderController&task=contactform",
			data: {
				"support_first_name": support_first_name,
				"support_last_name": support_last_name,
 				"support_email": support_email,
				"support_phone": support_phone,
				"support_company": support_company,
				"support_country": support_country,
				"type": "support"
			},
			success: function (msg) {
				if(msg == 1){
				 jQuery('#support_form').hide();
				 jQuery('#support_msg').show();
				 jQuery("#support_first_name").val('');
				 jQuery("#support_last_name").val('');
				 jQuery("#support_email").val('');
				 jQuery("#support_phone").val('');
				 jQuery("#support_company").val('');
				 jQuery("#support_country").val('');
				}
			 }
    });
}

function evaluate_form(){
	    //alert("vinothkumar");return false;
		var flag = 1;
	    var evaluate_first_name = jQuery("#evaluate_first_name").val();
		if(jQuery.trim(evaluate_first_name) == ""){
			jQuery("#evaluate_first_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#evaluate_first_name").removeClass('form_empty'); 
		}
		var evaluate_last_name = jQuery("#evaluate_last_name").val();
		if(jQuery.trim(evaluate_last_name) == ""){
			jQuery("#evaluate_last_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#evaluate_last_name").removeClass('form_empty');
 		}
		var evaluate_email = jQuery("#evaluate_email").val();
		if(jQuery.trim(evaluate_email) == ""){
			jQuery("#evaluate_email").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#evaluate_email").removeClass('form_empty');
 		}
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(evaluate_email)){
 			jQuery("#evaluate_email").addClass('form_empty');
			flag = 0;
	     } else {
			jQuery("#evaluate_email").removeClass('form_empty');
 		}

		var evaluate_phone = jQuery("#evaluate_phone").val();
		if(jQuery.trim(evaluate_phone) == ""){
			jQuery("#evaluate_phone").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#evaluate_phone").removeClass('form_empty');
 		}
		var evaluate_company = jQuery("#evaluate_company").val();
		if(jQuery.trim(evaluate_company) == ""){
			jQuery("#evaluate_company").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#evaluate_company").removeClass('form_empty');
 		}

		var evaluate_country = jQuery("#evaluate_country").val();
		if(flag == 0){
			return false;
		}

		jQuery.ajax({
			type: "POST",
			url: "index.php?option=com_slider&controller=SliderController&task=contactform",
			data: {
				"evaluate_first_name": evaluate_first_name,
				"evaluate_last_name": evaluate_last_name,
 				"evaluate_email": evaluate_email,
				"evaluate_phone": evaluate_phone,
				"evaluate_company": evaluate_company,
				"evaluate_country": evaluate_country,
				"type": "evaluate"
			},
			success: function (msg) {
				if(msg == 1){
				 jQuery('#evaluate_form').hide();
				 jQuery('#evaluate_msg').show();
				 jQuery("#evaluate_first_name").val('');
				 jQuery("#evaluate_last_name").val('');
				 jQuery("#evaluate_email").val('');
				 jQuery("#evaluate_phone").val('');
				 jQuery("#evaluate_company").val('');
				 jQuery("#evaluate_country").val('');
				}
			 }
    });
}

function demo_form(){
	    //alert("vinothkumar");return false;
		var flag = 1;
	    var demo_first_name = jQuery("#demo_first_name").val();
		if(jQuery.trim(demo_first_name) == ""){
			jQuery("#demo_first_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#demo_first_name").removeClass('form_empty'); 
		}
		var demo_last_name = jQuery("#demo_last_name").val();
		if(jQuery.trim(demo_last_name) == ""){
			jQuery("#demo_last_name").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#demo_last_name").removeClass('form_empty');
 		}
		var demo_email = jQuery("#demo_email").val();
		if(jQuery.trim(demo_email) == ""){
			jQuery("#demo_email").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#demo_email").removeClass('form_empty');
 		}
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(demo_email)){
 			jQuery("#demo_email").addClass('form_empty');
			flag = 0;
	     } else {
			jQuery("#demo_email").removeClass('form_empty');
 		}

		var demo_phone = jQuery("#demo_phone").val();
		if(jQuery.trim(demo_phone) == ""){
			jQuery("#demo_phone").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#demo_phone").removeClass('form_empty');
 		}
		var demo_company = jQuery("#demo_company").val();
		if(jQuery.trim(demo_company) == ""){
			jQuery("#demo_company").addClass('form_empty');
			flag = 0;
 		} else {
			jQuery("#demo_company").removeClass('form_empty');
 		}

		var demo_country = jQuery("#demo_country").val();
		if(flag == 0){
			return false;
		}

		jQuery.ajax({
			type: "POST",
			url: "index.php?option=com_slider&controller=SliderController&task=contactform",
			data: {
				"demo_first_name": demo_first_name,
				"demo_last_name": demo_last_name,
 				"demo_email": demo_email,
				"demo_phone": demo_phone,
				"demo_company": demo_company,
				"demo_country": demo_country,
				"type": "demo"
			},
			success: function (msg) {
				if(msg == 1){
				 jQuery('#demo_form').hide();
				 jQuery('#demo_msg').show();
				 jQuery("#demo_first_name").val('');
				 jQuery("#demo_last_name").val('');
				 jQuery("#demo_email").val('');
				 jQuery("#demo_phone").val('');
				 jQuery("#demo_company").val('');
				 jQuery("#demo_country").val('');
				}
			 }
    });
}