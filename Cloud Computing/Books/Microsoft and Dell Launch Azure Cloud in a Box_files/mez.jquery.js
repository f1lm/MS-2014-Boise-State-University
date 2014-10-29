	var slider_info = ""
	

	
	$(document).ready(function() {
	
		// Looping carousel
		 $("#top_slider").slides({
			play: 10000,
			generatePagination: true,
			pause:5000,
			hoverPause: true
		 });
		 
		 // fix style on vote buttons
		 $('.pds-vote-button span').html('');
		 
		 // account Info
		 welcomeUser();
		 if($.browser.msie && $.browser.version.indexOf("8.")!=-1){
			$.getScript("/mez/js/pie.js", function(data, textStatus, jqxhr) {
				if (window.PIE) {
					$('.b2b_portal_top, #b2b_portal_main, #main, #header-container, #right .module, .b2b_portal_bottom').each(function() {
						PIE.attach(this);
					});
				};
			});
			
			// ie8 hack
			$("#footer_right").css("padding-right","150px");
			$("#footer_left").css("padding-left","150px");
			$("#footer-container .wrapper").css("text-align","center");
		 }
    });
    

	 /** Form Validation **/
	 function formValidator(){
	
		var FirstName = document.getElementById('FirstName');
		var LastName = document.getElementById('LastName');
		var Company = document.getElementById('Company');
		var email = document.getElementById('email');
		var AreaCode = document.getElementById('AreaCode');
		var threedig = document.getElementById('threedig');
		var fourdig = document.getElementById('fourdig');
		var topic = document.getElementById('topic');
		var question = document.getElementById('question');
		
		
		if(notEmpty(FirstName, "Please enter your first name")){
			if(notEmpty(LastName, "Please enter your last name")){
				if(notEmpty(Company, "Please enter your company's name")){
					if(emailValidator(email, "Please enter a valid email address")){
						if(threedigValidator(AreaCode, "Please enter a valid Area Code")){
							if(threedigValidator(threedig, "Please enter a valid phone number")){
								if(fourdigValidator(fourdig, "Please enter a valid phone number")){
									if(notEmpty(topic, "Please select which environment you are asking about")){
										if(notEmpty(question, "Please enter what you would like to discuss with Dell")){
										
											// check captcha
										    data = {};
											data.ip=myip;
											data.recaptcha_challenge_field=$("#recaptcha_challenge_field").val();
											data.recaptcha_response_field=$("#recaptcha_response_field").val();
									
											// form data
											data.FirstName=$("#FirstName").val();
											data.LastName=$("#LastName").val();
											data.Company=$("#Company").val();
											data.email=$("#email").val();
											data.phone=$("#AreaCode").val() + "-" + $("#threedig").val() + "-" + $("#fourdig").val();
											data.topic=$("#topic").val();
											data.question=$("#question").val();
											
											$.post('/askdell',data,function(data, textStatus, jqXHR){

												if(data.indexOf("true")!=-1){
													alert("Thank you, a member of our Dell team will be in touch!");
													$('#myModal').trigger('reveal:close');
												}else{
													alert("Sorry, your captcha code is incorrect.");
												}
											
											});
											
											
											return false;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		return false;
}


function notEmpty(elem, helperMsg){
	if(elem.value.length == 0){
		alert(helperMsg);
		elem.focus(); // set the focus to this input
		return false;
	}
	return true;
}

	function madeSelection(elem, helperMsg){
		if(elem.value == ""){
			alert(helperMsg);
			elem.focus();
			return false;
		}else{
			return true;
		}
	}

	function threedigValidator(elem, helperMsg){
		var numberExp = /^[0-9]{3}$/;
		if(elem.value.match(numberExp)){
			return true;
		}else{
			alert(helperMsg);
			elem.focus();
			return false;
		}
	}

	function fourdigValidator(elem, helperMsg){
		var numberExp = /^[0-9]{4}$/;
		if(elem.value.match(numberExp)){
			return true;
		}else{
			alert(helperMsg);
			elem.focus();
			return false;
		}
	}

	function emailValidator(elem, helperMsg){
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(elem.value.match(emailExp)){
			return true;
		}else{
			alert(helperMsg);
			elem.focus();
			return false;
		}
	}
	
	/* Countdown timer */
	var countdownTargetDate;
	
	$(document).ready(function() {
	  
	    if($('#countdown_timer').length!=0){
			countdownTargetDate = new Date(2014, 3, 8, 0, 0, 0, 0);
			countdown=setInterval(updateCountDownTimer,1000);
		}
		
	});

	function updateCountDownTimer(){

		var tmp, now, diff;
		
		now = new Date();
		diff = countdownTargetDate.getTime()/1000 - now.getTime()/1000;
		
		// days
		tmp = diff/86400;
		hours = diff % 86400;
		$(".days").html(truncate(tmp.toString()));
		
	
		// hours
		tmp = hours/3600;
		minutes = hours % 3600;
		$(".hours").html(truncate(tmp.toString()));
		
		// minutes
		tmp = minutes/60;
		seconds = minutes % 60;
		$(".minutes").html(truncate(tmp.toString()));
		
		// seconds
		$(".seconds").html(truncate(seconds.toString()));
	}
	
	function truncate( numberString ) {
		var onpoint = numberString.split('.',2);
		var numberStringTruncated = numberString;
		if (onpoint.length > 1) {
			numberStringTruncated = onpoint[0];
		}
		return numberStringTruncated;
}
    