
$(document).ready(function()
{

$("#follow_login").click(function() { 
	$("#floatdiv").fadeIn("slow");
	$('#login-error').html(''); 
	var uname = $("#follow_uname").val();
	var loginpassword      = $("#follow_password").val();
	var followid		   = $("#followid").val();
	var dataString = 'username='+uname+'&password='+loginpassword+'&action=follow&id='+followid;
	 
	$.ajax({
	type: "get",
	url: '../follow_login.php',
	data: dataString,
	target:"#divResult",
	success: function(html){	
	$("#floatdiv").fadeOut("slow");
	if(html == 'Logined')
	{
		showMe('FollowedUser');
		hideMe('addToFollowLogin');
	}
	else if(html == 'same user')
	{
		showMe('FollowedUser');
		hideMe('addToFollowLogin');
	}
	else
	$('#login-error').html(html); 	
	}
	});
	return false;
	});

$("#favour_login").click(function() { 
	$("#floatdiv").fadeIn("slow");
	$('#login-error').html(''); 
	var uname = $("#favour_uname").val();
	var loginpassword      = $("#favour_password").val();
	var favourid		   = $("#favourid").val();
	var dataString = 'username='+uname+'&password='+loginpassword+'&action=favour&id='+favourid;
	 
	$.ajax({
	type: "get",
	url: '../follow_login.php',
	data: dataString,
	target:"#divResult",
	success: function(html){	
	$("#floatdiv").fadeOut("slow");
	if(html == 'Logined')
	{
		showMe('addToFavSuccess');
		hideMe('addToFavLogin');
	}
	else if(html == 'same user')
	{
		showMe('addToFavOwner');
		hideMe('addToFavLogin');
	}
	else if(html == 'Already')
	{
		showMe('addToFavAlready');
		hideMe('addToFavLogin');
	}
	else
	$('#login-favour-error').html(html); 	
	}
	});
	return false;
	});
	
$("#feature_login").click(function() { 
	$("#floatdiv").fadeIn("slow");
	$('#login-error').html(''); 
	var uname = $("#feature_uname").val();
	var loginpassword      = $("#feature_password").val();
	var favourid		   = $("#featureid").val();
	var dataString = 'username='+uname+'&password='+loginpassword+'&action=feature&id='+favourid;
	 
	$.ajax({
	type: "get",
	url: '../follow_login.php',
	data: dataString,
	target:"#divResult",
	success: function(html){	
	$("#floatdiv").fadeOut("slow");
	if(html == 'Logined')
	{
		showMe('featureSuccess');
		hideMe('featureLogin');
	}	
	else
	$('#login-feature-error').html(html); 	
	}
	});
	return false;
	});


$(".like").click(function()
{
var id=$(this).attr("id");
var name=$(this).attr("name");

var dataString = 'id='+ id + '&name='+ name;
$("#votebox").slideDown("slow");

$("#flash").fadeIn("slow");

$.ajax
({
type: "POST",
url: "http://www.slideserve.com/rating.php",
data: dataString,
cache: false,
success: function(html)
{
$("#flash").fadeOut("slow");
$("#rating").html(html);
} 
});
});

$(".close").click(function()
{
$("#votebox").slideUp("slow");
});

	$("#send_email").click(function() { 
	
	var From = $("#email_name").val();
	var fromemail = $("#email_email").val();
	var toemail = $("#email_toemail").val();
	var uname = $("#email_uname").val();
	var vid = $("#email_vid").val(); 	
	var dataString = 'fname='+From+"&femail="+fromemail+"&toemail="+toemail+"&uname="+uname+"&vid="+vid;
	$("#etrans_msg").html('');
	if(From == '')
	$("#etrans_msg").html("<font style='color:red;'>Type your name</font>");
	else if(fromemail == '')
	$("#etrans_msg").html("Type your email address");
	else if(toemail == '')
	$("#etrans_msg").html("Type reciever's email id");
	
	if($("#etrans_msg").html() != '')
	{	
	$("#etrans_msg").show();
	return;
	}
	
	$.ajax({
	type: "get",
	url: '../email_video.php?'+dataString,
	data: dataString,
	target:"#divResult",
	success: function(html){
	 
		if(html == 'success'){
			$("#etrans_msg").html("<font style='color:green;'>Email has been send! </font>");
			$("#etrans_msg").show();
			window.setTimeout(function(){
			$("#e_transcript").fadeOut("slow");
			Showe_trans(0);
			}, 1000);
			
		}
		else{
		$("#etrans_msg").html("<font style='color:red;'>"+html+" </font>");
		$("#etrans_msg").show();
		}
	}
	});
	});

});

function Showe_trans(flg)
{
	document.getElementById('e_transcript').style.display = 'inline';
	if(flg == 0)
	{
		document.getElementById('e_transcript').style.display = 'none';
		document.getElementById('email_name').value ='';
		document.getElementById('email_email').value ='';
		document.getElementById('email_toemail').value ='';
		document.getElementById('etrans_msg').innerHTML ='';
	}
}