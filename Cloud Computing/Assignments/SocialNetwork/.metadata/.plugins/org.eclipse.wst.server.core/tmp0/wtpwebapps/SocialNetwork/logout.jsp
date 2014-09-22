<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<script language="javascript">
	var BASE_URL = "http://localhost:8080/SocialNetwork/";

	onload = function() {
		var url = document.URL;
		getLogout();
	};
	function getLogout() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL + 'REST/user/Logout', false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					//alert("success");
					window.location.href = "index.jsp";
				} else {
					alert('Error- You are not logged in!');
				}
			};
			request.send();
		} catch (err) {
			alert(err.description);
		}
	}
</script>
<body>
</body>
</html>