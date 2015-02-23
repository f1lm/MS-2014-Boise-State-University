<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src='js/jquery.min.js'></script>
<script type='text/javascript'>
$(document).ready(function()
		{
	
	$('#UpdateButton').click(function() 
	{
	var MSG = $("#Message").val();
	var dataString = 'message='+ MSG;
	
	

	$.ajax({
	type: "POST",
	url: "InsertMessage",
	data: dataString,
	cache: false,
	success: function(data)
	{
		$("#Message").val('');
	$("#content").prepend(data);
	$("#Message").focus();
	 }
	 });


    
	return false;
	});
	
		});
</script>
</head>
<body>
<textarea id='Message'></textarea><br/>
<input type='button' value=' Update ' id='UpdateButton'/>
<div id='content'></div>
</body>
</html>
</html>