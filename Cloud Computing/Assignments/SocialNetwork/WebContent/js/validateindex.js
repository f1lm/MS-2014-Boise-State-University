$().ready(function() {
	$('#signinForm :input').tipsy({
		trigger : 'manual',
		fade : true,
		gravity : 'w'
	});
	$('#signupForm :input').tipsy({
		trigger : 'manual',
		fade : true,
		gravity : 'w'
	});
	// validate the form when it is submitted
	$("#signinForm").validate({
		rules : {
			'email' : 'required',
			'password' : 'required'
		},

		messages : {
			'email' : 'Email is required field',
			'password' : 'Password is required field'
		},

		success : function(label) {
			$(label).each(function() {
				$('#' + this.htmlFor).tipsy('hide').removeAttr('title');
			});
		},

		errorPlacement : function(error, element) {
			element.attr('title', error.text());
			element.tipsy('show');
		}
	});
	$("#signupForm").validate({
		rules : {
			'firstname' : 'required',
			'lastname' : 'required',
			'email' : 'email',
			'password' : 'required'
		},

		messages : {
			'firstname' : 'First name is required field',
			'lastname' : 'Last name is required field',
			'email' : 'Email is required field',
			'password' : 'Password is required field'
		},

		success : function(label) {
			$(label).each(function() {
				$('#' + this.htmlFor).tipsy('hide').removeAttr('title');
			});
		},

		errorPlacement : function(error, element) {
			element.attr('title', error.text());
			element.tipsy('show');
		}
	});

});