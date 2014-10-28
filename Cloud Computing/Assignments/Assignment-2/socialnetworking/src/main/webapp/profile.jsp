<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script language="javascript">
	var BASE_URL = "http://localhost:8080/socialnetworking/";
	var userID =
<%=session.getAttribute("userid")%>
	;

	var qs = (function(a) {
		if (a == "")
			return {};
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p = a[i].split('=', 2);
			if (p.length == 1)
				b[p[0]] = "";
			else
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'));

	onload = function() {
		if (userID == null) {
			alert("You are not logged in");
		} else {
			if (userID == qs["id"]) {
				showUserID();
			} else {
				document.getElementById("content").innerHTML = "This is the user ID :"
						+ qs["id"];
				alert("This is the user ID : " + qs["id"]);
			}
		}
	};

	function showUserID() {
		try {
			var request = new XMLHttpRequest();
			request.open("GET", BASE_URL + 'RESTQ/user/GetUserID', false);
			request.onreadystatechange = function() {
				if (request.status === 200) {
					alert("This is the user ID : " + request.responseText);
					document.getElementById("content").innerHTML = "This is the user ID :"
							+ request.responseText;
				} else {
					document.getElementById("content").innerHTML = "Unable to load the content";
					alert('Error');
				}
			};
			request.send(null);
		} catch (err) {
			alert(err);
			document.getElementById("content").innerHTML += "\nXMLHttprequest error: "
					+ err.description;
		}
	}
</script>

<title>Insert title here</title>
</head>
<body>
	<div id="content"></div>
</body>
</html>
